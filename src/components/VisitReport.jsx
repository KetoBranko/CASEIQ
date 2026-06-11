// src/components/VisitReport.jsx
// Besuchsberichte – Eingabe auf Deutsch, Ausgabe auf Englisch
// PDF via Blob-Download (kein window.open), Spracheingabe via Web Speech API

import { useState, useEffect, useRef } from 'react'
import { PRODUCTS } from '../data/products'
import { HYDROLAR_PRODUCTS } from '../data/hydrolar'
import { SILAN_PRODUCTS } from '../data/silane'
import './VisitReport.css'

const STORAGE_KEY = 'caseiq_visit_reports'

const OPPORTUNITY_OPTIONS = [
  { value: 'high',   label: 'Hoch (>70%)',   color: '#15803d', bg: '#dcfce7', border: '#86efac' },
  { value: 'medium', label: 'Mittel (40–70%)', color: '#b45309', bg: '#fef9c3', border: '#fde047' },
  { value: 'low',    label: 'Niedrig (<40%)', color: '#dc2626', bg: '#fee2e2', border: '#fca5a5' },
]

const SEGMENT_OPTIONS = ['Coatings', 'Adhesives', 'Sealants', 'Elastomers', 'Construction', 'Plastics / Composites', 'Printing Inks', 'Textile & Leather']
const VOLUME_OPTIONS = ['< 1 t/Jahr', '1–5 t/Jahr', '5–20 t/Jahr', '20–50 t/Jahr', '> 50 t/Jahr', 'Unbekannt']

const EMPTY_FORM = {
  customer: '', address: '',
  date: new Date().toISOString().split('T')[0],
  scContact: 'Branko Premužak',
  participants: '', segments: [],
  objectives: '', discussion: '',
  productsDiscussed: [], productNotes: {}, technicalDetails: '',
  nextSteps: '', nextVisitDate: '',
  opportunityLevel: 'medium', estimatedVolume: 'Unbekannt', estimatedTimeline: '',
}

function getAllProducts() {
  const all = []
  PRODUCTS.forEach(p => all.push({ id: `p_${p.id}`, label: p.n, sup: p.sup, type: 'product' }))
  HYDROLAR_PRODUCTS.forEach(p => all.push({ id: `h_${p.id}`, label: p.id, sup: 'COIM Hydrolar', type: 'hydrolar' }))
  SILAN_PRODUCTS.forEach(p => all.push({ id: `s_${p.id}`, label: `${p.id} · ${p.handelsname}`, sup: 'Safic-Chem SIL', type: 'silan' }))
  return all
}

function buildPrompt(form) {
  const allP = getAllProducts()
  const prodsWithNotes = form.productsDiscussed.map(id => {
    const p = allP.find(x => x.id === id)
    const note = form.productNotes?.[id] || ''
    return p ? `${p.label} (${p.sup})${note ? ': ' + note : ''}` : id
  }).join('\n')
  return `You are writing a professional visit report for Safic-Alcan Deutschland GmbH, a specialty chemicals distributor.
Translate and format the following information into a professional English visit report.
Be precise, professional, use chemical/technical terminology correctly.
Return ONLY a JSON object, no markdown, no backticks.

Format:
{"objectives":"...","discussion":"...","productDetails":"...","technicalDetails":"...","nextSteps":"...","summary":"One sentence executive summary"}

Input:
Customer: ${form.customer}
Date: ${form.date}
Segments: ${form.segments.join(', ')}
Products discussed with notes (German):
${prodsWithNotes || 'none specified'}
Objectives (German): ${form.objectives}
Discussion (German): ${form.discussion}
Technical details (German): ${form.technicalDetails}
Next steps (German): ${form.nextSteps}
Opportunity: ${form.opportunityLevel}, Volume: ${form.estimatedVolume}, Timeline: ${form.estimatedTimeline}

For productDetails: write a structured paragraph per product in English, based on the German notes provided.`
}

// ─── PDF-Generierung via Blob (funktioniert in allen Browsern) ────────────────

