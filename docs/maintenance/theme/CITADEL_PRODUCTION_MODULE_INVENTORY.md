# Citadel Production Module Inventory

Last updated: 2026-05-26

This document records the current production reality for the Citadel-derived Chambers of AK frontend system. It is a Phase 1 production-finalization aid and should be used with:

```text
docs/PROJECT_ROADMAP.md
docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md
docs/maintenance/THEME_SYSTEM.md
docs/maintenance/CITADEL_OF_KANG_THEME.md
docs/maintenance/CITADEL_MODULE_CONTRACTS.md
```

## Production Position

Chambers of AK is already running a Citadel-derived production frontend.

The implementation is not yet a clean standalone Citadel of Kang package. It is a transitional production implementation inside the Chambers of AK repository.

Working classification:

```text
Chambers of AK repository = production website and first implementation.
Citadel of Kang = reusable theme/module direction being stabilized inside this repo.
Citadel Manager / Website CMS = future admin/CMS product, not part of public frontend modules.
Client Portal = future secure product, not part of public website/theme modules.
```

## Public Entry Points

```text
CSS entry: assets/css/style.css
JS entry:  assets/js/script.js
```

`assets/css/style.css` imports the active theme and active module CSS. `assets/js/script.js` remains the public production loader for the Citadel-derived modules.

## Production-Active Module Inventory

| Module / layer | Status | Current file(s) | Current role | Extraction note |
|---|---|---|---|---|
| Theme entry / shared layout | Production | `assets/css/style.css` | Shared layout and component CSS entry point. Imports active theme and module CSS. | Keep as public entry point during Chambers implementation. |
| Active Chambers Citadel theme | Production | `assets/css/themes/citadel-of-ak.css` | Active visual token/theme package for Chambers of AK. | Chambers-branded implementation; reusable Citadel theme should later separate neutral tokens. |
| Fallback Chambers theme | Rollback fallback | `assets/css/themes/chambers-ak.css` | Previous/fallback theme package retained for rollback. | Do not remove without explicit cleanup phase. |
| Article Index CSS | Production | `assets/css/themes/citadel-of-kang/modules/article-index.css` | Article index layout, rail, mobile progress and related states. | Reusable module CSS candidate. |
| Pills / tags CSS | Production | `assets/css/themes/citadel-of-kang/modules/pills.css` | Shared tag/pill presentation. | Reusable component/module CSS candidate. |
| Canonical redirect helper | Production, implementation-specific | `assets/js/script.js` | Redirects GitHub Pages duplicate host and `/index.html` duplicate to canonical domain/path. | Chambers implementation layer, not reusable Citadel core. |
| Theme controller | Production, embedded | `assets/js/script.js` | Sets `data-theme`, persists light/dark mode and swaps logo sources. | Candidate for future `theme-toggle` module; currently Chambers-specific logo handling. |
| Global Shell | Production | `assets/js/themes/citadel-of-kang/modules/shell/global-shell.js` | Topbar, social row, mobile drawer, scroll lock, nav spacing, footer social row, smooth anchors and active nav. | Needs module contract/status reconciliation. Contains Chambers social links. |
| Conversion event helper | Production, embedded | `assets/js/script.js` | Pushes CTA/link events into `dataLayer` for WhatsApp, phone, email, enquiry and contact clicks. | Chambers implementation/analytics layer. |
| Reveal animation helper | Production, embedded | `assets/js/script.js` | Handles `.home-reveal` reveal states. | Candidate for future reusable reveal module. |
| Legacy Insights tag filter | Transitional | `assets/js/script.js` | Filters existing static insight cards where static buttons/cards exist. | May become redundant as Blog Page module matures. |
| Insights registry loader | Production, embedded | `assets/js/script.js`, `assets/data/insights-registry.json` | Loads central article registry and exposes `window.chambersInsightsRegistry` / `window.CitadelArticleRegistry`. | Candidate for future registry/content module. |
| Insight card helper | Production, embedded | `assets/js/script.js` | Defines `window.ChambersInsightCards`, hydrates cards, applies thumbnails. | Contains Chambers-specific defaults and asset paths; document before extraction. |
| Latest Insights section | Production | `assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js` | Renders latest cards from registry/feed for homepage/section hooks. | Reusable section module candidate. |
| Insights Directory section | Production | `assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js` | Registry-first directory/category/tag grids. | Reusable section module candidate. |
| Blog / Legal Insights page | Production | `assets/js/themes/citadel-of-kang/modules/blog/blog-page.js` | Legal Insights page controller: editorial sections, filters, View All, pagination and URL params. | Reusable blog/directory module candidate; page label remains content-owned. |
| Article Index | Production | `assets/js/themes/citadel-of-kang/article-index-direct-rail.js` | Auto-generated article index from direct `h2` headings with rail/progress behaviour. | Current production filename differs from older docs. |
| Article Footer | Production | `assets/js/themes/citadel-of-kang/article-footer.js` | Tags, previous/next and recommended reads using registry-first fallback. | Reusable article-footer module candidate. |
| Enquiry/Form | Production, Chambers implementation layer | `assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js` | Copy-to-clipboard templates and structured enquiry/contact form logic. | Contains Chambers EmailJS public config and contact values; not reusable core without extraction cleanup. |
| Contact Page template | Production | `assets/js/themes/citadel-of-kang/modules/pages/contact-page.js` | Adds reusable contact-page semantic hooks. | Reusable template semantics. |
| Enquiry Page template | Production | `assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js` | Adds reusable enquiry-page semantic hooks. | Reusable template semantics. |
| General Content Page template | Production | `assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js` | Adds semantic hooks for FAQ, process, courts, checklists and policy pages. | Reusable template semantics. |
| Homepage template | Production | `assets/js/themes/citadel-of-kang/modules/pages/home-page.js` | Adds reusable homepage/landing-page semantic hooks. | Reusable template semantics. |
| Practice / Services template | Production | `assets/js/themes/citadel-of-kang/modules/pages/practice-page.js` | Adds semantic hooks for practice hub, practice detail and service landing pages. | Reusable template semantics. |

## Module Documentation Gaps

The following production-active modules require either a dedicated contract document or status reconciliation in existing docs:

```text
Global Shell / Navigation
Theme Toggle
Article Index
Article Footer
Insights Registry / Insight Cards
Latest Insights Section
Insights Directory Section
Blog Page
Enquiry/Form
Contact Page
Enquiry Page
General Content Page
Homepage Page
Practice / Services Page
Conversion Events
Reveal
```

## Chambers-Specific Implementation Flags

The following pieces are acceptable in the Chambers repository but must not be moved into a standalone Citadel of Kang package without cleanup:

```text
Chambers social links in Global Shell
Chambers logo paths in the theme controller
EmailJS public config and Chambers contact details in Enquiry/Form
GTM/dataLayer event names tied to Chambers CTA tracking
chambersofak.in canonical redirect logic
Chambers-specific default thumbnails/assets in Insight Cards
```

## Current Validation Targets

Use current production files, not older preview-only files:

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
node .\tools\validate-article-encoding.js
node .\tools\validate-insights-registry.js --strict
git diff --check
```

## Manual Smoke-Test Pages

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

## Phase 1 Rule

During Phase 1, prefer documentation reconciliation and production-reality recording. Do not change visual behaviour, CSS layout, SEO canonicals, article metadata or thumbnail assets unless a specific later phase authorizes that change.
