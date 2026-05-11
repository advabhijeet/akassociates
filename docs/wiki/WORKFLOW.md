# Codex Wiki Workflow

This document mirrors the practical GitHub Wiki notes for the Chambers of AK website. It is kept inside `docs/wiki/` so maintainers, Codex, and ChatGPT can follow the same workflow even when the GitHub Wiki is unavailable through repository tools.

## Project Reference

- Live website: `https://chambersofak.in`
- Main repository: `https://github.com/advabhijeet/akassociates`
- Brand name: `Chambers of AK`
- Tagline: `Advocates & Legal Consultants`
- Change log: `CHANGELOG.md`
- Latest audit: `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`

## Website Purpose

The website presents Chambers of AK - Advocates & Legal Consultants as a static multi-page law firm website for public information, structured case-enquiry routing, Google discovery and professional credibility.

Current positioning:

- Firm/team-focused, not founder-portfolio focused.
- Homepage should remain firm-focused and should not use the founder portrait in the hero section.
- About page should describe the firm and the team’s expertise.
- Individual profiles should be placed on a future `team.html` page when team details are ready.
- Public copy must remain informational and non-solicitation oriented.

Core focus areas include:

- Cheque bounce and NI Act matters.
- MSME delayed-payment disputes.
- RERA and builder-buyer disputes across Bihar, Uttar Pradesh and Delhi NCR.
- Commercial recovery.
- Arbitration.
- Civil and property litigation.
- Real estate due diligence and title search.
- Banking recovery, DRT and SARFAESI-linked matters.
- Commercial contracts and private documentation.
- Trademark/IP advisory.

## Current Stack

- Static HTML pages.
- CSS in `assets/css/style.css`.
- Active theme package in `assets/css/themes/citadel-of-ak.css`; see `docs/maintenance/THEME_SYSTEM.md` before changing sitewide colors, fonts, surfaces, borders, shadows or tag/category colors.
- Previous/fallback theme package lives in `assets/css/themes/chambers-ak.css`.
- Citadel images live in `assets/img/citadel/`. The folder includes article thumbnails plus the light/dark marble textures used by the Citadel page surface. New articles should get a content-specific thumbnail so homepage cards, Insights cards and Citadel article hero backgrounds stay synced.
- Citadel dark mode is controlled by `assets/js/script.js` and the topbar/mobile drawer toggle.
- Keep `assets/img/logo-navbar.png` and `assets/img/logo-navbar-dark.png` on the same `620x115` canvas to avoid light/dark navbar logo size shifts.
- JavaScript in `assets/js/script.js`.
- GitHub Pages hosting from the `main` branch.
- Custom domain: `chambersofak.in`.
- Google Tag Manager: `GTM-5GMHQTJJ`.
- GA4 Measurement ID: `G-DCP7MK6V0V`.
- AdSense publisher: `pub-6935574990807827`.
- Contact page direct enquiry delivery uses the EmailJS browser SDK with public browser configuration only.

There is no build step and no package manager requirement for normal edits.

## Website Structure

### Root Public Pages

- `index.html` - homepage and primary firm landing page.
- `about.html` - firm profile and team-level expertise.
- `practice.html` - Expertise & Practice Areas overview.
- `case-enquiry.html` - structured case enquiry flow.
- `contact.html` - contact details and lead actions.
- `courts.html` - courts, tribunals and forums information.
- `legal-updates.html` - update/article index.
- `faq.html` - frequently asked questions.
- `process.html` - working process.
- `document-checklists.html` - document preparation guidance.
- `disclaimer.html` - professional disclaimer.
- `privacy-policy.html` - privacy policy.
- `terms.html` - terms and conditions.

### Public Folders

- `assets/` - CSS, JavaScript, logos, favicon assets, social preview images and profile/brand assets.
- `practice/` - informational practice-area pages.
- `services/` - high-intent SEO landing pages.
- `updates/` - legal update and guide articles.

