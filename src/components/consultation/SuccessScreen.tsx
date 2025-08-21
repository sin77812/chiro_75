'use client'

import { Check, Phone, MessageCircle, Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface SuccessScreenProps {
  formData?: {
    name?: string
    company?: string
    phone?: string
    email?: string
    contactMethod?: 'phone' | 'kakao' | 'email'
    projectType?: string[]
    hasWebsite?: 'new' | 'renewal' | ''
    currentWebsite?: string
    features?: string[]
    reference?: string
    budget?: string
    timeline?: string
    additional?: string
    privacyConsent?: boolean
  }
}

export default function SuccessScreen({ formData }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-accent-green rounded-lg rotate-45 animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 border border-primary/50 rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-green to-green-600 rounded-full mb-8 mx-auto">
              <Check className="w-12 h-12 text-white" />
            </div>

            {/* Main Message */}
            <h1 className="font-pretendard font-black text-5xl md:text-6xl text-white mb-6 leading-tight">
              상담 신청이<br />
              <span className="text-gradient">완료</span>되었습니다!
            </h1>

            <p className="text-xl text-white/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              {formData?.name ? `${formData.name}님, ` : ''}
              소중한 시간을 내어 상담을 신청해 주셔서 감사합니다.<br />
              최대한 빠르게 연락드리겠습니다.
            </p>
          </FadeUp>

          {/* Next Steps */}
          <FadeUp delay={200}>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-2xl font-bold text-white mb-8">다음 단계</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">1. 담당자 연락</h3>
                  <p className="text-white/70 text-sm">30분 내로 담당자가 직접 연락드립니다</p>
                  <span className="text-primary text-xs font-medium mt-2">30분 이내</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent-green/20 rounded-2xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-accent-green" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">2. 상세 상담</h3>
                  <p className="text-white/70 text-sm">프로젝트 요구사항을 자세히 논의합니다</p>
                  <span className="text-accent-green text-xs font-medium mt-2">당일</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">3. 제안서 발송</h3>
                  <p className="text-white/70 text-sm">맞춤 견적서와 일정을 보내드립니다</p>
                  <span className="text-purple-400 text-xs font-medium mt-2">24시간 이내</span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Summary Card */}
          {formData && (
            <FadeUp delay={300}>
              <div className="bg-gradient-to-br from-primary/10 to-accent-green/10 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 mb-12">
                <h3 className="text-xl font-bold text-white mb-6">신청 내용 요약</h3>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    {formData.name && (
                      <div>
                        <span className="text-white/60 text-sm">담당자명</span>
                        <p className="text-white font-medium">{formData.name}</p>
                      </div>
                    )}
                    
                    {formData.phone && (
                      <div>
                        <span className="text-white/60 text-sm">연락처</span>
                        <p className="text-white font-medium">{formData.phone}</p>
                      </div>
                    )}
                    
                    {formData.email && (
                      <div>
                        <span className="text-white/60 text-sm">이메일</span>
                        <p className="text-white font-medium">{formData.email}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {formData.projectType && formData.projectType.length > 0 && (
                      <div>
                        <span className="text-white/60 text-sm">프로젝트 유형</span>
                        <p className="text-white font-medium">{formData.projectType.join(', ')}</p>
                      </div>
                    )}
                    
                    {formData.budget && (
                      <div>
                        <span className="text-white/60 text-sm">예산</span>
                        <p className="text-white font-medium">{formData.budget}</p>
                      </div>
                    )}
                    
                    {formData.timeline && (
                      <div>
                        <span className="text-white/60 text-sm">원하는 일정</span>
                        <p className="text-white font-medium">{formData.timeline}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeUp>
          )}

          {/* Contact Options */}
          <FadeUp delay={400}>
            <div className="space-y-6 mb-12">
              <h3 className="text-xl font-bold text-white">더 빠른 상담을 원하시나요?</h3>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
                <a
                  href="tel:010-6815-0775"
                  className="flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  010-6815-0775
                </a>
                
                <a
                  href="#"
                  className="flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  카톡 상담
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Return to Home */}
          <FadeUp delay={500}>
            <Link
              href="/"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-300 group"
            >
              홈페이지로 돌아가기
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </FadeUp>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-accent-green rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary rounded-full animate-ping opacity-40 delay-500" />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-accent-green/60 rounded-full animate-ping opacity-50 delay-1000" />
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-primary/60 rounded-full animate-ping opacity-30 delay-700" />
      </div>

      {/* Success Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-4 bg-accent-green transform rotate-45 animate-bounce opacity-70 delay-200" />
        <div className="absolute top-1/3 right-1/5 w-1 h-4 bg-primary transform -rotate-45 animate-bounce opacity-60 delay-400" />
        <div className="absolute top-1/2 left-1/6 w-1 h-4 bg-purple-400 transform rotate-12 animate-bounce opacity-50 delay-600" />
        <div className="absolute top-2/3 right-1/3 w-1 h-4 bg-yellow-400 transform -rotate-12 animate-bounce opacity-40 delay-800" />
      </div>
    </div>
  )
}