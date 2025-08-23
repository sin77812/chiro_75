'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapPoint {
  id: number;
  x: number;
  y: number;
  company: string;
  industry: string;
  achievement: string;
  growth: number;
  color: string;
}

interface PerformanceMapProps {
  isActive: boolean;
}

const PerformanceMap = ({ isActive }: PerformanceMapProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);
  const [activePoints, setActivePoints] = useState<MapPoint[]>([]);

  const mapPoints: MapPoint[] = [
    {
      id: 1,
      x: 45,
      y: 35,
      company: 'TechCorp',
      industry: '핀테크',
      achievement: '전환율 340% 증가',
      growth: 340,
      color: '#2E7D32'
    },
    {
      id: 2,
      x: 55,
      y: 42,
      company: 'HealthPlus',
      industry: '헬스케어',
      achievement: '사용자 증가 280%',
      growth: 280,
      color: '#388E3C'
    },
    {
      id: 3,
      x: 38,
      y: 48,
      company: 'EduTech',
      industry: '에듀테크',
      achievement: '매출 성장 450%',
      growth: 450,
      color: '#43A047'
    },
    {
      id: 4,
      x: 62,
      y: 38,
      company: 'RetailMax',
      industry: 'e커머스',
      achievement: '트래픽 증가 180%',
      growth: 180,
      color: '#4CAF50'
    },
    {
      id: 5,
      x: 48,
      y: 52,
      company: 'FoodChain',
      industry: '푸드테크',
      achievement: '주문량 증가 220%',
      growth: 220,
      color: '#66BB6A'
    },
    {
      id: 6,
      x: 52,
      y: 32,
      company: 'PropTech',
      industry: '부동산',
      achievement: '문의량 증가 160%',
      growth: 160,
      color: '#81C784'
    }
  ];

  useEffect(() => {
    if (!isActive) return;

    // 점진적으로 포인트 활성화
    const activatePoints = async () => {
      for (let i = 0; i < mapPoints.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setActivePoints(prev => [...prev, mapPoints[i]]);
      }
    };

    activatePoints();
  }, [isActive]);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        {/* Korea SVG Outline */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full opacity-10"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M35 25 Q40 20 50 22 Q60 25 65 35 Q70 45 68 55 Q65 65 60 70 Q55 75 45 78 Q35 75 30 65 Q25 55 28 45 Q30 35 35 25 Z"
            stroke="rgba(46, 125, 50, 0.2)"
            strokeWidth="0.5"
            fill="rgba(46, 125, 50, 0.05)"
          />
        </svg>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 125, 50, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 125, 50, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <h3 className="text-xl font-bold text-white mb-2">실시간 성과 맵</h3>
        <p className="text-sm text-white/60">전국 고객사들의 성과 현황</p>
      </div>

      {/* Legend */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-black/60 backdrop-blur-lg rounded-lg p-3 border border-white/10">
          <div className="text-xs text-white/60 mb-2">성장률</div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-white/80">150%+</span>
          </div>
        </div>
      </div>

      {/* Performance Points */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {activePoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ 
                left: `${point.x}%`, 
                top: `${point.y}%` 
              }}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Main Point */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.2 }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3
                }}
              >
                {/* Pulse Effect */}
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border"
                      style={{ 
                        borderColor: point.color,
                        borderWidth: '2px'
                      }}
                      animate={{
                        scale: [1, 2, 3],
                        opacity: [0.8, 0.2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </div>
                
                {/* Core Point */}
                <div
                  className="w-4 h-4 rounded-full relative z-10 shadow-lg"
                  style={{ 
                    backgroundColor: point.color,
                    boxShadow: `0 0 20px ${point.color}60`
                  }}
                >
                  {/* Inner Glow */}
                  <div
                    className="absolute inset-1 rounded-full opacity-80"
                    style={{ 
                      backgroundColor: point.color,
                      filter: 'brightness(1.5)'
                    }}
                  />
                </div>
              </motion.div>

              {/* Growth Indicator */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg rounded-lg px-2 py-1 border border-white/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index * 0.1) + 0.5 }}
              >
                <span 
                  className="text-xs font-bold"
                  style={{ color: point.color }}
                >
                  +{point.growth}%
                </span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute z-30 transform -translate-x-1/2"
            style={{ 
              left: `${hoveredPoint.x}%`, 
              top: `${hoveredPoint.y - 15}%` 
            }}
          >
            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-[250px] shadow-2xl">
              {/* Company Header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: hoveredPoint.color }}
                />
                <div>
                  <div className="text-white font-semibold">{hoveredPoint.company}</div>
                  <div className="text-white/60 text-xs">{hoveredPoint.industry}</div>
                </div>
              </div>

              {/* Achievement */}
              <div className="mb-3">
                <div 
                  className="text-lg font-bold mb-1"
                  style={{ color: hoveredPoint.color }}
                >
                  {hoveredPoint.achievement}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="text-white/60">성장률</div>
                  <div className="text-white font-semibold">+{hoveredPoint.growth}%</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="text-white/60">업계</div>
                  <div className="text-white font-semibold">{hoveredPoint.industry}</div>
                </div>
              </div>

              {/* Arrow */}
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                style={{ borderTopColor: 'rgba(0, 0, 0, 0.9)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {activePoints.map((point, index) => {
          if (index === 0) return null;
          const prevPoint = activePoints[index - 1];
          return (
            <motion.line
              key={`line-${point.id}`}
              x1={`${prevPoint.x}%`}
              y1={`${prevPoint.y}%`}
              x2={`${point.x}%`}
              y2={`${point.y}%`}
              stroke="rgba(46, 125, 50, 0.2)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            />
          );
        })}
      </svg>

      {/* Stats Summary */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <div className="bg-black/60 backdrop-blur-lg rounded-xl p-4 border border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">{activePoints.length}</div>
              <div className="text-xs text-white/60">활성 프로젝트</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {Math.round(activePoints.reduce((sum, p) => sum + p.growth, 0) / activePoints.length || 0)}%
              </div>
              <div className="text-xs text-white/60">평균 성장률</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">98%</div>
              <div className="text-xs text-white/60">고객 만족도</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMap;