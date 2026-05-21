# Chambers of AK — Article, Thumbnail and Social Publishing Guidelines

This document records the standing guidelines for Chambers of AK article publishing, research posts, social previews, thumbnails, social distribution copy and patch workflows.

These rules apply to current and future Chambers of AK articles unless expressly changed. When a new guideline is added later, this document must be updated along with the relevant workflow/template files.

Related files:

```text
docs/maintenance/ARTICLE_HTML_TEMPLATE.md
docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md
assets/data/insights-registry.json
CHANGELOG.md
```

## 1. Article Publishing Standard

Every new article must follow the reusable Citadel of Kang article workflow, not a one-off hardcoded page fix.

Each article should include:

- SEO title;
- meta description;
- clean URL slug;
- canonical URL;
- article summary;
- proper H1, H2 and H3 structure;
- featured image;
- references / sources section;
- disclaimer;
- useful internal links;
- visible last-updated line in the format `Last updated on: DD/MM/YYYY at HH:MM`;
- sitemap entry;
- RSS feed entry;
- `assets/data/insights-registry.json` entry;
- changelog or status note where appropriate.

Article pages must not include:

```text
- enquiry / CTA blocks inside the article body;
- article-status, research-status or workflow-status boxes;
- thumbnail generation notes;
- internal source-pack notes;
- publisher-only checklist content;
- internal implementation notes meant only for repository maintenance.
```

Article disclaimer blocks are allowed and should remain where appropriate.

## 2. Mandatory Open Graph and X/Twitter Metadata

Every current and future article page must include at least:

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

Also keep supporting tags:

```html
<meta property="og:type" content="article">
<meta property="og:site_name" content="Chambers of AK">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="675">
<meta property="og:image:alt" content="Accurate image alt text">
<link rel="canonical" href="https://chambersofak.in/article-url.html">
```

## 3. Social Image Format Rule

For social previews, use only raster images:

```text
Allowed: .png, .jpg, .jpeg, .webp
Avoid for social cards: .svg
```

This applies to:

- `og:image`;
- `twitter:image`;
- BlogPosting JSON-LD `image`;
- featured image where possible;
- `assets/data/insights-registry.json` thumbnail.

Reason: X/Twitter, LinkedIn, Facebook and WhatsApp handle raster images more reliably than SVG.

## 4. Thumbnail Style Guidelines

Thumbnails must be:

- topic-relevant;
- painted / illustrated editorial style by default;
- not random legal props;
- not copied from news websites;
- not real judges or identifiable persons;
- not inflammatory;
- suitable for a professional legal publication;
- social-card friendly, preferably `1200 × 675`.

Branding:

- use the official AK mark where branding is included;
- do not create random alternate logos;
- black/gold accents are allowed but not mandatory.

## 5. Thumbnail Colour Alternation Rule

For article and social thumbnails, use this editorial rhythm where suitable:

```text
Article 1: black & white / monochrome painted style
Article 2: coloured painted style
Article 3: black & white / monochrome painted style
Article 4: coloured painted style
```

This rhythm is secondary to topic relevance. The image must first be legally and factually relatable to the article subject.

Current intended pattern for the latest article group:

```text
PMLA BNSS — black & white
Section 34 Limitation — coloured
UAPA Bail — black & white
Sabarimala — next suitable colour decision based on sequence and topic
```

## 6. Topic-to-Image Guidance

Use image concepts that match the subject matter:

```text
PMLA / BNSS / cognizance:
Supreme Court-style institutional visual, complaint file, procedural hearing, notice, court clock.

Section 34 limitation:
Arbitration file, calendar, clock, “3 months + 30 days”, Supreme Court guidance.

UAPA bail:
Liberty, detention, Article 21, speedy trial, constitutional rights; avoid sensational prison imagery.

Sabarimala:
Respectful temple silhouette, constitutional balance, equality, religious freedom.

Property title search:
Land record, registry file, title chain, map, due-diligence/search theme.

Arbitration notice:
Contract clause, notice document, arbitration table, timeline.
```

## 7. Citadel Template Structure Rule

Recurring article, thumbnail or social-preview rules should be implemented through the reusable Citadel template/documentation structure.

Update these files where relevant:

```text
docs/maintenance/ARTICLE_HTML_TEMPLATE.md
docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md
docs/maintenance/CHAMBERS_ARTICLE_AND_SOCIAL_GUIDELINES.md
```

Do not treat recurring rules as isolated hardcoded fixes for one article.

## 8. ZIP Patch and PowerShell Package Rules

When preparing ZIP patches:

- ZIP should be downloadable to the user's Downloads folder;
- one PowerShell command should extract and run the patch;
- script should use the user's repo path by default:

```powershell
C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can
```

- script should sync from `origin/main` unless told not to;
- script should create backups before editing;
- script should validate JSON / XML / git diff;
- script should commit and push unless `-NoCommit` or `-NoPush` is used.

PowerShell interpolation rule:

```powershell
${Path}:
```

Use the above instead of:

```powershell
$Path:
```

whenever a colon follows a variable in a string.

## 9. Social Distribution Rule

For each article, prepare platform-specific copy for:

```text
LinkedIn Page
Facebook Page
X / Twitter
WhatsApp Channel
Newsletter / Email, where needed
```

Each post should include:

```text
For general information only. Not legal advice or solicitation.
```

Distribution copy should be informative and non-solicitational.

## 10. Legal Content Accuracy Rule

For legal articles:

- do not invent case numbers, bench composition, paragraph numbers, quotes or holdings;
- use cautious wording where a source is uncertain;
- clearly distinguish reported developments from signed judgments/orders;
- cite primary sources first where available;
- use legal reporting only as secondary support;
- avoid sensationalism;
- maintain professional Indian legal blog tone;
- preserve doctrinal accuracy over keyword stuffing.

## 11. Maintenance Rule

When new guidelines are added:

1. update this document;
2. update the article workflow/template docs if the rule affects implementation;
3. update `CHANGELOG.md` or an appropriate status note;
4. apply the rule consistently to future articles and, where requested, to existing articles.

## Current Batch 2 Thumbnail Pattern

`	ext
Sabarimala — coloured
Arbitration Notice Before Claim — black & white
Property Title Search — coloured
`

All three use raster social preview images and topic-relevant painted / illustrated editorial treatment.

## No Generic Graphic-Art Thumbnail Rule

Do not use flat vector-icon, template-style infographic, generic courthouse graphic, generic document icon, or random legal-prop thumbnails for Chambers of AK articles.

Article thumbnails must have a painted / editorial legal-media feel with visual depth, texture, topic-specific composition and social-card suitability. Topic relevance comes first; black & white / colour alternation is secondary.
