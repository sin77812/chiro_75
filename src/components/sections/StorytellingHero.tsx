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
  const [currentScene, setCurrentScene] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
        ScrollTrigger.create({
          trigger: scene,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrentScene(index),
          onEnterBack: () => setCurrentScene(index),
        })
      })
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

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
        <div data-scene="4" className="w-full">
          <div className="text-center mb-16">
            <h2 className="font-pretendard font-bold text-3xl sm:text-5xl md:text-7xl text-white">
              <span className="text-gradient">진짜 잘하나?</span>
            </h2>
          </div>
          
          <div className="flex overflow-x-auto gap-4 md:gap-8 px-4 pb-8">
            {[1, 2, 3].map((project) => (
              <div 
                key={project} 
                className="min-w-[280px] sm:min-w-[350px] md:min-w-[500px] h-64 md:h-80 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-2xl flex items-center justify-center border border-primary/30"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Project {project}
                  </h3>
                  <p className="text-white/70">
                    성과 기반 실제 케이스
                  </p>
                </div>
              </div>
            ))}
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