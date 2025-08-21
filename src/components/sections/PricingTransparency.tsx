'use client'

import { Check } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

const pricingPlans = [
  {
    title: '스타트업 패키지',
    price: '300만원~',
    features: [
      '랜딩페이지 5개',
      '반응형 디자인',
      'SEO 기본 설정',
      '2주 완성'
    ],
    featured: false
  },
  {
    title: '성장 패키지',
    price: '500만원~',
    features: [
      '페이지 10개+',
      '관리자 페이지',
      '고급 SEO 최적화',
      '3주 완성'
    ],
    featured: true
  },
  {
    title: '커스텀 개발',
    price: '별도 견적',
    features: [
      '맞춤형 기능 개발',
      '외부 서비스 연동',
      '확장 가능한 설계',
      '협의 후 결정'
    ],
    featured: false
  }
]

export default function PricingTransparency() {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <FadeUp>
            <p className="text-primary font-medium mb-4">투명한 가격</p>
            <h2 className="font-pretendard font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              투명한 가격, <span className="text-gradient">명확한 결과</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <FadeUp key={index} delay={index * 150}>
              <div className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:bg-white/10 ${
                plan.featured 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-white/10 hover:border-primary/30'
              }`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {plan.title}
                  </h3>
                  <div className="text-4xl font-black text-primary mb-2">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-white/80">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.featured
                    ? 'bg-primary hover:bg-primary/90 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}>
                  상담 신청
                </button>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="text-center mt-12">
          <FadeUp delay={600}>
            <p className="text-white/60 text-sm">
              * 모든 패키지 1년 무료 유지보수 포함
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}