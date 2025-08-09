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
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  budget?: string
}