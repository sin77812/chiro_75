'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import MobileMenu from '@/components/ui/MobileMenu'

// 💡 교체 포인트: 메뉴 항목들을 필요에 따라 수정하세요
const menuItems = [
  { label: '서비스', href: '/services', isHighlighted: false },
  { label: '포트폴리오', href: '/portfolio', isHighlighted: false },
  { label: '사례 연구', href: '/case-studies', isHighlighted: false }, // 현재 /case/[slug] 라우트 없음
  { label: '회사 소개', href: '/about', isHighlighted: false },
  { label: '인사이트', href: '/insights', isHighlighted: false }, // 현재 라우트 없음
  { label: '연락하기', href: '/contact', isHighlighted: true } // CTA 버튼
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // 스크롤 상태 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 경로 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
          {
            // 스크롤 전: 반투명 + 큰 높이
            'bg-dark/70 backdrop-blur-md h-18': !isScrolled,
            // 스크롤 후: 더 불투명 + 축소된 높이
            'bg-dark/90 backdrop-blur-lg h-16 shadow-lg': isScrolled
          }
        )}
      >
        {/* 하단 그라디언트 테두리 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* 로고 */}
            <Logo 
              variant={isScrolled ? 'compact' : 'default'}
              className="transition-all duration-300"
            />

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="메인 메뉴">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                const isCTA = item.isHighlighted

                // CTA 버튼 스타일
                if (isCTA) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-6 py-2.5 bg-primary text-dark font-inter font-semibold text-sm rounded-lg",
                        "hover:bg-primary/90 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/25",
                        "transition-all duration-200 ease-out",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  )
                }

                // 일반 메뉴 항목
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 font-inter font-medium text-sm transition-all duration-200 ease-out rounded-lg group",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-dark",
                      {
                        'text-primary': isActive,
                        'text-neutral-light hover:text-white': !isActive
                      }
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    
                    {/* 호버 밑줄 애니메이션 */}
                    <span 
                      className={cn(
                        "absolute bottom-0 left-4 h-0.5 bg-primary transition-all duration-250 ease-out",
                        {
                          'w-[calc(100%-2rem)]': isActive, // 현재 페이지: 항상 표시
                          'w-0 group-hover:w-[calc(100%-2rem)]': !isActive // 호버 시만 표시
                        }
                      )}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 text-neutral-light hover:text-white hover:bg-shadow-gray/20 rounded-lg",
                "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label="메뉴 열기"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* backdrop-blur fallback을 지원하지 않는 브라우저용 */}
        <style jsx>{`
          @supports not (backdrop-filter: blur(12px)) {
            header {
              background-color: rgba(14, 17, 17, 0.95) !important;
            }
          }
        `}</style>
      </header>

      {/* 모바일 메뉴 */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  )
}