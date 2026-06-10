// src/components/PetroNetwork.jsx
// Petrochemikalien-Netzwerk erweitert um Silane und Safic-Alcan Portfolio
// Eingebettet als iframe mit der vollständigen HTML

import './PetroNetwork.css'

const HTML = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Petrochemicals Network</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,system-ui,'Segoe UI',sans-serif;background:#f5f4f0;display:flex;flex-direction:column;height:100vh;overflow:hidden;}
#top{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#fff;border-bottom:1px solid #e0ddd8;flex-wrap:wrap;}
#top-title{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#333;white-space:nowrap;}
#search-wrap{position:relative;flex:1;min-width:140px;max-width:280px;}
#search{width:100%;padding:6px 10px 6px 30px;font-size:12px;border:1px solid #ddd;border-radius:6px;background:#f8f7f5;color:#333;outline:none;}
#search:focus{border-color:#888;background:#fff;}
.si{position:absolute;left:8px;top:50%;transform:translateY(-50%);width:13px;height:13px;stroke:#aaa;stroke-width:1.5;fill:none;pointer-events:none;}
#suggestions{position:absolute;top:calc(100% + 3px);left:0;right:0;background:#fff;border:1px solid #ddd;border-radius:6px;z-index:200;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.1);}
.sugg{padding:6px 10px;font-size:12px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f0ede8;}
.sugg:last-child{border:none;}.sugg:hover{background:#f5f3ef;}
.sugg-t{font-size:10px;color:#aaa;font-weight:600;margin-left:6px;flex-shrink:0;}
#btn-reset{font-size:11px;padding:5px 11px;border:1px solid #ddd;border-radius:6px;background:#fff;color:#666;cursor:pointer;}
#btn-reset:hover{background:#f5f3ef;}
#legend{display:flex;gap:12px;margin-left:auto;flex-wrap:wrap;}
.leg{display:flex;align-items:center;gap:5px;font-size:10px;color:#888;font-weight:600;}
.ld{width:9px;height:9px;border-radius:50%;}
#info{display:flex;align-items:center;gap:10px;padding:8px 16px;min-height:46px;background:#fff;border-bottom:1px solid #e8e5e0;overflow:hidden;}
.chip{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:3px 8px;border-radius:4px;white-space:nowrap;flex-shrink:0;}
.cr{background:#fde8e8;color:#c0392b;}.cb{background:#fef3e2;color:#c07820;}.cd{background:#fefae8;color:#8a7010;}.ce{background:#e8f5ec;color:#1e7a38;}.cs{background:#e8eeff;color:#1d4ed8;}
#iname{font-size:14px;font-weight:600;color:#1a1a1a;}
#idesc{font-size:11px;color:#888;margin-top:1px;}
#stats{margin-left:auto;display:flex;gap:18px;flex-shrink:0;}
.stat{text-align:center;}.stat-n{font-size:18px;font-weight:700;color:#1a1a1a;line-height:1;}.stat-l{font-size:9px;color:#aaa;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-top:2px;}
#flowbar{padding:6px 16px;min-height:32px;border-bottom:1px solid #e8e5e0;display:none;align-items:center;gap:5px;flex-wrap:wrap;background:#fafaf8;}
.fc{font-size:11px;padding:3px 9px;border-radius:20px;cursor:pointer;white-space:nowrap;font-weight:500;}
.fu{background:#e8f0fd;color:#2860c8;border:1px solid #c8d8f8;}.fu:hover{background:#d4e4fc;}
.fs{background:#fff3cc;color:#8a6000;border:1px solid #e8d880;font-weight:700;}
.fd{background:#e8f5ec;color:#1a7035;border:1px solid #b8dfc4;}.fd:hover{background:#d4eddb;}
.fsa{background:#e8eeff;color:#1d4ed8;border:1px solid #bfdbfe;font-weight:700;}
.fa{color:#bbb;font-size:12px;}
#cw{flex:1;position:relative;overflow:hidden;background:#f5f4f0;}
canvas{position:absolute;top:0;left:0;}
#hint{position:absolute;bottom:10px;right:12px;font-size:10px;color:#bbb;pointer-events:none;}
#credit{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-size:10px;color:#bbb;pointer-events:none;letter-spacing:.06em;font-weight:500;white-space:nowrap;}
#zc{position:absolute;bottom:10px;left:12px;display:flex;flex-direction:column;gap:1px;}
.zb{width:26px;height:26px;background:#fff;border:1px solid #ddd;color:#666;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.zb:first-child{border-radius:5px 5px 0 0;}.zb:last-child{border-radius:0 0 5px 5px;}
.zb:hover{background:#f0ede8;color:#333;}
</style>
</head>
<body>
<div id="top">
  <div id="top-title">Petrochemicals · Safic-Alcan Network</div>
  <div id="search-wrap">
    <svg class="si" viewBox="0 0 16 16"><circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/></svg>
    <input id="search" placeholder="Suchen: GLYMO, PUD, MDI, Polyether..." autocomplete="off">
    <div id="suggestions" style="display:none"></div>
  </div>
  <button id="btn-reset">Zuruecksetzen</button>
  <div id="legend">
    <div class="leg"><div class="ld" style="background:#c0392b"></div>Rohstoff</div>
    <div class="leg"><div class="ld" style="background:#d07818"></div>Basis</div>
    <div class="leg"><div class="ld" style="background:#a08818"></div>Derivat</div>
    <div class="leg"><div class="ld" style="background:#2e8040"></div>Endprodukt</div>
    <div class="leg"><div class="ld" style="background:#1d4ed8"></div>Safic-Alcan</div>
  </div>
</div>
<div id="info"><div style="color:#ccc;font-size:12px;">Knoten anklicken oder oben suchen</div></div>
<div id="flowbar"></div>
<div id="cw">
  <canvas id="bg"></canvas>
  <canvas id="fg"></canvas>
  <div id="hint">Scroll = Zoom · Drag = Pan</div>
  <div id="credit">by Branko Premuzak · CASE-IQ</div>
  <div id="zc"><button class="zb" id="zin">+</button><button class="zb" id="zout">-</button></div>
</div>
<script>
const NODES=[
  // ── Rohstoffe ──
  {id:'coal',label:'Kohle/Oel\\nNaturgas',type:'raw',r:36,desc:'Primaerer fossiler Rohstoff - Ausgangspunkt aller Petrochemikalien'},
  {id:'silicon',label:'Silizium\\nQuarz (SiO2)',type:'raw',r:22,desc:'Si - Basis aller Silane und Silikone. Herstellung: Reduktion von Quarzsand mit Koks im Elektrolichtbogen.'},
  // ── Basischemikalien ──
  {id:'ethylene',label:'Ethylen',type:'base',r:27,desc:'C2H4 - Steam Cracking - wichtigstes petrochemisches Grundprodukt'},
  {id:'propylene',label:'Propylen',type:'base',r:25,desc:'C3H6 - FCC oder Steam Cracking - zweitwichtigstes Olefin'},
  {id:'benzene',label:'Benzol',type:'base',r:25,desc:'BTX-Aromat - Reforming/Pyrolyse - aromatischer Grundstoff'},
  {id:'toluene',label:'Toluol',type:'base',r:21,desc:'BTX-Aromat - Loesemittel - TDI-Vorstufe'},
  {id:'xylenes',label:'Xylole',type:'base',r:21,desc:'o/m/p-Xylol - BTX-Fraktion - TPA und PSA'},
  {id:'butadiene',label:'Butadien',type:'base',r:23,desc:'1,3-Butadien - C4-Schnitt Steam Cracking - Synthesekautschuk-Monomer'},
  {id:'methane',label:'Methan',type:'base',r:21,desc:'CH4 - Erdgas - Synthesegas-Vorstufe'},
  {id:'butane',label:'Butan',type:'base',r:18,desc:'C4-Alkan - Erdgas/Raffinerie - Dehydrierung zu Butylen'},
  {id:'butylenes',label:'Butylen',type:'base',r:18,desc:'C4-Olefine - Isobutylen + n-Butylen - C4-Schnitt'},
  {id:'chlorosilane',label:'Chlor-\\nsilane',type:'base',r:20,desc:'SiHCl3, SiCl4 - Reaktion Si + HCl/Cl2 (Muellerochow-Prozess) - Vorstufe aller Organosilane und Silicone'},
  // ── Derivate ──
  {id:'syngas',label:'Synthese-\\ngas',type:'deriv',r:17,desc:'CO + H2 - Methan-Dampfreformierung (SMR) - Methanol, Fischer-Tropsch'},
  {id:'ammonia',label:'Ammoniak',type:'deriv',r:15,desc:'NH3 - Haber-Bosch-Verfahren - Harnstoff, Caprolactam, Acrylnitril'},
  {id:'methanol',label:'Methanol',type:'deriv',r:19,desc:'CH3OH - Synthesegas-Hydrierung - Formaldehyd, Essigsaeure, MMA, MTBE'},
  {id:'formaldehyde',label:'Formal-\\ndehyd',type:'deriv',r:17,desc:'HCHO - Methanol-Oxidation - PF-, UF-, MF-Harze; MDI-Kette'},
  {id:'urea_chem',label:'Harnstoff',type:'deriv',r:14,desc:'CO(NH2)2 - CO2 + NH3 - Harnstoffharz, Duenger, Melamin-Vorstufe'},
  {id:'melamine_chem',label:'Melamin\\n(Monomer)',type:'deriv',r:13,desc:'C3H6N6 - thermische Zersetzung Harnstoff - MF-Harz-Monomer'},
  {id:'ethyleneoxide',label:'Ethylen-\\noxid',type:'deriv',r:19,desc:'EO - Ag-katalysierte Oxidation - MEG, Ethanolamine, Polyetherpolyole'},
  {id:'ethyleneglycol',label:'Ethylen-\\nglykol',type:'deriv',r:19,desc:'MEG - EO + H2O - Frostschutz, PET-Baustein'},
  {id:'ethanolamine',label:'Ethanol-\\namin',type:'deriv',r:15,desc:'MEA/DEA/TEA - EO + NH3 - Gaswaesche, Tenside, Pharma'},
  {id:'EDC',label:'EDC',type:'deriv',r:15,desc:'Ethylendichlorid - Ethylen + Cl2 - Cracken zu VCM'},
  {id:'vinylchloride',label:'Vinyl-\\nchlorid',type:'deriv',r:19,desc:'VCM - Cracken aus EDC - Monomer fuer PVC'},
  {id:'chlorine',label:'Chlor',type:'deriv',r:14,desc:'Cl2 - Chloralkali-Elektrolyse - EDC, Phosgen, Epichlorhydrin'},
  {id:'aceticacid',label:'Essig-\\nsaeure',type:'deriv',r:17,desc:'CH3COOH - Methanol-Carbonylierung - VAM, Loesemittel'},
  {id:'vinylacetate',label:'Vinyl-\\nacetat',type:'deriv',r:16,desc:'VAM - Ethylen + Essigsaeure + O2 - PVAc, PVOH, EVA'},
  {id:'ethanol',label:'Ethanol',type:'deriv',r:16,desc:'C2H5OH - Ethylen-Hydratation - Loesemittel, Kraftstoff, Pharma'},
  {id:'MMA',label:'MMA',type:'deriv',r:16,desc:'Methylmethacrylat - Aceton-Cyanhydrin-Route - Monomer fuer PMMA'},
  {id:'acrylates',label:'Acrylate',type:'deriv',r:16,desc:'Acrylsaeure + Ester (BA/EA/MA) - Dispersionen, Superabsorber, Klebstoffe'},
  {id:'propyleneoxide',label:'Propylen-\\noxid',type:'deriv',r:18,desc:'PO - Chlorhydrin- oder HPPO-Verfahren - Polyetherpolyole, PG'},
  {id:'polyetherpolyol',label:'Polyether-\\npolyol',type:'deriv',r:20,desc:'PO/EO + Starteralkohol - Hauptrohstoff fuer PUR-Weich- und Hartschaum'},
  {id:'propyleneglycol',label:'Propylen-\\nglykol',type:'deriv',r:15,desc:'PG - 1,2-Propandiol - PO + H2O - Frostschutz, Kosmetik, Lebensmittel'},
  {id:'isopropanol',label:'IPA',type:'deriv',r:14,desc:'Isopropanol - Hydratation Propylen - Loesemittel, Desinfektionsmittel'},
  {id:'allyl_alcohol',label:'Allyl-\\nalkohol',type:'deriv',r:13,desc:'2-Propen-1-ol - PO-Isomerisierung - Glycerin/Epichlorhydrin-Vorstufe'},
  {id:'glycerine',label:'Glycerin',type:'deriv',r:14,desc:'Propantriol - Allylchlorid-Route oder Fettspaltung - Pharma, Kosmetik'},
  {id:'epichlorohydrin',label:'Epichlorh.',type:'deriv',r:14,desc:'ECH - Allylchlorid-Route oder Glycerin-Route - Epoxidharz-Vorstufe'},
  {id:'acrylonitril',label:'Acrylnitril',type:'deriv',r:19,desc:'AN - SOHIO: Propylen + NH3 + O2 - ABS, PAN-Faser, Nylon-Vorstufe'},
  {id:'ethylbenzene',label:'Ethyl-\\nbenzol',type:'deriv',r:17,desc:'Alkylierung Benzol + Ethylen - Dehydrierung zu Styrol'},
  {id:'styrene',label:'Styrol',type:'deriv',r:20,desc:'Vinyl-Monomer - PS, ABS, SBR-Kautschuk, UP-Harz'},
  {id:'cumene',label:'Cumol',type:'deriv',r:17,desc:'Isopropylbenzol - Hock-Verfahren -> Phenol + Aceton'},
  {id:'phenol',label:'Phenol',type:'deriv',r:20,desc:'Hydroxybenzol - PF-Harze, Bisphenol A, Caprolactam'},
  {id:'bisphenolA',label:'Bisphenol A',type:'deriv',r:17,desc:'BPA - Phenol + Aceton - Vorstufe PC und Epoxidharz'},
  {id:'acetone',label:'Aceton',type:'deriv',r:17,desc:'Propanon - Loesemittel - MMA-Vorstufe (Aceton-Cyanhydrin-Weg)'},
  {id:'cyclohexane',label:'Cyclo-\\nhexan',type:'deriv',r:18,desc:'Hydrierung Benzol -> Adipinsaeure und Caprolactam (Nylon-Kette)'},
  {id:'adipicacid',label:'Adipin-\\nsaeure',type:'deriv',r:17,desc:'Hexandisaeure - Oxidation Cyclohexan - Baustein Nylon 66, PU'},
  {id:'caprolactam',label:'Capro-\\nlactam',type:'deriv',r:17,desc:'epsilon-Caprolactam - Beckmann-Umlagerung aus Cyclohexanon -> Nylon 6'},
  {id:'TPA',label:'TPA',type:'deriv',r:19,desc:'Terephthalsaeure (PTA) - p-Xylol-Oxidation - PET, PBT'},
  {id:'phthalic',label:'PSA',type:'deriv',r:16,desc:'Phthalsaeureanhydrid - o-Xylol-Oxidation - Weichmacher-Vorstufe, Alkydharze'},
  {id:'TDI',label:'TDI',type:'deriv',r:16,desc:'Toluylendiisocyanat - Toluol->DNT->TDA+Phosgen - Weich-PU-Schaum'},
  {id:'aniline',label:'Anilin',type:'deriv',r:16,desc:'Aminobenzol - Hydrierung Nitrobenzol - MDI-Vorstufe, Farbstoffe'},
  {id:'MDI',label:'MDI',type:'deriv',r:16,desc:'Methylendiphenyldiisocyanat - Anilin+Formaldehyd+Phosgen - Hart-PU, Spandex'},
  {id:'phosgene',label:'Phosgen',type:'deriv',r:14,desc:'COCl2 - CO + Cl2 - Isocyanat-Synthese, Polycarbonat'},
  {id:'isobutylene',label:'Iso-\\nbutylen',type:'deriv',r:15,desc:'2-Methylpropen - C4-Schnitt - PIB, Butylkautschuk, MTBE'},
  {id:'butanol',label:'Butanol',type:'deriv',r:14,desc:'n-Butanol/iso-Butanol - Oxo-Synthese (Propylen+CO+H2) - Loesemittel, Weichmacher'},
  {id:'chloroprene',label:'Chloropren',type:'deriv',r:13,desc:'2-Chlor-1,3-Butadien - aus Butadien + HCl - Neopren-Monomer'},
  // Silizium-Zweig (NEU)
  {id:'methylchlorosilane',label:'Methyl-\\nchlorsilan',type:'deriv',r:16,desc:'(CH3)xSiCl(4-x) - Grignard-Reaktion oder direktes Verfahren - Vorstufe Silikone und Alkylsilane'},
  {id:'trichlorosilane',label:'Trichlor-\\nsilan',type:'deriv',r:15,desc:'HSiCl3 - Si + HCl - Vorstufe hochreines Si (Polysilizium) und Organosilane via Hydrosilylierung'},
  {id:'organosilane_int',label:'Organo-\\nsilane (Int.)',type:'deriv',r:17,desc:'R-Si(OR)3 - Funktionalisierung via Grignard oder Hydrosilylierung - Bifunktionelle Haftvermittler'},
  // ── Endprodukte (Chemie) ──
  {id:'polyethylene',label:'Poly-\\nethylen',type:'end',r:22,desc:'PE (HDPE/LDPE/LLDPE) - Verpackungsfolien, Rohre, Kabel, Behaelter, Spielzeug'},
  {id:'polypropylene',label:'Poly-\\npropylen',type:'end',r:21,desc:'PP - Verpackungen, Fasern, Automobilteile, Vliesstoffe, Haushaltsware'},
  {id:'PVC',label:'PVC',type:'end',r:21,desc:'Polyvinylchlorid - Rohre, Fensterprofile, Bodenbelaege, Kabelisolierung'},
  {id:'polyester',label:'PET / PBT',type:'end',r:21,desc:'Polyester - Flaschen (PET), Textilfasern, technische Kunststoffe, Folien'},
  {id:'nylon6',label:'Nylon 6',type:'end',r:18,desc:'Polyamid 6 - Teppich, Textilien, Zahnraeder, Seile, Folien'},
  {id:'polystyrene',label:'Poly-\\nstyrol',type:'end',r:19,desc:'PS / EPS - Verpackung, Waermedaemmung (Styropor), Einweggeschirr'},
  {id:'ABS',label:'ABS',type:'end',r:17,desc:'Acrylnitril-Butadien-Styrol - Gehaeuse, Spielzeug, Automotive, Elektronik'},
  {id:'polyurethane',label:'Poly-\\nurethan',type:'end',r:22,desc:'PUR - Weich-/Hartschaum, Daemmstoffe, Lacke, Elastomere, Klebstoffe, Schuhsohlen'},
  {id:'epoxyresin',label:'Epoxid-\\nharz',type:'end',r:20,desc:'EP - Klebstoffe, CFK-Matrix, Giessharze, Korrosionsschutz, Elektronikverguss'},
  {id:'PMMA',label:'PMMA',type:'end',r:17,desc:'Acrylglas / Plexiglas - Optik, Beschilderung, Linsen, Fahrzeugbau'},
  {id:'SBR',label:'SBR',type:'end',r:18,desc:'Styrol-Butadien-Kautschuk - Reifen, Dichtungen, Schuhsohlen, Foerderbaender'},
  {id:'polycarbonate',label:'Poly-\\ncarbonat',type:'end',r:18,desc:'PC - Linsen, DVDs, Automotive-Verglasung, Displays, Sicherheitsglas'},
  {id:'PVA',label:'PVAc /\\nPVOH',type:'end',r:15,desc:'Polyvinylacetat/alkohol - Klebstoffe, Weissleim, Papierveredelung, Folien'},
  {id:'phenolresin',label:'Phenolharz',type:'end',r:15,desc:'PF-Harz (Bakelit, Novolak, Resol) - Presswerkstoffe, Elektroteile, Schleifscheiben'},
  {id:'urea_resin',label:'Harnstoff-\\nharz',type:'end',r:15,desc:'UF-Harz - Spanplatten, MDF, Moebel, Papier-/Textilveredelung'},
  {id:'melamin',label:'Melamin-\\nharz',type:'end',r:14,desc:'MF-Harz - Oberflaechen, HPL-Schichtstoffplatten, Haushaltswaren, Beschichtungen'},
  {id:'alkydresin',label:'Alkyd-\\nharz',type:'end',r:14,desc:'Oelmodifiziertes Polyesterharz - Lacke, Anstrichfarben, Druckfarben'},
  {id:'unsat_polyester',label:'UP-Harz',type:'end',r:15,desc:'Ungesaettigter Polyester - MSA+Glykol+Styrol - GFK, Bootsruempfe, Sanitaerwaren'},
  {id:'silicone',label:'Silikone',type:'end',r:16,desc:'Polysiloxane (PDMS) - Dichtstoffe, Schmierstoffe, medizinische Implantate, Trennmittel'},
  // ── Safic-Alcan Portfolio (NEU - blau) ──
  {id:'sa_neboplast',label:'Neboplast\\nDispersionen',type:'sa',r:18,desc:'Safic-Alcan Eigenmarke - Waessrige Dispersionen: PVAc, Copolymer, Acrylat, PU-Dispersionen. Wasserbasierte Bindemittel fuer Coatings und Adhesives.'},
  {id:'sa_hydrolar_pu',label:'Hydrolar\\nWB-PU',type:'sa',r:20,desc:'COIM Hydrolar - 25 WB-Polyurethan-Dispersionen. Polycarbonate, Polyether, Polyester-Basis. Fuer Holz, Metall, Leder, Textil - exklusiv ueber Safic-Alcan.'},
  {id:'sa_hydrolar_pu2',label:'Hydrolar\\nPolycarbonate',type:'sa',r:16,desc:'COIM Hydrolar HC-Serie - Polycarbonate-PUD fuer Premium-Topcoats. Beste UV- und Hydrolysebestaendigkeit. HC208, HC210, HC294NF, HC295.'},
  {id:'sa_silane_amino',label:'SIL AME02\\nAAT43',type:'sa',r:17,desc:'Safic-Chem SIL Aminosilane - AMEO (AME02) und DAMO (AAT43). Haftvermittler fuer Epoxy, PU, Alkyd auf Glas und Metall. Breitestes Anwendungsspektrum.'},
  {id:'sa_silane_epoxy',label:'SIL EGM38\\nGLYMO',type:'sa',r:16,desc:'Safic-Chem SIL Epoxysilan - GLYMO (EGM38, CAS 2530-83-8). Haftvermittler und Crosslinker (post-addition) fuer PU-1K, Epoxy, Phenolic. Einziges Silan als post-addition Crosslinker.'},
  {id:'sa_silane_vinyl',label:'SIL VTM27\\nVTMO',type:'sa',r:14,desc:'Safic-Chem SIL Vinylsilan - VTMO (VTM27). Moisture Scavenger fuer MS-Polymer und RTV-Silikon. Co-Monomer in Emulsionspolymerisation.'},
  {id:'sa_silane_memo',label:'SIL MEM50\\nMEMO',type:'sa',r:14,desc:'Safic-Chem SIL Methacryloxysilane - MEMO (MEM50). Einziger radikalisch polymerisierbarer Koppler. Fuer UV-haertende Coatings und GFK-Composites.'},
  {id:'sa_silane_mercapto',label:'SIL MTM42\\nMTMO',type:'sa',r:13,desc:'Safic-Chem SIL Mercaptosilan - MTMO (MTM42). Fuer Polysulfid-Dichtstoffe und schwefelvernetzte Gummimischungen. Alternativlos in diesen Systemen.'},
  {id:'sa_silane_alkyl',label:'SIL MTM76\\nMTES',type:'sa',r:12,desc:'Safic-Chem SIL Alkylsilan - MTES (MTM76). Hydrophobierung von Mineralien, Beton und Fuellstoffen. Kein Haftvermittler sondern Oberflaechenmodifikator.'},
  {id:'sa_silane_teos',label:'SIL ATE73\\nDYNASYLAN 40',type:'sa',r:13,desc:'Safic-Chem SIL oligomeres TEOS (ATE73). Bindemittel in anorganischen Zinkstaub-Primern (Korrosionsschutz Schiffbau/Stahl). Hoechster SiO2-Gehalt.'},
  {id:'sa_epoxy',label:'Epoxid-\\nharze SA',type:'sa',r:15,desc:'Safic-Alcan Epoxidharze und OH-Acrylharze fuer 2K-PU und 2K-Epoxy-Systeme. Basis fuer Industrielacke und Korrosionsschutz.'},
  {id:'sa_alkyd',label:'Nebores\\nAlkydharz',type:'sa',r:14,desc:'Safic-Alcan Eigenmarke Nebores - Alkydharze lang-, mittel-, kurzoelig und modifiziert. Loesemittelbasierte Bindemittel kombiniert mit OElen.'},
  {id:'sa_polyol',label:'Polyole\\nPU-Systeme',type:'sa',r:14,desc:'Safic-Alcan Polyole und Polyol-Komponenten fuer PU-Systeme. Dianol, Adiansol und weitere flexible Polyolkomponenten.'},
  {id:'sa_rubber',label:'SI Group\\nGummi-Metall',type:'sa',r:15,desc:'SI Group Elaztobond / HRJ / FRJ - Weltmarktfuehrer Gummi-Metall-Haftvermittler. Fuer technische Elastomere und Automotive.'},
];

const EDGES=[
  // Bestehende Kanten
  ['coal','ethylene'],['coal','propylene'],['coal','benzene'],['coal','toluene'],
  ['coal','xylenes'],['coal','butadiene'],['coal','methane'],['coal','butane'],['coal','butylenes'],
  ['methane','syngas'],['syngas','methanol'],['syngas','ammonia'],
  ['methanol','formaldehyde'],['methanol','aceticacid'],['methanol','MMA',1],
  ['ammonia','urea_chem'],['ammonia','acrylonitril',1],['ammonia','caprolactam',1],
  ['urea_chem','urea_resin'],['urea_chem','melamine_chem'],
  ['melamine_chem','melamin'],
  ['ethylene','polyethylene'],['ethylene','ethyleneoxide'],['ethylene','EDC'],
  ['ethylene','styrene',1],['ethylene','acrylonitril',1],
  ['ethylene','ethylbenzene'],['ethylene','ethanol'],['ethylene','vinylacetate',1],
  ['ethyleneoxide','ethyleneglycol'],['ethyleneoxide','ethanolamine'],['ethyleneoxide','polyetherpolyol',1],
  ['ethyleneglycol','polyester',1],
  ['EDC','vinylchloride'],['vinylchloride','PVC'],
  ['chlorine','EDC'],['chlorine','phosgene'],['chlorine','epichlorohydrin',1],
  ['aceticacid','vinylacetate'],
  ['vinylacetate','PVA'],
  ['propylene','polypropylene'],['propylene','propyleneoxide'],['propylene','acrylonitril'],
  ['propylene','isopropanol'],['propylene','cumene'],['propylene','acrylates',1],
  ['propylene','allyl_alcohol',1],['propylene','butanol',1],
  ['propyleneoxide','polyetherpolyol'],['propyleneoxide','propyleneglycol'],
  ['polyetherpolyol','polyurethane'],
  ['allyl_alcohol','glycerine',1],['allyl_alcohol','epichlorohydrin',1],
  ['glycerine','epichlorohydrin'],
  ['epichlorohydrin','epoxyresin'],
  ['acrylonitril','ABS'],['acrylonitril','acrylates',1],
  ['acrylates','PMMA',1],['acrylates','unsat_polyester',1],
  ['benzene','ethylbenzene'],['benzene','cumene'],['benzene','cyclohexane'],
  ['benzene','TDI'],['benzene','phenol',1],['benzene','aniline'],['benzene','styrene',1],
  ['ethylbenzene','styrene'],
  ['styrene','polystyrene'],['styrene','ABS'],['styrene','SBR',1],['styrene','unsat_polyester'],
  ['cumene','phenol'],['cumene','acetone'],
  ['phenol','bisphenolA'],['phenol','epoxyresin',1],['phenol','polycarbonate',1],['phenol','phenolresin'],['phenol','caprolactam',1],
  ['bisphenolA','epoxyresin'],['bisphenolA','polycarbonate'],
  ['acetone','MMA',1],
  ['MMA','PMMA'],
  ['cyclohexane','adipicacid'],['cyclohexane','caprolactam'],
  ['adipicacid','polyurethane',1],
  ['caprolactam','nylon6'],
  ['toluene','benzene',1],['toluene','TDI'],
  ['xylenes','TPA'],['xylenes','phthalic'],
  ['TPA','polyester'],['phthalic','alkydresin'],['phthalic','unsat_polyester',1],
  ['aniline','MDI'],['formaldehyde','MDI',1],
  ['phosgene','MDI'],['phosgene','TDI',1],['phosgene','polycarbonate',1],
  ['TDI','polyurethane'],['MDI','polyurethane'],
  ['formaldehyde','phenolresin'],['formaldehyde','urea_resin'],['formaldehyde','melamin',1],
  ['butadiene','SBR'],['butadiene','ABS',1],['butadiene','chloroprene'],['chloroprene','neoprene_end'],
  ['butane','butylenes',1],['butylenes','isobutylene'],['butylenes','butanol',1],
  // Silizium-Zweig (NEU)
  ['silicon','chlorosilane'],
  ['chlorosilane','methylchlorosilane'],
  ['chlorosilane','trichlorosilane'],
  ['chlorosilane','organosilane_int'],
  ['methylchlorosilane','silicone'],
  ['trichlorosilane','organosilane_int',1],
  ['organosilane_int','sa_silane_amino'],
  ['organosilane_int','sa_silane_epoxy'],
  ['organosilane_int','sa_silane_vinyl'],
  ['organosilane_int','sa_silane_memo'],
  ['organosilane_int','sa_silane_mercapto'],
  ['organosilane_int','sa_silane_alkyl'],
  ['organosilane_int','sa_silane_teos'],
  // Safic-Alcan Portfolio Verbindungen
  ['acrylates','sa_neboplast'],
  ['vinylacetate','sa_neboplast',1],
  ['polyurethane','sa_hydrolar_pu'],
  ['MDI','sa_hydrolar_pu',1],
  ['TDI','sa_hydrolar_pu',1],
  ['polyetherpolyol','sa_hydrolar_pu',1],
  ['polycarbonate','sa_hydrolar_pu2'],
  ['sa_hydrolar_pu','sa_hydrolar_pu2',1],
  ['epoxyresin','sa_silane_epoxy',1],
  ['epoxyresin','sa_epoxy'],
  ['bisphenolA','sa_epoxy',1],
  ['alkydresin','sa_alkyd'],
  ['phthalic','sa_alkyd',1],
  ['polyetherpolyol','sa_polyol'],
  ['propyleneglycol','sa_polyol',1],
  ['sa_silane_amino','epoxyresin',1],
  ['sa_silane_amino','polyurethane',1],
  ['sa_silane_epoxy','epoxyresin',1],
  ['sa_silane_vinyl','polyurethane',1],
  ['SBR','sa_rubber'],
  ['sa_silane_mercapto','SBR',1],
];

const ALIASES={
  coal:['erdoel','erdgas','rohoel','oil','naphtha','nafta','cracking'],
  silicon:['si','quarz','sio2','kieselsaeure','silizium','silicon'],
  chlorosilane:['chlorsilan','hcl','si+hcl','muellerochow','trichlorsilane'],
  methylchlorosilane:['methylchlorsilan','dimethyldichlorsilan','trimethylchlorsilan'],
  trichlorosilane:['hsi cl3','hsicl3','tcs'],
  organosilane_int:['organosilan','r-si-or3','haftvermittler zwischenstufe'],
  silicone:['silikon','polysiloxan','pdms','rtv','lsr'],
  sa_neboplast:['neboplast','dispersion','pvac','acrylat dispersion','eigenmarke'],
  sa_hydrolar_pu:['hydrolar','wb-pu','pu dispersion','pud','coim','waterborne polyurethane','hr106','hr108','hr110','hr112','hr115','hr116','ht181','ht306','ha101'],
  sa_hydrolar_pu2:['hydrolar polycarbonate','hc208','hc210','hc295','hc294nf','hc2357','polycarbonate pud'],
  sa_silane_amino:['ame02','aat43','ameo','damo','aminosilan','3-aminopropyl','a-1100','a-1120','geniosil gf93'],
  sa_silane_epoxy:['egm38','glymo','epoxysilan','glycidoxy','a-187','geniosil gf80','2530-83-8'],
  sa_silane_vinyl:['vtm27','vtmo','vinylsilan','moisture scavenger','a-151','geniosil xl10'],
  sa_silane_memo:['mem50','memo','methacryloxysilane','uv silan','a-174','geniosil gf31'],
  sa_silane_mercapto:['mtm42','mtmo','mercaptosilan','thiol','polysulfide','a-189','geniosil gf4'],
  sa_silane_alkyl:['mtm76','mtes','alkylsilan','hydrophobierung','methyltriethoxy'],
  sa_silane_teos:['ate73','dynasylan 40','teos oligomer','zinkstaub primer','ethyl silicate'],
  sa_epoxy:['oh-acrylharz','epoxidharz safic','2k-pu','korrosionsschutz lack'],
  sa_alkyd:['nebores','alkydharz safic','lackharz eigenmarke'],
  sa_polyol:['dianol','adiansol','polyol safic','pur polyol'],
  sa_rubber:['si group','elaztobond','hrj','frj','gummi metall','haftvermittler gummi'],
  ethylene:['ethen','c2h4','dampfcracker'],
  propylene:['propen','c3h6'],
  benzene:['benzol','btx','aromatik'],
  toluene:['toluol','methylbenzol'],
  MDI:['methylendiphenyldiisocyanat','hart-pu','isocyanat'],
  TDI:['toluylendiisocyanat','weich-pu'],
  polyurethane:['pur','pu','polyurethan','isocyanat-polymer'],
  epoxyresin:['epoxid','epoxy','ep-harz'],
  acrylates:['acrylsaeure','butylacrylat','acrylic acid'],
  polyetherpolyol:['polyether','polyol','pur polyol'],
  vinylacetate:['vam','ethenylacetat'],
};

const TC={
  raw:{fill:'#c0392b',stroke:'#962d22'},
  base:{fill:'#d07818',stroke:'#a05810'},
  deriv:{fill:'#a08818',stroke:'#786010'},
  end:{fill:'#2e8040',stroke:'#1e5828'},
  sa:{fill:'#1d4ed8',stroke:'#1e3a8a'}
};

let W,H,scale=1,ox=0,oy=0,selectedId=null,hoverId=null,dragging=false,dragStart={},dragOri={};
const pos={},vx={},vy={};
const cwEl=document.getElementById('cw');
const canvas=document.getElementById('fg');
const bgCanvas=document.getElementById('bg');
const ctx=canvas.getContext('2d');
const bgCtx=bgCanvas.getContext('2d');
const nodeMap=Object.fromEntries(NODES.map(n=>[n.id,n]));
const adj={};
NODES.forEach(n=>{adj[n.id]={in:[],out:[]};});
EDGES.forEach(([a,b])=>{if(adj[a]&&adj[b]){adj[a].out.push(b);adj[b].in.push(a);}});

function initLayout(){
  const R=Math.min(W,H)*0.38;
  NODES.forEach((n,i)=>{
    const a=(i/NODES.length)*Math.PI*2;
    const r=n.type==='sa'?R*1.2:n.type==='raw'?0:n.type==='base'?R*0.28:n.type==='deriv'?R*0.65:R;
    pos[n.id]={x:Math.cos(a)*r,y:Math.sin(a)*r};
    vx[n.id]=0;vy[n.id]=0;
  });
  pos['coal']={x:0,y:0};
  pos['silicon']={x:R*0.4,y:-R*0.15};
  for(let iter=0;iter<280;iter++){
    const fx={},fy={};
    NODES.forEach(n=>{fx[n.id]=0;fy[n.id]=0;});
    for(let i=0;i<NODES.length;i++)for(let j=i+1;j<NODES.length;j++){
      const a=NODES[i],b=NODES[j],dx=pos[b.id].x-pos[a.id].x,dy=pos[b.id].y-pos[a.id].y,d=Math.sqrt(dx*dx+dy*dy)||1;
      const rep=n=>n.type==='sa'?5500:4800;
      const f=rep(a)/(d*d);
      fx[a.id]-=f*dx/d;fy[a.id]-=f*dy/d;fx[b.id]+=f*dx/d;fy[b.id]+=f*dy/d;
    }
    EDGES.forEach(([a,b])=>{if(!pos[a]||!pos[b])return;const dx=pos[b].x-pos[a].x,dy=pos[b].y-pos[a].y,d=Math.sqrt(dx*dx+dy*dy)||1,f=(d-90)*0.22;fx[a]+=f*dx/d;fy[a]+=f*dy/d;fx[b]-=f*dx/d;fy[b]-=f*dy/d;});
    fx['coal']=0;fy['coal']=0;
    NODES.forEach(n=>{vx[n.id]=(vx[n.id]+fx[n.id])*0.55;vy[n.id]=(vy[n.id]+fy[n.id])*0.55;pos[n.id].x+=vx[n.id];pos[n.id].y+=vy[n.id];});
  }
  centerLayout();
}
function centerLayout(){
  const xs=Object.values(pos).map(p=>p.x),ys=Object.values(pos).map(p=>p.y);
  const minx=Math.min(...xs),miny=Math.min(...ys),maxX=Math.max(...xs),maxY=Math.max(...ys);
  const s=Math.min((W-80)/(maxX-minx||1),(H-80)/(maxY-miny||1),1);
  scale=s;ox=(W-(maxX+minx)*s)/2;oy=(H-(maxY+miny)*s)/2;
}
function ws(x,y){return{x:x*scale+ox,y:y*scale+oy};}
function getConn(id){
  const up=new Set(),dn=new Set();
  function goUp(n){if(up.has(n))return;up.add(n);(adj[n]&&adj[n].in||[]).forEach(goUp);}
  function goDn(n){if(dn.has(n))return;dn.add(n);(adj[n]&&adj[n].out||[]).forEach(goDn);}
  goUp(id);goDn(id);up.delete(id);dn.delete(id);return{up,dn};
}
function drawEdge(c,a,b,dashed,alpha,color,width){
  if(!pos[a]||!pos[b])return;
  const p1=ws(pos[a].x,pos[a].y),p2=ws(pos[b].x,pos[b].y),na=nodeMap[a],nb=nodeMap[b];if(!na||!nb)return;
  const ra=na.r*scale,rb=nb.r*scale,dx=p2.x-p1.x,dy=p2.y-p1.y,d=Math.sqrt(dx*dx+dy*dy)||1;
  const x1=p1.x+dx/d*ra,y1=p1.y+dy/d*ra,x2=p2.x-dx/d*(rb+3),y2=p2.y-dy/d*(rb+3);
  c.save();c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=width||1;
  if(dashed)c.setLineDash([3,4]);else c.setLineDash([]);
  c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();
  if(!dashed&&alpha>0.3){c.setLineDash([]);const ang=Math.atan2(y2-y1,x2-x1),al=5.5*Math.max(scale,0.5),aw=0.44;c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-al*Math.cos(ang-aw),y2-al*Math.sin(ang-aw));c.lineTo(x2-al*Math.cos(ang+aw),y2-al*Math.sin(ang+aw));c.closePath();c.fillStyle=color;c.fill();}
  c.restore();
}
function drawNode(c,node,sel,hov,dimmed){
  if(!pos[node.id])return;
  const p=ws(pos[node.id].x,pos[node.id].y),r=node.r*scale,tc=TC[node.type];
  c.save();c.globalAlpha=dimmed?0.12:1;
  if(!dimmed){c.shadowColor='rgba(0,0,0,0.18)';c.shadowBlur=sel?14:4;c.shadowOffsetY=2;}
  c.beginPath();c.arc(p.x,p.y,r,0,Math.PI*2);c.fillStyle=tc.fill;c.fill();
  c.shadowBlur=0;c.shadowOffsetY=0;
  if(node.type==='sa'){c.strokeStyle=sel?'#fbbf24':hov?'#fff':tc.stroke;c.lineWidth=sel?3:hov?2.5:2;c.stroke();
  }else{c.strokeStyle=sel?'#f0c020':hov?'rgba(255,255,255,0.9)':tc.stroke;c.lineWidth=sel?2.5:hov?2:1;c.stroke();}
  if(sel){c.beginPath();c.arc(p.x,p.y,r+4,0,Math.PI*2);c.strokeStyle=node.type==='sa'?'rgba(251,191,36,0.5)':'rgba(240,192,32,0.4)';c.lineWidth=1.5;c.stroke();}
  const fs=Math.max(7.5,Math.min(11,r*0.38));
  c.font='600 '+fs+'px -apple-system,system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle='rgba(255,255,255,0.97)';c.shadowBlur=0;
  const lines=node.label.split('\\n'),lh=fs*1.3;
  lines.forEach((ln,i)=>c.fillText(ln,p.x,p.y+(i-(lines.length-1)/2)*lh));
  c.restore();
}
function drawAll(){
  ctx.clearRect(0,0,W,H);bgCtx.clearRect(0,0,W,H);
  bgCtx.save();bgCtx.fillStyle='rgba(0,0,0,0.05)';
  const step=32*scale,sx=((ox%step)+step)%step,sy=((oy%step)+step)%step;
  for(let x=sx;x<W;x+=step)for(let y=sy;y<H;y+=step){bgCtx.beginPath();bgCtx.arc(x,y,0.85,0,Math.PI*2);bgCtx.fill();}
  bgCtx.restore();
  let up=new Set(),dn=new Set();
  if(selectedId){const c=getConn(selectedId);up=c.up;dn=c.dn;}
  EDGES.forEach(([a,b,dash])=>{
    if(!pos[a]||!pos[b])return;
    if(selectedId){
      if((up.has(a)&&(up.has(b)||b===selectedId))||(a===selectedId&&up.has(b)))drawEdge(ctx,a,b,dash,0.9,'#2860c8',1.6);
      else if((a===selectedId&&dn.has(b))||(dn.has(a)&&dn.has(b)))drawEdge(ctx,a,b,dash,0.9,'#1e8040',1.6);
      else drawEdge(ctx,a,b,dash,1,'rgba(0,0,0,0.04)',0.5);
    }else drawEdge(ctx,a,b,dash,1,'rgba(0,0,0,0.08)',0.8);
  });
  NODES.forEach(node=>{const sel=node.id===selectedId,hov=node.id===hoverId&&!sel,rel=!selectedId||sel||up.has(node.id)||dn.has(node.id);drawNode(ctx,node,sel,hov,!rel);});
}
function hitNode(sx,sy){let best=null,bd=9999;NODES.forEach(n=>{if(!pos[n.id])return;const p=ws(pos[n.id].x,pos[n.id].y),d=Math.hypot(sx-p.x,sy-p.y);if(d<n.r*scale+5&&d<bd){bd=d;best=n.id;}});return best;}
function selectNode(id){selectedId=id;drawAll();updateInfo();}
function updateInfo(){
  const bar=document.getElementById('info'),fb=document.getElementById('flowbar');
  if(!selectedId){bar.innerHTML='<div style="color:#ccc;font-size:12px;">Knoten anklicken oder oben suchen</div>';fb.style.display='none';return;}
  const node=nodeMap[selectedId];const{up,dn}=getConn(selectedId);
  const tl={raw:'Rohstoff',base:'Basischemikalie',deriv:'Derivat',end:'Endprodukt',sa:'Safic-Alcan Produkt'}[node.type];
  const cc={raw:'cr',base:'cb',deriv:'cd',end:'ce',sa:'cs'}[node.type];
  bar.innerHTML='<span class="chip '+cc+'">'+tl+'</span><div><div id="iname">'+node.label.replace(/\\n/g,' ')+'</div><div id="idesc">'+node.desc+'</div></div><div id="stats"><div class="stat"><div class="stat-n">'+up.size+'</div><div class="stat-l">Vorstufen</div></div><div class="stat"><div class="stat-n">'+dn.size+'</div><div class="stat-l">Folgeprodukte</div></div></div>';
  const di=adj[selectedId].in.slice(0,5),dout=adj[selectedId].out.slice(0,7);
  let html='';
  di.forEach(id=>{const n=nodeMap[id];if(n){const fc=n.type==='sa'?'fsa':'fu';html+='<span class="fc '+fc+'" onclick="selectNode(\''+id+'\')">'+n.label.replace(/\\n/g,' ')+'</span><span class="fa">&#8250;</span>';}});
  const selCls=node.type==='sa'?'fsa':node.type==='end'?'fd':'fs';
  html+='<span class="fc '+selCls+'">'+node.label.replace(/\\n/g,' ')+'</span>';
  dout.forEach(id=>{const n=nodeMap[id];if(n){const fc=n.type==='sa'?'fsa':'fd';html+='<span class="fa">&#8250;</span><span class="fc '+fc+'" onclick="selectNode(\''+id+'\')">'+n.label.replace(/\\n/g,' ')+'</span>';}});
  fb.innerHTML=html;fb.style.display='flex';
}
canvas.addEventListener('mousedown',e=>{dragging=true;dragStart={x:e.clientX,y:e.clientY};dragOri={x:ox,y:oy};});
canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();if(dragging){ox=dragOri.x+(e.clientX-dragStart.x);oy=dragOri.y+(e.clientY-dragStart.y);drawAll();return;}const hit=hitNode(e.clientX-r.left,e.clientY-r.top);if(hit!==hoverId){hoverId=hit;canvas.style.cursor=hit?'pointer':'default';drawAll();}});
canvas.addEventListener('mouseup',e=>{const dx=Math.abs(e.clientX-dragStart.x),dy=Math.abs(e.clientY-dragStart.y);if(dx<4&&dy<4){const r=canvas.getBoundingClientRect(),hit=hitNode(e.clientX-r.left,e.clientY-r.top);if(hit)selectNode(hit);else{selectedId=null;drawAll();updateInfo();}}dragging=false;});
canvas.addEventListener('wheel',e=>{e.preventDefault();const r=canvas.getBoundingClientRect(),sx=e.clientX-r.left,sy=e.clientY-r.top,f=e.deltaY<0?1.12:0.9,old=scale;scale=Math.max(0.18,Math.min(5,scale*f));ox=sx-(sx-ox)*(scale/old);oy=sy-(sy-oy)*(scale/old);drawAll();},{passive:false});
let ld=null,lt={};
canvas.addEventListener('touchstart',e=>{if(e.touches.length===1){dragging=true;dragStart={x:e.touches[0].clientX,y:e.touches[0].clientY};dragOri={x:ox,y:oy};lt={x:e.touches[0].clientX,y:e.touches[0].clientY};}if(e.touches.length===2){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;ld=Math.hypot(dx,dy);}});
canvas.addEventListener('touchmove',e=>{e.preventDefault();if(e.touches.length===1&&dragging){ox=dragOri.x+(e.touches[0].clientX-dragStart.x);oy=dragOri.y+(e.touches[0].clientY-dragStart.y);drawAll();}if(e.touches.length===2){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY,d=Math.hypot(dx,dy);if(ld){scale=Math.max(0.18,Math.min(5,scale*d/ld));drawAll();}ld=d;}},{passive:false});
canvas.addEventListener('touchend',e=>{if(e.changedTouches.length===1){const t=e.changedTouches[0];if(Math.hypot(t.clientX-lt.x,t.clientY-lt.y)<8){const r=canvas.getBoundingClientRect(),hit=hitNode(t.clientX-r.left,t.clientY-r.top);if(hit)selectNode(hit);else{selectedId=null;drawAll();updateInfo();}}}dragging=false;ld=null;});
const se=document.getElementById('search'),sg=document.getElementById('suggestions');
se.addEventListener('input',()=>{
  const q=se.value.toLowerCase().trim();if(!q){sg.style.display='none';return;}
  const scores=NODES.map(n=>{const lbl=n.label.toLowerCase(),labelMatch=lbl.includes(q)?3:0,idMatch=n.id.toLowerCase().includes(q)?2:0,descMatch=n.desc.toLowerCase().includes(q)?1:0,aliasMatch=(ALIASES[n.id]||[]).some(a=>a.includes(q))?2:0;return{n,score:labelMatch+idMatch+descMatch+aliasMatch};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,9);
  if(!scores.length){sg.style.display='none';return;}
  const tl={raw:'Rohstoff',base:'Basis',deriv:'Derivat',end:'Endprodukt',sa:'Safic-Alcan'};
  sg.innerHTML=scores.map(({n})=>'<div class="sugg" onclick="goTo(\''+n.id+'\')">'+n.label.replace(/\\n/g,' ')+'<span class="sugg-t">'+tl[n.type]+'</span></div>').join('');
  sg.style.display='block';
});
document.addEventListener('click',e=>{if(!e.target.closest('#search-wrap'))sg.style.display='none';});
function goTo(id){sg.style.display='none';se.value='';selectNode(id);const p=pos[id];if(p){ox=W/2-p.x*scale;oy=H/2-p.y*scale;drawAll();}}
document.getElementById('btn-reset').addEventListener('click',()=>{selectedId=null;hoverId=null;centerLayout();drawAll();updateInfo();});
document.getElementById('zin').addEventListener('click',()=>{scale=Math.min(5,scale*1.2);drawAll();});
document.getElementById('zout').addEventListener('click',()=>{scale=Math.max(0.18,scale*0.83);drawAll();});
function resize(){
  W=cwEl.clientWidth;H=cwEl.clientHeight;
  [canvas,bgCanvas].forEach(c=>{c.width=W;c.height=H;});
}
function start(){
  resize();
  if(W>0&&H>0){initLayout();drawAll();}
}
// Try immediately, then again after short delays to handle iframe timing
start();
setTimeout(start,100);
setTimeout(start,400);
const ro=new ResizeObserver(()=>{const first=Object.keys(pos).length===0;resize();if(first)initLayout();else centerLayout();drawAll();});
ro.observe(cwEl);
</script>
</body>
</html>`

export default function PetroNetwork() {
  return (
    <div className="pn-wrap">
      <iframe
        srcDoc={HTML}
        className="pn-frame"
        title="Petrochemicals Network"
        sandbox="allow-scripts"
      />
    </div>
  )
}
