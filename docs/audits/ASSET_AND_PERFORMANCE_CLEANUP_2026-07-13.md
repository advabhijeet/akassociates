# Asset and Performance Cleanup — 13 July 2026

## Scope

Cleanup Batch 3 optimized active article thumbnails and reduced redundant frontend work without changing public URLs or article content.

## Active thumbnail migration

- Registry items: 30
- Unique PNG sources migrated: 25
- Active source PNG bytes before deletion: recorded by the local PowerShell execution log and backup package.
- Active JPEG bytes after conversion: 4891603
- Public target: 1200 x 675 JPEG, maximum 450 KiB per active file.

The original active PNG files and verified deletion candidates were backed up locally to the user's Downloads folder before repository deletion. Git history also retains prior committed versions.

## Runtime changes

- Static and dynamic Insights cards now use native `<img loading="lazy" decoding="async">` elements.
- The duplicate legacy Homepage registry renderer was removed.
- The Citadel Latest Insights module remains the single dynamic owner for Homepage latest-card rendering.
- The public CSS/JS cache key is `site-20260713-b3`.
- Global Shell clock updates now run once per minute and omit seconds.
- Thumbnail frame module advanced to v7.
- Global Shell loader advanced to v3.

## Deletion results

Deleted verified candidates:

- `assets/img/citadel/citadel-thumb-rera-promoter-reply-v1.png`
- `assets/img/citadel/citadel-thumb-rera-promoter-reply-v2.png`
- `assets/img/citadel/citadel-thumb-pmla-bnss-cognizance.png`
- `assets/img/citadel/citadel-thumb-uapa-bail-2026.png`
- `assets/img/citadel/citadel-thumb-uapa-bail-2026-bw.png`
- `assets/img/citadel/citadel-thumb-property-title-search-2026.png`
- `assets/img/citadel/citadel-thumb-property-title-search-editorial-2026.png`
- `assets/img/citadel/citadel-thumb-sabarimala-2026.png`
- `assets/img/citadel/citadel-thumb-sabarimala-2026-editorial.png`
- `assets/img/citadel/citadel-thumb-sabarimala-2026.svg`
- `assets/img/citadel/citadel-thumb-uapa-bail-2026.svg`
- `assets/img/citadel/citadel-thumb-pmla-bnss-cognizance.svg`
- `assets/img/citadel/citadel-thumb-section34-limitation.svg`
- `assets/img/citadel/citadel-thumb-sarfaesi-auction-sale-editorial-v3.png`
- `assets/img/citadel/citadel-thumb-summary-judgment-commercial-suits-editorial-bw-v3.png`
- `assets/img/citadel/citadel-thumb-non-reportable-judgments-editorial-bw-v3.png`
- `assets/img/citadel/citadel-thumb-arbitration-notice-before-claim-editorial-bw.png`
- `assets/img/citadel/citadel-thumb-arbitration-notice-before-claim-bw.png`
- `assets/img/brand-favicon-current.png`
- `assets/img/favicon.svg`
- `assets/img/citadel/citadel-legal-documents.webp`

Duplicate favicon deleted: yes.

Candidates retained because a runtime reference was detected:

- None.

## Validation

Required:

```powershell
node tools/validate-public-assets.js
node tools/validate-seo-sitewide.js
node tools/validate-documentation.js
node tools/validate-article-encoding.js
node tools/validate-insights-registry.js --strict
node tools/sync-static-insight-cards.js --check
node tools/audit-articles-structure.js --strict
git diff --check
```
