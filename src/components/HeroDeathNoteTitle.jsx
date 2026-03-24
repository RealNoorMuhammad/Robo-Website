import { motion, useReducedMotion } from 'motion/react'

const TITLE = 'ROBO'

export default function HeroDeathNoteTitle() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="hero__dn-title-stack">
      <h1 className="hero__headline hero__headline--deathnote" aria-label="ROBO">
        <span className="hero__dn-chars" aria-hidden="true">
          {TITLE.split('').map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="hero__dn-char"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: '0.28em', filter: 'blur(10px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: reduceMotion ? 0 : i * 0.1,
                duration: reduceMotion ? 0 : 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      </h1>
      <div className="hero__dn-inkline hero__dn-inkline--static" aria-hidden="true" />
    </div>
  )
}
