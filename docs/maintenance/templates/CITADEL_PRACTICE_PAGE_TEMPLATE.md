# Citadel Practice / Services Page Template

Last reconciled: 2026-05-26

## Summary

- Module ID: `practice-page`
- Module Name: `Citadel Practice / Services Page Template`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation content`
- Chambers Cache Key: `practice-page-v1`

## Purpose

The Citadel Practice / Services Page Template defines reusable page semantics for practice hubs, practice detail pages and high-intent service landing pages.

This template marks and normalizes reusable structure for:

```text
practice hub pages
practice detail pages
service landing pages
priority practice cards
related insight blocks
document/checklist blocks
location/forum priority blocks
enquiry and contact CTA sections
```

It does not own:

```text
global shell behaviour
article rendering
blog listing behaviour
enquiry form behaviour
contact form behaviour
substantive legal content or SEO strategy
```

## Current Production Files

```text
JS: assets/js/themes/citadel-of-kang/modules/pages/practice-page.js
Loader: assets/js/script.js
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-practice-page-v1
```

## Current Implementation

The first implementation covers:

```text
practice.html
pages under practice/
pages under services/
```

## Activation

Current production activation checks:

```text
[data-citadel-practice-page]
[data-citadel-service-page]
[data-citadel-practice-detail-page]
/practice.html path
/practice path
/services/*.html paths
/practice/*.html paths
```

The module no-ops when:

```text
window.CitadelPracticePage already exists
no practice/service signals exist
expected optional sections are missing
```

## Current Five-Pillar Practice Taxonomy

```text
1. MSME Recovery
2. Arbitration
3. Commercial / Consumer Recovery
4. RERA / Property
5. Cheque Bounce
```

Do not reintroduce broad all-practice positioning into the main practice hub.

## Location Priority

Primary:

```text
Patna High Court
District Courts and forums of Bihar
Bihar-linked statutory/forums where applicable
```

Secondary:

```text
Delhi courts and forums
Supreme Court of India
```

Limited UP/NCR:

```text
Noida
Ghaziabad
Allahabad High Court-linked matters
```

Avoid broad UP positioning unless a page specifically explains the limited Noida/Ghaziabad/Allahabad High Court context.

## Separation Rule

```text
Practice / Services Template = practice-page and service-landing page structure.
General Content Page Template = static content, policy, FAQ, process, courts and checklist pages.
Homepage Template = homepage structure and landing-page semantics.
Enquiry/Form Module = copy-to-clipboard, prepared-message generation, WhatsApp/Gmail compose and EmailJS send behaviour.
Global Shell Module = navbar, drawer, topbar, footer social row, active nav and shell behaviour.
```

## Public Page Hooks

Expected hooks:

```text
data-citadel-practice-page
data-citadel-practice-detail-page
data-citadel-service-page
data-practice-hero
data-practice-section
data-practice-section-name
data-practice-card-section
data-practice-location-section
data-practice-document-section
data-practice-faq-section
data-practice-related-section
data-practice-cta-section
data-practice-card-grid
data-practice-card
data-practice-card-name
data-practice-priority
data-practice-info-grid
data-practice-info-card
data-practice-content-panel
```

## Chambers-Specific Implementation Values

The current practice and service pages contain Chambers-specific practice taxonomy, jurisdiction signals, service-page consolidation rules, legal-disclaimer posture and internal-linking strategy. These are implementation content, not reusable Citadel core.

Before standalone Citadel extraction, use neutral demo content and keep Chambers legal/practice strategy out of the reusable package.

## Future Data Migration

Future registries may include:

```text
assets/data/practice-areas.json
assets/data/service-pages.json
assets/data/location-priority.json
assets/data/practice-insight-links.json
```

Do not move content into data files until the current static hooks are stable.

## Service Page Taxonomy Cleanup v1

Broad or non-priority service pages should not be promoted as active SEO pages.

Retired/noindexed page groups:

```text
broad civil litigation pages
broad property-only pages
Gurugram RERA page
broad Bihar-UP-Delhi-NCR RERA wording
standalone property/civil-suits practice page
```

These pages may remain available for continuity, but should point users and crawlers toward the current five-pillar taxonomy:

```text
1. MSME Recovery
2. Arbitration
3. Commercial / Consumer Recovery
4. RERA / Property
5. Cheque Bounce
```

## MSME Recovery Hub v1

`practice/msme-disputes.html` is the current MSME Recovery Hub. Do not create a second competing MSME hub URL unless the site architecture is intentionally changed.

The hub should remain Patna/Bihar-first, with related links to MSME service pages, arbitration overlap articles, MSEFC process resources and the structured case enquiry page.

## Arbitration Hub v1

`practice/arbitration.html` is the current Arbitration Hub. Do not create a second competing arbitration hub URL unless the site architecture is intentionally changed.

The hub should remain Patna/Bihar-first, with related links to arbitration service pages, Section 21/Section 34 resources, MSME-arbitration overlap content and the structured case enquiry page.

## Practice Hub Related Articles Block v1

The Practice page should maintain a related-articles block grouped by the five active practice pillars:

```text
1. MSME Recovery
2. Arbitration
3. Commercial / Consumer Recovery
4. RERA / Property
5. Cheque Bounce
```

Each group should link to the strongest supporting articles and should avoid broad/non-priority practice signals.

## Accessibility Notes

Manual accessibility checks:

```text
Practice/service links remain normal anchors.
CTA links are keyboard reachable.
Practice cards remain readable on mobile.
FAQ blocks retain logical heading order.
Dark/light contrast remains acceptable.
No retired/noindex notice is visually misleading to users.
```

## Validation

Run:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/pages/practice-page.js
node tools/validate-insights-registry.js --strict
git diff --check
```

Browser-check:

```text
practice.html loads
practice cards stay in the five-pillar order
service pages under /services load
practice detail pages under /practice load
no console errors
desktop layout works
mobile layout works
light mode works
dark mode works
```

## Phase 1 Boundary

During Phase 1, this document records production reality only. Do not change practice/service page layout, service-page canonicals, sitemap, SEO metadata, taxonomy, CTA copy or public page content unless a later roadmap phase expressly authorizes that change.
