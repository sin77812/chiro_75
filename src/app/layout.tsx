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
  metadataBase: new URL('https://chiro.co.kr'),
  title: {
    default: 'CHIRO - 프리미엄 웹에이전시 | B2B 기업 전문',
    template: '%s - CHIRO'
  },
  description: '제조업과 중견기업을 위한 프리미엄 웹사이트 제작 서비스. 150+ 프로젝트 경험, 98% 고객 만족도. 성과 중심 디지털 솔루션 제공.',
  keywords: [
    '웹에이전시', 'B2B 웹사이트', '기업 홈페이지 제작', '제조업 웹사이트', '중견기업 디지털 마케팅',
    '웹개발', '디지털 전환', '반응형 웹사이트', 'UI/UX 디자인', '성능 최적화',
    '글로벌 진출 지원', '다국어 웹사이트', 'SEO 최적화', '웹 접근성', 'CHIRO'
  ],
  authors: [{ name: 'CHIRO', url: 'https://chiro.co.kr' }],
  creator: 'CHIRO',
  publisher: 'CHIRO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'business',
  classification: 'Web Development Agency',
  
  // OpenGraph
  openGraph: {
    title: 'CHIRO - 프리미엄 웹에이전시 | B2B 기업 전문',
    description: '제조업과 중견기업을 위한 프리미엄 웹사이트 제작 서비스. 150+ 프로젝트 경험, 98% 고객 만족도.',
    url: 'https://chiro.co.kr',
    siteName: 'CHIRO',
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CHIRO - 프리미엄 웹에이전시',
        type: 'image/jpeg',
      }
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'CHIRO - 프리미엄 웹에이전시',
    description: '제조업과 중견기업을 위한 프리미엄 웹사이트 제작 서비스',
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
    google: 'google-site-verification-code', // Replace with actual code
    other: {
      'naver-site-verification': 'naver-verification-code', // Replace with actual code
    }
  },

  // Alternates for i18n
  alternates: {
    canonical: 'https://chiro.co.kr',
    languages: {
      'ko-KR': 'https://chiro.co.kr',
      'en-US': 'https://chiro.co.kr/en',
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
        
        {/* Enhanced Structured Data - LocalBusiness + Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://chiro-75.vercel.app/#organization",
              "name": "CHIRO",
              "alternateName": "CHIRO 웹디자인 에이전시",
              "url": "https://chiro-75.vercel.app",
              "logo": "https://chiro-75.vercel.app/logo.png",
              "description": "2주 완성 프리미엄 웹사이트 제작 전문 웹에이전시. 웹디자인, UI/UX, 반응형 홈페이지 제작 전문.",
              "foundingDate": "2020",
              "telephone": "+82-2-1234-5678",
              "email": "hello@chiro.agency",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "테헤란로 123",
                "addressLocality": "강남구",
                "addressRegion": "서울특별시",
                "postalCode": "06000",
                "addressCountry": "KR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.5665,
                "longitude": 126.9780
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+82-2-1234-5678",
                  "contactType": "customer service",
                  "availableLanguage": ["ko", "en"]
                }
              ],
              "sameAs": [
                "https://www.instagram.com/chiro_agency",
                "https://www.facebook.com/chiroagency",
                "https://github.com/chiro-agency"
              ],
              "priceRange": "₩₩₩",
              "serviceType": ["웹디자인", "웹사이트제작", "UI/UX디자인", "웹개발", "홈페이지제작"],
              "areaServed": {
                "@type": "Country",
                "name": "대한민국"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "웹디자인 서비스",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "웹사이트 제작",
                      "description": "반응형 웹사이트 제작 서비스"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "UI/UX 디자인",
                      "description": "사용자 중심 디자인 서비스"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5"
              }
            })
          }}
        />
        
        {/* Additional Naver Meta Tags */}
        <meta name="naver-site-verification" content="d90c62d5016150c42c4ef8b998e3971f82a9897b" />
        <meta property="naver:category" content="웹디자인" />
        <meta property="naver:subject" content="웹사이트제작" />
      </head>
      <body className="font-noto antialiased bg-[#0E1111] text-white">
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  )
}