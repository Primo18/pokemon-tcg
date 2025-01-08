// src/components/sets/SetCardGrid.tsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SearchInput } from '@/components/ui/SearchInput'
import { Select } from '@/components/ui/Select'
import type { Card as PokemonCard } from '@/types/pokemon'

interface SetCardGridProps {
  cards: PokemonCard[]
}

export function SetCardGrid({ cards }: SetCardGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('')

  // Obtener tipos y rareza únicos de las cartas
  const types = useMemo(() => {
    const uniqueTypes = new Set<string>()
    cards.forEach(card => {
      card.types?.forEach(type => uniqueTypes.add(type))
    })
    return Array.from(uniqueTypes).sort()
  }, [cards])

  const rarities = useMemo(() => {
    const uniqueRarities = new Set<string>()
    cards.forEach(card => {
      if (card.rarity) uniqueRarities.add(card.rarity)
    })
    return Array.from(uniqueRarities).sort()
  }, [cards])

  // Filtrar cartas
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = card.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      
      const matchesType = selectedType
        ? card.types?.includes(selectedType)
        : true
      
      const matchesRarity = selectedRarity
        ? card.rarity === selectedRarity
        : true

      return matchesSearch && matchesType && matchesRarity
    })
  }, [cards, searchTerm, selectedType, selectedRarity])

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <SearchInput
            placeholder="Buscar cartas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
          />
        </div>
        {types.length > 0 && (
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={[
              { value: '', label: 'Todos los tipos' },
              ...types.map(type => ({ value: type, label: type }))
            ]}
          />
        )}
        {rarities.length > 0 && (
          <Select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            options={[
              { value: '', label: 'Todas las rarezas' },
              ...rarities.map(rarity => ({ value: rarity, label: rarity }))
            ]}
          />
        )}
      </div>

      {/* Grid de cartas */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron cartas</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCards.map((card) => (
            <Link key={card.id} to={`/cards/${card.id}`}>
              <Card hover padding={false} className="overflow-hidden">
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-100">
                    {card.images.find(img => img.type === 'small')?.url && (
                      <img
                        src={card.images.find(img => img.type === 'small')?.url}
                        alt={card.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {card.name}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {card.number}
                      </span>
                    </div>
                    {card.rarity && (
                      <Badge variant="info" size="sm" className="mt-1">
                        {card.rarity}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}