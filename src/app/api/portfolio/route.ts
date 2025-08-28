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

// GET - 포트폴리오 목록 조회
export async function GET() {
  try {
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    const portfolioData = JSON.parse(data)
    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 })
  }
}

// POST - 새 포트폴리오 추가
export async function POST(request: NextRequest) {
  try {
    const newItem: PortfolioItem = await request.json()
    
    // 필수 필드 검증
    if (!newItem.title || !newItem.client || !newItem.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 기존 데이터 로드
    let portfolioData: PortfolioItem[] = []
    try {
      const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
      portfolioData = JSON.parse(data)
    } catch (error) {
      // 파일이 없으면 새로 생성
      portfolioData = []
    }

    // ID 중복 검사
    if (portfolioData.find(item => item.id === newItem.id)) {
      return NextResponse.json({ error: 'Portfolio item with this ID already exists' }, { status: 409 })
    }

    // 새 항목 추가
    portfolioData.push(newItem)

    // 파일에 저장
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2))

    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    console.error('Error adding portfolio item:', error)
    return NextResponse.json({ error: 'Failed to add portfolio item' }, { status: 500 })
  }
}

// PUT - 포트폴리오 수정
export async function PUT(request: NextRequest) {
  try {
    const updatedItem: PortfolioItem = await request.json()
    
    // 필수 필드 검증
    if (!updatedItem.id || !updatedItem.title || !updatedItem.client || !updatedItem.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 기존 데이터 로드
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    let portfolioData: PortfolioItem[] = JSON.parse(data)

    // 항목 찾기
    const itemIndex = portfolioData.findIndex(item => item.id === updatedItem.id)
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    // 항목 업데이트
    portfolioData[itemIndex] = updatedItem

    // 파일에 저장
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2))

    return NextResponse.json({ success: true, item: updatedItem })
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 })
  }
}

// DELETE - 포트폴리오 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 })
    }

    // 기존 데이터 로드
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    let portfolioData: PortfolioItem[] = JSON.parse(data)

    // 항목 찾기
    const itemIndex = portfolioData.findIndex(item => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    // 항목 삭제
    const deletedItem = portfolioData.splice(itemIndex, 1)[0]

    // 파일에 저장
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2))

    return NextResponse.json({ success: true, deletedItem })
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 })
  }
}