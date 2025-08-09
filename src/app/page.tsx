import Hero from '@/components/sections/Hero'
import LogoStrip from '@/components/sections/LogoStrip'
import WhyChiro from '@/components/sections/WhyChiro'
import ResultsCounter from '@/components/sections/ResultsCounter'
import StickyCTA from '@/components/ui/StickyCTA'

// Dynamic imports for below-the-fold components to improve LCP
import dynamic from 'next/dynamic'

const PortfolioGrid = dynamic(() => import('@/components/sections/PortfolioGrid'), {
  loading: () => <div className="min-h-96 animate-pulse bg-shadow-gray/20 rounded-2xl" />
})

const TestimonialCarousel = dynamic(() => import('@/components/sections/TestimonialCarousel'), {
  loading: () => <div className="min-h-64 animate-pulse bg-shadow-gray/20 rounded-2xl" />
})

const PageCTA = dynamic(() => import('@/components/sections/PageCTA'), {
  loading: () => <div className="min-h-48 animate-pulse bg-shadow-gray/20 rounded-2xl" />
})

const FooterPreview = dynamic(() => import('@/components/sections/FooterPreview'), {
  loading: () => <div className="min-h-32 animate-pulse bg-shadow-gray/20 rounded-2xl" />
})

export default function Home() {
  return (
    <main>
      {/* Hero Section with AI-focused messaging */}
      <Hero />
      
      {/* Trust indicators with accessibility improvements */}
      <LogoStrip />
      
      {/* Why/Value section - 4 columns with hover effects */}
      <WhyChiro />
      
      {/* Performance metrics with updated KPIs */}
      <ResultsCounter />
      
      {/* Portfolio highlights with performance badges */}
      <PortfolioGrid />
      
      {/* Customer testimonials */}
      <TestimonialCarousel />
      
      {/* Mid-page CTA */}
      <PageCTA />
      
      {/* Footer preview with About + Insights */}
      <FooterPreview />
      
      {/* Floating CTA button */}
      <StickyCTA />
    </main>
  )
}