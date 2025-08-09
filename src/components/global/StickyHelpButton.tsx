'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Phone, Mail, Calendar, ArrowRight } from 'lucide-react'
import { AccessibleButton } from '@/components/ui/AccessibleComponents'
import { ServiceAnalytics } from '@/components/analytics/Analytics'

interface StickyHelpButtonProps {
  className?: string
}

export default function StickyHelpButton({ className = '' }: StickyHelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      ServiceAnalytics.clickServiceCTA('sticky-help', 'primary', 'Open Help Menu')
    }
  }

  const handleContactAction = (action: string, label: string) => {
    ServiceAnalytics.clickServiceCTA('sticky-help', 'secondary', `${action}: ${label}`)
    setIsOpen(false)
  }

  const contactOptions = [
    {
      icon: Phone,
      label: '전화 상담',
      description: '즉시 연결',
      action: 'tel:+82-2-1234-5678',
      color: 'text-primary'
    },
    {
      icon: Mail,
      label: '이메일 문의',
      description: '24시간 내 답변',
      action: 'mailto:hello@chiro.agency',
      color: 'text-accent-green'
    },
    {
      icon: Calendar,
      label: '상담 예약',
      description: '무료 30분 컨설팅',
      action: '/contact',
      color: 'text-blue-400'
    }
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-overlay md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Help Menu */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-toast w-80 max-w-[calc(100vw-2rem)]">
          <div className="bg-background-primary/95 backdrop-blur-lg border border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-shadow-gray/30">
              <div className="flex items-center justify-between">
                <h3 className="font-pretendard font-semibold text-text-primary">
                  상담이 필요하신가요?
                </h3>
                <AccessibleButton
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-shadow-gray/30 hover:bg-shadow-gray/50 flex items-center justify-center transition-colors"
                  aria-label="도움말 메뉴 닫기"
                >
                  <X className="w-4 h-4 text-text-primary" />
                </AccessibleButton>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                프로젝트에 대해 전문가와 직접 상담받으세요
              </p>
            </div>

            {/* Contact Options */}
            <div className="p-4 space-y-3">
              {contactOptions.map((option, index) => {
                const IconComponent = option.icon
                const isExternal = option.action.startsWith('tel:') || option.action.startsWith('mailto:')
                
                return (
                  <AccessibleButton
                    key={index}
                    className="w-full p-4 rounded-xl bg-shadow-gray/20 hover:bg-shadow-gray/30 border border-shadow-gray/30 hover:border-primary/30 transition-all duration-200 group text-left"
                    onClick={() => {
                      handleContactAction(option.action, option.label)
                      if (isExternal) {
                        window.location.href = option.action
                      } else {
                        window.location.href = option.action
                      }
                    }}
                    aria-label={`${option.label}: ${option.description}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-shadow-gray/30 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <IconComponent className={`w-5 h-5 ${option.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-text-primary group-hover:text-primary transition-colors">
                          {option.label}
                        </div>
                        <div className="text-sm text-text-tertiary">
                          {option.description}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </AccessibleButton>
                )
              })}
            </div>

            {/* Quick Message */}
            <div className="p-4 border-t border-shadow-gray/30 bg-primary/5">
              <p className="text-xs text-text-secondary text-center">
                평균 응답 시간: <span className="font-medium text-primary">15분 이내</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Button */}
      <div className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-sticky ${className}`}>
        <AccessibleButton
          onClick={handleToggle}
          className={`
            w-14 h-14 md:w-16 md:h-16 rounded-full shadow-soft hover:shadow-lg 
            transition-all duration-base ease-base
            ${isOpen 
              ? 'bg-primary text-white scale-105 rotate-45' 
              : 'bg-primary hover:bg-primary/90 text-white hover:scale-110'
            }
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-primary
            border-2 border-primary/20 hover:border-primary/40
          `}
          aria-label={isOpen ? '상담 메뉴 닫기' : '상담 메뉴 열기'}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          {isOpen ? (
            <X className="w-6 h-6 md:w-7 md:h-7" />
          ) : (
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
          )}
        </AccessibleButton>
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" aria-hidden="true" />
        )}
      </div>

      {/* Mobile Bottom Tab Bar Integration */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-fixed bg-background-primary/95 backdrop-blur-lg border-t border-shadow-gray/30">
        <div className="flex items-center justify-around py-2">
          <AccessibleButton
            onClick={() => window.location.href = '/'}
            className="flex flex-col items-center py-2 px-4 text-text-tertiary hover:text-primary transition-colors"
            aria-label="홈으로 이동"
          >
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <span className="text-xs">홈</span>
          </AccessibleButton>
          
          <AccessibleButton
            onClick={() => window.location.href = '/services'}
            className="flex flex-col items-center py-2 px-4 text-text-tertiary hover:text-primary transition-colors"
            aria-label="서비스 보기"
          >
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span className="text-xs">서비스</span>
          </AccessibleButton>
          
          <AccessibleButton
            onClick={() => window.location.href = '/portfolio'}
            className="flex flex-col items-center py-2 px-4 text-text-tertiary hover:text-primary transition-colors"
            aria-label="포트폴리오 보기"
          >
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
              </svg>
            </div>
            <span className="text-xs">포트폴리오</span>
          </AccessibleButton>
          
          <AccessibleButton
            onClick={handleToggle}
            className={`flex flex-col items-center py-2 px-4 transition-colors ${
              isOpen ? 'text-primary' : 'text-text-tertiary hover:text-primary'
            }`}
            aria-label="상담 메뉴"
          >
            <div className="w-6 h-6 mb-1">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs">상담</span>
          </AccessibleButton>
        </div>
      </div>
    </>
  )
}