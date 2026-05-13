import { useState } from 'react'
import type { Todo } from '../../hooks/useTodos'

const DEFAULT_LISTS = ['Privat', 'Arbeit', 'Einkauf', 'Sport', 'Sonstiges']

interface Props {
  todos: Todo[]
  onAdd: (listName: string, text: string) => void
  onComplete: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onClearDone: (listName: string) => void
  addError?: boolean
  addErrorMsg?: string
}

export function TodoList({ todos, onAdd, onComplete, onDelete, onClearDone, addError, addErrorMsg }: Props) {
  const existingLists = Array.from(new Set(todos.map(t => t.list_name)))
  const lists = Array.from(new Set([...DEFAULT_LISTS, ...existingLists]))

  const [activeList, setActiveList] = useState(lists[0])
  const [newText, setNewText] = useState('')

  const listTodos = todos.filter(t => t.list_name === activeList)
  const openCount = listTodos.filter(t => !t.completed).length
  const doneCount = listTodos.filter(t => t.completed).length

  const handleAdd = () => {
    if (!newText.trim()) return
onAdd(activeList, newText.trim())
    setNewText('')
  }

  return (
    <div>
      {/* List tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 13 }}>
        {lists.map(l => {
          const count = todos.filter(t => t.list_name === l && !t.completed).length
          const isActive = activeList === l
          return (
            <button
              key={l}
              onClick={() => setActiveList(l)}
              style={{
                padding: '6px 11px',
                background: isActive ? 'rgba(74,144,217,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? 'rgba(74,144,217,0.36)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 20,
                color: isActive ? '#4A90D9' : '#7a7268',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              {l}
              {count > 0 && (
                <span
                  style={{
                    background: isActive ? '#4A90D9' : '#3a3228',
                    color: isActive ? '#fff' : '#8a8278',
                    borderRadius: 10,
                    padding: '1px 5px',
                    fontSize: 10,
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Add input */}
      <div style={{ display: 'flex', gap: 9, marginBottom: 13 }}>
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Aufgabe hinzufügen..."
          style={{
            flex: 1,
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#e8e0d4',
            fontSize: 13,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: '10px 15px',
            minHeight: 44,
            background: 'rgba(74,144,217,0.18)',
            border: '1px solid rgba(74,144,217,0.36)',
            borderRadius: 8,
            color: '#4A90D9',
            fontSize: 18,
            lineHeight: 1,
            cursor: 'pointer',
            fontFamily: 'inherit',
            touchAction: 'manipulation',
          }}
        >
          +
        </button>
      </div>
      {addError && (
        <div style={{ color: '#ef4444', fontSize: 12, marginBottom: 8, textAlign: 'center' }}>
          Speichern fehlgeschlagen: {addErrorMsg ?? 'unbekannter Fehler'}
        </div>
      )}

      {/* Todo items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {listTodos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 26, color: '#4a4238', fontSize: 13 }}>
            Keine Aufgaben 🎉
          </div>
        ) : (
          listTodos.map(t => (
            <div
              key={t.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '11px 13px',
                background: t.completed ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                opacity: t.completed ? 0.5 : 1,
              }}
            >
              <button
                onClick={() => onComplete(t.id, !t.completed)}
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
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: t.completed ? 'none' : '2px solid rgba(255,255,255,0.15)',
                    background: t.completed ? '#4A90D9' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    color: 'white',
                  }}
                >
                  {t.completed && '✓'}
                </span>
              </button>
              <div
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: t.completed ? '#5a5248' : '#c8bfb0',
                  textDecoration: t.completed ? 'line-through' : 'none',
                }}
              >
                {t.text}
              </div>
              <button
                onClick={() => onDelete(t.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4a4238',
                  cursor: 'pointer',
                  fontSize: 15,
                  minWidth: 44,
                  minHeight: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  touchAction: 'manipulation',
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {doneCount > 0 && (
        <button
          onClick={() => onClearDone(activeList)}
          style={{
            marginTop: 11,
            width: '100%',
            padding: 9,
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            color: '#4a4238',
            fontSize: 11,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Erledigte löschen ({doneCount})
        </button>
      )}

      <div style={{ marginTop: 8, fontSize: 11, color: '#4a4238', textAlign: 'center' }}>
        {openCount} offen · {doneCount} erledigt
      </div>
    </div>
  )
}
