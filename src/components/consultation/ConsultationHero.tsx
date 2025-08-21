'use client'

import { Clock, CheckCircle, Phone, DollarSign } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

export default function ConsultationHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background-primary via-background-secondary to-background-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-accent-green rounded-lg rotate-45 animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 border border-primary/50 rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            {/* Trust Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-accent-green/20 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-8 border border-primary/30">
              <Clock className="w-4 h-4 mr-2" />
              평균 응답시간 30분
            </div>

            {/* Main Headline */}
            <h1 className="font-pretendard font-black text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              딱 <span className="text-gradient">3분</span>이면<br />
              견적이 나옵니다
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              몇 가지 질문에 답하시면, 맞춤 견적과 제작 기간을<br />
              즉시 확인하실 수 있습니다
            </p>
          </FadeUp>

          {/* Trust Points */}
          <FadeUp delay={300}>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0" />
                <span className="text-white font-medium">5개 프로젝트 진행 중</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-white font-medium">24시간 내 연락 보장</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <DollarSign className="w-6 h-6 text-accent-green flex-shrink-0" />
                <span className="text-white font-medium">부담 없는 무료 상담</span>
              </div>
            </div>
          </FadeUp>

          {/* Scroll Indicator */}
          <FadeUp delay={600}>
            <div className="mt-16">
              <div className="w-6 h-10 mx-auto border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
              </div>
              <p className="text-white/60 text-sm mt-4">아래로 스크롤하여 시작하세요</p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-primary rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent-green rounded-full animate-ping opacity-40 delay-500" />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping opacity-50 delay-1000" />
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-accent-green/60 rounded-full animate-ping opacity-30 delay-700" />
      </div>
    </section>
  )
}