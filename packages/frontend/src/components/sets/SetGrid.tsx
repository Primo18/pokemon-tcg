import { Fragment } from 'react'
import { SetCard } from './SetCard'
import { SetCardSkeleton } from './SetCardSkeleton'
import type { Set } from '@/types/pokemon'

interface SetGridProps {
  sets: Set[]
  isLoading?: boolean
}

export function SetGrid({ sets, isLoading }: SetGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SetCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (sets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No se encontraron sets
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sets.map((set) => (
        <SetCard key={set.id} set={set} />
      ))}
    </div>
  )
}