# Citadel of Kang Theme Direction

Last reconciled: **13 July 2026**

Citadel of Kang is the reusable frontend direction derived from the Chambers of AK production implementation.

## Status

```text
Chambers Citadel v1: production
Reusable Citadel modules: partially production-proven
Standalone Citadel package: paused
Citadel Manager / CMS: planned
Client Portal: separate future product
```

The Chambers repository remains the production website and current proving ground. It is not yet a clean distributable Citadel package.

## Product boundary

```text
Chambers of AK
  Public legal website, content, branding, analytics and enquiry operations.

Citadel of Kang
  Public frontend theme and reusable module system.

Citadel Manager
  Future authenticated/local content and configuration manager.

Client Portal
  Separate secure matter/document product.
```

Citadel frontend files must not contain private credentials, client/matter data, repository write tokens or fake frontend-only access control.

## Production reality

Current public entries:

```text
assets/css/style.css
assets/js/script.js
```

Current Chambers theme:

```text
assets/css/themes/citadel-of-ak.css
```

Production Citadel module families:

```text
Global Shell
Article Index
Article Footer
article featured image
thumbnail frames
pills/tags
Insights registry/cards
latest Insights
Insights directory
blog page
contact/enquiry behavior
semantic page modules
```

See `docs/maintenance/theme/CITADEL_PRODUCTION_MODULE_INVENTORY.md` for exact files.

## Reusable-design rules

A reusable Citadel module should be:

1. configurable;
2. safe to disable;
3. route-agnostic where practical;
4. accessible;
5. performance-conscious;
6. free of private data;
7. explicit about Chambers-specific overrides;
8. covered by validation and manual smoke checks.

## Chambers-specific implementation currently present

The following must be generalized before standalone extraction:

```text
Chambers social URLs
Chambers logo paths
chambersofak.in redirect logic
GTM/dataLayer event naming
EmailJS public integration values
Chambers article routes/default thumbnails
legal-site-specific labels and copy
```

## Paused extraction work

Standalone extraction is paused while the repository completes:

1. documentation consolidation;
2. asset/performance cleanup;
3. service-page consolidation;
4. active module-manifest creation;
5. production/theme-lab separation;
6. bootstrap modularization;
7. public-safe configuration.

## Extraction target

A future standalone repository may contain:

```text
neutral tokens and theme variants
reusable CSS/JS modules
module contracts
activation/no-op examples
neutral demonstrations
accessibility and performance checks
versioning and licensing notes
```

It must exclude Chambers legal content, contact details, analytics identifiers, sitemap/feed files and private operational material.

## Change boundary

Do not rename, split or relocate active production files merely to match an ideal future directory tree. Migration must be controlled, validated and independently reversible.
