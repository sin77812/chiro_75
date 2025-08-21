'use client'

import { useState } from 'react'
import { Phone, MessageCircle, Clock, FileText, Rocket, ChevronDown, ChevronRight } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface InfoPanelProps {
  currentStep: number
}

export default function InfoPanel({ currentStep }: InfoPanelProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const getEstimate = () => {
    let base = 300
    let additional = currentStep * 50
    return base + additional
  }

  const faqs = [
    {
      question: "상담만 받아도 되나요?",
      answer: "물론입니다! 부담 없이 문의주세요. 프로젝트 계획 단계에서도 전문적인 조언을 드립니다."
    },
    {
      question: "견적서는 언제 받을 수 있나요?",
      answer: "24시간 내 상세 견적서를 보내드립니다. 급하신 경우 즉시 연락 주시면 우선 처리해드립니다."
    },
    {
      question: "계약금은 얼마인가요?",
      answer: "전체 금액의 30%를 계약금으로 받습니다. 나머지는 중간금(40%), 완료 후 잔금(30%)로 분할 납부 가능합니다."
    },
    {
      question: "수정은 몇 번까지 가능한가요?",
      answer: "디자인 단계에서 3회, 개발 완료 후 2회까지 무료 수정이 가능합니다. 추가 수정은 별도 협의합니다."
    }
  ]

  return (
    <div className="space-y-6">
      {/* Real-time Estimate */}
      <FadeUp>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-24">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            💰 예상 견적
          </h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">기본 제작비</span>
              <span className="text-white font-medium">300만원~</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">선택 기능</span>
              <span className="text-white font-medium">+{(currentStep - 1) * 50}만원</span>
            </div>
            <hr className="border-white/20" />
            <div className="flex justify-between items-center text-lg">
              <span className="text-white font-semibold">예상 총액</span>
              <span className="text-primary font-bold">{getEstimate()}만원~</span>
            </div>
          </div>
          
          <p className="text-white/50 text-xs">* 정확한 견적은 상담 후 제공됩니다</p>
        </div>
      </FadeUp>

      {/* Process Timeline */}
      <FadeUp delay={100}>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            📋 상담 후 프로세스
          </h3>
          
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: "24시간 내 연락",
                desc: "담당자가 직접 연락드립니다",
                time: "D+1"
              },
              {
                icon: FileText,
                title: "상세 견적서 제공",
                desc: "맞춤 제안서를 보내드립니다",
                time: "D+2"
              },
              {
                icon: Rocket,
                title: "프로젝트 시작",
                desc: "계약 후 즉시 작업 시작",
                time: "D+3"
              }
            ].map(({ icon: Icon, title, desc, time }, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-white text-sm">{title}</h4>
                    <span className="text-primary text-xs font-medium">{time}</span>
                  </div>
                  <p className="text-white/60 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* FAQ */}
      <FadeUp delay={200}>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            ❓ 자주 묻는 질문
          </h3>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-white text-sm font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronDown className="w-4 h-4 text-white/70" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/70" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3">
                    <p className="text-white/70 text-xs leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Contact Card */}
      <FadeUp delay={300}>
        <div className="bg-gradient-to-br from-primary/20 to-accent-green/20 backdrop-blur-sm rounded-2xl p-6 border border-primary/30">
          <div className="text-center">
            <h3 className="text-white font-bold mb-2">급하신가요?</h3>
            <p className="text-white/70 text-sm mb-4">바로 연락주세요</p>
            
            <div className="space-y-3">
              <a
                href="tel:010-6815-0775"
                className="block w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                010-6815-0775
              </a>
              
              <a
                href="#"
                className="block w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                카카오톡 상담
              </a>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Real-time Activity */}
      <FadeUp delay={400}>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
            <div>
              <p className="text-white text-sm">현재 <span className="text-primary font-semibold">3명</span>이 상담 신청 중</p>
              <p className="text-white/50 text-xs">평균 응답시간: 30분</p>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  )
}