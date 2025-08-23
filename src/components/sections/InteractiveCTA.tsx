'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GrowthSimulator from '../cta/GrowthSimulator';
import SmartForm from '../cta/SmartForm';
import InstantDiagnosis from '../cta/InstantDiagnosis';

const InteractiveCTA = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeTab, setActiveTab] = useState('simulator');
  const [showContactModal, setShowContactModal] = useState(false);
  const [completedActions, setCompletedActions] = useState({
    simulator: false,
    diagnosis: false,
    form: false
  });

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 300], [0, -50]);

  const tabs = [
    { 
      id: 'simulator', 
      name: '성장 시뮬레이터', 
      icon: '📈',
      description: '12개월 성장 시나리오 시각화'
    },
    { 
      id: 'diagnosis', 
      name: 'AI 웹사이트 진단', 
      icon: '🔍',
      description: '30초 무료 성능 분석'
    },
    { 
      id: 'form', 
      name: '맞춤 제안서 신청', 
      icon: '📋',
      description: '3단계 스마트 신청 과정'
    }
  ];

  const handleFormComplete = (data: any) => {
    setCompletedActions(prev => ({ ...prev, form: true }));
    console.log('Form completed:', data);
  };

  const handleDiagnosisComplete = (result: any) => {
    setCompletedActions(prev => ({ ...prev, diagnosis: true }));
    console.log('Diagnosis completed:', result);
  };

  const handleSimulatorComplete = () => {
    setCompletedActions(prev => ({ ...prev, simulator: true }));
  };

  const completedCount = Object.values(completedActions).filter(Boolean).length;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-20"
      >
        {/* Matrix Rain Effect */}
        {Array.from({length: 30}).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-sm font-mono opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`,
            }}
            animate={{
              y: [0, (typeof window !== 'undefined' ? window.innerHeight : 800) + 100],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {Math.random().toString(36).substring(7)}
          </motion.div>
        ))}
        
        {/* Geometric Patterns */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(33, 150, 243, 0.1) 0%, transparent 50%)
            `,
          }}
        />
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
          {/* Progress Indicator */}
          {completedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold text-sm">
                {completedCount}/3 단계 완료
              </span>
            </motion.div>
          )}
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-white/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold text-sm">INTERACTIVE CTA</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            3가지 인터랙티브 도구로 당신의 비즈니스 성장을 
            직접 체험하고 맞춤형 솔루션을 받아보세요
          </p>

          {/* Achievement Badges */}
          {completedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-4 mb-8"
            >
              {Object.entries(completedActions).map(([key, completed]) => (
                <motion.div
                  key={key}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all ${
                    completed 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : 'bg-white/5 border border-white/10 text-white/50'
                  }`}
                  animate={completed ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {completed && <span>✓</span>}
                  <span className="capitalize">{key}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Interactive Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-2">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 group ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-2xl">{tab.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{tab.name}</div>
                      <div className="text-xs opacity-70">{tab.description}</div>
                    </div>
                    
                    {/* Completion Indicator */}
                    {completedActions[tab.id as keyof typeof completedActions] && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            {activeTab === 'simulator' && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">성장 시뮬레이터</h3>
                  <p className="text-white/70">
                    예산과 목표를 설정하고 12개월 성장 시나리오를 실시간으로 확인하세요
                  </p>
                </div>
                <GrowthSimulator 
                  isActive={activeTab === 'simulator'}
                />
              </div>
            )}

            {activeTab === 'diagnosis' && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">AI 웹사이트 진단</h3>
                  <p className="text-white/70">
                    URL만 입력하면 AI가 30초 안에 완전 무료로 웹사이트를 종합 진단합니다
                  </p>
                </div>
                <InstantDiagnosis onComplete={handleDiagnosisComplete} />
              </div>
            )}

            {activeTab === 'form' && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">맞춤 제안서 신청</h3>
                  <p className="text-white/70">
                    3단계만 완료하면 24시간 내에 맞춤형 프로젝트 제안서를 받아보실 수 있습니다
                  </p>
                </div>
                <SmartForm onComplete={handleFormComplete} />
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-lg rounded-3xl border border-white/10 p-8 max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {completedCount === 3 
                  ? '모든 단계 완료! 🎉' 
                  : completedCount > 0 
                  ? `${3 - completedCount}단계만 더 완료하면 끝!`
                  : '준비되셨나요?'
                }
              </h3>
              <p className="text-white/70">
                {completedCount === 3
                  ? '24시간 내에 상세한 분석 리포트와 제안서를 보내드립니다'
                  : '각 도구를 체험하시면서 CHIRO의 차별화된 접근 방식을 확인해보세요'
                }
              </p>
            </div>

            {completedCount < 3 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {tabs.map((tab, index) => {
                  const isCompleted = completedActions[tab.id as keyof typeof completedActions];
                  const isCurrent = activeTab === tab.id;
                  
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                        isCompleted 
                          ? 'bg-green-500/20 border-green-500/50 text-green-400'
                          : isCurrent
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{tab.icon}</span>
                        {isCompleted && (
                          <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="font-semibold mb-1">{tab.name}</div>
                      <div className="text-sm opacity-70">{tab.description}</div>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-green-400 font-bold text-lg mb-2">
                  축하합니다! 모든 단계를 완료하셨습니다
                </div>
                <div className="text-white/70">
                  곧 연락을 드려 더 자세한 상담을 진행하겠습니다
                </div>
              </div>
            )}

            {/* Direct Contact Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="tel:02-1234-5678"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📞</span>
                <span>바로 전화하기</span>
                <span className="text-sm opacity-80">(02-1234-5678)</span>
              </motion.a>

              <motion.a
                href="mailto:hello@chiro.agency"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>✉️</span>
                <span>이메일 보내기</span>
              </motion.a>
            </div>

            <div className="mt-4 text-center">
              <p className="text-white/50 text-sm">
                평균 응답 시간: 30분 이내 • 연락 가능 시간: 평일 9:00-18:00
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveCTA;