'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BadgeCounts {
  unreadInbox: number
  unassignedCases: number
}

const BADGE_KEYS: Record<string, keyof BadgeCounts> = {
  '/dashboard/admin/inbox': 'unreadInbox',
  '/dashboard/cases': 'unassignedCases',
}

export function DashboardSidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname()
  const [badges, setBadges] = useState<BadgeCounts>({ unreadInbox: 0, unassignedCases: 0 })

  useEffect(() => {
    if (!isAdmin) return
    const fetchBadges = async () => {
      try {
        const res = await fetch('/api/dashboard/badges')
        if (res.ok) setBadges(await res.json())
      } catch {}
    }
    fetchBadges()
    const interval = setInterval(fetchBadges, 30000)
    return () => clearInterval(interval)
  }, [isAdmin])

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/cases', label: 'All Cases' },
  ]

  const adminItems = [
    { href: '/dashboard/admin', label: 'Overview' },
    { href: '/dashboard/admin/inbox', label: 'Inbox' },
    { href: '/dashboard/admin/staff', label: 'Staff' },
    { href: '/dashboard/admin/clients', label: 'Clients' },
  ]

  const renderLink = (l: { href: string; label: string }) => {
    const isActive = pathname === l.href || (l.href !== '/dashboard' && pathname.startsWith(l.href + '/'))
    const badgeKey = BADGE_KEYS[l.href]
    const badgeCount = badgeKey ? badges[badgeKey] : 0

    return (
      <Link key={l.href} href={l.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${isActive ? 'text-[#C9A84C] bg-white/10 font-semibold' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}>
        {l.label}
        {badgeCount > 0 && (
          <span className="ml-auto bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </Link>
    )
  }

  return (
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map(renderLink)}
      {isAdmin && (
        <>
          <div className="pt-4 pb-1 px-3 text-xs text-slate-500 uppercase tracking-wider">Admin</div>
          {adminItems.map(renderLink)}
        </>
      )}
    </nav>
  )
}
