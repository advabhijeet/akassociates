# Citadel General Content Page Template

Last updated: 2026-05-17

The Citadel General Content Page Template defines reusable page semantics for static content, policy, FAQ, process, courts and checklist-style pages.

## Purpose

The General Content Page Template is responsible for page-level static-content structure.

It does not own:

- blog listing behaviour;
- article reading behaviour;
- contact form behaviour;
- enquiry template copy behaviour;
- shell/header/footer behaviour.

## Current Module

assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js

## Current Implementation

The first Chambers of AK pages covered by this template are:

- faq.html
- process.html
- courts.html
- document-checklists.html
- disclaimer.html
- privacy-policy.html
- terms.html

## Current Scope

- Detect general content pages through data hooks, known page paths or standard page-hero/content-panel/info-grid structure.
- Avoid special templates such as Blog, Contact, Enquiry and Article pages.
- Mark page hero, sections, content panels, info grids and cards with reusable data hooks.
- Mark policy, FAQ, process, checklist and forum/court sections where applicable.
- Preserve existing visual layout, mobile layout, dark mode and light mode.

## Separation Rule

General Content Page Template = static page structure and reusable content semantics.

Blog Page Template = listing, filtering, search, View All and pagination.

Article modules = article index, reading progress, article footer and related reads.

Contact Page Template = contact method grouping and contact-page semantics.

Enquiry Page Template = enquiry-guide structure and copy-template grouping.

Enquiry/Form Module = copy-to-clipboard, prepared-message generation, WhatsApp/Gmail compose and EmailJS send behaviour.

Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.

## Public Page Hooks

Expected hooks after v1:

- data-citadel-general-page
- data-general-hero
- data-general-section
- data-general-section-name
- data-general-content-section
- data-general-grid-section
- data-general-faq-section
- data-general-policy-section
- data-general-process-section
- data-general-checklist-section
- data-general-forum-section
- data-general-card-grid
- data-general-card
- data-general-content-panel

## Future Data Migration

Future data registries may include:

assets/data/faqs.json
assets/data/policies.json
assets/data/process-steps.json
assets/data/document-checklists.json
assets/data/courts.json

Do not move content into data files until the static template hooks are stable.

## Validation

Run:

node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js
node tools/validate-insights-registry.js --strict
git diff --check

Browser-check:

- faq.html loads
- process.html loads
- courts.html loads
- document-checklists.html loads
- disclaimer.html loads
- privacy-policy.html loads
- terms.html loads
- no console errors
- desktop layout works
- mobile layout works
- light mode works
- dark mode works
