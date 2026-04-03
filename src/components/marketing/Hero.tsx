'use client'
import Link from 'next/link'
import { ArrowRight, Shield, Clock, MapPin } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-[#0A1628] flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#112240] to-[#0A1628]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1B3A6B 0%, transparent 60%), radial-gradient(circle at 80% 20%, #C9A84C15 0%, transparent 50%)' }} />
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Riverside County &amp; Greater SoCal</span>
          </div>
          <h1 className="font-display text-white text-5xl lg:text-6xl leading-tight mb-6">
            Process Serving &amp;<br /><span className="text-[#C9A84C]">Legal Support</span><br />Built for Professionals.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-lg">Trusted by attorneys, real estate professionals, and legal teams across Southern California. Real-time case tracking. Documented. Reliable. Done right.</p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/portal/new-order" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-8 py-4 font-semibold rounded-sm hover:bg-[#E8C96A] transition-all duration-200 shadow-elevated">
              Order a Service <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 font-medium rounded-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
              Track My Case
            </Link>
          </div>
          <div className="flex flex-wrap gap-6">
            {[{icon:Shield,label:'Licensed & Bonded'},{icon:Clock,label:'Same-Day Available'},{icon:MapPin,label:'Riverside County'}].map(({icon:Icon,label})=>(
              <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon size={16} className="text-[#C9A84C]" /><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {[{number:'500+',label:'Cases Completed'},{number:'24hr',label:'Rush Turnaround'},{number:'5',label:'Services Offered'},{number:'99%',label:'Delivery Rate'}].map(({number,label})=>(
            <div key={label} className="bg-white/5 border border-white/10 rounded-sm p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="font-display text-[#C9A84C] text-4xl font-bold mb-1">{number}</div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}