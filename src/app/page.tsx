import { Metadata } from 'next'

// Critical sections - immediate load
import HeroSection from '@/components/sections/HeroSection'
import InteractiveCTA from '@/components/sections/InteractiveCTA'

// Non-critical sections - lazy load
import { 
  SuspenseLiveDashboard,
  SuspenseProcessDifferentiation, 
  SuspenseVideoShowcase,
  SuspensePerformanceDashboard
} from '@/components/LazyComponents'

// Performance monitoring (development only)
import PerformanceDebugger from '@/components/debug/PerformanceDebugger'

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
      {/* Critical resource preloading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700;800&display=swap"
      />
      
      {/* Media resources */}
      <link rel="preload" href="/image/backgroundvod.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/images/hero-poster.jpg" as="image" type="image/jpeg" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      <main className="overflow-x-hidden">
        {/* 1. Critical Hero Section - Immediate Load */}
        <HeroSection />
        
        {/* 2-5. Non-Critical Sections - Lazy Load */}
        <SuspenseLiveDashboard />
        <SuspenseProcessDifferentiation />
        <SuspenseVideoShowcase />
        <SuspensePerformanceDashboard />
        
        {/* 6. CTA Section - Placeholder */}
        <InteractiveCTA />
      </main>
      
      {/* Performance Debugger - Development Only */}
      <PerformanceDebugger enabled={process.env.NODE_ENV === 'development'} />
    </>
  )
}