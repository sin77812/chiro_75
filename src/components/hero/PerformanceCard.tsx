'use client';

import { motion } from 'framer-motion';
import CountUpNumber from './CountUpNumber';

interface PerformanceCardProps {
  data: {
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    icon: string;
    delay?: number;
    duration?: number;
  };
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  mousePosition: { x: number; y: number };
  inView: boolean;
}

const PerformanceCard = ({ data, position, mousePosition, inView }: PerformanceCardProps) => {
  const positionStyles = {
    'top-left': 'top-20 left-0 lg:left-10',
    'top-right': 'top-20 right-0 lg:right-10',
    'bottom-left': 'bottom-20 left-0 lg:left-10',
    'bottom-right': 'bottom-20 right-0 lg:right-10'
  };

  const tiltX = mousePosition.y * 10;
  const tiltY = -mousePosition.x * 10;
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1.2 + (data.delay || 0),
        ease: 'easeOut'
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: data.delay || 0
    }
  };

  return (
    <motion.div
      className={`absolute ${positionStyles[position]} hidden md:block pointer-events-auto`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <motion.div
        className="relative group"
        animate={floatingAnimation}
        whileHover={{ scale: 1.05 }}
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="bg-[#2E7D32]/10 backdrop-blur-md border border-[#2E7D32]/20 rounded-2xl p-6 pr-8 transition-all duration-300 hover:bg-[#2E7D32]/15 hover:border-[#2E7D32]/30 hover:shadow-[0_8px_32px_rgba(46,125,50,0.2)]">
          <div className="flex items-start gap-4">
            <div className="text-3xl">{data.icon}</div>
            <div>
              <div className="text-sm text-white/60 mb-1">{data.label}</div>
              <div className="text-3xl font-bold text-white tabular-nums">
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
          </div>
        </div>
        
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#2E7D32]/30 to-[#388E3C]/30 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
      </motion.div>
    </motion.div>
  );
};

export default PerformanceCard;