'use client';

import { useState, useEffect } from 'react';
import { usePerformance } from '@/hooks/usePerformance';
import { motion, AnimatePresence } from 'framer-motion';
import { threeOptimizer } from '@/utils/threeOptimizer';

interface PerformanceDebuggerProps {
  enabled?: boolean;
}

export const PerformanceDebugger = ({ enabled = false }: PerformanceDebuggerProps) => {
  const { metrics, report, generateReport, getMemoryInfo, getNetworkInfo } = usePerformance();
  const [isVisible, setIsVisible] = useState(enabled);
  const [activeTab, setActiveTab] = useState<'vitals' | 'system' | 'three' | 'report'>('vitals');
  const [memoryInfo, setMemoryInfo] = useState<any>(null);
  const [networkInfo, setNetworkInfo] = useState<any>(null);

  useEffect(() => {
    if (enabled) {
      // 개발 환경에서만 키보드 단축키 활성화
      if (process.env.NODE_ENV === 'development') {
        const handleKeyPress = (e: KeyboardEvent) => {
          if (e.ctrlKey && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            setIsVisible(prev => !prev);
          }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
      }
    }
  }, [enabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryInfo(getMemoryInfo());
      setNetworkInfo(getNetworkInfo());
    }, 1000);

    return () => clearInterval(interval);
  }, [getMemoryInfo, getNetworkInfo]);

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getMetricColor = (metric: string, value: number) => {
    const thresholds: { [key: string]: { good: number; poor: number } } = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'text-gray-400';
    
    if (value <= threshold.good) return 'text-green-400';
    if (value <= threshold.poor) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!enabled || !isVisible) {
    return enabled ? (
      <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono border border-white/20 hover:bg-black/90 transition-colors"
        >
          Performance
        </button>
      </div>
    ) : null;
  }

  const debugInfo = threeOptimizer.getDebugInfo();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 w-96 max-h-[80vh] bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-white text-xs font-mono overflow-hidden z-[9999]"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {(['vitals', 'system', 'three', 'report'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="overflow-y-auto max-h-96">
          {activeTab === 'vitals' && (
            <div className="space-y-3">
              <h3 className="text-green-400 font-semibold mb-2">Core Web Vitals</h3>
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-300 uppercase">{key}:</span>
                  <span className={getMetricColor(key, value as number)}>
                    {typeof value === 'number' ? 
                      (key === 'cls' ? (value as number).toFixed(3) : `${Math.round(value as number)}ms`) 
                      : value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-green-400 font-semibold mb-2">Memory</h3>
                {memoryInfo ? (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Used:</span>
                      <span>{formatBytes(memoryInfo.usedJSHeapSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>{formatBytes(memoryInfo.totalJSHeapSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Limit:</span>
                      <span>{formatBytes(memoryInfo.jsHeapSizeLimit)}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">Memory API not supported</span>
                )}
              </div>

              <div>
                <h3 className="text-green-400 font-semibold mb-2">Network</h3>
                {networkInfo ? (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{networkInfo.effectiveType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downlink:</span>
                      <span>{networkInfo.downlink} Mbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RTT:</span>
                      <span>{networkInfo.rtt}ms</span>
                    </div>
                    {networkInfo.saveData && (
                      <div className="text-yellow-400">Data Saver: ON</div>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">Network API not supported</span>
                )}
              </div>
            </div>
          )}

          {activeTab === 'three' && (
            <div className="space-y-3">
              <h3 className="text-green-400 font-semibold mb-2">Three.js Optimizer</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Renderers:</span>
                  <span>{debugInfo.renderersCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Low Power Mode:</span>
                  <span className={debugInfo.isLowPowerMode ? 'text-yellow-400' : 'text-green-400'}>
                    {debugInfo.isLowPowerMode ? 'ON' : 'OFF'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Device Pixel Ratio:</span>
                  <span>{debugInfo.devicePixelRatio}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-green-400 font-semibold">Performance Report</h3>
                <button
                  onClick={generateReport}
                  className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs hover:bg-green-500/30 transition-colors"
                >
                  Generate
                </button>
              </div>
              {report ? (
                <div className="bg-gray-900/50 p-3 rounded overflow-x-auto">
                  <pre className="text-xs text-gray-300">
                    {JSON.stringify(
                      {
                        timestamp: report.timestamp,
                        url: report.url,
                        device: {
                          viewport: `${report.device?.viewportWidth}x${report.device?.viewportHeight}`,
                          pixelRatio: report.device?.pixelRatio,
                          memory: report.device?.deviceMemory
                        },
                        network: report.network,
                        navigation: report.navigation
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              ) : (
                <div className="text-gray-400">Click Generate to create report</div>
              )}
            </div>
          )}
        </div>

        {/* 단축키 안내 */}
        <div className="mt-4 pt-3 border-t border-white/10 text-gray-400 text-xs">
          Press Ctrl+Shift+P to toggle
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceDebugger;