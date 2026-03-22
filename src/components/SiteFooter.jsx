const LINKS = [
  { label: 'Trade on Padre', href: 'https://trade.padre.gg/rk/robo' },
  { label: 'Telegram — Robo Gems', href: 'https://t.me/robogems' },
  { label: 'Rektober', href: 'https://rektober.com' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="site-footer__brand">Robo</p>
          <p className="site-footer__owner">
            Owner:{' '}
            <a href="https://x.com/robo_pboc" target="_blank" rel="noopener noreferrer">
              @robo_pboc
            </a>
          </p>
        </div>
        <nav className="site-footer__links" aria-label="External links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="site-footer__disclaimer">
          <strong>Disclaimer:</strong> Nothing posted here is financial advice. Memecoins and prediction
          markets trading is risky. Always DYOR. Everything here is one person sharing their journey and
          thoughts — not a signal service and not investment guidance.
        </p>
      </div>
    </footer>
  )
}
