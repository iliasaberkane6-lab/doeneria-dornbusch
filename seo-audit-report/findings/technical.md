# Technical SEO Audit — Döneria Dornbusch

**URL geprüft:** https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
**Datum:** 2026-07-12
**Kontext:** Vorläufiges Hosting auf GitHub Pages Subpfad. Echte Domain folgt erst beim Livegang — entsprechend sind robots.txt/sitemap.xml/HSTS-Preload etc. hier bewusst noch nicht final bewertet, sondern als Pre-Launch-Empfehlung markiert.

**Technical Score: 74/100** (bezogen auf den aktuellen Staging-Zustand; vor Livegang auf Zieldomain erneut prüfen)

---

## 1. Crawlability — PASS (mit Launch-Vorbehalt)

| Check | Ergebnis |
|---|---|
| robots.txt | 404 (nicht vorhanden) |
| sitemap.xml | 404 (nicht vorhanden) |
| index.html crawlbar | Ja, kein `meta robots noindex`, HTTP 200 |
| impressum.html | `<meta name="robots" content="noindex">` gesetzt — korrekt |
| datenschutz.html | `<meta name="robots" content="noindex">` gesetzt — korrekt |
| GitHub-Pages-Subpfad indexierbar | Ja — aktuell kein Schutz gegen Indexierung der Staging-URL |

**Bewertung:** Kein Critical-Finding für fehlende robots.txt/sitemap.xml, da diese erst auf der finalen Domain sinnvoll sind (URLs würden sich sonst ändern). impressum/datenschutz korrekt von der Indexierung ausgeschlossen — guter technischer Grundzustand.

**Empfehlung für Livegang (Medium, vor Launch erledigen):**
- `robots.txt` auf der Zieldomain anlegen (Sitemap-Referenz inkl.)
- `sitemap.xml` mit den 1-3 indexierbaren URLs generieren
- **Wichtig:** Solange die Seite auf `iliasaberkane6-lab.github.io/...` läuft und öffentlich verlinkt sein könnte, besteht das Risiko, dass Google diese Staging-URL statt der künftigen Domain indexiert. Falls die GitHub-Pages-URL bereits extern verlinkt ist (z. B. Social, Google Business), vorsorglich `<meta name="robots" content="noindex">` auf der Staging-Instanz selbst erwägen, bis der Domain-Umzug steht — sonst droht später eine Duplicate-Content-Situation mit zwei URLs für dieselbe Seite.

---

## 2. Indexability — MEDIUM ISSUE

| Check | Ergebnis |
|---|---|
| Canonical Tag | **Fehlt komplett** (index.html, impressum.html, datenschutz.html) |
| Duplicate Content | Kein Duplicate-Risiko intern (nur 3 Seiten) |
| Thin Content | Nein — index.html hat substanziellen Content (Speisekarte, Bewertungen, Kontakt, About) |
| Title Tag | Vorhanden, gut: "Döneria Dornbusch · Döner in Frankfurt am Main" (55 Zeichen, im Limit) |
| Meta Description | Vorhanden, gut formuliert, ~155 Zeichen, leicht am oberen Limit — ok |
| lang-Attribut | `<html lang="de">` korrekt gesetzt |

**Priorität: High** — `<link rel="canonical" href="...">` fehlt auf allen drei Seiten. Ohne Canonical besteht bei künftiger Domain-Migration (GitHub Pages → eigene Domain) ein erhöhtes Risiko für Indexierungs-Splits zwischen alter und neuer URL, und Google muss die kanonische URL selbst raten.

**Empfehlung:** Sobald die Zieldomain feststeht, `<link rel="canonical" href="https://[zieldomain]/">` auf index.html einfügen (auf impressum/datenschutz optional, da noindex ohnehin greift). Bis dahin kann der Canonical auf die aktuelle GitHub-Pages-URL zeigen oder ausgelassen werden — sollte aber nicht vergessen werden beim Domain-Umzug.

---

## 3. Security — PASS

