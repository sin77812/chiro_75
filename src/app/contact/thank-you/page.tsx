import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '문의 완료 | CHIRO - 곧 연락드리겠습니다',
  description: '문의해주셔서 감사합니다. CHIRO 전문가가 24시간 이내에 연락드릴 예정입니다.',
  robots: 'noindex, follow',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center bg-white rounded-3xl p-12 shadow-xl">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Main Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            문의가 성공적으로 전송되었습니다!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            소중한 시간을 내어 문의해주셔서 감사합니다.
            <br />CHIRO 전문가가 <strong className="text-blue-600">24시간 이내</strong>에 연락드릴 예정입니다.
          </p>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">다음 단계</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <span>담당자가 이메일 또는 전화로 1차 연락드립니다</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <span>프로젝트 요구사항을 자세히 논의합니다</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <span>맞춤형 제안서와 견적을 제공합니다</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                긴급한 경우 전화하기
              </a>
              
              <a
                href="https://calendly.com/chiro-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                미팅 직접 예약하기
              </a>
            </div>

            <div className="flex justify-center space-x-6 text-sm">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                홈으로 돌아가기
              </Link>
              <Link 
                href="/case-studies" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                성공 사례 보기
              </Link>
              <Link 
                href="/insights" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                인사이트 읽기
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@chiro.kr
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02-1234-5678
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-12 text-center">
          <blockquote className="text-gray-600 italic">
            "CHIRO와의 협업은 정말 만족스러웠습니다. 전문성과 커뮤니케이션 모두 완벽했어요."
          </blockquote>
          <cite className="text-sm text-gray-500 mt-2 block">
            - 김민준, StyleHub CEO
          </cite>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </main>
  )
}

// Add this to your global CSS for the blob animation
// @keyframes blob {
//   0% { transform: translate(0px, 0px) scale(1); }
//   33% { transform: translate(30px, -50px) scale(1.1); }
//   66% { transform: translate(-20px, 20px) scale(0.9); }
//   100% { transform: translate(0px, 0px) scale(1); }
// }
// 
// .animate-blob {
//   animation: blob 7s infinite;
// }
// 
// .animation-delay-2000 {
//   animation-delay: 2s;
// }
// 
// .animation-delay-4000 {
//   animation-delay: 4s;
// }