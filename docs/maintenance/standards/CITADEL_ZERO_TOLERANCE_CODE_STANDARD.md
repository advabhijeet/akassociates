# Citadel of Kang Zero-Tolerance Code Standard

This document defines the mandatory coding and implementation standard for the **Citadel of Kang** theme system and its Chambers of AK implementation.

## Core Rule

Citadel of Kang must be built as a clean, reusable, variable-driven, modular theme system.

It must not become a collection of page-specific hacks, stacked override patches or hardcoded one-off fixes.

## Zero-Tolerance Principles

The following are mandatory:

```text
clean code only
modular architecture
variable-driven styling
route-agnostic components
mobile-first compatibility
no broad unsafe selectors
no body/html component targeting
no stacked contradictory patches
no page-specific hacks unless expressly temporary
no JavaScript layout manipulation where CSS can do the job reliably
no production rollout without preview validation
no production rollout without documentation
```

## Architecture Boundary

Citadel of Kang must remain reusable across websites.

```text
Citadel of Kang = standalone theme pack and frontend module system
Citadel Manager / Website CMS = separate admin-only management product
Chambers of AK = first implementation only
Client Portal = separate secure future product
```

The Chambers implementation may provide brand values, content and legal-specific overrides, but the base theme should not hardcode Chambers-only assumptions unless placed in an implementation layer.

## Variable-Driven Design Requirement

All reusable theme styling must be controlled through variables wherever possible.

Preferred pattern:

```css
:root {
  --ck-color-ink: #141414;
  --ck-color-muted: #6d675d;
  --ck-color-gold: #d4af37;
  --ck-radius-card: 22px;
  --ck-nav-space: 88px;
  --ck-container: 1180px;
}
```

Avoid:

```css
.article-card-special-one-off {
  margin-left: 37px;
  color: #c3a71d;
}
```

Unless a value is truly implementation-specific, it should become a token/variable.

## Component Contract Requirement

Every reusable module must have a contract covering:

```text
module name
activation attributes
required markup
CSS class namespace
public configuration keys
no-op behaviour
mobile behaviour
accessibility behaviour
failure conditions
production readiness checklist
```

A module without a contract is not production-ready.

## Selector Safety Rule

Reusable module selectors must not accidentally target `body`, `html` or global containers.

Forbidden pattern:

```css
[data-citadel-reading-progress] {
  height: 4px;
  overflow: hidden;
}
```

Reason:

```html
<body data-citadel-reading-progress="true">
```

could be matched and break the whole page.

Preferred pattern:

```css
.citadel-reading-progress,
[data-citadel-reading-progress-bar],
[data-citadel-reading-progress]:not(body):not(html) {
  height: 4px;
}
```

Better long-term pattern:

```html
<body data-citadel-reading-progress="true">
<div class="citadel-reading-progress" data-citadel-reading-progress-bar></div>
```

Config attributes and component-element attributes must be clearly separated.

## JavaScript Responsibility Rule

JavaScript should be used for behaviour, not layout hacks.

Allowed JavaScript responsibilities:

```text
generate dynamic article index
calculate reading time
update active article section
update reading progress value
open/close navigation drawer
focus management
accessibility state updates
```

Avoid JavaScript for:

```text
forcing left/top/width layout positions when CSS grid/sticky can handle it
manual page-specific measurements
horizontal rail movement
state classes that fight CSS layout
```

If JavaScript is required for layout, it must be justified in the module contract and tested separately.

## No Stacked Patch Rule

Do not keep adding override blocks such as:

```text
PATCH 2B
PATCH 3
PATCH 4
PATCH 5
PATCH 6
```

when they contradict one another.

If more than two patches are required for the same behaviour, stop and refactor the module cleanly.

Required response:

```text
pause
inspect current diff
identify conflicting code
remove patches
replace with clean module implementation
validate again
```

## Page-Specific Override Rule

Page-specific code is allowed only when:

```text
it is unavoidable
it is documented as implementation-specific
it does not pollute the base theme
it has an expiry/removal plan if temporary
```

Preferred structure:

```text
base theme module
implementation adapter
page content
```

Avoid placing Chambers-specific values inside core Citadel module files.

## Mobile Compatibility Rule

Every Citadel module must be mobile-compatible by default.

Required checks:

```text
mobile scroll works
no horizontal overflow
tap targets are readable and accessible
sticky/fixed elements do not block content
drawer behaviour is touch-safe
article index becomes static below hero on mobile
reading progress does not block pointer events
```

Mobile issues are release-blocking.

## Accessibility Requirement

Every interactive module must support:

```text
keyboard operation
visible focus state
semantic landmarks where appropriate
ARIA only where useful
Escape key close for drawers/modals
focus restoration after closing drawers/modals
reduced-motion respect where applicable
```

## Production Rollout Rule

No module goes directly to live production pages.

Required rollout sequence:

```text
1. module contract
2. isolated noindex preview
3. combined noindex preview
4. local production-page test
5. one-page staged rollout
6. validation
7. wider rollout only after approval
```

## Preview Rule

Preview pages must be:

```text
noindex
nofollow
clearly labelled as preview-only
not linked from public navigation
safe to delete after approval
```

## Cleanup Rule Before Commit

Before committing a rollout, remove:

```text
contradictory patch blocks
temporary debug code
dead CSS
unused JS branches
preview-only hacks from production files
unused cache-busting variants where not needed
```

The final commit should look intentional, not like a patch history dump.

## Git / Validation Requirement

Before committing, run:

```powershell
git diff --check
node --check .\assets\js\themes\citadel-of-kang\article-index.js
node --check .\assets\js\themes\citadel-of-kang\reading-time.js
node --check .\assets\js\themes\citadel-of-kang\reading-progress.js
node --check .\assets\js\script.js
git status -sb
```

Additional manual validation is required for:

```text
desktop
mobile
light mode
dark mode
console errors
scroll behaviour
module no-op behaviour
```

## Article Index Rule

The Article Index target behaviour must match the approved canvas preview baseline:

```text
desktop: two-column grid layout
left: article index
right: article body
index remains visible beside article while reading
no horizontal movement
no internal scrollbar unless the index is genuinely taller than the viewport and the design explicitly allows it
no jump-to-bottom mode
active item updates while scrolling
mobile: static block below hero/before article body
```

The module should use CSS grid and sticky positioning where possible.

Avoid:

```text
manual left/top/width rail positioning
horizontal rail movement
is-index-after bottom jump state
stacked CSS override patches
```

## Reading Progress Rule

Desktop:

```text
progress may appear inside the Article Index when the index is visible
```

Mobile:

```text
progress should appear as a thin bar directly under the navbar, visually like the navbar bottom border
```

It must not capture pointer events.

## Current Corrective Action

The current staged Article Index production test must be cleaned before commit.

Required cleanup direction:

```text
inspect current diff
remove stacked PATCH 2B / PATCH 3 / PATCH 4 / PATCH 5 / PATCH 6 style overrides
simplify article-index.js by removing rail-positioning logic
restore canvas-style CSS layout in the proper module file
keep only confirmed good fixes such as safe hash scrolling and safe body/html selector handling
validate locally again
```

## Final Rule

When a feature starts requiring multiple contradictory patches, stop patching.

Refactor cleanly.
