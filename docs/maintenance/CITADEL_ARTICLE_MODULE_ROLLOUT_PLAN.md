# Citadel Article Module Rollout Plan

This document defines the controlled rollout plan for applying the validated **Citadel of Kang article modules** to Chambers of AK article pages.

## Current Decision

The first production rollout should target article pages only.

Initial production modules:

```text
Article Index
Reading Time
Reading Progress
```

Excluded from first article-module rollout:

```text
Navigation Drawer
Article Comments
Citadel Manager / CMS backend
Client Portal
```

Reason:

```text
Navigation Drawer is a site-wide header feature and should be rolled out separately.
Article Comments require backend, moderation, privacy and legal-safety controls.
Citadel Manager / CMS and Client Portal are separate future products.
```

## Current Stable Preview Baseline

The current full validated preview is:

```text
https://chambersofak.in/preview/citadel-full-article-modules-v2.html
```

Confirmed working:

```text
page scroll works
screen is interactive
Reading Progress bar works
Navigation Drawer works
Article Index works
Reading Time calculates
```

For production article rollout, use only:

```text
Article Index
Reading Time
Reading Progress
```

Do not roll out Navigation Drawer in the same patch.

## Production Boundary

Do not change these files unless the rollout patch expressly requires it:

```text
sitemap.xml
feed.xml
robots.txt
ads.txt
CNAME
analytics/ad configuration
```

Expected files for article-module rollout:

```text
assets/css/style.css
assets/js/script.js or production article-page script loading path
selected /updates/*.html article pages
CHANGELOG.md
docs/maintenance/* if documentation update is needed
```

## Rollout Strategy

Use a narrow staged rollout.

### Stage 1 — One Article Only

Target first article:

```text
updates/property-title-search-before-purchase-india.html
```

Apply:

```text
Article Index module
Reading Time module
Reading Progress module
```

Validate:

```text
desktop layout
mobile layout
dark/light mode if applicable
article index generation
active state reaches final heading
reading time calculates
reading progress bar moves
no blocked scrolling
no console errors
```

### Stage 2 — Remaining Article Pages

After Stage 1 approval, apply to remaining article pages.

Article pages should be discovered conservatively, preferably from:

```text
/updates/*.html files
legal-updates hub links
feed.xml article links
sitemap.xml article links
```

Do not apply article modules to:

```text
home page
about page
practice page
contact page
policy pages
preview pages
client portal pages
```

### Stage 3 — Cleanup Preview Pages Later

Do not delete preview pages in the rollout patch unless expressly approved.

Preview pages may be removed later after production rollout is stable.

## Required Markup Pattern

Production article body should have explicit activation attributes.

Preferred body flags:

```html
<body data-citadel-article-index="true" data-citadel-reading-time="true" data-citadel-reading-progress="true">
```

Important:

```text
CSS modules must not style body/html config attributes as component elements.
```

Article body/source:

```html
<article class="article-body" data-citadel-article-index data-citadel-reading-time data-citadel-reading-progress-source>
```

Reading Time output target:

```html
<span class="citadel-reading-time" data-citadel-reading-time-output>Reading time pending</span>
```

Reading Progress target:

```html
<div class="citadel-reading-progress is-fixed" data-citadel-reading-progress-bar aria-hidden="true"><span></span></div>
```

Avoid using this on component elements in future markup unless backward compatibility requires it:

```html
<div data-citadel-reading-progress></div>
```

Because body may also use `data-citadel-reading-progress="true"` as a config flag.

## CSS Loading Plan

Preferred production approach:

```text
Import article module CSS through the main production stylesheet only after rollout approval.
```

Required CSS modules:

```text
assets/css/themes/citadel-of-kang/modules/article-index.css
assets/css/themes/citadel-of-kang/modules/reading-time.css
assets/css/themes/citadel-of-kang/modules/reading-progress.css
```

Possible production import block:

```css
/* Citadel of Kang article modules */
@import url("themes/citadel-of-kang/modules/article-index.css");
@import url("themes/citadel-of-kang/modules/reading-time.css");
@import url("themes/citadel-of-kang/modules/reading-progress.css");
```

Only add imports if paths resolve correctly from:

```text
assets/css/style.css
```

If direct imports are not suitable, the rollout patch may add page-level links to article pages. Prefer global controlled stylesheet import where safe.

## JavaScript Loading Plan

Required JS modules:

```text
assets/js/themes/citadel-of-kang/article-index.js
assets/js/themes/citadel-of-kang/reading-time.js
assets/js/themes/citadel-of-kang/reading-progress.js
```

Preferred production approach:

```text
Load modules only on article pages through explicit script tags or a safe article-page loader.
```

Simple article-page script pattern:

