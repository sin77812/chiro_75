'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP 플러그인 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SmartMinimalismProof = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const section = sectionRef.current
    const text1 = text1Ref.current
    const text2 = text2Ref.current
    const progress = progressRef.current
    
    if (!section || !text1 || !text2 || !progress) return

    // 기존 ScrollTrigger 정리
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === section) {
        trigger.kill()
      }
    })

    // 텍스트를 개별 글자로 분리
    const splitText = (element: HTMLElement, text: string) => {
      element.innerHTML = text
        .split('')
        .map((char, index) => 
          char === ' ' 
            ? '<span class="char space">&nbsp;</span>'
            : `<span class="char" style="display: inline-block;">${char}</span>`
        )
        .join('')
    }

    splitText(text1, '치로와 함께')
    splitText(text2, '브랜드 가치를 높이세요')

    const chars1 = text1.querySelectorAll('.char')
    const chars2 = text2.querySelectorAll('.char')

    // 초기 상태 설정
    gsap.set([chars1, chars2], { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    })
    gsap.set(text2, { opacity: 0 })


    // 모바일 최적화 체크
    const isMobile = window.innerWidth < 768
    const scrollDistance = isMobile ? '+=50%' : '+=100%'

    // 메인 타임라인 생성
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: scrollDistance,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // 진행도 업데이트
          gsap.set(progress, {
            scaleY: self.progress
          })
        }
      }
    })

    // 애니메이션 시퀀스
    tl
      // Phase 1: 첫 번째 텍스트 등장 (0-40%)
      .to(chars1, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out"
      }, 0)
      
      // Phase 2: 첫 번째 텍스트 유지 (40-60%)
      .to({}, { duration: 0.5 }, 1)
      
      // Phase 3: 크로스페이드 전환 (60-70%)
      .to(chars1, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.in"
      }, 1.5)
      .to(text2, {
        opacity: 1,
        duration: 0.1
      }, 1.6)
      
      // Phase 4: 두 번째 텍스트 등장 (70-90%)
      .to(chars2, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: "power2.out"
      }, 1.7)
      


    // 정리 함수
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      <style jsx>{`
        .char {
          display: inline-block;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="h-screen relative overflow-hidden text-sequence-section"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)'
        }}
      >

        {/* 메인 콘텐츠 */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative text-center px-8 max-w-6xl mx-auto">
            
            {/* 첫 번째 텍스트 */}
            <div
              ref={text1Ref}
              className="text-white font-bold mb-8"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}
            />

            {/* 두 번째 텍스트 */}
            <div
              ref={text2Ref}
              className="text-white font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}
            />

          </div>
        </div>

        {/* 스크롤 진행도 인디케이터 */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
          <div className="w-1 h-32 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="w-full bg-gradient-to-t from-[#1DB954] to-[#1ed760] origin-bottom scale-y-0 transition-transform"
              style={{ height: '100%' }}
            />
          </div>
          <div className="text-xs text-white/40 mt-2 text-center">SCROLL</div>
        </div>

      </section>
    </>
  )
}

export default SmartMinimalismProof