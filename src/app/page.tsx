import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Core sections loaded immediately
import CinematicHero from '@/components/sections/CinematicHero'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import ServicesOverview from '@/components/sections/ServicesOverview'

// Below-the-fold sections loaded dynamically
const TrustMetrics = dynamic(() => import('@/components/sections/TrustMetrics'), {
  loading: () => <div className="min-h-96 animate-pulse bg-shadow-gray/10" />
})

const ProcessFlow = dynamic(() => import('@/components/sections/ProcessFlow'), {
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
      <link rel="preload" href="/videos/hero-cinematic.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/images/hero-poster.jpg" as="image" type="image/jpeg" />
      
      <main className="overflow-x-hidden">
        {/* 1. Cinematic Hero - Fullscreen video background with minimal text */}
        <CinematicHero />
        
        {/* 2. Portfolio Teaser - Visual-first project showcase */}
        <PortfolioShowcase />
        
        {/* 3. Services Overview - Image-based service cards */}
        <ServicesOverview />
        
        {/* 4. Trust & KPI Metrics - Data visualization */}
        <TrustMetrics />
        
        {/* 5. Process Flow - 5-step visual journey */}
        <ProcessFlow />
        
        {/* 6. Final CTA - Dark gradient with strong call to action */}
        <FinalCTA />
      </main>
    </>
  )
}