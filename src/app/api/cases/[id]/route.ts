import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabase.from('cases').select(`
    *, client:profiles!client_id(*), assigned_staff:profiles!assigned_staff_id(*), service:services(*),
    attempts:case_attempts(*, staff:profiles(*)), updates:case_updates(*, author:profiles(*)),
    documents:case_documents(*), checklist:case_checklist_items(*)
  `).eq('id', params.id).order('created_at', { referencedTable: 'case_updates', ascending: true }).single()
  if (error) return NextResponse.json({ error: 'Case not found' }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role === 'client') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const updates = await request.json()
  const { data, error } = await supabase.from('cases').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', params.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (updates.status === 'complete') await supabase.from('cases').update({ completed_at: new Date().toISOString() }).eq('id', params.id)
  return NextResponse.json({ data })
}