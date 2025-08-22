'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCountUp } from '@/features/hooks/useCountUp'
import { fadeUp, kineticChar, stagger } from '@/features/motion/variants'

// SVG Path Background Component
const PathBackground = () => {
  const pathRef = useRef<SVGPathElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Transform scroll to path progress (2-4% parallax)
  const pathProgress = useTransform(scrollYProgress, [0, 0.3], [0, 0.04])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.path
          ref={pathRef}
          d="M0,400 Q300,200 600,400 T1200,400"
          stroke="var(--accent, #0FA765)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10 5"
          style={{
            pathLength: pathProgress
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />
        <motion.path
          d="M100,600 Q400,300 800,500 T1100,300"
          stroke="var(--accent, #0FA765)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 10"
          style={{
            pathLength: pathProgress
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity, delay: 2 }}
        />
      </svg>
    </div>
  )
}

// Kinetic Typography Component
const KineticTitle = ({ text, className }: { text: string; className?: string }) => {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Trigger kinetic breakdown at 5-10vh scroll
  const shouldBreakdown = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
  const opacityTransform = useTransform(shouldBreakdown, [0, 1], [1, 0])
  const yTransform = useTransform(shouldBreakdown, [0, 1], [0, -20])
  const rotateTransform = useTransform(shouldBreakdown, [0, 1], [0, 15])
  
  // Split text into characters
  const chars = text.split('')

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-1"
      >
        {chars.map((char, index) => (
          <motion.span
            key={index}
            variants={kineticChar}
            style={{
              opacity: opacityTransform,
              y: yTransform,
              rotateX: rotateTransform,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default function FFHero() {
  const containerRef = useRef<HTMLElement>(null)
  const { count, ref: countRef } = useCountUp({
    start: 0,
    end: 95,
    duration: 900,
    enableOnIntersection: true,
    threshold: 0.3,
  })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: 'var(--bg, #0A0F0A)',
        color: 'var(--fg, #F7F7F5)',
      }}
      aria-labelledby="hero-heading"
    >
      {/* Background Path Animation */}
      <PathBackground />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 md:mb-12"
        >
          <KineticTitle
            text="오래된 홈페이지, 새로운 시대의 옷을 입다"
            className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight tracking-tight"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl lg:text-4xl font-medium mb-16 md:mb-24 text-gray-300 max-w-4xl mx-auto"
          id="hero-heading"
        >
          지금, 당신의 사이트는 일하고 있나요?
        </motion.h2>

        {/* KPI Counter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center">
            <div
              ref={countRef}
              className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter"
              style={{ color: 'var(--accent, #0FA765)' }}
              aria-live="polite"
              aria-label={`${count}퍼센트`}
            >
              {count}%
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-300 mt-4">
              방문자가 3초 안에 이탈합니다
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-2 text-gray-500">
          <span className="text-sm font-medium tracking-wide">SCROLL</span>
          <motion.div
            className="w-px h-12 bg-gray-500"
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}