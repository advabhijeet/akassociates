# Citadel of Kang Phase 1C Checkpoint

This checkpoint records the current non-live module testing state for **Citadel of Kang** after validating the Navigation Drawer, Article Index, Reading Time and Reading Progress modules through hosted noindex preview pages.

## Status

```text
Phase: 1C
Status: non-live module compatibility checkpoint
Live Chambers pipeline changed: no
Production article pages changed: no
Sitemap/feed changed: no
AdSense/Search Console files changed: no
```

## Product Boundary Reminder

```text
Citadel of Kang = standalone theme pack and frontend module system.
Citadel Manager / Website CMS = separate admin-only website-management product.
Chambers of AK = first implementation.
Client Portal = separate secure future product.
```

## Mobile Compatibility Rule

Citadel of Kang must be mobile-compatible by default.

Mobile must be treated as a first-class target for:

```text
navigation
article index
reading time
reading progress
cards
forms
footer
future CMS-generated templates
```

The mobile navigation requirement is:

```text
proper burger-menu drawer style
not a plain dropdown
```

## Confirmed Working Preview URLs

### Stable Article Index Baseline

```text
https://chambersofak.in/preview/citadel-article-index-stable-v2.html
```

Confirmed purpose:

```text
visual baseline for article index layout
self-contained noindex preview
scrolling works
section jumps work
mobile index placement works
```

### Dynamic Article Index Only

```text
https://chambersofak.in/preview/citadel-dynamic-article-index-v1.html
```

Confirmed working:

```text
page scrolls normally
Article Index is generated dynamically
section links work
active state updates while scrolling
active state reaches last heading
mobile layout works
no console errors
```

Note:

```text
The simple menu on this page is preview-only. Final mobile navigation must be a drawer.
```

### Navigation Drawer Only

```text
https://chambersofak.in/preview/citadel-navigation-drawer-v1.html
```

Confirmed working after fixes:

```text
navbar visible immediately
burger menu visible on mobile
right-side drawer opens
backdrop works
drawer closes through close button/backdrop/Escape
page scroll restores after close
no black-screen issue
```

### Navigation + Article Index

```text
https://chambersofak.in/preview/citadel-nav-plus-article-index-v1.html
```

Confirmed working:

```text
navbar visible immediately
burger drawer opens/closes correctly on mobile
drawer backdrop works
page scroll restores after drawer closes
Article Index is generated dynamically
Article Index links work
active section state reaches final heading
mobile Article Index appears below hero / before article body
no black-screen issue
no console errors
```

### Navigation + Article Index + Reading Time

```text
https://chambersofak.in/preview/citadel-nav-article-reading-time-v1.html
```

Confirmed working:

```text
navbar visible immediately
burger drawer works on mobile
Article Index is generated dynamically
Article Index links work
active state reaches final heading
Reading Time calculates
Reading Time pill is visible and readable on desktop/mobile
no layout break
no console errors
```

Note:

```text
Reading Time is article metadata and is allowed to scroll away with the article metadata row.
It should not become sticky by default.
Continuous scroll feedback belongs to the Reading Progress module.
```

### Full Article Module Stack v2

```text
https://chambersofak.in/preview/citadel-full-article-modules-v2.html
```

Confirmed working after fixes:

```text
page scroll works
screen is interactive
Reading Progress bar works
Navigation Drawer works
Article Index works
Reading Time calculates
no blocked mobile scrolling
```

This is the current best full compatibility preview.

## Confirmed Stable Module Stack

The currently validated non-live Citadel module stack is:

```text
Navigation Drawer
Article Index
Reading Time
Reading Progress
```

## Files Added Or Updated In Phase 1C

### Navigation

```text
assets/js/themes/citadel-of-kang/navigation.js
docs/maintenance/modules/navigation.md
preview/citadel-navigation-drawer-v1.html
```

### Article Index / Combined Previews

```text
preview/citadel-dynamic-article-index-v1.html
preview/citadel-nav-plus-article-index-v1.html
```

### Reading Time / Reading Progress Combined Previews

```text
preview/citadel-nav-article-reading-time-v1.html
preview/citadel-nav-article-reading-progress-v1.html
preview/citadel-full-article-modules-v2.html
```

### Mobile Compatibility

```text
docs/maintenance/CITADEL_MOBILE_COMPATIBILITY_RULE.md
```

### Future Comments Feature

```text
docs/maintenance/modules/article-comments.md
```

## Important Bugs Found And Fixed

### Bug 1 — Navigation Root Selection

Problem:

```html
<body data-citadel-navigation="true">
<header class="ck-nav" data-citadel-navigation>
```

The navigation script initially selected the first `[data-citadel-navigation]`, which could be the body instead of the header. It then calculated nav height from the body and caused black-screen / layout displacement.

Fix:

