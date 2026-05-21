# Article Publishing Workflow v4

This workflow defines how to publish a new Chambers of AK legal insight under `updates/` using the reusable Citadel of Kang article architecture.

## Current Architecture

Article publishing uses reusable shared modules and JSON metadata:

```text
Article metadata source: assets/data/insights-registry.json
Article Index: auto-loaded by assets/js/script.js
Article Footer: auto-loaded by assets/js/script.js
Pill system: assets/css/themes/citadel-of-kang/modules/pills.css
Template: docs/maintenance/ARTICLE_HTML_TEMPLATE.md
```

Do not add article metadata to `assets/js/script.js`.
Do not manually add Article Index script tags to new article pages.
Do not manually copy Article Footer HTML into articles.
Do not hard-code Chambers-only article rules outside the reusable Citadel article template structure.

## Core Principles

- Preserve informational language.
- Do not use direct solicitation language.
- Do not claim guaranteed outcomes.
- Do not use unverifiable superlatives such as `best`, `top` or `guaranteed result`.
- Maintain the premium legal editorial identity through Citadel theme modules.
- Keep article visuals topic-relevant, not generic or random.
- Use the official AK mark where article/social artwork includes Chambers branding.
- Keep the homepage firm-focused.
- Keep article pages publication-ready and reader-facing only.
- Keep internal workflow notes out of article pages.
- Update `CHANGELOG.md` or a status note after meaningful changes.

## Files To Consider For Every New Article

```text
updates/<article-slug>.html
assets/data/insights-registry.json
assets/img/citadel/<article-thumbnail>.png|jpg|jpeg|webp
sitemap.xml
feed.xml
practice/<relevant-practice-page>.html, if contextually useful
services/<relevant-service-page>.html, if contextually useful
CHANGELOG.md or docs/planning/STATUS_*.md
```

`legal-updates.html` should not be treated as the primary metadata source. The registry JSON is the source of truth for article metadata used by the homepage, Insights modules and article footer.

## Required Article Page Features

Each article under `updates/` should include:

- standard site navigation;
- standard footer;
- Google Tag Manager block consistent with existing pages;
- title tag;
- meta description;
- canonical URL;
- Open Graph title/description/type/url/site/image tags;
- X/Twitter Card tags with `summary_large_image`;
- direct public raster image URL for social cards;
- favicon/manifest links;
- current stylesheet link;
- BlogPosting JSON-LD;
- BreadcrumbList JSON-LD;
- FAQPage JSON-LD where suitable;
- `page-hero` section;
- `article.article-body` content container;
- at least three direct `h2` headings when Article Index is desired;
- `data-article-category` and `data-article-tags` fallback metadata on `article.article-body`;
- featured image/thumbnail where appropriate, without explanatory thumbnail captions/details in the article body;
- internal links to relevant practice/service pages only where genuinely useful;
- official reference links where needed;
- a visible last-updated line after the conclusion in this exact format: `Last updated on: DD/MM/YYYY at HH:MM`;
- article disclaimer block where appropriate.

## Mandatory Social Metadata Block

Every article must include at least:

```html
<meta property="og:title" content="Article Title">
<meta property="og:description" content="Short article summary">
<meta property="og:image" content="https://chambersofak.in/path/to/thumbnail.png">
<meta property="og:url" content="https://chambersofak.in/article-url.html">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Article Title">
<meta name="twitter:description" content="Short article summary">
<meta name="twitter:image" content="https://chambersofak.in/path/to/thumbnail.png">
```

Supporting tags should also remain:

```html
<meta property="og:type" content="article">
<meta property="og:site_name" content="Chambers of AK">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="675">
<meta property="og:image:alt" content="Accurate image alt text">
<link rel="canonical" href="https://chambersofak.in/article-url.html">
```

## Social Image Format Rule

Use a raster image for social preview compatibility:

```text
Allowed: .png, .jpg, .jpeg, .webp
Avoid for social previews: .svg
```

Rules:

- `og:image` must not point to SVG.
- `twitter:image` must not point to SVG.
- BlogPosting JSON-LD `image` should match the raster social image.
- `assets/data/insights-registry.json` thumbnail should normally match the raster social image.
- The article body featured image should normally use the same raster image unless there is a specific design reason to use a different body image.
- Use 16:9 dimensions, preferably `1200 × 675` or `1920 × 1080`.
- X/Twitter, LinkedIn, Facebook and WhatsApp previews should be treated as target platforms.

