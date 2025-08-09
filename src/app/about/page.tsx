import { Metadata } from 'next'
import Image from 'next/image'
import { Users, Award, Target, Zap } from 'lucide-react'
import PageCTA from '@/components/sections/PageCTA'
import TestimonialCarousel from '@/components/ui/TestimonialCarousel'
import { FadeUp, FadeLeft, FadeRight, StaggerContainer } from '@/components/ui/ScrollReveal'
import awardsData from '@/data/awards.json'
import testimonialsData from '@/data/testimonials.json'

export const metadata: Metadata = {
  title: '회사소개 - CHIRO',
  description: 'B2B 기업의 디지털 전환을 이끄는 CHIRO의 비전과 팀을 만나보세요.',
}

export default function AboutPage() {
  return (
    <main className="pt-18">
      {/* Hero Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                  ABOUT CHIRO
                </div>
                <h1 className="font-pretendard font-bold text-white mb-6">
                  B2B 기업의 <span className="text-gradient">디지털 전환</span>을<br />
                  완성하는 파트너
                </h1>
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  2020년 설립된 CHIRO는 제조업과 중견기업을 위한 전문 웹에이전시입니다. 
                  단순한 웹사이트 제작을 넘어 비즈니스 성과까지 책임지는 디지털 파트너가 되겠습니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-neutral-light/60">완료 프로젝트</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4년</div>
                  <div className="text-neutral-light/60">업계 경험</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-neutral-light/60">고객 만족도</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15명</div>
                  <div className="text-neutral-light/60">전문 인력</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop"
                  alt="CHIRO 오피스"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-primary-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              CHIRO의 <span className="text-gradient">핵심 가치</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto">
              고객의 성공이 곧 우리의 성공이라는 믿음으로, 최고의 결과를 위해 노력합니다.
            </p>
          </div>

          <StaggerContainer staggerDelay={100}>
            {[
              {
                icon: Target,
                title: "결과 중심",
                description: "단순한 웹사이트가 아닌 비즈니스 성과를 만들어내는 솔루션"
              },
              {
                icon: Users,
                title: "고객 우선",
                description: "고객의 니즈를 깊이 이해하고 맞춤형 전략을 제공"
              },
              {
                icon: Zap,
                title: "빠른 실행",
                description: "신속한 의사결정과 효율적인 프로세스로 빠른 결과 도출"
              },
              {
                icon: Award,
                title: "전문성",
                description: "업계 최고 수준의 기술력과 창의적인 디자인 역량"
              }
            ].map((value, index) => {
              const IconComponent = value.icon
              return (
                <div 
                  key={index}
                  className="text-center p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-pretendard font-semibold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-neutral-light/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="font-pretendard font-bold text-white mb-6">
                  CHIRO의 <span className="text-gradient">스토리</span>
                </h2>
                <p className="text-lg text-neutral-light/70 leading-relaxed mb-6">
                  2020년, B2B 기업들의 디지털 전환 과정에서 겪는 어려움을 목격하며 CHIRO가 시작되었습니다. 
                  단순한 웹사이트 제작 업체가 아닌, 고객의 비즈니스 성장을 함께 고민하고 실질적인 성과를 만들어내는 
                  진정한 디지털 파트너가 되고자 합니다.
                </p>
                <p className="text-neutral-light/70 leading-relaxed">
                  우리는 모든 프로젝트에서 '성과'를 최우선으로 생각합니다. 아름다운 디자인과 최신 기술은 
                  결국 고객의 비즈니스 목표를 달성하기 위한 수단일 뿐입니다. 이러한 철학으로 지금까지 
                  150여 개의 B2B 기업과 함께 성장해왔습니다.
                </p>
              </div>

              <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                <h3 className="text-lg font-semibold text-primary mb-3">우리의 철학</h3>
                <p className="text-neutral-light/70 leading-relaxed text-sm">
                  "고객의 성공이 곧 우리의 성공입니다. 단순히 웹사이트를 만드는 것이 아니라, 
                  고객의 비즈니스가 한 단계 도약할 수 있는 디지털 기반을 구축합니다."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="CHIRO 팀워크"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                <div className="text-primary font-bold text-2xl">4+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              CHIRO의 <span className="text-gradient">4단계 프로세스</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto">
              Discovery → Design → Build → Optimize<br />
              체계적이고 투명한 프로세스로 최고의 결과를 보장합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Discovery", 
                subtitle: "발견 & 분석",
                desc: "비즈니스 목표, 타겟 고객, 경쟁사 분석을 통한 전략 방향 설정",
                activities: ["현황 분석", "목표 설정", "사용자 리서치", "기술 요구사항 정의"],
                color: "from-blue-500 to-blue-400"
              },
              { 
                step: "02", 
                title: "Design", 
                subtitle: "설계 & 디자인",
                desc: "사용자 경험을 고려한 정보 구조 설계와 브랜드에 맞는 시각적 디자인",
                activities: ["정보 설계", "와이어프레임", "UI/UX 디자인", "프로토타이핑"],
                color: "from-purple-500 to-purple-400"
              },
              { 
                step: "03", 
                title: "Build", 
                subtitle: "개발 & 구축",
                desc: "최신 기술과 모범 사례를 적용한 고품질 웹사이트 개발 및 테스트",
                activities: ["프론트엔드 개발", "백엔드 개발", "CMS 구축", "품질 테스트"],
                color: "from-primary to-accent-green"
              },
              { 
                step: "04", 
                title: "Optimize", 
                subtitle: "최적화 & 운영",
                desc: "성능 최적화, SEO 적용, 런칭 후 지속적인 모니터링 및 개선",
                activities: ["성능 최적화", "SEO 적용", "런칭 지원", "사후 관리"],
                color: "from-green-500 to-green-400"
              }
            ].map((process, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <div className="p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover h-full">
                  {/* Step Number with Gradient */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${process.color} rounded-full flex items-center justify-center mb-6 text-white font-bold text-lg`}>
                    {process.step}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-pretendard font-bold text-white mb-1">
                        {process.title}
                      </h3>
                      <h4 className="text-primary font-medium text-sm mb-3">
                        {process.subtitle}
                      </h4>
                      <p className="text-neutral-light/70 text-sm leading-relaxed">
                        {process.desc}
                      </p>
                    </div>

                    {/* Activities */}
                    <ul className="space-y-2">
                      {process.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-center text-xs text-neutral-light/60">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow Connector */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-primary/50"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHIRO 스탠다드 - Principles */}
      <section className="section-padding bg-primary-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              <span className="text-gradient">치로 스탠다드</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto">
              모든 프로젝트에 적용되는 우리만의 품질 기준과 원칙
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🔍",
                title: "접근성 (Accessibility)",
                subtitle: "WCAG 2.1 AA 준수",
                principles: [
                  "스크린 리더 완벽 호환",
                  "키보드 네비게이션 지원",
                  "색상 대비 4.5:1 이상",
                  "모든 인터랙티브 요소 ARIA 라벨링"
                ]
              },
              {
                icon: "⚡",
                title: "성능 (Performance)",
                subtitle: "Core Web Vitals 최적화",
                principles: [
                  "LCP(Largest Contentful Paint) < 2.5s",
                  "FID(First Input Delay) < 100ms", 
                  "CLS(Cumulative Layout Shift) < 0.1",
                  "Lighthouse 성능 점수 90+ 달성"
                ]
              },
              {
                icon: "🛡️",
                title: "보안 (Security)",
                subtitle: "기업급 보안 기준",
                principles: [
                  "HTTPS 강제 적용 및 HSTS 설정",
                  "XSS, CSRF 공격 방어",
                  "개인정보 암호화 저장",
                  "정기 보안 감사 및 업데이트"
                ]
              }
            ].map((standard, index) => (
              <div key={index} className="p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{standard.icon}</span>
                  </div>
                  <h3 className="text-xl font-pretendard font-bold text-white mb-2">
                    {standard.title}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {standard.subtitle}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {standard.principles.map((principle, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-accent-green rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-light/70 text-sm leading-relaxed">
                        {principle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Standards Promise */}
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-accent-green/10 border border-primary/20 rounded-2xl">
            <h3 className="text-2xl font-pretendard font-bold text-white mb-4">
              치로 스탠다드 <span className="text-primary">보장</span>
            </h3>
            <p className="text-lg text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
              모든 프로젝트는 위의 기준을 100% 충족해야만 납품됩니다. 
              기준에 미달하는 경우, 추가 비용 없이 완벽하게 개선해드립니다.
            </p>
            <div className="mt-6 inline-flex items-center space-x-2 text-accent-green font-medium">
              <span className="text-lg">✓</span>
              <span>품질 보증서 제공</span>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              인정받는 <span className="text-gradient">전문성</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto">
              업계에서 인정받은 CHIRO의 실력과 성과를 확인하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {awardsData.map((award) => (
              <div 
                key={award.id}
                className="text-center p-6 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover"
              >
                <div className="w-20 h-20 mx-auto mb-4 relative rounded-lg overflow-hidden bg-white/5">
                  <Image
                    src={award.badge || '/images/award-placeholder.png'}
                    alt={award.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="text-primary font-semibold mb-1">
                  {award.year}
                </div>
                <h3 className="text-white font-medium mb-2 text-sm">
                  {award.title}
                </h3>
                <div className="text-neutral-light/60 text-xs">
                  {award.organization}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              고객이 말하는 <span className="text-gradient">CHIRO</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto">
              함께 성장해온 고객들의 생생한 후기를 확인해보세요
            </p>
          </div>

          <TestimonialCarousel 
            testimonials={testimonialsData}
            autoPlay={true}
            interval={6000}
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-primary-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              최고의 <span className="text-gradient">전문가 팀</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto">
              각 분야의 전문가들이 모여 최상의 결과를 만들어냅니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "김민수",
                position: "대표이사 / 전략기획",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
                experience: "15년+ 디지털 마케팅 경험"
              },
              {
                name: "박지영",
                position: "UX/UI 디자인 리드",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=300&h=300&fit=crop&crop=face",
                experience: "10년+ UX 디자인 경험"
              },
              {
                name: "이철수",
                position: "개발팀 리드",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                experience: "12년+ 풀스택 개발 경험"
              },
            ].map((member, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover"
              >
                <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-pretendard font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-primary font-medium mb-2">
                  {member.position}
                </div>
                <div className="text-neutral-light/60 text-sm">
                  {member.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA />
    </main>
  )
}