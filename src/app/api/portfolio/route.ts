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
  console.log('PUT request received for portfolio update')
  
  try {
    const updatedItem: PortfolioItem = await request.json()
    console.log('Updated item received:', {
      id: updatedItem.id,
      title: updatedItem.title,
      client: updatedItem.client,
      hasDescription: !!updatedItem.description
    })
    
    // 필수 필드 검증
    if (!updatedItem.id || !updatedItem.title || !updatedItem.client || !updatedItem.description) {
      console.error('Missing required fields:', {
        id: !!updatedItem.id,
        title: !!updatedItem.title,
        client: !!updatedItem.client,
        description: !!updatedItem.description
      })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Reading existing portfolio data...')
    // 기존 데이터 로드
    let data: string
    try {
      data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
      console.log('Portfolio file read successfully')
    } catch (readError) {
      console.error('Error reading portfolio file:', readError)
      return NextResponse.json({ error: 'Failed to read portfolio data' }, { status: 500 })
    }

    let portfolioData: PortfolioItem[]
    try {
      portfolioData = JSON.parse(data)
      console.log('Portfolio data parsed successfully, items count:', portfolioData.length)
    } catch (parseError) {
      console.error('Error parsing portfolio data:', parseError)
      return NextResponse.json({ error: 'Failed to parse portfolio data' }, { status: 500 })
    }

    // 항목 찾기
    const itemIndex = portfolioData.findIndex(item => item.id === updatedItem.id)
    console.log('Item index found:', itemIndex)
    
    if (itemIndex === -1) {
      console.error('Portfolio item not found with ID:', updatedItem.id)
      console.log('Available IDs:', portfolioData.map(item => item.id))
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    console.log('Updating item at index:', itemIndex)
    // 항목 업데이트
    portfolioData[itemIndex] = updatedItem

    console.log('Writing updated data to file...')
    // 파일에 저장
    try {
      await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2))
      console.log('Portfolio file updated successfully')
    } catch (writeError) {
      console.error('Error writing portfolio file:', writeError)
      return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 })
    }

    console.log('Portfolio update completed successfully')
    return NextResponse.json({ success: true, item: updatedItem })
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json({ 
      error: `Failed to update portfolio item: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
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