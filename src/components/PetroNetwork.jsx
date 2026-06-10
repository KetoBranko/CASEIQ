// src/components/PetroNetwork.jsx
// Petrochemikalien + Safic-Alcan Netzwerk – direkt als React Canvas (kein iframe)

import { useEffect, useRef, useCallback } from 'react'
import './PetroNetwork.css'

const NODES = [
  {id:'coal',label:'Kohle/Öl\nNaturgas',type:'raw',r:36,desc:'Primärer fossiler Rohstoff – Ausgangspunkt aller Petrochemikalien'},
  {id:'silicon',label:'Silizium\nQuarz SiO₂',type:'raw',r:22,desc:'Si – Basis aller Silane. Herstellung: Reduktion von Quarzsand mit Koks im Elektrolichtbogen.'},
  {id:'ethylene',label:'Ethylen',type:'base',r:27,desc:'C₂H₄ · Steam Cracking · wichtigstes petrochemisches Grundprodukt'},
  {id:'propylene',label:'Propylen',type:'base',r:25,desc:'C₃H₆ · FCC oder Steam Cracking · zweitwichtigstes Olefin'},
  {id:'benzene',label:'Benzol',type:'base',r:25,desc:'BTX-Aromat · Reforming/Pyrolyse · aromatischer Grundstoff'},
  {id:'toluene',label:'Toluol',type:'base',r:21,desc:'BTX-Aromat · Lösemittel · TDI-Vorstufe'},
  {id:'xylenes',label:'Xylole',type:'base',r:21,desc:'o/m/p-Xylol · BTX-Fraktion · TPA und PSA'},
  {id:'butadiene',label:'Butadien',type:'base',r:23,desc:'1,3-Butadien · C4-Schnitt Steam Cracking · Synthesekautschuk-Monomer'},
  {id:'methane',label:'Methan',type:'base',r:21,desc:'CH₄ · Erdgas · Synthesegas-Vorstufe'},
  {id:'chlorosilane',label:'Chlor-\nsilane',type:'base',r:20,desc:'SiHCl₃, SiCl₄ – Reaktion Si + HCl (Müller-Rochow-Prozess) – Vorstufe aller Organosilane'},
  {id:'syngas',label:'Synthese-\ngas',type:'deriv',r:17,desc:'CO + H₂ · Methan-Dampfreformierung · Methanol, Fischer-Tropsch'},
  {id:'methanol',label:'Methanol',type:'deriv',r:19,desc:'CH₃OH · Synthesegas-Hydrierung · Formaldehyd, Essigsäure, MMA'},
  {id:'formaldehyde',label:'Formal-\ndehyd',type:'deriv',r:17,desc:'HCHO · Methanol-Oxidation · PF-, UF-, MF-Harze; MDI-Kette'},
  {id:'ethyleneoxide',label:'Ethylen-\noxid',type:'deriv',r:19,desc:'EO · Ag-katalysierte Oxidation · MEG, Polyetherpolyole'},
  {id:'polyetherpolyol',label:'Polyether-\npolyol',type:'deriv',r:20,desc:'PO/EO + Starteralkohol · Hauptrohstoff für PUR-Weich- und Hartschaum'},
  {id:'propyleneoxide',label:'Propylen-\noxid',type:'deriv',r:18,desc:'PO · Chlorhydrin- oder HPPO-Verfahren · Polyetherpolyole, PG'},
  {id:'epichlorohydrin',label:'Epichlorh.',type:'deriv',r:14,desc:'ECH · Allylchlorid-Route oder Glycerin-Route · Epoxidharz-Vorstufe'},
  {id:'acrylates',label:'Acrylate',type:'deriv',r:16,desc:'Acrylsäure + Ester (BA/EA/MA) · Dispersionen, Superabsorber, Klebstoffe'},
  {id:'vinylacetate',label:'Vinyl-\nacetat',type:'deriv',r:16,desc:'VAM · Ethylen + Essigsäure + O₂ · PVAc, PVOH, EVA'},
  {id:'TDI',label:'TDI',type:'deriv',r:16,desc:'Toluylendiisocyanat · Toluol→TDA+Phosgen · Weich-PU-Schaum'},
  {id:'MDI',label:'MDI',type:'deriv',r:16,desc:'Methylendiphenyldiisocyanat · Anilin+Formaldehyd+Phosgen · Hart-PU'},
  {id:'aniline',label:'Anilin',type:'deriv',r:16,desc:'Aminobenzol · Hydrierung Nitrobenzol · MDI-Vorstufe'},
  {id:'phosgene',label:'Phosgen',type:'deriv',r:14,desc:'COCl₂ · CO + Cl₂ · Isocyanat-Synthese, Polycarbonat'},
  {id:'bisphenolA',label:'Bisphenol A',type:'deriv',r:17,desc:'BPA · Phenol + Aceton · Vorstufe PC und Epoxidharz'},
  {id:'phenol',label:'Phenol',type:'deriv',r:20,desc:'Hydroxybenzol · PF-Harze, Bisphenol A, Caprolactam'},
  {id:'phthalic',label:'PSA',type:'deriv',r:16,desc:'Phthalsäureanhydrid · o-Xylol-Oxidation · Weichmacher, Alkydharze'},
  {id:'TPA',label:'TPA',type:'deriv',r:19,desc:'Terephthalsäure · p-Xylol-Oxidation · PET, PBT'},
  {id:'styrene',label:'Styrol',type:'deriv',r:20,desc:'Vinyl-Monomer · PS, ABS, SBR-Kautschuk, UP-Harz'},
  {id:'organosilane',label:'Organo-\nsilane',type:'deriv',r:17,desc:'R-Si(OR)₃ · Funktionalisierung via Grignard oder Hydrosilylierung · Bifunktionelle Haftvermittler'},
  {id:'polyurethane',label:'Poly-\nurethan',type:'end',r:22,desc:'PUR · Weich-/Hartschaum, Dämmstoffe, Lacke, Elastomere, Klebstoffe'},
  {id:'epoxyresin',label:'Epoxid-\nharz',type:'end',r:20,desc:'EP · Klebstoffe, CFK-Matrix, Gießharze, Korrosionsschutz'},
  {id:'polyester',label:'PET / PBT',type:'end',r:21,desc:'Polyester · Flaschen (PET), Textilfasern, technische Kunststoffe'},
  {id:'polypropylene',label:'Poly-\npropylen',type:'end',r:21,desc:'PP · Verpackungen, Fasern, Automobilteile, Vliesstoffe'},
  {id:'polystyrene',label:'Poly-\nstyrol',type:'end',r:19,desc:'PS / EPS · Verpackung, Wärmedämmung (Styropor)'},
  {id:'PVC',label:'PVC',type:'end',r:21,desc:'Polyvinylchlorid · Rohre, Fensterprofile, Bodenbeläge'},
  {id:'phenolresin',label:'Phenolharz',type:'end',r:15,desc:'PF-Harz (Bakelit, Novolak, Resol) · Presswerkstoffe, Schleifscheiben'},
  {id:'alkydresin',label:'Alkyd-\nharz',type:'end',r:14,desc:'Ölmodifiziertes Polyesterharz · Lacke, Anstrichfarben, Druckfarben'},
  {id:'SBR',label:'SBR',type:'end',r:18,desc:'Styrol-Butadien-Kautschuk · Reifen, Dichtungen, Schuhsohlen'},
  {id:'polycarbonate',label:'Poly-\ncarbonat',type:'end',r:18,desc:'PC · Linsen, Automotive-Verglasung, Displays'},
  {id:'silicone',label:'Silikone',type:'end',r:16,desc:'Polysiloxane (PDMS) · Dichtstoffe, Schmierstoffe, med. Implantate'},
  {id:'melamin',label:'Melamin-\nharz',type:'end',r:14,desc:'MF-Harz · Oberflächen, HPL-Schichtstoffplatten'},
  {id:'unsat_polyester',label:'UP-Harz',type:'end',r:15,desc:'Ungesättigter Polyester · GFK, Bootsrümpfe, Sanitärwaren'},
  // Safic-Alcan Portfolio
  {id:'sa_hydrolar',label:'Hydrolar\nWB-PU',type:'sa',r:20,desc:'COIM Hydrolar · 25 WB-Polyurethan-Dispersionen. Polyether, Polyester, Polycarbonate-Basis. Für Holz, Metall, Leder, Textil – exklusiv über Safic-Alcan.'},
  {id:'sa_hydrolar_pc',label:'Hydrolar\nPolycarbonate',type:'sa',r:16,desc:'COIM Hydrolar HC-Serie · Premium Polycarbonate-PUD. Beste UV- und Hydrolysebeständigkeit. HC208, HC210, HC294NF, HC295.'},
  {id:'sa_neboplast',label:'Neboplast\nDispersionen',type:'sa',r:17,desc:'Safic-Alcan Eigenmarke · Wässrige Dispersionen: PVAc, Copolymer, Acrylat, PU-Dispersionen. Wasserbasierte Bindemittel für Coatings und Adhesives.'},
  {id:'sa_amino',label:'SIL AME02\nAAT43',type:'sa',r:17,desc:'Safic-Chem SIL Aminosilane · AMEO (AME02) und DAMO (AAT43). Haftvermittler für Epoxy, PU, Alkyd auf Glas und Metall.'},
  {id:'sa_glymo',label:'SIL EGM38\nGLYMO',type:'sa',r:16,desc:'Safic-Chem SIL Epoxysilan · GLYMO (EGM38). Haftvermittler und Crosslinker (post-addition) für PU-1K, Epoxy, Phenolic.'},
  {id:'sa_vtmo',label:'SIL VTM27\nVTMO',type:'sa',r:13,desc:'Safic-Chem SIL Vinylsilan · VTMO (VTM27). Moisture Scavenger für MS-Polymer und RTV-Silikon.'},
  {id:'sa_memo',label:'SIL MEM50\nMEMO',type:'sa',r:13,desc:'Safic-Chem SIL Methacryloxysilane · MEMO (MEM50). Einziger radikalisch polymerisierbarer Koppler. Für UV-härtende Coatings.'},
  {id:'sa_mtmo',label:'SIL MTM42\nMTMO',type:'sa',r:12,desc:'Safic-Chem SIL Mercaptosilan · MTMO (MTM42). Für Polysulfid-Dichtstoffe und schwefelvernetzte Gummimischungen.'},
  {id:'sa_teos',label:'SIL ATE73\nDYNASYLAN 40',type:'sa',r:13,desc:'Safic-Chem SIL oligomeres TEOS · Bindemittel in anorganischen Zinkstaub-Primern. Korrosionsschutz Schiffbau/Stahl.'},
  {id:'sa_epoxy',label:'Epoxidharze\nSafic-Alcan',type:'sa',r:14,desc:'Safic-Alcan Epoxidharze und OH-Acrylharze für 2K-PU und 2K-Epoxy-Systeme.'},
  {id:'sa_alkyd',label:'Nebores\nAlkydharz',type:'sa',r:13,desc:'Safic-Alcan Eigenmarke Nebores · Alkydharze für lösemittelbasierte Beschichtungen.'},
  {id:'sa_rubber',label:'SI Group\nGummi-Metall',type:'sa',r:14,desc:'SI Group Elaztobond / HRJ · Weltmarktführer Gummi-Metall-Haftvermittler. Für technische Elastomere und Automotive.'},
]

