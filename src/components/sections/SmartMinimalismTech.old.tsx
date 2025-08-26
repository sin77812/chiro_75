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
  const [scrambleStates, setScrambleStates] = useState<{[key: string]: boolean}>({}) // Track if currently scrambling
  const [lastUpdated, setLastUpdated] = useState(0)
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
        initialTexts[node.id] = node.name // Show actual tech names initially
      })
      setScrambledTexts(initialTexts)
    }
  }, [isVisible])

  // Update timestamps and project data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(prev => prev + 1)
      
      // Update project data every 5 seconds
      if (lastUpdated % 5 === 0) {
        setProjectData(prev => prev.map(project => ({
          ...project,
          conversion: project.conversion + Math.floor(Math.random() * 10 - 5), // ±5% variance
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
    const minutes = Math.floor(Math.random() * 3) + 2 // 2-4 minutes
    const seconds = Math.floor(Math.random() * 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const generateRandomLoadTime = (): string => {
    const time = (Math.random() * 1.5 + 0.5).toFixed(1) // 0.5-2.0s
    return `${time}s`
  }

  const handleNodeHover = (nodeId: string, isHovering: boolean) => {
    if (isHovering) {
      // Only trigger if not already scrambling and not already hovered
      if (!scrambleStates[nodeId] && hoveredNode !== nodeId) {
        setHoveredNode(nodeId)
        const node = techNodes.find(n => n.id === nodeId)
        if (node) {
          startScrambleToKeyword(nodeId, node.keyword)
        }
      }
    } else {
      // Only trigger if not currently scrambling
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
    // Mark as scrambling
    setScrambleStates(prev => ({ ...prev, [nodeId]: true }))
    
    // First phase: scramble for 500ms
    let scramblePhase = 0
    const scrambleInterval = setInterval(() => {
      setScrambledTexts(prev => ({
        ...prev,
        [nodeId]: generateScrambledText(Math.max(targetKeyword.length, 8))
      }))
      
      scramblePhase++
      if (scramblePhase >= 10) { // 500ms of scrambling
        clearInterval(scrambleInterval)
        // Second phase: reveal keyword instantly
        setScrambledTexts(prev => ({
          ...prev,
          [nodeId]: targetKeyword
        }))
        // Mark as not scrambling
        setScrambleStates(prev => ({ ...prev, [nodeId]: false }))
      }
    }, 50)
  }

  const startScrambleToTechName = (nodeId: string, targetTechName: string) => {
    // Mark as scrambling
    setScrambleStates(prev => ({ ...prev, [nodeId]: true }))
    
    // First phase: scramble for 500ms
    let scramblePhase = 0
    const scrambleInterval = setInterval(() => {
      setScrambledTexts(prev => ({
        ...prev,
        [nodeId]: generateScrambledText(Math.max(targetTechName.length, 8))
      }))
      
      scramblePhase++
      if (scramblePhase >= 10) { // 500ms of scrambling
        clearInterval(scrambleInterval)
        // Second phase: reveal tech name instantly
        setScrambledTexts(prev => ({
          ...prev,
          [nodeId]: targetTechName
        }))
        // Mark as not scrambling
        setScrambleStates(prev => ({ ...prev, [nodeId]: false }))
      }
    }, 50)
  }

  const renderTechIcon = (nodeId: string, isHovered: boolean, isScrambling: boolean) => {
    const iconProps = {
      width: 28,
      height: 28,
      className: `transition-all duration-300 ${isScrambling ? 'opacity-0' : 'opacity-100'}`,
      style: {
        filter: isHovered ? 'drop-shadow(0 2px 8px rgba(29, 185, 84, 0.4))' : 'none'
      }
    }

    switch (nodeId) {
      case 'nextjs':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#000" />
            <path d="M18.665 20.5c-.176 0-.326-.087-.326-.262V7.74c0-.175.15-.262.326-.262h.998c.175 0 .326.087.326.262v12.498c0 .175-.151.262-.326.262h-.998z" fill="#1DB954" />
            <path d="M10 7.74c0-.175.15-.262.326-.262h8.339c.175 0 .326.087.326.262v.998c0 .175-.151.262-.326.262h-8.339c-.176 0-.326-.087-.326-.262V7.74z" fill="#1DB954" />
          </svg>
        )
      case 'react':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1.05-.84 1.89-1.87 1.89s-1.87-.84-1.87-1.89c0-1.05.84-1.89 1.87-1.89z" fill="#1DB954" />
            <path d="M7.37 16.43c-.63-.13-1.22-.3-1.73-.5-2.34-.9-3.86-2.4-3.86-4.28 0-1.88 1.52-3.38 3.86-4.28.51-.2 1.1-.37 1.73-.5.16-.03.33-.05.5-.07.06-.01.12-.01.18-.02.07-.01.14-.01.21-.01.07 0 .14 0 .21.01.06.01.12.01.18.02.17.02.34.04.5.07z" stroke="#1DB954" strokeWidth="1.2" fill="none" />
            <path d="M16.63 16.43c.63-.13 1.22-.3 1.73-.5 2.34-.9 3.86-2.4 3.86-4.28 0-1.88-1.52-3.38-3.86-4.28-.51-.2-1.1-.37-1.73-.5-.16-.03-.33-.05-.5-.07-.06-.01-.12-.01-.18-.02-.07-.01-.14-.01-.21-.01-.07 0-.14 0-.21.01-.06.01-.12.01-.18.02-.17.02-.34.04-.5.07z" stroke="#1DB954" strokeWidth="1.2" fill="none" />
          </svg>
        )
      case 'nodejs':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <path d="M12 1.85c-.27 0-.55.07-.78.2L3.44 6.86c-.5.28-.81.8-.81 1.36v7.56c0 .56.31 1.08.81 1.36l7.78 4.81c.23.13.51.2.78.2.27 0 .55-.07.78-.2l7.78-4.81c.5-.28.81-.8.81-1.36V8.22c0-.56-.31-1.08-.81-1.36L12.78 2.05c-.23-.13-.51-.2-.78-.2z" fill="#1DB954" stroke="#000" strokeWidth="1.2" />
            <path d="M12 22.05c-.32 0-.64-.08-.93-.24l-2.98-1.76c-.44-.25-.22-.33-.08-.38.58-.2.69-.25 1.31-.6.06-.04.15-.02.22.02l2.29 1.35c.08.05.2.05.28 0l8.93-5.15c.08-.05.14-.14.14-.24V8.49c0-.1-.05-.19-.14-.24L11.06 3.1c-.08-.05-.2-.05-.28 0L1.85 8.25c-.08.05-.14.15-.14.24v10.31c0 .1.05.19.14.24l2.44 1.41c1.32.66 2.13-.12 2.13-0.9V9.49c0-.13.11-.24.24-.24h1.06c.13 0 .24.11.24.24v10.06c0 1.75-.95 2.75-2.61 2.75-.51 0-.91 0-2.03-.55L1.05 20.3C.4 19.92 0 19.22 0 18.46V8.15c0-.76.4-1.46 1.05-1.84L9.98 1.46c.63-.35 1.47-.35 2.1 0l8.93 5.15c.65.38 1.05 1.08 1.05 1.84v10.31c0 .76-.4 1.46-1.05 1.84l-8.93 5.15c-.29.16-.61.24-.93.24z" fill="#000" />
          </svg>
        )
      case 'typescript':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#1DB954" stroke="#000" strokeWidth="1.2" />
            <path d="M9.5 8.5v12M6 8.5h7M15 8.5v3.5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5V8.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'tailwind':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#1DB954" />
          </svg>
        )
      case 'mongodb':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A74.251 74.251 0 0111.91 20.9c.075.204.274.357.35.515.264-3.342.259-6.138 2.32-6.738.525-.153 1.049-.277 1.568-.46-.725-.49-1.355-1.08-1.955-1.662z" fill="#1DB954" />
            <path d="M11.91 20.9s.881.83 1.292 1.75c.05-.095.1-.19.145-.285-.42-.925-1.437-1.465-1.437-1.465z" fill="#1DB954" />
          </svg>
        )
      case 'vercel':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 19.77h20L12 2z" fill="#1DB954" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        )
      case 'framer':
        return (
          <svg {...iconProps} viewBox="0 0 24 24" fill="none">
            <path d="M6 2v6h6L6 14v8l6-6h6V8h-6l6-6H6z" fill="#1DB954" />
          </svg>
        )
      default:
        return null
    }
  }

  const TechNode = ({ node }: { node: TechNode }) => {
    const isHovered = hoveredNode === node.id
    const displayText = scrambledTexts[node.id] || node.name
    const isScrambling = displayText.includes('!') || displayText.includes('@') || displayText.includes('#')
    const isChiro = node.id === 'chiro'
    
    return (
      <div
        className={`
          bg-black border-2 border-[#1DB954]/30 rounded-xl p-3
          cursor-pointer transition-all duration-300 hover:border-[#1DB954]
          flex flex-col items-center justify-center text-center
          ${isHovered ? 'border-[#1DB954] scale-105' : ''}
        `}
        style={{
          gridArea: node.gridArea,
          filter: isHovered ? 'drop-shadow(0 0 20px rgba(29, 185, 84, 0.3))' : 'none'
        }}
        onMouseEnter={() => handleNodeHover(node.id, true)}
        onMouseLeave={() => handleNodeHover(node.id, false)}
      >
        {/* Custom SVG Icons for tech nodes */}
        {!isChiro && (
          <div className="mb-2">
            {renderTechIcon(node.id, isHovered, isScrambling)}
          </div>
        )}
        
        {/* Text */}
        <div 
          className={`
            font-medium transition-all duration-300
            ${isChiro ? 'text-8xl font-black' : 'text-xs'}
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

  return (
    <section 
      ref={sectionRef}
      className="h-[90vh] relative overflow-hidden bg-gradient-to-br from-black via-[#0A0A0A] to-[#0E1111]"
      style={{ padding: '8vh 6vw' }}
    >
      {/* Unified Bento Box Layout */}
      <div 
        className="w-full h-full grid gap-6"
        style={{
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          gridTemplateAreas: `
            "nextjs nextjs react typescript monitor-1 monitor-1"
            "nextjs nextjs chiro chiro monitor-1 monitor-1"
            "tailwind mongodb chiro chiro nodejs vercel"
            "framer framer stats-1 stats-2 stats-3 stats-4"
          `
        }}
      >
        {/* Tech Stack Nodes with Scramble Effects */}
        <TechNode key="nextjs" node={techNodes.find(n => n.id === 'nextjs')!} />
        <TechNode key="react" node={techNodes.find(n => n.id === 'react')!} />
        <TechNode key="typescript" node={techNodes.find(n => n.id === 'typescript')!} />
        <TechNode key="chiro" node={techNodes.find(n => n.id === 'chiro')!} />
        <TechNode key="tailwind" node={techNodes.find(n => n.id === 'tailwind')!} />
        <TechNode key="mongodb" node={techNodes.find(n => n.id === 'mongodb')!} />
        <TechNode key="nodejs" node={techNodes.find(n => n.id === 'nodejs')!} />
        <TechNode key="vercel" node={techNodes.find(n => n.id === 'vercel')!} />
        <TechNode key="framer" node={techNodes.find(n => n.id === 'framer')!} />

        {/* Comprehensive Performance Monitor - Combined */}
        <div 
          className="bg-black/40 border border-[#1DB954]/20 rounded-xl p-3 backdrop-blur-sm"
          style={{ gridArea: 'monitor-1' }}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1DB954]/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse"></div>
              <h3 className="text-[#1DB954] font-mono text-xs">실시간 성과 모니터링</h3>
            </div>
            <div className="text-white/50 text-xs font-mono">
              Last Updated: {lastUpdated}초 전
            </div>
          </div>

          {/* Header Row */}
          <div className="grid grid-cols-4 gap-2 pb-2 mb-2 border-b border-[#1DB954]/20 text-white/70 text-xs">
            <div>프로젝트</div>
            <div>전환율</div>
            <div>체류시간</div>
            <div>로딩속도</div>
          </div>

          {/* Project Rows */}
          {projectData.map((project, index) => (
            <div 
              key={project.name}
              className="grid grid-cols-4 gap-2 py-2 hover:bg-[#1DB954]/10 transition-colors duration-200 cursor-pointer text-xs"
            >
              <div className="flex items-center space-x-1">
                <div className={`w-1 h-1 rounded-full ${project.status === 'live' ? 'bg-[#1DB954] animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-white">{project.name}</span>
              </div>
              <div className="flex items-center space-x-1 text-[#1DB954]">
                <span>↑</span>
                <span className="tabular-nums">{project.conversion}%</span>
              </div>
              <div className="text-white tabular-nums">{project.duration}</div>
              <div className="text-white tabular-nums">{project.loadTime}</div>
            </div>
          ))}

          {/* Summary */}
          <div className="mt-3 pt-2 border-t border-[#1DB954]/20 text-white/80">
            <div className="text-xs">
              <span className="text-[#1DB954]">평균 ↑ {Math.floor(projectData.reduce((acc, p) => acc + p.conversion, 0) / projectData.length)}%</span>
              <span className="text-white/50 ml-2">최고: Project C</span>
            </div>
          </div>
        </div>

        {/* Stats Boxes */}
        <div 
          className="bg-black/40 border border-[#1DB954]/20 rounded-xl p-3 backdrop-blur-sm flex flex-col justify-center items-center"
          style={{ gridArea: 'stats-1' }}
        >
          <div className="text-lg font-bold text-[#1DB954] mb-1">340%</div>
          <div className="text-[10px] text-white/60 text-center">평균 성과 향상</div>
        </div>

        <div 
          className="bg-black/40 border border-[#FFD700]/20 rounded-xl p-3 backdrop-blur-sm flex flex-col justify-center items-center"
          style={{ gridArea: 'stats-2' }}
        >
          <div className="text-lg font-bold text-[#FFD700] mb-1">0.8s</div>
          <div className="text-[10px] text-white/60 text-center">평균 로딩 속도</div>
        </div>

        <div 
          className="bg-black/40 border border-[#00D4FF]/20 rounded-xl p-3 backdrop-blur-sm flex flex-col justify-center items-center"
          style={{ gridArea: 'stats-3' }}
        >
          <div className="text-lg font-bold text-[#00D4FF] mb-1">99.9%</div>
          <div className="text-[10px] text-white/60 text-center">시스템 가동률</div>
        </div>

        <div 
          className="bg-black/40 border border-white/20 rounded-xl p-3 backdrop-blur-sm flex flex-col justify-center items-center"
          style={{ gridArea: 'stats-4' }}
        >
          <div className="text-lg font-bold text-white mb-1">24/7</div>
          <div className="text-[10px] text-white/60 text-center">실시간 모니터링</div>
        </div>
      </div>

      {/* Background Effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
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