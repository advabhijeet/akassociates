# Module Contract: Citadel Navigation

## Summary

- Module ID: `navigation`
- Module Name: `Citadel Navigation`
- Version: `0.1.0-dev`
- Status: `planned`
- Owner Product: `Citadel of Kang theme pack`
- Chambers Cache Key: `citadel-kang-navigation-1`

## Purpose

The Citadel Navigation module controls public website header and navigation behaviour, including desktop navigation, mobile burger menu, drawer behaviour, accessibility state and scroll/nav-height coordination.

This module must preserve the current Chambers/Citadel navigation experience while making it reusable for future Citadel of Kang implementations.

## Product Boundary

This is a public frontend theme module.

It belongs to:

```text
Citadel of Kang theme pack
```

It does not belong to:

```text
Citadel Manager / Website CMS backend
Client Portal
private admin system
```

It must not contain admin credentials, private write tokens, client data, case data or Chambers-only legal content.

## Planned Files

Final non-live development namespace:

```text
CSS: assets/css/themes/citadel-of-kang/navigation.css
JS:  assets/js/themes/citadel-of-kang/navigation.js
```

The module is not production-active until explicitly wired into the live Chambers pipeline through a controlled PowerShell 7-compatible patch.

## Core Requirement

Mobile navigation must be a proper burger-menu drawer system.

It must not be reduced to a simple dropdown list unless expressly approved for a specific lightweight implementation.

Expected mobile behaviour:

```text
burger menu button
side drawer or full-height drawer panel
overlay/backdrop
open/close animation, respecting reduced motion
body scroll lock while drawer is open where appropriate
Escape key closes drawer
click outside/backdrop closes drawer
close button or repeated burger click closes drawer
focus remains visible and logical
drawer links are keyboard reachable
aria-expanded updates correctly
aria-controls points to drawer id
```

## Activation

Preferred markup:

```html
<header class="ck-nav" data-citadel-navigation>
  <a class="ck-nav-brand" href="/">Brand</a>
  <nav class="ck-nav-links" aria-label="Primary navigation">...</nav>
  <button class="ck-menu-toggle" type="button" aria-expanded="false" aria-controls="ck-mobile-drawer">Menu</button>
</header>

<div class="ck-drawer-backdrop" data-citadel-drawer-backdrop hidden></div>
<aside id="ck-mobile-drawer" class="ck-mobile-drawer" aria-label="Mobile navigation" hidden>
  ...
</aside>
```

Disable pattern:

```html
<body data-citadel-navigation="false">
```

## Public Config Keys

Future public-safe config may use:

```json
{
  "modules": {
    "navigation": true
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

Minimum requirements:

```text
menu toggle button
drawer element
drawer id referenced by aria-controls
navigation links inside drawer
optional backdrop element
```

Recommended data hooks:

```text
data-citadel-navigation
data-citadel-menu-toggle
data-citadel-mobile-drawer
data-citadel-drawer-backdrop
data-citadel-drawer-close
```

## Default Behavior

When activated and valid markup exists, the module should:

```text
1. Detect navigation root.
2. Detect burger/menu toggle.
3. Detect mobile drawer.
4. Detect optional backdrop.
5. Toggle drawer open/closed.
6. Update aria-expanded.
7. Add/remove open classes.
8. Hide/show drawer using hidden/inert-compatible behaviour where practical.
9. Close on Escape.
10. Close on backdrop click.
11. Close after drawer link click where appropriate.
12. Maintain --ck-nav-space variable for article index and scroll offsets.
13. No-op safely if markup is missing.
```

## Disable / No-Op Behavior

The module must do nothing when:

```text
body has data-citadel-navigation="false"
no navigation root exists
no menu toggle exists
no drawer exists
module already initialized
```

No errors should be thrown in these states.

## Drawer Style Requirement

The final mobile menu should feel like a real premium drawer, not a plain dropdown.

Visual expectations:

```text
black/dark drawer surface
gold accent line or border
subtle backdrop overlay
drawer panel slides in from right or left
wide touch targets
clear close control
brand-safe typography
smooth but restrained motion
reduced-motion fallback
```

For Chambers of AK first implementation:

```text
right-side drawer is preferred unless visual testing suggests otherwise
black/white/gold styling must match current Chambers brand
current nav link set must be preserved
current social links and contact CTA handling must be preserved
```

## Dependencies

Current intended dependencies:

```text
No third-party JavaScript dependency.
No framework dependency.
CSS variables from Citadel tokens are preferred but fallbacks must exist.
```

Potential coordination with:

```text
article-index module for --ck-nav-space / scroll offset
theme-toggle module for drawer theme state
social-bar module for drawer social links
conversion-events module for contact CTA tracking
```

## Accessibility Notes

Required accessibility behavior:

```text
burger button must be a real button
button must update aria-expanded
button must use aria-controls pointing to drawer id
drawer must have a useful label
Escape key closes drawer
focus state must be visible
keyboard users must reach drawer links
closed drawer links should not remain keyboard reachable
drawer must not create keyboard traps
reduced-motion preferences must be respected
icon-only controls need aria-label
```

Recommended manual checks:

```text
Tab to burger button.
Press Enter/Space to open.
Tab through drawer links.
Press Escape to close.
Confirm focus returns logically.
Confirm backdrop click closes drawer.
Confirm reduced motion does not break drawer.
Confirm dark/light contrast.
```

## Performance Notes

Performance requirements:

```text
No network request.
No storage usage unless needed for nav state, which is not expected.
No heavy scroll listener unless required for sticky/scrolled nav state.
Resize handling should be minimal.
No-op on pages without navigation markup.
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
visible article content
```

Navigation links should remain normal crawlable anchor links in the HTML where possible.

## Privacy / Security Notes

The module:

```text
does not collect personal data
does not send network requests
does not expose admin functionality
does not access private case/client data
does not interact with repository write access
```

## Chambers-Specific Overrides

Chambers of AK may override:

```text
logo paths
brand text
primary nav links
contact CTA
social links
WhatsApp/LinkedIn drawer links
black/white/gold drawer styling
conversion-event labels for CTA links
```

Reusable module files must not hardcode Chambers-only social URLs, GTM IDs, AdSense IDs or private implementation values.

## Standalone Extraction Notes

Before moving to a standalone Citadel of Kang repository, confirm:

```text
No Chambers-only links are hardcoded.
No Chambers-specific logo paths are hardcoded.
No private config exists.
Neutral drawer demo exists.
Activation examples are generic.
Accessibility requirements are documented.
```

## Current Preview Note

The current dynamic Article Index preview may use a simple preview-only mock menu only to test Article Index layout in isolation.

That mock menu is not the final Citadel Navigation module.

Final requirement remains:

```text
Actual mobile navigation must be a burger-menu drawer style.
```

## Validation Checklist

Commands:

```text
node --check assets/js/themes/citadel-of-kang/navigation.js
git diff --check
```

Manual checks:

```text
Desktop nav remains stable.
Mobile burger button appears.
Drawer opens and closes.
Backdrop works.
Escape key closes drawer.
Drawer links are keyboard reachable.
Focus state is visible.
Closed drawer is not keyboard reachable.
Dark/light contrast passes.
Article Index scroll offset still works after nav-space calculation.
No console errors.
```
