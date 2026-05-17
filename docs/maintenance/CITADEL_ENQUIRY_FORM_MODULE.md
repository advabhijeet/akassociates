# Citadel Enquiry/Form Module

Last updated: 2026-05-17

## Purpose

`assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js` is the Citadel-level form behaviour module for copyable enquiry templates and structured contact/case enquiry forms.

It keeps form-specific behaviour out of `assets/js/script.js`, which should remain a loader and shared bootstrap file.

## Current responsibilities

```text
- Copy-to-clipboard buttons using `data-copy-target`.
- Structured contact/case enquiry form discovery via `data-contact-dynamic-form`.
- Matter-type conditional fields using `data-matter-type` and `data-matter-fields`.
- Prepared enquiry message generation.
- WhatsApp compose link generation.
- Gmail compose link generation.
- EmailJS direct-send integration where the SDK is available.
- Consent-gated generate/send controls.
- Status messages for pending/success/error states.
```

## Loader

The global script only loads this module when at least one of these hooks exists:

```text
[data-copy-target]
[data-contact-dynamic-form]
```

## Site-specific labels

The current message text and EmailJS configuration are Chambers of AK specific. Future Citadel template work should move these into a data/config layer, likely:

```text
assets/data/site-settings.json
assets/data/enquiry-form.json
```

## Compatibility requirements

Every future change must be checked on:

```text
- desktop layout;
- mobile layout;
- light mode;
- dark mode;
- keyboard/focus behaviour;
- clipboard fallback;
- WhatsApp/Gmail fallback links;
- EmailJS unavailable/error state.
```
