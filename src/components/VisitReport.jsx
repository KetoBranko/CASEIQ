// src/components/VisitReport.jsx
// Besuchsberichte – Eingabe auf Deutsch, Ausgabe auf Englisch
// Berichte werden lokal im Browser gespeichert (localStorage)

import { useState, useEffect } from 'react'
import { PRODUCTS } from '../data/products'
import { HYDROLAR_PRODUCTS } from '../data/hydrolar'
import { SILAN_PRODUCTS } from '../data/silane'
import './VisitReport.css'

const STORAGE_KEY = 'caseiq_visit_reports'

const OPPORTUNITY_OPTIONS = [
  { value: 'high', label: 'Hoch (>70%)', color: '#15803d', bg: '#dcfce7', border: '#86efac' },
  { value: 'medium', label: 'Mittel (40–70%)', color: '#b45309', bg: '#fef9c3', border: '#fde047' },
  { value: 'low', label: 'Niedrig (<40%)', color: '#dc2626', bg: '#fee2e2', border: '#fca5a5' },
]

const SEGMENT_OPTIONS = ['Coatings', 'Adhesives', 'Sealants', 'Elastomers', 'Construction', 'Plastics / Composites', 'Printing Inks', 'Textile & Leather']

const VOLUME_OPTIONS = ['< 1 t/Jahr', '1–5 t/Jahr', '5–20 t/Jahr', '20–50 t/Jahr', '> 50 t/Jahr', 'Unbekannt']

const EMPTY_FORM = {
  // Kundendaten
  customer: '',
  address: '',
  date: new Date().toISOString().split('T')[0],
  scContact: 'Branko Premužak',
  participants: '',
  segments: [],
  // Gesprächsinhalte (Deutsch)
  objectives: '',
  discussion: '',
  productsDiscussed: [],
  technicalDetails: '',
  // Nächste Schritte
  nextSteps: '',
  nextVisitDate: '',
  // Opportunity
  opportunityLevel: 'medium',
  estimatedVolume: 'Unbekannt',
  estimatedTimeline: '',
}

// ─── Produkt-Auswahl Helfer ───────────────────────────────────────────────────

function getAllProducts() {
  const all = []
  PRODUCTS.forEach(p => all.push({ id: `p_${p.id}`, label: p.n, sup: p.sup, type: 'product' }))
  HYDROLAR_PRODUCTS.forEach(p => all.push({ id: `h_${p.id}`, label: p.id, sup: 'COIM Hydrolar', type: 'hydrolar' }))
  SILAN_PRODUCTS.forEach(p => all.push({ id: `s_${p.id}`, label: `${p.id} · ${p.handelsname}`, sup: 'Safic-Chem SIL', type: 'silan' }))
  return all
}

// ─── API-Prompt ───────────────────────────────────────────────────────────────

