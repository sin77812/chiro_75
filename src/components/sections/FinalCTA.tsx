'use client'

import { useState, useEffect } from 'react'
import { Zap, Clock, CheckCircle } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

export default function FinalCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-black" />
        
        {/* Animated Green Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 185, 84, 0.15), transparent 40%)`
          }}
        />
        
        {/* Additional gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-green/10 to-transparent" />
      </div>

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 border border-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-accent-green rounded-lg rotate-45 animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 border border-primary/50 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-accent-green/50 rounded-lg rotate-12 animate-pulse delay-700" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <FadeUp>
            {/* Pre-headline */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-accent-green/20 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-8 border border-primary/30">
              <Zap className="w-4 h-4 mr-2" />
              지금 바로 시작하세요
            </div>

            {/* Main Headline - Direct and Action-oriented */}
            <h2 className="font-pretendard font-black text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              <span className="block">지금 시작하면</span>
              <span className="block">
                <span className="text-gradient">2주 후</span> 오픈합니다
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-white/80 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              무료 상담으로 시작하세요. 부담 없이 물어보세요.
            </p>
          </FadeUp>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <FadeUp delay={300}>
              <button className="group relative px-12 py-5 bg-gradient-to-r from-primary to-accent-green text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50 overflow-hidden">
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-green to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative flex items-center justify-center">
                  무료 견적 받기
                  <div className="ml-3 w-3 h-3 bg-white rounded-full group-hover:animate-bounce" />
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 -translate-x-full" />
              </button>
            </FadeUp>

            <FadeUp delay={500}>
              <button className="group px-10 py-4 border-2 border-white/40 hover:border-white text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30">
                <span className="flex items-center justify-center">
                  <Clock className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  2주 완성 프로세스 보기
                </span>
              </button>
            </FadeUp>
          </div>

          {/* Trust Indicators */}
          <FadeUp delay={700}>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0" />
                <span className="text-white/80">
                  <strong className="text-white">24시간</strong> 내 첫 응답
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0" />
                <span className="text-white/80">
                  <strong className="text-white">무료</strong> 프로젝트 컨설팅
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0" />
                <span className="text-white/80">
                  <strong className="text-white">100%</strong> 만족도 보장
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Contact Info */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <FadeUp delay={900}>
              <div className="space-y-6">
                <p className="text-white/60 text-sm">
                  바로 연결하고 싶다면
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="group bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                    💬 카톡 상담
                  </button>
                  <a 
                    href="tel:+82-10-1234-5678" 
                    className="group bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    📞 전화 상담
                  </a>
                  <a 
                    href="mailto:hello@chiro.agency" 
                    className="group bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    ✉️ 이메일 문의
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent-green rounded-full animate-ping opacity-40 delay-500" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping opacity-50 delay-1000" />
        <div className="absolute top-2/3 left-1/6 w-1 h-1 bg-accent-green/60 rounded-full animate-ping opacity-30 delay-700" />
      </div>
    </section>
  )
}