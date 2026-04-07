import { Skeleton } from '@/components/ui/skeleton'

export default function PortalCasesLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-10 w-28 rounded-sm" />
      </div>
      <div className="bg-white border border-slate-200 rounded-sm shadow-card overflow-hidden">
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48 mb-1.5" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
