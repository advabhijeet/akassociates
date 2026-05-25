# Citadel of Kang Theme

Last reconciled: 2026-05-26

Citadel of Kang is the modular frontend theme direction that evolved from the Chambers of AK production theme system.

Chambers of AK remains the first real-world implementation and test site. Future Citadel work should treat the current site as the production reference while keeping reusable theme logic separate from Chambers-specific content, routes, analytics IDs, contact values and legal materials.

## Current Status

Current status: production-active inside Chambers of AK.

Production reality:

- Chambers of AK currently runs on the Citadel-derived live theme.
- `assets/css/style.css` is the public CSS entry point.
- `assets/css/themes/citadel-of-ak.css` is the active Chambers implementation theme package.
- `assets/js/script.js` is the public JavaScript entry point.
- Multiple Citadel modules are production-loaded from `assets/js/themes/citadel-of-kang/`.
- Existing production files should not be renamed or split in a rushed patch.
- Future restructuring must be performed through a controlled PowerShell 7-compatible patch after the modular architecture and validation coverage are stable.

Production-active module inventory is maintained in:

```text
docs/maintenance/CITADEL_PRODUCTION_MODULE_INVENTORY.md
```

## Product Boundary

```text
Chambers of AK = production public law-firm website.
Citadel of Kang = frontend theme pack and public module system.
Citadel Manager / Website CMS = separate future admin/content-management product.
Chambers Client Portal = separate future secure client/matter portal.
```

Citadel of Kang may provide public frontend behaviour, CSS, template semantics, article modules, listing modules and UI components. It must not contain admin credentials, repository write tokens, private client/matter data, CMS backend logic or fake frontend-only admin security.

## Repository Role

This repository is the Chambers of AK production website repository. It is also the temporary development and proving ground for Citadel of Kang because Chambers is the first implementation and the required assets already exist here.

Long-term rule:

```text
Develop and validate Citadel modules here first.
Keep Chambers-specific implementation details clearly marked.
Extract reusable Citadel of Kang code into a clean standalone repository only after production behaviour is stable.
```

The future standalone repository should contain the reusable theme package, cleaned documentation, modular CSS/JS files, neutral examples and licensing/distribution notes. It should not carry Chambers legal articles, Chambers contact details, analytics IDs, AdSense IDs, sitemap/feed files, private configuration or law-firm-only implementation details.

## Naming

Standalone theme name:

```text
Citadel of Kang
```

Current Chambers implementation may continue to use existing file names temporarily until a controlled migration patch is approved.

Recommended future namespace:

```text
citadel-of-kang
citadel-kang
CitadelKang
```

Recommended module cache key pattern:

```text
citadel-kang-core-1
citadel-kang-global-shell-1
citadel-kang-article-index-1
citadel-kang-article-footer-1
citadel-kang-blog-page-1
```

## Design Principles

Citadel of Kang must be:

1. Modular.
2. Reusable.
3. Brand-adaptable.
4. Route-agnostic where practical.
5. Safe to disable module-by-module.
6. Suitable for static websites first.
7. Capable of later packaging as a standalone theme in a separate repository.
8. Clear about what is reusable Citadel code and what is Chambers implementation code.

## Chambers of AK Relationship

Chambers of AK is the first implementation of Citadel of Kang.

This means:

- Chambers provides the first real production constraints.
- Chambers-specific content, legal disclaimers, social links, analytics IDs, public contact values and branding assets must stay separate from reusable theme logic where practical.
- The reusable theme should not depend on `chambersofak.in`, law-firm-only language, Google Tag Manager IDs, EmailJS values, or any one article route.
- Chambers may use implementation-specific modules or values, but those must be documented before standalone extraction.
- The current repository remains the Chambers public website after any later Citadel extraction.

## Current Production Architecture

Current public CSS entry point:

```text
assets/css/style.css
```

Current active Chambers implementation theme:

```text
assets/css/themes/citadel-of-ak.css
```

Current Citadel module CSS imported by `style.css`:

```text
assets/css/themes/citadel-of-kang/modules/article-index.css
assets/css/themes/citadel-of-kang/modules/pills.css
```

