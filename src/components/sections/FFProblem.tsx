'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { stagger, shake, slideOut } from '@/features/motion/variants'

interface ProblemItemProps {
  title: string
  description: string
  index: number
}

const ProblemItem = ({ title, description, index }: ProblemItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <motion.div
      ref={ref}
      className="text-center space-y-4 p-6"
      variants={slideOut}
      initial="visible"
      animate={isInView ? "visible" : "exit"}
      transition={{ delay: index * 0.08 }}
    >
      <motion.div
        variants={shake}
        initial="idle"
        whileHover="active"
        className="space-y-6"
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function FFProblem() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })

  const problems = [
    {
      title: '비싼 에이전시',
      description: '수천만원 견적에 몇 개월 대기'
    },
    {
      title: '느린 프리랜서', 
      description: '연락도 안되고 품질도 불안'
    },
    {
      title: '복잡한 프로세스',
      description: '회의만 몇 번, 결과는 기대 이하'
    }
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-32"
      style={{
        backgroundColor: 'var(--bg, #0A0F0A)',
        color: 'var(--fg, #F7F7F5)',
      }}
      aria-labelledby="problem-heading"
    >
      {/* Minimal background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title - Hidden for screen readers but semantically present */}
        <h2 id="problem-heading" className="sr-only">
          현재 웹사이트 제작의 문제점들
        </h2>

        {/* Problems Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20"
        >
          {problems.map((problem, index) => (
            <ProblemItem
              key={problem.title}
              title={problem.title}
              description={problem.description}
              index={index}
            />
          ))}
        </motion.div>

        {/* Emphasis Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-center mt-20 md:mt-32"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 leading-relaxed max-w-4xl mx-auto">
            <span style={{ color: 'var(--accent, #0FA765)' }}>더 나은 방법</span>이 있습니다
          </p>
        </motion.div>
      </div>
    </section>
  )
}