```text
navigation.js now selects the actual navigation root first:
[data-citadel-navigation-root]
header[data-citadel-navigation]
nav[data-citadel-navigation]
.ck-nav[data-citadel-navigation]
[data-citadel-navigation]:not(body)
```

Additional guard:

```text
abnormal nav heights are capped to avoid layout collapse
```

### Bug 2 — Stale Drawer Scroll-Lock

Problem:

```text
body.citadel-drawer-open could leave the page non-scrollable if state leaked or preview changed.
```

Fix:

```text
navigation.js now resets closed drawer state on init
removes stale body scroll-lock when drawer is not open
clears stale lock on load/resize when drawer is closed
```

### Bug 3 — Reading Progress Targeted Body

Problem:

```html
<body data-citadel-reading-progress="true">
```

was matched by this broad CSS selector:

```css
[data-citadel-reading-progress] {
  height: 4px;
  overflow: hidden;
}
```

This turned the entire body into a 4px progress bar and blocked scrolling/interactions.

Fix:

```text
reading-progress.css now excludes body/html from progress-bar styling
reading-progress.js now selects only a real progress-bar element
new supported selector: [data-citadel-reading-progress-bar]
legacy selector: [data-citadel-reading-progress]:not(body):not(html)
```

Rule:

```text
Module config attributes on body/html must not be styled as component elements.
```

## Current Module Behavior Decisions

### Navigation Drawer

```text
right-side drawer preferred for Chambers implementation
black/gold premium drawer surface
backdrop required
Escape close required
focus handling required
body scroll lock only while drawer is actually open
```

### Article Index

```text
desktop: sticky left rail
mobile/tablet: below hero / before article body
route-agnostic activation
active state must reach final heading
Back to top link included
```

### Reading Time

```text
article metadata only
not sticky by default
may scroll away naturally
must remain readable on mobile when visible
```

### Reading Progress

```text
fixed below navbar when used as a top progress bar
must not block pointer events
must not target body/html
must stay below drawer/backdrop z-index
```

## Future Feature Added To Roadmap

### Citadel Article Comments

Planned module:

```text
Module ID: article-comments
Scope: article pages only
Status: planned
```

Important boundary:

```text
not a pure frontend/static feature
requires backend or trusted managed provider
requires moderation
requires spam/abuse controls
requires privacy handling
requires admin controls
requires legal disclaimer and comment policy for Chambers of AK
```

Default for Chambers:

```text
disabled until moderation and legal/privacy safeguards are ready
all comments should require approval before public display
no anonymous open legal Q&A
no case-specific/private/confidential information in comments
```

## Production Boundary

The following remain unchanged:

```text
assets/css/style.css
assets/js/script.js
production /updates/*.html article pages
sitemap.xml
feed.xml
robots.txt
ads.txt
CNAME
analytics/ad configuration
```

All Citadel module testing remains preview-only/non-live.

## Current Recommended Production Rollout Direction

When approved, the first live rollout should be controlled and narrow:

```text
Target: actual Chambers article pages only
Initial modules: Article Index + Reading Time + Reading Progress
Navigation Drawer rollout: separate review, because it affects the whole public site
```

Suggested order:

```text
1. Prepare PowerShell 7-compatible rollout patch.
2. Apply Article Index, Reading Time and Reading Progress to one production article first.
3. Validate desktop/mobile/dark/light.
4. If stable, apply to remaining article pages.
5. Update docs and CHANGELOG.md.
6. Do not change sitemap/feed unless public URL set changes.
7. Do not request indexing unless relevant public content or URL structure changes.
```

Navigation Drawer should be rolled out later as a site-wide header update after a separate production-header preview.

## Validation Commands

Run from local repository root after pulling latest main:

```powershell
node --check .\assets\js\themes\citadel-of-kang\navigation.js
node --check .\assets\js\themes\citadel-of-kang\article-index.js
node --check .\assets\js\themes\citadel-of-kang\reading-time.js
node --check .\assets\js\themes\citadel-of-kang\reading-progress.js
git diff --check
git status -sb
```

## Manual Validation Checklist

For the full v2 preview:

```text
open https://chambersofak.in/preview/citadel-full-article-modules-v2.html
hard refresh
check desktop scroll
check mobile scroll
open and close drawer
check backdrop close
check Escape close
check Article Index generation
check Article Index mobile placement
check section jumps
check active state reaches final heading
check Reading Time calculation
check Reading Progress movement
check no console errors
```

## Stop Conditions Before Live Rollout

Do not roll out to production if any of the following exist:

```text
page cannot scroll
mobile page cannot scroll
body/html is styled as a module component
navigation drawer causes stale scroll lock
Article Index blocks article content
Reading Progress blocks pointer events
Article Index active state fails to reach final heading
mobile layout has horizontal overflow
console errors appear
```

## Next Step

Prepare a controlled PowerShell rollout plan for applying the article modules to Chambers article pages, while keeping the Navigation Drawer as a separate future site-wide feature.
