import robos from '../assets/robo.png'
import HeroDeathNoteTitle from './HeroDeathNoteTitle.jsx'
import HeroElectric from './HeroElectric.jsx'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
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
    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
                <span  aria-hidden="true">
                  <FaXTwitter className="hero__dn-link-icon" />
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
                <span  aria-hidden="true">
                  <FaTelegramPlane className="hero__dn-link-icon" />
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
