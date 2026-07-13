# Citadel of Kang JavaScript Namespace

Last reconciled: **13 July 2026**

This public namespace now contains production-active Citadel JavaScript only. Dormant experiments and superseded duplicates were moved to `docs/theme-lab/runtime-assets/`, which is excluded from GitHub Pages deployment.

## Public entry and runtime

```text
assets/js/script.js
assets/js/config/chambers-public-config.js
assets/js/runtime/core-runtime.js
assets/js/runtime/insights-runtime.js
assets/js/runtime/module-loader.js
```

## Production feature modules

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

The machine-readable source of truth is `assets/data/citadel-module-manifest.json`.

## Ownership rules

- `assets/js/script.js` only orchestrates dependency-ordered runtime loading.
- Core runtime owns canonical redirect, theme state, conversion tracking and reveal behavior.
- Insights runtime owns the registry, legacy-filter compatibility and card helpers.
- Module loader owns conditional feature-module loading and version lookup.
- Global Shell owns navigation chrome and article featured-image/style handoff.
- Each feature module must no-op safely when its required markup is absent.

## Standalone boundary

This remains a Chambers production implementation. Reusable extraction work resumes from `docs/theme-lab/standalone-extraction/`; no private credentials, client data or repository write capability may enter the public runtime.
