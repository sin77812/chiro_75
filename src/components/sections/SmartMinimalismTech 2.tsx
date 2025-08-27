'use client'

import { useEffect, useRef, useState } from 'react'

interface TechNode {
  id: string
  name: string
  keyword: string
  x: number
  y: number
  connections: string[]
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
    { id: 'nextjs', name: 'Next.js', keyword: 'SPEED', x: 50, y: 20, connections: ['react', 'typescript', 'vercel'] },
    { id: 'react', name: 'React', keyword: 'INTERACTIVE', x: 25, y: 40, connections: ['nextjs', 'tailwind', 'chiro'] },
    { id: 'nodejs', name: 'Node.js', keyword: 'POWERFUL', x: 75, y: 40, connections: ['nextjs', 'mongodb', 'chiro'] },
    { id: 'tailwind', name: 'Tailwind', keyword: 'BEAUTIFUL', x: 15, y: 65, connections: ['react', 'vercel', 'chiro'] },
    { id: 'typescript', name: 'TypeScript', keyword: 'STABLE', x: 85, y: 65, connections: ['nextjs', 'nodejs', 'chiro'] },
    { id: 'mongodb', name: 'MongoDB', keyword: 'SCALABLE', x: 65, y: 80, connections: ['nodejs', 'framer', 'chiro'] },
    { id: 'vercel', name: 'Vercel', keyword: 'INSTANT', x: 35, y: 80, connections: ['tailwind', 'framer', 'chiro'] },
    { id: 'framer', name: 'Framer', keyword: 'SMOOTH', x: 50, y: 90, connections: ['vercel', 'mongodb', 'chiro'] },
    { id: 'chiro', name: 'CHIRO', keyword: 'REVOLUTION', x: 50, y: 55, connections: ['react', 'nodejs', 'tailwind', 'typescript', 'mongodb', 'vercel', 'framer'] }
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

  // Initialize scrambled texts
  useEffect(() => {
    if (isVisible) {
      const initialScrambled: {[key: string]: string} = {}
      techNodes.forEach(node => {
        initialScrambled[node.id] = generateScrambledText(node.name.length)
      })
      setScrambledTexts(initialScrambled)
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
        startScrambleEffect(nodeId, node.keyword)
      }
    } else {
      setHoveredNode(null)
      const node = techNodes.find(n => n.id === nodeId)
      if (node) {
        setScrambledTexts(prev => ({
          ...prev,
          [nodeId]: generateScrambledText(node.name.length)
        }))
      }
    }
  }

  const startScrambleEffect = (nodeId: string, targetText: string) => {
    let iteration = 0
    const totalIterations = 10

    const scrambleInterval = setInterval(() => {
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
        clearInterval(scrambleInterval)
        setScrambledTexts(prev => ({
          ...prev,
          [nodeId]: targetText
        }))
      }
    }, 50)
  }

  const TechNode = ({ node }: { node: TechNode }) => {
    const isHovered = hoveredNode === node.id
    const isConnected = hoveredNode ? node.connections.includes(hoveredNode) : false
    
    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
        style={{
          left: `${node.x}%`,
          top: `${node.y}%`,
        }}
        onMouseEnter={() => handleNodeHover(node.id, true)}
        onMouseLeave={() => handleNodeHover(node.id, false)}
      >
        <div 
          className={`
            w-20 h-20 border border-[#1DB954]/30 bg-black/50 
            flex items-center justify-center text-xs font-mono
            transition-all duration-300 backdrop-blur-sm
            ${isHovered ? 'border-[#1DB954] text-[#1DB954] scale-110' : 'text-white/30'}
            ${isConnected ? 'border-[#1DB954]/60 text-white/60' : ''}
            ${node.id === 'chiro' ? 'w-24 h-24 border-2' : ''}
          `}
          style={{
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            filter: isHovered ? 'drop-shadow(0 0 20px rgba(29, 185, 84, 0.4))' : 'none'
          }}
        >
          <span className="text-center px-1 leading-tight">
            {scrambledTexts[node.id] || node.name}
          </span>
        </div>
      </div>
    )
  }

  const ConnectionLines = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {techNodes.flatMap(node => 
        node.connections.map(connectionId => {
          const connectedNode = techNodes.find(n => n.id === connectionId)
          if (!connectedNode) return null
          
          const isActive = hoveredNode === node.id || hoveredNode === connectionId
          
          return (
            <line
              key={`${node.id}-${connectionId}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${connectedNode.x}%`}
              y2={`${connectedNode.y}%`}
              stroke={isActive ? '#1DB954' : 'rgba(29, 185, 84, 0.1)'}
              strokeWidth={isActive ? '2' : '1'}
              className={`transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
            />
          )
        })
      )}
    </svg>
  )

  return (
    <section 
      ref={sectionRef}
      className="h-[60vh] relative overflow-hidden"
    >
      {/* Tech Stack Section - Upper 30vh */}
      <div className="relative h-[30vh] bg-black flex items-center justify-center" style={{ padding: '5vh 10vw' }}>
        <div className="relative w-full h-full max-w-4xl">
          <ConnectionLines />
          {techNodes.map(node => (
            <TechNode key={node.id} node={node} />
          ))}
        </div>
      </div>

      {/* Live Performance Monitor - Lower 30vh */}
      <div className="relative h-[30vh] bg-[#0E1111] flex flex-col justify-center" style={{ padding: '5vh 10vw' }}>
        <div className="max-w-4xl w-full mx-auto">
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
            <div className="grid grid-cols-5 gap-4 pb-2 mb-3 border-b border-[#1DB954]/20 text-white/70 text-xs">
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
                className="grid grid-cols-5 gap-4 py-2 hover:bg-[#1DB954]/10 transition-colors duration-200 cursor-pointer"
              >
                <div className="text-white">{project.name}</div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${project.status === 'live' ? 'bg-[#1DB954] animate-pulse' : 'bg-red-500'}`}></div>
                  <span className={project.status === 'live' ? 'text-[#1DB954]' : 'text-red-400'}>
                    {project.status === 'live' ? 'Live' : 'Offline'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-[#1DB954]">
                  <span>↑</span>
                  <span className="tabular-nums">{project.conversion}%</span>
                </div>
                <div className="text-white tabular-nums">{project.duration}</div>
                <div className="text-white tabular-nums">{project.loadTime}</div>
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