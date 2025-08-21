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
    title: '웹사이트 제작',
    value: '2주 안에 완성되는 우리 회사 홈페이지',
    description: '기획부터 디자인, 개발까지 원스톱 서비스',
    icon: Code,
    backgroundImage: '/image/webuild.png',
    stats: '2주 완성 + 1년 무료 관리',
    link: '/services/web-development'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX 디자인',
    value: '고객이 바로 이해하는 쉬운 디자인',
    description: '복잡한 정보도 직관적으로 전달하는 UX 설계',
    icon: Palette,
    backgroundImage: '/image/webicon.png',
    stats: '방문자 대비 문의율 15%',
    link: '/services/ui-ux-design'
  },
  {
    id: 'performance',
    title: '개발',
    value: '빠르고 안정적인 홈페이지, 1년 무료 관리',
    description: '보안부터 속도까지, 수정요청 무제한 대응',
    icon: Zap,
    backgroundImage: '/image/webengin.png',
    stats: '평균 0.8초 로딩속도',
    link: '/services/performance-optimization'
  },
  {
    id: 'digital-strategy',
    title: 'SEO 최적화',
    value: '데이터로 증명하는 성장 전략',
    description: '홈페이지 변경으로 시작하는 비즈니스 확장',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isHovered = hoveredService === service.id
            
            return (
              <FadeUp key={service.id} delay={index * 150}>
                <Link href={service.link}>
                  <article 
                    className="group relative overflow-hidden rounded-2xl cursor-pointer h-[350px] lg:h-[400px]"
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
              <span>무료 견적 받기</span>
              <div className="ml-3 w-2 h-2 bg-white rounded-full group-hover:animate-pulse" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}