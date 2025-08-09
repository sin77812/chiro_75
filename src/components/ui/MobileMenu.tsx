'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: Array<{
    label: string
    href: string
    isHighlighted?: boolean
  }>
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
}

const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'tween',
      duration: 0.3
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  }
}

const itemVariants = {
  closed: {
    opacity: 0,
    y: 20
  },
  open: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + index * 0.05,
      duration: 0.3
    }
  })
}

export default function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  const pathname = usePathname()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on pathname change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={onClose}
          aria-labelledby="mobile-menu-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-dark/95 backdrop-blur-md" />
          
          {/* Menu Panel */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-primary-dark/90 backdrop-blur-xl border-l border-primary/20 shadow-2xl"
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-shadow-gray/30">
              <h2 id="mobile-menu-title" className="text-xl font-inter font-semibold text-white">
                메뉴
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-neutral-light/60 hover:text-white hover:bg-shadow-gray/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="메뉴 닫기"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="px-6 py-8" aria-label="모바일 메뉴">
              <ul className="space-y-1">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href
                  const isCTA = item.isHighlighted

                  return (
                    <motion.li
                      key={item.href}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      custom={index}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 rounded-xl font-inter font-medium text-base transition-all duration-200",
                          {
                            // CTA Button Style
                            'bg-primary text-dark hover:bg-primary/90 hover:scale-[1.02] shadow-lg': isCTA,
                            // Active State
                            'text-primary bg-primary/10 border border-primary/20': isActive && !isCTA,
                            // Default State
                            'text-neutral-light hover:text-white hover:bg-shadow-gray/20': !isActive && !isCTA
                          }
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-shadow-gray/30 bg-shadow-gray/10">
              <div className="text-center">
                <p className="text-xs text-neutral-light/60 mb-2">
                  프리미엄 웹에이전시
                </p>
                <p className="text-sm text-white font-medium">
                  02-1234-5678
                </p>
                <p className="text-xs text-neutral-light/60 mt-1">
                  평일 09:00 - 18:00
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}