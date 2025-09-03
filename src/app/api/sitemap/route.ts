import { NextResponse } from 'next/server'

// Generate dynamic sitemap based on actual pages
export async function GET() {
  const baseUrl = 'https://www.chiroweb.co.kr'
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/portfolio', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/legal/privacy', priority: '0.3', changefreq: 'yearly' }
  ]

  // Dynamic case study pages (from portfolio data)
  const casePages = [
    'nexus-manufacturing',
    'koretech-solutions', 
    'global-dynamics',
    'samsung-electronics',
    'lg-display',
    'hyundai-motors',
    'sk-innovation',
    'posco-holdings',
    'naver-corp'
  ].map(slug => ({
    url: `/case/${slug}`,
    priority: '0.7',
    changefreq: 'yearly'
  }))

  const allPages = [...staticPages, ...casePages]
  const currentDate = new Date().toISOString().split('T')[0]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.url}" />
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 1 day
    }
  })
}
