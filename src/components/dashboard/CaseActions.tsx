'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, FileText, MapPin, UploadCloud, MessageSquare, AlertTriangle } from 'lucide-react'
import { CaseAttempt, CaseDocument, CaseChecklistItem, CaseStatus } from '@/types/database'
import { formatDateTime } from '@/lib/utils'
import { LogAttemptModal } from './LogAttemptModal'
import { UploadDocModal } from './UploadDocModal'
import { PostUpdateModal } from './PostUpdateModal'

export function CaseActions({ caseId, status, checklist, attempts, documents, userRole, staffId }:
  { caseId: string, status: CaseStatus, checklist: CaseChecklistItem[], attempts: CaseAttempt[], documents: CaseDocument[], userRole: string, staffId: string }
) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'checklist'|'attempts'|'documents'>('checklist')
  const [showAttemptModal, setShowAttemptModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const toggleChecklist = async (itemId: string, currentStatus: boolean) => {
    await fetch(`/api/cases/${caseId}/checklist`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: itemId, is_complete: !currentStatus })
    })
    router.refresh()
  }

  const handleUpdateStatus = async (newStatus: CaseStatus) => {
    await fetch(`/api/cases/${caseId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    router.refresh()
  }

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <div className="flex border-b border-slate-200">
          {[
            { id: 'checklist', label: 'Action Checklist', icon: CheckCircle2 },
            { id: 'attempts', label: 'Service Attempts', icon: MapPin },
            { id: 'documents', label: 'Documents', icon: FileText }
          ].map(t => {
            const Icon = t.icon
            const isActive = activeTab === t.id
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${isActive ? 'bg-slate-50 text-[#0A1628] border-b-2 border-[#C9A84C]' : 'text-slate-500 hover:text-[#0A1628] hover:bg-slate-50'}`}>
                <Icon size={16} className={isActive ? 'text-[#C9A84C]' : 'text-slate-400'} /> {t.label}
              </button>
            )
          })}
        </div>

        <div className="p-6">
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#0A1628] mb-4">Required Actions</h3>
              {checklist?.sort((a,b)=>a.sort_order-b.sort_order).map(item => (
                <label key={item.id} className={`flex items-start p-4 border rounded-sm cursor-pointer transition-colors ${item.is_complete ? 'bg-slate-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                  <input type="checkbox" checked={item.is_complete} onChange={() => toggleChecklist(item.id, item.is_complete)} className="mt-1 w-5 h-5 text-emerald-600 focus:ring-emerald-600 border-slate-300 rounded-sm" />
                  <div className="ml-3">
                    <div className={`font-medium ${item.is_complete ? 'text-slate-500 line-through' : 'text-[#0A1628]'}`}>{item.label}</div>
                    {item.is_required && !item.is_complete && <span className="text-xs font-semibold text-red-500 uppercase">Required</span>}
                  </div>
                </label>
              ))}

              <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4 flex-wrap">
                <button onClick={() => handleUpdateStatus('in_progress')} className="bg-[#0A1628] text-white px-4 py-2 text-sm font-semibold rounded-sm hover:bg-[#112240]">Mark In Progress</button>
                <button onClick={() => handleUpdateStatus('complete')} className="bg-emerald-600 text-white px-4 py-2 text-sm font-semibold rounded-sm hover:bg-emerald-700">Mark Complete</button>
                <button onClick={() => setShowUpdateModal(true)} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 text-sm font-semibold rounded-sm hover:bg-slate-50 flex items-center gap-2">
                  <MessageSquare size={14} /> Post Update
                </button>
              </div>
            </div>
          )}

          {activeTab === 'attempts' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="font-semibold text-[#0A1628]">Logged Attempts</h3>
                <button onClick={() => setShowAttemptModal(true)} className="bg-[#C9A84C] text-[#0A1628] px-4 py-2 text-sm font-semibold rounded-sm hover:bg-[#E8C96A]">Log New Attempt</button>
              </div>
              {attempts?.length > 0 ? (
                <div className="space-y-4">
                  {attempts.map(a => (
                    <div key={a.id} className="border border-slate-200 rounded-sm p-4 text-sm">
                      <div className="flex justify-between items-start mb-2">
                         <div className="font-semibold text-[#0A1628]">Attempt #{a.attempt_num}</div>
                         <div className="text-slate-500">{formatDateTime(a.attempted_at)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-600">
                        <div><span className="font-medium text-slate-500">Outcome:</span> {a.outcome.replace(/_/g,' ')}</div>
                        <div><span className="font-medium text-slate-500">Address:</span> {a.address_used}</div>
                        <div className="col-span-2"><span className="font-medium text-slate-500">Notes:</span> {a.notes || 'None'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-slate-500 italic">No attempts logged yet.</p>}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="font-semibold text-[#0A1628]">Case Files</h3>
                <button onClick={() => setShowUploadModal(true)} className="bg-[#0A1628] text-white px-4 py-2 text-sm font-semibold rounded-sm hover:bg-[#112240] flex items-center gap-2">
                  <UploadCloud size={16} /> Upload Doc
                </button>
              </div>
              {documents?.length > 0 ? (
                <div className="space-y-3">
                  {documents.map(d => (
                    <div key={d.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-sm">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-[#C9A84C]" />
                        <div>
                          <div className="font-medium text-[#0A1628] text-sm">{d.file_name}</div>
                          <div className="text-xs text-slate-500">Type: {d.doc_type.replace(/_/g,' ')} • {formatDateTime(d.created_at)}</div>
                        </div>
                      </div>
                      <a href={d.storage_url} target="_blank" rel="noreferrer" className="text-[#C9A84C] text-sm font-medium hover:underline">View</a>
                    </div>
                  ))}
                </div>
              ) : <p className="text-slate-500 italic">No documents attached.</p>}
            </div>
          )}
        </div>
      </div>

      {showAttemptModal && <LogAttemptModal caseId={caseId} onClose={() => setShowAttemptModal(false)} />}
      {showUploadModal && <UploadDocModal caseId={caseId} onClose={() => setShowUploadModal(false)} />}
      {showUpdateModal && <PostUpdateModal caseId={caseId} onClose={() => setShowUpdateModal(false)} />}
    </>
  )
}
