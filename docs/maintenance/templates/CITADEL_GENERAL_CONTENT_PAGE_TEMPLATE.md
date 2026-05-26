# Citadel General Content Page Template

Last reconciled: 2026-05-26

## Summary

- Module ID: `general-content-page`
- Module Name: `Citadel General Content Page Template`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation content`
- Chambers Cache Key: `general-content-page-v1`

## Purpose

The Citadel General Content Page Template defines reusable page semantics for static content, policy, FAQ, process, courts and checklist-style pages.

The template is responsible for page-level static-content structure.

It does not own:

```text
blog listing behaviour
article reading behaviour
contact form behaviour
enquiry template copy behaviour
shell/header/footer behaviour
```

## Current Production Files

```text
JS: assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js
Loader: assets/js/script.js
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-general-content-page-v1
```

## Current Implementation

The first Chambers of AK pages covered by this template are:

```text
faq.html
process.html
courts.html
document-checklists.html
disclaimer.html
privacy-policy.html
terms.html
```

## Activation

Current production activation checks:

```text
[data-citadel-general-page]
.page-hero plus .content-panel / .info-grid / .sec structure
/faq path
/process path
/courts path
/document-checklists path
/disclaimer path
/privacy-policy path
/terms path
```

The loader deliberately avoids special pages when any of these are present:

```text
[data-citadel-blog-page]
[data-citadel-contact-page]
[data-citadel-enquiry-page]
[data-citadel-practice-page]
[data-citadel-service-page]
[data-citadel-practice-detail-page]
article.article-body
```

## Current Scope

The module currently:

```text
1. Detects general content pages through data hooks, known page paths or standard page-hero/content-panel/info-grid structure.
2. Avoids special templates such as Blog, Contact, Enquiry, Practice/Services and Article pages.
3. Marks page hero, sections, content panels, info grids and cards with reusable data hooks.
4. Marks policy, FAQ, process, checklist and forum/court sections where applicable.
5. Preserves existing visual layout, mobile layout, dark mode and light mode.
```

## Separation Rule

```text
General Content Page Template = static page structure and reusable content semantics.
Blog Page Template = listing, filtering, search, View All and pagination.
Article modules = article index, reading progress, article footer and related reads.
Contact Page Template = contact method grouping and contact-page semantics.
Enquiry Page Template = enquiry-guide structure and copy-template grouping.
Enquiry/Form Module = copy-to-clipboard, prepared-message generation, WhatsApp/Gmail compose and EmailJS send behaviour.
Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.
```

## Public Page Hooks

Expected hooks:

```text
data-citadel-general-page
data-general-hero
data-general-section
data-general-section-name
data-general-content-section
data-general-grid-section
data-general-faq-section
data-general-policy-section
data-general-process-section
data-general-checklist-section
data-general-forum-section
data-general-card-grid
data-general-card
data-general-content-panel
```

## Chambers-Specific Implementation Values

The current general pages include Chambers-specific legal, policy, communication and forum/court content. These are public website implementation details, not reusable Citadel core content.

Before standalone Citadel extraction, demo content should be neutral and should not bundle Chambers legal-policy text, practice positioning or contact rules.

## Future Data Migration

Future data registries may include:

```text
assets/data/faqs.json
assets/data/policies.json
assets/data/process-steps.json
assets/data/document-checklists.json
assets/data/courts.json
```

Do not move content into data files until the static template hooks are stable.

## Accessibility Notes

Manual accessibility checks:

```text
FAQ and checklist content remains readable without JavaScript-specific interaction.
Policy pages remain plain text readable.
Cards and links remain keyboard reachable.
Heading order remains logical.
Dark/light contrast remains acceptable.
```

## Validation

Run:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js
node tools/validate-insights-registry.js --strict
git diff --check
```

Browser-check:

```text
faq.html loads
process.html loads
courts.html loads
document-checklists.html loads
disclaimer.html loads
privacy-policy.html loads
terms.html loads
no console errors
desktop layout works
mobile layout works
light mode works
dark mode works
```

## Phase 1 Boundary

During Phase 1, this document records production reality only. Do not change static page visual behaviour, legal-policy copy, SEO metadata or public page content unless a later roadmap phase expressly authorizes that change.
