import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function SetDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Skeleton className="aspect-video rounded-lg" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-5 w-1/3" />
            <div className="flex gap-4">
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-12" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </Card>

      {/* Skeleton para el grid de cartas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}