| Check | Ergebnis |
|---|---|
| HTTPS | Ja, erzwungen über GitHub Pages, HTTP/2 |
| HSTS | `strict-transport-security: max-age=31556952` gesetzt |
| Mixed Content | Keine gefunden, alle Assets relativ/HTTPS |
| Security Headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) | **Nicht gesetzt** — GitHub Pages liefert diese Header standardmäßig nicht und erlaubt auch keine eigene Server-Header-Konfiguration |

**Priorität: Low** (kein direkter SEO-Ranking-Faktor, aber Best Practice). Auf GitHub Pages sind Custom-Headers technisch nicht konfigurierbar (kein `_headers`-File-Support wie bei Netlify/Vercel). **Empfehlung für Livegang:** Falls die Zieldomain über Cloudflare, Netlify oder einen anderen Reverse Proxy läuft, dort CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` und `Permissions-Policy` ergänzen. Nicht kritisch für die aktuelle Staging-Phase.

---

## 4. URL-Struktur — PASS

| Check | Ergebnis |
|---|---|
| URL-Schema | Sauber: `/`, `/impressum.html`, `/datenschutz.html` |
| Trailing Slash Redirect | `/doeneria-dornbusch` → 301 → `/doeneria-dornbusch/` — korrekt, ein sauberer Redirect-Hop |
| Redirect-Ketten | Keine gefunden (nur der eine erwartete Slash-Redirect) |
| Parameter/Tracking-Müll in URLs | Keine |

Kein Handlungsbedarf. Nach Domain-Umzug darauf achten, dass alte GitHub-Pages-URLs sauber per 301 auf die neue Domain umgeleitet werden, falls die Staging-URL zwischenzeitlich indexiert wurde.

---

## 5. Mobile-Freundlichkeit — PASS

| Check | Ergebnis |
|---|---|
| Viewport Meta Tag | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` korrekt |
| Responsive Breakpoints | Umfangreich und durchdacht: 1700px/1180px/1024px/860px/700px/600px/380px + Landscape + `hover:none` + Safe-Area-Insets (Notch) |
| Touch-Targets | Explizit auf `min-height:44px` gesetzt für Nav-Links/Tabs bei `hover:none` — entspricht Apple/Google-Richtlinie (44×44px) |
| Mobile-Menü | Eigenes Burger-Menü mit `aria-expanded`, funktional getrennt vom Desktop-Nav |
| Text-Skalierung | `clamp()` durchgängig für Typografie verwendet — kein Zoom-Bedarf zu erwarten |

Sehr solide Mobile-Implementierung, deutlich über dem Durchschnitt vergleichbarer lokaler Gastro-Seiten. Kein Finding.

---

## 6. Core Web Vitals (Source-Inspection, keine echten Feld-/Labordaten) — HIGH ISSUE bei LCP

### LCP-Risiko: Hoch
- Hero-Bild `assets/hero.jpg` = **408 KB**, JPEG, wird ohne `loading="lazy"` (korrekt für above-the-fold) aber auch **ohne responsive `srcset`/`sizes`** und **ohne moderne Formate (WebP/AVIF)** ausgeliefert.
- `fetchpriority="high"` ist bereits korrekt gesetzt — gut.
- Bei einer 408 KB JPEG über Mobilfunk (3G/4G) landet die LCP-Zeit realistisch im "Needs Improvement" bis "Poor"-Bereich (>2.5s), besonders auf Mid-Range-Mobilgeräten.
- **Priorität: High.** Empfehlung:
  1. Hero-Bild in WebP/AVIF re-exportieren (Ziel: <150 KB bei vergleichbarer visueller Qualität)
  2. `srcset`/`sizes` mit mind. 2-3 Breakpoints (z. B. 640w/1024w/1600w) ergänzen, da das Bild im mobilen Layout ohnehin nur 52vw hoch/skaliert dargestellt wird
  3. `<picture>`-Element mit AVIF/WebP + JPEG-Fallback erwägen

