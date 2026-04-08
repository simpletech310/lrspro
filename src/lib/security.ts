import { NextRequest, NextResponse } from 'next/server'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id)
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

export function isValidUrl(url: string): boolean {
  return url.startsWith('https://') || url.startsWith('http://localhost')
}

/**
 * Basic CSRF check: verifies the request Origin header matches expected origins.
 * Returns null if OK, or a 403 response if the check fails.
 */
export function checkCsrf(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin')
  // Allow same-origin requests (no Origin header means same-origin in some browsers)
  if (!origin) return null

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'https://lrspro.vercel.app',
    'http://localhost:3000',
  ].filter(Boolean)

  // Allow exact matches and Vercel preview deployments
  if (allowedOrigins.some(allowed => origin === allowed)) return null
  if (origin.endsWith('.vercel.app')) return null

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

/**
 * Simple in-memory rate limiter.
 * For production, use Upstash Redis or similar.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) return false

  entry.count++
  return true
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetAt) rateLimitMap.delete(key)
  })
}, 60000)
