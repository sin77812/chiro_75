import React from 'react'
import { Metadata } from 'next'
import { Play, ArrowRight, CheckCircle, TrendingUp, Shield, Zap, Users, Globe, Code, Palette, Search } from 'lucide-react'
import Link from 'next/link'
import servicesData from '@/data/services.json'
import ScrollReveal, { FadeUp, FadeLeft, FadeRight } from '@/components/ui/ScrollReveal'
import PageCTA from '@/components/sections/PageCTA'
import { SkipNav, AccessibleButton, AccessibleLink, AccordionItem, ScreenReaderText } from '@/components/ui/AccessibleComponents'
import { LazyImage, OptimizedVideo, LazyContent, usePerformanceMonitoring, ResourceHints, Preload } from '@/components/ui/PerformanceComponents'
import { OrganizationStructuredData, ServicesPageStructuredData, FAQStructuredData, WebPageStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { ServiceAnalytics, EcommerceTracking } from '@/components/analytics/Analytics'

export const metadata: Metadata = {
  title: 'Services | CHIRO - Enterprise Digital Solutions',
  description: 'Transform your business with AI-powered web development, UX/UI design, and digital strategy. Proven results for B2B companies.',
  openGraph: {
    title: 'Services | CHIRO - Enterprise Digital Solutions',
    description: 'Transform your business with AI-powered web development, UX/UI design, and digital strategy.',
    images: ['/og-services.png'],
  }
}

// Service category icons mapping
const categoryIcons = {
  'web-development': Code,
  'ui-ux-design': Palette,
  'performance-optimization': Zap,
  'digital-marketing': TrendingUp,
  'maintenance-support': Shield,
  'global-expansion': Globe,
  'ai-development': Search,
  'ecommerce': TrendingUp,
  'design-systems': Palette,
  'seo': Search,
  'operations': Users,
  'motion-3d': Play
}

// Business impact KPIs
const businessKPIs = [
  { label: 'Average Conversion Rate Increase', value: '+147%', context: 'Across 50+ B2B clients' },
  { label: 'Page Load Time Improvement', value: '1.8s → 0.9s', context: 'Core Web Vitals optimization' },
  { label: 'Search Traffic Growth', value: '+280%', context: 'SEO & technical optimization' },
  { label: 'Mobile User Engagement', value: '+195%', context: 'Responsive design excellence' }
]

// 5-step process
const processSteps = [
  {
    step: '01',
    title: 'Discover',
    description: 'Business audit, competitor analysis, user research',
    duration: '1-2 weeks',
    deliverables: ['Market Analysis Report', 'User Journey Maps', 'Technical Audit']
  },
  {
    step: '02',
    title: 'Define',
    description: 'Strategy development, technical architecture, content planning',
    duration: '1 week',
    deliverables: ['Project Strategy', 'Technical Specification', 'Content Framework']
  },
  {
    step: '03',
    title: 'Design',
    description: 'UI/UX design, prototyping, design system creation',
    duration: '2-3 weeks',
    deliverables: ['Design System', 'High-fidelity Mockups', 'Interactive Prototype']
  },
  {
    step: '04',
    title: 'Build',
    description: 'Development, testing, optimization, quality assurance',
    duration: '3-6 weeks',
    deliverables: ['Production Website', 'Testing Reports', 'Performance Optimization']
  },
  {
    step: '05',
    title: 'Optimize',
    description: 'Launch support, analytics setup, continuous improvement',
    duration: 'Ongoing',
    deliverables: ['Analytics Dashboard', 'Performance Reports', 'Improvement Roadmap']
  }
]

// Differentiation points
const differentiationPoints = [
  {
    icon: Search,
    title: 'AI-Powered Workflow',
    description: 'Claude Code integration for 40% faster development with higher code quality'
  },
  {
    icon: Shield,
    title: 'WCAG 2.1 AA Compliance',
    description: 'Built-in accessibility ensuring inclusive user experiences and legal compliance'
  },
  {
    icon: Zap,
    title: 'Core Web Vitals Excellence',
    description: 'Guaranteed 90+ Lighthouse scores for superior user experience and SEO'
  },
  {
    icon: Users,
    title: 'Comprehensive Documentation',
    description: 'Detailed technical docs and training for seamless team handover'
  }
]

// FAQ data
const faqData = [
  {
    question: 'What is the typical project timeline?',
    answer: 'Most projects range from 6-12 weeks depending on scope. We provide detailed timelines during the Define phase with clear milestones and deliverables.'
  },
  {
    question: 'How do you price your services?',
    answer: 'We offer flexible pricing based on project scope: Starter ($15K-30K), Standard ($30K-60K), and Enterprise ($60K+). Contact us for a detailed quote.'
  },
  {
    question: 'Do you provide ongoing maintenance?',
    answer: 'Yes, we offer comprehensive maintenance packages including 24/7 monitoring, security updates, performance optimization, and content management support.'
  },
  {
    question: 'Can you work with our existing team?',
    answer: 'Absolutely. We integrate seamlessly with in-house teams, providing documentation, training, and collaborative workflows using your preferred tools.'
  },
  {
    question: 'What makes CHIRO different from other agencies?',
    answer: 'Our AI-powered development workflow, focus on accessibility compliance, guaranteed performance metrics, and comprehensive documentation set us apart in delivering enterprise-grade solutions.'
  }
]

export default function ServicesPage() {
  // Performance monitoring hook
  usePerformanceMonitoring('services-page')

  // Track page view and service list view
  React.useEffect(() => {
    ServiceAnalytics.viewService('services-overview', 'Services Overview Page')
    EcommerceTracking.viewItemList(
      servicesData.map(service => ({
        id: service.id,
        name: service.title,
        category: 'Service'
      }))
    )
  }, [])

  return (
    <>
      {/* Structured Data */}
      <OrganizationStructuredData />
      <ServicesPageStructuredData />
      <WebPageStructuredData
        title="Services | CHIRO - Enterprise Digital Solutions"
        description="Transform your business with AI-powered web development, UX/UI design, and digital strategy. Proven results for B2B companies."
        url="https://chiro.agency/services"
        breadcrumbs={[
          { name: 'Home', item: 'https://chiro.agency' },
          { name: 'Services' }
        ]}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', item: 'https://chiro.agency' },
          { name: 'Services' }
        ]}
      />
      <FAQStructuredData faqs={faqData} />

      {/* Resource optimization */}
      <ResourceHints 
        preconnect={['https://fonts.googleapis.com', 'https://cdn.sanity.io']}
        prefetch={['/portfolio', '/contact']}
        dnsPrefetch={['https://www.google-analytics.com']}
      />
      <Preload href="/videos/hero/services-demo.mp4" as="video" type="video/mp4" />
      
      <SkipNav />
      <main id="main-content" className="pt-18" role="main">
        {/* Hero Section */}
        <section className="relative section-padding bg-dark overflow-hidden" aria-label="Services overview">
          <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <FadeLeft>
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  ENTERPRISE SERVICES
                </div>
                
                <h1 className="font-pretendard font-bold text-white leading-tight">
                  Transform Your Business with 
                  <span className="text-gradient block">AI-Powered Digital Solutions</span>
                </h1>
                
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  From wireframes to production-ready platforms. We deliver enterprise-grade 
                  web solutions that drive measurable business results through cutting-edge 
                  technology and strategic design thinking.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <AccessibleButton 
                    variant="primary"
                    aria-label="Get custom consultation for your project"
                    onClick={() => {
                      ServiceAnalytics.clickServiceCTA('services-overview', 'primary', 'Get Custom Consultation')
                      EcommerceTracking.addToCart('consultation', 'Custom Consultation')
                    }}
                  >
                    Get Custom Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </AccessibleButton>
                  <AccessibleLink 
                    href="/portfolio" 
                    className="btn-secondary group inline-flex items-center"
                    aria-label="View our portfolio case studies"
                    onClick={() => {
                      ServiceAnalytics.clickServiceCTA('services-overview', 'secondary', 'View Case Studies')
                    }}
                  >
                    View Case Studies
                    <Play className="ml-2 h-4 w-4" aria-hidden="true" />
                  </AccessibleLink>
                </div>
              </div>
            </FadeLeft>
            
            {/* Hero Video */}
            <FadeRight>
              <div className="relative">
                <OptimizedVideo
                  src={{
                    mp4: "/videos/hero/services-demo.mp4",
                    webm: "/videos/hero/services-demo.webm",
                    poster: "/images/hero/services-poster.jpg"
                  }}
                  className="aspect-video rounded-2xl border border-primary/20"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  controls={false}
                  preload="metadata"
                  lazy={false}
                  placeholder={
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-2xl flex items-center justify-center border border-primary/20">
                      <div className="text-center space-y-4">
                        <Play className="w-16 h-16 text-primary mx-auto opacity-60" aria-hidden="true" />
                        <p className="text-neutral-light/60 text-sm">
                          Loading demo: Wireframe → Hi-fi UI transformation
                        </p>
                      </div>
                    </div>
                  }
                  aria-label="Demonstration video showing wireframe to high-fidelity UI transformation process"
                  onLoad={() => {
                    ServiceAnalytics.playVideo('hero-services-demo', 'Services Hero Demo - Wireframe to UI Transformation')
                  }}
                />
                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent-green/10 rounded-full blur-2xl" aria-hidden="true" />
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section-padding bg-dark" aria-label="Our service offerings">
        <div className="container-custom">
          <header className="text-center mb-16">
            <FadeUp>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                OUR EXPERTISE
              </div>
              <h2 className="font-pretendard font-bold mb-6">
                Complete Digital <span className="text-gradient">Transformation Suite</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
                From AI-powered development to performance optimization – we handle every aspect 
                of your digital presence with enterprise-grade quality.
              </p>
            </FadeUp>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {servicesData.map((service, index) => {
              const IconComponent = categoryIcons[service.id as keyof typeof categoryIcons] || Code
              
              return (
                <FadeUp key={service.id} delay={index * 100}>
                  <article role="listitem">
                    <AccessibleLink
                      href={`/services/${service.id}`}
                      className="group block p-8 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 bg-shadow-gray/20 hover:bg-primary/5 focus:bg-primary/5 transition-all duration-300 h-full card-interactive"
                      aria-label={`Learn more about ${service.title}: ${service.shortBenefit}`}
                      showExternalIcon={false}
                      onClick={() => {
                        ServiceAnalytics.viewService(service.id, service.title)
                        EcommerceTracking.addToCart(service.id, service.title)
                      }}
                    >
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary group-focus:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-focus:scale-110">
                          <IconComponent 
                            className="h-6 w-6 text-primary group-hover:text-white group-focus:text-white transition-colors" 
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-pretendard font-semibold text-white group-hover:text-primary group-focus:text-primary transition-colors">
                          {service.title}
                        </h3>
                        
                        <p className="text-primary font-medium">
                          {service.shortBenefit}
                        </p>

                        <p className="text-neutral-light/70 leading-relaxed text-sm">
                          {service.description}
                        </p>

                        {/* Mini Case Study */}
                        {service.miniCase && (
                          <aside className="bg-shadow-gray/30 rounded-lg p-4 border border-shadow-gray/20" aria-label="Case study example">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-neutral-light/60">{service.miniCase.client}</span>
                              <span className="text-accent-green font-bold text-sm" aria-label={`Result: ${service.miniCase.result}`}>
                                {service.miniCase.result}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-light/70 leading-relaxed">
                              {service.miniCase.description}
                            </p>
                          </aside>
                        )}

                        <div className="pt-4 border-t border-shadow-gray/30">
                          <span className="inline-flex items-center text-primary font-medium group-hover:text-accent-green group-focus:text-accent-green transition-colors">
                            Learn More
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-focus:translate-x-1 transition-transform" aria-hidden="true" />
                            <ScreenReaderText>about {service.title}</ScreenReaderText>
                          </span>
                        </div>
                      </div>
                    </AccessibleLink>
                  </article>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Business Impact KPIs */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="font-pretendard font-bold mb-6">
                Proven <span className="text-gradient">Business Impact</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                Measurable results across 50+ enterprise clients
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessKPIs.map((kpi, index) => (
              <FadeUp key={index} delay={index * 100}>
                <div className="text-center p-6 rounded-xl bg-dark border border-shadow-gray/30">
                  <div className="text-3xl font-bold text-primary mb-2">{kpi.value}</div>
                  <div className="text-white font-medium mb-2">{kpi.label}</div>
                  <div className="text-sm text-neutral-light/60">{kpi.context}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeUp>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                OUR PROCESS
              </div>
              <h2 className="font-pretendard font-bold mb-6">
                Strategic <span className="text-gradient">Development Methodology</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
                Our proven 5-stage process ensures every project delivers maximum business value 
                with complete transparency and predictable outcomes.
              </p>
            </FadeUp>
          </div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent-green to-primary" />
            
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <FadeUp key={index} delay={index * 150}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16 gap-8`}>
                    {/* Content */}
                    <div className="lg:w-1/2">
                      <div className={`p-8 rounded-2xl border border-primary/20 bg-primary/5 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            {step.step}
                          </div>
                          <div>
                            <h3 className="text-2xl font-pretendard font-bold text-white">{step.title}</h3>
                            <p className="text-primary font-medium">{step.duration}</p>
                          </div>
                        </div>
                        
                        <p className="text-neutral-light/80 leading-relaxed mb-6">
                          {step.description}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-white font-medium text-sm mb-3">Key Deliverables:</p>
                          {step.deliverables.map((deliverable, idx) => (
                            <div key={idx} className="flex items-center text-sm text-neutral-light/70">
                              <CheckCircle className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                              {deliverable}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Process Visual */}
                    <div className="lg:w-1/2">
                      <div className={`aspect-video bg-gradient-to-br from-primary/10 to-accent-green/10 rounded-xl flex items-center justify-center border border-primary/20 ${index % 2 === 0 ? 'lg:ml-8' : 'lg:mr-8'}`}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary">{step.step}</span>
                          </div>
                          <p className="text-neutral-light/60 text-sm">Process Visualization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Points - Lazy loaded */}
      <LazyContent
        fallback={
          <div className="section-padding bg-shadow-gray/10">
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="h-16 bg-shadow-gray/20 rounded-lg animate-pulse mb-6 max-w-lg mx-auto" />
                <div className="h-6 bg-shadow-gray/20 rounded animate-pulse max-w-2xl mx-auto" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-6 rounded-xl bg-shadow-gray/20 animate-pulse">
                    <div className="w-14 h-14 bg-shadow-gray/30 rounded-xl mx-auto mb-4" />
                    <div className="h-6 bg-shadow-gray/30 rounded mb-3" />
                    <div className="space-y-2">
                      <div className="h-4 bg-shadow-gray/30 rounded" />
                      <div className="h-4 bg-shadow-gray/30 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        threshold={0.2}
      >
        <section className="section-padding bg-shadow-gray/10">
          <div className="container-custom">
            <div className="text-center mb-16">
              <FadeUp>
                <h2 className="font-pretendard font-bold mb-6">
                  Why Choose <span className="text-gradient">CHIRO</span>
                </h2>
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  Advanced technology stack and methodologies that set us apart in the industry
                </p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiationPoints.map((point, index) => {
                const IconComponent = point.icon
                return (
                  <FadeUp key={index} delay={index * 100}>
                    <div className="text-center p-6 rounded-xl bg-dark border border-shadow-gray/30 hover:border-primary/30 transition-all duration-300">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-pretendard font-semibold text-white mb-3">
                        {point.title}
                      </h3>
                      <p className="text-sm text-neutral-light/70 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </FadeUp>
                )
              })}
            </div>
          </div>
        </section>
      </LazyContent>

      {/* FAQ Section */}
      <section className="section-padding bg-dark" aria-label="Frequently asked questions">
        <div className="container-custom">
          <header className="text-center mb-16">
            <FadeUp>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
                FAQ
              </div>
              <h2 className="font-pretendard font-bold mb-6">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </FadeUp>
          </header>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <FadeUp key={index} delay={index * 100}>
                <div
                  onClick={() => {
                    ServiceAnalytics.expandFAQ(faq.question, index)
                  }}
                >
                  <AccordionItem
                    id={`faq-${index}`}
                    title={faq.question}
                    defaultOpen={index === 0}
                  >
                    <p className="text-neutral-light/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionItem>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Strong Conversion CTA */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-dark to-accent-green/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <FadeUp>
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary font-medium text-sm mb-4">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  READY TO TRANSFORM
                </div>
                
                <h2 className="font-pretendard font-bold text-white leading-tight">
                  Turn Your Digital Vision Into 
                  <span className="text-gradient block">Measurable Business Results</span>
                </h2>
                
                <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                  Join 50+ enterprise clients who've transformed their digital presence with 
                  CHIRO's proven methodology and cutting-edge technology.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {/* Quick Contact Form */}
                  <div className="p-6 rounded-xl bg-dark/50 border border-primary/20 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">Get Custom Quote</h3>
                    <form 
                      className="space-y-4" 
                      aria-label="Quick consultation request form"
                      onFocus={() => {
                        ServiceAnalytics.startForm('quote')
                      }}
                      onSubmit={(e) => {
                        e.preventDefault()
                        ServiceAnalytics.completeForm('quote', { 
                          page: 'services',
                          form_location: 'cta_section'
                        })
                        EcommerceTracking.purchase('consultation', 'Custom Consultation Quote', 'Quick Quote')
                      }}
                    >
                      <div>
                        <label htmlFor="contact-name" className="sr-only">Your Name</label>
                        <input 
                          id="contact-name"
                          type="text" 
                          placeholder="Your Name" 
                          className="input-field"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="sr-only">Business Email</label>
                        <input 
                          id="contact-email"
                          type="email" 
                          placeholder="Business Email" 
                          className="input-field"
                          required
                          aria-required="true"
                          aria-describedby="email-help"
                        />
                        <div id="email-help" className="sr-only">
                          We'll use this email to send your custom quote
                        </div>
                      </div>
                      <div>
                        <label htmlFor="budget-range" className="sr-only">Budget Range</label>
                        <select 
                          id="budget-range"
                          className="input-field"
                          required
                          aria-required="true"
                        >
                          <option value="">Select Budget Range</option>
                          <option value="15k-30k">$15K - $30K</option>
                          <option value="30k-60k">$30K - $60K</option>
                          <option value="60k+">$60K+</option>
                        </select>
                      </div>
                      <AccessibleButton type="submit" variant="primary" className="w-full">
                        Get Custom Consultation
                      </AccessibleButton>
                    </form>
                  </div>
                  
                  {/* Calendar Booking */}
                  <div className="p-6 rounded-xl bg-dark/50 border border-accent-green/20 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">Book Strategy Call</h3>
                    <div className="space-y-4">
                      <p className="text-neutral-light/70 text-sm">
                        30-minute consultation to discuss your project goals and requirements.
                      </p>
                      <div className="space-y-2 text-sm text-neutral-light/60">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent-green mr-2" />
                          Free project assessment
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent-green mr-2" />
                          Technology recommendations
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent-green mr-2" />
                          Timeline & budget estimate
                        </div>
                      </div>
                      <AccessibleButton 
                        className="w-full bg-accent-green hover:bg-accent-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-dark"
                        aria-label="Schedule a free 30-minute strategy consultation call"
                      >
                        Schedule Free Call
                      </AccessibleButton>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}