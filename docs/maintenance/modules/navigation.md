# Module Contract: Citadel Navigation / Global Shell

Last reconciled: 2026-05-26

## Summary

- Module ID: `navigation-global-shell`
- Module Name: `Citadel Navigation / Global Shell`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation values`
- Chambers Cache Key: `global-shell-v2`

## Purpose

The Citadel Navigation / Global Shell module controls the public website shell behaviour, including desktop topbar, primary navigation coordination, mobile burger drawer, drawer backdrop, theme-toggle wiring, footer social row, smooth anchors, active navigation state and nav-height coordination.

It preserves the current Chambers/Citadel navigation experience while providing the production baseline for a future reusable Citadel of Kang shell module.

## Current Production Files

Current production implementation:

```text
JS: assets/js/themes/citadel-of-kang/modules/shell/global-shell.js
Loader: assets/js/script.js
CSS: assets/css/style.css and assets/css/themes/citadel-of-ak.css
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-global-shell-v2
```

## Product Boundary

This is a public frontend theme/module layer.

It belongs to:

```text
Citadel of Kang theme pack
Chambers of AK implementation layer
```

It does not belong to:

```text
Citadel Manager / Website CMS backend
Client Portal
private admin system
```

It must not contain admin credentials, private write tokens, client data, case data or backend logic.

## Current Chambers-Specific Values

The current production file includes Chambers-specific social links and labels:

```text
LinkedIn company page
WhatsApp Channel
Chambers of AK topbar label
```

These are acceptable in the Chambers repository. Before standalone extraction, these values should move to a public-safe config file or implementation adapter.

## Activation

Current activation is automatic when `.nav` exists on the page and the loader is present.

Current production markup pattern:

```html
<nav class="nav">
  <a class="nav-brand" href="/">...</a>
  <ul class="nav-links">...</ul>
  <a class="nav-cta" href="...">Contact</a>
  <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">...</button>
</nav>
```

The module creates or augments:

```text
.site-topbar
.menu-backdrop
.drawer-contact
.drawer-social
.foot-social
[data-ak-clock]
[data-theme-mode-toggle]
```

Future preferred generic markup remains:

```html
<header class="ck-nav" data-citadel-navigation>
  <a class="ck-nav-brand" href="/">Brand</a>
  <nav class="ck-nav-links" aria-label="Primary navigation">...</nav>
  <button class="ck-menu-toggle" type="button" aria-expanded="false" aria-controls="ck-mobile-drawer">Menu</button>
