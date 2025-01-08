import { useState, useMemo } from 'react'
import type { Set } from '@/types/pokemon'

export function useSetFilter(sets: Set[]) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeries, setSelectedSeries] = useState('')

  const filteredSets = useMemo(() => {
    return sets.filter(set => {
      const matchesSearch = set.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesSeries = selectedSeries 
        ? set.series === selectedSeries 
        : true

      return matchesSearch && matchesSeries
    })
  }, [sets, searchTerm, selectedSeries])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleSeriesChange = (value: string) => {
    setSelectedSeries(value)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  return {
    filteredSets,
    searchTerm,
    selectedSeries,
    handleSearchChange,
    handleSeriesChange,
    handleClearSearch,
  }
}