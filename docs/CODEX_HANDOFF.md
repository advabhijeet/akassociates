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

### 1. Add new service pages to `practice.html`

Status: Pending

Reason for handoff:

The direct connector update to `practice.html` was blocked during a large replacement. Codex should apply this as a local patch edit.

Required change:

In `practice.html`, under the `Focused Search Pages` section, add internal-link cards for the new service pages.

Add these cards after the existing related service items, preserving the current design/classes:

```html
<article class="info-item">
  <h2><a href="services/property-dispute-lawyer-patna.html">Property Dispute Lawyer in Patna</a></h2>
  <p>Title papers, possession disputes, injunctions, partition, specific performance, declaration suits and document preparation for Patna-linked property matters.</p>
</article>

<article class="info-item">
  <h2><a href="services/msme-recovery-lawyer-patna.html">MSME Recovery Lawyer in Patna</a></h2>
  <p>Unpaid invoices, Udyam records, delivery proof, buyer objections, MSEFC readiness and delayed-payment enquiry preparation for Patna-linked MSME matters.</p>
</article>

<article class="info-item">
  <h2><a href="services/rera-lawyer-patna.html">RERA Lawyer in Patna</a></h2>
  <p>Delayed possession, refund, interest, builder communications, allotment papers and payment-proof preparation for Patna and Bihar-linked RERA disputes.</p>
</article>

<article class="info-item">
  <h2><a href="services/commercial-recovery-lawyer-bihar.html">Commercial Recovery Lawyer in Bihar</a></h2>
  <p>Unpaid invoices, contract disputes, ledger records, notices, limitation and business-recovery preparation for Bihar-linked commercial matters.</p>
</article>
```

Purpose:

This improves discovery and topical linking from the practice overview to the new high-intent service pages.

Validation:

- Confirm every new link opens the correct service page.
- Confirm the Focused Search Pages layout remains stable on desktop and mobile.
- Confirm no navigation, footer or existing practice links are disturbed.

Suggested commit message:

```text
Link new service pages from practice overview
```

### 2. Update `legal-updates.html` with new articles

Status: Pending

Reason for handoff:

`legal-updates.html` is an existing public index page and is better updated locally by Codex using a patch edit.

Required change:

Add cards/entries for these new articles under the legal updates / latest articles section, following the existing page style:

- `updates/msme-45-days-payment-rule.html`
  - Title: `MSME 45-Day Payment Rule`
  - Summary: `Documents, due dates, buyer objections and MSEFC-readiness points for MSME delayed-payment disputes.`

- `updates/section-138-cheque-bounce-limitation.html`
  - Title: `Section 138 Cheque Bounce Limitation`
  - Summary: `Cheque date, return memo, demand notice, delivery proof and filing-date preparation for NI Act matters.`

- `updates/rera-delayed-possession-bihar.html`
  - Title: `RERA Delayed Possession in Bihar`
  - Summary: `Project timeline, allotment papers, payment proof and refund/interest preparation for delayed possession disputes.`

- `updates/commercial-suit-documents-checklist.html`
  - Title: `Commercial Suit Documents Checklist`
  - Summary: `Contracts, invoices, ledger records, notices, admissions, limitation and forum-preparation checklist for business recovery.`

- `updates/arbitration-notice-before-claim.html`
  - Title: `Arbitration Notice Before Claim`
  - Summary: `Arbitration clause, invocation notice, appointment procedure, limitation and claim-preparation checklist.`

- `updates/property-injunction-suit-documents.html`
  - Title: `Property Injunction Suit Documents`
  - Summary: `Title papers, possession proof, threat records, photographs and urgent relief preparation for property disputes.`

- `updates/section-34-arbitration-award-challenge.html`
  - Title: `Section 34 Arbitration Award Challenge`
  - Summary: `Award copy, receipt date, arbitration record, grounds, limitation and post-award document checklist.`

Purpose:

This helps Google and visitors discover the newly created update articles from the main insights hub.

Validation:

- Confirm each card opens the correct article.
- Confirm the page remains readable on mobile.
- Confirm no existing article card is removed unless intentionally reorganized.

Suggested commit message:

```text
List new SEO articles on legal updates page
```

### 3. Fix homepage Property & Civil Suits card link

Status: Pending

Issue:

The homepage `Property & Civil Suits` practice card should link to:

```text
practice/property-civil-suits.html
```

If it currently points to `practice/rera-property.html`, change it to the correct property/civil practice page.

Purpose:

This fixes the internal-link path for the property/civil content cluster.

