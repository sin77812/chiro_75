'use client'

import { useEffect, useRef, useState } from 'react'

const partnerLogos = [
  { name: 'Samsung', logo: '/logos/samsung-mono.svg', isExample: true },
  { name: 'LG', logo: '/logos/lg-mono.svg', isExample: true },
  { name: 'Hyundai', logo: '/logos/hyundai-mono.svg', isExample: true },
  { name: 'SK', logo: '/logos/sk-mono.svg', isExample: true },
  { name: 'Kakao', logo: '/logos/kakao-mono.svg', isExample: true },
  { name: 'Naver', logo: '/logos/naver-mono.svg', isExample: true },
  { name: 'Coupang', logo: '/logos/coupang-mono.svg', isExample: true },
  { name: 'Toss', logo: '/logos/toss-mono.svg', isExample: true },
]

export default function LogoStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollProgress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height)
        setTranslateY(scrollProgress * 6 - 3)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-24 bg-[#0E1111] border-y border-[#1A1F1F] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E1111] via-transparent to-[#0E1111] opacity-60" />
      
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#1DB954] mb-2">신뢰받는 파트너십</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F7FA] mb-4">
            업계 리더들이 선택한 에이전시
          </h2>
          <p className="text-sm text-[#8B949E]">
            파트너 로고(예시). 실제 프로젝트 레퍼런스는 문의 시 제공합니다.
          </p>
        </div>

        <div 
          className="relative transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {partnerLogos.slice(0, 8).map((partner, index) => (
              <div
                key={partner.name}
                className="group relative flex items-center justify-center opacity-0 animate-fadeInUp"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative w-full h-20 md:h-24 flex items-center justify-center">
                  <div className="relative w-32 h-12 md:w-40 md:h-16 flex items-center justify-center">
                    <div className="w-full h-full bg-[#1A1F1F] rounded-lg flex items-center justify-center border border-[#2D3333] group-hover:border-[#1DB954]/20 transition-all duration-300">
                      <span className="text-[#8B949E] font-medium text-sm md:text-base opacity-60 group-hover:opacity-100 transition-opacity">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0E1111] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0E1111] to-transparent z-10" />
            
            <div className="flex gap-12 animate-scroll">
              {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div
                  key={`scroll-${index}`}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center"
                >
                  <div className="w-full h-full bg-[#1A1F1F]/50 rounded-lg flex items-center justify-center border border-[#2D3333]/50">
                    <span className="text-[#8B949E] font-medium text-sm opacity-40">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#1DB954] mb-1">98%</p>
            <p className="text-sm text-[#8B949E]">재계약률</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#1DB954] mb-1">150+</p>
            <p className="text-sm text-[#8B949E]">완료 프로젝트</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#1DB954] mb-1">5년</p>
            <p className="text-sm text-[#8B949E]">평균 파트너십</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  )
}