</header>
```

## Public Config Keys

Current production implementation does not yet read a config file.

Future public-safe config may use:

```json
{
  "modules": {
    "globalShell": true,
    "navigation": true
  },
  "globalShell": {
    "showTopbar": true,
    "showLiveClock": true,
    "showThemeToggle": true,
    "showFooterSocial": true
  },
  "navigation": {
    "drawerMode": "side",
    "drawerSide": "right",
    "closeOnEscape": true,
    "closeOnBackdrop": true,
    "lockBodyScroll": true,
    "setNavSpaceVariable": true
  }
}
```

Public config must not include private keys, passwords, client/case data, repository write tokens or admin-only controls.

## Required Markup / Data Attributes

Current minimum requirements:

```text
.nav
.nav-links
.menu-toggle or permission for module to create/normalize menu toggle
```

Current optional/augmented elements:

```text
.nav-cta
.menu-backdrop
.foot
.foot-disc
[data-ak-clock]
[data-theme-mode-toggle]
```

Future recommended data hooks:

```text
data-citadel-navigation
data-citadel-global-shell
data-citadel-menu-toggle
data-citadel-mobile-drawer
data-citadel-drawer-backdrop
data-citadel-drawer-close
```

## Default Behaviour

When activated on valid markup, the module currently:

```text
1. Creates the desktop topbar at 761px and above.
2. Injects Chambers social links into the topbar and drawer social panel.
3. Wires the theme toggle button to `window.ChambersTheme`.
4. Normalizes the burger menu button.
5. Creates a backdrop if missing.
6. Adds the Contact CTA into the drawer.
7. Adds the drawer social/time panel.
8. Opens/closes the mobile drawer.
9. Locks page scroll while the mobile drawer is open.
10. Closes the drawer on backdrop click, drawer link click and Escape key.
11. Updates nav scrolled state.
12. Calculates and sets `--topbar-space` and `--nav-space`.
13. Updates live Patna clock elements.
14. Adds footer social row when missing.
15. Adds smooth scrolling to hash anchors.
16. Applies active nav states for page/section links.
```

## Disable / No-Op Behaviour

The current module no-ops when:

```text
window.CitadelGlobalShell.initialized is already true
.nav is missing for navigation-specific logic
.foot is missing for footer-social logic
[data-ak-clock] is missing for live-clock interval setup
required optional elements are absent
```

Future enhancement: add an explicit disable hook such as:

```html
<body data-citadel-global-shell="false">
```

## Drawer Style Requirement

The production mobile menu should remain a proper premium drawer, not a plain dropdown.

Visual expectations:

```text
burger menu button
side/full-height drawer behaviour through current nav-links mobile styling
overlay/backdrop
open/close state
body scroll lock
Escape key close
backdrop click close
keyboard-reachable links
visible focus states
black/white/gold brand styling
reduced-motion-compatible behaviour where practical
```

## Dependencies

Current dependencies:

```text
No third-party JavaScript dependency.
Requires `window.ChambersTheme` for theme toggle functionality.
Uses CSS variables and classes from the active Chambers/Citadel CSS.
Uses browser APIs: matchMedia, requestAnimationFrame, Intl.DateTimeFormat.
```

Potential coordination with:

```text
article-index module for nav-space and scroll offsets
theme controller for light/dark mode
conversion-events helper for CTA tracking
future public config module
```

## Accessibility Notes

Current required accessibility behaviour:

```text
burger button is a real button
aria-expanded updates when drawer opens/closes
aria-label switches between Open menu and Close menu
backdrop is a button with Close menu label
Escape key closes drawer
drawer links are keyboard reachable
focus states must remain visible through CSS
social icon links include aria-label and sr-only text
icon-only theme toggle includes aria-label and aria-pressed
```

Recommended manual checks:

```text
Tab to burger button.
Press Enter/Space to open.
Tab through drawer links and drawer controls.
Press Escape to close.
Confirm backdrop click closes drawer.
Confirm focus states remain visible.
Confirm dark/light contrast.
```

## Performance Notes

Performance characteristics:

```text
One dynamically loaded JS module through `script.js`.
No external network request from this module.
One live clock interval only if clock elements exist.
Scroll listener uses requestAnimationFrame and passive listener.
Resize handling uses requestAnimationFrame.
Font readiness may trigger nav-space recalculation.
No-op on pages without expected shell markup.
```

## SEO / Schema Notes

The module should not alter:

```text
canonical URLs
meta titles
meta descriptions
schema JSON-LD
sitemap.xml
feed.xml
article body content
```

Navigation and footer links should remain normal crawlable anchor links in the HTML where possible. Dynamically inserted social links are supplemental and should not be the only path to core site pages.

## Privacy / Security Notes

The module:

```text
does not collect form data
does not send network requests
does not expose admin functionality
does not access private case/client data
does not interact with repository write access
```

It does contain public Chambers social URLs. These are public implementation values, not secrets.

## Chambers-Specific Overrides

Chambers of AK currently controls:

```text
logo paths through the theme controller
brand text in the topbar
primary nav links in page HTML
contact CTA in page HTML
LinkedIn and WhatsApp Channel social links
black/white/gold styling through CSS
```

Reusable Citadel extraction must remove or externalize:

```text
Chambers social URLs
Chambers brand labels
Chambers logo paths
Chambers-specific contact CTA assumptions
```

## Standalone Extraction Notes

Before moving to a standalone Citadel of Kang repository, confirm:

```text
Social links are config-driven.
Logo paths are config-driven.
No Chambers-only labels are hardcoded.
Neutral demo markup exists.
Activation examples are generic.
Accessibility requirements are preserved.
No analytics/GTM IDs are included.
```

## Validation Checklist

Commands:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/shell/global-shell.js
git diff --check
```

Manual checks:

```text
Desktop topbar appears at 761px and above.
No 761px-768px dead zone exists.
Desktop nav remains stable.
Theme toggle appears in desktop topbar.
Mobile burger button appears at mobile width.
Drawer opens and closes.
Backdrop works.
Escape key closes drawer.
Drawer links are keyboard reachable.
Footer social row appears only once.
Dark/light contrast passes.
Article Index scroll offset still works after nav-space calculation.
No console errors.
```

## Future Enhancements

Possible future improvements:

```text
Explicit body-level disable hook.
Config-driven social links.
Config-driven topbar label.
Standalone theme-toggle module.
Standalone social-links module.
Navigation markup with explicit aria-controls drawer id.
Optional focus return to burger after drawer close.
Reduced-motion-specific drawer transition audit.
```
