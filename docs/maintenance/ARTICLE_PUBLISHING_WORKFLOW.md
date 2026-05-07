# Article Publishing Workflow

This document defines the standard workflow for publishing a new Chambers of AK legal insight article under `updates/`.

## Purpose

Every new legal insight should be published in a consistent, document-first, non-solicitation-oriented manner and should be connected to the website's SEO, feed, social distribution and indexing workflow.

This workflow should be followed by ChatGPT, Codex, future developers and any AI agent working on the repository.

## Core Principles

- Preserve informational language.
- Do not use direct solicitation language.
- Do not claim guaranteed outcomes.
- Do not use unverifiable superlatives such as "best", "top" or "guaranteed result".
- Maintain the Chambers of AK black/white/gold premium boutique legal brand style.
- Keep the homepage firm-focused.
- Do not create or link `team.html` until team details are approved.
- Update `CHANGELOG.md` or a status note after meaningful changes.
- Use the one-command manual patch workflow when large shared files are risky to update through the connector.

## Required Files To Consider

For each new article, review or update:

```text
updates/<article-slug>.html
legal-updates.html
sitemap.xml
feed.xml
practice/<relevant-practice-page>.html
services/<relevant-service-page>.html, if contextually useful
CHANGELOG.md or docs/planning/STATUS_*.md
docs/codex/HANDOFF.md, if any work remains blocked or local-only
```

## Article Page Requirements

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
- stylesheet link;
- BlogPosting JSON-LD where appropriate;
- `page-hero` section;
- article body with useful headings;
- internal links to relevant practice/service pages;
- official reference links where needed;
- structured enquiry or document-preparation section;
- non-solicitation / informational note.

## Recommended Article Structure

Use this structure unless the topic requires a different layout:

```text
1. Page hero
2. Why this topic matters
3. When the issue usually arises
4. Key dates / limitation / timeline
5. Documents to keep ready
6. Procedure or forum route
7. Claimant / respondent / buyer / seller / accused / complainant perspective, where relevant
8. Common mistakes
9. Enquiry format
10. Useful internal pages
11. Official references
12. CTA to case enquiry
13. Non-solicitation note
```

## Legal Language Rules

Use phrases such as:

- "general information";
- "document-first preparation";
- "the next step depends on facts, documents, limitation and forum";
- "formal consultation or engagement";
- "does not create an advocate-client relationship".

Avoid phrases such as:

- "hire us now";
- "guaranteed success";
- "best lawyer";
- "top advocate";
- "we will win";
- aggressive calls to action.

## Legal Updates Page Card

Add a card near the top of `legal-updates.html`:

```html
<a class="update-item update-item-link" href="updates/<article-slug>.html">
  <span class="update-tag tag-<category>">CATEGORY</span>
  <div class="update-title">Article title in sentence case</div>
  <div class="update-excerpt">Short informational summary of the article.</div>
  <div class="update-date">Month Year</div>
</a>
```

Use existing tag classes where possible. If a new tag class is required, update CSS carefully and validate.

## Sitemap Entry

Add to `sitemap.xml`:

```xml
<url><loc>https://chambersofak.in/updates/<article-slug>.html</loc><lastmod>YYYY-MM-DD</lastmod></url>
```

Keep each `<url>` entry on its own line.

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

Update channel `lastBuildDate`.

## Internal Linking Checklist

Link from the article to:

- relevant practice page;
- relevant service page if one exists;
- relevant legal update articles;
- case enquiry page;
- document checklist page if useful.

Where contextually useful, link back to the new article from:

- relevant practice page;
- relevant service page;
- related article pages.

Do not over-link. Links should be useful and natural.

## Social Distribution Drafts

Prepare drafts for:

### LinkedIn Page

```text
New legal insight published by Chambers of AK:

<Article Title>

<2-3 sentence informational summary.>

Read: https://chambersofak.in/updates/<article-slug>.html

For general information only. Not legal advice or solicitation.
```

### WhatsApp Channel

```text
New Legal Insight | Chambers of AK

<Article Title>

<Short practical summary.>

Read:
https://chambersofak.in/updates/<article-slug>.html

For general information only. Not legal advice or solicitation.
```

### Newsletter / Email Draft

```text
Subject: <Article Title>

Chambers of AK has published a new legal insight:

<Article Title>

<Short summary of the issue, who it may be relevant for, and what documents/dates should be kept ready.>

Read the full note:
https://chambersofak.in/updates/<article-slug>.html

For general information only. Not legal advice or solicitation.
```

## Google Search Console Checklist

After push and live check:

- submit or re-submit `https://chambersofak.in/sitemap.xml` if needed;
- inspect the new article URL;
- request indexing;
- record indexing request in a status note if the article is part of a major batch.

## Validation Checklist

Run locally after the article batch or manual patch:

```powershell
node --check assets\js\script.js
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

- open article URL;
- open `legal-updates.html` and confirm card appears;
- open `feed.xml` and confirm feed item appears;
- open `sitemap.xml` and confirm article URL appears;
- check relevant practice/service page links;
- test mobile view;
- test CTA links if article contains them.

## Manual Patch Rule

If the change involves large shared files such as:

- `legal-updates.html`;
- `sitemap.xml`;
- `feed.xml`;
- `robots.txt`;
- `assets/css/style.css`;
- major docs;

ask the user:

```text
Codex or Manual?
```

If the user chooses Manual, prepare:

- ZIP patch package;
- one-command PowerShell executable;
- validation script;
- backup cleanup;
- safe staging of intended files only;
- commit and push if validation passes and scope is safe.

## Status Note Template

For major article batches, create a status note:

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
