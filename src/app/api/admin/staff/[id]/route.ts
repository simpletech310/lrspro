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

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { role } = body

  if (!['staff', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  // Prevent admin from demoting themselves
  if (params.id === user.id && role !== 'admin') {
    return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 })
  }

  // Verify target user exists and is already staff/admin (prevent promoting clients)
  const { data: target } = await supabase.from('profiles').select('role').eq('id', params.id).single()
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  if (!['staff', 'admin'].includes(target.role)) {
    return NextResponse.json({ error: 'Can only modify staff or admin roles' }, { status: 400 })
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', params.id)

  if (error) {
    console.error('Role update error:', error)
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
