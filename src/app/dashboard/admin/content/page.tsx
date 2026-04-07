'use client'
import { useState, useEffect } from 'react'
import { Save, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react'

interface ContentRow {
  id: string
  section: string
  key: string
  value: any
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero Section',
  how_it_works: 'How It Works',
  testimonials: 'Testimonials',
  trust_section: 'Trust Section',
  cta_banner: 'CTA Banner',
  about: 'About Page',
  contact: 'Contact Page',
  footer: 'Footer',
}

const SECTION_ORDER = ['hero', 'how_it_works', 'testimonials', 'trust_section', 'cta_banner', 'about', 'contact', 'footer']

export default function ContentEditorPage() {
  const [content, setContent] = useState<ContentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['hero']))
  const [saving, setSaving] = useState<string | null>(null)
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetch('/api/admin/content').then(r => r.json()).then(data => {
      setContent(data)
      setLoading(false)
    })
  }, [])

  function toggleSection(section: string) {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(section) ? next.delete(section) : next.add(section)
      return next
    })
  }

  function updateValue(section: string, key: string, value: any) {
    setContent(prev => prev.map(row => row.section === section && row.key === key ? { ...row, value } : row))
    setSavedKeys(prev => { const next = new Set(prev); next.delete(`${section}.${key}`); return next })
  }

  async function saveField(section: string, key: string) {
    const row = content.find(r => r.section === section && r.key === key)
    if (!row) return
    setSaving(`${section}.${key}`)
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, key, value: row.value }),
    })
    setSaving(null)
    if (res.ok) setSavedKeys(prev => new Set(prev).add(`${section}.${key}`))
  }

  async function saveSection(section: string) {
    const rows = content.filter(r => r.section === section)
    setSaving(section)
    for (const row of rows) {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: row.section, key: row.key, value: row.value }),
      })
    }
    // Revalidate
    await fetch('/api/admin/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
    setSaving(null)
    rows.forEach(r => setSavedKeys(prev => new Set(prev).add(`${r.section}.${r.key}`)))
  }

  const groupedContent = SECTION_ORDER.reduce((acc, section) => {
    acc[section] = content.filter(r => r.section === section)
    return acc
  }, {} as Record<string, ContentRow[]>)

  const inputClass = 'w-full border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]'
  const labelClass = 'block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'

  function renderField(row: ContentRow) {
    const val = row.value
    const isSaved = savedKeys.has(`${row.section}.${row.key}`)

    // String fields
    if (typeof val === 'string') {
      return (
        <div key={row.key} className="space-y-1">
          <label className={labelClass}>{row.key.replace(/_/g, ' ')}</label>
          {val.length > 80 ? (
            <textarea className={inputClass + ' h-20'} value={val} onChange={e => updateValue(row.section, row.key, e.target.value)} />
          ) : (
            <input className={inputClass} value={val} onChange={e => updateValue(row.section, row.key, e.target.value)} />
          )}
          {isSaved && <span className="text-green-600 text-xs">Saved</span>}
        </div>
      )
    }

    // Array of strings
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'string') {
      return (
        <div key={row.key} className="space-y-2">
          <label className={labelClass}>{row.key.replace(/_/g, ' ')}</label>
          {val.map((item: string, i: number) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={item} onChange={e => {
                const updated = [...val]; updated[i] = e.target.value; updateValue(row.section, row.key, updated)
              }} />
              <button onClick={() => updateValue(row.section, row.key, val.filter((_: any, j: number) => j !== i))} className="text-red-400 hover:text-red-600 flex-shrink-0"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={() => updateValue(row.section, row.key, [...val, ''])} className="text-[#C9A84C] text-xs font-medium flex items-center gap-1"><Plus size={12} /> Add Item</button>
          {isSaved && <span className="text-green-600 text-xs">Saved</span>}
        </div>
      )
    }

    // Array of objects
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
      const keys = Object.keys(val[0])
      return (
        <div key={row.key} className="space-y-3">
          <label className={labelClass}>{row.key.replace(/_/g, ' ')} ({val.length} items)</label>
          {val.map((item: any, i: number) => (
            <div key={i} className="border border-slate-100 rounded-sm p-3 relative bg-slate-50">
              <button onClick={() => updateValue(row.section, row.key, val.filter((_: any, j: number) => j !== i))} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              <div className="space-y-2 pr-6">
                {keys.map(k => (
                  <div key={k}>
                    <label className="text-[10px] text-slate-400 uppercase">{k}</label>
                    {(item[k] || '').length > 60 ? (
                      <textarea className={inputClass + ' h-16 text-xs'} value={item[k] || ''} onChange={e => {
                        const updated = [...val]; updated[i] = { ...item, [k]: e.target.value }; updateValue(row.section, row.key, updated)
                      }} />
                    ) : (
                      <input className={inputClass + ' text-xs'} value={item[k] || ''} onChange={e => {
                        const updated = [...val]; updated[i] = { ...item, [k]: e.target.value }; updateValue(row.section, row.key, updated)
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => {
            const template: Record<string, string> = {}; keys.forEach(k => template[k] = ''); updateValue(row.section, row.key, [...val, template])
          }} className="text-[#C9A84C] text-xs font-medium flex items-center gap-1"><Plus size={12} /> Add Item</button>
          {isSaved && <span className="text-green-600 text-xs">Saved</span>}
        </div>
      )
    }

    // Fallback: raw JSON editor
    return (
      <div key={row.key} className="space-y-1">
        <label className={labelClass}>{row.key.replace(/_/g, ' ')} (JSON)</label>
        <textarea className={inputClass + ' h-24 font-mono text-xs'} value={JSON.stringify(val, null, 2)} onChange={e => {
          try { updateValue(row.section, row.key, JSON.parse(e.target.value)) } catch {}
        }} />
        {isSaved && <span className="text-green-600 text-xs">Saved</span>}
      </div>
    )
  }

  if (loading) return <div className="p-8 text-slate-400">Loading content...</div>

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0A1628] mb-6">Site Content Editor</h1>
      <p className="text-sm text-slate-500 mb-6">Edit the text, headings, and content displayed on your marketing pages. Changes are saved per-section and reflected on the live site.</p>

      <div className="space-y-3">
        {SECTION_ORDER.map(section => {
          const rows = groupedContent[section] || []
          if (rows.length === 0) return null
          const isOpen = openSections.has(section)

          return (
            <div key={section} className="border border-slate-200 rounded-sm bg-white">
              <button onClick={() => toggleSection(section)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2">
                  {isOpen ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                  <span className="font-semibold text-[#0A1628] text-sm">{SECTION_LABELS[section] || section}</span>
                  <span className="text-xs text-slate-400">{rows.length} fields</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
                  {rows.map(renderField)}
                  <button onClick={() => saveSection(section)} disabled={saving === section}
                    className="flex items-center gap-2 bg-[#C9A84C] text-[#0A1628] px-4 py-2 rounded-sm text-sm font-semibold hover:bg-[#E8C96A] transition-colors disabled:opacity-50">
                    <Save size={14} /> {saving === section ? 'Saving...' : `Save ${SECTION_LABELS[section] || section}`}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
