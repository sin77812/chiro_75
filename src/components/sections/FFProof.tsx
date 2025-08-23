'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeUp, stagger, barFill, numberReveal, cardInteraction } from '@/features/motion/variants'

// KPI Data
const kpiData = [
  {
    title: '문의 증가율',
    before: '1배',
    after: '2.8배',
    improvement: '+180% 증가',
    barWidth: '88%'
  },
  {
    title: '체류 시간',
    before: '1:20',
    after: '3:10',
    improvement: '+137% 향상',
    barWidth: '90%'
  },
  {
    title: '웹 접근성 점수',
    before: '55점',
    after: '92점',
    improvement: '+67% 개선',
    barWidth: '95%'
  },
  {
    title: '전환율',
    before: '3.2%',
    after: '8.5%',
    improvement: '+165% 증가',
    barWidth: '92%'
  }
]

// Testimonials Data
const testimonials = [
  {
    id: 1,
    text: "2주만에 이런 퀄리티가? 진짜 만족합니다!",
    author: "K",
    position: "CEO",
    company: "스타트업",
    avatar: "K"
  },
  {
    id: 2,
    text: "예상보다 훨씬 빨랐고, 결과도 기대 이상이었어요",
    author: "L",
    position: "마케팅 이사",
    company: "IT 회사",
    avatar: "L"
  }
]

// KPI Card Component
interface KPICardProps {
  data: typeof kpiData[0]
  index: number
  isVisible: boolean
}

const KPICard = ({ data, index, isVisible }: KPICardProps) => {
  return (
    <motion.div
      variants={cardInteraction}
      initial="idle"
      whileHover="hover"
      whileFocus="hover"
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
      tabIndex={0}
      aria-label={`${data.title} 개선 결과`}
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-white">{data.title}</h3>

      {/* Before/After Values */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-400">
          <span>Before</span>
          <span className="font-mono text-lg">{data.before}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">After</span>
          <motion.span
            variants={numberReveal}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="font-mono text-2xl font-bold"
            style={{ color: 'var(--accent, #0FA765)' }}
          >
            {data.after}
          </motion.span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">개선율</span>
          <span className="text-sm font-bold text-accent-green">{data.improvement}</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            variants={barFill}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="h-full rounded-full"
            style={{
              '--final-width': data.barWidth,
              background: 'linear-gradient(90deg, var(--accent, #0FA765), #0d8c5a)'
            } as React.CSSProperties}
          />
        </div>
      </div>
    </motion.div>
  )
}

// Tooltip Component
const ProofTooltip = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={(e) => {
          if (!e.relatedTarget?.closest('[data-tooltip]')) {
            setIsOpen(false)
          }
        }}
        className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green"
        aria-describedby="proof-details"
        aria-expanded={isOpen}
      >
        <Info className="w-5 h-5" />
        <span className="sr-only">측정 세부사항 보기</span>
      </button>
      
      {isOpen && (
        <div
          data-tooltip
          id="proof-details"
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-black/90 text-white text-sm rounded-lg border border-white/10 whitespace-nowrap z-10"
          style={{ minWidth: '280px' }}
        >
          <div className="space-y-1">
            <div><strong>기간:</strong> 2025-03 ~ 2025-05</div>
            <div><strong>도구:</strong> GA4 & CrUX</div>
            <div><strong>소스:</strong> Organic + Paid</div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/10"></div>
        </div>
      )}
    </div>
  )
}

// Testimonial Slider Component
const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      prevSlide()
    }
  }

  return (
    <div 
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="고객 후기 슬라이더"
    >
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 text-center">
                <blockquote className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-green to-green-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-300 font-medium">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.position}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={prevSlide}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green"
            aria-label="이전 후기"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent-green' : 'bg-white/30'
                }`}
                aria-label={`${index + 1}번째 후기로 이동`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green"
            aria-label="다음 후기"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function FFProof() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })

  // Analytics tracking
  useEffect(() => {
    if (isInView && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_id: 'proof_section',
        item_list_name: 'Proof Section KPIs',
      })
    }
  }, [isInView])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-32"
      style={{
        backgroundColor: 'var(--bg, #0A0F0A)',
        color: 'var(--fg, #F7F7F5)',
      }}
      aria-labelledby="proof-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="proof-heading" className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span style={{ color: 'var(--accent, #0FA765)' }}>검증된</span> 성과
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            말이 아닌 숫자로 증명합니다
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          {kpiData.map((kpi, index) => (
            <KPICard key={index} data={kpi} index={index} isVisible={isInView} />
          ))}
        </motion.div>

        {/* Proof Details */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="flex justify-center items-center space-x-2 mb-16 md:mb-20"
        >
          <span className="text-gray-500 text-sm">측정 근거</span>
          <ProofTooltip />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            실제 고객 후기
          </h3>
          <TestimonialSlider />
        </motion.div>
      </div>
    </section>
  )
}