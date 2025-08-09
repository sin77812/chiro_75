'use client'

import { useEffect, useState, useRef } from 'react'
import { TrendingUp } from 'lucide-react'

interface KPICounterProps {
  metric: string
  value: string
  improvement?: string
  delay?: number
  className?: string
}

export default function KPICounter({ 
  metric, 
  value, 
  improvement, 
  delay = 0,
  className = "" 
}: KPICounterProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentValue, setCurrentValue] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  // Extract numeric value for animation
  const extractNumber = (str: string): number => {
    const match = str.match(/(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  // Extract unit/suffix from value
  const extractUnit = (str: string): string => {
    return str.replace(/\d+/, '').trim()
  }

  const targetNumber = extractNumber(value)
  const unit = extractUnit(value)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      let startTime: number
      const duration = 2000 // 2 seconds
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
        const easedProgress = easeOutCubic(progress)
        
        const currentNumber = Math.floor(targetNumber * easedProgress)
        setCurrentValue(currentNumber)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, targetNumber, delay])

  return (
    <div 
      ref={elementRef}
      className={`text-center p-8 bg-shadow-gray/20 rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all card-hover ${className}`}
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <TrendingUp className="h-8 w-8 text-primary" />
      </div>
      
      <div className="text-4xl font-bold text-primary mb-2">
        {isVisible ? `${currentValue}${unit}` : value}
      </div>
      
      <div className="text-white font-medium mb-3">
        {metric}
      </div>
      
      {improvement && (
        <div className="inline-flex items-center text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
          <TrendingUp className="h-3 w-3 mr-1" />
          +{improvement} 향상
        </div>
      )}
    </div>
  )
}