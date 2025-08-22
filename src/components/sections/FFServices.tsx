'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Info, ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, serviceTilt, microBounce } from '@/features/motion/variants'
import { useScrambleText } from '@/features/hooks/useScrambleText'

// Services data
const servicesData = [
  {
    id: 1,
    title: '사이트 리디자인',
    description: '브랜드 아이덴티티를 반영한 현대적 디자인',
    tooltip: '기존 사이트를 현대적이고 사용자 친화적으로 완전히 새롭게 디자인합니다',
    size: 'large' as const,
    icon: '🎨',
  },
  {
    id: 2,
    title: 'UI/UX 개선',
    description: '사용자 경험 중심의 인터페이스 최적화',
    tooltip: '사용자 행동 분석을 통한 직관적이고 효율적인 사용자 경험 설계',
    size: 'medium' as const,
    icon: '🔧',
  },
  {
    id: 3,
    title: '성능 최적화',
    description: 'Core Web Vitals 개선과 속도 향상',
    tooltip: 'Google Core Web Vitals 지표를 만족하는 초고속 웹사이트 구현',
    size: 'medium' as const,
    icon: '⚡',
  },
  {
    id: 4,
    title: '다국어/글로벌 확장',
    description: '해외 진출을 위한 다국어 사이트 구축',
    tooltip: 'i18n 구조와 지역별 최적화를 통한 글로벌 시장 진출 지원',
    size: 'large' as const,
    icon: '🌍',
  },
  {
    id: 5,
    title: 'CMS/운영 자동화',
    description: '콘텐츠 관리 시스템과 업무 자동화',
    tooltip: '헤드리스 CMS와 자동화 워크플로우로 운영 효율성 극대화',
    size: 'small' as const,
    icon: '⚙️',
  },
  {
    id: 6,
    title: '유지보수/보안',
    description: '지속적인 관리와 보안 강화',
    tooltip: '정기적인 업데이트와 보안 모니터링으로 안전한 운영 보장',
    size: 'small' as const,
    icon: '🔒',
  },
]

// Service Card Component
interface ServiceCardProps {
  service: typeof servicesData[0]
  index: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { displayedText, onHoverStart, onHoverEnd } = useScrambleText(service.title, {
    duration: 400,
  })

  // Handle tooltip
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowTooltip(false)
    }
    if (showTooltip) {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [showTooltip])

  const handleCardClick = () => {
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_content', {
        content_type: 'service_card',
        item_id: service.title.toLowerCase().replace(/\s+/g, '_'),
        service_name: service.title,
      })
    }
  }

  // Card size classes
  const sizeClasses: Record<'large' | 'medium' | 'small', string> = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-2',
    small: 'md:col-span-1 md:row-span-1',
  }

  const paddingClasses: Record<'large' | 'medium' | 'small', string> = {
    large: 'p-8 md:p-10',
    medium: 'p-6 md:p-8',
    small: 'p-6',
  }

  return (
    <motion.div
      ref={cardRef}
      variants={serviceTilt}
      initial="idle"
      whileHover="hover"
      whileFocus="focus"
      className={`
        relative bg-zinc-900/30 border border-zinc-800 rounded-2xl 
        ${sizeClasses[service.size]} ${paddingClasses[service.size]}
        backdrop-blur-sm hover:border-accent-green/30 
        transition-all duration-300 hover:shadow-xl hover:shadow-black/20
        focus-within:border-accent-green/50 focus-within:ring-2 focus-within:ring-accent-green/20
        cursor-pointer group
      `}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`${service.title} 서비스`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
    >
      {/* Icon */}
      <div className="text-3xl md:text-4xl mb-4 md:mb-6">
        {service.icon}
      </div>

      {/* Title with scramble effect */}
      <h3 
        className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        aria-live="off" // Prevent screen reader from announcing scrambled text
      >
        <span aria-hidden="true">{displayedText}</span>
        <span className="sr-only">{service.title}</span>
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Bottom section */}
      <div className="flex items-center justify-between mt-auto">
        {/* Info tooltip */}
        <div className="relative">
          <motion.button
            variants={microBounce}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={(e) => {
              e.stopPropagation()
              setShowTooltip(!showTooltip)
            }}
            onBlur={(e) => {
              if (!e.relatedTarget?.closest('[data-tooltip]')) {
                setShowTooltip(false)
              }
            }}
            className="p-2 text-gray-500 hover:text-accent-green transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green/50"
            aria-describedby={`tooltip-${service.id}`}
            aria-expanded={showTooltip}
            aria-label="서비스 상세 설명 보기"
          >
            <Info className="w-4 h-4" />
          </motion.button>

          {showTooltip && (
            <div
              data-tooltip
              id={`tooltip-${service.id}`}
              className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg border border-white/10 whitespace-normal z-20"
              style={{ minWidth: '200px', maxWidth: '300px' }}
            >
              {service.tooltip}
              <div className="absolute top-full left-4 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/10"></div>
            </div>
          )}
        </div>

        {/* Arrow icon */}
        <motion.div
          variants={microBounce}
          initial="idle"
          whileHover="hover"
          className="text-gray-500 group-hover:text-accent-green transition-colors"
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function FFServices() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-32"
      style={{
        backgroundColor: 'var(--bg, #0A0F0A)',
        color: 'var(--fg, #F7F7F5)',
      }}
      aria-labelledby="services-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/20 via-transparent to-gray-950/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="services-heading" className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            무엇을 <span style={{ color: 'var(--accent, #0FA765)' }}>어떻게</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            비즈니스 목표에 맞는 맞춤형 솔루션을 제공합니다
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-min"
          style={{
            gridTemplateRows: 'repeat(auto-fit, minmax(200px, auto))',
          }}
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-lg text-gray-500 mb-6">
            더 자세한 내용이 궁금하시다면
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-gray-900"
            style={{
              backgroundColor: 'var(--accent, #0FA765)',
              color: 'var(--bg, #0A0F0A)',
            }}
          >
            상담 신청하기
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}