# Article Structure + Thumbnail Audit v1

Last created: 2026-06-09

Issue: Phase 3 - Article Structure + Thumbnail Audit v1

## Purpose

Audit all known `updates/*.html` article pages and classify what needs migration or cleanup before Phase 4 article cleanup batches begin.

This is an audit/classification document only. It should not be treated as an authorization to patch article content, metadata, sitemap, feed, canonical URLs or Phase 4.5 SEO stabilization items.

## Source Basis

This initial audit was prepared from repository code search results and current roadmap/documentation state, with emphasis on:

- article file discovery under `updates/`;
- presence of `article.article-body` and Citadel article hooks;
- presence of `data-article-category` and `data-article-tags`;
- presence of inline `.article-featured-figure`;
- presence of `BlogPosting` and `BreadcrumbList` markers;
- presence of visible `Last updated on` marker;
- visible public/internal-note search markers;
- SVG social-image marker search;
- known Batch 6 pending list from the master roadmap.

A later local script/parser audit should verify every line-level finding before mass patching.

## Article Inventory Identified

The following article files were identified from repository search results:

```text
updates/arbitration-clause-checklist.html
updates/arbitration-notice-before-claim.html
updates/bihar-rera-complaint.html
updates/cheque-bounce-30-days.html
updates/cheque-bounce-defence-after-summons.html
updates/cheque-bounce-notice-limitation.html
updates/commercial-recovery-before-suit.html
updates/commercial-suit-documents-checklist.html
updates/msme-45-days-payment-rule.html
updates/msme-delayed-payment.html
updates/msme-documents-checklist.html
updates/msme-facilitation-council-process.html
updates/non-reportable-judgments-online-publication-case-brief.html
updates/pmla-complaint-pre-cognizance-hearing-bnss.html
updates/property-injunction-suit-documents.html
updates/property-title-search-before-purchase-india.html
updates/rera-delayed-possession-bihar.html
updates/rera-refund-interest-delayed-possession.html
updates/sabarimala-case-9-judge-bench-2026.html
updates/sarfaesi-auction-sale-challenge-documents.html
updates/section-34-arbitration-award-challenge.html
updates/section-34-arbitration-limitation-3-months-30-days.html
updates/section-138-cheque-bounce-limitation.html
updates/summary-judgment-commercial-suits-order-xiii-a.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

Total identified article files: 25.

## High-Level Findings

### 1. Current Citadel article structure appears limited to a small article set

Search for `data-article-category` and `data-article-tags` returned only the current Citadel-era article set plus docs, namely:

```text
updates/pmla-complaint-pre-cognizance-hearing-bnss.html
updates/sabarimala-case-9-judge-bench-2026.html
updates/section-34-arbitration-limitation-3-months-30-days.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

These should be treated as the current/reference structure group for Phase 4 migration planning.

### 2. Inline article featured figures appear limited to the same current structure group

Search for `.article-featured-figure` returned:

```text
updates/pmla-complaint-pre-cognizance-hearing-bnss.html
updates/sabarimala-case-9-judge-bench-2026.html
updates/section-34-arbitration-limitation-3-months-30-days.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

Phase 2 added a registry-driven featured-image module, so older articles can receive featured-image display at runtime. Phase 3 should still record which pages lack inline featured-image markup for future static/template normalization.

### 3. Last-updated marker is missing from most older articles

Search for visible `Last updated on` returned only:

```text
updates/pmla-complaint-pre-cognizance-hearing-bnss.html
updates/sabarimala-case-9-judge-bench-2026.html
updates/section-34-arbitration-limitation-3-months-30-days.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

Most older articles should therefore be classified for last-updated line normalization.

### 4. Public/internal-note search did not find obvious article-page offenders

Search for internal status markers such as `research-status`, `article-status`, `publication-status`, and `internal note` returned only documentation/template references. No obvious article-page internal status blocks were found in this initial code-search pass.

### 5. SVG social-image search did not return article pages

Search for SVG markers alongside `og:image` / `twitter:image` did not return `updates/*.html` article pages. No obvious current SVG social-image issue was detected in this initial pass.

### 6. Batch 6 pending articles remain the highest-priority metadata/thumbnail group

The master roadmap identifies the known Batch 6 pending items as:

