'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Play, Sparkles } from 'lucide-react'

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-18">
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback Background Image */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-dark via-primary-dark to-dark"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(29, 185, 84, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(15, 170, 68, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(29, 185, 84, 0.05) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(29, 185, 84, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(29, 185, 84, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i * 10)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + (i * 0.5)}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Optional Video (comment out if no video available) */}
        {/* 
        <video
          className="w-full h-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop"
        >
          <source src="/videos/hero-abstract-green.mp4" type="video/mp4" />
          <source src="/videos/hero-abstract-green.webm" type="video/webm" />
        </video>
        */}
        
        {/* Dark Gradient Overlay + Subtle Noise */}
        <div className="gradient-overlay" />
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <div 
            className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 animate-fade-in"
            role="banner"
          >
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">
              AI 기반 웹 디자인 솔루션
            </span>
          </div>

          {/* Main Headline - Fixed heading hierarchy */}
          <h1 className="font-pretendard font-bold text-white animate-slide-up">
            <span className="text-gradient">AI 기반 웹 디자인</span>으로<br />
            성과를 설계합니다
          </h1>

          {/* Sub Headline */}
          <p className="text-xl md:text-2xl text-neutral-light/80 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            CHIRO는 AI와 인간 중심 UX로 전환을 극대화하는<br />
            디지털 경험을 만듭니다
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
            <Link href="/contact" className="btn-primary group">
              무료 상담 요청
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/portfolio" className="btn-secondary group">
              <Play className="mr-2 h-4 w-4" />
              사례 보기
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-in animation-delay-600">
            {[
              { value: '150+', label: '프로젝트 완성', ariaLabel: '150개 이상의 프로젝트 완성' },
              { value: '98%', label: '고객 만족도', ariaLabel: '98% 고객 만족도' },
              { value: '300%', label: '평균 전환율 증가', ariaLabel: '평균 300% 전환율 증가' },
              { value: '24시간', label: '평균 응답 시간', ariaLabel: '24시간 이내 평균 응답' },
            ].map((stat, index) => (
              <div key={index} className="text-center" role="img" aria-label={stat.ariaLabel}>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-light/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}