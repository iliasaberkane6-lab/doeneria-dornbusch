# Performance / Core Web Vitals Audit

**URL:** https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
**Datum:** 2026-07-12
**Methode:** Lighthouse 13.4.0 (mobile, lab data, `--preset=perf`, headless Chrome). PageSpeed Insights API war zum Zeitpunkt des Audits rate-limitiert (240 QPM / 25.000 QPD exceeded) und lieferte keine CrUX-Felddaten (Domain vermutlich auch zu wenig Traffic für CrUX → 28-Tage-Feld-Report nicht verfügbar). Lighthouse-Lab-Daten sind daher die einzige verfügbare Quelle; als Single-Run-Messung mit gewisser Varianz zu behandeln.

## Performance Score (Lab, Mobile)

**74 / 100** (Lighthouse Performance-Kategorie)

## Core Web Vitals Status

| Metrik | Lab-Wert (Lighthouse, mobil) | Schwellenwert "Good" | Status |
|---|---|---|---|
| **LCP** | 6,1 s | ≤2,5 s | ❌ **Poor** (>4,0 s) |
| **INP** | nicht direkt messbar im Single-Page-Lab-Run (kein simulierter User-Input); Proxy-Metriken: Total Blocking Time 0 ms, Max Potential FID 20 ms | ≤200 ms | ✅ voraussichtlich **Good** — Seite hat kein schweres JS (CSS-only Intro-Animation), TBT = 0 ms deutet auf keine langen Main-Thread-Tasks hin |
| **CLS** | 0,0004 | ≤0,1 | ✅ **Good** |

Da keine CrUX-Felddaten (75th-Percentile-Realnutzerdaten) verfügbar sind, ist der offizielle Google-Bewertungsmaßstab (75. Perzentil über 28 Tage) hier nicht abbildbar. Die Lab-Werte sind ein Single-Run-Schnappschuss unter simulierten Mid-Tier-Mobile-Bedingungen (Moto G Power / gedrosseltes 4G) und tendenziell konservativ/pessimistisch gegenüber echten Nutzerbedingungen, aber der LCP-Ausreißer ist strukturell bedingt und wird sich real ähnlich zeigen.

**Gesamtbewertung: LCP fällt klar durch (Poor), INP voraussichtlich gut, CLS gut.** Der Audit besteht damit NICHT alle drei Core Web Vitals im "Good"-Bereich — LCP ist der blockierende Faktor.

## LCP-Breakdown (Lighthouse `lcp-breakdown-insight`)

LCP-Element: `body.intro-finished > header.hero > div.hero-img > img` (`assets/hero.jpg`, `fetchpriority="high"`)

| Phase | Dauer |
|---|---|
| Time to First Byte | 115 ms |
| Resource Load Delay | 642 ms |
| **Resource Load Duration** | **5.307 ms** |
| Element Render Delay | 33 ms |
| **Gesamt** | **6.097 ms** |

→ Über 87 % der LCP-Zeit entfallen auf die **Download-Dauer des Hero-Bilds selbst** — nicht auf Serverantwort oder Render-Delay. Das ist der zentrale Hebel.

## Bottlenecks (priorisiert nach Impact)

### 1. Hero-Bild zu groß und falsch dimensioniert (kritisch, größter Hebel)
- `hero.jpg`: **408 KB**, unkomprimiertes JPEG, kein AVIF/WebP.
- Zusätzlich zeigt Lighthouse bei den drei anderen Bildern extreme Übergrößen relativ zur Anzeigefläche:
  - `falafel.jpg`: 598 KB geladen, angezeigt bei 634×477px, aber **Originalauflösung 1920×1165** → 516 KB allein durch fehlendes Responsive-Sizing verschwendet, weitere 225 KB durch fehlendes modernes Format. Geschätzte Ersparnis: **547 KB (91 %)**.
  - `dueruem.jpg`: 549 KB, geschätzte Ersparnis 499 KB (91 %).
  - `grill.jpg`: 535 KB, geschätzte Ersparnis 446 KB (83 %).
  - `hero.jpg`: 409 KB, geschätzte Ersparnis 338 KB (83 %).