const EDGES = [
  ['coal','ethylene'],['coal','propylene'],['coal','benzene'],['coal','toluene'],
  ['coal','xylenes'],['coal','butadiene'],['coal','methane'],
  ['silicon','chlorosilane'],
  ['methane','syngas'],['syngas','methanol'],
  ['methanol','formaldehyde'],
  ['ethylene','ethyleneoxide'],['ethylene','acrylates',1],['ethylene','vinylacetate',1],
  ['ethylene','styrene',1],['ethylene','PVC',1],
  ['ethyleneoxide','polyetherpolyol'],
  ['propylene','propyleneoxide'],['propylene','polypropylene'],['propylene','acrylates',1],
  ['propyleneoxide','polyetherpolyol'],
  ['polyetherpolyol','polyurethane'],
  ['benzene','styrene',1],['benzene','phenol'],['benzene','aniline'],['benzene','TDI',1],
  ['toluene','TDI'],
  ['xylenes','TPA'],['xylenes','phthalic'],
  ['TPA','polyester'],
  ['phthalic','alkydresin'],['phthalic','unsat_polyester',1],
  ['phenol','bisphenolA'],['phenol','phenolresin'],['phenol','polycarbonate',1],
  ['bisphenolA','epoxyresin'],['bisphenolA','polycarbonate'],
  ['aniline','MDI'],['formaldehyde','MDI',1],
  ['phosgene','MDI'],['phosgene','TDI',1],['phosgene','polycarbonate',1],
  ['TDI','polyurethane'],['MDI','polyurethane'],
  ['epichlorohydrin','epoxyresin'],
  ['styrene','polystyrene'],['styrene','SBR',1],['styrene','unsat_polyester'],
  ['butadiene','SBR'],
  ['formaldehyde','phenolresin'],['formaldehyde','melamin',1],
  ['acrylates','sa_neboplast'],
  ['vinylacetate','sa_neboplast',1],
  ['chlorosilane','organosilane'],
  ['organosilane','sa_amino'],
  ['organosilane','sa_glymo'],
  ['organosilane','sa_vtmo'],
  ['organosilane','sa_memo'],
  ['organosilane','sa_mtmo'],
  ['organosilane','sa_teos'],
  ['chlorosilane','silicone',1],
  ['polyurethane','sa_hydrolar'],
  ['MDI','sa_hydrolar',1],['TDI','sa_hydrolar',1],
  ['polycarbonate','sa_hydrolar_pc'],
  ['sa_hydrolar','sa_hydrolar_pc',1],
  ['epoxyresin','sa_glymo',1],['epoxyresin','sa_epoxy'],
  ['bisphenolA','sa_epoxy',1],
  ['alkydresin','sa_alkyd'],
  ['phthalic','sa_alkyd',1],
  ['SBR','sa_rubber'],
  ['sa_mtmo','SBR',1],
  ['sa_amino','epoxyresin',1],['sa_amino','polyurethane',1],
  ['sa_glymo','epoxyresin',1],
  ['sa_vtmo','polyurethane',1],
]

