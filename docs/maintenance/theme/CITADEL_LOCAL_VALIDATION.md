# Citadel of Kang Local Validation Guide

Last reconciled: 2026-05-26

This document provides local validation commands for the current **production-active Chambers/Citadel implementation**.

These commands are intended for the user's Windows / PowerShell 7 workflow.

## Repository Path

Current local repository path:

```text
C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can
```

## Sync Latest Main

Run:

```powershell
cd "C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can"
git status -sb
git pull --ff-only origin main
```

If local files are dirty, stop and inspect before pulling.

## Current Production JavaScript Syntax Validation

Run current production-entry and module checks:

```powershell
node --check .\assets\js\script.js
node --check .\assets\js\themes\citadel-of-kang\modules\shell\global-shell.js
node --check .\assets\js\themes\citadel-of-kang\article-index-direct-rail.js
node --check .\assets\js\themes\citadel-of-kang\article-footer.js
node --check .\assets\js\themes\citadel-of-kang\modules\sections\latest-insights-section.js
node --check .\assets\js\themes\citadel-of-kang\modules\sections\insights-directory-section.js
node --check .\assets\js\themes\citadel-of-kang\modules\blog\blog-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\forms\enquiry-form.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\home-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\practice-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\contact-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\enquiry-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\general-content-page.js
```

Expected result:

```text
No output means the syntax check passed.
```

## Article / Registry Validation

Run:

```powershell
node .\tools\validate-article-encoding.js
node .\tools\validate-insights-registry.js --strict
```

Expected result:

```text
Full article encoding validation passed.
Registry validation passed.
```

## Git Whitespace Validation

Run:

```powershell
git diff --check
```

Expected result:

```text
No output means no whitespace problems in current diff.
```

If there is no local diff because all files are already committed/pulled, this command may also show no output.

## Repository Status

Run:

```powershell
git status -sb
```

Expected after syncing cleanly:

```text
## main...origin/main
```

## Manual Smoke-Test Pages

Open locally or on the deployed site:

```text
/
practice.html
legal-updates.html
case-enquiry.html
contact.html
faq.html
practice/msme-disputes.html
services/msme-recovery-lawyer-patna.html
updates/msme-facilitation-council-process.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

## Manual Checks

### Global Shell / Navigation

```text
Desktop topbar appears above nav.
Desktop social icons appear.
Desktop theme toggle appears.
Mobile drawer opens with burger button.
Mobile drawer locks background scroll.
Backdrop click closes drawer.
Escape key closes drawer.
Drawer links are keyboard reachable.
Footer social row appears once.
Active nav state does not break page navigation.
```

### Theme Toggle

```text
Light mode loads correctly.
Dark mode loads correctly.
Mode persists after reload.
Navbar logo switches correctly.
Homepage hero logo switches correctly.
No stretched or distorted logo appears.
```

### Article Modules

```text
Article Index appears on long article pages with at least 3 direct h2 headings.
Article Index does not appear on short/non-article pages.
Index links scroll to sections.
Active index item updates while scrolling.
Mobile reading progress appears correctly.
Article Footer renders tags, previous/next links and recommended reads.
```

### Blog / Insights Modules

```text
Legal Updates page renders registry-driven cards.
Latest Articles and grouped sections populate.
Filter fields work.
View All buttons work.
Pagination appears only when needed.
URL query params update without full reload.
Static fallback content remains acceptable for non-JS users until Phase 4.5 improves it.
```

### Contact / Enquiry Modules

```text
Contact page dynamic form fields switch by matter type.
Consent gate works.
Copy prepared message works.
WhatsApp and Gmail compose fallbacks produce usable links.
EmailJS direct send path reports a clear success/error state.
Case Enquiry copy-template buttons work.
```

## Browser Console Check

Open DevTools and confirm there are no JavaScript errors from:

```text
assets/js/script.js
global-shell.js
article-index-direct-rail.js
article-footer.js
latest-insights-section.js
insights-directory-section.js
blog-page.js
enquiry-form.js
page template modules
```

## Important Boundary

During Phase 1, prefer documentation reconciliation and production-reality recording.

Do not change public visual behaviour, CSS layout, SEO canonicals, article metadata, sitemap, feed or thumbnail assets unless a later roadmap phase expressly authorizes that work.

## Rollback Note

For documentation-only Phase 1 patches, rollback normally means reverting the relevant documentation commits.

For future production code changes, rollback must preserve:

```text
assets/css/style.css as public CSS entry point
assets/js/script.js as public JS entry point
assets/css/themes/chambers-ak.css as fallback theme
current Chambers black/white/gold visual identity
```
