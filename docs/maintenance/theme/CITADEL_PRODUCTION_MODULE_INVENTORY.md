# Citadel Production Module Inventory

Last updated: **13 July 2026**

This document records production reality for **Chambers Citadel v1.1** after Theme Restart.

## Release baseline

```text
Baseline tag:    chambers-citadel-v1
Baseline commit: 47e8c6ed07ed2a053a46a39f3779d60fa6059edf
Current release: chambers-citadel-1.1.0
```

The baseline tag points to the last pre-restart production state. Rollback instructions are maintained in `docs/maintenance/theme/CITADEL_V1_ROLLBACK.md`.

## Public entry points

```text
CSS: assets/css/style.css
JS:  assets/js/script.js
Config: assets/js/config/chambers-public-config.js
Manifest: assets/data/citadel-module-manifest.json
```

## Runtime ownership

| Runtime | Owner | Path |
|---|---|---|
| Bootstrap | Dependency-ordered runtime loading only | `assets/js/script.js` |
| Public config | Public identity, contact, theme, analytics, integration and module values | `assets/js/config/chambers-public-config.js` |
| Core runtime | Canonical redirect, theme state, conversion events and reveal behavior | `assets/js/runtime/core-runtime.js` |
| Insights runtime | Registry loading, compatibility filter and card helpers | `assets/js/runtime/insights-runtime.js` |
| Module loader | Conditional feature-module activation and version lookup | `assets/js/runtime/module-loader.js` |

## Production feature modules

| Module | Owner | Path |
|---|---|---|
| Global Shell | Navigation chrome, mobile drawer, social row and clock | `assets/js/themes/citadel-of-kang/modules/shell/global-shell.js` |
| Article Index | Direct-H2 index rail and reading progress | `assets/js/themes/citadel-of-kang/article-index-direct-rail.js` |
| Article Footer | Tags, previous/next and recommended reads | `assets/js/themes/citadel-of-kang/article-footer.js` |
| Featured Image | Article featured-image handling | `assets/js/themes/citadel-of-kang/modules/articles/article-featured-image.js` |
| Latest Insights | Homepage latest cards | `assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js` |
| Insights Directory | Directory section rendering | `assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js` |
| Blog controller | Filters, search and pagination | `assets/js/themes/citadel-of-kang/modules/blog/blog-page.js` |
| Enquiry/Form | Copy and structured enquiry behavior | `assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js` |
| Homepage semantics | Homepage hooks | `assets/js/themes/citadel-of-kang/modules/pages/home-page.js` |
| Practice semantics | Practice and service hooks | `assets/js/themes/citadel-of-kang/modules/pages/practice-page.js` |
| Contact semantics | Contact hooks | `assets/js/themes/citadel-of-kang/modules/pages/contact-page.js` |
| Enquiry semantics | Case-enquiry hooks | `assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js` |
| General-content semantics | FAQ/process/policy hooks | `assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js` |

## Production CSS

| Layer | Path |
|---|---|
| Shared rules | `assets/css/style.css` |
| Chambers Citadel theme | `assets/css/themes/citadel-of-ak.css` |
| Article Index | `assets/css/themes/citadel-of-kang/modules/article-index.css` |
| Pills/tags | `assets/css/themes/citadel-of-kang/modules/pills.css` |
| Thumbnail frames | `assets/css/themes/citadel-of-kang/modules/thumbnail-frames.css` |
| Rollback fallback | `assets/css/themes/chambers-ak.css` |

## Theme-lab boundary

The former dormant and duplicate files no longer sit in the public asset tree. They are retained under:

```text
docs/theme-lab/runtime-assets/
```

The machine-readable manifest records every original path, archive path and classification.

## Promotion rule

A new Citadel module is production-active only when:

1. it exists in the public runtime tree;
2. it is listed in `assets/data/citadel-module-manifest.json`;
3. it has one documented owner;
4. its path and version exist in public configuration where applicable;
5. GitHub Actions syntax-checks it;
6. `tools/validate-citadel-runtime.js` passes.
