import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'
import MetricsCard from '@/components/ui/MetricsCard'
import CaseStudyStructuredData from '@/components/seo/CaseStudyStructuredData'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

async function getCaseStudy(slug: string) {
  return caseStudies.find(cs => cs.slug === slug)
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const caseStudy = await getCaseStudy(resolvedParams.slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | CHIRO',
    }
  }

  return {
    title: `${caseStudy.title} | CHIRO 사례 연구`,
    description: caseStudy.overview.problem,
    keywords: caseStudy.tags,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.overview.problem,
      images: [caseStudy.heroImage],
      type: 'article',
    },
  }
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }))
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params
  const caseStudy = await getCaseStudy(resolvedParams.slug)

  if (!caseStudy) {
    notFound()
  }

  const nextProject = caseStudy.nextProject ? caseStudies.find(cs => cs.slug === caseStudy.nextProject) : null

  return (
    <>
      <CaseStudyStructuredData caseStudy={caseStudy} />
      <main className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/case-studies" className="hover:text-blue-600">사례 연구</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{caseStudy.client}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{caseStudy.readTime}분 읽기</span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <article>
        <section className="relative h-[60vh] min-h-[500px] flex items-center">
          <Image
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {caseStudy.client}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {caseStudy.sector}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {caseStudy.title}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {caseStudy.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold mb-1 text-white">
                      {metric.delta}
                    </div>
                    <div className="text-sm text-white/80">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">프로젝트 개요</h2>
                <div className="prose prose-lg prose-gray max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">문제 정의</h3>
                  <p className="text-gray-600 mb-8">{caseStudy.overview.problem}</p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">프로젝트 목표</h3>
                  <ul className="space-y-2 mb-8">
                    {caseStudy.overview.goals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="font-semibold text-gray-900 mb-6">프로젝트 정보</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-gray-600 mb-1">역할</dt>
                      <dd className="text-gray-900">{caseStudy.overview.role}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600 mb-1">기간</dt>
                      <dd className="text-gray-900">{caseStudy.overview.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600 mb-1">팀</dt>
                      <dd className="text-gray-900">
                        {caseStudy.overview.team.join(', ')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600 mb-2">기술 스택</dt>
                      <dd className="flex flex-wrap gap-2">
                        {caseStudy.techStack.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">주요 과제</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.challenges.map((challenge, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">전략 및 접근법</h2>
              <div className="space-y-6">
                {caseStudy.strategy.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-lg text-gray-700 pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">디자인 & 구현 하이라이트</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.designHighlights.map((highlight, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">성과 지표</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                데이터로 검증된 프로젝트의 구체적 성과입니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caseStudy.metrics.map((metric, index) => (
                <MetricsCard 
                  key={index} 
                  metric={metric} 
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">프로젝트 갤러리</h2>
            <div className="space-y-12">
              {caseStudy.gallery.map((item, index) => (
                <figure key={index} className="text-center">
                  <div className="aspect-[16/10] relative rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-gray-600 italic">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {caseStudy.quotes.length > 0 && (
          <section className="bg-blue-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">클라이언트 피드백</h2>
              {caseStudy.quotes.map((quote, index) => (
                <blockquote key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-blue-200">
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    "{quote.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    {quote.avatar && (
                      <Image
                        src={quote.avatar}
                        alt={quote.author}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{quote.author}</div>
                      <div className="text-sm text-gray-600">{quote.position}, {quote.company}</div>
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">프로젝트 리소스</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target={resource.type === 'link' ? '_blank' : '_self'}
                  rel={resource.type === 'link' ? 'noopener noreferrer' : ''}
                  className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {resource.type === 'pdf' && (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {resource.type === 'link' && (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                    {resource.type === 'video' && (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 00.707-.293l2.414-2.414a1 1 0 00.293-.707V6a1 1 0 00-1-1H9a1 1 0 00-1 1v4z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    )}
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              비슷한 프로젝트를 시작하고 싶으신가요?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              CHIRO와 함께 여러분만의 성공 사례를 만들어보세요
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              무료 상담 신청하기
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {nextProject && (
          <section className="py-20 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900">다음 사례 연구</h2>
              </div>
              <Link 
                href={`/case-studies/${nextProject.slug}`}
                className="group block max-w-4xl mx-auto"
              >
                <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-600 font-medium mb-2">{nextProject.client}</div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {nextProject.title}
                      </h3>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}
      </article>
    </main>
    </>
  )
}