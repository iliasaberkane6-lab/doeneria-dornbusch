# Content Quality Audit — Döneria Dornbusch (One-Pager, Homepage/Local Business)

URL: https://iliasaberkane6-lab.github.io/doeneria-dornbusch/
Page type: Homepage / Location page (local business, single page, GitHub Pages)
Source reviewed: full raw HTML (JS-rendered menu inspected via embedded `MENU` object)

## Content Quality Score: 58 / 100

Solid structural bones (real NAP data, real menu, JSON-LD, testimonials) but held back by a factual inconsistency in the star rating, entirely JS-dependent menu content, missing structured data for the menu/reviews, and generic marketing copy with no verifiable first-hand ownership signals.

---

## E-E-A-T Breakdown

| Factor | Weight | Score (0–100) | Weighted | Notes |
|---|---|---|---|---|
| Experience | 20% | 45 | 9.0 | Some first-hand phrasing ("Unser Spieß dreht sich vom ersten Kunden bis zum letzten"), real interior/grill photography (`assets/grill.jpg`, `assets/hero.jpg`). But no owner name, no "since [year]", no story of the shop, no photos credited as own work, no social proof beyond quotes. |
| Expertise | 25% | 55 | 13.75 | The 49-item menu with real, specific prices (e.g. "Box klein 5,50 € / groß 7,50 €") is itself a strong specificity signal — this is the opposite of generic AI slop. But there's no team/chef bio, no halal-certification proof, no allergen table (only "Bei Allergien sprich uns einfach an" — a promise, not documented info). |
| Authoritativeness | 25% | 32 | 8.0 | No external citations, no press/blog mentions, no backlinks signal, no Google Business Profile embed/link beyond a Maps search-query link (not a verified Place ID link). Rating claims are **self-declared and inconsistent** (see Trust below), which undercuts authority rather than building it. |
| Trustworthiness | 30% | 62 | 18.6 | Real address, phone (tel: link), opening hours (also machine-readable via JSON-LD), Impressum + Datenschutz links present (German legal requirement, good). HTTPS via GitHub Pages. But: rating inconsistency, unlinked/unverifiable review quotes, no visible owner/business registration name matching Impressum, no map embed for visual confirmation. |

**Weighted E-E-A-T score: ≈ 49 / 100**

### Critical trust flag: conflicting rating numbers
- JSON-LD `aggregateRating`: **4.6 / 226 reviews**
- Visible strip + reviews section: **"4,6 von 5 Sternen … über 220 Google-Bewertungen"** ✅ consistent
- `<meta property="og:description">`: **"4,7 Sterne"** ❌ inconsistent

This is a real E-E-A-T/trust liability. A discrepancy between the schema/on-page rating and the social-share meta tag is exactly the kind of "trust signal" inconsistency the Sept 2025 QRG flags — it looks unmaintained or careless, and it's also a citation risk (an AI engine or social preview could surface the wrong number). **Fix: change og:description to "4,6 Sterne" to match the schema and on-page copy, or update the real current Google rating everywhere at once.**

---

## Word Count / Content Depth

Page type: Homepage / Location page → floor is 500–800 words (topical coverage, not a strict target).

- **Static (server-rendered) text**, excluding the JS-injected menu: hero, strip, "Über uns" band, duo cards, reviews, contact/hours block, footer ≈ **310–350 words**. This alone is thin relative to the 500-word floor.
- **With the JS-rendered menu counted** (49 dish names + descriptions + prices, rendered client-side into `#menu-grid`): total effective content ≈ **650–750 words**, which clears the floor comfortably.

**The gap matters for AI citation, not just for Googlebot.** Googlebot renders JavaScript (two-wave indexing) so it will likely see the full menu eventually. But most AI-answer crawlers (ChatGPT/OpenAI, Perplexity, and many "AI Overviews" pre-render passes) do **not** execute JavaScript. For those crawlers, this page currently reads as: hero copy + a Restaurant schema with only `servesCuisine: ["Türkisch","Döner","Kebab"]` — **no actual dish names, no prices**. That is a significant, fixable content-depth gap for the exact audiences most likely to ask "what does Döneria Dornbusch serve" or "how much is a Döner at Dornbusch."

**Recommendation:** Server-render (or statically pre-render at build time) at least the "doener" tab's 11 items directly into the HTML (not just injected by JS on load — currently `render("doener")` runs on `DOMContentLoaded` via script, so even the default tab is empty in raw HTML/view-source). Ideally render all 49 items as visible, crawlable HTML (tabs can still be JS-progressive-enhanced for UX), and add `Menu`/`MenuItem`/`MenuSection` schema.org markup so AI engines and rich results can cite exact dishes and prices.

---

## Readability

- Sentences are short, plain German, no jargon — appropriate for a local food business audience. Estimated reading level: easy (roughly Flesch-equivalent "very easy" for German business copy).
- No walls of text; content is broken into scannable sections (menu, about, reviews, contact).
- No spelling/grammar issues detected.
- **Verdict: readability is a strength, not a weak point.**

