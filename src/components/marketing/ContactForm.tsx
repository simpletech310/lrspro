'use client'
import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', service_interest:'', message:'' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-8 text-center">
      <div className="text-4xl mb-3">✓</div>
      <h3 className="font-display text-[#0A1628] text-xl font-bold mb-2">Message Received!</h3>
      <p className="text-slate-600">We will respond within 1 business hour.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[['name','Full Name','text',true],['email','Email','email',true],['phone','Phone','tel',false],['company','Company/Firm','text',false]].map(([field,label,type,req])=>(
        <div key={field as string}>
          <label className="block text-sm font-medium text-[#0A1628] mb-1">{label as string}{req && ' *'}</label>
          <input type={type as string} required={!!req} value={form[field as keyof typeof form]}
            onChange={e => setForm(p => ({...p, [field as string]: e.target.value}))}
            className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]" />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-[#0A1628] mb-1">Service Interest</label>
        <select value={form.service_interest} onChange={e => setForm(p => ({...p, service_interest: e.target.value}))}
          className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30">
          <option value="">Select a service...</option>
          {['Process Serving','Notary Services','Skip Trace','Court Courier & Filing','Legal Document Preparation','Multiple / General Inquiry'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#0A1628] mb-1">Message *</label>
        <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
          placeholder="Tell us about your needs..."
          className="w-full border border-slate-200 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 resize-none" />
      </div>
      <button type="submit" disabled={status==='loading'}
        className="w-full bg-[#0A1628] text-[#C9A84C] py-3 font-semibold rounded-sm hover:bg-[#112240] transition-colors disabled:opacity-50">
        {status==='loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status==='error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again or call us directly.</p>}
    </form>
  )
}