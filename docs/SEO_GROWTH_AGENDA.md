# SEO Growth Agenda

This document records the next website agenda for improving Google Search visibility for Chambers of AK. It is intended for Codex, ChatGPT, and future maintainers.

## Purpose

Increase search visibility for high-intent legal queries while preserving the professional, informational, non-solicitation positioning required for an advocate website in India.

The agenda should be reviewed and updated after each meaningful website change.

## Current SEO Foundation

The website already has a strong base:

- Static HTML pages hosted through GitHub Pages.
- Custom domain: `https://chambersofak.in`.
- Core pages at the root level.
- Practice pages under `practice/`.
- High-intent landing pages under `services/`.
- Legal update articles under `updates/`.
- SEO metadata, canonical URLs, Open Graph metadata, Twitter card metadata, and JSON-LD structured data.
- `robots.txt` allowing crawl access and pointing to `sitemap.xml`.
- `sitemap.xml` listing current public pages.
- Google Tag Manager installed with lead-event tracking support.
- GA4 intended to be controlled through GTM to avoid duplicate page views.
- Homepage now has a refreshed Latest Legal Insights section that can pull cards from `legal-updates.html`.
- Homepage Practice Areas now use a mobile-friendly horizontal slider with a `View More` link to `practice.html`.
- Mobile menu drawer now locks background page scrolling while open.

## Core Search Focus

Primary visibility clusters:

- Cheque bounce / Section 138 NI Act matters.
- MSME delayed-payment and recovery matters.
- RERA and builder-buyer disputes.
- Commercial recovery and business dues.
- Arbitration notices, claims, challenges, and enforcement.
- Property and civil litigation.

Primary geography clusters:

- Patna.
- Bihar.
- Uttar Pradesh.
- Delhi NCR.
- Noida.
- Gurugram.

## Main Opportunities

1. Add more city + practice landing pages under `services/`.
2. Expand informational legal-update clusters under `updates/`.
3. Strengthen practice pages with richer evergreen content.
4. Convert `case-enquiry.html` into a stronger conversion and structured enquiry hub.
5. Expand `courts.html` as a stronger local/entity page.
6. Improve internal linking between homepage, practice pages, service pages, legal updates, document checklists, and enquiry page.
7. Continue disciplined sitemap, metadata, JSON-LD, legal-page, and tracking review after each meaningful change.

## Phase 1 - Technical SEO Cleanup

Status: Substantially Complete

Tasks:

- [x] Fix homepage `Property & Civil Suits` card link so it points to `practice/property-civil-suits.html`.
- [ ] Check existing pages for unique titles and meta descriptions.
- [ ] Check canonical URLs.
- [x] Check JSON-LD validity.
- [ ] Check footer legal links.
- [x] Check broken internal links.
- [x] Check CSS/JS cache-busting versions.
- [x] Check mobile drawer and navigation behavior.
- [x] Run `node --check assets\js\script.js` where possible.
- [x] Run `git diff --check` where possible.
- [x] Fix responsive topbar behavior: desktop topbar visible, mobile topbar removed.
- [x] Fix mobile drawer/footer social icon rendering.
- [x] Fix homepage practice slider mobile layout.
- [x] Lock background page scroll when mobile drawer is open.

## Phase 2 - New High-Intent Service Landing Pages

Status: In Progress

Create service pages that are not thin duplicates. Each page should include local intent, forum/jurisdiction notes, document checklist, procedural overview, limitation/date issues, FAQ schema where useful, and links to the relevant practice page, update article, document checklist, and enquiry page.

Priority service pages:

- [x] `services/cheque-bounce-lawyer-bihar.html`
- [ ] `services/cheque-bounce-lawyer-delhi-ncr.html`
- [x] `services/msme-recovery-lawyer-patna.html`
- [x] `services/msme-recovery-lawyer-delhi-ncr.html`
- [x] `services/rera-lawyer-patna.html`
- [x] `services/rera-lawyer-noida.html`
- [ ] `services/rera-lawyer-gurugram.html`
- [x] `services/commercial-recovery-lawyer-bihar.html`
- [x] `services/property-dispute-lawyer-bihar.html`
- [x] `services/property-dispute-lawyer-patna.html`
- [x] `services/civil-litigation-lawyer-bihar.html`
- [x] `services/civil-litigation-lawyer-patna.html`

Suggested Batch 2 starting order:

