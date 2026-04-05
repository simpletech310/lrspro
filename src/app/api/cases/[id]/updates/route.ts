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
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role === 'client') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { title, content, is_client_visible, update_type } = body

  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const { data, error } = await supabase.from('case_updates').insert({
    case_id: params.id,
    author_id: user.id,
    update_type: update_type?.slice(0, 50) || 'note',
    title: title.slice(0, 200),
    content: content?.slice(0, 5000) || null,
    is_client_visible: !!is_client_visible,
  }).select().single()

  if (error) {
    console.error('Update insert error:', error)
    return NextResponse.json({ error: 'Failed to post update' }, { status: 500 })
  }

  // Send email if client visible
  if (data.is_client_visible) {
    try {
      const { data: theCase } = await supabase.from('cases').select('*, client:profiles!client_id(*)').eq('id', params.id).single()
      if (theCase && theCase.client?.email) {
        const { render } = await import('@react-email/render')
        const CaseUpdateTemplate = (await import('@/emails/CaseUpdate')).default
        const { resend, FROM_EMAIL, FROM_NAME } = await import('@/lib/resend/client')

        const html = await render(CaseUpdateTemplate({
          customerName: theCase.client.full_name || 'Valued Client',
          caseNumber: theCase.case_number,
          updateTitle: data.title || 'Status Update',
          updateContent: data.content || 'Your case has been updated.',
        }))

        await resend.emails.send({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: theCase.client.email,
          subject: `Update on Case ${theCase.case_number}: ${data.title}`,
          html,
        })
      }
    } catch (e) { console.error('Failed to send update email', e) }
  }

  return NextResponse.json({ data }, { status: 201 })
}
