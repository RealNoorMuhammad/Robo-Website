import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ROBO_TWEET_IDS } from '../data/roboTweetIds.js'
import './SystemSections.css'

const WIDGET_SCRIPT = 'https://platform.twitter.com/widgets.js'
const INITIAL_VISIBLE = 6
const LOAD_MORE = 3

let widgetsLoadPromise = null

function loadTwitterWidgets() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.twttr?.widgets) return Promise.resolve(window.twttr)
  if (widgetsLoadPromise) return widgetsLoadPromise

  widgetsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)
    if (existing) {
      if (window.twttr?.widgets) {
        resolve(window.twttr)
        return
      }
      existing.addEventListener('load', () => resolve(window.twttr))
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.src = WIDGET_SCRIPT
    script.async = true
    script.charset = 'utf-8'
    script.onload = () => resolve(window.twttr)
    script.onerror = () => reject(new Error('X widgets script failed to load'))
    document.body.appendChild(script)
  })

  return widgetsLoadPromise
}

export default function SystemSections() {
  const tweetIds = ROBO_TWEET_IDS
  const useTweetCards = tweetIds.length > 0
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL_VISIBLE, tweetIds.length),
  )

  const timelineHostRef = useRef(null)
  const hostRefs = useRef(new Map())

  const hasMore = visibleCount < tweetIds.length

  useLayoutEffect(() => {
    if (!useTweetCards) return undefined

    let cancelled = false
    const visible = tweetIds.slice(0, visibleCount)

    loadTwitterWidgets()
      .then((twttr) => {
        if (cancelled || !twttr?.widgets?.createTweet) return

        visible.forEach((id) => {
          const host = hostRefs.current.get(id)
          if (!host || host.dataset.tweetId === String(id)) return

          host.replaceChildren()
          twttr.widgets
            .createTweet(id, host, { theme: 'dark', dnt: true })
            .then(() => {
              if (!cancelled && host) host.dataset.tweetId = String(id)
            })
            .catch(() => {
              if (!cancelled && host) {
                host.removeAttribute('data-tweet-id')
                host.innerHTML =
                  '<p class="dn-feed-card__miss">This post could not be loaded. It may be deleted or unavailable.</p>'
              }
            })
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [useTweetCards, visibleCount, tweetIds])

  useEffect(() => {
    if (useTweetCards) return undefined

    let cancelled = false

    loadTwitterWidgets()
      .then((twttr) => {
        if (cancelled || !timelineHostRef.current || !twttr?.widgets?.load) return
        twttr.widgets.load(timelineHostRef.current)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [useTweetCards])

  const handleViewMore = () => {
    setVisibleCount((c) => Math.min(c + LOAD_MORE, tweetIds.length))
  }

  const visibleIds = tweetIds.slice(0, visibleCount)

  return (
    <section id="system" className="section system-x" aria-labelledby="system-heading">
      <header className="section__head system-x__head">
        <h2 id="system-heading" className="section__title">
          The apparatus
        </h2>
        <p className="section__lede system-x__lede">
          Latest from{' '}
          <a
            href="https://x.com/roboPBOC"
            target="_blank"
            rel="noopener noreferrer"
            className="system-x__handle"
          >
            @roboPBOC
          </a>
          {useTweetCards
            ? ' — three records per row; open the log for more.'
            : ' — timeline on the master sheet; add tweet IDs in src/data/roboTweetIds.js for separate cards.'}
        </p>
      </header>

      <div className={`dn-feed-grid${useTweetCards ? ' dn-feed-grid--tweets' : ''}`}>
        {useTweetCards ? (
          visibleIds.map((id, i) => (
            <article
              key={id}
              className="dn-feed-card"
              style={{ '--dn-card-i': String(i) }}
              aria-label={`Post ${i + 1}`}
            >
              <div className="dn-feed-card__glow" aria-hidden="true" />
              <div className="dn-feed-card__lines" aria-hidden="true" />
              <div className="dn-feed-card__rim" aria-hidden="true" />
              <p className="dn-feed-card__stamp">Record {String(i + 1).padStart(2, '0')}</p>
              <div
                ref={(el) => {
                  if (el) hostRefs.current.set(id, el)
                  else hostRefs.current.delete(id)
                }}
                className="dn-feed-card__host"
              />
            </article>
          ))
        ) : (
          <>
            <article className="dn-feed-card dn-feed-card--wide">
              <div className="dn-feed-card__glow" aria-hidden="true" />
              <div className="dn-feed-card__lines" aria-hidden="true" />
              <div className="dn-feed-card__rim" aria-hidden="true" />
              <p className="dn-feed-card__stamp dn-feed-card__stamp--gold">Execution log</p>
              <div ref={timelineHostRef} className="dn-feed-card__host dn-feed-card__host--timeline">
                <a
                  className="twitter-timeline"
                  data-theme="dark"
                  data-tweet-limit="20"
                  data-chrome="noborders transparent"
                  data-width="560"
                  href="https://twitter.com/roboPBOC"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View posts by @roboPBOC on X
                </a>
              </div>
              <p className="dn-feed-card__hint">
                Blocked? Open{' '}
                <a href="https://x.com/roboPBOC" target="_blank" rel="noopener noreferrer">
                  x.com/roboPBOC
                </a>
                .
              </p>
            </article>

            <article className="dn-feed-card dn-feed-card--seal">
              <div className="dn-feed-card__glow" aria-hidden="true" />
              <div className="dn-feed-card__lines" aria-hidden="true" />
              <div className="dn-feed-card__rim" aria-hidden="true" />
              <p className="dn-feed-card__rule">The human who writes here has already chosen a side.</p>
              <p className="dn-feed-card__seal-name">@roboPBOC</p>
              <a
                className="dn-feed-card__seal-link"
                href="https://x.com/roboPBOC"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open profile →
              </a>
            </article>

            <article className="dn-feed-card dn-feed-card--seal dn-feed-card--tilt-alt">
              <div className="dn-feed-card__glow" aria-hidden="true" />
              <div className="dn-feed-card__lines" aria-hidden="true" />
              <div className="dn-feed-card__rim" aria-hidden="true" />
              <p className="dn-feed-card__quote">“The real battle is fought within the mind.”</p>
              <p className="dn-feed-card__footnote">Notebook clause — symbolic, not literal.</p>
            </article>
          </>
        )}
      </div>

      {useTweetCards && (
        <div className="dn-feed-more-wrap">
          <button
            type="button"
            className="dn-feed-more"
            onClick={handleViewMore}
            disabled={!hasMore}
            aria-label={hasMore ? 'Load three more posts' : 'No more posts to load'}
          >
            View more
          </button>
        </div>
      )}
    </section>
  )
}