1. [x] `services/cheque-bounce-lawyer-bihar.html`
2. [x] `services/property-dispute-lawyer-bihar.html`
3. [x] `services/civil-litigation-lawyer-bihar.html`
4. [x] `services/msme-recovery-lawyer-delhi-ncr.html`
5. [x] `services/rera-lawyer-noida.html`

## Phase 3 - Legal Update Content Clusters

Status: In Progress

Each update should internally link to one relevant `practice/` page, one relevant `services/` page, `case-enquiry.html`, `document-checklists.html`, and at least one related article.

Priority update articles:

- [x] `updates/section-138-cheque-bounce-limitation.html`
- [ ] `updates/cheque-bounce-defence-after-summons.html`
- [x] `updates/msme-45-days-payment-rule.html`
- [ ] `updates/msme-facilitation-council-process.html`
- [x] `updates/rera-delayed-possession-bihar.html`
- [x] `updates/rera-refund-interest-delayed-possession.html`
- [x] `updates/commercial-suit-documents-checklist.html`
- [x] `updates/arbitration-notice-before-claim.html`
- [x] `updates/section-34-arbitration-award-challenge.html`
- [x] `updates/property-injunction-suit-documents.html`

Legacy update audit completed before Batch 2:

- [x] `updates/cheque-bounce-notice-limitation.html`
- [x] `updates/msme-documents-checklist.html`
- [x] `updates/rera-refund-interest-delayed-possession.html`
- [x] `updates/commercial-recovery-before-suit.html`
- [x] `updates/arbitration-clause-checklist.html`

## Phase 4 - Strengthen Practice Pages

Status: Pending

Add or improve these evergreen sections on each practice page:

- [ ] When this matter usually arises.
- [ ] Documents to keep ready.
- [ ] Forum/court route.
- [ ] Limitation/date sensitivity.
- [ ] Common mistakes.
- [ ] Related service pages.
- [ ] Related legal updates.
- [ ] Enquiry format.

Relevant practice pages:

- [ ] `practice/cheque-bounce.html`
- [ ] `practice/msme-disputes.html`
- [ ] `practice/rera-property.html`
- [ ] `practice/commercial-recovery.html`
- [ ] `practice/arbitration.html`
- [ ] `practice/property-civil-suits.html`

## Phase 5 - Upgrade Case Enquiry Page

Status: Done

Suggested title direction:

```text
Case Enquiry for Legal Matters in Patna & Bihar | Chambers of AK
```

Add matter-specific enquiry formats:

- [x] Cheque bounce enquiry format.
- [x] MSME recovery enquiry format.
- [x] RERA/builder dispute enquiry format.
- [x] Arbitration enquiry format.
- [x] Commercial recovery enquiry format.
- [x] Property/civil suit enquiry format.
- [x] What not to send before formal engagement.
- [x] WhatsApp, email, and phone CTA section.

Preserve this principle: initial communication through website, email, phone, or WhatsApp does not create an advocate-client relationship.

## Phase 6 - Local Trust And Entity Pages

Status: Done

Strengthen `courts.html` as a local/entity page. Cover courts/forums in an informational, matter-dependent way:

- [x] Patna High Court.
- [x] District Courts in Bihar.
- [x] MSME Facilitation Council.
- [x] Bihar RERA.
- [x] UP RERA.
- [x] Delhi RERA.
- [x] Commercial courts.
- [x] Arbitral tribunals.

Avoid language that promises representation, outcome, or availability in every forum. Keep wording informational and matter-dependent.

## Phase 7 - Search Console And Tracking Routine

Status: Pending

After each public page batch:

- [x] Update `sitemap.xml`.
- [x] Push to `main`.
- [x] Verify GitHub Pages deployment for recently changed UI items.
- [x] Check live homepage and affected UI sections.
- [x] Confirm CSS and JS cache versions if shared assets changed.
- [x] Check desktop and mobile navigation.
- [ ] Check important lead buttons: WhatsApp, email, phone, case enquiry.
- [ ] Request indexing in Google Search Console.
- [ ] Monitor indexed pages, impressions, queries, CTR, and pages with impressions but low clicks.

## 30-Day Roadmap

### Week 1

- [x] Fix internal-link issues.
- [ ] Audit metadata.
- [x] Validate JSON-LD where touched.
- [x] Improve `case-enquiry.html`.

### Week 2

Add five service landing pages:

- [x] Cheque bounce lawyer Bihar.
- [x] MSME recovery lawyer Patna.
- [x] RERA lawyer Patna.
- [x] Commercial recovery lawyer Bihar.
- [x] Property dispute lawyer Patna.

### Week 3

Add five legal update articles:

