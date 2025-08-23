'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PerformanceCard from '../hero/PerformanceCard';
import CountUpNumber from '../hero/CountUpNumber';

const FFHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const performanceData = [
    {
      label: '평균 전환율',
      value: 340,
      suffix: '%',
      prefix: '+',
      icon: '📈',
      delay: 0.2
    },
    {
      label: '재계약률',
      value: 98,
      suffix: '%',
      icon: '✓',
      delay: 0.3
    },
    {
      label: '프로젝트',
      value: 150,
      suffix: '+',
      icon: '📁',
      delay: 0.4
    },
    {
      label: '파트너십',
      value: 5,
      suffix: '년',
      icon: '🤝',
      delay: 0.5,
      duration: 1
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F0F] to-[#1A2F1A]" />
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(46,125,50,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,125,50,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main Content */}
      <motion.div 
        ref={containerRef}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
        style={{ y }}
      >
        {/* Performance Cards */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Card */}
          <PerformanceCard
            data={performanceData[0]}
            position="top-left"
            mousePosition={mousePosition}
            inView={inView}
          />
          
          {/* Top Right Card */}
          <PerformanceCard
            data={performanceData[1]}
            position="top-right"
            mousePosition={mousePosition}
            inView={inView}
          />
          
          {/* Bottom Left Card - Desktop Only */}
          <div className="hidden md:block">
            <PerformanceCard
              data={performanceData[2]}
              position="bottom-left"
              mousePosition={mousePosition}
              inView={inView}
            />
          </div>
          
          {/* Bottom Right Card - Desktop Only */}
          <div className="hidden lg:block">
            <PerformanceCard
              data={performanceData[3]}
              position="bottom-right"
              mousePosition={mousePosition}
              inView={inView}
            />
          </div>
        </div>

        {/* Main Headline */}
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-[80px] font-bold text-white leading-[1.1] tracking-[-0.03em]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          코드가 아닌<br />
          성과를 팝니다
        </motion.h1>

        {/* Sub Headline */}
        <motion.p 
          className="mt-6 text-lg md:text-xl lg:text-2xl text-white/80 font-normal max-w-[600px] mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          CHIRO는 웹사이트가 아닌<br className="md:hidden" />
          비즈니스 성장을 설계합니다
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12"
        >
          <button className="group relative px-10 py-5 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(46,125,50,0.4)]">
            <span className="relative z-10">성장 전략 미팅 예약</span>
            
            {/* Ripple Effect Container */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-[#388E3C] to-[#2E7D32] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]" />
          </button>
        </motion.div>

        {/* Mobile Performance Cards (Horizontal Scroll) */}
        <div className="md:hidden mt-16 -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {performanceData.map((data, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <div className="bg-[#2E7D32]/10 backdrop-blur-md border border-[#2E7D32]/20 rounded-2xl p-5 min-w-[140px]">
                  <div className="text-2xl mb-2">{data.icon}</div>
                  <div className="text-xs text-white/60 mb-1">{data.label}</div>
                  <div className="text-2xl font-bold text-white">
                    {inView && (
                      <CountUpNumber
                        end={data.value}
                        prefix={data.prefix}
                        suffix={data.suffix}
                        duration={data.duration}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default FFHero;