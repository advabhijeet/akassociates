# Citadel of Kang Theme

Citadel of Kang is the standalone modular theme direction that evolved from the Chambers of AK production theme system.

Chambers of AK remains the first real-world implementation and test site. Future theme work should treat Citadel of Kang as a reusable theme package that can be adapted to other websites without hardcoding Chambers-specific content, routes or branding.

## Status

Current status: initialized as a theme architecture direction.

Production site status:

- Chambers of AK currently runs on the Citadel-derived live theme.
- Existing production files should not be renamed in a rushed patch.
- Renaming and restructuring should be performed through a single controlled PowerShell 7-compatible patch after the modular architecture is finalized.
- Theme development may temporarily happen inside this repository because the current assets, implementation constraints and visual source material are here.
- Live website rollout should happen only after the theme work is reviewed and applied through a controlled patch.

## Temporary Development Repository Rule

This repository is a temporary development and staging ground for Citadel of Kang only because Chambers of AK is the first implementation and the required assets already exist here.

Long-term rule:

```text
Develop and validate Citadel of Kang here first.
Roll it out to Chambers of AK only after review.
After the theme is stable and final enough, extract Citadel of Kang into a fresh standalone repository.
```

The future standalone repository should contain the reusable theme package, cleaned documentation, modular CSS/JS files, examples and licensing/distribution notes. It should not carry unnecessary Chambers-specific content, legal articles, analytics IDs, private configuration, sitemap/feed files or law-firm-only implementation details.

This repository must continue to remain the Chambers of AK website repository after extraction.

## Naming

Standalone theme name:

```text
Citadel of Kang
```

Current Chambers implementation may continue to use existing file names temporarily until the migration patch is applied.

Recommended future namespace:

```text
citadel-of-kang
citadel-kang
CitadelKang
```

Recommended module cache key pattern:

```text
citadel-kang-core-1
citadel-kang-article-index-1
citadel-kang-navigation-1
citadel-kang-social-1
```

## Design Principles

Citadel of Kang must be:

1. Modular.
2. Reusable.
3. Brand-adaptable.
4. Route-agnostic.
5. Safe to disable module-by-module.
6. Suitable for static websites first.
7. Capable of later packaging as a standalone commercial or WordPress-compatible theme in a separate repository.

## Chambers of AK Relationship

Chambers of AK is the first implementation of Citadel of Kang.

This means:

- Chambers of AK can provide the first real production constraints.
- Chambers-specific content, legal disclaimers, social links, analytics IDs and branding assets must stay separate from reusable theme logic.
- The theme should not depend on `/updates/*.html`, `chambersofak.in`, law-firm-specific language, or any specific article route.
- Chambers of AK may use default modules, but other websites must be able to opt in or opt out cleanly.
- The theme may be developed here temporarily, but final reusable distribution should be moved to a clean repository after rollout.

## Proposed Folder Structure

Future modular structure:

```text
assets/
├─ css/
│  ├─ style.css
│  └─ themes/
│     ├─ chambers-ak.css
│     ├─ citadel-of-ak.css
│     └─ citadel-of-kang/
│        ├─ core.css
│        ├─ tokens.css
│        ├─ layout.css
│        ├─ navigation.css
│        ├─ footer.css
│        ├─ pages.css
│        ├─ components.css
│        └─ modules/
│           ├─ article-index.css
│           ├─ insights-filter.css
│           ├─ social-bar.css
│           ├─ theme-toggle.css
│           └─ reveal.css
│
└─ js/
   ├─ script.js
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

The current `citadel` folder can be treated as an intermediate namespace. The final migration should use a consistent `citadel-of-kang` namespace.

## Module Categories

Core theme modules:

```text
tokens
base reset
layout grid
navigation
footer
typography
buttons
cards
forms
legal/content pages
```

Optional feature modules:

```text
article index
insights filter
social bar
live clock
theme toggle
homepage reveal animation
conversion tracking hooks
schema helpers
```

## Module Activation Rules

Modules must not rely only on URL paths.

Preferred activation pattern:

```html
<body data-citadel-article-index="true">
```

Disable pattern:

```html
<body data-citadel-article-index="false">
```

Article-level opt-in:

```html
<article class="article-body" data-citadel-article-index>
```

Fallback activation can be used where safe, for example:

```text
Run on article.article-body when the page contains 3 or more direct h2 headings.
```

Avoid hardcoded route-only logic such as:

```text
/updates/*.html only
```

because future users may use:

```text
/blog/
/articles/
insights/
news/
legal-updates/
post/
any custom route
```

## Article Index Module

The Article Index is the first formal Citadel of Kang feature module.

Feature objective:

```text
Generate a navigable article index from long-form article headings while preserving a premium editorial layout.
```

Expected behaviour:

- Auto-generate index from direct `h2` headings.
- Skip pages with fewer than 3 headings.
- Desktop: fixed/sticky left-side index rail.
- Mobile/tablet: index appears below the article hero before the article body.
- Active state follows the latest visible heading.
- Include reading progress indicator.
- Include Back to top link.
- Support dark/light theme states.
- Support explicit opt-in and opt-out attributes.

## Implementation Boundary

Do not rename current live production theme files casually.

A future PowerShell 7-compatible migration patch should perform:

1. Sync latest main.
2. Create final Citadel of Kang folder structure.
3. Move/split theme CSS into modular files.
4. Move/split JS into modular files.
5. Keep `assets/css/style.css` as the active public entry point.
6. Keep `assets/js/script.js` as the active public entry point.
7. Preserve `assets/css/themes/chambers-ak.css` as rollback fallback.
8. Remove temporary/misplaced generic article-index files if present.
9. Remove the noindex article-index preview page after production rollout.
10. Update documentation and changelog.
11. Validate with `node --check`, `git diff --check`, and manual live checks.

## Extraction Plan

After Citadel of Kang is sufficiently stable and rolled out on Chambers of AK, create a fresh standalone repository for the theme.

That future repository should include:

- modular CSS and JS source files;
- theme documentation;
- sample pages;
- usage examples for module activation and disabling;
- branding-token examples;
- changelog/versioning notes;
- license/distribution notes once decided.

That future repository should exclude:

- Chambers of AK legal articles;
- Chambers-specific contact details;
- Chambers-specific social links;
- Google Analytics/GTM/AdSense IDs;
- sitemap/feed files from this site;
- private or law-firm-only implementation details.

## Repository Rule

Commercial, WordPress or distributable packaged versions of Citadel of Kang must be handled in a separate repository and separate chat unless the user expressly instructs otherwise.

This repository remains the Chambers of AK website repository.
