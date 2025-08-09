// Core service data types for CMS integration

export interface MiniCase {
  client: string
  result: string
  description: string
}

export interface ServiceBenefit {
  title?: string
  description: string
  icon?: string
}

export interface ServiceFeature {
  name: string
  description?: string
  included?: boolean
}

export interface ProblemSolution {
  problems: string[]
  solutions: string[]
}

export interface Deliverable {
  item: string
  included: boolean
  note?: string
  category?: 'core' | 'advanced' | 'enterprise'
}

export interface TechStackItem {
  name: string
  category: string
  logo?: string
  description?: string
  url?: string
}

export interface ServicePackage {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  popular?: boolean
  cta?: string
}

export interface BeforeAfterCase {
  client: string
  before: {
    metric: string
    value: string
    issue: string
  }
  after: {
    metric: string
    value: string
    improvement: string
  }
  details?: string
  image?: string
  tags?: string[]
}

export interface BeforeAfter {
  title: string
  subtitle?: string
  cases: BeforeAfterCase[]
}

export interface ServiceTestimonial {
  quote: string
  author: string
  position: string
  company: string
  avatar?: string
  rating?: number
  date?: string
}

export interface ServiceProcess {
  step: string
  title: string
  description: string
  duration: string
  deliverables: string[]
  tools?: string[]
}

export interface ServiceFAQ {
  question: string
  answer: string
  category?: string
}

// Main Service interface
export interface Service {
  id: string
  title: string
  shortBenefit: string
  description: string
  icon: string
  category: string
  featured?: boolean
  
  // Basic info
  miniCase?: MiniCase
  benefits: string[]
  features: string[]
  
  // Detailed content for service pages  
  problemSolution?: ProblemSolution
  deliverables?: Deliverable[]
  techStack?: TechStackItem[]
  packages?: ServicePackage[]
  beforeAfter?: BeforeAfter
  testimonials?: ServiceTestimonial[]
  relatedServices?: string[]
  
  // SEO and metadata
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  schema?: ServiceSchema
  
  // Content management
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  updatedAt?: string
  author?: string
}

// Extended service data with CMS fields
export interface ExtendedService extends Service {
  // Content sections
  heroVideo?: {
    url: string
    poster?: string
    duration?: number
    description?: string
  }
  
  // Additional content blocks
  contentBlocks?: ServiceContentBlock[]
  
  // Analytics and tracking
  analytics?: {
    trackingEvents: AnalyticsEvent[]
    conversionGoals: string[]
    abTestVariants?: ABTestVariant[]
  }
  
  // CMS workflow
  workflow?: {
    reviewRequired: boolean
    approvedBy?: string
    publishSchedule?: string
  }
}

export interface ServiceContentBlock {
  id: string
  type: 'text' | 'image' | 'video' | 'cta' | 'testimonial' | 'stats' | 'comparison'
  title?: string
  content: any
  order: number
  visible: boolean
}

export interface AnalyticsEvent {
  name: string
  category: string
  label?: string
  parameters?: Record<string, any>
}

export interface ABTestVariant {
  id: string
  name: string
  description: string
  traffic: number // percentage
  elements: {
    selector: string
    changes: Record<string, any>
  }[]
}

// Structured data schema for SEO
export interface ServiceSchema {
  '@context': 'https://schema.org/'
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
    url: string
  }
  serviceType: string
  areaServed?: string[]
  offers?: {
    '@type': 'Offer'
    name: string
    description: string
    priceRange?: string
    availability: string
  }[]
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
  }
}

// API response types
export interface ServiceResponse {
  service: Service
  relatedServices: Service[]
  metadata: {
    totalViews: number
    conversionRate: number
    lastUpdated: string
  }
}

export interface ServicesListResponse {
  services: Service[]
  categories: ServiceCategory[]
  featured: Service[]
  metadata: {
    total: number
    page: number
    limit: number
  }
}

export interface ServiceCategory {
  id: string
  name: string
  description?: string
  icon?: string
  serviceCount: number
  featured?: boolean
}

// Form and interaction types
export interface ServiceInquiry {
  serviceId: string
  name: string
  email: string
  company?: string
  budgetRange?: string
  projectDescription: string
  timeline?: string
  additionalServices?: string[]
  source?: string
}

export interface ServiceQuote {
  services: string[]
  clientInfo: {
    name: string
    email: string
    company: string
    website?: string
  }
  projectDetails: {
    budget: string
    timeline: string
    description: string
    requirements: string[]
  }
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'declined'
}

// Performance and analytics
export interface ServiceMetrics {
  serviceId: string
  period: string
  metrics: {
    pageViews: number
    uniqueVisitors: number
    avgTimeOnPage: number
    bounceRate: number
    conversionRate: number
    inquiries: number
    quotes: number
  }
  topReferrers: string[]
  searchKeywords: string[]
}

// CMS content management
export interface ServiceDraft extends Omit<Service, 'status'> {
  status: 'draft'
  changes: {
    field: keyof Service
    oldValue: any
    newValue: any
    author: string
    timestamp: string
  }[]
  comments: {
    id: string
    author: string
    message: string
    timestamp: string
    resolved?: boolean
  }[]
}