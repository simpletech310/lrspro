import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { getPriceId } from '@/lib/stripe/products'
import { checkCsrf } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    const csrfError = checkCsrf(request)
    if (csrfError) return csrfError

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { service_slug, priority = 'standard', order_data } = body

    if (!service_slug) return NextResponse.json({ error: 'Missing service_slug' }, { status: 400 })
    if (!['standard', 'rush', 'same_day'].includes(priority)) return NextResponse.json({ error: 'Invalid priority' }, { status: 400 })

    const { data: service } = await supabase.from('services').select('*').eq('slug', service_slug).single()
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })

    const { data: profile } = await supabase.from('profiles').select('full_name, email').eq('id', user.id).single()

    const priceId = getPriceId(service_slug, priority)
    let lineItems
    if (priceId) {
      lineItems = [{ price: priceId, quantity: 1 }]
    } else {
      const priceMap: Record<string, number | undefined> = { standard: service.base_price, rush: service.rush_price, same_day: service.same_day_price }
      const unitAmount = priceMap[priority] || service.base_price
      lineItems = [{ price_data: { currency: 'usd', product_data: { name: `${service.name} — ${priority.replace('_',' ')}`, description: service.short_description }, unit_amount: unitAmount }, quantity: 1 }]
    }

    // Determine base URL: prefer env var, fall back to request origin
    const origin = request.headers.get('origin') || request.headers.get('referer')?.replace(/\/[^/]*$/, '') || ''
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL !== 'http://localhost:3000'
      ? process.env.NEXT_PUBLIC_APP_URL
      : origin || 'https://lrspro.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment', line_items: lineItems,
      customer_email: profile?.email || user.email,
      success_url: `${baseUrl}/portal/new-order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/portal/new-order/review`,
      metadata: { user_id: user.id, service_slug, service_id: service.id, priority, order_data: JSON.stringify(order_data) },
      payment_intent_data: { metadata: { user_id: user.id, service_slug } }
    })

    return NextResponse.json({ url: session.url, session_id: session.id })
  } catch (err: any) {
    console.error('Checkout error:', err?.message || err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}