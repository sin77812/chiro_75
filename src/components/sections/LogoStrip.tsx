'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clientsData from '@/data/clients.json'

export default function LogoStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || !isPlaying) return

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const interval = setInterval(scroll, 50)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        setFocusIndex(index > 0 ? index - 1 : clientsData.length - 1)
        break
      case 'ArrowRight':
        event.preventDefault()
        setFocusIndex(index < clientsData.length - 1 ? index + 1 : 0)
        break
      case 'Home':
        event.preventDefault()
        setFocusIndex(0)
        break
      case 'End':
        event.preventDefault()
        setFocusIndex(clientsData.length - 1)
        break
    }
  }

  // Focus management
  useEffect(() => {
    if (focusIndex !== null) {
      const element = document.getElementById(`client-logo-${focusIndex}`)
      element?.focus()
    }
  }, [focusIndex])

  const pauseAutoScroll = () => setIsPlaying(false)
  const resumeAutoScroll = () => setIsPlaying(true)

  return (
    <section className="py-16 bg-primary-dark border-y border-shadow-gray/20" aria-label="신뢰받는 파트너">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-pretendard font-semibold mb-4">
            신뢰받는 파트너
          </h2>
          <p className="text-neutral-light/70 max-w-2xl mx-auto">
            국내 주요 기업들이 선택한 CHIRO의 전문성을 확인하세요
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden" 
             onMouseEnter={pauseAutoScroll}
             onMouseLeave={resumeAutoScroll}
             onFocus={pauseAutoScroll}
             onBlur={resumeAutoScroll}>
          
          {/* Screen Reader Instructions */}
          <div className="sr-only">
            로고 캐러셀입니다. 화살표 키로 탐색할 수 있습니다.
          </div>
          
          <div 
            ref={scrollRef}
            className="flex space-x-12 animate-scroll scrollbar-hide"
            style={{ width: 'max-content' }}
            role="list"
            aria-label="클라이언트 로고 목록"
          >
            {/* First set of logos */}
            {clientsData.map((client, index) => (
              <div
                key={client.id}
                id={`client-logo-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
                role="listitem"
                tabIndex={0}
                aria-label={`${client.name} 로고`}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusIndex(index)}
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clientsData.map((client) => (
              <div
                key={`${client.id}-duplicate`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                aria-hidden="true"
              >
                <Image
                  src={client.logo}
                  alt=""
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => {
                const container = scrollRef.current
                if (container) {
                  container.scrollLeft -= 200
                }
              }}
              className="p-2 bg-shadow-gray/20 rounded-full hover:bg-primary/20 focus:bg-primary/20 focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
              aria-label="이전 로고 보기"
            >
              <ChevronLeft className="h-4 w-4 text-primary" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-shadow-gray/20 rounded-full hover:bg-primary/20 focus:bg-primary/20 focus:ring-2 focus:ring-primary focus:outline-none transition-colors text-sm text-primary"
              aria-label={isPlaying ? '자동 스크롤 일시정지' : '자동 스크롤 재생'}
            >
              {isPlaying ? '일시정지' : '재생'}
            </button>
            
            <button
              onClick={() => {
                const container = scrollRef.current
                if (container) {
                  container.scrollLeft += 200
                }
              }}
              className="p-2 bg-shadow-gray/20 rounded-full hover:bg-primary/20 focus:bg-primary/20 focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
              aria-label="다음 로고 보기"
            >
              <ChevronRight className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: '🏆', title: '업계 1위', desc: '고객 만족도', ariaLabel: '업계 1위 고객 만족도' },
            { icon: '⚡', title: '빠른 응답', desc: '24시간 이내', ariaLabel: '24시간 이내 빠른 응답' },
            { icon: '🔒', title: '안전한 개발', desc: 'ISO 27001', ariaLabel: 'ISO 27001 인증 안전한 개발' },
            { icon: '💎', title: '프리미엄', desc: '맞춤형 서비스', ariaLabel: '프리미엄 맞춤형 서비스' },
          ].map((item, index) => (
            <div 
              key={index} 
              className="text-center space-y-2 p-4 rounded-lg hover:bg-white/5 transition-colors"
              role="img"
              aria-label={item.ariaLabel}
            >
              <div className="text-3xl" aria-hidden="true">{item.icon}</div>
              <div className="font-semibold text-primary">{item.title}</div>
              <div className="text-sm text-neutral-light/60">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}