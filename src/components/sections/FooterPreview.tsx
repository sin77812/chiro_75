'use client'

import Link from 'next/link'
import { Calendar, FileText, TrendingUp, ArrowRight, ExternalLink } from 'lucide-react'

interface InsightPost {
  id: string
  title: string
  category: string
  readTime: number
  publishedAt: string
  slug: string
  excerpt: string
}

export default function FooterPreview() {
  // Mock insight data - replace with actual data from CMS
  const latestInsights: InsightPost[] = [
    {
      id: '1',
      title: 'AI 기반 웹 디자인의 미래: 2024년 트렌드',
      category: 'AI & 웹 디자인',
      readTime: 5,
      publishedAt: '2024-11-15',
      slug: 'ai-web-design-trends-2024',
      excerpt: 'AI 기술이 웹 디자인 프로세스를 어떻게 혁신하고 있는지, 그리고 앞으로의 전망에 대해 알아봅니다.'
    },
    {
      id: '2',
      title: 'B2B 웹사이트 전환율 최적화 완벽 가이드',
      category: 'CRO & 마케팅',
      readTime: 8,
      publishedAt: '2024-11-10',
      slug: 'b2b-conversion-optimization-guide',
      excerpt: 'B2B 비즈니스의 특성을 고려한 전환율 최적화 전략과 실제 적용 사례를 소개합니다.'
    },
    {
      id: '3',
      title: 'Core Web Vitals 완벽 대응 방법',
      category: '웹 성능',
      readTime: 6,
      publishedAt: '2024-11-05',
      slug: 'core-web-vitals-optimization',
      excerpt: 'Google Core Web Vitals 지표를 완벽하게 만족하는 웹사이트 구축 방법을 단계별로 설명합니다.'
    }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="section-padding bg-primary-dark" aria-label="회사 정보 및 인사이트">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* About Snippet */}
          <div className="space-y-8">
            <div>
              <h2 className="font-pretendard font-bold text-white mb-6">
                <span className="text-gradient">CHIRO</span>와 함께<br />
                성공의 새로운 차원을 경험하세요
              </h2>
              <p className="text-lg text-neutral-light/70 leading-relaxed mb-6">
                2020년부터 150+ 프로젝트를 통해 검증된 전문성으로 
                B2B 기업의 디지털 전환을 성공적으로 이끌어왔습니다.
              </p>
              <p className="text-neutral-light/60 leading-relaxed">
                AI 기반 웹 디자인과 인간 중심 UX를 결합하여, 
                단순한 웹사이트를 넘어 비즈니스 성과를 극대화하는 
                디지털 경험을 창조합니다.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30">
              {[
                { value: '150+', label: '완료 프로젝트' },
                { value: '98%', label: '고객 만족도' },
                { value: '4.9', label: '평점 (5점 만점)' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-light/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* About CTA */}
            <div>
              <Link 
                href="/about" 
                className="inline-flex items-center text-primary hover:text-accent-green transition-colors font-medium group"
              >
                CHIRO 더 알아보기
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Latest Insights */}
          <div className="space-y-8">
            <div>
              <h2 className="font-pretendard font-bold text-white mb-6">
                최신 <span className="text-gradient">인사이트</span>
              </h2>
              <p className="text-neutral-light/70">
                웹 디자인과 디지털 마케팅의 최신 트렌드와 실무 노하우를 공유합니다.
              </p>
            </div>

            {/* Insights Cards */}
            <div className="space-y-4">
              {latestInsights.map((insight, index) => (
                <Link
                  key={insight.id}
                  href={`/insights/${insight.slug}`}
                  className="group block p-6 bg-shadow-gray/20 rounded-xl border border-shadow-gray/30 hover:border-primary/30 hover:bg-shadow-gray/30 transition-all card-hover"
                >
                  <div className="space-y-3">
                    {/* Category & Meta */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {insight.category}
                      </span>
                      <div className="flex items-center text-neutral-light/50 space-x-3">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(insight.publishedAt)}
                        </span>
                        <span className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {insight.readTime}분 읽기
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-pretendard font-semibold text-white group-hover:text-primary transition-colors leading-snug">
                      {insight.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-neutral-light/60 text-sm leading-relaxed line-clamp-2">
                      {insight.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-primary hover:text-accent-green transition-colors text-sm font-medium group-hover:underline">
                        자세히 읽기
                      </span>
                      <ExternalLink className="h-4 w-4 text-neutral-light/40 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Insights */}
            <div className="text-center pt-4">
              <Link 
                href="/insights" 
                className="inline-flex items-center text-primary hover:text-accent-green transition-colors font-medium group"
              >
                모든 인사이트 보기
                <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
              웹 디자인 트렌드와 비즈니스 인사이트를 매주 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 bg-dark/50 border border-shadow-gray/30 rounded-lg text-white placeholder-neutral-light/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                구독하기
                <ArrowRight className="ml-2 h-4 w-4" />
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