import { Metadata } from 'next'

// Smart Minimalism Sections
import SmartMinimalismHero from '@/components/sections/SmartMinimalismHero'
import SmartMinimalismProof from '@/components/sections/SmartMinimalismProof'
import SmartMinimalismWork from '@/components/sections/SmartMinimalismWork'
import SmartMinimalismTech from '@/components/sections/SmartMinimalismTech'
import SmartMinimalismContact from '@/components/sections/SmartMinimalismContact'

export const metadata: Metadata = {
  // 핵심 메타 태그
  title: '웹디자인 전문 | CHIRO - 2주 완성 프리미엄 웹사이트 제작',
  description: '웹에이전시 CHIRO는 2주 만에 완성하는 웹사이트 제작 전문 기업입니다. 웹디자인, UI/UX, 반응형 홈페이지 제작, 340% 전환율 상승 보장.',
  
  keywords: [
    // 핵심 키워드 (순서 중요!)
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
    '워드프레스',
    '웹디자인업체',
    '홈페이지제작업체',
    '2주완성웹사이트'
  ],
  
  // Open Graph (소셜 미디어)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://chiro-75.vercel.app',
    siteName: 'CHIRO - 웹디자인 전문 에이전시',
    title: '웹디자인 전문 | CHIRO - 2주 완성 프리미엄 웹사이트 제작',
    description: '웹에이전시 CHIRO와 함께 2주 만에 완벽한 웹사이트를 제작하세요. 340% 전환율 상승, 98% 재계약률 보장.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '웹디자인 전문 CHIRO',
      }
    ],
  },
  
  // 트위터 카드
  twitter: {
    card: 'summary_large_image',
    title: '웹디자인 전문 | CHIRO',
    description: '2주 완성 프리미엄 웹사이트 제작',
    images: ['/twitter-image.jpg'],
    creator: '@chiro_agency',
  },
  
  // 추가 메타 태그
  alternates: {
    canonical: 'https://chiro-75.vercel.app',
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
    naver: 'naver-site-verification-code',
  },
  
  authors: [{ name: 'CHIRO', url: 'https://chiro-75.vercel.app' }],
  creator: 'CHIRO Web Agency',
  publisher: 'CHIRO',
  
  category: '웹디자인',
  
  // 추가 설정
  other: {
    'naver-site-verification': 'your-naver-code',
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
      <h1 className="seo-h1">
        웹디자인 전문 CHIRO - 프리미엄 웹사이트 제작 에이전시
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