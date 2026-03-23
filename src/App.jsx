import CursorTrail from './components/CursorTrail.jsx'
import DeathNoteDivider from './components/DeathNoteDivider.jsx'
import DeathNoteNavbar from './components/DeathNoteNavbar.jsx'
import DeathNotePanel from './components/DeathNotePanel.jsx'
import HeroSection from './components/HeroSection.jsx'
import LatestTweetsSection from './components/LatestTweetsSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'

import './App.css'

function App() {
  return (
    <div className="app">
      <DeathNoteNavbar />
      <CursorTrail />
      <HeroSection />
      <DeathNoteDivider />
      <div className="app__below-divider">
        <LatestTweetsSection />
        <DeathNotePanel />
        <SiteFooter />
      </div>
    </div>
  )
}

export default App
