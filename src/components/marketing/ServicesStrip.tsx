import Link from 'next/link'
import { FileText, Stamp, Search, Truck, FileEdit } from 'lucide-react'

const SERVICES = [
  {icon:FileText,name:'Process Serving',slug:'process-serving-riverside-ca',price:'From $89'},
  {icon:Stamp,name:'Notary Services',slug:'mobile-notary-riverside-ca',price:'From $95'},
  {icon:Search,name:'Skip Trace',slug:'skip-trace',price:'From $75'},
  {icon:Truck,name:'Court Courier',slug:'court-courier-filing',price:'From $75'},
  {icon:FileEdit,name:'Document Prep',slug:'legal-document-service',price:'From $95'},
]

export function ServicesStrip() {
  return (
    <section className="bg-[#F8F5EE] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-3">Professional Legal Support Services</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Every service handled by licensed professionals with real-time tracking, documented outcomes, and professional affidavits.</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICES.map(({icon:Icon,name,slug,price})=>(
            <Link key={slug} href={`/services/${slug}`} className="group bg-white border border-slate-200 rounded-sm p-6 text-center hover:border-[#C9A84C] hover:shadow-card transition-all duration-200">
              <div className="w-12 h-12 bg-[#0A1628]/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0A1628] transition-colors">
                <Icon size={22} className="text-[#0A1628] group-hover:text-[#C9A84C] transition-colors" />
              </div>
              <h3 className="font-semibold text-[#0A1628] text-sm mb-1">{name}</h3>
              <p className="text-[#C9A84C] text-xs font-medium">{price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}