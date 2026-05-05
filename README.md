# Chambers of AK Website

Official static website for **Chambers of AK - Advocates & Legal Consultants**.

Live site: [https://chambersofak.in](https://chambersofak.in)  
Repository: [advabhijeet/akassociates](https://github.com/advabhijeet/akassociates)

## Overview

This repository contains the public website for Chambers of AK, a law practice focused on business disputes, commercial recovery, MSME delayed-payment matters, cheque bounce litigation, arbitration, RERA/property disputes, and civil-commercial work across Bihar, Uttar Pradesh, and Delhi NCR.

The website is built as a static multi-page site using plain HTML, CSS, and JavaScript. It is designed for GitHub Pages deployment with a custom domain.

## Technology

- HTML5 static pages
- CSS3 custom styling in `assets/css/style.css`
- Vanilla JavaScript in `assets/js/script.js`
- GitHub Pages hosting
- Google Tag Manager for analytics and event tracking
- SEO metadata, sitemap, robots.txt, Open Graph, and JSON-LD structured data

There is no build step and no package manager requirement for normal edits.

## Folder Structure

```text
.
|-- index.html
|-- about.html
|-- contact.html
|-- practice.html
|-- case-enquiry.html
|-- courts.html
|-- legal-updates.html
|-- faq.html
|-- process.html
|-- privacy-policy.html
|-- terms.html
|-- disclaimer.html
|-- assets/
|   |-- css/
|   |   `-- style.css
|   |-- js/
|   |   `-- script.js
|   `-- img/
|       |-- logo-navbar.png
|       |-- primary-logo.png
|       |-- social-preview.png
|       `-- profile/favicon assets
|-- practice/
|   `-- detailed practice-area pages
|-- services/
|   `-- high-intent SEO landing pages
|-- updates/
|   `-- legal update and guide articles
|-- docs/
|   `-- internal planning, SEO, and Google setup notes
|-- CNAME
|-- robots.txt
|-- sitemap.xml
|-- ads.txt
`-- site.webmanifest
```

## Key Public Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Homepage and primary brand landing page |
| `about.html` | Advocate/firm profile and credentials |
| `practice.html` | Overview of practice areas |
| `case-enquiry.html` | Case enquiry and consultation preparation |
| `contact.html` | Contact, WhatsApp, email, and profile links |
| `legal-updates.html` | Index of legal update articles |
| `courts.html` | Courts and forums handled |
| `faq.html` | Frequently asked questions |
| `privacy-policy.html` | Mandatory privacy policy |
| `terms.html` | Mandatory terms and conditions |
| `disclaimer.html` | Legal website disclaimer |

## Important Root Files

These files must stay in the repository root because external services look for them there:

- `CNAME` - custom domain configuration for GitHub Pages: `chambersofak.in`
- `robots.txt` - crawler rules and sitemap reference
- `sitemap.xml` - submitted to Google Search Console
- `ads.txt` - Google AdSense publisher declaration
- `google3164979181871a1d.html` - Google site verification file
- `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png` - browser favicon discovery
- `site.webmanifest` - PWA/browser metadata

## Branding

Primary brand name:

```text
Chambers of AK
```

Tagline:

```text
Advocates & Legal Consultants
```

Main brand colors:

```text
Black: #000000 / #111111
White: #ffffff
Gold accent: #d4af37
```

Logo assets are stored in `assets/img/`.

## SEO Setup

The website includes:

- Unique titles and meta descriptions
- Canonical URLs
- Open Graph and Twitter preview metadata
- Logo-based social preview image
- JSON-LD structured data
- Sitemap submitted through Google Search Console
- Search-focused landing pages under `services/`
- Informational practice pages under `practice/`
- Article/update pages under `updates/`

When adding a new public page:

1. Add the HTML page in the correct folder.
2. Add a unique `<title>` and meta description.
3. Add a canonical URL using `https://chambersofak.in/...`.
4. Add Open Graph metadata.
5. Add relevant JSON-LD structured data where appropriate.
6. Link to the page from a relevant index or section.
7. Add the URL to `sitemap.xml`.
8. Request indexing in Google Search Console after deployment.

## Analytics and Marketing Setup

Google Tag Manager is installed across the site.

```text
GTM Container ID: GTM-5GMHQTJJ
GA4 Measurement ID: G-DCP7MK6V0V
AdSense Publisher ID: pub-6935574990807827
```

GA4 should be controlled through GTM to avoid duplicate page-view tracking.

Tracked interaction events include important lead actions such as WhatsApp clicks, email clicks, phone clicks, and case enquiry actions.

## Social Profiles

Current official public social links:

- Firm LinkedIn Page: [https://www.linkedin.com/company/chambersofak](https://www.linkedin.com/company/chambersofak)
- WhatsApp Channel: [https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33](https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33)

The generated social icons in the header, mobile drawer, and footer are controlled from `assets/js/script.js`.

## Local Preview

Because this is a static site, pages can be opened directly in a browser. For a cleaner local preview, run a small local server from the repository root:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Cache Busting

HTML pages reference CSS and JavaScript with version query strings, for example:

```html
assets/css/style.css?v=legal-1
assets/js/script.js?v=socialbar-2
```

When changing shared CSS or JavaScript, update the query string across HTML pages so browsers and mobile devices fetch the latest files.

## Quality Checks

Before pushing changes, run these checks where possible.

JavaScript syntax:

```powershell
node --check assets\js\script.js
```

Git whitespace check:

```powershell
git diff --check
```

Internal link/source check:

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

JSON-LD validation:

```powershell
$ErrorActionPreference = 'Stop'
$count = 0
Get-ChildItem -Recurse -Filter *.html | Where-Object { $_.FullName -notlike '*\.git\*' } | ForEach-Object {
  $html = Get-Content -LiteralPath $_.FullName -Raw
  $matches = [regex]::Matches($html, '<script type="application/ld\+json">\s*(.*?)\s*</script>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  foreach ($match in $matches) {
    $null = $match.Groups[1].Value | ConvertFrom-Json
    $count++
  }
}
"JSON-LD blocks parsed: $count"
```

## Deployment

Deployment is handled by GitHub Pages from the `main` branch.

Basic workflow:

```powershell
git status
git add -A
git commit -m "Describe the change"
git push origin main
```

After pushing, GitHub Pages may take a short time to redeploy. If the live website still shows the previous version, check:

1. The latest commit exists on GitHub.
2. GitHub Pages deployment status.
3. Browser cache or CDN cache.
4. Whether the live HTML references the latest CSS/JS cache-busting version.

## Rollback

Every meaningful change should be committed separately so rollback is simple.

To inspect recent versions:

```powershell
git log --oneline -10
```

To revert a specific commit without deleting history:

```powershell
git revert <commit-hash>
git push origin main
```

Avoid force-pushing or resetting public history unless there is a very specific reason.

## Maintenance Notes

- Keep public website files at the root or in public folders such as `practice/`, `services/`, and `updates/`.
- Keep internal planning notes inside `docs/`.
- Keep legal disclaimer, privacy policy, and terms linked from the footer.
- Keep social preview image as a logo/brand image, not a personal profile photo.
- Re-check mobile navigation after header, social, or menu changes.
- Re-test important click events in GTM Preview after contact CTA changes.
- Update `sitemap.xml` whenever adding or removing indexed pages.

## Documentation Update Policy

Documentation and legal-policy pages should be reviewed as part of every meaningful website change. In practice:

- Update `README.md` when site structure, deployment, tracking IDs, cache-busting versions, domains, branding, or maintenance workflow changes.
- Update `docs/` when SEO, Google, analytics, business profile, or operational setup changes.
- Review `disclaimer.html`, `privacy-policy.html`, and `terms.html` when contact methods, enquiry flows, analytics/tracking, AdSense/advertising, social links, third-party tools, branding, or professional positioning changes.
- Update `sitemap.xml` when public indexed pages are added, removed, renamed, or moved.
- Keep policy-page changes in the same commit as the website feature that requires them whenever possible.

The detailed maintenance checklist is in `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`.
A monthly Codex app review automation is also active under `monthly-legal-and-documentation-review`.

## License and Rights

This repository contains brand assets, copy, images, and website materials for Chambers of AK. Do not reuse the branding, legal copy, photographs, or website assets without permission from the owner.
