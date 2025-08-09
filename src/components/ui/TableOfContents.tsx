'use client'

import { useState, useEffect } from 'react'
import { TableOfContentsItem } from '@/types'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  className?: string
}

export default function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      
      setTimeout(() => {
        element.focus({ preventScroll: true })
      }, 500)
    }
  }

  if (items.length === 0) return null

  return (
    <nav 
      className={`bg-gray-50 rounded-2xl p-6 sticky top-24 ${className}`}
      aria-label="목차"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        목차
      </h3>
      
      <ul className="space-y-2" role="list">
        {items.map((item) => (
          <li key={item.id} role="listitem">
            <button
              onClick={() => scrollToElement(item.id)}
              className={`
                block w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                ${item.level === 2 ? 'ml-0' : ''}
                ${item.level === 3 ? 'ml-4' : ''}
                ${item.level >= 4 ? 'ml-8' : ''}
                ${
                  activeId === item.id
                    ? 'bg-blue-100 text-blue-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
              aria-current={activeId === item.id ? 'true' : 'false'}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          맨 위로 이동
        </button>
      </div>
    </nav>
  )
}