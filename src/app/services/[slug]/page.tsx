import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, Users, Clock, DollarSign, Zap, Shield, Star, Code, Play, TrendingUp, Award, Lightbulb, Target } from 'lucide-react'
import Link from 'next/link'
import servicesData from '@/data/services.json'
import ScrollReveal, { FadeUp, FadeLeft, FadeRight } from '@/components/ui/ScrollReveal'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

// Extended service data with additional fields for detail pages
const serviceExtensions: Record<string, any> = {
  'web-development': {
    problemSolution: {
      problems: [
        '방문자를 고객으로 전환하지 못하는 구식 웹사이트',
        '60% 이상의 이탈률을 유발하는 모바일 경험 부족',
        'SEO 순위에 악영향을 주는 느린 로딩 속도(3초 이상)',
        '개발자 개입이 필요한 까다로운 콘텐츠 관리'
      ],
      solutions: [
        '검증된 전환 패턴을 적용한 모바일 우선 반응형 디자인',
        '최적화된 Core Web Vitals로 1초 미만 로딩 시간',
        '쉬운 콘텐츠 업데이트를 위한 직관적 CMS 통합',
        '자연 검색 트래픽 증가를 위한 SEO 최적화 아키텍처'
      ]
    },
    techStack: [
      { name: 'Next.js 14', category: 'Framework', logo: '/tech/nextjs.svg' },
      { name: 'TypeScript', category: 'Language', logo: '/tech/typescript.svg' },
      { name: 'Tailwind CSS', category: 'Styling', logo: '/tech/tailwind.svg' },
      { name: 'Vercel', category: 'Hosting', logo: '/tech/vercel.svg' },
      { name: 'Sanity CMS', category: 'Content', logo: '/tech/sanity.svg' },
      { name: 'Google Analytics', category: 'Analytics', logo: '/tech/analytics.svg' }
    ],
    packages: [
      {
        name: 'Starter',
        price: '$15,000 - $30,000',
        duration: '6-8 weeks',
        description: 'Perfect for small to medium businesses looking for a professional web presence',
        features: [
          'Up to 10 custom pages',
          'Mobile-responsive design',
          'Basic SEO optimization',
          'Contact forms & integrations',
          'CMS setup & training',
          '30-day support period'
        ]
      },
      {
        name: 'Standard',
        price: '$30,000 - $60,000',
        duration: '8-12 weeks',
        description: 'Comprehensive solution for growing businesses with advanced requirements',
        features: [
          'Up to 25 custom pages',
          'Advanced UI/UX design',
          'E-commerce capabilities',
          'Third-party integrations',
          'Performance optimization',
          'Multi-language support',
          '60-day support period'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom Quote',
        duration: '12+ weeks',
        description: 'Tailored solutions for large organizations with complex requirements',
        features: [
          'Unlimited pages',
          'Custom functionality',
          'Enterprise integrations',
          'Advanced security',
          'Dedicated project team',
          'Ongoing maintenance options',
          'Priority support'
        ]
      }
    ],
    beforeAfter: {
      title: 'Real Results from Recent Projects',
      cases: [
        {
          client: 'TechCorp Industries',
          before: {
            metric: 'Conversion Rate',
            value: '1.2%',
            issue: 'Outdated design, poor mobile UX'
          },
          after: {
            metric: 'Conversion Rate',
            value: '4.8%',
            improvement: '+300%'
          },
          image: '/case-studies/techcorp-before-after.jpg'
        },
        {
          client: 'Manufacturing Plus',
          before: {
            metric: 'Page Load Time',
            value: '6.2s',
            issue: 'Unoptimized images, legacy code'
          },
          after: {
            metric: 'Page Load Time',
            value: '1.1s',
            improvement: '82% faster'
          },
          image: '/case-studies/mfg-performance.jpg'
        }
      ]
    },
    testimonials: [
      {
        quote: "CHIRO는 우리의 온라인 존재감을 완전히 변화시켰습니다. 런칭 첫 달 만에 리드 생성이 300% 증가했습니다.",
        author: "김서연",
        position: "마케팅 디렉터",
        company: "테크코프 인더스트리",
        avatar: "/testimonials/sarah-chen.jpg"
      }
    ]
  },
  'ui-ux-design': {
    problemSolution: {
      problems: [
        '혼란스러운 네비게이션과 열악한 사용자 경험으로 인한 높은 이탈률',
        '필요한 정보를 빠르게 찾지 못하는 방문자로 인한 낮은 전환율',
        '다양한 페이지와 터치포인트에서의 일관성 없는 브랜드 표현',
        '접근성 문제로 인한 잠재 고객 배제 및 법적 위험'
      ],
      solutions: [
        '사용자 연구 기반 인터페이스 디자인으로 자연스러운 전환 유도',
        '명확한 CTA와 직관적인 네비게이션으로 간소화된 사용자 여정',
        '브랜드 가치와 전문적인 이미지를 반영하는 일관된 디자인 시스템',
        'WCAG 2.1 AA 준수로 모든 사용자를 위한 접근성 보장'
      ]
    }
  },
  'performance-optimization': {
    problemSolution: {
      problems: [
        '3초 이상의 웹사이트 로딩 시간으로 40% 이상 방문자 이탈',
        'Google 검색 순위에 영향을 주는 낮은 Core Web Vitals 점수',
        '느린 성능으로 인한 모바일 기기의 높은 이탈률',
        '큰 번들 크기와 최적화되지 않은 자산으로 과도한 대역폭 소비'
      ],
      solutions: [
        '고급 최적화 기술로 1초 미만 로딩 시간 달성',
        '90점 이상의 Core Web Vitals 점수로 탁월한 SEO 성능 보장',
        '완벽한 모바일 경험을 위한 점진적 로딩 및 최적화',
        '포괄적인 자산 최적화로 대역폭 사용량 70% 이상 감소'
      ]
    },
    beforeAfter: {
      title: '성능 개선 결과',
      cases: [
        {
          client: '이커머스 플랫폼',
          before: {
            metric: 'Lighthouse 점수',
            value: '34/100',
            issue: '최적화되지 않은 이미지, 차단 리소스'
          },
          after: {
            metric: 'Lighthouse 점수', 
            value: '96/100',
            improvement: '+182%'
          }
        },
        {
          client: 'SaaS 대시보드',
          before: {
            metric: '처음 콘텐츠 페인트',
            value: '4.2초',
            issue: '큰 JavaScript 번들'
          },
          after: {
            metric: '처음 콘텐츠 페인트',
            value: '0.8초',
            improvement: '81% 빨라짐'
          }
        }
      ]
    }
  },
  'digital-marketing': {
    problemSolution: {
      problems: [
        '검색 결과 첫 페이지에 나타나지 않아 놓치는 잠재 고객',
        '경쟁사 대비 낮은 온라인 가시성과 브랜드 인지도',
        '체계적인 SEO 전략 부재로 인한 무작위 트래픽',
        '측정 가능한 ROI 없이 낭비되는 마케팅 예산'
      ],
      solutions: [
        '타겟 키워드 1페이지 랭킹을 위한 검증된 SEO 전략',
        '경쟁사 분석을 통한 차별화된 포지셔닝',
        '데이터 기반 콘텐츠 마케팅으로 질적 트래픽 확보',
        '투명한 성과 추적과 ROI 최적화'
      ]
    },
    deliverables: [
      { item: 'SEO 현황 진단 및 경쟁사 분석', included: true },
      { item: '키워드 리서치 및 전략 수립', included: true },
      { item: '온페이지 SEO 최적화', included: true },
      { item: '기술적 SEO 개선', included: true },
      { item: '콘텐츠 마케팅 전략 및 실행', included: true },
      { item: '백링크 구축 및 관리', included: true },
      { item: '로컬 SEO 최적화', included: true },
      { item: '월간 성과 리포트 및 컨설팅', included: true },
      { item: '전환율 최적화 (CRO)', included: true },
      { item: '유료 광고 캠페인 관리', included: false, note: 'Premium 패키지에서 이용 가능' }
    ],
    packages: [
      {
        name: '베이직',
        price: '월 150만원',
        duration: '최소 6개월 계약',
        description: '기본적인 SEO 최적화를 원하는 소규모 비즈니스',
        features: [
          '월 10개 타겟 키워드',
          '온페이지 SEO 최적화',
          '기술적 SEO 점검',
          '월 2회 콘텐츠 제작',
          '기본 성과 리포트',
          '이메일 지원'
        ]
      },
      {
        name: '프로페셔널',
        price: '월 350만원',
        duration: '최소 6개월 계약',
        description: '본격적인 온라인 성장을 원하는 중견 기업',
        features: [
          '월 30개 타겟 키워드',
          '고급 SEO 최적화',
          '경쟁사 모니터링',
          '월 8회 콘텐츠 제작',
          '백링크 구축',
          '상세 성과 분석',
          '주간 컨설팅 콜'
        ],
        popular: true
      },
      {
        name: '엔터프라이즈',
        price: '맞춤 견적',
        duration: '연간 계약',
        description: '종합적인 디지털 마케팅이 필요한 대기업',
        features: [
          '무제한 키워드',
          '전담 SEO 팀 배정',
          '맞춤형 콘텐츠 전략',
          '다국어 SEO',
          'PPC 광고 관리',
          '전환율 최적화',
          '24/7 지원'
        ]
      }
    ],
    beforeAfter: {
      title: 'SEO 성과 사례',
      cases: [
        {
          client: '이커머스 쇼핑몰',
          before: {
            metric: '월 유기적 트래픽',
            value: '2,100명',
            issue: '낮은 검색 순위, 최적화 부재'
          },
          after: {
            metric: '월 유기적 트래픽',
            value: '18,500명',
            improvement: '+780%'
          }
        },
        {
          client: 'B2B 소프트웨어',
          before: {
            metric: '리드 생성',
            value: '월 12건',
            issue: '타겟팅 실패, 낮은 가시성'
          },
          after: {
            metric: '리드 생성',
            value: '월 89건',
            improvement: '+641%'
          }
        }
      ]
    },
    testimonials: [
      {
        quote: "CHIRO의 SEO 전략 덕분에 6개월 만에 매출이 3배 증가했습니다. 검색 1페이지 랭킹은 물론, 실제 구매로 이어지는 트래픽을 확보했습니다.",
        author: "박준영",
        position: "대표이사",
        company: "테크스타트업",
        avatar: "/testimonials/park-jun.jpg"
      }
    ]
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData.find(s => s.id === slug)
  
  if (!service) {
    return {
      title: 'Service Not Found - CHIRO'
    }
  }

  return {
    title: `${service.title} | CHIRO - Professional Digital Services`,
    description: service.description,
    openGraph: {
      title: `${service.title} | CHIRO`,
      description: service.description,
      images: [`/og-service-${service.id}.png`],
    }
  }
}

export async function generateStaticParams() {
  return servicesData.map(service => ({
    slug: service.id
  }))
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = servicesData.find(s => s.id === slug)
  const extensions = serviceExtensions[slug] || {}

  if (!service) {
    notFound()
  }

  return (
    <main className="pt-18">
      {/* Hero Section */}
      <section className="relative section-padding bg-dark overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeLeft>
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/services" 
                    className="text-neutral-light/60 hover:text-primary transition-colors flex items-center text-sm"
                  >
                    서비스
                  </Link>
                  <span className="text-primary font-medium text-sm">{service.title}</span>
                </div>
                
                <h1 className="font-pretendard font-bold text-white leading-tight">
                  {service.shortBenefit}
                </h1>
                
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  {service.description}
                </p>

                {/* Mini Case Preview */}
                {service.miniCase && (
                  <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-accent-green" />
                        <span className="text-white font-medium">성공 사례</span>
                      </div>
                      <span className="text-accent-green font-bold text-lg">{service.miniCase.result}</span>
                    </div>
                    <p className="text-neutral-light/80 leading-relaxed">
                      <strong>{service.miniCase.client}:</strong> {service.miniCase.description}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary group">
                    프로젝트 시작하기
                  </button>
                  <button className="btn-secondary group">
                    사례 연구 보기
                    <Play className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </FadeLeft>

            <FadeRight>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-2xl flex items-center justify-center border border-primary/20">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                      <Code className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-neutral-light/60 text-sm">
                      전/후 비교 비디오
                    </p>
                  </div>
                </div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Problem → Solution Framework */}
      {extensions.problemSolution && (
        <section className="section-padding bg-shadow-gray/10">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Problems */}
              <FadeLeft>
                <div className="space-y-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-pretendard font-bold text-white">
                      일반적인 <span className="text-red-400">문제점</span>
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {extensions.problemSolution.problems.map((problem: string, index: number) => (
                      <div key={index} className="flex space-x-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                        <p className="text-neutral-light/80 leading-relaxed">{problem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeLeft>

              {/* Solutions */}
              <FadeRight>
                <div className="space-y-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-pretendard font-bold text-white">
                      우리의 <span className="text-gradient">솔루션</span>
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {extensions.problemSolution.solutions.map((solution: string, index: number) => (
                      <div key={index} className="flex space-x-4 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-5 h-5 text-accent-green" />
                        </div>
                        <p className="text-neutral-light/80 leading-relaxed">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeRight>
            </div>
          </div>
        </section>
      )}

      {/* Deliverables Checklist */}
      {extensions.deliverables && (
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <div className="text-center mb-16">
              <FadeUp>
                <h2 className="font-pretendard font-bold mb-6">
                  전체 <span className="text-gradient">산출물</span>
                </h2>
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  {service.title} 프로젝트에 포함된 모든 것
                </p>
              </FadeUp>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {extensions.deliverables.map((deliverable: any, index: number) => (
                  <FadeUp key={index} delay={index * 50}>
                    <div className={`p-6 rounded-xl border transition-all duration-300 ${
                      deliverable.included 
                        ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' 
                        : 'bg-shadow-gray/20 border-shadow-gray/30 hover:bg-shadow-gray/30'
                    }`}>
                      <div className="flex items-start space-x-4">
                        {deliverable.included ? (
                          <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0 mt-1" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-shadow-gray/50 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-2 ${
                            deliverable.included ? 'text-white' : 'text-neutral-light/60'
                          }`}>
                            {deliverable.item}
                          </h3>
                          {deliverable.note && (
                            <p className="text-sm text-neutral-light/50">{deliverable.note}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technology Stack */}
      {extensions.techStack && (
        <section className="section-padding bg-shadow-gray/10">
          <div className="container-custom">
            <div className="text-center mb-16">
              <FadeUp>
                <h2 className="font-pretendard font-bold mb-6">
                  기술 <span className="text-gradient">스택</span>
                </h2>
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  최적의 성능과 확장성을 위한 최첨단 도구와 프레임워크
                </p>
              </FadeUp>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {extensions.techStack.map((tech: any, index: number) => (
                <FadeUp key={index} delay={index * 100}>
                  <div className="text-center p-6 rounded-xl bg-dark border border-shadow-gray/30 hover:border-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1">{tech.name}</h3>
                    <p className="text-neutral-light/60 text-xs">{tech.category}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Before/After Results */}
      {extensions.beforeAfter && (
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <div className="text-center mb-16">
              <FadeUp>
                <h2 className="font-pretendard font-bold mb-6">
                  {extensions.beforeAfter.title}
                </h2>
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  핵심 성과 지표의 측정 가능한 개선
                </p>
              </FadeUp>
            </div>

            <div className="space-y-12">
              {extensions.beforeAfter.cases.map((caseStudy: any, index: number) => (
                <FadeUp key={index} delay={index * 200}>
                  <div className="bg-shadow-gray/20 rounded-2xl p-8 border border-shadow-gray/30">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      {/* Before */}
                      <div className="text-center p-6 bg-red-500/10 rounded-xl border border-red-500/20">
                        <h4 className="text-lg font-semibold text-white mb-3">개선 전</h4>
                        <div className="text-3xl font-bold text-red-400 mb-2">{caseStudy.before.value}</div>
                        <p className="text-red-300 font-medium mb-3">{caseStudy.before.metric}</p>
                        <p className="text-sm text-neutral-light/60">{caseStudy.before.issue}</p>
                      </div>

                      {/* Arrow & Client */}
                      <div className="text-center">
                        <ArrowRight className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">{caseStudy.client}</h3>
                        <div className="text-accent-green font-bold text-xl">{caseStudy.after.improvement}</div>
                      </div>

                      {/* After */}
                      <div className="text-center p-6 bg-accent-green/10 rounded-xl border border-accent-green/20">
                        <h4 className="text-lg font-semibold text-white mb-3">개선 후</h4>
                        <div className="text-3xl font-bold text-accent-green mb-2">{caseStudy.after.value}</div>
                        <p className="text-accent-green font-medium mb-3">{caseStudy.after.metric}</p>
                        <div className="flex items-center justify-center">
                          <Star className="w-4 h-4 text-accent-green mr-2" />
                          <span className="text-sm text-neutral-light/80">최적화된 결과</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Client Testimonial */}
      {extensions.testimonials && (
        <section className="section-padding bg-primary/5">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {extensions.testimonials.map((testimonial: any, index: number) => (
                <FadeUp key={index}>
                  <div className="text-center space-y-8">
                    <div className="flex justify-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-accent-green fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-2xl text-white leading-relaxed font-light italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold">{testimonial.author}</p>
                        <p className="text-neutral-light/60 text-sm">{testimonial.position}</p>
                        <p className="text-primary text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-pretendard font-bold mb-6">
                관련 <span className="text-gradient">서비스</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                {service.title} 프로젝트를 보완하는 다른 서비스를 탐색하세요
              </p>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map((relatedService, index) => (
                <FadeUp key={relatedService.id} delay={index * 100}>
                  <Link href={`/services/${relatedService.id}`}>
                    <div className="group p-6 rounded-xl border border-shadow-gray/30 hover:border-primary/30 bg-shadow-gray/20 hover:bg-primary/5 transition-all duration-300 h-full">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                          {relatedService.title}
                        </h3>
                        <p className="text-primary font-medium text-sm">
                          {relatedService.shortBenefit}
                        </p>
                        <p className="text-neutral-light/70 text-sm leading-relaxed">
                          {relatedService.description.slice(0, 120)}...
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:text-accent-green transition-colors">
                          자세히 보기
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-dark to-accent-green/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeUp>
              <div className="space-y-8">
                <h2 className="font-pretendard font-bold text-white leading-tight">
                  준비 되셨나요?
                  <span className="text-gradient block">{service.title} Project?</span>
                </h2>
                
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  검증된 {service.title} 전문성으로 비즈니스 목표를 
                  달성할 수 있도록 도와드리겠습니다.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary group">
                    프로젝트 시작하기
                  </button>
                  <Link href="/contact" className="btn-secondary group">
                    상담 예약하기 <Clock className="ml-2 h-4 w-4" />
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
    </main>
  )
}