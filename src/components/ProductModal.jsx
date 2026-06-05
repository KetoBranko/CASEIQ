import { useEffect } from 'react'
import { SEG_META, CAT_META } from '../data/products'
import './ProductModal.css'

export default function ProductModal({ product: p, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{p.n}</h2>
            <div className="modal-meta">
              <span className="modal-sup">{p.sup}</span>
              <span className={`cat-pill ${CAT_META[p.cat] || ''}`}>{p.cat}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <i className="ti ti-x" />
          </button>
        </div>

        <div className="modal-segs">
          {p.segs.map(s => (
            <span key={s} className={`seg-badge ${SEG_META[s].cls}`}>{SEG_META[s].label}</span>
          ))}
        </div>

        <div className="modal-section">
          <div className="modal-label">Chemie / Basis</div>
          <div className="modal-value">{p.chem}</div>
        </div>

        <div className="modal-section">
          <div className="modal-label">Details & Verkaufsargumente</div>
          <div className="modal-value modal-detail">{p.detail}</div>
        </div>

        <div className="modal-section">
          <div className="modal-label">Schlagworte</div>
          <div className="modal-tags">
            {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}
