# Codex Handoff

This file is the single handoff document for tasks that ChatGPT cannot safely complete through the GitHub connector. Keep all blocked or Codex-only instructions here instead of creating multiple temporary instruction files.

## Usage Rule

Use this document only when a repository change cannot be completed directly through ChatGPT's GitHub connector, usually because a tool safety layer blocks a large replacement or a task requires local validation.

When Codex completes an item:

1. Apply the change locally.
2. Run the relevant checks.
3. Commit with a clear message.
4. Update this file by moving the item to the completed section or marking it done.
5. Update `docs/SEO_GROWTH_AGENDA.md` if the work affects SEO agenda progress.

## Active Handoff Items

### 1. Link new property dispute service page from `practice.html`

Status: Pending

Reason for handoff:

ChatGPT successfully created `services/property-dispute-lawyer-patna.html` and updated `sitemap.xml`, but the attempt to update `practice.html` through the connector was blocked by the tool safety layer during a large file replacement.

Required change:

In `practice.html`, under the `Focused Search Pages` section, add a new `info-item` after the existing arbitration service page item.

Add this card:

```html
<article class="info-item">
  <h2><a href="services/property-dispute-lawyer-patna.html">Property Dispute Lawyer in Patna</a></h2>
  <p>Title papers, possession disputes, injunctions, partition, specific performance, declaration suits and document preparation for Patna-linked property matters.</p>
</article>
```

Purpose:

This creates an internal link from the main practice overview to the new high-intent service page so Google can discover and understand the property-dispute content cluster.

Validation:

- Confirm the link opens `services/property-dispute-lawyer-patna.html`.
- Confirm desktop and mobile layout remains stable.
- Confirm no footer or navigation links are disturbed.

Suggested commit message:

```text
Link property dispute service page from practice overview
```

### 2. Fix homepage Property & Civil Suits card link

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

### 3. Update SEO growth agenda progress

Status: Pending

Reason for handoff:

ChatGPT attempted to update `docs/SEO_GROWTH_AGENDA.md`, but the large file replacement was blocked by the tool safety layer.

Required updates in `docs/SEO_GROWTH_AGENDA.md`:

Mark these as completed:

- Upgrade `case-enquiry.html`.
- Add `services/property-dispute-lawyer-patna.html`.
- Update `sitemap.xml` for the new property-dispute service page.

Add progress log entries:

```markdown
| 2026-05-05 | Upgraded `case-enquiry.html`. | Done | Added structured matter-specific enquiry formats, improved metadata, FAQ JSON-LD, confidentiality caution, and stronger CTA section. |
| 2026-05-05 | Added `services/property-dispute-lawyer-patna.html`. | Done | Created Patna-focused property dispute service page with FAQ JSON-LD, document checklist, local intent, internal links, and CTAs. |
| 2026-05-05 | Updated `sitemap.xml`. | Done | Added `https://chambersofak.in/services/property-dispute-lawyer-patna.html`. |
```

Suggested commit message:

```text
Update SEO agenda progress
```

## Completed Handoff Items

No handoff items have been completed yet.
