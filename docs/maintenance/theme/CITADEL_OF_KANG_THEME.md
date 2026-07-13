# Citadel of Kang Theme Direction

Last reconciled: **13 July 2026**

Citadel of Kang is the reusable frontend direction proven through the Chambers of AK production implementation.

## Status

```text
Chambers Citadel v1 baseline: tagged
Chambers Citadel v1.1 runtime: production
Reusable Citadel modules: production-proven inside Chambers
Standalone extraction: resumed in theme lab
Citadel Manager / CMS: planned
Client Portal: separate future product
```

## Production architecture

```text
assets/css/style.css
assets/js/script.js
assets/js/config/chambers-public-config.js
assets/js/runtime/core-runtime.js
assets/js/runtime/insights-runtime.js
assets/js/runtime/module-loader.js
assets/data/citadel-module-manifest.json
```

The public bootstrap is dependency-ordered and declarative. Feature modules are enabled by markup/route conditions and read their public paths and versions from configuration.

## Reusable-design rules

A reusable Citadel module must be:

1. configurable;
2. safe to disable;
3. route-agnostic where practical;
4. accessible;
5. performance-conscious;
6. free of private data;
7. explicit about implementation-specific overrides;
8. covered by automated validation and browser smoke tests.

## Chambers implementation boundary

Public Chambers values now live in `assets/js/config/chambers-public-config.js`. Reusable modules should consume those values rather than embedding social URLs, contact details, canonical-host assumptions or public integration identifiers.

Legal-site-specific copy, route taxonomy, article data and analytics semantics still require neutral adapters before standalone distribution.

## Theme-lab boundary

Dormant experiments and superseded duplicates are retained under:

```text
docs/theme-lab/runtime-assets/
```

Neutral extraction planning and sample configuration are under:

```text
docs/theme-lab/standalone-extraction/
```

Neither path is part of the public Pages artifact.

## Extraction target

A future standalone repository may contain:

- neutral tokens and theme variants;
- reusable CSS and JavaScript modules;
- module contracts and a manifest;
- activation/no-op examples;
- public-safe configuration samples;
- accessibility, performance and visual-smoke checks;
- versioning and licensing notes.

It must exclude Chambers legal content, private operational material, repository credentials and client or matter information.

## Change boundary

Production promotion remains controlled and independently reversible. The pre-restart baseline is tagged `chambers-citadel-v1`; rollback instructions are in `docs/maintenance/theme/CITADEL_V1_ROLLBACK.md`.
