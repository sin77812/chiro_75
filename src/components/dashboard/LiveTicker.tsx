'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TickerNotification {
  id: number;
  company: string;
  message: string;
  icon: string;
  color: string;
  timestamp: number;
}

interface LiveTickerProps {
  isActive: boolean;
}

const LiveTicker = ({ isActive }: LiveTickerProps) => {
  const [notifications, setNotifications] = useState<TickerNotification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sampleNotifications = [
    {
      company: 'A사',
      message: '전환율 +12% 상승',
      icon: '🚀',
      color: '#2E7D32'
    },
    {
      company: 'B사', 
      message: '일일 방문자 10,000명 돌파',
      icon: '🎉',
      color: '#388E3C'
    },
    {
      company: 'C사',
      message: '해외 문의 +45% 증가',
      icon: '📈',
      color: '#43A047'
    },
    {
      company: 'D사',
      message: '페이지 로딩속도 70% 향상',
      icon: '⚡',
      color: '#4CAF50'
    },
    {
      company: 'E사',
      message: '모바일 전환율 +89% 개선',
      icon: '📱',
      color: '#66BB6A'
    },
    {
      company: 'F사',
      message: 'SEO 순위 TOP 3 진입',
      icon: '🏆',
      color: '#81C784'
    },
    {
      company: 'G사',
      message: '사용자 세션 시간 +156% 증가',
      icon: '⏱️',
      color: '#A5D6A7'
    },
    {
      company: 'H사',
      message: '신규 가입자 +234% 폭증',
      icon: '👥',
      color: '#C8E6C9'
    }
  ];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const notification = sampleNotifications[currentIndex % sampleNotifications.length];
      const newNotification: TickerNotification = {
        id: Date.now(),
        ...notification,
        timestamp: Date.now()
      };

      setNotifications(prev => {
        const updated = [...prev, newNotification].slice(-3); // 최대 3개까지만 유지
        return updated;
      });

      setCurrentIndex(prev => prev + 1);

      // 3초 후 자동 제거
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 3000);

    }, 3000);

    return () => clearInterval(interval);
  }, [isActive, currentIndex]);

  if (!isActive) return null;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 space-y-3">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ 
              opacity: 0, 
              x: -100, 
              scale: 0.8,
              rotateY: -15 
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              rotateY: 0 
            }}
            exit={{ 
              opacity: 0, 
              x: -100, 
              scale: 0.8,
              rotateY: 15
            }}
            transition={{ 
              duration: 0.5, 
              ease: 'easeOut',
              delay: index * 0.1
            }}
            className="relative"
          >
            {/* Toast Container */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 min-w-[280px] shadow-2xl">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-lg opacity-20"
                style={{ 
                  background: `linear-gradient(45deg, ${notification.color}, transparent)` 
                }}
              />
              
              <div className="relative z-10 flex items-center gap-3">
                {/* Icon with Pulse */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: 'easeInOut'
                  }}
                  className="text-2xl"
                >
                  {notification.icon}
                </motion.div>
                
                <div className="flex-1">
                  {/* Company Name */}
                  <div 
                    className="text-sm font-semibold mb-1"
                    style={{ color: notification.color }}
                  >
                    방금 {notification.company}
                  </div>
                  
                  {/* Message */}
                  <div className="text-white text-sm">
                    {notification.message}
                  </div>
                </div>
                
                {/* Live Indicator */}
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{ 
                      opacity: [1, 0.3, 1],
                      scale: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity 
                    }}
                  />
                  <span className="text-xs text-white/60">LIVE</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-b-2xl"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            </div>

            {/* Connection Line to Next Notification */}
            {index < notifications.length - 1 && (
              <motion.div
                className="absolute left-6 top-full w-0.5 h-3 bg-gradient-to-b from-white/20 to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ticker Header */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2">
            <span className="text-xs text-white/60 uppercase tracking-wider">
              실시간 성과 업데이트
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LiveTicker;