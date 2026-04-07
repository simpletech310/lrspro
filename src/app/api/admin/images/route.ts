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
    .from('site_images')
    .select('*')
    .order('slot')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const user = await getAdminUser(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const slot = formData.get('slot') as string | null
  const altText = (formData.get('alt_text') as string) || ''

  if (!file || !slot) return NextResponse.json({ error: 'file and slot are required' }, { status: 400 })

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, WebP, or SVG.' }, { status: 400 })
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 })
  }

  // Delete old file if replacing
  const { data: existing } = await supabase
    .from('site_images')
    .select('storage_path')
    .eq('slot', slot)
    .single()

  if (existing) {
    await supabase.storage.from('site-images').remove([existing.storage_path])
  }

  const ext = file.name.split('.').pop() || 'png'
  const storagePath = `${slot}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('site-images')
    .upload(storagePath, file, { contentType: file.type, upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data, error } = await supabase
    .from('site_images')
    .upsert({ slot, storage_path: storagePath, alt_text: altText }, { onConflict: 'slot' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
