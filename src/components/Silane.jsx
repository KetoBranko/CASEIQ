// src/components/Silane.jsx
// Safic-Chem SIL – Silane Modul für CASE·IQ
// Light-Theme passend zu App.css (#f2f5f9 Hintergrund)

import { useState } from 'react'

// ─── Produktdaten ─────────────────────────────────────────────────────────────

const PRODUKTE = [
  {
    id: 'AAT43',
    handelsname: 'DYNASYLAN DAMO',
    evonikAlias: 'DAMO',
    momentiveAlias: 'Silquest A-1120',
    wackerAlias: 'Geniosil GF 9',
    chemName: 'N-(2-aminoethyl)-3-aminopropyl-trimethoxysilane',
    cas: '1760-24-3',
    klasse: 'Aminosilan',
    alkoxy: 'Methoxy',
    hydrolyse: 'Schnell',
    substrate: ['Glas', 'Metall', 'TiO₂', 'Silica', 'Mica'],
    funktionenCoatings: ['Adhesion Promoter', 'Coupling Agent', 'Primer'],
    funktionenAS: ['Adhesion Promoter', 'Coupling Agent', 'Primer'],
    harzsystemeCoatings: ['PU (2K)', 'Epoxy', 'Alkyd', 'Polyamide', 'Phenolic', 'Silicone', 'Melamine'],
    harzsystemeAS: ['PU (2K)', 'Epoxy', 'Silicone', 'MS Polymer'],
    positionierung: 'Zwei reaktive Aminogruppen → höhere Vernetzungsdichte als AMEO. Bevorzugtes Primer-Silan für Alkyd- und Polyamid-Systeme. Bei Epoxy-2K und Silikon-Systemen erste Wahl für Oberflächenprimer.',
    ampel: 'Stark basisch (pH ~11) – Verträglichkeit mit säurekatalytischen Systemen prüfen. Nicht wirksam auf CaCO₃ und Carbon Black.',
  },
  {
    id: 'AME02',
    handelsname: 'DYNASYLAN AMEO',
    evonikAlias: 'AMEO',
    momentiveAlias: 'Silquest A-1100',
    wackerAlias: 'Geniosil GF 93',
    chemName: '3-aminopropyltriethoxysilane',
    cas: '919-30-2',
    klasse: 'Aminosilan',
    alkoxy: 'Ethoxy',
    hydrolyse: 'Moderat',
    substrate: ['Glas', 'Metall', 'TiO₂', 'Silica', 'Kaolin', 'Mica'],
    funktionenCoatings: ['Adhesion Promoter', 'Coupling Agent', 'Primer'],
    funktionenAS: ['Adhesion Promoter', 'Coupling Agent', 'Primer'],
    harzsystemeCoatings: ['PU (2K)', 'PUD', 'Epoxy', 'Acrylic', 'Alkyd', 'Polyamide', 'Phenolic', 'Silicone', 'Melamine'],
    harzsystemeAS: ['PU (2K)', 'Epoxy', 'Acrylic', 'Silicone', 'Polysulfide', 'MS Polymer'],
    positionierung: 'Breitestes Anwendungsspektrum im Portfolio – deckt nahezu alle Harzsysteme ab. Ethoxy-Gruppe = längere Topfzeit, besser für 2K-Systeme. Industriestandard bei Glasfaser-Schlichten und Füllstoffbehandlung.',
    ampel: 'Wettbewerbsintensivste Position – Differenzierung über Lieferservice und Cross-Selling. Nicht wirksam auf CaCO₃ und Carbon Black.',
  },
  {
    id: 'ADA48',
    handelsname: 'DYNASYLAN TRIAMO',
    evonikAlias: 'TRIAMO',
    momentiveAlias: 'Silquest A-1170',
    wackerAlias: 'Geniosil GF 91',
    chemName: 'Diamino functional & alkyl functional co-oligomer',
    cas: 'Proprietär (kein öffentl. CAS)',
    klasse: 'Aminosilan (oligomer)',
    alkoxy: 'Oligomer (vorhydrolysiert)',
    hydrolyse: 'Kontrolliert',
    substrate: ['Glas', 'Metall', 'Oxidische Oberflächen'],
    funktionenCoatings: ['Adhesion Promoter', 'Coupling Agent', 'Primer'],
    funktionenAS: ['Adhesion Promoter'],
    harzsystemeCoatings: ['WB-Systeme allgemein', 'PUD', 'Acrylic WB'],
    harzsystemeAS: ['WB-Klebstoffe'],
    positionierung: 'Oligomere Struktur → geringere Flüchtigkeit als AMEO (VOC-Vorteil), bessere Hydrolysestabilität in wässrigen Systemen. Differenzierungsargument bei WB-Formulierungen.',
    ampel: 'Kein öffentliches CAS – bei behördlichen Registrierungsanfragen technisches Datenblatt von Safic-Alcan anfordern.',
  },
  {
    id: 'EGM38',
    handelsname: 'DYNASYLAN GLYMO',
    evonikAlias: 'GLYMO',
    momentiveAlias: 'Silquest A-187',
    wackerAlias: 'Geniosil GF 80',
    chemName: '3-glycidoxypropyltrimethoxysilane',
    cas: '2530-83-8',
    klasse: 'Epoxysilan',
    alkoxy: 'Methoxy',
    hydrolyse: 'Moderat',
    substrate: ['Glas', 'Metall', 'TiO₂', 'Silica', 'Mica'],
    funktionenCoatings: ['Adhesion Promoter', 'Crosslinker (post-addition)', 'Coupling Agent'],
    funktionenAS: ['Adhesion Promoter', 'Crosslinker (non silicone)', 'Coupling Agent'],
    harzsystemeCoatings: ['PU (1K)', 'PU (2K)', 'PUD', 'Epoxy', 'Acrylic', 'Phenolic', 'Melamine'],
    harzsystemeAS: ['PU (1K)', 'PU (2K)', 'Epoxy', 'Acrylic', 'Polysulfide'],
    positionierung: 'Einziges Silan das als Crosslinker (post-addition) wirkt – relevant für 1K-PU ohne Aminvernetzung. Für PU (1K) ist EGM38 das einzige empfohlene Silan im Portfolio.',
    ampel: 'Feuchtigkeitslagerung → Epoxidring öffnet sich, Aktivitätsverlust. Lagerung trocken und kühl, Restlaufzeiten beachten.',
  },
  {
    id: 'VTM27',
    handelsname: 'DYNASYLAN VTMO',
    evonikAlias: 'VTMO',
    momentiveAlias: 'Silquest A-151',
    wackerAlias: 'Geniosil XL 10',
    chemName: 'vinyltrimethoxysilane',
    cas: '2768-02-7',
    klasse: 'Vinylsilan',
    alkoxy: 'Methoxy',
    hydrolyse: 'Schnell',
    substrate: ['Polyolefine (PE/PP)', 'Glas', 'Glasfasern'],
    funktionenCoatings: ['Emulsionspolymerisation'],
    funktionenAS: ['Crosslinker (non silicone)', 'Moisture Scavenger'],
    harzsystemeCoatings: ['Acrylic', 'Polyester'],
    harzsystemeAS: ['Acrylic', 'MS Polymer'],
    positionierung: 'Einziger Moisture Scavenger im Portfolio – wichtig für feuchtigkeitsempfindliche 1K-Systeme (MS-Polymer, RTV-Silikon). Als Co-Monomer in Emulsionspolymerisation einsetzbar.',
    ampel: 'Niedriger Siedepunkt (123 °C) – Verarbeitungsbelüftung und PSA erforderlich.',
  },
  {
    id: 'MEM50',
    handelsname: 'DYNASYLAN MEMO',
    evonikAlias: 'MEMO',
    momentiveAlias: 'Silquest A-174',
    wackerAlias: 'Geniosil GF 31',
    chemName: '3-methacryloxypropyltrimethoxysilane',
    cas: '2530-85-0',
    klasse: 'Methacryloxysilane',
    alkoxy: 'Methoxy',
    hydrolyse: 'Langsam',
    substrate: ['Glas', 'Glasfasern', 'Metall'],
    funktionenCoatings: ['Crosslinker (Polymerisation)', 'Filler Surface Treatment'],
    funktionenAS: ['Crosslinker (non silicone)', 'Filler Surface Treatment'],
    harzsystemeCoatings: ['Acrylic', 'Epoxy', 'Polyester'],
    harzsystemeAS: ['Acrylic'],
    positionierung: 'Einziger radikalisch polymerisierbarer Koppler – unersetzlich für UV-härtende Coatings und Composites auf Glasfaserbasis. Wird als Co-Monomer in Emulsionspolymerisation eingesetzt.',
    ampel: 'Lichtschutz bei Lagerung zwingend – Methacrylat-Gruppe kann bei UV-Exposition polymerisieren.',
  },
  {
    id: 'MTM42',
    handelsname: 'DYNASYLAN MTMO',
    evonikAlias: 'MTMO',
    momentiveAlias: 'Silquest A-189',
    wackerAlias: 'Geniosil GF 4',
    chemName: 'mercaptopropyltrimethoxysilane',
    cas: '4420-74-0',
    klasse: 'Mercaptosilan',
    alkoxy: 'Methoxy',
    hydrolyse: 'Moderat',
    substrate: ['Glas', 'Glasfasern', 'Metall', 'Silica'],
    funktionenCoatings: ['Filler Surface Treatment'],
    funktionenAS: ['Adhesion Promoter', 'Coupling Agent'],
    harzsystemeCoatings: ['Füllstoffbehandlung allgemein'],
    harzsystemeAS: ['Polysulfide'],
    positionierung: 'Spezialprodukt für Polysulfid-Dichtstoffe (Aerospace, Bau) – dort alternativlos. Synergistisch mit EGM38 bei Polysulfid-Systemen.',
    ampel: 'Intensiver Thiol-Geruch – im Kundengespräch proaktiv ansprechen. PSA-Anforderungen klären.',
  },
  {
    id: 'MTM76',
    handelsname: 'DYNASYLAN MTES',
    evonikAlias: 'MTES',
    momentiveAlias: 'Silquest A-162',
    wackerAlias: 'Geniosil XL 12',
    chemName: 'methyltriethoxysilane',
    cas: '2031-67-6',
    klasse: 'Alkylsilan',
    alkoxy: 'Ethoxy',
    hydrolyse: 'Langsam',
    substrate: ['Mineralien', 'Beton', 'Mauerwerk', 'Füllstoffe'],
    funktionenCoatings: ['Filler Surface Treatment (Hydrophobierung)'],
    funktionenAS: ['Filler Surface Treatment (Hydrophobierung)'],
    harzsystemeCoatings: ['WB-Systeme (Hydrophobierung)'],
    harzsystemeAS: ['Silikonkautschuk'],
    positionierung: 'Kein reaktiver Organyl-Rest → primär Hydrophobierung, keine kovalente Matrixanbindung. Für Bautenschutz-Formulierungen und hydrophobierte Füllstoffe in WB-Systemen.',
    ampel: 'KEIN Haftvermittler – nur Hydrophobierung. Verwechslung im Kundengespräch unbedingt vermeiden.',
  },
  {
    id: 'ATE04',
    handelsname: 'DYNASYLAN A (TEOS)',
    evonikAlias: 'TEOS',
    momentiveAlias: '–',
    wackerAlias: 'Silbond 40 (ähnlich)',
    chemName: 'Tetraethoxysilane',
    cas: '78-10-4',
    klasse: 'Tetraalkoxysilan',
    alkoxy: 'Ethoxy (4×)',
    hydrolyse: 'Langsam',
    substrate: ['Poröse Mineralien', 'Beton', 'Naturstein', 'Keramik'],
    funktionenCoatings: ['Sol-Gel Bindemittel', 'Konsolidierung'],
    funktionenAS: [],
    harzsystemeCoatings: ['Anorganische Bindersysteme', 'Sol-Gel-Coatings'],
    harzsystemeAS: [],
    positionierung: 'Kein organofunktioneller Rest → reine SiO₂-Bildung nach Hydrolyse. Nischenanwendung für Sol-Gel-Technologie und Bautenschutz. Vorstufe zu ATE73.',
    ampel: 'Nicht in der Coatings/A&S-Empfehlungsmatrix von Safic-Chem. Gesprächsführung auf Sol-Gel und anorganische Bindersysteme begrenzen.',
  },
  {
    id: 'ATE73',
    handelsname: 'DYNASYLAN 40',
    evonikAlias: 'DYNASYLAN 40',
    momentiveAlias: '–',
    wackerAlias: 'Silbond 40',
    chemName: 'Tetraethoxysilane, oligomer',
    cas: '68412-27-3',
    klasse: 'Tetraalkoxysilan (oligomer)',
    alkoxy: 'Ethoxy (oligomer)',
    hydrolyse: 'Kontrolliert langsam',
    substrate: ['Naturstein', 'Beton', 'Zinkstaub-Systeme', 'Feuerfestmaterialien'],
    funktionenCoatings: ['Bindemittel Zinkstaub-Primer', 'Konsolidierung/Festiger'],
    funktionenAS: [],
    harzsystemeCoatings: ['Zinkstaub-Primer (Korrosionsschutz)', 'Sol-Gel-Coatings'],
    harzsystemeAS: [],
    positionierung: 'Höherer SiO₂-Gehalt als monomeres TEOS. Hauptargument im CASE-Bereich: Bindemittel in anorganischen Zinkstaubbeschichtungen (Schiffbau, Stahl, Brücken).',
    ampel: 'Stärkstes CASE-Argument: Zinkstaub-Primer. Differenzierung über Preis und Lieferzuverlässigkeit.',
  },
]

