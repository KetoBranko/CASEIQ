import React, { useState, useMemo } from 'react'
import { RICCI_LEATHER_GROUPS, RICCI_TEXTILE_GROUPS, RICCI_COATINGS_GROUPS, RICCI_FIBER_LEGEND } from '../data/ricci'
import './RICCI.css'

const SUBTABS = [
  { id: 'leather',  label: 'Leather',  icon: 'ti-leaf' },
  { id: 'textile',  label: 'Textile',  icon: 'ti-shirt' },
  { id: 'coatings', label: 'Coatings', icon: 'ti-paint' },
]

export default function RICCI() {
  const [sub, setSub] = useState('leather')

  return (
    <div className="ric">
      <div className="ric-header">
        <div className="ric-brand">
          <div className="ric-logo"><i className="ti ti-building-factory" /></div>
          <div>
            <div className="ric-title">RICCI · Prodotti Chimici per l'Industria</div>
            <div className="ric-sub">Specialty Chemicals für Leder, Textil & Coatings · Gorla Minore, Italien · seit 1967</div>
          </div>
        </div>
      </div>

      <div className="ric-subtabs">
        {SUBTABS.map(t => (
          <button key={t.id} className={`ric-subtab ${sub === t.id ? 'active' : ''}`} onClick={() => setSub(t.id)}>
            <i className={`ti ${t.icon}`} /> {t.label}
          </button>
        ))}
      </div>

      {sub === 'leather' && <GroupedSection groups={RICCI_LEATHER_GROUPS} cols={['id','substance','ionic','app']} showFiberLegend={false} />}
      {sub === 'textile' && <GroupedSection groups={RICCI_TEXTILE_GROUPS} cols={['id','fiber','desc']} showFiberLegend={true} />}
      {sub === 'coatings' && <GroupedSection groups={RICCI_COATINGS_GROUPS} cols={['id','type','desc']} showFiberLegend={false} showGroupDesc={true} />}
    </div>
  )
}

const COL_LABELS = {
  id: 'Produkt', substance: 'Substanz', ionic: 'Ionencharakter', app: 'Anwendung',
  fiber: 'Faser', desc: 'Beschreibung', type: 'Typ',
}

function GroupedSection({ groups, cols, showFiberLegend, showGroupDesc }) {
  const [groupKey, setGroupKey] = useState(groups[0].key)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const detailRef = React.useRef(null)
  const active = groups.find(g => g.key === groupKey)

  const filtered = useMemo(() => {
    if (!query) return active.rows
    const q = query.toLowerCase()
    return active.rows.filter(r =>
      Object.values(r).some(v => v && String(v).toLowerCase().includes(q))
    )
  }, [active, query])

  return (
    <div className="ric-section">
      <div className="ric-group-tabs">
        {groups.map(g => (
          <button
            key={g.key}
            className={`ric-group-tab ${groupKey === g.key ? 'active' : ''}`}
            onClick={() => { setGroupKey(g.key); setSelected(null) }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {showGroupDesc && active.desc && (
        <div className="ric-group-desc">{active.desc}</div>
      )}

      <div className="ric-typapps-bar">
        <i className="ti ti-bulb" /> {active.typApps}
      </div>

      <div className="ric-search-wrap">
        <i className="ti ti-search ric-search-icon" />
        <input className="ric-search" type="text" placeholder="Produkt-ID oder Eigenschaft suchen…" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="ric-table-wrap">
        <table className="ric-table">
          <thead>
            <tr>{cols.map(c => <th key={c}>{COL_LABELS[c]}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={i}
                className={selected?._key === r.id + i ? 'row-selected' : ''}
                onClick={() => {
                  const key = r.id + i
                  setSelected(selected?._key === key ? null : { ...r, _key: key })
                  setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
                }}
              >
                {cols.map(c => (
                  <td key={c} className={c === 'desc' || c === 'app' ? 'ric-desc-cell' : ''}>
                    {c === 'id' ? <span className="ric-prod-id">{r[c]}</span> :
                     c === 'fiber' && r[c] ? r[c].split(',').map(f => f.trim()).map(f => (
                       <span key={f} className="ric-fiber-badge" title={RICCI_FIBER_LEGEND[f] || f}>{f}</span>
                     )) :
                     c === 'ionic' ? <span className={`ric-ionic-badge ric-ionic-${(r[c]||'').toLowerCase()}`}>{r[c]}</span> :
                     (r[c] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div ref={detailRef} className="ric-detail">
          <div className="ric-detail-header">
            <span className="ric-prod-id" style={{ fontSize: '16px' }}>{selected.id}</span>
            <button className="ric-detail-close" onClick={() => setSelected(null)}><i className="ti ti-x" /></button>
          </div>
          <div className="ric-detail-body">
            {cols.filter(c => c !== 'id').map(c => (
              <div key={c} className="ric-detail-row">
                <span className="ric-detail-key">{COL_LABELS[c]}</span>
                <span className="ric-detail-val">
                  {c === 'fiber' && selected[c] ? selected[c].split(',').map(f => f.trim()).map(f => (
                    <span key={f} className="ric-fiber-badge" title={RICCI_FIBER_LEGEND[f] || f}>{f}</span>
                  )) :
                   c === 'ionic' ? <span className={`ric-ionic-badge ric-ionic-${(selected[c] || '').toLowerCase()}`}>{selected[c]}</span> :
                   (selected[c] ?? '—')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showFiberLegend && (
        <div className="ric-fiber-legend">
          {Object.entries(RICCI_FIBER_LEGEND).map(([code, label]) => (
            <span key={code} className="ric-fiber-legend-item"><strong>{code}</strong> = {label}</span>
          ))}
        </div>
      )}
    </div>
  )
}
