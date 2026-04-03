import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role === 'client') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { count } = await supabase.from('case_attempts').select('*', { count: 'exact', head: true }).eq('case_id', params.id)
  const body = await request.json()
  const { data, error } = await supabase.from('case_attempts').insert({ ...body, case_id: params.id, staff_id: user.id, attempt_num: (count || 0) + 1 }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  await supabase.from('cases').update({ status: 'attempted' }).eq('id', params.id)
  const attemptNum = (count || 0) + 1
  const outcomeText = body.outcome.replace(/_/g, ' ')
  await supabase.from('case_updates').insert({
    case_id: params.id, author_id: user.id, update_type: 'attempt_logged',
    title: 'Service attempt #' + attemptNum + ' logged',
    content: 'Outcome: ' + outcomeText + '. ' + (body.notes || ''),
    is_client_visible: true
  })
  return NextResponse.json({ data }, { status: 201 })
}