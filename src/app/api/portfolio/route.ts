import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import fs from 'fs/promises'
import path from 'path'

const PORTFOLIO_FILE = path.join(process.cwd(), 'src/data/portfolio.json')
const REDIS_KEY = 'portfolio_data'

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

// Redis 클라이언트 초기화
let redis: Redis | null = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
    console.log('Redis client initialized successfully')
  } else {
    console.warn('Redis environment variables not found, will use file system')
  }
} catch (error) {
  console.error('Failed to initialize Redis client:', error)
}

// 데이터 읽기 헬퍼
async function readPortfolioData(): Promise<PortfolioItem[]> {
  // Redis 사용 가능한 경우
  if (redis) {
    try {
      console.log('Attempting to read from Redis...')
      const data = await redis.get<PortfolioItem[]>(REDIS_KEY)
      
      if (data && Array.isArray(data)) {
        console.log('Data found in Redis, items count:', data.length)
        return data
      }
      
      // Redis에 데이터가 없으면 JSON 파일에서 초기 데이터 로드 및 마이그레이션
      console.log('No data in Redis, migrating from JSON file...')
      const fileData = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
      const portfolioData = JSON.parse(fileData) as PortfolioItem[]
      
      // Redis에 초기 데이터 저장
      await redis.set(REDIS_KEY, JSON.stringify(portfolioData))
      console.log('Initial data migrated to Redis successfully')
      
      return portfolioData
    } catch (error) {
      console.error('Error reading from Redis, falling back to file system:', error)
      // Redis 에러 시 파일 시스템으로 폴백
      try {
        const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
        return JSON.parse(data)
      } catch (fileError) {
        console.error('Error reading from file system:', fileError)
        return []
      }
    }
  }
  
  // Redis 없으면 파일 시스템 사용 (개발 환경)
  console.log('Redis not available, reading from file system...')
  try {
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading from file system:', error)
    return []
  }
}

// 데이터 쓰기 헬퍼
async function writePortfolioData(data: PortfolioItem[]): Promise<void> {
  if (redis) {
    try {
      console.log('Writing to Redis...')
      await redis.set(REDIS_KEY, JSON.stringify(data))
      console.log('Data written to Redis successfully')
      
      // 백업: 로컬 파일에도 저장 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        try {
          await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(data, null, 2))
          console.log('Backup saved to local file')
        } catch (error) {
          console.warn('Failed to save backup to local file:', error)
        }
      }
    } catch (error) {
      console.error('Error writing to Redis:', error)
      throw new Error('Failed to save data to database')
    }
  } else {
    // Redis 없으면 파일 시스템 사용
    console.log('Redis not available, writing to file system...')
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(data, null, 2))
    console.log('Data written to file system successfully')
  }
}

// GET - 포트폴리오 목록 조회
export async function GET() {
  try {
    const portfolioData = await readPortfolioData()
    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error('Error in GET /api/portfolio:', error)
    return NextResponse.json({ 
      error: 'Failed to load portfolio data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
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

    // ID가 없으면 생성
    if (!newItem.id) {
      newItem.id = newItem.slug || newItem.title.toLowerCase().replace(/\s+/g, '-')
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
    console.error('Error in POST /api/portfolio:', error)
    return NextResponse.json({ 
      error: 'Failed to add portfolio item',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// PUT - 포트폴리오 수정
export async function PUT(request: NextRequest) {
  console.log('PUT request received for portfolio update')
  console.log('Redis available:', !!redis)
  
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
      console.error('Missing required fields')
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
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    console.log('Updating item at index:', itemIndex)
    portfolioData[itemIndex] = updatedItem

    console.log('Writing updated data...')
    await writePortfolioData(portfolioData)
    console.log('Portfolio update completed successfully')

    return NextResponse.json({ success: true, item: updatedItem })
  } catch (error) {
    console.error('Error in PUT /api/portfolio:', error)
    return NextResponse.json({ 
      error: 'Failed to update portfolio item',
      details: error instanceof Error ? error.message : 'Unknown error'
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
    console.error('Error in DELETE /api/portfolio:', error)
    return NextResponse.json({ 
      error: 'Failed to delete portfolio item',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// 백업 기능은 별도의 API 라우트로 이동 (/api/portfolio/backup)