'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Phone, MessageCircle, Mail, Building, ShoppingCart, Smartphone, FileText, CheckCircle, Calendar, DollarSign } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface FormData {
  // Step 1: Basic Info
  name: string
  company: string
  phone: string
  email: string
  contactMethod: 'phone' | 'kakao' | 'email'
  
  // Step 2: Project Details
  projectType: string[]
  hasWebsite: 'new' | 'renewal' | ''
  currentWebsite: string
  features: string[]
  reference: string
  
  // Step 3: Budget & Timeline
  budget: string
  timeline: string
  additional: string
  privacyConsent: boolean
}

const initialFormData: FormData = {
  name: '',
  company: '',
  phone: '',
  email: '',
  contactMethod: 'phone',
  projectType: [],
  hasWebsite: '',
  currentWebsite: '',
  features: [],
  reference: '',
  budget: '',
  timeline: '',
  additional: '',
  privacyConsent: false
}

interface ConsultationFormProps {
  currentStep: number
  onStepComplete: (stepData: Partial<FormData>) => void
  onBack: () => void
  initialData?: Partial<FormData>
}

export default function ConsultationForm({ currentStep, onStepComplete, onBack, initialData }: ConsultationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    ...initialData
  })

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    onStepComplete(formData)
  }

  const handleBackClick = () => {
    onBack()
  }

  const handleSubmit = () => {
    if (formData.privacyConsent) {
      onStepComplete(formData)
    }
  }

  const toggleProjectType = (type: string) => {
    const updated = formData.projectType.includes(type)
      ? formData.projectType.filter(t => t !== type)
      : [...formData.projectType, type]
    updateFormData({ projectType: updated })
  }

  const toggleFeature = (feature: string) => {
    const updated = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature]
    updateFormData({ features: updated })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <FadeUp>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                먼저, 간단히 소개해주세요
              </h2>
              <p className="text-white/70 text-lg">기본 정보만 있으면 됩니다</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Name */}
              <div className="form-group">
                <label className="block text-white font-medium mb-3">
                  담당자 성함 *
                  <span className="text-primary text-sm ml-2">📌 편하게 불러드릴 이름</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="예: 김대표"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label className="block text-white font-medium mb-3">회사/서비스명 *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateFormData({ company: e.target.value })}
                  placeholder="예: 스타트업명 or 준비 중"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="block text-white font-medium mb-3">연락처 *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  placeholder="010-6815-0775"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="block text-white font-medium mb-3">이메일</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="chiroweb75@gmail.com"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Contact Method */}
            <div className="form-group mb-8">
              <label className="block text-white font-medium mb-4">편한 연락 방법을 선택해주세요</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'phone', icon: Phone, label: '전화' },
                  { value: 'kakao', icon: MessageCircle, label: '카카오톡' },
                  { value: 'email', icon: Mail, label: '이메일' }
                ].map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateFormData({ contactMethod: value as any })}
                    className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.contactMethod === value
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.name || !formData.company || !formData.phone}
              className="w-full py-4 bg-gradient-to-r from-primary to-accent-green text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
            >
              다음 단계로
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </FadeUp>
      )}

      {/* Step 2: Project Details */}
      {currentStep === 2 && (
        <FadeUp>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                어떤 웹사이트가 필요하신가요?
              </h2>
              <p className="text-white/70 text-lg">해당하는 것을 모두 선택해주세요</p>
            </div>

            {/* Project Types */}
            <div className="mb-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: 'corporate', icon: Building, title: '회사 소개', desc: '브랜드/기업 홈페이지' },
                  { value: 'ecommerce', icon: ShoppingCart, title: '이커머스', desc: '쇼핑몰/결제 시스템' },
                  { value: 'service', icon: Smartphone, title: '서비스/플랫폼', desc: '웹 애플리케이션' },
                  { value: 'landing', icon: FileText, title: '랜딩페이지', desc: '단일 페이지/캠페인' }
                ].map(({ value, icon: Icon, title, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleProjectType(value)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                      formData.projectType.includes(value)
                        ? 'border-primary bg-primary/20 text-primary transform scale-105'
                        : 'border-white/20 text-white hover:border-white/40 hover:transform hover:scale-105'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-sm opacity-70">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Website Status */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">현재 웹사이트가 있으신가요?</label>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                  { value: 'new', title: '🆕 신규 제작', desc: '처음 만들어요' },
                  { value: 'renewal', title: '🔄 리뉴얼', desc: '기존 사이트 개선' }
                ].map(({ value, title, desc }) => (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="hasWebsite"
                      value={value}
                      checked={formData.hasWebsite === value}
                      onChange={(e) => updateFormData({ hasWebsite: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.hasWebsite === value
                        ? 'border-primary bg-primary/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}>
                      <div className="text-white font-medium">{title}</div>
                      <div className="text-white/70 text-sm">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {formData.hasWebsite === 'renewal' && (
                <input
                  type="url"
                  value={formData.currentWebsite}
                  onChange={(e) => updateFormData({ currentWebsite: e.target.value })}
                  placeholder="현재 웹사이트 주소 (있으시면)"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                />
              )}
            </div>

            {/* Features */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">필요한 기능을 선택해주세요</label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  '🔍 검색엔진 최적화(SEO)',
                  '👤 회원가입/로그인',
                  '💳 결제 시스템',
                  '📊 관리자 페이지',
                  '🌐 다국어 지원',
                  '📱 앱 연동'
                ].map((feature) => (
                  <label key={feature} className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm ${
                      formData.features.includes(feature)
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}>
                      {feature}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Reference */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-3">
                참고하고 싶은 웹사이트가 있다면?
                <span className="text-white/50 text-sm ml-2">(선택)</span>
              </label>
              <textarea
                value={formData.reference}
                onChange={(e) => updateFormData({ reference: e.target.value })}
                placeholder="마음에 드는 웹사이트 주소나 스타일을 알려주세요"
                rows={3}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBackClick}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:border-white flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                이전
              </button>
              <button
                onClick={handleNext}
                disabled={formData.projectType.length === 0 || !formData.hasWebsite}
                className="flex-1 py-4 bg-gradient-to-r from-primary to-accent-green text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
              >
                다음 단계로
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </FadeUp>
      )}

      {/* Step 3: Budget & Timeline */}
      {currentStep === 3 && (
        <FadeUp>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                예산과 일정을 알려주세요
              </h2>
              <p className="text-white/70 text-lg">정확한 견적을 위해 필요합니다</p>
            </div>

            {/* Budget */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">예상 예산대</label>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: '300-500', range: '300-500만원', desc: '기본 홈페이지' },
                  { value: '500-1000', range: '500-1000만원', desc: '고급 기능 포함' },
                  { value: '1000+', range: '1000만원 이상', desc: '커스텀 개발' },
                  { value: 'consultation', range: '협의 필요', desc: '별도 상담' }
                ].map(({ value, range, desc }) => (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value={value}
                      checked={formData.budget === value}
                      onChange={(e) => updateFormData({ budget: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      formData.budget === value
                        ? 'border-primary bg-primary/20 text-primary transform scale-105'
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}>
                      <div className="font-semibold mb-1">{range}</div>
                      <div className="text-sm opacity-70">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">희망 오픈 시기</label>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: 'asap', label: '🚀 ASAP (2주 내)' },
                  { value: '1month', label: '📅 1개월 내' },
                  { value: '2-3months', label: '🗓️ 2-3개월' },
                  { value: 'flexible', label: '💭 아직 미정' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateFormData({ timeline: value })}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm ${
                      formData.timeline === value
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-3">
                프로젝트에 대해 더 알려주세요
                <span className="text-white/50 text-sm ml-2">(선택)</span>
              </label>
              <textarea
                value={formData.additional}
                onChange={(e) => updateFormData({ additional: e.target.value })}
                placeholder="특별한 요구사항이나 질문이 있으시면 편하게 작성해주세요"
                rows={4}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              />
            </div>

            {/* Privacy Consent */}
            <div className="mb-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => updateFormData({ privacyConsent: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all duration-300 ${
                  formData.privacyConsent 
                    ? 'bg-primary border-primary' 
                    : 'border-white/40'
                }`}>
                  {formData.privacyConsent && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-white">
                  <a href="/legal/privacy" className="text-primary hover:underline">개인정보 처리방침</a>에 동의합니다
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBackClick}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:border-white flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                이전
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.budget || !formData.timeline || !formData.privacyConsent}
                className="flex-1 py-4 bg-gradient-to-r from-primary to-accent-green text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
              >
                견적 요청하기 ✨
              </button>
            </div>
          </div>
        </FadeUp>
      )}
    </div>
  )
}