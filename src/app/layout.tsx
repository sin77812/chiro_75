import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/utils/SmoothScroll'
import './globals.css'

// Optimized font loading with performance improvements
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true
})

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'], 
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: true
})

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://www.chiroweb.co.kr'),
  title: {
    default: '치로 웹디자인 | 치로(CHIRO) - 중소기업 홈페이지 제작 전문',
    template: '%s | 치로 웹디자인'
  },
  description: '치로 웹디자인은 2주 완성 프리미엄 웹사이트 제작 전문 에이전시입니다. 치로(CHIRO)는 중소기업과 스타트업을 위한 반응형 홈페이지, 쇼핑몰, 랜딩페이지를 제작합니다.',
  keywords: [
    '치로', '치로웹디자인', '치로 웹디자인', 'CHIRO', 'chiro', '웹디자인', 
    '홈페이지제작', '웹사이트제작', '반응형웹', '쇼핑몰제작', '랜딩페이지',
    '중소기업 홈페이지', '스타트업 웹사이트', '기업 홈페이지 제작', '웹에이전시',
    '서울 웹디자인', '강남 웹에이전시', '2주완성', '프리미엄 웹사이트'
  ],
  authors: [{ name: '치로 웹디자인' }],
  creator: '치로(CHIRO)',
  publisher: '치로 웹디자인',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'business',
  classification: 'Web Design Agency',
  
  // OpenGraph
  openGraph: {
    title: '치로 웹디자인 | 2주 완성 프리미엄 홈페이지 제작',
    description: '치로(CHIRO) - 중소기업 맞춤형 웹디자인 전문 에이전시. 평균 전환율 332% 향상, 0.8초 로딩속도 보장',
    url: 'https://www.chiroweb.co.kr',
    siteName: '치로 웹디자인',
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '치로 웹디자인 - CHIRO Web Design',
        type: 'image/jpeg',
      }
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: '치로 웹디자인 | CHIRO',
    description: '2주 완성 프리미엄 웹사이트 제작',
    creator: '@chiro_agency',
    site: '@chiro_agency',
    images: ['/og-image.jpg'],
  },

  // Additional SEO
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

  // PWA
  manifest: '/manifest.json',
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },

  // Verification
  verification: {
    google: 'ANdrpoeRy-ZYfdNF8-eIP7CWL7ZmgI1EQIOwAAZrbXM',
    other: {
      'naver-site-verification': 'navere352ca310927df69877048c7c27e4bdd'
    }
  },

  // Alternates for i18n
  alternates: {
    canonical: 'https://www.chiroweb.co.kr',
    languages: {
      'ko-KR': 'https://www.chiroweb.co.kr',
      'en-US': 'https://www.chiroweb.co.kr/en',
    },
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F0F' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebDesignAgency",
              "name": "치로 웹디자인",
              "alternateName": "CHIRO Web Design",
              "url": "https://www.chiroweb.co.kr",
              "logo": "https://www.chiroweb.co.kr/logo.png",
              "description": "치로는 중소기업 전문 웹디자인 에이전시입니다.",
              "foundingDate": "2017",
              "founders": [{
                "@type": "Person",
                "name": "정원"
              }],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR"
              },
              "sameAs": [
                "https://github.com/sin77812/chiro_75"
              ],
              "offers": {
                "@type": "Offer",
                "description": "2주 완성 프리미엄 웹사이트 제작"
              }
            })
          }}
        />
      </head>
      <body className="font-noto antialiased bg-[#0E1111] text-white">
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