## Article Image Style Rule

For current and future post/article/research images:

- default to painted / illustrated editorial style;
- include AK branding only through the official AK mark when branding is used;
- ensure the image is directly related to the article topic;
- do not use random legal props merely for decoration;
- do not use copyrighted news photographs;
- do not depict real judges or real identifiable persons;
- avoid inflammatory imagery;
- black/gold accents are allowed but not mandatory for every topic;
- choose palette and composition based on the article subject while keeping the overall professional legal-editorial standard.

Examples:

```text
PMLA / BNSS / cognizance: Supreme Court-style institutional visual, complaint file, hearing notice, procedural clock.
Section 34 limitation: arbitration law book, calendar, 3 months + 30 days, clock/hourglass, Supreme Court guidance.
UAPA bail: liberty, detention, constitutional rights, speedy trial, but avoid sensational prison imagery.
Sabarimala: respectful temple / constitutional balance / equality visual language.
```

## Article Body Exclusions

Do not include the following inside article pages:

```text
- enquiry or CTA blocks inside the article body;
- article-status, research-status, publication-status or workflow-status boxes;
- explanations of the thumbnail generation process;
- thumbnail-detail captions such as composition, brand-colour or copyright notes;
- internal source-pack notes or internal publication notes;
- internal checklists intended only for the publisher.
```

These items may be recorded in documentation, GitHub commits, research folders or status notes, but not in the public article body.

## Recommended Article Structure

Use this structure unless the topic requires a different layout:

```text
1. Page hero
2. Article meta row
3. Short article summary
4. Featured image without caption or with only a necessary public-facing caption
5. Executive summary / introduction
6. Background
7. Legal framework / statutory framework
8. Case-law or procedural analysis
9. Key issues / practical implications
10. Conclusion
11. Last updated on: DD/MM/YYYY at HH:MM
12. Useful internal pages, if genuinely helpful
13. References / Sources
14. Disclaimer
```

Do not place `References / Sources` before the conclusion unless the article format specifically requires it.

## Last Updated Rule

Every new or materially updated article must include a visible line after the conclusion:

```html
<p class="article-last-updated"><strong>Last updated on:</strong> DD/MM/YYYY at HH:MM</p>
```

Rules:

- Use 24-hour time.
- Use Indian local time unless a different timezone is expressly needed.
- Place it after the conclusion and before references/internal links/disclaimer.
- It is a reader-facing maintenance marker, not an internal status note.
- Update the matching `article:modified_time`, sitemap `lastmod`, feed `lastBuildDate` and registry freshness metadata where relevant.

## Registry JSON Entry

Add one item near the top of `assets/data/insights-registry.json`:

```json
{
  "href": "updates/<article-slug>.html",
  "category": "Checklist",
  "title": "Card-friendly article title",
  "excerpt": "Short informational summary for cards, feeds and recommended reads.",
  "date": "May 2026",
  "thumbnail": "assets/img/citadel/citadel-thumb-topic.webp",
  "tags": [
    "Property",
    "Due Diligence",
    "Title Search"
  ]
}
```

Registry rules:

- `href` must exist.
- `category` should normally be `Case Brief`, `Checklist`, `Practical Guide`, `Procedure Note`, `Legal Update`, `Constitutional Law`, `Criminal Law` or `Arbitration`, as contextually appropriate.
- `title` should be concise enough for cards.
- `excerpt` should be informational and non-solicitational.
- `thumbnail` should be a public raster image path, not SVG.
- `tags` should support discovery and related-article matching.
- Long technical tags are permitted but should be used sparingly.
- Keep JSON valid: no trailing commas.

## Sitemap Entry

Add one line to `sitemap.xml`:

```xml
<url><loc>https://chambersofak.in/updates/<article-slug>.html</loc><lastmod>YYYY-MM-DD</lastmod></url>
```

## Feed Entry

Add a new item near the top of `feed.xml`:

```xml
<item>
  <title>Article Title</title>
  <link>https://chambersofak.in/updates/<article-slug>.html</link>
  <guid isPermaLink="true">https://chambersofak.in/updates/<article-slug>.html</guid>
  <pubDate>Day, DD Month YYYY 00:00:00 +0530</pubDate>
  <category>Category</category>
  <description>Short informational summary.</description>
</item>
```

