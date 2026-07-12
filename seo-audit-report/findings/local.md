# Local SEO Audit — Döneria Dornbusch

**URL geprüft:** https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
**Datum:** 2026-07-12
**Geschäftsangaben (Vorgabe):** Eschersheimer Landstraße 322, 60320 Frankfurt am Main · Tel. 069 96865511 · U-Bahn Fritz-Tarnow-Straße direkt vor der Tür

---

## Local SEO Score: 38 / 100

| Dimension | Gewicht | Score | Gewichtet |
|---|---|---|---|
| GBP Signals | 25% | 15/100 | 3.8 |
| Reviews & Reputation | 20% | 40/100 | 8.0 |
| Local On-Page SEO | 20% | 75/100 | 15.0 |
| NAP-Konsistenz & Zitate | 15% | 30/100 | 4.5 |
| Local Schema Markup | 10% | 55/100 | 5.5 |
| Local Link & Authority | 10% | 10/100 | 1.0 |
| **Gesamt** | | | **37.8 ≈ 38** |

Der Score ist strukturell gedeckelt, weil **noch kein Google Business Profile verknüpft** ist und die Seite auf einer **github.io-Subdomain statt eigener Domain** läuft — beides sind Vorbedingungen, nicht nachträglich per On-Page-Fix lösbar.

---

## 1. Business Type: Brick-and-Mortar (eindeutig)

Signale: sichtbare Straßenadresse im Footer/Kontakt-Bereich, direkter Google-Maps-Link ("In Google Maps öffnen"), Öffnungszeiten-Tabelle, ÖPNV-Hinweis (U-Bahn vor der Tür), Sitzplätze drinnen/draußen erwähnt. Kein Service-Area-Sprachgebrauch ("wir kommen zu Ihnen") vorhanden — korrekt für einen Imbiss mit Vor-Ort-Konsum.

## 2. Industry Vertical: Restaurant / Imbiss (Döner)

Signale: `/#speisekarte`-Sektion mit vollständiger Preisliste, `servesCuisine` im Schema, Halal-Hinweis, Tagesmenüs. Korrekter Schema-Typ `Restaurant` wird bereits verwendet (nicht generisches `LocalBusiness`) — das ist richtig.

**Branchenspezifisches Risiko:** Die komplette Speisekarte wird ausschließlich per JavaScript aus einem JS-Array (`MENU {...}`) ins DOM gerendert (`render("doener")` beim Laden). Es gibt **keine serverseitige/statische HTML-Fallback-Variante** der Menüpunkte. Google rendert JS in der Regel zuverlässig, aber das ist ein unnötiges Risiko für den wichtigsten Inhaltstyp einer Restaurant-Seite — und macht die Menü-Texte für einfache Crawler/Aggregatoren (Yelp-Import, ChatGPT-Browsing, etc.) unsichtbar ohne JS-Ausführung.

## 3. NAP-Konsistenz (innerhalb der Seite)

| Quelle | Name | Adresse | Telefon |
|---|---|---|---|
| Sichtbares HTML (Kontakt-Sektion) | Döneria Dornbusch | Eschersheimer Landstraße 322, 60320 Frankfurt am Main | 069 96865511 |
| `tel:`-Link | — | — | +496996865511 |
| JSON-LD Schema | Döneria Dornbusch | Eschersheimer Landstraße 322, 60320, Frankfurt am Main, DE | +49 69 96865511 |
| Meta-Description / OG-Tags | Döneria Dornbusch | Eschersheimer Landstraße 322 erwähnt | — |

**Befund: intern konsistent, keine Diskrepanzen.** Das ist die einzig saubere Grundlage — aber sie ist bislang **nirgendwo extern dupliziert**, d.h. es existiert noch kein Vergleichspunkt (GBP, Yelp, Facebook), gegen den echte NAP-Konsistenz geprüft werden könnte. Das eigentliche NAP-Risiko entsteht erst, sobald GBP angelegt wird — dort muss exakt diese Schreibweise übernommen werden (inkl. Telefonformat, "Frankfurt am Main" vs. "Frankfurt").

**Kritischer Blocker:** Website läuft auf `iliasaberkane6-lab.github.io/doeneria-dornbusch/` statt einer eigenen Domain. Das `url`-Property fehlt im Schema komplett, und die GBP-Website-Verlinkung kann aktuell nur auf eine nicht-kanonische, technisch fremde Domain zeigen. Das schadet Trust-Signalen und ist für ein lokales Geschäft ungewöhnlich (wirkt nicht wie eine offizielle Firmenseite).

