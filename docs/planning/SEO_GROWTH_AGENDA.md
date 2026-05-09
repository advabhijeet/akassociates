# SEO Growth Agenda

This document records the forward SEO and content-growth plan for Chambers of AK. It is intended for ChatGPT, Codex and future maintainers.

## Purpose

Increase search visibility for high-intent legal queries while preserving informational, non-solicitation positioning required for an advocate website in India.

The agenda should be reviewed and updated after each meaningful website change. `CHANGELOG.md` remains the primary chronological record.

Detailed next-stage execution order now lives in:

```text
docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md
```

Use that document as the operating agenda for validation closure, practice-page strengthening, pending legal update articles, Insights distribution/newsletter workflow, future service pages and Team page restrictions.

## Current SEO Foundation

- Static HTML pages hosted through GitHub Pages.
- Custom domain: `https://chambersofak.in`.
- Core pages at the root level.
- Practice/expertise pages under `practice/` and `practice.html`.
- High-intent landing pages under `services/`.
- Legal update articles under `updates/`.
- SEO metadata, canonical URLs, Open Graph metadata, Twitter card metadata and JSON-LD structured data.
- `robots.txt` allows crawl access and points to `sitemap.xml`.
- Google Tag Manager is installed with lead-event tracking support.
- GA4 is intended to be controlled through GTM to avoid duplicate page views.
- Homepage is firm-focused and no longer displays the founder portrait.
- Homepage Legal Insights can pull cards from `legal-updates.html`.
- Homepage Practice Areas use a mobile-friendly horizontal slider with a `View More` link to `practice.html`.
- Mobile menu drawer locks background page scrolling while open.

## Core Search Focus

Primary visibility clusters:

- Cheque bounce / Section 138 NI Act matters.
- MSME delayed-payment and recovery matters.
- RERA and builder-buyer disputes.
- Commercial recovery and business dues.
- Arbitration notices, claims, challenges and enforcement.
- Property and civil litigation.
- DRT, SARFAESI and banking recovery matters.
- Real estate title search, due diligence and property document review.
- Commercial contracts and private legal documentation.
- Trademark and IP advisory.

Primary geography clusters:

- Patna.
- Bihar.
- Uttar Pradesh.
- Delhi NCR.
- Noida.
- Gurugram.

## Current Completed Work

### Technical and UI Foundation

- Homepage property/civil card link fixed.
- Mobile social icons and footer icons fixed.
- Desktop topbar retained while mobile topbar removed.
- Homepage legal insights refreshed.
- Homepage practice-area slider added and mobile layout corrected.
- Mobile drawer scroll-lock behavior fixed.
- Homepage, About page and Expertise page repositioned as firm/team-focused.
- Homepage founder portrait removed.
- Changelog and documentation-maintenance rules established.
- Documentation reorganized under `docs/audits/`, `docs/codex/`, `docs/google/`, `docs/maintenance/`, `docs/planning/`, `docs/seo/` and `docs/wiki/`.
- Next website upgrade agenda created at `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`.
- Contact page upgraded with a dynamic matter-type enquiry form, direct EmailJS Send Enquiry, and WhatsApp, Gmail and copy fallbacks.

### Manual Validation Completed

Manual validation was completed by the user on 2026-05-07 from the local Codex repository folder.

Reported results:

- `git pull origin main`: already up to date.
- `node --check assets\js\script.js`: passed with no output.
- `git diff --check`: passed with no output.
- `sitemap.xml`: parsed successfully.
- JSON-LD parsing: passed; 44 blocks parsed.
- Internal `href`/`src` reference check: passed.
- `.wiki-clone/` and `.wiki-work/` remain untracked and preserved for Codex continuation.

Remaining validation follow-up:

- live desktop/mobile smoke test;
- full title/meta/canonical review across public HTML files;
- footer legal-link review across representative root, practice, service and update pages;
- important CTA review for WhatsApp, email, phone and case enquiry;
- Codex/local inspection of `.wiki-clone/` and `.wiki-work/` for unfinished wiki work.

### Batch 1 Content

Detailed historical record: `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`.

Completed items include:

- Structured case enquiry hub.
- Expanded courts/forums entity page.
- Initial service pages and legal-update content.
- Internal linking improvements.

### Batch 2 Service Pages

Completed current Batch 2 set:

- `services/cheque-bounce-lawyer-bihar.html`
- `services/cheque-bounce-lawyer-delhi-ncr.html`
- `services/property-dispute-lawyer-bihar.html`
- `services/civil-litigation-lawyer-bihar.html`
- `services/msme-recovery-lawyer-delhi-ncr.html`
- `services/rera-lawyer-noida.html`
- `services/rera-lawyer-gurugram.html`

Search Console indexing was requested for Batch 2 URLs.

### Practice Page Strengthening - Phase 4

Completed on 2026-05-07:

- `practice/cheque-bounce.html`
- `practice/msme-disputes.html`
- `practice/rera-property.html`
- `practice/commercial-recovery.html`
- `practice/arbitration.html`
- `practice/property-civil-suits.html`

Summary of work:

- Added or improved matter-introduction sections explaining when each dispute usually arises.
- Added document-led preparation sections.
- Added limitation/date-sensitivity sections where relevant.
- Added forum/court/procedure route sections.
- Added common-mistake sections.
- Added related service-page links and related legal-update links.
- Added structured enquiry formats.
- Strengthened informational/non-solicitation notes.
- Refreshed metadata and FAQ JSON-LD for the strengthened pages.

Commits:

