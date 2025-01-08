import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Set } from '@/types/pokemon'

interface SetCardProps {
  set: Set
}

export function SetCard({ set }: SetCardProps) {
  const releaseDate = new Date(set.releaseDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link to={`/sets/${set.id}`}>
      <Card hover className="h-full transition-transform hover:-translate-y-1">
        <div className="flex flex-col h-full">
          {/* Logo del set */}
          <div className="relative aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
            {set.logoUrl ? (
              <img
                src={set.logoUrl}
                alt={`Logo de ${set.name}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <FontAwesomeIcon icon={faLayerGroup} className="h-12 w-12 text-gray-400" />
              </div>
            )}
            {set.symbolUrl && (
              <img
                src={set.symbolUrl}
                alt={`Símbolo de ${set.name}`}
                className="absolute bottom-2 right-2 w-8 h-8"
                loading="lazy"
              />
            )}
          </div>

          {/* Información del set */}
          <div className="flex-grow">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 leading-tight">
                {set.name}
              </h3>
              <Badge variant="info" size="sm">
                {set.series}
              </Badge>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-1" />
              <span>{releaseDate}</span>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Total de cartas:</span>
                <Badge>
                  {set.printedTotal} / {set.total}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}