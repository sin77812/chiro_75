'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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

  // Hashtags for bottom display
  const hashtags = [
    '#2주완성', '#빠른응답', '#즉시시작', '#바로런칭', 
    '#98%만족', '#27+프로젝트', '#since2017', '#검증된성과'
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
              const timer = setTimeout(() => {
                startTypingSequence()
              }, 800) // 애니메이션 딜레이 줄임
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

  const startTypingSequence = useCallback(() => {
    const questions = [
      { text: "진짜 변화와 성장을 원하시나요?", hold: 2000, erase: true },
      { text: "그럼 이제", hold: 1500, erase: true },
      { text: "클릭해보세요.", hold: 0, erase: false }
    ]
    
    let currentIndex = 0
    
    const processQuestion = () => {
      if (currentIndex >= questions.length) return
      
      const current = questions[currentIndex]
      
      typeWriter(current.text, () => {
        if (current.erase && currentIndex < questions.length - 1) {
          setTimeout(() => {
            eraseText(() => {
              currentIndex++
              processQuestion()
            })
          }, current.hold)
        } else {
          // 마지막 문장은 지우지 않고 고정
          setIsTypingComplete(true)
        }
      })
    }
    
    processQuestion()
  }, [])

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

      {/* Hashtags at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {hashtags.map((tag, index) => (
            <span 
              key={index}
              className="text-white/40 text-sm font-medium opacity-0"
              style={{
                animation: isInView ? `fadeInUp 0.5s ease-out ${index * 0.1}s forwards` : 'none'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Central CTA Button with Saturn Ring Dots */}
      <div className="relative" style={{ transform: 'translateY(-30px)' }}>
        {/* Back Ring Dots (behind button) */}
        {[...Array(4)].map((_, index) => (
          <div
            key={`back-${index}`}
            className="absolute w-2 h-2 bg-[#1DB954] rounded-full opacity-40"
            style={{
              animation: `orbitBack 6s linear infinite`,
              animationDelay: `${index * 1.5}s`,
              transformOrigin: '150px 60px',
              zIndex: 10
            }}
          />
        ))}
        
        <div 
          ref={buttonRef}
          className={`
            relative rounded-3xl border-2 border-[#1DB954] 
            flex items-center justify-center cursor-pointer
            font-bold text-white transition-all duration-500 ease-out
            hover:bg-[#1DB954] hover:text-black hover:scale-105
            ${isAnimating ? 'scale-110 bg-[#1DB954] text-black' : ''}
          `}
          style={{
            width: '300px',
            height: '120px',
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: '3px',
            filter: 'drop-shadow(0 0 50px rgba(29, 185, 84, 0.4))',
            animation: isInView && !isAnimating ? 'gentleGlow 4s ease-in-out infinite' : 'none',
            zIndex: 20
          }}
          onClick={handleButtonClick}
        >
          <span className="relative z-10">{buttonText}</span>
        </div>

        {/* Front Ring Dots (in front of button) */}
        {[...Array(4)].map((_, index) => (
          <div
            key={`front-${index}`}
            className="absolute w-2 h-2 bg-[#1DB954] rounded-full"
            style={{
              animation: `orbitFront 6s linear infinite`,
              animationDelay: `${index * 1.5}s`,
              transformOrigin: '150px 60px',
              zIndex: 30
            }}
          />
        ))}
      </div>

      {/* Typing Question CTA */}
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 'calc(50% - 180px)',
        }}
      >
        <div className={`typing-cta ${isTypingComplete ? 'typing-complete' : ''}`}>
          <span className="typing-text text-white/80 font-bold tracking-wide"
            style={{
              fontSize: 'clamp(28px, 4vw, 43px)'
            }}
          >
            {typingText}
          </span>
          <span className="typing-cursor text-[#1DB954] font-bold ml-1"
            style={{
              fontSize: 'clamp(28px, 4vw, 43px)'
            }}
          >|</span>
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes orbitBack {
          0% {
            transform: rotate(0deg) translateX(150px) rotateY(0deg) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 0.4;
          }
          50% {
            transform: rotate(180deg) translateX(150px) rotateY(180deg) scale(0.5);
            opacity: 0;
          }
          75% {
            opacity: 0.4;
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotateY(360deg) scale(1);
            opacity: 0;
          }
        }

        @keyframes orbitFront {
          0% {
            transform: rotate(180deg) translateX(150px) rotateY(180deg) scale(0.5);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: rotate(360deg) translateX(150px) rotateY(360deg) scale(1);
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: rotate(540deg) translateX(150px) rotateY(540deg) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes gentleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 50px rgba(29, 185, 84, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 80px rgba(29, 185, 84, 0.7));
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