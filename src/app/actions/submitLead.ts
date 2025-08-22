'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { saveToNotion } from '@/lib/notion'

// Rate limiting storage (in-memory, production should use Redis)
const rateLimitMap = new Map<string, number>()

// Form validation schema
const leadSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').max(50, '이름이 너무 깁니다'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  industry: z.enum(['manufacturing', 'it-saas', 'medical', 'other'], {
    errorMap: () => ({ message: '유효한 업종을 선택해주세요' })
  }),
  budget: z.enum(['under-10m', '10m-30m', '30m-50m', 'over-50m', 'undecided'], {
    errorMap: () => ({ message: '예산대를 선택해주세요' })
  }),
  timeline: z.enum(['asap', '2weeks', '4weeks', '8weeks', 'undecided'], {
    errorMap: () => ({ message: '희망 기간을 선택해주세요' })
  }),
  message: z.string().min(1, '메시지를 입력해주세요').max(500, '메시지는 500자 이하로 입력해주세요'),
  honeypot: z.string().optional(),
  turnstileToken: z.string().min(1, '보안 검증을 완료해주세요'),
})

// Turnstile verification
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY not configured')
    return true // Allow in development
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secret}&response=${token}`,
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

// Get client IP for rate limiting
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// Rate limiting check (60 seconds between submissions)
function checkRateLimit(clientIP: string): boolean {
  const now = Date.now()
  const lastSubmission = rateLimitMap.get(clientIP)
  
  if (lastSubmission && now - lastSubmission < 60000) {
    return false // Rate limited
  }
  
  rateLimitMap.set(clientIP, now)
  
  // Clean up old entries (older than 5 minutes)
  for (const [ip, timestamp] of rateLimitMap.entries()) {
    if (now - timestamp > 300000) {
      rateLimitMap.delete(ip)
    }
  }
  
  return true
}

// Initialize Resend
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

// Send notification email
async function sendNotificationEmail(data: z.infer<typeof leadSchema>) {
  const resendClient = getResendClient()
  if (!resendClient) {
    console.warn('RESEND_API_KEY not configured, skipping email')
    return
  }

  const industryLabels = {
    manufacturing: '제조업',
    'it-saas': 'IT·SaaS',
    medical: '의료',
    other: '기타'
  }

  const budgetLabels = {
    'under-10m': '1천만원 미만',
    '10m-30m': '1천만원 ~ 3천만원',
    '30m-50m': '3천만원 ~ 5천만원',
    'over-50m': '5천만원 이상',
    undecided: '미정'
  }

  const timelineLabels = {
    asap: 'ASAP',
    '2weeks': '2주',
    '4weeks': '4주',
    '8weeks': '8주',
    undecided: '미정'
  }

  try {
    await resendClient.emails.send({
      from: 'CHIRO Lead <no-reply@chiro.agency>',
      to: ['team@chiro.agency'],
      subject: `새로운 상담 문의: ${data.name}`,
      html: `
        <h2>새로운 상담 문의가 접수되었습니다</h2>
        
        <h3>고객 정보</h3>
        <ul>
          <li><strong>이름:</strong> ${data.name}</li>
          <li><strong>이메일:</strong> ${data.email}</li>
          <li><strong>업종:</strong> ${industryLabels[data.industry]}</li>
          <li><strong>예산:</strong> ${budgetLabels[data.budget]}</li>
          <li><strong>희망 기간:</strong> ${timelineLabels[data.timeline]}</li>
        </ul>
        
        <h3>메시지</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>제출 시간: ${new Date().toLocaleString('ko-KR')}</small></p>
      `,
    })
  } catch (error) {
    console.error('Failed to send notification email:', error)
    // Don't throw - email failure shouldn't block lead submission
  }
}

export async function submitLead(request: Request): Promise<Response> {
  try {
    // Parse form data
    const body = await request.json()
    
    // Check honeypot
    if (body.honeypot) {
      return Response.json({ error: 'Bot detected' }, { status: 400 })
    }
    
    // Rate limiting
    const clientIP = getClientIP(request)
    if (!checkRateLimit(clientIP)) {
      return Response.json({ 
        error: '요청이 너무 빠릅니다. 잠시 후 다시 시도해주세요.' 
      }, { status: 429 })
    }
    
    // Validate form data
    const validationResult = leadSchema.safeParse(body)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
      return Response.json({ 
        error: '입력 데이터가 유효하지 않습니다',
        validationErrors: errors
      }, { status: 400 })
    }
    
    const data = validationResult.data
    
    // Verify Turnstile
    const isValidTurnstile = await verifyTurnstile(data.turnstileToken)
    if (!isValidTurnstile) {
      return Response.json({ 
        error: '보안 검증에 실패했습니다. 다시 시도해주세요.' 
      }, { status: 400 })
    }
    
    // Save to database (Notion)
    try {
      await saveToNotion({
        name: data.name,
        email: data.email,
        industry: data.industry,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        submittedAt: new Date().toISOString(),
        clientIP,
      })
    } catch (error) {
      console.error('Failed to save to Notion:', error)
      // Don't fail the request if database save fails
    }
    
    // Send notification email
    await sendNotificationEmail(data)
    
    return Response.json({ 
      success: true,
      message: '문의가 성공적으로 전송되었습니다' 
    })
    
  } catch (error) {
    console.error('Submit lead error:', error)
    return Response.json({ 
      error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
    }, { status: 500 })
  }
}

// API Route Handler
export async function POST(request: Request) {
  return submitLead(request)
}