import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', style, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-[--color-text-subtle] ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        color: 'var(--color-text)',
        border: '1px solid transparent',
        ...style,
      }}
    />
  )
}
