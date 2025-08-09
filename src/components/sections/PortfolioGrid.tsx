'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ExternalLink, TrendingUp, ArrowUpDown, Calendar, Award } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

type FilterType = 'all' | 'manufacturing' | 'food' | 'service' | 'corporate' | 'logistics' | 'consulting' | 'fintech' | 'healthcare'
type SortType = 'latest' | 'performance'

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('latest')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const filters = [
    { key: 'all' as FilterType, label: '전체' },
    { key: 'manufacturing' as FilterType, label: '제조업' },
    { key: 'food' as FilterType, label: '식품/외식' },
    { key: 'service' as FilterType, label: '서비스' },
    { key: 'corporate' as FilterType, label: '기업' },
    { key: 'fintech' as FilterType, label: '핀테크' },
    { key: 'healthcare' as FilterType, label: '헬스케어' },
  ]

  const getMaxKpiImprovement = (project: any) => {
    return Math.max(...project.kpis.map((kpi: any) => parseInt(kpi.improvement) || 0))
  }

  const filteredAndSortedProjects = portfolioData
    .filter(project => filter === 'all' || project.category === filter || project.industry === filter)
    .sort((a, b) => {
      if (sort === 'latest') {
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      } else {
        return getMaxKpiImprovement(b) - getMaxKpiImprovement(a)
      }
    })

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            PORTFOLIO
          </div>
          <h2 className="font-pretendard font-bold mb-6">
            성공적인 <span className="text-gradient">디지털 전환</span> 사례들
          </h2>
          <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
            다양한 업계의 클라이언트와 함께 만들어낸 혁신적인 웹 솔루션과 그 성과를 확인해보세요.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  filter === filterOption.key
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-shadow-gray/20 text-neutral-light/70 hover:bg-primary/20 hover:text-primary'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <ArrowUpDown className="h-4 w-4 text-neutral-light/60" />
            <div className="flex bg-shadow-gray/20 rounded-full p-1">
              <button
                onClick={() => setSort('latest')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  sort === 'latest'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-neutral-light/70 hover:text-primary'
                }`}
              >
                <Calendar className="h-3 w-3 inline mr-1" />
                최신순
              </button>
              <button
                onClick={() => setSort('performance')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  sort === 'performance'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-neutral-light/70 hover:text-primary'
                }`}
              >
                <Award className="h-3 w-3 inline mr-1" />
                성과순
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-neutral-light/60">
            총 <span className="text-primary font-semibold">{filteredAndSortedProjects.length}</span>개의 프로젝트
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.slice(0, 9).map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-shadow-gray/20 rounded-2xl overflow-hidden border border-shadow-gray/30 hover:border-primary/30 transition-all duration-500 card-hover"
              onMouseEnter={() => setHoveredItem(project.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Before/After Toggle on Hover */}
                {project.before && project.after && hoveredItem === project.id && (
                  <div className="absolute inset-0 bg-dark/90 flex items-center justify-center z-10">
                    <div className="text-center space-y-4">
                      <div className="text-primary font-medium">Before → After</div>
                      <div className="flex space-x-4">
                        <div className="w-24 h-16 relative rounded overflow-hidden">
                          <Image
                            src={project.before}
                            alt="Before"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-red-500/80 text-white text-xs text-center py-1">
                            Before
                          </div>
                        </div>
                        <ChevronRight className="h-6 w-6 text-primary self-center" />
                        <div className="w-24 h-16 relative rounded overflow-hidden">
                          <Image
                            src={project.after}
                            alt="After"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-xs text-center py-1">
                            After
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance Badge - Shows on Hover */}
                {hoveredItem === project.id && project.kpis.length > 0 && (
                  <div className="absolute top-4 left-4 z-20 animate-fade-in">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      📈 {project.kpis[0].metric} {project.kpis[0].improvement}
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {filters.find(f => f.key === project.category || f.key === project.industry)?.label || project.industry}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <div className="flex space-x-2">
                      <Link 
                        href={`/case/${project.slug}`}
                        className="px-3 py-2 bg-primary hover:bg-primary/90 text-white text-sm rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 inline mr-1" />
                        사례 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-pretendard font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-light/70 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* KPIs */}
                {project.kpis.length > 0 && (
                  <div className="border-t border-shadow-gray/30 pt-4 space-y-2">
                    {project.kpis.slice(0, 2).map((kpi, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-neutral-light/60">{kpi.metric}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-primary font-semibold">{kpi.value}</span>
                          {kpi.improvement && (
                            <>
                              <TrendingUp className="h-3 w-3 text-green-400" />
                              <span className="text-green-400 text-xs">+{kpi.improvement}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          {/* TODO: Implement infinite scroll or pagination based on user preference and performance considerations */}
          <button className="btn-primary group">
            전체 포트폴리오 보기
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}