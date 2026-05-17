# Citadel Global Shell Module

Last updated: 2026-05-17

The Citadel Global Shell module is the first reusable shell layer for Citadel-powered websites.

## Purpose

The shell controls site-wide chrome and behaviours that appear on most or all public pages:

```text
- topbar social row and live clock;
- dark/light mode toggle wiring;
- mobile drawer and backdrop;
- drawer social/contact insertion;
- navigation spacing variables;
- sticky/scrolled nav state;
- active nav state;
- footer social row insertion;
- smooth in-page anchor behaviour.
```

## Current module

```text
assets/js/themes/citadel-of-kang/modules/shell/global-shell.js
```

The module is loaded by `assets/js/script.js` after the Citadel theme controller is ready.

## Current dependency

The shell currently depends on the global theme controller exposed as:

```text
window.ChambersTheme
```

This is acceptable for the current Chambers implementation, but the long-term Citadel direction is to expose a generic theme controller alias and move brand/social/footer data to JSON registries.

## Current data embedded in module

```text
Firm LinkedIn
WhatsApp Channel
Patna live clock label
```

These should later move to:

```text
assets/data/site-settings.json
assets/data/navigation.json
assets/data/footer-links.json
```

## Future shell split

The current v1 module is intentionally conservative and behaviour-focused. Future shell work may split it into:

```text
assets/js/themes/citadel-of-kang/modules/shell/header.js
assets/js/themes/citadel-of-kang/modules/shell/footer.js
assets/js/themes/citadel-of-kang/modules/shell/theme-toggle.js
assets/js/themes/citadel-of-kang/modules/shell/active-nav.js
assets/css/themes/citadel-of-kang/modules/shell.css
```

## Compatibility checklist

Every shell change must be checked on:

```text
- desktop navbar;
- mobile drawer;
- light mode;
- dark mode;
- scroll state;
- active nav state;
- keyboard Escape drawer close;
- footer social row;
- pages with and without section IDs.
```
