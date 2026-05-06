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

### 1. Fix mobile social icons

Status: Pending

Issue reported by user:

Mobile social icons are not loading/displaying correctly.

Likely areas to inspect:

- `assets/js/script.js`
  - `socialLinks`
  - `socialIconSvg`
  - `createSocialLinksMarkup()`
  - topbar social injection
  - drawer social injection
  - footer social injection

- `assets/css/style.css`
  - `.ak-social`
  - `.ak-social-icon`
  - `.ak-social-icon svg`
  - `.topbar-social`
  - `.drawer-social`
  - `.foot-social`
  - mobile media rules for `.site-topbar`, `.topbar-actions`, `.drawer-social-panel`, `.nav-links`, `.menu-open`

Required result:

- LinkedIn icon should render correctly on mobile topbar, drawer menu, and footer.
- WhatsApp Channel icon should render correctly on mobile topbar, drawer menu, and footer.
- Icons should not appear as broken boxes, missing SVGs, oversized shapes, invisible icons, or misaligned circles.
- Social links should remain keyboard accessible and retain `aria-label` text.
- External links should retain `target="_blank"` and `rel="noopener"`.

Recommended implementation:

- If SVG path scaling is the problem, replace the inline SVGs in `socialIconSvg` with simpler, stable `viewBox="0 0 24 24"` icons.
- If mobile CSS is the problem, add mobile-specific rules so `.ak-social-icon` has fixed dimensions, centered SVG, stable color, and no overflow.
- If topbar crowding is the problem, hide only the live clock on very small screens, not the social icons.
- Preserve the black / white / gold Chambers of AK brand style.

Validation:

- Test desktop width.
- Test mobile width around 360px and 390px.
- Open menu and check drawer social icons.
- Check footer social icons.
- Run:

```text
node --check assets\js\script.js
git diff --check
```

Suggested commit message:

```text
Fix mobile social icon rendering
```

### 2. Audit and complete older article pages

Status: Pending

Issue reported by user:

Some articles feel incomplete or thin. Before Batch 2, review all existing article pages and expand any that are too short, underlinked, or inconsistent with the newer article format.

Article pages to audit:

- `updates/cheque-bounce-30-days.html`
- `updates/msme-delayed-payment.html`
- `updates/bihar-rera-complaint.html`
- `updates/cheque-bounce-notice-limitation.html`
- `updates/msme-documents-checklist.html`
- `updates/rera-refund-interest-delayed-possession.html`
- `updates/commercial-recovery-before-suit.html`
- `updates/arbitration-clause-checklist.html`
- `updates/msme-45-days-payment-rule.html`
- `updates/section-138-cheque-bounce-limitation.html`
- `updates/rera-delayed-possession-bihar.html`
- `updates/commercial-suit-documents-checklist.html`
- `updates/arbitration-notice-before-claim.html`
- `updates/property-injunction-suit-documents.html`
- `updates/section-34-arbitration-award-challenge.html`

Known update already completed by ChatGPT:

- `updates/cheque-bounce-notice-limitation.html` was expanded on 2026-05-06.

Priority pages likely needing expansion:

- `updates/msme-documents-checklist.html`
- `updates/rera-refund-interest-delayed-possession.html`
- `updates/commercial-recovery-before-suit.html`
- `updates/arbitration-clause-checklist.html`

Minimum article standard:

Each article should have:

- unique SEO title and meta description;
- canonical URL;
- Open Graph/Twitter metadata;
- Article or BlogPosting JSON-LD;
- clear hero heading;
- at least 4 to 6 useful content sections where appropriate;
- practical document checklist;
- first enquiry format or preparation section;
- related internal links to:
  - relevant practice page;
  - relevant service page;
  - at least one related update article;
  - `../case-enquiry.html`;
  - `../document-checklists.html`, where relevant;
- WhatsApp or case-enquiry CTA where stylistically consistent;
- informational / non-solicitation note;
- no promises, guarantees, or solicitation language.

Suggested content improvements:

1. `updates/msme-documents-checklist.html`
   - Add invoice-wise table guidance.
   - Add supplier-status section.
   - Add buyer-objection section.
   - Link to `msme-45-days-payment-rule.html`, `../services/msme-recovery-lawyer-patna.html`, and `../case-enquiry.html`.

2. `updates/rera-refund-interest-delayed-possession.html`
   - Add refund vs possession decision factors.
   - Add project timeline checklist.
   - Add payment/possession document checklist.
   - Link to `rera-delayed-possession-bihar.html`, `../services/rera-lawyer-patna.html`, and `../case-enquiry.html`.

3. `updates/commercial-recovery-before-suit.html`
   - Add pre-suit document checklist.
   - Add limitation and acknowledgement section.
   - Add arbitration/jurisdiction clause section.
   - Link to `commercial-suit-documents-checklist.html`, `../services/commercial-recovery-lawyer-bihar.html`, and `../case-enquiry.html`.

4. `updates/arbitration-clause-checklist.html`
   - Add seat/venue/appointment distinction.
   - Add notice and interim relief section.
   - Add post-award/enforcement link section.
   - Link to `arbitration-notice-before-claim.html`, `section-34-arbitration-award-challenge.html`, and `../services/arbitration-lawyer-bihar.html`.

Validation:

- Run JSON-LD parse check for all article pages.
- Run internal href/src reference validation.
- Confirm `legal-updates.html` article links still work.
- Confirm no article contains broken relative paths.
- Run:

```text
node --check assets\js\script.js
git diff --check
```

Suggested commit message:

```text
Complete and standardize legal update articles
```

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
