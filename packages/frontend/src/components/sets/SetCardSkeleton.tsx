import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function SetCardSkeleton() {
  return (
    <Card>
      <div className="space-y-4">
        <Skeleton className="aspect-video rounded-md" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="w-2/3 h-5" />
            <Skeleton className="w-1/4 h-5" />
          </div>
          <Skeleton className="w-1/2 h-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        </div>
      </div>
    </Card>
  )
}