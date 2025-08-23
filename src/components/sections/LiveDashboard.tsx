'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LiveTicker from '../dashboard/LiveTicker';
import PerformanceMap from '../dashboard/PerformanceMap';

const LiveDashboard = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [leaderboardData, setLeaderboardData] = useState([
    { company: 'TechCorp', metric: '전환율', value: 340, change: 12 },
    { company: 'HealthPlus', metric: '트래픽', value: 280, change: 8 },
    { company: 'EduTech', metric: '매출', value: 450, change: 15 }
  ]);

  const [timelineEvents] = useState([
    { date: '2024-08-20', event: 'A사 전환율 340% 달성', type: 'conversion' },
    { date: '2024-08-18', event: 'B사 페이지 속도 70% 개선', type: 'performance' },
    { date: '2024-08-15', event: 'C사 SEO 순위 TOP 3 진입', type: 'seo' },
    { date: '2024-08-12', event: 'D사 모바일 UX 혁신 완료', type: 'ux' },
    { date: '2024-08-10', event: 'E사 사용자 증가 280% 기록', type: 'growth' },
    { date: '2024-08-08', event: 'F사 글로벌 진출 성공', type: 'expansion' }
  ]);

  const [aiPrediction, setAiPrediction] = useState({
    nextMonth: 425,
    confidence: 94,
    trend: 'up'
  });

  // 실시간 데이터 시뮬레이션
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setLeaderboardData(prev => prev.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 10 - 5),
        change: Math.floor(Math.random() * 20 - 10)
      })));

      setAiPrediction(prev => ({
        ...prev,
        nextMonth: prev.nextMonth + Math.floor(Math.random() * 10 - 5),
        confidence: Math.max(85, Math.min(98, prev.confidence + Math.floor(Math.random() * 6 - 3)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 125, 50, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 125, 50, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            실시간 성과 대시보드
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            지난 30일간 CHIRO 고객사들의 성과를 실시간으로 확인하세요
          </p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Performance Map (Center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <PerformanceMap isActive={inView} />
          </motion.div>

          {/* Leaderboard (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6 h-full">
              <h3 className="text-xl font-bold text-white mb-6">성과 순위표</h3>
              
              <div className="space-y-4">
                {leaderboardData.map((item, index) => (
                  <motion.div
                    key={item.company}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-500/20' :
                          index === 1 ? 'bg-gray-400/20 text-gray-300' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{item.company}</div>
                          <div className="text-white/60 text-xs">{item.metric}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-green-400 font-bold">+{item.value}%</div>
                        <div className={`text-xs ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {item.change >= 0 ? '↗' : '↘'} {Math.abs(item.change)}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${Math.min(item.value / 5, 100)}%` } : {}}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Prediction Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="mt-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-4 border border-purple-500/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm text-purple-300">CHIRO AI 예측</span>
                </div>
                
                <div className="text-white font-semibold mb-1">다음 달 예상 성과</div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">+{aiPrediction.nextMonth}%</span>
                  <div className="text-right">
                    <div className="text-xs text-white/60">신뢰도</div>
                    <div className="text-sm font-semibold text-green-400">{aiPrediction.confidence}%</div>
                  </div>
                </div>

                <div className="mt-3 w-full bg-white/10 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${aiPrediction.confidence}%` } : {}}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Performance Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">성과 타임라인</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500" />
            
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="relative flex items-center gap-6"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg" />
                  
                  {/* Event Content */}
                  <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">{event.event}</div>
                        <div className="text-white/60 text-sm">{event.date}</div>
                      </div>
                      
                      <div className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                        {event.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Ticker */}
      <LiveTicker isActive={inView} />
    </section>
  );
};

export default LiveDashboard;