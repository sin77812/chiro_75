'use client'

import { useEffect, useRef, useState } from 'react'

interface TechNode {
  id: string
  name: string
  keyword: string
  icon: string
  gridArea: string
}

interface ProjectData {
  name: string
  status: 'live' | 'offline'
  conversion: number
  duration: string
  loadTime: string
  trend: number[]
}

const SmartMinimalismTech = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrambledTexts, setScrambledTexts] = useState<{[key: string]: string}>({})
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [scrambleStates, setScrambleStates] = useState<{[key: string]: boolean}>({})
  const [lastUpdated, setLastUpdated] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  
  const [projectData, setProjectData] = useState<ProjectData[]>([
    {
      name: 'Project A',
      status: 'live',
      conversion: 312,
      duration: '3:24',
      loadTime: '0.8s',
      trend: [65, 72, 68, 78, 85, 82, 89]
    },
    {
      name: 'Project B', 
      status: 'live',
      conversion: 256,
      duration: '2:45',
      loadTime: '1.2s',
      trend: [58, 61, 67, 72, 69, 75, 78]
    },
    {
      name: 'Project C',
      status: 'live',
      conversion: 428,
      duration: '4:12', 
      loadTime: '0.9s',
      trend: [72, 78, 84, 91, 96, 89, 95]
    }
  ])

  const techNodes: TechNode[] = [
    { id: 'nextjs', name: 'Next.js', keyword: 'SPEED', icon: 'N', gridArea: 'nextjs' },
    { id: 'react', name: 'React', keyword: 'INTERACTIVE', icon: 'R', gridArea: 'react' },
    { id: 'nodejs', name: 'Node.js', keyword: 'POWERFUL', icon: 'N', gridArea: 'nodejs' },
    { id: 'typescript', name: 'TypeScript', keyword: 'STABLE', icon: 'T', gridArea: 'typescript' },
    { id: 'tailwind', name: 'Tailwind', keyword: 'BEAUTIFUL', icon: 'T', gridArea: 'tailwind' },
    { id: 'mongodb', name: 'MongoDB', keyword: 'SCALABLE', icon: 'M', gridArea: 'mongodb' },
    { id: 'vercel', name: 'Vercel', keyword: 'INSTANT', icon: 'V', gridArea: 'vercel' },
    { id: 'framer', name: 'Framer', keyword: 'SMOOTH', icon: 'F', gridArea: 'framer' },
    { id: 'chiro', name: 'CHIRO', keyword: 'WEB\nDESIGN', icon: '', gridArea: 'chiro' }
  ]

  const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  
  // Handle responsive state
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    
    checkResponsive()
    window.addEventListener('resize', checkResponsive)
    return () => window.removeEventListener('resize', checkResponsive)
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

  // Initialize with actual tech names
  useEffect(() => {
    if (isVisible) {
      const initialTexts: {[key: string]: string} = {}
      techNodes.forEach(node => {
        initialTexts[node.id] = node.name
      })
      setScrambledTexts(initialTexts)
    }
  }, [isVisible, techNodes])

  // Update timestamps and project data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(prev => prev + 1)
      
      if (lastUpdated % 5 === 0) {
        setProjectData(prev => prev.map(project => ({
          ...project,
          conversion: project.conversion + Math.floor(Math.random() * 10 - 5),
          duration: generateRandomDuration(),
          loadTime: generateRandomLoadTime()
        })))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lastUpdated])

  const generateScrambledText = (length: number): string => {
    return Array.from({ length }, () => 
      scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
    ).join('')
  }

  const generateRandomDuration = (): string => {
    const minutes = Math.floor(Math.random() * 3) + 2
    const seconds = Math.floor(Math.random() * 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const generateRandomLoadTime = (): string => {
    const time = (Math.random() * 1.5 + 0.5).toFixed(1)
    return `${time}s`
  }

  const handleNodeHover = (nodeId: string, isHovering: boolean) => {
    if (isHovering) {
      if (!scrambleStates[nodeId] && hoveredNode !== nodeId) {
        setHoveredNode(nodeId)
        const node = techNodes.find(n => n.id === nodeId)
        if (node) {
          startScrambleToKeyword(nodeId, node.keyword)
        }
      }
    } else {
      if (!scrambleStates[nodeId]) {
        setHoveredNode(null)
        const node = techNodes.find(n => n.id === nodeId)
        if (node) {
          startScrambleToTechName(nodeId, node.name)
        }
      }
    }
  }

  const startScrambleToKeyword = (nodeId: string, targetKeyword: string) => {
    setScrambleStates(prev => ({ ...prev, [nodeId]: true }))
    
    let scramblePhase = 0
    const scrambleInterval = setInterval(() => {
      setScrambledTexts(prev => ({
        ...prev,
        [nodeId]: generateScrambledText(Math.max(targetKeyword.length, 8))
      }))
      
      scramblePhase++
      if (scramblePhase >= 10) {
        clearInterval(scrambleInterval)
        setScrambledTexts(prev => ({
          ...prev,
          [nodeId]: targetKeyword
        }))
        setScrambleStates(prev => ({ ...prev, [nodeId]: false }))
      }
    }, 50)
  }

  const startScrambleToTechName = (nodeId: string, targetTechName: string) => {
    setScrambleStates(prev => ({ ...prev, [nodeId]: true }))
    
    let scramblePhase = 0
    const scrambleInterval = setInterval(() => {
      setScrambledTexts(prev => ({
        ...prev,
        [nodeId]: generateScrambledText(Math.max(targetTechName.length, 8))
      }))
      
      scramblePhase++
      if (scramblePhase >= 10) {
        clearInterval(scrambleInterval)
        setScrambledTexts(prev => ({
          ...prev,
          [nodeId]: targetTechName
        }))
        setScrambleStates(prev => ({ ...prev, [nodeId]: false }))
      }
    }, 50)
  }

  const TechNode = ({ node }: { node: TechNode }) => {
    const isHovered = hoveredNode === node.id
    const displayText = scrambledTexts[node.id] || node.name
    const isScrambling = displayText.includes('!') || displayText.includes('@') || displayText.includes('#')
    const isChiro = node.id === 'chiro'
    
    // Responsive font size for CHIRO text
    const getChiroFontSize = () => {
      if (isMobile) return 'text-4xl sm:text-5xl'
      if (isTablet) return 'text-6xl'
      return 'text-7xl lg:text-8xl'
    }
    
    return (
      <div
        className={`
          bg-black border-2 border-[#1DB954]/30 rounded-lg sm:rounded-xl 
          p-2 sm:p-3 md:p-4 cursor-pointer transition-all duration-300 
          hover:border-[#1DB954] flex flex-col items-center justify-center text-center
          ${isHovered ? 'border-[#1DB954] scale-105' : ''}
          ${isChiro ? 'col-span-2' : ''}
        `}
        style={{
          gridArea: node.gridArea,
          filter: isHovered ? 'drop-shadow(0 0 20px rgba(29, 185, 84, 0.3))' : 'none'
        }}
        onMouseEnter={() => !isMobile && handleNodeHover(node.id, true)}
        onMouseLeave={() => !isMobile && handleNodeHover(node.id, false)}
        onClick={() => isMobile && handleNodeHover(node.id, !isHovered)}
      >
        {!isChiro && (
          <div className="mb-1 sm:mb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
              <span className="text-[#1DB954] font-bold text-lg sm:text-xl md:text-2xl">
                {node.icon}
              </span>
            </div>
          </div>
        )}
        
        <div 
          className={`
            font-medium transition-all duration-300
            ${isChiro ? `${getChiroFontSize()} font-black` : 'text-[10px] sm:text-xs md:text-sm'}
            ${isHovered ? 'text-[#1DB954]' : 'text-white/70'}
            ${isScrambling ? 'text-white' : ''}
            ${isChiro ? 'font-sans tracking-wider leading-tight text-center' : 'font-mono'}
          `}
          style={{
            whiteSpace: isChiro ? 'pre-line' : 'normal'
          }}
        >
          {displayText}
        </div>
      </div>
    )
  }

  // Get responsive grid configuration
  const getGridConfig = () => {
    if (isMobile) {
      return {
        columns: 'repeat(2, 1fr)',
        rows: 'repeat(auto-fit, minmax(80px, 1fr))',
        areas: `
          "nextjs react"
          "typescript tailwind"
          "chiro chiro"
          "mongodb nodejs"
          "vercel framer"
          "monitor monitor"
          "stats-1 stats-2"
          "stats-3 stats-4"
        `
      }
    }
    
    if (isTablet) {
      return {
        columns: 'repeat(4, 1fr)',
        rows: 'repeat(6, minmax(80px, 1fr))',
        areas: `
          "nextjs nextjs react typescript"
          "chiro chiro tailwind mongodb"
          "chiro chiro nodejs vercel"
          "framer framer framer framer"
          "monitor monitor monitor monitor"
          "stats-1 stats-2 stats-3 stats-4"
        `
      }
    }
    
    return {
      columns: 'repeat(6, 1fr)',
      rows: 'repeat(4, 1fr)',
      areas: `
        "nextjs nextjs react typescript monitor monitor"
        "nextjs nextjs chiro chiro monitor monitor"
        "tailwind mongodb chiro chiro nodejs vercel"
        "framer framer stats-1 stats-2 stats-3 stats-4"
      `
    }
  }

  const gridConfig = getGridConfig()

  return (
    <section 
      ref={sectionRef}
      className="min-h-[80vh] md:min-h-[90vh] relative overflow-hidden bg-gradient-to-br from-black via-[#0A0A0A] to-[#0E1111] px-4 sm:px-6 md:px-8 py-12 md:py-16"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
          <span className="text-[#1DB954]">기술 스택</span> & 실시간 성과
        </h2>
        <p className="text-center text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          최신 기술과 실시간 모니터링으로 최고의 성과를 보장합니다
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="max-w-7xl mx-auto h-full">
        <div 
          className="w-full grid gap-2 sm:gap-3 md:gap-4 lg:gap-6"
          style={{
            gridTemplateColumns: gridConfig.columns,
            gridTemplateRows: gridConfig.rows,
            gridTemplateAreas: gridConfig.areas
          }}
        >
          {/* Tech Stack Nodes */}
          {techNodes.map(node => (
            <TechNode key={node.id} node={node} />
          ))}

          {/* Performance Monitor */}
          <div 
            className="bg-black/40 border border-[#1DB954]/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 backdrop-blur-sm col-span-2 md:col-span-4 lg:col-span-2"
            style={{ gridArea: isMobile || isTablet ? 'monitor' : 'monitor' }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3 pb-1 sm:pb-2 border-b border-[#1DB954]/30">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1DB954] rounded-full animate-pulse"></div>
                <h3 className="text-[#1DB954] font-mono text-[10px] sm:text-xs">실시간 성과 모니터링</h3>
              </div>
              {!isMobile && (
                <div className="text-white/50 text-[10px] sm:text-xs font-mono">
                  {lastUpdated}초 전
                </div>
              )}
            </div>

            {/* Project Rows - Simplified for mobile */}
            {projectData.slice(0, isMobile ? 2 : 3).map((project) => (
              <div 
                key={project.name}
                className="grid grid-cols-4 gap-1 sm:gap-2 py-1 sm:py-2 text-[10px] sm:text-xs"
              >
                <div className="text-white">{project.name}</div>
                <div className="text-[#1DB954]">{project.conversion}%</div>
                <div className="text-white">{project.duration}</div>
                <div className="text-white">{project.loadTime}</div>
              </div>
            ))}
          </div>

          {/* Stats Boxes */}
          <div 
            className="bg-black/40 border border-[#1DB954]/20 rounded-lg p-2 sm:p-3 backdrop-blur-sm flex flex-col justify-center items-center"
            style={{ gridArea: 'stats-1' }}
          >
            <div className="text-sm sm:text-base md:text-lg font-bold text-[#1DB954]">340%</div>
            <div className="text-[8px] sm:text-[10px] text-white/60 text-center">평균 향상</div>
          </div>

          <div 
            className="bg-black/40 border border-[#FFD700]/20 rounded-lg p-2 sm:p-3 backdrop-blur-sm flex flex-col justify-center items-center"
            style={{ gridArea: 'stats-2' }}
          >
            <div className="text-sm sm:text-base md:text-lg font-bold text-[#FFD700]">0.8s</div>
            <div className="text-[8px] sm:text-[10px] text-white/60 text-center">로딩 속도</div>
          </div>

          <div 
            className="bg-black/40 border border-[#00D4FF]/20 rounded-lg p-2 sm:p-3 backdrop-blur-sm flex flex-col justify-center items-center"
            style={{ gridArea: 'stats-3' }}
          >
            <div className="text-sm sm:text-base md:text-lg font-bold text-[#00D4FF]">99.9%</div>
            <div className="text-[8px] sm:text-[10px] text-white/60 text-center">가동률</div>
          </div>

          <div 
            className="bg-black/40 border border-white/20 rounded-lg p-2 sm:p-3 backdrop-blur-sm flex flex-col justify-center items-center"
            style={{ gridArea: 'stats-4' }}
          >
            <div className="text-sm sm:text-base md:text-lg font-bold text-white">24/7</div>
            <div className="text-[8px] sm:text-[10px] text-white/60 text-center">모니터링</div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 md:opacity-50"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(29, 185, 84, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.02) 0%, transparent 50%)
          `
        }}
      />
    </section>
  )
}

export default SmartMinimalismTech