import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const url = new URL(request.url)
  const status = url.searchParams.get('status')
  const page = parseInt(url.searchParams.get('page') || '1')
  const perPage = parseInt(url.searchParams.get('per_page') || '25')

  let query = supabase.from('cases').select('*, client:profiles!client_id(id,full_name,email,company), assigned_staff:profiles!assigned_staff_id(id,full_name), service:services(id,name,slug)', { count: 'exact' })
  if (profile?.role === 'client') query = query.eq('client_id', user.id)
  else if (profile?.role === 'staff') query = query.eq('assigned_staff_id', user.id)
  if (status) query = query.eq('status', status)
  query = query.order('created_at', { ascending: false }).range((page-1)*perPage, page*perPage-1)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count, page, per_page: perPage, total_pages: Math.ceil((count||0)/perPage) })
}