- [x] Cheque bounce limitation.
- [x] MSME 45-day rule.
- [x] RERA delayed possession.
- [x] Commercial suit documents.
- [x] Arbitration notice.

### Week 4

- [x] Strengthen internal linking across homepage, practice pages, service pages, updates, document checklists, and enquiry page.
- [x] Refresh homepage legal insights section.
- [x] Add and fix homepage practice slider.
- [x] Fix mobile drawer scroll-lock behavior.
- [ ] Submit updated sitemap.
- [ ] Request indexing for new and changed URLs.

## Immediate Priority Order

Use this exact order unless there is a strategic reason to change it:

1. [x] Fix homepage property/civil link.
2. [x] Upgrade `case-enquiry.html`.
3. [x] Add `services/property-dispute-lawyer-patna.html`.
4. [x] Add `services/msme-recovery-lawyer-patna.html`.
5. [x] Add `updates/msme-45-days-payment-rule.html`.
6. [x] Add `updates/section-138-cheque-bounce-limitation.html`.
7. [x] Expand `courts.html` for stronger local entity SEO.
8. [x] Update `sitemap.xml`.
9. [x] Complete pre-Batch 2 cleanup: social icons, topbar, legacy articles, homepage insights and practice slider.
10. [x] Final live verification pass for recent UI changes.
11. [x] Start SEO Batch 2: `services/cheque-bounce-lawyer-bihar.html` created, linked, and added to sitemap.
12. [x] Continue SEO Batch 2: `services/property-dispute-lawyer-bihar.html` created, linked, and added to sitemap.
13. [x] Continue SEO Batch 2: `services/civil-litigation-lawyer-bihar.html` created, linked, and added to sitemap.
14. [x] Continue SEO Batch 2: `services/msme-recovery-lawyer-delhi-ncr.html` created, linked, and added to sitemap.
15. [x] Continue SEO Batch 2: `services/rera-lawyer-noida.html` created, linked, and added to sitemap.
16. [ ] Request indexing in Google Search Console.
17. [ ] Continue SEO Batch 2 with `services/rera-lawyer-gurugram.html`.

## Progress Log

Use this section to mark progress regularly.

| Date | Change | Status | Notes |
| --- | --- | --- | --- |
| 2026-05-05 | SEO growth agenda created in `docs/SEO_GROWTH_AGENDA.md`. | Done | Initial agenda saved for Codex and ChatGPT reference. |
| 2026-05-05 | Batch 1 SEO pages and updates created. | Done | See `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md` for created service pages, legal updates, courts expansion and sitemap entries. |
| 2026-05-06 | Codex handoff internal-link cleanup and civil litigation page completed. | Done | Added index links, practice-page contextual links, `services/civil-litigation-lawyer-patna.html`, and sitemap entry. |
| 2026-05-06 | Pre-Batch 2 cleanup: social icons and legacy article upgrades. | Done | Fixed responsive topbar/social icon rendering and expanded five older update articles including the four priority thin pages. |
| 2026-05-06 | Homepage refresh and mobile slider correction. | Done | Latest insights now refresh from the Insights hub; homepage Practice Areas now use a mobile-friendly slider with `View More`. |
| 2026-05-06 | Mobile drawer scroll-lock fix verified. | Done | Opening the mobile drawer now locks background page scrolling and avoids the previous menu expansion/jump behavior. |
| 2026-05-06 | Batch 2 started with cheque bounce Bihar service page. | Done | Created `services/cheque-bounce-lawyer-bihar.html`, added it to sitemap, and linked it from `practice.html` and `practice/cheque-bounce.html`. |
| 2026-05-06 | Batch 2 property dispute Bihar service page completed. | Done | Created `services/property-dispute-lawyer-bihar.html`, added it to sitemap, and linked it from `practice.html` and `practice/property-civil-suits.html`. |
| 2026-05-06 | Batch 2 civil litigation Bihar service page completed. | Done | Created `services/civil-litigation-lawyer-bihar.html`, added it to sitemap, and linked it from `practice.html` and `practice/property-civil-suits.html`. |
| 2026-05-06 | Batch 2 MSME Delhi NCR service page completed. | Done | Created `services/msme-recovery-lawyer-delhi-ncr.html`, added it to sitemap, and linked it from `practice.html` and `practice/msme-disputes.html`. |
| 2026-05-06 | Batch 2 RERA Noida service page completed. | Done | Created `services/rera-lawyer-noida.html`, added it to sitemap, and linked it from `practice.html` and `practice/rera-property.html`. |
