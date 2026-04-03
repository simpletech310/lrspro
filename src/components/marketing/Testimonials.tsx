const TESTIMONIALS = [
  {quote:"Left Right Serve has been our go-to process server for over two years. The online portal and real-time tracking make our practice run smoother. The affidavits are always court-ready.",author:"Maria R.",role:"Family Law Attorney"},
  {quote:"I use them for all my unlawful detainer cases. Same-day service when I need it, and the skip trace add-on has saved us on multiple hard-to-locate defendants.",author:"James T.",role:"Real Estate Attorney"},
  {quote:"As a title company, we need reliable mobile notary services on short notice. LRS has never let us down — professional, on-time, and thorough.",author:"Sandra K.",role:"Escrow Officer"},
]

export function Testimonials() {
  return (
    <section className="bg-[#F8F5EE] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Client Reviews</span>
          <h2 className="font-display text-[#0A1628] text-4xl font-bold mt-2">Trusted by Legal Professionals</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(({quote,author,role})=>(
            <div key={author} className="bg-white border border-slate-200 rounded-sm p-8 shadow-card">
              <div className="text-[#C9A84C] text-4xl font-serif mb-4">&ldquo;</div>
              <p className="text-slate-600 leading-relaxed mb-6">{quote}</p>
              <div>
                <div className="font-semibold text-[#0A1628]">{author}</div>
                <div className="text-slate-500 text-sm">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}