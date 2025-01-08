import { InputHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  isLoading?: boolean
}

export function SearchInput({
  value,
  onClear,
  isLoading = false,
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className={`
          block w-full pl-10 pr-10 rounded-md border-gray-300
          focus:border-primary-500 focus:ring-primary-500 sm:text-sm
          ${className}
        `}
        value={value}
        {...props}
      />
      {(value || isLoading) && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isLoading ? (
            <svg 
              className="animate-spin h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <button
              type="button"
              onClick={onClear}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}