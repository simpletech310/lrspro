import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Barebones middleware to isolate the crash on Vercel
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)'],
}