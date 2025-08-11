'use client'

import { useState } from 'react'
import { Check, ArrowRight, Shield, Clock, Users, Zap } from 'lucide-react'

const benefits = [
  { icon: Zap, text: '24시간 내 응답 보장' },
  { icon: Shield, text: 'NDA 체결 후 상담 가능' },
  { icon: Users, text: '전담 PM 배정' },
  { icon: Clock, text: '무료 30분 컨설팅' },
]

const budgetRanges = [
  '1천만원 미만',
  '1천만원 - 3천만원',
  '3천만원 - 5천만원',
  '5천만원 - 1억원',
  '1억원 이상',
  '예산 미정',
]

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Show calendar link after submission
      window.open('https://calendly.com/chiro-agency', '_blank')
    }, 1500)
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-[#0E1111] to-[#0A0C0C] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${colors.border.default} 1px, transparent 1px), linear-gradient(90deg, ${colors.border.default} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1DB954]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[#1DB954] mb-3">프로젝트 시작하기</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-4">
            비즈니스 성장의 첫 걸음
          </h2>
          <p className="text-lg text-[#C9CFD6]">
            전문가와 함께 프로젝트를 시작하세요. 24시간 내 답변 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Benefits (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-[#F5F7FA] mb-6">
                왜 CHIRO와 함께해야 할까요?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 bg-[#1A1F1F]/30 rounded-lg hover:bg-[#1A1F1F]/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#1DB954]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#1DB954]" />
                      </div>
                      <div>
                        <p className="text-[#F5F7FA] font-medium">{benefit.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Trust badges */}
            <div className="p-6 bg-[#1A1F1F]/20 rounded-xl border border-[#1DB954]/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#1DB954]">150+</p>
                  <p className="text-sm text-[#8B949E]">완료 프로젝트</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1DB954]">98%</p>
                  <p className="text-sm text-[#8B949E]">고객 만족도</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1DB954]">24h</p>
                  <p className="text-sm text-[#8B949E]">평균 응답 시간</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1DB954]">5년</p>
                  <p className="text-sm text-[#8B949E]">평균 파트너십</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form (3 columns) */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#C9CFD6] mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1F1F] border border-[#2D3333] rounded-lg text-[#F5F7FA] placeholder-[#8B949E] focus:border-[#1DB954] focus:outline-none focus:ring-1 focus:ring-[#1DB954]/30 transition-colors"
                    placeholder="홍길동"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#C9CFD6] mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1F1F] border border-[#2D3333] rounded-lg text-[#F5F7FA] placeholder-[#8B949E] focus:border-[#1DB954] focus:outline-none focus:ring-1 focus:ring-[#1DB954]/30 transition-colors"
                    placeholder="email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#C9CFD6] mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1F1F] border border-[#2D3333] rounded-lg text-[#F5F7FA] placeholder-[#8B949E] focus:border-[#1DB954] focus:outline-none focus:ring-1 focus:ring-[#1DB954]/30 transition-colors"
                    placeholder="회사명 (선택)"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-[#C9CFD6] mb-2">
                    예산 범위
                  </label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1A1F1F] border border-[#2D3333] rounded-lg text-[#F5F7FA] focus:border-[#1DB954] focus:outline-none focus:ring-1 focus:ring-[#1DB954]/30 transition-colors"
                  >
                    <option value="" className="bg-[#0E1111]">선택하세요</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range} className="bg-[#0E1111]">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#C9CFD6] mb-2">
                  프로젝트 설명
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A1F1F] border border-[#2D3333] rounded-lg text-[#F5F7FA] placeholder-[#8B949E] focus:border-[#1DB954] focus:outline-none focus:ring-1 focus:ring-[#1DB954]/30 transition-colors resize-none"
                  placeholder="프로젝트에 대해 간단히 설명해주세요..."
                />
              </div>

              {/* Privacy */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="w-5 h-5 mt-0.5 bg-[#1A1F1F] border border-[#2D3333] rounded text-[#1DB954] focus:ring-[#1DB954]/30"
                />
                <label htmlFor="privacy" className="text-sm text-[#8B949E]">
                  <span className="text-[#C9CFD6]">개인정보 처리방침</span>에 동의합니다.
                  <button
                    type="button"
                    onClick={() => setShowPrivacy(!showPrivacy)}
                    className="ml-2 text-[#1DB954] hover:underline"
                  >
                    자세히 보기
                  </button>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group px-8 py-4 bg-[#1DB954] hover:bg-[#1ED760] disabled:bg-[#1DB954]/50 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(29,185,84,0.3)] disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                data-analytics-key="lead-form-submit"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    전송 중...
                  </>
                ) : (
                  <>
                    무료 상담 신청
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-[#8B949E]">
                제출 후 캘린들리 예약 페이지로 이동합니다
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const colors = {
  border: {
    default: '#1A1F1F',
  },
}