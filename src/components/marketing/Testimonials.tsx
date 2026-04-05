const TESTIMONIALS = [
  {quote:"We switched to Left Right Serve after years of missed deadlines with another firm. The real-time portal alone saves our paralegals hours each week — and the affidavits are always court-ready without a single revision.", author:"Maria R.", role:"Managing Partner, Family Law", firm:"Riverside, CA"},
  {quote:"I handle unlawful detainer cases on tight timelines. When I need same-day service, LRS delivers. Their skip trace service located a defendant we'd been chasing for three months — in 48 hours.", author:"James T.", role:"Real Estate Litigation Attorney", firm:"Corona, CA"},
  {quote:"As an escrow officer, I need notary signings done correctly and on schedule. Left Right Serve has been our go-to for over a year — professional, thorough, and never once late to a closing.", author:"Sandra K.", role:"Senior Escrow Officer", firm:"Moreno Valley, CA"},
]

export function Testimonials() {
  return (
    <section className="bg-[#F8F5EE] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">From Our Clients</span>
          <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mt-2">Trusted by Legal Professionals Across Southern California</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map(({quote,author,role,firm})=>(
            <div key={author} className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 shadow-card flex flex-col">
              <div className="text-[#C9A84C] text-4xl font-serif mb-3 leading-none">&ldquo;</div>
              <p className="text-slate-600 leading-relaxed mb-6 flex-1 text-sm sm:text-base">{quote}</p>
              <div className="border-t border-slate-100 pt-4">
                <div className="font-semibold text-[#0A1628] text-sm">{author}</div>
                <div className="text-slate-500 text-xs">{role}</div>
                <div className="text-slate-400 text-xs">{firm}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
