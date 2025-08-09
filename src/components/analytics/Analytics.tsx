'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | object,
      config?: object
    ) => void
    dataLayer: any[]
  }
}

// Analytics event types
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Google Analytics Configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export function GoogleAnalytics() {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') return

    // Load gtag script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize dataLayer and gtag
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `
    document.head.appendChild(script2)

    return () => {
      // Cleanup scripts
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [])

  return null
}

// Page view tracking hook
export function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams ? `?${searchParams}` : '')
      
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href
      })

      // Track page view
      trackEvent({
        action: 'page_view',
        category: 'Navigation',
        label: pathname,
        custom_parameters: {
          page_path: url,
          page_title: document.title
        }
      })
    }
  }, [pathname, searchParams])
}

// Generic event tracking function
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters
    })
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event)
  }
}

// Service-specific tracking functions
export const ServiceAnalytics = {
  // Track service page views
  viewService: (serviceId: string, serviceName: string) => {
    trackEvent({
      action: 'view_service',
      category: 'Services',
      label: serviceId,
      custom_parameters: {
        service_id: serviceId,
        service_name: serviceName
      }
    })
  },

  // Track service CTA clicks
  clickServiceCTA: (serviceId: string, ctaType: 'primary' | 'secondary', ctaText: string) => {
    trackEvent({
      action: 'click_service_cta',
      category: 'Conversion',
      label: `${serviceId}_${ctaType}`,
      custom_parameters: {
        service_id: serviceId,
        cta_type: ctaType,
        cta_text: ctaText
      }
    })
  },

  // Track package interest
  viewPackage: (serviceId: string, packageName: string, packagePrice: string) => {
    trackEvent({
      action: 'view_package',
      category: 'Services',
      label: `${serviceId}_${packageName}`,
      custom_parameters: {
        service_id: serviceId,
        package_name: packageName,
        package_price: packagePrice
      }
    })
  },

  // Track FAQ interactions
  expandFAQ: (question: string, index: number) => {
    trackEvent({
      action: 'expand_faq',
      category: 'Engagement',
      label: `faq_${index}`,
      custom_parameters: {
        faq_question: question,
        faq_index: index
      }
    })
  },

  // Track form interactions
  startForm: (formType: 'quote' | 'consultation' | 'contact') => {
    trackEvent({
      action: 'form_start',
      category: 'Lead Generation',
      label: formType,
      custom_parameters: {
        form_type: formType
      }
    })
  },

  // Track form completions
  completeForm: (formType: 'quote' | 'consultation' | 'contact', formData?: Record<string, any>) => {
    trackEvent({
      action: 'form_complete',
      category: 'Conversion',
      label: formType,
      value: 1,
      custom_parameters: {
        form_type: formType,
        ...formData
      }
    })
  },

  // Track video interactions
  playVideo: (videoId: string, videoTitle: string) => {
    trackEvent({
      action: 'play_video',
      category: 'Engagement',
      label: videoId,
      custom_parameters: {
        video_id: videoId,
        video_title: videoTitle
      }
    })
  },

  // Track scroll depth
  scrollDepth: (depth: 25 | 50 | 75 | 90) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'Engagement',
      label: `${depth}%`,
      value: depth,
      custom_parameters: {
        scroll_depth: depth,
        page_path: window.location.pathname
      }
    })
  },

  // Track external link clicks
  clickExternalLink: (url: string, linkText: string, location: string) => {
    trackEvent({
      action: 'click_external_link',
      category: 'Outbound Links',
      label: url,
      custom_parameters: {
        link_url: url,
        link_text: linkText,
        link_location: location
      }
    })
  }
}

// Scroll depth tracking hook
export function useScrollTracking() {
  useEffect(() => {
    const scrollDepthThresholds = [25, 50, 75, 90]
    const trackedDepths = new Set<number>()

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100

      for (const threshold of scrollDepthThresholds) {
        if (scrolled >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold)
          ServiceAnalytics.scrollDepth(threshold as 25 | 50 | 75 | 90)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

// Error tracking
export function trackError(error: Error, errorInfo?: Record<string, any>) {
  trackEvent({
    action: 'javascript_error',
    category: 'Errors',
    label: error.message,
    custom_parameters: {
      error_message: error.message,
      error_stack: error.stack,
      ...errorInfo
    }
  })
}

// Performance tracking
export function trackPerformance(metric: string, value: number, additionalData?: Record<string, any>) {
  trackEvent({
    action: 'performance_metric',
    category: 'Performance',
    label: metric,
    value: Math.round(value),
    custom_parameters: {
      metric_name: metric,
      metric_value: value,
      ...additionalData
    }
  })
}

// User engagement tracking
export const EngagementTracking = {
  // Track time spent on page
  trackTimeOnPage: (startTime: number) => {
    const timeSpent = (Date.now() - startTime) / 1000 // seconds
    
    if (timeSpent > 10) { // Only track if user spent more than 10 seconds
      trackEvent({
        action: 'time_on_page',
        category: 'Engagement',
        label: window.location.pathname,
        value: Math.round(timeSpent),
        custom_parameters: {
          time_spent: timeSpent,
          page_path: window.location.pathname
        }
      })
    }
  },

  // Track user interactions
  trackInteraction: (interactionType: string, element: string, location: string) => {
    trackEvent({
      action: 'user_interaction',
      category: 'Engagement',
      label: `${interactionType}_${element}`,
      custom_parameters: {
        interaction_type: interactionType,
        element_name: element,
        element_location: location
      }
    })
  }
}

// Enhanced ecommerce tracking (for service packages)
export const EcommerceTracking = {
  // Track when user views service packages
  viewItemList: (services: Array<{ id: string; name: string; category: string }>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_id: 'services',
        item_list_name: 'Services',
        items: services.map((service, index) => ({
          item_id: service.id,
          item_name: service.name,
          item_category: service.category,
          index: index
        }))
      })
    }
  },

  // Track when user shows interest in a service
  addToCart: (serviceId: string, serviceName: string, packageName?: string, price?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: price ? parseInt(price.replace(/[^0-9]/g, '')) : 0,
        items: [{
          item_id: serviceId,
          item_name: serviceName,
          item_category: 'Service',
          item_variant: packageName,
          quantity: 1
        }]
      })
    }
  },

  // Track consultation bookings
  purchase: (serviceId: string, serviceName: string, packageName?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: `consultation_${Date.now()}`,
        value: value || 0,
        currency: 'USD',
        items: [{
          item_id: serviceId,
          item_name: serviceName,
          item_category: 'Service',
          item_variant: packageName,
          quantity: 1
        }]
      })
    }
  }
}

// Analytics Provider Component
interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  usePageTracking()
  useScrollTracking()

  useEffect(() => {
    // Track page load performance
    const startTime = Date.now()
    
    const handleBeforeUnload = () => {
      EngagementTracking.trackTimeOnPage(startTime)
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      EngagementTracking.trackTimeOnPage(startTime)
    }
  }, [])

  return <>{children}</>
}

// About Page Analytics
export const AboutAnalytics = {
  viewDifferentiator: (differentiatorId: string, title: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'about_differentiator_view', {
        event_category: 'About',
        event_label: differentiatorId,
        differentiator_title: title,
        page_section: 'why_chiro'
      })
    }
  },

  expandProcessStep: (stepNumber: number, title: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'about_process_expand', {
        event_category: 'About',
        event_label: `step_${stepNumber}`,
        step_title: title,
        page_section: 'process'
      })
    }
  },

  viewAwardLogo: (awardTitle: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'about_award_view', {
        event_category: 'About',
        event_label: awardTitle,
        page_section: 'awards'
      })
    }
  },

  downloadMediaKit: (itemType: string, format: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'about_media_download', {
        event_category: 'About',
        event_label: itemType,
        file_format: format,
        page_section: 'media_kit'
      })
    }
  },

  viewCSRSection: (sectionType: 'accessibility' | 'privacy' | 'security') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'about_csr_view', {
        event_category: 'About',
        event_label: sectionType,
        page_section: 'csr_declaration'
      })
    }
  },

  viewTeamMember: (memberName: string, role: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'about_team_view', {
        event_category: 'About',
        event_label: memberName,
        member_role: role,
        page_section: 'team'
      })
    }
  },

  viewTechStack: (category: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'about_tech_view', {
        event_category: 'About',
        event_label: category,
        page_section: 'tech_stack'
      })
    }
  }
}