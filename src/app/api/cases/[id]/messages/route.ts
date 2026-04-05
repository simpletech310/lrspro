import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isValidUUID, checkCsrf, rateLimit } from '@/lib/security'

const MAX_MESSAGE_LENGTH = 10000

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Verify access to this case
  const { data: caseData } = await supabase.from('cases').select('id, client_id, assigned_staff_id').eq('id', params.id).single()
  if (!caseData) return NextResponse.json({ error: 'Case not found' }, { status: 404 })

  if (profile.role === 'client' && caseData.client_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  if (profile.role === 'staff' && caseData.assigned_staff_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let query = supabase
    .from('case_messages')
    .select('*, sender:profiles!sender_id(full_name, role)')
    .eq('case_id', params.id)
    .order('created_at', { ascending: true })

  // Clients only see non-internal messages
  if (profile.role === 'client') {
    query = query.eq('is_internal', false)
  }

  const { data: messages, error } = await query
  if (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }

  return NextResponse.json({ data: messages })
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Rate limit: 20 messages per minute per user
  if (!rateLimit(`msg:${user.id}`, 20, 60000)) {
    return NextResponse.json({ error: 'Too many messages. Please wait a moment.' }, { status: 429 })
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Verify access
  const { data: caseData } = await supabase.from('cases').select('id, client_id, assigned_staff_id').eq('id', params.id).single()
  if (!caseData) return NextResponse.json({ error: 'Case not found' }, { status: 404 })

  const isClient = profile.role === 'client'
  if (isClient && caseData.client_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  if (profile.role === 'staff' && caseData.assigned_staff_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { content, is_internal } = body

  if (!content?.trim()) {
    return NextResponse.json({ error: 'Message content is required' }, { status: 400 })
  }
  if (typeof content !== 'string' || content.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Message must be under ${MAX_MESSAGE_LENGTH} characters` }, { status: 400 })
  }

  // Clients cannot send internal messages
  const finalIsInternal = isClient ? false : !!is_internal

  const { data: message, error } = await supabase
    .from('case_messages')
    .insert({
      case_id: params.id,
      sender_id: user.id,
      content: content.trim(),
      is_internal: finalIsInternal,
    })
    .select('*, sender:profiles!sender_id(full_name, role)')
    .single()

  if (error) {
    console.error('Message insert error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ data: message })
}
