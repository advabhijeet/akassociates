# Service-Page Consolidation — 13 July 2026

## Decision

The cleanup uses a conservative consolidation model:

- preserve strong local and authority-specific pages;
- consolidate only the three state/city pairs that duplicated the same service intent;
- retain old URLs as noindex redirect stubs rather than deleting them;
- keep Noida and Gurugram RERA pages separate because they involve different state authorities and portal records.

## Consolidated routes

| Redirect source | Retained canonical |
|---|---|
| `services/cheque-bounce-lawyer-bihar.html` | `services/cheque-bounce-lawyer-patna.html` |
| `services/property-dispute-lawyer-bihar.html` | `services/property-dispute-lawyer-patna.html` |
| `services/civil-litigation-lawyer-bihar.html` | `services/civil-litigation-lawyer-patna.html` |

The retained pages now expressly cover Patna and Bihar and contain distinct state-level enquiry guidance.

## Pages retained separately

- `services/cheque-bounce-lawyer-delhi-ncr.html`
- `services/rera-lawyer-noida.html`
- `services/rera-lawyer-gurugram.html`
- `services/rera-lawyer-bihar-up-delhi-ncr.html`

The Noida page now points users to the official UP RERA portal and separates complaint, status, cause-list, conciliation and execution records.

The Gurugram page now identifies the distinct HRERA Gurugram authority and separates it from HRERA Panchkula.

## SEO controls

- redirect sources are `noindex, follow`;
- each redirects and cross-canonicalizes to its retained page;
- redirect sources are removed from `sitemap.xml`;
- indexable internal pages no longer link to redirect sources;
- retained targets remain self-canonical and in the sitemap;
- visible “High Intent Search Page” labels were removed;
- `tools/validate-service-consolidation.js` enforces the final route map.

## Validation

```powershell
node tools/validate-service-consolidation.js
node tools/validate-seo-sitewide.js
node tools/validate-public-assets.js
node tools/validate-documentation.js
node tools/validate-deployment-boundary.js
node tools/validate-article-encoding.js
node tools/validate-insights-registry.js --strict
node tools/sync-static-insight-cards.js --check
node tools/audit-articles-structure.js --strict
git diff --check
```
