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
  const particlesRef = useRef<HTMLDivElement>(null)
  
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

    splitText(text1, '디자인을 넘어')
    splitText(text2, '비즈니스를 만듭니다')

    const chars1 = text1.querySelectorAll('.char')
    const chars2 = text2.querySelectorAll('.char')

    // 초기 상태 설정
    gsap.set([chars1, chars2], { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    })
    gsap.set(text2, { opacity: 0 })

    // 파티클 생성
    const createParticles = () => {
      if (!particlesRef.current) return
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
          animation-delay: ${Math.random() * 2}s;
        `
        particlesRef.current.appendChild(particle)
      }
    }

    createParticles()

    // 모바일 최적화 체크
    const isMobile = window.innerWidth < 768
    const scrollDistance = isMobile ? '+=100%' : '+=200%'

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
          
          // 배경 오브 인터랙션
          const orbElement = section.querySelector('.gradient-orb') as HTMLElement
          if (orbElement) {
            gsap.set(orbElement, {
              scale: 1 + self.progress * 0.5,
              rotation: self.progress * 45
            })
          }
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
      
      // Phase 5: 최종 강조 효과 (90-100%)
      .to([text1, text2], {
        filter: "blur(0px) brightness(1.2)",
        textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(29,185,84,0.3)",
        duration: 0.3,
        ease: "power2.inOut"
      }, 2.3)
      
      // 홀로그램 색수차 효과
      .to([text1, text2], {
        textShadow: "2px 0 0 #ff0000, -2px 0 0 #00ffff, 0 0 20px rgba(255,255,255,0.5)",
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut"
      }, 2.4)

    // 파티클 애니메이션
    gsap.to('.particle', {
      y: '-100vh',
      duration: 8,
      repeat: -1,
      ease: 'none',
      stagger: {
        amount: 2,
        repeat: -1
      }
    })

    // 정리 함수
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
      if (particlesRef.current) {
        particlesRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <>
      {/* CSS 애니메이션 정의 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .text-glow {
          background: linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .char {
          transition: all 0.3s ease;
        }
        
        .char:hover {
          animation: glitch 0.3s ease-in-out;
          color: #1DB954;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="h-[200vh] relative overflow-hidden text-sequence-section"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)'
        }}
      >
        {/* 배경 파티클 */}
        <div 
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* 배경 그라데이션 오브 */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="gradient-orb absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, rgba(30, 215, 96, 0.2) 50%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
          
          {/* 추가 오브들 */}
          <div 
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, rgba(29, 185, 84, 0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
              animation: 'float 6s ease-in-out infinite reverse'
            }}
          />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative text-center px-8 max-w-6xl mx-auto">
            
            {/* 첫 번째 텍스트 */}
            <div
              ref={text1Ref}
              className="text-glow font-black mb-8"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textShadow: '0 0 30px rgba(255,255,255,0.1)'
              }}
            />

            {/* 두 번째 텍스트 */}
            <div
              ref={text2Ref}
              className="text-glow font-black"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textShadow: '0 0 30px rgba(255,255,255,0.1)'
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

        {/* 배경 노이즈 텍스처 */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px'
          }}
        />
      </section>
    </>
  )
}

export default SmartMinimalismProof