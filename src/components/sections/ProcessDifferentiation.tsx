'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProcessCube from '../process/ProcessCube';
import ComparisonTimeline from '../process/ComparisonTimeline';
import LiveCodeEditor from '../process/LiveCodeEditor';

const ProcessDifferentiation = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedFace, setSelectedFace] = useState(0);
  const [viewMode, setViewMode] = useState<'business' | 'developer'>('business');
  const [typingIndex, setTypingIndex] = useState(0);

  const mainTitle = "2주가 6개월을 이긴다";
  const subtitle = "CHIRO의 혁신적 프로세스";

  // 타이핑 효과용 텍스트 처리
  const renderTypingText = (text: string, highlight: string[]) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.05 }}
        className={`${
          highlight.some(word => text.includes(word) && text.indexOf(word) <= index && index < text.indexOf(word) + word.length)
            ? 'text-green-400 font-bold'
            : 'text-white'
        }`}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20">
      {/* 배경 시계 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-green-400">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2"/>
            {Array.from({length: 12}, (_, i) => (
              <line
                key={i}
                x1="50"
                y1="5"
                x2="50"
                y2="15"
                stroke="currentColor"
                strokeWidth="1"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 opacity-3"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="50" y1="50" x2="50" y2="25" stroke="currentColor" strokeWidth="3"/>
            <line x1="50" y1="50" x2="65" y2="65" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {renderTypingText(mainTitle, ['2주', '6개월'])}
          </h2>
          
          <motion.p 
            className="text-2xl md:text-3xl text-white/70"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* 모드 스위치 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-black/50 backdrop-blur-lg rounded-full p-1 border border-white/20">
            <button
              onClick={() => setViewMode('business')}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                viewMode === 'business' 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              일반 모드
            </button>
            <button
              onClick={() => setViewMode('developer')}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                viewMode === 'developer' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              개발자 모드
            </button>
          </div>
        </motion.div>

        {/* 메인 컨텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* 3D 프로세스 큐브 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                인터랙티브 프로세스 큐브
              </h3>
              <ProcessCube
                isActive={inView}
                onFaceSelect={setSelectedFace}
                selectedFace={selectedFace}
              />
            </div>
          </motion.div>

          {/* 라이브 코드 에디터 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center">
                실시간 코드 작성
              </h3>
              <LiveCodeEditor isActive={inView} mode={viewMode} />
            </div>
          </motion.div>
        </div>

        {/* 차별점 하이라이트 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              우리가 다른 이유
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">⚡</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">속도</h4>
                <p className="text-white/70">2주 스프린트로 빠른 결과</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🔍</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">투명성</h4>
                <p className="text-white/70">실시간 진행상황 공유</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">기술력</h4>
                <p className="text-white/70">최신 기술과 최적화</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 프로세스 설명 카드들 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {[
            { 
              title: "스마트 자동화", 
              desc: "반복작업 AI 자동화로 개발시간 50% 단축",
              icon: "🤖",
              color: "from-purple-500 to-pink-500"
            },
            { 
              title: "실시간 협업", 
              desc: "Figma, Slack 연동으로 즉시 피드백",
              icon: "💬",
              color: "from-blue-500 to-cyan-500"
            },
            { 
              title: "성능 모니터링", 
              desc: "배포 후에도 지속적 성능 최적화",
              icon: "📊",
              color: "from-green-500 to-emerald-500"
            },
            { 
              title: "무제한 수정", 
              desc: "완벽할 때까지 무제한 수정 지원",
              icon: "🔄",
              color: "from-orange-500 to-red-500"
            },
            { 
              title: "글로벌 배포", 
              desc: "전세계 CDN으로 어디서나 빠른 속도",
              icon: "🌍",
              color: "from-indigo-500 to-purple-500"
            },
            { 
              title: "보안 강화", 
              desc: "Enterprise급 보안으로 안전한 서비스",
              icon: "🛡️",
              color: "from-teal-500 to-blue-500"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-xl">{item.icon}</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 비교 타임라인 (전체 너비) */}
      <ComparisonTimeline isActive={inView} />
    </section>
  );
};

export default ProcessDifferentiation;