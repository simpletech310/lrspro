import Image from 'next/image'
import { getSectionContent } from '@/lib/cms'
import { getIcon } from '@/lib/icons'

export async function TrustSection() {
  const content = await getSectionContent('trust_section')
  const tagline = content.tagline || 'Built for the Standard You Practice'
  const heading = content.heading || 'Why Firms Choose Left Right Serve'
  const description = content.description || 'When your client\'s case depends on proper service, you need a team that treats every filing deadline like their own.'
  const items = content.items || [
    { icon: 'Shield', title: 'Licensed, Bonded & Insured', desc: 'Every process server on our team is registered with the State of California, bonded, and carries full E&O coverage. Your cases are in qualified hands.' },
    { icon: 'Eye', title: 'Real-Time Case Tracking', desc: 'Log into your portal day or night to check the status of every case. No more calling the office. No more waiting for callbacks.' },
    { icon: 'FileCheck', title: 'Court-Ready Documentation', desc: 'Affidavits of service, proof of diligent search, and all supporting documents are prepared to meet California court standards — delivered digitally within hours of completion.' },
    { icon: 'Clock', title: 'GPS-Verified Attempts', desc: 'Every service attempt is logged with date, time, GPS coordinates, photos, and outcome. Bulletproof records that hold up under judicial scrutiny.' },
  ]

  return (
    <section className="bg-[#0A1628] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <Image src="/images/badge.png" alt="Authorized Process Server" width={64} height={80} className="mx-auto mb-4 drop-shadow-lg" />
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">{tagline}</span>
          <h2 className="font-display text-white text-3xl sm:text-4xl font-bold mt-2">{heading}</h2>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map(({ icon, title, desc }: any) => {
            const Icon = getIcon(icon)
            return (
              <div key={title} className="border border-white/10 rounded-sm p-6 hover:border-[#C9A84C]/50 transition-colors group">
                <Icon size={28} className="text-[#C9A84C] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
