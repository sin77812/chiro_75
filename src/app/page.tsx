import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Core sections loaded immediately
import StorytellingHero from '@/components/sections/StorytellingHero'
import LogoStrip from '@/components/sections/LogoStrip'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import ServicesOverview from '@/components/sections/ServicesOverview'

// Below-the-fold sections loaded dynamically
const TrustMetrics = dynamic(() => import('@/components/sections/TrustMetrics'), {
  loading: () => <div className="min-h-96 animate-pulse bg-shadow-gray/10" />
})

const WhyStartupsChoose = dynamic(() => import('@/components/sections/WhyStartupsChoose'), {
  loading: () => <div className="min-h-96 animate-pulse bg-shadow-gray/10" />
})

const PricingTransparency = dynamic(() => import('@/components/sections/PricingTransparency'), {
  loading: () => <div className="min-h-96 animate-pulse bg-shadow-gray/10" />
})

const ProcessFlow = dynamic(() => import('@/components/sections/ProcessFlow'), {
  loading: () => <div className="min-h-96 animate-pulse bg-shadow-gray/10" />
})

const TechStack = dynamic(() => import('@/components/sections/TechStack'), {
  loading: () => <div className="min-h-96 animate-pulse bg-shadow-gray/10" />
})

const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA'), {
  loading: () => <div className="min-h-64 animate-pulse bg-shadow-gray/10" />
})

export const metadata: Metadata = {
  title: 'CHIRO - 프리미엄 디지털 에이전시',
  description: '국내 최고 수준의 웹 개발과 디지털 전략으로 비즈니스 성장을 가속화하세요.',
  keywords: ['웹개발', '디지털에이전시', 'UX디자인', '성능최적화', '브랜딩'],
  openGraph: {
    title: 'CHIRO - 프리미엄 디지털 에이전시',
    description: '국내 최고 수준의 웹 개발과 디지털 전략으로 비즈니스 성장을 가속화하세요.',
    type: 'website',
    url: 'https://chiro.agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CHIRO Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHIRO - 프리미엄 디지털 에이전시',
    description: '국내 최고 수준의 웹 개발과 디지털 전략으로 비즈니스 성장을 가속화하세요.',
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" href="/image/backgroundvod.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/images/hero-poster.jpg" as="image" type="image/jpeg" />
      
      <main className="overflow-x-hidden">
        {/* 1. Storytelling Hero - 7 Scene Interactive Journey */}
        <StorytellingHero />
        
        {/* 2. Trust Indicators - Logo strip with parallax */}
        <LogoStrip />
        
        {/* 3. Services Overview - Image-based service cards */}
        <ServicesOverview />
        
        {/* 4. Portfolio Teaser - Visual-first project showcase */}
        <PortfolioShowcase />
        
        {/* 5. Trust & KPI Metrics - Data visualization */}
        <TrustMetrics />
        
        {/* 6. Why Startups Choose - Startup focused reasons */}
        <WhyStartupsChoose />
        
        {/* 7. Pricing Transparency - Clear pricing */}
        <PricingTransparency />
        
        {/* 8. Process Flow - 5-step visual journey */}
        <ProcessFlow />
        
        {/* 9. Tech Stack - Technology showcase */}
        <TechStack />
        
        {/* 10. Final CTA - Dark gradient with strong call to action */}
        <FinalCTA />
      </main>
    </>
  )
}