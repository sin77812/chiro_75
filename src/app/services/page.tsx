'use client'

import React from 'react'
// import { Metadata } from 'next' // Removed for client component
import { Play, ArrowRight, CheckCircle, TrendingUp, Shield, Zap, Users, Globe, Code, Palette, Search } from 'lucide-react'
import Link from 'next/link'
import servicesData from '@/data/services.json'
import ScrollReveal, { FadeUp, FadeLeft, FadeRight } from '@/components/ui/ScrollReveal'
import PageCTA from '@/components/sections/PageCTA'
import ProcessFlow from '@/components/sections/ProcessFlow'
import { SkipNav, AccessibleButton, AccessibleLink, AccordionItem, ScreenReaderText } from '@/components/ui/AccessibleComponents'
import { LazyImage, OptimizedVideo, LazyContent, ResourceHints, Preload } from '@/components/ui/PerformanceComponents'
import { OrganizationStructuredData, ServicesPageStructuredData, FAQStructuredData, WebPageStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { ServiceAnalytics, EcommerceTracking } from '@/components/analytics/Analytics'

// Metadata moved to layout.tsx for client component compatibility

// Service category icons mapping
const categoryIcons = {
  'web-development': Code,
  'ui-ux-design': Palette,
  'performance-optimization': Zap,
  'digital-marketing': TrendingUp,
  'maintenance-support': Shield,
  'global-expansion': Globe,
  'ai-development': Search,
  'ecommerce': TrendingUp,
  'design-systems': Palette,
  'seo': Search,
  'operations': Users,
  'motion-3d': Play
}

// Business impact KPIs
const businessKPIs = [
  { label: '평균 전환율 향상', value: '+147%', context: '50+ B2B 클라이언트 기준' },
  { label: '페이지 로딩 속도 개선', value: '1.8초 → 0.9초', context: 'Core Web Vitals 최적화' },
  { label: '검색 트래픽 증가', value: '+280%', context: 'SEO 및 기술 최적화' },
  { label: '모바일 사용자 참여도', value: '+195%', context: '반응형 디자인 우수성' }
]


// Differentiation points
const differentiationPoints = [
  {
    icon: Search,
    title: 'AI 기반 개발',
    description: 'Claude Code 활용으로 개발 속도 40%↑, 코드 품질 강화'
  },
  {
    icon: Shield,
    title: '접근성 표준 준수',
    description: 'WCAG 2.1 AA 충족으로 모든 사용자가 편하게 이용'
  },
  {
    icon: Zap,
    title: '성능 최적화',
    description: 'Core Web Vitals 90+로 UX와 SEO 동시 향상'
  },
  {
    icon: Users,
    title: '완전한 문서화',
    description: '누구나 이어받아도 빠르게 이해 가능한 기술 문서 제공'
  }
]

// FAQ data
const faqData = [
  {
    question: '일반적인 프로젝트 일정은 어떻게 되나요?',
    answer: '대부분의 프로젝트는 범위에 따라 6-12주 정도 소요됩니다. 정의 단계에서 명확한 마일스톤과 결과물과 함께 상세한 일정을 제공합니다.'
  },
  {
    question: '서비스 가격은 어떻게 책정되나요?',
    answer: '프로젝트 범위에 따라 유연한 가격을 제공합니다: 스타터 (1500만원-3000만원), 스탠다드 (3000만원-6000만원), 엔터프라이즈 (6000만원+). 상세한 견적은 문의해 주세요.'
  },
  {
    question: '지속적인 유지보수를 제공하나요?',
    answer: '네, 24/7 모니터링, 보안 업데이트, 성능 최적화, 콘텐츠 관리 지원을 포함한 포괄적인 유지보수 패키지를 제공합니다.'
  },
  {
    question: '기존 팀과 협업할 수 있나요?',
    answer: '물론입니다. 사내 팀과 원활하게 통합되며, 선호하는 도구를 사용하여 문서화, 교육, 협업 워크플로우를 제공합니다.'
  },
  {
    question: 'CHIRO가 다른 에이전시와 다른 점은 무엇인가요?',
    answer: 'AI 기반 개발 워크플로우, 접근성 준수에 대한 집중, 보장된 성능 지표, 포괄적인 문서화로 엔터프라이즈급 솔루션 제공에서 차별화됩니다.'
  }
]

export default function ServicesPage() {
  // Performance monitoring hook

  // Track page view and service list view
  React.useEffect(() => {
    ServiceAnalytics.viewService('services-overview', 'Services Overview Page')
    EcommerceTracking.viewItemList(
      servicesData.map(service => ({
        id: service.id,
        name: service.title,
        category: 'Service'
      }))
    )
  }, [])

  return (
    <>
      {/* Structured Data */}
      <OrganizationStructuredData />
      <ServicesPageStructuredData />
      <WebPageStructuredData
        title="Services | CHIRO - Enterprise Digital Solutions"
        description="Transform your business with AI-powered web development, UX/UI design, and digital strategy. Proven results for B2B companies."
        url="https://chiro.agency/services"
        breadcrumbs={[
          { name: 'Home', item: 'https://chiro.agency' },
          { name: 'Services' }
        ]}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', item: 'https://chiro.agency' },
          { name: 'Services' }
        ]}
      />
      <FAQStructuredData faqs={faqData} />

      {/* Resource optimization */}
      <ResourceHints 
        preconnect={['https://fonts.googleapis.com', 'https://cdn.sanity.io']}
        prefetch={['/portfolio', '/contact']}
        dnsPrefetch={['https://www.google-analytics.com']}
      />
      <Preload href="/image/CHIRO_service_vd.mp4" as="video" type="video/mp4" />
      
      <SkipNav />
      <main id="main-content" className="pt-18" role="main">
        {/* Hero Section */}
        <section className="relative section-padding bg-dark overflow-hidden" aria-label="Services overview">
          <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <FadeLeft>
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  엔터프라이즈 서비스
                </div>
                
                <h1 className="font-pretendard font-bold text-white leading-tight">
                  비즈니스를 혁신하는 
                  <span className="text-gradient block">AI 기반 디지털 솔루션</span>
                </h1>
                
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  와이어프레임부터 운영 플랫폼까지. 최첨단 기술과 전략적 디자인 사고를 통해 
                  측정 가능한 비즈니스 결과를 이끌어내는 엔터프라이즈급 웹 솔루션을 제공합니다.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <AccessibleButton 
                    variant="primary"
                    aria-label="프로젝트 맞춤 상담 받기"
                    onClick={() => {
                      ServiceAnalytics.clickServiceCTA('services-overview', 'primary', 'Get Custom Consultation')
                      EcommerceTracking.addToCart('consultation', 'Custom Consultation')
                    }}
                  >
                    맞춤 상담 받기
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </AccessibleButton>
                  <AccessibleLink 
                    href="/portfolio" 
                    className="btn-secondary group inline-flex items-center"
                    aria-label="포트폴리오 사례 연구 보기"
                    onClick={() => {
                      ServiceAnalytics.clickServiceCTA('services-overview', 'secondary', 'View Case Studies')
                    }}
                  >
                    사례 연구 보기
                    <Play className="ml-2 h-4 w-4" aria-hidden="true" />
                  </AccessibleLink>
                </div>
              </div>
            </FadeLeft>
            
            {/* Hero Video */}
            <FadeRight>
              <div className="relative">
                <div className="aspect-video rounded-2xl border border-primary/20 overflow-hidden">
                  <video
                    className="w-full h-full object-cover object-top scale-110 transform translate-y-[-5%]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadStart={() => {
                      ServiceAnalytics.playVideo('hero-services-demo', 'CHIRO Service Demo Video')
                    }}
                  >
                    <source src="/image/CHIRO_service_vd.mp4" type="video/mp4" />
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-2xl flex items-center justify-center border border-primary/20">
                      <div className="text-center space-y-4">
                        <Play className="w-16 h-16 text-primary mx-auto opacity-60" aria-hidden="true" />
                        <p className="text-neutral-light/60 text-sm">
                          CHIRO 서비스 데모 로딩 중
                        </p>
                      </div>
                    </div>
                  </video>
                </div>
                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent-green/10 rounded-full blur-2xl" aria-hidden="true" />
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Service Categories - From Main Page ServicesOverview */}
      <section className="section-padding bg-dark">
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
            {[
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
            ].map((service, index) => {
              const IconComponent = service.icon
              
              return (
                <FadeUp key={service.id} delay={index * 150}>
                  <Link href={service.link}>
                    <article 
                      className="group relative overflow-hidden rounded-2xl cursor-pointer h-[350px] lg:h-[400px]"
                      onClick={() => {
                        ServiceAnalytics.viewService(service.id, service.title)
                      }}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <div 
                          className="w-full h-full bg-cover bg-center transition-all duration-700 scale-100 grayscale group-hover:scale-110 group-hover:grayscale-0"
                          style={{ backgroundImage: `url(${service.backgroundImage})` }}
                        />
                        
                        {/* Overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-primary/20 transition-all duration-500" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                        {/* Icon & Category */}
                        <div className="flex items-start justify-between">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white/10 backdrop-blur-sm group-hover:bg-primary group-hover:scale-110">
                            <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                          </div>
                          
                          {/* Hover indicator */}
                          <div className="w-12 h-12 rounded-full border-2 border-white/30 group-hover:border-primary group-hover:bg-primary/20 group-hover:scale-110 flex items-center justify-center transition-all duration-300">
                            <div className="w-4 h-4 border-t-2 border-r-2 rotate-45 border-white group-hover:border-primary transition-colors duration-300" />
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
                              <span className="text-sm font-medium text-white/60 group-hover:text-primary transition-colors duration-300">
                                자세히 보기
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-2xl group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300" />
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
                href="/consultation"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent-green text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 focus:outline-none focus:ring-4 focus:ring-primary/50"
              >
                <span>무료 견적 받기</span>
                <div className="ml-3 w-2 h-2 bg-white rounded-full group-hover:animate-pulse" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Business Impact KPIs */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="font-pretendard font-bold mb-6">
                검증된 <span className="text-gradient">비즈니스 임팩트</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                50+ 엔터프라이즈 고객사에서 입증된 측정 가능한 결과
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessKPIs.map((kpi, index) => (
              <FadeUp key={index} delay={index * 100}>
                <div className="text-center p-6 rounded-xl bg-dark border border-shadow-gray/30">
                  <div className="text-3xl font-bold text-primary mb-2">{kpi.value}</div>
                  <div className="text-white font-medium mb-2">{kpi.label}</div>
                  <div className="text-sm text-neutral-light/60">{kpi.context}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow - Using main page component */}
      <ProcessFlow />

      {/* Differentiation Points - Lazy loaded */}
      <LazyContent
        fallback={
          <div className="section-padding bg-shadow-gray/10">
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="h-16 bg-shadow-gray/20 rounded-lg animate-pulse mb-6 max-w-lg mx-auto" />
                <div className="h-6 bg-shadow-gray/20 rounded animate-pulse max-w-2xl mx-auto" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-6 rounded-xl bg-shadow-gray/20 animate-pulse">
                    <div className="w-14 h-14 bg-shadow-gray/30 rounded-xl mx-auto mb-4" />
                    <div className="h-6 bg-shadow-gray/30 rounded mb-3" />
                    <div className="space-y-2">
                      <div className="h-4 bg-shadow-gray/30 rounded" />
                      <div className="h-4 bg-shadow-gray/30 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        threshold={0.2}
      >
        <section className="section-padding bg-shadow-gray/10">
          <div className="container-custom">
            <div className="text-center mb-16">
              <FadeUp>
                <h2 className="font-pretendard font-bold text-3xl md:text-4xl mb-4">
                  왜 <span className="text-gradient">CHIRO</span>를 선택해야 할까요
                </h2>
                <p className="text-lg text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  업계를 선도하는 기술과 검증된 방법론
                </p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiationPoints.map((point, index) => {
                const IconComponent = point.icon
                return (
                  <FadeUp key={index} delay={index * 100}>
                    <div className="text-center p-4 rounded-xl bg-dark border border-shadow-gray/30 hover:border-primary/30 transition-all duration-300">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-base font-pretendard font-semibold text-white mb-2">
                        {point.title}
                      </h3>
                      <p className="text-xs text-neutral-light/70 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </FadeUp>
                )
              })}
            </div>
          </div>
        </section>
      </LazyContent>

      {/* FAQ Section */}
      <section className="section-padding bg-dark" aria-label="Frequently asked questions">
        <div className="container-custom">
          <header className="text-center mb-16">
            <FadeUp>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                자주 묻는 질문
              </div>
              <h2 className="font-pretendard font-bold mb-6">
                자주 묻는 <span className="text-gradient">질문들</span>
              </h2>
            </FadeUp>
          </header>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <FadeUp key={index} delay={index * 100}>
                <div
                  onClick={() => {
                    ServiceAnalytics.expandFAQ(faq.question, index)
                  }}
                >
                  <AccordionItem
                    id={`faq-${index}`}
                    title={faq.question}
                    defaultOpen={index === 0}
                  >
                    <p className="text-neutral-light/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionItem>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Strong Conversion CTA */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-dark to-accent-green/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <FadeUp>
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary font-medium text-sm mb-4">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  혁신할 준비가 되셨나요
                </div>
                
                <h2 className="font-pretendard font-bold text-white leading-tight">
                  디지털 비전을 
                  <span className="text-gradient block">측정 가능한 비즈니스 결과로</span>
                </h2>
                
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  CHIRO의 검증된 방법론과 최첨단 기술로 디지털 존재감을 혁신한 
                  50+ 엔터프라이즈 고객사에 합류하세요.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {/* Quick Contact Form */}
                  <div className="p-6 rounded-xl bg-dark/50 border border-primary/20 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">맞춤 견적 받기</h3>
                    <form 
                      className="space-y-4" 
                      aria-label="Quick consultation request form"
                      onFocus={() => {
                        ServiceAnalytics.startForm('quote')
                      }}
                      onSubmit={(e) => {
                        e.preventDefault()
                        ServiceAnalytics.completeForm('quote', { 
                          page: 'services',
                          form_location: 'cta_section'
                        })
                        EcommerceTracking.purchase('consultation', 'Custom Consultation Quote', 'Quick Quote')
                      }}
                    >
                      <div>
                        <label htmlFor="contact-name" className="sr-only">Your Name</label>
                        <input 
                          id="contact-name"
                          type="text" 
                          placeholder="이름" 
                          className="input-field"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="sr-only">회사 이메일</label>
                        <input 
                          id="contact-email"
                          type="email" 
                          placeholder="회사 이메일" 
                          className="input-field"
                          required
                          aria-required="true"
                          aria-describedby="email-help"
                        />
                        <div id="email-help" className="sr-only">
                          맞춤 견적을 보내드릴 이메일 주소입니다
                        </div>
                      </div>
                      <div>
                        <label htmlFor="budget-range" className="sr-only">예산 범위</label>
                        <select 
                          id="budget-range"
                          className="input-field"
                          required
                          aria-required="true"
                        >
                          <option value="">예산 범위 선택</option>
                          <option value="15k-30k">1,500만원 - 3,000만원</option>
                          <option value="30k-60k">3,000만원 - 6,000만원</option>
                          <option value="60k+">6,000만원+</option>
                        </select>
                      </div>
                      <AccessibleButton type="submit" variant="primary" className="w-full">
                        맞춤 상담 받기
                      </AccessibleButton>
                    </form>
                  </div>
                  
                  {/* Calendar Booking */}
                  <div className="p-6 rounded-xl bg-dark/50 border border-accent-green/20 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">전략 상담 예약</h3>
                    <div className="space-y-4">
                      <p className="text-neutral-light/70 text-sm">
                        프로젝트 목표와 요구사항을 논의하는 30분 상담
                      </p>
                      <div className="space-y-2 text-sm text-neutral-light/60">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent-green mr-2" />
                          무료 프로젝트 평가
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent-green mr-2" />
                          기술 권장사항
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent-green mr-2" />
                          일정 및 예산 견적
                        </div>
                      </div>
                      <AccessibleButton 
                        className="w-full bg-accent-green hover:bg-accent-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-dark"
                        aria-label="무료 30분 전략 상담 통화 예약하기"
                      >
                        무료 통화 예약
                      </AccessibleButton>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}