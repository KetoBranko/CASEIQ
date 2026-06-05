# Safic-Alcan CASE Sales Tool

Standalone React-App für technischen Sales-Support.

## Features
- Produktdatenbank (47 Produkte, filterbar, durchsuchbar)
- Interaktiver Gesprächsführer (Wenn-Dann-Logik)
- KI-Kundenanalyse mit direkter Anthropic API-Anbindung
- Wahrscheinlichkeits-Ampel pro Produkt
- PDF-Export pro Kundenanalyse
- Mobile-first Design

## Setup (5 Minuten)

### 1. Node.js installieren
https://nodejs.org (LTS Version)

### 2. Abhängigkeiten installieren
```
npm install
```

### 3. Lokal starten
```
npm run dev
```
→ öffnet http://localhost:5173

### 4. Auf Vercel deployen (kostenlos)
```
npm install -g vercel
vercel
```
→ Folge den Anweisungen, nach 1-2 Minuten live unter deiner Vercel-URL

## API Key
Für die KI-Kundenanalyse wird ein Anthropic API Key benötigt:
1. Account anlegen: https://console.anthropic.com
2. API Key erstellen unter "API Keys"
3. Im Tool unter "Kundenrecherche" → API Key einrichten

Kosten: ca. 1-3 Cent pro Analyse

## Projektstruktur
```
src/
  data/
    products.js    → 47 Produkte mit allen Details
    qa.js          → Gesprächsführer-Entscheidungsbaum
  components/
    ProductDB      → Produktdatenbank mit Suche/Filter
    QAGuide        → Interaktiver Gesprächsführer
    CustomerAnalysis → KI-Analyse + PDF-Export
    ProductModal   → Produktdetail-Overlay
  App.jsx          → Navigation und Layout
```

## Produkte erweitern
Neue Produkte in `src/data/products.js` am Ende des PRODUCTS-Arrays eintragen.
