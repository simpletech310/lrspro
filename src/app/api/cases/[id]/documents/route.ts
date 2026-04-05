import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isValidUUID, checkCsrf } from '@/lib/security'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isValidUUID(params.id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  const csrfError = checkCsrf(request)
  if (csrfError) return csrfError

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

  const { data, error } = await supabase.from('case_documents').insert({
    case_id: params.id,
    uploaded_by: user.id,
    file_name: body.file_name?.slice(0, 255) || 'Unknown',
    file_size: typeof body.file_size === 'number' ? body.file_size : null,
    file_type: body.file_type?.slice(0, 100) || null,
    storage_path: body.storage_path?.slice(0, 500) || null,
    storage_url: body.storage_url?.slice(0, 1000) || null,
    doc_type: body.doc_type?.slice(0, 50) || 'other',
    description: body.description?.slice(0, 500) || null,
    is_client_visible: body.is_client_visible ?? (profile?.role === 'client'),
  }).select().single()

  if (error) {
    console.error('Document insert error:', error)
    return NextResponse.json({ error: 'Failed to save document' }, { status: 500 })
  }

  await supabase.from('case_updates').insert({
    case_id: params.id, author_id: user.id, update_type: 'document_upload',
    title: 'Document uploaded: ' + (body.file_name?.slice(0, 100) || 'file'),
    content: body.description?.slice(0, 500) || null,
    is_client_visible: body.is_client_visible ?? false,
  })

  if (body.doc_type === 'affidavit' || body.doc_type === 'proof_of_service') {
    await supabase.from('cases').update({ affidavit_ready: true }).eq('id', params.id)
  }

  return NextResponse.json({ data }, { status: 201 })
}