### Internal Documentation

- `README.md` - main repository documentation.
- `CHANGELOG.md` - chronological change record.
- `docs/` - internal setup notes, SEO roadmap, legal documentation maintenance, Codex handoff and this workflow file.

### Root Files That Must Stay At Root

These files must remain at repository root because external services expect fixed root URLs:

- `CNAME`
- `robots.txt`
- `sitemap.xml`
- `ads.txt`
- `site.webmanifest`
- `google3164979181871a1d.html`
- favicon files

## Important Change Rule

Every meaningful website change should be checked against:

- `CHANGELOG.md`
- `README.md` and `docs/`
- `sitemap.xml`
- `disclaimer.html`
- `privacy-policy.html`
- `terms.html`
- SEO metadata
- Tracking and event setup
- Mobile navigation

A change is meaningful when it affects website structure, contact methods, enquiry flows, analytics, SEO, branding, domains, social links, third-party services, public page content, legal positioning, shared CSS/JavaScript, or documentation workflow.

## Changelog Rule

`CHANGELOG.md` must be updated after every meaningful modification.

Each entry should include:

- date;
- time and timezone where known;
- changed files;
- summary;
- validation or follow-up notes;
- commit hash after commit, where available.

If the changelog entry is created before the commit hash exists, add the hash in the next documentation pass or final handoff note.

## Adding A New Public Page

When adding a page:

1. Put it in the correct folder.
2. Add a unique title and meta description.
3. Add a canonical URL using `https://chambersofak.in/...`.
4. Add Open Graph and Twitter metadata.
5. Add relevant structured data where appropriate.
6. Link it from an index page, navigation element, footer, or relevant existing section.
7. Add it to `sitemap.xml`.
8. Update `CHANGELOG.md`.
9. Consider whether legal pages, `README.md`, or `docs/` need updates.
10. Request indexing in Google Search Console after deployment if the page is important.

## SEO and Analytics Workflow

The website is optimized for Google discovery, local credibility and high-intent legal queries.

### SEO Assets

- `sitemap.xml`
- `robots.txt`
- canonical URLs
- meta descriptions
- Open Graph metadata
- Twitter card metadata
- JSON-LD structured data
- high-intent service landing pages
- legal update articles

### Current Search Focus

- Cheque bounce lawyer Patna/Bihar/Delhi NCR.
- MSME recovery lawyer Bihar/Patna/Delhi NCR.
- RERA lawyer Bihar, Uttar Pradesh, Delhi NCR, Noida and Gurugram.
- Commercial recovery lawyer Patna/Bihar.
- Arbitration lawyer Bihar.
- Civil litigation and property dispute lawyer Patna/Bihar.
- Future clusters: DRT, SARFAESI, real estate due diligence, title search, commercial contracts, trademark/IP advisory.

### Event Tracking

Important lead interactions should be tracked through GTM/GA4, including:

- WhatsApp clicks.
- Email clicks.
- Phone clicks.
- Case enquiry clicks.
- Contact page actions.

Current data layer event names are `whatsapp_click`, `phone_click`, `email_click`, `case_enquiry_click` and `contact_click`.

Avoid installing GA4 both directly and through GTM at the same time, because that can double-count page views.

### Contact Form Delivery

`contact.html` includes a dynamic matter-type enquiry form. It prepares a structured message, supports direct Send Enquiry delivery through EmailJS, and preserves WhatsApp, Gmail and copy-prepared-message fallbacks.

Do not add, request, expose or commit any EmailJS private key.

Update SEO documentation when:

- New public pages are added.
- Page URLs are changed.
- Sitemap entries change.
- Google Tag Manager or GA4 setup changes.
- AdSense setup changes.
- Google Business Profile setup changes.
- New high-intent practice pages are created.

Internal SEO planning should live in `docs/seo/` and `docs/planning/` depending on whether the file is historical or forward-looking.

