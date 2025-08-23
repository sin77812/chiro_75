'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowUpRight, Palette } from 'lucide-react'
import { fadeUp, microBounce } from '@/features/motion/variants'
import { useScrollVideo } from '@/features/hooks/useScrollVideo'

// Case data
const caseData = {
  id: 1,
  title: 'ManufacturingCorp 글로벌 포털',
  company: 'ManufacturingCorp',
  category: '제조업 B2B',
  kpi: {
    label: '해외 문의',
    value: '+320%',
    period: '3개월'
  },
  description: 'B2B 제조업 특성에 맞춘 글로벌 진출용 웹사이트 구축',
  videoSrc: '/videos/case-preview.mp4', // Placeholder - replace with actual video
  posterSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop&q=80',
  duration: 8, // seconds
  ctaUrl: '/case/manufacturing-corp',
}

// Color overlay options
const colorOverlays = [
  { id: 'none', name: '오버레이 없음', class: '' },
  { id: 'deep', name: '딥 모드', class: 'bg-black/60' },
  { id: 'light', name: '라이트 모드', class: 'bg-white/10' },
] as const

type OverlayMode = typeof colorOverlays[number]['id']

export default function FFCaseVideo() {
  const [overlayMode, setOverlayMode] = useState<OverlayMode>('deep')
  const [showControls, setShowControls] = useState(false)
  const { 
    videoRef, 
    containerRef, 
    progress, 
    currentTime, 
    isInView, 
    prefersReducedMotion 
  } = useScrollVideo({ 
    durationSec: caseData.duration 
  })

  const handleCTAClick = () => {
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_content', {
        content_type: 'case_cta',
        item_id: caseData.id.toString(),
        item_name: caseData.title,
      })
    }
  }

  const currentOverlay = colorOverlays.find(overlay => overlay.id === overlayMode)

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: 'var(--bg, #0A0F0A)',
      }}
      aria-labelledby="case-video-heading"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Container */}
      <div className="relative w-full h-screen">
        {/* Video Element */}
        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            poster={caseData.posterSrc}
            style={{ aspectRatio: '16/9' }}
          >
            <source src={caseData.videoSrc} type="video/mp4" />
            <track
              kind="descriptions"
              src="/videos/case-preview-descriptions.vtt"
              srcLang="ko"
              label="한국어 설명"
            />
          </video>
        ) : (
          // Fallback poster for reduced motion
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${caseData.posterSrc})` }}
            role="img"
            aria-label={`${caseData.title} 프로젝트 이미지`}
          />
        )}

        {/* Color Overlay */}
        <div className={`absolute inset-0 ${currentOverlay?.class || ''} transition-all duration-500`} />

        {/* Gradient Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 text-white z-10">
          {/* Top Left: Case Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-accent-green/20 text-accent-green text-sm font-medium rounded-full border border-accent-green/30 mb-3">
                {caseData.category}
              </span>
              <h2 id="case-video-heading" className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                {caseData.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                {caseData.description}
              </p>
            </div>

            {/* KPI Highlight */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 max-w-sm">
              <div className="text-sm text-gray-400 mb-1">{caseData.kpi.label}</div>
              <div className="text-3xl md:text-4xl font-black text-accent-green mb-1">
                {caseData.kpi.value}
              </div>
              <div className="text-sm text-gray-500">{caseData.kpi.period} 달성</div>
            </div>
          </motion.div>

          {/* Top Right: Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={showControls || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 md:top-12 right-6 md:right-12 flex flex-col space-y-3"
          >
            {/* Color Overlay Toggle */}
            <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-2">
              <div className="flex space-x-1">
                {colorOverlays.map((overlay) => (
                  <motion.button
                    key={overlay.id}
                    variants={microBounce}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setOverlayMode(overlay.id)}
                    className={`
                      p-2 rounded text-xs transition-all duration-200
                      ${overlayMode === overlay.id 
                        ? 'bg-accent-green text-black' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }
                    `}
                    aria-label={`${overlay.name} 적용`}
                    title={overlay.name}
                  >
                    <Palette className="w-3 h-3" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Video Status (for reduced motion users) */}
            {prefersReducedMotion && (
              <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-400">
                <Play className="w-3 h-3 inline mr-1" />
                정적 이미지 모드
              </div>
            )}
          </motion.div>

          {/* Bottom: Progress Bar & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Progress Bar */}
            {!prefersReducedMotion && (
              <div className="w-full">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
                  <span>스크롤 진행도</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-green transition-all duration-100 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                  <span>{Math.round(currentTime * 10) / 10}s</span>
                  <span>{caseData.duration}s</span>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="flex justify-end">
              <motion.a
                href={caseData.ctaUrl}
                variants={microBounce}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                onClick={handleCTAClick}
                className="inline-flex items-center px-6 py-3 bg-accent-green text-black font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/25 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-black"
                aria-label={`${caseData.title} 케이스 스터디 상세 보기`}
              >
                케이스 스터디 보기
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Accessibility: Alternative content description */}
        <div className="sr-only">
          {caseData.title} 프로젝트 비디오 프리뷰입니다. 
          {caseData.company}의 {caseData.category} 웹사이트 리뉴얼을 통해 
          {caseData.kpi.period} 동안 {caseData.kpi.label}를 {caseData.kpi.value} 향상시켰습니다.
          {!prefersReducedMotion && `현재 ${Math.round(progress * 100)}% 재생 중입니다.`}
        </div>
      </div>

      {/* Scroll Hint */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView && progress < 0.1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center pointer-events-none z-20"
        >
          <div className="flex flex-col items-center space-y-2">
            <span>스크롤하여 영상 재생</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-white/40"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}