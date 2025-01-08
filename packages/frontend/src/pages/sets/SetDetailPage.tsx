import { useParams } from 'react-router'
import { SetDetail } from '@/components/sets/SetDetail'
import { SetDetailSkeleton } from '@/components/sets/SetDetailSkeleton'
import { Button } from '@/components/ui/Button'
import { useSet } from '@/hooks/useSet' // Usamos el hook correcto

export default function SetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: set, isLoading, error, refetch } = useSet(id!) // Usamos el hook useSet

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error al cargar el set
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
        <SetDetailSkeleton />
      </div>
    )
  }

  if (!set) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Set no encontrado
          </h1>
          <p className="text-gray-600">
            El set que buscas no existe o no está disponible
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SetDetail set={set} /> {/* Ahora set tiene el tipo correcto */}
    </div>
  )
}