- **Gesamt verschwendetes Bild-Volumen: ~1,8 MB** von insgesamt ~2,1 MB Bild-Payload — die vier Bilder sind der dominante Performance-Kostenfaktor der Seite.
- fetchpriority="high" ist korrekt gesetzt und das Bild ist im initialen Dokument discoverable (kein Preload nötig für Discovery) — das Problem ist rein die Dateigröße, nicht die Priorisierung.

**Empfehlung (höchste Priorität):**
- Alle 4 JPEGs zu **WebP oder AVIF** konvertieren (Qualität ~75-80) → typisch 60-80 % kleiner bei gleicher visueller Qualität.
- **Responsive Images** mit `srcset`/`sizes` einführen, damit auf Mobile nicht die volle 1920px-Desktop-Auflösung geladen wird (die Bilder sind für Displaybreiten von 362-634px bestimmt, aber in 1920px-Originalgröße ausgeliefert).
- Ziel: Hero-Bild auf **<80-100 KB** drücken (aktuell 409 KB), die drei Content-Bilder je auf **<60-100 KB** (aktuell 535-598 KB).
- Erwarteter Effekt: LCP-Reduktion von aktuell 6,1 s auf voraussichtlich **1,5-2,5 s** (Resource Load Duration skaliert nahezu linear mit Dateigröße), da TTFB und Render-Delay bereits minimal sind.

### 2. Render-blockierendes `fonts.css` + 5 Font-Dateien im kritischen Pfad
- `fonts.css` (588 B) wird synchron im `<head>` geladen (`render-blocking-insight`, Score 0,5) und referenziert **5 separate woff2-Dateien** (je ~20-23 KB, insgesamt ~110 KB), die laut Dependency-Tree seriell/parallel nach dem CSS geladen werden (bis zu 4,6 s `navStartToEndTime` für einzelne Font-Requests im gedrosselten Lab-Test).
- Das verlängert zwar nicht direkt den LCP (Bild ist LCP-Element, kein Text), belastet aber Ladezeit/Bandbreite parallel zum Hero-Bild und verzögert FCP (aktuell 2,3 s).

**Empfehlung:**
- `<link rel="preload" as="style">` für `fonts.css` vermeiden, stattdessen direkt `font-display: swap` in den `@font-face`-Regeln sicherstellen (laut Audit bereits ok, `font-display-insight` Score 1 — keine Wartezeit durch FOIT gemessen).
- Falls nicht alle 5 Font-Gewichte/Styles tatsächlich genutzt werden: unnötige Varianten entfernen, um Bandbreite zu sparen.
- Erwägen, `fonts.css` zu inlinen oder die `@font-face`-Deklarationen direkt im Haupt-CSS zu platzieren, um einen zusätzlichen Render-Blocking-Request zu vermeiden.

### 3. Fehlendes `loading="lazy"` beim Hero-Bild ist korrekt so — kein Fix nötig
- Der Prompt erwähnt "kein lazy-loading beim Hero" als Beobachtung — das ist **richtig konfiguriert**, nicht falsch: Das LCP-Bild darf niemals `loading="lazy"` haben, da es sonst discoverable-Verzögerung erzeugt. Lighthouse bestätigt das explizit (`lcp-discovery-insight`, Score 1, `eagerlyLoaded: true`). Die anderen 3 Bilder haben korrekt `loading="lazy"`. Dieser Teil der Bild-Strategie ist bereits Best Practice — der Handlungsbedarf liegt ausschließlich bei Dateigröße/Format/Dimensionierung (siehe Punkt 1).

### 4. DOM-Größe und Main-Thread-Last unauffällig (kein Handlungsbedarf)
- 190 DOM-Elemente, max. Tiefe 9, max. 12 Kindelemente — weit unter dem 1.500-Element-Schwellenwert.
- Total Blocking Time 0 ms, Max Potential FID 20 ms — das CSS-only Intro (keyframe-Animationen, kein schweres JS) belastet den Main Thread nicht messbar. **INP wird dadurch voraussichtlich problemlos im "Good"-Bereich bleiben.**

