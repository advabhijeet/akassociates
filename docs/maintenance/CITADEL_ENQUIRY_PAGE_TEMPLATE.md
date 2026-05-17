# Citadel Enquiry Page Template

Last updated: 2026-05-17

The Citadel Enquiry Page Template defines reusable enquiry-guide page semantics for Citadel-powered websites.

## Purpose

The Enquiry Page Template is responsible for page-level enquiry structure, matter-template sections, checklist sections, urgency sections and contact-routing sections.

It does not own copy-to-clipboard behaviour.

Copy-to-clipboard behaviour remains in:

assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js

## Current Module

assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js

## Current Implementation

case-enquiry.html is the first Chambers of AK implementation of this Citadel Enquiry Page Template.

The page currently keeps Chambers-specific legal matter examples in HTML. The module marks reusable structure so future data migration can happen without changing the public layout.

## Current Scope

- Detect Citadel enquiry pages through data hooks, copy-template sections, copy-target buttons, or case-enquiry page path.
- Mark enquiry page sections with reusable enquiry-section hooks.
- Mark matter-specific copy-template cards with reusable enquiry-template-card hooks.
- Mark copy buttons with enquiry-copy-action hooks.
- Mark contact, urgency and document/checklist sections.
- Preserve existing visual layout, mobile layout, dark mode and light mode.

## Separation Rule

Enquiry Page Template = page structure, reusable enquiry-guide semantics and matter-template grouping.

Enquiry/Form Module = copy-to-clipboard templates, structured form behaviour, consent gating, prepared messages, WhatsApp, Gmail and EmailJS send behaviour.

Contact Page Template = contact-method grouping and structured contact-page semantics.

## Public Page Hooks

Expected hooks after v1:

- data-citadel-enquiry-page
- data-enquiry-section
- data-enquiry-section-name
- data-enquiry-template-section
- data-enquiry-template-card
- data-enquiry-template-type
- data-enquiry-copy-action
- data-enquiry-contact-section
- data-enquiry-document-section
- data-enquiry-urgency-section

## Future Data Migration

Chambers-specific enquiry template content may later move into:

assets/data/enquiry-templates.json
assets/data/practice-areas.json
assets/data/services.json

Potential data groups:

- cheque bounce enquiry template
- MSME recovery enquiry template
- RERA / builder dispute enquiry template
- arbitration enquiry template
- commercial recovery enquiry template
- property / civil suit enquiry template
- urgency definitions
- document checklist groups
- contact-routing options

## Validation

Run:

node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js
node --check assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
node tools/validate-insights-registry.js --strict
git diff --check

Browser-check:

- case-enquiry.html loads
- copy-template buttons work
- contact options work
- no console errors
- desktop layout works
- mobile layout works
- light mode works
- dark mode works
