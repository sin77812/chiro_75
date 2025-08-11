import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (options = {}) => {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [isVisible, options])

  return { ref, isVisible }
}

export const scrollRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1], // easeOutQuint
    },
  },
}

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const slideInFromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const slideInFromRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}