import { useState, useRef, useCallback } from 'react'

interface UseScrambleTextOptions {
  duration?: number
  charset?: string
}

export const useScrambleText = (
  targetText: string, 
  { duration = 450, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' }: UseScrambleTextOptions = {}
) => {
  const [displayedText, setDisplayedText] = useState(targetText)
  const [isScrambling, setIsScrambling] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const intervalRef = useRef<NodeJS.Timeout>()
  const ref = useRef<HTMLElement>(null)

  const getRandomChar = useCallback(() => {
    return charset[Math.floor(Math.random() * charset.length)]
  }, [charset])

  const scrambleText = useCallback((text: string, progress: number) => {
    return text
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' '
        
        const revealPoint = index / text.length
        if (progress > revealPoint) {
          return char
        }
        
        return getRandomChar()
      })
      .join('')
  }, [getRandomChar])

  const onHoverStart = useCallback(() => {
    if (isScrambling || !targetText) return
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return // Skip scramble animation if reduced motion is preferred
    }
    
    setIsScrambling(true)
    
    const startTime = Date.now()
    const steps = Math.max(20, targetText.length * 2)
    const stepDuration = duration / steps
    
    let step = 0
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      if (progress < 1) {
        // Scrambling phase
        setDisplayedText(scrambleText(targetText, progress))
        step++
        
        intervalRef.current = setTimeout(animate, stepDuration)
      } else {
        // Final reveal
        setDisplayedText(targetText)
        setIsScrambling(false)
      }
    }
    
    animate()
    
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_content', {
        content_type: 'service_card',
        item_id: targetText.toLowerCase().replace(/\s+/g, '_'),
      })
    }
  }, [targetText, duration, scrambleText, isScrambling])

  const onHoverEnd = useCallback(() => {
    // Clear any ongoing animation
    if (intervalRef.current) {
      clearTimeout(intervalRef.current)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Reset to original text immediately on hover end
    if (isScrambling) {
      setDisplayedText(targetText)
      setIsScrambling(false)
    }
  }, [targetText, isScrambling])

  return {
    ref,
    displayedText,
    isScrambling,
    onHoverStart,
    onHoverEnd,
  }
}