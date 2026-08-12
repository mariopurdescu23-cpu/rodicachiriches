import React from 'react'
import { useReveal } from '../hooks/useReveal'

export const Reveal: React.FC<{
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li'
}> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const ref = useReveal<HTMLDivElement>()
  const Tag = as as any

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}
