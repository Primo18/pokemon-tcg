import { useState } from 'react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Card as PokemonCard } from '@/types/pokemon'

interface CardDetailProps {
  card: PokemonCard
}

export function CardDetail({ card }: CardDetailProps) {
  const [selectedImage, setSelectedImage] = useState(
    card.images.find(img => img.type === 'large')?.url || 
    card.images.find(img => img.type === 'small')?.url
  )

  const smallImage = card.images.find(img => img.type === 'small')?.url
  const largeImage = card.images.find(img => img.type === 'large')?.url

  return (
    <div className="space-y-6">
      {/* Navegación */}
      <div>
        <Link 
          to={`/sets/${card.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4 mr-1" />
          <span>Volver al set</span>
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imágenes */}
        <div className="space-y-4">
          <Card padding={false} className="overflow-hidden bg-gray-100">
            <div className="aspect-square relative">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={card.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </Card>
          
          {/* Selector de imágenes */}
          {smallImage && largeImage && smallImage !== largeImage && (
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedImage(smallImage)}
                className={`
                  w-20 h-20 rounded-lg overflow-hidden border-2
                  ${selectedImage === smallImage ? 'border-primary-500' : 'border-transparent'}
                `}
              >
                <img
                  src={smallImage}
                  alt="Versión pequeña"
                  className="w-full h-full object-contain"
                />
              </button>
              <button
                onClick={() => setSelectedImage(largeImage)}
                className={`
                  w-20 h-20 rounded-lg overflow-hidden border-2
                  ${selectedImage === largeImage ? 'border-primary-500' : 'border-transparent'}
                `}
              >
                <img
                  src={largeImage}
                  alt="Versión grande"
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
          )}
        </div>

        {/* Información de la carta */}
        <Card>
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{card.name}</h1>
                <span className="text-lg font-medium text-gray-500">
                  #{card.number}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {card.types?.map((type) => (
                  <Badge key={type} variant="info">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">
                  Supertipo
                </h2>
                <p className="text-gray-900">{card.supertype}</p>
              </div>

              {card.subtypes && card.subtypes.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">
                    Subtipos
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {card.subtypes.map((subtype) => (
                      <Badge key={subtype} variant="default">
                        {subtype}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {card.rarity && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">
                    Rareza
                  </h2>
                  <Badge variant="success">{card.rarity}</Badge>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}