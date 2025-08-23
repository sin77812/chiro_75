'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InteractiveCTA = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            새로운 섹션을 위한 공간
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            여기에 새로운 디자인이 들어갈 예정입니다
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveCTA;