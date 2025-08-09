'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  once?: boolean
  reducedMotion?: boolean
}

export default function ScrollReveal({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  duration = 500,
  direction = 'up',
  once = true,
  reducedMotion = false
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, once])

  // Skip animations if reduced motion is preferred or explicitly disabled
  const shouldAnimate = !prefersReducedMotion && !reducedMotion

  const getTransform = () => {
    if (!shouldAnimate) return 'none'
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)'

    switch (direction) {
      case 'up':
        return 'translate3d(0, 30px, 0) scale(0.95)'
      case 'down':
        return 'translate3d(0, -30px, 0) scale(0.95)'
      case 'left':
        return 'translate3d(30px, 0, 0) scale(0.95)'
      case 'right':
        return 'translate3d(-30px, 0, 0) scale(0.95)'
      case 'fade':
        return 'translate3d(0, 0, 0) scale(0.95)'
      default:
        return 'translate3d(0, 30px, 0) scale(0.95)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
        transform: getTransform(),
        transition: shouldAnimate
          ? `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`
          : 'none',
        willChange: shouldAnimate ? 'opacity, transform' : 'auto'
      }}
    >
      {children}
    </div>
  )
}

// Convenience wrapper components
export function FadeUp({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: React.ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <ScrollReveal direction="up" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

export function FadeIn({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: React.ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <ScrollReveal direction="fade" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

export function FadeLeft({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: React.ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <ScrollReveal direction="left" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

export function FadeRight({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: React.ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <ScrollReveal direction="right" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

// Staggered children animation
export function StaggerContainer({ 
  children, 
  staggerDelay = 50,
  className = ''
}: { 
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}) {
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={index * staggerDelay}
          direction="up"
          duration={350}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}