import { Client } from '@notionhq/client'

interface LeadData {
  name: string
  email: string
  industry: string
  budget: string
  timeline: string
  message: string
  submittedAt: string
  clientIP: string
}

// Initialize Notion client
let notion: Client | null = null

function getNotionClient() {
  if (!notion && process.env.NOTION_TOKEN) {
    notion = new Client({
      auth: process.env.NOTION_TOKEN,
    })
  }
  return notion
}

// Industry mapping for Notion select property
const industryMapping: Record<string, string> = {
  manufacturing: '제조업',
  'it-saas': 'IT·SaaS',
  medical: '의료',
  other: '기타'
}

// Budget mapping for Notion select property
const budgetMapping: Record<string, string> = {
  'under-10m': '1천만원 미만',
  '10m-30m': '1천만원~3천만원',
  '30m-50m': '3천만원~5천만원',
  'over-50m': '5천만원 이상',
  undecided: '미정'
}

// Timeline mapping for Notion select property
const timelineMapping: Record<string, string> = {
  asap: 'ASAP',
  '2weeks': '2주',
  '4weeks': '4주',
  '8weeks': '8주',
  undecided: '미정'
}

export async function saveToNotion(data: LeadData): Promise<void> {
  const client = getNotionClient()
  const databaseId = process.env.NOTION_DATABASE_ID
  
  if (!client || !databaseId) {
    console.warn('Notion not configured, skipping database save')
    return
  }
  
  try {
    await client.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        // Name (Title property)
        '이름': {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        
        // Email (Email property)
        '이메일': {
          email: data.email,
        },
        
        // Industry (Select property)
        '업종': {
          select: {
            name: industryMapping[data.industry] || data.industry,
          },
        },
        
        // Budget (Select property)
        '예산': {
          select: {
            name: budgetMapping[data.budget] || data.budget,
          },
        },
        
        // Timeline (Select property)
        '기간': {
          select: {
            name: timelineMapping[data.timeline] || data.timeline,
          },
        },
        
        // Message (Rich text property)
        '메시지': {
          rich_text: [
            {
              text: {
                content: data.message,
              },
            },
          ],
        },
        
        // Submitted date (Date property)
        '제출일': {
          date: {
            start: data.submittedAt,
          },
        },
        
        // Status (Select property)
        '상태': {
          select: {
            name: '신규',
          },
        },
        
        // Source (Select property)
        '소스': {
          select: {
            name: '홈페이지',
          },
        },
        
        // Client IP (Rich text property)
        'IP': {
          rich_text: [
            {
              text: {
                content: data.clientIP,
              },
            },
          ],
        },
      },
    })
    
    console.log('Lead saved to Notion successfully')
  } catch (error) {
    console.error('Error saving to Notion:', error)
    throw new Error('Failed to save lead to database')
  }
}

// Create database schema (run once to set up the database)
export async function createNotionDatabase() {
  const client = getNotionClient()
  
  if (!client) {
    throw new Error('Notion client not configured')
  }
  
  try {
    const response = await client.databases.create({
      parent: {
        type: 'page_id',
        page_id: process.env.NOTION_PARENT_PAGE_ID!,
      },
      title: [
        {
          text: {
            content: 'CHIRO Leads',
          },
        },
      ],
      properties: {
        '이름': {
          title: {},
        },
        '이메일': {
          email: {},
        },
        '업종': {
          select: {
            options: [
              { name: '제조업', color: 'blue' },
              { name: 'IT·SaaS', color: 'green' },
              { name: '의료', color: 'red' },
              { name: '기타', color: 'gray' },
            ],
          },
        },
        '예산': {
          select: {
            options: [
              { name: '1천만원 미만', color: 'yellow' },
              { name: '1천만원~3천만원', color: 'orange' },
              { name: '3천만원~5천만원', color: 'red' },
              { name: '5천만원 이상', color: 'purple' },
              { name: '미정', color: 'gray' },
            ],
          },
        },
        '기간': {
          select: {
            options: [
              { name: 'ASAP', color: 'red' },
              { name: '2주', color: 'orange' },
              { name: '4주', color: 'yellow' },
              { name: '8주', color: 'green' },
              { name: '미정', color: 'gray' },
            ],
          },
        },
        '메시지': {
          rich_text: {},
        },
        '제출일': {
          date: {},
        },
        '상태': {
          select: {
            options: [
              { name: '신규', color: 'default' },
              { name: '연락중', color: 'yellow' },
              { name: '제안중', color: 'orange' },
              { name: '계약', color: 'green' },
              { name: '취소', color: 'red' },
            ],
          },
        },
        '소스': {
          select: {
            options: [
              { name: '홈페이지', color: 'blue' },
              { name: '추천', color: 'green' },
              { name: '광고', color: 'orange' },
              { name: '기타', color: 'gray' },
            ],
          },
        },
        'IP': {
          rich_text: {},
        },
      },
    })
    
    console.log('Notion database created:', response.id)
    return response.id
  } catch (error) {
    console.error('Error creating Notion database:', error)
    throw error
  }
}