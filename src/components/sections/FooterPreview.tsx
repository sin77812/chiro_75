'use client'

import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function FooterPreview() {
  return (
    <section className="section-padding bg-primary-dark" aria-label="회사 정보">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* About Section */}
          <div className="text-center space-y-8">
            <div>
              <h2 className="font-pretendard font-bold text-white mb-6">
                <span className="text-gradient">CHIRO</span>와 함께<br />
                성공의 새로운 차원을 경험하세요
              </h2>
              <p className="text-lg text-neutral-light/70 leading-relaxed mb-6">
                2020년부터 50+ 기업과 함께 디지털 혁신을 이뤄온 CHIRO는 단순한 웹 개발을 넘어, 
                데이터 중심의 전략적 솔루션으로 클라이언트의 비즈니스 성공을 견인합니다.
              </p>
              <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-neutral-light/60">성공한 프로젝트</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-green mb-2">280%</div>
                  <div className="text-sm text-neutral-light/60">평균 성과 향상</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">4.9/5</div>
                  <div className="text-sm text-neutral-light/60">클라이언트 만족도</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Link 
                href="/about" 
                className="inline-flex items-center text-primary hover:text-accent-green transition-colors font-medium group"
              >
                CHIRO 더 알아보기
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/10 to-accent-green/5 rounded-2xl border border-primary/20">
            <h3 className="text-xl font-pretendard font-semibold text-white mb-4">
              📬 CHIRO 뉴스레터 구독
            </h3>
            <p className="text-neutral-light/70 mb-6">
              최신 디지털 트렌드와 비즈니스 성장 전략을 매주 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white placeholder-neutral-light/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                구독하기
              </button>
            </div>
            <p className="text-xs text-neutral-light/50 mt-3">
              언제든지 구독 해지할 수 있습니다. 개인정보는 안전하게 보호됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}