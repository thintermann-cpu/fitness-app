import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', style, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-2xl p-6 ${className}`}
      style={{ backgroundColor: 'var(--color-bg-card)', ...style }}
    >
      {children}
    </div>
  )
}
