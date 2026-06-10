// src/components/MarketRadar.jsx
// Markt & Trends – Live-Websuche via Anthropic API mit web_search Tool
// Messe-Kalender, Schnellsuche nach Segmenten, freie Marktrecherche

import { useState } from 'react'
import './MarketRadar.css'

const API_KEY_STORAGE = 'sa_api_key'

// ─── Messe-Kalender ───────────────────────────────────────────────────────────

const MESSEN = [
  { name: 'Paintistanbul 2026', ort: 'Istanbul, Türkei', datum: '17.–19. Juni 2026', segment: 'Coatings', url: 'https://www.paintistanbul.com', highlight: true },
  { name: 'European Coatings Show 2027', ort: 'Nürnberg, Deutschland', datum: 'März 2027', segment: 'Coatings', url: 'https://www.european-coatings-show.com', highlight: false },
  { name: 'Adhesive & Bonding Expo 2026', ort: 'Köln, Deutschland', datum: 'Herbst 2026', segment: 'Adhesives', url: 'https://www.adhesiveandbandingepo.com', highlight: false },
  { name: 'K 2025', ort: 'Düsseldorf, Deutschland', datum: 'Oktober 2025', segment: 'Plastics', url: 'https://www.k-online.com', highlight: false },
  { name: 'Farbe & Lack Messe', ort: 'Köln, Deutschland', datum: '2026 TBD', segment: 'Coatings', url: 'https://www.farbe.de', highlight: false },
  { name: 'AUCHEM', ort: 'Wien, Österreich', datum: '2026 TBD', segment: 'Chemicals', url: '#', highlight: false },
]

// ─── Schnellsuche-Themen ──────────────────────────────────────────────────────

const QUICK_TOPICS = [
  { label: 'Coatings Markt Deutschland 2025', icon: '🎨', query: 'Aktuelle Trends und Marktentwicklungen im deutschen Lackmarkt 2025. Wichtige Themen: Rohstoffpreise, Regulatorik, Wettbewerb, Nachfrage.' },
  { label: 'WB-Coatings Trends', icon: '💧', query: 'Trends bei wasserbasierenden Lacken und Beschichtungen in Europa 2025. VOC-Regulierung, neue Technologien, Marktchancen.' },
  { label: 'TiO₂ Markt & Preise', icon: '⚗️', query: 'Aktuelle TiO₂ Marktlage 2025: Preise, Verfügbarkeit, wichtige Hersteller, Ausblick.' },
  { label: 'Klebstoff-Industrie DACH', icon: '🔗', query: 'Klebstoffmarkt DACH-Region 2025: Trends, Wachstumssegmente, Wettbewerber, technische Entwicklungen.' },
  { label: 'Silane & Haftvermittler', icon: '🧪', query: 'Marktentwicklung Silane und Haftvermittler in der CASE-Industrie 2025. Wichtige Anwendungen, Preise, neue Produkte.' },
  { label: 'Nachhaltige Rohstoffe CASE', icon: '🌱', query: 'Nachhaltige und biobasierte Rohstoffe für Coatings, Adhesives und Sealants 2025. Regulatorik, neue Produkte, Marktchancen.' },
  { label: 'PU-Dispersionen Markt', icon: '💫', query: 'Markt für Polyurethan-Dispersionen (PUD) in Europa 2025. Wichtige Hersteller, Anwendungen, Wachstumstrends.' },
  { label: 'REACH & Regulatorik 2025', icon: '📋', query: 'Aktuelle REACH-Entwicklungen und chemische Regulatorik in der EU 2025. Neue SVHCs, Beschränkungen, Auswirkungen auf CASE-Industrie.' },
  { label: 'Rohstoffpreise Chemie', icon: '📊', query: 'Aktuelle Rohstoffpreise in der Chemieindustrie 2025: MDI, TDI, Acrylsäure, Ethylen, Propylen. Trends und Ausblick.' },
  { label: 'Wettbewerb Distributoren DACH', icon: '🏆', query: 'Chemie-Distribution DACH-Region 2025: Wettbewerbslandschaft, Marktanteile, Strategien von Brenntag, IMCD, Azelis und anderen.' },
]

