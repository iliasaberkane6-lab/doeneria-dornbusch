# GEO Audit — Döneria Dornbusch
**URL:** https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
**Datum:** 2026-07-12

## GEO Readiness Score: 34/100

| Dimension | Gewicht | Score | Gewichtet |
|---|---|---|---|
| Citability | 25% | 25/100 | 6.3 |
| Structural Readability | 20% | 45/100 | 9.0 |
| Multi-Modal Content | 15% | 35/100 | 5.3 |
| Authority & Brand Signals | 20% | 15/100 | 3.0 |
| Technical Accessibility | 20% | 50/100 | 10.0 |
| **Gesamt** | | | **33.6 ≈ 34** |

Für einen lokalen Ein-Standort-Imbiss ist das schwach, aber der Grund ist konkret behebbar: die Speisekarte — der wichtigste zitierfähige Inhalt der Seite — existiert für KI-Crawler praktisch nicht.

---

## 1. AI-Crawler-Zugänglichkeit

**Kein `robots.txt` vorhanden** (404 sowohl auf Domain-Root `iliasaberkane6-lab.github.io/robots.txt` als auch auf `/doeneria-dornbusch/robots.txt`).

| Crawler | Status |
|---|---|
| GPTBot | ✅ nicht blockiert (Default-Allow, da keine robots.txt) |
| OAI-SearchBot | ✅ nicht blockiert |
| ClaudeBot | ✅ nicht blockiert |
| PerplexityBot | ✅ nicht blockiert |
| CCBot | ✅ nicht blockiert (auch für Training) |
| anthropic-ai | ✅ nicht blockiert |

Fehlende robots.txt ist hier **kein akutes Problem** (Default-Verhalten = Allow-All), aber auch keine bewusste Steuerung. Empfehlung: explizite robots.txt anlegen, die alle vier AI-Search-Crawler ausdrücklich erlaubt — schafft Klarheit und schützt vor versehentlichen künftigen Blockaden (z.B. durch generische WAF-Regeln bei Domain-Wechsel).

## 2. llms.txt

**Fehlt** (`/llms.txt` → 404). Für eine Ein-Seiten-Website mit überschaubarem Content ist das kein Muss, aber ein leichtgewichtiger llms.txt mit den Kern-Fakten (Adresse, Öffnungszeiten, Kontakt, Kategorien der Speisekarte, Halal-Hinweis) wäre ein Low-Effort-Win und würde als kanonische, garantiert crawlbare Zusammenfassung dienen — unabhängig vom JS-Problem unten.

Keine RSL-1.0-Lizenzierung vorhanden (nicht erwartbar für diese Seitenart, niedrige Priorität).

## 3. Kritischer Befund: Speisekarte ist client-seitig gerendert

Das ist der größte Hebel dieses Audits.

Im rohen HTML (`index.html`) ist `<div class="menu-grid reveal" id="menu-grid"></div>` **leer**. Alle Gerichte, Beschreibungen und Preise liegen als JavaScript-Objekt (`const MENU = {...}`) im `<script>`-Block und werden erst per `render("doener")` zur Laufzeit ins DOM geschrieben:

```js
const MENU = {
  doener: [
    {n:"Drehspieß Sandwich (Döner)", d:"Mit Salat und Soße", p:"7,50"},
    ...
```

Konsequenz: Ein Crawler, der kein JavaScript ausführt (viele AI-Retrieval-Systeme, inkl. eines Großteils der Indexer hinter ChatGPT/Perplexity-Websuche, arbeiten primär mit dem Rohmarkup oder gecachten Snapshots), sieht **keine einzige Speise, keinen einzigen Preis**. Nur die generische Kategorie-Tab-Beschriftung ("Döner & Dürüm", "Pizza" usw.) ist im HTML sichtbar. Zusätzlich steht im sichtbaren Text sogar fälschlich suggeriert "Preise laut Aushang" (Meta-Beschreibung/Fallback-Wahrnehmung), obwohl tatsächlich sehr genaue Preise vorhanden sind — nur eben unsichtbar für Nicht-JS-Clients.

Damit kann kein AI-Search-System ("Was kostet ein Döner bei Döneria Dornbusch?", "Gibt es dort vegetarische Optionen?", "Welche Pizzen gibt es im Dornbusch?") die Seite als Quelle zitieren, weil die Antwort im gecrawlten Content schlicht fehlt.

**Das ist der mit Abstand größte GEO-Hebel dieser Seite.**

## 4. Citability-Analyse (25% Gewicht, Score 25/100)

