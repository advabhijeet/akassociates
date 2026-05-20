# Citadel Practice / Services Page Template

Last updated: 2026-05-20

The Citadel Practice / Services Page Template defines reusable page semantics for practice hubs, practice detail pages and high-intent service landing pages.

## Purpose

This template marks and normalizes reusable structure for:

- practice hub pages;
- practice detail pages;
- service landing pages;
- priority practice cards;
- related insight blocks;
- document/checklist blocks;
- location/forum priority blocks;
- enquiry and contact CTA sections.

It does not own:

- global shell behaviour;
- article rendering;
- blog listing behaviour;
- enquiry form behaviour;
- contact form behaviour;
- substantive legal content or SEO strategy.

## Current Module

assets/js/themes/citadel-of-kang/modules/pages/practice-page.js

## Current Implementation

The first implementation covers:

- practice.html
- pages under practice/
- pages under services/

## Current Five-Pillar Practice Taxonomy

1. MSME Recovery
2. Arbitration
3. Commercial / Consumer Recovery
4. RERA / Property
5. Cheque Bounce

Do not reintroduce broad all-practice positioning into the main practice hub.

## Location Priority

Primary:

- Patna High Court
- District Courts and forums of Bihar
- Bihar-linked statutory/forums where applicable

Secondary:

- Delhi courts and forums
- Supreme Court of India

Limited UP/NCR:

- Noida
- Ghaziabad
- Allahabad High Court-linked matters

Avoid broad UP positioning unless a page specifically explains the limited Noida/Ghaziabad/Allahabad High Court context.

## Separation Rule

Practice / Services Template = practice-page and service-landing page structure.

General Content Page Template = static content, policy, FAQ, process, courts and checklist pages.

Homepage Template = homepage structure and landing-page semantics.

Enquiry/Form Module = copy-to-clipboard, prepared-message generation, WhatsApp/Gmail compose and EmailJS send behaviour.

Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.

## Public Page Hooks

Expected hooks after v1:

- data-citadel-practice-page
- data-citadel-practice-detail-page
- data-citadel-service-page
- data-practice-hero
- data-practice-section
- data-practice-section-name
- data-practice-card-section
- data-practice-location-section
- data-practice-document-section
- data-practice-faq-section
- data-practice-related-section
- data-practice-cta-section
- data-practice-card-grid
- data-practice-card
- data-practice-card-name
- data-practice-priority
- data-practice-info-grid
- data-practice-info-card
- data-practice-content-panel

## Future Data Migration

Future registries may include:

assets/data/practice-areas.json
assets/data/service-pages.json
assets/data/location-priority.json
assets/data/practice-insight-links.json

Do not move content into data files until the current static hooks are stable.

## Validation

Run:

node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/practice-page.js
node tools/validate-insights-registry.js --strict
git diff --check

Browser-check:

- practice.html loads
- practice cards stay in the five-pillar order
- service pages under /services load
- practice detail pages under /practice load
- no console errors
- desktop layout works
- mobile layout works
- light mode works
- dark mode works
