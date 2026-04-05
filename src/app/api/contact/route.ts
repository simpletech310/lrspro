import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { isValidEmail, rateLimit } from '@/lib/security'

export async function POST(request: NextRequest) {
  // Rate limit by IP: 5 submissions per 10 minutes
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(`contact:${ip}`, 5, 600000)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
  }

  const body = await request.json()
  const { name, email, phone, company, service_interest, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }

  if (typeof name !== 'string' || name.length > 200) {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
  }
  if (!isValidEmail(email) || email.length > 320) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return NextResponse.json({ error: 'Message too long (max 5000 characters)' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error } = await supabase.from('contact_submissions').insert({
    name: name.trim().slice(0, 200),
    email: email.trim().toLowerCase(),
    phone: phone?.trim()?.slice(0, 30) || null,
    company: company?.trim()?.slice(0, 200) || null,
    service_interest: service_interest?.trim()?.slice(0, 100) || null,
    message: message.trim().slice(0, 5000),
  })

  if (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Submission received' }, { status: 201 })
}
