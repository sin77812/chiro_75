'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
  isActive?: boolean;
}

const ParticleSystem = ({ mousePosition, isActive = true }: ParticleSystemProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 파티클 색상 팔레트 (다크그린 계열)
  const colors = [
    'rgba(46, 125, 50, 0.8)',    // 다크그린
    'rgba(56, 142, 60, 0.6)',    // 미디엄그린
    'rgba(76, 175, 80, 0.4)',    // 라이트그린
    'rgba(129, 199, 132, 0.3)',  // 연한그린
  ];

  useEffect(() => {
    const updateDimensions = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const createParticle = (x?: number, y?: number): Particle => {
    const startX = x || Math.random() * dimensions.width;
    const startY = y || dimensions.height + 10;
    
    return {
      x: startX,
      y: startY,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 120 + 60,
    };
  };

  const updateParticle = (particle: Particle, ctx: CanvasRenderingContext2D) => {
    // 마우스 위치에 따른 인력 효과
    const dx = mousePosition.x - particle.x;
    const dy = mousePosition.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      particle.vx += (dx / distance) * force * 0.1;
      particle.vy += (dy / distance) * force * 0.1;
    }

    // 위치 업데이트
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life++;

    // 생명주기에 따른 투명도 조절
    const lifeRatio = particle.life / particle.maxLife;
    particle.opacity = Math.sin(lifeRatio * Math.PI) * 0.8;

    // 파티클 그리기
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // 글로우 효과
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = particle.size * 2;
    ctx.fill();
    ctx.restore();

    // 파티클 연결 라인 (가까운 파티클들 연결)
    particlesRef.current.forEach(otherParticle => {
      if (particle !== otherParticle) {
        const dx2 = particle.x - otherParticle.x;
        const dy2 = particle.y - otherParticle.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (distance2 < 80) {
          ctx.save();
          ctx.globalAlpha = (80 - distance2) / 80 * 0.1;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    });

    return particle.life < particle.maxLife && 
           particle.x > -50 && particle.x < dimensions.width + 50 && 
           particle.y > -50;
  };

  useEffect(() => {
    if (!isActive || !dimensions.width) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 초기 파티클 생성
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 파티클 업데이트 및 그리기
      particlesRef.current = particlesRef.current.filter(particle => 
        updateParticle(particle, ctx)
      );

      // 새 파티클 생성 (확률적)
      if (Math.random() < 0.1 && particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle());
      }

      // 마우스 주변 특수 파티클 생성
      if (Math.random() < 0.05) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50 + 20;
        const x = mousePosition.x + Math.cos(angle) * radius;
        const y = mousePosition.y + Math.sin(angle) * radius;
        particlesRef.current.push(createParticle(x, y));
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      particlesRef.current = [];
    };
  }, [dimensions, mousePosition, isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleSystem;