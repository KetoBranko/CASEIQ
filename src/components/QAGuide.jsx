import { useState } from 'react'
import { QA_TREE } from '../data/qa'
import { PRODUCTS } from '../data/products'
import ProductModal from './ProductModal'
import './QAGuide.css'

export default function QAGuide() {
  const [stack, setStack] = useState([])
  const [nodeKey, setNodeKey] = useState('start')
  const [selected, setSelected] = useState(null)

  const node = QA_TREE[nodeKey]

  const go = (i) => {
    const opt = node.os[i]
    const newStack = [...stack, nodeKey]
    if (typeof opt.nx === 'string') {
      setStack(newStack)
      setNodeKey(opt.nx)
    } else {
      QA_TREE['__result__'] = opt.nx
      setStack(newStack)
      setNodeKey('__result__')
    }
  }

  const back = () => {
    if (!stack.length) return
    const prev = [...stack]
    const last = prev.pop()
    setStack(prev)
    setNodeKey(last)
  }

  const reset = () => {
    setStack([])
    setNodeKey('start')
  }

  if (!node) return null

  // Result view
  if (node.r) {
    const products = node.r.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean)
    return (
      <div className="qa">
        <div className="qa-breadcrumb">
          <span>Schritt {stack.length}</span>
          <span className="qa-dot">·</span>
          <span>Empfehlung</span>
        </div>
        <h3 className="qa-title">Passende Produkte für diesen Kunden</h3>
        <div className="qa-note">
          <i className="ti ti-bulb" />
          <span>{node.note}</span>
        </div>
        <div className="qa-results">
          {products.map(p => (
            <div key={p.id} className="qa-result-item" onClick={() => setSelected(p)}>
              <div className="qri-icon"><i className="ti ti-flask" /></div>
              <div className="qri-info">
                <div className="qri-name">{p.n}</div>
                <div className="qri-meta">{p.sup} · {p.tags.slice(0,3).join(' · ')}</div>
              </div>
              <i className="ti ti-chevron-right qri-arrow" />
            </div>
          ))}
        </div>
        <div className="qa-nav">
          <button className="qa-back-btn" onClick={back}><i className="ti ti-arrow-left" /> Zurück</button>
          <button className="qa-reset-btn" onClick={reset}><i className="ti ti-refresh" /> Von vorne</button>
        </div>
        {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      </div>
    )
  }

  // Question view
  return (
    <div className="qa">
      <div className="qa-breadcrumb">
        <span>Schritt {stack.length + 1}</span>
        {stack.length > 0 && (
          <>
            <span className="qa-dot">·</span>
            <span>{stack.length} von {stack.length + 1} abgeschlossen</span>
          </>
        )}
      </div>
      <h3 className="qa-title">{node.q}</h3>
      {node.h && (
        <div className="qa-hint">
          <i className="ti ti-info-circle" />
          <span>{node.h}</span>
        </div>
      )}
      <div className="qa-options">
        {node.os.map((o, i) => (
          <button key={i} className="qa-option" onClick={() => go(i)}>
            <span>{o.l}</span>
            <i className="ti ti-chevron-right" />
          </button>
        ))}
      </div>
      {stack.length > 0 && (
        <div className="qa-nav">
          <button className="qa-back-btn" onClick={back}><i className="ti ti-arrow-left" /> Zurück</button>
          <button className="qa-reset-btn" onClick={reset}><i className="ti ti-refresh" /> Von vorne</button>
        </div>
      )}
    </div>
  )
}
