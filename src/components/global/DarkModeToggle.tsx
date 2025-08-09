'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { AccessibleButton } from '@/components/ui/AccessibleComponents'
import { ServiceAnalytics } from '@/components/analytics/Analytics'

interface DarkModeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export default function DarkModeToggle({ 
  className = '', 
  size = 'md',
  showLabel = false 
}: DarkModeToggleProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  // Size configurations
  const sizeConfig = {
    sm: {
      button: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-xs'
    },
    md: {
      button: 'w-10 h-10',
      icon: 'w-5 h-5',
      text: 'text-sm'
    },
    lg: {
      button: 'w-12 h-12',
      icon: 'w-6 h-6',
      text: 'text-base'
    }
  }

  const config = sizeConfig[size]

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [])

  // Apply theme to document
  const applyTheme = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)

    // Analytics tracking
    ServiceAnalytics.clickServiceCTA('theme-toggle', 'secondary', `Switch to ${newTheme} mode`)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`${config.button} ${className}`}>
        <div className="w-full h-full bg-background-secondary rounded-lg animate-pulse" />
      </div>
    )
  }

  const isDark = theme === 'dark'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <AccessibleButton
        onClick={toggleTheme}
        className={`
          ${config.button} rounded-lg border transition-all duration-base ease-base
          ${isDark 
            ? 'bg-background-secondary border-shadow-gray/30 hover:border-primary/30 text-text-primary hover:text-primary' 
            : 'bg-white border-gray-200 hover:border-primary/30 text-gray-600 hover:text-primary'
          }
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          ${isDark ? 'focus:ring-offset-background-primary' : 'focus:ring-offset-white'}
          hover:scale-105 active:scale-95
          relative overflow-hidden
        `}
        aria-label={`현재 ${isDark ? '다크' : '라이트'} 모드, ${isDark ? '라이트' : '다크'} 모드로 전환`}
        aria-pressed={isDark}
      >
        {/* Background animation */}
        <div 
          className={`
            absolute inset-0 transition-all duration-base ease-base transform
            ${isDark ? 'bg-gradient-to-br from-primary/10 to-accent-green/10' : 'bg-gradient-to-br from-yellow-100 to-orange-100'}
            ${isDark ? 'translate-x-0' : 'translate-x-full'}
          `}
        />
        
        {/* Icons container */}
        <div className="relative flex items-center justify-center">
          {/* Sun icon */}
          <Sun 
            className={`
              ${config.icon} absolute transition-all duration-base ease-base transform
              ${isDark 
                ? 'opacity-0 scale-0 rotate-180' 
                : 'opacity-100 scale-100 rotate-0 text-yellow-500'
              }
            `}
            aria-hidden="true"
          />
          
          {/* Moon icon */}
          <Moon 
            className={`
              ${config.icon} absolute transition-all duration-base ease-base transform
              ${isDark 
                ? 'opacity-100 scale-100 rotate-0 text-primary' 
                : 'opacity-0 scale-0 -rotate-180'
              }
            `}
            aria-hidden="true"
          />
        </div>
      </AccessibleButton>

      {/* Optional label */}
      {showLabel && (
        <span className={`
          ${config.text} font-medium transition-colors duration-base
          ${isDark ? 'text-text-secondary' : 'text-gray-600'}
        `}>
          {isDark ? '다크 모드' : '라이트 모드'}
        </span>
      )}
    </div>
  )
}

// Hook for theme detection
export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }

  return { theme, toggleTheme, mounted }
}