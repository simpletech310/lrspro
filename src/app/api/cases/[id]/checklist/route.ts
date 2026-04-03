import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { item_id, is_complete } = await request.json()
  const { data, error } = await supabase.from('case_checklist_items').update({ is_complete, completed_by: is_complete ? user.id : null, completed_at: is_complete ? new Date().toISOString() : null }).eq('id', item_id).eq('case_id', params.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}