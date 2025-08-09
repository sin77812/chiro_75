'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  author: {
    name: string
    position: string
    company: string
    avatar: string
  }
  rating: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export default function TestimonialCarousel({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const totalSlides = testimonials.length

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }, interval)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, totalSlides, interval])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setIsPlaying(false) // Pause auto-play when user interacts
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setIsPlaying(false) // Pause auto-play when user interacts
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false) // Pause auto-play when user interacts
  }

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPrevious()
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNext()
        break
      case ' ':
        event.preventDefault()
        setIsPlaying(!isPlaying)
        break
    }
  }

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      role="region"
      aria-label="고객 후기 슬라이드"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={carouselRef}
    >
      {/* Main Testimonial */}
      <div className="text-center px-8 py-12">
        {/* Quote Icon */}
        <div className="mb-8">
          <Quote className="h-12 w-12 text-primary/30 mx-auto" />
        </div>

        {/* Quote Text */}
        <blockquote className="mb-8">
          <p className="text-xl md:text-2xl text-white leading-relaxed font-light italic max-w-3xl mx-auto">
            "{currentTestimonial.quote}"
          </p>
        </blockquote>

        {/* Author Info */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src={currentTestimonial.author.avatar}
                alt={currentTestimonial.author.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Quote className="h-3 w-3 text-white" />
            </div>
          </div>

          {/* Author Details */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-1">
              {currentTestimonial.author.name}
            </h3>
            <p className="text-primary font-medium text-sm mb-1">
              {currentTestimonial.author.position}
            </p>
            <p className="text-neutral-light/60 text-sm">
              {currentTestimonial.author.company}
            </p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex justify-center mt-6 space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < currentTestimonial.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-neutral-light/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {totalSlides > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-shadow-gray/20 hover:bg-primary/20 border border-shadow-gray/30 hover:border-primary/30 rounded-full flex items-center justify-center transition-all group"
            aria-label="이전 후기"
          >
            <ChevronLeft className="h-6 w-6 text-neutral-light/60 group-hover:text-primary" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-shadow-gray/20 hover:bg-primary/20 border border-shadow-gray/30 hover:border-primary/30 rounded-full flex items-center justify-center transition-all group"
            aria-label="다음 후기"
          >
            <ChevronRight className="h-6 w-6 text-neutral-light/60 group-hover:text-primary" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-neutral-light/20 hover:bg-primary/50'
                }`}
                aria-label={`${index + 1}번째 후기로 이동`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs text-neutral-light/60 hover:text-primary transition-colors"
              aria-label={isPlaying ? "자동 재생 일시정지" : "자동 재생 시작"}
            >
              {isPlaying ? "일시정지" : "자동재생"}
            </button>
          </div>
        </>
      )}

      {/* Screen Reader Only Instructions */}
      <div className="sr-only">
        현재 {currentIndex + 1}번째 후기를 보고 있습니다. 
        총 {totalSlides}개의 후기가 있습니다.
        화살표 키로 이동하거나 스페이스바로 자동 재생을 제어할 수 있습니다.
      </div>

      {/* Live Region for Screen Readers */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {currentTestimonial.author.name}님의 후기: {currentTestimonial.quote}
      </div>
    </div>
  )
}