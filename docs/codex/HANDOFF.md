# Codex Handoff

This file is the single handoff document for tasks that ChatGPT cannot safely complete through the GitHub connector. Keep blocked, local-validation or Codex-only instructions here instead of creating multiple temporary instruction files.

## Usage Rule

Use this document only when a repository change cannot be completed directly through ChatGPT's GitHub connector, usually because:

- a connector safety layer blocks a large replacement;
- visual/mobile validation is required;
- a task requires local validation or a browser check;
- a full repository scan is needed.

When Codex completes an item:

1. Sync with the latest `main` branch.
2. Apply the change locally.
3. Run the relevant checks.
4. Commit with a clear message.
5. Update this file by moving the item to the completed section or marking it done.
6. Update `CHANGELOG.md` with date, time, changed files, validation and commit hash.
7. Update `README.md`, `docs/planning/SEO_GROWTH_AGENDA.md` or relevant docs if the work affects structure, SEO, tracking, positioning or maintenance.

## Active Handoff Items

### Post-deployment Insights category/tag polish check

Status: Pending after the Insights category/tag polish is committed, pushed and deployed

Context:

- Latest accepted repository checkpoint is `0b39ee3 Clean up contact form documentation`.
- The local Insights patch aligns visible card badges with article types and keeps legal topics in smaller tag chips.
- The patch also restores `commercial-suit-documents-checklist.html` to the shared Insights registry.

Rules:

- Do not move existing live `updates/*.html` article URLs.
- Keep natural browser scroll for filtered Insights results.
- Keep category/tag/search filters free-switching; Clear Filter should only restore default editorial view.
- Update `CHANGELOG.md` after the patch.

After deployment, re-check:

- live `legal-updates.html` loads `insights-polish-1` CSS/JS cache strings;
- primary badges show article type: Case Brief, Legal Update, Practical Guide, Checklist or Procedure Note;
- clicking a card category badge filters by category;
- clicking a topic chip filters by tag;
- `Commercial Suit Documents Checklist` appears in search/filter results;
- desktop and mobile Insights checks show no console errors or horizontal overflow.

### Search Console follow-up

Status: Manual/account follow-up after deployment or live recrawl

Check Search Console for:

- Breadcrumb enhancement detection after the sitewide breadcrumb pass.
- Coverage/indexing status for recently changed hub pages.
- Indexing status for newer legal insight articles.
- Homepage duplicate canonical validation, without repeatedly changing the homepage while Google is still processing.

## Current Repository State

As of 2026-05-10:

- Batch 1 SEO pages and article upgrades are complete.
- Batch 2 service-page buildout is complete.
- Optional `services/cheque-bounce-lawyer-delhi-ncr.html` is complete.
- Search Console indexing has been requested for Batch 2 URLs.
- Homepage, About page and Expertise page have been repositioned to firm/team-focused language.
- Homepage founder portrait has been removed.
- Future `team.html` page is planned in `docs/planning/TEAM_PAGE_AGENDA.md`.
- `CHANGELOG.md` exists and must be updated after every meaningful modification.
- `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md` records the current audit.
- Documentation has been reorganized into `docs/audits/`, `docs/codex/`, `docs/google/`, `docs/maintenance/`, `docs/planning/`, `docs/seo/`, and `docs/wiki/`.
- Next-stage upgrade plan is recorded in `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`.
- Manual/local validation checks have passed for JavaScript syntax, git diff, sitemap XML, feed XML, JSON-LD and internal href/src references in recent maintenance passes.
- Phase 4 practice-page strengthening is complete.
- `sitemap.xml` records 2026-05-09 freshness for the strengthened practice pages and key hub pages.
- Contact form direct EmailJS Send Enquiry is connected and uses Template ID `contactformtempid`; Contact cleanup is deployed and live-checked.
- GitHub Wiki pages were refreshed from the local wiki working folders on 2026-05-09, then `.wiki-clone/` and `.wiki-work/` were removed from the local workspace. If similar folders appear again, do not commit them.
- Insights category/tag polish is the active local patch after Contact stability validation.

## Completed Handoff Items

### 2026-05-09 Contact cleanup deployment check

