import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), "utf8");
const requireFile = (file) => {
  if (!existsSync(join(root, file))) throw new Error(`Fehlende Datei: ${file}`);
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const count = (source, pattern) => [...source.matchAll(pattern)].length;

const pageNames = ["index.html", "404.html", "impressum.html", "datenschutz.html"];
pageNames.forEach(requireFile);
const pages = Object.fromEntries(pageNames.map((name) => [name, read(name)]));
const index = pages["index.html"];

// Vorschau-Schutz und minimale Datenschutzkonventionen.
for (const [name, source] of Object.entries(pages)) {
  assert(source.includes('name="robots" content="noindex'), `${name}: noindex fehlt`);
  assert(source.includes('name="referrer" content="no-referrer"'), `${name}: Referrer-Schutz fehlt`);
}
const preview = index.includes('content="noindex, nofollow"');
const legalText = pages["impressum.html"] + pages["datenschutz.html"];
const hasLegalPlaceholders = legalText.includes("[VOR- UND NACHNAME DES INHABERS]") || legalText.includes("[E-MAIL-ADRESSE]");
if (hasLegalPlaceholders) assert(preview, "Rechtliche Platzhalter dürfen nie in einer indexierbaren Fassung stehen");
if (!preview) assert(!hasLegalPlaceholders && !legalText.includes('class="todo"'), "Offizieller Stand enthält noch Platzhalter");

// Struktur, Navigation und Tastaturbedienung.
const ids = [...index.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert(ids.length === new Set(ids).size, "Doppelte HTML-ID gefunden");
for (const [, target] of index.matchAll(/aria-controls="([^"]+)"/g)) {
  assert(ids.includes(target), `aria-controls zeigt auf fehlende ID: ${target}`);
}
const tabs = [...index.matchAll(/<button class="menu-tab(?: active)?"[^>]*role="tab"[^>]*>/g)].map((match) => match[0]);
const panels = [...index.matchAll(/<div class="menu-grid"[^>]*role="tabpanel"[^>]*>/g)].map((match) => match[0]);
assert(tabs.length === 6, `Erwartet: 6 Menütabs, gefunden: ${tabs.length}`);
assert(panels.length === 6, `Erwartet: 6 Menüpanels, gefunden: ${panels.length}`);
assert(panels.every((panel) => panel.includes('tabindex="0"')), "Nicht jedes Menüpanel ist fokussierbar");
assert(index.includes('<main id="main" tabindex="-1">'), "Skip-Link-Ziel ist nicht zuverlässig fokussierbar");
assert(!index.match(/<div class="mobile-menu"[^>]*aria-hidden/), "No-JS-Mobile-Menü wird initial aus dem Accessibility Tree entfernt");
assert(index.includes('class="hero-board"') && index.includes('class="hero-mark"'), "Eigenständige Aushang-Bühne im Hero fehlt");
assert(!index.includes('class="hero-brand"'), "Alter Split-Hero ist wieder vorhanden");
assert(index.includes('class="local-number"') && index.includes('<span>322</span>'), "Lokaler 322-Anker fehlt");
assert(count(index, /<a class="mb-(?:menu|call|route)"/g) === 3, "Mobile Schnellleiste hat nicht genau Karte, Anruf und Route");
assert(index.includes('<a class="mb-menu" href="#speisekarte">Karte</a>'), "Mobiler Direktzugriff auf die Speisekarte fehlt");

// Vollständige Speisekarte und Nummern 01–43.
assert(count(index, /class="menu-item"/g) === 49, "Speisekarte enthält nicht genau 49 Positionen");
assert(count(index, /class="mi-price"/g) === 49, "Nicht jede Speisekartenposition hat einen Preis");
const menuNumbers = [...index.matchAll(/<span class="mi-num">(\d{2})\.<\/span>/g)].map((match) => match[1]);
const expectedNumbers = Array.from({ length: 43 }, (_, position) => String(position + 1).padStart(2, "0"));
assert(menuNumbers.length === 43 && expectedNumbers.every((number) => menuNumbers.includes(number)), "Tafelnummern 01–43 sind nicht vollständig/eindeutig");

// Progressive Fallbacks: komplette Karte ohne JavaScript und beim Drucken.
assert(count(index, /class="menu-panel-title"/g) === 6, "No-JS-/Druck-Kategorieüberschriften fehlen");
assert(index.includes(".menu-grid[hidden]{display:grid!important}"), "No-JS-Fallback zeigt versteckte Kategorien nicht an");
assert(index.includes("nav{position:static!important}"), "Mobile Navigation hat keinen No-JS-Fallback");
assert(index.includes("@media print"), "Druckansicht fehlt");
assert(index.includes('class="print-brand"') && index.includes('class="print-contact"'), "Druckansicht enthält Marke/Kontakt nicht");

// Maschinenlesbare Kerndaten.
const jsonLdMatch = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(jsonLdMatch, "Restaurant-JSON-LD fehlt");
const restaurant = JSON.parse(jsonLdMatch[1]);
assert(restaurant["@type"] === "Restaurant", "JSON-LD ist kein Restaurant");
assert(restaurant.name === "Döneria Dornbusch", "JSON-LD-Name weicht ab");
assert(restaurant.telephone === "+49 69 96865511", "JSON-LD-Telefon weicht ab");
assert(restaurant.address?.streetAddress === "Eschersheimer Landstraße 322", "JSON-LD-Adresse weicht ab");
assert(restaurant.address?.postalCode === "60320", "JSON-LD-PLZ weicht ab");
assert(!restaurant.aggregateRating, "Selbstreferenzielles aggregateRating darf nicht veröffentlicht werden");
assert(Array.isArray(restaurant.openingHoursSpecification) && restaurant.openingHoursSpecification.length === 2, "JSON-LD-Öffnungszeiten unvollständig");

// Öffentliche Aussagen: keine alten KI-/Template-Reste oder unbelegten Claims.
const forbiddenPublicFragments = [
  "maps.google.com",
  "assets/hero-",
  "assets/grill-",
  "assets/dueruem-",
  "assets/falafel-",
  "seo-audit-report",
  "sessionStorage",
  'id="intro"',
  'class="reveal"',
  "aggregateRating",
  "Alles halal",
  "hausgemachte Soßen",
  "Rollstuhlgerechter Zugang",
  'style="'
];
for (const fragment of forbiddenPublicFragments) {
  assert(!index.includes(fragment), `Unerwünschter öffentlicher Rest: ${fragment}`);
}
assert(index.includes("Döner (Drehspieß Sandwich) einfach gut und lecker."), "Erster Rezensionsauszug weicht von der Quelle ab");
assert(index.includes("Der Besitzer ist übrigens super nett und macht die Bestellung immer zügig fertig!"), "Zweiter Rezensionsauszug weicht von der Quelle ab");
assert(count(index, /via Restaurant Guru/g) === 2, "Vermittlungsquelle der Rezensionen ist nicht zweimal sichtbar");
assert(index.includes("230 Google-Bewertungen"), "Bewertungsstand fehlt");
assert(index.includes("U1, U2, U3, U8"), "ÖPNV-Linien fehlen");
assert(index.includes("Preise laut zuletzt veröffentlichtem Aushang"), "Preistransparenz fehlt");

// Externe Links und lokale Referenzen.
for (const match of index.matchAll(/<a\b([^>]*)target="_blank"([^>]*)>/g)) {
  assert((match[1] + match[2]).includes('rel="noopener"'), "Neuer Tab ohne rel=noopener");
}
for (const [pageName, source] of Object.entries(pages)) {
  for (const match of source.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const rawReference = match[1].replaceAll("&amp;", "&");
    if (/^(?:https?:|tel:|mailto:|data:|\/\/)/.test(rawReference)) continue;
    let localReference = rawReference.split(/[?#]/)[0];
    if (localReference.startsWith("/doeneria-dornbusch/")) localReference = localReference.slice("/doeneria-dornbusch/".length);
    if (localReference.startsWith("/")) continue;
    const resolved = normalize(join(dirname(pageName), localReference));
    requireFile(resolved);
  }
}
assert(index.includes("https://www.google.com/maps/search/?api=1&amp;query="), "Offizielles Maps-Suchformat fehlt");
assert(index.includes("https://www.google.com/maps/dir/?api=1&amp;destination="), "Offizielles Maps-Routenformat fehlt");

// Bilder, Social Preview und Manifest.
for (const imageTag of index.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]+"/.test(imageTag[0]), "Bild ohne aussagekräftigen Alt-Text");
for (const marker of ["og:image:alt", "og:image:width", "og:image:height", "twitter:image:alt"]) assert(index.includes(marker), `Social-Metadatum fehlt: ${marker}`);
requireFile("site.webmanifest");
const manifest = JSON.parse(read("site.webmanifest"));
for (const key of ["name", "short_name", "description", "lang", "id", "start_url", "scope", "display", "icons"]) assert(key in manifest, `Manifest-Schlüssel fehlt: ${key}`);
assert(manifest.id === "./" && manifest.start_url === "./" && manifest.scope === "./", "Manifest ist nicht domain-portabel");
for (const icon of manifest.icons) requireFile(icon.src);
const pngDimensions = (file) => {
  const image = readFileSync(join(root, file));
  assert(image.subarray(1, 4).toString() === "PNG", `${file} ist keine PNG-Datei`);
  return [image.readUInt32BE(16), image.readUInt32BE(20)];
};
assert(pngDimensions("assets/icon-192.png").join("x") === "192x192", "192px-App-Icon hat falsche Größe");
assert(pngDimensions("assets/icon-512.png").join("x") === "512x512", "512px-App-Icon hat falsche Größe");
assert(pngDimensions("assets/og-image.png").join("x") === "1200x630", "Social Preview hat nicht 1200×630 px");

// Keine internen Unterlagen oder KI-Platzhalter im öffentlichen Buildbaum.
const publicAssetNames = readdirSync(join(root, "assets"), { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => entry.name);
assert(!publicAssetNames.some((name) => /^(?:hero|grill|dueruem|falafel)-/.test(name)), "KI-Platzhalter liegt wieder unter assets/");
for (const file of [
  "_archive/README.md",
  "_archive/ai-placeholders/hero-1600.jpg",
  "_archive/seo-audit-2026-08-01/sxo/live.html",
  "_internal/CHECKLISTE-TERMIN.md",
  "_internal/PITCH-ANLEITUNG.md",
  "_internal/CONTENT-QUELLEN.md"
]) requireFile(file);
const jekyllConfig = read("_config.yml");
assert(jekyllConfig.includes("- _archive") && jekyllConfig.includes("- _internal"), "Interne Ordner sind nicht vom Jekyll-Build ausgeschlossen");

// Keine unnötigen Drittanbieter-Laufzeitabhängigkeiten.
assert(!/<script\b[^>]*\bsrc=/.test(index), "Externe Script-Abhängigkeit gefunden");
assert(!/<iframe\b/.test(index), "Eingebetteter Drittanbieter-Inhalt gefunden");
assert(!/<form\b/.test(index), "Unerwartetes Formular gefunden");
assert(!/(?:google-analytics|googletagmanager|facebook\.net|hotjar)/i.test(index), "Tracking-Code gefunden");

console.log("Website-Qualität geprüft: 4 Seiten, 49 Positionen, 6 Tabs, 3 mobile Direktaktionen, No-JS/Druck, Quellen- und Vorschau-Schutz.");
