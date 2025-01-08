import { SetGrid } from '@/components/sets/SetGrid'
import { SetFilter } from '@/components/sets/SetFilter'
import { SearchInput } from '@/components/ui/SearchInput'
import { useSetFilter } from '@/hooks/useSetFilter'
import type { Set } from '@/types/pokemon'

interface SetGridContainerProps {
  sets: Set[]
  isLoading?: boolean
}

export function SetGridContainer({ sets, isLoading }: SetGridContainerProps) {
  const {
    filteredSets,
    searchTerm,
    selectedSeries,
    handleSearchChange,
    handleSeriesChange,
    handleClearSearch,
  } = useSetFilter(sets)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            placeholder="Buscar sets..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onClear={handleClearSearch}
            isLoading={isLoading}
          />
        </div>
        <SetFilter
          value={selectedSeries}
          onChange={handleSeriesChange}
          series={Array.from(new Set(sets.map(set => set.series)))}
          disabled={isLoading}
        />
      </div>

      <SetGrid sets={filteredSets} isLoading={isLoading} />
    </div>
  )
}
