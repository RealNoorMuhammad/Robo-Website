import heroDesktop from '../assets/desktop.jpeg'
import heroMobile from '../assets/mobile.png'
import robos from '../assets/robo1.jpeg'
import HeroElectric from './HeroElectric.jsx'
import './HeroSection.css'

const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 7) % 84)}%`,
  delay: `${(i * 0.35) % 5}s`,
  dur: `${5 + (i % 4)}s`,
  scale: 0.4 + (i % 3) * 0.25,
}))

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">
      <picture>
        <source media="(max-width: 899px)" srcSet={heroMobile} type="image/png" />
        <img
          className="hero__desk"
          src={heroDesktop}
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
        />
      </picture>

      <div className="hero__canvas" aria-hidden="true">
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

        <div className="hero__copy">
          <p className="hero__kicker">Exactly as planned</p>
          <h1 className="hero__headline">I am Justice.</h1>
          <p className="hero__owner">
            <span className="hero__owner-label">Owner</span>{' '}
            <a
              href="https://x.com/robo_pboc"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__owner-link"
            >
              @robo_pboc
            </a>
          </p>
          <p className="hero__lede">
            Robo — memecoins, prediction markets, and a public log of the journey. Cold, precise, never
            noise for the sake of it.
          </p>
          <div className="hero__actions">
            <a
              className="btn-cta"
              href="https://trade.padre.gg/rk/robo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enter the system
            </a>
            <a className="btn-ghost" href="#system">
              View layout
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
