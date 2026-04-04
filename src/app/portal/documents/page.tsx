import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { FileText, Download, CheckCircle2 } from 'lucide-react'

export default async function PortalDocuments() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get all client-visible documents across all of their cases
  const { data: cases } = await supabase
    .from('cases')
    .select('id, case_number, service:services(name), documents:case_documents(*)')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  const allDocs = cases?.flatMap(c =>
    (c.documents as any[] || [])
      .filter((d: any) => d.is_client_visible)
      .map((d: any) => ({ ...d, case_number: c.case_number, service_name: (c.service as any)?.name }))
  ) || []

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#0A1628]">My Documents</h1>
        <p className="text-slate-500 mt-1">All documents shared with you across your cases</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card">
        {allDocs.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {allDocs.map((d: any) => (
              <div key={d.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <FileText size={24} className="text-[#C9A84C] flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[#0A1628]">{d.file_name}</div>
                    <div className="text-sm text-slate-500">
                      {d.service_name} · Case {d.case_number} · {d.doc_type.replace(/_/g, ' ')}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{formatDate(d.created_at)}</div>
                  </div>
                </div>
                {d.storage_url && (
                  <a href={d.storage_url} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:underline flex-shrink-0">
                    <Download size={16} /> Download
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <CheckCircle2 size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No documents yet</p>
            <p className="text-slate-400 text-sm mt-1">Documents like affidavits and proof of service will appear here once they are ready.</p>
          </div>
        )}
      </div>
    </div>
  )
}
