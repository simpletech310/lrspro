import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, phone, company, service_interest, message } = body
  if (!name || !email || !message) return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  const supabase = createServiceClient()
  const { error } = await supabase.from('contact_submissions').insert({ name, email, phone, company, service_interest, message })
  if (error) return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
  return NextResponse.json({ message: 'Submission received' }, { status: 201 })
}