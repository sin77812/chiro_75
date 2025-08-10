'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Code, Palette, Zap, TrendingUp } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface Service {
  id: string
  title: string
  value: string
  description: string
  icon: any
  backgroundImage: string
  stats: string
  link: string
}

const services: Service[] = [
  {
    id: 'web-development',
    title: '웹 개발',
    value: '브랜드의 디지털 정체성을 구현합니다',
    description: '최신 기술과 사용자 경험을 결합한 고성능 웹사이트',
    icon: Code,
    backgroundImage: '/image/webuild.png',
    stats: '평균 로딩속도 0.8초 달성',
    link: '/services/web-development'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX 디자인',
    value: '사용자 중심의 직관적 경험을 디자인합니다',
    description: '데이터 기반 디자인으로 전환율을 극대화',
    icon: Palette,
    backgroundImage: '/image/webicon.png',
    stats: '평균 전환율 +247% 개선',
    link: '/services/ui-ux-design'
  },
  {
    id: 'performance',
    title: '성능 최적화',
    value: '속도가 곧 경쟁력입니다',
    description: 'Core Web Vitals 최적화로 검색 순위 상승',
    icon: Zap,
    backgroundImage: '/image/webebgin.png',
    stats: 'Lighthouse 90+ 점수 보장',
    link: '/services/performance-optimization'
  },
  {
    id: 'digital-strategy',
    title: '디지털 전략',
    value: '데이터로 증명하는 성장 전략',
    description: '통합적 디지털 마케팅으로 비즈니스 확장',
    icon: TrendingUp,
    backgroundImage: '/image/webdigital.png',
    stats: '평균 ROI 320% 달성',
    link: '/services/digital-marketing'
  }
]

export default function ServicesOverview() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeUp>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              <Palette className="w-4 h-4 mr-2" />
              전문 서비스
            </div>
            <h2 className="font-pretendard font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
              디지털 혁신의
              <br />
              <span className="text-gradient">모든 영역</span>
            </h2>
          </FadeUp>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isHovered = hoveredService === service.id
            
            return (
              <FadeUp key={service.id} delay={index * 150}>
                <Link href={service.link}>
                  <article 
                    className="group relative overflow-hidden rounded-2xl cursor-pointer h-[400px] lg:h-[500px]"
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <div 
                        className={`w-full h-full bg-cover bg-center transition-all duration-700 ${
                          isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale'
                        }`}
                        style={{ backgroundImage: `url(${service.backgroundImage})` }}
                      />
                      
                      {/* Overlay gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isHovered ? 'bg-primary/20' : 'bg-black/30'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                      {/* Icon & Category */}
                      <div className="flex items-start justify-between">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isHovered ? 'bg-primary scale-110' : 'bg-white/10 backdrop-blur-sm'
                        }`}>
                          <IconComponent className={`w-7 h-7 transition-colors duration-300 ${
                            isHovered ? 'text-white' : 'text-primary'
                          }`} />
                        </div>
                        
                        {/* Hover indicator */}
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isHovered ? 'border-primary bg-primary/20 scale-110' : 'border-white/30'
                        }`}>
                          <div className={`w-4 h-4 border-t-2 border-r-2 rotate-45 transition-colors duration-300 ${
                            isHovered ? 'border-primary' : 'border-white'
                          }`} />
                        </div>
                      </div>

                      {/* Service Info */}
                      <div className="space-y-4">
                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-pretendard font-bold text-white">
                          {service.title}
                        </h3>

                        {/* Value Proposition */}
                        <p className="text-lg text-white/90 leading-relaxed font-light">
                          {service.value}
                        </p>

                        {/* Description */}
                        <p className="text-white/70 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Stats */}
                        <div className="pt-4 border-t border-white/20">
                          <div className="flex items-center justify-between">
                            <span className="text-accent-green font-semibold text-sm">
                              {service.stats}
                            </span>
                            <span className={`text-sm font-medium transition-colors duration-300 ${
                              isHovered ? 'text-primary' : 'text-white/60'
                            }`}>
                              자세히 보기
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Animated border */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      isHovered ? 'ring-2 ring-primary/50' : ''
                    }`} />
                  </article>
                </Link>
              </FadeUp>
            )
          })}
        </div>

        {/* All Services CTA */}
        <div className="text-center mt-16">
          <FadeUp delay={600}>
            <Link 
              href="/services"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent-green text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              <span>모든 서비스 살펴보기</span>
              <div className="ml-3 w-2 h-2 bg-white rounded-full group-hover:animate-pulse" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}