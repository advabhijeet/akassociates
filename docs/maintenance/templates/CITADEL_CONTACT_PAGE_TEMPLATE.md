# Citadel Contact Page Template

Last reconciled: 2026-05-26

## Summary

- Module ID: `contact-page`
- Module Name: `Citadel Contact Page Template`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation content`
- Chambers Cache Key: `contact-page-v1`

## Purpose

The Citadel Contact Page Template defines reusable contact-page semantics for Citadel-powered websites.

The template is responsible for page-level contact structure, contact-method grouping, communication-policy sections, public profile sections and contact-form host semantics.

It does not own form submission behaviour.

Form behaviour belongs to:

```text
assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
```

## Current Production Files

```text
JS: assets/js/themes/citadel-of-kang/modules/pages/contact-page.js
Loader: assets/js/script.js
Related form module: assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-contact-page-v1
```

## Current Implementation

`contact.html` is the first Chambers of AK implementation of this Citadel Contact Page Template.

The page keeps Chambers-specific contact details, public profile links, communication notes and form copy in HTML. The module marks and normalizes reusable semantics so future data migration can happen without changing the public layout.

## Activation

Current production activation checks:

```text
[data-citadel-contact-page]
.contact-row
#dynamic-enquiry-form
/contact.html path
/contact path
```

The module no-ops when:

```text
window.CitadelContactPage already exists
no contact-page signals exist
expected optional sections are missing
```

## Current Scope

The module currently:

```text
1. Detects Citadel contact pages through data hooks, contact rows, dynamic enquiry forms or contact page path.
2. Marks contact page sections with reusable contact-section hooks.
3. Marks contact method cards with reusable contact-method hooks.
4. Marks the structured form area as a Citadel contact form host.
5. Marks public profile and guidance sections where available.
6. Preserves existing visual layout, mobile layout, dark mode and light mode.
```

## Separation Rule

```text
Contact Page Template = page structure and reusable contact semantics.
Enquiry/Form Module = form fields, consent gating, prepared message, copy, WhatsApp, Gmail and EmailJS send behaviour.
Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.
```

## Public Page Hooks

Expected hooks:

```text
data-citadel-contact-page
data-contact-section
data-contact-methods
data-contact-method
data-citadel-contact-form
data-citadel-contact-form-instance
data-contact-profile-section
data-contact-guidance-section
```

## Chambers-Specific Implementation Values

The current `contact.html` and Enquiry/Form implementation include Chambers-specific public details such as:

```text
phone / WhatsApp routes
email routes
public social/profile links
Google Business/Profile links
communication policy wording
EmailJS public service/template identifiers used by the form module
```

These are acceptable in this repository, but must be externalized or removed before any standalone Citadel extraction.

## Future Data Migration

Chambers-specific contact details may later move into:

```text
assets/data/site-settings.json
assets/data/contact.json
```

Potential data groups:

```text
phone
WhatsApp
email
office location
service areas
public profiles
Google review link
communication policy
confidentiality and no-client-relationship notes
```

## Accessibility Notes

Manual accessibility checks:

```text
Contact cards remain keyboard reachable.
Contact links have understandable labels.
Public profile links are not icon-only without labels.
Form labels remain associated with fields.
Consent gate remains readable.
Dark/light contrast remains acceptable.
```

## Validation

Run:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/contact-page.js
node --check assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
node tools/validate-insights-registry.js --strict
git diff --check
```

Browser-check:

```text
contact.html loads
contact cards work
structured form works
generate/copy works
WhatsApp/Gmail fallback links work
EmailJS unavailable/error state does not break the page
desktop layout works
mobile layout works
light mode works
dark mode works
no console errors
```

## Phase 1 Boundary

During Phase 1, this document records production reality only. Do not change contact-page visual behaviour, form behaviour, contact routes, SEO metadata or public legal copy unless a later roadmap phase expressly authorizes that change.
