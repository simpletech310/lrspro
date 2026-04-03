'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center">
            <span className="text-[#0A1628] font-bold text-sm">LRS</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-semibold text-sm leading-tight">Left Right Serve</div>
            <div className="text-[#C9A84C] text-xs">&amp; Sign Pros, LLC</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="text-slate-300 hover:text-white text-sm transition-colors">{l.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="flex items-center gap-2 text-[#C9A84C] text-sm">
            <Phone size={14} /><span>{process.env.NEXT_PUBLIC_COMPANY_PHONE}</span>
          </a>
          <Link href="/login" className="text-slate-300 hover:text-white text-sm">Sign In</Link>
          <Link href="/portal/new-order" className="bg-[#C9A84C] text-[#0A1628] px-4 py-2 text-sm font-semibold rounded-sm hover:bg-[#E8C96A] transition-colors">Order Now</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A1628] border-t border-white/10 px-6 py-4 space-y-4">
          {NAV_LINKS.map(l => (<Link key={l.href} href={l.href} className="block text-slate-300 py-2">{l.label}</Link>))}
          <Link href="/login" className="block text-slate-300 py-2">Sign In</Link>
          <Link href="/portal/new-order" className="block bg-[#C9A84C] text-[#0A1628] px-4 py-3 font-semibold text-center rounded-sm">Order Now</Link>
        </div>
      )}
    </nav>
  )
}