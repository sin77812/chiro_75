'use client'

import { useEffect, useRef, useState } from 'react'

const SmartMinimalismProof = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [extraScrollProgress, setExtraScrollProgress] = useState(0)

  // 단계별 텍스트 정의
  const textSteps = [
    "우리는",
    "우리는 디자인을",
    "우리는 디자인을 넘어", 
    "우리는 디자인을 넘어 비즈니스를",
    "우리는 디자인을 넘어 비즈니스를 만듭니다"
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let currentScrollPosition = 0

    const handleScroll = (e?: Event) => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // 섹션이 화면 중앙 근처에 있는지 확인 (더 넓은 범위)
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const centerY = windowHeight / 2

      if (sectionTop <= centerY * 1.2 && sectionBottom >= centerY * 0.8) {
        if (!isActive) {
          currentScrollPosition = window.scrollY
          setIsActive(true)
          document.body.style.overflow = 'hidden'
          document.body.style.position = 'fixed'
          document.body.style.top = `-${currentScrollPosition}px`
          document.body.style.width = '100%'
        }
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isActive) {
        e.preventDefault()
        
        const delta = e.deltaY
        
        if (!isCompleted) {
          // 문장 완성 전: 일반적인 진행도 증가
          const newProgress = Math.min(Math.max(scrollProgress + delta * 0.001, 0), 1)
          setScrollProgress(newProgress)
          
          // 문장 완성 체크
          if (newProgress >= 0.99 && !isCompleted) {
            setIsCompleted(true)
            setScrollProgress(1) // 정확히 1로 설정
          }
        } else {
          // 문장 완성 후: 추가 스크롤 진행도 계산
          const newExtraProgress = Math.min(Math.max(extraScrollProgress + delta * 0.003, 0), 1.2)
          setExtraScrollProgress(newExtraProgress)
          
          // 추가 스크롤 완료 시 섹션 해제 (더 많은 스크롤 필요)
          if (newExtraProgress >= 1.2) {
            // 해제 전 약간의 지연
            setTimeout(() => {
              setIsActive(false)
              setIsCompleted(false)
              setExtraScrollProgress(0)
              setScrollProgress(0)
              
              // body 스타일 완전 초기화
              document.body.style.overflow = ''
              document.body.style.position = ''
              document.body.style.top = ''
              document.body.style.width = ''
              
              // 원래 스크롤 위치 + 약간의 추가로 복원
              window.scrollTo({ 
                top: currentScrollPosition + 100, 
                behavior: 'smooth' 
              })
            }, 200)
          }
        }
      }
    }

    const handleTouch = (e: TouchEvent) => {
      if (isActive) {
        e.preventDefault()
        // 터치 이벤트는 단순히 차단만 하고 별도 로직 없음
      }
    }

    // 스크롤 이벤트들을 더 강력하게 제어
    const scrollOptions = { passive: false, capture: true }
    
    window.addEventListener('scroll', handleScroll, scrollOptions)
    window.addEventListener('wheel', handleWheel, scrollOptions)
    window.addEventListener('touchmove', handleTouch, scrollOptions) // 모바일 터치 지원

    // 키보드 스크롤도 제어
    const handleKeydown = (e: KeyboardEvent) => {
      if (isActive && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === ' ')) {
        e.preventDefault()
      }
    }
    
    window.addEventListener('keydown', handleKeydown)

    // 초기 상태 확인
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll, scrollOptions)
      window.removeEventListener('wheel', handleWheel, scrollOptions)
      window.removeEventListener('touchmove', handleTouch, scrollOptions)
      window.removeEventListener('keydown', handleKeydown)
      
      // 컴포넌트 언마운트 시 body 스타일 완전 초기화
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isActive, scrollProgress, isCompleted, extraScrollProgress])

  // 현재 표시할 텍스트 결정
  const getCurrentText = () => {
    const stepIndex = Math.floor(scrollProgress * (textSteps.length - 1))
    return textSteps[Math.min(stepIndex, textSteps.length - 1)]
  }

  // 단어별 애니메이션을 위한 배열 생성
  const getAnimatedWords = () => {
    const currentText = getCurrentText()
    const words = currentText.split(' ')
    const totalWords = "우리는 디자인을 넘어 비즈니스를 만듭니다".split(' ')
    
    // 현재 단계 계산 (0~4)
    const currentStep = Math.floor(scrollProgress * (textSteps.length - 1))
    const stepProgress = (scrollProgress * (textSteps.length - 1)) % 1
    
    return totalWords.map((word, index) => {
      let translateX = 0
      let opacity = 0
      let scale = 0.8
      
      if (index < words.length) {
        // 이미 보이는 단어들
        opacity = 1
        scale = 1
        translateX = 0
      } else if (index === words.length && stepProgress > 0) {
        // 다음에 등장할 단어 (부드러운 전환)
        opacity = stepProgress
        scale = 0.8 + (stepProgress * 0.2)
        translateX = 50 * (1 - stepProgress)
      } else {
        // 아직 등장하지 않은 단어들
        opacity = 0
        scale = 0.8
        translateX = 100
      }
      
      return {
        word: index < words.length ? words[index] : word,
        translateX,
        opacity,
        scale,
        isVisible: index < words.length
      }
    })
  }

  return (
    <section 
      ref={sectionRef}
      className="h-[100vh] bg-[#0E1111] flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* 스크롤 진행도 인디케이터 */}
      {isActive && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white/40 text-sm">
          스크롤하여 문장을 완성하세요 ({Math.round(scrollProgress * 100)}%)
        </div>
      )}

      {/* 메인 텍스트 영역 */}
      <div className="relative w-full max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-center space-x-6 h-32">
          {getAnimatedWords().map((wordData, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 ease-out font-pretendard font-bold text-white whitespace-nowrap"
              style={{
                fontSize: 'clamp(32px, 6vw, 80px)',
                letterSpacing: '-0.03em',
                transform: `translateX(${wordData.translateX}px) scale(${wordData.scale})`,
                opacity: wordData.opacity,
                transformOrigin: 'left center'
              }}
            >
              {wordData.word}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 가이드 텍스트 */}
      {isActive && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          {!isCompleted ? (
            // 문장 완성 전
            <>
              <div className="text-white/60 text-sm mb-2">
                계속 스크롤하세요
              </div>
              <div className="w-16 h-1 bg-white/20 rounded-full mx-auto">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </>
          ) : (
            // 문장 완성 후
            <>
              <div className="text-white/60 text-sm mb-2">
                계속 스크롤하여 다음으로
              </div>
              <div className="w-16 h-1 bg-green-500/30 rounded-full mx-auto">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(extraScrollProgress / 1.2 * 100, 100)}%` }}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* 배경 그라데이션 효과 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(29, 185, 84, ${scrollProgress * 0.1}) 0%, transparent 70%)`
        }}
      />
    </section>
  )
}

export default SmartMinimalismProof