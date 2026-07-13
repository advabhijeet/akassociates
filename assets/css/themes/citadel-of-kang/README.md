# Citadel of Kang CSS Namespace

Last reconciled: **13 July 2026**

This public namespace now contains production-active Citadel CSS only. Dormant and superseded theme files were moved to `docs/theme-lab/runtime-assets/`, outside the public Pages artifact.

## Production-active CSS

Imported by `assets/css/style.css`:

```text
modules/article-index.css
modules/pills.css
```

Loaded by Global Shell through public module configuration:

```text
modules/thumbnail-frames.css
```

The active Chambers visual theme remains:

```text
assets/css/themes/citadel-of-ak.css
```

The rollback fallback remains:

```text
assets/css/themes/chambers-ak.css
```

## Source of truth

Production ownership, paths and versions are recorded in:

```text
assets/data/citadel-module-manifest.json
docs/maintenance/theme/CITADEL_PRODUCTION_MODULE_INVENTORY.md
```

Do not add experimental styles to the public namespace. New extraction experiments belong under `docs/theme-lab/` until explicitly promoted through the module manifest and validation.
