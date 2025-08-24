'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface TextWallItem {
  text: string
  column: number
  delay: number
}

const SmartMinimalismContact = () => {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [buttonText, setButtonText] = useState('CHIRO')
  const [isInView, setIsInView] = useState(false)
  const [hoveredText, setHoveredText] = useState<string | null>(null)
  const [typingText, setTypingText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [typingStarted, setTypingStarted] = useState(false)

  // Left wall texts - 2 columns
  const leftWallTexts: TextWallItem[] = [
    // Column 1 (fast)
    { text: '2주 완성', column: 1, delay: 0 },
    { text: '빠른 응답', column: 1, delay: 0.05 },
    { text: '즉시 시작', column: 1, delay: 0.1 },
    { text: '바로 런칭', column: 1, delay: 0.15 },
    // Column 2 (slow)
    { text: '340% 성장', column: 2, delay: 0.2 },
    { text: '최고 품질', column: 2, delay: 0.25 },
    { text: '완벽 보장', column: 2, delay: 0.3 },
    { text: '프리미엄', column: 2, delay: 0.35 },
  ]

  // Right wall texts - 2 columns
  const rightWallTexts: TextWallItem[] = [
    // Column 1 (slow)
    { text: '무료 상담', column: 1, delay: 0.4 },
    { text: '투명 가격', column: 1, delay: 0.45 },
    { text: '24/7 지원', column: 1, delay: 0.5 },
    { text: '사후 관리', column: 1, delay: 0.55 },
    // Column 2 (fast)
    { text: '98% 만족', column: 2, delay: 0.6 },
    { text: '27+ 프로젝트', column: 2, delay: 0.65 },
    { text: 'since 2017', column: 2, delay: 0.7 },
    { text: '검증된 성과', column: 2, delay: 0.75 },
  ]

  // Intersection observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            // Start typing sequence after text wall animation
            if (!typingStarted) {
              setTypingStarted(true)
              setTimeout(() => startTypingSequence(), 1500)
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [typingStarted])

  // Typing animation functions
  const typeWriter = (text: string, callback?: () => void) => {
    setTypingText('') // 먼저 텍스트 초기화
    let i = 0
    const type = () => {
      if (i < text.length) {
        setTypingText(text.substring(0, i + 1))
        i++
        setTimeout(type, 100)
      } else if (callback) {
        callback()
      }
    }
    type()
  }

  const eraseText = (callback?: () => void) => {
    const interval = setInterval(() => {
      setTypingText(prev => {
        if (prev.length > 0) {
          return prev.substring(0, prev.length - 1)
        } else {
          clearInterval(interval)
          if (callback) {
            setTimeout(callback, 500)
          }
          return ''
        }
      })
    }, 50)
  }

  const startTypingSequence = () => {
    const questions = [
      { text: "새로운 프로젝트를 시작할까요?", hold: 2000, erase: true },
      { text: "함께 성장하고 싶으신가요?", hold: 2000, erase: true },
      { text: "지금 바로 시작해보세요", hold: 0, erase: false }
    ]
    
    let currentIndex = 0
    
    const processQuestion = () => {
      const current = questions[currentIndex]
      
      typeWriter(current.text, () => {
        if (current.erase) {
          setTimeout(() => {
            eraseText(() => {
              currentIndex++
              if (currentIndex < questions.length) {
                processQuestion()
              }
            })
          }, current.hold)
        } else {
          setIsTypingComplete(true)
        }
      })
    }
    
    processQuestion()
  }

  const handleButtonClick = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setButtonText('시작합니다')
    setTypingText('시작합니다...')
    setIsTypingComplete(false)
    
    // Navigate to contact page after animation
    setTimeout(() => {
      router.push('/contact')
    }, 1500)
  }

  const getTextAnimation = (side: 'left' | 'right', delay: number) => {
    if (!isInView) {
      return {
        transform: side === 'left' ? 'translateX(-100vw)' : 'translateX(100vw)',
        opacity: 0
      }
    }
    
    if (isAnimating) {
      // Converge to center when button is clicked
      return {
        transform: 'translateX(0) scale(0)',
        opacity: 0,
        transition: `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s`
      }
    }
    
    return {
      transform: 'translateX(0)',
      opacity: 1,
      transition: `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s`
    }
  }

  return (
    <section 
      ref={containerRef}
      className="h-[80vh] bg-[#0E1111] flex items-center justify-center relative overflow-hidden"
    >

      {/* Left Text Wall */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-8 pl-8 md:pl-16">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          {leftWallTexts
            .filter(item => item.column === 1)
            .map((item, index) => (
              <div
                key={`left-1-${index}`}
                className={`text-white/40 text-lg md:text-xl font-bold cursor-pointer transition-all duration-300 ${
                  hoveredText === item.text ? 'text-[#1DB954] scale-110' : 'hover:text-white/60'
                }`}
                style={getTextAnimation('left', item.delay)}
                onMouseEnter={() => setHoveredText(item.text)}
                onMouseLeave={() => setHoveredText(null)}
              >
                {item.text}
              </div>
            ))}
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          {leftWallTexts
            .filter(item => item.column === 2)
            .map((item, index) => (
              <div
                key={`left-2-${index}`}
                className={`text-white/30 text-base md:text-lg font-bold cursor-pointer transition-all duration-300 ${
                  hoveredText === item.text ? 'text-[#1DB954] scale-110' : 'hover:text-white/50'
                }`}
                style={getTextAnimation('left', item.delay)}
                onMouseEnter={() => setHoveredText(item.text)}
                onMouseLeave={() => setHoveredText(null)}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>

      {/* Right Text Wall */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-8 pr-8 md:pr-16">
        {/* Column 1 */}
        <div className="flex flex-col gap-6 text-right">
          {rightWallTexts
            .filter(item => item.column === 1)
            .map((item, index) => (
              <div
                key={`right-1-${index}`}
                className={`text-white/30 text-base md:text-lg font-bold cursor-pointer transition-all duration-300 ${
                  hoveredText === item.text ? 'text-[#1DB954] scale-110' : 'hover:text-white/50'
                }`}
                style={getTextAnimation('right', item.delay)}
                onMouseEnter={() => setHoveredText(item.text)}
                onMouseLeave={() => setHoveredText(null)}
              >
                {item.text}
              </div>
            ))}
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-6 text-right">
          {rightWallTexts
            .filter(item => item.column === 2)
            .map((item, index) => (
              <div
                key={`right-2-${index}`}
                className={`text-white/40 text-lg md:text-xl font-bold cursor-pointer transition-all duration-300 ${
                  hoveredText === item.text ? 'text-[#1DB954] scale-110' : 'hover:text-white/60'
                }`}
                style={getTextAnimation('right', item.delay)}
                onMouseEnter={() => setHoveredText(item.text)}
                onMouseLeave={() => setHoveredText(null)}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>

      {/* Central CTA Button */}
      <div 
        ref={buttonRef}
        className={`
          relative rounded-full border-2 border-[#1DB954] 
          flex items-center justify-center cursor-pointer z-20
          font-bold text-white transition-all duration-500 ease-out
          hover:bg-[#1DB954] hover:text-black hover:scale-110
          ${isAnimating ? 'scale-125 bg-[#1DB954] text-black' : ''}
        `}
        style={{
          width: '200px',
          height: '200px',
          fontSize: '32px',
          fontWeight: 700,
          letterSpacing: '2px',
          filter: hoveredText ? 'none' : 'drop-shadow(0 0 40px rgba(29, 185, 84, 0.5))',
          animation: isInView && !isAnimating ? 'pulse 3s ease-in-out infinite' : 'none'
        }}
        onClick={handleButtonClick}
        onMouseEnter={() => {
          // Pull texts slightly toward center on button hover
          const texts = document.querySelectorAll('.text-wall-item')
          texts.forEach(text => {
            text.classList.add('translate-x-2')
          })
        }}
        onMouseLeave={() => {
          const texts = document.querySelectorAll('.text-wall-item')
          texts.forEach(text => {
            text.classList.remove('translate-x-2')
          })
        }}
      >
        <span className="relative z-10">{buttonText}</span>
        {/* Rotating border effect */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, #1DB954, transparent)`,
            animation: 'rotate 4s linear infinite',
            opacity: 0.3
          }}
        />
      </div>

      {/* Typing Question CTA */}
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 'calc(50% - 180px)',
        }}
      >
        <div className={`typing-cta ${isTypingComplete ? 'typing-complete' : ''}`}>
          <span className="typing-text text-white/80 text-xl md:text-2xl font-bold tracking-wide">
            {typingText}
          </span>
          <span className="typing-cursor text-[#1DB954] text-xl md:text-2xl font-bold ml-0.5">|</span>
        </div>
      </div>

      {/* Mobile responsive text (bottom) */}
      <div className="md:hidden absolute bottom-8 left-0 right-0 px-8">
        <div className="flex justify-between text-white/40 text-sm font-bold">
          <span>2주 완성</span>
          <span>340% 성장</span>
          <span>무료 상담</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .typing-cursor {
          animation: cursorBlink 1s infinite;
        }

        @keyframes cursorBlink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        .typing-complete {
          animation: gentlePulse 3s ease-in-out infinite;
        }

        @keyframes gentlePulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(29, 185, 84, 0.3);
          }
        }

        @keyframes impactLeft {
          0% {
            transform: translateX(-100vw);
          }
          70% {
            transform: translateX(10px);
          }
          85% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes impactRight {
          0% {
            transform: translateX(100vw);
          }
          70% {
            transform: translateX(-10px);
          }
          85% {
            transform: translateX(5px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>
    </section>
  )
}

export default SmartMinimalismContact