'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="text-[#0A1628] font-bold text-sm">LRS</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-semibold text-sm leading-tight">Left Right Serve</div>
            <div className="text-[#C9A84C] text-xs">&amp; Sign Pros</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="text-slate-300 hover:text-white text-sm transition-colors">{l.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="flex items-center gap-2 text-[#C9A84C] text-sm hover:text-[#E8C96A] transition-colors">
            <Phone size={14} /><span className="hidden lg:inline">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</span><span className="lg:hidden">Call</span>
          </a>
          <Link href="/login" className="text-slate-300 hover:text-white text-sm">Sign In</Link>
          <Link href="/signup" className="bg-[#C9A84C] text-[#0A1628] px-4 py-2 text-sm font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors">Get Started</Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/signup" className="bg-[#C9A84C] text-[#0A1628] px-3 py-1.5 text-xs font-semibold rounded-sm">Get Started</Link>
          <button onClick={() => setOpen(!open)} className="text-white p-2 -mr-2">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A1628] border-t border-white/10 px-6 py-6 space-y-1 animate-in slide-in-from-top-2">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-slate-200 py-3 text-base border-b border-white/5 hover:text-[#C9A84C] transition-colors">{l.label}</Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="block text-slate-300 py-3 text-base border-b border-white/5">Sign In</Link>
          <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="flex items-center gap-2 text-[#C9A84C] py-3 text-base border-b border-white/5">
            <Phone size={16} /> {process.env.NEXT_PUBLIC_COMPANY_PHONE}
          </a>
          <Link href="/signup" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0A1628] px-4 py-3.5 font-semibold text-center rounded-sm mt-4">
            Create Free Account <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </nav>
  )
}
