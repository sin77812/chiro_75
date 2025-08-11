'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Zap, Users, Star } from 'lucide-react'

const kpiData = [
  {
    icon: TrendingUp,
    value: '+187%',
    label: '전환율',
    description: '평균 전환율 증가',
    color: '#1DB954',
  },
  {
    icon: Zap,
    value: '1.0s',
    label: 'LCP',
    description: 'Core Web Vitals',
    color: '#1DB954',
  },
  {
    icon: Users,
    value: '+250%',
    label: '리드',
    description: '상담 문의 증가',
    color: '#1DB954',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: '만족도',
    description: '고객 평가 점수',
    color: '#1DB954',
  },
]

export default function KpiTiles() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState(kpiData.map(() => 0))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const intervals: NodeJS.Timeout[] = []
    
    kpiData.forEach((kpi, index) => {
      const numericValue = parseFloat(kpi.value.replace(/[^0-9.-]/g, ''))
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          current = numericValue
          clearInterval(interval)
        }
        
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = current
          return newCounters
        })
      }, duration / steps)

      intervals.push(interval)
    })

    return () => intervals.forEach(clearInterval)
  }, [isVisible])

  const formatValue = (value: string, counter: number) => {
    if (value.includes('%')) {
      return `+${Math.round(counter)}%`
    } else if (value.includes('s')) {
      return `${counter.toFixed(1)}s`
    } else if (value.includes('/')) {
      return `${counter.toFixed(1)}/5`
    } else if (value.includes('+')) {
      return `+${Math.round(counter)}%`
    }
    return value
  }

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-[#0E1111] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1DB954 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[#1DB954] mb-3">성과 중심 접근</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-4">
            측정 가능한 비즈니스 임팩트
          </h2>
          <p className="text-lg text-[#C9CFD6]">
            데이터로 입증된 성과, 클라이언트와 함께 만든 성장
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <div
                key={index}
                className={`group relative bg-[#0A0C0C] border border-[#1A1F1F] rounded-2xl p-8 hover:border-[#1DB954]/30 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                data-analytics-key={`kpi-tile-${kpi.label}`}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#1DB954]/10 flex items-center justify-center group-hover:bg-[#1DB954]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#1DB954]" />
                  </div>
                </div>

                {/* Value */}
                <div className="relative mb-3">
                  <p className="text-4xl md:text-5xl font-bold text-[#F5F7FA] tabular-nums">
                    {isVisible ? formatValue(kpi.value, counters[index]) : '0'}
                  </p>
                </div>

                {/* Label */}
                <p className="text-lg font-semibold text-[#1DB954] mb-1">
                  {kpi.label}
                </p>

                {/* Description */}
                <p className="text-sm text-[#8B949E]">
                  {kpi.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1DB954]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#C9CFD6] mb-4">
            실제 클라이언트 케이스 스터디를 확인하세요
          </p>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#1DB954] font-medium hover:gap-3 transition-all"
          >
            포트폴리오 보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}