'use client'

import { useState, useEffect } from 'react'
import { CaseStudyMetric } from '@/types'

interface MetricsCardProps {
  metric: CaseStudyMetric
  delay?: number
}

export default function MetricsCard({ metric, delay = 0 }: MetricsCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    const isNumeric = typeof metric.after === 'number'
    if (!isNumeric) return

    const start = typeof metric.before === 'number' ? metric.before : 0
    const end = metric.after as number
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * easeOutCubic
      
      setAnimatedValue(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, metric.before, metric.after])

  const formatValue = (value: string | number) => {
    if (typeof value === 'string') return value
    
    if (metric.unit === '%') {
      return `${Math.round(animatedValue * 10) / 10}%`
    }
    if (metric.unit === 's') {
      return `${(animatedValue).toFixed(1)}s`
    }
    if (metric.unit === '/10') {
      return `${(animatedValue).toFixed(1)}/10`
    }
    if (metric.unit === '/100') {
      return `${Math.round(animatedValue)}/100`
    }
    if (metric.unit === 'min') {
      return `${Math.round(animatedValue)}분`
    }
    
    return Math.round(animatedValue).toLocaleString()
  }

  const getDeltaColor = () => {
    if (metric.delta.startsWith('+')) {
      return metric.label.includes('이탈률') || metric.label.includes('로딩') 
        ? 'text-red-600' 
        : 'text-green-600'
    }
    if (metric.delta.startsWith('-')) {
      return metric.label.includes('이탈률') || metric.label.includes('로딩')
        ? 'text-green-600'
        : 'text-red-600'
    }
    return 'text-gray-600'
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="text-sm font-medium text-gray-600 mb-2">
        {metric.label}
      </div>
      
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-3xl font-bold text-gray-900">
          {typeof metric.after === 'string' ? metric.after : formatValue(metric.after)}
          {metric.unit && typeof metric.after === 'string' && (
            <span className="text-lg text-gray-600 ml-1">{metric.unit}</span>
          )}
        </div>
        <div className={`text-sm font-semibold ${getDeltaColor()}`}>
          {metric.delta}
        </div>
      </div>

      <div className="flex items-center text-xs text-gray-500">
        <span>이전: {metric.before}{metric.unit}</span>
        <span className="mx-2">→</span>
        <span>이후: {metric.after}{typeof metric.after === 'string' ? '' : metric.unit}</span>
      </div>

      <div className="mt-3 bg-gray-100 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            isVisible ? 'w-full' : 'w-0'
          } ${
            metric.delta.startsWith('+') && !metric.label.includes('이탈률') && !metric.label.includes('로딩')
              ? 'bg-green-500'
              : metric.delta.startsWith('-') && (metric.label.includes('이탈률') || metric.label.includes('로딩'))
              ? 'bg-green-500'
              : 'bg-blue-500'
          }`}
        />
      </div>
    </div>
  )
}