## Priorisierte Maßnahmenliste (Impact-sortiert)

| Prio | Maßnahme | Erwarteter Effekt |
|---|---|---|
| 1 | Alle 4 Bilder zu WebP/AVIF konvertieren + korrekt dimensionieren (`srcset`/`sizes`, keine 1920px-Originale auf Mobile) | LCP 6,1 s → ~1,5-2,5 s; Gesamt-Payload -1,8 MB |
| 2 | Hero-Bild zusätzlich speziell für Above-the-fold-Viewport optimieren (z. B. max. 800-1000px Breite, ~70-100 KB) | Größter Einzelhebel für LCP |
| 3 | Font-Requests reduzieren/prüfen ob alle 5 Varianten nötig sind; `fonts.css` ggf. inlinen | Schnellerer FCP, weniger Render-Blocking |
| 4 | Nach Umsetzung: PageSpeed Insights erneut mit CrUX-Felddaten prüfen, sobald Traffic für Feldbericht ausreicht | Validierung gegen echte Nutzerdaten (75. Perzentil) |

## Rohdaten (Referenz)

- Lighthouse Performance Score: 74/100 (mobil, Lab)
- LCP: 6.096,5 ms (Element: `img.assets/hero.jpg`)
- CLS: 0,00037
- TBT: 0 ms
- FCP: 2.313 ms
- Speed Index: 3.729 ms
- Server Response Time (TTFB Root-Dokument): 21 ms — kein Problem
- DOM-Elemente gesamt: 190
- Bild-Payload gesamt: ~2,09 MB (hero.jpg 409 KB, falafel.jpg 598 KB, dueruem.jpg 549 KB, grill.jpg 535 KB)
- Geschätzte Bild-Einsparung durch Format+Sizing-Fix: ~1,83 MB (~88 %)

## JSON-Struktur für audit-data.json

```json
{
  "category": "performance",
  "url": "https://iliasaberkane6-lab.github.io/doeneria-dornbusch/",
  "audit_date": "2026-07-12",
  "data_source": "lighthouse_lab_only",
  "psi_field_data_available": false,
  "psi_error": "PSI rate limit exceeded (240 QPM / 25,000 QPD)",
  "lighthouse_performance_score": 74,
  "core_web_vitals": {
    "lcp": { "value_ms": 6096.5, "status": "poor", "threshold_good_ms": 2500, "source": "lab" },
    "inp": { "value_ms": null, "status": "likely_good", "proxy_tbt_ms": 0, "proxy_max_potential_fid_ms": 20, "source": "lab_proxy" },
    "cls": { "value": 0.00037, "status": "good", "threshold_good": 0.1, "source": "lab" }
  },
  "bottlenecks": [
    {
      "id": "hero-image-oversized",
      "severity": "critical",
      "description": "hero.jpg is 409KB JPEG, no modern format, accounts for 5307ms of 6097ms LCP (87%)",
      "estimated_savings_bytes": 337645
    },
    {
      "id": "content-images-oversized-and-unresponsive",
      "severity": "high",
      "description": "falafel.jpg, dueruem.jpg, grill.jpg each 535-598KB, served at native 1920px resolution despite max ~634px display width, no WebP/AVIF",
      "estimated_savings_bytes": 1491108
    },
    {
      "id": "render-blocking-fonts-css",
      "severity": "medium",
      "description": "fonts.css blocks render and references 5 separate woff2 files (~110KB total)",
      "estimated_savings_bytes": null
    }
  ],
  "recommendations_priority": [
    "Convert all 4 JPEGs to WebP/AVIF with responsive srcset/sizes",
    "Resize hero and content images to actual display dimensions",
    "Reduce/inline font-face declarations to cut render-blocking request",
    "Re-validate with CrUX field data once sufficient traffic accrues"
  ]
}
```
