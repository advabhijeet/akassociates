# Citadel of Kang JavaScript Namespace

Last reconciled: **13 July 2026**

This directory contains both production-loaded Citadel modules and dormant/theme-lab files.

## Production-active files

Loaded through `assets/js/script.js`:

```text
article-index-direct-rail.js
article-footer.js
modules/articles/article-featured-image.js
modules/blog/blog-page.js
modules/forms/enquiry-form.js
modules/pages/home-page.js
modules/pages/practice-page.js
modules/pages/contact-page.js
modules/pages/enquiry-page.js
modules/pages/general-content-page.js
modules/sections/latest-insights-section.js
modules/sections/insights-directory-section.js
modules/shell/global-shell.js
```

The exact inventory is maintained in `docs/maintenance/theme/CITADEL_PRODUCTION_MODULE_INVENTORY.md`.

## Dormant/theme-lab files

Files such as `core.js`, `navigation.js`, `article-index.js`, `reading-time.js` and `reading-progress.js` are not production dependencies unless the public bootstrap explicitly loads them.

Do not infer production status from directory location alone.

## Module rules

Production or future reusable modules must:

- activate through explicit markup/config or a safe feature test;
- no-op safely when required markup is absent;
- avoid private credentials and client/matter data;
- document Chambers-specific values;
- support keyboard, focus and reduced-motion requirements;
- avoid unnecessary global listeners and repeated DOM work;
- pass syntax and repository validation.

## Current boundary

This is still a Chambers production namespace, not a clean standalone distribution. Standalone extraction is paused until production and theme-lab files are separated and a module manifest exists.
