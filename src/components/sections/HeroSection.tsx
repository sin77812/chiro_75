'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleSystem from '../hero/ParticleSystem';
import PerformanceOrb from '../hero/PerformanceOrb';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isTyping, setIsTyping] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -100]);
  
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false // 우선 트리거를 false로 해서 항상 보이게 함
  });

  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const ctaControls = useAnimation();

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 진입 애니메이션 시퀀스
  useEffect(() => {
    if (inView) {
      const sequence = async () => {
        // 타이틀 글자별 애니메이션
        await titleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: 'easeOut' }
        });

        // 서브타이틀
        await subtitleControls.start({
          opacity: 1,
          transition: { duration: 0.6, delay: 0.2 }
        });

        // CTA 버튼
        await ctaControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, delay: 0.3 }
        });
      };

      sequence();
    }
  }, [inView, titleControls, subtitleControls, ctaControls]);

  // 타이핑 효과를 위한 텍스트 분할
  const mainText = "코드가 아닌 성과를 팝니다";
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  };

  // 스포트라이트 그라디언트 스타일
  const spotlightStyle = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
      rgba(46, 125, 50, 0.1) 0%, 
      rgba(46, 125, 50, 0.05) 20%, 
      transparent 50%)`
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 1: Background System */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0014] to-[#0F1F0F]" />
        
        {/* Animated Grid Pattern */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 125, 50, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 125, 50, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Layer 2: Interactive Elements */}
      <div className="absolute inset-0">
        {/* Particle System */}
        <ParticleSystem mousePosition={mousePosition} isActive={inView} />
        
        {/* Mouse Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={spotlightStyle}
        />
        
        {/* WebGL Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(46, 125, 50, 0.1) 0%, transparent 70%)`,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                filter: 'blur(20px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 3: Performance Orbs */}
      <PerformanceOrb
        type="conversion"
        position="top-left"
        mousePosition={mousePosition}
        isVisible={inView}
        delay={1200}
      />
      <PerformanceOrb
        type="retention"
        position="top-right"
        mousePosition={mousePosition}
        isVisible={inView}
        delay={1400}
      />
      <PerformanceOrb
        type="projects"
        position="bottom-left"
        mousePosition={mousePosition}
        isVisible={inView}
        delay={1600}
      />
      <PerformanceOrb
        type="partnership"
        position="bottom-right"
        mousePosition={mousePosition}
        isVisible={inView}
        delay={1800}
      />

      {/* Layer 4: Main Content */}
      <motion.div 
        ref={inViewRef}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
        style={{ y }}
      >
        {/* Main Headline with Letter Animation */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {mainText.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-green-100 leading-[1.1] tracking-[-0.03em]"
                style={{
                  textShadow: '0 0 30px rgba(46, 125, 50, 0.3)',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))'
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: char === ' ' ? 0 : Math.random() * 10 - 5,
                  transition: { duration: 0.2 }
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Sub Headline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={subtitleControls}
          className="text-lg md:text-xl lg:text-2xl text-white/70 font-normal max-w-[600px] mx-auto mb-12"
        >
          CHIRO는 웹사이트가 아닌<br className="md:hidden" />
          비즈니스 성장을 설계합니다
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ctaControls}
          className="relative"
        >
          <motion.button 
            className="group relative px-10 py-5 rounded-xl overflow-hidden font-semibold text-lg text-white"
            style={{
              background: 'linear-gradient(45deg, #2E7D32, #388E3C, #2E7D32)',
              backgroundSize: '200% 200%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(46, 125, 50, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">성장 전략 미팅 예약</span>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl"
                animate={{
                  scale: [1, 2],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity
                }}
              />
            </div>
            
            {/* Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-green-400/50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.button>
        </motion.div>

        {/* Code Typing Background Effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 font-mono text-xs text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              const performance = &#123; conversion: +340%, retention: 98% &#125;;
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-white/40 uppercase tracking-widest">SCROLL</span>
          <motion.div
            className="w-6 h-10 border border-white/20 rounded-full flex justify-center"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/40 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;