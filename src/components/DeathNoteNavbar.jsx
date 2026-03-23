import { useCallback, useEffect, useRef, useState } from 'react'
import kyrieSrc from './Kyrie.mp3'
import './DeathNoteNavbar.css'

export default function DeathNoteNavbar() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    return () => {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnded)
    }
  }, [])

  const toggle = useCallback(async () => {
    const a = audioRef.current
    if (!a) return
    try {
      if (a.paused) await a.play()
      else a.pause()
    } catch {
      // Missing file, autoplay policy, or decode error
    }
  }, [])

  return (
    <header className="dn-navbar" role="banner">
      <audio ref={audioRef} src={kyrieSrc} preload="metadata" loop />
      <div className="dn-navbar__rim" aria-hidden="true" />
      <div className="dn-navbar__lines" aria-hidden="true" />
      <div className="dn-navbar__ambient" aria-hidden="true" />
      <div className="dn-navbar__vignette" aria-hidden="true" />

      <div className="dn-navbar__inner">
        <button
          type="button"
          className={`dn-navbar__player${playing ? ' is-playing' : ''}`}
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          <span className="dn-navbar__player-bloom" aria-hidden="true" />
          <span className={`dn-navbar__player-ring${playing ? ' is-active' : ''}`} aria-hidden="true" />
          <span className="dn-navbar__player-disc" aria-hidden="true">
            <span className="dn-navbar__player-groove" />
            <span className="dn-navbar__player-hub" />
          </span>
          <span className="dn-navbar__player-icon" aria-hidden="true">
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6.5v11l9-5.5L9 6.5z" />
              </svg>
            )}
          </span>
          <span className="dn-navbar__eq" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`dn-navbar__eq-bar${playing ? ' is-active' : ''}`}
                style={{ '--dn-eq-i': String(i) }}
              />
            ))}
          </span>
        </button>
      </div>
    </header>
  )
}
