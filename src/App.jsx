import { useState } from 'react'
import './App.css'
import ProductDB from './components/ProductDB'
import QAGuide from './components/QAGuide'
import CustomerAnalysis from './components/CustomerAnalysis'
import Hydrolar from './components/Hydrolar'
import Silane from './components/Silane'
import VisitReport from './components/VisitReport'
import MarketRadar from './components/MarketRadar'

const TABS = [
  { id: 'db',       label: 'Produktdatenbank', icon: 'ti-database' },
  { id: 'hydrolar', label: 'Hydrolar · COIM',  icon: 'ti-droplet-filled' },
  { id: 'silane',   label: 'Silane · SIL',     icon: 'ti-atom' },
  { id: 'qa',       label: 'Gesprächsführer',  icon: 'ti-route' },
  { id: 'ai',       label: 'Kundenrecherche',  icon: 'ti-building-factory-2' },
  { id: 'visit',    label: 'Besuchsbericht',   icon: 'ti-clipboard-text' },
  { id: 'market',   label: 'Markt & Trends',   icon: 'ti-trending-up' },
]

export default function App() {
  const [tab, setTab] = useState('db')

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">
            <i className="ti ti-molecule" />
          </div>
          <div>
            <div className="header-title">
              CASE<span className="dot">·</span>IQ
              <span style={{fontWeight:300, fontSize:'13px', marginLeft:'8px', opacity:0.75}}>Sales Intelligence Tool</span>
            </div>
            <div className="header-sub">by Branko Premužak · CASE & Industrial Specialties</div>
          </div>
        </div>
        <div className="header-right">
          <div className="header-badge">v2.4</div>
        </div>
      </header>

      <nav className="app-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? 'active' : ''} ${t.id === 'hydrolar' ? 'nav-btn-hydrolar' : ''} ${t.id === 'silane' ? 'nav-btn-silane' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <i className={`ti ${t.icon}`} />
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">
        {tab === 'db'       && <ProductDB />}
        {tab === 'hydrolar' && <Hydrolar />}
        {tab === 'silane'   && <Silane />}
        {tab === 'qa'       && <QAGuide />}
        {tab === 'ai'       && <CustomerAnalysis />}
        {tab === 'visit'    && <VisitReport />}
        {tab === 'market'   && <MarketRadar />}
      </main>
    </div>
  )
}
