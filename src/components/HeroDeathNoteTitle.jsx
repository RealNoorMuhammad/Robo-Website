import { motion as Motion, useReducedMotion } from 'framer-motion'

const TITLE = 'Robo'

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
    y: 32,
    rotate: -7,
    scale: 0.88,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
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

  return (
    <div className="hero__dn-title-stack">
      <h1 className="hero__headline hero__headline--deathnote" aria-label="Robo">
        {reduceMotion ? (
          'Robo'
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
