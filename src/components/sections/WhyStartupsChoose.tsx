'use client'

import { DollarSign, Zap, MessageCircle, TrendingUp } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

const reasons = [
  {
    icon: DollarSign,
    title: '에이전시 절반 가격',
    description: '1인 기업이라 중간 마진 없이 합리적 가격 제공',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    icon: Zap,
    title: '2주 스피드 개발',
    description: 'AI 도구 활용으로 개발 기간 50% 단축',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    icon: MessageCircle,
    title: '대표 직접 소통',
    description: '담당자 변경 없이 처음부터 끝까지 일관된 커뮤니케이션',
    gradient: 'from-blue-400 to-indigo-500'
  },
  {
    icon: TrendingUp,
    title: '성장 파트너',
    description: 'MVP부터 시작해 스케일업까지 함께하는 장기 파트너십',
    gradient: 'from-purple-400 to-pink-500'
  }
]

export default function WhyStartupsChoose() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-primary font-medium mb-4">선택하는 이유</p>
            <h2 className="font-pretendard font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              스타트업 대표님들이<br />
              <span className="text-gradient">Chiro를 선택하는 이유</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon
            return (
              <FadeUp key={index} delay={index * 150}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:bg-white/10 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}