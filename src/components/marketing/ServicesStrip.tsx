import Link from 'next/link'
import { FileText, Stamp, Search, Truck, FileEdit, ArrowRight } from 'lucide-react'

const SERVICES = [
  {icon:FileText, name:'Process Serving', slug:'process-serving-riverside-ca', price:'From $89', desc:'Personal, substituted, and posting service across 4 counties'},
  {icon:Stamp, name:'Mobile Notary', slug:'mobile-notary-riverside-ca', price:'From $95', desc:'Certified loan signings, affidavits, and mobile notarization'},
  {icon:Search, name:'Skip Trace', slug:'skip-trace', price:'From $75', desc:'Professional subject location using licensed databases'},
  {icon:Truck, name:'Court Courier', slug:'court-courier-filing', price:'From $75', desc:'Same-day filing, document retrieval, and courthouse runs'},
  {icon:FileEdit, name:'Legal Document Prep', slug:'legal-document-service', price:'From $95', desc:'LDA-licensed document preparation for civil and family matters'},
]

export function ServicesStrip() {
  return (
    <section className="bg-[#F8F5EE] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">What We Do</span>
          <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mt-2 mb-3">Full-Service Legal Support</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">Every engagement is handled by a licensed professional with real-time tracking, documented outcomes, and court-ready deliverables.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {SERVICES.map(({icon:Icon,name,slug,price,desc})=>(
            <Link key={slug} href={`/services/${slug}`} className="group bg-white border border-slate-200 rounded-sm p-4 sm:p-6 hover:border-[#C9A84C] hover:shadow-card transition-all duration-200 flex flex-col">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0A1628]/5 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#0A1628] transition-colors flex-shrink-0">
                <Icon size={20} className="text-[#0A1628] group-hover:text-[#C9A84C] transition-colors" />
              </div>
              <h3 className="font-semibold text-[#0A1628] text-xs sm:text-sm mb-1 text-center">{name}</h3>
              <p className="text-slate-400 text-[11px] sm:text-xs text-center mb-2 flex-1 hidden sm:block">{desc}</p>
              <p className="text-[#C9A84C] text-xs font-semibold text-center">{price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
