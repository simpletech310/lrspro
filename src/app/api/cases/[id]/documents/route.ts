import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const { data, error } = await supabase.from('case_documents').insert({
    ...body, case_id: params.id, uploaded_by: user.id,
    is_client_visible: body.is_client_visible ?? (profile?.role === 'client')
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  await supabase.from('case_updates').insert({
    case_id: params.id, author_id: user.id, update_type: 'document_upload',
    title: 'Document uploaded: ' + body.file_name,
    content: body.description, is_client_visible: body.is_client_visible ?? false
  })
  if (body.doc_type === 'affidavit' || body.doc_type === 'proof_of_service') {
    await supabase.from('cases').update({ affidavit_ready: true }).eq('id', params.id)
  }
  return NextResponse.json({ data }, { status: 201 })
}