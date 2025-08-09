import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ExternalLink, Calendar, TrendingUp, ArrowLeft, ArrowRight } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import BeforeAfter from '@/components/ui/BeforeAfter'
import KPICounter from '@/components/ui/KPICounter'
import PageCTA from '@/components/sections/PageCTA'

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = portfolioData.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: 'Case Study Not Found - CHIRO',
    }
  }

  return {
    title: `${project.title} - Case Study | CHIRO`,
    description: project.description,
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = portfolioData.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const currentIndex = portfolioData.findIndex(p => p.slug === params.slug)
  const previousProject = currentIndex > 0 ? portfolioData[currentIndex - 1] : null
  const nextProject = currentIndex < portfolioData.length - 1 ? portfolioData[currentIndex + 1] : null

  // Get related projects based on tags
  const relatedProjects = portfolioData
    .filter(p => 
      p.slug !== project.slug && 
      p.tags.some(tag => project.tags.includes(tag))
    )
    .slice(0, 3)

  const categoryLabels = {
    manufacturing: '제조업',
    food: '식품',
    service: '서비스',
    corporate: '기업',
    fintech: '핀테크',
    healthcare: '헬스케어',
    logistics: '물류',
    consulting: '컨설팅'
  }

  return (
    <main className="pt-18">
      {/* Header */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-neutral-light/60 hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              포트폴리오로 돌아가기
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {categoryLabels[project.category]}
                </div>
                <h1 className="font-pretendard font-bold text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-shadow-gray/30">
                <div>
                  <div className="flex items-center text-neutral-light/60 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    완료일
                  </div>
                  <div className="text-white font-medium">
                    {new Date(project.completedAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>
                {project.url && (
                  <div>
                    <div className="flex items-center text-neutral-light/60 mb-2">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      웹사이트
                    </div>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent-green transition-colors font-medium"
                    >
                      사이트 보기
                    </a>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-shadow-gray/30 text-neutral-light/80 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Approach → Result Flow */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-white mb-4">
              프로젝트 <span className="text-gradient">진행 과정</span>
            </h2>
            <p className="text-neutral-light/70 max-w-2xl mx-auto">
              문제 분석부터 해결 방안, 최종 성과까지 체계적인 접근 과정을 확인해보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem */}
            <div className="relative p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Problem</h3>
              <p className="text-neutral-light/70 leading-relaxed">
                {project.problem}
              </p>
              <div className="absolute top-8 right-8 text-red-500 text-6xl font-bold opacity-10">
                01
              </div>
            </div>

            {/* Approach */}
            <div className="relative p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Approach</h3>
              <p className="text-neutral-light/70 leading-relaxed">
                {project.approach}
              </p>
              <div className="absolute top-8 right-8 text-primary text-6xl font-bold opacity-10">
                02
              </div>
            </div>

            {/* Result */}
            <div className="relative p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Result</h3>
              <p className="text-neutral-light/70 leading-relaxed">
                {project.result}
              </p>
              <div className="absolute top-8 right-8 text-green-500 text-6xl font-bold opacity-10">
                03
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      {project.before && project.after && (
        <section className="section-padding bg-primary-dark">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-pretendard font-bold text-white mb-4">
                프로젝트 <span className="text-gradient">Before & After</span>
              </h2>
              <p className="text-neutral-light/70 max-w-2xl mx-auto">
                리뉴얼 전후의 변화를 직접 확인해보세요. 사용자 경험과 시각적 개선 효과를 한눈에 볼 수 있습니다.
              </p>
            </div>

            <BeforeAfter
              beforeImage={project.before}
              afterImage={project.after}
              beforeLabel="리뉴얼 전"
              afterLabel="리뉴얼 후"
            />
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-pretendard font-bold text-white mb-4">
              프로젝트 <span className="text-gradient">성과</span>
            </h2>
            <p className="text-neutral-light/70 max-w-2xl mx-auto">
              데이터로 증명하는 프로젝트의 성공 지표들을 확인해보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {project.kpis.map((kpi, index) => (
              <KPICounter
                key={index}
                metric={kpi.metric}
                value={kpi.value}
                improvement={kpi.improvement}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Navigation and Related Cases */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          {/* Previous/Next Navigation */}
          <div className="flex justify-between items-center mb-16">
            {previousProject ? (
              <Link 
                href={`/case/${previousProject.slug}`}
                className="flex items-center space-x-3 bg-shadow-gray/20 hover:bg-shadow-gray/30 p-4 rounded-2xl transition-all group"
              >
                <ArrowLeft className="h-5 w-5 text-primary group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-neutral-light/60 mb-1">이전 사례</div>
                  <div className="text-white font-medium">{previousProject.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextProject && (
              <Link 
                href={`/case/${nextProject.slug}`}
                className="flex items-center space-x-3 bg-shadow-gray/20 hover:bg-shadow-gray/30 p-4 rounded-2xl transition-all group text-right"
              >
                <div>
                  <div className="text-xs text-neutral-light/60 mb-1">다음 사례</div>
                  <div className="text-white font-medium">{nextProject.title}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {/* Related Cases */}
          {relatedProjects.length > 0 && (
            <>
              <div className="text-center mb-12">
                <h3 className="text-2xl font-pretendard font-bold text-white mb-4">
                  관련 <span className="text-gradient">프로젝트</span>
                </h3>
                <p className="text-neutral-light/70">
                  비슷한 업종이나 서비스의 다른 성공 사례들을 확인해보세요
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link 
                    key={relatedProject.id}
                    href={`/case/${relatedProject.slug}`}
                    className="group bg-shadow-gray/20 rounded-2xl overflow-hidden border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedProject.thumbnail}
                        alt={relatedProject.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 px-2 py-1 bg-primary/90 text-white text-xs rounded-full">
                        {categoryLabels[relatedProject.category as keyof typeof categoryLabels] || relatedProject.industry}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {relatedProject.title}
                      </h4>
                      <p className="text-neutral-light/70 text-sm line-clamp-2 mb-3">
                        {relatedProject.description}
                      </p>
                      {relatedProject.kpis.length > 0 && (
                        <div className="text-primary text-sm font-medium">
                          {relatedProject.kpis[0].metric}: {relatedProject.kpis[0].value}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <PageCTA />
    </main>
  )
}