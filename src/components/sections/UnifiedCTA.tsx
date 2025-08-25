'use client'

import Link from 'next/link'
import { Clock, Shield, Users } from 'lucide-react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

export default function UnifiedCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-dark to-accent-green/5">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="space-y-8">
              <h2 className="font-pretendard font-bold text-white leading-tight">
                준비 되셨나요?
                <span className="text-gradient block">비즈니스를 성장으로 이끌 프로젝트</span>
              </h2>
              
              <p className="text-xl text-neutral-light/70 leading-relaxed">
                검증된 전문성으로 비즈니스 목표를 
                달성할 수 있도록 도와드리겠습니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/consultation" className="btn-primary group">
                  프로젝트 시작하기
                </Link>
                <Link href="/consultation" className="btn-secondary group">
                  상담 예약하기
                </Link>
              </div>

              {/* Key Benefits Quick List */}
              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-shadow-gray/20">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-white font-medium mb-1">빠른 딜리버리</p>
                  <p className="text-neutral-light/60 text-sm">1주 내 프로젝트 시작</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-white font-medium mb-1">품질 보증</p>
                  <p className="text-neutral-light/60 text-sm">100% 만족 약속</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-white font-medium mb-1">전문가 팀</p>
                  <p className="text-neutral-light/60 text-sm">시니어 레벨 전문가</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}