## 4. Local Schema Markup — Restaurant

```json
{
  "@type": "Restaurant",
  "name", "servesCuisine", "telephone", "address" (PostalAddress),
  "aggregateRating", "openingHoursSpecification", "priceRange"
}
```

**Vorhanden (korrekt):**
- ✅ Richtiger Subtyp `Restaurant` (nicht generisches `LocalBusiness`)
- ✅ `name`, `address` (Pflichtfelder)
- ✅ `telephone`, `openingHoursSpecification`, `priceRange` (empfohlen)
- ✅ `aggregateRating` mit `ratingValue`/`reviewCount`
- ✅ `servesCuisine`

**Fehlt (empfohlen für Restaurant-Vertical):**
- ❌ `geo` (GeoCoordinates, 5 Dezimalstellen) — komplett fehlend, kein Lat/Lng
- ❌ `url` — kein kanonischer URL-Verweis im Schema
- ❌ `image` — kein `image`-Property (nur CSS-Hintergrundbild, nicht strukturiert)
- ❌ `hasMenu` / `Menu`/`MenuSection`/`MenuItem` — trotz vollständiger, strukturierter Preisdaten im JS-Array wird kein Menu-Schema generiert. **Größte Lücke** für Restaurant-Rich-Results (Menü-Snippets in der SERP).
- ❌ `sameAs` — keine Verlinkung zu GBP/Social-Profilen (weil noch keine existieren)
- ❌ `addressRegion` fehlt in `PostalAddress` (Hessen)
- ❌ Individuelle `Review`-Objekte fehlen — nur aggregiert, keine einzelnen `author`/`reviewRating`/`reviewBody` trotz drei sichtbarer Testimonial-Zitate auf der Seite (leicht nachrüstbar, 1:1-Abgleich mit sichtbarem Text)
- ⚠️ `aggregateRating` (4.6, 226 Bewertungen) ist aktuell **hartcodierter Platzhalter**, nicht mit echtem GBP verknüpft — sobald GBP live ist, muss dieser Wert synchron gehalten werden oder komplett entfernt werden bis reale Daten vorliegen (sonst Risiko: Schema-Daten stimmen nicht mit echten Google-Bewertungen überein → Rich-Result-Manipulationsverdacht durch Google).

## 5. GBP-Signale auf der Seite

| Signal | Status |
|---|---|
| Google Maps Embed (iframe) | ❌ Fehlt — nur Textlink zu `maps.google.com/?q=...` (Such-Query, kein Place-ID-Link) |
| Place-ID-Referenz | ❌ Nicht vorhanden |
| Live-Review-Widget | ❌ Nur statische, hartcodierte 3 Zitate |
| GBP-Post-Indikatoren | ❌ Nicht vorhanden (Profil existiert noch nicht) |
| Foto-Nachweis | ⚠️ Eigene Asset-Bilder vorhanden (hero.jpg, grill.jpg etc.), aber keine Verbindung zu GBP-Fotoalbum |
| "In Google Maps öffnen"-CTA | ✅ Vorhanden, aber Query-basiert statt Place-ID — sollte nach GBP-Verifizierung durch den echten Place-Link ersetzt werden |

