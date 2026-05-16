# Article Publishing Workflow v2

This workflow defines how to publish a new Chambers of AK legal insight under `updates/` after the Citadel reusable module architecture was introduced.

## Current Architecture

Article publishing now uses reusable shared modules and JSON metadata:

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

## Core Principles

- Preserve informational language.
- Do not use direct solicitation language.
- Do not claim guaranteed outcomes.
- Do not use unverifiable superlatives such as `best`, `top` or `guaranteed result`.
- Maintain the black/white/gold premium boutique legal brand style through Citadel theme modules.
- Keep the homepage firm-focused.
- Update `CHANGELOG.md` or a status note after meaningful changes.
- Use the one-command manual patch workflow when large shared files are risky to update directly.

## Files To Consider For Every New Article

```text
updates/<article-slug>.html
assets/data/insights-registry.json
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
- Twitter card tags;
- favicon/manifest links;
- current stylesheet link;
- BlogPosting JSON-LD;
- BreadcrumbList JSON-LD;
- `page-hero` section;
- `article.article-body` content container;
- at least three direct `h2` headings when Article Index is desired;
- `data-article-category` and `data-article-tags` fallback metadata on `article.article-body`;
- internal links to relevant practice/service pages;
- official reference links where needed;
- structured enquiry or document-preparation section;
- non-solicitation / informational note.

## Recommended Article Structure

Use this structure unless the topic requires a different layout:

```text
1. Page hero
2. Article meta row
3. Short article summary
4. Why this topic matters
5. When the issue usually arises
6. Key dates / limitation / timeline
7. Documents to keep ready
8. Procedure or forum route
9. Claimant / respondent / buyer / seller / accused / complainant perspective, where relevant
10. Common mistakes
11. Enquiry format
12. Useful internal pages
13. Official references
14. CTA to case enquiry
15. Non-solicitation note
```

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
- `category` should normally be `Case Brief`, `Checklist`, `Practical Guide`, `Procedure Note` or `Legal Update`.
- `title` should be concise enough for cards.
- `excerpt` should be informational and non-solicitational.
- `tags` should support discovery and related-article matching.
- Long technical tags are permitted but should be used sparingly.
- Keep JSON valid: no trailing commas.

## Category And Pill Rules

The Citadel pill system groups pills by purpose:

```text
Category pills: content type, strongest visual identity
Tag pills: topic discovery, lighter visual identity
Technical tag pills: long statutory/topic tags, same tag family with wider handling
Meta pills: date/status labels, muted
Filter/action pills: clickable filters and pagination controls
```

Do not create one-off colors for individual categories such as only `Checklist` or only `Case Brief`. Visual differences should be by pill group, not by label.

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
- case enquiry page;
- document checklist page, if useful.

Where contextually useful, link back to the new article from:

- relevant practice page;
- relevant service page;
- related article pages.

Do not over-link. Links should be useful and natural.

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

Run JSON-LD validation:

```powershell
$ErrorActionPreference = 'Stop'
$count = 0
Get-ChildItem -Recurse -Filter *.html | Where-Object { $_.FullName -notlike '*\.git\*' } | ForEach-Object {
  $html = Get-Content -LiteralPath $_.FullName -Raw
  $matches = [regex]::Matches($html, '<script type="application/ld\+json">\s*(.*?)\s*</script>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  foreach ($match in $matches) {
    try {
      $null = $match.Groups[1].Value | ConvertFrom-Json
      $count++
    } catch {
      Write-Output "JSON-LD error in $($_.FullName)"
      throw
    }
  }
}
"JSON-LD blocks parsed: $count"
```

Run internal reference check:

```powershell
$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$missing=@()
Get-ChildItem -Recurse -Filter *.html | Where-Object { $_.FullName -notlike '*\.git\*' } | ForEach-Object {
  $file=$_.FullName
  $dir=Split-Path $file -Parent
  $html=Get-Content -LiteralPath $file -Raw
  $matches=[regex]::Matches($html, '(?:href|src)="([^"]+)"')
  foreach($m in $matches){
    $ref=$m.Groups[1].Value
    if($ref -match '^(https?:|mailto:|tel:|#|javascript:|data:)'){ continue }
    $clean=$ref -replace '\?.*$',''
    if($clean.StartsWith('/')){ $target=Join-Path $root $clean.TrimStart('/') } else { $target=Join-Path $dir $clean }
    if(-not (Test-Path -LiteralPath $target)){ $missing += "$(Resolve-Path -LiteralPath $file -Relative): $ref" }
  }
}
if($missing.Count){ $missing | ForEach-Object { Write-Output $_ }; exit 1 }
'Internal href/src references ok'
```

## Live Check Checklist

After deployment:

- open the article URL;
- confirm Article Index appears when there are at least three h2 headings;
- confirm Article Footer appears once;
- open homepage and confirm latest article cards load from the registry/feed flow;
- open `legal-updates.html` and test filters/search;
- open `feed.xml` and confirm feed item appears;
- open `sitemap.xml` and confirm article URL appears;
- test light mode and dark mode;
- test mobile layout;
- test CTA links.

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
