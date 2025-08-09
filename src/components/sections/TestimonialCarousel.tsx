'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import testimonialsData from '@/data/testimonials.json'

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonialsData.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonialsData.length - 1 ? 0 : currentIndex + 1)
  }

  const currentTestimonial = testimonialsData[currentIndex]

  return (
    <section className="section-padding bg-gradient-to-b from-primary-dark to-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            TESTIMONIALS
          </div>
          <h2 className="font-pretendard font-bold mb-6">
            고객이 직접 전하는 <span className="text-gradient">CHIRO 이야기</span>
          </h2>
          <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
            실제 클라이언트들이 경험한 CHIRO의 전문성과 프로젝트 성과를 확인해보세요.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Testimonial */}
          <div className="relative bg-shadow-gray/20 rounded-3xl p-8 md:p-12 border border-shadow-gray/30">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Quote className="h-6 w-6 text-primary" />
            </div>

            {/* Content */}
            <div className="pt-8 space-y-8">
              {/* Stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed text-center">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent-green flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {currentTestimonial.author.name.charAt(0)}
                  </span>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white text-lg">
                    {currentTestimonial.author.name}
                  </div>
                  <div className="text-neutral-light/60">
                    {currentTestimonial.author.position}
                  </div>
                  <div className="text-primary font-medium">
                    {currentTestimonial.author.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-shadow-gray/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors group"
            >
              <ChevronLeft className="h-6 w-6 text-white group-hover:text-white" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-shadow-gray/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors group"
            >
              <ChevronRight className="h-6 w-6 text-white group-hover:text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-shadow-gray/50 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5.0</div>
            <div className="text-neutral-light/60">평균 만족도</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-neutral-light/60">재계약률</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-neutral-light/60">완료 프로젝트</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24h</div>
            <div className="text-neutral-light/60">평균 응답시간</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-neutral-light/70 mb-6">
            다음 성공 사례의 주인공이 되어보세요
          </p>
          <button className="btn-primary group">
            프로젝트 시작하기
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}