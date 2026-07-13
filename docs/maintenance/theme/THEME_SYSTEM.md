# Chambers of AK Theme System

Last reconciled: **13 July 2026**

## Current baseline

The public website uses **Chambers Citadel v1.1**.

```text
Baseline tag: chambers-citadel-v1
Public CSS: assets/css/style.css
Public JS: assets/js/script.js
Public config: assets/js/config/chambers-public-config.js
Module manifest: assets/data/citadel-module-manifest.json
```

The public bootstrap is now an orchestrator rather than a monolithic implementation.

## Runtime sequence

```text
assets/js/script.js
  -> assets/js/config/chambers-public-config.js
  -> assets/js/runtime/core-runtime.js
  -> assets/js/runtime/insights-runtime.js
  -> assets/js/runtime/module-loader.js
  -> conditionally activated feature modules
```

The sequence is dependency-ordered. Feature modules read paths and versions from the public config and no-op when relevant markup is absent.

## Public configuration

The config contains only browser-public values:

- canonical host and project-path values;
- public brand and contact details;
- public social links;
- theme names, logo paths and font URL;
- public conversion-event names;
- EmailJS public identifiers;
- Insights registry and fallback artwork paths;
- module paths, IDs, versions and guards.

It must never contain passwords, private tokens, client or matter data, repository write credentials or payment secrets.

## Production CSS

Direct imports:

```text
assets/css/themes/citadel-of-ak.css
assets/css/themes/citadel-of-kang/modules/article-index.css
assets/css/themes/citadel-of-kang/modules/pills.css
```

Global Shell loads the configured thumbnail-frame stylesheet.

## Theme modes

```text
data-theme="citadel-of-ak"
data-theme="citadel-of-ak-dark"
```

Mode preference remains in local storage. Theme state, logo switching and toggle labels are owned by the core runtime.

## Production/theme-lab boundary

Production assets remain under `assets/`. Dormant and duplicate experiments are retained under `docs/theme-lab/runtime-assets/`, which is excluded from GitHub Pages.

The active machine-readable boundary is `assets/data/citadel-module-manifest.json`.

## Rollback

The pre-restart production baseline is tagged `chambers-citadel-v1`. Use the safe branch-based process in `docs/maintenance/theme/CITADEL_V1_ROLLBACK.md`; do not force-reset `main` during diagnosis.

## Validation

```powershell
node tools/validate-citadel-runtime.js
node tools/validate-public-assets.js
node tools/validate-seo-sitewide.js
node tools/validate-deployment-boundary.js
node tools/validate-documentation.js
git diff --check
```

## Standalone extraction

Neutral extraction work resumes under `docs/theme-lab/standalone-extraction/`. Promotion into a standalone repository remains a later controlled phase after reusable modules are separated from Chambers-specific markup and legal-content assumptions.