- **Passage-Länge:** Die Fließtext-Abschnitte (Hero, "Jeden Morgen frisch aufgesetzt", Dürüm/Falafel-Karten) liegen bei 15–40 Wörtern — deutlich unter dem Zieloptimum von 134–167 Wörtern für AI-Zitate. Kein Abschnitt liefert einen vollständigen, selbstständig zitierfähigen Absatz.
- **Direkte Antworten in den ersten 40–60 Wörtern:** Teilweise vorhanden (Kontaktblock ist direkt: Adresse, Telefon), aber die inhaltlich wertvollsten Fakten (Speisekarte mit Preisen) sind wie oben beschrieben gar nicht im Rohtext.
- **Fragebasierte Überschriften:** Keine. Alle H2/H3 sind Marketing-Slogans ("Jeden Morgen frisch aufgesetzt", "Nicht nur Döner") statt Frageform ("Was kostet ein Döner in Frankfurt-Dornbusch?", "Ist die Döneria Dornbusch halal?", "Wann hat die Döneria Dornbusch geöffnet?").
- **Statistiken mit Quellenangabe:** Google-Bewertung (4,6/5, 220+ Bewertungen) ist vorhanden und gut, aber ohne Verlinkung zur Quelle (Google-Maps-Profil) im sichtbaren Text — nur als generischer Maps-Link.
- **Self-contained Answer Blocks:** Kontaktblock (Adresse/Telefon/Öffnungszeiten) ist relativ selbstständig extrahierbar. Speisekarte ist es nicht (JS-Problem).

## 5. Strukturelle Readability (20%, Score 45/100)

Positiv:
- Sauberes Heading-Hierarchie-Grundgerüst (H1 → H2 → H3)
- Öffnungszeiten als `<table>` strukturiert (`hours-table`) — gut maschinenlesbar
- JSON-LD `Restaurant`-Schema vorhanden mit `openingHoursSpecification`, `address`, `aggregateRating`, `telephone`, `priceRange`, `servesCuisine`

Negativ:
- JSON-LD enthält **keine Menu-Struktur** (kein `hasMenu`/`Menu`/`MenuItem`/`MenuSection` Schema-Objekt) — das wäre der direkte Weg, die Speisekartendaten strukturiert UND crawlerfest bereitzustellen, unabhängig vom JS-Rendering-Problem
- Keine FAQ-Sektion / kein `FAQPage`-Schema
- Keine Frage-Überschriften
- Kein `MenuSection`/`Menu`-Property im Schema trotz vorhandenem `servesCuisine`

## 6. Multi-Modal Content (15%, Score 35/100)

- 4 Produktbilder mit guten, beschreibenden Alt-Texten (z.B. "Falafel-Teller mit Hummus und Pita") — solide Basis
- Keine Videos (kein YouTube-Embed, kein Kurzvideo vom Grill/Zubereitung)
- Keine Infografik/Bild-Menükarte als Ergänzung zu Text (wäre nützlich für multimodale AI-Systeme, die auch Bilder auswerten)
- `loading="lazy"` korrekt gesetzt für Below-the-fold-Bilder — gute technische Praxis, aber ohne GEO-Bezug

## 7. Authority & Brand-Signale (20%, Score 15/100 — größte Schwachstelle neben Citability)

| Signal | Status | Korrelation mit AI-Zitaten |
|---|---|---|
| YouTube-Erwähnungen | Keine gefunden | ~0.737 (stärkste) |
| Reddit-Präsenz | Keine gefunden | Hoch |
| Wikipedia-Entität | Keine (erwartbar für lokalen Imbiss) | Hoch |
| LinkedIn | Keine gefunden | — |
| Domain Rating / Backlinks | GitHub-Pages-Subpfad ohne eigene Domain, keine erkennbaren Backlinks | ~0.266 (schwach, aber vorhanden ist besser als nichts) |
| Google-Bewertungen | ✅ 4,6/5, 220+ Reviews, im JSON-LD als `aggregateRating` UND im UI sichtbar | Starkes lokales Trust-Signal, aber nicht in der o.g. Korrelationstabelle erfasst |

Kein Autor/Betreiber namentlich genannt, kein "Über uns"-Team-Content mit Personen, kein Veröffentlichungs-/Aktualisierungsdatum auf der Seite. Für ein Restaurant ist Autorenschaft weniger kritisch als für redaktionelle Inhalte, aber ein Google Business Profile-Link, Instagram/Facebook-Verlinkung und Erwähnungen in lokalen Frankfurt-Food-Verzeichnissen (die wiederum von LLMs als Trainings-/Retrieval-Quelle genutzt werden) fehlen komplett.

## 8. Technische Zugänglichkeit (20%, Score 50/100)

