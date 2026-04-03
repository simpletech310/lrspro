import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // src/middleware.ts - Barebones for isolation testing
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)'],
}
