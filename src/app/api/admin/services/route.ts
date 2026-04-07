import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkCsrf } from '@/lib/security'

async function getAdminUser(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') return null
  return user
}

export async function GET() {
  const supabase = createClient()
  const user = await getAdminUser(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const user = await getAdminUser(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { name, slug, short_description, long_description, icon_name, base_price, rush_price, same_day_price, estimated_turnaround, sort_order } = body

  if (!name || !slug) return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })

  const { data, error } = await supabase
    .from('services')
    .insert({
      name,
      slug,
      short_description: short_description || '',
      long_description: long_description || '',
      icon_name: icon_name || 'FileText',
      base_price: base_price || 0,
      rush_price: rush_price || null,
      same_day_price: same_day_price || null,
      estimated_turnaround: estimated_turnaround || '',
      sort_order: sort_order || 0,
      is_active: true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
