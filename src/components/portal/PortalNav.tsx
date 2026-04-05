'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '@/components/LogoutButton'
import { LayoutDashboard, Briefcase, FileText, PlusCircle, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/cases', label: 'Cases', icon: Briefcase },
  { href: '/portal/documents', label: 'Documents', icon: FileText },
  { href: '/portal/account', label: 'Account', icon: User },
]

export function PortalNav({ fullName }: { fullName: string }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => pathname === href || (href !== '/portal/dashboard' && pathname.startsWith(href))

  return (
    <>
      <header className="bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/portal/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center">
              <span className="text-[#0A1628] font-bold text-sm">LRS</span>
            </div>
            <span className="text-sm font-medium hidden sm:block">Client Portal</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href}
                className={`transition-colors ${isActive(item.href) ? 'text-[#C9A84C] font-semibold' : 'text-slate-300 hover:text-white'}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/portal/new-order" className="bg-[#C9A84C] text-[#0A1628] px-4 py-1.5 rounded-sm font-semibold text-sm hover:bg-[#E8C96A]">
              New Order
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm hidden sm:block">{fullName}</span>
            <Link href="/portal/account" className="w-8 h-8 bg-[#112240] rounded-full flex items-center justify-center text-[#C9A84C] font-semibold text-sm">
              {fullName?.charAt(0) || 'U'}
            </Link>
            <LogoutButton className="text-slate-400 hover:text-white text-xs hidden sm:flex items-center gap-1" />
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="sm:hidden p-1 text-slate-300 hover:text-white">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <nav className="sm:hidden border-t border-white/10 px-6 py-3 space-y-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${isActive(item.href) ? 'text-[#C9A84C] bg-white/5 font-semibold' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                  <Icon size={16} /> {item.label}
                </Link>
              )
            })}
            <Link href="/portal/new-order" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm bg-[#C9A84C] text-[#0A1628] font-semibold mt-2">
              <PlusCircle size={16} /> New Order
            </Link>
            <div className="pt-2 border-t border-white/10 mt-2">
              <LogoutButton className="text-slate-400 hover:text-white text-sm px-3 py-2" />
            </div>
          </nav>
        )}
      </header>

      {/* Mobile bottom nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1628] border-t border-white/10 flex items-center justify-around h-16 safe-bottom">
        {NAV_ITEMS.slice(0, 3).map(item => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 ${active ? 'text-[#C9A84C]' : 'text-slate-400'}`}>
              <Icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
        <Link href="/portal/new-order"
          className="flex flex-col items-center gap-1 py-2 px-3 text-[#C9A84C]">
          <PlusCircle size={20} />
          <span className="text-[10px]">Order</span>
        </Link>
      </div>
    </>
  )
}
