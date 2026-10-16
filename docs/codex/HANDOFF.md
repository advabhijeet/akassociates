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

## Live Check Boundary

For any live/deployment validation handoff, read `docs/codex/CHATGPT_CODEX_LIVE_CHECK_BOUNDARY.md`.

Rules:

- ChatGPT repository inspection is not a live visual check.
- If ChatGPT cannot open the live site, ask the user to manually check the listed URLs and report.
- Codex/local automation may perform browser smoke tests or live route checks when it has a functioning browser/network environment.
- Record source checks, local smoke tests, live visual checks and manual user checks separately.

## Current handoff — 16 October 2026

This supersedes the former **May 2026** "Current Repository State" and "Active Handoff Items" below. Completed May tasks have been retained in the historical section. Consult the latest `main`, `docs/PROJECT_ROADMAP.md`, `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` and `CHANGELOG.md` before any change.

**Repository snapshot (main `ccdf7a0`, 13 October 2026):**

- Chambers public website and Citadel v1 are in production.
- The July deployment-boundary, asset/performance, service-consolidation, documentation and modularisation cleanup batches are complete.
- Article publication has resumed: **48** entries in `assets/data/insights-registry.json`, **48** RSS items in `feed.xml`, and **83** sitemap URLs at the 16 October repository check. These are **not** verified Google-indexed counts.
- Static Insight links, RSS generation, article metadata/thumbnail parity and sitewide validation are implemented. The original Batch 6 metadata fixes should not be reapplied without an audit.
- A privacy-safe `enquiry_submit` tracking event was added after confirmed EmailJS success in October; check live analytics reporting separately.
- Latest content maintenance includes updates on MSME, Section 138, Section 21 arbitration, RERA, Sabarimala and Delhi NCR cheque-bounce jurisdiction; latest observed `main` commit is `ccdf7a0`.
- **Do not reinstate the obsolete README instruction to pause article publication.**

### Active: Search Console follow-up (external account evidence)

1. Review the latest Page Indexing report, covering indexed/not-indexed URLs, crawled-but-not-indexed, duplicates, redirects and canonical selection.
2. Review performance by page and query (impressions, clicks, CTR, search position) for the law firm's core legal practice clusters.
3. Track changed or consolidated URLs without unnecessary canonical churn.
4. Separate Search Console findings from code-level validations. If the connected reporting integration is not available, use a manual Search Console export or user-provided report; do not claim current counts.

### Active: content accuracy and targeted SEO maintenance

- Prioritise source-verified changes to existing pages before creating competing keyword/intent pages.
- Use `docs/planning/CONTENT_CALENDAR_AND_TOPIC_QUEUE.md`; its previous five "next topic" subjects are already published under actual registry slugs.
- For new/updated articles, keep article HTML, Registry, static Insights cards, RSS, sitemap, image/schema, internal links and changelog in parity.
- Preserve stable existing URLs, differentiable jurisdictional content and no-solicitation copy.

### Awaiting verification: live UX and analytics

- Test representative desktop/mobile routes, dark/light mode, article thumbnails and enquiry flow after material shared-module changes.
- Confirm Core Web Vitals independently; code or asset optimisation does not prove passing CWV.
- Confirm that GTM/GA4 records `enquiry_submit` after success, and verify attribution only with analytics evidence.

### Conditional: AdSense onboarding

- The last saved AdSense plan is dated May 2026; **no current account approval is established by repository documentation**.
- Preserve the article-only, restrained advertisement requirement; do not add ads elsewhere or claim approval.
- Reassess only if account status/official review steps require changes; consult `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`.

### Deferred: separate product initiatives

- Standalone Citadel theme extraction/release (production config/runtime groundwork already exists).
- Authenticated Citadel Manager/CMS, secure Client Portal, moderated article comments and standalone reading-time module.
- Team page until approved team details exist; future new service URLs until distinct need and indexing impact are reviewed.

**Codex action rule:** use this handoff only when a local repository/browser/code operation cannot be performed safely in the connector. Once executed, update `CHANGELOG.md` and the master roadmap for changed project status; distinguish tests actually run from checks recommended for later.

## Completed Handoff Items

### 2026-05-10 Insights category/tag polish and live validation

Status: Done through Codex/local and live browser review

- Committed and pushed `6b372e4 Polish Insights categories and filters`.
- Confirmed live `legal-updates.html` served `insights-polish-1` CSS/JS cache strings.
- Confirmed primary badges now represent article type while smaller chips represent legal tags/topics.
- Confirmed category filter, tag filter, free-switching, clickable topic chips and clickable category badges worked on the live page without console errors.
- Confirmed `Commercial Suit Documents Checklist` appears in filtered live results.
- Kept all existing `updates/*.html` article URLs unchanged.

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

## Next Planned Work (October 2026)

1. Run repository validation plus an explicit documentation-freshness review after this reconciliation.
2. Complete the next Google Search Console coverage/performance check (account access or manual export required).
3. Review excluded/recrawled URLs and any observed cannibalisation before commissioning new SEO pages.
4. Verify live Core Web Vitals, representative pages and GTM/GA4 enquiry-event reporting.
5. Refresh legal citations and article content where demonstrably necessary; publish only genuinely distinct approved topics.
6. Retain planned CMS, client portal, standalone theme and comments work outside the current static-public-site delivery scope.

Older May 2026 tasks are listed above only as **completed historical handoff records**, not the current backlog.
