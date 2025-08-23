import { Metadata } from 'next'

// Smart Minimalism Sections
import SmartMinimalismHero from '@/components/sections/SmartMinimalismHero'
import SmartMinimalismProof from '@/components/sections/SmartMinimalismProof'
import SmartMinimalismProcess from '@/components/sections/SmartMinimalismProcess'
import SmartMinimalismContact from '@/components/sections/SmartMinimalismContact'

export const metadata: Metadata = {
  title: 'CHIRO - 코드가 아닌 성과를 팝니다',
  description: '2주 만에 완성하는 프리미엄 디지털 솔루션. 340% 전환율 증가, 98% 재계약률의 성과를 경험하세요.',
  keywords: ['웹개발', '디지털에이전시', 'UX디자인', '성능최적화', '브랜딩'],
  openGraph: {
    title: 'CHIRO - 코드가 아닌 성과를 팝니다',
    description: '2주 만에 완성하는 프리미엄 디지털 솔루션. 340% 전환율 증가, 98% 재계약률의 성과를 경험하세요.',
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
    title: 'CHIRO - 코드가 아닌 성과를 팝니다',
    description: '2주 만에 완성하는 프리미엄 디지털 솔루션. 340% 전환율 증가, 98% 재계약률의 성과를 경험하세요.',
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden bg-[#0E1111]">
        {/* 1. Smart Minimalism Hero Section - Magnetic Typography */}
        <SmartMinimalismHero />
        
        {/* 2. Proof Section - Blur to Focus Counter */}
        <SmartMinimalismProof />
        
        {/* 3. Process Section - Timeline River */}
        <SmartMinimalismProcess />
        
        {/* 4. Contact Section - CHIRO Orbital Button */}
        <SmartMinimalismContact />
      </main>
    </>
  )
}