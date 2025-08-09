'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Users, Award, Clock } from 'lucide-react'

interface CounterProps {
  end: number
  duration: number
  suffix?: string
  prefix?: string
}

function Counter({ end, duration, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          
          const increment = end / (duration * 60) // 60fps assumption
          let current = 0
          
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 1000 / 60)
          
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasStarted])

  return (
    <div ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}

export default function ResultsCounter() {
  const results = [
    {
      icon: TrendingUp,
      value: 320,
      suffix: '%',
      prefix: '↑',
      label: '전환율 향상',
      description: 'A/B 테스트와 CRO 최적화를 통한 평균 전환율 개선 결과',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      value: 1.2,
      suffix: '초',
      prefix: '',
      label: 'LCP 성능',
      description: 'Largest Contentful Paint 시간 - Google Core Web Vitals 기준',
      color: 'text-blue-400'
    },
    {
      icon: Users,
      value: 450,
      suffix: '%',
      prefix: '↑',
      label: '리드 획득 증가',
      description: 'SEO 최적화와 사용자 경험 개선을 통한 리드 생성 증가율',
      color: 'text-primary'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-dark via-primary-dark to-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            PROVEN RESULTS
          </div>
          <h2 className="font-pretendard font-bold mb-6">
            숫자로 증명하는 <span className="text-gradient">CHIRO의 성과</span>
          </h2>
          <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
            데이터 기반의 전략과 검증된 방법론으로 클라이언트의 비즈니스 성장을 이끌어냅니다.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {results.map((result, index) => {
            const IconComponent = result.icon
            
            return (
              <div 
                key={index}
                className="group relative p-8 text-center rounded-2xl bg-shadow-gray/20 border border-shadow-gray/30 hover:border-primary/30 transition-all duration-300 card-hover"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-green/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Counter */}
                <div className="relative mb-4">
                  <div className={`text-4xl md:text-5xl font-bold ${result.color} mb-2`}>
                    <Counter 
                      end={result.value} 
                      duration={2}
                      suffix={result.suffix}
                      prefix={result.prefix}
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="relative space-y-2">
                  <h3 className="text-lg font-pretendard font-semibold text-white group-hover:text-primary transition-colors">
                    {result.label}
                  </h3>
                  <p className="text-sm text-neutral-light/60 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mt-4">
                  <div className="w-full bg-shadow-gray/30 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1000 delay-500 ${
                        result.color.replace('text-', 'bg-')
                      }`}
                      style={{ 
                        width: `${Math.min(100, (result.value / 500) * 100)}%`,
                        animation: 'progressFill 2s ease-out forwards'
                      }}
                    />
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent-green/20 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10" />
              </div>
            )
          })}
        </div>

        {/* Bottom section with testimonial */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-pretendard font-medium text-white mb-8 leading-relaxed">
              "CHIRO와 함께한 프로젝트로 <span className="text-primary">온라인 문의가 400% 증가</span>했고, 
              브랜드 인지도 또한 크게 향상되었습니다."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent-green" />
              <div className="text-left">
                <div className="font-semibold text-white">김현수 이사</div>
                <div className="text-neutral-light/60">㈜테크놀로지 파트너스</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}