import CursorTrail from './components/CursorTrail.jsx'
import DeathNoteDivider from './components/DeathNoteDivider.jsx'
import DeathNotePanel from './components/DeathNotePanel.jsx'
import HeroSection from './components/HeroSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SystemSections from './components/SystemSections.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <CursorTrail />
      <HeroSection />
      <DeathNoteDivider />
      <div className="app__below-divider">
        <SystemSections />
        <DeathNotePanel />
        <SiteFooter />
      </div>
    </div>
  )
}

export default App
