import { CaseStudy } from '@/types'

interface CaseStudyStructuredDataProps {
  caseStudy: CaseStudy
}

export default function CaseStudyStructuredData({ caseStudy }: CaseStudyStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.overview.problem,
    image: caseStudy.heroImage,
    datePublished: caseStudy.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'CHIRO',
      url: 'https://chiro.kr'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CHIRO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chiro.kr/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://chiro.kr/case-studies/${caseStudy.slug}`
    },
    about: {
      '@type': 'Thing',
      name: caseStudy.sector
    },
    keywords: caseStudy.tags.join(', '),
    articleSection: '사례 연구',
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CHIRO',
      url: 'https://chiro.kr'
    }
  }

  const breadcrumbStructuredData = {
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
        name: '사례 연구',
        item: 'https://chiro.kr/case-studies'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: caseStudy.title,
        item: `https://chiro.kr/case-studies/${caseStudy.slug}`
      }
    ]
  }

  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CHIRO',
    url: 'https://chiro.kr',
    logo: 'https://chiro.kr/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/chiro-kr',
      'https://github.com/chiro-kr'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-1234-5678',
      contactType: 'customer service'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData)
        }}
      />
    </>
  )
}