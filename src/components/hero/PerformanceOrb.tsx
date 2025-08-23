'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface PerformanceOrbProps {
  type: 'conversion' | 'retention' | 'projects' | 'partnership';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  mousePosition: { x: number; y: number };
  isVisible: boolean;
  delay: number;
}

interface OrbData {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  color: string;
  duration?: number;
}

const PerformanceOrb = ({ type, position, mousePosition, isVisible, delay }: PerformanceOrbProps) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const orbData: Record<string, OrbData> = {
    conversion: {
      label: '평균 전환율',
      value: 340,
      suffix: '%',
      prefix: '+',
      color: '#2E7D32',
      duration: 2000
    },
    retention: {
      label: '재계약률',
      value: 98,
      suffix: '%',
      color: '#388E3C',
      duration: 1500
    },
    projects: {
      label: '완료 프로젝트',
      value: 150,
      suffix: '+',
      color: '#43A047',
      duration: 1800
    },
    partnership: {
      label: '평균 파트너십',
      value: 5,
      suffix: '년',
      color: '#4CAF50',
      duration: 1000
    }
  };

  const data = orbData[type];

  const positionStyles = {
    'top-left': { top: '15%', left: '10%' },
    'top-right': { top: '15%', right: '10%' },
    'bottom-left': { bottom: '20%', left: '10%' },
    'bottom-right': { bottom: '20%', right: '10%' }
  };

  // 마우스 위치에 따른 3D 회전 계산
  const tiltX = (mousePosition.y - 0.5) * 15;
  const tiltY = -(mousePosition.x - 0.5) * 15;

  // 차트 그리기 (conversion type용)
  const drawChart = (canvas: HTMLCanvasElement, progress: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 25;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (type === 'conversion') {
      // 상승 차트 그리기
      const points = [];
      for (let i = 0; i <= 10; i++) {
        const x = (canvas.width / 10) * i;
        const baseY = canvas.height * 0.7;
        const y = baseY - (Math.sin((i / 10) * Math.PI * 0.5) * canvas.height * 0.4 * progress);
        points.push({ x, y });
      }

      ctx.strokeStyle = data.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();

      // 포인트 그리기
      points.forEach((point, index) => {
        if (index <= points.length * progress) {
          ctx.fillStyle = data.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    } else if (type === 'retention') {
      // 원형 프로그레스 바
      const endAngle = (progress * 2 * Math.PI) - (Math.PI / 2);

      // 배경 원
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 프로그레스 원
      ctx.strokeStyle = data.color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle);
      ctx.stroke();

      // 100% 달성 시 파티클 효과
      if (progress >= 0.98) {
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * (radius + 10);
          const y = centerY + Math.sin(angle) * (radius + 10);
          
          ctx.fillStyle = data.color;
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    } else if (type === 'projects') {
      // 체크마크 애니메이션
      const checkProgress = Math.min(progress * 3, 1);
      const numChecks = Math.floor(checkProgress * 9);
      
      for (let i = 0; i < 9; i++) {
        const x = (i % 3) * 20 + 20;
        const y = Math.floor(i / 3) * 15 + 15;
        
        if (i < numChecks) {
          ctx.strokeStyle = data.color;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(x - 4, y);
          ctx.lineTo(x - 1, y + 3);
          ctx.lineTo(x + 4, y - 2);
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  };

  // 숫자 카운팅 애니메이션
  useEffect(() => {
    if (!isVisible || isAnimating) return;

    setIsAnimating(true);
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (data.duration || 2000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCurrentValue(Math.floor(data.value * easeOutQuart));

      // 캔버스 업데이트
      if (canvasRef.current) {
        drawChart(canvasRef.current, easeOutQuart);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, data.value, data.duration, delay, isAnimating, type]);

  return (
    <motion.div
      ref={orbRef}
      className="absolute pointer-events-none hidden lg:block"
      style={positionStyles[position]}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={isVisible ? { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotateX: tiltX,
        rotateY: tiltY
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000,
        ease: 'easeOut'
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        {/* Glassmorphism Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 min-w-[200px]">
          {/* Glow Effect */}
          <div 
            className="absolute inset-0 rounded-3xl blur-xl opacity-20"
            style={{ 
              background: `linear-gradient(45deg, ${data.color}, transparent)`,
              animation: 'pulse 2s infinite'
            }}
          />
          
          <div className="relative z-10">
            {/* Chart Canvas */}
            <canvas
              ref={canvasRef}
              width={80}
              height={60}
              className="mx-auto mb-3"
            />
            
            {/* Label */}
            <div className="text-xs text-white/60 text-center mb-2">
              {data.label}
            </div>
            
            {/* Value */}
            <div 
              className="text-3xl font-bold text-center tabular-nums"
              style={{ color: data.color }}
            >
              {data.prefix}{currentValue}{data.suffix}
            </div>
          </div>
        </div>

        {/* Floating Animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            y: [0, -10, 0],
            rotateZ: [0, 1, 0, -1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </motion.div>
  );
};

export default PerformanceOrb;