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
  style?: React.CSSProperties
}

const Scene = ({ children, id, className = '', style }: SceneProps) => (
  <div 
    id={id}
    className={`${id === 'scene-5' ? 'min-h-screen' : 'h-screen'} flex items-center justify-center relative ${className}`}
    style={{
      ...style,
      ...(id === 'scene-4' ? { paddingBottom: '2rem' } : {}),
      ...(id === 'scene-5' ? { paddingTop: '1rem' } : {})
    }}
  >
    {children}
  </div>
)

export default function StorytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [currentProject, setCurrentProject] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    // Mouse tracking for Scene 1 title interaction
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    // Navigation visibility logic
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setHasScrolled(scrolled)
    }

    const handleMouseMoveNav = (e: MouseEvent) => {
      // Show nav when mouse is in top 60px of screen
      if (e.clientY < 60) {
        setShowNav(true)
      } else if (e.clientY > 120) {
        setShowNav(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMoveNav)

    // Scene transition triggers
    if (typeof window !== 'undefined' && containerRef.current) {
      const scenes = containerRef.current.querySelectorAll('[data-scene]')
      
      scenes.forEach((scene, index) => {
        if (index === 4) {
          // Scene 5 (Portfolio) - Horizontal Scroll
          ScrollTrigger.create({
            trigger: scene,
            start: 'top top',
            end: '+=500%', // Extended scroll distance for complete pin
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress
              const projectIndex = Math.floor(progress * 4)
              setCurrentProject(Math.min(projectIndex, 3))
              
              if (portfolioRef.current) {
                const slider = portfolioRef.current.querySelector('#portfolio-slider')
                const titleElement = portfolioRef.current.querySelector('h2')
                
                if (slider) {
                  gsap.to(slider, {
                    x: -progress * 300 + '%',
                    duration: 0.3,
                    ease: 'power2.out'
                  })
                }
                
                // Hide title completely when portfolio scrolls
                if (titleElement) {
                  gsap.to(titleElement, {
                    opacity: progress > 0.1 ? 0 : 1,
                    y: progress > 0.1 ? -100 : 0,
                    scale: progress > 0.1 ? 0.8 : 1,
                    duration: 0.3,
                    ease: 'power2.out'
                  })
                }
              }
            },
            onEnter: () => setCurrentScene(index),
            onLeave: () => {
              // Ensure proper cleanup when leaving the section
              if (portfolioRef.current) {
                const slider = portfolioRef.current.querySelector('#portfolio-slider')
                const titleElement = portfolioRef.current.querySelector('h2')
                
                if (slider) {
                  gsap.set(slider, { x: '-300%' })
                }
                if (titleElement) {
                  gsap.set(titleElement, { opacity: 0, y: -50 })
                }
              }
            },
            onEnterBack: () => {
              setCurrentScene(index)
              // Reset position when entering back
              if (portfolioRef.current) {
                const slider = portfolioRef.current.querySelector('#portfolio-slider')
                const titleElement = portfolioRef.current.querySelector('h2')
                
                if (slider) {
                  gsap.set(slider, { x: '0%' })
                }
                if (titleElement) {
                  gsap.set(titleElement, { opacity: 1, y: 0 })
                }
              }
            }
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
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMoveNav)
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
      {/* Smart Navigation */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hasScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        } ${
          !hasScrolled || showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl">CHIRO</div>
            <div className="hidden md:flex space-x-6">
              <a href="#scene-1" className="text-white hover:text-primary transition-colors">Home</a>
              <a href="#scene-5" className="text-white hover:text-primary transition-colors">Portfolio</a>
              <a href="/consultation" className="text-white hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>
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
      <Scene id="scene-5" className="z-10 relative" style={{ height: '500vh' }}>
        <div data-scene="4" className="w-full h-screen flex flex-col sticky top-0">
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
      <Scene id="scene-6" className="z-10 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-green/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div data-scene="5" className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-pretendard font-bold text-3xl sm:text-5xl md:text-7xl text-white mb-16 md:mb-20">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">믿을 만한가?</span>
          </h2>
          
          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
            {[
              { number: '100%', label: '만족도', desc: '고객 만족 보장', color: 'from-emerald-400 to-green-500' },
              { number: '2주', label: '평균 납기', desc: '빠른 프로젝트 완성', color: 'from-blue-400 to-cyan-500' },
              { number: '50%', label: '비용 절감', desc: '합리적인 가격 정책', color: 'from-purple-400 to-pink-500' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
                     style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
                
                <div className="relative space-y-4">
                  {/* Animated number */}
                  <div className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  
                  {/* Label with underline effect */}
                  <div className="relative">
                    <div className="text-xl md:text-2xl font-bold text-white group-hover:text-gray-100 transition-colors">
                      {stat.label}
                    </div>
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} transition-all duration-500`}></div>
                  </div>
                  
                  <div className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    {stat.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Premium Testimonial */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent-green/20 blur-3xl"></div>
            
            <blockquote className="relative p-8 md:p-12 rounded-3xl bg-black/30 backdrop-blur-2xl border border-white/10 max-w-4xl mx-auto"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.4) 100%)',
                          boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}>
              {/* Quote marks */}
              <div className="absolute -top-4 -left-4 text-6xl text-primary/30 font-serif">"</div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-primary/30 font-serif">"</div>
              
              <div className="relative">
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-6">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    2주만에 이런 퀄리티가? 진짜 만족합니다!
                  </span>
                </p>
                
                <footer className="flex items-center justify-center space-x-4">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-green p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <span className="text-white font-bold">K</span>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-gray-300 font-medium">실제 고객</div>
                    <div className="text-gray-500 text-sm">CEO, 스타트업</div>
                  </div>
                  
                  {/* Stars */}
                  <div className="flex space-x-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </footer>
              </div>
            </blockquote>
          </div>
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