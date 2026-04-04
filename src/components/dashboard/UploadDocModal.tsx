'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { X, UploadCloud, File } from 'lucide-react'
import { DocType } from '@/types/database'

const DOC_TYPES: { value: DocType; label: string }[] = [
  { value: 'affidavit', label: 'Affidavit of Service' },
  { value: 'proof_of_service', label: 'Proof of Service' },
  { value: 'evidence_photo', label: 'Evidence Photo' },
  { value: 'video_evidence', label: 'Video Evidence' },
  { value: 'intake_document', label: 'Intake Document' },
  { value: 'notarized_document', label: 'Notarized Document' },
  { value: 'conformed_copy', label: 'Conformed Copy' },
  { value: 'skip_trace_report', label: 'Skip Trace Report' },
  { value: 'court_receipt', label: 'Court Receipt' },
  { value: 'client_upload', label: 'Client Upload' },
  { value: 'other', label: 'Other' },
]

export function UploadDocModal({ caseId, onClose }: { caseId: string; onClose: () => void }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [docType, setDocType] = useState<DocType>('other')
  const [description, setDescription] = useState('')
  const [clientVisible, setClientVisible] = useState(false)

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) { setError('Please select a file'); return }
    setLoading(true)
    setError('')
    try {
      // Upload file to Supabase Storage via our API
      const formData = new FormData()
      formData.append('file', file)
      formData.append('doc_type', docType)
      formData.append('description', description)
      formData.append('is_client_visible', String(clientVisible))

      const res = await fetch(`/api/cases/${caseId}/documents/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Upload failed') }
      router.refresh()
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-elevated w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-[#0A1628]">Upload Document</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div {...getRootProps()}
            className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#C9A84C] bg-amber-50' : 'border-slate-300 hover:border-slate-400'}`}>
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <File size={24} className="text-[#C9A84C]" />
                <div className="text-left">
                  <p className="font-medium text-sm text-[#0A1628]">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button type="button" onClick={e => { e.stopPropagation(); setFile(null) }}
                  className="text-slate-400 hover:text-red-500 ml-2"><X size={16} /></button>
              </div>
            ) : (
              <>
                <UploadCloud size={32} className="text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Drag & drop a file here, or click to browse</p>
                <p className="text-xs text-slate-400 mt-1">PDF, images, Word docs up to 20MB</p>
              </>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Type *</label>
            <select value={docType} onChange={e => setDocType(e.target.value as DocType)}
              className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent">
              {DOC_TYPES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={clientVisible} onChange={e => setClientVisible(e.target.checked)}
              className="w-4 h-4 text-[#C9A84C] focus:ring-[#C9A84C] border-slate-300 rounded" />
            <span className="text-sm text-slate-700">Visible to client</span>
          </label>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800">Cancel</button>
            <button type="submit" disabled={loading}
              className="bg-[#0A1628] text-white px-6 py-2 text-sm font-semibold rounded-sm hover:bg-[#112240] disabled:opacity-50">
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