### Weitere Bilder (grill.jpg, dueruem.jpg, falafel.jpg — 535-598 KB)
- Alle korrekt mit `loading="lazy"` versehen — richtig, da unterhalb des Folds.
- Trotzdem: 535-598 KB pro Bild ist für Web-JPEGs sehr hoch (typischer Zielwert: 100-200 KB für Content-Bilder dieser Darstellungsgröße). Beeinflusst nicht LCP direkt, aber Gesamt-Pagesize/Datenverbrauch und indirekt INP bei parallelem Laden auf langsamen Verbindungen.
- **Priorität: Medium.** Alle vier Bilder komprimieren/in WebP konvertieren, Qualitätsstufe ~75-80 reicht für Foodfotografie i.d.R. aus.

### CLS-Risiko: Niedrig
- Keine expliziten `width`/`height`-Attribute auf `<img>`-Tags gefunden — nur `max-width:100%;display:block` per CSS. Das kann bei langsamer Bildladung zu Layout-Shifts führen, besonders beim Hero-Bild und den Duo-Cards.
- **Priorität: Medium.** `width`/`height`-Attribute (oder `aspect-ratio` in CSS) auf allen `<img>`-Tags ergänzen, um Platz vorab zu reservieren.
- Das CSS-Intro (`#intro`) nutzt `position:fixed` und blendet sich nach 2.1s aus — da es fixed positioniert ist und keinen Platz im Dokumentfluss einnimmt, verursacht es **keinen** CLS. Positiv zu vermerken.
- Web-Fonts nutzen `font-display:swap` korrekt — verhindert unsichtbaren Text (FOIT), minimiert aber nicht komplett den Reflow beim Font-Swap (kleines CLS-Risiko bei "Cabinet Grotesk", da Fallback `system-ui` andere Metriken hat). Vertretbar, kein Blocker.

### INP-Risiko: Niedrig
- Kein schweres JS-Framework, kein Hydration-Overhead. Das einzige nennenswerte JS (Menü-Tabs, Intersection Observer für Reveal-Animationen, Burger-Menü, Öffnungsstatus-Berechnung) ist minimal und synchron, sollte keine langen Tasks erzeugen.
- `prefers-reduced-motion` wird korrekt respektiert (Intro und Reveal-Animationen werden deaktiviert) — gute Accessibility- und Performance-Praxis.
- Kein Finding.

---

## 7. Structured Data — PASS (mit kleiner Ergänzungsmöglichkeit)

- JSON-LD vom Typ `Restaurant` korrekt eingebunden und valide aufgebaut (Adresse, Telefon, Öffnungszeiten, AggregateRating, priceRange).
- **Fehlt:** `image`-Property im Schema (empfohlen für Restaurant/LocalBusiness-Rich-Results), `url`-Property (sollte auf die finale Domain zeigen — aktuell fehlt sie ganz, sinnvoll erst nach Domain-Feststehen), `servesCuisine` ist vorhanden und gut.
- **Priorität: Low.** `"image": "https://[domain]/assets/hero.jpg"` und `"url": "https://[domain]/"` ergänzen, sobald die Zieldomain feststeht.
- Rich-Results-Test vor Livegang empfohlen (Google Rich Results Test), um AggregateRating-Darstellung zu verifizieren.

---

## 8. JavaScript-Rendering — PASS

