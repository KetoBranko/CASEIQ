import React, { useState, useMemo, useRef } from 'react'
import { HYDROLAR_PRODUCTS, HYDROLAR_APPS, HYDROLAR_CROSSLINKER } from '../data/hydrolar'
import './Hydrolar.css'

const BASES = ['Alle', 'Polyester', 'Polyether', 'Polycarbonate']
const HARDNESS = [
  { key: 'all',    label: 'Alle Härten' },
  { key: 'soft',   label: 'Weich (≤5 MPa)',    min: 0,  max: 5 },
  { key: 'medium', label: 'Mittel (5–15 MPa)',  min: 5,  max: 15 },
  { key: 'hard',   label: 'Hart (>15 MPa)',     min: 15, max: 999 },
]
const ELONG = [
  { key: 'all',    label: 'Alle' },
  { key: 'low',    label: 'Niedrig (<300%)',   min: 0,   max: 300 },
  { key: 'medium', label: 'Mittel (300–600%)', min: 300, max: 600 },
  { key: 'high',   label: 'Hoch (>600%)',      min: 600, max: 9999 },
]

export default function Hydrolar() {
  const [base, setBase] = useState('Alle')
  const [hardness, setHardness] = useState('all')
  const [elong, setElong] = useState('all')
  const [app, setApp] = useState(null)
  const [selected, setSelected] = useState(null)
  const detailRef = React.useRef(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return HYDROLAR_PRODUCTS.filter(p => {
      if (base !== 'Alle' && p.base !== base) return false
      if (app && !p[app]) return false
      const hd = HARDNESS.find(h => h.key === hardness)
      if (hd && hd.key !== 'all' && p.mod100 !== null) {
        if (p.mod100 < hd.min || p.mod100 >= hd.max) return false
      }
      const el = ELONG.find(e => e.key === elong)
      if (el && el.key !== 'all') {
        if (p.elong < el.min || p.elong >= el.max) return false
      }
      if (query) {
        const q = query.toLowerCase()
        if (!p.id.toLowerCase().includes(q) && !p.apps.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [base, hardness, elong, app, query])

  return (
    <div className="hl">
      <div className="hl-header">
        <div className="hl-brand">
          <div className="hl-logo">
            <img src="https://www.coimgroup.com/wp-content/themes/coim/images/logo.svg" alt="COIM" style={{height:'20px', filter:'brightness(0) invert(1)'}} onError={e => { e.target.style.display='none' }} />
          </div>
          <div>
            <div className="hl-title">Hydrolar · Waterborne PU Dispersions</div>
            <div className="hl-sub">COIM Group · Distributed by Safic-Alcan · {HYDROLAR_PRODUCTS.length} Dispersionen + 2 Crosslinker</div>
          </div>
        </div>
        <div className="hl-count">{filtered.length} / {HYDROLAR_PRODUCTS.length}</div>
      <div className="hl-legend">
        <span className="hl-legend-item"><span className="hl-ionic hl-ionic-h">H</span> Hydrazin-frei</span>
        <span className="hl-legend-item"><span className="hl-ionic hl-ionic-n">N</span> Nicht-ionisch</span>
        <span className="hl-legend-item"><span className="hl-ionic hl-ionic-a">A</span> Aromatisch (vergilbt UV)</span>
      </div>
      </div>

      <div className="hl-filters">
        <div className="hl-filter-row">
          <label className="hl-filter-label">Polymerbasis</label>
          <div className="hl-filter-btns">
            {BASES.map(b => (
              <button key={b} className={`hl-fbtn ${base === b ? 'active' : ''}`} onClick={() => setBase(b)}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="hl-filter-row">
          <label className="hl-filter-label">Anwendung</label>
          <div className="hl-filter-btns">
            {HYDROLAR_APPS.map(a => (
              <button key={a.key} className={`hl-fbtn hl-app-btn ${app === a.key ? 'active-app' : ''}`} onClick={() => setApp(app === a.key ? null : a.key)}>
                <i className={`ti ${a.icon}`} /> {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hl-filter-row-multi">
          <div className="hl-filter-group">
            <label className="hl-filter-label">Modulmodul 100% (Härte)</label>
            <div className="hl-filter-btns">
              {HARDNESS.map(h => (
                <button key={h.key} className={`hl-fbtn ${hardness === h.key ? 'active' : ''}`} onClick={() => setHardness(h.key)}>
                  {h.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hl-filter-group">
            <label className="hl-filter-label">Dehnung</label>
            <div className="hl-filter-btns">
              {ELONG.map(e => (
                <button key={e.key} className={`hl-fbtn ${elong === e.key ? 'active' : ''}`} onClick={() => setElong(e.key)}>
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hl-search-wrap">
          <i className="ti ti-search hl-search-icon" />
          <input className="hl-search" type="text" placeholder="Produkt-ID oder Anwendung suchen…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hl-empty"><i className="ti ti-mood-empty" /><p>Keine Produkte gefunden</p></div>
      ) : (
        <div className="hl-table-wrap">
          <table className="hl-table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Basis</th>
                <th>Festgehalt %</th>
                <th>Tg °C</th>
                <th>Mod. 100% MPa</th>
                <th>Dehnung %</th>
                <th>König (s)</th>
                <th>Gloss 60°</th>
                <th>Anwendungen</th>
                <th>Beschreibung</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className={selected?.id === p.id ? 'row-selected' : ''} onClick={() => {
                  setSelected(selected?.id === p.id ? null : p)
                  setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
                }}>
                  <td><span className="hl-prod-id">{p.id}</span>{p.ionic && <span className={`hl-ionic hl-ionic-${p.ionic.toLowerCase()}`}>{p.ionic}</span>}</td>
                  <td><span className={`hl-base hl-base-${p.base.toLowerCase().replace('poly','')}`}>{p.base.replace('Poly','')}</span></td>
                  <td className="hl-num">{p.solid}</td>
                  <td className="hl-num">{p.tg}</td>
                  <td className="hl-num">{p.mod100 ?? '—'}</td>
                  <td className="hl-num">
                    <span className={`hl-elong-bar`}>
                      <span className="hl-elong-val">{p.elong}</span>
                      <span className="hl-ebar" style={{width: `${Math.min(p.elong / 900 * 60, 60)}px`}} />
                    </span>
                  </td>
                  <td className="hl-num">{p.koenig ?? '—'}</td>
                  <td className="hl-num">{p.gloss60 ?? '—'}</td>
                  <td>
                    <div className="hl-app-dots">
                      {HYDROLAR_APPS.map(a => (
                        <span key={a.key} className={`hl-app-dot ${p[a.key] ? 'on' : 'off'}`} title={a.label}>
                          <i className={`ti ${a.icon}`} />
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="hl-desc-cell">
                    <div className="hl-desc">{p.desc}</div>
                    <div className="hl-apps">{p.apps}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div ref={detailRef} className="hl-detail">
          <div className="hl-detail-header">
            <div className="hl-detail-title">
              <span className="hl-prod-id" style={{fontSize:'18px'}}>{selected.id}</span>
              <span className={`hl-base hl-base-${selected.base.toLowerCase().replace('poly','')}`}>{selected.base}</span>
              {selected.ionic && <span className={`hl-ionic hl-ionic-${selected.ionic.toLowerCase()}`}>{selected.ionic}</span>}
            </div>
            <button className="hl-detail-close" onClick={() => setSelected(null)}><i className="ti ti-x" /></button>
          </div>
          <div className="hl-detail-grid">
            <div className="hl-detail-sec">
              <div className="hl-detail-lbl">Technische Daten</div>
              <div className="hl-detail-params">
                {[
                  ['Festgehalt', selected.solid + ' %wt'],
                  ['pH-Wert', selected.ph],
                  ['Viskosität', selected.visc + ' mPa·s'],
                  ['Partikelgröße', selected.ps + ' nm'],
                  ['Glasübergang Tg', selected.tg + ' °C'],
                  ['Modul 100%', (selected.mod100 ?? '—') + ' MPa'],
                  ['Max. Last', selected.maxLoad + ' MPa'],
                  ['Dehnung', selected.elong + ' %'],
                  ['Erweichung', (selected.softT ?? '—') + (selected.softT ? ' °C' : '')],
                  ['König Härte', (selected.koenig ?? '—') + (selected.koenig ? ' s' : '')],
                  ['Gloss 20°/60°', (selected.gloss20 ?? '—') + '/' + (selected.gloss60 ?? '—')],
                ].map(([k,v]) => (
                  <div key={k} className="hl-param-row">
                    <span className="hl-param-key">{k}</span>
                    <span className="hl-param-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hl-detail-sec">
              <div className="hl-detail-lbl">Eigenschaften</div>
              <div className="hl-detail-desc">{selected.desc}</div>
              <div className="hl-detail-lbl" style={{marginTop:'12px'}}>Typische Anwendungen</div>
              <div className="hl-detail-apps">{selected.apps}</div>
              <div className="hl-detail-lbl" style={{marginTop:'12px'}}>Geeignete Substrate</div>
              <div className="hl-detail-substrates">
                {HYDROLAR_APPS.map(a => (
                  <span key={a.key} className={`hl-substrate ${selected[a.key] ? 'sub-on' : 'sub-off'}`}>
                    <i className={`ti ${a.icon}`} /> {a.label}
                  </span>
                ))}
              </div>
              <div className="hl-detail-lbl" style={{marginTop:'12px'}}>Hinweise</div>
              <div className="hl-detail-note">
                MFFT generell &lt;0°C · Tack-free Film bei Raumtemperatur · Mischbar mit WB Acryl-Dispersionen · Vernetzbar mit Isocyanat / Aziridin / Carbodiimid
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── Crosslinker Section ── */}
      <div className="hl-crosslinker-section">
        <div className="hl-crosslinker-header">
          <div className="hl-crosslinker-title">
            <i className="ti ti-link" />
            NCO-Vernetzer · Hydrolar W75 & W77
          </div>
          <div className="hl-crosslinker-sub">
            Wasserdispergierbare, aliphatische Polyisocyanate zur Vernetzung der WB-PU-Dispersionen
          </div>
        </div>

        <div className="hl-crosslinker-compare">
          {HYDROLAR_CROSSLINKER.map(p => (
            <div key={p.id} className="hl-cl-card">
              <div className="hl-cl-card-header">
                <span className="hl-cl-id">{p.id}</span>
                <span className="hl-cl-type">{p.type}</span>
                <span className="hl-cl-voc">{p.voc}</span>
              </div>

              <div className="hl-cl-desc">{p.desc}</div>

              <div className="hl-cl-params">
                {[
                  ['NCO-Gehalt', p.nco + ' %'],
                  ['Viskosität', p.viscosity + ' ' + p.viscUnit],
                  ['Dosierung', p.dosage],
                  ['Topfzeit', p.potLife],
                  ['Lagerstabilität', p.shelfLife],
                  ['Lagerung', p.storage],
                  ...(p.color ? [['Farbe', p.color]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="hl-cl-param-row">
                    <span className="hl-cl-param-key">{k}</span>
                    <span className="hl-cl-param-val">{v}</span>
                  </div>
                ))}
              </div>

              <div className="hl-cl-section-label">Vorteile</div>
              <ul className="hl-cl-benefits">
                {p.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>

              <div className="hl-cl-section-label">Kompatibel mit</div>
              <div className="hl-cl-tags">
                {p.compatibleWith.map(c => <span key={c} className="hl-cl-tag">{c}</span>)}
              </div>

              <div className="hl-cl-section-label">Anwendungen</div>
              <div className="hl-cl-tags">
                {p.applications.map(a => <span key={a} className={`hl-cl-tag hl-cl-tag-app`}>{a}</span>)}
              </div>

              <div className="hl-cl-differentiator">
                <i className="ti ti-bulb" /> {p.differentiator}
              </div>

              <div className="hl-cl-note">
                <i className="ti ti-alert-triangle" /> {p.note}
              </div>
            </div>
          ))}
        </div>

        <div className="hl-cl-usage-note">
          <i className="ti ti-info-circle" />
          <div>
            <strong>Einsatz im Kundengespräch:</strong> W75 und W77 werden immer in Kombination mit den Hydrolar WB-PU-Dispersionen eingesetzt.
            Dosierung 0.5–5.0 Gew.-%. Reaktion startet sofort nach Zugabe – Topfzeit je nach System prüfen.
            Beide Produkte sind stark feuchtigkeitsempfindlich: Behälter immer fest verschlossen halten.
          </div>
        </div>
      </div>

    </div>
  )
}
