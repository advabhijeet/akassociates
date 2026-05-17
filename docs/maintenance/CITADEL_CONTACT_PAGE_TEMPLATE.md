# Citadel Contact Page Template

Last updated: 2026-05-17

The Citadel Contact Page Template defines reusable contact-page semantics for Citadel-powered websites.

## Purpose

The Contact Page Template is responsible for page-level contact structure, contact-method grouping, communication-policy sections and contact-form host semantics.

It does not own form submission behaviour.

Form behaviour remains in:

assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js

## Current Module

assets/js/themes/citadel-of-kang/modules/pages/contact-page.js

## Current Implementation

contact.html is the first Chambers of AK implementation of this Citadel Contact Page Template.

The page currently keeps Chambers-specific content in HTML. The module marks and normalizes reusable semantics so future data migration can happen without changing the public layout.

## Current Scope

- Detect Citadel contact pages through data hooks, contact rows, dynamic enquiry forms, or contact page path.
- Mark contact page sections with reusable contact-section hooks.
- Mark contact method cards with reusable contact-method hooks.
- Mark the structured form area as a Citadel contact form host.
- Mark public profile and guidance sections where available.
- Preserve existing visual layout, mobile layout, dark mode and light mode.

## Separation Rule

Contact Page Template = page structure and reusable contact semantics.

Enquiry/Form Module = form fields, consent gating, prepared message, copy, WhatsApp, Gmail and EmailJS send behaviour.

Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.

## Public Page Hooks

Expected hooks after v1:

- data-citadel-contact-page
- data-contact-section
- data-contact-methods
- data-contact-method
- data-citadel-contact-form
- data-citadel-contact-form-instance
- data-contact-profile-section
- data-contact-guidance-section

## Future Data Migration

Chambers-specific contact details may later move into:

assets/data/site-settings.json
assets/data/contact.json

Potential data groups:

- phone
- WhatsApp
- email
- office location
- service areas
- public profiles
- Google review link
- communication policy
- confidentiality and no-client-relationship notes

## Validation

Run:

node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/contact-page.js
node --check assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
node tools/validate-insights-registry.js --strict
git diff --check

Browser-check:

- contact.html loads
- contact cards work
- structured form works
- generate/copy works
- WhatsApp/Gmail fallback links work
- EmailJS unavailable/error state does not break the page
- desktop layout works
- mobile layout works
- light mode works
- dark mode works
