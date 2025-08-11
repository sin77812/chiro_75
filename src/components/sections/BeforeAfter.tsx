'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { GripVertical, Clock, Code, Package } from 'lucide-react'

const caseStudies = [
  {
    id: 1,
    client: '이커머스 플랫폼',
    industry: '리테일',
    before: '/images/before-after/ecommerce-before.jpg',
    after: '/images/before-after/ecommerce-after.jpg',
    results: [
      { metric: '전환율', value: '+187%', icon: '📈' },
      { metric: '페이지 속도', value: '68% 개선', icon: '⚡' },
      { metric: '이탈률', value: '-42%', icon: '📉' },
    ],
    scope: 'Full redesign & development',
    duration: '12주',
    tools: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    id: 2,
    client: 'SaaS 대시보드',
    industry: '테크',
    before: '/images/before-after/saas-before.jpg',
    after: '/images/before-after/saas-after.jpg',
    results: [
      { metric: '사용자 참여', value: '+250%', icon: '👥' },
      { metric: 'NPS 점수', value: '+45점', icon: '⭐' },
      { metric: '지원 티켓', value: '-60%', icon: '🎫' },
    ],
    scope: 'UI/UX 리디자인',
    duration: '8주',
    tools: ['React', 'D3.js', 'Material-UI'],
  },
]

export default function BeforeAfter() {
  const [activeCase, setActiveCase] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const currentCase = caseStudies[activeCase]

  return (
    <section className="py-24 md:py-32 bg-[#0A0C0C] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1111] via-transparent to-[#0E1111] opacity-50" />
      
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[#1DB954] mb-3">결과 증명</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-4">
            Before & After
          </h2>
          <p className="text-lg text-[#C9CFD6]">
            실제 프로젝트의 변화를 직접 확인하세요
          </p>
        </div>

        {/* Case selector */}
        <div className="flex justify-center gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveCase(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeCase === index
                  ? 'bg-[#1DB954] text-white'
                  : 'bg-[#1A1F1F] text-[#8B949E] hover:bg-[#2D3333]'
              }`}
            >
              {study.client}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Before/After Slider (2 columns) */}
          <div className="lg:col-span-2">
            <div
              ref={containerRef}
              className="relative aspect-[16/10] bg-[#1A1F1F] rounded-2xl overflow-hidden cursor-ew-resize select-none"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
            >
              {/* After image (bottom layer) */}
              <div className="absolute inset-0">
                <div className="relative w-full h-full bg-gradient-to-br from-[#1A1F1F] to-[#0E1111] flex items-center justify-center">
                  <span className="text-[#8B949E] text-lg">After Image Placeholder</span>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#1DB954]/20 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-medium text-[#1DB954]">After</span>
                </div>
              </div>

              {/* Before image (top layer with clip) */}
              <div 
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="relative w-full h-full bg-gradient-to-br from-[#2D3333] to-[#1A1F1F] flex items-center justify-center">
                  <span className="text-[#8B949E] text-lg">Before Image Placeholder</span>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#8B949E]/20 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-medium text-[#8B949E]">Before</span>
                </div>
              </div>

              {/* Slider handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#1DB954] cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleMouseDown}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg shadow-[#1DB954]/30">
                  <GripVertical className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-center text-sm text-[#8B949E] mt-4">
              드래그하여 전후 비교
            </p>
          </div>

          {/* Results panel (1 column) */}
          <div className="space-y-6">
            {/* Results metrics */}
            <div className="bg-[#0E1111] border border-[#1A1F1F] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#F5F7FA] mb-4">핵심 성과</h3>
              <div className="space-y-4">
                {currentCase.results.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 bg-[#1A1F1F]/30 rounded-lg transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{result.icon}</span>
                      <span className="text-[#C9CFD6]">{result.metric}</span>
                    </div>
                    <span className="text-xl font-bold text-[#1DB954]">{result.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project details */}
            <div className="bg-[#0E1111] border border-[#1A1F1F] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#F5F7FA] mb-4">프로젝트 정보</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#8B949E]" />
                  <div>
                    <p className="text-sm text-[#8B949E]">작업 범위</p>
                    <p className="text-[#F5F7FA]">{currentCase.scope}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#8B949E]" />
                  <div>
                    <p className="text-sm text-[#8B949E]">프로젝트 기간</p>
                    <p className="text-[#F5F7FA]">{currentCase.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-[#8B949E]" />
                  <div>
                    <p className="text-sm text-[#8B949E]">기술 스택</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentCase.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 bg-[#1DB954]/10 text-[#1DB954] text-xs rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={`/case/${currentCase.id}`}
              className="block w-full text-center px-6 py-3 bg-[#1DB954] hover:bg-[#1ED760] text-white font-medium rounded-lg transition-all hover:scale-[1.02]"
            >
              전체 케이스 스터디 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}