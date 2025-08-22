'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { fadeUp, stagger } from '@/features/motion/variants'

declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: {
        sitekey: string
        callback: (token: string) => void
        'error-callback'?: () => void
      }) => string
      remove: (widgetId: string) => void
    }
  }
}

interface FormData {
  name: string
  email: string
  industry: string
  budget: string
  timeline: string
  message: string
  honeypot?: string
}

interface FormErrors {
  [key: string]: string
}

const industries = [
  { value: '', label: '선택해주세요' },
  { value: 'manufacturing', label: '제조업' },
  { value: 'it-saas', label: 'IT·SaaS' },
  { value: 'medical', label: '의료' },
  { value: 'other', label: '기타' },
]

const budgets = [
  { value: '', label: '선택해주세요' },
  { value: 'under-10m', label: '1천만원 미만' },
  { value: '10m-30m', label: '1천만원 ~ 3천만원' },
  { value: '30m-50m', label: '3천만원 ~ 5천만원' },
  { value: 'over-50m', label: '5천만원 이상' },
  { value: 'undecided', label: '미정' },
]

const timelines = [
  { value: '', label: '선택해주세요' },
  { value: 'asap', label: 'ASAP' },
  { value: '2weeks', label: '2주' },
  { value: '4weeks', label: '4주' },
  { value: '8weeks', label: '8주' },
  { value: 'undecided', label: '미정' },
]

export default function FFCTAForm() {
  const containerRef = useRef<HTMLElement>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    industry: '',
    budget: '',
    timeline: '',
    message: '',
    honeypot: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>('')

  // Load Cloudflare Turnstile
  useEffect(() => {
    if (typeof window === 'undefined') return

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
          callback: (token: string) => {
            setTurnstileToken(token)
          },
          'error-callback': () => {
            setTurnstileToken('')
          },
        })
        setTurnstileWidgetId(widgetId)
      }
    }
    
    document.head.appendChild(script)
    
    return () => {
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.remove(turnstileWidgetId)
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [turnstileWidgetId])

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요'
    }
    
    // Email validation (RFC5322 simple pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요'
    }
    
    // Industry validation
    if (!formData.industry) {
      newErrors.industry = '업종을 선택해주세요'
    }
    
    // Budget validation
    if (!formData.budget) {
      newErrors.budget = '예산대를 선택해주세요'
    }
    
    // Timeline validation
    if (!formData.timeline) {
      newErrors.timeline = '희망 기간을 선택해주세요'
    }
    
    // Message validation (500 chars limit, not empty)
    if (!formData.message.trim()) {
      newErrors.message = '메시지를 입력해주세요'
    } else if (formData.message.length > 500) {
      newErrors.message = '메시지는 500자 이하로 입력해주세요'
    }
    
    // Honeypot check
    if (formData.honeypot) {
      newErrors.honeypot = 'Bot detected'
    }
    
    // Turnstile validation
    if (!turnstileToken) {
      newErrors.turnstile = '보안 검증을 완료해주세요'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setIsSuccess(true)
        
        // GA4 event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            currency: 'KRW',
            value: 0,
            industry: formData.industry,
            budget: formData.budget,
            timeline: formData.timeline,
          })
        }
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state component
  if (isSuccess) {
    return (
      <section
        className="relative min-h-screen flex items-center justify-center py-20"
        style={{
          backgroundColor: 'var(--bg, #0A0F0A)',
          color: 'var(--fg, #F7F7F5)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <div className="mb-8">
            <CheckCircle 
              className="w-20 h-20 mx-auto mb-6" 
              style={{ color: 'var(--accent, #0FA765)' }}
            />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              감사합니다!
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              문의가 성공적으로 전송되었습니다.<br />
              24시간 내에 연락드리겠습니다.
            </p>
          </div>
          
          <a
            href="https://calendly.com/chiro-agency/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-gray-900"
            style={{
              backgroundColor: 'var(--accent, #0FA765)',
              color: 'var(--bg, #0A0F0A)',
            }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            즉시 상담 예약하기
          </a>
        </motion.div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20"
      style={{
        backgroundColor: 'var(--bg, #0A0F0A)',
        color: 'var(--fg, #F7F7F5)',
      }}
      id="contact-form"
      aria-labelledby="form-heading"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
        {/* Form Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-16"
        >
          <h2 id="form-heading" className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            2주 후,<br />
            <span style={{ color: 'var(--accent, #0FA765)' }}>새로운 시작</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            부담 없어요. 그냥 얘기해봐요.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 space-y-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Honeypot field */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            className="absolute left-[-9999px] opacity-0"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp}>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                이름 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
                placeholder="홍길동"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                이메일 <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
                placeholder="hong@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </motion.div>
          </div>

          {/* Industry, Budget, Timeline Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUp}>
              <label htmlFor="industry" className="block text-sm font-medium mb-2">
                업종 <span className="text-red-400">*</span>
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
                aria-invalid={!!errors.industry}
                aria-describedby={errors.industry ? 'industry-error' : undefined}
              >
                {industries.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p id="industry-error" className="mt-1 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.industry}
                </p>
              )}
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                예산대 <span className="text-red-400">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? 'budget-error' : undefined}
              >
                {budgets.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p id="budget-error" className="mt-1 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.budget}
                </p>
              )}
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                희망 기간 <span className="text-red-400">*</span>
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
                aria-invalid={!!errors.timeline}
                aria-describedby={errors.timeline ? 'timeline-error' : undefined}
              >
                {timelines.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <p id="timeline-error" className="mt-1 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.timeline}
                </p>
              )}
            </motion.div>
          </div>

          {/* Message */}
          <motion.div variants={fadeUp}>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              메시지 <span className="text-red-400">*</span>
              <span className="text-gray-500 text-xs ml-2">({formData.message.length}/500)</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 resize-none"
              placeholder="프로젝트에 대해 간단히 설명해주세요..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message}
              </p>
            )}
          </motion.div>

          {/* Turnstile */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div ref={turnstileRef} />
            {errors.turnstile && (
              <p className="mt-2 text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.turnstile}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fadeUp} className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-12 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                backgroundColor: 'var(--accent, #0FA765)',
                color: 'var(--bg, #0A0F0A)',
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  전송 중...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  무료 상담 신청하기
                </>
              )}
            </button>
            
            {errors.submit && (
              <p className="mt-4 text-sm text-red-400 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.submit}
              </p>
            )}
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}