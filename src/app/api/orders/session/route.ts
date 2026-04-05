import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sessionId = request.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.metadata?.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Look up the case created by this session
    const { data: caseData } = await supabase
      .from('cases')
      .select('case_number, service_type, status, priority')
      .eq('stripe_checkout_session_id', sessionId)
      .single()

    // Look up the service name
    const serviceName = session.metadata?.service_slug
      ? (await supabase.from('services').select('name').eq('slug', session.metadata.service_slug).single()).data?.name
      : null

    return NextResponse.json({
      case_number: caseData?.case_number || null,
      service_name: serviceName || session.metadata?.service_slug || 'Service',
      priority: session.metadata?.priority || 'standard',
      amount_paid: session.amount_total,
      customer_email: session.customer_email,
      payment_status: session.payment_status,
    })
  } catch {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
}
