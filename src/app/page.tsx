import { Metadata } from 'next'

// Smart Minimalism Sections
import SmartMinimalismHero from '@/components/sections/SmartMinimalismHero'
import SmartMinimalismProof from '@/components/sections/SmartMinimalismProof'
import SmartMinimalismWork from '@/components/sections/SmartMinimalismWork'
import SmartMinimalismTech from '@/components/sections/SmartMinimalismTech'
import SmartMinimalismContact from '@/components/sections/SmartMinimalismContact'

export const metadata: Metadata = {
  // 핵심 메타 태그
  title: '치로 웹디자인 전문 | 치로(CHIRO) - 2주 완성 프리미엄 웹사이트 제작',
  description: '치로 웹디자인은 당신의 비즈니스를 진짜 이해하는 웹 파트너입니다. 치로(CHIRO)가 맞춤 브랜딩, 합리적 가격, 완벽한 유지보수까지 책임집니다.',
  
  keywords: [
    // 핵심 키워드 (순서 중요!)
    '치로',
    '치로웹디자인',
    '치로 웹디자인',
    'CHIRO',
    'chiro',
    '웹디자인',
    '웹에이전시',
    '웹사이트제작',
    '홈페이지제작',
    '반응형웹디자인',
    'UI/UX디자인',
    '웹개발',
    '서울웹에이전시',
    '웹사이트리뉴얼',
    '기업홈페이지제작',
    '쇼핑몰제작',
    '2주완성웹사이트'
  ],
  
  // Open Graph (소셜 미디어)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.chiroweb.co.kr',
    siteName: '치로 웹디자인',
    title: '치로 웹디자인 | 2주 완성 프리미엄 홈페이지 제작',
    description: '치로(CHIRO) - 중소기업 맞춤형 웹디자인 전문 에이전시. 평균 전환율 332% 향상, 0.8초 로딩속도 보장',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '치로 웹디자인 - CHIRO Web Design',
      }
    ],
  },
  
  // 트위터 카드
  twitter: {
    card: 'summary_large_image',
    title: '치로 웹디자인 | CHIRO',
    description: '2주 완성 프리미엄 웹사이트 제작 전문 치로 웹디자인',
    images: ['/twitter-image.jpg'],
    creator: '@chiro_agency',
  },
  
  // 추가 메타 태그
  alternates: {
    canonical: 'https://www.chiroweb.co.kr',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'google-site-verification-code',
  },
  
  authors: [{ name: 'CHIRO', url: 'https://www.chiroweb.co.kr' }],
  creator: 'CHIRO Web Agency',
  publisher: 'CHIRO',
  
  category: '웹디자인',
  
  // 추가 설정
  other: {
    'og:phone_number': '02-1234-5678',
    'og:email': 'hello@chiro.agency',
    'og:latitude': '37.5665',
    'og:longitude': '126.9780',
    'og:street-address': '서울특별시 강남구',
    'og:locality': '서울',
    'og:region': '서울특별시',
    'og:postal-code': '06000',
    'og:country-name': 'KR',
  },
}

export default function Home() {
  return (
    <>
      {/* SEO H1 Tag - Hidden but readable by search engines */}
      <h1 className="sr-only">
        치로 웹디자인 - 중소기업 홈페이지 제작 전문
      </h1>
      
      <main className="overflow-x-hidden bg-[#0E1111]">
        {/* 1. Smart Minimalism Hero Section - Magnetic Typography */}
        <SmartMinimalismHero />
        
        {/* 2. Proof Section - Blur to Focus Counter */}
        <SmartMinimalismProof />
        
        {/* 3. Work Section - Choose Your Project */}
        <SmartMinimalismWork />
        
        {/* 4. Tech Section - Tech Stack + Live Monitor */}
        <SmartMinimalismTech />
        
        {/* 5. Contact Section - CHIRO Orbital Button */}
        <SmartMinimalismContact />
      </main>
    </>
  )
}
