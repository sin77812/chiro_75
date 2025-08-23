'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  day: number;
  task: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
}

interface ComparisonTimelineProps {
  isActive: boolean;
}

const ComparisonTimeline = ({ isActive }: ComparisonTimelineProps) => {
  const [chiroProgress, setChiroProgress] = useState(0);
  const [competitorProgress, setCompetitorProgress] = useState(0);

  const chiroTimeline: TimelineItem[] = [
    {
      day: 1,
      task: '킥오프 미팅',
      status: 'completed',
      description: '프로젝트 목표 설정'
    },
    {
      day: 3,
      task: '프로토타입 완성',
      status: 'completed',
      description: '핵심 기능 구현'
    },
    {
      day: 7,
      task: '1차 완성본',
      status: 'completed',
      description: '전체 기능 테스트'
    },
    {
      day: 14,
      task: '런칭 완료',
      status: 'completed',
      description: '배포 및 모니터링'
    }
  ];

  const competitorTimeline: TimelineItem[] = [
    {
      day: 7,
      task: '첫 번째 미팅',
      status: 'completed',
      description: '요구사항 논의'
    },
    {
      day: 14,
      task: '두 번째 미팅',
      status: 'completed',
      description: '추가 요구사항'
    },
    {
      day: 21,
      task: '세 번째 미팅',
      status: 'completed',
      description: '최종 요구사항 확정'
    },
    {
      day: 56,
      task: '기획 완료',
      status: 'in-progress',
      description: '상세 기획서 작성'
    },
    {
      day: 112,
      task: '디자인 완료',
      status: 'pending',
      description: '디자인 시안 제작'
    },
    {
      day: 168,
      task: '개발 완료',
      status: 'pending',
      description: '실제 개발 시작'
    }
  ];

  useEffect(() => {
    if (!isActive) return;

    // CHIRO 타임라인 애니메이션 (빠르게)
    const chiroInterval = setInterval(() => {
      setChiroProgress(prev => {
        if (prev >= 100) {
          clearInterval(chiroInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // 경쟁사 타임라인 애니메이션 (느리게)
    const competitorInterval = setInterval(() => {
      setCompetitorProgress(prev => {
        if (prev >= 30) { // 30%에서 멈춤 (아직 진행중)
          clearInterval(competitorInterval);
          return 30;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => {
      clearInterval(chiroInterval);
      clearInterval(competitorInterval);
    };
  }, [isActive]);

  const TimelineSection = ({ 
    title, 
    timeline, 
    progress, 
    color,
    side 
  }: { 
    title: string;
    timeline: TimelineItem[];
    progress: number;
    color: string;
    side: 'left' | 'right';
  }) => (
    <div className={`flex-1 ${side === 'right' ? 'pl-8' : 'pr-8'}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-2 text-sm text-white/60">{progress.toFixed(0)}% 완료</div>
      </div>

      <div className="space-y-6">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* 타임라인 도트 */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div 
                  className={`w-4 h-4 rounded-full border-2 ${
                    item.status === 'completed' 
                      ? 'bg-green-500 border-green-500' 
                      : item.status === 'in-progress'
                      ? 'bg-yellow-500 border-yellow-500 animate-pulse'
                      : 'bg-gray-600 border-gray-600'
                  }`}
                />
                {index < timeline.length - 1 && (
                  <div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-12"
                    style={{ 
                      backgroundColor: item.status === 'completed' ? color : '#374151'
                    }}
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{item.task}</h4>
                  <span className="text-xs text-white/60 bg-black/30 px-2 py-1 rounded">
                    Day {item.day}
                  </span>
                </div>
                <p className="text-white/70 text-sm">{item.description}</p>

                {item.status === 'completed' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2"
                  >
                    <span className="inline-flex items-center text-xs text-green-400">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      완료
                    </span>
                  </motion.div>
                )}

                {item.status === 'in-progress' && (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mt-2"
                  >
                    <span className="inline-flex items-center text-xs text-yellow-400">
                      <div className="w-3 h-3 mr-1 bg-yellow-400 rounded-full animate-pulse" />
                      진행중
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 하단 요약 */}
      <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold mb-1" style={{ color }}>
            {side === 'left' ? '14일' : '168일+'}
          </div>
          <div className="text-white/60 text-sm">
            {side === 'left' ? '완료까지 소요시간' : '현재까지 소요시간'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative py-16 bg-gradient-to-b from-black/50 to-gray-900/50">
      <div className="container mx-auto px-6">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            속도가 경쟁력입니다
          </h2>
          <p className="text-xl text-white/70">
            같은 결과, 다른 속도 - 이것이 CHIRO의 차별점입니다
          </p>
        </motion.div>

        {/* 비교 타임라인 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* 중앙 VS 라인 */}
            <div className="absolute left-1/2 top-0 bottom-0 hidden md:flex items-center justify-center">
              <div className="bg-gradient-to-b from-green-500 to-red-500 w-1 h-full rounded-full opacity-20" />
              <div className="absolute bg-black/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
                <span className="text-white font-bold text-lg">VS</span>
              </div>
            </div>

            {/* CHIRO 타임라인 */}
            <TimelineSection
              title="CHIRO 방식"
              timeline={chiroTimeline}
              progress={chiroProgress}
              color="#2E7D32"
              side="left"
            />

            {/* 경쟁사 타임라인 */}
            <TimelineSection
              title="일반 에이전시"
              timeline={competitorTimeline}
              progress={competitorProgress}
              color="#dc2626"
              side="right"
            />
          </div>
        </div>

        {/* 하단 성과 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-green-900/30 to-green-700/30 rounded-2xl p-6 border border-green-500/20">
            <div className="text-green-400 text-3xl font-bold mb-2">12x</div>
            <div className="text-white font-semibold mb-1">더 빠른 런칭</div>
            <div className="text-white/60 text-sm">14일 vs 168일</div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/30 rounded-2xl p-6 border border-blue-500/20">
            <div className="text-blue-400 text-3xl font-bold mb-2">85%</div>
            <div className="text-white font-semibold mb-1">비용 절약</div>
            <div className="text-white/60 text-sm">효율적 프로세스</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 rounded-2xl p-6 border border-purple-500/20">
            <div className="text-purple-400 text-3xl font-bold mb-2">100%</div>
            <div className="text-white font-semibold mb-1">투명성</div>
            <div className="text-white/60 text-sm">실시간 진행상황</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonTimeline;