# Codex Handoff

This file is the single handoff document for tasks that ChatGPT cannot safely complete through the GitHub connector. Keep all blocked or Codex-only instructions here instead of creating multiple temporary instruction files.

## Usage Rule

Use this document only when a repository change cannot be completed directly through ChatGPT's GitHub connector, usually because a tool safety layer blocks a large replacement, visual/mobile validation is required, or a task requires local validation.

When Codex completes an item:

1. Apply the change locally.
2. Run the relevant checks.
3. Commit with a clear message.
4. Update this file by moving the item to the completed section or marking it done.
5. Update `docs/SEO_GROWTH_AGENDA.md` and relevant files in `docs/seo/` if the work affects SEO agenda progress.

## Active Handoff Items

No active pre-Batch 2 handoff items remain after the 2026-05-06 cleanup pass. Add new Codex-only items here if later connector or validation limits create another blocked task.

## Completed Handoff Items

### 2026-05-06 Codex cleanup

Status: Done

- Added new service-page cards to `practice.html` under `Focused Search Pages`.
- Added new legal update article cards to `legal-updates.html`.
- Fixed the homepage `Property & Civil Suits` card to link to `practice/property-civil-suits.html`.
- Added contextual service/article links across the six practice pages.
- Created `services/civil-litigation-lawyer-patna.html` with GTM, canonical URL, Open Graph/Twitter metadata, FAQ JSON-LD, related internal links, WhatsApp and case-enquiry CTAs, and informational/non-solicitation language.
- Added `https://chambersofak.in/services/civil-litigation-lawyer-patna.html` to `sitemap.xml`.
- Updated `docs/SEO_GROWTH_AGENDA.md` to mark completed Batch 1 and handoff progress, with a reference to `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`.

Validation completed in the working tree before commit:

- `node --check assets\js\script.js`
- `git diff --check`
- internal href/src reference check
- sitemap XML syntax check
- JSON-LD parse check
- targeted navigation href check for desktop/mobile menu markup preservation

### 2026-05-06 ChatGPT article expansion

Status: Done

- Expanded `updates/cheque-bounce-notice-limitation.html` from a short informational note into a fuller article with date-chart guidance, demand notice records, accused-side preparation, complaint-readiness questions, internal links, case enquiry CTA, and updated metadata/JSON-LD modified date.

### 2026-05-06 Responsive social/topbar cleanup

Status: Done

- Fixed shared social icon rendering in `assets/js/script.js` and `assets/css/style.css`.
- Restored actual inline SVG icons for LinkedIn and WhatsApp Channel instead of text-only labels.
- Kept icons centered inside circular buttons in the mobile drawer and footer.
- Preserved `aria-label`, `target="_blank"` and `rel="noopener"` on external social links.
- Restored desktop topbar behavior while removing the topbar from mobile view.
- Bumped shared CSS/JS cache-busting references across HTML pages after changing `assets/css/style.css` and `assets/js/script.js`.

Validation / verification:

- User manually committed and pushed the final responsive fix after Codex hit a Git usage limit.
- User confirmed the desktop topbar, mobile topbar removal, mobile menu icons and footer icons were fixed on the live website.

### 2026-05-06 Pre-Batch 2 legacy article audit

Status: Done

- Audited the update pages listed in the previous handoff and expanded the four thin legacy pages most in need of standardization:
  - `updates/msme-documents-checklist.html`
  - `updates/rera-refund-interest-delayed-possession.html`
  - `updates/commercial-recovery-before-suit.html`
  - `updates/arbitration-clause-checklist.html`
- Added richer document-checklist content, first-enquiry guidance, related internal links, updated metadata and CTA blocks to those pages.
- Standardized the pages around practical preparation sections, non-solicitation language and internal content-cluster links.

Validation completed during the cleanup flow:

- `git diff --check` where available.
- internal href/src reference review.
- JSON-LD structure review.
- `legal-updates.html` article-link review.

### 2026-05-06 Homepage refresh and mobile slider correction

Status: Done

- Updated homepage Legal Insights to show newer article cards.
- Added a homepage script that pulls the first six cards from `legal-updates.html`, so future new articles listed at the top of the Insights hub can refresh the homepage section.
- Converted homepage Practice Areas into a horizontal slider with a `View More` button to `practice.html`.
- Fixed the mobile version of the practice slider after the first implementation squeezed card widths and caused poor text wrapping.
- User confirmed the mobile practice slider is now fixed on the live website.

### 2026-05-06 Mobile drawer scroll-lock fix

Status: Done

- Updated `assets/js/script.js` so opening the mobile menu drawer locks background page scrolling.
- Preserved the user's scroll position and restored it when the drawer closes.
- Replaced the drawer toggle-only behavior with explicit `openMenu()` and `closeMenu()` paths to reduce menu expansion/jump behavior.
- Added viewport-change safety so the drawer state is cleared and scroll is unlocked if the screen is resized to desktop while the menu is open.
- User confirmed the recently changed UI items were checked after the fix.

## Next Planned Work

Proceed to SEO Batch 2 after Search Console indexing/verification items are handled.

Suggested next page:

- `services/cheque-bounce-lawyer-bihar.html`