```html
<script src="../assets/js/themes/citadel-of-kang/article-index.js"></script>
<script src="../assets/js/themes/citadel-of-kang/reading-time.js"></script>
<script src="../assets/js/themes/citadel-of-kang/reading-progress.js"></script>
```

Use relative paths carefully based on article location.

For `/updates/*.html`, expected relative path:

```text
../assets/js/themes/citadel-of-kang/*.js
```

## Known Critical Bug To Avoid

Do not let Reading Progress CSS or JS target the body/html element.

Correct selector approach:

```css
[data-citadel-reading-progress-bar]
[data-citadel-reading-progress]:not(body):not(html)
.citadel-reading-progress
```

Correct JS root selector approach:

```js
'[data-citadel-reading-progress-bar], .citadel-reading-progress, [data-citadel-reading-progress]:not(body):not(html)'
```

Do not use:

```css
[data-citadel-reading-progress] { height: 4px; overflow: hidden; }
```

because it may match:

```html
<body data-citadel-reading-progress="true">
```

and break page scrolling.

## Local Patch Requirements

The rollout patch must be PowerShell 7-compatible.

Requirements:

```text
must run from any location when RepoPath is supplied
must check that repository path exists
must check working tree status before changes
must create backup copies or rely on git clean-state
must avoid fragile quote escaping
must avoid regex that can corrupt HTML
must update only intended article pages
must run node --check for JS modules
must run git diff --check
must not modify sitemap/feed unless expressly required
must update CHANGELOG.md
```

Preferred patch style:

```text
PowerShell script with functions
single-responsibility helper functions
literal paths
clear failure messages
no inline one-liner mega-script
```

## Suggested PowerShell Validation Commands

Run locally after pulling latest main:

```powershell
cd "C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can"
git status -sb
git pull origin main

node --check .\assets\js\themes\citadel-of-kang\article-index.js
node --check .\assets\js\themes\citadel-of-kang\reading-time.js
node --check .\assets\js\themes\citadel-of-kang\reading-progress.js

git diff --check
git status -sb
```

After applying rollout patch:

```powershell
git diff --check
git status -sb
```

Optional local server:

```powershell
python -m http.server 8080
```

Then test:

```text
http://localhost:8080/updates/property-title-search-before-purchase-india.html
```

## Manual Validation Checklist For First Article

Target:

```text
updates/property-title-search-before-purchase-india.html
```

Desktop checks:

```text
article loads normally
no layout shift at top
Article Index appears in left rail
Article Index links work
active index state updates while scrolling
active state reaches final heading
Reading Time appears in article meta area
Reading Progress appears below fixed/sticky header or at approved top position
Reading Progress moves while scrolling
Back to top works
no horizontal overflow
no console errors
```

Mobile checks:

```text
page scrolls normally
Article Index appears below hero / before article body
index links are readable and tappable
Reading Time pill is readable where shown
Reading Progress is visible but not intrusive
Reading Progress does not block tapping/scrolling
no horizontal overflow
no console errors
```

Dark/light checks if page supports theme mode:

```text
Article Index readable in light mode
Article Index readable in dark mode
Reading Time readable in both modes
Reading Progress visible in both modes
active index state readable in both modes
```

## Search / SEO / Indexing Notes

This rollout should not require sitemap or feed changes if:

```text
URLs remain same
article titles/meta descriptions remain same
canonical URLs remain same
article content does not materially change
```

Do not request indexing merely because frontend reading modules were added.

Request indexing only if:

```text
new public article URL is created
important article content changes
canonical or metadata changes
```

## Rollback Plan

If the first article rollout breaks:

```text
1. Revert the rollout commit.
2. Confirm article page returns to previous state.
3. Re-test preview pages.
4. Patch module safely.
5. Reattempt rollout only after preview passes.
```

If only one module breaks:

```text
remove that module from article page script loading
keep other modules only if stable
record issue in maintenance docs
```

## Stop Conditions

Stop rollout immediately if any of the following occur:

```text
page cannot scroll
mobile page cannot scroll
screen becomes non-interactive
body/html is styled as a module component
Reading Progress blocks pointer events
Article Index blocks article body content
active index state fails to reach final heading
console errors appear
metadata/canonical/sitemap/feed is unintentionally changed
```

## CHANGELOG Requirement

Every rollout patch must update:

```text
CHANGELOG.md
```

Suggested entry:

```text
- Added Citadel of Kang article modules to selected article pages: Article Index, Reading Time and Reading Progress.
```

If only one article is updated in Stage 1, say:

```text
- Added Citadel of Kang article modules to the property title search article as a staged rollout.
```

## Next Step

Prepare a local PowerShell 7 patch package for Stage 1 only:

```text
Target article: updates/property-title-search-before-purchase-india.html
Modules: Article Index + Reading Time + Reading Progress
No Navigation Drawer rollout
No sitemap/feed changes
Update CHANGELOG.md
```
