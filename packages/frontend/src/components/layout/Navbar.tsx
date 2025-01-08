import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLayerGroup, faSearch } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from '@routes/paths'

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 text-primary-600">
            <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
            <span className="font-semibold">Pokémon TCG</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to={ROUTES.SETS}
              className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
            >
              <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4" />
              <span>Sets</span>
            </Link>
            <Link 
              to={ROUTES.CARDS}
              className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
            >
              <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
              <span>Buscar Cartas</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}