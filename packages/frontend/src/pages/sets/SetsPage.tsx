import { useEffect } from 'react'
import { SetGridContainer } from '@/components/sets/SetGridContainer'
import { Button } from '@/components/ui/Button'
import { useSets } from '@/hooks/useSets'

export default function SetsPage() {
  const { data: sets, isLoading, error, refetch } = useSets()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error al cargar los sets
          </h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>
            Intentar nuevamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Sets de Pokémon TCG
      </h1>
      <SetGridContainer 
        sets={sets ?? []} 
        isLoading={isLoading} 
      />
    </div>
  )
}