import './DontMissCall.css'
import './HeroSection.css'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function DontMissCall() {
  return (
    <section className="dont-miss-call section" aria-labelledby="dont-miss-heading">
      <div className="dont-miss-call__inner">
        <h2 id="dont-miss-heading" className="dont-miss-call__title">
          Don&apos;t Miss A Call
        </h2>
        <p className="dont-miss-call__lede">
          Follow{' '}
          <a
            className="dont-miss-call__handle"
            href="https://x.com/roboPBOC"
            target="_blank"
            rel="noopener noreferrer"
          >
            @roboPBOC
          </a>{' '}
          on X for real-time analysis, and join the Telegram channel to follow my journey and see the memecoins I have conviction in.
        </p>
        <div className="dont-miss-call__actions">
          <a
            className="hero__dn-link hero__dn-link--x"
            href="https://x.com/roboPBOC"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hero__dn-link-glow" aria-hidden="true" />
            <span className="hero__dn-link-inner">
              <span className="hero__dn-link-icon-wrap" aria-hidden="true">
                <FaXTwitter className="hero__dn-link-icon" />
              </span>
              <span className="hero__dn-link-label">Follow on X</span>
            </span>
          </a>
          <a
            className="hero__dn-link hero__dn-link--telegram"
            href="https://t.me/robogems"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hero__dn-link-glow" aria-hidden="true" />
            <span className="hero__dn-link-inner">
              <span className="hero__dn-link-icon-wrap" aria-hidden="true">
                <FaTelegramPlane className="hero__dn-link-icon" />
              </span>
              <span className="hero__dn-link-label">Join Telegram</span>
            </span>
          </a>
          
        </div>
      </div>
    </section>
  )
}
