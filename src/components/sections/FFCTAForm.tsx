'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// CTA 링크 상수 - 필요시 변경 가능
const CTA_HREF = '/consultation'

// 애니메이션 변형 - GSAP 스타일 쿵쿵 쌓이는 효과
const characterVariants = {
  hidden: {
    x: -window.innerWidth,
    y: -50,
    opacity: 0,
    scale: 0.8
  },
  visible: (index: number) => ({
    x: 0,
    y: [0, 10, 0], // 바운스 효과
    opacity: 1,
    scale: [0.8, 1.2, 1],
    transition: {
      duration: 0.8,
      delay: index * 0.5, // 0.5초 간격
      ease: [0.68, -0.55, 0.265, 1.55], // back.out(1.7) 유사
      times: [0, 0.8, 1]
    }
  })
}

const buttonVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 5.0, // 모든 글자 완성 후 등장 (10글자 * 0.5초 = 5초)
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function FFCTAForm() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: '-30%' // 30% 이상 뷰포트에 들어올 때
  })

  // 텍스트를 한 글자씩 분할
  const fullText = "한번의클릭으로고객을사로잡는"
  const characters = fullText.split("")

  // GA4 이벤트 트래킹
  const handleCTAClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Final CTA - 성장 시작하기',
        value: 1
      })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-48 md:py-64"
      style={{
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
      }}
      aria-labelledby="final-cta-heading"
    >
      {/* 배경 그라디언트 (매우 미세) */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(15, 167, 101, 0.1) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
        {/* 압도적인 타이포그래피 */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h1 
            id="final-cta-heading"
            className="font-black tracking-tight leading-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 10rem)', // 반응형 폰트 크기
              textShadow: '0 4px 8px rgba(0,0,0,0.5)'
            }}
          >
            {/* prefers-reduced-motion 지원 */}
            <style jsx>{`
              @media (prefers-reduced-motion: reduce) {
                .motion-text {
                  transform: none !important;
                  opacity: 1 !important;
                }
              }
            `}</style>
            
            <div className="flex flex-wrap justify-center items-center relative">
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  className="motion-text"
                  variants={characterVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={index}
                  style={{
                    display: 'inline-block',
                    filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
                    transformOrigin: 'center bottom',
                    marginRight: char === ' ' ? '1rem' : '0.1rem', // 공백 처리
                    position: 'relative',
                    zIndex: 10
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </h1>
        </div>

        {/* CTA 버튼 */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <a
            href={CTA_HREF}
            onClick={handleCTAClick}
            className="group inline-flex items-center px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-offset-4 focus:ring-offset-black"
            style={{
              backgroundColor: '#10b981', // emerald-500
              color: '#000000',
              height: '4rem', // 64px
              minWidth: '16rem',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={() => {
              // 호버 시 배경/텍스트 반전 효과는 CSS로 처리
            }}
          >
            <span className="transition-colors group-hover:text-white">
              성장 시작하기
            </span>
            <ArrowRight 
              className="ml-3 w-6 h-6 transition-all group-hover:translate-x-1 group-hover:text-white" 
            />
          </a>
          
          {/* 호버 시 배경/텍스트 반전 스타일 */}
          <style jsx>{`
            a:hover {
              background-color: #ffffff !important;
              color: #000000 !important;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  )
}