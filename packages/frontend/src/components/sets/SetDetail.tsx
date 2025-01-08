import { faCalendar, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { SetWithCards } from '@/types/pokemon'
import { SetCardGrid } from './SetCardGrid'

interface SetDetailProps {
  set: SetWithCards
}

export function SetDetail({ set }: SetDetailProps) {
  const releaseDate = new Date(set.releaseDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-6">
      {/* Cabecera del Set */}
      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo e imagen del set */}
          <div className="w-full md:w-1/3">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {set.logoUrl ? (
                <img
                  src={set.logoUrl}
                  alt={`Logo de ${set.name}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FontAwesomeIcon 
                    icon={faLayerGroup} 
                    className="h-12 w-12 text-gray-400" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Información del set */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">
                {set.name}
              </h1>
              <Badge variant="info" size="md">
                {set.series}
              </Badge>
            </div>

            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-2" />
              <span>{releaseDate}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total de cartas</span>
                <span className="font-medium">{set.total}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Cartas impresas</span>
                <span className="font-medium">{set.printedTotal}</span>
              </div>
            </div>

            {set.symbolUrl && (
              <div>
                <span className="text-sm text-gray-500 block mb-2">Símbolo del set</span>
                <img
                  src={set.symbolUrl}
                  alt={`Símbolo de ${set.name}`}
                  className="w-8 h-8"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Grid de cartas */}
      <SetCardGrid cards={set.cards} />
    </div>
  )
}