- Die Seite ist zu 100% serverseitig als statisches HTML ausgeliefert — der komplette Content (Speisekarte-Grundstruktur, Texte, Kontaktdaten) ist im initialen HTML vorhanden, mit Ausnahme der **Menü-Items selbst**, die dynamisch per JS aus dem `MENU`-Objekt in `#menu-grid` gerendert werden.
- **Wichtiger Punkt:** Der aktive Tab ("Döner & Dürüm") wird per `render("doener")` beim Laden ausgeführt und landet im DOM — Crawler mit JS-Rendering (Googlebot) sehen diesen Content. Aber: Die anderen 5 Menü-Kategorien (Lahmacun, Pizza, Veggie, Snacks, Salate) existieren **nur als JS-Objekt im Script-Tag**, nicht als gerendertes HTML, und werden nur bei Klick nachgeladen. Das bedeutet, dass diese Gerichte für Nicht-JS-Crawler oder bei unvollständigem Rendering nicht sichtbar sind, und dass sie generell nicht als indexierbarer Text vorliegen, sondern nur als JSON-Daten im `<script>`.
- **Priorität: Medium.** Da die gesamte Speisekarte für lokales SEO relevant ist (Nutzer suchen z. B. "Lahmacun Frankfurt Dornbusch"), sollten idealerweise alle Menü-Kategorien serverseitig/statisch im HTML vorhanden sein — z. B. alle Kategorien direkt ins HTML rendern und die Tab-Logik nur zum Ein-/Ausblenden per CSS/JS nutzen (`display:none` statt dynamisches Nachladen), oder zumindest den Text aller Gerichte irgendwo als sichtbares/crawlbares HTML vorhalten (z. B. in einem SEO-Text-Abschnitt oder als vollständige Liste mit Progressive Enhancement).
- Googlebot rendert JS in der Regel zuverlässig und würde bei Klick-Interaktion die Daten nicht automatisch nachladen (kein "Klick-Crawling"), d. h. die 5 verborgenen Kategorien sind faktisch nicht indexierbar.

---

## 9. IndexNow-Protokoll — N/A für aktuelle Phase

Nicht relevant, solange die Seite nicht auf der finalen, für die Suche vorgesehenen Domain läuft. Nach Domain-Umzug: IndexNow-Key-File hinterlegen und bei Content-Updates (z. B. Speisekarten-/Preisänderungen) an Bing/Yandex pingen — optional, aber mit geringem Aufwand und Vorteil für schnellere Indexierung bei Bing.

---

## Zusammenfassung: Priorisierte Findings

### High
1. **LCP-Risiko durch großes Hero-Bild (408 KB, kein modernes Format, kein srcset)** — Sektion 6
2. **Fehlender Canonical-Tag** auf allen Seiten — Sektion 2
3. **5 von 6 Menü-Kategorien nicht als statisches, crawlbares HTML vorhanden** (nur JS-Objekt) — Sektion 8

### Medium
4. Alle Content-Bilder (grill/dueruem/falafel, je 535-598 KB) zu groß, kein WebP/AVIF — Sektion 6
5. Fehlende `width`/`height`-Attribute auf `<img>`-Tags (CLS-Risiko) — Sektion 6

### Low
6. Fehlende Security-Header (CSP, X-Content-Type-Options etc.) — technisch bedingt durch GitHub Pages, erst bei Domain-Umzug/Proxy lösbar — Sektion 3
7. JSON-LD fehlt `image`/`url`-Property — Sektion 7

### Empfehlungen für Livegang (kein aktuelles Finding, aber vormerken)
8. robots.txt + sitemap.xml auf Zieldomain anlegen — Sektion 1
9. Prüfen, ob Staging-URL indexiert wurde, ggf. noindex auf Staging setzen — Sektion 1
10. Canonical/JSON-LD-`url` auf Zieldomain aktualisieren — Sektion 2, 7
11. IndexNow-Key nach Domain-Umzug einrichten — Sektion 9

---

## Positive Findings (zur Einordnung)
- Sehr gründliche, mehrstufige Responsive-Breakpoint-Struktur inkl. Safe-Area-Insets und `prefers-reduced-motion`
- Korrekte `noindex`-Auszeichnung von Impressum/Datenschutz
- HSTS aktiv, durchgehend HTTPS
- Sauberer 301-Redirect bei fehlendem Trailing Slash
- `fetchpriority="high"` auf Hero-Bild, `loading="lazy"` auf allen Below-the-Fold-Bildern korrekt gesetzt
- Valides Restaurant-JSON-LD mit Öffnungszeiten und Bewertungen
- Minimaler, gezielter JS-Einsatz ohne Framework-Overhead — gutes INP-Fundament
