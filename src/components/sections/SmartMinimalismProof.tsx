'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterData {
  number: number
  unit: string
  description: string
}

const SmartMinimalismProof = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState([
    { current: 0, target: 340, unit: '%', description: '평균 전환율 증가' },
    { current: 0, target: 98, unit: '%', description: '재계약률' },
    { current: 0, target: 14, unit: '일', description: '평균 완성 기간' }
  ])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const animationDuration = 2000 // 2 seconds
    const frameRate = 60
    const totalFrames = (animationDuration / 1000) * frameRate
    
    // All counters animate simultaneously
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = Math.min(frame / totalFrames, 1)
      
      // Smooth ease-out animation
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      
      setCounters(prev => prev.map(counter => ({
        ...counter,
        current: Math.floor(counter.target * easeProgress),
        isAnimating: progress < 1,
        glitch: Math.random() > 0.95 && progress < 0.8 // Random glitch effect during animation
      })))

      if (progress >= 1) {
        clearInterval(timer)
      }
    }, 1000 / frameRate)

    return () => clearInterval(timer)
  }, [isVisible])

  const CounterItem = ({ counter, index }: { counter: any; index: number }) => {
    return (
      <div 
        className={`flex-1 text-center transition-all duration-2000 ease-out ${
          isVisible 
            ? 'opacity-100 blur-none scale-100' 
            : 'opacity-20 blur-[15px] scale-95'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div 
          className="font-bold text-[#1DB954] transition-all duration-200 ease-out relative"
          style={{
            fontSize: 'clamp(80px, 10vw, 120px)',
            textShadow: isVisible ? '0 0 30px rgba(29, 185, 84, 0.3)' : 'none',
            filter: isVisible ? 'drop-shadow(0 0 15px rgba(29, 185, 84, 0.2))' : 'none',
            transform: counter.isAnimating ? 'scale(1.02)' : 'scale(1)'
          }}
        >
          {/* Glitch effect layers */}
          {counter.glitch && (
            <>
              <span 
                className="absolute inset-0 text-[#1DB954] opacity-70"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                  transform: 'translateX(-2px)',
                  animation: 'glitch-1 0.1s linear'
                }}
              >
                {counter.current}
                <span className="text-5xl">{counter.unit}</span>
              </span>
              <span 
                className="absolute inset-0 text-cyan-400 opacity-70"
                style={{
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                  transform: 'translateX(2px)',
                  animation: 'glitch-2 0.1s linear'
                }}
              >
                {counter.current}
                <span className="text-5xl">{counter.unit}</span>
              </span>
            </>
          )}
          {counter.current}
          <span className="text-5xl">{counter.unit}</span>
        </div>
        <div 
          className="mt-5 text-white/50 text-sm"
        >
          {counter.description}
        </div>
      </div>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="h-[50vh] bg-black flex flex-col justify-center items-center relative"
    >
      {/* Section Title */}
      <div 
        className="text-white/80 text-center mb-[10vh] font-semibold"
        style={{
          fontSize: 'clamp(20px, 3vw, 24px)'
        }}
      >
        숫자는 거짓말하지 않습니다
      </div>

      {/* Counter Grid */}
      <div 
        className="flex w-full max-w-6xl justify-between items-center"
        style={{ gap: '8vw' }}
      >
        {counters.map((counter, index) => (
          <CounterItem 
            key={index} 
            counter={counter} 
            index={index}
          />
        ))}
      </div>

      {/* Subtle background decoration */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(29, 185, 84, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(29, 185, 84, 0.03) 0%, transparent 50%)
          `
        }}
      />

      <style jsx>{`
        @keyframes glitch-1 {
          0% {
            transform: translateX(-2px) translateY(1px);
          }
          50% {
            transform: translateX(2px) translateY(-1px);
          }
          100% {
            transform: translateX(-2px) translateY(1px);
          }
        }
        
        @keyframes glitch-2 {
          0% {
            transform: translateX(2px) translateY(-1px);
          }
          50% {
            transform: translateX(-2px) translateY(1px);
          }
          100% {
            transform: translateX(2px) translateY(-1px);
          }
        }
      `}</style>
    </section>
  )
}

export default SmartMinimalismProof