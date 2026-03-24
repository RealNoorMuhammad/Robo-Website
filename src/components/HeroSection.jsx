import robos from '../assets/robo.png'
import HeroDeathNoteTitle from './HeroDeathNoteTitle.jsx'
import HeroElectric from './HeroElectric.jsx'
import './HeroSection.css'

const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 7) % 84)}%`,
  delay: `${(i * 0.35) % 5}s`,
  dur: `${5 + (i % 4)}s`,
  scale: 0.4 + (i % 3) * 0.25,
}))

const SMOKE_PLUMES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${-16 + i * 11}%`,
  delay: `${(i * 0.75) % 8}s`,
  dur: `${16 + (i % 5) * 2.6}s`,
  size: `${30 + (i % 6) * 7}vw`,
}))

export default function HeroSection() {
  const handleArrowClick = () => {
    const nextSection = document.querySelector('.app__below-divider')
    if (!nextSection) return
    nextSection.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__canvas" aria-hidden="true">
        <div className="hero__void" />
        <div className="hero__smoke-bed" />
        <div className="hero__smoke-shroud" />
        <div className="hero__smoke-veil hero__smoke-veil--a" />
        <div className="hero__smoke-veil hero__smoke-veil--b" />
        <div className="hero__smoke-veil hero__smoke-veil--c" />
        {SMOKE_PLUMES.map((plume) => (
          <span
            key={plume.id}
            className="hero__smoke-plume"
            style={{
              left: plume.left,
              width: plume.size,
              height: plume.size,
              animationDelay: plume.delay,
              animationDuration: plume.dur,
            }}
          />
        ))}
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__glow hero__glow--c" />
        <div className="hero__noise" />
        {SPARKS.map((s) => (
          <span
            key={s.id}
            className="hero__spark"
            style={{
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.dur,
              '--spark-scale': String(s.scale),
            }}
          />
        ))}
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <HeroElectric />

      <div className="hero__vignette" aria-hidden="true" />

      <div className="hero__grid">
        <div className="hero__copy">
          <HeroDeathNoteTitle />
          <p className="hero__summary">
            I put faith in my own convictions as to what I believe is right and consider them to be righteous.
          </p>
          <div className="hero__actions">
            <a
              className="hero__dn-link hero__dn-link--x"
              href="https://x.com/roboPBOC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero__dn-link-glow" aria-hidden="true" />
              <span className="hero__dn-link-inner">
                <span className="hero__dn-link-icon-wrap" aria-hidden="true">
                  <svg className="hero__dn-link-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="currentColor"
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </span>
                <span className="hero__dn-link-label">Follow on X</span>
              </span>
            </a>
            <a
              className="hero__dn-link hero__dn-link--telegram"
              href="https://t.me/robogems"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero__dn-link-glow" aria-hidden="true" />
              <span className="hero__dn-link-inner">
                <span className="hero__dn-link-icon-wrap" aria-hidden="true">
                  <svg className="hero__dn-link-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
                    />
                  </svg>
                </span>
                <span className="hero__dn-link-label">Join Telegram</span>
              </span>
            </a>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__media-frame">
            <img
              className="hero__robos"
              src={robos}
              alt="Robo"
              width={640}
              height={800}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll-arrow"
        onClick={handleArrowClick}
        aria-label="Scroll down"
      >
        <span className="hero__scroll-arrow-core" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.2L5.3 10.5l1.4-1.4 5.3 5.3 5.3-5.3 1.4 1.4L12 17.2z" fill="currentColor" />
          </svg>
        </span>
      </button>
    </section>
  )
}
