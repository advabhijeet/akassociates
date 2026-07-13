# Citadel of Kang CSS Namespace

Last reconciled: **13 July 2026**

This directory contains production module CSS together with dormant/future extraction files.

## Production-active CSS

Imported directly by `assets/css/style.css`:

```text
modules/article-index.css
modules/pills.css
```

Loaded dynamically by the Global Shell:

```text
modules/thumbnail-frames.css
```

The active Chambers visual theme itself remains:

```text
assets/css/themes/citadel-of-ak.css
```

## Dormant/theme-lab CSS

Files such as `index.css`, `tokens.css`, `core.css`, `layout.css`, `typography.css`, `navigation.css`, `footer.css`, `components.css`, `pages.css`, `modules/reading-time.css` and `modules/reading-progress.css` are not production dependencies unless an active entry imports them.

Do not infer production status from directory location alone.

## Design boundary

Reusable Citadel CSS should not hardcode:

- Chambers-only content or routes;
- analytics or advertising identifiers;
- private configuration;
- law-firm-only labels;
- assets that cannot be replaced through implementation overrides.

## Current status

The namespace is transitional. Production and theme-lab files will be separated during Theme Restart after repository, asset and service-page cleanup.
