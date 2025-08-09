import { Metadata } from 'next'
import { Shield, Database, User, Lock, Eye, FileText, Clock, Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보 처리방침 - CHIRO',
  description: 'CHIRO의 개인정보 수집, 이용, 보관, 파기에 대한 처리방침을 확인하세요.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-18">
      {/* Header */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                <Shield className="h-4 w-4" />
                <span>PRIVACY POLICY</span>
              </div>
              <h1 className="font-pretendard font-bold text-white mb-6">
                개인정보 <span className="text-gradient">처리방침</span>
              </h1>
              <p className="text-xl text-neutral-light/70 leading-relaxed">
                CHIRO는 고객님의 개인정보를 소중히 여기며, 관련 법령에 따라 안전하게 처리합니다.
              </p>
            </div>

            {/* Policy Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="text-center p-6 bg-shadow-gray/20 rounded-xl border border-shadow-gray/30">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-semibold text-white mb-1">시행일자</div>
                <div className="text-neutral-light/60 text-sm">2024.01.01</div>
              </div>
              <div className="text-center p-6 bg-shadow-gray/20 rounded-xl border border-shadow-gray/30">
                <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-semibold text-white mb-1">버전</div>
                <div className="text-neutral-light/60 text-sm">v2.1</div>
              </div>
              <div className="text-center p-6 bg-shadow-gray/20 rounded-xl border border-shadow-gray/30">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-semibold text-white mb-1">문의</div>
                <div className="text-neutral-light/60 text-sm">privacy@chiro.co.kr</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="section-padding bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* 1. 개인정보 수집 및 이용 */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Database className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-2xl font-pretendard font-bold text-white">
                  1. 개인정보의 수집 및 이용목적
                </h2>
              </div>
              
              <div className="p-6 bg-shadow-gray/20 border border-shadow-gray/30 rounded-xl">
                <h3 className="font-semibold text-white mb-4">수집하는 개인정보 항목</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium">필수항목</div>
                      <div className="text-neutral-light/70 text-sm">이름, 이메일, 회사명, 프로젝트 상세내용</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium">선택항목</div>
                      <div className="text-neutral-light/70 text-sm">예상 예산, 관심 서비스</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium">자동 수집</div>
                      <div className="text-neutral-light/70 text-sm">접속 로그, IP 주소, 쿠키, 접속 기록</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-shadow-gray/20 border border-shadow-gray/30 rounded-xl">
                <h3 className="font-semibold text-white mb-4">개인정보 이용목적</h3>
                <ul className="space-y-2">
                  {[
                    "상담 및 서비스 제공",
                    "프로젝트 견적 및 제안서 발송",
                    "고객 지원 및 문의사항 처리",
                    "서비스 개선 및 신규 서비스 개발",
                    "마케팅 및 광고 활용 (동의시에만)"
                  ].map((purpose, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-accent-green rounded-full flex-shrink-0"></div>
                      <span className="text-neutral-light/70 text-sm">{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. 개인정보 보유 및 이용기간 */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-2xl font-pretendard font-bold text-white">
                  2. 개인정보의 보유 및 이용기간
                </h2>
              </div>
              
              <div className="p-6 bg-shadow-gray/20 border border-shadow-gray/30 rounded-xl">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold text-white mb-2">상담 문의</div>
                      <div className="text-neutral-light/70 text-sm">문의 완료 후 3년간 보관</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">프로젝트 진행</div>
                      <div className="text-neutral-light/70 text-sm">계약 종료 후 5년간 보관</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">마케팅 정보</div>
                      <div className="text-neutral-light/70 text-sm">동의 철회시까지 또는 2년</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">접속 로그</div>
                      <div className="text-neutral-light/70 text-sm">3개월간 보관 후 자동 삭제</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 개인정보 제3자 제공 */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-2xl font-pretendard font-bold text-white">
                  3. 개인정보의 제3자 제공
                </h2>
              </div>
              
              <div className="p-6 bg-shadow-gray/20 border border-shadow-gray/30 rounded-xl">
                <p className="text-neutral-light/70 text-sm leading-relaxed mb-4">
                  CHIRO는 원칙적으로 고객님의 개인정보를 제3자에게 제공하지 않습니다. 
                  다만, 다음의 경우에는 예외로 합니다:
                </p>
                <ul className="space-y-2">
                  {[
                    "고객님이 사전에 동의한 경우",
                    "법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차에 따라 수사기관의 요구가 있는 경우",
                    "서비스 제공을 위한 업무 위탁 (암호화하여 최소한의 정보만 제공)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-light/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. 개인정보 보안 */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Lock className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-2xl font-pretendard font-bold text-white">
                  4. 개인정보의 안전성 확보조치
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "기술적 조치",
                    measures: [
                      "개인정보 암호화 저장",
                      "SSL 인증서를 통한 데이터 전송 보호",
                      "해킹 방지 시스템 구축",
                      "정기적인 보안 업데이트"
                    ]
                  },
                  {
                    title: "관리적 조치",
                    measures: [
                      "개인정보 취급자 최소화",
                      "정기적인 보안 교육 실시",
                      "개인정보 접근권한 관리",
                      "개인정보 처리 현황 점검"
                    ]
                  }
                ].map((category, index) => (
                  <div key={index} className="p-6 bg-shadow-gray/20 border border-shadow-gray/30 rounded-xl">
                    <h3 className="font-semibold text-white mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.measures.map((measure, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 bg-accent-green rounded-full flex-shrink-0"></div>
                          <span className="text-neutral-light/70 text-sm">{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. 개인정보 권리 */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-2xl font-pretendard font-bold text-white">
                  5. 정보주체의 권리·의무
                </h2>
              </div>
              
              <div className="p-6 bg-shadow-gray/20 border border-shadow-gray/30 rounded-xl">
                <p className="text-neutral-light/70 text-sm leading-relaxed mb-4">
                  고객님은 언제든지 다음과 같은 권리를 행사하실 수 있습니다:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "개인정보 처리정지 요구권",
                    "개인정보 열람 요구권",
                    "개인정보 정정·삭제 요구권",
                    "개인정보 손해배상 청구권"
                  ].map((right, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-neutral-light/70 text-sm">{right}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-8 bg-gradient-to-r from-primary/10 to-accent-green/10 border border-primary/20 rounded-2xl">
              <h3 className="text-xl font-pretendard font-bold text-white mb-6 text-center">
                개인정보보호 담당자
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="font-semibold text-white mb-2">개인정보보호책임자</div>
                  <div className="text-neutral-light/70 text-sm">
                    성명: 김민수 (대표이사)<br/>
                    연락처: privacy@chiro.co.kr<br/>
                    전화: 02-1234-5678
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white mb-2">개인정보보호담당자</div>
                  <div className="text-neutral-light/70 text-sm">
                    성명: 박지영 (개발팀 리드)<br/>
                    연락처: privacy@chiro.co.kr<br/>
                    전화: 02-1234-5679
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-6 bg-shadow-gray/20 rounded-xl border border-shadow-gray/30">
              <p className="text-neutral-light/70 text-sm leading-relaxed mb-4">
                본 방침은 2024년 1월 1일부터 시행되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 
                정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}