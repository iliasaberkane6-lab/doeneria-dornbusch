# SXO-Analyse: Döneria Dornbusch

**URL:** https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
**Analysierte Keywords:** "döner frankfurt dornbusch", "döner in der nähe eschersheimer landstraße", "döneria dornbusch speisekarte", "döner öffnungszeiten frankfurt"
**Suchintention:** 100% lokal / transaktional-lokal (Hunger jetzt, Adresse/Route, Speisekarte vor Besuch, Öffnungszeiten)

---

## 1. Kernbefund: Page-Type-Match

**SXO Gap Score (separat vom SEO Health Score): 61/100**

Der Seitentyp der Zielseite ist grundsätzlich richtig gewählt: eine **Local Page** mit NAP, Karten-Link, Öffnungszeiten, Bewertungs-Snippet und `Restaurant`-Schema. Das ist bei lokalen Gastro-Queries der korrekte Typ. **Kein CRITICAL-Mismatch auf Seitenebene.**

Das eigentliche Problem liegt tiefer: Für alle vier Keywords dominieren im SERP nicht redaktionelle Wettbewerber-Websites, sondern **Aggregator-/Verzeichnis-Local-Pages** (restaurant-haco.com, speisekarte.de, restaurantguru.com, Yelp, TripAdvisor, Gelbe Seiten, diebestenderstadt.de, oeffnungszeitenbuch.de) plus vermutlich Google Local Pack/Maps-Karte (bei "in der Nähe"-Query fast sicher vorhanden, von WebSearch nicht direkt einsehbar). Diese Verzeichnis-Seiten ranken teils sogar **vor** oder statt der eigenen Website — ein Indiz, dass die eigene Domain (GitHub-Pages-Subdomain `iliasaberkane6-lab.github.io`) zu wenig Autorität/Indexierungssignal gegenüber den etablierten Aggregatoren hat.

**Mismatch-Bewertung:** MEDIUM — Seitentyp stimmt, aber die Seite ist strukturell nicht wettbewerbsfähig gegenüber Aggregator-Local-Pages, die dieselben Datenpunkte (NAP, Öffnungszeiten, Speisekarte, Bewertungen) bereits redundant und mit mehr Domain-Autorität liefern.

---

## 2. SERP-Analyse (Zusammenfassung)

| Keyword | Dominante Ergebnistypen | Page-Type |
|---|---|---|
| döner frankfurt dornbusch | Bewertungsportal (werkenntdenbesten.de), Yelp, Wolt (Lieferplattform), restaurant-haco.com, restaurantguru.com | Local Page / Verzeichnis |
| döner in der nähe eschersheimer landstraße | restaurant-haco.com, TripAdvisor, Yelp "near me"-Suche, diebestenderstadt.de, speisen.com | Local Page / Verzeichnis, stark "near me"-geprägt |
| döneria dornbusch speisekarte | speisekarte.de, restaurantguru.com/menu, fuudtaim.de, Uber Eats | Local Page mit Menü-Fokus |
| döner öffnungszeiten frankfurt dornbusch | oeffnungszeitenbuch.de, gastroguide.de, Gelbe Seiten, speisekarte.de | Local Page mit Hours-Fokus |

**SERP-Konsens:** ~90% Local Page / Verzeichnis-Typ (kein Blog, kein Landing Page, keine Produktseite). Confidence: hoch.

**SERP-Features:** Für "near me"- und "öffnungszeiten"-Queries ist bei Google mit Local Pack (3-Pack) + Knowledge Panel zu rechnen — die eigentliche Konkurrenz um die erste Bildschirmseite ist also primär die **Google Business Profile-Karte**, nicht organische Links. Ads: keine erkennbar (kein Werbedruck bei rein lokalen Food-Queries). PAA: eher gering, meist ersetzt durch direkte Knowledge-Panel-Antworten (Öffnungszeiten, Telefonnummer).

---

## 3. User Stories (aus SERP-Signalen abgeleitet)

**1.** Als **hungriger Passant in der Nähe der Eschersheimer Landstraße**,
möchte ich sofort sehen, ob der Laden *jetzt* geöffnet hat und wie ich am schnellsten hinkomme,
weil ich in den nächsten 10 Minuten essen will,
aber ich bin blockiert durch die **fehlende Live-Distanz/Routen-Vorschau direkt im SERP-Snippet** — die Zielseite selbst liefert zwar einen "Route planen"-Link, aber kein eingebettetes Kartenbild, das Vertrauen vor dem Klick schafft.
*(Quelle: dominante "near me"-Ergebnisse, TripAdvisor/Yelp "near me"-Suchformat, Google Local-Pack-Erwartung)*

