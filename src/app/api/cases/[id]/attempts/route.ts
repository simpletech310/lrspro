import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isValidUUID, checkCsrf } from '@/lib/security'

const VALID_OUTCOMES = ['successful', 'unsuccessful', 'no_answer', 'refused', 'other']

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role === 'client') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { outcome, address_used, notes, attempted_at, gps_lat, gps_lng } = body

  if (!outcome || typeof outcome !== 'string') {
    return NextResponse.json({ error: 'Outcome is required' }, { status: 400 })
  }

  const { count } = await supabase.from('case_attempts').select('*', { count: 'exact', head: true }).eq('case_id', params.id)
  const attemptNum = (count || 0) + 1

  const { data, error } = await supabase.from('case_attempts').insert({
    case_id: params.id,
    staff_id: user.id,
    attempt_num: attemptNum,
    outcome: outcome.slice(0, 50),
    address_used: address_used?.slice(0, 500) || null,
    notes: notes?.slice(0, 2000) || null,
    attempted_at: attempted_at || new Date().toISOString(),
    gps_lat: typeof gps_lat === 'number' ? gps_lat : null,
    gps_lng: typeof gps_lng === 'number' ? gps_lng : null,
  }).select().single()

  if (error) {
    console.error('Attempt insert error:', error)
    return NextResponse.json({ error: 'Failed to log attempt' }, { status: 500 })
  }

  await supabase.from('cases').update({ status: 'attempted' }).eq('id', params.id)

  const outcomeText = outcome.replace(/_/g, ' ')
  await supabase.from('case_updates').insert({
    case_id: params.id, author_id: user.id, update_type: 'attempt_logged',
    title: 'Service attempt #' + attemptNum + ' logged',
    content: 'Outcome: ' + outcomeText + '. ' + (notes || ''),
    is_client_visible: true,
  })

  return NextResponse.json({ data }, { status: 201 })
}
