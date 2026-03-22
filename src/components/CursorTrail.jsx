import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqCoarse = window.matchMedia('(pointer: coarse)')
    if (mqReduce.matches || mqCoarse.matches) return

    let raf = 0
    let x = -100
    let y = -100

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`
          raf = 0
        })
      }
      el.classList.add('is-active')
    }

    const onLeave = () => {
      el.classList.remove('is-active')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-trail" aria-hidden="true" />
}
