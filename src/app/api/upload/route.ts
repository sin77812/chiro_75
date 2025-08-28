import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  console.log('Upload API called')
  
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    console.log('File received:', file ? file.name : 'No file')
    
    if (!file) {
      console.error('No file provided in form data')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // 파일 확장자 검증
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json({ 
        error: `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}` 
      }, { status: 400 })
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File size too large:', file.size)
      return NextResponse.json({ 
        error: `File size too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum allowed: 5MB` 
      }, { status: 400 })
    }

    console.log('Reading file buffer...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('Buffer created, size:', buffer.length)

    // 파일명 생성 (타임스탬프 + 원본명)
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${originalName}`
    console.log('Generated filename:', fileName)

    // 업로드 디렉토리 경로
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    console.log('Upload directory:', uploadDir)
    
    // 디렉토리가 없으면 생성
    try {
      await mkdir(uploadDir, { recursive: true })
      console.log('Upload directory created/verified')
    } catch (error) {
      console.log('Directory creation error (might already exist):', error)
    }

    // 파일 저장
    const filePath = path.join(uploadDir, fileName)
    console.log('Saving file to:', filePath)
    
    try {
      await writeFile(filePath, buffer)
      console.log('File saved successfully')
    } catch (writeError) {
      console.error('Error writing file:', writeError)
      throw writeError
    }

    // 웹에서 접근 가능한 URL 반환
    const fileUrl = `/uploads/${fileName}`
    console.log('Returning file URL:', fileUrl)

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json({ 
      error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}