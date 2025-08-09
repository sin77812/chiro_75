'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Shield, TrendingUp, Settings, ArrowRight } from 'lucide-react'

interface ValueProps {
  icon: React.ElementType
  title: string
  benefit: string
  description: string
  features: string[]
}

function ValueCard({ icon: Icon, title, benefit, description, features }: ValueProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
        isHovered 
          ? 'bg-primary/5 border-primary/30 scale-[1.03] shadow-lg shadow-primary/10' 
          : 'bg-shadow-gray/20 border-shadow-gray/30 hover:border-primary/20 hover:scale-[1.03] hover:shadow-md'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="article"
      aria-label={`${title}: ${benefit}`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden rounded-tr-2xl">
        <div className={`w-full h-full bg-gradient-to-bl transition-all duration-500 ${
          isHovered ? 'from-primary via-accent-green to-transparent' : 'from-primary via-transparent to-transparent'
        }`} />
      </div>

      {/* Icon */}
      <div className="relative mb-6">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isHovered 
            ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' 
            : 'bg-primary/10 text-primary'
        }`}>
          <Icon className="h-8 w-8" />
        </div>
        
        {/* Decorative gradient blob */}
        <div className={`absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-primary/20 to-accent-green/20 rounded-xl -z-10 transition-all duration-300 ${
          isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
        }`} />
      </div>

      {/* Content */}
      <div className="space-y-4 relative z-10">
        <div>
          <h3 className={`text-xl font-pretendard font-semibold mb-2 transition-colors ${
            isHovered ? 'text-primary' : 'text-white'
          }`}>
            {title}
          </h3>
          <div className={`text-lg font-medium mb-3 transition-colors ${
            isHovered ? 'text-accent-green' : 'text-primary'
          }`}>
            {benefit}
          </div>
        </div>
        
        <p className="text-neutral-light/70 leading-relaxed text-sm">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-neutral-light/60">
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Learn More Link */}
        <div className="pt-4 border-t border-shadow-gray/30">
          <button className={`inline-flex items-center font-medium transition-all duration-300 group/link ${
            isHovered ? 'text-accent-green' : 'text-primary hover:text-accent-green'
          }`}>
            자세히 알아보기
          </button>
        </div>
      </div>

      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent-green/10 transition-all duration-500 -z-10 ${
        isHovered ? 'opacity-20 blur-xl scale-105' : 'opacity-0 blur-0 scale-100'
      }`} />
    </div>
  )
}

export default function WhyChiro() {
  const values = [
    {
      icon: Zap,
      title: '극도의 속도',
      benefit: '3초 이내 로딩',
      description: 'Core Web Vitals 기준을 상회하는 초고속 웹사이트로 사용자 이탈률을 최소화하고 SEO 점수를 극대화합니다.',
      features: [
        '이미지 자동 최적화 & WebP 변환',
        'CDN 및 엣지 컴퓨팅 활용',
        '지연 로딩 & 코드 분할',
        'Lighthouse 95+ 점수 보장'
      ]
    },
    {
      icon: Shield,
      title: '웹 접근성',
      benefit: 'WCAG 2.1 AA 준수',
      description: '장애인, 고령자를 포함한 모든 사용자가 편리하게 이용할 수 있는 포용적 웹 경험을 제공합니다.',
      features: [
        '스크린 리더 완전 지원',
        '키보드 네비게이션 최적화',
        '색상 대비 및 폰트 크기 최적화',
        '다국어 및 RTL 언어 지원'
      ]
    },
    {
      icon: TrendingUp,
      title: 'CRO 최적화',
      benefit: '전환율 300% 향상',
      description: '데이터 기반 사용자 행동 분석을 통해 전환율을 극대화하는 전략적 UX/UI 설계를 제공합니다.',
      features: [
        'A/B 테스트 기반 최적화',
        '히트맵 & 사용자 여정 분석',
        'CTA 버튼 위치 및 문구 최적화',
        '실시간 전환율 모니터링'
      ]
    },
    {
      icon: Settings,
      title: '운영 효율성',
      benefit: '관리 시간 80% 단축',
      description: '직관적인 관리 시스템과 자동화된 워크플로우로 콘텐츠 관리와 유지보수를 간소화합니다.',
      features: [
        'CMS 자동 업데이트 시스템',
        '원클릭 백업 & 복원',
        '보안 모니터링 & 자동 패치',
        '성능 분석 대시보드 제공'
      ]
    }
  ]

  return (
    <section className="section-padding bg-dark" aria-label="CHIRO를 선택해야 하는 이유">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            WHY CHIRO
          </div>
          <h2 className="font-pretendard font-bold mb-6">
            <span className="text-gradient">성과 중심 웹</span>으로<br />
            비즈니스를 가속화하세요
          </h2>
          <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
            단순한 웹사이트가 아닌, 비즈니스 성과를 극대화하는 전략적 디지털 자산을 구축합니다.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={value.title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ValueCard {...value} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-accent-green/5 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-pretendard font-semibold text-white mb-4">
              성과 중심 웹사이트로 전환할 준비가 되셨나요?
            </h3>
            <p className="text-neutral-light/70 mb-6">
              무료 성과 진단과 맞춤형 개선 전략을 받아보세요.
            </p>
            <button className="btn-primary group">
              무료 성과 분석 받기
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}