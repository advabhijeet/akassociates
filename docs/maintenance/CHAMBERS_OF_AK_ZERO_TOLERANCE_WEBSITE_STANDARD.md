# Chambers of AK Zero-Tolerance Website Standard

This document defines the mandatory coding, design, maintenance and rollout standard for the entire **Chambers of AK** website.

This rule applies to the whole public website at:

```text
https://chambersofak.in
```

It is not limited to the Citadel of Kang theme.

## Scope

This standard applies to:

```text
homepage
about page
practice pages
court pages
enquiry/contact pages
article/update pages
legal-policy pages
CSS files
JavaScript files
theme files
preview pages
SEO files
sitemap/feed files
future CMS/manager integration
future client portal boundary planning
```

## Core Rule

The Chambers of AK website must be maintained as a clean, professional, reusable and production-grade legal website.

It must not become a collection of temporary hacks, stacked patch blocks, contradictory overrides or page-specific fixes that make future maintenance difficult.

## Zero-Tolerance Principles

The following are mandatory across the entire website:

```text
clean code only
modular structure
variable-driven styling
mobile-safe implementation
accessibility-conscious design
SEO-safe changes
no stacked contradictory patches
no broad unsafe selectors
no body/html component targeting
no fragile page-specific hacks
no JavaScript layout manipulation where CSS can do the job cleanly
no production rollout without local validation
no production rollout without documentation when behaviour changes
```

## Relationship With Citadel of Kang

Citadel of Kang remains the modular theme direction, but the clean-code rule applies to the entire Chambers website.

```text
Chambers of AK website = production public website
Citadel of Kang = reusable theme/module system
Citadel Manager / Website CMS = future admin-only management product
Client Portal = separate secure future product
```

The production website must not become dependent on one-off Citadel experiments unless they are cleanly promoted into reusable modules or properly isolated implementation adapters.

## Variable-Driven Design Rule

Reusable visual rules must use design variables wherever possible.

Preferred:

```css
:root {
  --color-black: #050505;
  --color-white: #ffffff;
  --color-gold: #d4af37;
  --radius-card: 22px;
  --nav-space: 108px;
}
```

Avoid:

```css
.some-random-section-only-fix {
  margin-left: 37px;
  color: #c7a91e;
}
```

If a value affects brand, spacing, layout, radius, color, typography, z-index or animation, prefer a variable/token.

## CSS Standard

CSS must be:

```text
structured
layered logically
component-oriented
mobile-aware
free from contradictory overrides
free from abandoned patch blocks
```

Avoid adding multiple blocks such as:

```text
PATCH 2
PATCH 3
PATCH 4
PATCH 5
PATCH 6
```

for the same issue.

If a feature requires repeated contradictory patches, stop and refactor cleanly.

## JavaScript Standard

JavaScript should handle behaviour, not uncontrolled layout repair.

Allowed:

```text
menu open/close
focus management
theme toggle
safe smooth scrolling
reading time calculation
active section detection
form validation
analytics event push
```

Avoid:

```text
manual layout left/top/width measurements unless unavoidable
horizontal movement of layout rails
state classes that fight CSS
page-specific DOM hacks
unsafe querySelector usage for unescaped hashes
```

Use safer APIs where possible.

Example:

```js
document.getElementById(decodedId)
```

instead of:

```js
document.querySelector('#1-invalid-selector')
```

## Selector Safety Rule

Never write broad component CSS that can accidentally target global structural elements.

Forbidden pattern:

```css
[data-some-module] {
  height: 4px;
  overflow: hidden;
}
```

if the same attribute may appear on:

```html
<body data-some-module="true">
```

Preferred:

```css
.some-module-component,
[data-some-module-component],
[data-some-module]:not(body):not(html) {
  height: 4px;
}
```

Best practice:

```text
use separate attributes for page-level configuration and component elements
```

Example:

```html
<body data-citadel-reading-progress="true">
<div class="citadel-reading-progress" data-citadel-reading-progress-bar></div>
```

## Mobile-First Rule

Every website change must be checked on mobile.

Required:

```text
normal vertical scrolling
no horizontal overflow
no blocked tap targets
no sticky/fixed element covering content
readable typography
reasonable spacing
drawer/menu usable on touch devices
article tools usable on small screens
```

Mobile failures are release-blocking.

## Accessibility Rule

Interactive features must support:

