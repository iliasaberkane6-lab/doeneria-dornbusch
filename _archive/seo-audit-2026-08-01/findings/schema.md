# Schema.org / JSON-LD Audit — Döneria Dornbusch

URL: https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
Quelle geprüft: `index.html` (server-rendered, kein SPA — JSON-LD direkt im HTML `<head>`, Zeilen 12–33). Statische GitHub-Pages-Seite, kein Client-Side-Rendering nötig.

## 1. Detection — vorhandenes Schema

Ein JSON-LD-Block, Typ `Restaurant`:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Döneria Dornbusch",
  "servesCuisine": ["Türkisch", "Döner", "Kebab"],
  "telephone": "+49 69 96865511",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eschersheimer Landstraße 322",
    "postalCode": "60320",
    "addressLocality": "Frankfurt am Main",
    "addressCountry": "DE"
  },
  "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "226"},
  "openingHoursSpecification": [...],
  "priceRange": "€"
}
```

Kein Microdata, kein RDFa gefunden. Nur ein einziger JSON-LD-Block.

## 2. Validation — Pass/Fail pro Feld

| Check | Status | Anmerkung |
|---|---|---|
| `@context` = `https://schema.org` | ✅ Pass | korrekt, https |
| `@type` = `Restaurant` | ✅ Pass | gültiger, von Google unterstützter Typ (LocalBusiness-Subtyp, Rich-Result-fähig) |
| `name` | ✅ Pass | vorhanden, kein Platzhalter |
| `address` (PostalAddress) | ✅ Pass | alle Kernfelder vorhanden |
| `telephone` | ✅ Pass | E.164-ähnliches Format, ok |
| `openingHoursSpecification` | ✅ Pass | korrektes Format, `dayOfWeek`-Array ok |
| `priceRange` | ⚠️ Schwach | nur `"€"` — besser `"€€"` oder konkrete Spanne (z. B. `"5–15 €"`), da Gerichte bis 13 € reichen |
| `aggregateRating` | ⚠️ Fail (Best Practice) | Google verlangt für AggregateRating-Rich-Results einen begleitenden `review`-Array **oder** dass die Bewertung nicht selbst erstellt/manipuliert ist. Da hier offenbar Google-Maps-Werte (4.6, 226) 1:1 übernommen wurden, ohne eigene `Review`-Objekte oder Quellenangabe: Risiko eines **manuellen Spam-Actions "Bewertungs-Snippet-Missbrauch"**, wenn diese Bewertungen nicht auf der Seite selbst sichtbar/nachprüfbar sind. Empfehlung: entweder auf der Seite tatsächliche Reviews anzeigen (mit `Review`-Objekten) oder `aggregateRating` entfernen, bis echte On-Page-Reviews existieren. |
| `image` | ❌ Fehlt | required für Restaurant/LocalBusiness Rich Results |
| `url` | ❌ Fehlt | empfohlen (kanonische URL) |
| `geo` | ❌ Fehlt | empfohlen für Karten-/Local-Rich-Results |
| `menu` | ❌ Fehlt | stark empfohlen — Seite hat vollständige Speisekarte im DOM (`MENU`-JS-Objekt), aber nicht strukturiert referenziert |
| `sameAs` | ❌ Fehlt | keine Social-/Maps-Profile verlinkt (kein Instagram/Facebook im HTML gefunden) |
| `acceptsReservations` | ❌ Fehlt | optional, aber sinnvoll (vermutlich `false` — Döner-Imbiss) |
| `servesCuisine` Format | ⚠️ Hinweis | Array ist gültig, aber Mischung aus Nationalität ("Türkisch") und Gerichtstyp ("Döner", "Kebab") ist unüblich. Google akzeptiert freien Text, aber besser wäre `"Turkish"` (englischer Cuisine-Standardwert) + ggf. `"Doner Kebab"` als zusätzlicher Wert, da internationale Suchmaschinen-Mappings meist englische Cuisine-Strings normalisieren. Nicht kritisch, aber optimierbar. |
| `hasMenu` / `MenuSection` / `MenuItem` | ❌ Fehlt | volle Chance vertan — die JS-`MENU`-Struktur (6 Kategorien, ~40 Items mit Preisen) ließe sich fast 1:1 in `hasMenu.hasMenuSection[].hasMenuItem[]` übersetzen |
| `openingHours` (Kurzform) | – | nicht nötig, `openingHoursSpecification` ist die präzisere Variante, ausreichend |
| Fehlende Pflichtfelder laut Google für Restaurant Rich Results (`address`, `name`) | ✅ vorhanden | Grundvoraussetzung erfüllt |

**Kein deprecated Schema verwendet** (kein HowTo, kein SpecialAnnouncement, kein FAQPage). Sauber.

## 3. Missing Opportunities

