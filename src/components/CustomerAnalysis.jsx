import { useState } from 'react'
import { PRODUCTS, SEG_META, PORTFOLIO_FOR_AI } from '../data/products'
import ProductModal from './ProductModal'
import './CustomerAnalysis.css'

const EXAMPLES = [
  'Brillux GmbH',
  'brocolor Lackfabrik GmbH',
  'PETER-LACKE GmbH',
  'Jowat SE',
  'Sika Deutschland GmbH',
  'Meffert AG Farbwerke',
  'SI Coatings GmbH',
  'Wilckens Farben GmbH',
]

const SYSTEM_PROMPT = `Du bist ein erfahrener technischer Sales-Berater für Rohstoffe in der Chemieindustrie bei Safic-Alcan.
Analysiere den genannten Kunden und antworte AUSSCHLIESSLICH als gültiges JSON-Objekt. Kein Text, keine Markdown-Backticks, kein Kommentar vor oder nach dem JSON.

Format:
{"customer":"Kundenname","segs":[{"label":"Coatings","cls":"seg-c"}],"intro":"3-4 Sätze was der Kunde macht","items":[{"id":2,"name":"Produktname","sup":"Lieferant","why":"Kurze Begründung","pct":85}],"einstieg":"2-3 konkrete Einstiegsfragen als einfacher Text mit Zeilenumbrüchen","wettbewerb":"Wettbewerb und Herausforderungen"}

Regeln:
- segs: Nur aus [{"label":"Coatings","cls":"seg-c"}, {"label":"Adhesives","cls":"seg-a"}, {"label":"Industrial","cls":"seg-i"}]
- items: Max 10 Produkte, nur wirklich relevante
- pct: 0-100 Wahrscheinlichkeit (70+=sehr wahrscheinlich, 40-69=wahrscheinlich, unter 40=unwahrscheinlich)
- Alle Texte auf Deutsch, präzise, keine Floskeln`