```text
keyboard navigation
visible focus states
semantic HTML where possible
Escape close for drawers/modals
focus restoration after closing overlays
reduced-motion respect where applicable
accessible labels for buttons/icons
```

Decorative visuals should not interfere with screen readers or pointer interaction.

## SEO And Indexing Rule

Public SEO files must not be changed casually.

Protected files:

```text
sitemap.xml
feed.xml
robots.txt
ads.txt
CNAME
canonical tags
structured data
analytics/ad scripts
```

Only update these when the relevant public URL, indexation rule, feed inclusion or metadata actually changes.

Do not request indexing merely because CSS/JS changed.

Request indexing only when:

```text
new public page is created
important content changes
canonical/meta information changes
URL structure changes
```

## Preview Page Rule

Preview pages must be:

```text
noindex
nofollow
clearly marked preview-only
not linked from public navigation
safe to delete later
excluded from sitemap/feed
```

Preview pages are for testing only. They are not production content.

## Production Rollout Rule

No meaningful feature should go directly to full production.

Preferred rollout sequence:

```text
1. define intended behaviour
2. create or update module contract / maintenance note
3. build isolated noindex preview
4. build combined noindex preview if modules interact
5. test locally on the intended production page
6. stage on one page first
7. validate desktop/mobile/light/dark/console
8. only then roll out wider
```

## One-Page Staging Rule

For risky visual or behavioural changes, apply to one page first.

Example:

```text
one article page before all article pages
one page template before all templates
one header preview before site-wide navigation change
```

## No Stacked Patch Rule

If the same issue requires more than two follow-up patches, stop.

Mandatory corrective action:

```text
pause
inspect git diff
identify conflicting code
remove temporary patch blocks
restore clean architecture
rebuild using variables/components
validate again
```

The final committed code must look intentional, not like accumulated trial-and-error.

## Cleanup Before Commit

Before committing, remove:

```text
contradictory override blocks
temporary patch labels
debug code
unused selectors
unused JS branches
preview-only hacks from production files
old cache-busting fragments that are no longer needed
```

CHANGELOG should describe the final feature, not every failed patch attempt.

## Git Validation Rule

Before committing website changes, run relevant checks.

General checks:

```powershell
git diff --check
git status -sb
```

JavaScript checks:

```powershell
node --check .\assets\js\script.js
node --check .\assets\js\themes\citadel-of-kang\article-index.js
node --check .\assets\js\themes\citadel-of-kang\reading-time.js
node --check .\assets\js\themes\citadel-of-kang\reading-progress.js
```

Only run checks for files/modules that exist and are relevant to the change.

## Manual Validation Rule

Before production rollout, manually test:

```text
desktop layout
mobile layout
scrolling
navigation/menu
light mode
dark mode
console errors
article pages if article modules are affected
forms if contact/enquiry is affected
SEO metadata if head/canonical/title changes
```

## Article Page Rule

Article-page features must remain clean and reusable.

The Article Index target behaviour is:

```text
desktop: two-column article layout
left: Article Index
right: article body
index remains visible beside article while reading where layout allows it
no horizontal drift
no jump-to-bottom mode
no unnecessary internal scrollbar
active item updates while scrolling
mobile: static block below hero / before article body
```

Reading Time:

```text
article metadata only
not sticky by default
```

Reading Progress:

```text
desktop: may live inside the Article Index
mobile: thin bar directly under navbar like a bottom border
must not block pointer events
```

## Legal Website Professionalism Rule

Because Chambers of AK is a legal-professional website, every public-facing change must preserve:

```text
professional tone
non-solicitation sensitivity
clear disclaimers where required
privacy-conscious UX
no misleading legal advice impression
no unmoderated public legal consultation features
```

Comments, client login, case-status tools and similar interactive features require separate backend, privacy, security and legal review.

## Current Corrective Action For Article Module Test

The current staged Article Index test must be cleaned before commit.

Required direction:

```text
stop adding patch blocks
inspect current diff
remove contradictory style patches
keep confirmed safe fixes only
refactor Article Index to match the approved canvas architecture
use CSS grid/sticky instead of JS rail manipulation where possible
validate again locally
```

## Final Rule

For Chambers of AK website work:

```text
When code starts becoming patch-on-patch, stop.
Clean the implementation.
Refactor into a reusable, documented, variable-driven component.
Then proceed.
```
