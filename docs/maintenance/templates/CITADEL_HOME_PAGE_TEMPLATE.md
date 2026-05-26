# Citadel Homepage Template

Last reconciled: 2026-05-26

## Summary

- Module ID: `home-page`
- Module Name: `Citadel Homepage Template`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation content`
- Chambers Cache Key: `home-page-v1`

## Purpose

The Citadel Homepage Template defines reusable homepage and landing-page semantics for Citadel-powered websites.

The template is responsible for page-level homepage structure, hero semantics, homepage trust meta, practice priority cards, forum/location summary, latest insights host and case-enquiry call-to-action sections.

It does not own:

```text
global shell behaviour
blog listing behaviour
article rendering
enquiry form behaviour
contact form behaviour
SEO content strategy
```

## Current Production Files

```text
JS: assets/js/themes/citadel-of-kang/modules/pages/home-page.js
Loader: assets/js/script.js
Related latest-insights module: assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-home-page-v1
```

## Current Implementation

`index.html` is the first Chambers of AK implementation of this Citadel Homepage Template.

The homepage currently reflects the Chambers of AK five-pillar practice strategy:

```text
1. MSME Recovery
2. Arbitration
3. Commercial / Consumer Recovery
4. RERA / Property
5. Cheque Bounce
```

The primary location signal is Patna High Court, District Courts and forums of Bihar, with selected Delhi, Supreme Court, Noida/Ghaziabad and Allahabad High Court-linked matters.

## Activation

Current production activation checks:

```text
[data-citadel-home-page]
/ path
/index.html path
```

The module no-ops when:

```text
window.CitadelHomePage already exists
no homepage signals exist
expected optional sections are missing
```

## Current Scope

The module currently:

```text
1. Detects homepage through data hooks, root/index path or existing home structure.
2. Marks homepage sections with reusable homepage hooks.
3. Marks hero, about, practice, forum, insights and CTA sections.
4. Marks homepage trust-meta items.
5. Marks homepage practice cards with priority numbers and practice names.
6. Marks homepage insights grid.
7. Preserves existing visual layout, mobile layout, dark mode and light mode.
```

## Separation Rule

```text
Homepage Template = homepage structure and reusable landing-page semantics.
Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.
Blog Page Template = listing, filtering, search, View All and pagination.
Latest Insights Section = homepage latest-insights rendering and de-duplication.
General Content Page Template = static content, policy, FAQ, process, courts and checklist page semantics.
Enquiry/Form Module = copy-to-clipboard, prepared-message generation, WhatsApp/Gmail compose and EmailJS send behaviour.
```

## Public Page Hooks

Expected hooks:

```text
data-citadel-home-page
data-home-section
data-home-section-name
data-home-hero
data-home-hero-section
data-home-about-section
data-home-practice-section
data-home-forum-section
data-home-insights-section
data-home-cta-section
data-home-trust-item
data-home-trust-item-name
data-home-practice-card
data-home-practice-priority
data-home-practice-name
data-home-insights-grid
```

## Chambers-Specific Implementation Values

The current homepage contains Chambers-specific brand, practice, jurisdiction, non-solicitation and public-contact positioning. These are implementation content, not reusable Citadel core.

Before standalone Citadel extraction, use neutral demo content and keep Chambers-specific legal/practice language out of the reusable package.

## Future Expansion

Potential future homepage sections:

```text
Testimonials or representative non-confidential experience, only if compliant and appropriate.
Practice-specific route summaries once service-page cleanup is complete.
A stronger document-checklist preview if it improves enquiry quality.
```

The original expansion set was added in Homepage Content Expansion v1.

## Homepage Content Expansion v1

Added after the initial template module:

```text
How We Work
Matter Routes
Document-First Advantage
Before You Contact
Compliance / Non-Solicitation Note
Priority-aligned Latest Legal Insights fallback cards
```

These sections preserve the five-pillar strategy:

```text
1. MSME Recovery
2. Arbitration
3. Commercial / Consumer Recovery
4. RERA / Property
5. Cheque Bounce
```

## Accessibility Notes

Manual accessibility checks:

```text
Hero CTAs are keyboard reachable.
Practice cards remain readable and focusable.
Latest insights links are normal anchors.
Heading order remains logical.
Dark/light contrast remains acceptable.
Mobile stacking does not hide content.
```

## Validation

Run:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/home-page.js
node --check assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js
node tools/validate-insights-registry.js --strict
git diff --check
```

Browser-check:

```text
homepage loads
hero layout works
practice slider works
latest insights loads without duplicates
case enquiry CTA works
no console errors
desktop layout works
mobile layout works
light mode works
dark mode works
```

## Phase 1 Boundary

During Phase 1, this document records production reality only. Do not change homepage layout, practice positioning, SEO metadata, article cards, CTA copy or public page content unless a later roadmap phase expressly authorizes that change.
