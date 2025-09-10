'use client'

import { Service } from '@/types/services'

interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  foundingDate?: string
  founder?: {
    '@type': 'Person'
    name: string
  }
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    email: string
    contactType: 'customer service'
    availableLanguage: string[]
  }
  sameAs: string[]
  address: {
    '@type': 'PostalAddress'
    addressCountry: string
    addressRegion?: string
    addressLocality?: string
  }
}

interface ServiceSchema {
  '@context': 'https://schema.org'
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
    url: string
  }
  serviceType: string
  category: string
  areaServed: string[]
  hasOfferCatalog: {
    '@type': 'OfferCatalog'
    name: string
    itemListElement: Array<{
      '@type': 'OfferCatalog'
      name: string
      description: string
      itemListElement: Array<{
        '@type': 'Offer'
        itemOffered: {
          '@type': 'Service'
          name: string
          description: string
        }
      }>
    }>
  }
  offers?: {
    '@type': 'AggregateOffer'
    lowPrice: string
    highPrice: string
    priceCurrency: string
    offerCount: number
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
    bestRating: number
    worstRating: number
  }
}

interface WebPageSchema {
  '@context': 'https://schema.org'
  '@type': 'WebPage'
  url: string
  name: string
  description: string
  isPartOf: {
    '@type': 'WebSite'
    name: string
    url: string
  }
  about: {
    '@type': 'Thing'
    name: string
  }
  breadcrumb: {
    '@type': 'BreadcrumbList'
    itemListElement: Array<{
      '@type': 'ListItem'
      position: number
      name: string
      item?: string
    }>
  }
}

interface FAQPageSchema {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

interface LocalBusinessSchema {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness'
  '@id': string
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    '@type': 'PostalAddress'
    addressCountry: string
    addressRegion?: string
    addressLocality?: string
    postalCode?: string
    streetAddress?: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  priceRange: string
  acceptsReservations?: boolean
}

// Organization Schema Component
export function OrganizationStructuredData() {
  const organizationSchema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '치로 웹디자인',
    url: 'https://www.chiroweb.co.kr',
    logo: 'https://www.chiroweb.co.kr/images/logo.png',
    description: '치로는 중소기업 전문 웹디자인 에이전시입니다. 2주 완성 프리미엄 웹사이트 제작으로 평균 전환율 332% 향상을 도와드립니다.',
    foundingDate: '2017',
    founder: {
      '@type': 'Person',
      name: '정원'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-CHIRO-AI',
      email: 'chiroweb75@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['Korean', 'English']
    },
    sameAs: [
      'https://linkedin.com/company/chiro-agency',
      'https://twitter.com/chiro_agency',
      'https://github.com/chiro-agency'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressRegion: '서울특별시',
      addressLocality: '강남구'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema)
      }}
    />
  )
}

// Services Page Schema Component
export function ServicesPageStructuredData() {
  const serviceSchema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Transformation Services',
    description: 'Comprehensive digital services including AI-powered web development, UX/UI design, performance optimization, and digital strategy consulting.',
    provider: {
      '@type': 'Organization',
      name: '치로 웹디자인',
      url: 'https://www.chiroweb.co.kr'
    },
    serviceType: 'Digital Agency Services',
    category: 'Web Development & Digital Strategy',
    areaServed: ['US', 'CA', 'Global'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services Catalog',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Development Services',
          description: 'Web development and technical solutions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Web Development',
                description: 'AI-powered web development with 40% faster delivery and intelligent optimization'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Performance Optimization',
                description: 'Website speed optimization and Core Web Vitals improvement'
              }
            }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Design Services',
          description: 'User experience and visual design solutions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'UX/UI Design',
                description: 'User-centered design that increases conversions by 200%+'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Design Systems',
                description: 'Scalable design systems that accelerate development by 250%'
              }
            }
          ]
        }
      ]
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '15000',
      highPrice: '100000',
      priceCurrency: 'USD',
      offerCount: 6
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 47,
      bestRating: 5,
      worstRating: 1
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema)
      }}
    />
  )
}

// Individual Service Schema Component
export function ServiceDetailStructuredData({ service }: { service: Service }) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: '치로 웹디자인',
      url: 'https://www.chiroweb.co.kr'
    },
    serviceType: service.category,
    category: service.category,
    areaServed: ['US', 'CA', 'Global'],
    url: `https://www.chiroweb.co.kr/services/${service.id}`,
    // Add offers if packages exist
    ...(service.packages && {
      offers: service.packages.map(pkg => ({
        '@type': 'Offer',
        name: pkg.name,
        description: pkg.description,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: pkg.price,
          priceCurrency: 'USD'
        },
        availabilityEnds: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      }))
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema)
      }}
    />
  )
}

// FAQ Schema Component
interface FAQStructuredDataProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const faqSchema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  )
}

// Breadcrumb Schema Component
interface BreadcrumbProps {
  items: Array<{
    name: string
    item?: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.item && { item: item.item })
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />
  )
}

// WebPage Schema Component
interface WebPageStructuredDataProps {
  title: string
  description: string
  url: string
  breadcrumbs: Array<{ name: string; item?: string }>
}

export function WebPageStructuredData({ title, description, url, breadcrumbs }: WebPageStructuredDataProps) {
  const webPageSchema: WebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
    isPartOf: {
      '@type': 'WebSite',
      name: '치로 웹디자인',
      url: 'https://www.chiroweb.co.kr'
    },
    about: {
      '@type': 'Thing',
      name: 'Digital Services'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(item.item && { item: item.item })
      }))
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(webPageSchema)
      }}
    />
  )
}

// Review Schema Component (for testimonials)
interface ReviewStructuredDataProps {
  reviews: Array<{
    author: string
    rating: number
    reviewBody: string
    datePublished?: string
  }>
  itemReviewed: {
    name: string
    description: string
  }
}

export function ReviewStructuredData({ reviews, itemReviewed }: ReviewStructuredDataProps) {
  const reviewsSchema = reviews.map(review => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: itemReviewed.name,
      description: itemReviewed.description
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished || new Date().toISOString()
  }))

  return (
    <>
      {reviewsSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  )
}