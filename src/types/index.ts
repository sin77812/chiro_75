export interface Client {
  id: string
  name: string
  logo: string
  alt: string
  url?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  benefits: string[]
  features?: string[]
}

export interface Portfolio {
  id: string
  title: string
  slug: string
  category: 'manufacturing' | 'food' | 'service' | 'corporate'
  thumbnail: string
  beforeImage?: string
  afterImage?: string
  tags: string[]
  kpis: {
    metric: string
    value: string
    improvement?: string
  }[]
  description: string
  url?: string
  completedAt: string
}

export interface Testimonial {
  id: string
  quote: string
  author: {
    name: string
    position: string
    company: string
    avatar?: string
  }
  rating: number
}

export interface Award {
  id: string
  title: string
  year: string
  organization: string
  badge?: string
  url?: string
}

export interface Author {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  links: {
    website?: string
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
  author: Author
  relatedServices: string[]
  newsletterCTA: boolean
  featured: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
    canonicalUrl?: string
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  budget?: string
  timeline?: string
  projectType?: string
  privacyConsent: boolean
  marketingConsent?: boolean
}

export interface ContactSettings {
  emails: string[]
  phone: string
  calendarUrl?: string
  faqs: {
    question: string
    answer: string
  }[]
  privacyLink: string
  consents: {
    privacy: string
    marketing: string
  }
}

export interface CaseStudyMetric {
  label: string
  before: string | number
  after: string | number
  delta: string
  unit?: string
}

export interface CaseStudyQuote {
  quote: string
  author: string
  position: string
  company: string
  avatar?: string
}

export interface CaseStudyResource {
  title: string
  type: 'pdf' | 'link' | 'video'
  url: string
  description?: string
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  sector: string
  thumbnail: string
  heroImage: string
  overview: {
    problem: string
    goals: string[]
    role: string
    duration: string
    team: string[]
  }
  challenges: string[]
  strategy: string[]
  designHighlights: string[]
  techStack: string[]
  metrics: CaseStudyMetric[]
  quotes: CaseStudyQuote[]
  gallery: {
    image: string
    caption: string
    alt: string
  }[]
  resources: CaseStudyResource[]
  publishedAt: string
  readTime: number
  tags: string[]
  nextProject?: string
}