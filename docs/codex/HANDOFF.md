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

No active Codex handoff items are open at this moment.

Codex is currently unavailable due to usage limits until 2026-05-13 07:56 AM, as reported by the user. Until then, ChatGPT should make connector-safe edits directly and reserve local/browser validation for Codex/manual terminal later.

Recommended local validation pass before new content work:

- `node --check assets\js\script.js`
- `git diff --check`
- internal href/src reference check from `README.md`
- JSON-LD parsing check from `README.md`
- sitemap XML syntax check
- live desktop/mobile smoke check for homepage, About, Expertise, menu drawer, footer links and lead CTAs

## Current Repository State

As of 2026-05-06:

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

## Completed Handoff Items

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

Recommended order before adding more pages:

1. Run technical SEO audit: titles, meta descriptions, canonicals and footer legal links.
2. Run local validation checks listed above.
3. Monitor Search Console indexing and performance for Batch 2 pages.
4. Then create the two pending legal update articles or strengthen practice pages.
