'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, Users, TrendingUp, Zap } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface Metric {
  id: string
  value: number
  suffix: string
  label: string
  description: string
  icon: any
  color: string
}

const metrics: Metric[] = [
  {
    id: 'projects',
    value: 50,
    suffix: '+',
    label: '성공 프로젝트',
    description: '검증된 성과',
    icon: Award,
    color: 'text-primary'
  },
  {
    id: 'improvement',
    value: 280,
    suffix: '%',
    label: '평균 성과 향상',
    description: '전환율 기준',
    icon: TrendingUp,
    color: 'text-accent-green'
  },
  {
    id: 'clients',
    value: 47,
    suffix: '',
    label: '파트너 기업',
    description: '스타트업~대기업',
    icon: Users,
    color: 'text-primary'
  },
  {
    id: 'performance',
    value: 92,
    suffix: '',
    label: 'Lighthouse 평균',
    description: '성능 최적화',
    icon: Zap,
    color: 'text-accent-green'
  }
]

function AnimatedCounter({ 
  value, 
  suffix, 
  duration = 2000 
}: { 
  value: number
  suffix: string
  duration?: number 
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const endValue = value

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(easeOut * endValue)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return (
    <div ref={ref} className="font-mono">
      {count}{suffix}
    </div>
  )
}

export default function TrustMetrics() {
  return (
    <section className="section-padding bg-gradient-to-b from-background-primary to-background-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 border border-primary rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border border-accent-green rounded-lg rotate-45" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-primary/50 rounded-full" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeUp>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              검증된 신뢰
            </div>
            <h2 className="font-pretendard font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
              숫자로 증명하는
              <br />
              <span className="text-gradient">전문성</span>
            </h2>
            <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
              클라이언트와 함께 쌓아온 신뢰와 성과의 기록
            </p>
          </FadeUp>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon
            
            return (
              <FadeUp key={metric.id} delay={index * 150}>
                <div className="group relative">
                  {/* Background blur effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent-green/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="relative bg-background-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:transform hover:scale-105">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className={`w-7 h-7 ${metric.color}`} />
                      </div>
                    </div>

                    {/* Metric Value */}
                    <div className="mb-4">
                      <div className={`text-4xl lg:text-5xl font-black ${metric.color} mb-2 leading-none`}>
                        <AnimatedCounter 
                          value={metric.value} 
                          suffix={metric.suffix}
                          duration={2000 + index * 200}
                        />
                      </div>
                      <h3 className="text-xl font-pretendard font-semibold text-white">
                        {metric.label}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed">
                      {metric.description}
                    </p>

                    {/* Hover effect indicator */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <FadeUp delay={800}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-pretendard font-bold text-white mb-4">
                함께한 파트너사
              </h3>
              <p className="text-white/60">
                스타트업부터 대기업까지, 다양한 규모의 기업과 성장해왔습니다
              </p>
            </div>
            
            {/* Partner Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-16 h-8 bg-white/20 rounded" />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-secondary to-transparent pointer-events-none" />
      </div>
    </section>
  )
}