# Citadel of Kang Module Inventory and Migration Map

This document classifies the current Chambers of AK website code into reusable **Citadel of Kang** theme modules, Chambers-specific implementation pieces, transitional files and future standalone extraction items.

This is a planning document only. It must be used before any production rollout or PowerShell patch that changes the active live website pipeline.

## Purpose

Citadel of Kang is being developed temporarily inside the Chambers of AK website repository because the first implementation and visual assets are here.

The goal of this inventory is to prevent theme code from becoming unnecessarily hardcoded to Chambers of AK.

Working rule:

```text
Reusable theme code goes into Citadel of Kang.
Chambers-specific code stays in the Chambers implementation layer.
Live rollout happens later through one controlled PowerShell 7-compatible patch.
```

## Current Source Areas

Current active sources to inspect and modularize:

```text
assets/css/style.css
assets/css/themes/citadel-of-ak.css
assets/js/script.js
assets/css/themes/citadel/modules/article-index.css
assets/js/themes/citadel/article-index.js
preview/article-index-preview.html
```

Rollback source to preserve:

```text
assets/css/themes/chambers-ak.css
```

Do not delete the rollback theme.

## Target Citadel of Kang Namespace

Final preferred namespace:

```text
assets/css/themes/citadel-of-kang/
assets/js/themes/citadel-of-kang/
```

The existing intermediate namespace:

```text
assets/css/themes/citadel/modules/
assets/js/themes/citadel/
```

should be treated as transitional and migrated during the controlled feature patch.

## CSS Migration Map

### tokens.css

Reusable theme items:

```text
color variables
font-family variables
spacing variables
radius values
gold accent system
light/dark mode token mapping
shadow/surface variables
z-index and nav height variables
```

Chambers-specific values that may remain implementation tokens:

```text
Chambers black/white/gold palette exact values
brand logo canvas assumptions
law-firm-specific visual intensity choices
```

Migration decision:

```text
Move generic variables to citadel-of-kang/tokens.css.
Keep Chambers-specific overrides in a later implementation file or local token override block.
```

### core.css

Reusable theme items:

```text
reset/base box sizing
body defaults
link defaults
image defaults
accessibility helpers
reduced-motion handling
focus-visible patterns
base light/dark surfaces
```

Migration decision:

```text
Extract from citadel-of-ak.css into citadel-of-kang/core.css where not Chambers-specific.
```

### typography.css

Reusable theme items:

```text
display heading rhythm
body text defaults
editorial article typography
small caps/eyebrow treatment
blockquote/note patterns
list spacing
legal/editorial content hierarchy
```

Chambers-specific items:

```text
firm tagline wording
legal disclaimer wording
practice-area content labels
```

Migration decision:

```text
Move visual typography to citadel-of-kang/typography.css.
Keep content text out of theme files.
```

### layout.css

Reusable theme items:

```text
site shell
section spacing
container widths
grid primitives
hero section layout
responsive breakpoints
page-header spacing
```

Migration decision:

```text
Move generic layout to citadel-of-kang/layout.css.
```

### navigation.css

Reusable theme items:

```text
sticky navigation layout
desktop navigation spacing
mobile drawer presentation
menu toggle styles
nav CTA styles
topbar layout where optional
scrolled nav state
```

Chambers-specific items:

```text
specific logo image paths
exact nav link labels
firm social links inside drawer/topbar
```

Migration decision:

```text
Move structural nav styles to citadel-of-kang/navigation.css.
Keep actual nav content in HTML or implementation config.
```

### footer.css

Reusable theme items:

```text
footer grid
grouped footer links
footer social row styling
footer disclaimer styling
responsive footer layout
```

Chambers-specific items:

```text
Bar Council disclaimer wording
firm copyright string
specific footer links
```

Migration decision:

```text
Move footer visuals to citadel-of-kang/footer.css.
Keep footer content in site HTML.
```

### components.css

Reusable theme items:

```text
buttons
CTA links
cards
tags/chips
forms
contact panels
info grids
alert/note boxes
social icon styles
```

Migration decision:

```text
Move generic visual components to citadel-of-kang/components.css.
```

### pages.css

Reusable theme items:

```text
home sections
about/practice page layout patterns
article body page layout
contact/process/FAQ page patterns where generic
updates grid structure
```

