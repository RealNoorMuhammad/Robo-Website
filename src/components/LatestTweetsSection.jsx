import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ROBO_TWEET_IDS } from '../data/roboTweetIds.js'
import TweetEmbed from './TweetEmbed.jsx'
import './LatestTweetsSection.css'

const INITIAL_COUNT = 6
const LOAD_MORE = 3

function parseEnvIds() {
  const raw = import.meta.env.VITE_TWEET_IDS?.trim()
  if (!raw) return null
  const parts = raw.split(/[\s,]+/).filter(Boolean)
  return parts.length ? parts : null
}

export default function LatestTweetsSection() {
  const reduceMotion = useReducedMotion()
  const headRef = useRef(null)
  const btnRef = useRef(null)

  const tweetIds = useMemo(() => {
    const fromEnv = parseEnvIds()
    const raw = fromEnv ?? ROBO_TWEET_IDS
    const unique = [...new Set(raw.map(String))]
    return unique.sort((a, b) => {
      try {
        if (BigInt(a) < BigInt(b)) return 1
        if (BigInt(a) > BigInt(b)) return -1
        return 0
      } catch {
        return 0
      }
    })
  }, [])

  const [visibleCount, setVisibleCount] = useState(() => Math.min(INITIAL_COUNT, tweetIds.length))

  const visibleIds = useMemo(() => tweetIds.slice(0, visibleCount), [tweetIds, visibleCount])
  const canShowMore = visibleCount < tweetIds.length

  useEffect(() => {
    if (reduceMotion || !headRef.current) return
    const el = headRef.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.dn-tweets__anim-line'),
        { scaleX: 0, opacity: 0.3 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.05,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        },
      )
    }, headRef)
    return () => ctx.revert()
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion || !btnRef.current) return
    const btn = btnRef.current
    const onEnter = () => {
      gsap.to(btn, {
        boxShadow: '0 0 28px rgba(179, 18, 23, 0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
        duration: 0.35,
        ease: 'power2.out',
      })
    }
    const onLeave = () => {
      gsap.to(btn, {
        boxShadow: '0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
        duration: 0.45,
        ease: 'power2.out',
      })
    }
    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [reduceMotion])

  const onShowMore = useCallback(() => {
    setVisibleCount((n) => Math.min(n + LOAD_MORE, tweetIds.length))
  }, [tweetIds.length])

  return (
    <section id="notebook-feed" className="dn-tweets section" aria-label="X posts">
      <div ref={headRef} className="dn-tweets__head dn-tweets__head--minimal">
        <p className="dn-tweets__kicker">Death Note · Field transmission</p>
        <div className="dn-tweets__rule-lines" aria-hidden="true">
          <span className="dn-tweets__anim-line" />
          <span className="dn-tweets__anim-line dn-tweets__anim-line--short" />
        </div>
      </div>

      <div className="dn-tweets__grid">
        {visibleIds.map((id, i) => (
          <Motion.div
            key={id}
            className="dn-tweets__cell"
            initial={reduceMotion ? false : { opacity: 0, y: 28, rotateX: -6 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 22,
              delay: reduceMotion ? 0 : Math.min(i * 0.06, 0.42),
            }}
          >
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
          </Motion.div>
        ))}
      </div>

      {canShowMore && (
        <Motion.div
          className="dn-tweets__actions"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            ref={btnRef}
            type="button"
            className="dn-tweets__more"
            onClick={onShowMore}
          >
            <span className="dn-tweets__more-inner">
              <span className="dn-tweets__more-text">View more</span>
              <span className="dn-tweets__more-glyph" aria-hidden="true">
                ✎
              </span>
            </span>
          </button>
        </Motion.div>
      )}
    </section>
  )
}