- `b2e81ba26e82604aacfb823d8756c97d38351886` - Strengthen cheque bounce practice page.
- `3c021faf0aea36087d762e190663a842cccaed88` - Update sitemap date for cheque bounce practice page.
- `d0ad7d4d61538275060daf3773442ae90ffa7df6` - Strengthen MSME disputes practice page.
- `18f9ab3721e520a85a12f45ec948accc8328f9a3` - Strengthen RERA and property practice page.
- `ab772de5b90da4007d450483ddeddc979db36b27` - Strengthen commercial recovery practice page.
- `01a96f26cb3c9a8804ba2a743a91a549a7484c5d` - Strengthen arbitration practice page.
- `b92c87309e2ebec8d04149fb874c16e2c0209536` - Strengthen property and civil suits practice page.

Post-Phase-4 cleanup status:

- `sitemap.xml` now records 2026-05-09 lastmod dates for the strengthened practice pages.
- Local syntax and XML validation should be repeated after the current Contact cleanup.
- Browser/mobile smoke testing remains part of the current stability pass before the next feature/content patch.

## Remaining Technical SEO Cleanup

Before adding more public pages, run or complete:

- [ ] Full title/meta/canonical audit across public HTML files.
- [ ] Footer legal-link check across representative root, practice, service and update pages.
- [ ] Important lead button check: WhatsApp, email, phone and case enquiry.
- [x] Internal href/src reference check.
- [x] JSON-LD parsing check.
- [x] Sitemap XML syntax check.
- [ ] Desktop/mobile smoke test for homepage, About, Expertise, mobile drawer and footer icons.
- [ ] Post-Phase-4 local validation and sitemap lastmod cleanup.

## Pending Legal Update Articles

Recently completed priority update articles:

- [x] `updates/cheque-bounce-defence-after-summons.html`
- [x] `updates/msme-facilitation-council-process.html`

Future content clusters to consider after technical audit:

- [ ] DRT and SARFAESI document checklist.
- [ ] Property title search checklist before purchase.
- [ ] Real estate due diligence checklist for Bihar property.
- [ ] Commercial contract review checklist.
- [ ] Trademark registration basics for businesses.

## Practice Page Strengthening

Completed strengthened pages:

- [x] `practice/cheque-bounce.html`
- [x] `practice/msme-disputes.html`
- [x] `practice/rera-property.html`
- [x] `practice/commercial-recovery.html`
- [x] `practice/arbitration.html`
- [x] `practice/property-civil-suits.html`

Strengthened elements:

- [x] When this matter usually arises.
- [x] Documents to keep ready.
- [x] Forum/court route.
- [x] Limitation/date sensitivity.
- [x] Common mistakes.
- [x] Related service pages.
- [x] Related legal updates.
- [x] Enquiry format.
- [x] Informational/non-solicitation note.

## Insights Distribution / Newsletter Workflow

For each new article under `updates/`, prepare a controlled distribution bundle for official Chambers of AK channels.

Current official channels:

- Firm LinkedIn Page.
- WhatsApp Channel.

First-stage workflow:

- [ ] LinkedIn Page post draft.
- [ ] WhatsApp Channel post draft.
- [ ] Newsletter/email subject.
- [ ] Newsletter/email body.
- [ ] Short social/meta summary.
- [ ] Informational disclaimer line.

Tone rules:

- informational only;
- no direct solicitation;
- no guaranteed-outcome language;
- no claims such as "best", "top" or "guaranteed result";
- include: "For general information only. Not legal advice or solicitation."

Later-stage options:

- [ ] `feed.xml` or `updates.xml` for article discovery.
- [ ] Approved LinkedIn Page scheduling/API workflow.
- [ ] WhatsApp Channel posting only through safe, approved and account-compliant methods.
- [ ] Newsletter subscription only after privacy-policy review.

## Future Expertise / Service Pages To Consider

Create only after practice pages are strengthened and Search Console review is complete:

- [ ] `services/property-title-search-bihar.html`
- [ ] `services/real-estate-due-diligence-bihar.html`
- [ ] `services/drt-lawyer-patna.html`
- [ ] `services/sarfaesi-lawyer-bihar.html`
- [ ] `services/commercial-contract-lawyer-patna.html`
- [ ] `services/trademark-lawyer-patna.html`

## Team Page

Future team page plan lives at:

```text
docs/planning/TEAM_PAGE_AGENDA.md
```

Do not add `team.html` to navigation, footer or sitemap until team-member details are ready and approved.

## Search Console And Tracking Routine

After each public page batch:

- [x] Update `sitemap.xml`.
- [x] Push to `main`.
- [x] Verify GitHub Pages deployment for recently changed UI items.
- [x] Request indexing in Google Search Console where appropriate.
- [ ] Monitor indexed/not indexed status.
- [ ] Monitor impressions, queries and CTR.
- [ ] Identify pages with impressions but low clicks.

## Immediate Priority Order

1. [x] Complete Batch 1 and Batch 2 service-page work.
2. [x] Submit/re-submit sitemap and request indexing for Batch 2 URLs.
3. [x] Reposition homepage/About/Expertise pages to firm/team-focused language.
4. [x] Create changelog and documentation workflow.
5. [x] Reorganize documentation structure.
6. [x] Run manual technical validation checks: JavaScript syntax, git diff, sitemap XML, JSON-LD and internal href/src references.
7. [x] Strengthen six practice pages.
8. [x] Run post-Phase-4 sitemap lastmod cleanup.
9. [x] Run Contact cleanup validation and pre-deployment live desktop/mobile smoke test.
10. [x] Inspect `.wiki-clone/` and `.wiki-work/` when Codex is available.
11. [x] Create priority legal update articles with distribution drafts.
12. [ ] Monitor Search Console data.
