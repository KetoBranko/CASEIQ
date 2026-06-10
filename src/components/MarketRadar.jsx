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

// ─── PDF Export ──────────────────────────────────────────────────────────────

function exportMarketPDF(query, data) {
  const d = data || {}
  const html = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>Marktanalyse – ${query}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;font-size:13px;color:#1a1a2e;padding:40px;background:#fff}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #1e3a6e;margin-bottom:20px;flex-wrap:wrap;gap:10px}
.hdr-l h1{font-size:20px;font-weight:800;color:#1e3a6e}
.hdr-l .sub{font-size:12px;color:#64748b;margin-top:3px}
.hdr-r{text-align:right;font-size:12px;color:#64748b}
.hdr-r strong{color:#1e3a6e;font-size:13px;display:block}
.summary{background:#eff6ff;border-left:4px solid #1e3a6e;padding:12px 15px;border-radius:0 8px 8px 0;font-size:13px;color:#1e293b;margin-bottom:18px;line-height:1.7}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px}
.card-green{background:#f0fdf4;border-color:#bbf7d0}
.card-yellow{background:#fffbeb;border-color:#fde68a}
.card-blue{background:#eff6ff;border-color:#bfdbfe;grid-column:1/-1}
.card-title{font-size:11px;font-weight:700;color:#0f172a;margin-bottom:8px}
ul{list-style:none;padding:0;display:flex;flex-direction:column;gap:5px}
li{display:flex;align-items:flex-start;gap:7px;font-size:12px;color:#334155;line-height:1.5}
.dot{width:6px;height:6px;border-radius:50%;background:#1d4ed8;flex-shrink:0;margin-top:4px}
.dot.g{background:#15803d}.dot.y{background:#b45309}
.tips{display:flex;flex-direction:column;gap:7px}
.tip{display:flex;gap:8px;font-size:12px;color:#1e3a6e;line-height:1.6}
.tip-nr{width:20px;height:20px;border-radius:50%;background:#1d4ed8;color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sources{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px}
.src{font-size:10px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:1px 7px;border-radius:4px}
.query-box{font-size:11px;color:#64748b;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid #f1f5f9}
.footer{margin-top:32px;padding-top:10px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:10px;color:#94a3b8}
@media print{body{padding:20px}}
</style>
</head><body>
<div class="hdr">
  <div class="hdr-l">
    <h1>Markt & Trends</h1>
    <div class="sub">CASE·IQ Market Analysis · Safic-Alcan Deutschland</div>
  </div>
  <div class="hdr-r">
    <strong>Safic-Alcan Deutschland GmbH</strong>
    <span>CASE & Industrial Specialties</span><br>
    <span>${new Date().toLocaleDateString('de-DE')}</span>
  </div>
</div>

<div class="query-box">Suchanfrage: ${query}</div>

${d.summary ? `<div class="summary">${d.summary}</div>` : ''}

<div class="grid">
${d.keyPoints?.length ? `<div class="card"><div class="card-title">Wichtigste Erkenntnisse</div><ul>${d.keyPoints.map(p=>`<li><span class="dot"></span>${p}</li>`).join('')}</ul></div>` : ''}
${d.trends?.length ? `<div class="card"><div class="card-title">Aktuelle Trends</div><ul>${d.trends.map(t=>`<li><span class="dot"></span>${t}</li>`).join('')}</ul></div>` : ''}
${d.opportunities?.length ? `<div class="card card-green"><div class="card-title">Chancen fuer Safic-Alcan</div><ul>${d.opportunities.map(o=>`<li><span class="dot g"></span>${o}</li>`).join('')}</ul></div>` : ''}
${d.risks?.length ? `<div class="card card-yellow"><div class="card-title">Risiken & Herausforderungen</div><ul>${d.risks.map(r=>`<li><span class="dot y"></span>${r}</li>`).join('')}</ul></div>` : ''}
</div>

${d.salesTips?.length ? `<div class="card card-blue"><div class="card-title">Sales-Tipps fuer dein naechstes Kundengespräch</div><div class="tips">${d.salesTips.map((t,i)=>`<div class="tip"><span class="tip-nr">${i+1}</span><span>${t}</span></div>`).join('')}</div></div>` : ''}

${d.sources?.length ? `<div class="sources"><span style="font-size:10px;color:#94a3b8;font-weight:700;margin-right:4px">Quellen:</span>${d.sources.map(s=>`<span class="src">${s}</span>`).join('')}</div>` : ''}

<div class="footer">
  <span>Safic-Alcan Deutschland GmbH · CASE·IQ Sales Tool v2.4</span>
  <span>Generated ${new Date().toLocaleString('de-DE')}</span>
</div>
</body></html>`

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `MarketAnalysis_${query.slice(0,30).replace(/\s+/g,'_')}_${new Date().toISOString().split('T')[0]}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
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

    const systemPrompt = `CASE-Markt Analyst für Safic-Alcan Deutschland. Nutze Web-Suche und antworte NUR als JSON:
{"summary":"2-3 Sätze","keyPoints":["Punkt1","Punkt2","Punkt3"],"trends":["T1","T2"],"opportunities":["O1","O2"],"risks":["R1","R2"],"salesTips":["Tipp1","Tipp2"],"sources":["Q1"]}
Deutsch, konkret, keine Floskeln.`

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
          model: 'claude-haiku-4-5-20251001',
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
            {loading ? <><span className="mr-spinner" /> Suche...</> : <><i className="ti ti-arrow-right" /> Analysieren</>}
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
              <div className="mr-loading-title">Durchsuche aktuelle Quellen...</div>
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
            {result.type === 'structured' && (
              <button className="mr-btn-pdf" onClick={() => exportMarketPDF(activeQuery, result.data)}>
                <i className="ti ti-download" /> PDF
              </button>
            )}
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
