import { apiFetch } from '@services/api.service'
import type { Set, Card } from '@/types/types'

export const setsService = {
  // Obtiene todos los sets
  getAllSets: async (): Promise<Set[]> => {
    return apiFetch('/sets')
  },

  // Obtiene un set específico por su ID
  getSetById: async (id: string): Promise<Set> => {
    return apiFetch(`/sets/${id}`)
  },

  // Obtiene todas las cartas de un set específico
  getSetCards: async (id: string): Promise<{ set: Set; cards: Card[] }> => {
    return apiFetch(`/sets/${id}/cards`)
  },
}
