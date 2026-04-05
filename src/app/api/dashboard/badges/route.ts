import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role === 'client') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  let unreadInbox = 0
  let unassignedCases = 0

  if (profile.role === 'admin') {
    const { count: inboxCount } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
    unreadInbox = inboxCount || 0

    const { count: caseCount } = await supabase
      .from('cases')
      .select('*', { count: 'exact', head: true })
      .is('assigned_staff_id', null)
      .not('status', 'in', '("complete","cancelled","unable_to_serve")')
    unassignedCases = caseCount || 0
  }

  return NextResponse.json({ unreadInbox, unassignedCases })
}
