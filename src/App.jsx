import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DeathNoteDivider from './components/DeathNoteDivider.jsx'
import DeathNotePanel from './components/DeathNotePanel.jsx'
import HeroSection from './components/HeroSection.jsx'
import LatestTweetsSection from './components/LatestTweetsSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'

import './App.css'

function App() {
  const appRef = useRef(null)

  useEffect(() => {
    if (!appRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.set(
        [
          '.hero__copy',
          '.hero__media-frame',
          '.dn-divider',
          '.dn-tweets__head',
          '.dn-tweets__slide',
          '.mind-panel__shell',
          '.site-footer__grid',
        ],
        { willChange: 'transform, opacity' },
      )

      // Smooth scroll reveals across major blocks.
      gsap.utils.toArray('.section, .dn-divider, .site-footer__grid').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 56, filter: 'blur(7px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      // Hero parallax depth on scroll.
      gsap.to('.hero__copy', {
        y: 36,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.to('.hero__media-frame', {
        y: -48,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      // Subtle up/down "living" motion.
      gsap.to('.hero__media-frame', {
        y: '+=10',
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to('.dn-divider__seal-core', {
        y: '+=8',
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to('.dn-tweets__card', {
        y: '+=6',
        duration: 2.4,
        ease: 'sine.inOut',
        stagger: {
          each: 0.12,
          repeat: -1,
          yoyo: true,
        },
      })

      gsap.to('.mind-panel__core', {
        y: '+=7',
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, appRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={appRef} className="app">
      <HeroSection />
    
      <div className="app__below-divider">
        <LatestTweetsSection />
        <DeathNotePanel />
        <SiteFooter />
      </div>
    </div>
  )
}

export default App
