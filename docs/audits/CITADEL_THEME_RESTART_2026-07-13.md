# Citadel Theme Restart — 13 July 2026

## Baseline

```text
Tag: chambers-citadel-v1
Commit: 47e8c6ed07ed2a053a46a39f3779d60fa6059edf
Release after restart: chambers-citadel-1.1.0
```

The tag points to the Cleanup Batch 4 production state and provides a stable comparison and rollback baseline.

## Bootstrap split

Before Theme Restart, `assets/js/script.js` owned canonical redirect, theme state, analytics events, reveal behavior, Insights registry/card helpers and every feature-module loader.

After Theme Restart:

| Responsibility | Owner |
|---|---|
| Dependency-ordered startup | `assets/js/script.js` |
| Public-safe values | `assets/js/config/chambers-public-config.js` |
| Canonical/theme/analytics/reveal | `assets/js/runtime/core-runtime.js` |
| Insights registry/filter/cards | `assets/js/runtime/insights-runtime.js` |
| Conditional feature activation | `assets/js/runtime/module-loader.js` |

## Module inventory

The machine-readable source of truth is:

```text
assets/data/citadel-module-manifest.json
```

It records ownership, production status, paths, versions, activation conditions, rollback files and theme-lab relocations.

## Theme-lab separation

18 dormant or superseded files were moved from public assets into:

```text
docs/theme-lab/runtime-assets/
```

The `docs` deployment exclusion prevents these files from entering GitHub Pages.

## Public configuration

Global Shell social/site/time values and enquiry-form public integration/contact values now come from `window.ChambersPublicConfig`.

The public config contains no passwords, private tokens, client data or repository write credentials.

## Validation

```powershell
node tools/validate-citadel-runtime.js
node tools/validate-public-assets.js
node tools/validate-service-consolidation.js
node tools/validate-seo-sitewide.js
node tools/validate-documentation.js
node tools/validate-deployment-boundary.js
node tools/validate-article-encoding.js
node tools/validate-insights-registry.js --strict
node tools/sync-static-insight-cards.js --check
node tools/audit-articles-structure.js --strict
git diff --check
```

Browser smoke checks cover desktop, mobile, light mode, dark mode, Homepage modules and article modules.

## Post-release Global Shell hotfix

The first live CDP verification found that the Global Shell module object loaded but navigation initialization stopped before `initNav()`. The module referenced `assetUrl(...)` while the helper declaration was absent.

The hotfix:

- restores `assetRoot()` and `assetUrl()`;
- advances Global Shell to `global-shell-v5`;
- advances the config bootstrap token to `config-v2`;
- advances the public cache key to `site-20260713-b5h1`;
- adds validator coverage for the resolver contract.
