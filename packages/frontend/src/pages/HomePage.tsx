import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/Card'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pokémon Trading Card Game Explorer
        </h1>
        <p className="text-lg text-gray-600">
          Explora todos los sets y cartas del juego de cartas coleccionables Pokémon
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link to="/sets">
          <Card hover className="h-full">
            <div className="flex flex-col items-center p-6 text-center">
              <FontAwesomeIcon 
                icon={faLayerGroup} 
                className="h-12 w-12 text-primary-600 mb-4" 
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Explorar Sets
              </h2>
              <p className="text-gray-600">
                Descubre todos los sets disponibles y sus cartas
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/cards">
          <Card hover className="h-full">
            <div className="flex flex-col items-center p-6 text-center">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="h-12 w-12 text-primary-600 mb-4" 
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Buscar Cartas
              </h2>
              <p className="text-gray-600">
                Encuentra cartas específicas por nombre, tipo o rareza
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}