## Legal and Documentation Workflow

The website must remain aligned with professional standards for advocates in India and with current privacy/tracking practices.

### Public Legal Pages

- `disclaimer.html`
- `privacy-policy.html`
- `terms.html`

### Core Legal Principles To Preserve

- No advertisement or solicitation.
- No advocate-client relationship from browsing or contacting.
- No legal advice without formal consultation.
- No guarantee of outcome.
- Visitor access is voluntary and informational.
- Third-party links and tools are governed by their own policies.

### Privacy Coverage To Preserve

The privacy policy should mention:

- Information voluntarily shared through contact methods.
- Case enquiry and consultation preparation information.
- WhatsApp, email, phone and LinkedIn communication.
- GTM/GA4 analytics and event tracking.
- AdSense readiness or advertising tools if enabled.
- Third-party platform policies.
- Retention, security and privacy requests.

### Documentation Rule

When the website changes, review whether these need updates:

- `CHANGELOG.md`
- `README.md`
- `docs/`
- `sitemap.xml`
- `disclaimer.html`
- `privacy-policy.html`
- `terms.html`

The detailed checklist remains in `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`.

## Deployment Workflow

The website is deployed through GitHub Pages from the `main` branch.

Normal workflow:

```powershell
git status
git add -A
git commit -m "Describe the change"
git push origin main
```

GitHub Pages may take a short time to redeploy after a push.



### GitHub Account Selection For Local Pushes

For this repository, local patch scripts should prefer the GitHub account `advabhijeet` and the GitHub noreply email `281193757+advabhijeet@users.noreply.github.com`.

Recommended setup before local patch pushes:

```powershell
git config user.name "advabhijeet"
git config user.email "281193757+advabhijeet@users.noreply.github.com"
git config --global credential.https://github.com.useHttpPath true

if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh auth switch --hostname github.com --user advabhijeet
  gh auth status --active --hostname github.com
} else {
  Write-Host "GitHub CLI not found. If Git prompts during push, choose the advabhijeet account."
}

git remote -v
```

This is intended for local Git/GitHub authentication where more than one GitHub account is connected. It does not require ChatGPT GitHub App write access.

### ChatGPT Connector And Manual Patch Rule

ChatGPT may inspect repository files through connected GitHub access, but it should not imply that it has updated the user's local Windows workspace. When ChatGPT cannot safely make and validate a repository change through its connector, it must use the documented manual patch or Codex handoff path instead of guessing or leaving undocumented instructions.

Use this rule:

```text
If ChatGPT cannot directly and safely patch, validate, commit and push through its available connector, it should prepare a manual patch package or update docs/codex/HANDOFF.md for Codex.
```

For local/manual updates, follow `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`. The patch package should include intended files only, validation commands, changelog entry text, commit guidance and a push path using the `advabhijeet` Git identity.

### Live Checks, Codex Smoke Tests And ChatGPT Limits

For live/deployment validation boundaries, use `docs/codex/CHATGPT_CODEX_LIVE_CHECK_BOUNDARY.md`.

Rules:

- ChatGPT may inspect repository files, commits and documentation through connected GitHub tools.
- ChatGPT must not claim that a live visual check or smoke test has passed unless it actually opened and inspected the live website in the current environment.
- If ChatGPT cannot access the live site, it must ask the user to manually check the relevant URLs and report the result.
- Codex/local automation may run browser smoke tests, Playwright/Chrome checks and live route checks when it has working browser/network access.
- Keep these labels separate: repository source check, local smoke test, live visual check and manual user check.

### Universal PowerShell 7 Patch Package Command

For downloadable manual patch packages, use a short PowerShell 7 command that extracts the ZIP from the default Downloads folder into the repository root, then runs the package apply script.

