'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import { AVAILABLE_ICONS } from '@/lib/icons'

interface ServiceForm {
  name: string
  slug: string
  short_description: string
  long_description: string
  icon_name: string
  base_price: string
  rush_price: string
  same_day_price: string
  estimated_turnaround: string
  is_active: boolean
  sort_order: number
}

interface ServicePage {
  seo_slug: string
  headline: string
  tagline: string
  meta_title: string
  meta_description: string
  features: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export default function ServiceEditorPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'seo' | 'features' | 'faqs'>('basic')

  const [form, setForm] = useState<ServiceForm>({
    name: '', slug: '', short_description: '', long_description: '',
    icon_name: 'FileText', base_price: '', rush_price: '', same_day_price: '',
    estimated_turnaround: '', is_active: true, sort_order: 0,
  })

  const [page, setPage] = useState<ServicePage>({
    seo_slug: '', headline: '', tagline: '', meta_title: '', meta_description: '',
    features: [], faqs: [],
  })

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/services/${params.id}`).then(r => r.json()).then(data => {
        setForm({
          name: data.name || '',
          slug: data.slug || '',
          short_description: data.short_description || '',
          long_description: data.long_description || '',
          icon_name: data.icon_name || 'FileText',
          base_price: data.base_price ? String(data.base_price / 100) : '',
          rush_price: data.rush_price ? String(data.rush_price / 100) : '',
          same_day_price: data.same_day_price ? String(data.same_day_price / 100) : '',
          estimated_turnaround: data.estimated_turnaround || '',
          is_active: data.is_active ?? true,
          sort_order: data.sort_order ?? 0,
        })
      })

      fetch(`/api/admin/services/${params.id}/page`).then(r => {
        if (r.ok) return r.json()
        return null
      }).then(data => {
        if (data) {
          setPage({
            seo_slug: data.seo_slug || '',
            headline: data.headline || '',
            tagline: data.tagline || '',
            meta_title: data.meta_title || '',
            meta_description: data.meta_description || '',
            features: data.features || [],
            faqs: data.faqs || [],
          })
        }
      })
    }
  }, [isNew, params.id])

  function updateForm(key: keyof ServiceForm, value: any) {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function updatePage(key: keyof ServicePage, value: any) {
    setPage(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSaved(false)

    const servicePayload = {
      name: form.name,
      slug: form.slug,
      short_description: form.short_description,
      long_description: form.long_description,
      icon_name: form.icon_name,
      base_price: Math.round(parseFloat(form.base_price || '0') * 100),
      rush_price: form.rush_price ? Math.round(parseFloat(form.rush_price) * 100) : null,
      same_day_price: form.same_day_price ? Math.round(parseFloat(form.same_day_price) * 100) : null,
      estimated_turnaround: form.estimated_turnaround,
      is_active: form.is_active,
      sort_order: form.sort_order,
    }

    let serviceId = params.id as string

    if (isNew) {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicePayload),
      })
      if (!res.ok) { setError('Failed to create service'); setSaving(false); return }
      const data = await res.json()
      serviceId = data.id
    } else {
      const res = await fetch(`/api/admin/services/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicePayload),
      })
      if (!res.ok) { setError('Failed to update service'); setSaving(false); return }
    }

    // Save SEO page if slug is set
    if (page.seo_slug) {
      const res = await fetch(`/api/admin/services/${serviceId}/page`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page),
      })
      if (!res.ok) { setError('Service saved but SEO page failed'); setSaving(false); return }
    }

    // Revalidate
    await fetch('/api/admin/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths: ['/', '/services', `/services/${page.seo_slug}`] }),
    })

    setSaving(false)
    setSaved(true)
    if (isNew) router.push(`/dashboard/admin/services/${serviceId}`)
  }

  const tabs = [
    { key: 'basic' as const, label: 'Basic Info' },
    { key: 'pricing' as const, label: 'Pricing' },
    { key: 'seo' as const, label: 'SEO Page' },
    { key: 'features' as const, label: 'Features' },
    { key: 'faqs' as const, label: 'FAQs' },
  ]

  const inputClass = 'w-full border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]'
  const labelClass = 'block text-sm font-medium text-[#0A1628] mb-1'

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/admin/services" className="text-slate-400 hover:text-[#0A1628]"><ArrowLeft size={20} /></Link>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0A1628]">{isNew ? 'Add New Service' : `Edit: ${form.name}`}</h1>
      </div>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-sm mb-4 text-sm">{error}</div>}
      {saved && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-sm mb-4 text-sm">Changes saved successfully.</div>}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === t.key ? 'border-[#C9A84C] text-[#0A1628]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelClass}>Service Name</label><input className={inputClass} value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="Process Serving" /></div>
            <div><label className={labelClass}>Database Slug</label><input className={inputClass} value={form.slug} onChange={e => updateForm('slug', e.target.value)} placeholder="process-serving" /></div>
          </div>
          <div><label className={labelClass}>Short Description</label><input className={inputClass} value={form.short_description} onChange={e => updateForm('short_description', e.target.value)} placeholder="Brief description for service cards" /></div>
          <div><label className={labelClass}>Long Description</label><textarea className={inputClass + ' h-24'} value={form.long_description} onChange={e => updateForm('long_description', e.target.value)} placeholder="Detailed service description" /></div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Icon</label>
              <select className={inputClass} value={form.icon_name} onChange={e => updateForm('icon_name', e.target.value)}>
                {AVAILABLE_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Estimated Turnaround</label><input className={inputClass} value={form.estimated_turnaround} onChange={e => updateForm('estimated_turnaround', e.target.value)} placeholder="1-5 business days" /></div>
            <div><label className={labelClass}>Sort Order</label><input type="number" className={inputClass} value={form.sort_order} onChange={e => updateForm('sort_order', parseInt(e.target.value) || 0)} /></div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => updateForm('is_active', e.target.checked)} className="rounded border-slate-300" />
              <span className="text-sm text-[#0A1628] font-medium">Active (visible on site)</span>
            </label>
          </div>
        </div>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-2">Enter prices in dollars (e.g., 89.00). They are stored in cents internally.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className={labelClass}>Base Price ($)</label><input type="number" step="0.01" className={inputClass} value={form.base_price} onChange={e => updateForm('base_price', e.target.value)} placeholder="89.00" /></div>
            <div><label className={labelClass}>Rush Price ($)</label><input type="number" step="0.01" className={inputClass} value={form.rush_price} onChange={e => updateForm('rush_price', e.target.value)} placeholder="149.00 (optional)" /></div>
            <div><label className={labelClass}>Same-Day Price ($)</label><input type="number" step="0.01" className={inputClass} value={form.same_day_price} onChange={e => updateForm('same_day_price', e.target.value)} placeholder="225.00 (optional)" /></div>
          </div>
        </div>
      )}

      {/* SEO Page Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-4">
          <div><label className={labelClass}>SEO Slug (URL path)</label><input className={inputClass} value={page.seo_slug} onChange={e => updatePage('seo_slug', e.target.value)} placeholder="process-serving-riverside-ca" /></div>
          <div><label className={labelClass}>Page Headline</label><input className={inputClass} value={page.headline} onChange={e => updatePage('headline', e.target.value)} placeholder="Process Serving That Holds Up in Court." /></div>
          <div><label className={labelClass}>Page Tagline</label><textarea className={inputClass + ' h-20'} value={page.tagline} onChange={e => updatePage('tagline', e.target.value)} placeholder="Marketing tagline for service page" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelClass}>Meta Title</label><input className={inputClass} value={page.meta_title} onChange={e => updatePage('meta_title', e.target.value)} /></div>
            <div><label className={labelClass}>Meta Description</label><input className={inputClass} value={page.meta_description} onChange={e => updatePage('meta_description', e.target.value)} /></div>
          </div>
        </div>
      )}

      {/* Features Tab */}
      {activeTab === 'features' && (
        <div className="space-y-4">
          {page.features.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-sm p-4 relative">
              <button onClick={() => updatePage('features', page.features.filter((_, j) => j !== i))} className="absolute top-3 right-3 text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
              <div className="space-y-3">
                <div><label className={labelClass}>Title</label><input className={inputClass} value={f.title} onChange={e => { const updated = [...page.features]; updated[i] = { ...f, title: e.target.value }; updatePage('features', updated) }} /></div>
                <div><label className={labelClass}>Description</label><textarea className={inputClass + ' h-16'} value={f.description} onChange={e => { const updated = [...page.features]; updated[i] = { ...f, description: e.target.value }; updatePage('features', updated) }} /></div>
              </div>
            </div>
          ))}
          <button onClick={() => updatePage('features', [...page.features, { title: '', description: '' }])} className="flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:text-[#0A1628]">
            <Plus size={16} /> Add Feature
          </button>
        </div>
      )}

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          {page.faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-sm p-4 relative">
              <button onClick={() => updatePage('faqs', page.faqs.filter((_, j) => j !== i))} className="absolute top-3 right-3 text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
              <div className="space-y-3">
                <div><label className={labelClass}>Question</label><input className={inputClass} value={f.question} onChange={e => { const updated = [...page.faqs]; updated[i] = { ...f, question: e.target.value }; updatePage('faqs', updated) }} /></div>
                <div><label className={labelClass}>Answer</label><textarea className={inputClass + ' h-20'} value={f.answer} onChange={e => { const updated = [...page.faqs]; updated[i] = { ...f, answer: e.target.value }; updatePage('faqs', updated) }} /></div>
              </div>
            </div>
          ))}
          <button onClick={() => updatePage('faqs', [...page.faqs, { question: '', answer: '' }])} className="flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:text-[#0A1628]">
            <Plus size={16} /> Add FAQ
          </button>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 flex items-center gap-4">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-6 py-2.5 rounded-sm font-semibold text-sm hover:bg-[#E8C96A] transition-colors disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save All Changes'}
        </button>
        <Link href="/dashboard/admin/services" className="text-slate-400 hover:text-slate-600 text-sm">Cancel</Link>
      </div>
    </div>
  )
}