Status: Done through Codex/local and live browser review

- Confirmed live `contact.html` loaded the updated Contact cleanup copy and `contact-cleanup-1` cache strings.
- Confirmed EmailJS SDK, direct Send Enquiry button, WhatsApp fallback, Gmail fallback and copy fallback remained present.
- Confirmed live Contact page browser smoke check passed without console errors.

### 2026-05-09 local wiki folder inspection

Status: Done through Codex/local review

- Inspected `.wiki-clone/` and `.wiki-work/` before any cleanup action.
- Confirmed `.wiki-clone` is a clean wiki repository on `master` at `a26ef05 Expand project wiki`.
- Confirmed `.wiki-work/` contains matching wiki files.
- Refreshed the GitHub Wiki and then removed `.wiki-clone/` and `.wiki-work/` from the local workspace.
- Current canonical repository-side wiki mirror remains `docs/wiki/WORKFLOW.md`.

### 2026-05-09 post-Phase-4 sitemap freshness check

Status: Done through Codex/local review

- Confirmed `sitemap.xml` includes 2026-05-09 `lastmod` entries for the six strengthened practice pages.
- Confirmed current root hub pages such as Practice, Insights, Contact and Case Enquiry also carry 2026-05-09 sitemap freshness where applicable.

### 2026-05-09 Contact cleanup and pre-deployment stability validation

Status: Done locally through Codex

- Updated stale Contact copy so the page reflects the direct EmailJS Send Enquiry flow.
- Kept WhatsApp, Gmail and copy fallback routes intact.
- Confirmed `node --check assets\js\script.js`, `git diff --check`, sitemap/feed XML parsing, JSON-LD parsing and internal `href`/`src` checks passed.
- Confirmed local browser smoke testing for the patched Contact form on desktop and mobile passed without console errors.
- Confirmed current live public routes and live Insights filtering are stable before the next feature/content patch.
- Did not submit a live EmailJS enquiry during validation.

### 2026-05-07 Phase 4 practice page strengthening

Status: Done through ChatGPT/GitHub connector

Pages strengthened:

- `practice/cheque-bounce.html`
- `practice/msme-disputes.html`
- `practice/rera-property.html`
- `practice/commercial-recovery.html`
- `practice/arbitration.html`
- `practice/property-civil-suits.html`

Summary:

- Added or improved matter-introduction sections.
- Added document-led preparation sections.
- Added limitation/date-sensitivity sections where relevant.
- Added forum/court/procedure route sections.
- Added common-mistake sections.
- Added related service-page links and legal-update links.
- Added structured enquiry formats.
- Strengthened non-solicitation notes.
- Refreshed metadata and FAQ JSON-LD.

Commits:

- `b2e81ba26e82604aacfb823d8756c97d38351886` - Strengthen cheque bounce practice page.
- `3c021faf0aea36087d762e190663a842cccaed88` - Update sitemap date for cheque bounce practice page.
- `d0ad7d4d61538275060daf3773442ae90ffa7df6` - Strengthen MSME disputes practice page.
- `18f9ab3721e520a85a12f45ec948accc8328f9a3` - Strengthen RERA and property practice page.
- `ab772de5b90da4007d450483ddeddc979db36b27` - Strengthen commercial recovery practice page.
- `01a96f26cb3c9a8804ba2a743a91a549a7484c5d` - Strengthen arbitration practice page.
- `b92c87309e2ebec8d04149fb874c16e2c0209536` - Strengthen property and civil suits practice page.

### 2026-05-07 Manual terminal validation

Status: Done by user, recorded for Codex

- Confirmed local repository branch `main` was up to date with `origin/main`.
- Confirmed `node --check assets\js\script.js` passed.
- Confirmed `git diff --check` passed.
- Confirmed `sitemap.xml` parsed successfully.
- Confirmed JSON-LD parsing passed with 44 parsed blocks.
- Confirmed internal `href`/`src` reference check passed.
- Preserved `.wiki-clone/` and `.wiki-work/` for future Codex inspection.

### 2026-05-07 Next website upgrade agenda

Status: Done

