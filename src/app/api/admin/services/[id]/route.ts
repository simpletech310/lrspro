import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isValidUUID, checkCsrf } from '@/lib/security'

async function getAdminUser(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') return null
  return user
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const supabase = createClient()
  const user = await getAdminUser(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data, error } = await supabase.from('services').select('*').eq('id', params.id).single()
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const user = await getAdminUser(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const allowed = ['name', 'slug', 'short_description', 'long_description', 'icon_name', 'base_price', 'rush_price', 'same_day_price', 'estimated_turnaround', 'is_active', 'sort_order']
  const updates: Record<string, any> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0) return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })

  const { data, error } = await supabase.from('services').update(updates).eq('id', params.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const user = await getAdminUser(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Soft delete
  const { error } = await supabase.from('services').update({ is_active: false }).eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
