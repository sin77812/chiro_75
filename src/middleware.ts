import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(_req: NextRequest) {
  const res = NextResponse.next()
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV

  // Prevent indexing on non-production environments (e.g., Vercel previews)
  if (env && env !== 'production') {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  }
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}

