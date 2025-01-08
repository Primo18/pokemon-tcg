import { useState, useEffect } from 'react'
import { setsService } from '@/services/sets.service'
import type { Set } from '@/types/pokemon'

export function useSets() {
  const [data, setData] = useState<Set[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSets = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const sets = await setsService.getAllSets()
      setData(sets)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSets()
  }, [])

  return { data, isLoading, error, refetch: fetchSets }
}
