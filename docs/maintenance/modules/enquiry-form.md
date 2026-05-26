# Module Contract: Citadel Enquiry/Form

Last reconciled: 2026-05-26

## Summary

- Module ID: `enquiry-form`
- Module Name: `Citadel Enquiry/Form`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation values`
- Chambers Cache Key: `enquiry-form-v1`

## Purpose

The Citadel Enquiry/Form module owns copy-to-clipboard enquiry templates and structured contact/case enquiry form behaviour.

It keeps form and copy logic out of the global script while supporting the Contact Page Template and Enquiry Page Template.

## Current Production Files

```text
JS: assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
Loader: assets/js/script.js
Related pages: contact.html, case-enquiry.html
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-enquiry-form-v1
```

## Activation

Current production activation checks:

```text
[data-copy-target]
[data-contact-dynamic-form]
```

The module no-ops when:

```text
window.CitadelEnquiryForm.initialized is already true
no copy targets exist
no dynamic contact form exists
required optional form controls are missing
```

## Current Responsibilities

The module currently owns:

```text
case enquiry copy-to-clipboard templates
fallback copy behaviour for older browsers
structured contact enquiry form matter switching
matter-specific field visibility
generated enquiry summary text
WhatsApp compose link generation
Gmail compose link generation
copy prepared message behaviour
consent gate for direct send
direct EmailJS send path
EmailJS loading/error/success status messages
```

## Current Chambers-Specific Implementation Values

This module currently contains Chambers-specific public implementation values:

```text
EmailJS public key
EmailJS service ID
EmailJS template ID
Chambers WhatsApp number
Chambers Gmail recipient address
Chambers matter labels and field labels
Chambers enquiry acknowledgement text
```

These values are acceptable in the Chambers of AK website repository.

They must not be treated as reusable Citadel core. Before standalone Citadel extraction, they should move into a public-safe implementation config or adapter.

## Product Boundary

This is a public frontend module for the Chambers website implementation.

It belongs to:

```text
Citadel of Kang theme/module layer
Chambers of AK public website implementation
```

It does not belong to:

```text
Citadel Manager / Website CMS backend
Client Portal
private admin system
```

It must not contain:

```text
private EmailJS keys
repository write tokens
admin credentials
client/matter records
private case data
backend authorization logic
```

## Relationship To Page Templates

```text
Contact Page Template = contact page structure and reusable contact semantics.
Enquiry Page Template = case-enquiry guide structure and matter-template grouping.
Enquiry/Form Module = copy-to-clipboard, generated messages, consent gate, WhatsApp/Gmail compose and EmailJS direct send behaviour.
Global Shell Module = navigation, drawer, topbar, footer social row and shell behaviour.
```

## Future Data Migration

Potential future public-safe config/data files:

```text
assets/data/contact.json
assets/data/enquiry-templates.json
assets/data/practice-areas.json
assets/config/chambers-public.config.json
```

Candidate fields to externalize:

```text
recipient email
WhatsApp number
EmailJS public configuration
matter labels
field labels
generated-message heading text
enquiry acknowledgement text
compose URL subjects
```

Do not move these values until the current form behaviour and validation coverage are stable.

## Accessibility Notes

Manual accessibility checks:

```text
copy buttons are real buttons
form fields have labels
matter switching does not hide required visible fields unexpectedly
consent text remains readable
status messages are visible and understandable
prepared message textarea receives focus after generation
keyboard users can reach generate, copy, WhatsApp, Gmail and send controls
focus states remain visible in light and dark mode
```

## Privacy / Security Notes

The module sends form data through EmailJS only when the visitor uses the direct send option after acknowledging the consent/notice flow.

The module also prepares WhatsApp, Gmail and copy routes for user-controlled transmission.

Do not add silent background submission, hidden analytics payloads containing form message text, or private key exposure.

## Validation

Run:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
git diff --check
```

Browser-check:

```text
case-enquiry.html copy-template buttons work
contact.html matter-type switching works
consent gate works
generated enquiry summary appears
copy prepared message works
WhatsApp compose link updates
Gmail compose link updates
EmailJS unavailable state is clear
EmailJS direct send path reports success/error state
no console errors, except intentional logged EmailJS failures during failed send tests
```

## Standalone Extraction Notes

Before moving to a standalone Citadel of Kang repository, confirm:

```text
Chambers contact values are config-driven or removed
EmailJS is optional and adapter-based
neutral demo form content exists
matter labels are configurable
no Chambers legal/practice language is bundled into reusable core
no private keys or write credentials are present
```

## Phase 1 Boundary

During Phase 1, this document records production reality only. Do not change form behaviour, EmailJS values, contact routes, message templates, consent wording or public legal copy unless a later roadmap phase expressly authorizes that change.
