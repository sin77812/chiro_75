'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Project {
  id: number
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
  const [selectedIndex, setSelectedIndex] = useState(2) // Center project starts as selected
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const projects: Project[] = [
    {
      id: 1,
      title: "MANUFACTURING",
      category: "제조업",
      description: "글로벌 B2B 포털로 해외 문의 320% 증가",
      results: "+320% 문의",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop",
      color: "#FFD700",
      url: "/case/nexus-manufacturing"
    },
    {
      id: 2,
      title: "FINTECH",
      category: "금융 서비스",
      description: "결제 시스템 혁신으로 전환율 340% 향상",
      results: "+340% 전환율",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop",
      color: "#1DB954",
      url: "/case/fintech-payment-system"
    },
    {
      id: 3,
      title: "E-COMMERCE",
      category: "전자상거래", 
      description: "AI 추천으로 매출 280% 증가 달성",
      results: "+280% 매출",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=500&fit=crop",
      color: "#00D4FF",
      url: "/case/ecommerce-ai-system"
    },
    {
      id: 4,
      title: "HEALTHCARE",
      category: "헬스케어",
      description: "환자 관리로 운영 효율성 95% 개선", 
      results: "+95% 효율",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=500&fit=crop",
      color: "#FF6B6B",
      url: "/case/healthcare-management"
    },
    {
      id: 5,
      title: "CONSULTING",
      category: "컨설팅",
      description: "브랜드 리뉴얼로 인지도 180% 증가",
      results: "+180% 인지도",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=500&fit=crop",
      color: "#9C27B0",
      url: "/case/global-dynamics"
    }
  ]

  // Auto rotation every 5 seconds
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setSelectedIndex(prev => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, projects.length])

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
  }, [])

  // Get 3 visible projects (previous, current, next) for infinite loop
  const getVisibleProjects = () => {
    const total = projects.length
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
    if (isAnimating) return
    
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
        style={{
          width: '42vw',  // 50% 증가 (28vw * 1.5)
          height: '31.5vw', // 50% 증가 (21vw * 1.5)
          filter: getProjectStyle(displayIndex).filter,
          opacity: getProjectStyle(displayIndex).opacity,
          zIndex: getProjectStyle(displayIndex).zIndex,
          left: `calc(50% + ${displayIndex * 35}vw)`,
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

  return (
    <section 
      ref={sectionRef}
      className="h-[80vh] bg-[#0E1111] relative overflow-hidden flex flex-col justify-center"
      style={{
        perspective: '1500px'
      }}
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
            fontSize: 'clamp(36px, 5vw, 48px)',
            letterSpacing: '-0.02em'
          }}
        >
          Check Our{' '}
          <span className="text-[#1DB954]">Results</span>
        </h2>
      </div>

      {/* Project Selection Area */}
      <div className="relative flex-1 flex items-center justify-center w-full" style={{ minHeight: '450px' }}>
        {getVisibleProjects().map(({ project, index, displayIndex }) => (
          <ProjectCard key={`${project.id}-${displayIndex}`} project={project} index={index} displayIndex={displayIndex} />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
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

      {/* View More Portfolio Button */}
      <div className="absolute bottom-10 right-10">
        <button 
          onClick={() => router.push('/portfolio')}
          className="px-6 py-3 bg-[#1DB954] text-white font-medium rounded-lg hover:bg-[#1ed760] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/30"
        >
          더 많은 포트폴리오 보기
        </button>
      </div>

    </section>
  )
}

export default SmartMinimalismWork