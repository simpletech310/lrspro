import { Skeleton } from '@/components/ui/skeleton'

export default function PortalDashboardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(n => (
          <Skeleton key={n} className="h-[120px] rounded-sm" />
        ))}
      </div>

      <div className="mt-8">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          {[1,2,3,4,5].map(n => (
            <Skeleton key={n} className="h-16 w-full rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  )
}
