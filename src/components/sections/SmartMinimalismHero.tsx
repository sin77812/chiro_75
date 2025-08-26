'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

const SmartMinimalismHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isSubtextVisible, setIsSubtextVisible] = useState(false)
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false)
  const animationFrameRef = useRef<number>()

  const mainTextLines = [
    "CHIRO",
    "WEBDESIGN"
  ]

  const subtextChars = "코드가 아닌 성장을 빌드하는 기업".split('')

  // Throttled mouse handling with requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  // Start typing animation independently of mouse events
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSubtextVisible(true)
      setHasAnimationStarted(true)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, []) // Empty dependency array - runs once on mount

  const calculateMagneticOffset = useCallback((elementRect: DOMRect, mouseX: number, mouseY: number) => {
    const elementCenterX = elementRect.left + elementRect.width / 2
    const elementCenterY = elementRect.top + elementRect.height / 2
    
    const deltaX = mouseX - elementCenterX
    const deltaY = mouseY - elementCenterY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    const maxDistance = 200
    const maxOffset = 25
    
    if (distance > maxDistance || distance === 0) return { x: 0, y: 0 }
    
    const strength = 1 - (distance / maxDistance)
    const normalizedX = deltaX / distance
    const normalizedY = deltaY / distance
    
    return {
      x: normalizedX * maxOffset * strength,
      y: normalizedY * maxOffset * strength
    }
  }, [])

  const MagneticChar = ({ char, index }: { char: string; index: number }) => {
    const charRef = useRef<HTMLSpanElement>(null)
    const offsetRef = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>()

    useEffect(() => {
      const updateOffset = () => {
        if (charRef.current && containerRef.current) {
          const charRect = charRef.current.getBoundingClientRect()
          const containerRect = containerRef.current.getBoundingClientRect()
          
          const absoluteMouseX = mousePositionRef.current.x + containerRect.left
          const absoluteMouseY = mousePositionRef.current.y + containerRect.top
          
          const newOffset = calculateMagneticOffset(charRect, absoluteMouseX, absoluteMouseY)
          
          // Smooth interpolation for better performance
          offsetRef.current.x += (newOffset.x - offsetRef.current.x) * 0.1
          offsetRef.current.y += (newOffset.y - offsetRef.current.y) * 0.1
          
          // Apply transform directly to DOM for better performance
          if (charRef.current) {
            const { x, y } = offsetRef.current
            const intensity = Math.sqrt(x * x + y * y) / 25
            const transform = `translate3d(${x}px, ${y}px, ${Math.abs(x) * 0.3}px) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`
            
            charRef.current.style.transform = transform
            charRef.current.style.color = intensity > 0.3 ? '#1DB954' : 'white'
            charRef.current.style.textShadow = intensity > 0.3 ? '0 0 15px rgba(29, 185, 84, 0.4)' : 'none'
          }
        }
        
        animationFrameRef.current = requestAnimationFrame(updateOffset)
      }

      animationFrameRef.current = requestAnimationFrame(updateOffset)
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }, [])

    return (
      <span
        ref={charRef}
        className="inline-block will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'color 0.2s ease-out, text-shadow 0.2s ease-out'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    )
  }

  const TypingChar = ({ char, index }: { char: string; index: number }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, index * 50)

      return () => clearTimeout(timer)
    }, [index])

    return (
      <span className={`inline-block transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    )
  }


  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#0E1111] overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-8 py-20"
    >
      {/* Main Title with Magnetic Typography */}
      <div className="text-center">
        {mainTextLines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="block text-white font-bold tracking-tight"
            style={{
              fontSize: lineIndex === 0 ? 'clamp(60px, 12vw, 234px)' : 'clamp(32px, 7vw, 120px)',
              lineHeight: lineIndex === 0 ? 1 : 0.9,
              letterSpacing: '-0.02em',
              marginBottom: lineIndex === 0 ? 'clamp(8px, 2vw, 24px)' : 0
            }}
          >
            {line.split('').map((char, charIndex) => (
              <MagneticChar
                key={`${lineIndex}-${charIndex}`}
                char={char}
                index={charIndex}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Subtext with Typing Effect - Isolated from mouse events */}
      <div 
        className="absolute text-white/60 text-sm sm:text-base md:text-lg lg:text-xl left-1/2 transform -translate-x-1/2 pointer-events-none px-4 text-center"
        style={{
          bottom: 'clamp(60px, 10vh, 120px)',
          maxWidth: '90vw'
        }}
      >
        {isSubtextVisible && (
          <div className="whitespace-normal sm:whitespace-nowrap">
            {subtextChars.map((char, index) => (
              <TypingChar key={`typing-${index}`} char={char} index={index} />
            ))}
            <span className="animate-pulse ml-1">|</span>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute flex flex-col items-center hidden sm:flex"
        style={{ bottom: '5vh' }}
      >
        <div 
          className="w-px bg-[#1DB954] overflow-hidden group cursor-pointer"
          style={{ height: '40px' }}
        >
          <div className="w-full h-2 bg-[#1DB954] animate-bounce"></div>
        </div>
        <div className="mt-2 text-[#1DB954] text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          SCROLL
        </div>
      </div>
    </section>
  )
}

export default SmartMinimalismHero