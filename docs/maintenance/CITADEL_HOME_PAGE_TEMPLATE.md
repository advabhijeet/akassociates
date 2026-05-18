# Citadel Homepage Template

Last updated: 2026-05-18

The Citadel Homepage Template defines reusable homepage and landing-page semantics for Citadel-powered websites.

## Purpose

The Homepage Template is responsible for page-level homepage structure, hero semantics, homepage trust meta, practice priority cards, forum/location summary, latest insights host and case-enquiry call-to-action sections.

It does not own:

- global shell behaviour;
- blog listing behaviour;
- article rendering;
- enquiry form behaviour;
- contact form behaviour;
- SEO content strategy.

## Current Module

assets/js/themes/citadel-of-kang/modules/pages/home-page.js

## Current Implementation

index.html is the first Chambers of AK implementation of this Citadel Homepage Template.

The homepage currently reflects the Chambers of AK five-pillar practice strategy:

1. MSME Recovery
2. Arbitration
3. Commercial / Consumer Recovery
4. RERA / Property
5. Cheque Bounce

The primary location signal is Patna High Court, District Courts and forums of Bihar, with selected Delhi, Supreme Court, Noida/Ghaziabad and Allahabad High Court-linked matters.

## Current Scope

- Detect homepage through data hooks, root/index path or existing home structure.
- Mark homepage sections with reusable homepage hooks.
- Mark hero, about, practice, forum, insights and CTA sections.
- Mark homepage trust-meta items.
- Mark homepage practice cards with priority numbers and practice names.
- Mark homepage insights grid.
- Preserve existing visual layout, mobile layout, dark mode and light mode.

## Separation Rule

Homepage Template = homepage structure and reusable landing-page semantics.

Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.

Blog Page Template = listing, filtering, search, View All and pagination.

Latest Insights Section = homepage latest-insights rendering and de-duplication.

General Content Page Template = static content, policy, FAQ, process, courts and checklist page semantics.

Enquiry/Form Module = copy-to-clipboard, prepared-message generation, WhatsApp/Gmail compose and EmailJS send behaviour.

## Public Page Hooks

Expected hooks after v1:

- data-citadel-home-page
- data-home-section
- data-home-section-name
- data-home-hero
- data-home-hero-section
- data-home-about-section
- data-home-practice-section
- data-home-forum-section
- data-home-insights-section
- data-home-cta-section
- data-home-trust-item
- data-home-trust-item-name
- data-home-practice-card
- data-home-practice-priority
- data-home-practice-name
- data-home-insights-grid

## Future Expansion

Potential future homepage sections:

- How We Work
- Matter Routes
- Document-First Advantage
- Before You Contact
- Compliance / Non-Solicitation Note

These should be added after the template hooks are stable.

## Validation

Run:

node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/home-page.js
node tools/validate-insights-registry.js --strict
git diff --check

Browser-check:

- homepage loads
- hero layout works
- practice slider works
- latest insights loads without duplicates
- case enquiry CTA works
- no console errors
- desktop layout works
- mobile layout works
- light mode works
- dark mode works
