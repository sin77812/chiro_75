import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
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

    // 파일명 생성 (타임스탬프 + 클린한 원본명)
    const timestamp = Date.now()
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `portfolio/${timestamp}_${cleanFileName}`

    console.log('Generated filename:', fileName)

    // Vercel Blob 사용 가능한지 확인
    const isProduction = process.env.NODE_ENV === 'production'
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN

    if (isProduction || hasBlobToken) {
      // Vercel Blob에 업로드
      try {
        console.log('Uploading to Vercel Blob...')
        
        const blob = await put(fileName, file, {
          access: 'public',
          addRandomSuffix: false, // 이미 타임스탬프를 추가했으므로
        })

        console.log('File uploaded to Vercel Blob successfully:', blob.url)

        return NextResponse.json({ 
          success: true, 
          url: blob.url,
          fileName: fileName,
          size: file.size,
          type: file.type,
          storage: 'vercel-blob'
        })

      } catch (blobError) {
        console.error('Vercel Blob upload failed:', blobError)
        
        // 프로덕션에서 Blob 실패 시 에러 반환
        if (isProduction) {
          return NextResponse.json({ 
            error: 'Failed to upload to cloud storage',
            details: blobError instanceof Error ? blobError.message : 'Unknown blob error'
          }, { status: 500 })
        }
        
        // 개발 환경에서는 로컬 저장으로 폴백
        console.log('Falling back to local file storage...')
      }
    }

    // 로컬 파일 시스템 저장 (개발 환경 또는 Blob 실패 시)
    console.log('Using local file storage...')
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 업로드 디렉토리 경로
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    
    try {
      // 디렉토리가 없으면 생성
      await mkdir(uploadDir, { recursive: true })
      console.log('Upload directory created/verified')
    } catch (error) {
      console.log('Directory creation error (might already exist):', error)
    }

    // 파일 저장
    const localFileName = `${timestamp}_${cleanFileName}`
    const filePath = path.join(uploadDir, localFileName)
    console.log('Saving file to:', filePath)
    
    try {
      await writeFile(filePath, buffer)
      console.log('File saved successfully to local storage')
    } catch (writeError) {
      console.error('Error writing file:', writeError)
      throw writeError
    }

    // 웹에서 접근 가능한 URL 반환
    const fileUrl = `/uploads/${localFileName}`
    console.log('Returning local file URL:', fileUrl)

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: localFileName,
      size: file.size,
      type: file.type,
      storage: 'local-filesystem'
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json({ 
      error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}