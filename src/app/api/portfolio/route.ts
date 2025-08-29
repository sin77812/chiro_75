import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { kv } from '@vercel/kv'

const PORTFOLIO_FILE = path.join(process.cwd(), 'src/data/portfolio.json')
const KV_KEY = 'portfolio_data'

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

// 프로덕션 환경인지 확인
const isProduction = process.env.NODE_ENV === 'production'

// 데이터 읽기 헬퍼
async function readPortfolioData(): Promise<PortfolioItem[]> {
  if (isProduction && process.env.KV_URL) {
    // 프로덕션: Vercel KV에서 읽기
    try {
      console.log('Reading from Vercel KV...')
      const data = await kv.get<PortfolioItem[]>(KV_KEY)
      
      if (data) {
        console.log('Data found in KV, items count:', data.length)
        return data
      }
      
      // KV에 데이터가 없으면 초기 데이터 로드
      console.log('No data in KV, loading initial data...')
      const fileData = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
      const portfolioData = JSON.parse(fileData)
      
      // KV에 초기 데이터 저장
      await kv.set(KV_KEY, portfolioData)
      console.log('Initial data saved to KV')
      
      return portfolioData
    } catch (error) {
      console.error('Error with KV, falling back to file:', error)
      // KV 에러 시 파일에서 읽기
      const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } else {
    // 개발: 파일에서 읽기
    console.log('Reading from file system (development)...')
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    return JSON.parse(data)
  }
}

// 데이터 쓰기 헬퍼
async function writePortfolioData(data: PortfolioItem[]): Promise<void> {
  if (isProduction && process.env.KV_URL) {
    // 프로덕션: Vercel KV에 쓰기
    console.log('Writing to Vercel KV...')
    await kv.set(KV_KEY, data)
    console.log('Data written to KV successfully')
  } else {
    // 개발: 파일에 쓰기
    console.log('Writing to file system (development)...')
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(data, null, 2))
    console.log('Data written to file successfully')
  }
}

// GET - 포트폴리오 목록 조회
export async function GET() {
  try {
    const portfolioData = await readPortfolioData()
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
    const portfolioData = await readPortfolioData()

    // ID 중복 검사
    if (portfolioData.find(item => item.id === newItem.id)) {
      return NextResponse.json({ error: 'Portfolio item with this ID already exists' }, { status: 409 })
    }

    // 새 항목 추가
    portfolioData.push(newItem)

    // 데이터 저장
    await writePortfolioData(portfolioData)

    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    console.error('Error adding portfolio item:', error)
    return NextResponse.json({ 
      error: `Failed to add portfolio item: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}

// PUT - 포트폴리오 수정
export async function PUT(request: NextRequest) {
  console.log('PUT request received for portfolio update')
  console.log('Environment:', isProduction ? 'Production' : 'Development')
  console.log('KV_URL available:', !!process.env.KV_URL)
  
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
    const portfolioData = await readPortfolioData()
    console.log('Portfolio data loaded, items count:', portfolioData.length)

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

    console.log('Writing updated data...')
    await writePortfolioData(portfolioData)
    console.log('Portfolio update completed successfully')

    return NextResponse.json({ success: true, item: updatedItem })
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    
    // 더 자세한 에러 메시지
    let errorMessage = 'Failed to update portfolio item'
    if (error instanceof Error) {
      errorMessage = error.message
      
      // 권한 관련 에러 처리
      if (error.message.includes('EROFS') || error.message.includes('read-only')) {
        errorMessage = 'Cannot save in production environment. Please set up Vercel KV database.'
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      details: isProduction ? 'Production environment detected. Ensure Vercel KV is configured.' : undefined
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
    const portfolioData = await readPortfolioData()

    // 항목 찾기
    const itemIndex = portfolioData.findIndex(item => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    // 항목 삭제
    const deletedItem = portfolioData.splice(itemIndex, 1)[0]

    // 데이터 저장
    await writePortfolioData(portfolioData)

    return NextResponse.json({ success: true, deletedItem })
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return NextResponse.json({ 
      error: `Failed to delete portfolio item: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}