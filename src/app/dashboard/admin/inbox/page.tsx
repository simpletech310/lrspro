import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatDateTime } from '@/lib/utils'
import { Mail, MailOpen, Phone } from 'lucide-react'

export default async function AdminInbox() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: submissions } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  const unreadCount = submissions?.filter(s => !s.is_read).length || 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0A1628]">Contact Submissions</h1>
        <p className="text-slate-500 mt-1">{submissions?.length || 0} total · {unreadCount} unread</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        {submissions && submissions.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {submissions.map(s => (
              <div key={s.id} className={`px-6 py-4 ${s.is_read ? 'bg-white' : 'bg-blue-50/50'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5">
                      {s.is_read ? (
                        <MailOpen size={18} className="text-slate-400" />
                      ) : (
                        <Mail size={18} className="text-blue-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium text-sm ${s.is_read ? 'text-slate-700' : 'text-[#0A1628]'}`}>{s.name}</span>
                        {s.company && <span className="text-xs text-slate-500">({s.company})</span>}
                        {!s.is_read && <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />}
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-3 mt-0.5">
                        <a href={`mailto:${s.email}`} className="text-[#C9A84C] hover:underline">{s.email}</a>
                        {s.phone && (
                          <a href={`tel:${s.phone}`} className="text-slate-500 hover:text-[#0A1628] flex items-center gap-1">
                            <Phone size={12} /> {s.phone}
                          </a>
                        )}
                      </div>
                      {s.service_interest && (
                        <span className="inline-block mt-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          Interested in: {s.service_interest}
                        </span>
                      )}
                      <p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">{s.message}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                    {formatDateTime(s.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500">No contact submissions yet.</div>
        )}
      </div>
    </div>
  )
}
