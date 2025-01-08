export interface Set {
    id: string
    name: string
    series: string
    printedTotal: number
    total: number
    releaseDate: string
    updatedAt?: string
    symbolUrl?: string
    logoUrl?: string
  }
  
  export interface SetWithCards extends Set {
    cards: Card[]
  }
  
  export interface Card {
    id: string
    name: string
    number: string
    images: CardImage[]
    supertype: string
    subtypes: string[]
    types?: string[]
    rarity?: string
  }
  
  export interface CardImage {
    id: number
    url: string
    type: 'small' | 'large'
  }