import React, { useState, useMemo } from 'react'
import {
  NEBOTINT_RANGES, NEBOTINT_WH_NOTE, NEBOCHIPS_RANGES,
  NEBORES_LONG_OIL, NEBORES_MEDIUM_OIL, NEBORES_SHORT_OIL, NEBORES_MODIFIED,
  NEBORES_THERMOPLASTIC_ACRYLIC, NEBORES_HYDROXY_ACRYLIC,
  NEBOPLAST_PVAC_HOMO, NEBOPLAST_PVAC_CO, NEBOPLAST_ACRYLIC, NEBOPLAST_STYRENEACRYLIC, NEBOPLAST_PU,
  NEBORES_NEBOPLAST_ADDITIVES, NECARBO_CATEGORY_TYPAPPS,
} from '../data/necarbo'
import './Necarbo.css'

const SUBTABS = [
  { id: 'resins',   label: 'Nebores · Neboplast', icon: 'ti-droplet' },
  { id: 'tint',     label: 'Nebotint',            icon: 'ti-color-swatch' },
  { id: 'chips',    label: 'Nebochips',           icon: 'ti-square-rounded' },
]

export default function Necarbo() {
  const [sub, setSub] = useState('resins')

  return (
    <div className="nec">
      <div className="nec-header">
        <div className="nec-brand">
          <div className="nec-logo"><i className="ti ti-palette" /></div>
          <div>
            <div className="nec-title">Necarbo · Safic-Alcan Group</div>
            <div className="nec-sub">Synthetic Resins, Dispersions, Colourants & Pigment Chips · Beverwijk, NL</div>
          </div>
        </div>
      </div>

      <div className="nec-subtabs">
        {SUBTABS.map(t => (
          <button key={t.id} className={`nec-subtab ${sub === t.id ? 'active' : ''}`} onClick={() => setSub(t.id)}>
            <i className={`ti ${t.icon}`} /> {t.label}
          </button>
        ))}
      </div>

      {sub === 'resins' && <ResinsSection />}
      {sub === 'tint' && <TintSection />}
      {sub === 'chips' && <ChipsSection />}
    </div>
  )
}

/* ───────────────────────── NEBORES · NEBOPLAST ───────────────────────── */

const RESIN_GROUPS = [
  { id: 'longOil', label: 'Alkydharze · langölig', data: NEBORES_LONG_OIL, cols: ['id','type','solids','solvent','oil','oilLength','visc','acid','colour','desc'] },
  { id: 'mediumOil', label: 'Alkydharze · mittelölig', data: NEBORES_MEDIUM_OIL, cols: ['id','type','solids','solvent','oil','oilLength','visc','acid','colour','desc'] },
  { id: 'shortOil', label: 'Alkydharze · kurzölig', data: NEBORES_SHORT_OIL, cols: ['id','type','solids','solvent','oil','oilLength','visc','acid','colour','desc'] },
  { id: 'modified', label: 'Alkydharze · modifiziert', data: NEBORES_MODIFIED, cols: ['id','type','solids','solvent','oil','oilLength','visc','acid','colour','desc'] },
  { id: 'thermoplasticAcrylic', label: 'Thermoplastische Acrylharze', data: NEBORES_THERMOPLASTIC_ACRYLIC, cols: ['id','type','solids','solvent','acrylType','visc','acid','colour','desc'] },
  { id: 'hydroxyAcrylic', label: 'Hydroxy-Acrylharze', data: NEBORES_HYDROXY_ACRYLIC, cols: ['id','type','solids','solvent','acrylType','visc','ohPct','colour','desc'] },
  { id: 'pvacHomo', label: 'PVAc-Dispersionen · Homopolymer', data: NEBOPLAST_PVAC_HOMO, cols: ['id','type','solids','visc','ph','mfft','desc'] },
  { id: 'pvacCo', label: 'PVAc-Dispersionen · Copolymer', data: NEBOPLAST_PVAC_CO, cols: ['id','comonomer','solids','visc','ph','mfft','desc'] },
  { id: 'acrylic', label: 'Acrylat-Dispersionen', data: NEBOPLAST_ACRYLIC, cols: ['id','type','solids','visc','ph','mfft','desc'] },
  { id: 'styreneAcrylic', label: 'Styrolacrylat-Dispersionen', data: NEBOPLAST_STYRENEACRYLIC, cols: ['id','type','solids','visc','ph','mfft','desc'] },
  { id: 'pu', label: 'PU-Dispersionen', data: NEBOPLAST_PU, cols: ['id','type','solids','visc','ph','mfft','desc'] },
]

