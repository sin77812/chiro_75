import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface UseScrollVideoOptions {
  durationSec: number
  rootMargin?: string
}

export const useScrollVideo = ({ durationSec, rootMargin = '-20%' }: UseScrollVideoOptions) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const isInView = useInView(containerRef, { margin: rootMargin as any })
  const animationFrameRef = useRef<number>()

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    
    if (!video || !container || prefersReducedMotion) return

    const updateVideoTime = () => {
      if (!isInView) {
        video.pause()
        return
      }

      const containerRect = container.getBoundingClientRect()
      const containerHeight = containerRect.height
      const viewportHeight = window.innerHeight
      
      // Calculate scroll progress within the container
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const containerTop = containerRect.top + scrollTop
      const containerBottom = containerTop + containerHeight
      
      const currentScroll = scrollTop + viewportHeight / 2
      
      // Calculate progress (0 to 1) based on container visibility
      let scrollProgress = 0
      
      if (currentScroll >= containerTop && currentScroll <= containerBottom) {
        scrollProgress = (currentScroll - containerTop) / containerHeight
        scrollProgress = Math.max(0, Math.min(1, scrollProgress))
      } else if (currentScroll > containerBottom) {
        scrollProgress = 1
      }
      
      // Map scroll progress to video time
      const targetTime = scrollProgress * durationSec
      
      if (video.duration && !isNaN(video.duration)) {
        const videoTime = Math.min(targetTime, video.duration)
        video.currentTime = videoTime
        setCurrentTime(videoTime)
        setProgress(scrollProgress)
      }
      
      // Continue animation if in view
      if (isInView) {
        animationFrameRef.current = requestAnimationFrame(updateVideoTime)
      }
    }

    // Initialize video
    const handleLoadedMetadata = () => {
      video.currentTime = 0
      if (isInView) {
        updateVideoTime()
      }
    }

    const handleVideoLoad = () => {
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
    }

    if (video.readyState >= 1) {
      handleLoadedMetadata()
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
    }

    // Start/stop animation based on visibility
    if (isInView) {
      animationFrameRef.current = requestAnimationFrame(updateVideoTime)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      video.pause()
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [isInView, durationSec, prefersReducedMotion])

  // Analytics tracking
  useEffect(() => {
    if (isInView && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        item_category: 'case_preview',
        item_name: 'scroll_video',
        engagement_time_msec: 1000,
      })
    }
  }, [isInView])

  return {
    videoRef,
    containerRef,
    progress,
    currentTime,
    isInView,
    prefersReducedMotion,
  }
}