```text
updates/cheque-bounce-defence-after-summons.html
updates/commercial-recovery-before-suit.html
updates/rera-refund-interest-delayed-possession.html
updates/arbitration-clause-checklist.html
updates/cheque-bounce-30-days.html
updates/cheque-bounce-notice-limitation.html
updates/msme-45-days-payment-rule.html
```

These should become the first Phase 4 cleanup batch unless a parser audit reveals a more urgent issue.

## Classification

### A. Clean / Current Structure Reference Group

These pages appear to have the current Citadel article hooks, inline featured-image figure, visible last-updated marker and modern article structure signals:

```text
updates/pmla-complaint-pre-cognizance-hearing-bnss.html
updates/sabarimala-case-9-judge-bench-2026.html
updates/section-34-arbitration-limitation-3-months-30-days.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

Recommended action:

```text
No broad migration required. Use as reference templates for older article migration. Only patch if parser audit finds a specific inconsistency.
```

### B. Needs Metadata / Social Thumbnail Fix - Batch 6 Priority

Known pending Batch 6 group:

```text
updates/arbitration-clause-checklist.html
updates/cheque-bounce-30-days.html
updates/cheque-bounce-defence-after-summons.html
updates/cheque-bounce-notice-limitation.html
updates/commercial-recovery-before-suit.html
updates/msme-45-days-payment-rule.html
updates/rera-refund-interest-delayed-possession.html
```

Likely required work:

```text
Confirm OG image.
Confirm Twitter/X image.
Confirm JSON-LD image.
Confirm registry thumbnail.
Confirm article:modified_time / dateModified.
Add or normalize visible last-updated marker.
Confirm article body structure and featured-image handling.
```

Recommended Phase 4 batch:

```text
Batch A/B combined candidate: metadata/social image plus featured-image normalization for Batch 6 articles.
```

### C. Needs Old-Structure Migration / Citadel Hook Normalization

These older articles were identified as article pages but were not returned in the `data-article-category`, `data-article-tags`, or inline featured-figure searches:

```text
updates/arbitration-notice-before-claim.html
updates/bihar-rera-complaint.html
updates/commercial-suit-documents-checklist.html
updates/msme-delayed-payment.html
updates/msme-documents-checklist.html
updates/msme-facilitation-council-process.html
updates/non-reportable-judgments-online-publication-case-brief.html
updates/property-injunction-suit-documents.html
updates/property-title-search-before-purchase-india.html
updates/rera-delayed-possession-bihar.html
updates/sarfaesi-auction-sale-challenge-documents.html
updates/section-34-arbitration-award-challenge.html
updates/section-138-cheque-bounce-limitation.html
updates/summary-judgment-commercial-suits-order-xiii-a.html
```

Likely required work:

```text
Confirm whether article.article-body exists.
Add/normalize data-article-category.
Add/normalize data-article-tags.
Confirm Article Index/Article Footer hooks.
Confirm featured-image runtime fallback works and decide whether static inline figure is required.
Add visible last-updated marker where missing.
Normalize references/disclaimer sequence.
```

Recommended Phase 4 batch:

```text
Batch C/D candidate: old-structure migration plus last-updated/references/disclaimer normalization.
```

### D. Needs JSON-LD / Breadcrumb Verification

Search results show many article pages include `BlogPosting` and `BreadcrumbList`, but the initial search was not sufficient to guarantee parity across all 25 pages.

Prioritize parser verification for:

```text
updates/arbitration-clause-checklist.html
updates/cheque-bounce-30-days.html
updates/cheque-bounce-defence-after-summons.html
updates/cheque-bounce-notice-limitation.html
updates/commercial-recovery-before-suit.html
updates/commercial-suit-documents-checklist.html
updates/msme-45-days-payment-rule.html
updates/property-injunction-suit-documents.html
updates/rera-delayed-possession-bihar.html
updates/rera-refund-interest-delayed-possession.html
updates/section-138-cheque-bounce-limitation.html
updates/section-34-arbitration-award-challenge.html
```

Required parser checks:

```text
BlogPosting present exactly once.
BreadcrumbList present exactly once.
headline matches article title or approved SEO title.
datePublished present.
dateModified present.
image present and points to current approved raster thumbnail.
author/publisher present and consistent.
mainEntityOfPage points to canonical article URL.
```

### E. Needs Last-Updated / References / Disclaimer Normalization

Only the four current-structure reference pages were returned by visible `Last updated on` search. Treat all other identified articles as needing last-updated review unless manual/parser audit proves otherwise.

Likely priority group:

```text
All article files except:
updates/pmla-complaint-pre-cognizance-hearing-bnss.html
updates/sabarimala-case-9-judge-bench-2026.html
updates/section-34-arbitration-limitation-3-months-30-days.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

