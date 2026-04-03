export function HowItWorks() {
  const steps = [
    {num:'01',title:'Submit Your Order Online',desc:'Fill out our simple order form in under 2 minutes. Upload documents securely. Pay via Stripe — your case is instantly created in our system.'},
    {num:'02',title:'We Assign & Execute',desc:'Your case is immediately reviewed and assigned to a licensed professional. We work within your deadline — standard, rush, or same-day.'},
    {num:'03',title:'Real-Time Updates & Delivery',desc:'Track every step in your client portal. Receive email notifications on each status change. Download completed affidavits and documents instantly.'},
  ]
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">Simple Process</span>
          <h2 className="font-display text-[#0A1628] text-4xl font-bold mt-2">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map(({num,title,desc})=>(
            <div key={num} className="text-center">
              <div className="w-16 h-16 bg-[#0A1628] text-[#C9A84C] rounded-full flex items-center justify-center font-display text-xl font-bold mx-auto mb-6">{num}</div>
              <h3 className="font-display text-[#0A1628] text-xl font-bold mb-3">{title}</h3>
              <p className="text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}