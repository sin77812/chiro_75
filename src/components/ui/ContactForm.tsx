'use client'

import { useState, useRef } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  budget: string
  services: string[]
  message: string
  privacy: boolean
}

interface FormErrors {
  [key: string]: string
}

interface ContactFormProps {
  className?: string
}

const budgetOptions = [
  { value: '', label: '예산을 선택해주세요' },
  { value: 'under-1000', label: '1,000만원 미만' },
  { value: '1000-3000', label: '1,000만원 - 3,000만원' },
  { value: '3000-5000', label: '3,000만원 - 5,000만원' },
  { value: '5000-10000', label: '5,000만원 - 1억원' },
  { value: 'over-10000', label: '1억원 이상' },
  { value: 'discuss', label: '상담 후 결정' }
]

const serviceOptions = [
  { value: 'web-development', label: '웹사이트 개발' },
  { value: 'ui-ux-design', label: 'UI/UX 디자인' },
  { value: 'performance-optimization', label: '성능 최적화' },
  { value: 'digital-marketing', label: '디지털 마케팅' },
  { value: 'maintenance-support', label: '유지보수 & 지원' },
  { value: 'global-expansion', label: '글로벌 확장' }
]

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    services: [],
    message: '',
    privacy: false
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [focusedField, setFocusedField] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  // Real-time validation
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return '이름을 2자 이상 입력해주세요'
        }
        if (value.length > 50) {
          return '이름은 50자 이하로 입력해주세요'
        }
        return ''
      
      case 'email':
        if (!value) {
          return '이메일을 입력해주세요'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return '올바른 이메일 형식을 입력해주세요'
        }
        return ''
      
      case 'company':
        if (!value || value.trim().length < 2) {
          return '회사명을 2자 이상 입력해주세요'
        }
        if (value.length > 100) {
          return '회사명은 100자 이하로 입력해주세요'
        }
        return ''
      
      case 'message':
        if (!value || value.trim().length < 10) {
          return '문의 내용을 10자 이상 입력해주세요'
        }
        if (value.length > 1000) {
          return '문의 내용은 1000자 이하로 입력해주세요'
        }
        return ''
      
      case 'services':
        if (!value || value.length === 0) {
          return '관심 있는 서비스를 하나 이상 선택해주세요'
        }
        return ''
      
      case 'privacy':
        if (!value) {
          return '개인정보 수집 및 이용에 동의해주세요'
        }
        return ''
      
      default:
        return ''
    }
  }

  // Handle input changes with real-time validation
  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Real-time validation for email
    if (name === 'email' && value) {
      const error = validateField(name, value)
      if (error && focusedField !== name) {
        setErrors(prev => ({ ...prev, [name]: error }))
      }
    }
  }

  // Handle field blur for validation
  const handleBlur = (name: string) => {
    setFocusedField('')
    const value = formData[name as keyof FormData]
    const error = validateField(name, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Handle focus
  const handleFocus = (name: string) => {
    setFocusedField(name)
  }

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    Object.keys(formData).forEach(key => {
      if (key === 'budget') return // Budget is optional
      const error = validateField(key, formData[key as keyof FormData])
      if (error) {
        newErrors[key] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        element?.focus()
      }
      return
    }

    setSubmitStatus('submitting')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would make actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    }
  }

  // Handle service selection
  const handleServiceChange = (serviceValue: string, checked: boolean) => {
    const newServices = checked 
      ? [...formData.services, serviceValue]
      : formData.services.filter(s => s !== serviceValue)
    
    handleInputChange('services', newServices)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '',
      services: [],
      message: '',
      privacy: false
    })
    setErrors({})
    setSubmitStatus('idle')
  }

  if (submitStatus === 'success') {
    return (
      <div className={`max-w-2xl mx-auto ${className}`}>
        <div className="text-center p-12 bg-accent-green/5 border border-accent-green/20 rounded-2xl">
          <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-accent-green animate-scale-in" />
          </div>
          
          <h3 className="text-2xl font-pretendard font-bold text-white mb-4">
            문의가 성공적으로 전송되었습니다!
          </h3>
          
          <p className="text-neutral-light/70 mb-8 leading-relaxed">
            빠른 시간 내에 담당자가 연락드릴 예정입니다.<br />
            더 빠른 상담을 원하시면 미팅을 예약해주세요.
          </p>

          <div className="space-y-4">
            <a
              href="https://calendly.com/chiro-consulting" // Placeholder URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>미팅 예약하기</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            
            <div>
              <button
                onClick={resetForm}
                className="text-neutral-light/60 hover:text-primary transition-colors text-sm"
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`max-w-2xl mx-auto space-y-6 ${className}`}
      noValidate
    >
      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            이름 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            onFocus={() => handleFocus('name')}
            className={`w-full px-4 py-3 bg-shadow-gray/20 border rounded-lg text-white placeholder-neutral-light/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.name 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-shadow-gray/30 focus:border-primary'
            }`}
            placeholder="홍길동"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            이메일 <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            onFocus={() => handleFocus('email')}
            className={`w-full px-4 py-3 bg-shadow-gray/20 border rounded-lg text-white placeholder-neutral-light/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.email 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-shadow-gray/30 focus:border-primary'
            }`}
            placeholder="hong@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Company & Budget */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
            회사명 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            onBlur={() => handleBlur('company')}
            onFocus={() => handleFocus('company')}
            className={`w-full px-4 py-3 bg-shadow-gray/20 border rounded-lg text-white placeholder-neutral-light/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.company 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-shadow-gray/30 focus:border-primary'
            }`}
            placeholder="(주)회사명"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1 text-sm text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.company}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
            예상 예산 (선택사항)
          </label>
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 bg-shadow-gray/20 border border-shadow-gray/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          >
            {budgetOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-dark text-white">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services */}
      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-white mb-3">
            관심 있는 서비스 <span className="text-red-400">*</span>
          </legend>
          <div className="grid md:grid-cols-2 gap-3">
            {serviceOptions.map(service => (
              <label
                key={service.value}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-primary/5 ${
                  formData.services.includes(service.value)
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-shadow-gray/10 border-shadow-gray/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service.value)}
                  onChange={(e) => handleServiceChange(service.value, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  formData.services.includes(service.value)
                    ? 'bg-primary border-primary'
                    : 'border-shadow-gray/50'
                }`}>
                  {formData.services.includes(service.value) && (
                    <CheckCircle className="h-3 w-3 text-white" />
                  )}
                </div>
                <span className="text-white text-sm">{service.label}</span>
              </label>
            ))}
          </div>
          {errors.services && (
            <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.services}</span>
            </p>
          )}
        </fieldset>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          프로젝트 상세 내용 <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          onFocus={() => handleFocus('message')}
          className={`w-full px-4 py-3 bg-shadow-gray/20 border rounded-lg text-white placeholder-neutral-light/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 resize-vertical ${
            errors.message 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-shadow-gray/30 focus:border-primary'
          }`}
          placeholder="프로젝트 목표, 기대하는 결과, 특별한 요구사항 등을 자세히 적어주세요."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <div className="flex justify-between items-start mt-1">
          {errors.message ? (
            <p id="message-error" className="text-sm text-red-400 flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.message}</span>
            </p>
          ) : (
            <div></div>
          )}
          <span className={`text-xs ${formData.message.length > 900 ? 'text-red-400' : 'text-neutral-light/40'}`}>
            {formData.message.length}/1000
          </span>
        </div>
      </div>

      {/* Privacy Policy */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacy}
            onChange={(e) => handleInputChange('privacy', e.target.checked)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${
            formData.privacy
              ? 'bg-primary border-primary'
              : 'border-shadow-gray/50'
          }`}>
            {formData.privacy && (
              <CheckCircle className="h-3 w-3 text-white" />
            )}
          </div>
          <div className="text-sm">
            <span className="text-white">
              개인정보 수집 및 이용에 동의합니다. <span className="text-red-400">*</span>
            </span>
            <div className="text-neutral-light/60 mt-1">
              <a href="/legal/privacy" target="_blank" className="text-primary hover:text-accent-green transition-colors underline">
                개인정보 처리방침 확인하기
              </a>
            </div>
          </div>
        </label>
        {errors.privacy && (
          <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.privacy}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-shadow-gray/50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {submitStatus === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>전송 중...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>무료 상담 요청하기</span>
            </>
          )}
        </button>

        {submitStatus === 'error' && (
          <p className="mt-3 text-sm text-red-400 text-center flex items-center justify-center space-x-1">
            <AlertCircle className="h-4 w-4" />
            <span>전송 중 오류가 발생했습니다. 다시 시도해주세요.</span>
          </p>
        )}
      </div>

      {/* Form Info */}
      <div className="text-center text-xs text-neutral-light/50 space-y-1">
        <p>평균 2시간 이내 답변 | 24시간 이내 1차 상담 일정 안내</p>
        <p>상담 및 견적은 무료입니다</p>
      </div>
    </form>
  )
}