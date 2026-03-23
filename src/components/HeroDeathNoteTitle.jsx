import { useEffect, useRef } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'

const TITLE = 'ROBO'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.12,
    },
  },
}

const letter = {
  hidden: {
    opacity: 0,
    x: -90,
    y: 0,
    rotate: 0,
    scale: 0.58,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function HeroDeathNoteTitle() {
  const reduceMotion = useReducedMotion()
  const lineDelay = 0.12 + TITLE.length * 0.22 + 0.28
  const titleRef = useRef(null)

  useEffect(() => {
    if (reduceMotion || !titleRef.current) return

    let burstTween = null
    let nextBurstCall = null

    const ctx = gsap.context(() => {
      const el = titleRef.current
      if (!el) return

      // Keep a dramatic base look, then spike with short lightning flashes.
      gsap.set(el, {
        opacity: 1,
        textShadow:
          '0 1px 0 rgba(255, 255, 255, 0.02), 0 4px 0 rgba(0, 0, 0, 0.82), 0 10px 34px rgba(0, 0, 0, 0.86), 0 0 44px rgba(179, 18, 23, 0.42), 0 0 96px rgba(90, 8, 12, 0.3)',
      })

      const scheduleNextBurst = () => {
        const delay = gsap.utils.random(1.4, 3.6, 0.1)
        nextBurstCall = gsap.delayedCall(delay, playBurst)
      }

      const playBurst = () => {
        const flashes = gsap.utils.random(2, 5, 1)
        burstTween = gsap.timeline({ onComplete: scheduleNextBurst })

        for (let i = 0; i < flashes; i += 1) {
          const gap = gsap.utils.random(0.03, 0.14, 0.01)
          burstTween
            .to(
              el,
              {
                duration: gsap.utils.random(0.035, 0.06, 0.005),
                opacity: gsap.utils.random(0.38, 0.65, 0.01),
                textShadow:
                  '0 1px 0 rgba(255, 255, 255, 0.04), 0 4px 0 rgba(0, 0, 0, 0.85), 0 10px 32px rgba(0, 0, 0, 0.86), 0 0 28px rgba(255, 100, 110, 0.9), 0 0 56px rgba(255, 46, 46, 0.65), 0 0 110px rgba(179, 18, 23, 0.45)',
                ease: 'power1.in',
              },
              `+=${gap}`,
            )
            .to(el, {
              duration: gsap.utils.random(0.04, 0.08, 0.005),
              opacity: 1,
              textShadow:
                '0 1px 0 rgba(255, 255, 255, 0.02), 0 4px 0 rgba(0, 0, 0, 0.82), 0 10px 34px rgba(0, 0, 0, 0.86), 0 0 44px rgba(179, 18, 23, 0.42), 0 0 96px rgba(90, 8, 12, 0.3)',
              ease: 'power2.out',
            })
        }
      }

      scheduleNextBurst()
    }, titleRef)

    return () => {
      burstTween?.kill()
      nextBurstCall?.kill()
      ctx.revert()
    }
  }, [reduceMotion])

  return (
    <div className="hero__dn-title-stack">
      <h1 ref={titleRef} className="hero__headline hero__headline--deathnote" aria-label="ROBO">
        {reduceMotion ? (
          'ROBO'
        ) : (
          <Motion.span
            className="hero__dn-chars"
            variants={container}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
          >
            {TITLE.split('').map((ch, i) => (
              <Motion.span key={`${ch}-${i}`} className="hero__dn-char" variants={letter}>
                {ch}
              </Motion.span>
            ))}
          </Motion.span>
        )}
      </h1>
      {reduceMotion ? (
        <div className="hero__dn-inkline hero__dn-inkline--static" aria-hidden="true" />
      ) : (
        <Motion.div
          className="hero__dn-inkline"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: lineDelay,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
