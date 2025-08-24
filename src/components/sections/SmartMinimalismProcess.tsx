'use client'

import { useEffect, useRef, useState } from 'react'

interface Milestone {
  day: number
  label: string
  description: string
  position: number // percentage along timeline
}

const SmartMinimalismProcess = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [timelineProgress, setTimelineProgress] = useState(0)

  const milestones: Milestone[] = [
    {
      day: 1,
      label: '킥오프',
      description: '프로젝트 목표 설정 및 전략 수립',
      position: 10
    },
    {
      day: 7,
      label: '프로토타입',
      description: '핵심 기능 구현 및 사용자 테스트',
      position: 50
    },
    {
      day: 14,
      label: '런칭',
      description: '완성된 서비스 배포 및 운영 시작',
      position: 90
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      setTimelineProgress(100)
    }, 500)

    return () => clearTimeout(timer)
  }, [isVisible])

  const MilestonePoint = ({ milestone, index }: { milestone: Milestone; index: number }) => {
    const [isPointVisible, setIsPointVisible] = useState(false)

    useEffect(() => {
      if (timelineProgress > milestone.position - 10) {
        const timer = setTimeout(() => {
          setIsPointVisible(true)
        }, index * 200)
        return () => clearTimeout(timer)
      }
    }, [timelineProgress, milestone.position, index])

    return (
      <div 
        className="absolute flex flex-col items-center"
        style={{ left: `${milestone.position}%` }}
      >
        {/* Point */}
        <div 
          className={`
            relative w-4 h-4 rounded-full bg-[#1DB954] border-4 border-[#0E1111] 
            transition-all duration-500 ease-out
            ${isPointVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}
          style={{
            animation: isPointVisible ? 'pulse 2s infinite' : 'none',
            boxShadow: '0 0 20px rgba(29, 185, 84, 0.4)'
          }}
        >
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-[#1DB954] animate-ping opacity-75"></div>
        </div>

        {/* Label above */}
        <div 
          className="absolute -top-12 text-white/80 font-medium text-sm whitespace-nowrap"
        >
          {milestone.label}
        </div>

        {/* Day below */}
        <div 
          className="absolute -bottom-12 text-[#1DB954] text-xs"
        >
          Day {milestone.day}
        </div>
      </div>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="h-[80vh] bg-[#0E1111] flex flex-col justify-center items-center relative"
      style={{ padding: '10vh 10vw' }}
    >
      {/* Section Title */}
      <div className="text-center mb-[15vh]">
        <h2 
          className="font-bold text-white"
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)'
          }}
        >
          <span className="text-[#1DB954]">2주</span>가{' '}
          <span className="text-gray-500">6개월</span>을 이긴다
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-4xl">
        {/* Main Timeline Line */}
        <div 
          ref={timelineRef}
          className="relative h-0.5 bg-gradient-to-r from-transparent via-[#1DB954] to-transparent overflow-hidden"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(29, 185, 84, 0.4))'
          }}
        >
          {/* Progress Line */}
          <div 
            className="absolute top-0 left-0 h-full bg-[#1DB954] transition-all ease-out"
            style={{
              width: `${timelineProgress}%`,
              transformOrigin: 'left center',
              boxShadow: '0 0 20px rgba(29, 185, 84, 0.6)',
              transitionDuration: '4000ms'
            }}
          />
        </div>

        {/* Milestones */}
        {milestones.map((milestone, index) => (
          <MilestonePoint key={index} milestone={milestone} index={index} />
        ))}
      </div>

      {/* Floating Comparison Card */}
      <div 
        className="absolute right-[5vw] top-[30%] transform -translate-y-1/2 bg-[rgba(29,185,84,0.05)] border border-[rgba(29,185,84,0.2)] p-6 rounded-lg backdrop-blur-sm"
        style={{
          animation: 'float 4s ease-in-out infinite'
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-[#1DB954] font-medium">CHIRO</span>
            <span className="text-white/80">18일</span>
            <span className="text-[#1DB954] text-xl">✓</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">타사</span>
            <span className="text-white/60">3-6개월</span>
            <span className="text-red-400 text-xl">✗</span>
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(-50px); }
          50% { transform: translateY(-40px); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  )
}

export default SmartMinimalismProcess