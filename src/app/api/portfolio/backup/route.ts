import { NextResponse } from 'next/server'
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
  }
} catch (error) {
  console.error('Failed to initialize Redis client for backup:', error)
}

async function readPortfolioData(): Promise<PortfolioItem[]> {
  if (redis) {
    try {
      const data = await redis.get<PortfolioItem[]>(REDIS_KEY)
      if (data && Array.isArray(data)) {
        return data
      }
      
      // Redis에 데이터가 없으면 파일에서 읽기
      const fileData = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
      return JSON.parse(fileData)
    } catch (error) {
      console.error('Error reading from Redis:', error)
      const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
      return JSON.parse(data)
    }
  }
  
  const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
  return JSON.parse(data)
}

// GET - 백업 생성
export async function GET() {
  try {
    if (!redis) {
      return NextResponse.json({ error: 'Redis not available for backup' }, { status: 503 })
    }

    const data = await readPortfolioData()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupKey = `portfolio_backup_${timestamp}`
    
    // 백업 저장
    await redis.set(backupKey, JSON.stringify(data))
    
    // 백업 목록 관리
    const backups = await redis.get<string[]>('portfolio_backups') || []
    backups.push(backupKey)
    
    // 최대 10개의 백업만 유지
    if (backups.length > 10) {
      const oldBackup = backups.shift()
      if (oldBackup) {
        await redis.del(oldBackup)
      }
    }
    
    await redis.set('portfolio_backups', JSON.stringify(backups))
    
    return NextResponse.json({ 
      success: true, 
      backupKey,
      timestamp,
      itemCount: data.length,
      message: 'Portfolio data backed up successfully'
    })
  } catch (error) {
    console.error('Error creating backup:', error)
    return NextResponse.json({ 
      error: 'Failed to create backup',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST - 백업 복원
export async function POST(request: Request) {
  try {
    if (!redis) {
      return NextResponse.json({ error: 'Redis not available for restore' }, { status: 503 })
    }

    const { backupKey } = await request.json()
    
    if (!backupKey) {
      return NextResponse.json({ error: 'Backup key is required' }, { status: 400 })
    }

    // 백업 데이터 읽기
    const backupDataStr = await redis.get<string>(backupKey)
    
    if (!backupDataStr) {
      return NextResponse.json({ error: 'Backup not found' }, { status: 404 })
    }

    const backupData = JSON.parse(backupDataStr) as PortfolioItem[]
    
    // 현재 데이터를 백업으로 복원
    await redis.set(REDIS_KEY, JSON.stringify(backupData))
    
    return NextResponse.json({ 
      success: true, 
      itemCount: backupData.length,
      message: 'Portfolio data restored successfully'
    })
  } catch (error) {
    console.error('Error restoring backup:', error)
    return NextResponse.json({ 
      error: 'Failed to restore backup',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}