import { Skeleton } from '@/components/ui/skeleton'

export default function CasesLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      
      <div className="bg-white border text-sm border-slate-200 rounded-sm shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-4">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-4 w-24" />)}
        </div>
        <div className="divide-y divide-slate-100">
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <div key={n} className="p-4 flex gap-4">
              {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-4 w-24" />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
