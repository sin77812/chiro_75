'use client'

import React, { useEffect, useRef, useState } from 'react'

const SmartMinimalismHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubtextVisible, setIsSubtextVisible] = useState(false)

  const mainTextLines = [
    "CHIRO",
    "WEBDESIGN"
  ]

  const subtextChars = "코드가 아닌 성장을 빌드하는 기업".split('')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const [subtextKey, setSubtextKey] = useState(0)

  useEffect(() => {
    // Show text immediately after 0.5s, independent of mouse events
    const initialTimer = setTimeout(() => {
      setIsSubtextVisible(true)
    }, 500)

    return () => {
      clearTimeout(initialTimer)
    }
  }, [])

  const calculateMagneticOffset = (elementRect: DOMRect, mouseX: number, mouseY: number) => {
    const elementCenterX = elementRect.left + elementRect.width / 2
    const elementCenterY = elementRect.top + elementRect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(mouseX - elementCenterX, 2) + Math.pow(mouseY - elementCenterY, 2)
    )
    
    const maxDistance = 150
    const maxOffset = 10
    
    if (distance > maxDistance) return { x: 0, y: 0 }
    
    const strength = 1 - (distance / maxDistance)
    const offsetX = ((mouseX - elementCenterX) / distance) * maxOffset * strength
    const offsetY = ((mouseY - elementCenterY) / distance) * maxOffset * strength
    
    return { x: offsetX, y: offsetY }
  }

  const MagneticChar = ({ char, index }: { char: string; index: number }) => {
    const charRef = useRef<HTMLSpanElement>(null)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>()

    useEffect(() => {
      const updateOffset = () => {
        if (charRef.current && containerRef.current) {
          const charRect = charRef.current.getBoundingClientRect()
          const containerRect = containerRef.current.getBoundingClientRect()
          
          const absoluteMouseX = mousePosition.x + containerRect.left
          const absoluteMouseY = mousePosition.y + containerRect.top
          
          const newOffset = calculateMagneticOffset(charRect, absoluteMouseX, absoluteMouseY)
          setOffset(newOffset)
        }
      }

      // Use requestAnimationFrame to avoid unnecessary re-renders
      animationFrameRef.current = requestAnimationFrame(updateOffset)
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }, [mousePosition])

    return (
      <span
        ref={charRef}
        className="inline-block transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) translateX(${offset.x}px) translateY(${offset.y}px) translateZ(0)`,
          transformStyle: 'preserve-3d'
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
      <span className={`transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {char}
      </span>
    )
  }


  return (
    <section 
      ref={containerRef}
      className="relative h-screen bg-[#0E1111] overflow-hidden flex items-center justify-center"
      style={{
        padding: '10vw'
      }}
    >
      {/* Main Title with Magnetic Typography */}
      <div className="text-center">
        {mainTextLines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="block text-white font-bold tracking-tight"
            style={{
              fontSize: lineIndex === 0 ? 'clamp(117px, 15.6vw, 234px)' : 'clamp(60px, 8vw, 120px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em'
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
        className="absolute text-white/60 text-xl left-1/2 transform -translate-x-1/2 pointer-events-none"
        style={{
          bottom: '15vh'
        }}
      >
        {isSubtextVisible && (
          <div key={subtextKey} className="whitespace-nowrap">
            {subtextChars.map((char, index) => (
              <TypingChar key={`${subtextKey}-${index}`} char={char} index={index} />
            ))}
            <span className="animate-pulse ml-1">|</span>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute flex flex-col items-center"
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