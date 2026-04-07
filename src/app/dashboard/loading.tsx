import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map(n => (
          <Skeleton key={n} className="h-[88px] rounded-sm" />
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="px-4 sm:px-6 py-4">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
