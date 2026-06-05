import { useState } from 'react'
import { PRODUCTS, SEG_META, CAT_META } from '../data/products'
import ProductModal from './ProductModal'
import './ProductDB.css'

const FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'C', label: 'Coatings' },
  { id: 'A', label: 'Adhesives' },
  { id: 'I', label: 'Industrial' },
  { id: 'P', label: 'Plastics' },
]

export default function ProductDB() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = PRODUCTS.filter(p => {
    const q = query.toLowerCase()
    const matchQuery = !q || p.n.toLowerCase().includes(q) ||
      p.chem.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.sup.toLowerCase().includes(q) ||
      p.detail.toLowerCase().includes(q)
    const matchFilter = filter === 'all' || p.segs.includes(filter)
    return matchQuery && matchFilter
  })

  return (
    <div className="pdb">
      <div className="pdb-toolbar">
        <div className="search-wrap">
          <i className="ti ti-search search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Produkt, Chemie, Schlagwort suchen…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')}>
              <i className="ti ti-x" />
            </button>
          )}
        </div>
      </div>

      <div className="seg-filters">
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`seg-filter seg-filter-${f.id} ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
        <span className="result-count">{filtered.length} Produkte</span>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          <i className="ti ti-mood-empty" />
          <p>Keine Produkte gefunden</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      )}

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function ProductCard({ product: p, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="pc-top">
        <div className="pc-info">
          <div className="pc-name">{p.n}</div>
          <div className="pc-sup">{p.sup}</div>
        </div>
        <span className={`cat-pill ${CAT_META[p.cat] || ''}`}>{p.cat}</span>
      </div>
      <div className="pc-segs">
        {p.segs.map(s => (
          <span key={s} className={`seg-badge ${SEG_META[s].cls}`}>{SEG_META[s].label}</span>
        ))}
      </div>
      <div className="pc-chem">{p.chem.substring(0, 110)}{p.chem.length > 110 ? '…' : ''}</div>
      <div className="pc-tags">
        {p.tags.slice(0, 5).map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  )
}