- Added `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`.
- Recorded ordered phases for wiki sync, validation closure, live smoke testing, practice-page strengthening, pending legal updates, Insights distribution/newsletter workflow, case enquiry improvements, trust/entity improvements, future service pages and future Team page restrictions.
- Updated `docs/planning/SEO_GROWTH_AGENDA.md` and `docs/README.md` to reference the new upgrade agenda.

### 2026-05-06 Documentation reorganization

Status: Done

- Moved audit, Codex, maintenance, planning and wiki documentation into clearer subfolders under `docs/`.
- Updated README and docs index to reflect the new documentation map.
- Updated changelog with the reorganization entry.
- Preserved public website file structure.

### 2026-05-06 Documentation audit and changelog setup

Status: Done

- Updated root `README.md` after repository audit.
- Created `CHANGELOG.md` with historical entries from recent website, SEO and positioning work.
- Created `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`.
- Updated `docs/README.md` to include the new documentation map and wiki-sync status.
- Confirmed direct GitHub Wiki access was not available through the connector; `docs/wiki/WORKFLOW.md` remains the in-repository wiki mirror.

### 2026-05-06 Firm/team positioning update

Status: Done

- Made `about.html` firm/team-focused instead of individual-CV-focused.
- Expanded `practice.html` into an Expertise & Practice Areas page.
- Removed founder portrait from homepage hero in `index.html`.
- Added future team-page plan in `docs/planning/TEAM_PAGE_AGENDA.md`.

### 2026-05-06 Optional Batch 2 completion

Status: Done

- Created `services/cheque-bounce-lawyer-delhi-ncr.html`.
- Added it to `sitemap.xml`.
- Linked it from `practice.html` and `practice/cheque-bounce.html`.
- Marked Batch 2 service-page buildout complete.

### 2026-05-06 Batch 2 service-page buildout

Status: Done

Created, linked and added sitemap entries for:

- `services/cheque-bounce-lawyer-bihar.html`
- `services/property-dispute-lawyer-bihar.html`
- `services/civil-litigation-lawyer-bihar.html`
- `services/msme-recovery-lawyer-delhi-ncr.html`
- `services/rera-lawyer-noida.html`
- `services/rera-lawyer-gurugram.html`

### 2026-05-06 Codex cleanup

Status: Done

- Added new service-page cards to `practice.html` under Focused Search Pages.
- Added new legal update article cards to `legal-updates.html`.
- Fixed the homepage `Property & Civil Suits` card to link to `practice/property-civil-suits.html`.
- Added contextual service/article links across the six practice pages.
- Created `services/civil-litigation-lawyer-patna.html`.
- Added `https://chambersofak.in/services/civil-litigation-lawyer-patna.html` to `sitemap.xml`.

### 2026-05-06 Responsive social/topbar cleanup

Status: Done

- Fixed shared social icon rendering in `assets/js/script.js` and `assets/css/style.css`.
- Restored actual inline SVG icons for LinkedIn and WhatsApp Channel instead of text-only labels.
- Kept icons centered inside circular buttons in the mobile drawer and footer.
- Restored desktop topbar behavior while removing the topbar from mobile view.

### 2026-05-06 Homepage refresh and mobile slider correction

Status: Done

- Updated homepage Legal Insights to show newer article cards.
- Added homepage logic that can pull the first six cards from `legal-updates.html`.
- Converted homepage Practice Areas into a horizontal slider with a `View More` button to `practice.html`.
- Fixed the mobile version of the practice slider.

### 2026-05-06 Mobile drawer scroll-lock fix

Status: Done

- Updated `assets/js/script.js` so opening the mobile menu drawer locks background page scrolling.
- Preserved the user's scroll position and restored it when the drawer closes.
- Added viewport-change safety for desktop resize.

## Next Planned Work

Recommended order:

1. Complete post-Phase-4 sitemap lastmod cleanup and local validation.
2. Codex/local inspection of `.wiki-clone/` and `.wiki-work/`.
3. Live desktop/mobile smoke validation.
4. Review titles, meta descriptions, canonicals, footer links and CTAs.
5. Create the two pending legal update articles.
6. Prepare social/newsletter distribution copy for each new article.
7. Improve Case Enquiry flow.
8. Consider future service pages only after Search Console review.
