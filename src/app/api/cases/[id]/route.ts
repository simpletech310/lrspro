import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isValidUUID, checkCsrf } from '@/lib/security'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase.from('cases').select(`
    *, client:profiles!client_id(*), assigned_staff:profiles!assigned_staff_id(*), service:services(*),
    attempts:case_attempts(*, staff:profiles(*)), updates:case_updates(*, author:profiles(*)),
    documents:case_documents(*), checklist:case_checklist_items(*)
  `).eq('id', params.id).order('created_at', { referencedTable: 'case_updates', ascending: true }).single()

  if (error || !data) return NextResponse.json({ error: 'Case not found' }, { status: 404 })

  // Access control: clients can only see their own cases, staff only assigned cases, admin sees all
  if (profile.role === 'client' && data.client_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  if (profile.role === 'staff' && data.assigned_staff_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json({ data })
}

const ALLOWED_CASE_FIELDS = ['status', 'priority', 'assigned_staff_id', 'notes', 'deadline', 'subject_name', 'subject_address'] as const

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role === 'client') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()

  // Only allow whitelisted fields
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  for (const field of ALLOWED_CASE_FIELDS) {
    if (field in body) updates[field] = body[field]
  }

  const { data, error } = await supabase.from('cases').update(updates).eq('id', params.id).select().single()
  if (error) {
    console.error('Case update error:', error)
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 })
  }

  if (body.status === 'complete') {
    await supabase.from('cases').update({ completed_at: new Date().toISOString() }).eq('id', params.id)
  }

  return NextResponse.json({ data })
}
