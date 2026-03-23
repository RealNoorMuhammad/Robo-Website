import { useEffect, useState } from 'react'

const NAMES = ['DOUBT', 'NOISE', 'FEAR', 'HESITATION', 'EUPHORIA']

export default function DeathNotePanel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

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
      setIndex((n) => (n + 1) % NAMES.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <section className="section" aria-label="Notebook panel">
      <div className="dn-panel-wrap">
        <div className="dn-panel">
          <div className="dn-panel__lines" aria-hidden="true" />
          <div className="dn-panel__inner">
            <p className="dn-panel__rule">The human who sees this page has already chosen a side.</p>
            <div className="dn-panel__name-slot">
              <p
                key={paused ? 'static' : NAMES[index]}
                className={`dn-panel__name${paused ? ' dn-panel__name--static' : ''}`}
              >
                {NAMES[paused ? 0 : index]}
              </p>
            </div>
            <p className="dn-panel__footnote">
              “The real battle is fought within the mind.”
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
