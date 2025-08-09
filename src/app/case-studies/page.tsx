import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/data/caseStudies'

export const metadata: Metadata = {
  title: '사례 연구 | CHIRO - 디지털 혁신 성공 사례',
  description: 'CHIRO가 함께한 클라이언트들의 디지털 혁신 성공 사례를 확인하세요. 데이터 기반의 정량적 결과와 구체적인 프로세스를 공개합니다.',
  keywords: ['사례연구', '디지털혁신', '웹사이트리뉴얼', 'UX개선', '성능최적화'],
  openGraph: {
    title: '사례 연구 | CHIRO',
    description: 'CHIRO가 함께한 클라이언트들의 디지털 혁신 성공 사례',
    type: 'website',
  },
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              성공 사례 연구
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              데이터 기반의 전략으로 클라이언트의 비즈니스 목표를 달성한 
              <br />구체적인 프로세스와 정량적 결과를 공개합니다.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-900 font-semibold mb-1">성공 프로젝트</div>
              <div className="text-sm text-gray-600">다양한 업계 클라이언트</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">250%</div>
              <div className="text-gray-900 font-semibold mb-1">평균 성과 향상</div>
              <div className="text-sm text-gray-600">전환율, 매출, 사용성 개선</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-900 font-semibold mb-1">클라이언트 만족도</div>
              <div className="text-sm text-gray-600">재계약 및 추천 비율</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.map((caseStudy, index) => (
              <Link 
                key={caseStudy.id}
                href={`/case-studies/${caseStudy.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={caseStudy.thumbnail}
                      alt={caseStudy.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                        <span>{caseStudy.client}</span>
                        <span>•</span>
                        <span>{caseStudy.sector}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {caseStudy.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {caseStudy.overview.problem}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {metric.delta}
                          </div>
                          <div className="text-sm text-gray-600">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                        자세히 보기
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            여러분의 성공 사례를 만들어보세요
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            CHIRO와 함께 디지털 혁신을 통해 비즈니스 목표를 달성하세요
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            프로젝트 시작하기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}