**2.** Als **Nutzer, der vorab die Speisekarte prüft**,
möchte ich Preise und Gerichte sehen, bevor ich losfahre oder anrufe,
weil ich Enttäuschungen (kein Lieblingsgericht, zu teuer) vermeiden will,
aber ich bin blockiert durch **JavaScript-abhängiges Menü-Rendering**: Die Speisekarte wird komplett per `document.getElementById("menu-grid")` via JS aus einem `MENU`-Objekt injiziert. Für Crawler ohne JS-Rendering (und für Nutzer mit langsamer Verbindung) ist die Speisekarte im ersten Ladezustand **leer**.
*(Quelle: Konkurrenz-Ergebnisse speisekarte.de, restaurantguru.com/menu, fuudtaim.de — alle liefern die Speisekarte als statischen, sofort indexierbaren Text)*

**3.** Als **jemand, der nur Öffnungszeiten checken will** (Query: "döner öffnungszeiten frankfurt dornbusch"),
möchte ich die Antwort in unter 3 Sekunden sehen,
weil ich schnell entscheiden muss, ob sich der Weg lohnt,
aber ich bin blockiert durch **kein FAQ/Hours-Snippet-Potenzial**: Öffnungszeiten stehen zwar im `openingHoursSpecification`-Schema und im Status-Strip, aber es gibt keine explizite FAQ ("Hat die Döneria heute geöffnet?") — Wettbewerber wie oeffnungszeitenbuch.de sind exakt auf diese Frage zugeschnitten.
*(Quelle: Verzeichnis-Dominanz für "öffnungszeiten"-Query — spezialisierte Hours-Aggregatoren ranken vorn)*

**4.** Als **Erstbesucher, der Vertrauen prüfen will** (typisch vor lokalem Restaurantbesuch),
möchte ich echte, aktuelle Google-Bewertungen mit Datum sehen,
weil statische, nicht verifizierbare Zitate weniger glaubwürdig wirken als ein Live-Widget,
aber ich bin blockiert durch **hartkodierte Testimonials ohne Verlinkung zur eigentlichen Google-Bewertungsseite** — "4,6 von 5 Sternen, über 220 Bewertungen" ist nicht anklickbar/verifizierbar.
*(Quelle: Aggregatoren wie Yelp, TripAdvisor, restaurant-haco.com liefern verifizierte, datierte Live-Bewertungen)*

**5.** Als **Nutzer mit Lieferwunsch statt Vor-Ort-Besuch**,
möchte ich wissen, ob Lieferung/Abholung über eine Plattform möglich ist,
weil nicht jeder zu Fuß/mit Auto kommen kann,
aber ich bin blockiert durch **keinerlei Hinweis auf Liefer-/Bestellmöglichkeiten** — Wolt und Uber Eats tauchen im SERP für verwandte Queries auf, die Zielseite adressiert diesen Bedarf gar nicht (nur "Preise laut Aushang... zum Mitnehmen").
*(Quelle: Wolt- und Uber-Eats-Ergebnisse im SERP für "döner frankfurt dornbusch" bzw. "speisekarte")*

Abgedeckte Journey-Stufen: Awareness (Story 1, 5), Consideration (Story 2, 4), Decision (Story 3).

---

## 4. Gap-Analyse (7 Dimensionen, 100 Punkte)

| Dimension | Punkte | Evidenz |
|---|---|---|
| **Page Type** | 12/15 | Local Page korrekt gewählt (NAP, Map-Link, Hours, Schema), aber kein Local-Pack-optimierter Zusatzcontent (z. B. Stadtteil-Kontext, ÖPNV-Details sind vorhanden — gut — aber keine "Parkplatz"-Info über Text hinaus) |
| **Content Depth** | 9/15 | Vollständige Speisekarte (6 Kategorien, ~40 Positionen) vorhanden, aber **nur clientseitig via JS gerendert** — im Rohquelltext nicht vorhanden. Keine Stadtteil-/Standort-Zusatztexte über 1-2 Sätze hinaus |
| **UX Signals** | 11/15 | Klare CTAs ("Zur Speisekarte", "Route planen", "In Google Maps öffnen", Telefonlink), responsives Design, aber Intro-Animation (2,1 s Sperr-Overlay mit `overflow:hidden`) verzögert Time-to-Interactive unnötig für eilige "near me"-Nutzer |
| **Schema** | 11/15 | `Restaurant`-Schema mit Adresse, Telefon, `aggregateRating`, `openingHoursSpecification`, `priceRange` vorhanden — solide Basis. Fehlt: `hasMenu`/`Menu`-Schema, `geo`-Koordinaten, `FAQPage`-Schema, `image` im Schema |
| **Media** | 8/15 | Hero-, Grill-, Dürüm-, Falafel-Bild vorhanden mit Alt-Texten, aber **kein Foto der Ladenfassade/Außenansicht** (wichtig für "in der Nähe wiedererkennen"), kein eingebettetes Google-Maps-iFrame (nur Link) |
| **Authority** | 6/15 | Domain ist `iliasaberkane6-lab.github.io` (Subdomain eines persönlichen GitHub-Pages-Accounts) — kein eigener Domainname, kein Google Business Profile-Link auf der Seite selbst, keine Backlinks von lokalen Verzeichnissen erkennbar. Aggregatoren wie Yelp/TripAdvisor haben strukturell mehr Autorität für diese Query-Klasse |
| **Freshness** | 4/10 | `© 2026` im Footer vorhanden, aber kein `dateModified`/keine sichtbaren aktuellen Bewertungsdaten; Bewertungszahl (220) ist statisch und nicht mit Datum versehen |
| **Gesamt** | **61/100** | |

