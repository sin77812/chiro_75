import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Email configuration
const EMAIL_TO = ['sin77812@gmail.com', 'chiroweb75@gmail.com']
const EMAIL_FROM = 'onboarding@resend.dev' // 테스트용, 도메인 인증 후 변경

interface ContactFormData {
  name: string
  email: string
  company: string
  budget: string
  services: string[]
  message: string
}

const budgetLabels: Record<string, string> = {
  'under-200': '200만원 미만',
  '300-800': '300만원 - 800만원',
  '800-1200': '800만원 - 1,200만원',
  '1200-3000': '1200만원 - 3000만원',
  'over-3000': '3천만원 이상',
  'discuss': '상담 후 결정'
}

const serviceLabels: Record<string, string> = {
  'web-development': '웹사이트 개발',
  'ui-ux-design': 'UI/UX 디자인',
  'performance-optimization': '성능 최적화',
  'digital-marketing': '디지털 마케팅',
  'maintenance-support': '유지보수 & 지원',
  'global-expansion': '글로벌 확장'
}

async function sendEmail(data: ContactFormData) {
  // Resend API 키 확인
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in environment variables')
    throw new Error('Email service is not configured')
  }

  const selectedServices = data.services.map(s => serviceLabels[s] || s).join(', ')
  const budgetDisplay = budgetLabels[data.budget] || '미정'
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #555; margin-bottom: 5px; }
        .value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #e0e0e0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #777; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🚀 새로운 프로젝트 문의</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">CHIRO 웹사이트 상담 신청</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 이름</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">✉️ 이메일</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">🏢 회사명</div>
            <div class="value">${data.company}</div>
          </div>
          
          <div class="field">
            <div class="label">💰 예상 예산</div>
            <div class="value">${budgetDisplay}</div>
          </div>
          
          <div class="field">
            <div class="label">📋 관심 서비스</div>
            <div class="value">${selectedServices}</div>
          </div>
          
          <div class="field">
            <div class="label">💬 프로젝트 상세 내용</div>
            <div class="value" style="white-space: pre-wrap;">${data.message}</div>
          </div>
          
          <div class="footer">
            <p>제출 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
            <p>이 이메일은 CHIRO 웹사이트 상담 신청 폼을 통해 자동으로 발송되었습니다.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
  
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const { data: emailData, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `[CHIRO] 새로운 상담 신청 - ${data.name} (${data.company})`,
      html: htmlContent,
      replyTo: data.email // 답장 시 고객 이메일로 직접 전송
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Email sent successfully:', emailData)
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.company || !data.message || !data.services.length) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: '올바른 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }
    
    // Send email
    await sendEmail(data)
    
    return NextResponse.json(
      { success: true, message: '상담 신청이 성공적으로 전송되었습니다.' },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}