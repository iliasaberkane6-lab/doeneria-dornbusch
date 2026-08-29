# SXO-Analyse: Döneria Dornbusch
URL: https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
Datum: 2026-07-30 · Keywords: "döner frankfurt dornbusch", "döneria dornbusch speisekarte preise"

**SXO Gap Score: 74/100** (vorher 61/100 im ersten Audit)
Hinweis: separat vom technischen SEO-Health-Score zu lesen.

---

## 1. SERP-Landschaft

Die SERP für beide Keywords wird fast vollständig von **Aggregatoren** belegt:

| Keyword | Aggregatoren | Lieferplattformen | Eigene Restaurant-Domains |
|---|---|---|---|
| döner frankfurt dornbusch | 5 (RestaurantGuru, Yelp, speisekarte.de ×2, werkenntdenbesten) | 1 (Wolt) | 0 |
| döneria dornbusch speisekarte preise | 7 (speisekarte.de, RestaurantGuru ×2, speisen.com, haco, fuudtaim, eatura) | 1 (Uber Eats) | 1 (dornbuschkebaphaus.de) |

**Konsens-Seitentyp:** Directory/Listing (>70%) — aber das ist ein *Vakuum-Effekt*, kein Nutzerwunsch: Aggregatoren füllen die Lücke, weil der Laden bisher keine eigene Website hat.

**Entscheidender Beleg:** `dornbuschkebaphaus.de` — der direkte Konkurrent 900 m weiter — rankt mit eigener Domain in dieser SERP. Eine offizielle Restaurant-Website ist hier also rankingfähig.

## 2. Page-Type-Alignment

- **Unser Seitentyp:** Local Business Page (offizielle Restaurant-Website)
- **SERP-Konsens:** Directory/Aggregator
- **Verdikt: KEIN echter Mismatch.** Bei Brand- und Speisekarten-Queries bevorzugt Google die offizielle Quelle. Der Seitentyp ist korrekt; es fehlt ausschließlich **Domain-Autorität**.
- **Blocker:** github.io-Staging-URL, keine Verknüpfung im Google Business Profile.

### Konkurrenz-Benchmark (dornbuschkebaphaus.de)

| Kriterium | Konkurrent | Döneria (unsere Seite) |
|---|---|---|
| Speisekarte im HTML | Nein, nur 4 Beispielmenüs | **Ja, alle 49 Positionen + Nummern** |
| Bewertungen auf der Seite | Keine | **4,6 ★ + 3 echte Zitate, verlinkt** |
| Bestell-/Aktions-Buttons | Kaputt (`javascript:void`) | **Funktionierend (tel:, Maps)** |
| Strukturierte Daten | — | **Restaurant + hasMenu (26 Items) + geo** |
| Öffnungsstatus | Statische Zeiten | **Live berechnet** |
| Eigene Domain | **Ja** | Nein (einziger echter Nachteil) |

Inhaltlich sind wir dem rankenden Konkurrenten in jeder Dimension überlegen — außer bei der Domain.

## 3. User Stories (aus SERP-Signalen)

1. **Preis-Prüfer** — *Signal: eigenes Keyword „speisekarte preise", 7 Aggregatoren dazu*
   Als jemand mit knappem Budget will ich vorab wissen, was ein Döner kostet, weil ich nicht im Laden überrascht werden will. Blockiert werde ich von widersprüchlichen Aggregator-Angaben („1–10 €" vs. „10–20 €").

2. **Hungriger in der Nähe** — *Signal: Local-Intent-Keyword, Maps-Dominanz*
   Als Passant an der Eschersheimer will ich sofort wissen, ob offen ist und wie ich hinkomme, weil ich in 15 Minuten essen will.

3. **Vergleicher** — *Signal: werkenntdenbesten.de-Ranking, Yelp-Listen*
   Als Anwohner mit mehreren Dönerläden in Reichweite will ich wissen, welcher der beste ist, weil ich Enttäuschung vermeiden will. Blockiert: keine Auszeichnungen/Vergleichspunkte auf unserer Seite.

