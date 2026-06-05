import { useState } from 'react'
import './App.css'
import ProductDB from './components/ProductDB'
import QAGuide from './components/QAGuide'
import CustomerAnalysis from './components/CustomerAnalysis'

const TABS = [
  { id: 'db', label: 'Produktdatenbank', icon: 'ti-database' },
  { id: 'qa', label: 'Gesprächsführer', icon: 'ti-route' },
  { id: 'ai', label: 'Kundenrecherche', icon: 'ti-building-factory-2' },
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
          <div className="header-badge">v2.0</div>
        </div>
      </header>

      <nav className="app-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <i className={`ti ${t.icon}`} />
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">
        {tab === 'db' && <ProductDB />}
        {tab === 'qa' && <QAGuide />}
        {tab === 'ai' && <CustomerAnalysis />}
      </main>
    </div>
  )
}
