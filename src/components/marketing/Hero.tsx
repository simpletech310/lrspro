'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroProps {
  tagline?: string
  headline?: string
  description?: string
  stats?: { number: string; label: string }[]
  badges?: { label: string }[]
}

export function Hero({
  tagline = 'San Bernardino & Riverside Counties',
  headline = 'Your Cases Move.\nYour Deadlines Don\'t.',
  description = 'Attorneys, paralegals, and real estate professionals across Southern California trust us to serve papers, notarize documents, and locate subjects — on time, every time. Create your account and place your first order in under five minutes.',
  stats = [{ number: '500+', label: 'Cases' }, { number: '< 24hr', label: 'Rush' }, { number: '99%', label: 'Service Rate' }, { number: '4', label: 'Counties' }],
  badges = [{ label: 'Licensed & Bonded' }, { label: 'Same-Day Rush Available' }, { label: '4-County Coverage' }],
}: HeroProps) {
  const headlineParts = headline.split('\n')
  const badgeIcons = [Shield, Clock, MapPin]

  return (
    <section className="relative min-h-[92vh] bg-[#0A1628] flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#112240] to-[#0A1628]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1B3A6B 0%, transparent 60%), radial-gradient(circle at 80% 20%, #C9A84C15 0%, transparent 50%)' }} />
      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase">{tagline}</span>
          </div>
          <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
            {headlineParts[0]}<br /><span className="text-[#C9A84C]">{headlineParts[1] || ''}</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0A1628] px-8 py-4 font-semibold rounded-sm hover:bg-[#E8C96A] transition-all duration-200 shadow-elevated text-base">
              Create Your Free Account <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 font-medium rounded-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors text-base">
              Sign In &amp; Track a Case
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {badges.map(({ label }, idx) => {
              const Icon = badgeIcons[idx % badgeIcons.length]
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                  className="flex items-center gap-2 text-slate-400 text-sm"
                >
                  <Icon size={16} className="text-[#C9A84C]" /><span>{label}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <div className="hidden lg:flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-sm overflow-hidden border border-white/10"
          >
            <Image src="/images/process-serving.png" alt="Process Serving & Eviction Notice Delivery" width={600} height={400} className="w-full h-auto object-cover" priority />
          </motion.div>
          <div className="grid grid-cols-4 gap-3">
            {stats.map(({ number, label }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + (idx * 0.08) }}
                className="bg-white/5 border border-white/10 rounded-sm p-3 text-center backdrop-blur-sm"
              >
                <div className="font-display text-[#C9A84C] text-xl font-bold">{number}</div>
                <div className="text-slate-400 text-xs">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile stats row */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {stats.map(({ number, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-sm p-4 text-center">
              <div className="font-display text-[#C9A84C] text-2xl font-bold">{number}</div>
              <div className="text-slate-400 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
