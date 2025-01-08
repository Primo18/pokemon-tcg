export interface Set {
  id: string
  name: string
  series: string
  printedTotal: number
  total: number
  ptcgoCode?: string
  releaseDate: string
  updatedAt?: string
  symbolUrl?: string
  logoUrl?: string
}

export interface Card {
  id: string
  name: string
  supertype: string
  subtypes: string[]
  types: string[]
  setId: string
  number: string
  rarity?: string
  images: {
    id: number
    url: string
    type: 'small' | 'large'
  }[]
}

export interface SearchParams {
  q?: string
  type?: string
  rarity?: string
  setId?: string
}
