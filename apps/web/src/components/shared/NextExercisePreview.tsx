interface Props {
  name: string | undefined
  visible: boolean
  color?: string
}

export function NextExercisePreview({ name, visible, color = 'rgba(255,255,255,0.45)' }: Props) {
  return (
    <div
      className="px-3 py-1.5 rounded-xl text-xs font-medium text-center"
      style={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        color,
        opacity: visible && name ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      Als nächstes: {name ?? '–'}
    </div>
  )
}
