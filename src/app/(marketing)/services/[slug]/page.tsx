import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { FAQ } from '@/components/marketing/FAQ'
import { CTABanner } from '@/components/marketing/CTABanner'
import { getServicePageData, getAllServiceSlugs } from '@/lib/services'
import { formatCurrency } from '@/lib/utils'
import { Check, Clock, Shield, ArrowRight, Phone } from 'lucide-react'

export async function generateStaticParams() {
  return getAllServiceSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = getServicePageData(params.slug)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const page = getServicePageData(params.slug)
  if (!page) notFound()

  const supabase = createClient()
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', page.dbSlug)
    .single()

  if (!service) notFound()

  const checklist = (service.checklist_template as any[] || [])
    .filter((item: any) => item.is_required)
    .sort((a: any, b: any) => a.sort_order - b.sort_order)

  const pricingTiers = [
    { name: 'Standard', price: service.base_price, description: service.estimated_turnaround || 'Standard turnaround', highlight: false },
    ...(service.rush_price ? [{ name: 'Rush', price: service.rush_price, description: '24-hour priority processing', highlight: true }] : []),
    ...(service.same_day_price ? [{ name: 'Same Day', price: service.same_day_price, description: 'Emergency same-day service', highlight: false }] : []),
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#0A1628] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#112240] to-[#0A1628]" />
          <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {service.name}
                </span>
                <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full">
                  From {formatCurrency(service.base_price)}
                </span>
              </div>
              <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {page.headline}
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl">
                {page.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/portal/new-order"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-8 py-4 rounded-sm font-semibold text-lg hover:bg-[#E8C96A] transition-colors"
                >
                  Order Now <ArrowRight size={20} />
                </Link>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                  className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-sm font-semibold text-lg hover:border-white/40 transition-colors"
                >
                  <Phone size={20} /> Call Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#F8F5EE] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Pricing</span>
              <h2 className="font-display text-[#0A1628] text-3xl font-bold mt-2">Transparent, Flat-Rate Pricing</h2>
              <p className="text-slate-500 mt-3 max-w-lg mx-auto">No hidden fees. No hourly billing. You know the exact cost before you order.</p>
            </div>
            <div className={`grid gap-6 max-w-4xl mx-auto ${pricingTiers.length === 3 ? 'md:grid-cols-3' : pricingTiers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-md'}`}>
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-sm p-8 text-center ${
                    tier.highlight
                      ? 'bg-[#0A1628] text-white ring-2 ring-[#C9A84C] shadow-elevated relative'
                      : 'bg-white border border-slate-200 shadow-card'
                  }`}
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#0A1628] text-xs font-bold px-4 py-1 rounded-full uppercase">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`font-semibold text-lg mb-2 ${tier.highlight ? 'text-white' : 'text-[#0A1628]'}`}>
                    {tier.name}
                  </h3>
                  <div className={`font-display text-4xl font-bold mb-3 ${tier.highlight ? 'text-[#C9A84C]' : 'text-[#0A1628]'}`}>
                    {formatCurrency(tier.price)}
                  </div>
                  <p className={`text-sm mb-6 ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tier.description}
                  </p>
                  <Link
                    href="/portal/new-order"
                    className={`inline-block w-full py-3 rounded-sm font-semibold text-sm transition-colors ${
                      tier.highlight
                        ? 'bg-[#C9A84C] text-[#0A1628] hover:bg-[#E8C96A]'
                        : 'bg-[#0A1628] text-white hover:bg-[#112240]'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Why Choose Us</span>
              <h2 className="font-display text-[#0A1628] text-3xl font-bold mt-2">What Sets Us Apart</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {page.features.map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#0A1628] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1628] text-lg mb-2">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included (from checklist) */}
        <section className="bg-[#F8F5EE] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Full Service</span>
                <h2 className="font-display text-[#0A1628] text-3xl font-bold mt-2 mb-4">What&apos;s Included</h2>
                <p className="text-slate-500 leading-relaxed mb-2">
                  {service.long_description}
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-sm shadow-card p-8">
                <ul className="space-y-4">
                  {checklist.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={14} className="text-[#C9A84C]" />
                      </div>
                      <span className="text-slate-700">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trust indicators */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-[#0A1628]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield size={22} className="text-[#0A1628]" />
                </div>
                <div className="font-semibold text-[#0A1628] text-sm">Licensed & Bonded</div>
                <p className="text-slate-500 text-xs mt-1">California registered</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#0A1628]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock size={22} className="text-[#0A1628]" />
                </div>
                <div className="font-semibold text-[#0A1628] text-sm">Rush Available</div>
                <p className="text-slate-500 text-xs mt-1">Same-day options</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#0A1628]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={22} className="text-[#0A1628]" />
                </div>
                <div className="font-semibold text-[#0A1628] text-sm">Documented</div>
                <p className="text-slate-500 text-xs mt-1">Court-ready records</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#F8F5EE] py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">FAQ</span>
              <h2 className="font-display text-[#0A1628] text-3xl font-bold mt-2">Common Questions</h2>
            </div>
            <FAQ items={page.faqs} />
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
