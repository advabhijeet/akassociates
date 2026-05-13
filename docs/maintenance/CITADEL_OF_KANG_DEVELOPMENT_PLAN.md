# Citadel of Kang Development Plan

This document controls the development workflow for **Citadel of Kang**, the standalone modular theme direction being developed temporarily inside the Chambers of AK website repository.

Chambers of AK is the first implementation, but Citadel of Kang must be designed as a reusable theme system that can later be extracted into a fresh standalone repository.

## Current Phase

```text
Phase 1: Theme development and modular planning.
```

Current rule:

```text
Develop the theme first.
Do not roll it into the live Chambers of AK site until reviewed and applied through one controlled PowerShell 7-compatible patch.
```

## Hard Boundary

During Phase 1, do not directly change the live public pipeline unless expressly approved.

Avoid direct production edits to:

```text
assets/css/style.css
assets/js/script.js
real /updates/ article pages
sitemap.xml
feed.xml
homepage/nav/footer production markup
ad code
analytics IDs
```

Allowed Phase 1 work:

```text
documentation
theme module drafts
preview-only files
module architecture planning
local-only patch preparation
non-production examples
```

## Theme Identity

Theme name:

```text
Citadel of Kang
```

Recommended namespace:

```text
citadel-of-kang
citadel-kang
CitadelKang
```

Recommended cache-key pattern:

```text
citadel-kang-core-1
citadel-kang-navigation-1
citadel-kang-article-index-1
citadel-kang-social-1
citadel-kang-insights-1
```

## Repository Role

This repository is a temporary development/staging ground for Citadel of Kang because:

- the Chambers of AK visual assets are here;
- the existing Citadel-derived production theme is here;
- the first real implementation constraints are here;
- the user wants Chambers of AK to be the first rollout.

Long-term rule:

```text
After Citadel of Kang is stable and rolled out on Chambers of AK, extract the reusable theme into a fresh standalone repository.
```

This repository must remain the Chambers of AK website repository after extraction.

## Development Tracks

### Track A — Reusable Citadel of Kang Theme

Reusable code that can later move into a standalone theme repository.

Includes:

```text
tokens
layout
typography
navigation patterns
footer patterns
buttons
cards
forms
article index module
insights filter module
theme toggle module
social bar module
reveal animation module
conversion event hook pattern
```

Must not include:

```text
Chambers-specific legal articles
Chambers-specific phone/email/social links
GTM/Analytics/AdSense IDs
chambersofak.in hardcoded references
law-firm-only wording unless kept as sample content
sitemap/feed files
private configuration
```

### Track B — Chambers of AK Implementation Layer

Implementation code that adapts Citadel of Kang to Chambers of AK.

Includes:

```text
Chambers logo assets
black/white/gold brand values
firm name and tagline
legal disclaimer language
Chambers social links
case enquiry/contact conversion events
legal update content structure
site-specific schema
site-specific analytics and ad configuration
```

## Proposed Theme Structure

Target development structure:

```text
assets/
├─ css/
│  └─ themes/
│     └─ citadel-of-kang/
│        ├─ tokens.css
│        ├─ core.css
│        ├─ layout.css
│        ├─ typography.css
│        ├─ navigation.css
│        ├─ footer.css
│        ├─ components.css
│        ├─ pages.css
│        └─ modules/
│           ├─ article-index.css
│           ├─ insights-filter.css
│           ├─ social-bar.css
│           ├─ theme-toggle.css
│           └─ reveal.css
│
└─ js/
   └─ themes/
      └─ citadel-of-kang/
         ├─ core.js
         ├─ navigation.js
         ├─ theme-toggle.js
         ├─ social-links.js
         ├─ article-index.js
         ├─ insights-filter.js
         ├─ conversion-events.js
         └─ reveal.js
```

The currently created intermediate namespace `assets/css/themes/citadel/modules/` and `assets/js/themes/citadel/` should be treated as transitional. The final planned namespace is `citadel-of-kang`.

## Module Inventory

### Core Theme Modules

| Module | Purpose | Reusable? | Chambers-specific? |
|---|---|---:|---:|
| tokens | color, spacing, font and radius variables | yes | no, except implementation token values |
| core | reset, base surfaces, accessibility basics | yes | no |
| layout | page shell, sections, grids, spacing | yes | no |
| typography | headings, body, editorial text | yes | no |
| navigation | desktop/mobile nav structure and scroll behaviour | yes | partially configurable |
| footer | footer layout and grouped links | yes | content-specific only |
| components | buttons, cards, tags, panels, forms | yes | no |
| pages | generic page/article/contact patterns | yes | partially |

### Optional Feature Modules

