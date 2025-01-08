import { useState, useEffect } from 'react'
import { cardsService } from '@/services/cards.service'
import type { Card } from '@/types/pokemon'

export function useCard(id: string) {
  const [data, setData] = useState<Card | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCard = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const card = await cardsService.getCardById(id)
      setData(card)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchCard()
    }
  }, [id])

  return { data, isLoading, error, refetch: fetchCard }
}