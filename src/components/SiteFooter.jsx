const LINKS = [
  { label: 'Trade on Padre', href: 'https://trade.padre.gg/rk/robo' },
  { label: 'Telegram — Robo Gems', href: 'https://t.me/robogems' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer site-footer--deathnote">
      <div className="site-footer__ambient" aria-hidden="true" />
      <div className="site-footer__notebook" aria-hidden="true" />
      <div className="site-footer__rim" aria-hidden="true" />

      <div className="site-footer__grid">
        <div className="site-footer__col site-footer__col--brand">
          <p className="site-footer__brand">Robo</p>
          <p className="site-footer__owner">
            Owner:{' '}
            <a href="https://x.com/roboPBOC" target="_blank" rel="noopener noreferrer">
              @roboPBOC
            </a>
          </p>
        </div>

        <nav className="site-footer__links" aria-label="External links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              <span className="site-footer__link-glow" aria-hidden="true" />
              <span className="site-footer__link-inner">{l.label}</span>
            </a>
          ))}
        </nav>

        <p className="site-footer__disclaimer">
          <span className="site-footer__disclaimer-lines" aria-hidden="true" />
          <span className="site-footer__disclaimer-body">
            <strong>Disclaimer:</strong> Nothing posted here is financial advice. Memecoins and prediction
            markets trading is risky. Always DYOR. Everything here is one person sharing their journey and
            thoughts — not a signal service and not investment guidance.
          </span>
        </p>
      </div>
    </footer>
  )
}
