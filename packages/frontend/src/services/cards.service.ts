import { apiFetch } from '@services/api.service'
import type { Card, SearchParams } from '../types/types'

export const cardsService = {
  // Busca cartas según varios criterios
  searchCards: async (params: SearchParams): Promise<Card[]> => {
    const searchParams = new URLSearchParams()

    if (params.q) searchParams.append('q', params.q)
    if (params.type) searchParams.append('type', params.type)
    if (params.rarity) searchParams.append('rarity', params.rarity)
    if (params.setId) searchParams.append('setId', params.setId)

    const queryString = searchParams.toString()
    return apiFetch(`/cards/search${queryString ? `?${queryString}` : ''}`)
  },

  // Obtiene una carta específica por su ID
  getCardById: async (id: string): Promise<Card> => {
    return apiFetch(`/cards/${id}`)
  },
}
