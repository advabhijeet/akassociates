# Citadel Contact Page Template

Last updated: 2026-05-17

The Citadel Contact Page Template defines reusable contact-page semantics for Citadel-powered websites.

## Purpose

The Contact Page Template is responsible for page-level contact structure, not form submission logic.

Form behaviour remains in:

assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js

## Current Module

assets/js/themes/citadel-of-kang/modules/pages/contact-page.js

## Current Scope

- Detect Citadel contact pages through data hooks, contact rows, dynamic enquiry forms, or contact page path.
- Mark contact page sections with reusable contact-section hooks.
- Mark contact method cards with reusable contact-method hooks.
- Mark the structured form area as a Citadel contact form host.
- Preserve existing visual layout, mobile layout, dark mode and light mode.

## Separation Rule

Contact Page Template = page structure and reusable contact semantics.
Enquiry/Form Module = form fields, consent gating, prepared message, copy, WhatsApp, Gmail and EmailJS send behaviour.

## Chambers of AK Implementation

contact.html is the first Chambers of AK implementation of this Citadel Contact Page Template.

Chambers-specific contact details remain in page content for now. A future data migration may move these details into:

assets/data/site-settings.json
assets/data/contact.json

## Validation

Run:

node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/contact-page.js
node --check assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
node tools/validate-insights-registry.js --strict
git diff --check
