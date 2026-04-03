import { CheckCircle2, Clock, Shield, FileCheck } from 'lucide-react'

const PROPS = [
  {icon:Shield,title:'Licensed & Bonded',desc:'All process servers are licensed, bonded, and insured in California. We carry full E&O insurance for your protection.'},
  {icon:Clock,title:'Real-Time Tracking',desc:'Log into your client portal at any time to see exactly where your case stands. No more calling for updates.'},
  {icon:CheckCircle2,title:'Court-Ready Affidavits',desc:'Our affidavits meet all California court requirements. Delivered digitally within 24 hours of service completion.'},
  {icon:FileCheck,title:'Documented Every Step',desc:'Every attempt is logged with date, time, GPS coordinates, and outcome. Bulletproof documentation for court.'},
]

export function TrustSection() {
  return (
    <section className="bg-[#0A1628] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Why Legal Professionals Choose Us</span>
          <h2 className="font-display text-white text-4xl font-bold mt-2">Reliable. Documented. Professional.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROPS.map(({icon:Icon,title,desc})=>(
            <div key={title} className="border border-white/10 rounded-sm p-6 hover:border-[#C9A84C]/50 transition-colors">
              <Icon size={32} className="text-[#C9A84C] mb-4" />
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}