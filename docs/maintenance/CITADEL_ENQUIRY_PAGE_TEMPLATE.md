# Citadel Enquiry Page Template

Last updated: 2026-05-17

The Citadel Enquiry Page Template defines reusable enquiry-guide page semantics for Citadel-powered websites.

## Purpose

The Enquiry Page Template is responsible for page-level enquiry structure, matter-template sections, checklist sections, urgency sections and contact-routing sections.

Copy-to-clipboard behaviour remains in:

assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js

## Current Module

assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js

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

## Chambers of AK Implementation

case-enquiry.html is the first Chambers of AK implementation of this Citadel Enquiry Page Template.

Chambers-specific legal matter examples remain in page content for now. A future data migration may move matter templates into:

assets/data/enquiry-templates.json
assets/data/practice-areas.json
assets/data/services.json

## Validation

Run:

node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js
node --check assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
node tools/validate-insights-registry.js --strict
git diff --check
