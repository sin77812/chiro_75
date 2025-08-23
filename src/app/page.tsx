import { Metadata } from 'next'

// New Revolutionary Sections
import SimpleHero from '@/components/sections/SimpleHero'
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
        <SimpleHero />
        
        {/* 2. Simple test sections */}
        <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">섹션 2: LiveDashboard</h2>
            <p className="text-xl text-white/70">실시간 성과 증명 섹션</p>
          </div>
        </section>
        
        <section className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">섹션 3: ProcessDifferentiation</h2>
            <p className="text-xl text-white/70">프로세스 차별화 섹션</p>
          </div>
        </section>
        
        <section className="min-h-screen bg-gray-700 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">섹션 4: VideoShowcase</h2>
            <p className="text-xl text-white/70">비디오 쇼케이스 섹션</p>
          </div>
        </section>
        
        <section className="min-h-screen bg-gray-600 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">섹션 5: PerformanceDashboard</h2>
            <p className="text-xl text-white/70">성과 대시보드 섹션</p>
          </div>
        </section>
        
        <section className="min-h-screen bg-gray-500 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">섹션 6: InteractiveCTA</h2>
            <p className="text-xl text-white/70">인터랙티브 CTA 섹션</p>
          </div>
        </section>
      </main>
    </>
  )
}