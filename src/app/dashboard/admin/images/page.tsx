'use client'
import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react'

interface SiteImage {
  id: string
  slot: string
  storage_path: string
  alt_text: string
  uploaded_at: string
}

const IMAGE_SLOTS = [
  { slot: 'logo', label: 'Site Logo', description: 'Main logo displayed in navbar and footer' },
  { slot: 'badge', label: 'Process Server Badge', description: 'Authorized process server badge image' },
  { slot: 'hero_image', label: 'Hero Image', description: 'Main image on the homepage hero section' },
  { slot: 'about_photo', label: 'About Page Photo', description: 'Photo displayed on the About page' },
  { slot: 'gavel', label: 'Gavel Image', description: 'Legal gavel image for service sections' },
  { slot: 'process_serving', label: 'Process Serving', description: 'Process serving section image' },
]

export default function ImagesAdminPage() {
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  useEffect(() => { fetchImages() }, [])

  async function fetchImages() {
    const res = await fetch('/api/admin/images')
    if (res.ok) setImages(await res.json())
    setLoading(false)
  }

  function getImageUrl(img: SiteImage) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-images/${img.storage_path}`
  }

  function getStaticFallback(slot: string) {
    const map: Record<string, string> = {
      logo: '/images/logo.png',
      badge: '/images/badge.png',
      hero_image: '/images/process-serving.png',
      about_photo: '/images/investigator.png',
      gavel: '/images/gavel.png',
      process_serving: '/images/process-serving.png',
    }
    return map[slot]
  }

  function handleUploadClick(slot: string) {
    setSelectedSlot(slot)
    setError('')
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !selectedSlot) return

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!allowed.includes(file.type)) { setError('Invalid file type. Use JPG, PNG, WebP, or SVG.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('File too large. Max 5MB.'); return }

    setUploading(selectedSlot)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('slot', selectedSlot)
    formData.append('alt_text', IMAGE_SLOTS.find(s => s.slot === selectedSlot)?.label || '')

    const res = await fetch('/api/admin/images', { method: 'POST', body: formData })
    if (!res.ok) { setError('Upload failed. Please try again.'); setUploading(null); return }

    await fetchImages()
    // Revalidate
    await fetch('/api/admin/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
    setUploading(null)
    e.target.value = ''
  }

  async function handleDelete(slot: string) {
    if (!confirm('Remove this uploaded image? The site will fall back to the default static image.')) return
    await fetch(`/api/admin/images/${slot}`, { method: 'DELETE' })
    await fetchImages()
  }

  if (loading) return <div className="p-8 text-slate-400">Loading images...</div>

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0A1628] mb-2">Image Manager</h1>
      <p className="text-sm text-slate-500 mb-6">Upload and manage images displayed on your marketing pages. Each slot has a default static image that is used when no custom upload exists.</p>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-sm mb-4 text-sm">{error}</div>}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {IMAGE_SLOTS.map(({ slot, label, description }) => {
          const uploaded = images.find(img => img.slot === slot)
          const imgSrc = uploaded ? getImageUrl(uploaded) : getStaticFallback(slot)
          const isUploading = uploading === slot

          return (
            <div key={slot} className="border border-slate-200 rounded-sm bg-white overflow-hidden">
              <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
                {imgSrc ? (
                  <img src={imgSrc} alt={label} className="w-full h-full object-contain" />
                ) : (
                  <ImageIcon size={32} className="text-slate-300" />
                )}
                {uploaded && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Custom</span>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <span className="text-sm text-slate-600">Uploading...</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="font-semibold text-[#0A1628] text-sm">{label}</div>
                <p className="text-slate-400 text-xs mb-3">{description}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleUploadClick(slot)} disabled={isUploading}
                    className="flex items-center gap-1.5 bg-[#0A1628] text-white px-3 py-1.5 rounded-sm text-xs font-medium hover:bg-[#112240] transition-colors disabled:opacity-50">
                    <Upload size={12} /> {uploaded ? 'Replace' : 'Upload'}
                  </button>
                  {uploaded && (
                    <button onClick={() => handleDelete(slot)} className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs font-medium">
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
