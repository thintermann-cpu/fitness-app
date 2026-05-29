interface Props {
  name: string | undefined
  visible: boolean
  color?: string
}

export function NextExercisePreview({ name, visible, color = 'rgba(255,255,255,0.45)' }: Props) {
  return (
    <div
      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-center"
      style={{
        backgroundColor: 'rgba(255,255,255,0.08)',
        color,
        opacity: visible && name ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      Als nächstes: {name ?? '–'}
    </div>
  )
}
