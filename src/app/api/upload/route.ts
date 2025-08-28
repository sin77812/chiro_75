import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // 파일 확장자 검증
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size too large' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일명 생성 (타임스탬프 + 원본명)
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${originalName}`

    // 업로드 디렉토리 경로
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    
    // 디렉토리가 없으면 생성
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // 디렉토리가 이미 존재하면 무시
    }

    // 파일 저장
    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    // 웹에서 접근 가능한 URL 반환
    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}