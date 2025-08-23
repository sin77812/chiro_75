'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InteractiveVideoPlayer from '../video/InteractiveVideoPlayer';
import ProjectView360 from '../video/ProjectView360';

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2, // 20% 보일 때 트리거
    triggerOnce: true
  });

  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isSpotlightMode, setIsSpotlightMode] = useState(false);
  const [performanceData, setPerformanceData] = useState([
    { name: '트래픽', value: 0, color: '#2196F3' },
    { name: '전환율', value: 0, color: '#9C27B0' },
    { name: '매출', value: 0, color: '#4CAF50' }
  ]);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [showAiMode, setShowAiMode] = useState(false);

  const { scrollY } = useScroll();
  const spotlight = useTransform(scrollY, [0, 300], [0, 1]);

  // 비디오 시간에 따른 성과 데이터 업데이트
  useEffect(() => {
    if (!inView) return;

    const updatePerformanceData = () => {
      const progress = currentVideoTime / 240; // 4분 비디오 가정
      
      setPerformanceData([
        { 
          name: '트래픽', 
          value: Math.round(1000 + (progress * 15000)), 
          color: '#2196F3' 
        },
        { 
          name: '전환율', 
          value: Math.round(2.1 + (progress * 5.1)), 
          color: '#9C27B0' 
        },
        { 
          name: '매출', 
          value: Math.round(50000 + (progress * 200000)), 
          color: '#4CAF50' 
        }
      ]);

      // AI 분석 업데이트
      if (currentVideoTime > 60) {
        setAiAnalysis('이 시점에서 LCP가 70% 개선되었습니다');
      } else if (currentVideoTime > 120) {
        setAiAnalysis('모바일 최적화로 바운스율 50% 감소');
      } else if (currentVideoTime > 180) {
        setAiAnalysis('SEO 최적화로 검색 노출 300% 증가');
      }
    };

    updatePerformanceData();
  }, [currentVideoTime, inView]);

  // 스포트라이트 효과 - CHIRO는 처음에만 보이고 사라짐
  useEffect(() => {
    if (inView) {
      setIsSpotlightMode(true);
      const timer = setTimeout(() => {
        setIsSpotlightMode(false);
      }, 3000); // 3초 후 사라짐
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const techStack = [
    { name: 'Next.js 15', usage: 95, color: '#000000' },
    { name: 'TypeScript', usage: 90, color: '#3178C6' },
    { name: 'Tailwind CSS', usage: 85, color: '#06B6D4' },
    { name: 'Framer Motion', usage: 75, color: '#FF0055' },
    { name: 'Vercel', usage: 100, color: '#000000' },
    { name: 'Supabase', usage: 80, color: '#3ECF8E' }
  ];

  const handlePhaseSelect = (phase: any) => {
    // 해당 페이즈 시간으로 비디오 이동 로직
    console.log('Selected phase:', phase);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black py-20 overflow-hidden"
    >
      {/* 스포트라이트 오버레이 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: isSpotlightMode ? 20 : 5 }}
        animate={{
          background: isSpotlightMode 
            ? 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.9) 70%)'
            : 'transparent'
        }}
        transition={{ duration: isSpotlightMode ? 1 : 1.5, delay: isSpotlightMode ? 0 : 1 }}
      />

      {/* CHIRO 텍스트 - 자연스럽게 뒤로 가서 덮히게 */}
      <motion.div
        ref={ref}
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
        style={{ 
          zIndex: isSpotlightMode ? 30 : 5 
        }}
        initial={{ opacity: 0, scale: 2 }}
        animate={isSpotlightMode ? { 
          opacity: 1,
          scale: 1.2,
        } : { 
          opacity: 0.15, // 매우 투명하게
          scale: 0.8,
        }}
        transition={{ 
          opacity: { duration: isSpotlightMode ? 1 : 1.5, delay: isSpotlightMode ? 0 : 1.5 },
          scale: { duration: 1 }
        }}
      >
        <div className="w-full max-w-4xl text-center">
          <motion.div
            className="block text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-black text-white leading-none"
            animate={isSpotlightMode ? {
              textShadow: [
                '0 0 30px #1DB954',
                '0 0 45px #0FA765', 
                '0 0 60px #1DB954',
                '0 0 30px #0FA765'
              ]
            } : {}}
            transition={{ duration: 0.6, repeat: isSpotlightMode ? 3 : 0 }}
          >
            CHIRO
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 3.5 }} // CHIRO가 사라진 후 나타남
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            말이 아닌 결과로 보여드립니다
          </h2>
          <p className="text-xl text-white/70">
            실제 프로젝트 케이스와 성과를 직접 확인해보세요
          </p>
        </motion.div>

        {/* 메인 비디오 영역 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 4 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <InteractiveVideoPlayer
            videoSrc="/videos/case-study-demo.mp4"
            posterSrc="/images/video-poster.jpg"
            onTimeUpdate={setCurrentVideoTime}
            onPlay={() => console.log('Video started')}
            onPause={() => console.log('Video paused')}
          />
        </motion.div>

        {/* 하단 컨텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 360도 프로젝트 뷰 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 4.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                360° 프로젝트 뷰
              </h3>
              <ProjectView360
                onPhaseSelect={handlePhaseSelect}
                currentTime={currentVideoTime}
                videoDuration={240}
              />
            </div>
          </motion.div>

          {/* 성과 그래프 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                실시간 성과 그래프
              </h3>
              
              <div className="space-y-6">
                {performanceData.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{metric.name}</span>
                      <span 
                        className="font-bold text-lg"
                        style={{ color: metric.color }}
                      >
                        {metric.name === '매출' 
                          ? `₩${metric.value.toLocaleString()}` 
                          : metric.name === '전환율'
                          ? `${metric.value}%`
                          : metric.value.toLocaleString()
                        }
                      </span>
                    </div>
                    
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.color }}
                        animate={{ width: `${Math.min((metric.value / (index === 2 ? 250000 : index === 1 ? 10 : 16000)) * 100, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI 해설 모드 */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/70 text-sm">AI 해설</span>
                  <button
                    onClick={() => setShowAiMode(!showAiMode)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      showAiMode 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {showAiMode ? 'ON' : 'OFF'}
                  </button>
                </div>
                
                {showAiMode && aiAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">AI</span>
                      </div>
                      <p className="text-purple-300 text-sm">{aiAnalysis}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* 기술 스택 쇼케이스 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 5.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                이 프로젝트에 사용된 기술
              </h3>
              
              <div className="space-y-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 6 + index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{tech.name}</span>
                      <span className="text-white/60 text-sm">{tech.usage}%</span>
                    </div>
                    
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full transition-colors group-hover:brightness-110"
                        style={{ backgroundColor: tech.color }}
                        animate={{ width: `${tech.usage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 파이 차트 */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="w-32 h-32 mx-auto relative">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {techStack.map((tech, index) => {
                      const total = techStack.reduce((sum, t) => sum + t.usage, 0);
                      const percentage = (tech.usage / total) * 100;
                      const offset = techStack.slice(0, index).reduce((sum, t) => sum + (t.usage / total) * 100, 0);
                      
                      return (
                        <circle
                          key={index}
                          cx="50"
                          cy="50"
                          r="15.915"
                          fill="transparent"
                          stroke={tech.color}
                          strokeWidth="8"
                          strokeDasharray={`${percentage} ${100 - percentage}`}
                          strokeDashoffset={-offset}
                          className="transition-all duration-300 hover:stroke-width-10"
                        />
                      );
                    })}
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white font-bold text-xs">TECH</div>
                      <div className="text-white/60 text-xs">STACK</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 성과 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 6.5 }}
          className="mt-12 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-lg rounded-3xl border border-white/10 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">+340%</div>
              <div className="text-white/70">전환율 증가</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">0.8초</div>
              <div className="text-white/70">페이지 로딩속도</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">98점</div>
              <div className="text-white/70">모바일 성능 점수</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">3주</div>
              <div className="text-white/70">완성까지 소요시간</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;