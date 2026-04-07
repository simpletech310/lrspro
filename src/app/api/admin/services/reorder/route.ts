import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isValidUUID, checkCsrf } from '@/lib/security'

export async function PATCH(request: NextRequest) {
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { orderedIds } = await request.json()
  if (!Array.isArray(orderedIds) || !orderedIds.every(isValidUUID)) {
    return NextResponse.json({ error: 'Invalid orderedIds' }, { status: 400 })
  }

  for (let i = 0; i < orderedIds.length; i++) {
    const { error } = await supabase.from('services').update({ sort_order: i }).eq('id', orderedIds[i])
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
