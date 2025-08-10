'use client'

import { Search, Target, Palette, Code, TrendingUp, CheckCircle } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  deliverables: string[]
  icon: any
  color: string
}

const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description: '비즈니스 목표와 사용자 니즈를 깊이 이해합니다',
    deliverables: ['시장 분석', '경쟁사 리서치', '사용자 인터뷰'],
    icon: Search,
    color: 'text-blue-400'
  },
  {
    id: 'define',
    number: '02', 
    title: 'Define',
    description: '명확한 전략과 실행 가능한 로드맵을 수립합니다',
    deliverables: ['프로젝트 전략', '기술 아키텍처', '콘텐츠 기획'],
    icon: Target,
    color: 'text-purple-400'
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    description: '사용자 중심의 직관적이고 매력적인 경험을 설계합니다',
    deliverables: ['디자인 시스템', 'UI/UX 설계', '프로토타입'],
    icon: Palette,
    color: 'text-pink-400'
  },
  {
    id: 'build',
    number: '04',
    title: 'Build',
    description: '최신 기술로 확장 가능한 솔루션을 구축합니다',
    deliverables: ['개발 & 구현', '품질 테스트', '성능 최적화'],
    icon: Code,
    color: 'text-accent-green'
  },
  {
    id: 'optimize',
    number: '05',
    title: 'Optimize',
    description: '데이터 기반으로 지속적인 개선과 성장을 지원합니다',
    deliverables: ['성과 분석', '지속 개선', '성장 지원'],
    icon: TrendingUp,
    color: 'text-primary'
  }
]

export default function ProcessFlow() {
  return (
    <section className="section-padding bg-background-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-primary rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 border border-accent-green rounded-lg rotate-45 animate-pulse delay-500" />
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 border border-primary/50 rounded-full animate-pulse delay-1000" />
        </div>
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeUp>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              <Target className="w-4 h-4 mr-2" />
              검증된 프로세스
            </div>
            <h2 className="font-pretendard font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
              성공을 위한
              <br />
              <span className="text-gradient">5단계 여정</span>
            </h2>
            <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
              체계적이고 투명한 프로세스로 프로젝트 성공을 보장합니다
            </p>
          </FadeUp>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-accent-green/40 to-primary/20 transform -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-4">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              
              return (
                <FadeUp key={step.id} delay={index * 200}>
                  <div className="group relative">
                    {/* Step Card */}
                    <div className="relative bg-background-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-8">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {step.number}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className={`w-7 h-7 ${step.color} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-pretendard font-bold text-white">
                          {step.title}
                        </h3>
                        
                        <p className="text-white/70 text-sm leading-relaxed">
                          {step.description}
                        </p>

                        {/* Deliverables */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-primary uppercase tracking-wide">
                            주요 산출물
                          </p>
                          <div className="space-y-2">
                            {step.deliverables.map((deliverable, idx) => (
                              <div key={idx} className="flex items-center text-xs text-white/60">
                                <CheckCircle className="w-3 h-3 text-accent-green mr-2 flex-shrink-0" />
                                {deliverable}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent-green/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
                    </div>

                    {/* Connection Arrow (Desktop) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-primary/40 rotate-45" />
                      </div>
                    )}
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-20">
          <FadeUp delay={1000}>
            <div className="text-center">
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-white">투명한 소통</h4>
                  <p className="text-sm text-white/60">매 단계별 진행상황을 실시간으로 공유합니다</p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 text-accent-green" />
                  </div>
                  <h4 className="font-semibold text-white">품질 보장</h4>
                  <p className="text-sm text-white/60">각 단계별 검수를 통해 최고 품질을 보장합니다</p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-white">지속 성장</h4>
                  <p className="text-sm text-white/60">런칭 후에도 데이터 기반 개선을 지원합니다</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}