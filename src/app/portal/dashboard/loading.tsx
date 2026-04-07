import { Skeleton } from '@/components/ui/skeleton'

export default function PortalDashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-10 w-32 rounded-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map(n => (
          <Skeleton key={n} className="h-[80px] rounded-sm" />
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="px-4 sm:px-6 py-4 flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3.5 w-48" />
              </div>
              <Skeleton className="h-4 w-16 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
