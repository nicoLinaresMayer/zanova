import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value

  if (token === process.env.ADMIN_PASSWORD) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login-admin', request.url))
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}