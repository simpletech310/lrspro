import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test')
  } catch {
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    if (session.payment_status !== 'paid') return NextResponse.json({ received: true })
    const metadata = session.metadata!
    const orderData = JSON.parse(metadata.order_data || '{}')
    const supabase = createServiceClient()

    const casePayload = {
      client_id: metadata.user_id, service_id: metadata.service_id,
      service_type: metadata.service_slug, priority: metadata.priority || 'standard',
      status: 'received' as const, stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      amount_paid: session.amount_total,
      subject_name: orderData.subject_name, subject_address: orderData.subject_address,
      subject_city: orderData.subject_city, subject_state: orderData.subject_state || 'CA',
      subject_zip: orderData.subject_zip, subject_phone: orderData.subject_phone,
      subject_dob: orderData.subject_dob, court_case_number: orderData.court_case_number,
      court_name: orderData.court_name, plaintiff_name: orderData.plaintiff_name,
      defendant_name: orderData.defendant_name, documents_description: orderData.documents_description,
      appointment_date: orderData.preferred_date && orderData.preferred_time
        ? new Date(`${orderData.preferred_date}T${orderData.preferred_time}`).toISOString() : undefined,
      appointment_location: orderData.appointment_location,
      special_instructions: orderData.special_instructions,
      deadline: orderData.deadline ? new Date(orderData.deadline).toISOString() : undefined,
    }

    const { data: newCase, error } = await supabase.from('cases').insert(casePayload).select('*, client:profiles!client_id(*), service:services(*)').single()
    if (error) { console.error('Case creation error:', error); return NextResponse.json({ error: 'Case creation failed' }, { status: 500 }) }

    await supabase.from('case_updates').insert({
      case_id: newCase.id, update_type: 'payment', title: 'Payment confirmed — case opened',
      content: `Payment of $${((session.amount_total||0)/100).toFixed(2)} received via Stripe.`,
      is_client_visible: true,
    })

    // Fire Transactional Email to Client
    if (newCase.client?.email) {
      try {
        const { render } = await import('@react-email/render')
        const OrderConfirmation = (await import('@/emails/OrderConfirmation')).default
        const { resend, FROM_EMAIL, FROM_NAME } = await import('@/lib/resend/client')
        
        const html = await render(OrderConfirmation({
          customerName: newCase.client.full_name || 'Valued Client',
          caseNumber: newCase.case_number,
          serviceName: newCase.service?.name || newCase.service_type,
          totalPaid: `$${((session.amount_total||0)/100).toFixed(2)}`
        }))

        await resend.emails.send({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: newCase.client.email,
          subject: `Order Confirmation - Case ${newCase.case_number}`,
          html: html,
        })
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError)
      }
    }
  }
  return NextResponse.json({ received: true })
}