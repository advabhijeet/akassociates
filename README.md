# Chambers of AK Website

Official static website repository for **Chambers of AK - Advocates & Legal Consultants**.

Live site: [https://chambersofak.in](https://chambersofak.in)  
Repository: [advabhijeet/akassociates](https://github.com/advabhijeet/akassociates)

## Current Status

The website is a static, multi-page GitHub Pages site for Chambers of AK. It is positioned as a **firm/team-focused legal website**, not an individual portfolio page.

Current positioning:

- Homepage hero is firm-focused and no longer displays the founder portrait.
- Homepage includes a firm-level About section.
- `about.html` is firm/team-focused, with founder details retained only as institutional context.
- `practice.html` works as the main **Expertise & Practice Areas** page.
- Broader expertise includes civil litigation, property due diligence, title search, DRT, SARFAESI, MSME, RERA, arbitration, cheque bounce, commercial contracts, private documentation, land-acquisition-linked disputes, taxation-aware review and trademark/IP advisory.
- Future `team.html` page is planned, but should only be added when team-member details are ready.

## Technology

- Static HTML5 pages.
- CSS3 custom styling in `assets/css/style.css`.
- Vanilla JavaScript in `assets/js/script.js`.
- EmailJS browser SDK on `contact.html` for the direct structured enquiry send flow.
- GitHub Pages hosting from the `main` branch.
- Custom domain through `CNAME`.
- Google Tag Manager for analytics and lead-event tracking.
- SEO metadata, sitemap, robots.txt, Open Graph, Twitter cards and JSON-LD structured data.

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
|-- document-checklists.html
|-- faq.html
|-- process.html
|-- privacy-policy.html
|-- terms.html
|-- disclaimer.html
|-- assets/
|   |-- css/style.css
|   |-- css/themes/chambers-ak.css
|   |-- js/script.js
|   |-- img/
|   `-- img/citadel/
|-- practice/
|-- services/
|-- updates/
|-- docs/
|   |-- README.md
|   |-- REPOSITORY_ORGANIZATION.md
|   |-- audits/
|   |-- codex/
|   |-- google/
|   |-- maintenance/
|   |-- planning/
|   |-- seo/
|   `-- wiki/
|-- CHANGELOG.md
|-- CNAME
|-- robots.txt
|-- sitemap.xml
|-- ads.txt
|-- google3164979181871a1d.html
`-- site.webmanifest
```

## Key Public Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Homepage and primary firm landing page |
| `about.html` | Firm profile, team-level expertise and institutional background |
| `practice.html` | Main expertise and practice-area overview |
| `case-enquiry.html` | Structured case enquiry and consultation preparation |
| `contact.html` | Contact, WhatsApp, email and profile links |
| `legal-updates.html` | Index of legal update articles |
| `document-checklists.html` | Document preparation guidance |
| `courts.html` | Courts, tribunals and forums information |
| `faq.html` | Frequently asked questions |
| `process.html` | Matter-handling process overview |
| `privacy-policy.html` | Privacy policy |
| `terms.html` | Website terms and conditions |
| `disclaimer.html` | Legal website disclaimer |

## Main Content Groups

### Practice / Expertise Pages

Detailed practice pages live under `practice/` and support the main expertise page:

- Cheque bounce / Section 138 NI Act.
- MSME delayed payment disputes.
- Commercial recovery and business dues.
- RERA and builder-buyer disputes.
- Arbitration.
- Property and civil suits.

### Service Landing Pages

High-intent landing pages live under `services/`. These pages should be specific, document-led and non-duplicative. Current clusters include:

- Cheque bounce: Bihar, Patna, Delhi NCR.
- MSME recovery: Bihar, Patna, Delhi NCR.
- RERA: Patna, Noida, Gurugram, Bihar/UP/Delhi NCR.
- Commercial recovery: Bihar, Patna.
- Property disputes and civil litigation: Bihar and Patna.
- Arbitration: Bihar.

### Legal Updates

Legal updates and guides live under `updates/`. They should be informational, non-promissory and internally linked to related practice pages, service pages, checklists and the enquiry page.

## Important Root Files

These files must remain at the repository root because external services look for them there:

- `CNAME` - GitHub Pages custom domain: `chambersofak.in`.
- `robots.txt` - crawler rules and sitemap reference.
- `sitemap.xml` - submitted to Google Search Console.
- `ads.txt` - AdSense publisher declaration.
- `google3164979181871a1d.html` - Google site verification file.
- favicon files - browser favicon discovery.
- `site.webmanifest` - browser/PWA metadata.

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

The shared site design is packaged as a CSS theme:

```text
assets/css/themes/citadel-of-ak.css
```

`assets/css/style.css` imports the active theme and contains shared layout/component rules. To swap visual themes, create a replacement theme file with the same CSS custom properties, update the import at the top of `style.css`, and bump the stylesheet cache string across public HTML pages.

Theme maintenance reference:

```text
docs/maintenance/THEME_SYSTEM.md
```

Available theme packages:

```text
Active: assets/css/themes/citadel-of-ak.css
Fallback / previous: assets/css/themes/chambers-ak.css
Theme reference hub: theme-preview-citadel-of-ak.html
Citadel media assets: assets/img/citadel/
Dark mode: use the Dark mode button in the desktop topbar or mobile drawer.
```

Design direction: modern boutique legal brand, black/white base, gold accent, serif monogram/logotype, premium but restrained.

Logo, founder profile and brand assets are stored in `assets/img/`. Dark-mode logo variants are `assets/img/primary-logo-dark.png` and `assets/img/logo-navbar-dark.png`; keep light/dark navbar logos on the same `620x115` canvas to prevent size shifts. Citadel thumbnails and light/dark marble surface textures are stored in `assets/img/citadel/`; new article thumbnails should be generated or selected per article so homepage, Insights cards and article hero backgrounds stay synced.

## SEO Setup

The website includes:

- Unique page titles and meta descriptions where updated.
- Canonical URLs using `https://chambersofak.in/...`.
- Open Graph and Twitter preview metadata.
- Logo-based social preview image.
- JSON-LD structured data where appropriate.
- `robots.txt` pointing to `sitemap.xml`.
- Sitemap submitted through Google Search Console.
- Search-focused landing pages under `services/`.
- Informational practice pages under `practice/`.
- Legal update pages under `updates/`.

When adding a public page:

1. Add the HTML file in the correct folder.
2. Add a unique `<title>` and meta description.
3. Add a canonical URL using `https://chambersofak.in/...`.
4. Add Open Graph/Twitter metadata.
5. Add JSON-LD structured data where useful.
6. Link the page from a relevant index, practice page or hub.
7. Add the URL to `sitemap.xml`.
8. Update `CHANGELOG.md` with date, time, files and summary.
9. Update relevant documentation in `README.md`, `docs/` and wiki/mirror docs.
10. Request indexing in Google Search Console after deployment if the page is important.

## Analytics and Marketing Setup

Google Tag Manager is installed across the site.

```text
GTM Container ID: GTM-5GMHQTJJ
GA4 Measurement ID: G-DCP7MK6V0V
AdSense Publisher ID: pub-6935574990807827
```

GA4 should be controlled through GTM to avoid duplicate page-view tracking.

Tracked interaction events include important lead actions such as WhatsApp clicks, email clicks, phone clicks and case enquiry actions.

AdSense readiness is documented in `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`. If AdSense is approved and enabled, ads should be limited to article-style legal information pages, remain subtle, and should not appear on homepage, contact, case enquiry, practice/service landing pages or policy/trust pages.

## Contact Form Delivery

`contact.html` includes a dynamic matter-type enquiry form. It prepares a structured message, supports direct Send Enquiry delivery through EmailJS, and keeps WhatsApp, Gmail and copy-prepared-message fallbacks available.

Current public EmailJS configuration:

```text
Public Key: rivGZ1UliuSkSgFdm
Service ID: chambersofak
Template ID: contactformtempid
```

Do not add, request, expose or commit any EmailJS private key.

## Social Profiles

Current official public social links:

- Firm LinkedIn Page: [https://www.linkedin.com/company/chambersofak](https://www.linkedin.com/company/chambersofak)
- WhatsApp Channel: [https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33](https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33)

Generated social icons in the desktop topbar, mobile drawer and footer are controlled from `assets/js/script.js`.

## Change Tracking Policy

`CHANGELOG.md` is the primary chronological record for repository changes.

Every meaningful modification must update the changelog with:

- date;
- time and timezone where known;
- changed files;
- summary;
- validation or follow-up notes;
- commit hash after commit, if available.

## Documentation Map

| File | Purpose |
| --- | --- |
| `README.md` | Repository overview and operating rules |
| `CHANGELOG.md` | Date/time change tracking |
| `docs/README.md` | Documentation index |
| `docs/REPOSITORY_ORGANIZATION.md` | Repository/documentation structure rules |
| `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md` | Current repository and website audit |
| `docs/codex/HANDOFF.md` | Codex handoff and connector-limit notes |
| `docs/codex/PROMPT_RULE.md` | Codex prompt template and handoff rule |
| `docs/google/GOOGLE_SETUP.md` | Google Search Console, GTM, GA4, GBP and AdSense notes |
| `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md` | Legal/documentation maintenance checklist |
| `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md` | AdSense readiness and article-only subtle ads plan |
| `docs/planning/SEO_GROWTH_AGENDA.md` | SEO roadmap and pending work |
| `docs/planning/TEAM_PAGE_AGENDA.md` | Future Team page plan |
| `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md` | Historical Batch 1 SEO content record |
| `docs/wiki/WORKFLOW.md` | In-repository wiki/workflow mirror |

## PowerShell 7 Manual Patch Environment

Preferred shell for local manual patching and validation is PowerShell 7 (`pwsh`). Run patch and validation scripts from the repository root unless a patch package README states otherwise. Avoid staging untracked `.wiki-clone/` or `.wiki-work/` folders during manual patch work.

ChatGPT connector note: if ChatGPT cannot directly and safely patch, validate, commit and push through its available GitHub connector, it should prepare a manual patch package or update `docs/codex/HANDOFF.md` for Codex. Local Windows workspace changes require Codex/local execution or the documented manual patch workflow.

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
assets/css/style.css?v=theme-package-3
assets/js/script.js?v=citadel-live-4
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


### Local GitHub Account Selection

When applying manual patch packages from a local machine with multiple GitHub accounts connected, use the `advabhijeet` account and GitHub noreply email `281193757+advabhijeet@users.noreply.github.com` for this repository.

Recommended local setup:

```powershell
git config user.name "advabhijeet"
git config user.email "281193757+advabhijeet@users.noreply.github.com"
git config --global credential.https://github.com.useHttpPath true
gh auth switch --hostname github.com --user advabhijeet
gh auth status --active --hostname github.com
```

If GitHub CLI is not available, choose the `advabhijeet` account if Git Credential Manager prompts during `git push`.

## Deployment

Deployment is handled by GitHub Pages from the `main` branch.

Basic workflow:

```powershell
git status
git add -A
git commit -m "Describe the change"
git push origin main
```

After pushing, GitHub Pages may take a short time to redeploy.

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

Avoid force-pushing or resetting public history unless there is a specific reason.

## Maintenance Rules

- Keep public website files at the root or in public folders such as `practice/`, `services/` and `updates/`.
- Keep internal planning notes inside the correct `docs/` subfolder.
- Keep legal disclaimer, privacy policy and terms linked from the footer.
- Keep social preview image as a logo/brand image, not a personal profile photo.
- Keep the homepage firm-focused.
- Move detailed individual profiles to the future `team.html` page.
- Re-check mobile navigation after header, social or menu changes.
- Re-test important click events in GTM Preview after contact CTA changes.
- Update `sitemap.xml` whenever adding, removing, renaming or moving indexed pages.
- Update `CHANGELOG.md` after every meaningful modification.

## Documentation Update Policy

Documentation and legal-policy pages should be reviewed as part of every meaningful website change.

- Update `README.md` when site structure, deployment, tracking IDs, cache-busting versions, domains, branding, positioning or maintenance workflow changes.
- Update `docs/` when SEO, Google, analytics, business profile, operational setup or handoff state changes.
- Review `disclaimer.html`, `privacy-policy.html` and `terms.html` when contact methods, enquiry flows, analytics/tracking, AdSense/advertising, social links, third-party tools, branding or professional positioning changes.
- Update `sitemap.xml` when public indexed pages are added, removed, renamed or moved.
- Update `CHANGELOG.md` for every meaningful change.

The detailed maintenance checklist is in `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`.

## License and Rights

This repository contains brand assets, copy, images and website materials for Chambers of AK. Do not reuse the branding, legal copy, photographs or website assets without permission from the owner.