const COL_LABELS = {
  id: 'Produkt', type: 'Typ', solids: 'Festgehalt %', solvent: 'Lösemittel', oil: 'Öl/Fettsäure',
  oilLength: 'Öllänge %', visc: 'Visk. dPa·s', acid: 'Säurezahl', colour: 'Farbe (Gardner)',
  acrylType: 'Acryltyp', ohPct: 'OH %', ph: 'pH', mfft: 'MFFT °C', comonomer: 'Comonomer', desc: 'Eigenschaften / Anwendung',
}

function ResinsSection() {
  const [group, setGroup] = useState('longOil')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const detailRef = React.useRef(null)
  const active = RESIN_GROUPS.find(g => g.id === group)

  const filtered = useMemo(() => {
    if (!query) return active.data
    const q = query.toLowerCase()
    return active.data.filter(r =>
      (r.id || '').toLowerCase().includes(q) ||
      (r.desc || '').toLowerCase().includes(q)
    )
  }, [active, query])

  function selectGroup(id) {
    setGroup(id)
    setSelected(null)
  }

  function selectRow(r, i) {
    const key = r.id + i
    setSelected(selected?._key === key ? null : { ...r, _key: key })
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  return (
    <div className="nec-resins">
      <div className="nec-group-tabs">
        {RESIN_GROUPS.map(g => (
          <button key={g.id} className={`nec-group-tab ${group === g.id ? 'active' : ''}`} onClick={() => selectGroup(g.id)}>
            {g.label}
          </button>
        ))}
      </div>

      <div className="nec-typapps-bar">
        <i className="ti ti-bulb" /> {NECARBO_CATEGORY_TYPAPPS[group]}
      </div>

      <div className="nec-search-wrap">
        <i className="ti ti-search nec-search-icon" />
        <input className="nec-search" type="text" placeholder="Produkt-ID oder Eigenschaft suchen…" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="nec-table-wrap">
        <table className="nec-table">
          <thead>
            <tr>{active.cols.map(c => <th key={c}>{COL_LABELS[c]}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={i}
                className={selected?._key === r.id + i ? 'row-selected' : ''}
                onClick={() => selectRow(r, i)}
              >
                {active.cols.map(c => (
                  <td key={c} className={c === 'desc' ? 'nec-desc-cell' : (typeof r[c] === 'number' ? 'nec-num' : '')}>
                    {c === 'id' ? <span className="nec-prod-id">{r[c]}</span> : (r[c] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div ref={detailRef} className="nec-detail">
          <div className="nec-detail-header">
            <div className="nec-detail-title">
              <span className="nec-prod-id" style={{ fontSize: '17px' }}>{selected.id}</span>
              {selected.type && <span className="nec-detail-type">{selected.type}</span>}
            </div>
            <button className="nec-detail-close" onClick={() => setSelected(null)}><i className="ti ti-x" /></button>
          </div>

          <div className="nec-typapps-bar" style={{ marginBottom: '14px' }}>
            <i className="ti ti-bulb" /> {NECARBO_CATEGORY_TYPAPPS[group]}
          </div>

          <div className="nec-detail-grid">
            <div className="nec-detail-sec">
              <div className="nec-detail-lbl">Technische Daten</div>
              <div className="nec-detail-params">
                {active.cols.filter(c => c !== 'desc' && c !== 'id').map(c => (
                  <div key={c} className="nec-param-row">
                    <span className="nec-param-key">{COL_LABELS[c]}</span>
                    <span className="nec-param-val">{selected[c] ?? '—'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="nec-detail-sec">
              <div className="nec-detail-lbl">Eigenschaften & Anwendung</div>
              <div className="nec-detail-desc">{selected.desc}</div>
            </div>
          </div>
        </div>
      )}

      <div className="nec-additives-section">
        <div className="nec-additives-title"><i className="ti ti-flask-2" /> Additive & Spezialitäten</div>
        <div className="nec-additives-grid">
          {NEBORES_NEBOPLAST_ADDITIVES.map((a, i) => (
            <div key={i} className="nec-additive-card">
              <div className="nec-additive-id">{a.id}</div>
              <div className="nec-additive-type">{a.type}</div>
              <div className="nec-additive-desc">{a.desc}</div>
              <div className="nec-additive-meta">
                {a.solids != null && <span>Festgehalt: {a.solids}%</span>}
                {a.solvent && <span>Lösemittel: {a.solvent}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── NEBOTINT ───────────────────────── */

function TintSection() {
  const [range, setRange] = useState(NEBOTINT_RANGES[0].key)
  const active = NEBOTINT_RANGES.find(r => r.key === range)

  return (
    <div className="nec-tint">
      <div className="nec-group-tabs">
        {NEBOTINT_RANGES.map(r => (
          <button key={r.key} className={`nec-group-tab ${range === r.key ? 'active' : ''}`} onClick={() => setRange(r.key)}>
            {r.name} <span className="nec-group-tab-seg">{r.segment}</span>
          </button>
        ))}
      </div>

      <div className="nec-tint-intro">
        <div className="nec-tint-tagline">{active.tagline}</div>
        <div className="nec-tint-desc">{active.desc}</div>
        <div className="nec-typapps-bar">
          <i className="ti ti-bulb" /> {active.typApps}
        </div>
        {active.note && (
          <div className="nec-tint-note"><i className="ti ti-alert-triangle" /> {active.note}</div>
        )}
      </div>

      <div className="nec-table-wrap">
        <table className="nec-table">
          <thead>
            <tr>
              <th>Farbton</th>
              <th>Swatch</th>
              <th>C.I. No.</th>
              <th>Pigment %</th>
              <th>Spez. Gewicht</th>
              <th>Lichtbest. Vollton</th>
              <th>Lichtbest. 1/25 Weiß</th>
              <th>Wetterfest. Vollton</th>
              <th>Wetterfest. 1/25 Weiß</th>
              <th>Säure</th>
              <th>Alkali</th>
            </tr>
          </thead>
          <tbody>
            {active.colours.map((c, i) => (
              <tr key={i}>
                <td><span className="nec-prod-id">{c.name}</span></td>
                <td><span className="nec-swatch" style={{ background: swatchColour(c.name) }} /></td>
                <td className="nec-num">{c.ci}</td>
                <td className="nec-num">{c.pigment}</td>
                <td className="nec-num">{c.sg}</td>
                <td className="nec-num">{c.lfFull}</td>
                <td className="nec-num">{c.lfOff}</td>
                <td className="nec-num">{c.wfFull}</td>
                <td className="nec-num">{c.wfOff}</td>
                <td className="nec-num">{c.acid}</td>
                <td className="nec-num">{c.alkali}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="nec-legend">
        Lichtbeständigkeit: 1.Sehr schlecht – 8.Hervorragend · Wetterfestigkeit/Säure/Alkali: 1.Sehr schlecht – 5.Exzellent
      </div>

      <div className="nec-wh-note">
        <i className="ti ti-sun-high" /> {NEBOTINT_WH_NOTE}
      </div>
    </div>
  )
}

function swatchColour(name) {
  const n = name.toLowerCase()
  if (n.includes('magenta') || n.includes('pink')) return '#d6336c'
  if (n.includes('violet')) return '#5f3dc4'
  if (n.includes('blue')) return '#1864ab'
  if (n.includes('green')) return '#2b8a3e'
  if (n.includes('yellow oxide')) return '#e8590c'
  if (n.includes('yellow')) return '#f5c500'
  if (n.includes('orange')) return '#e8590c'
  if (n.includes('red oxide')) return '#862e1b'
  if (n.includes('red')) return '#c92a2a'
  if (n.includes('black')) return '#1a1a1a'
  if (n.includes('white')) return '#f1f3f5'
  return '#ced4da'
}

/* ───────────────────────── NEBOCHIPS ───────────────────────── */

function ChipsSection() {
  const [range, setRange] = useState(NEBOCHIPS_RANGES[0].key)
  const active = NEBOCHIPS_RANGES.find(r => r.key === range)

  return (
    <div className="nec-chips">
      <div className="nec-group-tabs">
        {NEBOCHIPS_RANGES.map(r => (
          <button key={r.key} className={`nec-group-tab ${range === r.key ? 'active' : ''}`} onClick={() => setRange(r.key)}>
            {r.name}
          </button>
        ))}
      </div>

      <div className="nec-tint-intro">
        <div className="nec-tint-tagline">{active.tagline}</div>
        <div className="nec-tint-desc">{active.desc}</div>
        <div className="nec-typapps-bar">
          <i className="ti ti-bulb" /> {active.typApps}
        </div>
      </div>

      <div className="nec-table-wrap">
        <table className="nec-table">
          <thead>
            <tr>
              <th>Swatch</th>
              <th>Produktcode</th>
              <th>C.I. No.</th>
              <th>Farbe</th>
              <th>Pigment %</th>
            </tr>
          </thead>
          <tbody>
            {active.colours.map((c, i) => (
              <tr key={i}>
                <td><span className="nec-swatch" style={{ background: swatchColour(c.colour) }} /></td>
                <td><span className="nec-prod-id">{c.code}</span></td>
                <td className="nec-num">{c.ci}</td>
                <td>{c.colour}</td>
                <td className="nec-num">{c.pigment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="nec-chips-benefits">
        <div className="nec-chips-benefit"><i className="ti ti-droplet-off" /> Kein Staub – bessere Arbeitshygiene als Pulverpigmente</div>
        <div className="nec-chips-benefit"><i className="ti ti-package" /> 25-kg-Gebinde – exakte Mengenproduktion, weniger Lagerbestand</div>
        <div className="nec-chips-benefit"><i className="ti ti-bolt" /> Bereits optimal dispergiert – einfache Mischtechnik statt teurer Dispergierausrüstung</div>
      </div>
    </div>
  )
}