- Statisches HTML wird per GitHub Pages ausgeliefert (SSR-äquivalent für den Grundgerüst-Content) — gut für Crawling-Geschwindigkeit und -Zuverlässigkeit
- Aber: Kern-Business-Content (Speisekarte) ist CSR-only via Vanilla-JS — das größte technische Risiko, siehe Abschnitt 3
- Kein `sitemap.xml` gefunden
- Keine strukturierten Daten für Menu/Offer, obwohl Schema.org dies unterstützt (`Menu`, `MenuSection`, `MenuItem`, `Offer` mit `price`)
- HTTPS via GitHub Pages ✅
- Mobile-responsive (Media Queries vorhanden) ✅ — für Crawler irrelevant, aber für Nutzer-Signale relevant

---

## Top 5 High-Impact-Maßnahmen (priorisiert)

1. **Speisekarte serverseitig ins HTML rendern (statt nur via JS)** — Aufwand: mittel (30–60 Min). Größter Hebel. Entweder das `MENU`-Objekt beim Build in statisches HTML vorrendern (z.B. der Default-Tab "Döner & Dürüm" plus idealerweise alle Kategorien als ausgeblendete, aber im DOM vorhandene `<div>`s, die per JS nur visuell umgeschaltet werden — Inhalt bleibt für Crawler lesbar), oder ein serverseitiges Static-Site-Build-Script (Python/Node) einführen, das aus derselben Datenquelle sowohl das JS-Array als auch das initiale HTML generiert.

2. **Menu-Schema.org-Markup ergänzen** (`Menu`, `hasMenuSection`, `MenuItem`, `Offer` mit `price`/`priceCurrency`) im bestehenden JSON-LD-Block. Aufwand: gering (15–30 Min). Macht Preise und Gerichte maschinenlesbar unabhängig vom Rendering-Problem und ist der direkteste Weg zu Google AI Overviews / Perplexity-Zitaten für Preisanfragen.

3. **llms.txt anlegen** mit den Kernfakten (Adresse, Telefon, Öffnungszeiten, Speisekarten-Kategorien mit 2–3 Beispielpreisen, Halal-Hinweis, Bewertungsscore). Aufwand: gering (20 Min).

4. **Fragebasierte FAQ-Sektion hinzufügen** (z.B. "Was kostet ein Döner in der Döneria Dornbusch?", "Ist die Döneria Dornbusch halal?", "Wo befindet sich die Döneria Dornbusch?", "Wann hat die Döneria Dornbusch geöffnet?") mit 134–167 Wörter langen, selbstständig zitierfähigen Antwort-Absätzen plus `FAQPage`-Schema. Aufwand: mittel (1–2 Std inkl. Content-Formulierung).

5. **robots.txt anlegen** mit expliziter Allow-Regel für GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot (und optional Verweis auf Sitemap). Aufwand: sehr gering (5 Min). Kein akutes Problem, aber zukunftssicher und signalisiert bewusste AI-Search-Öffnung.

---

## Plattform-spezifische Einschätzung

| Plattform | Geschätzte Sichtbarkeit | Begründung |
|---|---|---|
| Google AI Overviews | Mittel | Profitiert von starkem lokalem Google-Bewertungssignal (4,6/220+) und JSON-LD-Grundgerüst, aber Preisfragen kann Google ohne Menu-Schema kaum direkt beantworten |
| ChatGPT (Search/Browsing) | Niedrig | Kein llms.txt, keine Menu-Daten im Rohmarkup, keine Brand-Erwähnungen außerhalb der eigenen Seite |
| Perplexity | Niedrig-Mittel | Ähnlich wie ChatGPT; profitiert leicht von sauberem Grundgerüst, aber fehlende Preisdaten und fehlende externe Erwähnungen (Reddit/YouTube) begrenzen Zitierfähigkeit |
| Bing Copilot | Mittel | Bing indexiert traditionell aggressiver inkl. JS-Rendering in manchen Fällen, daher potenziell etwas bessere Menu-Sichtbarkeit als bei reinen Text-Retrieval-Systemen, aber unsicher |

---

## Zusammenfassung

Die Seite hat eine solide technische Basis (sauberes HTML-Grundgerüst, korrektes Restaurant-JSON-LD, gute Alt-Texte, starkes Bewertungssignal), scheitert aber daran, dass der wertvollste zitierfähige Content — die komplette Speisekarte mit Preisen — für nicht-JS-ausführende KI-Crawler unsichtbar ist. Die Behebung von Punkt 1 (serverseitiges Rendern der Speisekarte) und Punkt 2 (Menu-Schema) allein würde den Citability-Score voraussichtlich von 25 auf 65–75 heben und damit den Gesamtscore signifikant verbessern.
