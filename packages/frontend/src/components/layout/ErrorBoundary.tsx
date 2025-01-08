import { useRouteError, isRouteErrorResponse } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="h-12 w-12 text-orange-500 mb-4" 
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Página no encontrada
            </h1>
            <p className="text-gray-600 mb-4">
              La página que estás buscando no existe
            </p>
            <a 
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <FontAwesomeIcon 
            icon={faExclamationTriangle} 
            className="h-12 w-12 text-red-500 mb-4" 
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error {error.status}
          </h1>
          <p className="text-gray-600 mb-4">
            {error.statusText}
          </p>
          <a 
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <FontAwesomeIcon 
          icon={faExclamationTriangle} 
          className="h-12 w-12 text-red-500 mb-4" 
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Error Inesperado
        </h1>
        <p className="text-gray-600 mb-4">
          Ha ocurrido un error inesperado
        </p>
        <a 
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  )
}