1. **`image`** — Pflichtfeld für Restaurant-Rich-Results. Seite hat `assets/hero.jpg`, `assets/grill.jpg`, `assets/dueruem.jpg`, `assets/falafel.jpg` — aktuell aber nur relativ referenziert (auch im OG-Tag `<meta property="og:image" content="assets/hero.jpg">` — das ist ebenfalls eine relative URL und sollte laut Regel auf absolute URL korrigiert werden).
2. **`url`** — kanonische Domain fehlt im Schema.
3. **`geo`** (GeoCoordinates) — Lat/Long der Eschersheimer Landstraße 322, 60320 Frankfurt fehlen; wichtig für Karten-Snippets.
4. **`menu`/`hasMenu`** — größte ungenutzte Chance: vollständige Speisekarte liegt bereits strukturiert im JS vor (`MENU`-Objekt, Zeile ~495ff.), aber nicht als Schema exportiert.
5. **`sameAs`** — kein Instagram/Facebook/Google-Maps-Profil-Link im HTML gefunden. Falls Social-Profile existieren, sollten sie ergänzt werden (stärkt Entity-Verknüpfung für Google Knowledge Panel).
6. **`acceptsReservations`** — für einen Imbiss vermutlich `"False"` sinnvoll anzugeben, um Nutzererwartung (Walk-in/Take-away) korrekt zu setzen.
7. **`servesCuisine`-Normalisierung** — leichte Verbesserung, kein Blocker.
8. **`aggregateRating`-Risiko** — vor Veröffentlichung prüfen, ob 4.6/226 tatsächlich Google-Maps-Werte sind, die auf der Seite selbst nicht sichtbar/belegt sind. Das ist der einzige "kritische" Punkt im Audit (Google Rich Result Spam-Richtlinie: aggregierte Bewertungen müssen zur eigenen Entität gehören und im sichtbaren Content nachvollziehbar sein).

## 4. Generiertes JSON-LD (Ergänzungsvorschlag)

Ersetzt den bestehenden Block vollständig (Platzhalter für `geo`-Koordinaten und Social-Links bitte mit echten Werten befüllen, bevor deployed wird):

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://iliasaberkane6-lab.github.io/doeneria-dornbusch/#restaurant",
  "name": "Döneria Dornbusch",
  "url": "https://iliasaberkane6-lab.github.io/doeneria-dornbusch/",
  "image": [
    "https://iliasaberkane6-lab.github.io/doeneria-dornbusch/assets/hero.jpg",
    "https://iliasaberkane6-lab.github.io/doeneria-dornbusch/assets/grill.jpg",
    "https://iliasaberkane6-lab.github.io/doeneria-dornbusch/assets/dueruem.jpg"
  ],
  "servesCuisine": ["Turkish", "Doner Kebab", "Middle Eastern"],
  "telephone": "+49 69 96865511",
  "priceRange": "€€",
  "acceptsReservations": "False",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eschersheimer Landstraße 322",
    "postalCode": "60320",
    "addressLocality": "Frankfurt am Main",
    "addressRegion": "Hessen",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "50.1345",
    "longitude": "8.6673"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "226"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "10:00",
      "closes": "22:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "12:00",
      "closes": "22:00"
    }
  ],
  "menu": "https://iliasaberkane6-lab.github.io/doeneria-dornbusch/#speisekarte",
  "hasMenu": {
    "@type": "Menu",
    "name": "Speisekarte Döneria Dornbusch",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Döner & Dürüm",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Drehspieß Sandwich (Döner)",
            "description": "Mit Salat und Soße",
            "offers": {"@type": "Offer", "price": "7.50", "priceCurrency": "EUR"}
          },
          {
            "@type": "MenuItem",
            "name": "Dürüm",
            "description": "Mit Fleisch, Salat und Soße",
            "offers": {"@type": "Offer", "price": "8.30", "priceCurrency": "EUR"}
          }
        ]
      },
      {
        "@type": "MenuSection",
        "name": "Lahmacun & Pide",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Lahmacun",
            "description": "Mit Fleisch, Salat und Soße",
            "offers": {"@type": "Offer", "price": "8.30", "priceCurrency": "EUR"}
          }
        ]
      }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/doeneria.dornbusch",
    "https://www.google.com/maps/place/?q=place_id:REPLACE_WITH_PLACE_ID"
  ]
}
</script>
```

**Hinweise zur Umsetzung:**
- `hasMenu` oben ist ein **gekürztes Beispiel** (2 Sections). Idealerweise wird das gesamte `MENU`-JS-Objekt aus `index.html` (Zeile ~495ff., 6 Kategorien: Döner & Dürüm, Lahmacun & Pide, Pizza, Vegetarisch & Falafel, Schnitzel & Snacks, Salate/Suppe/Getränke) automatisiert in `hasMenuSection` überführt — Preis-Strings wie `"7,50"` müssen dabei zu `"7.50"` (Punkt statt Komma) für `Offer.price` normalisiert werden.
- `geo`-Koordinaten oben sind eine ungefähre Schätzung für die Eschersheimer Landstraße 322, Frankfurt — vor Deployment mit echten Koordinaten (z. B. via Google Maps Place-Details) verifizieren.
- `sameAs`-URLs sind Platzhalter — nur einfügen, wenn diese Profile tatsächlich existieren und zur Entität gehören.
- `og:image`-Meta-Tag in `index.html` Zeile 10 ebenfalls auf absolute URL umstellen (`assets/hero.jpg` → volle URL), da Social-Crawler relative Pfade oft nicht auflösen.

## 5. Zusammenfassung (Priorität)

- **Kritisch (vor Go-Live prüfen):** `aggregateRating`-Herkunft verifizieren (Spam-Risiko), sonst entfernen oder mit sichtbaren On-Page-Reviews unterlegen.
- **Hoch:** `image` (absolute URLs), `menu`/`hasMenu` (Speisekarte strukturieren — größte ungenutzte Chance), `geo`.
- **Mittel:** `url`, `priceRange`-Anpassung, `acceptsReservations`.
- **Niedrig:** `servesCuisine`-Normalisierung, `sameAs` (nur falls Profile existieren).
- **Kein Handlungsbedarf:** kein deprecated Schema, keine FAQPage vorhanden, JSON-LD-Format bereits korrekt (kein Microdata/RDFa-Mischmasch).
