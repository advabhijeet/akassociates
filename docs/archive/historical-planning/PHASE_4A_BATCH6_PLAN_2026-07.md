# Phase 4A Batch 6 Cleanup Plan

Status: active planning

Source audit: `docs/maintenance/audits/ARTICLE_STRUCTURE_THUMBNAIL_AUDIT_REPORT.generated.md`

## Target files

```text
updates/arbitration-clause-checklist.html
updates/cheque-bounce-30-days.html
updates/cheque-bounce-defence-after-summons.html
updates/cheque-bounce-notice-limitation.html
updates/commercial-recovery-before-suit.html
updates/msme-45-days-payment-rule.html
updates/rera-refund-interest-delayed-possession.html
```

## Planned fixes

- Registry thumbnail parity.
- OG/Twitter image parity.
- JSON-LD image parity.
- Article data attributes.
- Visible last-updated marker.
- References or sources marker.
- Featured-image consistency.

## Boundaries

No sitemap, feed or canonical work in this batch.
No thumbnail artwork regeneration in this batch.

## Validation

```bash
node tools/audit-articles-structure.js --write
node tools/audit-articles-structure.js --strict
node tools/validate-article-encoding.js
node tools/validate-insights-registry.js --strict
git diff --check
```