Chambers-specific items:

```text
practice-area names
legal-update article titles
law-firm profile copy
contact address details
```

Migration decision:

```text
Move layout patterns only. Keep text/content in site pages.
```

## CSS Optional Modules

### modules/article-index.css

Current transitional source:

```text
assets/css/themes/citadel/modules/article-index.css
```

Future source:

```text
assets/css/themes/citadel-of-kang/modules/article-index.css
```

Reusable module items:

```text
article index rail layout
index title/note styles
numbered section links
active section state
reading progress bar
mobile/tablet below-hero layout
light/dark contrast states
```

Rules:

```text
No Chambers-specific route dependency.
No hardcoded article titles.
No hardcoded chambersofak.in references.
```

### modules/insights-filter.css

Reusable module items:

```text
filter button row
active filter button
hidden-card state
filter status text
```

Chambers-specific items:

```text
legal update categories and tags
article registry content
```

### modules/social-bar.css

Reusable module items:

```text
social icon row
social icon hover/focus states
footer/topbar/drawer variants
```

Chambers-specific items:

```text
LinkedIn and WhatsApp URLs
platform list
aria-label content if firm-specific
```

### modules/theme-toggle.css

Reusable module items:

```text
light/dark toggle switch
sun/moon icons if generic
pressed/focus states
mode-dependent visuals
```

Chambers-specific items:

```text
logo switching paths
specific dark logo filenames
```

### modules/reveal.css

Reusable module items:

```text
scroll reveal base state
visible state
reduced-motion fallbacks
```

## JS Migration Map

### core.js

Reusable theme items:

```text
module bootstrapping
safe DOM-ready helpers
utility functions
CSS variable helpers
reduced-motion helpers
module config reader
```

Avoid:

```text
GTM IDs
Chambers-specific URLs
article registry content
```

### theme-toggle.js

Current source area:

```text
assets/js/script.js theme controller block
```

Reusable theme items:

```text
mode storage key pattern
light/dark state toggling
button aria-label refresh
HTML data-theme attributes
meta theme-color update if configurable
```

Chambers-specific items:

```text
logo-navbar-dark.png path
primary-logo-dark.png path
exact Chambers logo switching assumptions
```

Migration decision:

```text
Move generic toggle logic into citadel-of-kang/theme-toggle.js.
Expose config for logo switching instead of hardcoding Chambers filenames.
```

### navigation.js

Current source area:

```text
assets/js/script.js nav/mobile drawer/topbar logic
```

Reusable theme items:

```text
mobile menu open/close
scroll lock/unlock
nav height measurement
CSS --nav-space update
Escape key close
backdrop handling
active nav state
```

Chambers-specific items:

```text
topbar label "Chambers of AK"
Patna clock label
firm social links injected into drawer/topbar
specific nav link set
```

Migration decision:

```text
Move menu mechanics into navigation.js.
Move social/topbar content to configurable implementation layer.
```

### social-links.js

Current source area:

```text
assets/js/script.js socialLinks array and socialIconSvg object
```

Reusable theme items:

```text
social icon renderer
icon SVG map where generic
footer/topbar insertion hooks
aria-label handling
```

Chambers-specific items:

```text
LinkedIn URL
WhatsApp Channel URL
labels mentioning firm
```

Migration decision:

```text
Make social links configurable through window.CitadelKangConfig.socialLinks or data attributes.
Keep Chambers links outside reusable theme core.
```

### article-index.js

Current transitional source:

```text
assets/js/themes/citadel/article-index.js
```

Future source:

```text
assets/js/themes/citadel-of-kang/article-index.js
```

Reusable module items:

```text
activation by data-citadel-article-index
fallback article.article-body detection
h2 extraction
unique heading IDs
TOC generation
fixed desktop rail
mobile non-fixed index
active latest-visible-heading tracking
progress bar update
Back to top handling
```

Rules:

```text
No /updates/*.html dependency.
No Chambers content dependency.
No hardcoded article titles.
```

### insights-filter.js

Current source area:

```text
assets/js/script.js Insights tag filter system
```

Reusable theme items:

```text
filter button activation
card filtering by data/category/tag
URL query update
status text updates
keyboard-accessible tag trigger
```

Chambers-specific items:

```text
article registry entries
legal update tags
specific article URLs
```

Migration decision:

