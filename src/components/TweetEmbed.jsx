import { useEffect, useRef, useState } from 'react'
import { ensureTwitterWidgets } from '../lib/ensureTwitterWidgets.js'

export default function TweetEmbed({ tweetId }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const el = containerRef.current
    if (!el || !tweetId) return undefined

    let cancelled = false
    el.innerHTML = ''
    setStatus('loading')

    ensureTwitterWidgets()
      .then((tw) => {
        if (cancelled || !containerRef.current) return null
        return tw.widgets.createTweet(String(tweetId), containerRef.current, {
          theme: 'dark',
          dnt: true,
          conversation: 'none',
        })
      })
      .then((widget) => {
        if (cancelled) return
        if (widget) setStatus('done')
        else setStatus('error')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [tweetId])

  const href = `https://x.com/i/status/${tweetId}`

  return (
    <div className="dn-tweets__embed-inner">
      <div
        ref={containerRef}
        className="dn-tweets__embed-mount"
        data-embed-status={status}
        aria-busy={status === 'loading' ? 'true' : 'false'}
      />
      {status === 'loading' && (
        <div className="dn-tweets__embed-skeleton" aria-hidden="true">
          <span className="dn-tweets__embed-skeleton-line" />
          <span className="dn-tweets__embed-skeleton-line" />
          <span className="dn-tweets__embed-skeleton-line dn-tweets__embed-skeleton-line--short" />
        </div>
      )}
      {status === 'error' && (
        <div className="dn-tweets__embed-fallback">
          <p className="dn-tweets__embed-fallback-text">
            X did not load here — often blocked by a privacy extension or network. Open the post on X, or allow
            scripts from <span className="dn-tweets__mono">platform.twitter.com</span>.
          </p>
          <a className="dn-tweets__embed-fallback-link" href={href} target="_blank" rel="noopener noreferrer">
            View post on X →
          </a>
        </div>
      )}
    </div>
  )
}
