'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, CheckCircle, X } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SceneProps {
  children: React.ReactNode
  id: string
  className?: string
}

const Scene = ({ children, id, className = '' }: SceneProps) => (
  <div 
    id={id}
    className={`min-h-screen flex items-center justify-center relative ${className}`}
  >
    {children}
  </div>
)

export default function StorytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [currentProject, setCurrentProject] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    // Mouse tracking for Scene 1 title interaction
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Scene transition triggers
    if (typeof window !== 'undefined' && containerRef.current) {
      const scenes = containerRef.current.querySelectorAll('[data-scene]')
      
      scenes.forEach((scene, index) => {
        if (index === 4) {
          // Scene 5 (Portfolio) - Horizontal Scroll
          ScrollTrigger.create({
            trigger: scene,
            start: 'top top',
            end: '+=400%', // 4 projects worth of scroll
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress
              const projectIndex = Math.floor(progress * 4)
              setCurrentProject(Math.min(projectIndex, 3))
              
              if (portfolioRef.current) {
                const slider = portfolioRef.current.querySelector('#portfolio-slider')
                if (slider) {
                  gsap.to(slider, {
                    x: -progress * 300 + '%',
                    duration: 0.3,
                    ease: 'power2.out'
                  })
                }
              }
            },
            onEnter: () => setCurrentScene(index),
            onEnterBack: () => setCurrentScene(index),
          })
        } else {
          // Regular vertical scroll scenes
          ScrollTrigger.create({
            trigger: scene,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setCurrentScene(index),
            onEnterBack: () => setCurrentScene(index),
          })
        }
      })
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (currentScene === 4) { // Portfolio scene
      if (isLeftSwipe && currentProject < 3) {
        // Swipe left - next project
        const newProject = currentProject + 1
        setCurrentProject(newProject)
        updatePortfolioPosition(newProject / 3)
      }
      if (isRightSwipe && currentProject > 0) {
        // Swipe right - previous project
        const newProject = currentProject - 1
        setCurrentProject(newProject)
        updatePortfolioPosition(newProject / 3)
      }
    }
  }

  const updatePortfolioPosition = (progress: number) => {
    if (portfolioRef.current) {
      const slider = portfolioRef.current.querySelector('#portfolio-slider')
      if (slider) {
        gsap.to(slider, {
          x: -progress * 300 + '%',
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    }
  }

  // Scene 1: CHIRO Title with mouse interaction
  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.8,
        ease: 'power2.out'
      })
    }
  }, [mousePosition])

  return (
    <div ref={containerRef} className="relative">
      {/* Background Video - Always present */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/image/backgroundvod.mp4" type="video/mp4" />
        </video>
        
        {/* Dynamic overlay based on current scene */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${
            currentScene === 0 ? 'bg-black/20' :
            currentScene === 1 || currentScene === 2 ? 'bg-black/70' :
            currentScene === 3 || currentScene === 4 ? 'bg-black/30' :
            currentScene === 5 ? 'bg-black/50' :
            'bg-black/40'
          }`} 
        />
      </div>

      {/* Scene 1: "첫 만남" - Hero */}
      <Scene id="scene-1" className="z-10 relative">
        <div data-scene="0" className="text-center">
          <div 
            ref={titleRef}
            className="font-pretendard font-black text-white leading-none cursor-none text-[15vw] sm:text-[20vw]"
          >
            CHIRO
          </div>
          
          {/* Scroll hint */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/60 text-sm animate-bounce">
            Scroll to explore
          </div>
        </div>
      </Scene>

      {/* Scene 2: "호기심 유발" - The Problem */}
      <Scene id="scene-2" className="z-10 relative bg-black/80">
        <div data-scene="1" className="text-center max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            <h2 className="font-pretendard font-bold text-3xl sm:text-5xl md:text-7xl text-white leading-tight px-4">
              당신의 웹사이트,
              <br />
              <span className="text-red-400">정말 일하고 있나요?</span>
            </h2>
            
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black text-red-400 mb-4">
                95%
              </div>
              <p className="text-xl md:text-2xl text-white/80">
                방문자의 95%가 3초 안에 이탈합니다
              </p>
            </div>
          </div>
        </div>
      </Scene>

      {/* Scene 3: "공감대 형성" - The Pain */}
      <Scene id="scene-3" className="z-10 relative bg-black/80">
        <div data-scene="2" className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: '비싼 에이전시', desc: '수천만원 견적에 몇 개월 대기' },
              { title: '느린 프리랜서', desc: '연락도 안되고 품질도 불안' },
              { title: '복잡한 프로세스', desc: '회의만 몇 번, 결과는 기대 이하' }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4 md:space-y-6">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                  <X className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-white/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* Scene 4: "해결책 제시" - The Solution */}
      <Scene id="scene-4" className="z-10 relative bg-gradient-to-br from-background-primary/90 to-background-secondary/90">
        <div data-scene="3" className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-3xl sm:text-5xl md:text-7xl text-white mb-8">
              CHIRO = 
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                title: '에이전시 퀄리티', 
                desc: '업계 최고 수준의 전문성',
                color: 'from-primary to-blue-500'
              },
              { 
                title: '프리랜서 가격', 
                desc: '합리적이고 투명한 비용',
                color: 'from-accent-green to-green-500'
              },
              { 
                title: '2주 완성', 
                desc: '빠르고 확실한 납기',
                color: 'from-accent-yellow to-orange-500'
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4 md:space-y-6">
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center`}>
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-white/80">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* Scene 5: "증명" - Portfolio */}
      <Scene id="scene-5" className="z-10 relative">
        <div data-scene="4" className="w-full h-screen flex flex-col">
          <div className="text-center mb-8 md:mb-16 flex-shrink-0">
            <h2 className="font-pretendard font-bold text-3xl sm:text-5xl md:text-7xl text-white">
              <span className="text-gradient">진짜 잘하나?</span>
            </h2>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div 
            ref={portfolioRef}
            id="portfolio-scroll-container"
            className="flex-1 relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              id="portfolio-slider"
              className="flex h-full items-center gap-8 transition-transform duration-300 ease-out"
              style={{ width: 'calc(100vw * 4)' }}
            >
              {/* Portfolio Items */}
              {[
                {
                  title: "넥서스 제조업 포털",
                  client: "Nexus Manufacturing",
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
                  results: ["해외 문의 +320%", "리드 생성 +187%", "LCP 1.6s"],
                  category: "제조업 B2B"
                },
                {
                  title: "코리텍 솔루션즈",
                  client: "KoreTech Solutions", 
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
                  results: ["사용자 증가 +250%", "전환율 +180%", "로딩속도 40% 개선"],
                  category: "SaaS 플랫폼"
                },
                {
                  title: "글로벌 스타트업 플랫폼",
                  client: "StartupHub Global",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                  results: ["투자 유치 +400%", "글로벌 진출", "MVP 2주 완성"],
                  category: "스타트업 투자"
                },
                {
                  title: "AI 의료 진단 시스템",
                  client: "MedTech Innovations",
                  image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
                  results: ["진단 정확도 +95%", "의료진 만족도 98%", "FDA 승인"],
                  category: "의료 AI"
                }
              ].map((project, index) => (
                <div 
                  key={index}
                  className="w-screen h-full flex items-center justify-center px-4 md:px-16 flex-shrink-0"
                >
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center h-full">
                    {/* Project Image */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-2xl transform rotate-3 group-hover:rotate-1 transition-transform duration-500"></div>
                      <div className="relative">
                        <div 
                          className="w-full h-64 md:h-80 bg-cover bg-center rounded-2xl border border-primary/30 group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-primary text-sm font-medium">{project.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="space-y-6 text-center md:text-left">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-xl text-primary font-medium">
                          {project.client}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-xl font-semibold text-white mb-4">핵심 성과</h4>
                        {project.results.map((result, idx) => (
                          <div key={idx} className="flex items-center justify-center md:justify-start">
                            <div className="w-2 h-2 bg-accent-green rounded-full mr-3"></div>
                            <span className="text-lg text-white/80">{result}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6">
                        <button className="inline-flex items-center px-6 py-3 bg-primary/20 border border-primary rounded-lg text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300">
                          케이스 스터디 보기
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Scroll Indicator */}
          <div className="flex-shrink-0 flex justify-center items-center space-x-2 pb-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentProject ? 'w-8 bg-primary' : 'w-2 bg-white/30'
                }`}
              />
            ))}
            <div className="ml-4 text-white/60 text-sm">
              스크롤하여 프로젝트 보기
            </div>
          </div>
        </div>
      </Scene>

      {/* Scene 6: "신뢰 구축" - Trust */}
      <Scene id="scene-6" className="z-10 relative bg-blue-900/80">
        <div data-scene="5" className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-pretendard font-bold text-3xl sm:text-5xl md:text-7xl text-white mb-12 md:mb-16">
            <span className="text-gradient">믿을 만한가?</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            {[
              { number: '100%', label: '만족도', desc: '고객 만족 보장' },
              { number: '2주', label: '평균 납기', desc: '빠른 프로젝트 완성' },
              { number: '50%', label: '비용 절감', desc: '합리적인 가격 정책' }
            ].map((stat, index) => (
              <div key={index} className="space-y-4">
                <div className="text-6xl md:text-8xl font-black text-primary">
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-white">
                  {stat.label}
                </div>
                <div className="text-white/70">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
          
          <blockquote className="text-2xl md:text-3xl text-white/90 italic border-l-4 border-primary pl-8 max-w-3xl mx-auto">
            "2주만에 이런 퀄리티가? 진짜 만족합니다!"
            <footer className="text-white/60 text-lg mt-4 not-italic">
              - 실제 고객 후기
            </footer>
          </blockquote>
        </div>
      </Scene>

      {/* Scene 7: "행동 유도" - CTA */}
      <Scene id="scene-7" className="z-10 relative bg-gradient-to-br from-primary/90 to-accent-green/90">
        <div data-scene="6" className="text-center max-w-4xl mx-auto px-4">
          <h2 className="font-pretendard font-bold text-4xl sm:text-6xl md:text-8xl text-white mb-8 leading-tight">
            2주 후,
            <br />
            <span className="text-accent-yellow">당신의 새로운 시작</span>
          </h2>
          
          <div className="space-y-12">
            <Link 
              href="/consultation"
              className="group inline-block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-2xl animate-pulse opacity-20"></div>
                <button className="relative px-8 sm:px-12 md:px-16 py-6 md:py-8 bg-white text-primary text-lg sm:text-2xl md:text-3xl font-bold rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/25">
                  <span className="flex items-center">
                    무료 상담 시작하기
                    <ArrowRight className="ml-2 sm:ml-4 w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </div>
            </Link>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              부담 없어요. 그냥 얘기해봐요.
            </p>
          </div>
        </div>
      </Scene>

      {/* Progress Indicator */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 space-y-2">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`w-1.5 md:w-2 h-6 md:h-8 rounded-full transition-all duration-300 ${
              currentScene === index 
                ? 'bg-primary' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}