```text
Move filtering mechanism to module.
Keep registry/data separate as Chambers implementation data.
```

### conversion-events.js

Current source area:

```text
assets/js/script.js conversionEventNames and getConversionPayload
```

Reusable theme items:

```text
click tracking hook pattern
dataLayer bridge if available
configurable event mapping
```

Chambers-specific items:

```text
case_enquiry labels
contact conversion definitions
phone/email/WhatsApp interpretation where firm-specific
```

Migration decision:

```text
Make conversion tracking optional and configuration-driven.
Disable by default in standalone theme unless configured.
```

### reveal.js

Current source area:

```text
assets/js/script.js home-reveal IntersectionObserver block
```

Reusable theme items:

```text
IntersectionObserver reveal logic
reduced-motion fallback
class/data-attribute activation
```

Migration decision:

```text
Move to reveal.js and activate by data-citadel-reveal or reusable reveal class.
```

### live-clock.js or optional social/topbar module

Current source area:

```text
assets/js/script.js clockFormatter and updateLiveClocks
```

Reusable candidate:

```text
optional clock module with configurable timezone and label
```

Chambers-specific items:

```text
Patna, India label
Asia/Kolkata default if not generic
```

Migration decision:

```text
Keep out of core. Make optional/configurable or Chambers implementation-only.
```

## Chambers-Specific Implementation Layer

The following should remain outside reusable Citadel core:

```text
firm name: Chambers of AK
tagline: Advocates & Legal Consultants
website: chambersofak.in
GTM ID
AdSense publisher ID
Google Business Profile link
LinkedIn link
WhatsApp Channel link
specific logo files and cache keys
practice-area copy
legal article content
case enquiry routing
legal disclaimer wording
sitemap.xml
feed.xml
article registry entries
Search Console / AdSense operational notes
```

Potential future file:

```text
assets/js/chambers-implementation.js
assets/css/chambers-overrides.css
```

These should be considered only during a later controlled rollout.

## Transitional Files

Current transitional items that must be handled carefully:

```text
assets/css/themes/citadel/modules/article-index.css
assets/js/themes/citadel/article-index.js
preview/article-index-preview.html
assets/css/article-index.css if present
assets/js/article-index.js if present
```

Final migration should:

```text
1. copy/move useful module code into citadel-of-kang namespace;
2. remove misplaced generic files if present;
3. remove preview page after production module is live and checked;
4. avoid deleting rollback theme files.
```

## Live Rollout Dependencies

Do not activate the new modular system until:

```text
1. Citadel of Kang files are created in final namespace.
2. Modules are route-agnostic and configurable.
3. Chambers-specific data is separated or clearly marked.
4. A PowerShell 7 patch is prepared and reviewed.
5. Validation commands are included.
6. Manual live-check instructions are included.
```

## PowerShell Patch Scope Later

The future patch should be named similar to:

```text
chambers-citadel-of-kang-modular-foundation-patch.zip
```

Expected commit message:

```text
Modularize Citadel of Kang theme foundation
```

The patch should:

```text
1. sync latest main;
2. verify clean tree;
3. create citadel-of-kang folders;
4. migrate CSS/JS modules;
5. preserve existing production imports until rollout step;
6. optionally add preview-only demo pages;
7. update documentation;
8. update CHANGELOG.md;
9. validate with node --check and git diff --check;
10. commit and push only if validation passes.
```

## Extraction Checklist For Future Standalone Repo

When Citadel of Kang is ready to move to a fresh repo, include:

```text
assets/css/themes/citadel-of-kang/**
assets/js/themes/citadel-of-kang/**
neutral demo pages
README
module usage docs
activation examples
configuration examples
license notes
changelog
```

Exclude:

```text
Chambers article pages
Chambers logo assets unless explicitly licensed for demo use
GTM/AdSense/Analytics IDs
contact details
legal-service disclaimers specific to Chambers
google/search console files
sitemap/feed files
```

## Immediate Development Priorities

Next practical development sequence:

```text
1. Create final citadel-of-kang folder structure.
2. Move Article Index module into final namespace.
3. Draft module README/usage notes.
4. Create or preserve preview-only demo page.
5. Plan separation of script.js into reusable and Chambers-specific modules.
6. Prepare PowerShell patch only after architecture is reviewed.
```
