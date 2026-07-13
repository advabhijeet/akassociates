# Chambers of AK — Master Roadmap

Last consolidated: **13 July 2026**

This is the single active roadmap for the Chambers of AK public website, the Chambers Citadel production frontend, article publishing, SEO operations and future product work.

## Product boundaries

### Chambers of AK public website

**Status:** production.

The repository owns the public static website, Chambers-specific branding and content, legal articles, practice and service pages, enquiry flows, discovery files, analytics integrations and compliance pages.

### Chambers Citadel v1

**Status:** production baseline.

The current Citadel-derived Chambers implementation includes the active visual theme, light and dark modes, Global Shell, article modules, Insights modules and semantic page-template modules.

### Citadel of Kang theme pack

**Status:** partially implemented inside this repository; standalone extraction paused.

Reusable modules are being proven in production, but the repository still mixes active Chambers-specific code, reusable candidates and dormant theme-lab files. Standalone extraction resumes only after repository cleanup and module-manifest work.

### Citadel Manager / Website CMS

**Status:** planned; not built.

A real manager requires authenticated local or server-side tooling. Do not create a public static admin page protected only by frontend JavaScript.

### Chambers Client Portal

**Status:** future separate secure product.

It requires authentication, authorization, secure storage, audit logging and private matter/document controls. It is not part of the public theme.

## Production baseline

The following are live:

1. Custom-domain GitHub Pages deployment.
2. Controlled deployment boundary through `_config.yml`.
3. Chambers Citadel light and dark visual theme.
4. Global Shell, desktop topbar, mobile drawer and grouped footer.
5. Article Index, reading-progress behavior and Article Footer.
6. Registry-driven Homepage and Legal Insights sections.
7. Crawlable static Insights snapshots.
8. Blog filtering, category and tag views, search and pagination.
9. Contact and structured enquiry flows.
10. Practice, service and general-content semantic modules.
11. Article thumbnail frame and featured-image handling.
12. Central registry, sitemap and full RSS parity.
13. Sitewide SEO, registry, encoding, structure, documentation, deployment and public-asset validators.
14. Branded custom 404 page.
15. Thirty published articles.
16. Optimized JPEG article-thumbnail delivery with native lazy card images.

## Completed phases

### Phase 0 — Initial repository and documentation organization

Completed in May 2026. Older maintenance plans were moved to the superseded archive and an active documentation index was created.

### Phase 1 — Citadel Production Finalization v1

Completed. Production modules, responsive behavior, light and dark mode, Global Shell, article modules, Insights modules and enquiry modules were reconciled and smoke-tested.

### Phase 2 — Thumbnail Frame Consistency v1

Completed. Article and card frames use a consistent 16:9 treatment and approved artwork remains visible without destructive cropping.

### Phase 3 — Article Structure Audit v1

Completed as a repeatable audit tool. Historic hardcoded batch labels inside the audit tool still require cleanup during a later tooling refinement.

### Phase 4/4.5 — Article and SEO stabilization

Substantially completed:

- article metadata and social images normalized;
- registry, sitemap and RSS brought into parity;
- static non-JavaScript Insights links generated;
- sitewide SEO validator added;
- Article 1–5 publishing run completed;
- structured-data image parity added;
- service-page schema validation repaired.

One known article-structure item remains: the promoter-reply RERA article needs a formal References / Sources section.

### Repository Cleanup Batch 1 — Deployment Boundary and Validator Integrity

Completed on 13 July 2026.

- internal documents, previews and tools removed from the public Pages artifact;
- custom 404 page added;
- service-schema validator defect fixed;
- sitewide SEO validation added to CI;
- two legacy `BlogPosting.image` mismatches corrected.

### Repository Cleanup Batch 2 — Documentation Consolidation

Completed on 13 July 2026.

- active documentation entry points and roadmap reconciled;
- stale documentation paths repaired;
- completed status and monitoring notes archived;
- theme documentation separated into production and theme-lab status;
- documentation validation added to CI.

