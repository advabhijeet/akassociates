# Citadel Enquiry Page Template

Last reconciled: 2026-05-26

## Summary

- Module ID: `enquiry-page`
- Module Name: `Citadel Enquiry Page Template`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation content`
- Chambers Cache Key: `enquiry-page-v1`

## Purpose

The Citadel Enquiry Page Template defines reusable enquiry-guide page semantics for Citadel-powered websites.

The template is responsible for page-level enquiry structure, matter-template sections, checklist sections, urgency sections and contact-routing sections.

It does not own copy-to-clipboard behaviour.

Copy-to-clipboard and structured form behaviour belongs to:

```text
assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
```

## Current Production Files

```text
JS: assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js
Loader: assets/js/script.js
Related form/copy module: assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-enquiry-page-v1
```

## Current Implementation

`case-enquiry.html` is the first Chambers of AK implementation of this Citadel Enquiry Page Template.

The page currently keeps Chambers-specific legal matter examples in HTML. The module marks reusable structure so future data migration can happen without changing the public layout.

## Activation

Current production activation checks:

```text
[data-citadel-enquiry-page]
.enquiry-template-section
[data-copy-target]
/case-enquiry.html path
/case-enquiry path
```

The module no-ops when:

```text
window.CitadelEnquiryPage already exists
no enquiry-page signals exist
expected optional sections are missing
```

## Current Scope

The module currently:

```text
1. Detects Citadel enquiry pages through data hooks, copy-template sections, copy-target buttons or case-enquiry page path.
2. Marks enquiry page sections with reusable enquiry-section hooks.
3. Marks matter-specific copy-template cards with reusable enquiry-template-card hooks.
4. Marks copy buttons with enquiry-copy-action hooks.
5. Marks contact, urgency and document/checklist sections.
6. Preserves existing visual layout, mobile layout, dark mode and light mode.
```

## Separation Rule

```text
Enquiry Page Template = page structure, reusable enquiry-guide semantics and matter-template grouping.
Enquiry/Form Module = copy-to-clipboard templates, structured form behaviour, consent gating, prepared messages, WhatsApp, Gmail and EmailJS send behaviour.
Contact Page Template = contact-method grouping and structured contact-page semantics.
Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.
```

## Public Page Hooks

Expected hooks:

```text
data-citadel-enquiry-page
data-enquiry-section
data-enquiry-section-name
data-enquiry-template-section
data-enquiry-template-card
data-enquiry-template-type
data-enquiry-copy-action
data-enquiry-contact-section
data-enquiry-document-section
data-enquiry-urgency-section
```

## Chambers-Specific Implementation Values

The current `case-enquiry.html` contains Chambers-specific matter examples and enquiry-route language, including practice areas, document prompts, urgency notes and contact routing.

These are acceptable in this repository. Before standalone Citadel extraction, this content should move to an implementation data file or neutral demo content.

## Future Data Migration

Chambers-specific enquiry template content may later move into:

```text
assets/data/enquiry-templates.json
assets/data/practice-areas.json
assets/data/services.json
```

Potential data groups:

```text
cheque bounce enquiry template
MSME recovery enquiry template
RERA / builder dispute enquiry template
arbitration enquiry template
commercial recovery enquiry template
property / civil suit enquiry template
urgency definitions
document checklist groups
contact-routing options
```

## Accessibility Notes

Manual accessibility checks:

```text
Copy-template buttons are real buttons.
Copy-template buttons have understandable text.
Matter-template cards remain readable on mobile.
Contact links remain keyboard reachable.
Focus states remain visible in light and dark mode.
```

## Validation

Run:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js
node --check assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
node tools/validate-insights-registry.js --strict
git diff --check
```

Browser-check:

```text
case-enquiry.html loads
copy-template buttons work
contact options work
no console errors
desktop layout works
mobile layout works
light mode works
dark mode works
```

## Phase 1 Boundary

During Phase 1, this document records production reality only. Do not change enquiry-page visual behaviour, copy-template behaviour, contact routes, SEO metadata or public legal copy unless a later roadmap phase expressly authorizes that change.
