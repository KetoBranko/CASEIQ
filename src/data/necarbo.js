// Necarbo (Safic-Alcan Necarbo B.V.) Produktdaten — NEBOTINT, NEBOCHIPS, NEBORES/NEBOPLAST.
// Quelle: Necarbo Broschüren 'Nebotint' (2023), 'Nebochips' (2023), 'Nebores/Neboplast' (2022).
// Necarbo ist eine Safic-Alcan Gesellschaft mit Sitz in Beverwijk, Niederlande.

export const NEBOTINT_RANGES = [
  {
    key: "A",
    name: "Nebotint A",
    tagline: "Tinting solvent-based alkyd coatings and enamels",
    segment: "Decorative Coatings",
    desc: "Enthält sorgfältig ausgewählte hochwertige Pigmente, dispergiert in einem trocknenden Alkydharz mit modernster Dispergiertechnologie. Geeignet für (modifizierte) Alkydharz-basierte Primer und Lacke, von Matt- bis Hochglanzfinish. Vollständig kompatibel mit mittel- und langöligen Alkydharzen.",
    typApps: "Einfärben von Alkyd-Bautenlacken und -Emaillelacken (matt bis hochglänzend), Holzschutzlasuren",
    note: "Trockenstoffgehalt des fertigen Lacks ggf. anpassen, um die gewünschte Trocknung zu erreichen.",
    colours: [
    { name:"Nebotint A 604 Magenta", ci:"PR 122", pigment:14, sg:0.91, lfFull:"7-8 d", lfOff:"7-8", wfFull:"4 d", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint A C 103 Blue", ci:"PB 15:2", pigment:10, sg:0.93, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint A 103 Blue", ci:"PB 15:2", pigment:5, sg:0.95, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint A 403 Green", ci:"PG 7", pigment:16, sg:1.0, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint A 302 Yellow", ci:"PY 74", pigment:33, sg:1.02, lfFull:"7-8", lfOff:"6-7", wfFull:"4-5", wfOff:"3", acid:5, alkali:5 },
    { name:"Nebotint A 305 Yellow Oxide", ci:"PY 42", pigment:49, sg:1.45, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint A 602 Red", ci:"PR 112", pigment:25, sg:0.94, lfFull:"7-8", lfOff:"6", wfFull:"4-5", wfOff:"3", acid:5, alkali:5 },
    { name:"Nebotint A 202 Red Oxide", ci:"PR 101", pigment:33, sg:1.16, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint A 809 Black", ci:"PBk 7", pigment:9, sg:0.97, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint A 706 White", ci:"PW 6", pigment:58, sg:1.65, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 }
    ],
  },
  {
    key: "U",
    name: "Nebotint U",
    tagline: "Water-based, APEO- and VOC-free universal colourants for water and solvent based coatings",
    segment: "Decorative Coatings",
    desc: "Enthält sorgfältig ausgewählte hochleistungsfähige Pigmente. Wasserbasierte, bindemittelfreie Pasten, hergestellt mit moderner Pigmentdispersionstechnologie. Exzellente universelle Tönpaste mit guter Lichtbeständigkeit und Wetterbeständigkeit.",
    typApps: "Universelles Einfärben (POS/In-Plant-Tönsysteme) für wasser- UND lösemittelbasierte Lacke, APEO- und VOC-frei",
    note: null,
    colours: [
    { name:"Nebotint U 64 SF Magenta", ci:"PR 122", pigment:6, sg:1.31, lfFull:"7-8 d", lfOff:"7-8", wfFull:"4 d", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint U 1018 SF Violet", ci:"PV 23", pigment:2, sg:1.29, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4", acid:5, alkali:5 },
    { name:"Nebotint U C 133 SF Blue", ci:"PB 15:3", pigment:41, sg:1.21, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint U 16 SF Blue", ci:"PB 28", pigment:60, sg:2.06, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint U 13 SF Blue", ci:"PB 15:2", pigment:5, sg:1.32, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint U 4030 SF Green", ci:"PG 7", pigment:14, sg:1.34, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint U 39 SF Yellow", ci:"PY 184", pigment:57, sg:2.0, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:4, alkali:5 },
    { name:"Nebotint U 38 SF Yellow", ci:"PY 97", pigment:16, sg:1.3, lfFull:"7-8", lfOff:"7", wfFull:"4-5", wfOff:"3", acid:5, alkali:5 },
    { name:"Nebotint U C 377 SF Yellow", ci:"PY 74", pigment:44, sg:1.29, lfFull:"7-8", lfOff:"6-7", wfFull:"4-5", wfOff:"3", acid:5, alkali:5 },
    { name:"Nebotint U 4035 SF Yellow Oxide", ci:"PY 42", pigment:18, sg:1.45, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint U 35 SF Yellow Oxide", ci:"PY 42", pigment:61, sg:1.88, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint U C 611 SF Red", ci:"PR 112", pigment:45, sg:1.21, lfFull:"7-8", lfOff:"6", wfFull:"4-5", wfOff:"3", acid:5, alkali:5 },
    { name:"Nebotint U 63 SF Red", ci:"PR 254", pigment:30, sg:1.23, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint U 4027 SF Red Oxide", ci:"PR 101", pigment:22, sg:1.43, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint U 27 SF Red Oxide", ci:"PR 101", pigment:64, sg:2.08, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint U 89 SF Black", ci:"PBk 7", pigment:10, sg:1.32, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint U 4089 SF Black", ci:"PBk 7", pigment:2, sg:1.34, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint U 71 SF White", ci:"PW 6", pigment:70, sg:2.17, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 }
    ],
  },
  {
    key: "M",
    name: "Nebotint M",
    tagline: "Tinting solvent-based and high-solids one- and two-component coatings",
    segment: "Industrial Coatings",
    desc: "Enthält sorgfältig ausgewählte hochleistungsfähige Pigmente, dispergiert in einem breit kompatiblen Bindemittel. Enthält keine aromatischen Lösemittel.",
    typApps: "Einfärben von High-Solids 1K- und 2K-Industrielacken (lösemittelbasiert), aromatenfrei",
    note: null,
    colours: [
    { name:"Nebotint M 6069 Magenta", ci:"PR 122", pigment:15, sg:1.07, lfFull:"7-8 d", lfOff:"7-8", wfFull:"4 d", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint M 1041 Blue", ci:"PB 15:2", pigment:26, sg:1.1, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint M 4073 Green", ci:"PG 36", pigment:30, sg:1.27, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint M 3082 Yellow", ci:"PY 184", pigment:51, sg:1.78, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:4, alkali:5 },
    { name:"Nebotint M 3083 Yellow", ci:"PY 194", pigment:38, sg:1.13, lfFull:"7-8", lfOff:"7", wfFull:"4-5", wfOff:"3-4", acid:5, alkali:5 },
    { name:"Nebotint M 3131 Yellow Oxide", ci:"PY 42", pigment:56, sg:1.72, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint M 3610 Orange", ci:"PY 170", pigment:35, sg:1.15, lfFull:"7-8", lfOff:"7", wfFull:"4-5", wfOff:"3", acid:5, alkali:5 },
    { name:"Nebotint M 6113 Red", ci:"PR 170", pigment:40, sg:1.13, lfFull:"7 d", lfOff:"5", wfFull:"4 d", wfOff:"2-3", acid:5, alkali:5 },
    { name:"Nebotint M 6102 Red", ci:"PR 255", pigment:33, sg:1.1, lfFull:"7-8", lfOff:"7-8", wfFull:"4-5", wfOff:"4-5", acid:5, alkali:5 },
    { name:"Nebotint M 6130 Red Oxide", ci:"PR 101", pigment:62, sg:1.92, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint M 7045 White", ci:"PW 6", pigment:62, sg:1.93, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint M 8047 Black", ci:"PBk 7", pigment:37, sg:1.22, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 },
    { name:"Nebotint M 8847 Black", ci:"PBk 7", pigment:6, sg:1.06, lfFull:"8", lfOff:"8", wfFull:"5", wfOff:"5", acid:5, alkali:5 }
    ],
  },
];

export const NEBOTINT_WH_NOTE = "Zusätzlich zu Farbtönen bietet Necarbo auch funktionale Pigmentpräparationen an, u.a. die Nebotint WH-Serie wärmereflektierender Pigmente (Cool-Roof-/IR-reflektierende Anwendungen). Einzelgrade auf Anfrage.";

export const NEBOCHIPS_RANGES = [
  {
    key: "NCA-C",
    name: "Nebochips NCA C",
    tagline: "Alcohol soluble cellulose nitrate based pigment chips",
    category: "Printing Inks",
    desc: "Weichgemachte Pigmentpräparationen auf Basis alkohollöslicher Nitrocellulose, geeignet für Druckfarben auf verschiedenen Substraten wie Papier, Karton sowie vorbehandeltem PE, PP, Cellophan und Aluminium.",
    typApps: "Flexodruckfarben und Tiefdruckfarben auf Papier, Karton, vorbehandelter Folie und Aluminium",
    colours: [
    { code:"NCA C 3721/0 Yellow", ci:"P.Y. 13", colour:"Yellow", pigment:49 },
    { code:"NCA C 3755/0 Yellow", ci:"P.Y. 74", colour:"Yellow", pigment:55 },
    { code:"NCA C 3761/0 Yellow", ci:"P.Y. 83", colour:"Yellow", pigment:49 },
    { code:"NCA C 3601/1 Orange", ci:"P.O. 5", colour:"Orange", pigment:52 },
    { code:"NCA C 6706/0 Red", ci:"P.R. 112", colour:"Red", pigment:50 },
    { code:"NCA C 6711/1 Ba Red 2B", ci:"P.R. 48:1", colour:"Red", pigment:52 },
    { code:"NCA C 6713/0 Mn Red 2B", ci:"P.R. 48:4", colour:"Red", pigment:55 },
    { code:"NCA C 6716/0 Ca Red 4B", ci:"P.R. 57:1", colour:"Red", pigment:60 },
    { code:"NCA C 6721/1 Lake Red", ci:"P.R. 53:1", colour:"Red", pigment:60 },
    { code:"NCA C 6725/1 Pink", ci:"P.R. 81", colour:"Pink", pigment:42 },
    { code:"NCA C 6736/1 Pink", ci:"P.R. 122", colour:"Pink", pigment:50 },
    { code:"NCA C 1602/1 Violet", ci:"P.V. 23", colour:"Violet", pigment:52 },
    { code:"NCA C 1612/0 Violet", ci:"P.V. 3", colour:"Violet", pigment:39 },
    { code:"NCA C 1721/1 Blue", ci:"P.B. 15:3", colour:"Blue", pigment:50 },
    { code:"NCA C 1730/1 Blue", ci:"P.B. 15:4", colour:"Blue", pigment:53 },
    { code:"NCA C 4701/0 Green", ci:"P.G. 7", colour:"Green", pigment:55 },
    { code:"NCA C 7515/1 White", ci:"P.W. 6", colour:"White", pigment:80 },
    { code:"NCA C 8502/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:40 },
    { code:"NCA C 8504/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:50 },
    { code:"NCA C 8508/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:46 }
    ],
  },
  {
    key: "NCE-C",
    name: "Nebochips NCE C",
    tagline: "Ester soluble cellulose nitrate based pigment chips",
    category: "Coatings",
    desc: "Weichgemachte Pigmentpräparationen auf Basis esterlöslicher Nitrocellulose, geeignet für Möbel- und Holzlacke, Autoreparaturlacke, Industrielacke, Lederlacke und Aerosollacke.",
    typApps: "Möbel-/Holzlacke, Autoreparaturlacke, Industrielacke, Lederbeschichtungen, Spraydosenlacke",
    colours: [
    { code:"NCE C 3501/2 Yellow Oxide", ci:"P.Y. 42", colour:"Yellow", pigment:60 },
    { code:"NCE C 3755/0 Yellow", ci:"P.Y. 74", colour:"Yellow", pigment:50 },
    { code:"NCE C 3770/0 Yellow", ci:"P.Y. 110", colour:"Yellow", pigment:40 },
    { code:"NCE C 2001/1 Red Oxide", ci:"P.R. 101", colour:"Red", pigment:60 },
    { code:"NCE C 2002/0 Transparent Red", ci:"P.R. 101", colour:"Red", pigment:50 },
    { code:"NCE C 6706/1 Red", ci:"P.R. 112", colour:"Red", pigment:50 },
    { code:"NCE C 6713/0 Mn Red 2B", ci:"P.R. 48:4", colour:"Red", pigment:50 },
    { code:"NCE C 6714/0 Mn Bon Red", ci:"P.R. 52:2", colour:"Red", pigment:40 },
    { code:"NCE C 1601/0 Violet", ci:"P.V. 19", colour:"Violet", pigment:50 },
    { code:"NCE C 1602/0 Violet", ci:"P.V. 23", colour:"Violet", pigment:52 },
    { code:"NCE C 1705/0 Blue", ci:"P.B. 15:2", colour:"Blue", pigment:41 },
    { code:"NCE C 4701/1 Green", ci:"P.G. 7", colour:"Green", pigment:40 },
    { code:"NCE C 7515/0 White", ci:"P.W. 6", colour:"White", pigment:77 },
    { code:"NCE C 8502/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:40 },
    { code:"NCE C 8503/2 Black", ci:"P.Bk. 7", colour:"Black", pigment:18 },
    { code:"NCE C 8506/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:45 },
    { code:"NCE C 8509/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:19 },
    { code:"NCE C 8518/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:20 }
    ],
  },
  {
    key: "ACW",
    name: "Nebochips ACW",
    tagline: "Water soluble acrylic based pigment chips",
    category: "Coatings & Printing Inks",
    desc: "Acrylbasierte, wasserlösliche Pigmentpräparationen für wasserbasierte Verpackungsdruckfarben und wasserbasierte Lacke.",
    typApps: "Wasserbasierte Verpackungsdruckfarben und wasserbasierte Beschichtungen",
    colours: [
    { code:"ACW 3501/0 Yellow Oxide", ci:"P.Y. 42", colour:"Yellow", pigment:75 },
    { code:"ACW 3761/0 Yellow", ci:"P.Y. 83", colour:"Yellow", pigment:60 },
    { code:"ACW 3770/0 Yellow", ci:"P.Y. 110", colour:"Yellow", pigment:60 },
    { code:"ACW 3606/0 Orange", ci:"P.O. 34", colour:"Orange", pigment:60 },
    { code:"ACW 2001/0 Red Oxide", ci:"P.R. 101", colour:"Red", pigment:75 },
    { code:"ACW 6706/0 Red", ci:"P.R. 112", colour:"Red", pigment:65 },
    { code:"ACW 1721/0 Blue", ci:"P.B. 15:3", colour:"Blue", pigment:65 },
    { code:"ACW 4701/0 Green", ci:"P.G. 7", colour:"Green", pigment:60 },
    { code:"ACW 7515/0 White", ci:"P.W. 6", colour:"White", pigment:80 },
    { code:"ACW 8506/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:55 }
    ],
  },
  {
    key: "CAB",
    name: "Nebochips CAB",
    tagline: "Cellulose acetobutyrate based pigment chips",
    category: "Coatings",
    desc: "Pigmentpräparationen auf Basis von Celluloseacetobutyrat für Möbellacke, 2-Komponenten-Acryl-Polyurethanlacke, Autoreparaturlacke und Industrielacke.",
    typApps: "Möbellacke, 2K-Acryl-PU-Lacke, Autoreparaturlacke, Industrielacke",
    colours: [
    { code:"CAB 3518/0 Transparent Yellow", ci:"P.Y. 42", colour:"Yellow", pigment:60 },
    { code:"CAB 3770/0 Yellow", ci:"P.Y. 110", colour:"Yellow", pigment:60 },
    { code:"CAB 3602/0 Orange", ci:"P.O. 5", colour:"Orange", pigment:60 },
    { code:"CAB 2002/0 Transparent Red", ci:"P.R. 101", colour:"Red", pigment:50 },
    { code:"CAB 6736/0 Pink", ci:"P.R. 122", colour:"Pink", pigment:60 },
    { code:"CAB 1721/0 Blue", ci:"P.B. 15:3", colour:"Blue", pigment:60 },
    { code:"CAB 4701/0 Green", ci:"P.G. 7", colour:"Green", pigment:60 },
    { code:"CAB 7515/0 White", ci:"P.W. 6", colour:"White", pigment:80 },
    { code:"CAB 8502/1 Black", ci:"P.Bk. 7", colour:"Black", pigment:25 },
    { code:"CAB 8518/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:35 }
    ],
  },
  {
    key: "VIN",
    name: "Nebochips VIN",
    tagline: "Vinyl based pigment chips",
    category: "Coatings & Printing Inks",
    desc: "Vinylbasierte Pigmentpräparationen für Druckfarben, PVC-Druck und -Beschichtung, Kunstleder- und Nylonanwendungen.",
    typApps: "PVC-Druckfarben/-Beschichtungen, Kunstleder, Nylon-Anwendungen",
    colours: [
    { code:"VIN 3722/0 Yellow", ci:"P.Y. 13", colour:"Yellow", pigment:60 },
    { code:"VIN 3747/0 Yellow", ci:"P.Y. 17", colour:"Yellow", pigment:60 },
    { code:"VIN 3761/0 Yellow", ci:"P.Y. 83", colour:"Yellow", pigment:50 },
    { code:"VIN 3606/0 Orange", ci:"P.O. 34", colour:"Orange", pigment:60 },
    { code:"VIN 6721/2 Lake Red", ci:"P.R. 53:1", colour:"Red", pigment:60 },
    { code:"VIN 6715/3 Ca Red 4B", ci:"P.R. 57:1", colour:"Red", pigment:55 },
    { code:"VIN 6736/1 Pink", ci:"P.R. 122", colour:"Pink", pigment:50 },
    { code:"VIN 1603/0 Violet", ci:"P.V. 23", colour:"Violet", pigment:55 },
    { code:"VIN 1721/2 Blue", ci:"P.B. 15:3", colour:"Blue", pigment:60 },
    { code:"VIN 1742/0 Blue", ci:"P.B. 15:6", colour:"Blue", pigment:50 },
    { code:"VIN 4701/2 Green", ci:"P.G. 7", colour:"Green", pigment:60 },
    { code:"VIN 7515/1 White", ci:"P.W. 6", colour:"White", pigment:77 },
    { code:"VIN 8502/2 Black", ci:"P.Bk. 7", colour:"Black", pigment:50 },
    { code:"VIN 8517/0 Black", ci:"P.Bk. 7", colour:"Black", pigment:50 }
    ],
  },
];

export const NEBORES_LONG_OIL = [
  { id: "FP 07", type: "90 D", solids: 90, solvent: "dearomatisiertes White Spirit", oil: "vegetable", oilLength: 68, visc: "35-65", acid: 8, colour: 9, desc: "High solid Innen- und Außen-Dekorlacke (VOC < 300 g/l). Gute Außenqualität." },
  { id: "FP 252", type: "75 D", solids: 75, solvent: "dearomatisiertes White Spirit", oil: "vegetable", oilLength: 68, visc: "50-100", acid: 8, colour: 9, desc: "Weiße und hell getönte In-/Outdoor-Architekturlacke, DIY-Lacke, Yachtlacke; gute Glanzhaltung und Vergilbungsresistenz." },
  { id: "SP 247", type: "70 D60", solids: 70, solvent: "dearomatisiertes White Spirit", oil: "soya", oilLength: 65, visc: "40-70", acid: 10, colour: 6, desc: "Langöliges Sojabohnen-Alkydharz. Flammpunkt >60°C. Marinelacke, Innen-/Außen-Dekorlacke. Holzlasuren." },
  { id: "SP 248", type: "60 D / 70 D MV", solids: 70, solvent: "dearomatisiertes White Spirit", oil: "soya", oilLength: 65, visc: "28-70", acid: 10, colour: 5, desc: "Vielseitiges langöliges Sojabohnen-Alkydharz. Marinelacke, Innen-/Außen-Dekorlacke. Holzlasuren." },
  { id: "SP 252", type: "65 H / 70 / 70 D MV", solids: 70, solvent: "White Spirit", oil: "soya", oilLength: 63, visc: "22-90", acid: 8, colour: 7, desc: "Vielseitiges langöliges Sojabohnen-Alkydharz. Marinelacke, Innen-/Außen-Dekorlacke. Holzlasuren." },
  { id: "SP 00", type: "100", solids: 100, solvent: "—", oil: "vegetable", oilLength: 80, visc: "25-40", acid: 15, colour: 9, desc: "Niedrigviskoses Harz für High-Solid-Alkydlacke mit guter Trocknung und nicht-vergilbenden Eigenschaften." },
];

export const NEBORES_MEDIUM_OIL = [
  { id: "L 322", type: "50", solids: 50, solvent: "White Spirit", oil: "linseed", oilLength: 49, visc: "7-14", acid: 5, colour: 8, desc: "Schnell trocknende Korrosionsschutz-Primer. Aluminiumlacke, Automobillacke, Marinelacke." },
  { id: "SP 262", type: "50", solids: 50, solvent: "White Spirit", oil: "soya", oilLength: 50, visc: "12-19", acid: 6, colour: 7, desc: "Lufttrocknende Primer auf porösen Substraten. Gute Durchtrocknung. Marinelacke." },
  { id: "SPB 271", type: "50 D LV", solids: 50, solvent: "dearomatisiertes White Spirit", oil: "vegetable fatty acid", oilLength: 55, visc: "40-70", acid: 10, colour: 8, desc: "Lufttrocknende Finishes. Heizkörperlacke und hochwertige Einbrennlacke mit guter Flexibilität und exzellenter Farb-/Glanzhaltung." },
  { id: "SPB 272", type: "55 LV", solids: 55, solvent: "White Spirit/Xylol", oil: "vegetable fatty acid", oilLength: 49, visc: "40-55", acid: 7, colour: 8, desc: "Lufttrocknende Finishes. Heizkörperlacke und hochwertige Einbrennlacke mit guter Flexibilität und exzellenter Farb-/Glanzhaltung." },
  { id: "SPB 278", type: "50 D", solids: 50, solvent: "dearomatisiertes White Spirit", oil: "vegetable fatty acid", oilLength: 50, visc: "110-150", acid: 6, colour: 8, desc: "Sehr schnell lufttrocknende, hochwertige Industrielacke und Primer. Allgemeine Einbrennlacke. PVC-Copolymer-Kompatibilität." },
];

export const NEBORES_SHORT_OIL = [
  { id: "A 39", type: "60 X / 75 BA", solids: 75, solvent: "Xylol/Butylacetat", oil: "arachide", oilLength: 41, visc: "15-50", acid: 9, colour: 5, desc: "Flexible NC-Lacke. Schnell trocknende Einbrennlacke." },
  { id: "C 40", type: "60 X", solids: 60, solvent: "Xylol", oil: "nicht-trocknende vegetable Fettsäuren", oilLength: 38, visc: "30-60", acid: 6, colour: 3, desc: "Nitrocelluloselacke. 2-Komponenten-Decklacke. Säurehärtende und Einbrennlacke." },
  { id: "R 44", type: "55 X", solids: 55, solvent: "Xylol", oil: "dehydriertes Rizinusöl", oilLength: 30, visc: "80-100", acid: 14, colour: 9, desc: "Low-Bake elastische Primer mit exzellenter Haftung. Flexible Lacke mit guter Wetterbeständigkeit." },
  { id: "S 382", type: "60 X", solids: 60, solvent: "Xylol", oil: "vegetable", oilLength: 27, visc: "25-50", acid: 12, colour: 8, desc: "Lufttrocknende Industrielacke. Auch vernetzbar mit Polyisocyanaten und Melaminharzen. 2K-PU- und Einbrennlacke." },
  { id: "SMB 35", type: "60X", solids: 60, solvent: "Xylol", oil: "soya bean", oilLength: 30, visc: "48-60", acid: 8, colour: 6, desc: "Sehr schnell lufttrocknende, hochwertige Industrielacke und Primer. Spachtelmassen. Allgemeine Einbrennlacke." },
  { id: "SMB 402", type: "60 X", solids: 60, solvent: "Xylol", oil: "soya bean", oilLength: 26, visc: "20-30", acid: 12, colour: 9, desc: "Sehr schnell lufttrocknende, hochwertige Industrielacke und Primer. Allgemeine Einbrennlacke. PVC-Copolymer-Kompatibilität." },
];

export const NEBORES_MODIFIED = [
  { id: "FM 40", type: "40 WBG", solids: 40, solvent: "Wasser/Butylglykol", oil: "drying fatty acids", oilLength: 45, visc: "10-40", acid: null, colour: "white", desc: "Schnell trocknende wasserbasierte Industrielacke, Primer und Einbrennlacke. Gute Wetterbeständigkeit." },
  { id: "FP 262", type: "55 W", solids: 55, solvent: "Wasser", oil: "drying fatty acids", oilLength: 50, visc: "0-40", acid: null, colour: "white", desc: "Lösemittelfreie, mittelölige Alkyd-Emulsion in Wasser für sehr niedrige VOC-Dekor- und Industrielacke." },
  { id: "SM 35", type: "75 BBG", solids: 75, solvent: "Butanol/Butylglykol", oil: "drying fatty acids", oilLength: 30, visc: "100-140", acid: "25-30", colour: 5, desc: "Wasserverdünnbar nach Neutralisation. Lufttrocknend. Für Hochglanz-Decklacke und Korrosionsschutz-Primer." },
  { id: "TM 42", type: "35 WBG", solids: 35, solvent: "Wasser/Butylglykol", oil: "drying fatty acids", oilLength: 41, visc: "10-40", acid: 10, colour: "opaque", desc: "Schnell trocknende wasserbasierte Industrie-Decklacke mit früher Wasserbeständigkeit. Gute Wetterbeständigkeit." },
  { id: "DB 4004", type: "60 X", solids: 60, solvent: "Xylol", oil: "dehydriertes Rizinusöl", oilLength: 40, visc: "30-50", acid: 2, colour: 6, desc: "Epoxyester für chemikalienbeständige Primer." },
  { id: "HLP 21", type: "80 X / 75 DP", solids: 80, solvent: "Xylol / dearom. White Spirit/PGME", oil: "linseed/tung oil", oilLength: 40, visc: "20-220", acid: 16, colour: 14, desc: "High-Solid, schnell trocknende Korrosionsschutz-Primer, Füller und Spachtelmassen. Gute Überlackierbarkeit." },
  { id: "HLP 31", type: "60 X", solids: 60, solvent: "Xylol", oil: "tall/tung oil", oilLength: 37, visc: "30-50", acid: 15, colour: 12, desc: "Schnell trocknende Korrosionsschutz-Primer, Füller und Spachtelmassen. Grundierflächen für Autoreparaturlacke." },
  { id: "HTP 26", type: "45 D", solids: 45, solvent: "dearomatisiertes White Spirit", oil: "linseed/tung oil", oilLength: 40, visc: "40-100", acid: 7, colour: 8, desc: "Sehr aromatenarme, schnell trocknende Korrosionsschutz-Primer und Füller." },
  { id: "HTP 30", type: "50", solids: 50, solvent: "White Spirit", oil: "tall/tung oil", oilLength: 38, visc: "35-50", acid: 8, colour: 10, desc: "Aromatenarme, schnell trocknende Korrosionsschutz-Primer und Füller." },
  { id: "SA 21", type: "60 X", solids: 60, solvent: "Xylol", oil: "drying fatty acids", oilLength: 25, visc: "20-50", acid: 6, colour: 8, desc: "Styrenisiertes Alkydharz für sehr schnell trocknende Korrosionsschutz-Primer. Hammerschlaglacke." },
  { id: "SPU 15", type: "58 D", solids: 58, solvent: "dearomatisiertes White Spirit", oil: "soya bean", oilLength: 60, visc: "20-35", acid: 2, colour: 7, desc: "Urethanmodifiziertes Alkydharz für sehr schnell trocknende Lacke und Korrosionsschutz-Primer. Abrasionsbeständige Parkettlacke." },
  { id: "SPU 16", type: "60 D", solids: 60, solvent: "dearomatisiertes White Spirit", oil: "soya bean", oilLength: 60, visc: "25-80", acid: 3, colour: null, desc: "Vergilbungsbeständiges urethanmodifiziertes Alkydharz für schnell trocknende Lacke und Korrosionsschutz-Primer. Abrasionsbeständige Parkettlacke. Flammpunkt >60°C." },
  { id: "SPU 214", type: "58 D60", solids: 50, solvent: "dearomatisiertes White Spirit", oil: "soya bean", oilLength: 62, visc: "18-35", acid: 6, colour: 9, desc: "Urethanmodifiziertes Alkydharz für sehr schnell trocknende Lacke und Korrosionsschutz-Primer. Abrasionsbeständige Parkettlacke. Flammpunkt >60°C." },
  { id: "T 4001", type: "50 X", solids: 50, solvent: "Xylol", oil: "drying fatty acids", oilLength: 40, visc: "12-16", acid: 3, colour: 10, desc: "Epoxyester für chemikalienbeständige Primer und Zinkstaub-Primer. Einbrennlacke." },
];

export const NEBORES_THERMOPLASTIC_ACRYLIC = [
  { id: "BA 60", type: "40 XBS", solids: 40, solvent: "Xylol/Butanol/Solventnaphtha", acrylType: "acrylic copolymer", visc: "3-7", acid: 14, colour: 3, desc: "Flexible Beschichtungen mit guter Härte und Haftung auf nicht-metallischen Substraten." },
  { id: "BM 5", type: "50 BA", solids: 50, solvent: "Butylacetat", acrylType: "acrylic copolymer", visc: "70-100", acid: 19, colour: 2, desc: "Aerosollacke. Schnell trocknende Autoreparaturlacke mit guter Benzinbeständigkeit und Härte." },
  { id: "BM 34", type: "50 XBA", solids: 50, solvent: "Xylol/Butylacetat", acrylType: "acrylic copolymer", visc: "30-50", acid: "7-9", colour: 2, desc: "Allzwecklack. Metall- und Mineralbeschichtungen mit guter Außenreinigbarkeit." },
  { id: "BS 35", type: "60", solids: 60, solvent: "White Spirit", acrylType: "styrene acrylic copolymer", visc: "38-58", acid: 3, colour: 2, desc: "Tief eindringende Primer. Pigmentierte Füller. Wandfarben und Verputze." },
  { id: "BS 45", type: "60 X", solids: 60, solvent: "Xylol", acrylType: "styrene acrylic copolymer", visc: "25-30", acid: 8, colour: 2, desc: "Schnell trocknende Industrieprimer und Direct-to-Metal-Beschichtungen. Gute Haftung auf Eisen- und Nichteisenmetallen." },
  { id: "SA 10", type: "60 PBA", solids: 60, solvent: "Butylacetat/Aceton", acrylType: "styrene acrylic copolymer", visc: "3-7", acid: 8, colour: 2, desc: "Niedrigviskoses Bindemittel für schnell trocknende, wetterbeständige, hochgefüllte Beschichtungen auf mineralischen Substraten. Straßenmarkierungsfarben." },
];

export const NEBORES_HYDROXY_ACRYLIC = [
  { id: "HBS 14", type: "60 XBA / 60 S", solids: 60, solvent: "Xylol/Butylacetat oder Solventnaphtha", acrylType: "styrene acrylic copolymer", visc: "15-28", ohPct: 0.7, colour: 3, desc: "Einbrenn- und lufttrocknende PU-Lacke für Industrieanwendungen. Geeignet für metallische und nicht-metallische Substrate." },
  { id: "HBS 18", type: "60 S", solids: 60, solvent: "Solventnaphtha", acrylType: "styrene acrylic copolymer", visc: "20-40", ohPct: 1.1, colour: 2, desc: "Einbrenn- und lufttrocknende PU-Lacke für Industrieanwendungen. Gute Flexibilität und Wetterbeständigkeit." },
  { id: "HBS 261", type: "60 S / 60 X", solids: 60, solvent: "Solventnaphtha oder Xylol", acrylType: "styrene acrylic copolymer", visc: "15-35", ohPct: 1.6, colour: 3, desc: "2K-Polyisocyanat-vernetzte Industrielacke und Hochleistungs-Korrosionsschutz-Primer." },
  { id: "HBS 27", type: "60 X", solids: 60, solvent: "Xylol", acrylType: "styrene acrylic copolymer", visc: "20-40", ohPct: 1.7, colour: 3, desc: "2K-Polyisocyanat-vernetzte Industrielacke und Hochleistungsprimer mit guter Haftung auf Nichteisen-Substraten." },
  { id: "HBS 42", type: "70 SBA", solids: 70, solvent: "Butylacetat/Solventnaphtha", acrylType: "styrene acrylic copolymer", visc: "90-140", ohPct: 2.9, colour: 2, desc: "High-Solid 2K-Polyurethanlacke und Einbrennlacke mit guter Wetterbeständigkeit." },
  { id: "HEA 19", type: "65 XBA", solids: 65, solvent: "Xylol/Butylacetat", acrylType: "acrylic copolymer", visc: "19-26", ohPct: 0.9, colour: 1, desc: "Niedrigviskoses Bindemittel für polyisocyanat-vernetzte High-Solid-Möbel- und Kunststofflacke." },
  { id: "HEA 20", type: "50 XBA", solids: 50, solvent: "Xylol/Butylacetat", acrylType: "acrylic copolymer", visc: "20-35", ohPct: 1.0, colour: 2, desc: "Sehr schnell trocknende polyisocyanat-vernetzte Möbel- und Kunststofflacke." },
  { id: "HPA 45", type: "77 BA", solids: 77, solvent: "Butylacetat", acrylType: "modified acrylic copolymer", visc: "40-100", ohPct: 3.5, colour: 2, desc: "High-Solid 2K-Polyurethanlacke und Einbrennlacke mit guter Wetterbeständigkeit und Hochglanz. Autoreparaturlacke." },
  { id: "HSA 30", type: "70 BA", solids: 70, solvent: "Butylacetat", acrylType: "styrene acrylic copolymer", visc: "10-20", ohPct: 2.1, colour: 2, desc: "High-Solid 2K-Industrielacke." },
  { id: "HSA 36", type: "60 XS", solids: 60, solvent: "Xylol/Solventnaphtha/Butylacetat", acrylType: "styrene acrylic copolymer", visc: "20-35", ohPct: 2.2, colour: 3, desc: "Schnell trocknende 2K-Autoreparaturlacke. Industrie-Polyurethan- und Einbrennlacke." },
  { id: "HSA 45", type: "60 BA / 60 XF", solids: 60, solvent: "Butylacetat oder Xylol/MPA", acrylType: "styrene acrylic copolymer", visc: "25-45", ohPct: 2.7, colour: 2, desc: "2K-Polyurethanlacke und Einbrennlacke mit exzellentem Glanz und guter Chemikalienbeständigkeit." },
];

export const NEBOPLAST_PVAC_HOMO = [
  { id: "VA 1009", type: "plasticizer free", solids: 55, visc: "17.5-30", ph: "4-6", mfft: 16, desc: "Schnell anziehende Klebstoffe für Textil- und Teppichimprägnierungen." },
  { id: "VA 1050", type: "plasticizer free", solids: 67.5, visc: "20-35", ph: "4-6", mfft: 10, desc: "Vielseitige Dispersion mit Spezialanwendungen in Briefumschlagklebstoffen." },
  { id: "VA 9030", type: "plasticizer free", solids: 50, visc: "90-250", ph: "4-5", mfft: 14, desc: "Mittelviskose Dispersion für Klebstoffe in der Papier-, Karton- und Textilindustrie." },
  { id: "VAP 1521", type: "plasticized", solids: 51.5, visc: "140-190", ph: "4-6", mfft: 11, desc: "Extern weichgemachte, mittelviskose Dispersion mit hoher Klebkraft für die Bauindustrie." },
];

export const NEBOPLAST_PVAC_CO = [
  { id: "VM 2786", comonomer: "maleic ester", solids: 52.5, visc: "80-120", ph: "4-6", mfft: 2, desc: "Flexible, hochwertige Dispersionsfarben und Verputze mit guter Scheuer- und Wetterbeständigkeit." },
  { id: "VV 2180", comonomer: "vinyl versatic ester", solids: 50.5, visc: "30-50", ph: "4-6", mfft: 14, desc: "Wandfarben, Verputze und Mörtel; gute Alkali- und Wetterbeständigkeit." },
  { id: "VV 2182", comonomer: "vinyl versatic ester", solids: 52, visc: "90-110", ph: "4-6", mfft: 12, desc: "Wandfarben, Verputze und Mörtel; hohe Pigmentbindungseigenschaften und gute Alkalibeständigkeit." },
];

export const NEBOPLAST_ACRYLIC = [
  { id: "HMB 6530", type: "acrylic copolymer", solids: 40, visc: "0-5", ph: "6.5-8.5", mfft: 40, desc: "Hydroxyfunktionelle Dispersion für 1- und 2K-Holzlacke, APE-frei." },
  { id: "MB 6537", type: "acrylic copolymer", solids: 40, visc: "0-5", ph: "7-9", mfft: 33, desc: "Bindemittel für klare und pigmentierte Dekorbeschichtungen mit exzellenter Chemikalienbeständigkeit. Besonders für hochwertige Möbellasuren und -lacke." },
  { id: "MB 6557", type: "acrylic copolymer", solids: 45, visc: "0-10", ph: "7-9", mfft: 8, desc: "Bindemittel für Lasuren und Lacke mit guter Dosen- und Nassfilmklarheit und exzellenter Haltbarkeit." },
  { id: "MB 8350", type: "acrylic copolymer", solids: 47, visc: "0-35", ph: "7-9", mfft: 18, desc: "Bindemittel für Innen- und Außen-Dekorprimer und -Finishes. Exzellente Nasshaftung." },
  { id: "MB 8353", type: "acrylic copolymer", solids: 49, visc: "0-15", ph: "7-9", mfft: 20, desc: "Hochwertiges Bindemittel für Dekorbeschichtungen. Exzellente Nasshaftung, gute Blockfestigkeit." },
  { id: "MB 8555", type: "acrylic copolymer", solids: 47, visc: "0-20", ph: "7-9", mfft: 8, desc: "Spitzenbindemittel für Wandfarbenanwendungen, alkylphenolethoxylatfrei." },
  { id: "MB 8565", type: "acrylic copolymer", solids: 50, visc: "0-20", ph: "6-7", mfft: 0, desc: "Bindemittel besonders geeignet für die Formulierung hochwertiger 'lösemittelfreier' In- und Outdoor-Wandfarben." },
  { id: "MB 8658", type: "acrylic copolymer", solids: 50, visc: "0-30", ph: "7-8", mfft: 5, desc: "Niedrig-VOC-Dekorprimer und -Finishes. Exzellente Nasshaftung." },
  { id: "MB 8747", type: "acrylic copolymer", solids: 50, visc: "0-25", ph: "7-8.5", mfft: 20, desc: "Exzellentes Bindemittel für die Formulierung hochwertiger In- und Outdoor-Lacke und Lasuren." },
  { id: "MB 8756", type: "acrylic copolymer", solids: 48, visc: "0-20", ph: "7-9", mfft: 4, desc: "Dispersion für flexible Beschichtungen und Verputze. Exzellente Wasserweißungsresistenz." },
  { id: "MB 8861", type: "acrylic copolymer", solids: 35, visc: "0-5", ph: "7-8", mfft: 0, desc: "Dispersion mit kleiner Partikelgröße, geeignet für wasserbasierte Imprägnierungen für poröse Substrate." },
];

export const NEBOPLAST_STYRENEACRYLIC = [
  { id: "SB 6515", type: "styrene-acrylic copolymer", solids: 40, visc: "0-3", ph: "6.5-8", mfft: 63, desc: "Dispersion für hochwertige Holz- und Parkettlacke." },
  { id: "SB 6527", type: "styrene-acrylic copolymer", solids: 42, visc: "0-3", ph: "7-9", mfft: 43, desc: "Exzellente Dispersion für Korrosionsschutz-Primer." },
  { id: "SB 8737", type: "styrene-acrylic copolymer", solids: 50, visc: "<30", ph: "7-9", mfft: 39, desc: "Dispersion für Holz- und Bodenbeschichtungen." },
  { id: "SB 8750", type: "styrene-acrylic copolymer", solids: 50, visc: "15-60", ph: "7-8", mfft: 14, desc: "Hydrophobe Dispersion mit sehr niedriger Wasserweißung und hoher Alkalibeständigkeit. Geeignet für hochwertige allgemeine Dispersionsfarben und Verputze." },
  { id: "SB 8757", type: "styrene-acrylic copolymer", solids: 50, visc: "10-60", ph: "7-9", mfft: 0, desc: "Hydrophobe Dispersion für In- und Outdoor-Beschichtungen, für Dichtstoffe, Klebstoffe und rissüberbrückende Systeme. Frei von Aminen und Weichmachern." },
  { id: "SB 8765", type: "styrene-acrylic copolymer", solids: 50, visc: "15-60", ph: "7-8", mfft: 1, desc: "Flexible hydrophobe Dispersion für In- und Outdoor-Beschichtungen, für Dichtstoffe, Klebstoffe und rissüberbrückende Systeme." },
  { id: "SB 8860", type: "styrene-acrylic copolymer", solids: 35, visc: "0-5", ph: "7-8", mfft: 0, desc: "Dispersion mit kleiner Partikelgröße, geeignet für wasserbasierte Imprägnierungen für poröse Substrate." },
];

export const NEBOPLAST_PU = [
  { id: "PCU 6401", type: "aliphatic", solids: 35, visc: "0-5", ph: "7-9", mfft: 40, desc: "Lösemittelfreies Bindemittel für hochwertige wasserbasierte 2K-Boden- und Möbellacke." },
  { id: "PEU 3500", type: "aliphatic", solids: 35, visc: "0-5", ph: "7-9", mfft: 45, desc: "Lösemittelfreies Bindemittel für Boden- und Möbellacke mit exzellenten Gesamteigenschaften." },
  { id: "PEU 4008", type: "aliphatic", solids: 33, visc: "0-3", ph: "7-9", mfft: 0, desc: "Exzellentes Bindemittel für Holz-, Kunststoff- und Metallbeschichtungen. NMP-frei." },
  { id: "PEU 6353", type: "aliphatic", solids: 35, visc: "0-5", ph: "7-9", mfft: 0, desc: "Lösemittelfreies Bindemittel für Boden- und Möbellacke mit exzellenten Gesamteigenschaften. Für sehr niedrige VOC-Beschichtungen." },
  { id: "PHU 6051", type: "aliphatic", solids: 38, visc: "0-5", ph: "7-9", mfft: 5, desc: "Lösemittelfreies Bindemittel für Parkett- und Korklacke und Holzbeschichtungen." },
  { id: "PUA 6001", type: "fatty acid modified", solids: 45, visc: "2-7", ph: "7-9", mfft: 15, desc: "Hochwertiges Bindemittel für Niedrig-VOC-Beschichtungen mit hohem Glanz." },
];

export const NEBORES_NEBOPLAST_ADDITIVES = [
  { id: "NEBORES EH WAD HARDENER", type: "polyamide-epoxy adduct", solids: 47, solvent: "Xylol/Isobutanol", desc: "Härter für Epoxidharze, Wartungsbeschichtungen und Allzweck-Primer." },
  { id: "NEBOFLOW 80 X", type: "silikonfreies Verlaufs- und Nivellierungsadditiv", solids: 80, solvent: "Xylol", desc: "Verbesserung des Oberflächenerscheinungsbilds von Lacken." },
  { id: "NEBOPLAST AC 3000", type: "wässrige Copolymerdispersion", solids: 29, solvent: "Wasser", desc: "Rheologie-Modifikation in wässrigen Systemen." },
  { id: "NEBORES HPA 60-80 BA", type: "hydroxyfunktionelles Polyesterharz", solids: 80, solvent: "Butylacetat", desc: "High-Solid 2K-Beschichtungen mit exzellenter Chemikalien- und Wetterbeständigkeit. OH-Gehalt 4,7% in Lieferform." },
  { id: "NEBORES HPE 26-100", type: "hydroxyfunktionelles Polyesterharz", solids: 100, solvent: "—", desc: "2K-Beschichtungen mit Tieftemperaturflexibilität und guter Wetterbeständigkeit. Zur Flexibilitätsverbesserung von Acrylharz-Systemen." },
  { id: "NEBORES HPE 34-70 X", type: "hydroxyfunktionelles Polyesterharz", solids: 70, solvent: "Xylol", desc: "Für nicht-vergilbende Einbrennlacke und Coil Coatings." },
  { id: "NEBORES HPE 44-50 WPB", type: "hydroxyfunktionelles Polyesterharz", solids: 50, solvent: "Wasser/PnB", desc: "Nicht vergilbend, universelle Haftung, außenbeständig. Härtet mit Isocyanat- und Melaminhärtern. Für 2K-Industrielacke und Einbrennlacke." },
  { id: "NEBORES Epoxy Ester OS 75", type: "aminhärtbarer Epoxyester", solids: 75, solvent: "Xylol", desc: "Elastische 2K-Epoxidbeschichtungen." },
  { id: "NEBOPLAST DA 30", type: "Dispergiermittel", solids: 30, solvent: "Wasser", desc: "Dispergierung anorganischer Pigmente und Füllstoffe in wässrigen Systemen." },
];

export const NECARBO_CATEGORY_TYPAPPS = {
  longOil: "Außenanstriche, Yacht-/Marinelacke, langsam trocknende Dekorlacke mit guter Witterungsbeständigkeit",
  mediumOil: "Korrosionsschutz-Primer, Heizkörperlacke, schnell trocknende Industrielacke",
  shortOil: "Nitrocelluloselacke, 2K-Decklacke, Industrielacke, Spachtelmassen",
  modified: "Wasserbasierte Industrielacke, Korrosionsschutz-Primer, Parkettlacke, Zinkstaub-Primer",
  thermoplasticAcrylic: "Autoreparaturlacke, Aerosollacke, Metall-/Mineralbeschichtungen, Straßenmarkierungsfarben",
  hydroxyAcrylic: "2K-Polyurethan-Industrielacke, Autoreparaturlacke, Korrosionsschutz-Primer, Möbel-/Kunststofflacke",
  pvacHomo: "Holzleime, Textil-/Teppichimprägnierung, Briefumschlagklebstoffe, Papier-/Kartonklebstoffe",
  pvacCo: "Wandfarben, Verputze, Mörtel (gute Alkali-/Wetterbeständigkeit)",
  acrylic: "Möbellasuren, Wandfarben, Dekorprimer, Holzlacke (wasserbasiert)",
  styreneAcrylic: "Holz-/Parkettlacke, Korrosionsschutz-Primer, Dichtstoffe und rissüberbrückende Systeme",
  pu: "Hochwertige Boden- und Möbellacke (wasserbasiert, lösemittelfrei), Holz-/Kunststoff-/Metallbeschichtungen",
};