### Repository Cleanup Batch 3 — Asset and Performance Cleanup

Completed on 13 July 2026.

- 25 active 1200 × 675 article-thumbnail PNG files converted to optimized JPEG derivatives;
- active thumbnail payload reduced from approximately 32.99 MB to 4.89 MB;
- original source images backed up locally before repository deletion;
- verified unreferenced image variants removed;
- byte-identical duplicate favicon removed;
- static and dynamic card thumbnails changed from CSS backgrounds to native lazy image elements;
- duplicate Homepage registry renderer removed;
- shared public CSS and JavaScript cache keys normalized;
- Global Shell clock reduced from per-second to per-minute updates;
- public-asset validation added to CI.

## Current phase

### Repository Cleanup Batch 4 — Service-Page Consolidation

Goals:

1. review high-similarity location-page clusters;
2. retain separate pages only where jurisdiction, forum, documents or procedure are genuinely distinct;
3. consolidate, redirect or noindex weaker variants;
4. update internal links, sitemap and structured data;
5. prohibit new thin location pages;
6. preserve stable public URLs through explicit redirect decisions.

Priority clusters:

- cheque-bounce Bihar and Delhi NCR;
- RERA Noida and Gurugram;
- property-dispute Bihar and Patna;
- civil-litigation Bihar and Patna.

Completion condition:

```text
Every retained location page has materially distinct local value.
Consolidated pages have complete redirect and internal-link handling.
Sitemap and canonical signals reflect the final structure.
No new thin location-page template is allowed.
All validators pass.
```

## Next phases

### Repository Cleanup Batch 5 — Citadel Theme Restart

1. tag the current baseline as `Chambers Citadel v1`;
2. create an active module manifest;
3. separate production modules from theme-lab code;
4. remove confirmed duplicate legacy implementations;
5. split the monolithic bootstrap into explicit modules;
6. normalize public configuration and module versioning;
7. resume standalone Citadel extraction.

### Content resumption checkpoint

After Batches 4 and 5:

1. run Search Console and indexing review;
2. confirm service-page consolidation;
3. resume the controlled Article 6–10 run;
4. pause after Article 10 for indexing, cannibalisation and internal-link analysis.

## SEO and reachability track

After cleanup:

1. inspect indexed versus submitted URLs;
2. request removal or recrawl of formerly exposed internal-document URLs where needed;
3. monitor 404 and coverage reports;
4. strengthen practice and article topical clusters;
5. improve primary-source presentation and legal-review dates;
6. assess Core Web Vitals after image optimization;
7. avoid duplicate service and location intent.

## Conversion and enquiry track

Future work:

- practice-specific enquiry variants;
- clearer post-submission next steps;
- direct form-send analytics event;
- downloadable checklists only where legally and operationally appropriate;
- accessibility and error-state review.

## Future product track

### Config-driven Citadel foundation

Move public-safe identity, navigation, footer, social and module settings into an explicit configuration layer without exposing secrets.

### Local Admin Generator

Potential first management tool:

- local article form;
- metadata and registry generation;
- thumbnail selection;
- sitemap and feed generation;
- preview;
- controlled patch export.

### Authenticated manager

Proceed only after proper GitHub OAuth, GitHub App or protected backend architecture is selected.

### Standalone theme repository

Extract only reusable, neutral modules after production code is separated from Chambers-specific values.

### Client Portal

Treat as a separate project after security, data-model and operational requirements are defined.

## Standing principles

1. Public URLs remain stable unless a redirect or consolidation plan exists.
2. Internal documentation and tools remain outside the public artifact.
3. No frontend-only fake security.
4. Public configuration contains no credentials or private matter data.
5. Production behavior takes precedence over obsolete documentation.
6. Reusable modules are preferred over page-by-page patches.
7. Legal accuracy and source quality take precedence over publishing volume.
8. Article thumbnails remain topic-specific, editorial and logo-free.
9. The fallback theme remains until a documented rollback baseline exists.
10. Every meaningful change is validated, committed separately and recorded in `CHANGELOG.md`.
