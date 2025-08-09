import { BlogPost } from '@/types'

interface BlogStructuredDataProps {
  post: BlogPost
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const blogPostingData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.seo?.ogImage || post.thumbnail,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.links.website,
      jobTitle: post.author.role,
      image: post.author.avatar,
      sameAs: [
        post.author.links.linkedin,
        post.author.links.twitter,
        post.author.links.github
      ].filter(Boolean)
    },
    publisher: {
      '@type': 'Organization',
      name: 'CHIRO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chiro.kr/logo.png',
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://chiro.kr/insights/${post.slug}`
    },
    articleSection: post.category,
    keywords: post.tags,
    wordCount: post.content.length,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: 'ko-KR',
    about: post.tags.map(tag => ({
      '@type': 'Thing',
      name: tag
    })),
    mentions: post.relatedServices.map(service => ({
      '@type': 'Service',
      name: service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      url: `https://chiro.kr/services/${service}`
    }))
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://chiro.kr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '인사이트',
        item: 'https://chiro.kr/insights'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://chiro.kr/insights/${post.slug}`
      }
    ]
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CHIRO',
    url: 'https://chiro.kr',
    logo: 'https://chiro.kr/logo.png',
    description: 'AI-driven digital innovation company specializing in UX/UI design, web development, and business transformation.',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '테헤란로 123',
      addressLocality: '강남구',
      addressRegion: '서울시',
      addressCountry: 'KR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-1234-5678',
      contactType: 'customer service',
      email: 'hello@chiro.kr'
    },
    sameAs: [
      'https://www.linkedin.com/company/chiro-kr',
      'https://github.com/chiro-kr'
    ]
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CHIRO',
    url: 'https://chiro.kr',
    description: 'Digital innovation insights and case studies from CHIRO experts',
    publisher: {
      '@type': 'Organization',
      name: 'CHIRO'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://chiro.kr/insights?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
    </>
  )
}