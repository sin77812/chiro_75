'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  client: string
  industry: string
  services: string[]
  thumbnail: string
  gallery: string[]
  before?: string
  after?: string
  year: number
  category: string
  tags: string[]
  url?: string
  kpis: Array<{
    metric: string
    value: string
    improvement: string
  }>
  description: string
  problem?: string
  approach?: string
  result?: string
  completedAt?: string
}

interface DraggablePortfolioListProps {
  items: PortfolioItem[]
  onEdit: (item: PortfolioItem) => void
  onDelete: (id: string) => void
  onReorder: (items: PortfolioItem[]) => void
}

export default function DraggablePortfolioList({ 
  items, 
  onEdit, 
  onDelete, 
  onReorder 
}: DraggablePortfolioListProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = useState<string | null>(null)
  const dragCounterRef = useRef(0)

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', itemId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
    dragCounterRef.current = 0
  }

  const handleDragEnter = (e: React.DragEvent, itemId: string) => {
    e.preventDefault()
    dragCounterRef.current++
    if (itemId !== draggedItem) {
      setDragOverItem(itemId)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setDragOverItem(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    dragCounterRef.current = 0
    
    if (draggedItem && draggedItem !== targetId) {
      const newItems = [...items]
      const draggedIndex = newItems.findIndex(item => item.id === draggedItem)
      const targetIndex = newItems.findIndex(item => item.id === targetId)
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        // 배열에서 드래그된 항목을 제거
        const [removed] = newItems.splice(draggedIndex, 1)
        // 타겟 위치에 삽입
        newItems.splice(targetIndex, 0, removed)
        
        onReorder(newItems)
      }
    }
    
    setDraggedItem(null)
    setDragOverItem(null)
  }

  return (
    <div className="grid gap-4 md:gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragEnd={handleDragEnd}
          onDragEnter={(e) => handleDragEnter(e, item.id)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item.id)}
          className={`
            bg-[#1A1F1F] border rounded-xl p-4 md:p-6 transition-all duration-200 cursor-move
            ${draggedItem === item.id ? 'opacity-50 scale-95' : ''}
            ${dragOverItem === item.id ? 'border-blue-500 bg-blue-900/10' : 'border-gray-800 hover:border-gray-700'}
          `}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* 드래그 핸들 */}
            <div className="flex-shrink-0 flex items-center">
              <div className="cursor-move text-gray-500 hover:text-gray-400 p-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 2zM7 8a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 8zM7 14a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 14zM13 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 2zM13 8a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 8zM13 14a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 14z"/>
                </svg>
              </div>
            </div>

            {/* 썸네일 */}
            <div className="flex-shrink-0">
              <div className="w-full md:w-32 h-48 md:h-24 relative rounded-lg overflow-hidden bg-gray-800">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 128px"
                  />
                )}
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.client} • {item.year} • {item.category}
                  </p>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(item)
                    }}
                    className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
                  >
                    수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(item.id)
                    }}
                    className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* 태그와 서비스 */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-md"
                  >
                    {service}
                  </span>
                ))}
                {item.services.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md">
                    +{item.services.length - 3}
                  </span>
                )}
              </div>

              {/* KPI 요약 */}
              {item.kpis.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {item.kpis.slice(0, 2).map((kpi, index) => (
                    <div key={index} className="text-xs">
                      <span className="text-gray-400">{kpi.metric}: </span>
                      <span className="text-green-400 font-semibold">{kpi.value}</span>
                    </div>
                  ))}
                  {item.kpis.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{item.kpis.length - 2} more
                    </div>
                  )}
                </div>
              )}

              {/* URL */}
              {item.url && (
                <div className="mt-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.url}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">아직 포트폴리오가 없습니다</div>
          <div className="text-sm text-gray-500">새 포트폴리오를 추가해보세요</div>
        </div>
      )}
    </div>
  )
}