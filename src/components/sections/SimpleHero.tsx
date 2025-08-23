'use client';

import { motion } from 'framer-motion';

const SimpleHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 125, 50, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 125, 50, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-white mb-6 leading-[1.1] tracking-[-0.03em]"
        >
          코드가 아닌 성과를 팝니다
        </motion.h1>

        {/* Sub Headline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-white/70 font-normal max-w-[600px] mx-auto mb-12"
        >
          CHIRO는 웹사이트가 아닌<br className="md:hidden" />
          비즈니스 성장을 설계합니다
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <button className="group relative px-10 py-5 rounded-xl overflow-hidden font-semibold text-lg text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            지금 시작하기
          </button>
        </motion.div>

        {/* Performance Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { title: "평균 성과 향상", value: "+280%", icon: "📈" },
            { title: "프로젝트 완성", value: "2.1주", icon: "⚡" },
            { title: "고객 만족도", value: "98.2%", icon: "💎" },
            { title: "성능 점수", value: "95+", icon: "🚀" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-2xl md:text-3xl mb-2">{item.icon}</div>
              <div className="text-xl md:text-2xl font-bold text-green-400 mb-1">
                {item.value}
              </div>
              <div className="text-sm md:text-base text-white/70">
                {item.title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleHero;