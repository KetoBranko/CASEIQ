import { useState, useRef, useEffect } from 'react'
import './App.css'
import ProductDB from './components/ProductDB'
import QAGuide from './components/QAGuide'
import CustomerAnalysis from './components/CustomerAnalysis'
import Hydrolar from './components/Hydrolar'
import Silane from './components/Silane'
import SIGroup from './components/SIGroup'
import Necarbo from './components/Necarbo'
import VisitReport from './components/VisitReport'
import MarketRadar from './components/MarketRadar'
import PetroNetwork from './components/PetroNetwork'

const PRINCIPALS = [
  { id: 'hydrolar', label: 'Hydrolar · COIM', icon: 'ti-droplet-filled' },
  { id: 'silane',   label: 'Silane · SIL',    icon: 'ti-atom' },
  { id: 'sigroup',  label: 'SI Group',        icon: 'ti-flask' },
  { id: 'necarbo',  label: 'Necarbo',         icon: 'ti-palette' },
]

const TABS = [
  { id: 'db',        label: 'Produktdatenbank', icon: 'ti-database' },
  { id: 'principals', label: 'Principals',      icon: 'ti-building-factory' },
  { id: 'qa',        label: 'Gesprächsführer',  icon: 'ti-route' },
  { id: 'ai',        label: 'Kundenrecherche',  icon: 'ti-building-factory-2' },
  { id: 'visit',     label: 'Besuchsbericht',   icon: 'ti-clipboard-text' },
  { id: 'market',    label: 'Markt & Trends',   icon: 'ti-trending-up' },
  { id: 'network',   label: 'Rohstoff-Netzwerk', icon: 'ti-network' },
]

export default function App() {
  const [tab, setTab] = useState('db')
  const [principalTab, setPrincipalTab] = useState('hydrolar')
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const menuRef = useRef(null)
  const aboutRef = useRef(null)

  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
      if (aboutRef.current && !aboutRef.current.contains(e.target)) setAboutOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activePrincipal = PRINCIPALS.find(p => p.id === principalTab)

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
          <div className="about-wrap" ref={aboutRef}>
            <button className="about-btn" onClick={() => setAboutOpen(o => !o)} title="Was macht Safic-Alcan?">
              <i className="ti ti-info-circle" />
              <span>Was macht Safic-Alcan?</span>
            </button>
            {aboutOpen && (
              <div className="about-popover">
                <div className="about-popover-title">
                  <i className="ti ti-building" /> Safic-Alcan – kurz erklärt
                </div>
                <p className="about-popover-text">
                  Safic-Alcan ist ein internationales Distributionshaus für Spezialchemikalien mit eigenem
                  Lager, eigener Logistik und technischer Beratung. Wir vertreten namhafte Hersteller
                  (Principals) aus den Bereichen CASE (Coatings, Adhesives, Sealants, Elastomers), Kunststoffe,
                  Kosmetik, Pharma und weiteren Industriesegmenten.
                </p>
                <p className="about-popover-text">
                  Für Coatings konkret heißt das z.B.: Bindemittel (Alkydharze, PU-Dispersionen wie Hydrolar
                  von COIM), Haftvermittler (Silane der Safic-Chem SIL-Serie), Pigmentpräparationen und
                  Farbpasten (Nebotint, Nebochips von Necarbo), Additive wie Verlaufsmittel, Entschäumer
                  und Rheologiemodifizierer, sowie Phenolharze für Dosenlacke und Korrosionsschutz (SI Group).
                </p>
                <p className="about-popover-text">
                  Wir sind also nicht nur „Verkäufer", sondern Bindeglied zwischen Herstellern und
                  Verarbeitern, mit eigenem Lagerbestand vor Ort und direktem Zugriff auf Labor-/Anwendungstechnik.
                </p>
              </div>
            )}
          </div>
          <div className="header-badge">v3.0</div>
        </div>
      </header>

      <nav className="app-nav">
        {TABS.map(t => {
          if (t.id === 'principals') {
            return (
              <div key={t.id} className="nav-dropdown-wrap" ref={menuRef}>
                <button
                  className={`nav-btn ${tab === 'principals' ? 'active' : ''}`}
                  onClick={() => {
                    if (tab === 'principals') {
                      setMenuOpen(o => !o)
                    } else {
                      setTab('principals')
                      setMenuOpen(true)
                    }
                  }}
                >
                  <i className={`ti ${activePrincipal ? activePrincipal.icon : t.icon}`} />
                  <span>{tab === 'principals' ? activePrincipal.label : t.label}</span>
                </button>
                {menuOpen && (
                  <div className="nav-dropdown-menu">
                    {PRINCIPALS.map(p => (
                      <button
                        key={p.id}
                        className={`nav-dropdown-item ${principalTab === p.id ? 'active' : ''}`}
                        onClick={() => {
                          setPrincipalTab(p.id)
                          setTab('principals')
                          setMenuOpen(false)
                        }}
                      >
                        <i className={`ti ${p.icon}`} />
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          return (
            <button
              key={t.id}
              className={`nav-btn ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <i className={`ti ${t.icon}`} />
              <span>{t.label}</span>
            </button>
          )
        })}
      </nav>

      <main className="app-main">
        {tab === 'db'         && <ProductDB />}
        {tab === 'principals' && principalTab === 'hydrolar' && <Hydrolar />}
        {tab === 'principals' && principalTab === 'silane'   && <Silane />}
        {tab === 'principals' && principalTab === 'sigroup'  && <SIGroup />}
        {tab === 'principals' && principalTab === 'necarbo'  && <Necarbo />}
        {tab === 'qa'         && <QAGuide />}
        {tab === 'ai'         && <CustomerAnalysis />}
        {tab === 'visit'      && <VisitReport />}
        {tab === 'market'     && <MarketRadar />}
        {tab === 'network'    && <PetroNetwork />}
      </main>
    </div>
  )
}
