# Citadel Local Validation Guide

Last reconciled: **13 July 2026**

Use PowerShell 7 from the repository root.

## Sync and status

```powershell
git status -sb
git pull --ff-only origin main
```

Stop if the working tree contains unrelated changes.

## Runtime syntax

```powershell
node --check .\assets\js\script.js
node --check .\assets\js\config\chambers-public-config.js
node --check .\assets\js\runtime\core-runtime.js
node --check .\assets\js\runtime\insights-runtime.js
node --check .\assets\js\runtime\module-loader.js
node --check .\assets\js\themes\citadel-of-kang\modules\shell\global-shell.js
node --check .\assets\js\themes\citadel-of-kang\modules\forms\enquiry-form.js
```

GitHub Actions syntax-checks the remaining production feature modules.

## Repository validators

```powershell
node .\tools\validate-citadel-runtime.js
node .\tools\validate-public-assets.js
node .\tools\validate-service-consolidation.js
node .\tools\validate-seo-sitewide.js
node .\tools\validate-documentation.js
node .\tools\validate-deployment-boundary.js
node .\tools\validate-article-encoding.js
node .\tools\validate-insights-registry.js --strict
node .\tools\sync-static-insight-cards.js --check
node .\tools\audit-articles-structure.js --strict
git diff --check
```

## Baseline verification

```powershell
git fetch --tags origin
git rev-list -n 1 chambers-citadel-v1
```

Expected baseline:

```text
47e8c6ed07ed2a053a46a39f3779d60fa6059edf
```

## Browser smoke pages

```text
/
?theme=citadel-of-ak-dark
legal-updates.html
contact.html
case-enquiry.html
practice.html
services/rera-lawyer-noida.html
updates/commercial-contract-review-checklist.html
```

## Runtime checks

- `data-citadel-bootstrap="ready"` appears after startup.
- Desktop topbar and theme toggle render once.
- Mobile drawer opens, locks background scroll and closes by backdrop/Escape.
- Light and dark logo assets remain undistorted.
- Homepage latest Insights cards retain native lazy images.
- Article Index appears on long articles.
- Article Footer renders tags, navigation and recommendations.
- Contact/enquiry form switching, copy and compose actions work.
- Browser console contains no failed Citadel module loads.
- Dormant public paths such as `assets/js/themes/citadel-of-kang/core.js` return 404.

## Visual-smoke evidence

Cleanup Batch 5 creates desktop/mobile and light/dark screenshots in the user's Downloads folder. Review those images before closing the batch.
