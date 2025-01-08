import { useState, useCallback } from 'react'
import { SearchInput } from '@/components/ui/SearchInput'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { useDebounce } from '@/hooks/useDebounce'
import { useCards } from '@/hooks/useCards'
import type { SearchParams } from '@/types/types'

export default function CardsPage() {
  const [searchParams, setSearchParams] = useState<SearchParams>({})
  const debouncedParams = useDebounce(searchParams, 300)
  const { data: cards, isLoading, error } = useCards(debouncedParams)

  const handleSearch = useCallback((key: keyof SearchParams, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value || undefined // Elimina la key si el valor está vacío
    }))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Buscador de Cartas
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="sm:col-span-2">
          <SearchInput
            placeholder="Buscar por nombre..."
            value={searchParams.q || ''}
            onChange={e => handleSearch('q', e.target.value)}
            onClear={() => handleSearch('q', '')}
            isLoading={isLoading}
          />
        </div>
        <Select
          label="Tipo"
          value={searchParams.type || ''}
          onChange={e => handleSearch('type', e.target.value)}
          options={[
            { value: '', label: 'Todos los tipos' },
            { value: 'Colorless', label: 'Incoloro' },
            { value: 'Darkness', label: 'Oscuridad' },
            { value: 'Dragon', label: 'Dragón' },
            { value: 'Fairy', label: 'Hada' },
            { value: 'Fighting', label: 'Lucha' },
            { value: 'Fire', label: 'Fuego' },
            { value: 'Grass', label: 'Planta' },
            { value: 'Lightning', label: 'Rayo' },
            { value: 'Metal', label: 'Metal' },
            { value: 'Psychic', label: 'Psíquico' },
            { value: 'Water', label: 'Agua' },
          ]}
        />
        <Select
          label="Rareza"
          value={searchParams.rarity || ''}
          onChange={e => handleSearch('rarity', e.target.value)}
          options={[
            { value: '', label: 'Todas las rarezas' },
            { value: 'Common', label: 'Común' },
            { value: 'Uncommon', label: 'Poco común' },
            { value: 'Rare', label: 'Rara' },
            { value: 'Rare Holo', label: 'Rara Holo' },
            { value: 'Rare Ultra', label: 'Ultra Rara' },
          ]}
        />
      </div>

      {error ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">{error.message}</p>
        </Card>
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="aspect-square animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : !cards?.length ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">No se encontraron cartas</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Aquí iría el grid de cartas */}
        </div>
      )}
    </div>
  )
}