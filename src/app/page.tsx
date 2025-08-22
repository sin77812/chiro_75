import { Metadata } from 'next'

// Core sections loaded immediately
import StorytellingHero from '@/components/sections/StorytellingHero'
import ServicesOverview from '@/components/sections/ServicesOverview'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'

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
        
        {/* 2. Services Overview - Image-based service cards */}
        <ServicesOverview />
        
        {/* 3. Portfolio Teaser - Visual-first project showcase */}
        <PortfolioShowcase />
      </main>
    </>
  )
}