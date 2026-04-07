import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getSectionContent } from '@/lib/cms'

export async function HowItWorks() {
  const content = await getSectionContent('how_it_works')
  const tagline = content.tagline || 'From Order to Affidavit'
  const heading = content.heading || 'Three Steps. Total Transparency.'
  const description = content.description || 'No phone tag. No wondering where your case stands. Place your order online, and we handle the rest — with full documentation at every stage.'
  const steps = content.steps || [
    { num: '01', title: 'Create Your Free Account', desc: 'Sign up in seconds with your name and email. Your secure client portal is ready immediately — no setup fees, no commitments.' },
    { num: '02', title: 'Place Your Order & Pay Securely', desc: 'Select a service, fill out the case details, and complete your secure payment. Your order is confirmed instantly and assigned to a licensed professional.' },
    { num: '03', title: 'We Execute. You Track Everything.', desc: 'Follow every step from your portal — real-time status updates, service attempt logs, GPS-verified documentation. Download court-ready affidavits the moment your case closes.' },
  ]

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">{tagline}</span>
          <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mt-2">{heading}</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map(({ num, title, desc }: any) => (
            <div key={num} className="text-center">
              <div className="w-16 h-16 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center font-display text-xl font-bold mx-auto mb-6">{num}</div>
              <h3 className="font-display text-[#0A1628] text-lg sm:text-xl font-bold mb-3">{title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/signup" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-8 py-3.5 font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors text-sm sm:text-base">
            Get Started Free <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
