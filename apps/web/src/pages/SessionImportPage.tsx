import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LandingNav } from '../components/landing/LandingNav'
import { LandingFooter } from '../components/landing/LandingFooter'

type Lang = 'de' | 'en'

function getInitialLang(): Lang {
  const stored = localStorage.getItem('lang') as Lang | null
  if (stored === 'de' || stored === 'en') return stored
  const browser = navigator.language.toLowerCase()
  return browser.startsWith('de') || browser.startsWith('at') || browser.startsWith('ch') ? 'de' : 'en'
}

const T = {
  de: {
    back: '← Zurück zur Startseite',
    kicker: 'Training aus dem Chat',
    title: 'Der Plan ist schon da. Die App spielt ihn ab.',
    lead: 'Wer ein Training im Chat, auf dem Zettel oder in einer Datei plant, tippt es nicht noch einmal in den Wizard. Ein JSON ist die Übergabe: Warm-up, Kraft, Metcon, Mobilität, Atem und Sitzmeditation laufen der Reihe nach.',
    worthTitle: 'Wann es sich lohnt',
    worth: [
      'Du hast den Plan schon. Das JSON erspart das zweite Zusammensetzen.',
      'Ein Chatbot schreibt das Format. Du musst die Felder nicht auswendig kennen.',
      'Einmal sichern, und der nächste Start geht direkt los, ohne Wizard.',
      'Freie Übungsnamen sind erlaubt. Ein Katalogtreffer bringt Abbildung und Kurztext dazu.',
    ],
    stepsTitle: 'So kommt der Plan in die App',
    steps: [
      { title: 'Plan schreiben', text: 'Im Chat oder selbst. Die Ausgabe ist nur das JSON, ohne Erklärung drumherum.' },
      { title: 'Einfügen', text: 'In der App: Training, neben „Neues Workout“, oder im Timer unter „Session einfügen“. Text oder Datei.' },
      { title: 'Prüfen', text: 'Die Übersicht zeigt die Teile. Name, Reihenfolge, Zeiten und Hinweise lassen sich noch ändern.' },
      { title: 'Starten', text: '„Auch sichern“ legt die Session unter Meine Workouts. Der nächste Start überspringt den Wizard.' },
    ],
    partsTitle: 'Was ein Teil sein kann',
    parts: 'Warm-up, Ablauf mit Sekunden, Kraft mit Sätzen, Pause, EMOM, AMRAP, For Time, Tabata, Mobilität, Atem und Sitzmeditation. Atem ist eine Vier-Phasen-Atmung, zum Beispiel Box Breathing 4-4-4-4. Die Sitzmeditation nimmt Minuten und einen Klang. Beide haken Achtsamkeit ab. Mobilität hakt die eigene Säule ab. Das Warm-up schreibt keinen Verlauf und geht direkt weiter.',
    exampleTitle: 'Kurzbeispiel',
    app: 'In der App öffnen',
  },
  en: {
    back: '← Back to the homepage',
    kicker: 'A session from chat',
    title: 'The plan is already written. The app plays it.',
    lead: 'If the session already exists in a chat, on paper, or in a file, you do not rebuild it in the wizard. JSON is the handoff: warm-up, strength, metcon, mobility, breath, and a sit run in order.',
    worthTitle: 'When it is worth it',
    worth: [
      'You already have the plan. The JSON skips building it a second time.',
      'A chatbot can write the format. You do not have to memorize the fields.',
      'Save it once, and the next start runs straight through, without the wizard.',
      'Free exercise names are fine. A catalog match adds the picture and the short cue.',
    ],
    stepsTitle: 'How the plan gets into the app',
    steps: [
      { title: 'Write the plan', text: 'In chat, or by hand. The output is only the JSON, with no explanation around it.' },
      { title: 'Paste it', text: 'In the app: Training, next to “New workout”, or on the Timer tab under “Paste session”. Text or file.' },
      { title: 'Check it', text: 'The overview lists the parts. Name, order, times, and cues can still be edited.' },
      { title: 'Start', text: '“Also save” keeps the session under My workouts. The next start skips the wizard.' },
    ],
    partsTitle: 'What a part can be',
    parts: 'Warm-up, a timed flow, strength with sets, a pause, EMOM, AMRAP, For Time, Tabata, mobility, breath, and a sit. Breath is four phases, for example box breathing 4-4-4-4. The sit takes minutes and a sound. Both check off mindfulness. Mobility checks its own pillar. The warm-up writes no history and continues straight on.',
    exampleTitle: 'Short example',
    app: 'Open the app',
  },
}

const EXAMPLE = `{
  "name": "Unterkörper und kurzer Metcon",
  "parts": [
    {
      "kind": "warmup",
      "exercises": [
        { "name": "Air Squats", "seconds": 40, "note": "Tief, Brust hoch" }
      ]
    },
    {
      "kind": "kraft",
      "exercises": [
        { "name": "Back Squats", "sets": 5, "reps": 5, "weight": 100 }
      ]
    },
    {
      "kind": "amrap",
      "minutes": 8,
      "exercises": [
        { "name": "Burpees", "detail": "8" }
      ]
    }
  ]
}`

export function SessionImportPage() {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  function toggleLang() {
    const next: Lang = lang === 'de' ? 'en' : 'de'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = T[lang]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <LandingNav
        lang={lang}
        onToggleLang={toggleLang}
        onLogin={() => { window.location.href = '/login' }}
        onStart={() => { window.location.href = '/register' }}
      />

      <main className="flex-1 pt-24 pb-20 px-5">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-block text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
            {t.back}
          </Link>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8642A' }}>{t.kicker}</p>
          <h1 className="text-3xl font-black mb-4" style={{ color: 'var(--color-text)' }}>{t.title}</h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>{t.lead}</p>

          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text)' }}>{t.worthTitle}</h2>
          <ul className="space-y-2 mb-8">
            {t.worth.map((item) => (
              <li key={item} className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)' }}>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text)' }}>{t.stepsTitle}</h2>
          <ol className="space-y-3 mb-8">
            {t.steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0" style={{ backgroundColor: '#E8642A', color: 'white' }}>{index + 1}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{step.title}</p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>{t.partsTitle}</h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>{t.parts}</p>

          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>{t.exampleTitle}</h2>
          <pre className="rounded-2xl p-4 text-xs overflow-x-auto mb-8" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)' }}>
            {EXAMPLE}
          </pre>

          <Link
            to="/workout"
            className="inline-block px-5 py-3 rounded-2xl font-bold text-sm text-white"
            style={{ backgroundColor: '#E8642A' }}
          >
            {t.app}
          </Link>
        </div>
      </main>
      <LandingFooter lang={lang} onToggleLang={toggleLang} />
    </div>
  )
}
