import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isValidUUID, checkCsrf } from '@/lib/security'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { item_id, is_complete } = await request.json()
  if (!item_id || !isValidUUID(item_id) || typeof is_complete !== 'boolean') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { data, error } = await supabase.from('case_checklist_items').update({
    is_complete,
    completed_by: is_complete ? user.id : null,
    completed_at: is_complete ? new Date().toISOString() : null,
  }).eq('id', item_id).eq('case_id', params.id).select().single()

  if (error) {
    console.error('Checklist update error:', error)
    return NextResponse.json({ error: 'Failed to update checklist' }, { status: 500 })
  }
  return NextResponse.json({ data })
}
