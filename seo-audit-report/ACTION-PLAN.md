# SEO Action Plan — Döneria Dornbusch
Demo: https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
Audit-Datum: 2026-07-12 · Volle Einzelreports unter `findings/`

## Kategorie-Scores

| Kategorie | Score | Agent |
|---|---|---|
| Technical SEO | 74/100 | seo-technical |
| Content Quality / E-E-A-T | 58/100 | seo-content |
| Schema / Structured Data | valide, aber unvollständig | seo-schema |
| Local SEO | 38/100 | seo-local |
| Core Web Vitals | LCP 6,1s (Poor), CLS 0,0004 (Good), INP voraussichtlich Good | seo-performance |
| GEO / AI-Suche (ChatGPT, Perplexity, AI Overviews) | 34/100 | seo-geo |
| SXO (Search Experience) | 61/100 | seo-sxo |

Niedrige Scores bei Local/GEO sind zu diesem Zeitpunkt erwartbar: die Seite läuft noch auf einer GitHub-Pages-Demo-URL, hat keine eigene Domain und ist noch nicht mit dem Google Business Profile verknüpft. Diese Scores springen deutlich nach Livegang + GBP-Verknüpfung.

## Phase 1: Vor Livegang (kritisch)

1. **Speisekarte serverseitig ins HTML rendern.** Aktuell wird sie erst per JavaScript aus einem `MENU`-Objekt in `#menu-grid` geschrieben — im rohen HTML ist der Container leer. Das wurde unabhängig von 4 der 7 Agenten (Technical, Content, Local, GEO) als größter Einzelbefund genannt: Google, ChatGPT, Perplexity & Co. sehen dadurch keine Gerichte/Preise, nur die Meta-Beschreibung. Fix: alle 49 Positionen direkt als HTML ausliefern, Tabs als progressive enhancement per JS oben drauf.
2. **Bewertungs-Widerspruch beheben:** `og:description` zeigt noch 4,7★, der Rest der Seite korrekt 4,6★. Muss auf 4,6 vereinheitlicht werden (Social-Media-Vorschau betroffen).
3. **Bilder komprimieren.** Alle 4 JPEGs sind mit 400–600 KB deutlich zu groß, kein WebP/AVIF, keine responsive Größen. Laut Performance-Audit verursacht allein der Hero-Bild-Download 87 % des LCP von 6,1 Sekunden (Ziel: unter 2,5s). Fix: WebP-Export in 2-3 Breakpoint-Größen, `srcset`.
4. Impressum/Datenschutz-Platzhalter mit echten Daten des Inhabers füllen (bereits als offener Punkt bekannt).

## Phase 2: Bei Livegang (Woche 1)

5. Domain registrieren, `robots.txt` + `sitemap.xml` anlegen (aktuell bewusst nicht vorhanden, da Demo-URL).
6. Canonical-Tags auf allen 3 Seiten ergänzen.
7. Google Business Profile verknüpfen (Website-Feld) — größter Local-SEO-Hebel.
8. JSON-LD Restaurant-Schema erweitern: `image`, `url`, `geo`, `hasMenu`/`MenuItem` (Speisekarte strukturiert, nicht nur als Text), `sameAs`.
9. `width`/`height`-Attribute auf allen Bildern (CLS-Absicherung, aktuell schon gut bei 0,0004, aber Robustheit).

## Phase 3: Nach Livegang (Monat 1)

10. Liefer-/Abhol-CTA ergänzen, falls Lieferando/Wolt/Uber Eats genutzt wird (schwächste Persona im SXO-Audit: "Liefer-Sucher" nur 32/100).
11. Echte Google-Rezensionen mit `Review`-Schema verlinken statt statischer Zitate.
12. Kurze FAQ-Sektion (z. B. "Ist alles halal?", "Gibt es Lieferung?") — hilft sowohl klassischem SEO als auch AI-Suche.
13. 2-3 Sätze Inhaber-/Geschichte-Content ("seit wann geöffnet", persönliche Note) für E-E-A-T/Experience-Signal.

## Phase 4: Laufend

14. `llms.txt` ergänzen (optional, AI-Crawler-Transparenz).
15. Fonts-Ladeverhalten prüfen (5 woff2-Dateien blockieren aktuell synchron im `<head>`, `font-display: swap` bereits gesetzt — Feintuning möglich, kleiner Hebel).
16. Nach 4-6 Wochen Live-Betrieb: Google Search Console einrichten, echte Indexierung/Klicks prüfen.
