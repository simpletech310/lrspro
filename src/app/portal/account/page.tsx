'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { User, Save, CheckCircle2 } from 'lucide-react'

export default function AccountPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profile) {
        setForm({
          full_name: profile.full_name || '',
          email: profile.email || user.email || '',
          phone: profile.phone || '',
          company: profile.company || '',
        })
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      const { error: err } = await supabase.from('profiles')
        .update({ full_name: form.full_name, phone: form.phone, company: form.company })
        .eq('id', user.id)
      if (err) throw err
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="py-20 text-center text-slate-500">Loading...</div>

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#0A1628]">My Account</h1>
        <p className="text-slate-500 mt-1">Manage your profile information</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-sm shadow-card p-6 space-y-5">
        <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
          <div className="w-14 h-14 bg-[#0A1628] rounded-full flex items-center justify-center text-[#C9A84C] font-bold text-xl">
            {form.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="font-semibold text-[#0A1628]">{form.full_name}</div>
            <div className="text-sm text-slate-500">{form.email}</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
            className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" value={form.email} disabled
            className="w-full border border-slate-200 rounded-sm px-3 py-2 text-sm bg-slate-50 text-slate-500" />
          <p className="text-xs text-slate-400 mt-1">Contact support to change your email address</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company / Firm</label>
          <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={saving}
            className="bg-[#C9A84C] text-[#0A1628] px-6 py-2 text-sm font-semibold rounded-sm hover:bg-[#E8C96A] disabled:opacity-50 flex items-center gap-2">
            <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && <span className="text-emerald-600 text-sm flex items-center gap-1"><CheckCircle2 size={14} /> Saved</span>}
        </div>
      </form>
    </div>
  )
}
