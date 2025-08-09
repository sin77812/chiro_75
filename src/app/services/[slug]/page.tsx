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
    deliverables: [
      { item: 'Custom Website Design & Development', included: true },
      { item: 'Mobile-First Responsive Implementation', included: true },
      { item: 'Content Management System Integration', included: true },
      { item: 'SEO Optimization & Technical Audit', included: true },
      { item: 'Performance Optimization (Core Web Vitals)', included: true },
      { item: 'Security Implementation & SSL Setup', included: true },
      { item: 'Analytics & Tracking Setup', included: true },
      { item: 'Documentation & Training Materials', included: true },
      { item: '30-Day Post-Launch Support', included: true },
      { item: 'Advanced E-commerce Integration', included: false, note: 'Available in Standard+ packages' }
    ],
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
        quote: "CHIRO transformed our online presence completely. Our lead generation increased by 300% within the first month of launch.",
        author: "Sarah Chen",
        position: "Marketing Director",
        company: "TechCorp Industries",
        avatar: "/testimonials/sarah-chen.jpg"
      }
    ]
  },
  'ui-ux-design': {
    problemSolution: {
      problems: [
        'High bounce rate due to confusing navigation and poor user experience',
        'Low conversion rates from visitors who can\'t find what they need quickly',
        'Inconsistent brand presentation across different pages and touchpoints',
        'Accessibility issues excluding potential customers and creating legal risks'
      ],
      solutions: [
        'User research-driven interface design that guides visitors naturally toward conversion',
        'Streamlined user journeys with clear calls-to-action and intuitive navigation',
        'Consistent design system reflecting your brand values and professional image',
        'WCAG 2.1 AA compliant designs ensuring accessibility for all users'
      ]
    },
    deliverables: [
      { item: 'User Research & Persona Development', included: true },
      { item: 'Information Architecture & User Journey Maps', included: true },
      { item: 'Wireframes & Interactive Prototypes', included: true },
      { item: 'High-Fidelity Visual Design', included: true },
      { item: 'Design System & Component Library', included: true },
      { item: 'Responsive Design for All Devices', included: true },
      { item: 'Accessibility Compliance (WCAG 2.1 AA)', included: true },
      { item: 'Usability Testing & Iteration', included: true },
      { item: 'Design Handoff & Developer Documentation', included: true },
      { item: 'Motion Design & Micro-interactions', included: false, note: 'Available as add-on' }
    ]
  },
  'performance-optimization': {
    problemSolution: {
      problems: [
        'Website loading times over 3 seconds causing 40%+ visitor abandonment',
        'Poor Core Web Vitals scores affecting Google search rankings',
        'High bounce rates on mobile devices due to slow performance',
        'Large bundle sizes and unoptimized assets consuming excessive bandwidth'
      ],
      solutions: [
        'Advanced optimization techniques achieving sub-1-second load times',
        'Core Web Vitals scores of 90+ ensuring excellent SEO performance',
        'Progressive loading and optimization for flawless mobile experience',
        'Comprehensive asset optimization reducing bandwidth usage by 70%+'
      ]
    },
    beforeAfter: {
      title: 'Performance Transformation Results',
      cases: [
        {
          client: 'E-commerce Platform',
          before: {
            metric: 'Lighthouse Score',
            value: '34/100',
            issue: 'Unoptimized images, blocking resources'
          },
          after: {
            metric: 'Lighthouse Score', 
            value: '96/100',
            improvement: '+182%'
          }
        },
        {
          client: 'SaaS Dashboard',
          before: {
            metric: 'First Contentful Paint',
            value: '4.2s',
            issue: 'Large JavaScript bundles'
          },
          after: {
            metric: 'First Contentful Paint',
            value: '0.8s',
            improvement: '81% faster'
          }
        }
      ]
    }
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
                    Services <ArrowRight className="w-4 h-4 ml-1 mr-2" />
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
                        <span className="text-white font-medium">Success Story</span>
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
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="btn-secondary group">
                    View Case Study
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
                      Before/After Comparison Video
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
                      Common <span className="text-red-400">Challenges</span>
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
                      Our <span className="text-gradient">Solutions</span>
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
                  Complete <span className="text-gradient">Deliverables</span>
                </h2>
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  Everything included in your {service.title.toLowerCase()} project
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
                  Technology <span className="text-gradient">Stack</span>
                </h2>
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  Cutting-edge tools and frameworks for optimal performance and scalability
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
                  Measurable improvements across key performance indicators
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
                        <h4 className="text-lg font-semibold text-white mb-3">Before</h4>
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
                        <h4 className="text-lg font-semibold text-white mb-3">After</h4>
                        <div className="text-3xl font-bold text-accent-green mb-2">{caseStudy.after.value}</div>
                        <p className="text-accent-green font-medium mb-3">{caseStudy.after.metric}</p>
                        <div className="flex items-center justify-center">
                          <Star className="w-4 h-4 text-accent-green mr-2" />
                          <span className="text-sm text-neutral-light/80">Optimized Result</span>
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

      {/* Pricing Packages */}
      {extensions.packages && (
        <section className="section-padding bg-gradient-to-b from-shadow-gray/5 to-dark">
          <div className="container-custom">
            <div className="text-center mb-16">
              <FadeUp>
                <h2 className="font-pretendard font-bold mb-6">
                  Flexible <span className="text-gradient">Packages</span>
                </h2>
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  Choose the package that best fits your project scope and budget
                </p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {extensions.packages.map((pkg: any, index: number) => (
                <FadeUp key={index} delay={index * 150}>
                  <div className={`relative p-8 rounded-2xl border transition-all duration-300 h-full ${
                    pkg.popular 
                      ? 'bg-primary/10 border-primary/30 scale-105 shadow-2xl' 
                      : 'bg-shadow-gray/20 border-shadow-gray/30 hover:border-primary/20'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-pretendard font-bold text-white mb-4">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                      <p className="text-neutral-light/60 text-sm mb-4">{pkg.duration}</p>
                      <p className="text-neutral-light/80 leading-relaxed">{pkg.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {pkg.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                          <span className="text-neutral-light/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20'
                    }`}>
                      {pkg.price === 'Custom Quote' ? 'Get Custom Quote' : 'Start Project'}
                    </button>
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
                Related <span className="text-gradient">Services</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                Explore other services that complement your {service.title.toLowerCase()} project
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
                          Learn More
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  Ready to Start Your
                  <span className="text-gradient block">{service.title} Project?</span>
                </h2>
                
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  Let's discuss how we can help you achieve your business goals with our 
                  proven {service.title.toLowerCase()} expertise.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary group">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link href="/contact" className="btn-secondary group">
                    Schedule Consultation
                    <Clock className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                {/* Key Benefits Quick List */}
                <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-shadow-gray/20">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-white font-medium mb-1">Fast Delivery</p>
                    <p className="text-neutral-light/60 text-sm">Project starts in 1 week</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-white font-medium mb-1">Guaranteed Quality</p>
                    <p className="text-neutral-light/60 text-sm">100% satisfaction promise</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-white font-medium mb-1">Expert Team</p>
                    <p className="text-neutral-light/60 text-sm">Senior-level specialists</p>
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