---

## 5. Persona-Scoring

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Hungriger Passant unterwegs ("near me") | 20/25 | 15/25 | 14/25 | 19/25 | 68/100 | Gut |
| Speisekarten-Prüfer (vorab) | 18/25 | 12/25 | 16/25 | 17/25 | 63/100 | Gut |
| Öffnungszeiten-Checker | 22/25 | 20/25 | 14/25 | 15/25 | 71/100 | Gut |
| Vertrauens-Prüfer (Erstbesucher) | 15/25 | 14/25 | 12/25 | 16/25 | 57/100 | Verbesserungsbedarf |
| Liefer-/Abhol-Sucher | 8/25 | 8/25 | 10/25 | 6/25 | 32/100 | Kritischer Mismatch |

### Schwächste Persona: Liefer-/Abhol-Sucher (32/100)
**Top-Problem:** Die Seite adressiert Lieferdienst-Nutzer überhaupt nicht — kein Wolt-/Uber-Eats-Link, kein Hinweis auf Abholzeiten für Bestellungen, keine Bestell-Möglichkeit.
**Empfohlener Fix:** Falls die Döneria auf Wolt/Uber Eats gelistet ist, einen sichtbaren "Online bestellen"-Button im Status-Strip oder Hero-CTA-Bereich ergänzen (Text: "Jetzt liefern lassen" mit Link zur Plattform). Falls nicht gelistet: klar kommunizieren "Nur Abholung vor Ort, kein Lieferservice" um Fehlerwartung zu vermeiden.

### Systemische Probleme
- **Trust (Ø 13,2/25 über alle Personas):** Keine verlinkten/verifizierbaren Live-Bewertungen, kein Google-Reviews-Widget, keine Presse-/Auszeichnungs-Logos.
- **Clarity bei eiligen Personas:** Intro-Animation blockiert `overflow:hidden` für ~2 Sekunden — für "near me"-Nutzer mit Zeitdruck spürbar.

### Priority Actions
1. Liefer-/Bestell-CTA ergänzen oder explizit ausschließen (adressiert kritischsten Mismatch).
2. Google-Bewertungen als anklickbares Live-Element mit direktem Link zur GBP-Bewertungsseite einbinden (behebt systemisches Trust-Defizit).
3. Speisekarte serverseitig/statisch im HTML rendern (nicht nur via JS-Injection), damit Crawler und langsame Verbindungen sie sofort sehen — behebt Story 2 und stärkt Content-Depth-Score.

---

## 6. Cross-Skill-Empfehlungen

- **Fehlendes `hasMenu`/`FAQPage`-Schema** → `/seo schema` für Schema-Generierung nutzen.
- **Domain-Autorität schwach ggü. Aggregatoren** (GitHub-Pages-Subdomain, keine Backlinks) → `/seo local` für Google-Business-Profile- und lokale Verzeichnis-Strategie empfohlen.
- **Speisekarte nur clientseitig gerendert** → `/seo page` für technischen Page-Audit (Rendering/Indexierbarkeit).

---

## 7. Limitationen

- WebSearch liefert keine direkte Sicht auf das Google Local Pack (3-Pack) oder Knowledge-Panel-Layout für diese Queries — die Einschätzung "Local Pack dominiert bei 'near me'/'öffnungszeiten'" basiert auf Standard-SERP-Verhalten für hyperlokale Food-Queries, nicht auf einem Live-Screenshot.
- Kein Zugriff auf tatsächliche PAA-Boxen oder "Ähnliche Suchanfragen" für die vier Keywords — Cluster-Ableitung erfolgte aus organischen Ergebnistiteln und -typen.
- Rendering-Skript (`render_page.py`/`parse_html.py`) des SXO-Skills war im Environment nicht vorhanden; Analyse basiert stattdessen auf direktem Lesen der vorhandenen `index.html` und der bereits vorliegenden `render.json` im Projektordner. Funktional äquivalent, aber kein automatisierter Playwright-Render durchgeführt.
- Keine Live-Prüfung, ob die Döneria tatsächlich bei Wolt/Uber Eats gelistet ist — Empfehlung zur Liefer-CTA ist konditional formuliert.

---

**Nächster Schritt:** PDF-Report gewünscht? → `/seo google report`