function generatePDFHtml(report) {
  const en = report.generatedEN || {}
  const opp = OPPORTUNITY_OPTIONS.find(o => o.value === report.opportunityLevel)
  const prods = (report.productsDiscussed || []).map(id => {
    const p = getAllProducts().find(x => x.id === id)
    return p || null
  }).filter(Boolean)

  const metaRows = [
    ['Customer', report.customer],
    ['Date', new Date(report.date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})],
    ['Address', report.address || '—'],
    ['Participants', report.participants || '—'],
    ['Safic-Alcan Contact', report.scContact],
    ['Next Visit', report.nextVisitDate || '—'],
  ]

  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>Visit Report – ${report.customer}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;font-size:13px;color:#1a1a2e;padding:40px;background:#fff}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:18px;border-bottom:3px solid #1e3a6e;margin-bottom:22px;flex-wrap:wrap;gap:10px}
.hdr-l h1{font-size:22px;font-weight:800;color:#1e3a6e}
.hdr-l .sub{font-size:12px;color:#64748b;margin-top:3px}
.hdr-r{text-align:right;font-size:12px;color:#64748b}
.hdr-r strong{color:#1e3a6e;font-size:13px;display:block}
.summary{background:#eff6ff;border-left:4px solid #1e3a6e;padding:11px 15px;border-radius:0 8px 8px 0;font-size:13px;font-style:italic;color:#1e3a6e;margin-bottom:20px;line-height:1.6}
.meta{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:20px}
.meta-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8;font-weight:700;margin-bottom:2px}
.meta-val{font-size:13px;color:#1e293b;font-weight:500}
.sec{margin-bottom:18px}
.sec-title{font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#1e3a6e;font-weight:800;border-bottom:1px solid #e2e8f0;padding-bottom:5px;margin-bottom:9px}
.content{font-size:13px;color:#334155;line-height:1.75;white-space:pre-wrap}
.segs{display:flex;flex-wrap:wrap;gap:5px}
.seg{padding:2px 9px;border-radius:999px;font-size:11px;font-weight:600;background:#e8f0fc;color:#1e3a6e;border:1px solid #bfdbfe}
.prods{display:flex;flex-wrap:wrap;gap:6px}
.prod{padding:3px 10px;border-radius:5px;font-size:11px;font-weight:600;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe}
.prod.hl{background:#ecfeff;color:#0e7490;border-color:#a5f3fc}
.prod.sil{background:#f5f3ff;color:#5b21b6;border-color:#ddd6fe}
.opp-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.opp-badge{padding:4px 12px;border-radius:6px;font-size:12px;font-weight:700}
.footer{margin-top:36px;padding-top:12px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:10px;color:#94a3b8}
@media print{body{padding:20px}}
</style>
</head><body>
<div class="hdr">
  <div class="hdr-l">
    <h1>Visit Report</h1>
    <div class="sub">${report.customer} · ${new Date(report.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
  </div>
  <div class="hdr-r">
    <strong>Safic-Alcan Deutschland GmbH</strong>
    <span>CASE & Industrial Specialties</span><br>
    <span>${report.scContact}</span>
  </div>
</div>

${en.summary ? `<div class="summary">${en.summary}</div>` : ''}

<div class="meta">
  ${metaRows.map(([l,v]) => `<div><div class="meta-lbl">${l}</div><div class="meta-val">${v}</div></div>`).join('')}
</div>

${report.segments?.length ? `<div class="sec"><div class="sec-title">Segments</div><div class="segs">${report.segments.map(s=>`<span class="seg">${s}</span>`).join('')}</div></div>` : ''}
${en.objectives ? `<div class="sec"><div class="sec-title">Objectives</div><div class="content">${en.objectives}</div></div>` : ''}
${en.discussion ? `<div class="sec"><div class="sec-title">Discussion</div><div class="content">${en.discussion}</div></div>` : ''}
${en.technicalDetails ? `<div class="sec"><div class="sec-title">Technical Details</div><div class="content">${en.technicalDetails}</div></div>` : ''}

${prods.length ? `<div class="sec"><div class="sec-title">Products Discussed</div><div class="prods">${prods.map(p=>`<span class="prod ${p.type==='hydrolar'?'hl':p.type==='silan'?'sil':''}">${p.label}</span>`).join('')}</div></div>` : ''}
${en.productDetails ? `<div class="sec"><div class="sec-title">Product Details</div><div class="content">${en.productDetails}</div></div>` : ''}

${en.nextSteps ? `<div class="sec"><div class="sec-title">Next Steps</div><div class="content">${en.nextSteps}</div></div>` : ''}

<div class="sec">
  <div class="sec-title">Opportunity Assessment</div>
  <div class="opp-row">
    <span class="opp-badge" style="background:${opp?.bg};color:${opp?.color};border:1px solid ${opp?.border}">${opp?.label}</span>
    <span style="font-size:12px;color:#64748b">Volume: <strong>${report.estimatedVolume}</strong></span>
    ${report.estimatedTimeline ? `<span style="font-size:12px;color:#64748b">Timeline: <strong>${report.estimatedTimeline}</strong></span>` : ''}
  </div>
</div>

<div class="footer">
  <span>Safic-Alcan Deutschland GmbH · CASE·IQ Sales Tool v2.3</span>
  <span>Generated ${new Date().toLocaleString('en-GB')}</span>
</div>
</body></html>`
}

// PDF als Blob herunterladen – funktioniert in allen Browsern ohne window.open
function exportPDF(report) {
  const html = generatePDFHtml(report)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `VisitReport_${report.customer.replace(/\s+/g, '_')}_${report.date}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── Spracheingabe Hook ───────────────────────────────────────────────────────

function useSpeech(onResult) {
  const [listening, setListening] = useState(false)
  const recRef = useRef(null)
  const supported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  const start = () => {
    if (!supported) { alert('Spracheingabe wird in diesem Browser nicht unterstützt.'); return }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    rec.lang = 'de-DE'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => { onResult(e.results[0][0].transcript); setListening(false) }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)
    recRef.current = rec
    rec.start()
    setListening(true)
  }

  const stop = () => { recRef.current?.stop(); setListening(false) }

  return { listening, start, stop, supported }
}

// ─── Textarea mit Mikrofon-Button ─────────────────────────────────────────────

function SpeechTextarea({ value, onChange, placeholder, rows = 4, fieldKey }) {
  const { listening, start, stop, supported } = useSpeech((transcript) => {
    onChange(value ? value + ' ' + transcript : transcript)
  })

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        rows={rows}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingRight: supported ? '44px' : '10px' }}
      />
      {supported && (
        <button
          type="button"
          onClick={listening ? stop : start}
          title={listening ? 'Aufnahme stoppen' : 'Spracheingabe starten'}
          style={{
            position: 'absolute', right: '8px', bottom: '10px',
            width: '30px', height: '30px', borderRadius: '50%', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '15px',
            background: listening ? '#fee2e2' : '#eff6ff',
            color: listening ? '#dc2626' : '#1d4ed8',
            boxShadow: listening ? '0 0 0 3px rgba(220,38,38,0.2)' : 'none',
            animation: listening ? 'pulse 1s infinite' : 'none',
          }}
        >
          {listening ? '⏹' : '🎤'}
        </button>
      )}
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function VisitReport() {
  const [view, setView] = useState('list')
  const [form, setForm] = useState(EMPTY_FORM)
  const [reports, setReports] = useState([])
  const [generating, setGenerating] = useState(false)
  const [generatedEN, setGeneratedEN] = useState(null)
  const [error, setError] = useState(null)
  const [apiKey] = useState(() => localStorage.getItem('sa_api_key') || '')
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
  const toggleSegment = (s) => updateForm('segments', form.segments.includes(s) ? form.segments.filter(x=>x!==s) : [...form.segments, s])
  const toggleProduct = (id) => updateForm('productsDiscussed', form.productsDiscussed.includes(id) ? form.productsDiscussed.filter(x=>x!==id) : [...form.productsDiscussed, id])

  const allProducts = getAllProducts()
  const filteredProducts = productSearch
    ? allProducts.filter(p => p.label.toLowerCase().includes(productSearch.toLowerCase()) || p.sup.toLowerCase().includes(productSearch.toLowerCase()))
    : allProducts

  const generateReport = async () => {
    if (!apiKey) { alert('Bitte API Key in der Kundenrecherche einrichten.'); return }
    if (!form.customer || !form.discussion) { alert('Bitte mindestens Kunde und Gesprächsinhalt ausfüllen.'); return }
    setGenerating(true); setError(null)
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
    } catch (e) { setError(e.message) }
    finally { setGenerating(false) }
  }

  const saveReport = () => {
    const report = {
      id: Date.now(), date: form.date, customer: form.customer,
      scContact: form.scContact, address: form.address, participants: form.participants,
      segments: form.segments, productsDiscussed: form.productsDiscussed,
      opportunityLevel: form.opportunityLevel, estimatedVolume: form.estimatedVolume,
      estimatedTimeline: form.estimatedTimeline, nextVisitDate: form.nextVisitDate,
      formDE: { objectives: form.objectives, discussion: form.discussion, technicalDetails: form.technicalDetails, nextSteps: form.nextSteps, productNotes: form.productNotes },
      generatedEN,
    }
    saveReports([report, ...reports])
    setForm(EMPTY_FORM); setGeneratedEN(null); setView('list')
  }

  const deleteReport = (id) => {
    if (!confirm('Bericht löschen?')) return
    saveReports(reports.filter(r => r.id !== id))
    if (selectedReport?.id === id) setSelectedReport(null)
  }

  // ════════════ LIST VIEW ════════════
  if (view === 'list') return (
    <div className="vr">
      <div className="vr-header">
        <div>
          <h2 className="vr-title"><i className="ti ti-clipboard-text" /> Besuchsberichte</h2>
          <p className="vr-sub">Eingabe auf Deutsch · KI übersetzt auf Englisch · PDF-Download</p>
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
                      <i className="ti ti-calendar" /> {new Date(r.date).toLocaleDateString('de-DE')}
                      {r.scContact && <><i className="ti ti-user" style={{marginLeft:'10px'}} />{r.scContact}</>}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                    <span className="vr-opp-badge" style={{background:opp?.bg,color:opp?.color,border:`1px solid ${opp?.border}`}}>{opp?.label}</span>
                    <button className="vr-icon-btn" onClick={e=>{e.stopPropagation();exportPDF(r)}} title="PDF herunterladen"><i className="ti ti-file-type-pdf" /></button>
                    <button className="vr-icon-btn vr-icon-btn-del" onClick={e=>{e.stopPropagation();deleteReport(r.id)}} title="Löschen"><i className="ti ti-trash" /></button>
                  </div>
                </div>
                {r.segments?.length > 0 && <div className="vr-card-segs">{r.segments.map(s=><span key={s} className="vr-seg">{s}</span>)}</div>}
                {r.generatedEN?.summary && <div className="vr-card-summary">{r.generatedEN.summary}</div>}
                {r.productsDiscussed?.length > 0 && (
                  <div className="vr-card-prods">
                    {r.productsDiscussed.slice(0,4).map(id => { const p=getAllProducts().find(x=>x.id===id); return p?<span key={id} className={`vr-prod-tag vr-prod-${p.type}`}>{p.label}</span>:null })}
                    {r.productsDiscussed.length > 4 && <span className="vr-prod-more">+{r.productsDiscussed.length-4}</span>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  // ════════════ NEW / FORM VIEW ════════════
  if (view === 'new') return (
    <div className="vr">
      <div className="vr-header">
        <div>
          <h2 className="vr-title">Neuer Besuchsbericht</h2>
          <p className="vr-sub">Auf Deutsch ausfüllen – 🎤 Mikrofon-Button für Spracheingabe verfügbar</p>
        </div>
        <button className="vr-btn-sec" onClick={() => setView('list')}><i className="ti ti-arrow-left" /> Zurück</button>
      </div>

      <div className="vr-form">
        {/* Kundendaten */}
        <div className="vr-section">
          <div className="vr-section-title">🏢 Kundendaten</div>
          <div className="vr-grid-2">
            <div className="vr-field"><label>Kunde *</label><input value={form.customer} onChange={e=>updateForm('customer',e.target.value)} placeholder="Firmenname" /></div>
            <div className="vr-field"><label>Datum *</label><input type="date" value={form.date} onChange={e=>updateForm('date',e.target.value)} /></div>
            <div className="vr-field"><label>Adresse</label><input value={form.address} onChange={e=>updateForm('address',e.target.value)} placeholder="Straße, PLZ Ort" /></div>
            <div className="vr-field"><label>Safic-Alcan Kontakt</label><input value={form.scContact} onChange={e=>updateForm('scContact',e.target.value)} /></div>
            <div className="vr-field vr-field-full"><label>Teilnehmer (Kundenseite)</label><input value={form.participants} onChange={e=>updateForm('participants',e.target.value)} placeholder="Name, Funktion · Name, Funktion" /></div>
          </div>
        </div>

        {/* Segmente */}
        <div className="vr-section">
          <div className="vr-section-title">🏷 Segmente</div>
          <div className="vr-seg-picker">
            {SEGMENT_OPTIONS.map(s => <button key={s} className={`vr-seg-btn ${form.segments.includes(s)?'active':''}`} onClick={()=>toggleSegment(s)}>{s}</button>)}
          </div>
        </div>

        {/* Gesprächsinhalte */}
        <div className="vr-section">
          <div className="vr-section-title">💬 Gesprächsinhalte <span className="vr-de-hint">auf Deutsch · 🎤 Sprache möglich</span></div>
          <div className="vr-field">
            <label>Ziele / Anlass des Besuchs</label>
            <SpeechTextarea rows={2} value={form.objectives} onChange={v=>updateForm('objectives',v)}
              placeholder="z.B. Erstbesuch, Mustervorstellung EGM38, Nachverfolgung Angebot..." />
          </div>
          <div className="vr-field">
            <label>Gesprächsinhalt * <span style={{color:'#94a3b8',fontWeight:400}}>(Stichworte oder Sätze)</span></label>
            <SpeechTextarea rows={5} value={form.discussion} onChange={v=>updateForm('discussion',v)}
              placeholder="Was wurde besprochen? Einfach sprechen oder tippen..." />
          </div>
          <div className="vr-field">
            <label>Technische Details</label>
            <SpeechTextarea rows={3} value={form.technicalDetails} onChange={v=>updateForm('technicalDetails',v)}
              placeholder="z.B. pH-Wert alkalisch, Substrat Aluminium, Dosierung 0.5%..." />
          </div>
        </div>

        {/* Produkte */}
        <div className="vr-section">
          <div className="vr-section-title">⚗️ Besprochene Produkte</div>
          <div className="vr-prod-search-wrap">
            <input className="vr-prod-search" placeholder="Produkt suchen (z.B. GLYMO, HC208, Neboflow...)"
              value={productSearch} onChange={e=>{setProductSearch(e.target.value);setShowProductPicker(true)}} onFocus={()=>setShowProductPicker(true)} />
            {showProductPicker && (
              <div className="vr-prod-dropdown">
                {filteredProducts.slice(0,30).map(p => (
                  <div key={p.id} className={`vr-prod-option ${form.productsDiscussed.includes(p.id)?'selected':''}`}
                    onClick={()=>{toggleProduct(p.id);setProductSearch('')}}>
                    <span className={`vr-prod-type-dot vr-prod-${p.type}`} />
                    <span className="vr-prod-label">{p.label}</span>
                    <span className="vr-prod-sup">{p.sup}</span>
                    {form.productsDiscussed.includes(p.id) && <i className="ti ti-check" style={{color:'#15803d',marginLeft:'auto'}} />}
                  </div>
                ))}
                <div className="vr-prod-close" onClick={()=>setShowProductPicker(false)}>Schließen</div>
              </div>
            )}
          </div>
          {form.productsDiscussed.length > 0 && (
            <div className="vr-prod-notes-list">
              {form.productsDiscussed.map(id => {
                const p = getAllProducts().find(x => x.id === id)
                if (!p) return null
                return (
                  <div key={id} className="vr-prod-note-item">
                    <div className="vr-prod-note-header">
                      <span className={`vr-prod-tag vr-prod-${p.type}`}>{p.label}</span>
                      <span className="vr-prod-note-sup">{p.sup}</span>
                      <button className="vr-prod-note-remove" onClick={() => toggleProduct(id)}>×</button>
                    </div>
                    <SpeechTextarea
                      rows={2}
                      value={form.productNotes?.[id] || ''}
                      onChange={v => updateForm('productNotes', { ...form.productNotes, [id]: v })}
                      placeholder={`Was wurde zu ${p.label} besprochen? Status, Interesse, Muster, Einwände...`}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Nächste Schritte */}
        <div className="vr-section">
          <div className="vr-section-title">✅ Nächste Schritte <span className="vr-de-hint">auf Deutsch · 🎤 Sprache möglich</span></div>
          <div className="vr-grid-2">
            <div className="vr-field vr-field-full">
              <label>Nächste Schritte / Follow-up</label>
              <SpeechTextarea rows={3} value={form.nextSteps} onChange={v=>updateForm('nextSteps',v)}
                placeholder="z.B. Muster EGM38 schicken, Angebot vorbereiten, nächster Besuch Q3..." />
            </div>
            <div className="vr-field"><label>Nächster Besuchstermin</label><input type="date" value={form.nextVisitDate} onChange={e=>updateForm('nextVisitDate',e.target.value)} /></div>
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
                  <button key={o.value} className={`vr-opp-btn ${form.opportunityLevel===o.value?'active':''}`}
                    style={form.opportunityLevel===o.value?{background:o.bg,color:o.color,borderColor:o.border}:{}}
                    onClick={()=>updateForm('opportunityLevel',o.value)}>{o.label}</button>
                ))}
              </div>
            </div>
            <div className="vr-field">
              <label>Geschätztes Volumen</label>
              <select value={form.estimatedVolume} onChange={e=>updateForm('estimatedVolume',e.target.value)}>
                {VOLUME_OPTIONS.map(v=><option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="vr-field">
              <label>Zeitrahmen</label>
              <input value={form.estimatedTimeline} onChange={e=>updateForm('estimatedTimeline',e.target.value)} placeholder="z.B. Q3 2025, 6 Monate" />
            </div>
          </div>
        </div>

        {error && <div className="vr-error"><i className="ti ti-alert-circle" /> {error}</div>}

        <div className="vr-form-actions">
          <button className="vr-btn-sec" onClick={()=>setView('list')}>Abbrechen</button>
          <button className="vr-btn-generate" onClick={generateReport} disabled={generating}>
            {generating ? <><span className="vr-spinner" /> Übersetze & formatiere…</> : <><i className="ti ti-language" /> Englischen Bericht generieren</>}
          </button>
        </div>
      </div>
    </div>
  )

  // ════════════ PREVIEW VIEW ════════════
  if (view === 'preview') {
    const opp = OPPORTUNITY_OPTIONS.find(o=>o.value===form.opportunityLevel)
    const prods = form.productsDiscussed.map(id=>getAllProducts().find(x=>x.id===id)).filter(Boolean)
    const previewReport = {
      ...form, generatedEN,
      formDE: { objectives:form.objectives, discussion:form.discussion, technicalDetails:form.technicalDetails, nextSteps:form.nextSteps }
    }

    return (
      <div className="vr">
        <div className="vr-header">
          <div>
            <h2 className="vr-title">Visit Report – Vorschau</h2>
            <p className="vr-sub">Englische Version · Bitte prüfen vor dem Speichern</p>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="vr-btn-sec" onClick={()=>setView('new')}><i className="ti ti-arrow-left" /> Bearbeiten</button>
            <button className="vr-btn-sec" onClick={()=>exportPDF(previewReport)}><i className="ti ti-download" /> PDF herunterladen</button>
            <button className="vr-btn-save" onClick={saveReport}><i className="ti ti-device-floppy" /> Speichern</button>
          </div>
        </div>

        <div className="vr-preview">
          <div className="vrp-header">
            <div>
              <div className="vrp-title">Visit Report</div>
              <div className="vrp-customer">{form.customer}</div>
              <div className="vrp-date">{new Date(form.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
            </div>
            <div className="vrp-company">
              <div className="vrp-company-name">Safic-Alcan Deutschland GmbH</div>
              <div>CASE & Industrial Specialties</div>
              <div>{form.scContact}</div>
            </div>
          </div>

          {generatedEN?.summary && <div className="vrp-summary">{generatedEN.summary}</div>}

          <div className="vrp-meta-grid">
            {[['Customer',form.customer],['Date',new Date(form.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})],
              ['Address',form.address||'—'],['Participants',form.participants||'—'],
              ['Safic-Alcan Contact',form.scContact],['Next Visit',form.nextVisitDate||'—']
            ].map(([l,v])=><div key={l} className="vrp-meta-item"><div className="vrp-meta-label">{l}</div><div className="vrp-meta-value">{v}</div></div>)}
          </div>

          {form.segments.length>0 && <div className="vrp-section"><div className="vrp-section-title">Segments</div><div className="vrp-segs">{form.segments.map(s=><span key={s} className="vrp-seg">{s}</span>)}</div></div>}

          {[['Objectives',generatedEN?.objectives],['Discussion',generatedEN?.discussion],['Technical Details',generatedEN?.technicalDetails]].map(([t,c])=>c?<div key={t} className="vrp-section"><div className="vrp-section-title">{t}</div><div className="vrp-content">{c}</div></div>:null)}

          {prods.length>0 && <div className="vrp-section"><div className="vrp-section-title">Products Discussed</div><div className="vrp-prods">{prods.map(p=><span key={p.id} className={`vr-prod-tag vr-prod-${p.type}`}>{p.label} <span style={{opacity:0.6,fontSize:'10px'}}>({p.sup})</span></span>)}</div></div>}

          {generatedEN?.productDetails && <div className="vrp-section"><div className="vrp-section-title">Product Details</div><div className="vrp-content">{generatedEN.productDetails}</div></div>}
          {generatedEN?.nextSteps && <div className="vrp-section"><div className="vrp-section-title">Next Steps</div><div className="vrp-content">{generatedEN.nextSteps}</div></div>}

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

  // ════════════ DETAIL VIEW ════════════
  if (view === 'detail' && selectedReport) {
    const r = selectedReport
    const en = r.generatedEN || {}
    const opp = OPPORTUNITY_OPTIONS.find(o=>o.value===r.opportunityLevel)
    const prods = (r.productsDiscussed||[]).map(id=>getAllProducts().find(x=>x.id===id)).filter(Boolean)

    return (
      <div className="vr">
        <div className="vr-header">
          <div>
            <h2 className="vr-title">{r.customer}</h2>
            <p className="vr-sub">{new Date(r.date).toLocaleDateString('de-DE')} · {r.scContact}</p>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="vr-btn-sec" onClick={()=>setView('list')}><i className="ti ti-arrow-left" /> Liste</button>
            <button className="vr-btn-new" onClick={()=>exportPDF(r)}><i className="ti ti-download" /> PDF herunterladen</button>
          </div>
        </div>

        <div className="vr-preview">
          <div className="vrp-header">
            <div>
              <div className="vrp-title">Visit Report</div>
              <div className="vrp-customer">{r.customer}</div>
              <div className="vrp-date">{new Date(r.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
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
            ].map(([l,v])=><div key={l} className="vrp-meta-item"><div className="vrp-meta-label">{l}</div><div className="vrp-meta-value">{v}</div></div>)}
          </div>

          {r.segments?.length>0 && <div className="vrp-section"><div className="vrp-section-title">Segments</div><div className="vrp-segs">{r.segments.map(s=><span key={s} className="vrp-seg">{s}</span>)}</div></div>}
          {[['Objectives',en.objectives],['Discussion',en.discussion],['Technical Details',en.technicalDetails]].map(([t,c])=>c?<div key={t} className="vrp-section"><div className="vrp-section-title">{t}</div><div className="vrp-content">{c}</div></div>:null)}
          {prods.length>0 && <div className="vrp-section"><div className="vrp-section-title">Products Discussed</div><div className="vrp-prods">{prods.map(p=><span key={p.id} className={`vr-prod-tag vr-prod-${p.type}`}>{p.label}</span>)}</div></div>}
          {en.productDetails && <div className="vrp-section"><div className="vrp-section-title">Product Details</div><div className="vrp-content">{en.productDetails}</div></div>}
          {en.nextSteps && <div className="vrp-section"><div className="vrp-section-title">Next Steps</div><div className="vrp-content">{en.nextSteps}</div></div>}

          <div className="vrp-section">
            <div className="vrp-section-title">Opportunity Assessment</div>
            <div className="vrp-opp-row">
              <span className="vr-opp-badge" style={{background:opp?.bg,color:opp?.color,border:`1px solid ${opp?.border}`}}>{opp?.label}</span>
              <span className="vrp-opp-detail">Volume: <strong>{r.estimatedVolume}</strong></span>
              {r.estimatedTimeline && <span className="vrp-opp-detail">Timeline: <strong>{r.estimatedTimeline}</strong></span>}
            </div>
          </div>

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
