import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0A1628] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center">
              <span className="text-[#0A1628] font-bold text-sm">LRS</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Left Right Serve &amp; Sign Pros, LLC</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">Licensed process servers, certified mobile notaries, and legal support professionals serving Riverside County and Greater SoCal.</p>
          <div className="mt-4 space-y-1 text-sm">
            <div><a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="hover:text-[#C9A84C]">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a></div>
            <div><a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="hover:text-[#C9A84C]">{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a></div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm">
            {[['Process Serving','/services/process-serving-riverside-ca'],['Notary Services','/services/mobile-notary-riverside-ca'],['Skip Trace','/services/skip-trace'],['Court Courier','/services/court-courier-filing'],['Document Prep','/services/legal-document-service']].map(([name,href])=>(
              <li key={href}><Link href={href} className="hover:text-white transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Portal</h4>
          <ul className="space-y-2 text-sm">
            {[['Client Portal','/portal/dashboard'],['Order a Service','/portal/new-order'],['Track My Case','/portal/cases'],['Staff Login','/login'],['Contact Us','/contact']].map(([name,href])=>(
              <li key={href}><Link href={href} className="hover:text-white transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
        <p>&copy; {year} Left Right Serve &amp; Sign Pros, LLC. All rights reserved.</p>
        <p>Serving Riverside County · San Bernardino · Orange County · Greater SoCal</p>
      </div>
    </footer>
  )
}