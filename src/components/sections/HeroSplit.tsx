'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { colors, typography, motion } from '@/lib/design-system'

export default function HeroSplit() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0E1111]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E1111] via-transparent to-[#0E1111]/20 z-10" />
      
      {/* Grid pattern overlay - very subtle */}
      <div 
        className="absolute inset-0 z-[5] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${colors.border.default} 1px, transparent 1px), linear-gradient(90deg, ${colors.border.default} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-20 w-full max-w-[1320px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content (40%) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1DB954]/20 bg-[#1DB954]/5">
              <Sparkles className="w-4 h-4 text-[#1DB954]" />
              <span className="text-sm font-medium text-[#1DB954]">업계 최상위 품질</span>
            </div>

            {/* Headline */}
            <h1 
              className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-[-0.03em] text-[#F5F7FA]"
              data-analytics-key="hero-headline"
            >
              AI 기반 웹 디자인으로
              <span className="text-[#1DB954] block mt-2">전환을 설계합니다.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#C9CFD6] leading-[1.6] max-w-lg">
              속도·접근성·CRO를 표준으로 하는,<br />
              업계 최상위 품질의 웹 경험.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1DB954] hover:bg-[#1ED760] text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(29,185,84,0.3)]"
                data-analytics-key="hero-cta-primary"
              >
                무료 상담
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#1DB954]/30 hover:border-[#1DB954]/50 text-[#F5F7FA] font-medium rounded-lg transition-all duration-200 hover:bg-[#1DB954]/5"
                data-analytics-key="hero-cta-secondary"
              >
                3분 성과 체크
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-[#1DB954]">150+</p>
                <p className="text-sm text-[#8B949E]">완료 프로젝트</p>
              </div>
              <div className="w-px h-10 bg-[#1A1F1F]" />
              <div>
                <p className="text-2xl font-bold text-[#1DB954]">4.9/5</p>
                <p className="text-sm text-[#8B949E]">고객 만족도</p>
              </div>
              <div className="w-px h-10 bg-[#1A1F1F]" />
              <div>
                <p className="text-2xl font-bold text-[#1DB954]">+187%</p>
                <p className="text-sm text-[#8B949E]">평균 전환율</p>
              </div>
            </div>
          </div>

          {/* Right: Video/Visual (60%) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-[#0A0C0C] border border-[#1A1F1F]">
              {/* Video placeholder - replace with actual video */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#0E1111] to-[#1A1F1F]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/hero-poster.jpg"
                >
                  <source src="/videos/hero-loop.mp4" type="video/mp4" />
                </video>
                
                {/* Wireframe to UI transformation overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#0E1111]/80 backdrop-blur-sm rounded-full border border-[#1DB954]/30">
                      <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-[#C9CFD6]">
                        와이어프레임 → 하이파이 UI 실시간 전환
                      </span>
                    </div>
                  </div>
                </div>

                {/* Green accent scan line animation */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1DB954] to-transparent opacity-60 animate-scan" />
              </div>
            </div>

            {/* Visual description */}
            <p className="mt-4 text-sm text-[#8B949E] text-center">
              6-8초 무음 루프 · 실시간 디자인 시스템 변환 시뮬레이션
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[#8B949E] uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#1DB954] to-transparent animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </section>
  )
}