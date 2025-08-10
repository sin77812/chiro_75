'use client'

import React, { useState, useRef, useEffect, ReactNode, ImgHTMLAttributes, VideoHTMLAttributes } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

// Lazy Loading Image Component
interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  className = '',
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate a blur data URL if not provided
  const defaultBlurDataURL = blurDataURL || 
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  if (hasError) {
    return (
      <div 
        className={`bg-shadow-gray/20 rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img" 
        aria-label={`Failed to load image: ${alt}`}
      >
        <div className="text-center text-neutral-light/50">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-shadow-gray/20 animate-pulse" />
      )}
    </div>
  )
}

// Optimized Video Component
interface OptimizedVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  src: string | { mp4?: string; webm?: string; poster?: string }
  poster?: string
  width?: number
  height?: number
  className?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  lazy?: boolean
  placeholder?: ReactNode
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedVideo({
  src,
  poster,
  width,
  height,
  className = '',
  controls = true,
  autoPlay = false,
  muted = autoPlay, // Auto-mute if autoplay is enabled
  loop = false,
  preload = 'metadata',
  lazy = true,
  placeholder,
  onLoad,
  onError,
  ...props
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(!lazy)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => observer.disconnect()
  }, [lazy])

  const handleLoadedData = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  if (hasError) {
    return (
      <div 
        className={`bg-shadow-gray/20 rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img" 
        aria-label="Video failed to load"
      >
        <div className="text-center text-neutral-light/50">
          <Play className="w-8 h-8 mx-auto mb-2" />
          <p className="text-xs">Video unavailable</p>
        </div>
      </div>
    )
  }

  const sources = typeof src === 'string' ? { mp4: src } : src

  return (
    <div className={`relative group ${className}`}>
      {!isVisible ? (
        <div 
          className="aspect-video bg-shadow-gray/20 rounded-lg flex items-center justify-center"
          style={{ width, height }}
        >
          {placeholder || (
            <div className="text-center text-neutral-light/50">
              <Play className="w-8 h-8 mx-auto mb-2" />
              <p className="text-xs">Loading video...</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            width={width}
            height={height}
            poster={poster || (typeof src === 'object' ? src.poster : undefined)}
            controls={controls}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            preload={preload}
            onLoadedData={handleLoadedData}
            onError={handleError}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className={`rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            {...props}
          >
            {sources.webm && (
              <source src={sources.webm} type="video/webm" />
            )}
            {sources.mp4 && (
              <source src={sources.mp4} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>

          {isLoading && (
            <div className="absolute inset-0 bg-shadow-gray/20 animate-pulse rounded-lg" />
          )}

          {/* Custom Controls Overlay */}
          {!controls && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-4 bg-dark/80 rounded-full px-4 py-2">
                <button
                  onClick={togglePlay}
                  className="p-2 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Intersection Observer Hook for lazy loading
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasBeenInView(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { elementRef, isInView, hasBeenInView }
}

// Lazy Content Loader
interface LazyContentProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export function LazyContent({
  children,
  fallback,
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}: LazyContentProps) {
  const { elementRef, hasBeenInView } = useInView({ threshold, rootMargin })

  return (
    <div ref={elementRef} className={className}>
      {hasBeenInView ? children : fallback}
    </div>
  )
}

// Performance Monitoring Hook (Client-only)
export function usePerformanceMonitoring(pageName: string) {
  // Temporarily disabled to fix server-side rendering issues
  // TODO: Re-implement as client-only component
  return null
}

// Preload Component for critical resources
interface PreloadProps {
  href: string
  as: 'image' | 'video' | 'font' | 'style' | 'script'
  type?: string
  crossOrigin?: 'anonymous' | 'use-credentials'
  media?: string
}

export function Preload({ href, as, type, crossOrigin, media }: PreloadProps) {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    if (crossOrigin) link.crossOrigin = crossOrigin
    if (media) link.media = media

    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [href, as, type, crossOrigin, media])

  return null
}

// Resource Hints Component
interface ResourceHintsProps {
  prefetch?: string[]
  preconnect?: string[]
  dnsPrefetch?: string[]
}

export function ResourceHints({ prefetch = [], preconnect = [], dnsPrefetch = [] }: ResourceHintsProps) {
  useEffect(() => {
    const links: HTMLLinkElement[] = []

    // DNS Prefetch
    dnsPrefetch.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = href
      document.head.appendChild(link)
      links.push(link)
    })

    // Preconnect
    preconnect.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = href
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
      links.push(link)
    })

    // Prefetch
    prefetch.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = href
      document.head.appendChild(link)
      links.push(link)
    })

    return () => {
      links.forEach(link => {
        if (link.parentNode) {
          document.head.removeChild(link)
        }
      })
    }
  }, [prefetch, preconnect, dnsPrefetch])

  return null
}