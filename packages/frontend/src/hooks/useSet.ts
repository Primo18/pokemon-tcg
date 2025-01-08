import { useState, useEffect } from 'react'
import { setsService } from '@/services/sets.service'
import type { SetWithCards } from '@/types/pokemon'

export function useSet(id: string) {
  const [data, setData] = useState<SetWithCards | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSet = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await setsService.getSetCards(id) // Supongamos que devuelve { set: Set, cards: Card[] }
      const setWithCards: SetWithCards = {
        ...response.set, // Extrae las propiedades del set base
        cards: response.cards, // Añade la propiedad cards
      }
      setData(setWithCards) // Ahora es del tipo correcto
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchSet()
    }
  }, [id])

  return { data, isLoading, error, refetch: fetchSet }
}
