'use client'

import { ArrowRight } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface ProcessStep {
  id: string
  phase: string
  title: string
  duration: string
  description: string
  deliverables: string[]
  keyActivities: string[]
}

const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    phase: '01',
    title: '요구사항 파악',
    duration: 'Week 1',
    description: '비즈니스 목표와 타겟 고객 분석, 필요 기능 정의',
    deliverables: ['사이트맵 설계', '기능 명세서', '디자인 시안'],
    keyActivities: ['비즈니스 목표 정의', '타겟 고객 분석', '경쟁사 벤치마킹', '기술 스택 평가']
  },
  {
    id: 'define',
    phase: '02',
    title: '디자인 개발',
    duration: 'Week 2',
    description: '디자인 시안 제작 및 개발 시작, 피드백 반영',
    deliverables: ['최종 디자인', '개발 진행상황', '테스트 페이지'],
    keyActivities: ['정보 아키텍처 설계', '기능 명세 작성', '콘텐츠 전략 수립', '개발 로드맵 작성']
  },
  {
    id: 'design',
    phase: '03',
    title: '최종 테스트',
    duration: 'Week 3',
    description: '최종 테스트, 버그 수정, 성능 최적화',
    deliverables: ['완성된 웹사이트', '테스트 보고서', '사용 가이드'],
    keyActivities: ['와이어프레임 제작', 'UI 디자인', '프로토타입 개발', '사용성 테스트']
  },
  {
    id: 'develop',
    phase: '04',
    title: '오픈 & 교육',
    duration: '런칭일',
    description: '최종 오픈, 관리자 교육, 1년 무료 관리 시작',
    deliverables: ['운영 웹사이트', '관리자 가이드', '애널리틱스 설정'],
    keyActivities: ['사이트 오픈', '관리자 교육', '구글 애널리틱스 연동', '초기 모니터링']
  }
]

export default function ProcessFlow() {
  return (
    <section id="process-flow" className="section-padding bg-background-primary relative overflow-hidden">
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <FadeUp>
            <p className="text-primary font-medium mb-4">우리의 프로세스</p>
            <h2 className="font-pretendard font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              전략적 개발 방법론
            </h2>
            <p className="text-xl text-white/70 font-light">
              검증된 5단계 프로세스로 투명하고 예측 가능한 결과 제공
            </p>
          </FadeUp>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
          
          {/* Process Steps */}
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <FadeUp key={step.id} delay={index * 100}>
                <div className="relative flex flex-col lg:flex-row gap-8 group">
                  {/* Phase Number */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-16 h-16 bg-background-primary border border-white/20 rounded-2xl flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                        <span className="text-2xl font-bold text-primary">{step.phase}</span>
                      </div>
                      {/* Connection Dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-2 h-2 bg-primary rounded-full hidden lg:block" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                        <span className="text-sm text-white/50 bg-white/10 px-3 py-1 rounded-full inline-block">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div className="md:col-span-1 lg:col-span-1">
                      <h4 className="text-sm font-semibold text-white/50 mb-3 uppercase tracking-wider">
                        주요 결과물:
                      </h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start text-white/70">
                            <ArrowRight className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Representation */}
                    <div className="md:col-span-1 lg:col-span-1">
                      <div className="relative h-48 bg-white/5 rounded-xl border border-white/10 overflow-hidden group-hover:border-primary/30 transition-colors duration-300">
                        {/* Placeholder for process visualization */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl font-bold text-white/10 mb-2">{step.phase}</div>
                            <div className="text-xs text-white/30 uppercase tracking-wider">프로세스 시각화</div>
                          </div>
                        </div>
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <FadeUp delay={600}>
            <div className="inline-flex flex-col items-center">
              <p className="text-white/70 mb-4">
                더 자세한 프로세스가 궁금하신가요?
              </p>
              <button className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <span className="font-medium">프로세스 문서 다운로드</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}