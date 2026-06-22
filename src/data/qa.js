export const QA_TREE = {

  // ═══════════════════════════════════════════
  // EBENE 1 – GESCHÄFTSVERSTÄNDNIS
  // ═══════════════════════════════════════════
  start: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Was stellt der Kunde hauptsächlich her?',
    h: 'Einstiegsfrage – bestimmt den gesamten weiteren Gesprächsverlauf',
    os: [
      { l: 'Lacke & Beschichtungen', nx: 'e1_coatings' },
      { l: 'Klebstoffe', nx: 'e1_adhesives' },
      { l: 'Dichtmassen / Elastomere', nx: 'e1_sealants' },
      { l: 'Gummi / Technische Elastomere', nx: 'e1_rubber' },
      { l: 'Kunststoffe / Composites', nx: 'e1_plastics' },
      { l: 'Bauchemie', nx: 'e1_construction' },
      { l: 'Drucktinten', nx: 'e1_printing' },
      { l: 'Textil & Leder', nx: 'e1_textile' },
    ]
  },

  // ─── Coatings Ebene 1 ───
  e1_coatings: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Welche Märkte bedient der Kunde mit seinen Lacken?',
    h: 'Mehrere möglich – wichtig für spätere Normen und Zertifizierungsanforderungen',
    os: [
      { l: 'Dekor / DIY / Bautenfarben', nx: 'e1c_volumen' },
      { l: 'Holz & Möbel (Industrie)', nx: 'e1c_holz' },
      { l: 'Metall / Korrosionsschutz', nx: 'e1c_metall' },
      { l: 'Automotive (OEM oder Refinish)', nx: 'e1c_auto' },
      { l: 'Coil Coating / Bandlackierung', nx: 'e1c_coil' },
      { l: 'Papier / Verpackung / Druck', nx: 'e1c_print' },
      { l: 'Leder / Textil / Kunstleder', nx: 'e1c_leder' },
      { l: 'Industrie allgemein', nx: 'e1c_industrie' },
    ]
  },

  // ─── Adhesives Ebene 1 ───
  e1_adhesives: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'In welchem Bereich setzt der Kunde Klebstoffe ein?',
    h: '',
    os: [
      { l: 'Verpackung / Papier / Etiketten', nx: 'e1a_verpackung' },
      { l: 'Holz / Möbel / Fenster', nx: 'e1a_holz' },
      { l: 'Automotive / Transport', nx: 'e1a_auto' },
      { l: 'Schuhe / Leder / Textil', nx: 'e1a_textil' },
      { l: 'Bauanwendungen', nx: 'e1a_bau' },
      { l: 'Industrie allgemein', nx: 'e1a_industrie' },
    ]
  },

  // ─── Sealants ───
  e1_sealants: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Welche Dichtmassen / Elastomere produziert der Kunde?',
    h: '',
    os: [
      { l: 'Bau-Dichtstoffe (Fuge, Fassade)', nx: 'e2_sealants_system' },
      { l: 'Automotive Dichtmassen', nx: 'e2_sealants_auto' },
      { l: 'Industrielle Dichtmassen', nx: 'e2_sealants_industrie' },
      { l: 'Technische Elastomerteile', nx: 'e1_rubber' },
    ]
  },

  // ─── Rubber ───
  e1_rubber: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Welche Gummi-/Elastomerprodukte stellt der Kunde her?',
    h: '',
    os: [
      { l: 'Technische Formteile (Dichtungen, Lager)', nx: 'e2_rubber_tech' },
      { l: 'Reifen / Reifenkomponenten', nx: 'e2_rubber_reifen' },
      { l: 'Schäume / Weichschäume', nx: 'e2_rubber_schaum' },
      { l: 'Profile / Extrusionsprodukte', nx: 'e2_rubber_extrusion' },
    ]
  },

  // ─── Plastics ───
  e1_plastics: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Welche Kunststoffanwendung?',
    h: '',
    os: [
      { l: 'Thermoplastische Compounds (PP/PE/PA)', nx: 'e2_plastics_thermo' },
      { l: 'Faserverbund / GFK / CFK', nx: 'e2_plastics_composite' },
      { l: 'Kabelisolierung / Kabelmantel', nx: 'e2_plastics_kabel' },
      { l: 'Technische Kunststoffteile', nx: 'e2_plastics_tech' },
    ]
  },

  // ─── Construction ───
  e1_construction: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Welches Bauchemie-Segment?',
    h: '',
    os: [
      { l: 'Betonzusatzmittel / Fertigbeton', nx: 'e2_construction_beton' },
      { l: 'Fassadenbeschichtungen / Putze', nx: 'e2_construction_fassade' },
      { l: 'Bitumen / Asphalt', nx: 'e2_construction_bitumen' },
      { l: 'Bodenbeschichtungen / Estrich', nx: 'e2_construction_boden' },
    ]
  },

  // ─── Printing ───
  e1_printing: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Welches Druckverfahren?',
    h: '',
    os: [
      { l: 'Flexodruck (lösemittelbasiert)', nx: 'e2_print_flexo_sb' },
      { l: 'Tiefdruck (lösemittelbasiert)', nx: 'e2_print_tief_sb' },
      { l: 'Siebdruck', nx: 'e2_print_sieb' },
      { l: 'Wasserbasierte Drucktinten', nx: 'e2_print_wb' },
    ]
  },

  // ─── Textile ───
  e1_textile: {
    ebene: 1,
    label: 'Geschäftsverständnis',
    q: 'Textil oder Leder?',
    h: '',
    os: [
      { l: 'Textilbeschichtung / Textilfinish', nx: 'e2_textile_finish' },
      { l: 'Leder / Kunstleder Beschichtung', nx: 'e2_textile_leder' },
      { l: 'Faserverarbeitung / Spinning', nx: 'e2_textile_fiber' },
    ]
  },

  // ═══════════════════════════════════════════
  // EBENE 2 – TECHNISCHE SITUATION (Coatings)
  // ═══════════════════════════════════════════

  e1c_volumen: {
    ebene: 2,
    label: 'Technische Situation',
    q: 'Welches Bindemittelsystem wird aktuell hauptsächlich eingesetzt?',
    h: 'Dekor / DIY / Bautenfarben',
    os: [
      { l: 'Styrolacrylat-Dispersion (wasserbasiert)', nx: 'e2c_wb_styrolacryl' },
      { l: 'Reinacrylat-Dispersion (wasserbasiert)', nx: 'e2c_wb_reinacryl' },
      { l: 'Alkydlack (lösemittelbasiert)', nx: 'e2c_sb_alkyd' },
      { l: 'Silikat / Silikonharz-Systeme', nx: 'e2c_wb_silikat' },
      { l: 'Weiß ich nicht / unklar', nx: 'e2c_unbekannt' },
    ]
  },

  e1c_holz: {
    ebene: 2,
    label: 'Technische Situation',
    q: 'Welches System für Holz/Möbel?',
    h: 'Holz & Möbelindustrie',
    os: [
      { l: 'Wasserbasierter PU-Lack (1K oder 2K)', nx: 'e2c_wb_pu' },
      { l: 'UV-härtender Lack', nx: 'e2c_uv' },
      { l: 'Lösemittelbasierter 2K-PU', nx: 'e2c_sb_2kpu' },
      { l: 'NC-Lack (Nitrocellulose)', nx: 'e2c_sb_nc' },
      { l: 'Alkydlack (Öllack)', nx: 'e2c_sb_alkyd' },
    ]
  },

  e1c_metall: {
    ebene: 2,
    label: 'Technische Situation',
    q: 'System für Metall / Korrosionsschutz?',
    h: '',
    os: [
      { l: 'Lösemittelbasierter 2K-PU', nx: 'e2c_sb_2kpu' },
      { l: 'Lösemittelbasierter Alkyd', nx: 'e2c_sb_alkyd' },
      { l: 'Wasserbasierter Industrielack', nx: 'e2c_wb_industrie' },
      { l: 'Epoxy-System (1K oder 2K)', nx: 'e2c_epoxy' },
      { l: 'Powder Coating', nx: 'e2c_powder' },
    ]
  },

  e1c_auto: {
    ebene: 2,
    label: 'Technische Situation',
    q: 'OEM-Lackierung oder Refinish?',
    h: 'Automotive',
    os: [
      { l: 'OEM (Erstlackierung, Serienproduktion)', nx: 'e2c_auto_oem' },
      { l: 'Refinish (Karosserie-Reparaturlack)', nx: 'e2c_auto_refinish' },
      { l: 'Automotive Kunststoffteile (Interieur/Exterieur)', nx: 'e2c_auto_kunststoff' },
    ]
  },

  e1c_coil: {
    ebene: 2,
    label: 'Technische Situation',
    q: 'Welches System für Coil Coating?',
    h: '',
    os: [
      { l: 'Polyester-basiert (Standard)', nx: 'e2c_coil_pe' },
      { l: 'PVdF / Fluorpolymer (Premium)', nx: 'e2c_coil_pvdf' },
      { l: 'Epoxy-Primer', nx: 'e2c_coil_epoxy' },
    ]
  },

  e1c_print: { ebene: 2, label: 'Technische Situation', q: 'System für Papier/Druck/Verpackung?', h: '', os: [
    { l: 'Wasserbasierte Flexo/Tiefdruck-Tinte', nx: 'e2_print_wb' },
    { l: 'Lösemittelbasierte Tinte', nx: 'e2_print_flexo_sb' },
    { l: 'UV-Tinte / Overprint Varnish', nx: 'e2c_uv' },
  ]},

  e1c_leder: { ebene: 2, label: 'Technische Situation', q: 'Leder oder Kunstleder?', h: '', os: [
    { l: 'Echtleder-Finish', nx: 'e2_textile_leder' },
    { l: 'Kunstleder / Synthetikleder', nx: 'e2_textile_leder' },
    { l: 'Textilbeschichtung', nx: 'e2_textile_finish' },
  ]},

  e1c_industrie: { ebene: 2, label: 'Technische Situation', q: 'Welches System in der Industrie?', h: '', os: [
    { l: 'Lösemittelbasierter 2K-PU', nx: 'e2c_sb_2kpu' },
    { l: 'Wasserbasierter Industrielack', nx: 'e2c_wb_industrie' },
    { l: 'Epoxy-System', nx: 'e2c_epoxy' },
    { l: 'Alkydlack', nx: 'e2c_sb_alkyd' },
  ]},

  // ═══════════════════════════════════════════
  // EBENE 3 – PAIN POINTS (Coatings)
  // ═══════════════════════════════════════════

  e2c_wb_styrolacryl: { ebene: 3, label: 'Pain Points', q: 'Wo liegt aktuell das größte Problem oder Optimierungspotenzial?', h: 'Wasserbasiert – Styrolacrylat', os: [
    { l: 'Verlauf / Krater / Stippen', nx: 'e3_verlauf_wb' },
    { l: 'Schaumbildung bei Produktion oder Applikation', nx: 'e3_schaum_wb' },
    { l: 'Viskosität / Rheologie (zu dünn, läuft, setzt ab)', nx: 'e3_rheologie_wb' },
    { l: 'Abrieb / Kratzfestigkeit zu niedrig', nx: 'e3_kratz' },
    { l: 'VOC-Reduzierung / Ecolabel-Anforderung', nx: 'e3_voc' },
    { l: 'Filmbildung bei tiefen Temperaturen (MFT)', nx: 'e3_mft' },
    { l: 'UV-Stabilität / Vergilbung', nx: 'e3_uv' },
    { l: 'Kein konkretes Problem – Optimierung / Kosten', nx: 'e3_kosten' },
  ]},

  e2c_wb_reinacryl: { ebene: 3, label: 'Pain Points', q: 'Wo liegt aktuell das größte Problem?', h: 'Wasserbasiert – Reinacrylat', os: [
    { l: 'Verlauf / Krater / Stippen', nx: 'e3_verlauf_wb' },
    { l: 'Schaumbildung', nx: 'e3_schaum_wb' },
    { l: 'Viskosität / Rheologie', nx: 'e3_rheologie_wb' },
    { l: 'Filmbildung / MFT-Problem', nx: 'e3_mft' },
    { l: 'VOC-Reduzierung / Ecolabel', nx: 'e3_voc' },
    { l: 'UV-Stabilität / Witterungsbeständigkeit', nx: 'e3_uv' },
    { l: 'Selbstreinigung / Schmutzabweisung', nx: 'e3_selbstreinigung' },
    { l: 'Kein Problem – Kosten optimieren', nx: 'e3_kosten' },
  ]},

  e2c_sb_alkyd: { ebene: 3, label: 'Pain Points', q: 'Wo liegt das größte Problem bei Alkyd?', h: 'Lösemittelbasiert – Alkyd', os: [
    { l: 'Trocknungszeit zu lang', nx: 'e3_trocknung' },
    { l: 'Kobalt-Ausstieg (REACH / CMR)', nx: 'e3_kobalt' },
    { l: 'Vergilbung im Innenbereiche', nx: 'e3_uv' },
    { l: 'VOC-Reduzierung gefordert', nx: 'e3_voc' },
    { l: 'Anti-Settling / Pigmentabsatz', nx: 'e3_rheologie_sb' },
    { l: 'Lagerstabilität / vorzeitige Gelierung (Harzherstellung)', nx: 'e3_lagerstabilitaet' },
    { l: 'Kein Problem – Kosten optimieren', nx: 'e3_kosten' },
  ]},

  e2c_sb_2kpu: { ebene: 3, label: 'Pain Points', q: 'Wo liegt das Problem bei 2K-PU?', h: 'Lösemittelbasiert – 2K-PU', os: [
    { l: 'Verlauf / Krater', nx: 'e3_verlauf_sb' },
    { l: 'Vernetzungszeit / Ofenzeit zu lang', nx: 'e3_vernetzung' },
    { l: 'Haftung auf schwierigen Substraten', nx: 'e3_haftung' },
    { l: 'VOC-Reduzierung', nx: 'e3_voc' },
    { l: 'UV-Stabilität / Außeneinsatz', nx: 'e3_uv' },
    { l: 'Kratzfestigkeit', nx: 'e3_kratz' },
    { l: 'Kein Problem – Kosten optimieren', nx: 'e3_kosten' },
  ]},

  e2c_wb_pu: { ebene: 3, label: 'Pain Points', q: 'Wo liegt das Problem bei WB-PU?', h: 'Wasserbasiert – PU', os: [
    { l: 'Kratzfestigkeit / Abrieb', nx: 'e3_kratz' },
    { l: 'Chemikalienbeständigkeit', nx: 'e3_chembestaendigkeit' },
    { l: 'Verlauf / Krater', nx: 'e3_verlauf_wb' },
    { l: 'Schaumbildung', nx: 'e3_schaum_wb' },
    { l: 'Viskosität / Rheologie', nx: 'e3_rheologie_wb' },
    { l: 'Haftung auf Substrat', nx: 'e3_haftung' },
    { l: 'Kein Problem – Kosten / Lieferant wechseln', nx: 'e3_kosten' },
  ]},

  e2c_wb_industrie: { ebene: 3, label: 'Pain Points', q: 'Größtes Problem WB-Industrielack?', h: '', os: [
    { l: 'Korrosionsschutz nicht ausreichend', nx: 'e3_korrosion' },
    { l: 'Haftung auf Metall', nx: 'e3_haftung' },
    { l: 'Verlauf / Krater', nx: 'e3_verlauf_wb' },
    { l: 'Schaumbildung', nx: 'e3_schaum_wb' },
    { l: 'Trocknungszeit', nx: 'e3_trocknung' },
    { l: 'VOC-Reduzierung', nx: 'e3_voc' },
    { l: 'Lagerstabilität Rohstoff / Monomer (Harzherstellung)', nx: 'e3_lagerstabilitaet' },
  ]},

  e2c_epoxy: { ebene: 3, label: 'Pain Points', q: 'Problem bei Epoxy-System?', h: '', os: [
    { l: 'Haftung auf Beton / Metall', nx: 'e3_haftung' },
    { l: 'Vergilbung / UV-Beständigkeit', nx: 'e3_uv' },
    { l: 'Flexibilität / Schlagzähigkeit', nx: 'e3_flexibilitaet' },
    { l: 'Verlauf / Entlüftung', nx: 'e3_verlauf_sb' },
    { l: 'Aushärtungszeit', nx: 'e3_vernetzung' },
  ]},

  e2c_uv: { ebene: 3, label: 'Pain Points', q: 'Problem bei UV-System?', h: '', os: [
    { l: 'Haftung auf Folgebeschichtung (Intercoat)', nx: 'e3_intercoat' },
    { l: 'Kratzfestigkeit / Gleitverhalten', nx: 'e3_kratz' },
    { l: 'Verlauf / Benetzung', nx: 'e3_verlauf_sb' },
    { l: 'Rheologie / Viskosität', nx: 'e3_rheologie_sb' },
  ]},

  e2c_sb_nc: { ebene: 3, label: 'Pain Points', q: 'Problem bei NC-Lack?', h: '', os: [
    { l: 'Verlauf / Krater', nx: 'e3_verlauf_sb' },
    { l: 'Trocknungszeit', nx: 'e3_trocknung' },
    { l: 'Kratzfestigkeit', nx: 'e3_kratz' },
    { l: 'VOC-Reduzierung', nx: 'e3_voc' },
  ]},

  e2c_auto_oem: { ebene: 3, label: 'Pain Points', q: 'Problem bei Automotive OEM?', h: '', os: [
    { l: 'Verlauf / Krater (silikonfrei gefordert)', nx: 'e3_intercoat' },
    { l: 'UV-Stabilität Clearcoat', nx: 'e3_uv' },
    { l: 'Kratzfestigkeit', nx: 'e3_kratz' },
    { l: 'Haftung auf Kunststoffsubstrat', nx: 'e3_haftung' },
    { l: 'VOC-Reduzierung', nx: 'e3_voc' },
  ]},

  e2c_auto_refinish: { ebene: 3, label: 'Pain Points', q: 'Problem bei Refinish?', h: '', os: [
    { l: 'Trocknungszeit / Ofenzeit', nx: 'e3_vernetzung' },
    { l: 'Verlauf / Krater', nx: 'e3_verlauf_sb' },
    { l: 'UV-Stabilität', nx: 'e3_uv' },
    { l: 'Haftung auf Untergrund', nx: 'e3_haftung' },
  ]},

  e2c_auto_kunststoff: { ebene: 3, label: 'Pain Points', q: 'Problem bei Kunststofflack Automotive?', h: '', os: [
    { l: 'Haftung auf Kunststoff (PP, ABS, PA)', nx: 'e3_haftung' },
    { l: 'Kratzfestigkeit', nx: 'e3_kratz' },
    { l: 'Flexibilität / Schlagzähigkeit', nx: 'e3_flexibilitaet' },
    { l: 'Verlauf silikonfrei', nx: 'e3_intercoat' },
  ]},

  e2c_coil_pe: { ebene: 3, label: 'Pain Points', q: 'Problem bei Coil Coating Polyester?', h: '', os: [
    { l: 'UV-Stabilität / Farbhaltung', nx: 'e3_uv' },
    { l: 'Verlauf bei hoher Einbrenntemperatur', nx: 'e3_verlauf_sb' },
    { l: 'Kratzfestigkeit / Umformbarkeit', nx: 'e3_kratz' },
    { l: 'Haftung auf Metall', nx: 'e3_haftung' },
  ]},

  e2c_coil_pvdf: { ebene: 3, label: 'Pain Points', q: 'Problem bei PVDF Coil?', h: '', os: [
    { l: 'Verlauf / Homogenität', nx: 'e3_verlauf_sb' },
    { l: 'UV-Stabilität', nx: 'e3_uv' },
    { l: 'Haftung Primer', nx: 'e3_haftung' },
  ]},

  e2c_coil_epoxy: { ebene: 3, label: 'Pain Points', q: 'Problem bei Epoxy Coil Primer?', h: '', os: [
    { l: 'Haftung auf Metall', nx: 'e3_haftung' },
    { l: 'Korrosionsschutz', nx: 'e3_korrosion' },
    { l: 'Flexibilität bei Umformung', nx: 'e3_flexibilitaet' },
  ]},

  e2c_powder: { ebene: 3, label: 'Pain Points', q: 'Problem bei Powder Coating?', h: '', os: [
    { l: 'UV-Stabilität / Außeneinsatz', nx: 'e3_uv' },
    { l: 'Verlauf / Orangenhaut', nx: 'e3_verlauf_sb' },
    { l: 'Kratzfestigkeit', nx: 'e3_kratz' },
  ]},

  e2c_wb_silikat: { ebene: 3, label: 'Pain Points', q: 'Problem bei Silikat/Silikonharz?', h: '', os: [
    { l: 'Selbstreinigung / Schmutzabweisung', nx: 'e3_selbstreinigung' },
    { l: 'UV-Stabilität', nx: 'e3_uv' },
    { l: 'Verlauf / Krater', nx: 'e3_verlauf_wb' },
  ]},

  e2c_unbekannt: { ebene: 3, label: 'Pain Points', q: 'Was ist das wichtigste Thema für den Kunden aktuell?', h: 'System unbekannt – über Pain Point einsteigen', os: [
    { l: 'VOC-Reduzierung / Nachhaltigkeit', nx: 'e3_voc' },
    { l: 'Kobalt-Ausstieg (Trockenstoffe)', nx: 'e3_kobalt' },
    { l: 'Kosten senken', nx: 'e3_kosten' },
    { l: 'Technisches Problem (Verlauf, Haftung, etc.)', nx: 'e3_verlauf_wb' },
    { l: 'Neues Produkt entwickeln', nx: 'e3_neu' },
  ]},

  // ═══════════════════════════════════════════
  // EBENE 3 – PAIN POINTS (Adhesives)
  // ═══════════════════════════════════════════
  e1a_verpackung: { ebene: 3, label: 'Pain Points', q: 'Problem bei Verpackungsklebstoffen?', h: '', os: [
    { l: 'Klebkraft / Tack nicht ausreichend', nx: 'e3_klebkraft' },
    { l: 'Temperaturbeständigkeit', nx: 'e3_temperatur' },
    { l: 'VOC / Migrationsfreiheit (food-grade)', nx: 'e3_foodgrade' },
    { l: 'Verarbeitungstemperatur Hot Melt zu hoch', nx: 'e3_hotmelt_temp' },
    { l: 'Kosten', nx: 'e3_kosten' },
  ]},

  e1a_holz: { ebene: 3, label: 'Pain Points', q: 'Problem bei Holz/Möbel-Klebstoffen?', h: '', os: [
    { l: 'Wasserbeständigkeit / Feuchteresistenz', nx: 'e3_wasserbestaendigkeit' },
    { l: 'Offene Zeit zu kurz / zu lang', nx: 'e3_offene_zeit' },
    { l: 'Haftung auf schwierigen Holzarten', nx: 'e3_haftung' },
    { l: 'VOC-Reduzierung', nx: 'e3_voc' },
    { l: 'Kosten', nx: 'e3_kosten' },
  ]},

  e1a_auto: { ebene: 3, label: 'Pain Points', q: 'Problem bei Automotive Klebstoffen?', h: '', os: [
    { l: 'Hochtemperaturbeständigkeit', nx: 'e3_temperatur' },
    { l: 'Haftung auf Metall / Kunststoff / Glas', nx: 'e3_haftung' },
    { l: 'Vibrationsdämpfung / Flexibilität', nx: 'e3_flexibilitaet' },
    { l: 'Verarbeitungszeit / Aushärtung', nx: 'e3_vernetzung' },
  ]},

  e1a_textil: { ebene: 3, label: 'Pain Points', q: 'Problem bei Schuh/Leder/Textil-Klebstoffen?', h: '', os: [
    { l: 'Haftung auf synthetischen Substraten', nx: 'e3_haftung' },
    { l: 'Wasserbeständigkeit', nx: 'e3_wasserbestaendigkeit' },
    { l: 'Flexibilität / Weichheit', nx: 'e3_flexibilitaet' },
    { l: 'Lösemittelfreiheit gefordert', nx: 'e3_voc' },
  ]},

  e1a_bau: { ebene: 3, label: 'Pain Points', q: 'Problem bei Bau-Klebstoffen?', h: '', os: [
    { l: 'Haftung auf mineralischen Substraten', nx: 'e3_haftung' },
    { l: 'Witterungsbeständigkeit', nx: 'e3_uv' },
    { l: 'Feuchtigkeitsbeständigkeit', nx: 'e3_wasserbestaendigkeit' },
    { l: 'VOC-Anforderungen', nx: 'e3_voc' },
  ]},

  e1a_industrie: { ebene: 3, label: 'Pain Points', q: 'Problem bei Industrieklebstoffen?', h: '', os: [
    { l: 'Haftung auf Metall / Glas', nx: 'e3_haftung' },
    { l: 'Temperaturbeständigkeit', nx: 'e3_temperatur' },
    { l: 'Verarbeitungszeit', nx: 'e3_vernetzung' },
    { l: 'Kosten', nx: 'e3_kosten' },
  ]},

  // ═══════════════════════════════════════════
  // EBENE 3 – PAIN POINTS (weitere Segmente)
  // ═══════════════════════════════════════════

  e2_sealants_system: { ebene: 3, label: 'Pain Points', q: 'Welches Dichtmassensystem?', h: '', os: [
    { l: 'MS-Polymer (silyl-terminiert)', nx: 'e3_ms_polymer' },
    { l: 'PU-Dichtmasse (1K feuchtigkeitshärtend)', nx: 'e3_pu_1k' },
    { l: 'Acrylat-Dichtmasse', nx: 'e3_acrylat_dm' },
    { l: 'Silikon-Dichtmasse', nx: 'e3_silikon_dm' },
  ]},

  e2_sealants_auto: { ebene: 3, label: 'Pain Points', q: 'Problem bei Automotive-Dichtmassen?', h: '', os: [
    { l: 'Haftung auf Metall/Glas/Kunststoff', nx: 'e3_haftung' },
    { l: 'Blasenfreiheit (Moisture Scavenger)', nx: 'e3_moisture' },
    { l: 'Flexibilität / Vibrationsdämpfung', nx: 'e3_flexibilitaet' },
  ]},

  e2_sealants_industrie: { ebene: 3, label: 'Pain Points', q: 'Problem bei Industriedichtmassen?', h: '', os: [
    { l: 'Haftung auf schwierigen Substraten', nx: 'e3_haftung' },
    { l: 'Temperaturbeständigkeit', nx: 'e3_temperatur' },
    { l: 'Standfestigkeit / Rheologie', nx: 'e3_rheologie_sb' },
  ]},

  e2_rubber_tech: { ebene: 3, label: 'Pain Points', q: 'Problem bei technischen Gummiteilen?', h: '', os: [
    { l: 'Gummi-Metall-Haftung', nx: 'e3_gummi_metall' },
    { l: 'Vulkanisationsgeschwindigkeit', nx: 'e3_vulkanisation' },
    { l: 'Alterungsbeständigkeit', nx: 'e3_alterung' },
    { l: 'Ozonbeständigkeit', nx: 'e3_alterung' },
  ]},

  e2_rubber_reifen: { ebene: 3, label: 'Pain Points', q: 'Problem bei Reifen/Reifenkord?', h: '', os: [
    { l: 'Cord-Haftung (Textil-Gummi)', nx: 'e3_cord_haftung' },
    { l: 'Vulkanisation / Peroxidvernetzung', nx: 'e3_vulkanisation' },
    { l: 'Alterungsschutz / Antioxidantien', nx: 'e3_alterung' },
  ]},

  e2_rubber_schaum: { ebene: 3, label: 'Pain Points', q: 'Problem bei Schäumen/TPE?', h: '', os: [
    { l: 'Flexibilität bei tiefen Temperaturen', nx: 'e3_flexibilitaet' },
    { l: 'Vernetzungsgrad', nx: 'e3_vulkanisation' },
    { l: 'UV-Beständigkeit (Außeneinsatz)', nx: 'e3_uv' },
  ]},

  e2_rubber_extrusion: { ebene: 3, label: 'Pain Points', q: 'Problem bei Extrusion/Profilen?', h: '', os: [
    { l: 'Oberflächenqualität / Glanz', nx: 'e3_verlauf_sb' },
    { l: 'Alterungsbeständigkeit', nx: 'e3_alterung' },
    { l: 'Haftung Gummi-Metall', nx: 'e3_gummi_metall' },
  ]},

  e2_plastics_thermo: { ebene: 3, label: 'Pain Points', q: 'Problem bei Thermoplasten?', h: '', os: [
    { l: 'Alterung / Versprödung bei Verarbeitung', nx: 'e3_alterung' },
    { l: 'UV-Stabilität (Außeneinsatz)', nx: 'e3_uv' },
    { l: 'Elektrische Leitfähigkeit / ESD', nx: 'e3_leitfaehigkeit' },
  ]},

  e2_plastics_composite: { ebene: 3, label: 'Pain Points', q: 'Problem bei Composites/GFK?', h: '', os: [
    { l: 'Faser-Matrix-Haftung', nx: 'e3_haftung_composite' },
    { l: 'Hochtemperaturbeständigkeit', nx: 'e3_temperatur' },
    { l: 'Gewichtsreduzierung (Füllstoffe)', nx: 'e3_gewicht' },
  ]},

  e2_plastics_kabel: { ebene: 3, label: 'Pain Points', q: 'Problem bei Kabelisolierung?', h: '', os: [
    { l: 'Vernetzungsgrad / Isolierwert', nx: 'e3_vulkanisation' },
    { l: 'Alterungsschutz / Wärmestabilität', nx: 'e3_alterung' },
    { l: 'Elektrische Leitfähigkeit', nx: 'e3_leitfaehigkeit' },
  ]},

  e2_plastics_tech: { ebene: 3, label: 'Pain Points', q: 'Problem bei technischen Kunststoffteilen?', h: '', os: [
    { l: 'Alterungsschutz', nx: 'e3_alterung' },
    { l: 'UV-Beständigkeit', nx: 'e3_uv' },
    { l: 'Haftung Lack auf Kunststoff', nx: 'e3_haftung' },
  ]},

  e2_construction_beton: { ebene: 3, label: 'Pain Points', q: 'Problem bei Beton?', h: '', os: [
    { l: 'Frostschutz / Luftporen fehlen', nx: 'e3_luftporen' },
    { l: 'Schwindrisse', nx: 'e3_schwinden' },
    { l: 'Verarbeitbarkeit / Versteifung zu schnell', nx: 'e3_verzoegerer' },
    { l: 'Entschäumung Betonwerk', nx: 'e3_schaum_beton' },
  ]},

  e2_construction_fassade: { ebene: 3, label: 'Pain Points', q: 'Problem bei Fassade/Putz?', h: '', os: [
    { l: 'Schmutzabweisung / Algenbefall', nx: 'e3_selbstreinigung' },
    { l: 'Wasseraufnahme / Hydrophobierung', nx: 'e3_hydrophobierung' },
    { l: 'UV-Stabilität / Farbhaltung', nx: 'e3_uv' },
  ]},

  e2_construction_bitumen: { ebene: 3, label: 'Pain Points', q: 'Problem bei Bitumen/Asphalt?', h: '', os: [
    { l: 'Emulgierung / Brechzeit', nx: 'e3_bitumen_emulsion' },
    { l: 'Wärmereflektion (Urban Heat Island)', nx: 'e3_ir_reflektion' },
  ]},

  e2_construction_boden: { ebene: 3, label: 'Pain Points', q: 'Problem bei Bodenbeschichtung?', h: '', os: [
    { l: 'Haftung auf Beton', nx: 'e3_haftung' },
    { l: 'Chemikalienbeständigkeit', nx: 'e3_chembestaendigkeit' },
    { l: 'Verlauf / Blasen', nx: 'e3_verlauf_sb' },
  ]},

  e2_print_flexo_sb: { ebene: 3, label: 'Pain Points', q: 'Problem bei lösemittelbasierter Drucktinte?', h: '', os: [
    { l: 'Haftung auf Substrat', nx: 'e3_haftung' },
    { l: 'Farbstärke / Opazität', nx: 'e3_pigment' },
    { l: 'VOC-Reduzierung', nx: 'e3_voc' },
    { l: 'Hitzebeständigkeit der Pigmente', nx: 'e3_pigment_temp' },
  ]},

  e2_print_tief_sb: { ebene: 3, label: 'Pain Points', q: 'Problem bei Tiefdruck?', h: '', os: [
    { l: 'Haftung / Verbundfestigkeit', nx: 'e3_haftung' },
    { l: 'Pigmentqualität / Echtheit', nx: 'e3_pigment_temp' },
    { l: 'VOC-Reduzierung', nx: 'e3_voc' },
  ]},

  e2_print_sieb: { ebene: 3, label: 'Pain Points', q: 'Problem bei Siebdruck?', h: '', os: [
    { l: 'Haftung auf Substrat (Textil, Keramik)', nx: 'e3_haftung' },
    { l: 'Pigmentechtheit bei hohen Temperaturen', nx: 'e3_pigment_temp' },
    { l: 'Viskosität / Druckfähigkeit', nx: 'e3_rheologie_sb' },
  ]},

  e2_print_wb: { ebene: 3, label: 'Pain Points', q: 'Problem bei wasserbasierter Drucktinte?', h: '', os: [
    { l: 'Schaumbildung', nx: 'e3_schaum_wb' },
    { l: 'Haftung auf Substrat', nx: 'e3_haftung' },
    { l: 'Verlauf / Benetzung', nx: 'e3_verlauf_wb' },
  ]},

  e2_textile_finish: { ebene: 3, label: 'Pain Points', q: 'Problem bei Textilfinish?', h: '', os: [
    { l: 'Waschbeständigkeit / Fixierung', nx: 'e3_textil_fixierung' },
    { l: 'Weichheit / Griff', nx: 'e3_textil_griff' },
    { l: 'Schaumbildung bei Produktion', nx: 'e3_schaum_wb' },
    { l: 'VOC / Nachhaltigkeit', nx: 'e3_voc' },
  ]},

  e2_textile_leder: { ebene: 3, label: 'Pain Points', q: 'Problem bei Leder/Kunstleder-Beschichtung?', h: '', os: [
    { l: 'Flexibilität / Knickfestigkeit', nx: 'e3_flexibilitaet' },
    { l: 'Abriebfestigkeit', nx: 'e3_kratz' },
    { l: 'Haftung auf Leder/Synthetik', nx: 'e3_haftung' },
    { l: 'Glanz / Optik', nx: 'e3_verlauf_wb' },
  ]},

  e2_textile_fiber: { ebene: 3, label: 'Pain Points', q: 'Problem bei Faserverarbeitung?', h: '', os: [
    { l: 'Schaumbildung / Entschäumung', nx: 'e3_schaum_wb' },
    { l: 'Antistatik', nx: 'e3_leitfaehigkeit' },
    { l: 'Fasergleitung / Präparation', nx: 'e3_textil_griff' },
  ]},

  e3_ms_polymer: { ebene: 3, label: 'Pain Points', q: 'Problem bei MS-Polymer?', h: '', os: [
    { l: 'Feuchtigkeitsfänger / Blasenbildung', nx: 'e3_moisture' },
    { l: 'Haftung auf Glas / Metall / Beton', nx: 'e3_haftung' },
    { l: 'Standfestigkeit / Rheologie', nx: 'e3_rheologie_sb' },
    { l: 'Leichtfüller / Gewichtsreduzierung', nx: 'e3_gewicht' },
  ]},

  e3_pu_1k: { ebene: 3, label: 'Pain Points', q: 'Problem bei 1K-PU Dichtmasse?', h: '', os: [
    { l: 'Blasenfreiheit / Moisture Scavenger', nx: 'e3_moisture' },
    { l: 'Haftung auf Substrat', nx: 'e3_haftung' },
    { l: 'Aushärtungsgeschwindigkeit', nx: 'e3_vernetzung' },
  ]},

  e3_acrylat_dm: { ebene: 3, label: 'Pain Points', q: 'Problem bei Acrylat-Dichtmasse?', h: '', os: [
    { l: 'Haftung auf Substrat', nx: 'e3_haftung' },
    { l: 'Standfestigkeit', nx: 'e3_rheologie_wb' },
    { l: 'Witterungsbeständigkeit', nx: 'e3_uv' },
  ]},

  e3_silikon_dm: { ebene: 3, label: 'Pain Points', q: 'Problem bei Silikon-Dichtmasse?', h: '', os: [
    { l: 'Haftung / Primer auf Substrat', nx: 'e3_haftung' },
    { l: 'Standfestigkeit', nx: 'e3_rheologie_sb' },
  ]},

  // ═══════════════════════════════════════════
  // EBENE 4 – EINKAUF / ENTSCHEIDUNG
  // ═══════════════════════════════════════════

  e3_verlauf_wb:        { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell diesen Rohstoff?', h: 'Problem: Verlauf / Krater / Stippen (wasserbasiert)', os: e4_options('verlauf_wb') },
  e3_verlauf_sb:        { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Verlauf (lösemittelbasiert)', os: e4_options('verlauf_sb') },
  e3_schaum_wb:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Schaumbildung (wasserbasiert)', os: e4_options('schaum_wb') },
  e3_rheologie_wb:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Rheologie (wasserbasiert)', os: e4_options('rheologie_wb') },
  e3_rheologie_sb:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Rheologie (lösemittelbasiert)', os: e4_options('rheologie_sb') },
  e3_kratz:             { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Kratzfestigkeit / Abrieb', os: e4_options('kratz') },
  e3_uv:                { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: UV-Stabilität / Vergilbung', os: e4_options('uv') },
  e3_voc:               { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Ziel: VOC-Reduzierung / Nachhaltigkeit', os: e4_options('voc') },
  e3_kobalt:            { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Thema: Kobalt-Ausstieg', os: e4_options('kobalt') },
  e3_mft:               { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Filmbildung / MFT', os: e4_options('mft') },
  e3_trocknung:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Trocknungszeit', os: e4_options('trocknung') },
  e3_vernetzung:        { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Vernetzungszeit', os: e4_options('vernetzung') },
  e3_haftung:           { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Haftung', os: e4_options('haftung') },
  e3_intercoat:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Intercoat / Verlauf silikonfrei', os: e4_options('intercoat') },
  e3_korrosion:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Korrosionsschutz', os: e4_options('korrosion') },
  e3_flexibilitaet:     { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Flexibilität', os: e4_options('flexibilitaet') },
  e3_chembestaendigkeit:{ ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Chemikalienbeständigkeit', os: e4_options('chembestaendigkeit') },
  e3_selbstreinigung:   { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Thema: Selbstreinigung', os: e4_options('selbstreinigung') },
  e3_kosten:            { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Thema: Kosten / Lieferantenwechsel', os: e4_options('kosten') },
  e3_klebkraft:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Klebkraft / Tack', os: e4_options('klebkraft') },
  e3_temperatur:        { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Temperaturbeständigkeit', os: e4_options('temperatur') },
  e3_foodgrade:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Anforderung: Food-grade / Migration', os: e4_options('foodgrade') },
  e3_hotmelt_temp:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Hot Melt Verarbeitungstemperatur', os: e4_options('klebkraft') },
  e3_wasserbestaendigkeit:{ ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Wasserbeständigkeit', os: e4_options('haftung') },
  e3_offene_zeit:       { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Offene Zeit', os: e4_options('vernetzung') },
  e3_gummi_metall:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Gummi-Metall-Haftung', os: e4_options('gummi_metall') },
  e3_vulkanisation:     { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Vulkanisation', os: e4_options('vulkanisation') },
  e3_alterung:          { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Alterungsschutz', os: e4_options('alterung') },
  e3_cord_haftung:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Cord-Haftung Reifen', os: e4_options('gummi_metall') },
  e3_leitfaehigkeit:    { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Leitfähigkeit / ESD', os: e4_options('leitfaehigkeit') },
  e3_haftung_composite: { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Faser-Matrix-Haftung', os: e4_options('haftung') },
  e3_gewicht:           { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Ziel: Gewichtsreduzierung', os: e4_options('gewicht') },
  e3_luftporen:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Luftporen Beton', os: e4_options('beton') },
  e3_schwinden:         { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Schwindrisse', os: e4_options('beton') },
  e3_verzoegerer:       { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Verarbeitbarkeit Beton', os: e4_options('beton') },
  e3_schaum_beton:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Entschäumung Beton', os: e4_options('schaum_wb') },
  e3_hydrophobierung:   { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Hydrophobierung', os: e4_options('hydrophobierung') },
  e3_bitumen_emulsion:  { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Bitumen Emulgierung', os: e4_options('beton') },
  e3_ir_reflektion:     { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Thema: IR-Reflektion / Cool Asphalt', os: e4_options('ir') },
  e3_pigment:           { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Pigment / Farbstärke', os: e4_options('pigment') },
  e3_pigment_temp:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Pigmentechtheit / Hitze', os: e4_options('pigment') },
  e3_textil_fixierung:  { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Fixierung / Wäsche', os: e4_options('haftung') },
  e3_textil_griff:      { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Weichheit / Griff', os: e4_options('textil') },
  e3_moisture:          { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Blasenfreiheit / Moisture Scavenger', os: e4_options('moisture') },
  e3_neu:               { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Ziel: Neuentwicklung', os: e4_options('kosten') },
  e3_lagerstabilitaet:  { ebene: 4, label: 'Einkauf & Entscheidung', q: 'Von wem kauft der Kunde aktuell?', h: 'Problem: Lagerstabilität / Inhibierung bei Harz- oder Monomerherstellung', os: e4_options('lagerstabilitaet') },
};

// ═══════════════════════════════════════════
// EBENE 4 + 5 – EINKAUF & EMPFEHLUNG
// ═══════════════════════════════════════════

function e4_options(painKey) {
  return [
    { l: 'Brenntag', nx: result(painKey, 'Brenntag') },
    { l: 'IMCD', nx: result(painKey, 'IMCD') },
    { l: 'Azelis', nx: result(painKey, 'Azelis') },
    { l: 'Direkt beim Hersteller', nx: result(painKey, 'Direktbezug') },
    { l: 'Anderer Distributor', nx: result(painKey, 'anderer Distributor') },
    { l: 'Weiß nicht / Erstgespräch', nx: result(painKey, 'unbekannt') },
  ];
}

function result(painKey, lieferant) {
  // r = Produkt-IDs aus PRODUCTS
  // hl = Hydrolar Produkt-IDs
  // sl = Safic-Chem SIL Silan-IDs
  const map = {
    verlauf_wb:         { r:[38,28,30,40],        hl:[], sl:[], note:'Neboflow 80X (silikonfrei – kein Intercoat-Problem), Silwet (Spreitung bei WB), Defoam RICCI (wenn Schaum mitursächlich), AC3000 (Rheologie stabilisieren)' },
    verlauf_sb:         { r:[38,34,37],           hl:[], sl:[], note:'Neboflow 80X (silikonfrei auch SB), Fascat (Katalysator wenn Trocknungszeit ein Faktor), Soltense (Thixotropie gegen Läufer)' },
    schaum_wb:          { r:[30,29,25,27],         hl:[], sl:[], note:'Antischiuma/Defoam RICCI (lackverträglich, keine Krater), SAG/Baysilone (industriell), Surfaline LF (schaumarmes Tensid als Ursachenbekämpfung), Softanol EP' },
    rheologie_wb:       { r:[40,37,35],           hl:[], sl:[], note:'Neboplast AC3000 (HEUR-Verdicker Eigenmarke), Addensante RG20 (Copolymerdispersion WB), Ensoline (Koalesziermittel wenn MFT-Problem verknüpft)' },
    rheologie_sb:       { r:[37,38],              hl:[], sl:[], note:'Soltense RG135 (Harnstofflösung, Thixotropie SB), Neboflow 80X (Verlauf als Ergänzung)' },
    kratz:              { r:[31,5,33],            hl:['HR112','HR113','HC2357','HR116'], sl:['EGM38','AME02'], note:'Silislide (Anti-Kratz + Slip, VOC-frei – Eigenmarke), OH-Acrylharz (härteres 2K-PU-System), EUROLITE (UV-Schutz als Ergänzung). · HYDROLAR: HR112/HR113 (sehr hart, König >100s). · SILANE: EGM38/AME02 als Crosslinker/Adhesion Promoter erhöhen Filmhärte und Substratanbindung.' },
    uv:                 { r:[33,32],              hl:['HC210','HC294NF','HC295'], sl:[], note:'EUROLITE UV/HALS (Eigenmarke Safic-Alcan – direkter Hebel), EURONOX/APlus (Antioxidantien ergänzend). · HYDROLAR: HC210 (low yellowing), HC294NF/HC295 (Polycarbonate – beste UV-Stabilität).' },
    voc:                { r:[2,23,35,24],         hl:['HC208','HC210','HR106','HR103','HC295'], sl:['ADA48'], note:'Neboplast Dispersionen (WB-Bindemittel statt SB), Sensio (ECOCERT/Ecolabel), Ensoline (MFT-Absenker). · HYDROLAR: Alle waterborne mit niedrigem VOC. · SILAN: ADA48 (oligomeres Aminosilan) als VOC-ärmere Alternative zu monomerem AMEO.' },
    kobalt:             { r:[44],                 hl:[], sl:[], note:'Safic-Chem ZM Drier (kobaltfrei, Mangan/Zirkonium – Eigenmarke Safic-Alcan, REACH-konform, direkter 1:1-Ersatz)' },
    mft:                { r:[35,40,2],            hl:[], sl:[], note:'Ensoline PHP/PHE (Koalesziermittel senkt MFT), AC3000 (Viskosität stabilisieren), Neboplast Dispersionen.' },
    trocknung:          { r:[44,34,1],            hl:[], sl:[], note:'Safic-Chem ZM Drier (kobaltfrei, beschleunigt Trocknung), Fascat (Katalysator für 2K-PU), Nebores Alkyd (kürzere Öllänge = schnellere Trocknung)' },
    vernetzung:         { r:[34,19,20],           hl:['HC208','HR103','HC295','HR116'], sl:['EGM38','MEM50'], note:'Fascat (Katalysator PU-Vernetzung), Thanecure T9, Perkadox/Trigonox. · HYDROLAR: Alle können mit Isocyanat/Aziridin/Carbodiimid vernetzt werden. · SILANE: EGM38 (Crosslinker post-addition in PU-Systemen), MEM50 (Crosslinker in radikalischer Polymerisation).' },
    haftung:            { r:[41,19,5],            hl:['HT306','HR115','HA101','HC234'], sl:['AME02','AAT43','EGM38'], note:'SIL Silane (Haftvermittler essentiell), Thanecure T9, OH-Acrylharz. · HYDROLAR als Primer/Bindemittel: HT306/HR115/HA101/HC234. · SILANE: AME02 (breitestes Spektrum), AAT43 (Diamin, Primer für Alkyd/Epoxy), EGM38 (Epoxy/PU-Systeme) – kovalente Brücke Harz↔Substrat.' },
    intercoat:          { r:[38,31],              hl:[], sl:[], note:'Neboflow 80X (silikonfrei – Intercoat-Haftung bleibt erhalten, Eigenmarke), Silislide (Slip ohne Silikon)' },
    korrosion:          { r:[41,5,26],            hl:['HR110','HT181','HR103','HC295'], sl:['AME02','AAT43','EGM38','ATE73'], note:'SIL Silane (Haftvermittler Metall = Basis Korrosionsschutz), OH-Acrylharz, Dinoramox. · HYDROLAR auf Metall: HR110/HT181/HR103/HC295. · SILANE: AME02/AAT43/EGM38 (Primer auf Metall), ATE73 (Bindemittel in Zinkstaub-Primern – Schiffbau/Stahl).' },
    flexibilitaet:      { r:[11,36,19],           hl:['HR108','HT306','HR101','HC220'], sl:[], note:'Poly BD (Polybutadien-Modifier), Dianol/Adiansol (flexible Polyol-Komponente), Thanecure T9. · HYDROLAR sehr weich/flexibel: HR108 (Tg -58°C, Dehnung 900%), HT306/HR101/HC220.' },
    chembestaendigkeit: { r:[5,34,41],            hl:['HR112','HR113','HC2357','HC294NF'], sl:['EGM38','AME02'], note:'OH-Acrylharz + Fascat (dicht vernetztes 2K-PU), SIL Silane. · HYDROLAR 2K: HR112/HR113/HC2357/HC294NF. · SILANE: EGM38/AME02 als Haftvermittler verbessern Schichtanbindung und damit Chemikalienbeständigkeit.' },
    selbstreinigung:    { r:[39,14],              hl:[], sl:[], note:'ADINS Clean (photokatalytisch, Schmutzabweisung TiO2-Effekt), Nebotint WH (IR-reflektierend)' },
    kosten:             { r:[32,33,38,40,44],     hl:[], sl:[], note:'Eigenmarken Safic-Alcan als Hebel: EURONOX, EUROLITE, Neboflow 80X, AC3000, ZM Drier – alle preislich attraktiver als BYK/Evonik bei gleicher Leistung' },
    klebkraft:          { r:[6,8,9,10],           hl:['HT306','HR108','HR115','HA101','HC234'], sl:['AME02','AAT43','EGM38'], note:'Tackifier: Cleartack W, HAITACK JH, HyStar HV, DayStar. · HYDROLAR für WB-Klebstoffe: HT306/HR108/HR115/HA101/HC234. · SILANE: AME02/AAT43 (Primer vor Verklebung auf Glas/Metall), EGM38 (Epoxy-Klebstoffe).' },
    temperatur:         { r:[19,12,21],           hl:['HT181','HR116','HC2357'], sl:[], note:'Thanecure T9, Polyimid P84 (250°C+), Elaztobond/HRJ. · HYDROLAR: HT181/HR116/HC2357.' },
    foodgrade:          { r:[6,8],                hl:['HA101','HA139'], sl:[], note:'HAITACK JH (food-grade Hot Melt), Cleartack W. · HYDROLAR food-grade: HA101/HA139.' },
    gummi_metall:       { r:[21,20,17],           hl:[], sl:['AME02','MTM42'], note:'Elaztobond/HRJ/FRJ SI Group (Weltmarktführer Gummi-Metall-Haftvermittler), Perkadox/Trigonox, Silox ZnO Actif. · SILANE: AME02 (Füllstoffkoppler in Gummimischungen), MTM42 (Mercaptosilan für schwefelvernetzte Systeme).' },
    vulkanisation:      { r:[20,17,22],           hl:[], sl:['MTM42'], note:'Perkadox/Trigonox Nouryon (Weltmarktführer Peroxide), Silox ZnO Actif (Aktivator), Lowinox/Naugard (Antioxidantien). · SILAN: MTM42 (Mercaptosilan – Füllstoffkoppler in schwefelvernetzten Compounds).' },
    alterung:           { r:[22,32,33],           hl:['HC208','HC210','HC294NF','HC295'], sl:[], note:'Lowinox/Naugard, EURONOX/APlus, EUROLITE. · HYDROLAR Polycarbonate für beste Alterungsbeständigkeit: HC208/HC210/HC294NF/HC295.' },
    leitfaehigkeit:     { r:[15],                hl:[], sl:[], note:'Nanocyl MWCNT (Carbon Nanotubes – ESD, antistatisch; 0,1–2%)' },
    gewicht:            { r:[43],                hl:[], sl:[], note:'HGM / HGM X-Series 3M (Hohlglasmikrosphären – Leichtfüller)' },
    beton:              { r:[45,42],             hl:[], sl:['MTM76','ATE04','ATE73'], note:'Safic-Chem CC-Serie (Luftporenbildner CC RA, Anti-Schwund CC AS, Entschäumer CC DF, Verzögerer CC RT), Aqualic FN-001. · SILANE: MTM76 (Hydrophobierung Beton/Mineral), ATE04/ATE73 (Konsolidierung/Festiger für Naturstein und Beton).' },
    hydrophobierung:    { r:[46,39],             hl:[], sl:['MTM76'], note:'Ricobuild/Ricostone/Ricodrop RICCI (Silan-Siloxan-Imprägniermittel), ADINS Clean. · SILAN: MTM76 (MTES – Methyltriethoxysilan, Hydrophobierung von Mineralien und Füllstoffen).' },
    ir:                 { r:[14],               hl:[], sl:[], note:'Nebotint WH (IR-reflektierende Pigmentpräparation – Cool Roof, Fassade, Asphalt)' },
    pigment:            { r:[14,16],             hl:[], sl:['AME02','EGM38'], note:'Nebotint Pigmentpasten (A/U/M/WH), Colourplex/Solaplex OXERRA (CICP/MMO – hitzestabil). · SILANE: AME02/EGM38 als Koppler bei silica-basierter Füllstoffbehandlung (nicht CaCO₃/Carbon Black).' },
    textil:             { r:[23,27,28,29],        hl:['HC208','HC210','HR106','HT306','HR108'], sl:[], note:'Sensio ECOCERT, Softanol EP, Silwet, SAG/Indusil. · HYDROLAR Textil/Leder: HC208/HC210/HR106/HT306/HR108.' },
    moisture:           { r:[47,41],             hl:[], sl:['VTM27'], note:'Safic-Chem TI (Moisture Scavenger – essentiell für 1K-PU und MS-Polymer), SIL Silane. · SILAN: VTM27 (VTMO – einziger Moisture Scavenger im Silan-Portfolio, ideal für MS-Polymer und RTV-Silikon 1K-Systeme).' },
    lagerstabilitaet:   { r:[48,49,50],          hl:[], sl:[], note:'Eastman Hydroquinone-Inhibitoren – für Harz-/Monomerhersteller (nicht Lackverarbeiter): HQ (General-Purpose-Inhibitor für Acrylate, Methacrylate, Styrol, ungesättigte Polyester), MTBHQ (Co-Inhibitor, hochtemperaturstabil, höhere Löslichkeit), DTBHQ (Lagerinhibitor für ungesättigte Polyester, Anti-Skinning in Lacken, Stoppmittel in Kautschuk-Emulsionen).' },
  };

  const base = map[painKey] || { r:[32,33,38], hl:[], note:'Eigenmarken Safic-Alcan als Einstieg: EURONOX, EUROLITE, Neboflow 80X' };

  let wettbewerbshinweis = '';
  if (lieferant !== 'unbekannt') {
    wettbewerbshinweis = ` · Aktueller Lieferant: ${lieferant} – Differenzierung über Safic-Alcan Eigenmarken und Hydrolar COIM als exklusives WB-PU-Portfolio.`;
  }

  return {
    r: base.r,
    hl: base.hl || [],
    sl: base.sl || [],
    note: base.note + wettbewerbshinweis
  };
}
