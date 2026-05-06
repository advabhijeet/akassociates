# Codex Handoff

This file is the single handoff document for tasks that ChatGPT cannot safely complete through the GitHub connector. Keep all blocked or Codex-only instructions here instead of creating multiple temporary instruction files.

## Usage Rule

Use this document only when a repository change cannot be completed directly through ChatGPT's GitHub connector, usually because a tool safety layer blocks a large replacement or a task requires local validation.

When Codex completes an item:

1. Apply the change locally.
2. Run the relevant checks.
3. Commit with a clear message.
4. Update this file by moving the item to the completed section or marking it done.
5. Update `docs/SEO_GROWTH_AGENDA.md` and `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md` if the work affects SEO agenda progress.

## Active Handoff Items

No active handoff items remain after the 2026-05-06 Codex cleanup. Future Codex-only or blocked connector tasks should be added here.

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
