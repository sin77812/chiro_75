import { Metadata } from 'next'

// New Revolutionary Sections
import HeroSection from '@/components/sections/HeroSection'
import LiveDashboard from '@/components/sections/LiveDashboard'
import ProcessDifferentiation from '@/components/sections/ProcessDifferentiation'
import VideoShowcase from '@/components/sections/VideoShowcase'
import PerformanceDashboard from '@/components/sections/PerformanceDashboard'
import InteractiveCTA from '@/components/sections/InteractiveCTA'

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
        {/* 1. Revolutionary Hero Section - Interactive Performance Experience */}
        <HeroSection />
        
        {/* 2. Live Dashboard Section - Real-time Performance Proof */}
        <LiveDashboard />
        
        {/* 3. Process Differentiation Section - HOW WE WORK */}
        <ProcessDifferentiation />
        
        {/* 4. Video Showcase Section - Interactive Case Study */}
        <VideoShowcase />
        
        {/* 5. Performance Dashboard Section - Interactive Data & Analytics */}
        <PerformanceDashboard />
        
        {/* 6. Interactive CTA Section - Growth Tools & Smart Forms */}
        <InteractiveCTA />
      </main>
    </>
  )
}