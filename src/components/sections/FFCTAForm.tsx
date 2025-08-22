'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// CTA 링크 상수 - 필요시 변경 가능
const CTA_HREF = '/consultation'

// 애니메이션 변형 - 첫 줄은 오른쪽에서, 둘째 줄은 왼쪽에서
const firstLineVariants = {
  hidden: {
    x: 1000, // 오른쪽에서 시작 (충분히 큰 고정값)
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
      delay: index * 0.3, // 0.3초 간격
      ease: [0.68, -0.55, 0.265, 1.55], // back.out(1.7) 유사
      times: [0, 0.8, 1]
    }
  })
}

const secondLineVariants = {
  hidden: {
    x: -1000, // 왼쪽에서 시작 (충분히 큰 고정값)
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
      delay: index * 0.3, // 0.3초 간격
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
      delay: 4.5, // 모든 글자 완성 후 등장 (14글자 * 0.3초 = 4.2초 + 여유)
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

  // 텍스트를 한 글자씩 분할 - 두 줄로 구성
  const firstLine = "한번의클릭으로"
  const secondLine = "고객을사로잡는"
  const firstCharacters = firstLine.split("")
  const secondCharacters = secondLine.split("")

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
              textShadow: '0 4px 8px rgba(0,0,0,0.5)',
              color: '#0FA765' // CHIRO 그린
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
            
            <div className="flex flex-col justify-center items-center gap-4">
              {/* 첫 번째 줄: 한번의 클릭으로 */}
              <div className="flex justify-center items-center relative">
                {firstCharacters.map((char, index) => (
                  <motion.span
                    key={`first-${index}`}
                    className="motion-text"
                    variants={firstLineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={index}
                    style={{
                      display: 'inline-block',
                      filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
                      transformOrigin: 'center bottom',
                      marginRight: '0.1rem',
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              {/* 두 번째 줄: 고객을 사로잡는 */}
              <div className="flex justify-center items-center relative">
                {secondCharacters.map((char, index) => (
                  <motion.span
                    key={`second-${index}`}
                    className="motion-text"
                    variants={secondLineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={firstCharacters.length + index} // 첫 번째 줄 이후에 시작
                    style={{
                      display: 'inline-block',
                      filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
                      transformOrigin: 'center bottom',
                      marginRight: '0.1rem',
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
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
            className="group inline-flex items-center px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#0FA765] focus:ring-offset-4 focus:ring-offset-black"
            style={{
              backgroundColor: '#0FA765', // CHIRO 그린
              color: '#FFFFFF',
              height: '4rem', // 64px
              minWidth: '16rem',
              boxShadow: '0 10px 30px rgba(15, 167, 101, 0.3)'
            }}
            onMouseEnter={() => {
              // 호버 시 배경/텍스트 반전 효과는 CSS로 처리
            }}
          >
            <span className="transition-colors group-hover:text-[#0FA765]">
              무료견적
            </span>
            <ArrowRight 
              className="ml-3 w-6 h-6 transition-all group-hover:translate-x-1 group-hover:text-[#0FA765]" 
            />
          </a>
          
          {/* 호버 시 배경/텍스트 반전 스타일 */}
          <style jsx>{`
            a:hover {
              background-color: #ffffff !important;
              color: #0FA765 !important;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  )
}