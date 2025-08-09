'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import { AccessibleButton, AccessibleLink } from '@/components/ui/AccessibleComponents'
import { ServiceAnalytics } from '@/components/analytics/Analytics'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ServiceAnalytics.completeForm('contact', {
      page: 'footer',
      form_location: 'global_footer'
    })
  }

  const handleSocialClick = (platform: string) => {
    ServiceAnalytics.clickServiceCTA('footer-social', 'secondary', `${platform} Social Media`)
  }

  const currentYear = new Date().getFullYear()

  const navigationLinks = {
    services: [
      { href: '/services/web-development', label: '웹사이트 개발' },
      { href: '/services/ui-ux-design', label: 'UI/UX 디자인' },
      { href: '/services/performance-optimization', label: '성능 최적화' },
      { href: '/services/digital-marketing', label: '디지털 마케팅' },
      { href: '/services/maintenance-support', label: '유지보수 & 지원' },
      { href: '/services/global-expansion', label: '글로벌 확장' }
    ],
    company: [
      { href: '/about', label: '회사 소개' },
      { href: '/portfolio', label: '포트폴리오' },
      { href: '/case-studies', label: '사례 연구' },
      { href: '/insights', label: '인사이트' },
      { href: '/contact', label: '문의하기' },
      { href: '/careers', label: '채용 정보' }
    ],
    legal: [
      { href: '/privacy', label: '개인정보처리방침' },
      { href: '/terms', label: '이용약관' },
      { href: '/cookies', label: '쿠키 정책' },
      { href: '/accessibility', label: '접근성 정책' }
    ]
  }

  const contactInfo = [
    {
      icon: Phone,
      label: '전화',
      value: '+82-2-1234-5678',
      href: 'tel:+82-2-1234-5678'
    },
    {
      icon: Mail,
      label: '이메일',
      value: 'hello@chiro.agency',
      href: 'mailto:hello@chiro.agency'
    },
    {
      icon: MapPin,
      label: '주소',
      value: '서울특별시 강남구 테헤란로 123, 45층',
      href: 'https://maps.google.com/?q=서울특별시+강남구+테헤란로+123'
    }
  ]

  const socialLinks = [
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/chiro_agency',
      color: 'hover:text-blue-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/chiro-agency',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/chiro.agency',
      color: 'hover:text-pink-400'
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://youtube.com/@chiroagency',
      color: 'hover:text-red-500'
    }
  ]

  return (
    <footer className={`bg-background-primary border-t border-shadow-gray/30 ${className}`} role="contentinfo">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-shadow-gray/30">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-pretendard font-bold text-text-primary mb-4 text-2xl md:text-3xl">
                최신 디지털 트렌드와 <span className="text-gradient">인사이트</span>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                매월 업계 전문가가 큐레이션한 디지털 마케팅 트렌드, 개발 베스트 프랙티스, 
                그리고 비즈니스 성장 전략을 받아보세요.
              </p>
            </div>
            
            <div className="lg:pl-8">
              <form 
                onSubmit={handleNewsletterSubmit}
                className="space-y-4"
                aria-label="뉴스레터 구독"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      이메일 주소
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="이메일 주소를 입력하세요"
                      className="w-full px-4 py-3 bg-background-secondary border border-shadow-gray/30 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                      aria-required="true"
                    />
                  </div>
                  <AccessibleButton
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-primary whitespace-nowrap"
                    aria-label="뉴스레터 구독하기"
                  >
                    구독하기
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </AccessibleButton>
                </div>
                <p className="text-xs text-text-tertiary">
                  언제든 구독 해지가 가능합니다. 
                  <AccessibleLink href="/privacy" className="text-primary hover:text-primary/80">
                    개인정보처리방침
                  </AccessibleLink>
                  을 확인하세요.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link href="/" className="text-2xl font-pretendard font-bold text-primary">
                  CHIRO
                </Link>
                <p className="text-text-secondary mt-2 leading-relaxed">
                  AI 기반 개발 워크플로우와 엔터프라이즈급 솔루션으로 
                  비즈니스 디지털 혁신을 선도하는 전문 에이전시입니다.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon
                  return (
                    <AccessibleLink
                      key={index}
                      href={contact.href}
                      className="flex items-center text-text-secondary hover:text-primary transition-colors text-sm"
                      showExternalIcon={contact.href.startsWith('http')}
                      onClick={() => ServiceAnalytics.clickServiceCTA('footer-contact', 'secondary', contact.label)}
                    >
                      <IconComponent className="w-4 h-4 mr-3 flex-shrink-0" aria-hidden="true" />
                      <span>{contact.value}</span>
                    </AccessibleLink>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">서비스</h3>
              <nav aria-label="서비스 링크">
                <ul className="space-y-2">
                  {navigationLinks.services.map((link, index) => (
                    <li key={index}>
                      <AccessibleLink
                        href={link.href}
                        className="text-text-secondary hover:text-primary transition-colors text-sm block py-1"
                        onClick={() => ServiceAnalytics.clickServiceCTA('footer-services', 'secondary', link.label)}
                      >
                        {link.label}
                      </AccessibleLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">회사</h3>
              <nav aria-label="회사 정보 링크">
                <ul className="space-y-2">
                  {navigationLinks.company.map((link, index) => (
                    <li key={index}>
                      <AccessibleLink
                        href={link.href}
                        className="text-text-secondary hover:text-primary transition-colors text-sm block py-1"
                        onClick={() => ServiceAnalytics.clickServiceCTA('footer-company', 'secondary', link.label)}
                      >
                        {link.label}
                      </AccessibleLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">약관 & 정책</h3>
              <nav aria-label="약관 및 정책 링크">
                <ul className="space-y-2">
                  {navigationLinks.legal.map((link, index) => (
                    <li key={index}>
                      <AccessibleLink
                        href={link.href}
                        className="text-text-secondary hover:text-primary transition-colors text-sm block py-1"
                        onClick={() => ServiceAnalytics.clickServiceCTA('footer-legal', 'secondary', link.label)}
                      >
                        {link.label}
                      </AccessibleLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">소셜 미디어</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <AccessibleLink
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-background-secondary hover:bg-background-surface border border-shadow-gray/30 rounded-lg flex items-center justify-center text-text-secondary ${social.color} transition-all duration-200`}
                      aria-label={`${social.label}에서 CHIRO 팔로우하기`}
                      showExternalIcon={false}
                      onClick={() => handleSocialClick(social.label)}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </AccessibleLink>
                  )
                })}
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-text-secondary mb-2">
                  <strong className="text-text-primary">인증 및 파트너십</strong>
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-text-tertiary">
                  <span className="bg-background-secondary px-2 py-1 rounded">Google Partner</span>
                  <span className="bg-background-secondary px-2 py-1 rounded">Vercel Partner</span>
                  <span className="bg-background-secondary px-2 py-1 rounded">AWS Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-shadow-gray/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-text-tertiary">
              <p>© {currentYear} CHIRO Agency. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline">|</span>
                <span>사업자등록번호: 123-45-67890</span>
                <span className="hidden sm:inline">|</span>
                <span>대표: 김철수</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <AccessibleLink
                href="/sitemap.xml"
                className="text-text-tertiary hover:text-primary transition-colors"
                onClick={() => ServiceAnalytics.clickServiceCTA('footer-utility', 'secondary', 'Sitemap')}
              >
                사이트맵
              </AccessibleLink>
              <span className="text-shadow-gray/50">|</span>
              <AccessibleLink
                href="/rss.xml"
                className="text-text-tertiary hover:text-primary transition-colors"
                onClick={() => ServiceAnalytics.clickServiceCTA('footer-utility', 'secondary', 'RSS Feed')}
              >
                RSS
              </AccessibleLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}