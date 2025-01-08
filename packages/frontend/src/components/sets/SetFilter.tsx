import { Select } from '@/components/ui/Select'

interface SetFilterProps {
  value: string
  onChange: (value: string) => void
  series: string[]
  disabled?: boolean
}

export function SetFilter({ value, onChange, series, disabled }: SetFilterProps) {
  const options = [
    { value: '', label: 'Todas las series' },
    ...series.map(series => ({
      value: series,
      label: series
    }))
  ]

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      disabled={disabled}
      className="w-full sm:w-48"
    />
  )
}