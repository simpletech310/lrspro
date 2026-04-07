import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0A1628] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/images/logo.png" alt="Left Right Serve & Sign Pros" width={48} height={48} className="flex-shrink-0" />
            <div>
              <div className="text-white font-semibold text-sm">Left Right Serve</div>
              <div className="text-slate-500 text-xs">&amp; Sign Pros, LLC</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs mb-4">Licensed process servers, certified notaries, and legal support professionals proudly serving the Inland Empire and Greater Southern California.</p>
          <div className="space-y-1 text-sm">
            <div><a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="hover:text-[#C9A84C] transition-colors">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a></div>
            <div><a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="hover:text-[#C9A84C] transition-colors">{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a></div>
            <div className="pt-1 text-slate-500 leading-relaxed">2999 Kendall Dr. Suite #204<br />PMB-1004<br />San Bernardino, CA 92407</div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {[['Process Serving','/services/process-serving-riverside-ca'],['Mobile Notary','/services/mobile-notary-riverside-ca'],['Skip Trace','/services/skip-trace'],['Court Courier & Filing','/services/court-courier-filing'],['Legal Document Prep','/services/legal-document-service']].map(([name,href])=>(
              <li key={href as string}><Link href={href as string} className="hover:text-white transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Client Portal</h4>
          <ul className="space-y-2.5 text-sm">
            {[['Create Account','/signup'],['Sign In','/login'],['Place an Order','/portal/new-order'],['Track My Cases','/portal/cases'],['Contact Us','/contact']].map(([name,href])=>(
              <li key={href as string}><Link href={href as string} className="hover:text-white transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {[['About Us','/about'],['Our Services','/services'],['Privacy Policy','/privacy'],['Terms of Service','/terms'],['Contact','/contact']].map(([name,href])=>(
              <li key={href as string}><Link href={href as string} className="hover:text-white transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 sm:px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
        <p>&copy; {year} Left Right Serve &amp; Sign Pros, LLC. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
        <p className="hidden sm:block">Riverside &middot; San Bernardino &middot; Orange &middot; Los Angeles</p>
      </div>
    </footer>
  )
}