4. **Liefer-Sucher** — *Signal: Wolt + Uber Eats ranken für dieses Keyword*
   Als jemand zu Hause will ich bestellen, weil ich nicht rausgehen will. Blockiert: unklar, ob geliefert wird.

5. **Ortsfremder** — *Signal: Wikipedia-Ergebnisse zum Stadtteil in der SERP*
   Als Besucher/Pendler will ich wissen, wo genau das ist, weil ich mich in Dornbusch nicht auskenne.

## 4. Gap-Analyse (7 Dimensionen)

| Dimension | Score | Begründung |
|---|---|---|
| Page Type | 12/15 | Typ korrekt, aber Staging-URL ohne Autorität |
| Content Depth | 13/15 | 788 Wörter, 49 Gerichte, saubere H2/H3-Hierarchie; FAQ fehlt |
| UX Signals | 14/15 | Live-Status, Sticky-Bar mobil, 4 Tel-Links, 6 Maps-Links |
| Schema | 13/15 | Restaurant + hasMenu + geo + aggregateRating; Review-Schema fehlt |
| Media Richness | 9/15 | 5 Bilder, alle mit Alt, responsive WebP — aber KI-generiert, kein Video |
| Authority | 7/15 | Bewertungen verlinkt, aber keine Domain-Autorität, kein GBP-Link, keine Backlinks |
| Freshness | 6/10 | Öffnungsstatus dynamisch, aber kein sichtbares Aktualisierungsdatum |
| **Gesamt** | **74/100** | |

## 5. Persona-Scores

| Persona | Relevanz | Klarheit | Vertrauen | Aktion | Gesamt |
|---|---|---|---|---|---|
| Hungriger in der Nähe | 25 | 24 | 22 | 25 | **96** |
| Preis-Prüfer | 25 | 24 | 20 | 22 | **91** |
| Ortsfremder | 22 | 23 | 20 | 24 | **89** |
| Vergleicher | 18 | 20 | 20 | 18 | **76** |
| **Liefer-Sucher** | 8 | 10 | 15 | 5 | **38** |

**Schwächste Persona: Liefer-Sucher (38/100).**
Wichtige Einordnung: Laut Google-Business-Daten bietet der Laden **nur „Speisen vor Ort" und „Zum Mitnehmen"**, keine Lieferung. Die richtige Antwort ist deshalb *nicht*, einen Lieferbutton zu bauen, sondern den Abhol-Status **prominent klarzustellen**, damit dieser Nutzer keine Zeit verliert und nicht enttäuscht abspringt.

## 6. Priorisierte Maßnahmen

1. **Domain registrieren + im Google Business Profile als Website eintragen** — löst gleichzeitig den Page-Type-Blocker und die Authority-Lücke. Größter Einzelhebel, alles andere ist nachrangig.
2. **Abhol-Status prominent klarstellen** („Zum Mitnehmen und vor Ort, keine Lieferung") — hebt die schwächste Persona von 38 auf ~70.
3. **FAQ-Sektion** mit 4–5 echten Fragen (Halal? Lieferung? Vegetarisch? Parken?) + FAQPage-Schema — bedient Vergleicher und fängt Long-Tail-Suchen.
4. **Review-Schema** für die 3 echten Zitate ergänzen — Authority-Dimension.
5. **Echte Fotos** statt KI-Platzhalter — Media von 9 auf ~14.

## 7. Limitationen

- `scripts/render_page.py` hat den Seiteninhalt bei 503 Zeichen abgeschnitten (Skript-Bug); die Analyse basiert auf einem direkten Abruf der Live-Seite und eigenem BeautifulSoup-Parsing.
- Kein DataForSEO verfügbar → SERP-Daten aus WebSearch, daher **keine exakten Positionen**, kein Local-Pack- und kein PAA-Snapshot. Die Aggregator-Dominanz ist über zwei unabhängige Suchen konsistent belegt.
- Persona-Scores sind Experteneinschätzung auf Basis der SERP-Signale, keine gemessenen Nutzerdaten.
- Suchvolumen unbekannt (kein Keyword-Tool angebunden).