---

## Keyword Optimization

- Title tag: "Döneria Dornbusch · Döner in Frankfurt am Main" — natural, includes brand + primary keyword + city.
- Meta description: mentions "Döner", "Dürüm", "Falafel", "Eschersheimer Landstraße 322, Frankfurt", "Halal" — good natural local-keyword density, not stuffed.
- On-page: "Döner", "Halal", "Dornbusch", "Eschersheimer Landstraße" appear naturally across hero/strip/contact — no stuffing detected.
- Missing: no H2/H3 targeting secondary local intents explicitly (e.g. "Döner Dornbusch liefern lassen", "Döner in der Nähe U1 U2 U3 U8") — minor opportunity, not a penalty risk.

---

## AI Citation Readiness Score: 42 / 100

**What's working:**
- `Restaurant` JSON-LD present with name, address, phone, `openingHoursSpecification`, `aggregateRating`, `priceRange` — genuinely good structured-data foundation, directly quotable by AI engines for hours/address/phone/rating.
- Clear factual statements (exact address, exact phone, exact hours) that are easy to lift as quotable facts.
- Real named-attribution testimonials (though unverifiable, see below).

**What's holding it back:**
1. **No Menu schema and no static menu HTML** — the single biggest AI-citation gap. An AI engine cannot answer "what's on the menu at Döneria Dornbusch" or "how much does a Döner cost there" from the current crawlable/structured content, despite the site literally having all 49 dishes and prices in a JS object.
2. **Rating inconsistency** (4.6 vs 4.7) creates conflicting facts across sources on the same page — AI engines penalize/avoid citing pages with self-contradictory data.
3. **No `Review` schema** for the three displayed testimonials — they exist as plain blockquotes with a first name + last initial, unlinked to any verifiable source (no date, no link to the actual Google review). This makes them citable as marketing copy but not as verifiable third-party endorsement, and borders on the "unverifiable testimonial" pattern flagged for lower-quality trust signals.
4. No FAQ section/schema (e.g. "Ist der Döner halal?", "Gibt es vegetarische/vegane Optionen?", "Gibt es Lieferung?") — easy, high-value addition for AI answer engines given these are exactly the questions users ask about a döner shop.
5. No `image` object in the Restaurant schema (only `og:image`), and no `sameAs` linking to an actual verified Google Business Profile / Maps Place ID — reduces cross-source entity confirmation.

---

## Duplicate / Thin Content Risk

- Single page, single business — no internal duplication.
- Copy patterns ("Frisch vom Spieß", "Alles wird frisch vor deinen Augen zubereitet", "So einfach ist gutes Essen") read as fairly generic local-restaurant marketing boilerplate. Not a penalty risk on their own, but combined with unverifiable reviews and no ownership story, this is the general pattern the Sept 2025 QRG flags as "no original insight, no first-hand experience signal" for low-effort AI-assisted content — even if this specific copy was human-written, it reads indistinguishable from template AI copy. Recommend adding at least one genuinely unique, specific detail (years in business, family/owner name, a specific technique or ingredient sourcing detail) to differentiate from every other döner-shop landing page using similar phrasing.
- Menu data itself (49 real dishes, real prices) is a strong originality/experience signal and should be leaned into more, not hidden behind JS.

---

## Recommendations (priority order)

1. **Fix the rating inconsistency** — change `og:description` "4,7 Sterne" to "4,6 Sterne" (or update to the current live Google rating consistently everywhere: JSON-LD, strip, reviews section, og:description).
2. **Server-render/pre-render the menu into static HTML** (at least the default "Döner & Dürüm" tab, ideally all 6 categories/49 items) so it's visible in raw HTML/view-source, not only after JS executes.
3. **Add `Menu` / `MenuSection` / `MenuItem` schema.org markup** derived from the existing `MENU` JS object — this is a near-zero-effort win since the structured data already exists in JS, it just needs to be mirrored into JSON-LD or an `itemprop`-annotated menu markup.
4. **Add `Review` schema** for the testimonials, and ideally link out to the actual Google review source or embed real Google Reviews rather than static unlinked quotes.
5. **Add an FAQ section + `FAQPage` schema** answering the top real questions (halal certification, vegetarian/vegan options, delivery/takeaway, parking/U-Bahn access — the U-Bahn detail already exists in body copy but isn't structured).
6. **Add one genuine ownership/experience detail** (years open, owner name, a specific sourcing/preparation detail) to differentiate from generic döner-shop template copy and strengthen the Experience E-E-A-T factor.
7. Consider adding `image`, `sameAs` (linked Google Business Profile), and a real embedded Google Map (not just a search-query link) to the JSON-LD/contact section to strengthen entity verification for both traditional SEO and AI engines.
