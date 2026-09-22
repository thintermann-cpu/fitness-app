/** Split catalog exercise blobs into readable lines (display + session edit). */
export function splitWodExercises(text: string): string[] {
  if (!text?.trim()) return []
  return text
    .replace(/\r/g, '')
    .replace(/\s*·\s*/g, '\n')
    .replace(/\s*;\s*/g, '\n')
    .replace(/(?:^|\n)\s*\d+[.)]\s+/g, '\n')
    .split(/\n+/)
    .flatMap((line) => {
      const t = line.trim()
      if (!t) return []
      const first = t.split(',')[0] ?? t
      if (t.includes(',') && !/\d+\s*-\s*\d+/.test(first)) {
        return t.split(',').map((s) => s.trim()).filter(Boolean)
      }
      return [t]
    })
}
