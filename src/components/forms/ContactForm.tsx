'use client'

import { useState } from 'react'
import { ContactForm as ContactFormType } from '@/types'

const initialFormData: ContactFormType = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  budget: '',
  timeline: '',
  projectType: '',
  privacyConsent: false,
  marketingConsent: false
}

type FormStep = 1 | 2 | 3
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [formData, setFormData] = useState<ContactFormType>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요'
      if (!formData.email.trim()) newErrors.email = '이메일을 입력해주세요'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '올바른 이메일 형식을 입력해주세요'
      if (!formData.company?.trim()) newErrors.company = '회사명을 입력해주세요'
    }

    if (step === 2) {
      if (!formData.service) newErrors.service = '필요한 서비스를 선택해주세요'
      if (!formData.message.trim()) newErrors.message = '프로젝트 내용을 입력해주세요'
    }

    if (step === 3) {
      if (!formData.privacyConsent) newErrors.privacyConsent = '개인정보 수집 및 이용에 동의해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3) as FormStep)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(3)) return

    setSubmitStatus('submitting')

    try {
      // Here you would make the actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    }
  }

  const updateFormData = (field: keyof ContactFormType, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center p-12 bg-green-50 border border-green-200 rounded-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            문의가 성공적으로 전송되었습니다!
          </h3>
          
          <p className="text-gray-600 mb-8">
            24시간 이내에 담당자가 연락드릴 예정입니다.
            <br />더 빠른 상담을 원하시면 전화로 연락주세요.
          </p>

          <div className="space-y-4">
            <a
              href="tel:02-1234-5678"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              02-1234-5678로 전화하기
            </a>
            
            <div>
              <button
                onClick={() => {
                  setCurrentStep(1)
                  setFormData(initialFormData)
                  setSubmitStatus('idle')
                  setErrors({})
                }}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                새로운 문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 transition-colors ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>기본 정보</span>
          <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>프로젝트 상세</span>
          <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>확인 및 제출</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-200">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">기본 정보를 입력해주세요</h3>
              <p className="text-gray-600">빠른 상담을 위해 연락처 정보가 필요합니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="홍길동"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="hong@company.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.company ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="(주)회사명"
                />
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="010-1234-5678"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">프로젝트 상세 정보</h3>
              <p className="text-gray-600">어떤 서비스가 필요한지 알려주세요.</p>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                필요한 서비스 <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => updateFormData('service', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.service ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">서비스를 선택해주세요</option>
                <option value="web-development">웹사이트 개발</option>
                <option value="ux-design">UX/UI 디자인</option>
                <option value="performance-optimization">성능 최적화</option>
                <option value="ai-integration">AI 통합</option>
                <option value="maintenance">유지보수</option>
                <option value="consulting">컨설팅</option>
              </select>
              {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  예상 예산
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">예산을 선택해주세요</option>
                  <option value="under-500">500만원 미만</option>
                  <option value="500-1000">500만원 - 1,000만원</option>
                  <option value="1000-3000">1,000만원 - 3,000만원</option>
                  <option value="3000-5000">3,000만원 - 5,000만원</option>
                  <option value="over-5000">5,000만원 이상</option>
                  <option value="discuss">상담 후 결정</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  희망 완료 시기
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => updateFormData('timeline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">시기를 선택해주세요</option>
                  <option value="asap">최대한 빠르게</option>
                  <option value="1month">1개월 이내</option>
                  <option value="3months">3개월 이내</option>
                  <option value="6months">6개월 이내</option>
                  <option value="flexible">시기 협의 가능</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                프로젝트 상세 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                  errors.message ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="프로젝트 목표, 기대하는 결과, 특별한 요구사항 등을 자세히 설명해주세요."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Confirmation & Consent */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">마지막 확인</h3>
              <p className="text-gray-600">개인정보 수집 동의 후 문의를 전송합니다.</p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">문의 요약</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">이름:</dt>
                  <dd className="text-gray-900">{formData.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">이메일:</dt>
                  <dd className="text-gray-900">{formData.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">회사:</dt>
                  <dd className="text-gray-900">{formData.company}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">서비스:</dt>
                  <dd className="text-gray-900">
                    {formData.service === 'web-development' && '웹사이트 개발'}
                    {formData.service === 'ux-design' && 'UX/UI 디자인'}
                    {formData.service === 'performance-optimization' && '성능 최적화'}
                    {formData.service === 'ai-integration' && 'AI 통합'}
                    {formData.service === 'maintenance' && '유지보수'}
                    {formData.service === 'consulting' && '컨설팅'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Consent */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => updateFormData('privacyConsent', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span> <span className="text-red-500">*</span>
                  <br />
                  <span className="text-gray-500">
                    문의 응답을 위해 필요한 최소한의 개인정보를 수집합니다.{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">자세히 보기</a>
                  </span>
                </span>
              </label>
              {errors.privacyConsent && <p className="text-sm text-red-600">{errors.privacyConsent}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => updateFormData('marketingConsent', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-500">
                  마케팅 정보 수신에 동의합니다. (선택)
                  <br />
                  <span className="text-xs">유용한 인사이트와 서비스 소식을 이메일로 보내드립니다.</span>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            이전
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              다음
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitStatus === 'submitting'}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {submitStatus === 'submitting' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  전송 중...
                </>
              ) : (
                '문의 전송하기'
              )}
            </button>
          )}
        </div>

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600 text-center">
              전송 중 오류가 발생했습니다. 다시 시도해주세요.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}