'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface OrbitalText {
  text: string
  angle: number
}

const SmartMinimalismContact = () => {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotationSpeed, setRotationSpeed] = useState(20) // seconds per rotation
  const [isAnimating, setIsAnimating] = useState(false)
  const [buttonText, setButtonText] = useState('CHIRO')

  const orbitalTexts: OrbitalText[] = [
    { text: '2주 완성', angle: 0 },
    { text: '무료 상담', angle: 72 },
    { text: '340% 성장', angle: 144 },
    { text: '98% 만족', angle: 216 },
    { text: '지금 시작', angle: 288 }
  ]

  const [currentRotation, setCurrentRotation] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && buttonRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const buttonRect = buttonRef.current.getBoundingClientRect()
        
        const containerCenterX = containerRect.left + containerRect.width / 2
        const containerCenterY = containerRect.top + containerRect.height / 2
        
        const mouseX = e.clientX
        const mouseY = e.clientY
        
        setMousePosition({ x: mouseX, y: mouseY })
        
        // Calculate distance from button center
        const buttonCenterX = buttonRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top + buttonRect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
        )
        
        // Adjust rotation speed based on distance (closer = slower)
        const maxDistance = 300
        const minSpeed = 30 // slow
        const maxSpeed = 10 // fast
        
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        const newSpeed = minSpeed - (normalizedDistance * (minSpeed - maxSpeed))
        
        setRotationSpeed(newSpeed)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRotation(prev => (prev + 1) % 360)
    }, rotationSpeed * 1000 / 360) // Convert to milliseconds per degree

    return () => clearInterval(interval)
  }, [rotationSpeed])

  const handleButtonClick = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setButtonText('시작합니다')
    
    // Converge all orbital texts to center
    setTimeout(() => {
      // Navigate to contact/application page after animation
      router.push('/contact')
    }, 1500)
  }

  const getOrbitalTextStyle = (text: OrbitalText, index: number) => {
    const baseRadius = window.innerWidth <= 768 ? 150 : 200 // Responsive radius
    const currentAngle = (text.angle + currentRotation) * (Math.PI / 180)
    
    if (isAnimating) {
      // Converge to center with rotation
      return {
        transform: `translate(-50%, -50%) scale(0) rotate(720deg)`,
        opacity: 0,
        transition: `all 0.5s ease-in-out ${index * 0.1}s`
      }
    }
    
    const x = Math.cos(currentAngle) * baseRadius
    const y = Math.sin(currentAngle) * baseRadius
    
    return {
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      opacity: 0.5,
      transition: 'none'
    }
  }

  return (
    <section 
      ref={containerRef}
      className="h-[60vh] bg-black flex items-center justify-center relative overflow-hidden"
    >
      {/* Radial gradient background decoration */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.02) 0%, transparent 70%)`,
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />

      {/* Central CTA Button */}
      <div 
        ref={buttonRef}
        className={`
          relative w-45 h-45 rounded-full border-2 border-[#1DB954] 
          flex items-center justify-center cursor-pointer
          font-normal text-white transition-all duration-400 ease-out
          hover:bg-[#1DB954] hover:text-black hover:scale-110
          ${isAnimating ? 'scale-125' : ''}
        `}
        style={{
          width: '180px',
          height: '180px',
          fontSize: '28px',
          fontWeight: 400,
          filter: 'drop-shadow(0 0 50px rgba(29, 185, 84, 0.6))',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={handleButtonClick}
      >
        {buttonText}
      </div>

      {/* Orbital Texts */}
      {orbitalTexts.map((orbitalText, index) => (
        <div
          key={index}
          className={`
            absolute top-1/2 left-1/2 text-sm font-extralight pointer-events-none
            hover:opacity-100 hover:text-[#1DB954] hover:scale-120
          `}
          style={{
            ...getOrbitalTextStyle(orbitalText, index),
            fontWeight: 200,
            fontSize: '14px',
            textShadow: '0 0 15px currentColor',
            zIndex: 10
          }}
        >
          {orbitalText.text}
        </div>
      ))}

      {/* Orbital texts with hover effects when not animating */}
      {!isAnimating && orbitalTexts.map((orbitalText, index) => {
        const baseRadius = window.innerWidth <= 768 ? 150 : 200
        const currentAngle = (orbitalText.angle + currentRotation) * (Math.PI / 180)
        const x = Math.cos(currentAngle) * baseRadius
        const y = Math.sin(currentAngle) * baseRadius
        
        return (
          <div
            key={`hover-${index}`}
            className={`
              absolute top-1/2 left-1/2 text-sm font-extralight cursor-pointer
              transition-all duration-300 hover:opacity-100 hover:text-[#1DB954] 
              hover:scale-120 opacity-50 text-white
            `}
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              fontWeight: 200,
              fontSize: '14px',
              zIndex: 20
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 15px currentColor'
              e.currentTarget.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none'
              e.currentTarget.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
            }}
          >
            {orbitalText.text}
          </div>
        )
      })}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.02;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.04;
          }
        }
      `}</style>
    </section>
  )
}

export default SmartMinimalismContact