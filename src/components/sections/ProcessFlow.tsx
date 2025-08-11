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
    number: '1',
    title: '발견 & 전략',
    description: '비즈니스 목표 분석과 사용자 리서치를 통한 전략 수립',
    deliverables: ['사용자 페르소나', '정보 아키텍처', '기술 스펙'],
    icon: Search,
    color: 'text-primary'
  },
  {
    id: 'design',
    number: '2', 
    title: '디자인 & 프로토타입',
    description: 'UX/UI 디자인과 인터랙티브 프로토타입 제작',
    deliverables: ['와이어프레임', '디자인 시스템', '프로토타입'],
    icon: Palette,
    color: 'text-primary'
  },
  {
    id: 'develop',
    number: '3',
    title: '개발 & 구축',
    description: '최신 기술 스택으로 고성능 웹사이트 개발',
    deliverables: ['프론트엔드', '백엔드', 'CMS 연동'],
    icon: Code,
    color: 'text-primary'
  },
  {
    id: 'test',
    number: '4',
    title: '테스트 & 최적화',
    description: '품질 보증과 성능 최적화',
    deliverables: ['QA 리포트', '성능 최적화', '보안 검수'],
    icon: CheckCircle,
    color: 'text-primary'
  },
  {
    id: 'launch',
    number: '5',
    title: '런칭 & 지원',
    description: '배포와 운영 지원',
    deliverables: ['배포', '모니터링 설정', '교육 자료'],
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
        <div className="text-center mb-16">
          <FadeUp>
            <h2 className="font-pretendard font-black text-3xl md:text-4xl text-white mb-4 leading-tight">
              검증된 개발 프로세스
            </h2>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto">
              5단계 체계적 프로세스로 프로젝트 성공을 보장합니다
            </p>
          </FadeUp>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon
            const duration = ['1-2주', '2-3주', '3-6주', '1-2주', '1주'][index]
            
            return (
              <FadeUp key={step.id} delay={index * 150}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:bg-white/10">
                  {/* Step Number and Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                      {duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                      주요 산출물
                    </h4>
                    <div className="space-y-1">
                      {step.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center text-xs text-white/60">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0" />
                          {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools Section */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      협업 도구
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {step.id === 'discover' && ['Figma', 'Miro', 'Analytics'].map((tool) => (
                        <span key={tool} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                      {step.id === 'design' && ['Figma', 'Principle', 'ProtoPie'].map((tool) => (
                        <span key={tool} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                      {step.id === 'develop' && ['Next.js', 'TypeScript', 'Vercel'].map((tool) => (
                        <span key={tool} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                      {step.id === 'test' && ['Cypress', 'Lighthouse', 'WAVE'].map((tool) => (
                        <span key={tool} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                      {step.id === 'launch' && ['Vercel', 'Analytics', 'Hotjar'].map((tool) => (
                        <span key={tool} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}