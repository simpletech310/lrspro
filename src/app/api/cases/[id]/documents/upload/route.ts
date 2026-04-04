import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const docType = formData.get('doc_type') as string || 'other'
  const description = formData.get('description') as string || ''
  const clientVisible = formData.get('is_client_visible') === 'true'

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

  // Generate unique file path
  const ext = file.name.split('.').pop() || 'pdf'
  const storagePath = `cases/${params.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  // Upload to Supabase Storage
  const serviceClient = createServiceClient()
  const buffer = Buffer.from(await file.arrayBuffer())
  const { data: uploadData, error: uploadError } = await serviceClient.storage
    .from('case-documents')
    .upload(storagePath, buffer, { contentType: file.type, upsert: false })

  if (uploadError) return NextResponse.json({ error: 'Upload failed: ' + uploadError.message }, { status: 500 })

  // Get public URL
  const { data: urlData } = serviceClient.storage.from('case-documents').getPublicUrl(storagePath)

  // Create document record
  const { data, error } = await supabase.from('case_documents').insert({
    case_id: params.id,
    uploaded_by: user.id,
    file_name: file.name,
    file_size: file.size,
    file_type: file.type,
    storage_path: storagePath,
    storage_url: urlData.publicUrl,
    doc_type: docType,
    description,
    is_client_visible: clientVisible || (profile?.role === 'client'),
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Create case update
  await supabase.from('case_updates').insert({
    case_id: params.id,
    author_id: user.id,
    update_type: 'document_upload',
    title: 'Document uploaded: ' + file.name,
    content: description || undefined,
    is_client_visible: clientVisible,
  })

  // Flag affidavit ready
  if (docType === 'affidavit' || docType === 'proof_of_service') {
    await supabase.from('cases').update({ affidavit_ready: true }).eq('id', params.id)
  }

  return NextResponse.json({ data }, { status: 201 })
}
