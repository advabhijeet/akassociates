# Citadel of Kang Phase 1B Checkpoint

This checkpoint records the current non-live foundation state for **Citadel of Kang** after adding module governance, accessibility planning, public config planning and preview-only module files.

## Status

```text
Phase: 1B
Status: non-live development foundation
Live Chambers pipeline changed: no
Production article pages changed: no
Sitemap/feed changed: no
AdSense/Search Console files changed: no
```

## Product Boundaries Confirmed

```text
Citadel of Kang = standalone theme pack and frontend module system.
Citadel Manager / Website CMS = separate admin-only website-management product.
Chambers of AK = first implementation.
Client Portal = separate secure future product.
```

## Preservation Rule

Existing Chambers/Citadel features remain the baseline.

Protected features include:

```text
premium black/white/gold identity
dark mode / theme toggle
mobile navigation behavior
footer grouping and legal disclaimer structure
social/profile link strategy
GTM / Analytics / conversion boundaries
AdSense readiness and ads.txt decisions
Search Console / canonical / sitemap / feed discipline
approved Article Index behavior
insights/filter/card behavior
PowerShell 7-compatible patch workflow
```

External references, including Newspaper 12.7.6, are used only for architecture inspiration and gap analysis. They must not replace the existing Citadel/Chambers feature base.

## Documentation Added Or Updated

### Planning and Architecture

```text
docs/maintenance/CITADEL_OF_KANG_THEME.md
docs/maintenance/CITADEL_OF_KANG_DEVELOPMENT_PLAN.md
docs/maintenance/CITADEL_OF_KANG_MODULE_INVENTORY.md
docs/maintenance/CITADEL_NEWSPAPER_LATEST_REFERENCE_ANALYSIS.md
docs/maintenance/CITADEL_PUBLIC_CONFIG_SCHEMA.md
```

### Module Governance

```text
docs/maintenance/CITADEL_MODULE_CONTRACTS.md
docs/maintenance/CITADEL_ACCESSIBILITY_CHECKLIST.md
docs/maintenance/modules/article-index.md
docs/maintenance/modules/reading-time.md
docs/maintenance/modules/reading-progress.md
```

### Product Roadmaps

```text
docs/maintenance/CITADEL_OF_KANG_THEME_MANAGER.md
docs/maintenance/CLIENT_PORTAL_ROADMAP.md
```

## Non-Live Theme Files Added

CSS namespace:

```text
assets/css/themes/citadel-of-kang/README.md
assets/css/themes/citadel-of-kang/index.css
assets/css/themes/citadel-of-kang/tokens.css
assets/css/themes/citadel-of-kang/core.css
assets/css/themes/citadel-of-kang/layout.css
assets/css/themes/citadel-of-kang/typography.css
assets/css/themes/citadel-of-kang/navigation.css
assets/css/themes/citadel-of-kang/footer.css
assets/css/themes/citadel-of-kang/components.css
assets/css/themes/citadel-of-kang/pages.css
assets/css/themes/citadel-of-kang/modules/article-index.css
assets/css/themes/citadel-of-kang/modules/reading-time.css
assets/css/themes/citadel-of-kang/modules/reading-progress.css
```

JS namespace:

```text
assets/js/themes/citadel-of-kang/README.md
assets/js/themes/citadel-of-kang/core.js
assets/js/themes/citadel-of-kang/article-index.js
assets/js/themes/citadel-of-kang/reading-time.js
assets/js/themes/citadel-of-kang/reading-progress.js
```

Config sample:

```text
assets/config/citadel-kang.sample.config.json
```

Preview-only page:

```text
preview/citadel-of-kang-article-demo.html
```

The preview page has:

```html
<meta name="robots" content="noindex, nofollow, noarchive" />
```

## Current Module Status

| Module | Status | Notes |
|---|---|---|
| Article Index | preview | Contract exists; non-live CSS/JS exists; approved behavior must be preserved. |
| Reading Time | planned/draft | Contract exists; non-live CSS/JS stub exists. |
| Reading Progress | planned/draft | Contract exists; non-live CSS/JS stub exists. |
| Theme Toggle | existing Chambers feature | Must be preserved; future extraction pending. |
| Social Bar | existing Chambers feature | Must be config-driven later. |
| Insights Filter | existing Chambers feature | Future extraction pending. |
| Reveal | existing Chambers feature | Future extraction pending. |
| Conversion Events | Chambers implementation layer | Must remain optional/config-driven. |

## Current Public Config Direction

Sample config added:

```text
assets/config/citadel-kang.sample.config.json
```

Security rule:

```text
Public config may include display-safe values only.
It must not include admin secrets, private keys, repository write tokens, client data, case data or private documents.
```

## Validation Commands

Run from local repository root:

```powershell
node --check .\assets\js\themes\citadel-of-kang\core.js
node --check .\assets\js\themes\citadel-of-kang\article-index.js
node --check .\assets\js\themes\citadel-of-kang\reading-time.js
node --check .\assets\js\themes\citadel-of-kang\reading-progress.js
git diff --check
git status -sb
```

## Manual Preview Checks

Open locally after syncing:

```text
preview/citadel-of-kang-article-demo.html
```

Check:

```text
Article Index appears.
Index section links work.
Active index item updates while scrolling.
Active item reaches the final heading.
Reading time appears in the hero meta row.
Reading progress bar moves while scrolling.
Mobile layout places index before article body.
Dark/light contrast should be reviewed later when preview has a toggle.
Keyboard tab order is logical.
Back to top works.
No console errors.
```

## Known Boundary

The non-live Citadel files are not yet wired into:

```text
assets/css/style.css
assets/js/script.js
production article pages
sitemap.xml
feed.xml
```

This is intentional.

## Next Recommended Steps

```text
1. Sync local repository and run validation commands.
2. Review preview/citadel-of-kang-article-demo.html locally.
3. Add a small local-validation PowerShell helper only if needed.
4. Begin planning extraction of existing script.js features into non-live Citadel modules.
5. Do not roll out to Chambers production until the controlled patch phase.
```

## Stop Condition Before Rollout

Do not apply Citadel of Kang modules to live Chambers pages until:

```text
module contracts are complete for production modules
accessibility checks pass
local validation passes
manual preview approval is received
PowerShell 7 rollout patch is prepared
rollback plan is clear
```
