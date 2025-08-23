'use client';

import { useEffect, useState, useCallback } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

interface PerformanceState {
  metrics: PerformanceMetrics;
  isLoading: boolean;
  report: any;
}

export const usePerformance = () => {
  const [state, setState] = useState<PerformanceState>({
    metrics: {},
    isLoading: true,
    report: null
  });

  useEffect(() => {
    const updateMetrics = (metric: any) => {
      setState(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          [metric.name.toLowerCase()]: metric.value
        },
        isLoading: false
      }));
    };

    performanceMonitor.onVital(updateMetrics);
    performanceMonitor.startAlerts();

    // 초기 보고서 생성 (페이지 로드 후 3초 후)
    const reportTimer = setTimeout(() => {
      const report = performanceMonitor.generateReport();
      setState(prev => ({
        ...prev,
        report
      }));
    }, 3000);

    return () => {
      clearTimeout(reportTimer);
    };
  }, []);

  const generateReport = useCallback(() => {
    const report = performanceMonitor.generateReport();
    setState(prev => ({
      ...prev,
      report
    }));
    return report;
  }, []);

  const markCustomEvent = useCallback((name: string) => {
    performanceMonitor.mark(name);
  }, []);

  const measureCustomEvent = useCallback((name: string, startMark: string, endMark?: string) => {
    performanceMonitor.measure(name, startMark, endMark);
  }, []);

  const getMemoryInfo = useCallback(() => {
    return performanceMonitor.getMemoryInfo();
  }, []);

  const getNetworkInfo = useCallback(() => {
    return performanceMonitor.getNetworkInfo();
  }, []);

  return {
    ...state,
    generateReport,
    markCustomEvent,
    measureCustomEvent,
    getMemoryInfo,
    getNetworkInfo
  };
};