Required normalization:

```text
Visible Last updated on: DD/MM/YYYY at HH:MM marker.
References / Sources section after conclusion where sources are used.
Reader-facing legal disclaimer retained.
No CTA/enquiry block inside article body unless future policy changes.
```

### F. Encoding / Public Internal Notes

Initial search did not identify public internal status-note classes in `updates/*.html`.

Existing validation remains the source of truth for encoding:

```powershell
node tools/validate-article-encoding.js
```

Recommended Phase 3 follow-up:

```text
Run validator locally/GitHub Actions.
If failures appear, classify failed articles into a dedicated encoding cleanup batch before content migration.
```

## Recommended Phase 4 Batch Plan From This Audit

### Batch 4A - Batch 6 metadata/social/thumbnail normalization

Target:

```text
updates/arbitration-clause-checklist.html
updates/cheque-bounce-30-days.html
updates/cheque-bounce-defence-after-summons.html
updates/cheque-bounce-notice-limitation.html
updates/commercial-recovery-before-suit.html
updates/msme-45-days-payment-rule.html
updates/rera-refund-interest-delayed-possession.html
```

Scope:

```text
OG/Twitter/JSON-LD image parity.
Registry thumbnail parity.
Modified-date parity.
Featured-image runtime/static parity.
```

### Batch 4B - Citadel hook and old-structure migration

Target:

```text
updates/arbitration-notice-before-claim.html
updates/bihar-rera-complaint.html
updates/commercial-suit-documents-checklist.html
updates/msme-delayed-payment.html
updates/msme-documents-checklist.html
updates/msme-facilitation-council-process.html
updates/non-reportable-judgments-online-publication-case-brief.html
updates/property-injunction-suit-documents.html
updates/property-title-search-before-purchase-india.html
updates/rera-delayed-possession-bihar.html
updates/sarfaesi-auction-sale-challenge-documents.html
updates/section-34-arbitration-award-challenge.html
updates/section-138-cheque-bounce-limitation.html
updates/summary-judgment-commercial-suits-order-xiii-a.html
```

Scope:

```text
article.article-body / equivalent container parity.
data-article-category and data-article-tags.
Article Index and Article Footer hooks.
Static/inline featured-image placement decision.
```

### Batch 4C - Last-updated / references / disclaimer normalization

Target:

```text
All older articles not in the current-structure reference group.
```

Scope:

```text
Visible last-updated marker.
References / Sources position.
Reader-facing disclaimer.
No public internal implementation notes.
```

### Batch 4D - JSON-LD and breadcrumb parity

Target:

```text
All articles after Batch 4A and Batch 4B, verified by parser.
```

Scope:

```text
BlogPosting.
BreadcrumbList.
Canonical/mainEntityOfPage parity.
Image parity.
Modified-date parity.
```

## Phase 3 Follow-Up: Parser Audit Needed

This document should be followed by a script-based audit before broad patching.

Recommended script:

```text
tools/audit-articles-structure.js
```

Suggested output:

```text
article file
registry entry present/missing
article.article-body present/missing
data-article-category present/missing
data-article-tags present/missing
article-featured-figure present/missing
og:image path
twitter:image path
JSON-LD image path(s)
BlogPosting count
BreadcrumbList count
Last updated marker present/missing
References/Sources marker present/missing
Disclaimer marker present/missing
internal/public note markers present/missing
mojibake/encoding marker present/missing
recommended batch
```

## Phase 3 Status

- [x] All currently discovered article files under `updates/` identified from repository search.
- [x] Initial structure/thumbnail classification completed.
- [x] Known Batch 6 pending group carried forward.
- [x] No obvious SVG social-image article issue found in initial search.
- [x] No obvious public internal-status article block found in initial search.
- [ ] Parser/local validation still required before mass patching.
- [ ] Registry-to-file parity still requires machine-check output.
- [ ] Phase 4 cleanup batches should begin only after parser audit confirms or refines this classification.
