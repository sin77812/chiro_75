'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DataCube from '../dashboard/DataCube';
import BenchmarkComparison from '../dashboard/BenchmarkComparison';
import WebsiteAnalyzer from '../dashboard/WebsiteAnalyzer';
import { CustomIcon } from '../ui/CustomIcons';

const PerformanceDashboard = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedCube, setSelectedCube] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('data');

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 300], [0, -50]);

  const handleCubeSelect = (cubeId: number) => {
    if (cubeId === -1) {
      setSelectedCube(null);
    } else {
      setSelectedCube(cubeId === selectedCube ? null : cubeId);
    }
  };

  const sections = [
    { id: 'data', name: '데이터 큐브', icon: '📊' },
    { id: 'benchmark', name: '벤치마크 비교', icon: '🏆' },
    { id: 'ai', name: '웹사이트 분석', icon: '🤖' }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 125, 50, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 125, 50, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Elements */}
        {Array.from({length: 20}).map((_, i) => {
          // Use seeded random values based on index for consistent SSR
          const leftPos = (i * 17.3) % 100;
          const topPos = (i * 23.7) % 100;
          const duration = 4 + (i % 3);
          const delay = (i * 0.5) % 2;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay
              }}
            />
          )
        })}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold text-sm">PERFORMANCE DASHBOARD</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            성과를 한 눈에 확인하세요
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            실시간 데이터 분석부터 AI 성과 예측까지, 
            당신의 비즈니스 성장을 시각화합니다
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-2">
            <div className="flex gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CustomIcon 
                    name={section.icon} 
                    size={20} 
                    color={activeSection === section.id ? '#FFFFFF' : '#2E7D32'}
                  />
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          {/* Data Cube Section */}
          {activeSection === 'data' && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">인터랙티브 데이터 큐브</h3>
                <p className="text-white/70">
                  4개의 핵심 지표를 3D로 시각화하여 직관적으로 확인하세요
                </p>
              </div>
              <DataCube 
                isActive={activeSection === 'data'}
                selectedCube={selectedCube}
                onCubeSelect={handleCubeSelect}
              />
            </motion.div>
          )}

          {/* Benchmark Comparison Section */}
          {activeSection === 'benchmark' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">실시간 벤치마크 비교</h3>
                <p className="text-white/70">
                  업계 평균과 CHIRO 고객들의 실제 성과를 비교해보세요
                </p>
              </div>
              <BenchmarkComparison isActive={activeSection === 'benchmark'} />
            </motion.div>
          )}

          {/* AI Performance Predictor Section */}
          {activeSection === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">AI 웹사이트 분석기</h3>
                <p className="text-white/70">
                  30초 만에 웹사이트 성능을 종합 분석하고 개선 방안을 제시합니다
                </p>
              </div>
              <WebsiteAnalyzer isActive={activeSection === 'ai'} />
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-lg rounded-3xl border border-white/10 p-8"
        >
          <div className="text-center mb-6">
            <h4 className="text-white font-bold text-xl mb-2">실시간 전체 성과</h4>
            <p className="text-white/60">CHIRO와 함께한 모든 프로젝트의 통계</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-blue-400 mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                180+
              </motion.div>
              <div className="text-white/70 text-sm">완료 프로젝트</div>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-green-400 mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                +280%
              </motion.div>
              <div className="text-white/70 text-sm">평균 성과 향상</div>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-purple-400 mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              >
                98.2%
              </motion.div>
              <div className="text-white/70 text-sm">고객 만족도</div>
            </div>

            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-orange-400 mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                2.1주
              </motion.div>
              <div className="text-white/70 text-sm">평균 완성 시간</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-8 py-4 cursor-pointer hover:scale-105 transition-transform">
            <span className="text-white font-bold text-lg">이제 당신의 성장을 시작해보세요</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceDashboard;