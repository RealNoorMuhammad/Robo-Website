const TITLE = 'ROBO'

export default function HeroDeathNoteTitle() {
  return (
    <div className="hero__dn-title-stack">
      <h1 className="hero__headline hero__headline--deathnote" aria-label="ROBO">
        <span className="hero__dn-chars" aria-hidden="true">
          {TITLE.split('').map((ch, i) => (
            <span key={`${ch}-${i}`} className="hero__dn-char">
              {ch}
            </span>
          ))}
        </span>
      </h1>
      <div className="hero__dn-inkline hero__dn-inkline--static" aria-hidden="true" />
    </div>
  )
}
