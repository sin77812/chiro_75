'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, X, Phone, Mail, Calendar, ArrowRight } from 'lucide-react'

export default function StickyCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show after scrolling 100vh
      setIsVisible(scrolled > windowHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Sticky CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse hover:animate-none focus:outline-none focus:ring-4 focus:ring-primary/50"
          aria-label="무료 상담 요청"
        >
          <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-dark text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">
            무료 상담 요청
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-dark border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
          </div>
        </button>

        {/* Floating notification */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full" />
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div 
            className="bg-dark border border-shadow-gray/30 rounded-2xl p-8 max-w-md w-full animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 id="contact-modal-title" className="text-xl font-pretendard font-semibold text-white">
                무료 상담 요청
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-light/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
                aria-label="상담 요청 창 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contact Options */}
            <div className="space-y-4">
              <a
                href="tel:02-1234-5678"
                className="flex items-center space-x-4 p-4 bg-shadow-gray/20 rounded-lg hover:bg-primary/10 border border-shadow-gray/30 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">전화 상담</div>
                  <div className="text-neutral-light/60 text-sm">02-1234-5678</div>
                </div>
              </a>

              <a
                href="mailto:hello@chiro.co.kr"
                className="flex items-center space-x-4 p-4 bg-shadow-gray/20 rounded-lg hover:bg-primary/10 border border-shadow-gray/30 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">이메일 문의</div>
                  <div className="text-neutral-light/60 text-sm">hello@chiro.co.kr</div>
                </div>
              </a>

              <button
                onClick={() => {
                  // Handle KakaoTalk chat
                  window.open('https://pf.kakao.com/_your_channel', '_blank')
                }}
                className="flex items-center space-x-4 p-4 bg-shadow-gray/20 rounded-lg hover:bg-primary/10 border border-shadow-gray/30 hover:border-primary/30 transition-all group w-full"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <MessageSquare className="h-5 w-5 text-primary group-hover:text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">카카오톡 상담</div>
                  <div className="text-neutral-light/60 text-sm">실시간 채팅</div>
                </div>
              </button>
            </div>

            {/* Navigation to Contact Form */}
            <div className="mt-6 space-y-3">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-shadow-gray/30 to-transparent"></div>
              
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push('/contact')
                }}
                className="flex items-center justify-between w-full p-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/30 rounded-lg transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all">
                    <Calendar className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">상세 상담 신청</div>
                    <div className="text-xs text-neutral-light/60">프로젝트 정보를 입력하고 맞춤 상담받기</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Form */}
            <div className="mt-6 p-4 bg-accent-green/5 border border-accent-green/20 rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-accent-green mb-2">
                  🎯 당일 상담 가능
                </div>
                <div className="text-sm text-neutral-light/70">
                  오늘 오후 2시부터 6시까지 무료 화상 상담을 진행합니다.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <div className="text-xs text-neutral-light/50">
                평일 09:00 - 18:00 | 토요일 10:00 - 15:00
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}