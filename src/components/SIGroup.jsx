import React, { useState, useMemo } from 'react'
import { SIGROUP_RESINS, SIGROUP_STABILIZERS, SIGROUP_ALKYLPHENOLS } from '../data/sigroup'
import './SIGroup.css'

const MONOMERS = ['Alle', 'Bisphenol A', 'PTBP', 'o-Cresol', 'Bis A + Epoxy', '—']

export default function SIGroup() {
  const [monomer, setMonomer] = useState('Alle')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const detailRef = React.useRef(null)

  const filtered = useMemo(() => {
    return SIGROUP_RESINS.filter(p => {
      if (monomer !== 'Alle' && p.monomer !== monomer) return false
      if (query) {
        const q = query.toLowerCase()
        if (
          !p.id.toLowerCase().includes(q) &&
          !p.mainUse.toLowerCase().includes(q) &&
          !p.typApps.toLowerCase().includes(q)
        ) return false
      }
      return true
    })
  }, [monomer, query])

  return (
    <div className="sig">
      <div className="sig-header">
        <div className="sig-brand">
          <div className="sig-logo">
            <i className="ti ti-flask" />
          </div>
          <div>
            <div className="sig-title">SI Group · Phenolharze für Coatings</div>
            <div className="sig-sub">Cross-Linker, Dosenlacke, Korrosionsschutz · {SIGROUP_RESINS.length} Harze + {SIGROUP_STABILIZERS.length} Stabilisator-Markenfamilien</div>
          </div>
        </div>
        <div className="sig-count">{filtered.length} / {SIGROUP_RESINS.length}</div>
      </div>

      <div className="sig-source-note">
        <i className="ti ti-info-circle" />
        Quelle: SI Group Broschüren 2010–2018. Teils ältere Datenblätter – bei Bedarf aktuelle TDS bei SI Group anfragen.
      </div>

      {/* ── Phenolharze ── */}
      <div className="sig-filters">
        <div className="sig-filter-row">
          <label className="sig-filter-label">Monomer-Basis</label>
          <div className="sig-filter-btns">
            {MONOMERS.map(m => (
              <button key={m} className={`sig-fbtn ${monomer === m ? 'active' : ''}`} onClick={() => setMonomer(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="sig-search-wrap">
          <i className="ti ti-search sig-search-icon" />
          <input
            className="sig-search"
            type="text"
            placeholder="Produkt-ID, Anwendung oder Einsatzbereich suchen…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="sig-empty"><i className="ti ti-mood-empty" /><p>Keine Produkte gefunden</p></div>
      ) : (
        <div className="sig-table-wrap">
          <table className="sig-table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Monomer</th>
                <th>Form</th>
                <th>Festgehalt %</th>
                <th>FDA</th>
                <th>Haupteinsatz</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr
                  key={p.id}
                  className={selected?.id === p.id ? 'row-selected' : ''}
                  onClick={() => {
                    setSelected(selected?.id === p.id ? null : p)
                    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
                  }}
                >
                  <td><span className="sig-prod-id">{p.id}</span></td>
                  <td>{p.monomer}</td>
                  <td>{p.form}</td>
                  <td className="sig-num">{p.solid}</td>
                  <td>{p.fda ? <span className="sig-fda-ok"><i className="ti ti-check" /> OK</span> : <span className="sig-fda-na">—</span>}</td>
                  <td className="sig-mainuse-cell">{p.mainUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div ref={detailRef} className="sig-detail">
          <div className="sig-detail-header">
            <div className="sig-detail-title">
              <span className="sig-prod-id" style={{ fontSize: '18px' }}>{selected.id}</span>
              <span className="sig-detail-year">Quelle {selected.year}</span>
            </div>
            <button className="sig-detail-close" onClick={() => setSelected(null)}><i className="ti ti-x" /></button>
          </div>

          <div className="sig-detail-typapps">
            <div className="sig-detail-lbl-green"><i className="ti ti-bulb" /> Typische Anwendungen</div>
            <div className="sig-detail-typapps-text">{selected.typApps}</div>
          </div>

          <div className="sig-detail-grid">
            <div className="sig-detail-sec">
              <div className="sig-detail-lbl">Technische Daten</div>
              <div className="sig-detail-params">
                {[
                  ['Monomer', selected.monomer],
                  ['Lösemittel', selected.solvent],
                  ['Etherifiziert', selected.etherified === null ? '—' : selected.etherified ? 'Ja' : 'Nein'],
                  ['Form', selected.form],
                  ['Festgehalt', selected.solid + (selected.solid !== '—' && selected.solid !== 'Solid' ? ' %wt' : '')],
                  ['FDA-Status', selected.fda ? 'OK' : 'k.A. in Unterlagen'],
                  ['Verfügbarkeit', selected.region],
                ].map(([k, v]) => (
                  <div key={k} className="sig-param-row">
                    <span className="sig-param-key">{k}</span>
                    <span className="sig-param-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sig-detail-sec">
              <div className="sig-detail-lbl">Beschreibung & Verkaufsargumente</div>
              <div className="sig-detail-desc">{selected.desc}</div>
              <div className="sig-detail-lbl" style={{ marginTop: '12px' }}>Haupteinsatzgebiet</div>
              <div className="sig-detail-desc">{selected.mainUse}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Stabilisator-Markenfamilien ── */}
      <div className="sig-stab-section">
        <div className="sig-stab-header">
          <div className="sig-stab-title">
            <i className="ti ti-shield-check" />
            Stabilisator-Markenfamilien
          </div>
          <div className="sig-stab-sub">
            Antioxidantien, UV-Stabilisatoren und Phosphite – keine Einzelgrade in den vorliegenden Broschüren, nur Markenfamilien
          </div>
        </div>

        <div className="sig-stab-grid">
          {SIGROUP_STABILIZERS.map(s => (
            <div key={s.brand} className="sig-stab-card">
              <div className="sig-stab-card-header">
                <span className="sig-stab-brand">{s.brand}<span className="sig-tm">™</span></span>
                <span className="sig-stab-family">{s.family}</span>
              </div>
              <div className="sig-stab-desc">{s.desc}</div>
              <div className="sig-stab-typapps">
                <i className="ti ti-bulb" /> {s.typApps}
              </div>
              <div className="sig-stab-note">
                <i className="ti ti-alert-triangle" /> Einzelgrade auf Anfrage / TDS bei SI Group einholen
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Alkylphenole (Chemical Intermediates) ── */}
      <div className="sig-alkyl-section">
        <div className="sig-stab-header">
          <div className="sig-stab-title">
            <i className="ti ti-test-pipe" />
            Alkylphenole (Chemical Intermediates)
          </div>
          <div className="sig-stab-sub">
            Bausteine für Epoxidhärter, Pigmentnetzmittel und Phenolharz-Synthese
          </div>
        </div>
        <div className="sig-alkyl-table-wrap">
          <table className="sig-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Chemischer Name</th>
                <th>CAS#</th>
                <th>Reinheit</th>
                <th>Form</th>
                <th>Typische Anwendung</th>
              </tr>
            </thead>
            <tbody>
              {SIGROUP_ALKYLPHENOLS.map(a => (
                <tr key={a.name}>
                  <td><span className="sig-prod-id">{a.name}</span></td>
                  <td>{a.chemName}</td>
                  <td className="sig-num">{a.cas}</td>
                  <td className="sig-num">{a.purity}</td>
                  <td>{a.form}</td>
                  <td className="sig-mainuse-cell">{a.typApps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
