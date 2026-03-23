import './DeathNoteDivider.css'

export default function DeathNoteDivider() {
  return (
    <div className="dn-divider" role="presentation" aria-hidden="true">
      <div className="dn-divider__vignette" />
      <div className="dn-divider__notebook" />

      <div className="dn-divider__row">
        <div className="dn-divider__shaft dn-divider__shaft--left">
          <span className="dn-divider__shimmer" />
        </div>

        <div className="dn-divider__seal">
          <div className="dn-divider__seal-ring dn-divider__seal-ring--outer" />
          <div className="dn-divider__seal-ring dn-divider__seal-ring--inner" />
          <div className="dn-divider__seal-core">
            <span className="dn-divider__glyph" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="dn-divider__svg">
                <path
                  className="dn-divider__stroke"
                  d="M24 6v36M14 14l20 20M34 14L14 34"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <circle className="dn-divider__pulse-dot" cx="24" cy="24" r="3" fill="currentColor" />
              </svg>
            </span>
            <p className="dn-divider__tagline">Exactly as planned</p>
          </div>
        </div>

        <div className="dn-divider__shaft dn-divider__shaft--right">
          <span className="dn-divider__shimmer" />
        </div>
      </div>


    </div>
  )
}
