export default function HeroElectric() {
  return (
    <div className="hero__electric" aria-hidden="true">
      <svg
        className="hero__bolts-svg"
        viewBox="0 0 400 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-bolt-grad" x1="200" y1="0" x2="200" y2="720" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fff0f0" />
            <stop offset="55%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#c41e1e" />
          </linearGradient>
          <filter id="hero-bolt-bloom" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="hero-bolt hero-bolt--a" filter="url(#hero-bolt-bloom)">
          <path
            className="hero-bolt__path hero-bolt__path--main"
            pathLength="100"
            d="M 208 0 L 222 58 L 188 76 L 228 148 L 182 172 L 238 268 L 196 298 L 252 412 L 206 442 L 268 568 L 218 602 L 278 720"
            fill="none"
            stroke="url(#hero-bolt-grad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
          <path
            className="hero-bolt__path hero-bolt__path--fork"
            pathLength="100"
            d="M 228 148 L 268 178 L 248 232 L 288 278 L 262 318"
            fill="none"
            stroke="url(#hero-bolt-grad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.35"
            opacity="0.92"
          />
        </g>
        <g className="hero-bolt hero-bolt--b" filter="url(#hero-bolt-bloom)">
          <path
            className="hero-bolt__path hero-bolt__path--main"
            pathLength="100"
            d="M 62 32 L 78 108 L 48 128 L 92 218 L 52 242 L 102 348 L 62 372 L 118 498 L 78 528 L 138 648 L 95 688"
            fill="none"
            stroke="url(#hero-bolt-grad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            className="hero-bolt__path hero-bolt__path--fork"
            pathLength="100"
            d="M 92 218 L 128 248 L 108 302 L 145 352"
            fill="none"
            stroke="url(#hero-bolt-grad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.15"
            opacity="0.88"
          />
        </g>
        <g className="hero-bolt hero-bolt--c" filter="url(#hero-bolt-bloom)">
          <path
            className="hero-bolt__path hero-bolt__path--main"
            pathLength="100"
            d="M 338 0 L 318 78 L 348 98 L 302 188 L 328 218 L 278 318 L 302 352 L 258 468 L 282 505 L 232 628 L 258 672"
            fill="none"
            stroke="url(#hero-bolt-grad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
          />
          <path
            className="hero-bolt__path hero-bolt__path--fork"
            pathLength="100"
            d="M 328 218 L 352 268 L 328 318 L 358 368"
            fill="none"
            stroke="url(#hero-bolt-grad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.1"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  )
}
