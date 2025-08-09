import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import PageCTA from '@/components/sections/PageCTA'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: '연락처 - CHIRO',
  description: 'CHIRO에 프로젝트 문의나 상담을 원하시면 언제든 연락주세요. 24시간 이내 답변드립니다.',
}

export default function ContactPage() {
  return (
    <main className="pt-18">
      {/* Contact Hero */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="font-pretendard font-bold text-white mb-6">
              프로젝트 상담이 <span className="text-gradient">필요하시나요?</span>
            </h1>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
              어떤 궁금한 점이든 편하게 문의해주세요. CHIRO의 전문 컨설턴트가 
              24시간 이내에 맞춤형 솔루션을 제안해드립니다.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: "전화 상담",
                value: "02-1234-5678",
                description: "평일 09:00 - 18:00",
                href: "tel:02-1234-5678"
              },
              {
                icon: Mail,
                title: "이메일 문의",
                value: "hello@chiro.co.kr",
                description: "24시간 접수 가능",
                href: "mailto:hello@chiro.co.kr"
              },
              {
                icon: MapPin,
                title: "오피스 방문",
                value: "서울시 강남구 테헤란로",
                description: "사전 예약 필수",
                href: "#"
              },
              {
                icon: Clock,
                title: "응답 시간",
                value: "평균 2시간",
                description: "최대 24시간 이내",
                href: "#"
              }
            ].map((contact, index) => {
              const IconComponent = contact.icon
              return (
                <div 
                  key={index}
                  className="text-center p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <IconComponent className="h-8 w-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-pretendard font-semibold text-white mb-2">
                    {contact.title}
                  </h3>
                  {contact.href !== "#" ? (
                    <a 
                      href={contact.href}
                      className="text-primary hover:text-accent-green transition-colors font-medium block mb-1"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <div className="text-primary font-medium mb-1">
                      {contact.value}
                    </div>
                  )}
                  <div className="text-neutral-light/60 text-sm">
                    {contact.description}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Access */}
          <div className="grid md:grid-cols-3 gap-6">
            <button className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-left hover:bg-primary/10 transition-colors group">
              <div className="text-primary font-semibold mb-2 group-hover:text-accent-green">
                🚀 긴급 프로젝트
              </div>
              <div className="text-neutral-light/70 text-sm">
                당일 상담 가능한 프로젝트
              </div>
            </button>

            <button className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-left hover:bg-primary/10 transition-colors group">
              <div className="text-primary font-semibold mb-2 group-hover:text-accent-green">
                💡 무료 컨설팅
              </div>
              <div className="text-neutral-light/70 text-sm">
                프로젝트 방향성 상담
              </div>
            </button>

            <button className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-left hover:bg-primary/10 transition-colors group">
              <div className="text-primary font-semibold mb-2 group-hover:text-accent-green">
                📊 현황 분석
              </div>
              <div className="text-neutral-light/70 text-sm">
                기존 사이트 무료 분석
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-primary-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              자주 묻는 <span className="text-gradient">질문들</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto">
              프로젝트 진행 전 궁금한 점들을 미리 확인해보세요.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "프로젝트 기간은 얼마나 걸리나요?",
                answer: "프로젝트 규모에 따라 다르지만, 일반적인 기업 사이트는 4-6주, 복잡한 플랫폼은 8-12주 정도 소요됩니다. 정확한 일정은 상담 시 안내드립니다."
              },
              {
                question: "제작 비용은 어떻게 결정되나요?",
                answer: "프로젝트 범위, 기능 복잡도, 디자인 요구사항에 따라 달라집니다. 무료 상담을 통해 정확한 견적을 제공해드립니다."
              },
              {
                question: "기존 사이트 리뉴얼도 가능한가요?",
                answer: "네, 기존 사이트 분석부터 완전한 리뉴얼까지 모든 단계를 지원합니다. 데이터 마이그레이션과 SEO 유지도 함께 고려합니다."
              },
              {
                question: "사후 관리 서비스는 어떻게 되나요?",
                answer: "런칭 후 3개월 무료 지원이 기본이며, 월간/연간 유지보수 계약을 통해 지속적인 관리 서비스를 제공합니다."
              },
              {
                question: "모바일 최적화는 기본으로 포함되나요?",
                answer: "네, 모든 프로젝트에서 반응형 디자인과 모바일 최적화는 기본으로 제공됩니다. 별도 비용이 발생하지 않습니다."
              }
            ].map((faq, index) => (
              <details 
                key={index} 
                className="group bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all"
              >
                <summary className="p-6 cursor-pointer list-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-pretendard font-semibold text-white group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:rotate-45 transition-all">
                      <div className="w-3 h-0.5 bg-primary group-hover:bg-white"></div>
                      <div className="w-0.5 h-3 bg-primary group-hover:bg-white absolute"></div>
                    </div>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-neutral-light/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-primary-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-6">
              <span className="text-gradient">프로젝트 상담</span> 신청
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
              프로젝트에 대한 자세한 정보를 알려주시면, 전문 컨설턴트가 
              맞춤형 솔루션을 제안해드립니다.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-pretendard font-bold text-white mb-6">
              CHIRO <span className="text-gradient">오피스 위치</span>
            </h2>
            <p className="text-neutral-light/70">
              직접 방문 상담을 원하시면 사전에 예약해주세요.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <div className="aspect-[4/3] bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-white font-medium mb-2">오피스 위치</div>
                <div className="text-neutral-light/60">
                  서울시 강남구 테헤란로 123<br />
                  CHIRO 빌딩 5층
                </div>
              </div>
            </div>

            {/* Office Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-pretendard font-semibold text-white mb-4">
                  오피스 방문 안내
                </h3>
                <p className="text-neutral-light/70 leading-relaxed mb-6">
                  보다 자세한 상담을 위해 직접 방문하실 수 있습니다. 
                  사전 예약을 통해 전문 컨설턴트와 1:1 맞춤 상담을 받아보세요.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">운영시간</div>
                    <div className="text-neutral-light/60 text-sm">
                      평일 09:00 - 18:00 (점심시간 12:00 - 13:00)
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">주차안내</div>
                    <div className="text-neutral-light/60 text-sm">
                      건물 지하 1층, 2시간 무료 주차 가능
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">방문 예약</div>
                    <div className="text-neutral-light/60 text-sm">
                      02-1234-5678 (방문 24시간 전 예약 필수)
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn-primary">
                방문 상담 예약하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA />
    </main>
  )
}