Update the channel `lastBuildDate`.

## Internal Linking Checklist

Link from the article to:

- relevant practice page;
- relevant service page, if one exists;
- related legal update articles;
- document checklist page, if useful;
- disclaimer page, if appropriate.

Do not over-link. Links should be useful and natural. Do not add enquiry/CTA blocks inside article pages.

## Legal Language Rules

Use phrases such as:

- `general information`;
- `document-first preparation`;
- `the next step depends on facts, documents, limitation and forum`;
- `formal consultation or engagement`;
- `does not create an advocate-client relationship`.

Avoid phrases such as:

- `hire us now`;
- `guaranteed success`;
- `best lawyer`;
- `top advocate`;
- `we will win`;
- aggressive calls to action.

## Validation Checklist

Run locally before committing:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/article-index-direct-rail.js
node --check assets/js/themes/citadel-of-kang/article-footer.js
node --check tools/validate-insights-registry.js
node -e "JSON.parse(require('fs').readFileSync('assets/data/insights-registry.json','utf8')); console.log('insights registry JSON ok')"
node tools/validate-insights-registry.js --strict
git diff --check
[xml](Get-Content sitemap.xml -Raw)
[xml](Get-Content feed.xml -Raw)
```

## Live Check Checklist

After deployment:

- open the article URL;
- confirm Article Index appears when there are at least three h2 headings;
- confirm Article Footer appears once;
- confirm no enquiry/CTA block, article-status note or thumbnail-detail caption appears in the public article body;
- confirm the last-updated line appears after the conclusion in `DD/MM/YYYY at HH:MM` format;
- confirm `og:image` and `twitter:image` point to the raster social image;
- confirm the social image URL opens directly in browser;
- test the URL preview on X/Twitter, LinkedIn, Facebook and WhatsApp where possible;
- open homepage and confirm latest article cards load from the registry/feed flow;
- open `legal-updates.html` and test filters/search;
- open `feed.xml` and confirm feed item appears;
- open `sitemap.xml` and confirm article URL appears;
- test light mode and dark mode;
- test mobile layout.

## Google Search Console Checklist

After live check:

- submit or re-submit `https://chambersofak.in/sitemap.xml` if needed;
- inspect the new article URL;
- request indexing;
- record indexing request in a status note if the article is part of a major batch.

## Social Distribution Drafts

Prepare drafts for:

```text
LinkedIn Page
Facebook Page
X/Twitter
WhatsApp Channel
Newsletter / Email
```

Each draft must include the informational disclaimer:

```text
For general information only. Not legal advice or solicitation.
```

## Manual Patch Rule

If a change involves large shared files such as:

```text
assets/data/insights-registry.json
sitemap.xml
feed.xml
assets/css/style.css
major docs
```

ask:

```text
Codex or Manual?
```

If Manual is chosen, prepare a ZIP patch package with one-command PowerShell execution, validation and safe staging of intended files only.

## Status Note Template

For major article batches, create:

```text
docs/planning/STATUS_YYYY-MM-DD_<SHORT_TOPIC>.md
```

Include:

- files created/updated;
- commit hashes;
- validation results;
- live-check status;
- Search Console status;
- remaining follow-up.

## Registry-First Insights Directory

The `legal-updates.html` Latest Articles grid is registry-rendered by the Citadel Insights Directory section module.

Rules:

```text
- Do not manually maintain the full Latest Articles card list in legal-updates.html.
- Add article metadata to assets/data/insights-registry.json.
- Keep legal-updates.html as a lightweight module host with a no-script/RSS fallback.
- Static category blocks may remain as curated fallback/editorial sections, but the main latest directory should stay registry-first.
```

## Thumbnail Alternation Rule

For article and social thumbnails, use an alternating editorial rhythm where appropriate:

`	ext
Article 1: black & white / monochrome painted style
Article 2: coloured painted style
Article 3: black & white / monochrome painted style
Article 4: coloured painted style
`

This rhythm is secondary to topic relevance. The image must first be legally and factually relatable to the article subject. Do not use random court, scale or document visuals if they do not fit the article.
