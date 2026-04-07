import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkCsrf } from '@/lib/security'

export async function DELETE(request: NextRequest, { params }: { params: { slot: string } }) {
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: existing } = await supabase
    .from('site_images')
    .select('storage_path')
    .eq('slot', params.slot)
    .single()

  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await supabase.storage.from('site-images').remove([existing.storage_path])
  const { error } = await supabase.from('site_images').delete().eq('slot', params.slot)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
