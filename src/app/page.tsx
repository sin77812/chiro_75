import { Metadata } from 'next'

// Core sections - FLASH FORM style
import FFHero from '@/components/sections/FFHero'
import FFProblem from '@/components/sections/FFProblem'
import FFServices from '@/components/sections/FFServices'
import FFCaseVideo from '@/components/sections/FFCaseVideo'
import FFProof from '@/components/sections/FFProof'
import FFCTAForm from '@/components/sections/FFCTAForm'

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
        {/* 1. FLASH FORM Style Hero Section */}
        <FFHero />
        
        {/* 2. FLASH FORM Style Problem Section */}
        <FFProblem />
        
        {/* 3. FLASH FORM Style Services Section */}
        <FFServices />
        
        {/* 4. FLASH FORM Style Case Video Section */}
        <FFCaseVideo />
        
        {/* 5. FLASH FORM Style Proof Section */}
        <FFProof />
        
        {/* 6. FLASH FORM Style CTA Form Section */}
        <FFCTAForm />
      </main>
    </>
  )
}