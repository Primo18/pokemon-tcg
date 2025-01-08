import { useState, useEffect } from 'react'
import { cardsService } from '@services/cards.service'
import type { Card } from '@/types/pokemon'
import type { SearchParams } from '@/types/types'

export function useCards(params: SearchParams) {
  const [data, setData] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCards = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const cards = await cardsService.searchCards(params)
      setData(cards)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [params.q, params.type, params.rarity, params.setId])

  return { data, isLoading, error, refetch: fetchCards }
}