export default function CustomerAnalysis() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('sa_api_key') || '')
  const [showKeyInput, setShowKeyInput] = useState(false)

  const saveKey = (k) => {
    setApiKey(k)
    localStorage.setItem('sa_api_key', k)
  }

  const analyze = async () => {
    if (!query.trim()) return
    if (!apiKey) { setShowKeyInput(true); return }

    setLoading(true)
    setError(null)
    setResult(null)

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
          max_tokens: 1500,
          system: SYSTEM_PROMPT,
          messages: [{
            role: 'user',
            content: `Analysiere diesen Kunden für Safic-Alcan CASE Sales: "${query}"\n\nPortfolio IDs: ${PORTFOLIO_FOR_AI}`
          }]
        })
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(JSON.stringify(err))
      }

      const data = await response.json()
      const text = data.content.map(c => c.text || '').join('')
      const match = text.match(/\{[\s\S]*"customer"[\s\S]*"items"[\s\S]*\}/)
      if (!match) throw new Error('Kein gültiges JSON in der Antwort')
      const parsed = JSON.parse(match[0])
      setResult(parsed)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const exportPDF = () => {
    if (!result) return
    const win = window.open('', '_blank')
    const items = (result.items || []).map(item => {
      const prod = PRODUCTS.find(p => p.id === item.id)
      const name = prod ? prod.n : item.name
      const pct = item.pct || 0
      const color = pct >= 70 ? '#2e7d52' : pct >= 40 ? '#b06b10' : '#a32d2d'
      const label = pct >= 70 ? 'Sehr wahrscheinlich' : pct >= 40 ? 'Wahrscheinlich' : 'Unwahrscheinlich'
      return `
        <tr>
          <td><strong>${name}</strong><br><small style="color:#666">${item.sup||''}</small></td>
          <td>${item.why}</td>
          <td>
            <span style="color:${color};font-weight:600">${label}</span><br>
            <div style="background:#eee;height:6px;border-radius:3px;margin-top:4px;overflow:hidden">
              <div style="background:${color};height:100%;width:${pct}%;border-radius:3px"></div>
            </div>
            <small style="color:#666">${pct}%</small>
          </td>
        </tr>`
    }).join('')

    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8">
      <title>Safic-Alcan Sales-Briefing – ${result.customer}</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 13px; color: #222; margin: 0; padding: 30px; }
        .header { background: #1a3a5c; color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px; }
        .header h1 { margin: 0; font-size: 18px; }
        .header p { margin: 4px 0 0; opacity: 0.7; font-size: 12px; }
        .section { margin-bottom: 20px; }
        .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #666; margin-bottom: 5px; font-weight: 700; }
        .intro { background: #f5f7fa; padding: 12px 14px; border-radius: 6px; border-left: 3px solid #3b7dd8; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { background: #f0f2f5; padding: 8px; text-align: left; border-bottom: 2px solid #ddd; font-size: 10px; text-transform: uppercase; letter-spacing: 0.4px; color: #666; }
        td { padding: 8px; border-bottom: 1px solid #eee; vertical-align: top; }
        tr:hover td { background: #fafbfc; }
        .segs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
        .seg { padding: 3px 10px; border-radius: 10px; font-size: 11px; font-weight: 600; }
        .seg-c { background: #e8f0fc; color: #1a3a5c; }
        .seg-a { background: #fce8ef; color: #5c1a2a; }
        .seg-i { background: #fcf0e0; color: #5c3010; }
        .einstieg { background: #f0f8f0; padding: 12px 14px; border-radius: 6px; border-left: 3px solid #2e7d52; white-space: pre-line; line-height: 1.7; }
        .wettbewerb { background: #fff8f0; padding: 12px 14px; border-radius: 6px; border-left: 3px solid #b06b10; line-height: 1.6; }
        .footer { margin-top: 30px; padding-top: 14px; border-top: 1px solid #eee; font-size: 11px; color: #999; display: flex; justify-content: space-between; }
        @media print { body { padding: 20px; } }
      </style>
    </head><body>
      <div class="header">
        <h1>Sales-Briefing: ${result.customer}</h1>
        <p>Safic-Alcan CASE Sales Tool · ${new Date().toLocaleDateString('de-DE')}</p>
      </div>
      <div class="section">
        <div class="segs">${(result.segs||[]).map(s=>`<span class="seg ${s.cls}">${s.label}</span>`).join('')}</div>
        <div class="label">Kundenprofil</div>
        <div class="intro">${result.intro||''}</div>
      </div>
      <div class="section">
        <div class="label">Portfolio-Match mit Wahrscheinlichkeit</div>
        <table>
          <thead><tr><th style="width:32%">Produkt</th><th style="width:42%">Warum relevant</th><th style="width:26%">Wahrscheinlichkeit</th></tr></thead>
          <tbody>${items}</tbody>
        </table>
      </div>
      <div class="section">
        <div class="label">Gesprächseinstieg</div>
        <div class="einstieg">${(result.einstieg||'').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'')}</div>
      </div>
      <div class="section">
        <div class="label">Wettbewerb & Herausforderungen</div>
        <div class="wettbewerb">${result.wettbewerb||''}</div>
      </div>
      <div class="footer">
        <span>Safic-Alcan Deutschland GmbH · CASE Sales Tool</span>
        <span>${new Date().toLocaleString('de-DE')}</span>
      </div>
    </body></html>`)
    win.document.close()
    setTimeout(() => win.print(), 500)
  }

  return (
    <div className="ca">
      {showKeyInput && (
        <div className="key-overlay" onClick={e => e.target === e.currentTarget && setShowKeyInput(false)}>
          <div className="key-modal">
            <h3>Anthropic API Key</h3>
            <p>Für die KI-Kundenanalyse wird ein Anthropic API Key benötigt. Dieser wird nur lokal in deinem Browser gespeichert.</p>
            <p>API Key erhältlich unter: <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a></p>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={apiKey}
              onChange={e => saveKey(e.target.value)}
              className="key-input"
            />
            <div className="key-actions">
              <button className="btn-secondary" onClick={() => setShowKeyInput(false)}>Abbrechen</button>
              <button className="btn-primary" onClick={() => { setShowKeyInput(false); analyze() }}>Speichern & Analysieren</button>
            </div>
          </div>
        </div>
      )}

      <div className="ca-intro">
        <i className="ti ti-bolt" />
        <div>
          <strong>KI-Schnellanalyse:</strong> Firmenname oder Website eingeben → direkte Produktvorschläge mit Wahrscheinlichkeiten erscheinen hier im Tool.
          {apiKey && <span className="key-status"><i className="ti ti-check" /> API Key gespeichert</span>}
          {!apiKey && <span className="key-missing" onClick={() => setShowKeyInput(true)}><i className="ti ti-key" /> API Key einrichten</span>}
        </div>
      </div>

      <div className="ca-examples">
        {EXAMPLES.map(e => (
          <button key={e} className="example-chip" onClick={() => setQuery(e)}>{e}</button>
        ))}
      </div>

      <div className="ca-input-row">
        <div className="ca-input-wrap">
          <i className="ti ti-building search-icon" />
          <input
            type="text"
            className="ca-input"
            placeholder="Firmenname, Website oder kurze Beschreibung…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && analyze()}
          />
        </div>
        <button className="btn-analyze" onClick={analyze} disabled={loading || !query.trim()}>
          {loading ? <><span className="spinner" /> Analysiere…</> : <><i className="ti ti-search" /> Analysieren</>}
        </button>
        {!apiKey && (
          <button className="btn-key" onClick={() => setShowKeyInput(true)} title="API Key einrichten">
            <i className="ti ti-key" />
          </button>
        )}
      </div>

      {error && (
        <div className="ca-error">
          <i className="ti ti-alert-circle" />
          <span>{error}</span>
          {error.includes('401') && (
            <button onClick={() => setShowKeyInput(true)} className="err-fix">API Key prüfen</button>
          )}
        </div>
      )}

      {result && <AnalysisResult result={result} onProductClick={setSelected} onExport={exportPDF} />}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function ampel(pct) {
  if (pct >= 70) return { dot: 'amp-green', label: 'Sehr wahrscheinlich', bar: 'bar-green' }
  if (pct >= 40) return { dot: 'amp-yellow', label: 'Wahrscheinlich', bar: 'bar-yellow' }
  return { dot: 'amp-red', label: 'Unwahrscheinlich', bar: 'bar-red' }
}

function AnalysisResult({ result, onProductClick, onExport }) {
  return (
    <div className="ar">
      <div className="ar-header">
        <div className="ar-title">
          <i className="ti ti-building" />
          {result.customer}
        </div>
        <div className="ar-actions">
          <div className="ar-segs">
            {(result.segs || []).map((s, i) => (
              <span key={i} className={`seg-badge ${s.cls}`}>{s.label}</span>
            ))}
          </div>
          <button className="btn-export" onClick={onExport} title="Als PDF exportieren">
            <i className="ti ti-file-type-pdf" />
            PDF
          </button>
        </div>
      </div>

      {result.intro && (
        <div className="ar-intro">{result.intro}</div>
      )}

      <div className="ar-section">
        <div className="ar-label">Portfolio-Match</div>
        <div className="ar-table-wrap">
          <table className="ar-table">
            <thead>
              <tr>
                <th className="col-prod">Produkt</th>
                <th className="col-why">Warum relevant</th>
                <th className="col-prob">Wahrscheinlichkeit</th>
              </tr>
            </thead>
            <tbody>
              {(result.items || []).map((item, i) => {
                const pct = Math.round(item.pct || 50)
                const a = ampel(pct)
                const prod = PRODUCTS.find(p => p.id === item.id)
                const name = prod ? prod.n : item.name
                const sup = prod ? prod.sup : (item.sup || '')
                return (
                  <tr key={i}>
                    <td>
                      <div
                        className="ar-prod-name"
                        onClick={() => prod && onProductClick(prod)}
                        style={{ cursor: prod ? 'pointer' : 'default' }}
                      >
                        {name}
                      </div>
                      <div className="ar-prod-sup">{sup}</div>
                    </td>
                    <td className="ar-why">{item.why}</td>
                    <td>
                      <div className="amp-row">
                        <span className={`amp-dot ${a.dot}`} />
                        <span className={`amp-label ${a.dot}`}>{a.label}</span>
                      </div>
                      <div className="prob-bar-wrap">
                        <div className={`prob-bar ${a.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="prob-pct">{pct}%</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {result.einstieg && (
        <div className="ar-section">
          <div className="ar-label">Gesprächseinstieg</div>
          <div className="ar-box ar-box-green"
            dangerouslySetInnerHTML={{ __html: result.einstieg.replace(/\n/g, '<br>') }}
          />
        </div>
      )}

      {result.wettbewerb && (
        <div className="ar-section">
          <div className="ar-label">Wettbewerb & Herausforderungen</div>
          <div className="ar-box ar-box-yellow">{result.wettbewerb}</div>
        </div>
      )}
    </div>
  )
}