Validation:

- Confirm homepage Property & Civil Suits card opens `practice/property-civil-suits.html`.
- Confirm other practice cards still open their correct pages.

Suggested commit message:

```text
Fix homepage property civil practice link
```

### 4. Add contextual links from practice pages

Status: Pending

Required change:

Add relevant contextual links from the six practice pages to the new service pages and update articles.

Suggested mapping:

- `practice/msme-disputes.html`
  - Link to `../services/msme-recovery-lawyer-patna.html`
  - Link to `../updates/msme-45-days-payment-rule.html`

- `practice/rera-property.html`
  - Link to `../services/rera-lawyer-patna.html`
  - Link to `../updates/rera-delayed-possession-bihar.html`

- `practice/commercial-recovery.html`
  - Link to `../services/commercial-recovery-lawyer-bihar.html`
  - Link to `../updates/commercial-suit-documents-checklist.html`

- `practice/arbitration.html`
  - Link to `../updates/arbitration-notice-before-claim.html`
  - Link to `../updates/section-34-arbitration-award-challenge.html`

- `practice/property-civil-suits.html`
  - Link to `../services/property-dispute-lawyer-patna.html`
  - Link to `../updates/property-injunction-suit-documents.html`

- `practice/cheque-bounce.html`
  - Link to `../updates/section-138-cheque-bounce-limitation.html`

Purpose:

This strengthens topical clusters and helps Google connect practice pages, service pages and legal update articles.

Validation:

- Confirm all relative paths work from the `practice/` folder.
- Confirm each page remains visually stable.
- Confirm no existing CTA or disclaimer language is removed.

Suggested commit message:

```text
Add contextual links across practice pages
```

### 5. Add `services/civil-litigation-lawyer-patna.html`

Status: Pending

Reason for handoff:

A direct connector attempt to create this service page was blocked. Codex should create it locally, then update `sitemap.xml`.

Page path:

```text
services/civil-litigation-lawyer-patna.html
```

SEO direction:

- Title: `Civil Litigation Lawyer in Patna | Civil Suit Advocate`
- Meta description: `Information page for civil litigation in Patna: injunction, declaration, partition, possession, specific performance, document checklist, limitation and enquiry preparation.`
- Canonical: `https://chambersofak.in/services/civil-litigation-lawyer-patna.html`

Suggested sections:

- High-intent hero for civil litigation in Patna.
- When this page helps.
- Patna civil litigation focus.
- Documents to keep ready.
- Issues to assess.
- First enquiry format.
- FAQ.
- Related pages.
- WhatsApp and case-enquiry CTAs.
- Informational / non-solicitation note.

Suggested internal links:

- `../practice/property-civil-suits.html`
- `property-dispute-lawyer-patna.html`
- `../document-checklists.html`
- `../case-enquiry.html`
- `../courts.html`

After creating the page, add this URL to `sitemap.xml`:

```text
https://chambersofak.in/services/civil-litigation-lawyer-patna.html
```

Suggested commit message:

```text
Add civil litigation lawyer Patna service page
```

### 6. Update `docs/SEO_GROWTH_AGENDA.md` progress

Status: Pending

Reason for handoff:

ChatGPT attempted to update `docs/SEO_GROWTH_AGENDA.md`, but the large file replacement was blocked by the tool safety layer.

Required progress updates:

Mark completed or in progress items based on the latest repository state:

- `case-enquiry.html` upgrade: Done.
- `services/property-dispute-lawyer-patna.html`: Done.
- `services/msme-recovery-lawyer-patna.html`: Done.
- `services/rera-lawyer-patna.html`: Done.
- `services/commercial-recovery-lawyer-bihar.html`: Done.
- `updates/msme-45-days-payment-rule.html`: Done.
- `updates/section-138-cheque-bounce-limitation.html`: Done.
- `updates/rera-delayed-possession-bihar.html`: Done.
- `updates/commercial-suit-documents-checklist.html`: Done.
- `updates/arbitration-notice-before-claim.html`: Done.
- `updates/property-injunction-suit-documents.html`: Done.
- `updates/section-34-arbitration-award-challenge.html`: Done.
- `courts.html` expansion: Done.
- `sitemap.xml` updates: Done for all created URLs.

Also add progress-log entries for these completed changes, and reference:

```text
docs/seo/SEO_CONTENT_BATCH_2026-05-05.md
```

Suggested commit message:

```text
Update SEO growth agenda progress
```

## Completed Handoff Items

No handoff items have been completed yet.
