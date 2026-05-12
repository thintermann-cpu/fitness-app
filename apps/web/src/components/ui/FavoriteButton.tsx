import { useFavorites } from '../../hooks/useFavorites'

interface Props {
  contentType: string
  contentId: string
  color: string
}

export function FavoriteButton({ contentType, contentId, color }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(contentType, contentId)

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggleFavorite(contentType, contentId) }}
      aria-label={active ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 44,
        minHeight: 44,
        flexShrink: 0,
        touchAction: 'manipulation',
      }}
    >
      {active ? (
        <svg viewBox="0 0 24 24" fill={color} width="18" height="18" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" width="18" height="18" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  )
}
