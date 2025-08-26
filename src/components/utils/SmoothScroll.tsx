'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

export default function SmoothScroll() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkDevice = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
      setIsMobile(isMobileDevice)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  useEffect(() => {
    // Skip smooth scroll on mobile for better performance and native feel
    if (isMobile) {
      // Ensure smooth scroll behavior for anchor links on mobile
      document.documentElement.style.scrollBehavior = 'smooth'
      return () => {
        document.documentElement.style.scrollBehavior = 'auto'
      }
    }

    // Initialize Lenis only on desktop with navbar exception
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      // Prevent smooth scroll from interfering with navigation touch events
      prevent: (node: Element) => {
        // Allow normal touch behavior on navbar and navigation elements
        return node.closest('nav') !== null || 
               node.closest('header') !== null || 
               node.closest('[role="navigation"]') !== null ||
               node.hasAttribute('data-lenis-prevent')
      }
    })

    // Integrate with GSAP
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      // Optional: You can use these values for custom animations
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [isMobile])

  return null
}