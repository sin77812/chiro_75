import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    console.log('Consultation form data received:', formData)

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail SMTP 사용
      auth: {
        user: process.env.SMTP_EMAIL, // 발송용 Gmail 주소
        pass: process.env.SMTP_PASSWORD, // Gmail 앱 비밀번호
      },
    })

    // 프로젝트 타입을 문자열로 변환
    const projectTypes = Array.isArray(formData.projectType) 
      ? formData.projectType.join(', ') 
      : formData.projectType || '없음'

    // 기능 요구사항을 문자열로 변환  
    const features = Array.isArray(formData.features)
      ? formData.features.join(', ')
      : formData.features || '없음'

    // HTML 이메일 템플릿
    const htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">새로운 견적 신청</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">CHIRO 웹사이트에서 견적 신청이 도착했습니다</p>
        </div>
        
        <div style="background: #fff; padding: 30px;">
          <h2 style="color: #333; margin: 0 0 20px 0; font-size: 18px;">📋 기본 정보</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666; width: 120px;">이름</td>
              <td style="padding: 12px 0; color: #333;">${formData.name || '없음'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">회사명</td>
              <td style="padding: 12px 0; color: #333;">${formData.company || '없음'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">연락처</td>
              <td style="padding: 12px 0; color: #333;">${formData.phone || '없음'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">이메일</td>
              <td style="padding: 12px 0; color: #333;">${formData.email || '없음'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">선호 연락 방식</td>
              <td style="padding: 12px 0; color: #333;">${formData.contactMethod || '없음'}</td>
            </tr>
          </table>

          <h2 style="color: #333; margin: 0 0 20px 0; font-size: 18px;">🚀 프로젝트 상세</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666; width: 120px;">프로젝트 유형</td>
              <td style="padding: 12px 0; color: #333;">${projectTypes}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">웹사이트 유형</td>
              <td style="padding: 12px 0; color: #333;">${formData.hasWebsite === 'new' ? '새 웹사이트' : formData.hasWebsite === 'renewal' ? '기존 웹사이트 리뉴얼' : '없음'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">현재 웹사이트</td>
              <td style="padding: 12px 0; color: #333;">${formData.currentWebsite || '없음'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">필요 기능</td>
              <td style="padding: 12px 0; color: #333;">${features}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">레퍼런스 사이트</td>
              <td style="padding: 12px 0; color: #333;">${formData.reference || '없음'}</td>
            </tr>
          </table>

          <h2 style="color: #333; margin: 0 0 20px 0; font-size: 18px;">💰 예산 & 일정</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666; width: 120px;">예산</td>
              <td style="padding: 12px 0; color: #333;">${formData.budget || '없음'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-weight: 600; color: #666;">희망 일정</td>
              <td style="padding: 12px 0; color: #333;">${formData.timeline || '없음'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #666; vertical-align: top;">추가 요청사항</td>
              <td style="padding: 12px 0; color: #333; white-space: pre-wrap;">${formData.additional || '없음'}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            📧 CHIRO 웹사이트 견적 신청 알림<br>
            <a href="https://chiroweb.co.kr" style="color: #1DB954; text-decoration: none;">https://chiroweb.co.kr</a>
          </p>
        </div>
      </div>
    `

    // 이메일 발송
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL, // 발송자
      to: process.env.RECIPIENT_EMAIL, // 수신자 (당신의 이메일)
      subject: `[CHIRO] 새로운 견적 신청 - ${formData.name || '알 수 없음'}`,
      html: htmlContent,
      replyTo: formData.email, // 답장 시 고객 이메일로 설정
    })

    console.log('Email sent successfully')

    return NextResponse.json({ 
      success: true, 
      message: '견적 신청이 성공적으로 전송되었습니다.' 
    })

  } catch (error) {
    console.error('Email send error:', error)
    
    return NextResponse.json({ 
      error: 'Failed to send consultation request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}