// ─── Produktfinder-Matrix ─────────────────────────────────────────────────────

const FINDER = {
  Coatings: {
    funktionen: {
      'Adhesion Promoter':            ['AME02', 'AAT43', 'EGM38'],
      'Crosslinker (Polymerisation)': ['MEM50'],
      'Crosslinker (post-addition)':  ['EGM38'],
      'Coupling Agent':               ['AME02', 'AAT43', 'EGM38'],
      'Primer':                       ['AME02', 'AAT43'],
      'Filler Surface Treatment':     ['MEM50', 'EGM38', 'AME02', 'MTM42'],
      'Emulsionspolymerisation':      ['VTM27', 'MEM50', 'EGM38'],
    },
    harze: {
      'Acrylic':   ['MEM50', 'EGM38', 'AME02', 'VTM27'],
      'PU (1K)':   ['EGM38'],
      'PU (2K)':   ['EGM38', 'AME02', 'AAT43'],
      'PUD':       ['EGM38', 'AME02'],
      'Epoxy':     ['EGM38', 'AME02', 'MEM50'],
      'Alkyd':     ['AAT43', 'AME02'],
      'Polyamide': ['AAT43', 'AME02'],
      'Phenolic':  ['EGM38', 'AME02', 'AAT43'],
      'Polyester': ['MEM50', 'VTM27'],
      'Silicone':  ['AAT43', 'AME02'],
      'Melamine':  ['AAT43', 'AME02', 'EGM38'],
    },
  },
  'Adhesives & Sealants': {
    funktionen: {
      'Adhesion Promoter':          ['AME02', 'AAT43', 'EGM38', 'MTM42'],
      'Crosslinker (non silicone)': ['MEM50', 'VTM27', 'EGM38'],
      'Coupling Agent':             ['AME02', 'AAT43', 'EGM38', 'MTM42'],
      'Moisture Scavenger':         ['VTM27'],
      'Primer':                     ['AME02', 'AAT43'],
      'Filler Surface Treatment':   ['MEM50', 'EGM38', 'AME02', 'MTM42'],
    },
    harze: {
      'Acrylic':     ['MEM50', 'EGM38', 'AME02', 'VTM27'],
      'PU (1K)':     ['EGM38'],
      'PU (2K)':     ['EGM38', 'AME02', 'AAT43'],
      'Epoxy':       ['EGM38', 'AME02', 'AAT43'],
      'Silicone':    ['AAT43', 'AME02'],
      'Polysulfide': ['EGM38', 'MTM42', 'AME02'],
      'MS Polymer':  ['AAT43', 'AME02', 'VTM27'],
    },
  },
}