**Hauptbefund:** Da noch **kein Google Business Profile verknüpft** ist, fehlt der mit Abstand wichtigste lokale Rankingfaktor überhaupt (Whitespark 2026: primäre GBP-Kategorie = Faktor #1, Score 193). Ohne GBP-Eintrag ist eine Platzierung im Local Pack faktisch ausgeschlossen — das dominiert den Score in dieser Dimension.

## 6. Review-Health (Snapshot)

- Angezeigte Werte: **4,6 / 5 Sterne, "über 220" Google-Bewertungen** (Strip-Banner, Review-Sektion, Meta-Description, JSON-LD)
- Diese Zahlen sind **nicht live/verifizierbar** — es gibt keine GBP-Verknüpfung, kein Review-Widget mit echter API-Anbindung. Vermutlich Platzhalter/Zielwerte.
- Drei Testimonial-Zitate vorhanden (Melih K., Annika R., Jonas W.) — plausibel formuliert, aber ebenfalls nicht mit strukturierten `Review`-Objekten hinterlegt.
- **Review-Velocity (18-Tage-Regel):** nicht bewertbar, da keine echte Historie existiert (Profil noch nicht angelegt).
- Response-Rate: nicht bewertbar (kein GBP).

**Empfehlung:** Sobald GBP live ist, `aggregateRating` im Schema mit echten Werten synchron halten oder bis dahin ganz entfernen — hartcodierte, nicht überprüfbare Bewertungszahlen sind ein Reputationsrisiko, sobald Nutzer die echten (anfangs niedrigeren) GBP-Zahlen sehen.

## 7. Citation-Präsenz (Tier-1-Verzeichnisse)

Nicht prüfbar im Rahmen dieses Audits ohne bezahlte Tools/Live-Suche nach der finalen Adresse — da die Adresse in diesem Setup eine reale Adresse ist, aber das Geschäft laut Vorgabe **noch nicht bei GBP verknüpft** ist, ist mit hoher Wahrscheinlichkeit auch noch **keine Präsenz auf Yelp, Das Örtliche, Gelbe Seiten, TripAdvisor oder BBB-Äquivalenten** vorhanden. Dies muss vor Ort/manuell verifiziert werden.

**Für die Restaurant-Vertical empfohlene Tier-1-Verzeichnisse (DE-Markt):**
- Google Business Profile (kritisch, fehlt)
- TripAdvisor
- Das Örtliche / Gelbe Seiten
- Lieferando (Google berücksichtigt Aggregator-Zitate bei Restaurants stark)
- OpenTable / Quandoo (falls Reservierung relevant)
- Yelp (in DE schwächer, aber vorhanden)
- Facebook-Unternehmensseite (auch als `sameAs`-Quelle wichtig)

## 8. Location Page Quality

Nicht anwendbar — Einzelstandort, kein Multi-Location-Setup.

---

## Top 10 priorisierte Maßnahmen

**Kritisch**
1. **Google Business Profile anlegen und verifizieren**, primäre Kategorie exakt "Döner-Imbiss" bzw. passendste GBP-Kategorie wählen (Kategorie-Fehler = größter Negativfaktor laut Whitespark 2026). Dies ist die mit Abstand wirkungsvollste Einzelmaßnahme.
2. **Eigene Domain registrieren** und Seite dorthin migrieren; github.io-Subdomain wirkt nicht vertrauenswürdig für ein lokales Geschäft und sollte nicht die GBP-Website-URL werden.
3. `aggregateRating` im Schema mit echten GBP-Werten synchronisieren (oder bis dahin entfernen) — Falschangaben zu Bewertungen sind ein Google-Richtlinienrisiko.

**Hoch**
4. `geo` (GeoCoordinates, 5 Dezimalstellen) ins `Restaurant`-Schema ergänzen.
5. `hasMenu`/`Menu`/`MenuItem`-Schema aus den bereits vorhandenen JS-Menüdaten generieren — größter ungenutzter Rich-Result-Hebel für diese Vertical.
6. Echten Google-Maps-Place-Link/-Embed statt reinem Such-Query-Link einbinden, sobald GBP verifiziert ist.
7. Statische HTML-Fallback-Version der Speisekarte ergänzen (nicht nur JS-Rendering) für maximale Crawlbarkeit.

**Mittel**
8. Zitate in Tier-1-Verzeichnissen aufbauen (GBP, TripAdvisor, Lieferando, Facebook) mit exakt identischer NAP-Schreibweise wie auf der Website.
9. `url`, `image` und `sameAs` (sobald Social-/GBP-Profile existieren) ins Schema ergänzen; einzelne `Review`-Objekte für die drei sichtbaren Testimonials nachrüsten.

**Niedrig**
10. `addressRegion: "Hessen"` im PostalAddress-Schema ergänzen; U-Bahn-Anbindung als zusätzliches Trust-/Convenience-Signal in GBP-Beschreibung und Attributen ("öffentliche Verkehrsmittel in der Nähe") aufnehmen.

---

## Limitations / Disclaimer

- **Proximity** (55,2% der Ranking-Varianz laut Search-Atlas-Studie) liegt außerhalb jeglicher Kontrolle und wurde nicht bewertet.
- Citation-Präsenz auf externen Verzeichnissen wurde **nicht live geprüft** (kein Tool-Zugriff auf Yelp/BBB/GBP in dieser Session) — Einschätzung basiert auf der Tatsache, dass GBP laut Vorgabe noch nicht existiert.
- Keine DataForSEO-/Live-SERP-Daten verfügbar — Local-Pack-Position, echte Review-Velocity und Konkurrenzvergleich konnten nicht gemessen werden.
- Rendering erfolgte per direktem HTML-Fetch; die Seite enthält kein SPA-Framework, JS-Ausführung wurde für die Menü-Sektion manuell nachvollzogen (kein Playwright-Render in dieser Session nötig, da Inhalt im Quelltext als Datenobjekt sichtbar war).
