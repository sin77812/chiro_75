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
  const [lastUpdated, setLastUpdated] = useState(0)
  const [projectData, setProjectData] = useState<ProjectData[]>([
    {
      name: 'LIFE PT',
      status: 'live',
      conversion: 312,
      duration: '3:24',
      loadTime: '0.8s',
      trend: [65, 72, 68, 78, 85, 82, 89]
    },
    {
      name: 'NBPKOREA', 
      status: 'live',
      conversion: 256,
      duration: '2:45',
      loadTime: '1.2s',
      trend: [58, 61, 67, 72, 69, 75, 78]
    },
    {
      name: 'GRACE SPEECH',
      status: 'live',
      conversion: 428,
      duration: '4:12', 
      loadTime: '0.9s',
      trend: [72, 78, 84, 91, 96, 89, 95]
    }
  ])

  const techNodes: TechNode[] = [
    { id: 'nextjs', name: 'Next.js', keyword: 'SPEED', icon: '▲', gridArea: 'nextjs' },
    { id: 'react', name: 'React', keyword: 'INTERACTIVE', icon: '⚛', gridArea: 'react' },
    { id: 'nodejs', name: 'Node.js', keyword: 'POWERFUL', icon: '⬢', gridArea: 'nodejs' },
    { id: 'typescript', name: 'TypeScript', keyword: 'STABLE', icon: 'TS', gridArea: 'typescript' },
    { id: 'tailwind', name: 'Tailwind', keyword: 'BEAUTIFUL', icon: '🎨', gridArea: 'tailwind' },
    { id: 'mongodb', name: 'MongoDB', keyword: 'SCALABLE', icon: '🍃', gridArea: 'mongodb' },
    { id: 'vercel', name: 'Vercel', keyword: 'INSTANT', icon: '▲', gridArea: 'vercel' },
    { id: 'framer', name: 'Framer', keyword: 'SMOOTH', icon: 'F', gridArea: 'framer' }
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
      setHoveredNode(nodeId)
      const node = techNodes.find(n => n.id === nodeId)
      if (node) {
        // First scramble, then show keyword
        startScrambleToKeyword(nodeId, node.keyword)
      }
    } else {
      setHoveredNode(null)
      const node = techNodes.find(n => n.id === nodeId)
      if (node) {
        // Scramble back to original tech name
        startScrambleToTechName(nodeId, node.name)
      }
    }
  }

  const startScrambleToKeyword = (nodeId: string, targetKeyword: string) => {
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
      }
    }, 50)
  }

  const startScrambleToTechName = (nodeId: string, targetTechName: string) => {
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
      }
    }, 50)
  }

  const revealText = (nodeId: string, targetText: string) => {
    let iteration = 0
    const revealInterval = setInterval(() => {
      setScrambledTexts(prev => ({
        ...prev,
        [nodeId]: targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return char
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
          })
          .join('')
      }))

      iteration += 1/3

      if (iteration >= targetText.length) {
        clearInterval(revealInterval)
        setScrambledTexts(prev => ({
          ...prev,
          [nodeId]: targetText
        }))
      }
    }, 50)
  }

  const TechNode = ({ node }: { node: TechNode }) => {
    const isHovered = hoveredNode === node.id
    const displayText = scrambledTexts[node.id] || node.name
    const isScrambling = displayText.includes('!') || displayText.includes('@') || displayText.includes('#')
    
    return (
      <div
        className={`
          bg-black border-2 border-[#1DB954]/30 rounded-xl p-4
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
        {/* Icon */}
        <div 
          className={`
            text-2xl mb-2 transition-all duration-300
            ${isHovered ? 'text-[#1DB954]' : 'text-white/70'}
            ${isScrambling ? 'opacity-0' : 'opacity-100'}
          `}
        >
          {node.icon}
        </div>
        
        {/* Text */}
        <div 
          className={`
            font-mono text-sm font-medium transition-all duration-300
            ${isHovered ? 'text-[#1DB954]' : 'text-white/70'}
            ${isScrambling ? 'text-white' : ''}
          `}
        >
          {displayText}
        </div>
      </div>
    )
  }


  return (
    <section 
      ref={sectionRef}
      className="h-[80vh] relative overflow-hidden flex"
    >
      {/* Tech Stack Section - Left 50% */}
      <div className="relative w-1/2 h-full bg-black flex items-center justify-center" style={{ padding: '5vh 5vw' }}>
        <div 
          className="w-full h-full max-w-2xl grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gridTemplateAreas: `
              "nextjs react nodejs typescript"
              "tailwind mongodb vercel framer"
            `
          }}
        >
          {techNodes.map(node => (
            <TechNode key={node.id} node={node} />
          ))}
        </div>
      </div>

      {/* Live Performance Monitor - Right 50% */}
      <div className="relative w-1/2 h-full bg-[#0E1111] flex flex-col justify-center" style={{ padding: '5vh 5vw' }}>
        <div className="max-w-2xl w-full mx-auto">
          {/* Monitor Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1DB954]/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse"></div>
              <h3 className="text-[#1DB954] font-mono text-sm">실시간 성과 모니터링</h3>
            </div>
            <div className="text-white/50 text-xs font-mono">
              Last Updated: {lastUpdated}초 전
            </div>
          </div>

          {/* Monitor Display */}
          <div className="border border-[#1DB954]/20 bg-black/30 p-4 font-mono text-sm backdrop-blur-sm">
            {/* Header Row */}
            <div className="grid grid-cols-5 gap-2 pb-2 mb-3 border-b border-[#1DB954]/20 text-white/70 text-xs">
              <div>프로젝트</div>
              <div>상태</div>
              <div>전환율</div>
              <div>체류시간</div>
              <div>로딩속도</div>
            </div>

            {/* Project Rows */}
            {projectData.map((project, index) => (
              <div 
                key={project.name}
                className="grid grid-cols-5 gap-2 py-2 hover:bg-[#1DB954]/10 transition-colors duration-200 cursor-pointer text-sm"
              >
                <div className="text-white">{project.name}</div>
                <div className="flex items-center space-x-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'live' ? 'bg-[#1DB954] animate-pulse' : 'bg-red-500'}`}></div>
                  <span className={`text-xs ${project.status === 'live' ? 'text-[#1DB954]' : 'text-red-400'}`}>
                    {project.status === 'live' ? 'Live' : 'Offline'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-[#1DB954]">
                  <span>↑</span>
                  <span className="tabular-nums text-xs">{project.conversion}%</span>
                </div>
                <div className="text-white tabular-nums text-xs">{project.duration}</div>
                <div className="text-white tabular-nums text-xs">{project.loadTime}</div>
              </div>
            ))}

            {/* Summary Row */}
            <div className="mt-4 pt-3 border-t border-[#1DB954]/20 text-white/80">
              <div className="flex justify-between items-center text-xs">
                <div>
                  평균: <span className="text-[#1DB954]">↑ {Math.floor(projectData.reduce((acc, p) => acc + p.conversion, 0) / projectData.length)}%</span>
                  {' | '}
                  <span className="tabular-nums">3:27</span>
                  {' | '}
                  <span className="tabular-nums">0.96s</span>
                </div>
                <div>
                  이번 주 최고 기록: <span className="text-[#1DB954]">GRACE SPEECH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(29, 185, 84, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(29, 185, 84, 0.02) 0%, transparent 50%)
          `
        }}
      />
    </section>
  )
}

export default SmartMinimalismTech