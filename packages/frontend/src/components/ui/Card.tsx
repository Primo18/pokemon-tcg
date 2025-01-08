import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article'
  padding?: boolean
  hover?: boolean
}

export function Card({
  as: Component = 'div',
  padding = true,
  hover = false,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        ${padding ? 'p-4' : ''}
        ${hover ? 'transition-shadow hover:shadow-md' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  )
}