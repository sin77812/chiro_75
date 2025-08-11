import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Core sections loaded immediately - new premium components
import HeroSplit from '@/components/sections/HeroSplit'
import LogoStrip from '@/components/sections/LogoStrip'
import KpiTiles from '@/components/sections/KpiTiles'
import BeforeAfter from '@/components/sections/BeforeAfter'

// Existing sections we'll keep and enhance
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import ServicesOverview from '@/components/sections/ServicesOverview'

// Below-the-fold sections loaded dynamically
const TestimonialCarousel = dynamic(() => import('@/components/sections/TestimonialCarousel'), {
  loading: () => <div className="min-h-96 animate-pulse bg-[#0E1111]" />
})

const LeadForm = dynamic(() => import('@/components/sections/LeadForm'), {
  loading: () => <div className="min-h-96 animate-pulse bg-[#0E1111]" />
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
      <link rel="preload" href="/videos/hero-loop.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/images/hero-poster.jpg" as="image" type="image/jpeg" />
      
      <main className="overflow-x-hidden bg-[#0E1111]">
        {/* 1. Premium Hero Section - Split layout with video */}
        <HeroSplit />
        
        {/* 2. Trust Indicators - Logo strip with parallax */}
        <LogoStrip />
        
        {/* 3. KPI Section - Large numbers, minimal text */}
        <KpiTiles />
        
        {/* 4. Before/After Showcase - Interactive comparison */}
        <BeforeAfter />
        
        {/* 5. Portfolio Grid - Enhanced with performance chips */}
        <PortfolioShowcase />
        
        {/* 6. Services Overview - Premium service cards */}
        <ServicesOverview />
        
        {/* 7. Testimonials - Carousel with KPI sidebar */}
        <TestimonialCarousel />
        
        {/* 8. Final CTA - Consulting form */}
        <LeadForm />
      </main>
    </>
  )
}