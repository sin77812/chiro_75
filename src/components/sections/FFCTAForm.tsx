'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// CTA 링크 상수 - 필요시 변경 가능
const CTA_HREF = '/consultation'

// 애니메이션 변형 - 쿵쿵쿵 효과 강화 (settle 효과 통합)
const slideInVariants = {
  hidden: {
    x: 300,
    opacity: 0,
    skewX: 15,
    scale: 0.7,
    rotateZ: 5
  },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    skewX: 0,
    scale: [0.7, 1.1, 0.95, 1.05, 1], // 슬라이드 인 + 쿵 효과 통합
    rotateZ: 0,
    y: [0, 0, -6, 0], // 살짝 튕기는 효과
    transition: {
      duration: 1.2,
      delay: index * 0.15, // 스태거 딜레이
      ease: [0.17, 0.67, 0.83, 0.67], // easeOutBack
      times: [0, 0.6, 0.75, 0.9, 1] // 각 키프레임 타이밍
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
      delay: 1.8, // 모든 텍스트 완성 후 등장 (마지막 텍스트 완료: 0.3 + 1.2 = 1.5초 + 여유 0.3초)
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

  // 텍스트를 의미 단위로 분할
  const textParts = [
    "한 번의 클릭으로",
    "고객을",
    "사로잡는"
  ]

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
            
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
              {textParts.map((part, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.span
                    className="motion-text"
                    variants={slideInVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={index}
                    style={{
                      display: 'inline-block',
                      filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
                      transformOrigin: 'center bottom' // 애니메이션 원점 설정
                    }}
                  >
                    {part}
                  </motion.span>
                </div>
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