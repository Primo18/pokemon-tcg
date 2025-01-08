import { useParams } from 'react-router'
import { CardDetail } from '@/components/cards/CardDetail'
import { CardDetailSkeleton } from '@/components/cards/CardDetailSkeleton'
import { Button } from '@/components/ui/Button'
import { useCard } from '@/hooks/useCard'

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: card, isLoading, error, refetch } = useCard(id!)

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error al cargar la carta
          </h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>
            Intentar nuevamente
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CardDetailSkeleton />
      </div>
    )
  }

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Carta no encontrada
          </h1>
          <p className="text-gray-600">
            La carta que buscas no existe o no está disponible
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CardDetail card={card} />
    </div>
  )
}