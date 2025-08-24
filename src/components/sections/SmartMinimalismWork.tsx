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
  const [selectedIndex, setSelectedIndex] = useState(1) // Center project starts as selected
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const projects: Project[] = [
    {
      id: 1,
      title: "FINTECH",
      category: "금융 서비스",
      description: "결제 시스템 혁신으로 사용자 경험 340% 향상",
      results: "+340% 전환율",
      image: "/api/placeholder/400/500",
      color: "#FFD700",
      url: "/case/fintech-payment-system"
    },
    {
      id: 2,
      title: "E-COMMERCE",
      category: "전자상거래", 
      description: "AI 추천 시스템으로 매출 280% 증가 달성",
      results: "+280% 매출",
      image: "/api/placeholder/400/500",
      color: "#1DB954",
      url: "/case/ecommerce-ai-system"
    },
    {
      id: 3,
      title: "HEALTHCARE",
      category: "헬스케어",
      description: "환자 관리 시스템으로 운영 효율성 95% 개선", 
      results: "+95% 효율",
      image: "/api/placeholder/400/500",
      color: "#00D4FF",
      url: "/case/healthcare-management"
    }
  ]

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
    }, 700)
  }

  const getProjectStyle = (index: number) => {
    const isSelected = index === selectedIndex
    const offset = index - selectedIndex
    
    if (isSelected) {
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
    
    const rotateY = offset > 0 ? -25 : 25
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

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const isSelected = index === selectedIndex
    const cardRef = useRef<HTMLDivElement>(null)
    
    return (
      <div
        ref={cardRef}
        className={`
          absolute cursor-pointer
          transition-all duration-700 ease-out
          ${isSelected ? 'transform-gpu' : ''}
        `}
        style={{
          width: '28vw', 
          height: '21vw', // 4:3 ratio (28vw * 3/4 = 21vw)
          filter: getProjectStyle(index).filter,
          opacity: getProjectStyle(index).opacity,
          zIndex: getProjectStyle(index).zIndex,
          left: `calc(50% + ${(index - selectedIndex) * 30}vw)`,
          top: '50%',
          transform: `translate(-50%, -50%) ${getProjectStyle(index).perspectiveTransform}`,
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
          {/* Project Image Placeholder */}
          <div 
            className="absolute inset-0"
            style={{
              background: '#000000'
            }}
          />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="text-white/60 text-base mb-3">
              {project.category}
            </div>
            <h3 
              className="font-bold mb-4 transition-all duration-500"
              style={{
                fontSize: isSelected ? '2.2rem' : '1.8rem',
                color: isSelected ? project.color : '#ffffff',
                lineHeight: '1.2'
              }}
            >
              {project.title}
            </h3>
            <p className={`text-white/80 text-base leading-relaxed mb-6 transition-all duration-500 ${
              isSelected ? 'opacity-100' : 'opacity-70'
            }`}>
              {project.description}
            </p>
            
            {/* Results Badge */}
            <div 
              className={`
                inline-block px-6 py-3 rounded-full text-base font-medium
                transition-all duration-500
                ${isSelected ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}
              `}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#1DB954',
                border: '1px solid rgba(29,185,84,0.3)'
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
          Choose Your{' '}
          <span className="text-[#1DB954]">Project</span>
        </h2>
        <p className="text-white/60 mt-4 text-lg">
          스타터를 선택하듯, 프로젝트를 선택하세요
        </p>
      </div>

      {/* Project Selection Area */}
      <div className="relative flex-1 flex items-center justify-center w-full" style={{ minHeight: '450px' }}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
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

      {/* Instructions */}
      <div className="absolute bottom-10 right-10 text-white/40 text-sm">
        {selectedIndex !== null ? '다시 클릭하여 자세히 보기' : '클릭하여 프로젝트 선택'}
      </div>

    </section>
  )
}

export default SmartMinimalismWork