import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function CardDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-24" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card padding={false}>
            <Skeleton className="aspect-square" />
          </Card>
          <div className="flex gap-4">
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-20 h-20" />
          </div>
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between gap-4 mb-2">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-6 w-32" />
              </div>

              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>

              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}