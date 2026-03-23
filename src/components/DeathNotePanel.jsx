import { useEffect, useState } from 'react'
import './DeathNotePanel.css'

const ENTRIES = [
  {
    id: 'NOISE',
    detail: 'Too much sound can bury conviction. Choose what matters.',
  },
  {
    id: 'DOUBT',
    detail: 'Doubt questions every move, but certainty writes the outcome.',
  },
  {
    id: 'FEAR',
    detail: 'Fear is loud before action and silent after commitment.',
  },
  {
    id: 'HESITATION',
    detail: 'The pause before decision decides whether power fades or rises.',
  },
  {
    id: 'EUPHORIA',
    detail: 'Victory without discipline becomes the next weakness.',
  },
]

const RAIL_POINTS = [
  { top: 8, x: 34 },
  { top: 28, x: 24 },
  { top: 50, x: 20 },
  { top: 72, x: 24 },
  { top: 92, x: 34 },
]

export default function DeathNotePanel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = ENTRIES[index]
  const wordClass =
    active.id.length >= 10
      ? 'mind-panel__word mind-panel__word--xl'
      : active.id.length >= 8
        ? 'mind-panel__word mind-panel__word--long'
        : 'mind-panel__word'
  const finalWordClass =
    active.id === 'HESITATION' ? `${wordClass} mind-panel__word--hesitation` : wordClass

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPaused(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % ENTRIES.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <section className="section mind-panel" aria-label="Mind panel">
      <p className="mind-panel__heading">I will Clear</p>
      <div className="mind-panel__shell">
        <div className="mind-panel__rail" aria-label="States">
          <svg className="mind-panel__arc" viewBox="0 0 120 520" aria-hidden="true">
            <path d="M96 8C40 70 28 170 28 260C28 350 40 450 96 512" />
          </svg>

          <div className="mind-panel__nodes">
            {ENTRIES.map((entry, i) => {
              const isActive = i === index
              return (
                <button
                  key={entry.id}
                  type="button"
                  className={`mind-panel__node${isActive ? ' is-active' : ''}`}
                  style={{
                    '--rail-pos': `${RAIL_POINTS[i].top}%`,
                    '--rail-x': `${RAIL_POINTS[i].x}%`,
                    top: `${RAIL_POINTS[i].top}%`,
                  }}
                  onClick={() => setIndex(i)}
                  aria-pressed={isActive}
                  aria-label={`Show ${entry.id}`}
                >
                  <span className="mind-panel__dot" aria-hidden="true" />
                  <span className="mind-panel__pill">{entry.id}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mind-panel__focus">
          <div className="mind-panel__ring" aria-hidden="true" />
          <div className="mind-panel__core">
            <p className="mind-panel__caption">One of the mind states</p>
            <p key={active.id} className={finalWordClass}>
              {active.id}
            </p>
            <p className="mind-panel__detail">{active.detail}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
