'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  client: string
  industry: string
  services: string[]
  thumbnail: string
  gallery: string[]
  before?: string
  after?: string
  year: number
  category: string
  tags: string[]
  url?: string
  kpis: Array<{
    metric: string
    value: string
    improvement: string
  }>
  description: string
  problem?: string
  approach?: string
  result?: string
  completedAt?: string
}

interface Project {
  id: string
  title: string
  category: string
  description: string
  results: string
  image: string
  color: string
  url: string
}

const SmartMinimalismWork = () => {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0) // Start with first project (NBP)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // API에서 포트폴리오 데이터 가져오기
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/portfolio')
        if (!response.ok) {
          throw new Error('포트폴리오 데이터를 불러올 수 없습니다')
        }
        
        const data: PortfolioItem[] = await response.json()
        setPortfolioData(data)
        
        // 포트폴리오 데이터를 Project 형식으로 변환
        const transformedProjects: Project[] = data.slice(0, 5).map((item, index) => {
          // 카테고리별 색상 정의
          const categoryColors: { [key: string]: string } = {
            'manufacturing': '#FFD700',
            'education': '#1DB954', 
            'service': '#00D4FF',
            'technology': '#FF6B6B',
            'healthcare': '#9C27B0',
            'finance': '#FF9500',
            'ecommerce': '#00D4FF'
          }
          
          // 카테고리별 한국어 라벨
          const categoryLabels: { [key: string]: string } = {
            'manufacturing': '제조업',
            'education': '교육',
            'service': '서비스',
            'technology': '기술',
            'healthcare': '헬스케어',
            'finance': '금융',
            'ecommerce': '전자상거래'
          }
          
          return {
            id: item.id,
            title: item.client.toUpperCase(),
            category: categoryLabels[item.category] || item.industry,
            description: item.description,
            results: item.kpis.length > 0 ? item.kpis[0].value + ' ' + item.kpis[0].metric : '+성과 달성',
            image: item.thumbnail,
            color: categoryColors[item.category] || '#1DB954',
            url: item.url || `/case/${item.slug}`
          }
        })
        
        setProjects(transformedProjects)
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
        // 에러 발생 시 빈 배열로 설정하여 컴포넌트가 깨지지 않도록 함
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  // Auto rotation every 5 seconds (pauses on hover)
  useEffect(() => {
    if (!isVisible || isPaused || projects.length === 0) return

    const interval = setInterval(() => {
      setSelectedIndex(prev => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, isPaused, projects.length])

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768) // Mobile/tablet detection for layout changes
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Skip mouse tracking on mobile
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      return () => section.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile])

  // Get 3 visible projects (previous, current, next) for infinite loop
  const getVisibleProjects = () => {
    const total = projects.length
    if (total === 0) return []
    
    const visibleProjects = []
    
    for (let i = -1; i <= 1; i++) {
      const index = (selectedIndex + i + total) % total
      visibleProjects.push({
        project: projects[index],
        index: index,
        displayIndex: i // -1 (left), 0 (center), 1 (right)
      })
    }
    
    return visibleProjects
  }

  const handleProjectSelect = (index: number) => {
    if (isAnimating || projects.length === 0) return
    
    if (index === selectedIndex) {
      // Navigate to project page if already selected
      router.push(projects[index].url)
      return
    }
    
    setIsAnimating(true)
    setSelectedIndex(index)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  const getProjectStyle = (displayIndex: number) => {
    if (displayIndex === 0) {
      // Center (selected) project
      return {
        perspectiveTransform: `
          perspective(1200px) 
          translateZ(0px) 
          rotateY(0deg) 
          scale(1)
        `,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 30
      }
    }
    
    // Left (-1) or right (1) projects
    const rotateY = displayIndex > 0 ? -25 : 25
    const translateZ = -100
    const scale = 0.8
    
    return {
      perspectiveTransform: `
        perspective(1200px) 
        translateZ(${translateZ}px) 
        rotateY(${rotateY}deg) 
        scale(${scale})
      `,
      filter: 'blur(2px)',
      opacity: 0.6,
      zIndex: 20
    }
  }

  const ProjectCard = ({ project, index, displayIndex }: { project: Project; index: number; displayIndex: number }) => {
    const isSelected = displayIndex === 0
    const cardRef = useRef<HTMLDivElement>(null)
    
    return (
      <div
        ref={cardRef}
        className={`
          absolute cursor-pointer
          transition-all duration-1000 ease-in-out
          ${isSelected ? 'transform-gpu' : ''}
        `}
        style={isMobile ? {
          // Mobile: Simple full-width card
          width: '100%',
          height: '280px',
          position: 'relative',
          filter: 'none',
          opacity: 1,
          zIndex: 1,
          transform: 'none'
        } : {
          // Desktop: 3D carousel
          width: '33.6vw',  // 80% of 42vw
          height: '25.2vw', // 80% of 31.5vw
          filter: getProjectStyle(displayIndex).filter,
          opacity: getProjectStyle(displayIndex).opacity,
          zIndex: getProjectStyle(displayIndex).zIndex,
          left: `calc(50% + ${displayIndex * 28}vw)`,
          top: '50%',
          transform: `translate(-50%, -50%) ${getProjectStyle(displayIndex).perspectiveTransform}`,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d'
        }}
        onClick={() => handleProjectSelect(index)}
      >
        {/* Background Card */}
        <div 
          className={`
            relative w-full h-full rounded-2xl border-2 overflow-hidden
            transition-all duration-700 ease-out
            ${isSelected ? 'border-[#1DB954]' : 'border-white/20'}
          `}
          style={{
            boxShadow: isSelected 
              ? `0 20px 60px rgba(29, 185, 84, 0.3), 0 0 0 1px ${project.color}30`
              : '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Project Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundColor: '#000000'
            }}
          />
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 p-6">
            <h3 
              className="font-bold mb-2 transition-all duration-500"
              style={{
                fontSize: isSelected ? '1.8rem' : '1.4rem',
                color: '#ffffff',
                lineHeight: '1.2'
              }}
            >
              {project.title}
            </h3>
            
            {/* Results Badge */}
            <div 
              className={`
                inline-block px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-500
                ${isSelected ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}
              `}
              style={{
                background: 'rgba(29,185,84,0.9)',
                color: '#ffffff'
              }}
            >
              {project.results}
            </div>
          </div>

          {/* Selection Indicator */}
          {isSelected && (
            <div 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse"
              style={{
                background: '#1DB954',
                boxShadow: '0 0 20px #1DB954'
              }}
            />
          )}
        </div>
      </div>
    )
  }

  // 로딩 또는 데이터가 없을 때 간단한 UI 표시
  if (loading || projects.length === 0) {
    return (
      <section 
        ref={sectionRef}
        className="min-h-[90vh] bg-[#0E1111] relative overflow-hidden flex flex-col justify-center"
      >
        {/* Title */}
        <div className="text-center mb-20">
          <h2 
            className="font-bold text-white"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              letterSpacing: '-0.02em'
            }}
          >
            Check Our{' '}
            <span className="text-[#1DB954]">Results</span>
          </h2>
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954]"></div>
            <span className="ml-3 text-white/70">포트폴리오를 불러오는 중...</span>
          </div>
        )}
        
        {/* No data message */}
        {!loading && projects.length === 0 && (
          <div className="text-center">
            <p className="text-white/70">포트폴리오 데이터를 불러올 수 없습니다.</p>
          </div>
        )}
      </section>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-[90vh] bg-[#0E1111] relative overflow-hidden flex flex-col justify-center"
      style={{
        perspective: '1500px'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Title */}
      <div 
        className={`
          text-center mb-20 transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <h2 
          className="font-bold text-white"
          style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            letterSpacing: '-0.02em'
          }}
        >
          Check Our{' '}
          <span className="text-[#1DB954]">Results</span>
        </h2>
      </div>

      {/* Project Selection Area */}
      {isMobile ? (
        /* Mobile: Single Card Layout */
        <div className="relative flex-1 flex items-center justify-center w-full px-4" style={{ minHeight: '400px' }}>
          <div className="w-full max-w-sm">
            <ProjectCard 
              key={projects[selectedIndex].id} 
              project={projects[selectedIndex]} 
              index={selectedIndex} 
              displayIndex={0} 
            />
          </div>
        </div>
      ) : (
        /* Desktop: 3D Carousel */
        <div className="relative flex-1 flex items-center justify-center w-full" style={{ minHeight: '450px' }}>
          {getVisibleProjects().map(({ project, index, displayIndex }) => (
            <ProjectCard key={`${project.id}-${displayIndex}`} project={project} index={index} displayIndex={displayIndex} />
          ))}
        </div>
      )}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 ease-out
              ${index === selectedIndex 
                ? 'bg-[#1DB954] scale-125' 
                : 'bg-white/30 hover:bg-white/50'
              }
            `}
            onClick={() => handleProjectSelect(index)}
            style={{
              boxShadow: index === selectedIndex 
                ? '0 0 20px rgba(29, 185, 84, 0.5)' 
                : 'none'
            }}
          />
        ))}
      </div>

      {/* View More Portfolio Button - Mobile Optimized Overlap */}
      <div className={`${isMobile ? 'absolute bottom-4 right-4 z-50' : 'absolute bottom-10 right-10'}`}>
        <button 
          onClick={() => router.push('/portfolio')}
          className={`
            bg-[#1DB954] text-white font-medium rounded-lg 
            hover:bg-[#1ed760] transition-all duration-300 hover:scale-105 
            hover:shadow-lg hover:shadow-[#1DB954]/30
            ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'}
          `}
        >
          {isMobile ? '더보기' : '더 많은 포트폴리오 보기'}
        </button>
      </div>

    </section>
  )
}

export default SmartMinimalismWork