// ─── Ergebnis-Parser ──────────────────────────────────────────────────────────

function parseResult(text) {
  // Versuche JSON zu parsen, sonst als Plaintext zurückgeben
  try {
    const match = text.match(/\{[\s\S]*"summary"[\s\S]*\}/)
    if (match) return { type: 'structured', data: JSON.parse(match[0]) }
  } catch (e) {}
  return { type: 'text', data: text }
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function MarketRadar() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [activeQuery, setActiveQuery] = useState('')
  const [apiKey] = useState(() => localStorage.getItem(API_KEY_STORAGE) || '')

  const search = async (searchQuery) => {
    if (!apiKey) { alert('Bitte API Key in der Kundenrecherche einrichten.'); return }
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)
    setActiveQuery(searchQuery)

    const systemPrompt = `Du bist ein erfahrener Marktanalyst für die chemische Industrie, spezialisiert auf den CASE-Markt (Coatings, Adhesives, Sealants, Elastomers) in der DACH-Region und Europa. 

Analysiere die Anfrage mit aktuellen Web-Suchergebnissen und antworte als strukturiertes JSON:

{
  "summary": "2-3 Sätze Executive Summary auf Deutsch",
  "keyPoints": ["Wichtigster Punkt 1", "Wichtigster Punkt 2", "Wichtigster Punkt 3", "Wichtigster Punkt 4"],
  "trends": ["Trend 1", "Trend 2", "Trend 3"],
  "opportunities": ["Chance für Safic-Alcan 1", "Chance für Safic-Alcan 2"],
  "risks": ["Risiko/Herausforderung 1", "Risiko/Herausforderung 2"],
  "salesTips": ["Konkreter Sales-Tipp 1", "Konkreter Sales-Tipp 2"],
  "sources": ["Quelle 1", "Quelle 2"]
}

Fokus auf: aktuelle Marktdaten, Relevanz für Safic-Alcan Deutschland, konkrete Sales-Insights.
Alle Texte auf Deutsch. Keine Floskeln, nur konkrete Fakten und Einschätzungen.`

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 3000,
          system: systemPrompt,
          tools: [{ type: 'web_search_20250305', name: 'web_search' }],
          messages: [{ role: 'user', content: searchQuery }]
        })
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || JSON.stringify(err))
      }

      const data = await response.json()
      const raw = data.content.map(c => c.type === 'text' ? c.text : '').filter(Boolean).join('')
      const text = raw.replace(/<cite[^>]*>/g, '').replace(/<\/cite>/g, '')
      setResult(parseResult(text))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTopic = (topic) => {
    setQuery(topic.query)
    search(topic.query)
  }

  return (
    <div className="mr">

      {/* Header */}
      <div className="mr-header-box">
        <div className="mr-header-left">
          <div className="mr-title-row">
            <span className="mr-icon">📡</span>
            <h2 className="mr-title">Markt & Trends</h2>
            <span className="mr-badge">Live Web Search</span>
          </div>
          <p className="mr-sub">Aktuelle Marktdaten, Trends und Sales-Insights für CASE · DACH-Region</p>
        </div>
      </div>

      {/* Suchleiste */}
      <div className="mr-search-box">
        <div className="mr-search-row">
          <div className="mr-input-wrap">
            <i className="ti ti-search mr-search-icon" />
            <input
              type="text"
              className="mr-input"
              placeholder="Marktthema eingeben, z.B. TiO2 Preise 2025 oder Klebstoffmarkt Deutschland..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search(query)}
            />
          </div>
          <button className="mr-btn-search" onClick={() => search(query)} disabled={loading || !query.trim()}>
            {loading ? <><span className="mr-spinner" /> Suche…</> : <><i className="ti ti-arrow-right" /> Analysieren</>}
          </button>
        </div>

        {/* Quick Topics */}
        <div className="mr-quick-label">Schnellzugriff:</div>
        <div className="mr-quick-topics">
          {QUICK_TOPICS.map(t => (
            <button key={t.label}
              className={`mr-quick-btn ${activeQuery === t.query ? 'active' : ''}`}
              onClick={() => handleQuickTopic(t)}
              disabled={loading}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mr-loading">
          <div className="mr-loading-inner">
            <span className="mr-spinner-lg" />
            <div>
              <div className="mr-loading-title">Durchsuche aktuelle Quellen…</div>
              <div className="mr-loading-sub">Web Search · Marktdaten · News</div>
            </div>
          </div>
        </div>
      )}

      {/* Fehler */}
      {error && (
        <div className="mr-error">
          <i className="ti ti-alert-circle" />
          <span>{error}</span>
        </div>
      )}

      {/* Ergebnis */}
      {result && !loading && (
        <div className="mr-result">
          <div className="mr-result-query">
            <i className="ti ti-search" /> {activeQuery}
          </div>

          {result.type === 'structured' ? (
            <StructuredResult data={result.data} />
          ) : (
            <div className="mr-text-result">{result.data}</div>
          )}
        </div>
      )}

      {/* Messe-Kalender */}
      <div className="mr-section">
        <div className="mr-section-title"><i className="ti ti-calendar-event" /> Messe-Kalender CASE</div>
        <div className="mr-messen">
          {MESSEN.map(m => (
            <a key={m.name} href={m.url} target="_blank" rel="noreferrer"
              className={`mr-messe-card ${m.highlight ? 'highlight' : ''}`}>
              <div className="mr-messe-top">
                <span className="mr-messe-seg">{m.segment}</span>
                {m.highlight && <span className="mr-messe-soon">Bald!</span>}
              </div>
              <div className="mr-messe-name">{m.name}</div>
              <div className="mr-messe-meta">
                <span><i className="ti ti-map-pin" /> {m.ort}</span>
                <span><i className="ti ti-calendar" /> {m.datum}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}

// ─── Strukturiertes Ergebnis ──────────────────────────────────────────────────

function StructuredResult({ data }) {
  return (
    <div className="mr-structured">

      {/* Summary */}
      {data.summary && (
        <div className="mr-summary">
          <div className="mr-card-title">📋 Executive Summary</div>
          <p>{data.summary}</p>
        </div>
      )}

      <div className="mr-cards-grid">

        {/* Key Points */}
        {data.keyPoints?.length > 0 && (
          <div className="mr-card">
            <div className="mr-card-title">🔑 Wichtigste Erkenntnisse</div>
            <ul className="mr-list">
              {data.keyPoints.map((p, i) => <li key={i}><span className="mr-list-dot" />{p}</li>)}
            </ul>
          </div>
        )}

        {/* Trends */}
        {data.trends?.length > 0 && (
          <div className="mr-card">
            <div className="mr-card-title">📈 Aktuelle Trends</div>
            <ul className="mr-list">
              {data.trends.map((t, i) => <li key={i}><span className="mr-list-dot trend" />{t}</li>)}
            </ul>
          </div>
        )}

        {/* Opportunities */}
        {data.opportunities?.length > 0 && (
          <div className="mr-card mr-card-green">
            <div className="mr-card-title">✅ Chancen für Safic-Alcan</div>
            <ul className="mr-list">
              {data.opportunities.map((o, i) => <li key={i}><span className="mr-list-dot green" />{o}</li>)}
            </ul>
          </div>
        )}

        {/* Risks */}
        {data.risks?.length > 0 && (
          <div className="mr-card mr-card-yellow">
            <div className="mr-card-title">⚠️ Risiken & Herausforderungen</div>
            <ul className="mr-list">
              {data.risks.map((r, i) => <li key={i}><span className="mr-list-dot yellow" />{r}</li>)}
            </ul>
          </div>
        )}

      </div>

      {/* Sales Tips */}
      {data.salesTips?.length > 0 && (
        <div className="mr-card mr-card-blue mr-sales-tips">
          <div className="mr-card-title">💡 Sales-Tipps für dein nächstes Kundengespräch</div>
          <div className="mr-tips-list">
            {data.salesTips.map((t, i) => (
              <div key={i} className="mr-tip">
                <span className="mr-tip-nr">{i + 1}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {data.sources?.length > 0 && (
        <div className="mr-sources">
          <span className="mr-sources-label">Quellen:</span>
          {data.sources.map((s, i) => <span key={i} className="mr-source">{s}</span>)}
        </div>
      )}
    </div>
  )
}
