# Status: Reusable Article Modules and Platform v2 Direction

Date: 2026-05-15

## Purpose

This status note records the discussion and agreed direction before further Chambers of AK website changes continue.

## Discussion Recorded

The user asked whether the website should migrate away from GitHub Pages to avoid static-hosting limitations.

Decision:

```text
Do not migrate immediately.
Stay on GitHub Pages for the current Citadel/static-site phase.
Use better reusable modules, article metadata, validation scripts and publishing workflow improvements first.
```

Future migration is still expected later because the user wants:

```text
- mobile-friendly admin panel / CMS;
- database-backed article publishing;
- automated publishing without touching code;
- server-side search;
- native or controlled comments with moderation;
- user accounts / client login;
- case update dashboard;
- documentation / document tracking;
- dynamic forms and admin dashboard.
```

The future dynamic platform discussion has been documented in:

```text
docs/planning/CHAMBERS_OF_AK_PLATFORM_V2_ROADMAP.md
```

## Reusable Article Modules Direction

The user confirmed that article UI blocks must be reusable and auto-applied, not manually coded in every article page.

Current principle:

```text
Article pages should contain article content.
Shared JS/CSS modules should generate reusable interface blocks.
```

Reusable module rules have been documented in:

```text
docs/maintenance/ARTICLE_REUSABLE_MODULES.md
```

## Citadel Scope Clarification

The user clarified that Article Footer v2 should be a Citadel feature, not only a Chambers of AK-specific fix.

Recorded rule:

```text
Article Footer v2 must be designed as a reusable Citadel article module.
It may use the current Chambers registry during this project, but the module logic should remain portable and theme/module-oriented.
```

Future preferred module/data direction:

```text
assets/js/themes/citadel-of-kang/article-footer.js
assets/css/themes/citadel-of-kang/modules/article-footer.css
window.CitadelArticleRegistry or assets/data/insights-registry.json
```

## Current Article Index Status

Article Index v20 is approved and deployed.

Known approved behaviour:

```text
- desktop direct-rail article index;
- no internal scrollbar;
- no horizontal drift;
- smooth movement;
- active heading sync;
- click target lands below navbar;
- mobile index below hero / before article body;
- mobile progress bar under navbar;
- drawer-safe progress hiding.
```

Next architecture improvement:

```text
Make Article Index auto-load for future article pages instead of manually wiring the module script per article.
```

## Current Article Footer Status

Article Footer is already a global JavaScript-generated module in:

```text
assets/js/script.js
```

It currently generates:

```text
- Tags;
- Previous Article;
- Next Article;
- Recommended Reads.
```

Problem discovered:

```text
The module depends on window.chambersInsightsRegistry.
If a new article exists but is missing from that registry, the Article Footer silently does not appear.
```

This caused the latest property title search article to show no Tags / Previous / Next / Recommended Reads block.

Required fix:

```text
Article Footer v2 must become a Citadel reusable feature that is fault-tolerant and auto-applied.
It should use registry metadata when available and page metadata fallback when missing.
It must never silently disappear on valid article-body pages.
```

## Documentation Added

New docs created:

```text
docs/planning/CHAMBERS_OF_AK_PLATFORM_V2_ROADMAP.md
docs/maintenance/ARTICLE_REUSABLE_MODULES.md
docs/planning/STATUS_2026-05-15_REUSABLE_ARTICLE_MODULES_AND_PLATFORM_V2.md
```

## Next Technical Tasks

Recommended next steps:

```text
1. Patch Article Footer v2 as a reusable Citadel module so it auto-applies with fallback metadata.
2. Add property-title-search-before-purchase-india.html to the central article registry.
3. Add registry validation script for /updates/*.html pages.
4. Add Article Index auto-loader for future article pages.
5. Later move article metadata out of assets/js/script.js into assets/data/insights-registry.json.
```

## Zero-Tolerance Rule Confirmed

Do not solve reusable article UI problems by copying blocks into individual pages.

Correct approach:

```text
- improve shared module;
- improve registry/manifest;
- add fallback behaviour;
- add validation;
- update documentation.
```