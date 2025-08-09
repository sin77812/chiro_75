// About page TypeScript interfaces for CMS integration

export interface Mission {
  positioning: string
  description: string
}

export interface Differentiator {
  title: string
  description: string
  icon: string
  metrics: string
  details: string[]
}

export interface ProcessStep {
  step: number
  title: string
  duration: string
  description: string
  deliverables: string[]
  tools: string[]
}

export interface TeamMember {
  name: string
  role: string
  bio?: string
  image?: string
  skills?: string[]
  speciality?: string
}

export interface Team {
  founder: TeamMember
  partners: TeamMember[]
}

export interface Award {
  title: string
  category: string
  year: number
  image?: string
}

export interface TechStackCategory {
  category: string
  technologies: string[]
}

export interface CSRSection {
  title: string
  description: string
  features: string[]
}

export interface CSR {
  accessibility: CSRSection
  privacy: CSRSection
  security: CSRSection
}

export interface MediaKitItem {
  type: string
  format: string
  url: string
}

export interface MediaKit {
  title: string
  description: string
  downloads: MediaKitItem[]
}

export interface AboutPageData {
  mission: Mission
  differentiators: Differentiator[]
  processSteps: ProcessStep[]
  team: Team
  awards: Award[]
  certifications: string[]
  partnerLogos: string[]
  techStack: TechStackCategory[]
  csr: CSR
  mediaKit: MediaKit
}

// Analytics events for About page
export interface AboutAnalyticsEvent {
  differentiator_expand?: string
  process_step_expand?: string
  award_logo_view?: string
  media_kit_download?: string
  csr_section_view?: string
  team_member_view?: string
  tech_stack_view?: string
}

// A/B Testing variants
export interface AboutABTest {
  differentiator_count: 3 | 5 // Test 3 vs 5 differentiator cards
  team_placement: 'top' | 'middle' | 'bottom' // Team section placement
  process_style: 'timeline' | 'cards' | 'accordion' // Process presentation style
}