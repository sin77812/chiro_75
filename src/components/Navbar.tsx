'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import MobileMenu from '@/components/ui/MobileMenu'

// 💡 교체 포인트: 메뉴 항목들을 필요에 따라 수정하세요
const menuItems = [
  { 
    label: '서비스', 
    href: '/services', 
    isHighlighted: false,
    hasDropdown: true,
    submenu: [
      { label: '웹 개발', href: '/services/web-development' },
      { label: 'UI/UX 디자인', href: '/services/ui-ux-design' },
      { label: '성능 최적화', href: '/services/performance-optimization' },
      { label: '브랜딩', href: '/services/branding' },
      { label: '마케팅 자동화', href: '/services/marketing-automation' },
      { label: '유지보수', href: '/services/maintenance' }
    ]
  },
  { label: '포트폴리오', href: '/portfolio', isHighlighted: false },
  { label: '회사 소개', href: '/about', isHighlighted: false },
  { label: '무료 견적', href: '/consultation', isHighlighted: true } // CTA 버튼
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const lastScrollY = useRef(0)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 스크롤 상태 및 방향 감지
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolled = currentScrollY > 20
      
      // 스크롤 방향 감지
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // 아래로 스크롤 & 100px 이상
        setIsHidden(true)
      } else {
        // 위로 스크롤 또는 상단 근처
        setIsHidden(false)
      }
      
      setIsScrolled(scrolled)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 경로 변경 시 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // 드롭다운 메뉴 핸들러
  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out",
          {
            // 스크롤 전: 반투명 + 큰 높이
            'bg-dark/70 backdrop-blur-md h-18': !isScrolled,
            // 스크롤 후: 더 불투명 + 축소된 높이
            'bg-dark/90 backdrop-blur-lg h-16 shadow-lg': isScrolled,
            // 숨김 상태
            '-translate-y-full': isHidden,
            'translate-y-0': !isHidden
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

                // 드롭다운이 있는 메뉴
                if (item.hasDropdown && item.submenu) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "relative px-4 py-2 font-inter font-medium text-sm transition-all duration-200 ease-out rounded-lg group inline-flex items-center gap-1",
                          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-dark",
                          {
                            'text-primary': isActive || pathname.startsWith(item.href),
                            'text-neutral-light hover:text-white': !isActive && !pathname.startsWith(item.href)
                          }
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                        <ChevronDown 
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180"
                          )} 
                        />
                        
                        {/* 호버 밑줄 애니메이션 */}
                        <span 
                          className={cn(
                            "absolute bottom-0 left-4 h-0.5 bg-primary transition-all duration-250 ease-out",
                            {
                              'w-[calc(100%-2rem)]': isActive || pathname.startsWith(item.href),
                              'w-0 group-hover:w-[calc(100%-2rem)]': !isActive && !pathname.startsWith(item.href)
                            }
                          )}
                        />
                      </Link>

                      {/* 드롭다운 메뉴 */}
                      <div
                        className={cn(
                          "absolute top-full left-0 mt-2 w-56 rounded-xl bg-dark/95 backdrop-blur-xl border border-shadow-gray/20 shadow-xl",
                          "transition-all duration-200 ease-out",
                          activeDropdown === item.label
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 -translate-y-2 invisible"
                        )}
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                "hover:bg-primary/10 hover:text-primary hover:pl-6",
                                pathname === subItem.href
                                  ? "text-primary bg-primary/5"
                                  : "text-neutral-light"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
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
                          'w-[calc(100%-2rem)]': isActive,
                          'w-0 group-hover:w-[calc(100%-2rem)]': !isActive
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