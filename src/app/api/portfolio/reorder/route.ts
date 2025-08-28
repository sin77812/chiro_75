import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const PORTFOLIO_FILE = path.join(process.cwd(), 'src/data/portfolio.json')

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

// POST - 포트폴리오 순서 변경
export async function POST(request: NextRequest) {
  try {
    const { items }: { items: PortfolioItem[] } = await request.json()
    
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items data' }, { status: 400 })
    }

    // 기존 데이터 로드하여 검증
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    const existingData: PortfolioItem[] = JSON.parse(data)

    // 모든 기존 항목이 새 순서에도 포함되어 있는지 확인
    if (items.length !== existingData.length) {
      return NextResponse.json({ error: 'Item count mismatch' }, { status: 400 })
    }

    const existingIds = new Set(existingData.map(item => item.id))
    const newIds = new Set(items.map(item => item.id))
    
    if (existingIds.size !== newIds.size || 
        [...existingIds].some(id => !newIds.has(id))) {
      return NextResponse.json({ error: 'Item IDs do not match' }, { status: 400 })
    }

    // 새 순서로 파일에 저장
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(items, null, 2))

    return NextResponse.json({ success: true, message: 'Portfolio order updated successfully' })
  } catch (error) {
    console.error('Error reordering portfolio items:', error)
    return NextResponse.json({ error: 'Failed to reorder portfolio items' }, { status: 500 })
  }
}