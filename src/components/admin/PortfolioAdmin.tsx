'use client'

import { useState, useEffect } from 'react'
import DraggablePortfolioList from './DraggablePortfolioList'
import PortfolioForm from './PortfolioForm'

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

type ViewMode = 'list' | 'add' | 'edit'

export default function PortfolioAdmin() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([])
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPortfolioData()
  }, [])

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      if (response.ok) {
        const data = await response.json()
        setPortfolioData(data)
      } else {
        console.error('Failed to load portfolio data')
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (item: PortfolioItem) => {
    try {
      const method = editingItem ? 'PUT' : 'POST'
      const response = await fetch('/api/portfolio', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        await loadPortfolioData()
        setViewMode('list')
        setEditingItem(null)
      } else {
        console.error('Failed to save portfolio item')
      }
    } catch (error) {
      console.error('Error saving portfolio item:', error)
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setViewMode('edit')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 포트폴리오를 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch('/api/portfolio', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        await loadPortfolioData()
      } else {
        console.error('Failed to delete portfolio item')
      }
    } catch (error) {
      console.error('Error deleting portfolio item:', error)
    }
  }

  const handleCancel = () => {
    setViewMode('list')
    setEditingItem(null)
  }

  const handleReorder = async (reorderedItems: PortfolioItem[]) => {
    try {
      // 순서 변경을 서버에 저장
      const response = await fetch('/api/portfolio/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: reorderedItems }),
      })

      if (response.ok) {
        setPortfolioData(reorderedItems)
      } else {
        console.error('Failed to reorder portfolio items')
        // 실패 시 원래 데이터로 복원
        await loadPortfolioData()
      }
    } catch (error) {
      console.error('Error reordering portfolio items:', error)
      // 실패 시 원래 데이터로 복원
      await loadPortfolioData()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {viewMode === 'list' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              포트폴리오 목록 ({portfolioData.length}개)
            </h2>
            <button
              onClick={() => setViewMode('add')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              새 포트폴리오 추가
            </button>
          </div>
          
          <DraggablePortfolioList
            items={portfolioData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReorder={handleReorder}
          />
        </div>
      )}

      {(viewMode === 'add' || viewMode === 'edit') && (
        <PortfolioForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={viewMode === 'edit'}
        />
      )}
    </div>
  )
}