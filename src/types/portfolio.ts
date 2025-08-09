// Portfolio data types for CMS integration

export interface ProjectKPI {
  label: string
  value: string
  unit?: string
  improvement?: string
  context?: string
}

export interface ProjectTag {
  id: string
  name: string
  type: 'industry' | 'service' | 'achievement' | 'technology'
  color?: string
  slug: string
}

export interface Industry {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  projectCount?: number
}

export interface ServiceType {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
}

export interface ClientInfo {
  name: string
  industry: string
  logo?: string
  website?: string
  size?: 'startup' | 'small' | 'medium' | 'enterprise'
  location?: string
}

export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  poster?: string // for video
  alt: string
  caption?: string
  width?: number
  height?: number
  formats?: {
    webp?: string
    avif?: string
    mp4?: string
    webm?: string
  }
}

export interface ProjectResult {
  metric: string
  before: string | number
  after: string | number
  improvement: string
  timeframe?: string
  description?: string
}

export interface ProjectTimeline {
  phase: string
  duration: string
  description?: string
  deliverables?: string[]
}

export interface TechnicalDetails {
  platform: string[]
  technologies: string[]
  integrations?: string[]
  performance?: {
    lighthouse?: number
    pageSpeed?: number
    loadTime?: string
    coreWebVitals?: {
      lcp: string
      fid: string
      cls: string
    }
  }
}

// Main Project interface
export interface Project {
  id: string
  title: string
  slug: string
  client: ClientInfo
  
  // Basic info
  summary: string
  description?: string
  year: number
  duration?: string
  projectUrl?: string
  
  // Visual content
  coverMedia: ProjectMedia
  gallery?: ProjectMedia[]
  beforeAfterImages?: {
    before: ProjectMedia
    after: ProjectMedia
  }
  
  // Categorization
  industries: string[]
  services: string[]
  tags: string[]
  
  // Results & metrics
  kpis: ProjectKPI[]
  results?: ProjectResult[]
  testimonial?: {
    quote: string
    author: string
    position: string
    avatar?: string
    rating?: number
  }
  
  // Project details
  challenge?: string
  solution?: string
  timeline?: ProjectTimeline[]
  technicalDetails?: TechnicalDetails
  
  // Featured & status
  featured: boolean
  status: 'published' | 'draft' | 'archived'
  publishedAt?: string
  
  // SEO
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
}

// Filter types
export interface FilterOption {
  id: string
  name: string
  count?: number
  color?: string
}

export interface FilterState {
  industries: string[]
  services: string[]
  achievements: string[]
  search: string
  sortBy: 'latest' | 'impact' | 'alphabetical'
  year?: number
}

export interface FilterConfig {
  industries: FilterOption[]
  services: FilterOption[]
  achievements: FilterOption[]
  years: number[]
  sortOptions: {
    value: FilterState['sortBy']
    label: string
  }[]
}

// Portfolio page response
export interface PortfolioPageData {
  projects: Project[]
  filters: FilterConfig
  featured: Project[]
  clients: ClientInfo[]
  stats: {
    totalProjects: number
    totalClients: number
    industries: number
    avgImprovement: string
  }
}

// Analytics events
export interface PortfolioAnalyticsEvent {
  projectId?: string
  filterType?: keyof FilterState
  filterValue?: string
  sortBy?: FilterState['sortBy']
  position?: number
  viewType?: 'grid' | 'list'
}

// CMS workflow
export interface ProjectDraft extends Omit<Project, 'status'> {
  status: 'draft'
  changes: {
    field: keyof Project
    oldValue: any
    newValue: any
    author: string
    timestamp: string
  }[]
  reviewComments: {
    id: string
    author: string
    message: string
    resolved: boolean
    timestamp: string
  }[]
}

// Search and filtering
export interface SearchFilters extends FilterState {
  featured?: boolean
  clientSize?: ClientInfo['size'][]
  minKPI?: number
  hasVideo?: boolean
  hasResults?: boolean
}

export interface ProjectSearchResult {
  projects: Project[]
  totalCount: number
  filters: {
    applied: Partial<SearchFilters>
    available: FilterConfig
  }
  pagination: {
    page: number
    limit: number
    totalPages: number
  }
}

// Performance metrics
export interface PortfolioMetrics {
  pageId: string
  period: string
  metrics: {
    pageViews: number
    uniqueVisitors: number
    avgTimeOnPage: number
    bounceRate: number
    filterUsage: Record<string, number>
    projectViews: Record<string, number>
    ctaClicks: number
  }
  topProjects: {
    projectId: string
    title: string
    views: number
    ctr: number
  }[]
  popularFilters: {
    type: keyof FilterState
    value: string
    usage: number
  }[]
}

// Component props
export interface PortfolioCardProps {
  project: Project
  index: number
  variant?: 'grid' | 'list' | 'featured'
  showVideo?: boolean
  lazy?: boolean
  onView?: (project: Project) => void
  onClick?: (project: Project) => void
}

export interface PortfolioFiltersProps {
  filters: FilterConfig
  activeFilters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  onClearAll: () => void
  resultCount: number
}

export interface PortfolioGridProps {
  projects: Project[]
  loading?: boolean
  error?: string | null
  onProjectClick?: (project: Project) => void
  virtualized?: boolean
  itemsPerRow?: number
}

// Achievement types for filtering
export const ACHIEVEMENT_TYPES = {
  CONVERSION: 'conversion-increase',
  SPEED: 'speed-improvement', 
  TRAFFIC: 'traffic-growth',
  ENGAGEMENT: 'engagement-boost',
  REVENUE: 'revenue-growth',
  EFFICIENCY: 'efficiency-gain'
} as const

export type AchievementType = typeof ACHIEVEMENT_TYPES[keyof typeof ACHIEVEMENT_TYPES]

// Industry categories
export const INDUSTRY_CATEGORIES = {
  TECHNOLOGY: 'technology',
  FINTECH: 'fintech',
  HEALTHCARE: 'healthcare',
  ECOMMERCE: 'ecommerce',
  MANUFACTURING: 'manufacturing',
  EDUCATION: 'education',
  NONPROFIT: 'nonprofit',
  REAL_ESTATE: 'real-estate',
  BEAUTY: 'beauty',
  FOOD: 'food-beverage'
} as const

export type IndustryCategory = typeof INDUSTRY_CATEGORIES[keyof typeof INDUSTRY_CATEGORIES]

// Service categories
export const SERVICE_CATEGORIES = {
  WEB_DEVELOPMENT: 'web-development',
  UI_UX_DESIGN: 'ui-ux-design',
  ECOMMERCE: 'ecommerce',
  BRANDING: 'branding',
  SEO: 'seo',
  PERFORMANCE: 'performance-optimization',
  CONSULTING: 'consulting'
} as const

export type ServiceCategory = typeof SERVICE_CATEGORIES[keyof typeof SERVICE_CATEGORIES]