# Citadel Production Module Inventory

Last updated: **13 July 2026**

This document records production reality for Chambers Citadel v1. A file is production-active only when it is imported or loaded through the public CSS/JavaScript entry points.

## Public entry points

```text
CSS: assets/css/style.css
JS:  assets/js/script.js
```

## Active production inventory

| Layer/module | Status | Current file(s) | Notes |
|---|---|---|---|
| Shared layout/components | Production | `assets/css/style.css` | Public CSS entry and shared rules |
| Chambers Citadel theme | Production | `assets/css/themes/citadel-of-ak.css` | Active light/dark Chambers theme |
| Rollback theme | Fallback | `assets/css/themes/chambers-ak.css` | Retain until tagged baseline and rollback process exist |
| Article Index CSS | Production | `assets/css/themes/citadel-of-kang/modules/article-index.css` | Rail, responsive index and progress states |
| Pills/tags CSS | Production | `assets/css/themes/citadel-of-kang/modules/pills.css` | Shared category/tag presentation |
| Thumbnail frames | Production | `assets/css/themes/citadel-of-kang/modules/thumbnail-frames.css` | Loaded by Global Shell |
| Public bootstrap | Production | `assets/js/script.js` | Theme, registry, analytics and module loaders |
| Global Shell | Production | `assets/js/themes/citadel-of-kang/modules/shell/global-shell.js` | Topbar, drawer, footer social, nav behavior |
| Article Index | Production | `assets/js/themes/citadel-of-kang/article-index-direct-rail.js` | Direct-H2 index and reading progress |
| Article Footer | Production | `assets/js/themes/citadel-of-kang/article-footer.js` | Tags, previous/next and recommendations |
| Featured image | Production | `assets/js/themes/citadel-of-kang/modules/articles/article-featured-image.js` | Article image handling |
| Latest Insights | Production | `assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js` | Homepage/latest cards |
| Insights Directory | Production | `assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js` | Registry-driven directory sections |
| Blog controller | Production | `assets/js/themes/citadel-of-kang/modules/blog/blog-page.js` | Filters, search, pagination and editorial sections |
| Enquiry/Form | Production, Chambers layer | `assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js` | Includes Chambers integration values |
| Homepage semantics | Production | `assets/js/themes/citadel-of-kang/modules/pages/home-page.js` | Page hooks |
| Practice semantics | Production | `assets/js/themes/citadel-of-kang/modules/pages/practice-page.js` | Practice/service hooks |
| Contact semantics | Production | `assets/js/themes/citadel-of-kang/modules/pages/contact-page.js` | Contact hooks |
| Enquiry semantics | Production | `assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js` | Enquiry hooks |
| General-content semantics | Production | `assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js` | FAQ/process/policy hooks |
| Registry/card helper | Production, embedded | `assets/js/script.js`, `assets/data/insights-registry.json` | Transitional embedded implementation |
| Theme controller | Production, embedded | `assets/js/script.js` | Light/dark mode and logo switching |
| Conversion events | Production, embedded | `assets/js/script.js` | Chambers GTM/dataLayer behavior |
| Reveal helper | Production, embedded | `assets/js/script.js` | Homepage reveal behavior |

## Dormant/theme-lab inventory

The following files may be useful for future extraction but are not current production dependencies unless an active entry point begins loading them:

```text
assets/js/themes/citadel-of-kang/core.js
assets/js/themes/citadel-of-kang/navigation.js
assets/js/themes/citadel-of-kang/article-index.js
assets/js/themes/citadel-of-kang/reading-time.js
assets/js/themes/citadel-of-kang/reading-progress.js
assets/js/themes/citadel/article-index.js

assets/css/themes/citadel-of-kang/index.css
assets/css/themes/citadel-of-kang/tokens.css
assets/css/themes/citadel-of-kang/core.css
assets/css/themes/citadel-of-kang/layout.css
assets/css/themes/citadel-of-kang/typography.css
assets/css/themes/citadel-of-kang/navigation.css
assets/css/themes/citadel-of-kang/footer.css
assets/css/themes/citadel-of-kang/components.css
assets/css/themes/citadel-of-kang/pages.css
assets/css/themes/citadel-of-kang/modules/reading-time.css
assets/css/themes/citadel-of-kang/modules/reading-progress.css
assets/css/themes/citadel/modules/article-index.css
```

Do not delete these during documentation consolidation. Relocation/removal requires Theme Restart comparison and smoke testing.

## Chambers-specific flags

Generalize before standalone extraction:

- social URLs and labels in Global Shell;
- logo paths and canonical redirect logic;
- GTM/dataLayer event names;
- EmailJS and contact values;
- Chambers route/default-thumbnail assumptions;
- law-firm-specific labels.

## Validation coverage

GitHub Actions syntax-checks active JavaScript files and runs article, registry, static-sync, structure, SEO, deployment-boundary and documentation validators.

## Next inventory step

During Theme Restart:

1. create a machine-readable module manifest;
2. identify one owner for each behavior;
3. move dormant/theme-lab code outside the public asset tree;
4. remove confirmed duplicates;
5. split embedded bootstrap responsibilities;
6. tag the production baseline.