| Module | Purpose | Default Rule |
|---|---|---|
| article-index | auto-generate long-form article index | opt-in/fallback with 3+ h2 headings |
| insights-filter | filter content cards by tag/category | only when filter markup exists |
| social-bar | render configured social links | requires configured links |
| theme-toggle | light/dark mode | enabled where toggle markup/config exists |
| reveal | scroll reveal animation | only elements with reveal class/data attribute |
| conversion-events | analytics event hooks | site-specific config required |
| live-clock | optional location/time display | site-specific config required |

## Module Activation Rules

Citadel of Kang modules should prefer explicit data attributes and graceful fallback.

Article Index example:

```html
<body data-citadel-article-index="true">
```

Disable example:

```html
<body data-citadel-article-index="false">
```

Article-level opt-in:

```html
<article class="article-body" data-citadel-article-index>
```

Fallback:

```text
Run on article.article-body with 3 or more direct h2 headings.
```

Avoid hardcoded route-only logic such as:

```text
/updates/*.html only
```

The module should work with any route pattern, including:

```text
/blog/
/articles/
insights/
news/
legal-updates/
post/
custom CMS/static routes
```

## Article Index Feature Update

Article Index is the first formal Citadel of Kang feature update.

Feature name:

```text
Citadel Article Index
```

Feature cache key:

```text
citadel-kang-article-index-1
```

Expected features:

```text
auto-generate section index from direct h2 headings
skip pages with fewer than 3 h2 headings
desktop fixed/sticky left rail
mobile/tablet below-hero index block
active state follows latest visible heading
reading progress bar
Back to top link
dark/light mode contrast support
explicit opt-in and opt-out support
route-agnostic activation
```

## Migration Map From Current Site

### Reusable Theme Candidates

```text
Citadel color tokens
font loading pattern
nav shell and mobile drawer behaviour
theme mode toggle
footer grouping layout
article-body typography
card grids and update cards
insights filter behaviour
home reveal animation pattern
article index module draft
```

### Chambers-Specific Implementation

```text
Chambers of AK logo paths
firm social links
Patna clock label
GTM ID
AdSense publisher details
case enquiry / contact conversion labels
legal-disclaimer content
specific article registry entries
sitemap/feed references
```

### Temporary / Preview Items

```text
preview/article-index-preview.html
assets/css/article-index.css if present
assets/js/article-index.js if present
assets/css/themes/citadel/modules/article-index.css transitional namespace
assets/js/themes/citadel/article-index.js transitional namespace
```

Temporary items must be cleaned or migrated during the controlled feature patch.

## Rollout Plan

### Phase 1 — Development

```text
1. Document architecture.
2. Draft Citadel of Kang modules.
3. Separate reusable theme logic from Chambers-specific implementation.
4. Keep production pipeline unchanged.
5. Use preview/local pages only.
```

### Phase 2 — Local Patch Preparation

Create a PowerShell 7-compatible patch package that:

```text
1. syncs latest main;
2. checks clean working tree except ignored/local backups;
3. creates final citadel-of-kang module directories;
4. migrates transitional modules into final namespace;
5. removes misplaced generic article-index files if present;
6. imports CSS modules only after approval;
7. loads JS modules only after approval;
8. removes preview page after rollout confirmation;
9. updates docs and CHANGELOG.md;
10. validates with node --check and git diff --check;
11. commits and pushes with controlled commit message.
```

### Phase 3 — Chambers of AK Rollout

```text
1. Apply the local patch.
2. Review git diff.
3. Run validation.
4. Push to main.
5. Wait for GitHub Pages.
6. Manually live-check desktop/mobile/dark/light.
7. Request indexing only if public content URLs changed.
8. Monitor Search Console and AdSense impact.
```

### Phase 4 — Standalone Extraction

After Chambers rollout is stable:

```text
1. Create a fresh Citadel of Kang repository.
2. Copy reusable theme files only.
3. Remove Chambers-specific implementation data.
4. Add sample pages and neutral demo content.
5. Add installation and activation docs.
6. Add versioning and licensing notes.
7. Continue commercial/WordPress packaging in that repo, not here.
```

## Validation Checklist

Before any live rollout:

```text
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/*.js
node --check assets/js/themes/citadel-of-kang/modules/*.js if used
git diff --check
manual desktop preview
manual mobile preview
manual dark/light mode test
manual article heading/index test
manual nav/footer test
```

## Commit Naming

Suggested development commit:

```text
Document Citadel of Kang development plan
```

Suggested future feature patch commit:

```text
Modularize Citadel of Kang theme system
```

Suggested Article Index rollout commit if separate:

```text
Add Citadel of Kang article index module
```

## Standing Rule

Citadel of Kang development must remain reusable-first and Chambers-compatible second.

Chambers of AK is the proving ground, not the limit of the theme.
