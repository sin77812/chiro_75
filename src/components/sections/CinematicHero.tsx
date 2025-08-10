'use client'

import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'

export default function CinematicHero() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a brief delay for cinematic effect
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="/images/hero-poster.jpg"
        >
          <source src="/image/backgroundvod.mp4" type="video/mp4" />
          {/* Fallback background image */}
          <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-primary" />
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-primary/60 via-transparent to-background-primary/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ease-out ${
          showContent 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          {/* Main Headline - Impact in 7-8 words */}
          <h1 className="font-pretendard font-black text-white mb-6 leading-tight">
            <span className="block text-5xl md:text-7xl lg:text-8xl">
              브랜드를
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl">
              <span className="text-gradient">혁신</span>하다
            </span>
          </h1>

          {/* Subtitle - One powerful line */}
          <p className="text-xl md:text-2xl text-white/90 font-light mb-12 tracking-wide">
            디지털 경험의 새로운 기준을 제시합니다
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA - Solid Green */}
            <button 
              className="group px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 focus:outline-none focus:ring-4 focus:ring-primary/50"
              aria-label="프로젝트 상담 시작하기"
            >
              <span className="flex items-center justify-center">
                프로젝트 시작하기
                <div className="ml-3 w-2 h-2 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
              </span>
            </button>

            {/* Secondary CTA - Outline */}
            <button 
              className="group px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30"
              aria-label="포트폴리오 둘러보기"
            >
              <span className="flex items-center justify-center">
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                포트폴리오 보기
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          showContent ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Background Pattern - Subtle geometric shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-primary/20 rounded-lg rotate-45 animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 border border-primary/25 rounded-full animate-pulse delay-1000" />
      </div>

      {/* Performance metrics overlay - Subtle */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-mono hidden lg:block">
        <div className="space-y-1">
          <div>LCP: &lt;1.2s</div>
          <div>FID: &lt;100ms</div>
          <div>CLS: &lt;0.1</div>
        </div>
      </div>
    </section>
  )
}