const TC = {
  raw:   {fill:'#c0392b', stroke:'#962d22'},
  base:  {fill:'#d07818', stroke:'#a05810'},
  deriv: {fill:'#a08818', stroke:'#786010'},
  end:   {fill:'#2e8040', stroke:'#1e5828'},
  sa:    {fill:'#1d4ed8', stroke:'#1e3a8a'},
}

const ALIASES = {
  coal:['erdöl','erdgas','rohöl','oil','naphtha'],
  silicon:['si','quarz','sio2','silizium'],
  chlorosilane:['chlorsilan','hcl+si','müller-rochow'],
  organosilane:['organosilan','haftvermittler'],
  silicone:['silikon','polysiloxan','pdms'],
  sa_hydrolar:['hydrolar','wb-pu','pud','coim','hr106','hr108','hr110','hr112','hr115','hr116','ht181','ht306','ha101'],
  sa_hydrolar_pc:['hc208','hc210','hc295','hc294nf','hc2357','polycarbonate pud'],
  sa_neboplast:['neboplast','dispersion','pvac'],
  sa_amino:['ame02','aat43','ameo','damo','aminosilan','a-1100','a-1120'],
  sa_glymo:['egm38','glymo','epoxysilan','glycidoxy','a-187','2530-83-8'],
  sa_vtmo:['vtm27','vtmo','vinylsilan','moisture scavenger','a-151'],
  sa_memo:['mem50','memo','methacryloxysilane','uv silan','a-174'],
  sa_mtmo:['mtm42','mtmo','mercaptosilan','thiol','a-189'],
  sa_teos:['ate73','dynasylan 40','teos oligomer','zinkstaub'],
  sa_epoxy:['oh-acrylharz','epoxidharz safic','2k-pu'],
  sa_alkyd:['nebores','alkydharz safic'],
  sa_rubber:['si group','elaztobond','hrj','gummi metall'],
  MDI:['methylendiphenyldiisocyanat','hart-pu','isocyanat'],
  TDI:['toluylendiisocyanat','weich-pu'],
  polyurethane:['pur','pu','polyurethan'],
  epoxyresin:['epoxid','epoxy','ep-harz'],
  acrylates:['acrylsäure','butylacrylat','acrylic acid'],
  polyetherpolyol:['polyether','polyol','pur polyol'],
}

