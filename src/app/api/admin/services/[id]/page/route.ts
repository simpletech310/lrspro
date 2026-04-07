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

  const { data, error } = await supabase
    .from('service_pages')
    .select('*')
    .eq('service_id', params.id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const user = await getAdminUser(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { seo_slug, headline, tagline, meta_title, meta_description, features, faqs } = body

  if (!seo_slug || !headline) return NextResponse.json({ error: 'seo_slug and headline are required' }, { status: 400 })

  const pageData = {
    service_id: params.id,
    seo_slug,
    headline,
    tagline: tagline || '',
    meta_title: meta_title || '',
    meta_description: meta_description || '',
    features: features || [],
    faqs: faqs || [],
  }

  // Upsert: update if exists for this service_id, else insert
  const { data: existing } = await supabase
    .from('service_pages')
    .select('id')
    .eq('service_id', params.id)
    .single()

  let data, error
  if (existing) {
    ({ data, error } = await supabase
      .from('service_pages')
      .update(pageData)
      .eq('service_id', params.id)
      .select()
      .single())
  } else {
    ({ data, error } = await supabase
      .from('service_pages')
      .insert(pageData)
      .select()
      .single())
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
