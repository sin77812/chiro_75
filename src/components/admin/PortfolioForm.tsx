'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface KPI {
  metric: string
  value: string
  improvement: string
}

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
  kpis: KPI[]
  description: string
  problem?: string
  approach?: string
  result?: string
  completedAt?: string
}

interface PortfolioFormProps {
  initialData?: PortfolioItem | null
  onSave: (item: PortfolioItem) => void
  onCancel: () => void
  isEditing?: boolean
}

const CATEGORIES = [
  { value: 'manufacturing', label: '제조업' },
  { value: 'education', label: '교육' },
  { value: 'service', label: '서비스업' },
  { value: 'technology', label: '기술' },
  { value: 'ecommerce', label: '이커머스' },
  { value: 'healthcare', label: '헬스케어' },
  { value: 'finance', label: '금융' },
  { value: 'other', label: '기타' },
]

const INDUSTRIES = [
  'manufacturing',
  'education',
  'service',
  'technology',
  'ecommerce',
  'healthcare',
  'finance',
  'consulting',
  'startup',
  'enterprise'
]

export default function PortfolioForm({ initialData, onSave, onCancel, isEditing = false }: PortfolioFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<PortfolioItem>({
    id: initialData?.id || '',
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    client: initialData?.client || '',
    industry: initialData?.industry || 'technology',
    services: initialData?.services || [],
    thumbnail: initialData?.thumbnail || '',
    gallery: initialData?.gallery || [],
    before: initialData?.before || '',
    after: initialData?.after || '',
    year: initialData?.year || new Date().getFullYear(),
    category: initialData?.category || 'technology',
    tags: initialData?.tags || [],
    url: initialData?.url || '',
    kpis: initialData?.kpis || [],
    description: initialData?.description || '',
    problem: initialData?.problem || '',
    approach: initialData?.approach || '',
    result: initialData?.result || '',
    completedAt: initialData?.completedAt || '',
  })

  const [serviceInput, setServiceInput] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  const handleInputChange = (field: keyof PortfolioItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (field === 'title' && !isEditing) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value),
        id: generateSlug(value)
      }))
    }
  }

  const handleAddService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()]
      }))
      setServiceInput('')
    }
  }

  const handleRemoveService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleAddKPI = () => {
    setFormData(prev => ({
      ...prev,
      kpis: [...prev.kpis, { metric: '', value: '', improvement: '' }]
    }))
  }

  const handleUpdateKPI = (index: number, field: keyof KPI, value: string) => {
    setFormData(prev => ({
      ...prev,
      kpis: prev.kpis.map((kpi, i) => 
        i === index ? { ...kpi, [field]: value } : kpi
      )
    }))
  }

  const handleRemoveKPI = (index: number) => {
    setFormData(prev => ({
      ...prev,
      kpis: prev.kpis.filter((_, i) => i !== index)
    }))
  }

  const handleFileUpload = async (file: File, field: 'thumbnail' | 'before' | 'after') => {
    // 파일 크기 및 타입 검증
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하로 제한됩니다.')
      return
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      alert('지원하는 이미지 형식: JPEG, PNG, WebP, GIF')
      return
    }

    setUploading(true)
    
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })
      
      if (response.ok) {
        const { url } = await response.json()
        handleInputChange(field, url)
      } else {
        const errorData = await response.json()
        alert(`파일 업로드에 실패했습니다: ${errorData.error || '알 수 없는 오류'}`)
      }
    } catch (error) {
      console.error('File upload error:', error)
      alert('파일 업로드 중 오류가 발생했습니다.')
    } finally {
      setUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent, field: 'thumbnail' | 'before' | 'after') => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleFileUpload(imageFile, field)
    } else {
      alert('이미지 파일만 업로드 가능합니다.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.client || !formData.description) {
      alert('필수 필드를 모두 채워주세요.')
      return
    }

    if (saving) {
      return // 중복 제출 방지
    }

    setSaving(true)
    
    try {
      await onSave(formData)
    } catch (error) {
      console.error('Error saving portfolio:', error)
      alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {isEditing ? '포트폴리오 수정' : '새 포트폴리오 추가'}
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-300 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors duration-200"
          >
            취소
          </button>
          <button
            type="submit"
            form="portfolio-form"
            disabled={saving || uploading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {saving && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {saving ? (isEditing ? '수정 중...' : '추가 중...') : (isEditing ? '수정하기' : '추가하기')}
          </button>
        </div>
      </div>

      <form id="portfolio-form" onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 */}
        <div className="bg-[#1A1F1F] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">기본 정보</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                프로젝트명 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                클라이언트 *
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                연도
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                min="2020"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                산업군
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                프로젝트 URL
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              프로젝트 설명 *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
              required
            />
          </div>
        </div>

        {/* 서비스 및 태그 */}
        <div className="bg-[#1A1F1F] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">서비스 및 태그</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                제공 서비스
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="서비스를 입력하세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  추가
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-900/30 text-blue-300 rounded-md text-sm"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => handleRemoveService(service)}
                      className="ml-1 text-blue-400 hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                태그
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="태그를 입력하세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                >
                  추가
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-300 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-green-400 hover:text-green-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className="bg-[#1A1F1F] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">이미지</h3>
          <p className="text-sm text-gray-400 mb-4">
            드래그 앤 드롭으로 이미지를 업로드하거나 파일을 선택하세요 (최대 5MB)
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 썸네일 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                썸네일 이미지 *
              </label>
              
              <div
                className="relative group"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDrop={(e) => handleDrop(e, 'thumbnail')}
              >
                {formData.thumbnail ? (
                  <div className="relative">
                    <Image
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      width={300}
                      height={180}
                      className="w-full h-36 object-cover rounded-lg border border-gray-700"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white text-sm mb-2">이미지 변경</div>
                        <button
                          type="button"
                          onClick={() => handleInputChange('thumbnail', '')}
                          className="text-red-400 text-sm hover:text-red-300"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-36 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-gray-500 transition-colors duration-200">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="text-gray-400 text-sm">이미지 업로드</div>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'thumbnail')
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
              </div>
            </div>

            {/* Before 이미지 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Before 이미지
              </label>
              
              <div
                className="relative group"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDrop={(e) => handleDrop(e, 'before')}
              >
                {formData.before ? (
                  <div className="relative">
                    <Image
                      src={formData.before}
                      alt="Before preview"
                      width={300}
                      height={180}
                      className="w-full h-36 object-cover rounded-lg border border-gray-700"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white text-sm mb-2">이미지 변경</div>
                        <button
                          type="button"
                          onClick={() => handleInputChange('before', '')}
                          className="text-red-400 text-sm hover:text-red-300"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-36 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-gray-500 transition-colors duration-200">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="text-gray-400 text-sm">Before 이미지</div>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'before')
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
              </div>
            </div>

            {/* After 이미지 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                After 이미지
              </label>
              
              <div
                className="relative group"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDrop={(e) => handleDrop(e, 'after')}
              >
                {formData.after ? (
                  <div className="relative">
                    <Image
                      src={formData.after}
                      alt="After preview"
                      width={300}
                      height={180}
                      className="w-full h-36 object-cover rounded-lg border border-gray-700"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white text-sm mb-2">이미지 변경</div>
                        <button
                          type="button"
                          onClick={() => handleInputChange('after', '')}
                          className="text-red-400 text-sm hover:text-red-300"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-36 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-gray-500 transition-colors duration-200">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div className="text-gray-400 text-sm">After 이미지</div>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'after')
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="bg-[#1A1F1F] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">성과 지표 (KPI)</h3>
            <button
              type="button"
              onClick={handleAddKPI}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors duration-200"
            >
              KPI 추가
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.kpis.map((kpi, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-[#0E1111] rounded-lg border border-gray-700">
                <input
                  type="text"
                  placeholder="지표명 (예: 전환율)"
                  value={kpi.metric}
                  onChange={(e) => handleUpdateKPI(index, 'metric', e.target.value)}
                  className="px-3 py-2 bg-[#1A1F1F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="값 (예: +250%)"
                  value={kpi.value}
                  onChange={(e) => handleUpdateKPI(index, 'value', e.target.value)}
                  className="px-3 py-2 bg-[#1A1F1F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="개선율 (예: 250%)"
                  value={kpi.improvement}
                  onChange={(e) => handleUpdateKPI(index, 'improvement', e.target.value)}
                  className="px-3 py-2 bg-[#1A1F1F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveKPI(index)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="bg-[#1A1F1F] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">상세 설명</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                문제점
              </label>
              <textarea
                value={formData.problem}
                onChange={(e) => handleInputChange('problem', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                placeholder="클라이언트가 직면한 문제점을 설명하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                접근 방법
              </label>
              <textarea
                value={formData.approach}
                onChange={(e) => handleInputChange('approach', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                placeholder="문제 해결을 위한 접근 방법을 설명하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                결과/성과
              </label>
              <textarea
                value={formData.result}
                onChange={(e) => handleInputChange('result', e.target.value)}
                className="w-full px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                placeholder="프로젝트 완료 후 달성한 결과와 성과를 설명하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                완료일
              </label>
              <input
                type="date"
                value={formData.completedAt}
                onChange={(e) => handleInputChange('completedAt', e.target.value)}
                className="px-3 py-2 bg-[#0E1111] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </form>

      {uploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1A1F1F] border border-gray-800 rounded-xl p-6">
            <div className="text-white text-center">
              파일 업로드 중...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}