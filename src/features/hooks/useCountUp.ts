import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  start: number
  end: number
  duration: number
  enableOnIntersection?: boolean
  threshold?: number
}

export const useCountUp = ({
  start = 0,
  end,
  duration = 900,
  enableOnIntersection = true,
  threshold = 0.1,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const startTimeRef = useRef<number>()

  // Intersection Observer setup
  useEffect(() => {
    if (!enableOnIntersection || !elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [enableOnIntersection, threshold, hasAnimated])

  // Animation with requestAnimationFrame
  useEffect(() => {
    if (!isVisible || hasAnimated) return

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (easeOutCubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * easeOut

      setCount(Math.floor(current))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
        setHasAnimated(true)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isVisible, start, end, duration, hasAnimated])

  // Start animation immediately if intersection not enabled
  useEffect(() => {
    if (!enableOnIntersection && !hasAnimated) {
      setIsVisible(true)
    }
  }, [enableOnIntersection, hasAnimated])

  return { count, ref: elementRef, isVisible }
}