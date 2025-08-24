import { Metadata } from 'next'
import PortfolioGrid from '@/components/sections/PortfolioGrid'
import PageCTA from '@/components/sections/PageCTA'

export const metadata: Metadata = {
  title: '포트폴리오 - CHIRO',
  description: '성공적인 디지털 전환 사례들을 확인하고, CHIRO의 전문성을 경험해보세요.',
}

export default function PortfolioPage() {
  return (
    <main className="pt-18">
      <PortfolioGrid />
      <PageCTA />
    </main>
  )
}