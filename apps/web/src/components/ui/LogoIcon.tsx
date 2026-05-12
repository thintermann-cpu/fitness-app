import type { CSSProperties } from 'react'

interface LogoIconProps {
  className?: string
  style?: CSSProperties
}

export const LogoIcon = ({ className = 'w-6 h-6', style }: LogoIconProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Stilisierter C-Bogen */}
    <path
      d="M80 20C70 10 55 5 40 5C15 5 5 25 5 50C5 75 15 95 40 95C55 95 70 90 80 80"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />
    {/* Aufwärtspfeil */}
    <path
      d="M50 70V30M50 30L35 45M50 30L65 45"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