function buildPrompt(form) {
  const prods = form.productsDiscussed.map(id => {
    const all = getAllProducts()
    const p = all.find(x => x.id === id)
    return p ? `${p.label} (${p.sup})` : id
  }).join(', ')

  return `You are writing a professional visit report for Safic-Alcan Deutschland GmbH, a specialty chemicals distributor.
Translate and format the following information into a professional English visit report. 
Be precise, professional, use chemical/technical terminology correctly.
Return ONLY a JSON object, no markdown, no backticks.

Format:
{
  "objectives": "Professional English version of objectives",
  "discussion": "Professional English version of discussion points, structured in clear paragraphs",
  "technicalDetails": "Professional English version of technical details",
  "nextSteps": "Professional English version of next steps as bullet points",
  "summary": "One sentence executive summary of the visit"
}

Input data:
Customer: ${form.customer}
Date: ${form.date}
Segments: ${form.segments.join(', ')}
Products discussed: ${prods || 'none specified'}
Objectives (German): ${form.objectives}
Discussion (German): ${form.discussion}
Technical details (German): ${form.technicalDetails}
Next steps (German): ${form.nextSteps}
Opportunity: ${form.opportunityLevel}, Volume: ${form.estimatedVolume}, Timeline: ${form.estimatedTimeline}`
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function VisitReport() {
  const [view, setView] = useState('list') // list | new | preview
  const [form, setForm] = useState(EMPTY_FORM)
  const [reports, setReports] = useState([])
  const [generating, setGenerating] = useState(false)
  const [generatedEN, setGeneratedEN] = useState(null)
  const [error, setError] = useState(null)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('sa_api_key') || '')
  const [productSearch, setProductSearch] = useState('')
  const [showProductPicker, setShowProductPicker] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setReports(JSON.parse(saved))
  }, [])

  const saveReports = (list) => {
    setReports(list)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  const updateForm = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleSegment = (s) => {
    const cur = form.segments
    updateForm('segments', cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s])
  }

  const toggleProduct = (id) => {
    const cur = form.productsDiscussed
    updateForm('productsDiscussed', cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id])
  }

  const allProducts = getAllProducts()
  const filteredProducts = productSearch
    ? allProducts.filter(p => p.label.toLowerCase().includes(productSearch.toLowerCase()) || p.sup.toLowerCase().includes(productSearch.toLowerCase()))
    : allProducts

  // ── KI generiert englischen Bericht ──
  const generateReport = async () => {
    if (!apiKey) { alert('Bitte API Key in der Kundenrecherche einrichten.'); return }
    if (!form.customer || !form.discussion) { alert('Bitte mindestens Kunde und Gesprächsinhalt ausfüllen.'); return }

    setGenerating(true)
    setError(null)

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
          max_tokens: 2000,
          messages: [{ role: 'user', content: buildPrompt(form) }]
        })
      })
      const data = await response.json()
      const text = data.content.map(c => c.text || '').join('')
      const match = text.match(/\{[\s\S]*"objectives"[\s\S]*\}/)
      if (!match) throw new Error('Kein gültiges JSON')
      setGeneratedEN(JSON.parse(match[0]))
      setView('preview')
    } catch (e) {
      setError(e.message)
    } finally {
      setGenerating(false)
    }
  }

  // ── Bericht speichern ──
  const saveReport = () => {
    const report = {
      id: Date.now(),
      date: form.date,
      customer: form.customer,
      scContact: form.scContact,
      address: form.address,
      participants: form.participants,
      segments: form.segments,
      productsDiscussed: form.productsDiscussed,
      opportunityLevel: form.opportunityLevel,
      estimatedVolume: form.estimatedVolume,
      estimatedTimeline: form.estimatedTimeline,
      nextVisitDate: form.nextVisitDate,
      formDE: {
        objectives: form.objectives,
        discussion: form.discussion,
        technicalDetails: form.technicalDetails,
        nextSteps: form.nextSteps,
      },
      generatedEN,
    }
    const updated = [report, ...reports]
    saveReports(updated)
    setForm(EMPTY_FORM)
    setGeneratedEN(null)
    setView('list')
  }

  // ── PDF Export ──
  const exportPDF = (report) => {
    const en = report.generatedEN || {}
    const prods = (report.productsDiscussed || []).map(id => {
      const p = getAllProducts().find(x => x.id === id)
      return p ? `${p.label} (${p.sup})` : id
    })
    const opp = OPPORTUNITY_OPTIONS.find(o => o.value === report.opportunityLevel)

    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8">
      <title>Visit Report – ${report.customer}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Arial', sans-serif; font-size: 13px; color: #1a1a2e; padding: 40px; background: #fff; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 20px; border-bottom: 3px solid #1e3a6e; margin-bottom: 24px; }
        .header-left h1 { font-size: 22px; font-weight: 800; color: #1e3a6e; letter-spacing: -0.5px; }
        .header-left .subtitle { font-size: 12px; color: #64748b; margin-top: 3px; }
        .header-right { text-align: right; font-size: 12px; color: #64748b; }
        .header-right .company { font-weight: 700; color: #1e3a6e; font-size: 13px; }
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
        .meta-item .label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.6px; color: #94a3b8; font-weight: 700; margin-bottom: 3px; }
        .meta-item .value { font-size: 13px; color: #1e293b; font-weight: 500; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; color: #1e3a6e; font-weight: 800; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 10px; }
        .content { font-size: 13px; color: #334155; line-height: 1.7; }
        .products { display: flex; flex-wrap: wrap; gap: 6px; }
        .product-tag { padding: 3px 10px; border-radius: 5px; font-size: 11px; font-weight: 600; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; }
        .product-tag.hydrolar { border-color: #a5f3fc; background: #ecfeff; color: #0e7490; }
        .product-tag.silan { border-color: #ddd6fe; background: #f5f3ff; color: #5b21b6; }
        .opportunity { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; }
        .segments { display: flex; flex-wrap: wrap; gap: 6px; }
        .segment { padding: 2px 9px; border-radius: 999px; font-size: 11px; font-weight: 600; background: #e8f0fc; color: #1e3a6e; border: 1px solid #bfdbfe; }
        .summary-box { background: #eff6ff; border-left: 4px solid #1e3a6e; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 13px; font-style: italic; color: #1e3a6e; margin-bottom: 20px; }
        .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; }
        @media print { body { padding: 20px; } }
      </style>
    </head><body>
      <div class="header">
        <div class="header-left">
          <h1>Visit Report</h1>
          <div class="subtitle">${report.customer} · ${new Date(report.date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}</div>
        </div>
        <div class="header-right">
          <div class="company">Safic-Alcan Deutschland GmbH</div>
          <div>CASE & Industrial Specialties</div>
          <div style="margin-top:4px">${report.scContact}</div>
        </div>
      </div>

      ${en.summary ? `<div class="summary-box">${en.summary}</div>` : ''}

      <div class="meta-grid">
        <div class="meta-item"><div class="label">Customer</div><div class="value">${report.customer}</div></div>
        <div class="meta-item"><div class="label">Date</div><div class="value">${new Date(report.date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}</div></div>
        <div class="meta-item"><div class="label">Address</div><div class="value">${report.address || '—'}</div></div>
        <div class="meta-item"><div class="label">Participants</div><div class="value">${report.participants || '—'}</div></div>
        <div class="meta-item"><div class="label">Safic-Alcan Contact</div><div class="value">${report.scContact}</div></div>
        <div class="meta-item"><div class="label">Next Visit</div><div class="value">${report.nextVisitDate || '—'}</div></div>
      </div>

      ${report.segments?.length ? `
      <div class="section">
        <div class="section-title">Segments</div>
        <div class="segments">${report.segments.map(s => `<span class="segment">${s}</span>`).join('')}</div>
      </div>` : ''}

      ${en.objectives ? `
      <div class="section">
        <div class="section-title">Objectives</div>
        <div class="content">${en.objectives}</div>
      </div>` : ''}

      ${en.discussion ? `
      <div class="section">
        <div class="section-title">Discussion</div>
        <div class="content">${en.discussion.replace(/\n/g, '<br>')}</div>
      </div>` : ''}

      ${en.technicalDetails ? `
      <div class="section">
        <div class="section-title">Technical Details</div>
        <div class="content">${en.technicalDetails.replace(/\n/g, '<br>')}</div>
      </div>` : ''}

      ${prods.length ? `
      <div class="section">
        <div class="section-title">Products Discussed</div>
        <div class="products">${prods.map(p => {
          const cls = p.includes('Hydrolar') ? 'hydrolar' : p.includes('SIL') ? 'silan' : ''
          return `<span class="product-tag ${cls}">${p}</span>`
        }).join('')}</div>
      </div>` : ''}

      ${en.nextSteps ? `
      <div class="section">
        <div class="section-title">Next Steps</div>
        <div class="content">${en.nextSteps.replace(/\n/g, '<br>').replace(/^- /gm, '• ')}</div>
      </div>` : ''}

      <div class="section">
        <div class="section-title">Opportunity Assessment</div>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <div><span class="opportunity" style="background:${opp?.bg};color:${opp?.color};border:1px solid ${opp?.border}">${opp?.label || report.opportunityLevel}</span></div>
          <div style="font-size:12px;color:#64748b">Estimated Volume: <strong>${report.estimatedVolume}</strong></div>
          ${report.estimatedTimeline ? `<div style="font-size:12px;color:#64748b">Timeline: <strong>${report.estimatedTimeline}</strong></div>` : ''}
        </div>
      </div>

      <div class="footer">
        <span>Safic-Alcan Deutschland GmbH · CASE Sales Tool v2.3</span>
        <span>Generated ${new Date().toLocaleString('en-GB')}</span>
      </div>
    </body></html>`)
    win.document.close()
    setTimeout(() => win.print(), 500)
  }

  const deleteReport = (id) => {
    if (!confirm('Bericht löschen?')) return
    saveReports(reports.filter(r => r.id !== id))
    if (selectedReport?.id === id) setSelectedReport(null)
  }

  // ════════════════════════════════════════════
  // VIEW: LISTE
  // ════════════════════════════════════════════
  if (view === 'list') return (
    <div className="vr">
      <div className="vr-header">
        <div>
          <h2 className="vr-title"><i className="ti ti-clipboard-text" /> Besuchsberichte</h2>
          <p className="vr-sub">Eingabe auf Deutsch · Export auf Englisch</p>
        </div>
        <button className="vr-btn-new" onClick={() => { setForm(EMPTY_FORM); setGeneratedEN(null); setView('new') }}>
          <i className="ti ti-plus" /> Neuer Bericht
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="vr-empty">
          <i className="ti ti-clipboard-text" />
          <p>Noch keine Berichte gespeichert.</p>
          <button className="vr-btn-new" onClick={() => setView('new')}>Ersten Bericht erstellen</button>
        </div>
      ) : (
        <div className="vr-list">
          {reports.map(r => {
            const opp = OPPORTUNITY_OPTIONS.find(o => o.value === r.opportunityLevel)
            return (
              <div key={r.id} className="vr-card" onClick={() => { setSelectedReport(r); setView('detail') }}>
                <div className="vr-card-top">
                  <div>
                    <div className="vr-card-customer">{r.customer}</div>
                    <div className="vr-card-meta">
                      <i className="ti ti-calendar" />
                      {new Date(r.date).toLocaleDateString('de-DE')}
                      {r.scContact && <><i className="ti ti-user" style={{marginLeft:'10px'}} />{r.scContact}</>}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                    <span className="vr-opp-badge" style={{background:opp?.bg,color:opp?.color,border:`1px solid ${opp?.border}`}}>
                      {opp?.label}
                    </span>
                    <button className="vr-icon-btn" onClick={e => { e.stopPropagation(); exportPDF(r) }} title="PDF Export">
                      <i className="ti ti-file-type-pdf" />
                    </button>
                    <button className="vr-icon-btn vr-icon-btn-del" onClick={e => { e.stopPropagation(); deleteReport(r.id) }} title="Löschen">
                      <i className="ti ti-trash" />
                    </button>
                  </div>
                </div>
                {r.segments?.length > 0 && (
                  <div className="vr-card-segs">
                    {r.segments.map(s => <span key={s} className="vr-seg">{s}</span>)}
                  </div>
                )}
                {r.generatedEN?.summary && (
                  <div className="vr-card-summary">{r.generatedEN.summary}</div>
                )}
                {r.productsDiscussed?.length > 0 && (
                  <div className="vr-card-prods">
                    {r.productsDiscussed.slice(0,4).map(id => {
                      const p = getAllProducts().find(x => x.id === id)
                      return p ? <span key={id} className={`vr-prod-tag vr-prod-${p.type}`}>{p.label}</span> : null
                    })}
                    {r.productsDiscussed.length > 4 && <span className="vr-prod-more">+{r.productsDiscussed.length - 4}</span>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  // ════════════════════════════════════════════
  // VIEW: NEUER BERICHT (Eingabe Deutsch)
  // ════════════════════════════════════════════
  if (view === 'new') return (
    <div className="vr">
      <div className="vr-header">
        <div>
          <h2 className="vr-title">Neuer Besuchsbericht</h2>
          <p className="vr-sub">Eingabe auf Deutsch – KI übersetzt automatisch auf Englisch</p>
        </div>
        <button className="vr-btn-sec" onClick={() => setView('list')}>
          <i className="ti ti-arrow-left" /> Zurück
        </button>
      </div>

      <div className="vr-form">

        {/* Kundendaten */}
        <div className="vr-section">
          <div className="vr-section-title">🏢 Kundendaten</div>
          <div className="vr-grid-2">
            <div className="vr-field">
              <label>Kunde *</label>
              <input value={form.customer} onChange={e => updateForm('customer', e.target.value)} placeholder="Firmenname" />
            </div>
            <div className="vr-field">
              <label>Datum *</label>
              <input type="date" value={form.date} onChange={e => updateForm('date', e.target.value)} />
            </div>
            <div className="vr-field">
              <label>Adresse</label>
              <input value={form.address} onChange={e => updateForm('address', e.target.value)} placeholder="Straße, PLZ Ort" />
            </div>
            <div className="vr-field">
              <label>Safic-Alcan Kontakt</label>
              <input value={form.scContact} onChange={e => updateForm('scContact', e.target.value)} />
            </div>
            <div className="vr-field vr-field-full">
              <label>Teilnehmer (Kundenseite)</label>
              <input value={form.participants} onChange={e => updateForm('participants', e.target.value)} placeholder="Name, Funktion · Name, Funktion" />
            </div>
          </div>
        </div>

        {/* Segmente */}
        <div className="vr-section">
          <div className="vr-section-title">🏷 Segmente</div>
          <div className="vr-seg-picker">
            {SEGMENT_OPTIONS.map(s => (
              <button key={s}
                className={`vr-seg-btn ${form.segments.includes(s) ? 'active' : ''}`}
                onClick={() => toggleSegment(s)}>{s}</button>
            ))}
          </div>
        </div>

        {/* Gesprächsinhalte */}
        <div className="vr-section">
          <div className="vr-section-title">💬 Gesprächsinhalte <span className="vr-de-hint">auf Deutsch</span></div>
          <div className="vr-field">
            <label>Ziele / Anlass des Besuchs</label>
            <textarea rows={2} value={form.objectives} onChange={e => updateForm('objectives', e.target.value)}
              placeholder="z.B. Erstbesuch, Mustervorstellung EGM38, Nachverfolgung Angebot..." />
          </div>
          <div className="vr-field">
            <label>Gesprächsinhalt * <span style={{color:'#94a3b8',fontWeight:400}}>(Stichworte oder Sätze)</span></label>
            <textarea rows={5} value={form.discussion} onChange={e => updateForm('discussion', e.target.value)}
              placeholder="Was wurde besprochen? z.B. Kunde arbeitet mit Epoxy-Systemen auf Metallsubstraten, Haftungsprobleme nach Feuchtebelastung, aktuell AMEO von Wacker im Einsatz..." />
          </div>
          <div className="vr-field">
            <label>Technische Details</label>
            <textarea rows={3} value={form.technicalDetails} onChange={e => updateForm('technicalDetails', e.target.value)}
              placeholder="z.B. pH-Wert alkalisch, Substrat Aluminium, Dosierung 0.5%, Testmethode ISO 4624..." />
          </div>
        </div>

        {/* Produkte */}
        <div className="vr-section">
          <div className="vr-section-title">⚗️ Besprochene Produkte</div>
          <div className="vr-prod-search-wrap">
            <input
              className="vr-prod-search"
              placeholder="Produkt suchen (z.B. GLYMO, HC208, Neboflow...)"
              value={productSearch}
              onChange={e => { setProductSearch(e.target.value); setShowProductPicker(true) }}
              onFocus={() => setShowProductPicker(true)}
            />
            {showProductPicker && (
              <div className="vr-prod-dropdown">
                {filteredProducts.slice(0, 30).map(p => (
                  <div key={p.id}
                    className={`vr-prod-option ${form.productsDiscussed.includes(p.id) ? 'selected' : ''}`}
                    onClick={() => { toggleProduct(p.id); setProductSearch('') }}
                  >
                    <span className={`vr-prod-type-dot vr-prod-${p.type}`} />
                    <span className="vr-prod-label">{p.label}</span>
                    <span className="vr-prod-sup">{p.sup}</span>
                    {form.productsDiscussed.includes(p.id) && <i className="ti ti-check" style={{color:'#15803d',marginLeft:'auto'}} />}
                  </div>
                ))}
                <div className="vr-prod-close" onClick={() => setShowProductPicker(false)}>Schließen</div>
              </div>
            )}
          </div>
          {form.productsDiscussed.length > 0 && (
            <div className="vr-selected-prods">
              {form.productsDiscussed.map(id => {
                const p = getAllProducts().find(x => x.id === id)
                return p ? (
                  <span key={id} className={`vr-prod-tag vr-prod-${p.type}`}>
                    {p.label}
                    <button onClick={() => toggleProduct(id)}>×</button>
                  </span>
                ) : null
              })}
            </div>
          )}
        </div>

        {/* Nächste Schritte */}
        <div className="vr-section">
          <div className="vr-section-title">✅ Nächste Schritte <span className="vr-de-hint">auf Deutsch</span></div>
          <div className="vr-grid-2">
            <div className="vr-field vr-field-full">
              <label>Nächste Schritte / Follow-up</label>
              <textarea rows={3} value={form.nextSteps} onChange={e => updateForm('nextSteps', e.target.value)}
                placeholder="z.B. Muster EGM38 (500g) schicken bis 15.06., Angebot AME02 vorbereiten, nächster Besuch Q3..." />
            </div>
            <div className="vr-field">
              <label>Nächster Besuchstermin</label>
              <input type="date" value={form.nextVisitDate} onChange={e => updateForm('nextVisitDate', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Opportunity */}
        <div className="vr-section">
          <div className="vr-section-title">📊 Opportunity-Bewertung</div>
          <div className="vr-grid-3">
            <div className="vr-field">
              <label>Wahrscheinlichkeit</label>
              <div className="vr-opp-picker">
                {OPPORTUNITY_OPTIONS.map(o => (
                  <button key={o.value}
                    className={`vr-opp-btn ${form.opportunityLevel === o.value ? 'active' : ''}`}
                    style={form.opportunityLevel === o.value ? {background:o.bg,color:o.color,borderColor:o.border} : {}}
                    onClick={() => updateForm('opportunityLevel', o.value)}>{o.label}</button>
                ))}
              </div>
            </div>
            <div className="vr-field">
              <label>Geschätztes Volumen</label>
              <select value={form.estimatedVolume} onChange={e => updateForm('estimatedVolume', e.target.value)}>
                {VOLUME_OPTIONS.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="vr-field">
              <label>Zeitrahmen</label>
              <input value={form.estimatedTimeline} onChange={e => updateForm('estimatedTimeline', e.target.value)}
                placeholder="z.B. Q3 2025, 6 Monate" />
            </div>
          </div>
        </div>

        {error && (
          <div className="vr-error"><i className="ti ti-alert-circle" /> {error}</div>
        )}

        <div className="vr-form-actions">
          <button className="vr-btn-sec" onClick={() => setView('list')}>Abbrechen</button>
          <button className="vr-btn-generate" onClick={generateReport} disabled={generating}>
            {generating
              ? <><span className="vr-spinner" /> Übersetze & formatiere…</>
              : <><i className="ti ti-language" /> Englischen Bericht generieren</>
            }
          </button>
        </div>
      </div>
    </div>
  )

  // ════════════════════════════════════════════
  // VIEW: VORSCHAU (Englischer Bericht)
  // ════════════════════════════════════════════
  if (view === 'preview') {
    const opp = OPPORTUNITY_OPTIONS.find(o => o.value === form.opportunityLevel)
    const prods = form.productsDiscussed.map(id => getAllProducts().find(x => x.id === id)).filter(Boolean)

    return (
      <div className="vr">
        <div className="vr-header">
          <div>
            <h2 className="vr-title">Visit Report – Vorschau</h2>
            <p className="vr-sub">Englische Version · Bitte prüfen vor dem Speichern</p>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="vr-btn-sec" onClick={() => setView('new')}><i className="ti ti-arrow-left" /> Bearbeiten</button>
            <button className="vr-btn-save" onClick={saveReport}><i className="ti ti-device-floppy" /> Speichern</button>
          </div>
        </div>

        <div className="vr-preview">
          {/* Report Header */}
          <div className="vrp-header">
            <div>
              <div className="vrp-title">Visit Report</div>
              <div className="vrp-customer">{form.customer}</div>
              <div className="vrp-date">{new Date(form.date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}</div>
            </div>
            <div className="vrp-company">
              <div className="vrp-company-name">Safic-Alcan Deutschland GmbH</div>
              <div>CASE & Industrial Specialties</div>
              <div>{form.scContact}</div>
            </div>
          </div>

          {/* Summary */}
          {generatedEN?.summary && (
            <div className="vrp-summary">{generatedEN.summary}</div>
          )}

          {/* Meta */}
          <div className="vrp-meta-grid">
            {[
              ['Customer', form.customer],
              ['Date', new Date(form.date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})],
              ['Address', form.address || '—'],
              ['Participants', form.participants || '—'],
              ['Safic-Alcan Contact', form.scContact],
              ['Next Visit', form.nextVisitDate || '—'],
            ].map(([l, v]) => (
              <div key={l} className="vrp-meta-item">
                <div className="vrp-meta-label">{l}</div>
                <div className="vrp-meta-value">{v}</div>
              </div>
            ))}
          </div>

          {/* Segments */}
          {form.segments.length > 0 && (
            <div className="vrp-section">
              <div className="vrp-section-title">Segments</div>
              <div className="vrp-segs">{form.segments.map(s => <span key={s} className="vrp-seg">{s}</span>)}</div>
            </div>
          )}

          {/* Content sections */}
          {[
            ['Objectives', generatedEN?.objectives],
            ['Discussion', generatedEN?.discussion],
            ['Technical Details', generatedEN?.technicalDetails],
          ].map(([title, content]) => content ? (
            <div key={title} className="vrp-section">
              <div className="vrp-section-title">{title}</div>
              <div className="vrp-content">{content}</div>
            </div>
          ) : null)}

          {/* Products */}
          {prods.length > 0 && (
            <div className="vrp-section">
              <div className="vrp-section-title">Products Discussed</div>
              <div className="vrp-prods">
                {prods.map(p => (
                  <span key={p.id} className={`vr-prod-tag vr-prod-${p.type}`}>{p.label} <span style={{opacity:0.6,fontSize:'10px'}}>({p.sup})</span></span>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          {generatedEN?.nextSteps && (
            <div className="vrp-section">
              <div className="vrp-section-title">Next Steps</div>
              <div className="vrp-content">{generatedEN.nextSteps}</div>
            </div>
          )}

          {/* Opportunity */}
          <div className="vrp-section">
            <div className="vrp-section-title">Opportunity Assessment</div>
            <div className="vrp-opp-row">
              <span className="vr-opp-badge" style={{background:opp?.bg,color:opp?.color,border:`1px solid ${opp?.border}`}}>{opp?.label}</span>
              <span className="vrp-opp-detail">Volume: <strong>{form.estimatedVolume}</strong></span>
              {form.estimatedTimeline && <span className="vrp-opp-detail">Timeline: <strong>{form.estimatedTimeline}</strong></span>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ════════════════════════════════════════════
  // VIEW: DETAIL (gespeicherter Bericht)
  // ════════════════════════════════════════════
  if (view === 'detail' && selectedReport) {
    const r = selectedReport
    const en = r.generatedEN || {}
    const opp = OPPORTUNITY_OPTIONS.find(o => o.value === r.opportunityLevel)
    const prods = (r.productsDiscussed || []).map(id => getAllProducts().find(x => x.id === id)).filter(Boolean)

    return (
      <div className="vr">
        <div className="vr-header">
          <div>
            <h2 className="vr-title">{r.customer}</h2>
            <p className="vr-sub">{new Date(r.date).toLocaleDateString('de-DE')} · {r.scContact}</p>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="vr-btn-sec" onClick={() => setView('list')}><i className="ti ti-arrow-left" /> Liste</button>
            <button className="vr-btn-new" onClick={() => exportPDF(r)}><i className="ti ti-file-type-pdf" /> PDF</button>
          </div>
        </div>

        <div className="vr-preview">
          <div className="vrp-header">
            <div>
              <div className="vrp-title">Visit Report</div>
              <div className="vrp-customer">{r.customer}</div>
              <div className="vrp-date">{new Date(r.date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}</div>
            </div>
            <div className="vrp-company">
              <div className="vrp-company-name">Safic-Alcan Deutschland GmbH</div>
              <div>CASE & Industrial Specialties</div>
              <div>{r.scContact}</div>
            </div>
          </div>

          {en.summary && <div className="vrp-summary">{en.summary}</div>}

          <div className="vrp-meta-grid">
            {[['Customer',r.customer],['Date',new Date(r.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})],
              ['Address',r.address||'—'],['Participants',r.participants||'—'],
              ['Safic-Alcan Contact',r.scContact],['Next Visit',r.nextVisitDate||'—']
            ].map(([l,v]) => (
              <div key={l} className="vrp-meta-item">
                <div className="vrp-meta-label">{l}</div>
                <div className="vrp-meta-value">{v}</div>
              </div>
            ))}
          </div>

          {r.segments?.length > 0 && (
            <div className="vrp-section">
              <div className="vrp-section-title">Segments</div>
              <div className="vrp-segs">{r.segments.map(s => <span key={s} className="vrp-seg">{s}</span>)}</div>
            </div>
          )}

          {[['Objectives',en.objectives],['Discussion',en.discussion],['Technical Details',en.technicalDetails]].map(([t,c]) => c ? (
            <div key={t} className="vrp-section">
              <div className="vrp-section-title">{t}</div>
              <div className="vrp-content">{c}</div>
            </div>
          ) : null)}

          {prods.length > 0 && (
            <div className="vrp-section">
              <div className="vrp-section-title">Products Discussed</div>
              <div className="vrp-prods">
                {prods.map(p => <span key={p.id} className={`vr-prod-tag vr-prod-${p.type}`}>{p.label}</span>)}
              </div>
            </div>
          )}

          {en.nextSteps && (
            <div className="vrp-section">
              <div className="vrp-section-title">Next Steps</div>
              <div className="vrp-content">{en.nextSteps}</div>
            </div>
          )}

          <div className="vrp-section">
            <div className="vrp-section-title">Opportunity Assessment</div>
            <div className="vrp-opp-row">
              <span className="vr-opp-badge" style={{background:opp?.bg,color:opp?.color,border:`1px solid ${opp?.border}`}}>{opp?.label}</span>
              <span className="vrp-opp-detail">Volume: <strong>{r.estimatedVolume}</strong></span>
              {r.estimatedTimeline && <span className="vrp-opp-detail">Timeline: <strong>{r.estimatedTimeline}</strong></span>}
            </div>
          </div>

          {/* Deutsche Notizen (nur in App, nicht im PDF) */}
          {r.formDE && (
            <div className="vrp-section vrp-de-notes">
              <div className="vrp-section-title">🇩🇪 Originale Notizen (intern)</div>
              {r.formDE.discussion && <div className="vrp-de-block"><div className="vrp-de-label">Gesprächsinhalt</div><div>{r.formDE.discussion}</div></div>}
              {r.formDE.nextSteps && <div className="vrp-de-block"><div className="vrp-de-label">Nächste Schritte</div><div>{r.formDE.nextSteps}</div></div>}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
