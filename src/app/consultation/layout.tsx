import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '무료 견적 상담 | CHIRO - 3분만에 맞춤 견적 확인',
  description: '간단한 질문 3가지로 웹사이트 제작 견적을 즉시 확인하세요. 24시간 내 전문 상담, 부담 없는 무료 견적.',
  keywords: ['웹사이트 견적', '홈페이지 제작 상담', '무료 견적', '웹개발 비용', '스타트업 웹사이트'],
  openGraph: {
    title: '무료 견적 상담 | CHIRO',
    description: '3분만에 맞춤 견적 확인 - 24시간 내 전문 상담, 부담 없는 무료 견적',
    type: 'website',
    url: 'https://chiro.agency/consultation',
    images: [
      {
        url: '/og-consultation.jpg',
        width: 1200,
        height: 630,
        alt: 'CHIRO 무료 견적 상담',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '무료 견적 상담 | CHIRO',
    description: '3분만에 맞춤 견적 확인 - 24시간 내 전문 상담, 부담 없는 무료 견적',
    images: ['/og-consultation.jpg'],
  },
}

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}