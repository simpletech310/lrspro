import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { CTABanner } from '@/components/marketing/CTABanner'
import Link from 'next/link'
import { ArrowRight, Shield, Users, Target, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — Licensed Legal Support Professionals | Left Right Serve & Sign Pros',
  description: 'Meet the team behind Left Right Serve & Sign Pros. Licensed process servers, certified notaries, and legal support professionals serving attorneys and firms across Riverside County and Greater SoCal since 2019.',
  openGraph: {
    title: 'About Left Right Serve & Sign Pros',
    description: 'Licensed, bonded, and insured legal support professionals trusted by attorneys across Southern California.',
    images: [{ url: '/og/og-about.png', width: 1792, height: 1024 }],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-[#0A1628] py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Our Story</span>
            </div>
            <h1 className="font-display text-white text-4xl sm:text-5xl font-bold mb-5">We Started Because Attorneys Deserved Better.</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">Too many law firms were stuck chasing process servers for updates, dealing with sloppy paperwork, and missing deadlines they couldn't afford to miss. We built Left Right Serve &amp; Sign Pros to fix that — permanently.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-16 sm:space-y-20">
          <div>
            <h2 className="font-display text-[#0A1628] text-2xl sm:text-3xl font-bold mb-5">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg mb-4">
              We provide attorneys, paralegals, law firms, real estate professionals, title companies, and property managers with process serving and legal support services they can rely on without a second thought.
            </p>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Our technology-forward approach means you always know where your case stands. Log into your portal, check the status, download your affidavit. No phone calls. No guesswork. We believe legal support should operate at the same standard as the attorneys we serve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {icon: Target, title: 'Precision', desc: 'Every service attempt documented with GPS coordinates, timestamps, photos, and detailed notes. Our records are built for judicial scrutiny.'},
              {icon: Shield, title: 'Accountability', desc: 'Licensed, bonded, and insured in California. We carry full E&O insurance because your cases deserve qualified hands — not a hired stranger from an app.'},
              {icon: Users, title: 'Partnership', desc: 'We don\'t just serve papers. We become an extension of your team — understanding your deadlines, your preferences, and your clients\' needs.'},
              {icon: Award, title: 'Excellence', desc: 'A 99% service completion rate across 500+ cases. Court-ready affidavits delivered within 24 hours. Same-day and rush turnaround when the clock is ticking.'},
            ].map(({icon: Icon, title, desc}) => (
              <div key={title} className="border border-slate-200 rounded-sm p-6 sm:p-8">
                <Icon size={24} className="text-[#C9A84C] mb-3" />
                <h3 className="font-display text-[#0A1628] text-lg sm:text-xl font-bold mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-[#0A1628] text-2xl sm:text-3xl font-bold mb-5">What We Do</h2>
            <div className="space-y-4">
              {[
                'Licensed Process Serving — personal, substituted, sub-service, and posting across Riverside, San Bernardino, Orange, and Los Angeles counties',
                'Certified Mobile Notary & Loan Signing Agent — on-site notarizations for closings, affidavits, powers of attorney, and more',
                'Professional Skip Trace & Subject Location — database-powered searches to locate hard-to-find defendants and respondents',
                'Same-Day Court Courier & Filing — document filing, retrieval, and courthouse runs at Riverside Superior Court and beyond',
                'Legal Document Preparation (LDA Licensed) — civil complaints, responses, family law forms, and landlord/tenant filings',
              ].map(s => (
                <div key={s} className="flex items-start gap-3">
                  <span className="text-[#C9A84C] mt-1 flex-shrink-0 font-bold">&#9656;</span>
                  <span className="text-slate-600 text-sm sm:text-base">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A1628] rounded-sm p-6 sm:p-10">
            <h2 className="font-display text-white text-2xl sm:text-3xl font-bold mb-4">Coverage Area</h2>
            <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">We operate across four counties in Southern California, with same-day rush service available throughout our coverage area.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Riverside County','San Bernardino County','Orange County','Los Angeles County'].map(c => (
                <div key={c} className="bg-white/5 border border-white/10 rounded-sm p-4 text-center">
                  <div className="text-white font-semibold text-sm">{c}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center py-6">
            <h2 className="font-display text-[#0A1628] text-2xl sm:text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-slate-500 mb-6 max-w-lg mx-auto">Create your free account and place your first order in under five minutes. No contracts. No minimums.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-8 py-3.5 font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors">
              Create Your Free Account <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <CTABanner />
      <Footer />
    </>
  )
}
