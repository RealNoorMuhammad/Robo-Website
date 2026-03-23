import { useEffect, useMemo, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ROBO_TWEET_IDS } from '../data/roboTweetIds.js'
import TweetEmbed from './TweetEmbed.jsx'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './LatestTweetsSection.css'

const ROBO_HANDLE = 'roboPBOC'
const ROBO_SOURCES = [
  'https://r.jina.ai/http://x.com/roboPBOC',
  'https://r.jina.ai/http://twitter.com/roboPBOC',
  'https://r.jina.ai/http://x.com/roboPBOC/media',
  'https://r.jina.ai/http://x.com/roboPBOC/with_replies',
  'https://r.jina.ai/http://x.com/roboPBOC/highlights',
]
const ROBO_STATUS_RE = new RegExp(`${ROBO_HANDLE}/status/(\\d+)`, 'g')

function parseEnvIds() {
  const raw = import.meta.env.VITE_TWEET_IDS?.trim()
  if (!raw) return null
  const parts = raw.split(/[\s,]+/).filter(Boolean)
  return parts.length ? parts : null
}

function sortTweetIds(ids) {
  return [...new Set(ids.map(String))].sort((a, b) => {
    try {
      if (BigInt(a) < BigInt(b)) return 1
      if (BigInt(a) > BigInt(b)) return -1
      return 0
    } catch {
      return 0
    }
  })
}

async function fetchLatestRoboTweetIds(signal) {
  const found = []
  const seen = new Set()

  for (const url of ROBO_SOURCES) {
    const response = await fetch(url, { signal })
    if (!response.ok) continue
    const text = await response.text()

    for (const match of text.matchAll(ROBO_STATUS_RE)) {
      const id = match[1]
      if (!id || seen.has(id)) continue
      seen.add(id)
      found.push(id)
    }
  }

  return sortTweetIds(found)
}

export default function LatestTweetsSection() {
  const envTweetIds = useMemo(() => parseEnvIds(), [])

  const [tweetIds, setTweetIds] = useState(() => sortTweetIds(envTweetIds ?? ROBO_TWEET_IDS))

  useEffect(() => {
    if (envTweetIds?.length) return undefined

    let mounted = true
    const controller = new AbortController()

    fetchLatestRoboTweetIds(controller.signal)
      .then((ids) => {
        if (!mounted || !ids.length) return
        setTweetIds(ids)
      })
      .catch(() => {
        // Keep current fallback IDs when external fetch is unavailable.
      })

    return () => {
      mounted = false
      controller.abort()
    }
  }, [envTweetIds])

  return (
    <section id="notebook-feed" className="dn-tweets section" aria-label="X posts">
      <div className="dn-tweets__head dn-tweets__head--minimal">
        <p className="dn-tweets__kicker">Latest Tweets from Robo</p>
        <div className="dn-tweets__nav-group" aria-label="Tweets navigation">
          <button className="dn-tweets__nav dn-tweets__nav--prev" type="button" aria-label="Previous tweets">
            &#8249;
          </button>
          <button className="dn-tweets__nav dn-tweets__nav--next" type="button" aria-label="Next tweets">
            &#8250;
          </button>
        </div>
      </div>

      <div className="dn-tweets__slider-wrap">
        <Swiper
          modules={[Pagination, Navigation]}
          className="dn-tweets__slider"
          spaceBetween={18}
          slidesPerView={1}
          loop={tweetIds.length > 3}
          allowTouchMove={true}
          simulateTouch={true}
          grabCursor={true}
          touchRatio={1.1}
          touchStartPreventDefault={false}
          touchMoveStopPropagation={false}
          touchEventsTarget="container"
          navigation={{
            prevEl: '.dn-tweets__nav--prev',
            nextEl: '.dn-tweets__nav--next',
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            680: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {tweetIds.map((id) => (
            <SwiperSlide key={id} className="dn-tweets__slide">
              <div className="dn-tweets__cell">
                <div className="dn-tweets__card">
                  <div className="dn-tweets__card-ornament" aria-hidden="true">
                    <span className="dn-tweets__seal" />
                    <span className="dn-tweets__scratch" />
                  </div>
                  <div className="dn-tweets__card-lines" aria-hidden="true" />
                  <div className="dn-tweets__embed-wrap">
                    <TweetEmbed tweetId={id} />
                  </div>
                  <div className="dn-tweets__card-glow" aria-hidden="true" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