export default function PetroNetwork() {
  const canvasRef = useRef(null)
  const bgRef = useRef(null)
  const stateRef = useRef({
    pos: {}, vx: {}, vy: {},
    scale: 1, ox: 0, oy: 0,
    selectedId: null, hoverId: null,
    dragging: false, dragStart: {x:0,y:0}, dragOri: {x:0,y:0},
    initialized: false,
  })
  const searchRef = useRef(null)
  const infoRef = useRef(null)
  const flowbarRef = useRef(null)
  const suggestRef = useRef(null)
  const containerRef = useRef(null)

  const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))
  const adj = {}
  NODES.forEach(n => { adj[n.id] = {in:[], out:[]} })
  EDGES.forEach(([a,b]) => { if(adj[a]&&adj[b]) { adj[a].out.push(b); adj[b].in.push(a) } })

  const ws = useCallback((x, y) => {
    const s = stateRef.current
    return { x: x * s.scale + s.ox, y: y * s.scale + s.oy }
  }, [])

  const getConn = useCallback((id) => {
    const up = new Set(), dn = new Set()
    const goUp = n => { if(up.has(n)) return; up.add(n); (adj[n]?.in||[]).forEach(goUp) }
    const goDn = n => { if(dn.has(n)) return; dn.add(n); (adj[n]?.out||[]).forEach(goDn) }
    goUp(id); goDn(id); up.delete(id); dn.delete(id)
    return { up, dn }
  }, [])

  const drawAll = useCallback(() => {
    const canvas = canvasRef.current
    const bgCanvas = bgRef.current
    if (!canvas || !bgCanvas) return
    const ctx = canvas.getContext('2d')
    const bgCtx = bgCanvas.getContext('2d')
    const s = stateRef.current
    const W = canvas.width, H = canvas.height
    if (!W || !H) return

    ctx.clearRect(0,0,W,H)
    bgCtx.clearRect(0,0,W,H)

    // Dot grid
    bgCtx.save(); bgCtx.fillStyle='rgba(0,0,0,0.08)'
    const step=32*s.scale, sx=((s.ox%step)+step)%step, sy=((s.oy%step)+step)%step
    for(let x=sx;x<W;x+=step) for(let y=sy;y<H;y+=step) { bgCtx.beginPath(); bgCtx.arc(x,y,0.85,0,Math.PI*2); bgCtx.fill() }
    bgCtx.restore()

    let up = new Set(), dn = new Set()
    if(s.selectedId) { const c = getConn(s.selectedId); up=c.up; dn=c.dn }

    // Draw edges
    EDGES.forEach(([a,b,dash]) => {
      if(!s.pos[a]||!s.pos[b]) return
      const p1=ws(s.pos[a].x,s.pos[a].y), p2=ws(s.pos[b].x,s.pos[b].y)
      const na=nodeMap[a], nb=nodeMap[b]; if(!na||!nb) return
      const ra=na.r*s.scale, rb=nb.r*s.scale
      const dx=p2.x-p1.x, dy=p2.y-p1.y, d=Math.sqrt(dx*dx+dy*dy)||1
      const x1=p1.x+dx/d*ra, y1=p1.y+dy/d*ra, x2=p2.x-dx/d*(rb+3), y2=p2.y-dy/d*(rb+3)

      let color='#94a3b8', alpha=0.6, width=1.2
      if(s.selectedId) {
        if((up.has(a)&&(up.has(b)||b===s.selectedId))||(a===s.selectedId&&up.has(b))) { color='#2860c8'; alpha=0.9; width=1.6 }
        else if((a===s.selectedId&&dn.has(b))||(dn.has(a)&&dn.has(b))) { color='#1e8040'; alpha=0.9; width=1.6 }
        else { color='rgba(0,0,0,0.04)'; alpha=1; width=0.5 }
      }
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=color; ctx.lineWidth=width
      if(dash) ctx.setLineDash([3,4]); else ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
      if(!dash&&alpha>0.3) {
        ctx.setLineDash([])
        const ang=Math.atan2(y2-y1,x2-x1), al=5.5*Math.max(s.scale,0.5), aw=0.44
        ctx.beginPath(); ctx.moveTo(x2,y2)
        ctx.lineTo(x2-al*Math.cos(ang-aw),y2-al*Math.sin(ang-aw))
        ctx.lineTo(x2-al*Math.cos(ang+aw),y2-al*Math.sin(ang+aw))
        ctx.closePath(); ctx.fillStyle=color; ctx.fill()
      }
      ctx.restore()
    })

    // Draw nodes
    NODES.forEach(node => {
      if(!s.pos[node.id]) return
      const sel=node.id===s.selectedId, hov=node.id===s.hoverId&&!sel
      const rel=!s.selectedId||sel||up.has(node.id)||dn.has(node.id)
      const p=ws(s.pos[node.id].x,s.pos[node.id].y), r=node.r*s.scale
      const tc=TC[node.type]
      ctx.save(); ctx.globalAlpha=rel?1:0.12
      if(rel) { ctx.shadowColor='rgba(0,0,0,0.18)'; ctx.shadowBlur=sel?14:4; ctx.shadowOffsetY=2 }
      ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fillStyle=tc.fill; ctx.fill()
      ctx.shadowBlur=0; ctx.shadowOffsetY=0
      ctx.strokeStyle=sel?(node.type==='sa'?'#fbbf24':'#f0c020'):hov?'rgba(255,255,255,0.9)':tc.stroke
      ctx.lineWidth=sel?3:hov?2:(node.type==='sa'?2:1); ctx.stroke()
      if(sel) { ctx.beginPath(); ctx.arc(p.x,p.y,r+4,0,Math.PI*2); ctx.strokeStyle='rgba(240,192,32,0.35)'; ctx.lineWidth=1.5; ctx.stroke() }
      const fs=Math.max(7.5,Math.min(11,r*0.38))
      ctx.font=`600 ${fs}px -apple-system,system-ui,sans-serif`
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillStyle='rgba(255,255,255,0.97)'; ctx.shadowBlur=0
      const lines=node.label.split('\n'), lh=fs*1.3
      lines.forEach((ln,i) => ctx.fillText(ln,p.x,p.y+(i-(lines.length-1)/2)*lh))
      ctx.restore()
    })
  }, [ws, getConn])

  const centerLayout = useCallback(() => {
    const canvas = canvasRef.current; if(!canvas) return
    const s = stateRef.current
    const W=canvas.width, H=canvas.height
    const xs=Object.values(s.pos).map(p=>p.x), ys=Object.values(s.pos).map(p=>p.y)
    const minx=Math.min(...xs), miny=Math.min(...ys), maxX=Math.max(...xs), maxY=Math.max(...ys)
    const sc=Math.min((W-80)/(maxX-minx||1),(H-80)/(maxY-miny||1),1)
    s.scale=sc; s.ox=(W-(maxX+minx)*sc)/2; s.oy=(H-(maxY+miny)*sc)/2
  }, [])

  const initLayout = useCallback(() => {
    const canvas = canvasRef.current; if(!canvas) return
    const s = stateRef.current
    const W=canvas.width, H=canvas.height
    const R=Math.min(W,H)*0.36
    NODES.forEach((n,i) => {
      const a=(i/NODES.length)*Math.PI*2
      const r = n.type==='sa'?R*1.25 : n.type==='raw'?0 : n.type==='base'?R*0.3 : n.type==='deriv'?R*0.65 : R
      s.pos[n.id]={x:Math.cos(a)*r, y:Math.sin(a)*r}
      s.vx[n.id]=0; s.vy[n.id]=0
    })
    s.pos['coal']={x:0,y:0}
    s.pos['silicon']={x:R*0.5,y:-R*0.2}

    for(let iter=0;iter<250;iter++) {
      const fx={}, fy={}
      NODES.forEach(n => { fx[n.id]=0; fy[n.id]=0 })
      for(let i=0;i<NODES.length;i++) for(let j=i+1;j<NODES.length;j++) {
        const a=NODES[i], b=NODES[j]
        const dx=s.pos[b.id].x-s.pos[a.id].x, dy=s.pos[b.id].y-s.pos[a.id].y
        const d=Math.sqrt(dx*dx+dy*dy)||1
        const rep=a.type==='sa'||b.type==='sa'?5500:4500
        const f=rep/(d*d)
        fx[a.id]-=f*dx/d; fy[a.id]-=f*dy/d; fx[b.id]+=f*dx/d; fy[b.id]+=f*dy/d
      }
      EDGES.forEach(([a,b]) => {
        if(!s.pos[a]||!s.pos[b]) return
        const dx=s.pos[b].x-s.pos[a].x, dy=s.pos[b].y-s.pos[a].y
        const d=Math.sqrt(dx*dx+dy*dy)||1, f=(d-90)*0.22
        fx[a]+=f*dx/d; fy[a]+=f*dy/d; fx[b]-=f*dx/d; fy[b]-=f*dy/d
      })
      fx['coal']=0; fy['coal']=0
      NODES.forEach(n => {
        s.vx[n.id]=(s.vx[n.id]+fx[n.id])*0.55
        s.vy[n.id]=(s.vy[n.id]+fy[n.id])*0.55
        s.pos[n.id].x+=s.vx[n.id]; s.pos[n.id].y+=s.vy[n.id]
      })
    }
    centerLayout()
    s.initialized=true
  }, [centerLayout])

  const updateInfo = useCallback((selectedId) => {
    const info = infoRef.current, fb = flowbarRef.current
    if(!info||!fb) return
    if(!selectedId) {
      info.innerHTML='<div style="color:#ccc;font-size:12px;">Knoten anklicken oder oben suchen</div>'
      fb.style.display='none'; return
    }
    const node=nodeMap[selectedId]; const {up,dn}=getConn(selectedId)
    const tl={raw:'Rohstoff',base:'Basischemikalie',deriv:'Derivat',end:'Endprodukt',sa:'Safic-Alcan Produkt'}[node.type]
    const cc={raw:'cr',base:'cb',deriv:'cd',end:'ce',sa:'cs'}[node.type]
    info.innerHTML=`<span class="chip ${cc}">${tl}</span><div><div id="iname">${node.label.replace(/\n/g,' ')}</div><div id="idesc">${node.desc}</div></div><div id="stats"><div class="stat"><div class="stat-n">${up.size}</div><div class="stat-l">Vorstufen</div></div><div class="stat"><div class="stat-n">${dn.size}</div><div class="stat-l">Folgeprodukte</div></div></div>`
    const di=adj[selectedId].in.slice(0,5), dout=adj[selectedId].out.slice(0,7)
    let html=''
    di.forEach(id => { const n=nodeMap[id]; if(n) { const fc=n.type==='sa'?'fsa':'fu'; html+=`<span class="fc ${fc}" data-goto="${id}">${n.label.replace(/\n/g,' ')}</span><span class="fa">›</span>` } })
    const selCls=node.type==='sa'?'fsa':node.type==='end'?'fd':'fs'
    html+=`<span class="fc ${selCls}">${node.label.replace(/\n/g,' ')}</span>`
    dout.forEach(id => { const n=nodeMap[id]; if(n) { const fc=n.type==='sa'?'fsa':'fd'; html+=`<span class="fa">›</span><span class="fc ${fc}" data-goto="${id}">${n.label.replace(/\n/g,' ')}</span>` } })
    fb.innerHTML=html; fb.style.display='flex'
  }, [getConn])

  const selectNode = useCallback((id) => {
    stateRef.current.selectedId=id
    drawAll()
    updateInfo(id)
  }, [drawAll, updateInfo])

  const hitNode = useCallback((sx, sy) => {
    const s = stateRef.current
    let best=null, bd=9999
    NODES.forEach(n => {
      if(!s.pos[n.id]) return
      const p=ws(s.pos[n.id].x,s.pos[n.id].y)
      const d=Math.hypot(sx-p.x,sy-p.y)
      if(d<n.r*s.scale+5&&d<bd) { bd=d; best=n.id }
    })
    return best
  }, [ws])

  useEffect(() => {
    const canvas = canvasRef.current
    const bgCanvas = bgRef.current
    const container = containerRef.current
    if(!canvas||!bgCanvas||!container) return
    const s = stateRef.current

    const resize = () => {
      const W=container.clientWidth, H=container.clientHeight
      canvas.width=W; canvas.height=H; bgCanvas.width=W; bgCanvas.height=H
      if(!s.initialized) { initLayout() } else { centerLayout() }
      drawAll()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // Mouse events
    const onDown = e => {
      s.dragging=true
      s.dragStart={x:e.clientX,y:e.clientY}
      s.dragOri={x:s.ox,y:s.oy}
    }
    const onMove = e => {
      const r=canvas.getBoundingClientRect()
      if(s.dragging) { s.ox=s.dragOri.x+(e.clientX-s.dragStart.x); s.oy=s.dragOri.y+(e.clientY-s.dragStart.y); drawAll(); return }
      const hit=hitNode(e.clientX-r.left,e.clientY-r.top)
      if(hit!==s.hoverId) { s.hoverId=hit; canvas.style.cursor=hit?'pointer':'default'; drawAll() }
    }
    const onUp = e => {
      const dx=Math.abs(e.clientX-s.dragStart.x), dy=Math.abs(e.clientY-s.dragStart.y)
      if(dx<4&&dy<4) {
        const r=canvas.getBoundingClientRect(), hit=hitNode(e.clientX-r.left,e.clientY-r.top)
        if(hit) selectNode(hit)
        else { s.selectedId=null; drawAll(); updateInfo(null) }
      }
      s.dragging=false
    }
    const onWheel = e => {
      e.preventDefault()
      const r=canvas.getBoundingClientRect(), sx=e.clientX-r.left, sy=e.clientY-r.top
      const f=e.deltaY<0?1.12:0.9, old=s.scale
      s.scale=Math.max(0.18,Math.min(5,s.scale*f))
      s.ox=sx-(sx-s.ox)*(s.scale/old); s.oy=sy-(sy-s.oy)*(s.scale/old)
      drawAll()
    }
    canvas.addEventListener('mousedown',onDown)
    canvas.addEventListener('mousemove',onMove)
    canvas.addEventListener('mouseup',onUp)
    canvas.addEventListener('wheel',onWheel,{passive:false})

    // Touch
    let ld=null, lt={}
    const onTouchStart = e => {
      if(e.touches.length===1) { s.dragging=true; s.dragStart={x:e.touches[0].clientX,y:e.touches[0].clientY}; s.dragOri={x:s.ox,y:s.oy}; lt={x:e.touches[0].clientX,y:e.touches[0].clientY} }
      if(e.touches.length===2) { const dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY; ld=Math.hypot(dx,dy) }
    }
    const onTouchMove = e => {
      e.preventDefault()
      if(e.touches.length===1&&s.dragging) { s.ox=s.dragOri.x+(e.touches[0].clientX-s.dragStart.x); s.oy=s.dragOri.y+(e.touches[0].clientY-s.dragStart.y); drawAll() }
      if(e.touches.length===2) { const dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY, d=Math.hypot(dx,dy); if(ld) { s.scale=Math.max(0.18,Math.min(5,s.scale*d/ld)); drawAll() } ld=d }
    }
    const onTouchEnd = e => {
      if(e.changedTouches.length===1) { const t=e.changedTouches[0]; if(Math.hypot(t.clientX-lt.x,t.clientY-lt.y)<8) { const r=canvas.getBoundingClientRect(), hit=hitNode(t.clientX-r.left,t.clientY-r.top); if(hit) selectNode(hit); else { s.selectedId=null; drawAll(); updateInfo(null) } } }
      s.dragging=false; ld=null
    }
    canvas.addEventListener('touchstart',onTouchStart,{passive:true})
    canvas.addEventListener('touchmove',onTouchMove,{passive:false})
    canvas.addEventListener('touchend',onTouchEnd)

    return () => {
      ro.disconnect()
      canvas.removeEventListener('mousedown',onDown)
      canvas.removeEventListener('mousemove',onMove)
      canvas.removeEventListener('mouseup',onUp)
      canvas.removeEventListener('wheel',onWheel)
      canvas.removeEventListener('touchstart',onTouchStart)
      canvas.removeEventListener('touchmove',onTouchMove)
      canvas.removeEventListener('touchend',onTouchEnd)
    }
  }, [initLayout, centerLayout, drawAll, hitNode, selectNode, updateInfo])

  // Flowbar click delegation
  useEffect(() => {
    const fb = flowbarRef.current; if(!fb) return
    const handler = e => {
      const btn = e.target.closest('[data-goto]')
      if(btn) { const id=btn.dataset.goto; const s=stateRef.current; selectNode(id); s.ox=canvasRef.current.width/2-s.pos[id]?.x*s.scale||0; s.oy=canvasRef.current.height/2-s.pos[id]?.y*s.scale||0; drawAll() }
    }
    fb.addEventListener('click',handler)
    return () => fb.removeEventListener('click',handler)
  }, [selectNode, drawAll])

  // Search
  const handleSearch = e => {
    const q = e.target.value.toLowerCase().trim()
    if(!q) { suggestRef.current.style.display='none'; return }
    const scores = NODES.map(n => {
      const lbl=n.label.toLowerCase()
      const score=(lbl.includes(q)?3:0)+(n.id.toLowerCase().includes(q)?2:0)+(n.desc.toLowerCase().includes(q)?1:0)+((ALIASES[n.id]||[]).some(a=>a.includes(q))?2:0)
      return {n,score}
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,9)
    if(!scores.length) { suggestRef.current.style.display='none'; return }
    const tl={raw:'Rohstoff',base:'Basis',deriv:'Derivat',end:'Endprodukt',sa:'Safic-Alcan'}
    suggestRef.current.innerHTML = scores.map(({n})=>`<div class="sugg" data-goto="${n.id}">${n.label.replace(/\n/g,' ')}<span class="sugg-t">${tl[n.type]}</span></div>`).join('')
    suggestRef.current.style.display='block'
  }

  const goTo = id => {
    suggestRef.current.style.display='none'
    if(searchRef.current) searchRef.current.value=''
    const s=stateRef.current
    selectNode(id)
    if(s.pos[id]&&canvasRef.current) { s.ox=canvasRef.current.width/2-s.pos[id].x*s.scale; s.oy=canvasRef.current.height/2-s.pos[id].y*s.scale; drawAll() }
  }

  return (
    <div className="pn">
      {/* Top bar */}
      <div className="pn-top">
        <div className="pn-title">Petrochemicals · Safic-Alcan Network</div>
        <div className="pn-search-wrap">
          <svg className="pn-si" viewBox="0 0 16 16"><circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/></svg>
          <input ref={searchRef} className="pn-search" placeholder="Suchen: GLYMO, PUD, MDI, Hydrolar..." autoComplete="off" onChange={handleSearch} />
          <div ref={suggestRef} className="pn-suggestions" style={{display:'none'}}
            onClick={e => { const d=e.target.closest('[data-goto]'); if(d) goTo(d.dataset.goto) }} />
        </div>
        <button className="pn-reset" onClick={() => { const s=stateRef.current; s.selectedId=null; s.hoverId=null; centerLayout(); drawAll(); updateInfo(null) }}>Zurücksetzen</button>
        <div className="pn-legend">
          {[['#c0392b','Rohstoff'],['#d07818','Basis'],['#a08818','Derivat'],['#2e8040','Endprodukt'],['#1d4ed8','Safic-Alcan']].map(([c,l])=>(
            <div key={l} className="pn-leg"><div className="pn-ld" style={{background:c}}/>{l}</div>
          ))}
        </div>
      </div>
      {/* Info bar */}
      <div ref={infoRef} className="pn-info"><div style={{color:'#ccc',fontSize:'12px'}}>Knoten anklicken oder oben suchen</div></div>
      <div ref={flowbarRef} className="pn-flowbar" />
      {/* Canvas */}
      <div ref={containerRef} className="pn-cw">
        <canvas ref={bgRef} style={{position:'absolute',top:0,left:0}} />
        <canvas ref={canvasRef} style={{position:'absolute',top:0,left:0}} />
        <div className="pn-hint">Scroll = Zoom · Drag = Pan</div>
        <div className="pn-credit">by Branko Premuzak · CASE·IQ</div>
        <div className="pn-zc">
          <button className="pn-zb" onClick={() => { const s=stateRef.current; s.scale=Math.min(5,s.scale*1.2); drawAll() }}>+</button>
          <button className="pn-zb" onClick={() => { const s=stateRef.current; s.scale=Math.max(0.18,s.scale*0.83); drawAll() }}>-</button>
        </div>
      </div>
    </div>
  )
}
