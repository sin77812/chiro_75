'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectPhase {
  id: number;
  name: string;
  time: string;
  angle: number;
  description: string;
  color: string;
  icon: string;
  details: string[];
}

interface ProjectView360Props {
  onPhaseSelect: (phase: ProjectPhase) => void;
  currentTime: number;
  videoDuration: number;
}

const ProjectView360 = ({ onPhaseSelect, currentTime, videoDuration }: ProjectView360Props) => {
  const [selectedPhase, setSelectedPhase] = useState<ProjectPhase | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const phases: ProjectPhase[] = [
    {
      id: 1,
      name: '기획',
      time: '0:00-0:30',
      angle: 0,
      description: '요구사항 분석 및 전략 수립',
      color: '#FF6B6B',
      icon: '🎯',
      details: [
        '사용자 리서치 및 페르소나 설정',
        'KPI 목표 설정 및 측정 방법 정의',
        '기술 스택 선정 및 아키텍처 설계',
        '프로젝트 일정 및 마일스톤 계획'
      ]
    },
    {
      id: 2,
      name: '디자인',
      time: '0:30-1:00',
      angle: 45,
      description: 'UX/UI 디자인 및 프로토타입',
      color: '#4ECDC4',
      icon: '🎨',
      details: [
        '와이어프레임 및 사용자 플로우 설계',
        'UI 컴포넌트 시스템 구축',
        '반응형 디자인 및 접근성 고려',
        'Figma 프로토타입 및 인터랙션 정의'
      ]
    },
    {
      id: 3,
      name: '개발',
      time: '1:00-1:30',
      angle: 90,
      description: '프론트엔드 및 백엔드 개발',
      color: '#45B7D1',
      icon: '⚡',
      details: [
        'Next.js 기반 프론트엔드 구현',
        'API 설계 및 백엔드 로직 개발',
        '데이터베이스 설계 및 최적화',
        '성능 최적화 및 SEO 구현'
      ]
    },
    {
      id: 4,
      name: '테스트',
      time: '1:30-2:00',
      angle: 135,
      description: '품질 보증 및 버그 수정',
      color: '#96CEB4',
      icon: '🔍',
      details: [
        '단위 테스트 및 통합 테스트',
        '크로스 브라우저 호환성 검증',
        '성능 테스트 및 로드 테스트',
        '보안 취약점 검사 및 개선'
      ]
    },
    {
      id: 5,
      name: '런칭',
      time: '2:00-2:30',
      angle: 180,
      description: '배포 및 운영 환경 구축',
      color: '#FFEAA7',
      icon: '🚀',
      details: [
        'CI/CD 파이프라인 구축',
        '프로덕션 환경 배포',
        '도메인 연결 및 SSL 인증서 설정',
        '모니터링 시스템 구축'
      ]
    },
    {
      id: 6,
      name: '성과',
      time: '2:30-3:00',
      angle: 225,
      description: '성과 측정 및 분석',
      color: '#DDA0DD',
      icon: '📈',
      details: [
        'Google Analytics 및 태그 매니저 설정',
        '전환율 및 사용자 행동 분석',
        '성과 지표 대시보드 구축',
        'A/B 테스트 및 개선안 도출'
      ]
    },
    {
      id: 7,
      name: '개선',
      time: '3:00-3:30',
      angle: 270,
      description: '데이터 기반 최적화',
      color: '#74B9FF',
      icon: '🔧',
      details: [
        '사용자 피드백 수집 및 분석',
        'UX 개선 및 기능 추가',
        '성능 모니터링 및 최적화',
        '보안 업데이트 및 패치'
      ]
    },
    {
      id: 8,
      name: '스케일',
      time: '3:30-4:00',
      angle: 315,
      description: '확장 및 성장 전략',
      color: '#FD79A8',
      icon: '📊',
      details: [
        'CDN 및 캐싱 전략 최적화',
        '마이크로서비스 아키텍처 전환',
        '글로벌 시장 진출 준비',
        '자동화 및 스케일링 구현'
      ]
    }
  ];

  const getCurrentPhase = () => {
    const progress = (currentTime / videoDuration) * 100;
    const phaseIndex = Math.floor((progress / 100) * phases.length);
    return phases[phaseIndex] || phases[0];
  };

  const handlePhaseClick = (phase: ProjectPhase) => {
    setSelectedPhase(phase);
    onPhaseSelect(phase);
  };

  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 360도 원형 타임라인 */}
      <div ref={containerRef} className="relative w-[300px] h-[300px] mx-auto">
        {/* 중앙 원 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="text-white text-xs font-bold text-center">
            <div>CHIRO</div>
            <div>PROJECT</div>
          </div>
        </div>

        {/* 배경 원 */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
          />
          
          {/* 진행률 표시 */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(currentTime / videoDuration) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
            className="transition-all duration-300"
          />
          
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#2196F3" />
            </linearGradient>
          </defs>
        </svg>

        {/* 페이즈 포인트들 */}
        {phases.map((phase) => {
          const x = centerX + radius * Math.cos((phase.angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((phase.angle * Math.PI) / 180);
          const isActive = getCurrentPhase().id === phase.id;
          const isHovered = hoveredPhase === phase.id;

          return (
            <motion.div
              key={phase.id}
              className="absolute cursor-pointer"
              style={{
                left: x - 20,
                top: y - 20,
                width: 40,
                height: 40
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredPhase(phase.id)}
              onMouseLeave={() => setHoveredPhase(null)}
              onClick={() => handlePhaseClick(phase)}
            >
              {/* 포인트 */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  isActive 
                    ? 'ring-4 ring-white/50 shadow-lg transform scale-110' 
                    : 'hover:ring-2 hover:ring-white/30'
                }`}
                style={{ 
                  backgroundColor: phase.color,
                  boxShadow: isActive ? `0 0 20px ${phase.color}60` : 'none'
                }}
              >
                <span className="text-white text-sm">{phase.icon}</span>
              </div>

              {/* 호버 시 라벨 */}
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg rounded-lg p-2 border border-white/20 min-w-max z-10"
                  >
                    <div className="text-white font-semibold text-sm">{phase.name}</div>
                    <div className="text-white/70 text-xs">{phase.time}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* 연결선들 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {phases.map((phase, index) => {
            const nextPhase = phases[(index + 1) % phases.length];
            const x1 = centerX + (radius - 15) * Math.cos((phase.angle * Math.PI) / 180);
            const y1 = centerY + (radius - 15) * Math.sin((phase.angle * Math.PI) / 180);
            const x2 = centerX + (radius - 15) * Math.cos((nextPhase.angle * Math.PI) / 180);
            const y2 = centerY + (radius - 15) * Math.sin((nextPhase.angle * Math.PI) / 180);

            return (
              <line
                key={`line-${phase.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            );
          })}
        </svg>
      </div>

      {/* 선택된 페이즈 상세 정보 */}
      <AnimatePresence>
        {selectedPhase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 bg-black/60 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: selectedPhase.color }}
              >
                <span className="text-white text-sm">{selectedPhase.icon}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{selectedPhase.name}</h3>
                <p className="text-white/60 text-sm">{selectedPhase.time}</p>
              </div>
            </div>

            <p className="text-white/80 mb-4">{selectedPhase.description}</p>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">세부 작업</h4>
              {selectedPhase.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedPhase(null)}
              className="mt-4 text-white/60 hover:text-white text-sm transition-colors"
            >
              닫기 ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 진행률 표시 */}
      <div className="mt-4 text-center">
        <div className="text-white/60 text-sm mb-2">프로젝트 진행률</div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
            style={{ width: `${(currentTime / videoDuration) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-white/80 text-sm mt-2">
          {Math.round((currentTime / videoDuration) * 100)}% 완료
        </div>
      </div>
    </div>
  );
};

export default ProjectView360;