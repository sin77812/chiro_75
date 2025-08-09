import { Metadata } from 'next'
import { AlertTriangle, Target, Zap } from 'lucide-react'
import ServiceCards from '@/components/sections/ServiceCards'
import PageCTA from '@/components/sections/PageCTA'
import ScrollReveal, { FadeUp, FadeLeft, FadeRight } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: '서비스 - CHIRO',
  description: '웹사이트 개발부터 디지털 마케팅까지, CHIRO의 전문 서비스를 확인하세요.',
}

export default function ServicesPage() {
  return (
    <main className="pt-18">
      {/* Hero Section with Problem → Solution Flow */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
              SERVICES
            </div>
            <h1 className="font-pretendard font-bold text-white mb-6">
              B2B 기업이 직면한 <span className="text-gradient">디지털 과제</span>를<br />
              해결하는 전문 서비스
            </h1>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
              단순한 웹사이트 제작이 아닌, 비즈니스 성과를 만들어내는 전략적 접근으로 
              고객의 성공을 함께 만들어갑니다.
            </p>
          </div>

          {/* Problem → Solution Flow */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Problem Side */}
            <FadeLeft>
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl font-pretendard font-bold text-white">
                  이런 <span className="text-red-400">문제</span>들 때문에 고민이세요?
                </h2>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "오래된 웹사이트",
                    description: "모바일에서 제대로 보이지 않고, 로딩이 너무 느려서 고객이 이탈한다"
                  },
                  {
                    title: "낮은 온라인 가시성",
                    description: "구글에서 우리 회사를 찾기 어렵고, 온라인 문의가 거의 없다"
                  },
                  {
                    title: "브랜드 신뢰도 부족",
                    description: "경쟁사 대비 전문성이 제대로 어필되지 않아 큰 계약을 놓친다"
                  },
                  {
                    title: "해외 진출 어려움",
                    description: "글로벌 시장 진출을 위한 다국어 사이트와 현지화 전략이 없다"
                  }
                ].map((problem, index) => (
                  <div key={index} className="flex space-x-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">{problem.title}</h3>
                      <p className="text-neutral-light/70 text-sm leading-relaxed">{problem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </FadeLeft>

            {/* Solution Side */}
            <FadeRight>
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-pretendard font-bold text-white">
                  CHIRO의 <span className="text-gradient">해결 방식</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "성과 중심 전략",
                    description: "단순 제작이 아닌 비즈니스 목표 달성을 위한 데이터 기반 전략 수립",
                    icon: "🎯"
                  },
                  {
                    title: "최신 기술 적용",
                    description: "모바일 퍼스트, 고속 로딩, SEO 최적화로 사용자 경험과 검색 노출 극대화",
                    icon: "⚡"
                  },
                  {
                    title: "브랜드 신뢰도 구축",
                    description: "업계 특성을 반영한 전문적 디자인과 고객 사례로 신뢰성 강화",
                    icon: "🏆"
                  },
                  {
                    title: "글로벌 진출 지원",
                    description: "다국어 지원과 현지화 전략으로 해외 시장 진출 토대 마련",
                    icon: "🌍"
                  }
                ].map((solution, index) => (
                  <div key={index} className="flex space-x-4 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">{solution.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">{solution.title}</h3>
                      <p className="text-neutral-light/70 text-sm leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </FadeRight>
          </div>

          {/* CTA to Services */}
          <FadeUp delay={200}>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <p className="text-primary font-medium">이제 구체적인 해결책을 확인해보세요</p>
            </div>
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          </FadeUp>
        </div>
      </section>

      {/* Service Cards */}
      <ServiceCards />
      
      {/* CTA */}
      <PageCTA />
    </main>
  )
}