Current public JavaScript entry point:

```text
assets/js/script.js
```

Current production-loaded module families include:

```text
global shell / navigation / topbar / drawer / footer social
theme controller and theme toggle wiring
article index
article footer
insights registry and card helper
latest insights section
insights directory section
blog / legal insights page controller
contact page template
enquiry page template
enquiry/form behaviour
general content page template
homepage template
practice / services page template
```

## Current Folder Structure

Current production-relevant structure:

```text
assets/
├─ css/
│  ├─ style.css
│  └─ themes/
│     ├─ chambers-ak.css
│     ├─ citadel-of-ak.css
│     └─ citadel-of-kang/
│        └─ modules/
│           ├─ article-index.css
│           └─ pills.css
└─ js/
   ├─ script.js
   └─ themes/
      └─ citadel-of-kang/
         ├─ article-index-direct-rail.js
         ├─ article-footer.js
         └─ modules/
            ├─ blog/
            ├─ forms/
            ├─ pages/
            ├─ sections/
            └─ shell/
```

Future modular structure may still become:

```text
assets/
├─ css/
│  └─ themes/
│     └─ citadel-of-kang/
│        ├─ core.css
│        ├─ tokens.css
│        ├─ layout.css
│        ├─ navigation.css
│        ├─ footer.css
│        ├─ pages.css
│        ├─ components.css
│        └─ modules/
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

But the future structure must not be forced onto the live site until the production module inventory, contracts and validation commands are reconciled.

## Module Categories

Core/theme modules:

```text
tokens
base reset
layout grid
navigation / global shell
footer
typography
buttons
cards
forms
legal/content pages
```

Production feature modules:

```text
article index
article footer
insights registry/cards
latest insights section
insights directory section
blog page/filtering/pagination
contact/enquiry templates
theme toggle
reveal behaviour
conversion tracking hooks
```

Future / not-yet-separated modules:

```text
reading time
reading progress as standalone module
social bar as standalone module
theme toggle as standalone module
seo/schema helpers
related content as standalone module
```

## Module Activation Rules

Modules should prefer markup/data attributes over hardcoded route-only activation.

Preferred activation examples:

```html
<main data-citadel-home-page>
<main data-citadel-blog-page>
<article class="article-body" data-citadel-article-index>
```

Disable example:

```html
<body data-citadel-article-index="false">
```

Safe fallback activation is allowed where the code can no-op safely, for example:

```text
Run Article Index on article.article-body only when 3 or more direct h2 headings exist.
Run a page-template module only when expected page markup exists.
Run a listing module only when the registry and target grid both exist.
```

## Implementation Boundary

Do not rename current live production theme files casually.

A future controlled migration patch should perform:

1. Sync latest main.
2. Confirm the active module inventory.
3. Create final Citadel folder structure if required.
4. Move/split CSS and JS only after module contracts are reconciled.
5. Keep `assets/css/style.css` as the active public CSS entry point.
6. Keep `assets/js/script.js` as the active public JS entry point until a reviewed loader replacement exists.
7. Preserve `assets/css/themes/chambers-ak.css` as rollback fallback.
8. Mark or extract Chambers-specific implementation values before standalone distribution.
9. Update documentation and changelog.
10. Validate with Node syntax checks, `git diff --check`, and manual browser checks.

## Extraction Plan

After Citadel of Kang is sufficiently stable and rolled out on Chambers of AK, create a fresh standalone repository for the reusable theme.

That future repository should include:

- modular CSS and JS source files;
- theme documentation;
- sample pages;
- module activation examples;
- disable/no-op examples;
- branding-token examples;
- changelog/versioning notes;
- license/distribution notes once decided.

That future repository should exclude:

- Chambers of AK legal articles;
- Chambers-specific contact details;
- Chambers-specific social links;
- Google Analytics, GTM, AdSense or EmailJS IDs;
- sitemap/feed files from this site;
- private or law-firm-only implementation details.

## Repository Rule

Commercial, WordPress or distributable packaged versions of Citadel of Kang must be handled in a separate repository and separate implementation thread unless expressly instructed otherwise.

This repository remains the Chambers of AK website repository.