Pattern:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -Command "& { `$RepoPath='C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can'; `$ZipPath=Join-Path `$env:USERPROFILE 'Downloads\<PATCH-ZIP-NAME>.zip'; Expand-Archive -LiteralPath `$ZipPath -DestinationPath `$RepoPath -Force; Set-Location `$RepoPath; pwsh -NoProfile -ExecutionPolicy Bypass -File '.\<EXTRACTED-PATCH-FOLDER>\patch-package\scripts\<APPLY-SCRIPT-NAME>.ps1' -RepoPath `$RepoPath }"
```

The patch package's internal apply script should handle backups, validation, intended-file staging, commits and push. Preserve `.wiki-clone/` and `.wiki-work/`.

### Cache Busting

Shared CSS and JavaScript files are referenced with query-string versions, for example:

```html
assets/css/style.css?v=theme-package-3
assets/js/script.js?v=citadel-live-2
```

When changing shared CSS or JavaScript, bump the version string across all HTML pages.

### Deployment Checks

After pushing:

1. Confirm the commit appears on GitHub.
2. Confirm GitHub Pages deployment completes.
3. Check the live homepage.
4. Confirm CSS and JS cache versions are current.
5. Check desktop and mobile navigation.
6. Check important lead buttons: WhatsApp, email, phone and case enquiry.

### Rollback

Use revert instead of force-pushing:

```powershell
git log --oneline -10
git revert <commit-hash>
git push origin main
```

Each meaningful change should have its own commit so rollback stays simple.



### Non-Fast-Forward Recovery For Local Patch Commits

If a local patch commit is amended after `origin/main` has advanced, the push may be rejected as non-fast-forward.

Do not force-push by default.

Safe recovery:

```powershell
git fetch origin
git reset --soft origin/main
git status -sb
git diff --cached --stat
git commit -m "<clear forward-fix message>"
git push origin main
```

Reusable patch scripts should set the Git noreply identity before committing and should avoid `git commit --amend` unless the branch is not behind `origin/main`.

### Terminal Diff Output Policy

Manual patch scripts should keep terminal output readable. Use summary diff output by default:

```powershell
git diff --stat
git diff --name-only
```

Do not print full diffs for large shared files unless the user requests verbose output. If needed, save the full diff to a temporary `.diff` file and print the path.

## Pre-Push Maintenance Checklist

### Content

- Page copy is accurate.
- Branding says `Chambers of AK`.
- Tagline says `Advocates & Legal Consultants`.
- Practice areas and jurisdictions are described correctly.
- No wording creates an unintended guarantee or solicitation issue.

### Links

- Internal links work.
- Contact links work.
- WhatsApp links work.
- Email links work.
- Navbar logo links to homepage.
- Footer links include disclaimer, privacy policy and terms.

### SEO

- Title is unique.
- Meta description is useful.
- Canonical URL is correct.
- Open Graph image uses the logo preview.
- Sitemap is updated if public URLs changed.
- JSON-LD remains valid.

### Tracking

- GTM container remains installed.
- GA4 is not duplicated.
- Lead events still fire after CTA changes.
- New enquiry buttons are tracked when needed.

### Design

- Desktop navigation is stable.
- Mobile burger menu works.
- Mobile drawer does not show off-canvas content when closed.
- Buttons are readable.
- Gold accent links and buttons are consistent.
- Logo and favicon assets are consistent.

### Legal and Docs

Review these whenever relevant:

- `CHANGELOG.md`
- `disclaimer.html`
- `privacy-policy.html`
- `terms.html`
- `README.md`
- `docs/`
- `sitemap.xml`

## Validation

Run these checks where possible:

```powershell
node --check assets\js\script.js
git diff --check
```

For larger changes, also run the internal link/source check and JSON-LD parsing check from the root `README.md`.

## Recurring Review

A weekly Codex app automation exists:

```text
monthly-legal-and-documentation-review
```

It is a periodic helper. It does not replace the need to update legal and documentation files during the same work cycle as meaningful website changes.

