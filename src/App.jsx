import DeathNotePanel from './components/DeathNotePanel.jsx'
import DontMissCall from './components/DontMissCall.jsx'
import HeroSection from './components/HeroSection.jsx'
import LatestTweetsSection from './components/LatestTweetsSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'

import './App.css'

function App() {
  return (
    <div className="app">
      <HeroSection />

      <div className="app__below-divider">
        <LatestTweetsSection />
    
        <DontMissCall />
        <SiteFooter />
      </div>
    </div>
  )
}

export default App
