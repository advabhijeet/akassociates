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

### 2026-05-06 Codex pre-Batch 2 cleanup

Status: Done

- Fixed shared mobile social icon rendering in `assets/js/script.js` and `assets/css/style.css`.
- Replaced the social SVGs with stable `viewBox="0 0 24 24"` icons while preserving `aria-label`, `target="_blank"` and `rel="noopener"`.
- Kept the Chambers of AK black / white / gold styling and made mobile icon sizing stable in the topbar, drawer and footer.
- Kept social icons visible on mobile topbar and hid only the live clock on very small screens.
- Audited the update pages listed in this handoff and expanded the four thin legacy pages most in need of standardization:
  - `updates/msme-documents-checklist.html`
  - `updates/rera-refund-interest-delayed-possession.html`
  - `updates/commercial-recovery-before-suit.html`
  - `updates/arbitration-clause-checklist.html`
- Added richer document-checklist content, first-enquiry guidance, related internal links, updated metadata and CTA blocks to those pages.
- Bumped shared asset cache-busting references across HTML pages after changing `assets/css/style.css` and `assets/js/script.js`.

Validation completed in the working tree before commit:

- `node --check assets\js\script.js`
- `git diff --check`
- internal href/src reference check
- JSON-LD parse check
- `legal-updates.html` article-link check

Validation note:

- The in-app browser runtime and headless Edge/Chrome screenshot fallback were both blocked in this environment, so mobile 360px / 390px screenshot verification could not be completed through Codex on this run.
