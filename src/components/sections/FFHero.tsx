'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUpNumber from '../hero/CountUpNumber';

// Custom SVG Icons
const TrendIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" stroke="#2E7D32" strokeWidth="2" opacity="0.2"/>
    <path d="M8 20L13 15L17 19L24 12" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 12H24V17" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" stroke="#2E7D32" strokeWidth="2" opacity="0.2"/>
    <path d="M10 16.5L14 20.5L22 12.5" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" stroke="#2E7D32" strokeWidth="2" opacity="0.2"/>
    <path d="M9 13V22C9 22.5523 9.44772 23 10 23H22C22.5523 23 23 22.5523 23 22V12C23 11.4477 22.5523 11 22 11H16L14 9H10C9.44772 9 9 9.44772 9 10V13Z" 
      stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" stroke="#2E7D32" strokeWidth="2" opacity="0.2"/>
    <path d="M12 17L14 15L18 19L20 17M9 14H11L15 10H17L23 16V20H21L17 16" 
      stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FFHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  const performanceData = [
    {
      label: '평균 전환율',
      value: 340,
      suffix: '%',
      prefix: '+',
      icon: <TrendIcon />,
      delay: 0.2
    },
    {
      label: '재계약률',
      value: 98,
      suffix: '%',
      icon: <CheckIcon />,
      delay: 0.3
    },
    {
      label: '프로젝트',
      value: 150,
      suffix: '+',
      icon: <FolderIcon />,
      delay: 0.4
    },
    {
      label: '파트너십',
      value: 5,
      suffix: '년',
      icon: <HandshakeIcon />,
      delay: 0.5,
      duration: 1
    }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log('Video autoplay failed:', e);
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/image/backgroundvod.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Main Content */}
      <motion.div 
        ref={containerRef}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full"
        style={{ y }}
      >
        {/* Main Headline */}
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-[80px] font-bold text-white leading-[1.1] tracking-[-0.03em] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          코드가 아닌<br />
          성과를 팝니다
        </motion.h1>

        {/* Sub Headline */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-white/90 font-normal max-w-[600px] mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          CHIRO는 웹사이트가 아닌<br className="md:hidden" />
          비즈니스 성장을 설계합니다
        </motion.p>

        {/* Performance Cards - 4 Column Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {performanceData.map((data, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-3">{data.icon}</div>
                <div className="text-xs md:text-sm text-white/70 mb-2">{data.label}</div>
                <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
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
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
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