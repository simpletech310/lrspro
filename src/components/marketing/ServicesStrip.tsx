import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getActiveServices } from '@/lib/cms'
import { getIcon } from '@/lib/icons'
import { formatCurrency } from '@/lib/utils'

export async function ServicesStrip() {
  const services = await getActiveServices()

  // Map db slugs to SEO slugs for service page links
  const seoSlugMap: Record<string, string> = {
    'process-serving': 'process-serving-riverside-ca',
    'notary': 'mobile-notary-riverside-ca',
    'skip-trace': 'skip-trace',
    'court-courier': 'court-courier-filing',
    'legal-document-service': 'legal-document-service',
  }

  return (
    <section className="bg-[#F8F5EE] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">What We Do</span>
          <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mt-2 mb-3">Full-Service Legal Support</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">Every engagement is handled by a licensed professional with real-time tracking, documented outcomes, and court-ready deliverables.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((service) => {
            const Icon = getIcon(service.icon_name)
            const slug = seoSlugMap[service.slug] || service.slug
            return (
              <Link key={service.id} href={`/services/${slug}`} className="group bg-white border border-slate-200 rounded-sm p-4 sm:p-6 hover:border-[#C9A84C] hover:shadow-card transition-all duration-200 flex flex-col">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0A1628]/5 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#0A1628] transition-colors flex-shrink-0">
                  <Icon size={20} className="text-[#0A1628] group-hover:text-[#C9A84C] transition-colors" />
                </div>
                <h3 className="font-semibold text-[#0A1628] text-xs sm:text-sm mb-1 text-center">{service.name}</h3>
                <p className="text-slate-400 text-[11px] sm:text-xs text-center mb-2 flex-1 hidden sm:block">{service.short_description}</p>
                <p className="text-[#C9A84C] text-xs font-semibold text-center">From {formatCurrency(service.base_price)}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