// ─── Farben (angepasst für Light-Theme) ──────────────────────────────────────

const KLASSE_COLOR = {
  'Aminosilan':                  { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe' },
  'Aminosilan (oligomer)':       { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe' },
  'Epoxysilan':                  { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' },
  'Vinylsilan':                  { bg: '#f3e8ff', text: '#7c3aed', border: '#e9d5ff' },
  'Methacryloxysilane':          { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8' },
  'Mercaptosilan':               { bg: '#fef9c3', text: '#a16207', border: '#fef08a' },
  'Alkylsilan':                  { bg: '#f3f4f6', text: '#374151', border: '#e5e7eb' },
  'Tetraalkoxysilan':            { bg: '#ccfbf1', text: '#0f766e', border: '#99f6e4' },
  'Tetraalkoxysilan (oligomer)': { bg: '#ccfbf1', text: '#0f766e', border: '#99f6e4' },
}

// ─── Styles (Light-Theme) ─────────────────────────────────────────────────────

const S = {
  card: (highlighted, expanded) => ({
    borderRadius: '12px',
    border: highlighted
      ? '1.5px solid #16a34a'
      : expanded
      ? '1.5px solid #3b82f6'
      : '1px solid #e2e8f0',
    background: highlighted
      ? '#f0fdf4'
      : expanded
      ? '#eff6ff'
      : '#ffffff',
    marginBottom: '10px',
    cursor: 'pointer',
    boxShadow: expanded || highlighted ? '0 2px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
    transition: 'all 0.15s',
    overflow: 'hidden',
  }),
  label: {
    fontSize: '10px', fontWeight: 700, color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px',
  },
  badge: (c) => ({
    display: 'inline-block', padding: '2px 9px', borderRadius: '999px',
    fontSize: '11px', fontWeight: 600,
    background: c.bg, color: c.text, border: `1px solid ${c.border}`,
  }),
  chip: {
    display: 'inline-block', padding: '2px 8px', borderRadius: '6px',
    fontSize: '11px', background: '#f1f5f9', color: '#475569',
    border: '1px solid #e2e8f0',
  },
  fnChip: {
    display: 'inline-block', padding: '2px 9px', borderRadius: '6px',
    fontSize: '11px', fontWeight: 600,
    background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
  },
  section: {
    background: '#ffffff', border: '1px solid #e2e8f0',
    borderRadius: '12px', padding: '16px', marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '11px', fontWeight: 700, color: '#64748b',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px',
  },
}

// ─── Produktkarte ─────────────────────────────────────────────────────────────

function ProduktKarte({ p, expanded, onToggle, highlighted }) {
  const kl = KLASSE_COLOR[p.klasse] || KLASSE_COLOR['Alkylsilan']

  return (
    <div onClick={onToggle} style={S.card(highlighted, expanded)}>
      {/* Header */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '5px' }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '11px', fontWeight: 700,
                background: '#f1f5f9', color: '#64748b',
                padding: '1px 7px', borderRadius: '5px', border: '1px solid #e2e8f0',
              }}>{p.id}</span>
              <span style={S.badge(kl)}>{p.klasse}</span>
              {highlighted && (
                <span style={{ ...S.badge({ bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' }) }}>✓ Empfohlen</span>
              )}
            </div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>{p.handelsname}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{p.chemName}</div>
            {/* Alias-Zeile */}
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
              <span style={{ color: '#1d4ed8', fontWeight: 600 }}>{p.evonikAlias}</span>
              {p.momentiveAlias !== '–' && <span style={{ color: '#94a3b8' }}> · Momentive: <span style={{ color: '#dc2626', fontWeight: 600 }}>{p.momentiveAlias}</span></span>}
              {p.wackerAlias && <span style={{ color: '#94a3b8' }}> · Wacker: <span style={{ color: '#7c3aed', fontWeight: 600 }}>{p.wackerAlias}</span></span>}
            </div>
          </div>
          <span style={{ color: '#94a3b8', fontSize: '14px', marginLeft: '12px', marginTop: '2px' }}>
            {expanded ? '▲' : '▼'}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
          {p.substrate.map(s => <span key={s} style={S.chip}>{s}</span>)}
        </div>
      </div>

      {/* Detail */}
      {expanded && (
        <div onClick={e => e.stopPropagation()} style={{ borderTop: '1px solid #e2e8f0', padding: '14px 16px' }}>

          {/* Eckdaten */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            {[['CAS-Nr.', p.cas], ['Alkoxy-Gruppe', p.alkoxy], ['Hydrolyse', p.hydrolyse]].map(([l, v]) => (
              <div key={l}>
                <div style={S.label}>{l}</div>
                <div style={{ fontSize: '12px', color: '#1e293b', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Funktionen */}
          {[['Coatings', p.funktionenCoatings, p.harzsystemeCoatings],
            ['Adhesives & Sealants', p.funktionenAS, p.harzsystemeAS]].map(([seg, fns, harze]) => {
            if (!fns || fns.length === 0) return null
            return (
              <div key={seg} style={{ marginBottom: '12px' }}>
                <div style={S.label}>Funktionen – {seg}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '6px' }}>
                  {fns.map(f => <span key={f} style={S.fnChip}>{f}</span>)}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {harze.map(h => <span key={h} style={S.chip}>{h}</span>)}
                </div>
              </div>
            )
          })}

          {/* Positionierung */}
          <div style={{ marginBottom: '12px' }}>
            <div style={S.label}>Technische Positionierung</div>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: 0 }}>{p.positionierung}</p>
          </div>

          {/* Wettbewerb */}
          <div style={{ marginBottom: '10px' }}>
            <div style={S.label}>Wettbewerbs-Äquivalente</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[p.momentiveAlias, p.wackerAlias].filter(x => x && x !== '–').map(w => (
                <span key={w} style={{
                  fontSize: '11px', padding: '2px 9px', borderRadius: '6px', fontWeight: 600,
                  background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
                }}>{w}</span>
              ))}
            </div>
          </div>

          {/* Ampel */}
          <div style={{
            padding: '10px 12px', borderRadius: '8px',
            background: '#fffbeb', border: '1px solid #fcd34d',
            display: 'flex', gap: '8px', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '14px' }}>⚠️</span>
            <p style={{ margin: 0, fontSize: '12px', color: '#92400e', lineHeight: 1.5 }}>{p.ampel}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Produktfinder ────────────────────────────────────────────────────────────

function Produktfinder({ onHighlight }) {
  const [sucheNach, setSucheNach] = useState('funktion')
  const [segment, setSegment] = useState('Coatings')
  const [auswahl, setAuswahl] = useState('')

  const matrix = sucheNach === 'funktion' ? FINDER[segment].funktionen : FINDER[segment].harze
  const optionen = Object.keys(matrix)
  const ergebnis = auswahl ? (matrix[auswahl] || []) : []

  const reset = (newMatrix) => { setAuswahl(''); onHighlight([]) }

  const btnStyle = (active, color = '#1d4ed8') => ({
    padding: '5px 13px', borderRadius: '8px', border: 'none', cursor: 'pointer',
    fontSize: '12px', fontWeight: 600,
    background: active ? color : '#f1f5f9',
    color: active ? '#fff' : '#64748b',
  })

  return (
    <div style={{ ...S.section, marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontSize: '18px' }}>🎯</span>
        <span style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>Produktfinder</span>
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Empfehlungen aus offiziellem Safic-Chem PDF</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        {[['funktion', 'Nach Funktion'], ['harz', 'Nach Harzsystem']].map(([val, label]) => (
          <button key={val} onClick={() => { setSucheNach(val); reset() }}
            style={btnStyle(sucheNach === val)}>{label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {['Coatings', 'Adhesives & Sealants'].map(s => (
          <button key={s} onClick={() => { setSegment(s); reset() }}
            style={btnStyle(segment === s, '#4f46e5')}>{s}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
        {optionen.map(opt => (
          <button key={opt} onClick={() => { setAuswahl(opt); onHighlight(matrix[opt] || []) }}
            style={{
              padding: '5px 11px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '11px', fontWeight: 600, border: '1px solid',
              background: auswahl === opt ? '#f0fdf4' : '#f8fafc',
              color: auswahl === opt ? '#15803d' : '#475569',
              borderColor: auswahl === opt ? '#86efac' : '#e2e8f0',
            }}>{opt}</button>
        ))}
      </div>

      {auswahl && (
        <div style={{ padding: '12px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #86efac' }}>
          <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, marginBottom: '8px' }}>
            Empfehlung für „{auswahl}" – {segment}:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {ergebnis.map(id => {
              const prod = PRODUKTE.find(x => x.id === id)
              return prod ? (
                <div key={id} style={{
                  background: '#dcfce7', border: '1px solid #86efac',
                  borderRadius: '8px', padding: '5px 12px',
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#15803d', fontWeight: 700 }}>{id}</span>
                  <span style={{ fontSize: '11px', color: '#475569', marginLeft: '8px' }}>{prod.handelsname}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: '6px' }}>({prod.evonikAlias})</span>
                </div>
              ) : null
            })}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>↓ Produkte unten hervorgehoben</div>
        </div>
      )}
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export default function Silane() {
  const [ansicht, setAnsicht] = useState('produkte')
  const [expanded, setExpanded] = useState(null)
  const [suchText, setSuchText] = useState('')
  const [highlightIds, setHighlightIds] = useState([])

  const gefilterteProdukte = PRODUKTE.filter(p => {
    if (!suchText) return true
    const q = suchText.toLowerCase()
    return (
      p.id.toLowerCase().includes(q) ||
      p.handelsname.toLowerCase().includes(q) ||
      p.evonikAlias.toLowerCase().includes(q) ||
      p.chemName.toLowerCase().includes(q) ||
      p.cas.includes(q) ||
      p.klasse.toLowerCase().includes(q)
    )
  })

  const tabBtn = (val, label) => (
    <button key={val} onClick={() => setAnsicht(val)} style={{
      padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
      fontSize: '13px', fontWeight: 600,
      background: ansicht === val ? '#1d4ed8' : '#f1f5f9',
      color: ansicht === val ? '#fff' : '#64748b',
    }}>{label}</button>
  )

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a6e 0%, #1d4ed8 100%)',
        borderRadius: '14px', padding: '18px 22px', marginBottom: '18px',
        boxShadow: '0 2px 12px rgba(29,78,216,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span style={{ fontSize: '22px' }}>⚗️</span>
              <span style={{ fontWeight: 800, fontSize: '20px', color: '#fff' }}>Safic-Chem SIL</span>
              <span style={{
                fontSize: '11px', fontWeight: 600, padding: '2px 9px', borderRadius: '999px',
                background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
              }}>Silane Portfolio</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              10 Organosilane · Quelle: SAFIC-CHEM SIL Overview Nov. 2024
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[['10', 'Produkte', '#93c5fd'], ['5', 'Klassen', '#6ee7b7'], ['4', 'Segmente', '#fde68a']].map(([n, l, c]) => (
              <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 14px' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: c }}>{n}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
          {[['produkte', 'Produktübersicht'], ['finder', 'Produktfinder'], ['wissen', 'Verkaufswissen']].map(([val, label]) => (
            <button key={val} onClick={() => setAnsicht(val)} style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: 600,
              background: ansicht === val ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
              color: ansicht === val ? '#fff' : 'rgba(255,255,255,0.6)',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ── Produktübersicht ── */}
      {ansicht === 'produkte' && (
        <>
          <input
            type="text"
            placeholder="Suche: ID, Handelsname, GLYMO, AMEO, VTMO, CAS …"
            value={suchText}
            onChange={e => setSuchText(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', color: '#0f172a', marginBottom: '8px',
              outline: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          />
          <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>
            {gefilterteProdukte.length} von {PRODUKTE.length} Produkten
            {suchText && (
              <button onClick={() => setSuchText('')} style={{
                marginLeft: '10px', background: 'none', border: 'none',
                color: '#1d4ed8', cursor: 'pointer', fontSize: '11px', fontWeight: 600,
              }}>zurücksetzen</button>
            )}
          </div>
          {gefilterteProdukte.map(p => (
            <ProduktKarte key={p.id} p={p}
              expanded={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
              highlighted={false}
            />
          ))}
          {gefilterteProdukte.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
              <div>Kein Produkt gefunden. Versuch z.B. „GLYMO", „AME02" oder „Epoxy".</div>
            </div>
          )}
        </>
      )}

      {/* ── Produktfinder ── */}
      {ansicht === 'finder' && (
        <>
          <Produktfinder onHighlight={setHighlightIds} />
          <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>
            {highlightIds.length > 0
              ? `${highlightIds.length} Produkte empfohlen – unten hervorgehoben`
              : 'Alle 10 Produkte'}
          </div>
          {PRODUKTE.map(p => (
            <ProduktKarte key={p.id} p={p}
              expanded={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
              highlighted={highlightIds.includes(p.id)}
            />
          ))}
        </>
      )}

      {/* ── Verkaufswissen ── */}
      {ansicht === 'wissen' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Drei Kernfunktionen */}
          <div style={S.section}>
            <div style={S.sectionTitle}>Die drei Kernfunktionen</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { icon: '🔗', titel: 'Crosslinker', farbe: '#f97316', bg: '#fff7ed', border: '#fed7aa',
                  text: 'Vernetzt Polymerketten. → Höhere Festigkeit, Härte, Temperaturbeständigkeit, längere Lebensdauer.',
                  ids: 'MEM50 (Polym.) · EGM38 (post-add.)' },
                { icon: '🏗️', titel: 'Adhesion Promoter', farbe: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
                  text: 'Kovalente Brücke Harz ↔ Substrat (Metall, Glas). Verbessert Korrosionsschutz, verhindert Unterrostung.',
                  ids: 'AME02 · AAT43 · EGM38 (+ MTM42 A&S)' },
                { icon: '⚗️', titel: 'Coupling Agent', farbe: '#059669', bg: '#f0fdf4', border: '#bbf7d0',
                  text: 'Bindet Füllstoff an Harzmatrix. Höhere Füllstoffbeladung, bessere Dispersion, optimierte Verbundstärke.',
                  ids: 'AME02 · AAT43 · EGM38 · MTM42' },
              ].map(item => (
                <div key={item.titel} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '10px', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span>{item.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: item.farbe }}>{item.titel}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, margin: '0 0 5px' }}>{item.text}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>→ {item.ids}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methoxy vs Ethoxy */}
          <div style={S.section}>
            <div style={S.sectionTitle}>⚡ Methoxy vs. Ethoxy</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#c2410c', marginBottom: '6px', fontSize: '13px' }}>Methoxy (–OCH₃)</div>
                {['Schnellere Hydrolyse', 'Kürzere Topfzeit', 'Methanol als Nebenprodukt', 'AAT43, EGM38, VTM27, MEM50, MTM42'].map(t => (
                  <div key={t} style={{ fontSize: '12px', color: '#475569', marginBottom: '3px' }}>› {t}</div>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#1d4ed8', marginBottom: '6px', fontSize: '13px' }}>Ethoxy (–OC₂H₅)</div>
                {['Langsamere Hydrolyse', 'Längere Topfzeit / Lagerstabilität', 'Ethanol als Nebenprodukt (weniger toxisch)', 'AME02, MTM76, ATE04, ATE73'].map(t => (
                  <div key={t} style={{ fontSize: '12px', color: '#475569', marginBottom: '3px' }}>› {t}</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px', fontStyle: 'italic' }}>
              Faustregel (aus PDF): „Bigger group = slower reaction – Ethoxy is slower than Methoxy."
            </div>
          </div>

          {/* Schnell-Referenz */}
          <div style={S.section}>
            <div style={S.sectionTitle}>🔄 Schnell-Referenz: Kundenkürzel → Safic-Chem ID</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '6px' }}>
              {PRODUKTE.map(p => (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#f8fafc', borderRadius: '8px', padding: '7px 10px',
                  border: '1px solid #e2e8f0',
                }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#1d4ed8', minWidth: '55px' }}>{p.evonikAlias.split(' ')[0]}</span>
                  <span style={{ fontSize: '11px', color: '#cbd5e1' }}>→</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{p.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Einwände */}
          <div style={S.section}>
            <div style={S.sectionTitle}>💬 Einwände & Antworten</div>
            {[
              { e: '"Wir verwenden GLYMO von Momentive/Wacker."',
                a: 'Perfekt – unser EGM38 ist das funktionale Äquivalent (CAS identisch). Wir liefern ab Lager in Deutschland, Kleinmengen möglich, keine Mindestbestellmenge.' },
              { e: '"Wacker/Momentive sind günstig und überall verfügbar."',
                a: 'DYNASYLAN-Produkte sind technisch identisch. Als CASE-Spezialdistributor: lokales Lager, schnelle Lieferung, technische Beratung und One-Stop-Shop mit komplementären Produkten.' },
              { e: '"Silane wirken nicht bei unseren Füllstoffen."',
                a: 'Korrekt wenn CaCO₃ oder Carbon Black: dort sind Silane wirkungslos. Bei TiO₂, Silica, Mica, Glas oder Metall: volle Wirksamkeit. Welches Substrat genau?' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px', marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', color: '#b45309', fontStyle: 'italic', marginBottom: '6px', fontWeight: 600 }}>{item.e}</div>
                <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>
                  <span style={{ color: '#059669', fontWeight: 700 }}>→ </span>{item.a}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}
