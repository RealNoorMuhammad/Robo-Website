import { useEffect, useMemo, useState } from 'react'
import fallbackTweets from '../data/latestTweets.json'
import './LatestTweetsSection.css'

const X_HANDLE = 'roboPBOC'
const X_PROFILE = `https://x.com/${X_HANDLE}`

function tweetPermalink(id) {
  return `https://x.com/${X_HANDLE}/status/${id}`
}

function formatNotebookDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()
}

function formatRelative(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const sec = Math.round((d.getTime() - Date.now()) / 1000)
  const abs = Math.abs(sec)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  if (abs < 60) return rtf.format(Math.round(sec / 1), 'second')
  if (abs < 3600) return rtf.format(Math.round(sec / 60), 'minute')
  if (abs < 86400) return rtf.format(Math.round(sec / 3600), 'hour')
  if (abs < 604800) return rtf.format(Math.round(sec / 86400), 'day')
  if (abs < 2629800) return rtf.format(Math.round(sec / 604800), 'week')
  return rtf.format(Math.round(sec / 2629800), 'month')
}

function normalizeTweets(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((t) => t && typeof t.text === 'string' && t.text.trim())
    .map((t) => ({
      id: String(t.id ?? ''),
      text: t.text.trim(),
      createdAt: typeof t.createdAt === 'string' ? t.createdAt : new Date().toISOString(),
    }))
    .slice(0, 12)
}

export default function LatestTweetsSection() {
  const [tweets, setTweets] = useState(() => normalizeTweets(fallbackTweets))
  const [status, setStatus] = useState('idle')

  const sourceUrl = import.meta.env.VITE_TWEETS_JSON_URL

  useEffect(() => {
    if (!sourceUrl || !sourceUrl.trim()) {
      setStatus('fallback')
      return
    }

    let cancelled = false
    setStatus('loading')

    fetch(sourceUrl.trim(), { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const next = normalizeTweets(data)
        if (next.length) {
          setTweets(next)
          setStatus('live')
        } else {
          setTweets(normalizeTweets(fallbackTweets))
          setStatus('empty')
        }
      })
      .catch(() => {
        if (cancelled) return
        setTweets(normalizeTweets(fallbackTweets))
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [sourceUrl])

  const profileLine = useMemo(
    () => (
      <a className="x-feed__profile" href={X_PROFILE} target="_blank" rel="noopener noreferrer">
        @{X_HANDLE}
      </a>
    ),
    [],
  )

  return (
    <section id="feed" className="x-feed section" aria-labelledby="x-feed-heading">
      <header className="section__head x-feed__head">
        <p className="x-feed__kicker">Field log · X</p>
        <h2 id="x-feed-heading" className="section__title x-feed__title">
          Pages written in real time
        </h2>
        <p className="section__lede x-feed__lede">
          Latest lines from {profileLine}. Cards pull from{' '}
          <code className="x-feed__code">latestTweets.json</code> unless{' '}
          <code className="x-feed__code">VITE_TWEETS_JSON_URL</code> is set to a JSON array of{' '}
          <code className="x-feed__code">id</code>, <code className="x-feed__code">text</code>,{' '}
          <code className="x-feed__code">createdAt</code>.
        </p>
        {status === 'loading' && <p className="x-feed__status x-feed__status--load">Syncing…</p>}
        {status === 'error' && (
          <p className="x-feed__status x-feed__status--warn">Remote feed unavailable — showing local pages.</p>
        )}
        {status === 'empty' && (
          <p className="x-feed__status x-feed__status--warn">Remote feed empty — showing local pages.</p>
        )}
      </header>

      <div className="x-feed__grid">
        {tweets.map((t, i) => (
          <article
            key={`${t.id}-${i}`}
            className="x-feed__card"
            style={{ '--x-feed-i': String(i) }}
          >
            <div className="x-feed__card-lines" aria-hidden="true" />
            <div className="x-feed__card-inner">
              <div className="x-feed__card-meta">
                <span className="x-feed__card-stamp">ENTRY</span>
                <time className="x-feed__card-date" dateTime={t.createdAt}>
                  {formatNotebookDate(t.createdAt)}
                </time>
                <span className="x-feed__card-relative">{formatRelative(t.createdAt)}</span>
              </div>
              <p className="x-feed__card-text">{t.text}</p>
              <a
                className="x-feed__card-link"
                href={tweetPermalink(encodeURIComponent(t.id))}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on X
                <span className="x-feed__card-link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
            <div className="x-feed__card-glow" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}
