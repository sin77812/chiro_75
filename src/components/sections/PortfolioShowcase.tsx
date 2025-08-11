'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, TrendingUp, Zap, Users } from 'lucide-react'
import ScrollReveal, { FadeUp, FadeLeft, FadeRight } from '@/components/ui/ScrollReveal'

interface Project {
  id: string
  title: string
  category: string
  result: string
  improvement: string
  mediaType: 'video' | 'image'
  videoSrc?: string
  imageSrc?: string
  posterSrc?: string
  devices: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
}

const portfolioProjects: Project[] = [
  {
    id: '1',
    title: 'FinanceFlow',
    category: '핀테크 플랫폼',
    result: '전환율 +340%',
    improvement: '사용자 경험 혁신',
    mediaType: 'video',
    videoSrc: '/videos/portfolio/financeflow-demo.mp4',
    posterSrc: '/images/portfolio/financeflow-poster.jpg',
    devices: {
      desktop: '/images/portfolio/financeflow-desktop.jpg',
      mobile: '/images/portfolio/financeflow-mobile.jpg'
    }
  },
  {
    id: '2', 
    title: 'StyleHub',
    category: '이커머스',
    result: '매출 +280%',
    improvement: '로딩속도 82% 개선',
    mediaType: 'video',
    videoSrc: '/videos/portfolio/stylehub-demo.mp4',
    posterSrc: '/images/portfolio/stylehub-poster.jpg',
    devices: {
      desktop: '/images/portfolio/stylehub-desktop.jpg',
      mobile: '/images/portfolio/stylehub-mobile.jpg'
    }
  },
  {
    id: '3',
    title: 'TechCorp',
    category: 'B2B 포털',
    result: '리드 +187%',
    improvement: '글로벌 확장 성공',
    mediaType: 'image',
    imageSrc: '/images/portfolio/techcorp-hero.jpg',
    devices: {
      desktop: '/images/portfolio/techcorp-desktop.jpg',
      mobile: '/images/portfolio/techcorp-mobile.jpg',
      tablet: '/images/portfolio/techcorp-tablet.jpg'
    }
  },
  {
    id: '4',
    title: 'HealthCare+',
    category: '헬스케어',
    result: '효율성 +65%',
    improvement: '사용자 만족도 4.9/5',
    mediaType: 'image',
    imageSrc: '/images/portfolio/healthcare-hero.jpg',
    devices: {
      desktop: '/images/portfolio/healthcare-desktop.jpg',
      mobile: '/images/portfolio/healthcare-mobile.jpg'
    }
  }
]

export default function PortfolioShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section className="section-padding bg-background-primary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeUp>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              검증된 성과
            </div>
            <h2 className="font-pretendard font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
              CHIRO가 함께 이룬
              <br />
              <span className="text-gradient">프로젝트</span>
            </h2>
            <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
              클라이언트의 비즈니스 목표를 달성한 대표 프로젝트들
            </p>
          </FadeUp>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {portfolioProjects.slice(0, 3).map((project, index) => (
            <FadeUp key={project.id} delay={index * 150}>
              <Link href={`/portfolio/${project.id}`}>
                <article 
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Media */}
                  <div className="relative overflow-hidden rounded-xl mb-4 bg-background-secondary">
                    <div className="aspect-video relative">
                      {project.mediaType === 'video' ? (
                        <>
                          <video
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            muted
                            loop
                            playsInline
                            poster={project.posterSrc}
                            autoPlay={hoveredProject === project.id}
                          >
                            <source src={project.videoSrc} type="video/mp4" />
                          </video>
                          
                          {/* Play overlay */}
                          <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
                            hoveredProject === project.id ? 'opacity-0' : 'opacity-100'
                          }`}>
                            <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Play className="w-4 h-4 text-white ml-0.5" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${project.imageSrc})` }}
                        />
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Device mockups overlay */}
                      <div className="absolute bottom-2 right-2 flex space-x-1">
                        {project.devices.desktop && (
                          <div className="w-6 h-4 bg-white/20 rounded-sm backdrop-blur-sm" />
                        )}
                        {project.devices.tablet && (
                          <div className="w-4 h-4 bg-white/20 rounded-sm backdrop-blur-sm" />
                        )}
                        {project.devices.mobile && (
                          <div className="w-3 h-4 bg-white/20 rounded-sm backdrop-blur-sm" />
                        )}
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    {/* Category & Title */}
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-1">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-pretendard font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    {/* Results */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-accent-green">
                          {project.result}
                        </div>
                        <div className="text-xs text-white/60">
                          {project.improvement}
                        </div>
                      </div>

                      {/* View project arrow */}
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <div className="w-3 h-3 border-t-2 border-r-2 border-white rotate-45 group-hover:border-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-16">
          <FadeUp delay={600}>
            <Link 
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-primary font-semibold rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              <span>전체 프로젝트 보기</span>
              <div className="ml-3 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}