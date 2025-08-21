'use client'

import { useState } from 'react'
import { ChevronRight, CheckCircle, Calendar, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function PageCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="section-padding bg-gradient-to-br from-dark via-primary-dark to-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
                  GET STARTED
                </div>
                <h2 className="font-pretendard font-bold text-white mb-6">
                  비즈니스 성장을 위한<br />
                  <span className="text-gradient">첫 걸음을 내딛어보세요</span>
                </h2>
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  CHIRO와 함께 디지털 전환을 시작하고, 경쟁력 있는 웹사이트로 
                  새로운 기회를 만들어보세요.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  '무료 컨설팅 및 현황 분석',
                  '맞춤형 솔루션 제안서 제공',
                  '투명한 프로젝트 진행 과정',
                  '런칭 후 3개월 무료 운영 지원'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-neutral-light/80">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Contact Options */}
              <div className="grid grid-cols-2 gap-4">
                <Link href="/consultation" className="flex items-center justify-center space-x-2 p-4 bg-shadow-gray/20 rounded-lg hover:bg-primary/10 border border-shadow-gray/30 hover:border-primary/30 transition-all">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-white">빠른 견적 받기</span>
                </Link>
                <button className="flex items-center justify-center space-x-2 p-4 bg-shadow-gray/20 rounded-lg hover:bg-primary/10 border border-shadow-gray/30 hover:border-primary/30 transition-all">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="text-white">카카오톡 상담</span>
                </button>
              </div>

              {/* Urgency */}
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse" />
                  <div>
                    <div className="font-semibold text-primary mb-2">
                      🎯 12월 특별 혜택 (한정 5팀)
                    </div>
                    <div className="text-neutral-light/70 text-sm leading-relaxed">
                      연말까지 프로젝트를 시작하시는 고객님께 <strong className="text-primary">20% 할인</strong> + 
                      <strong className="text-primary">무료 브랜딩 컨설팅</strong>을 제공합니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="relative">
              <div className="bg-shadow-gray/20 backdrop-blur-sm p-8 rounded-3xl border border-shadow-gray/30">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-pretendard font-semibold text-white mb-2">
                        무료 상담 신청
                      </h3>
                      <p className="text-neutral-light/60">
                        24시간 이내에 연락드립니다
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="name"
                          placeholder="이름*"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-4 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white placeholder-neutral-light/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="이메일*"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-4 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white placeholder-neutral-light/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="연락처"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-4 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white placeholder-neutral-light/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                        <input
                          type="text"
                          name="company"
                          placeholder="회사명"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full p-4 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white placeholder-neutral-light/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>

                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-4 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      >
                        <option value="">서비스 선택*</option>
                        <option value="website">웹사이트 제작</option>
                        <option value="redesign">기존 사이트 리뉴얼</option>
                        <option value="ecommerce">쇼핑몰 구축</option>
                        <option value="branding">브랜딩 + 웹사이트</option>
                        <option value="maintenance">유지보수</option>
                        <option value="consulting">컨설팅</option>
                      </select>

                      <textarea
                        name="message"
                        placeholder="프로젝트에 대해 간단히 설명해주세요"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-4 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white placeholder-neutral-light/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                      />

                      <button
                        type="submit"
                        className="w-full btn-primary group text-lg py-4"
                      >
                        무료 상담 신청하기
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-center text-xs text-neutral-light/50">
                        개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-pretendard font-semibold text-white mb-4">
                      신청이 완료되었습니다!
                    </h3>
                    <p className="text-neutral-light/70 leading-relaxed">
                      빠른 시간 내에 담당자가 연락드리겠습니다.<br />
                      더 궁금한 점이 있으시면 언제든 연락주세요.
                    </p>
                    <div className="mt-6 text-primary font-medium">
                      📞 010-6815-0775
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}