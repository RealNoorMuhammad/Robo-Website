const CARDS = [
  {
    label: 'Protocol',
    title: 'Judgment System',
    text: 'Cold rules, clear outcomes. Track the thesis, cut the noise, execute when the edge is real.',
  },
  {
    label: 'Intent',
    title: 'Write a Name',
    text: 'Define the trade before the chart defines you. Names on the page fade when discipline wins.',
  },
  {
    label: 'Stack',
    title: 'Control Panel',
    text: 'Links, risk caps, and journal logic — one place to steer instead of react.',
  },
  {
    label: 'Archive',
    title: 'Execution Log',
    text: 'History without mythology. What worked, what bled, and what never gets repeated.',
  },
]

export default function SystemSections() {
  return (
    <section id="system" className="section" aria-labelledby="system-heading">
      <header className="section__head">
        <h2 id="system-heading" className="section__title">
          The apparatus
        </h2>
        <p className="section__lede">
          Minimal surface, sharp contrast. A layout for someone who treats markets like a system —
          not a slot machine.
        </p>
      </header>
      <div className="card-grid">
        {CARDS.map((c) => (
          <article key={c.title} className="sys-card">
            <p className="sys-card__label">{c.label}</p>
            <h3 className="sys-card__title">{c.title}</h3>
            <p className="sys-card__text">{c.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
