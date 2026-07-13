# Chambers of AK — Master Roadmap

Last consolidated: **13 July 2026**

This is the single active roadmap for the Chambers of AK public website, the Citadel-derived frontend, article publishing, SEO operations and future product work.

## Product boundaries

### Chambers of AK public website

**Status:** production.

The repository owns the public static website, Chambers-specific branding and content, legal articles, practice/service pages, enquiry flows, discovery files, analytics integrations and compliance pages.

### Chambers Citadel v1

**Status:** production baseline.

This is the current Citadel-derived Chambers implementation. It includes the active visual theme, light/dark modes, Global Shell, article modules, Insights modules and page-template modules.

### Citadel of Kang theme pack

**Status:** partially implemented inside this repository; standalone extraction paused.

Reusable modules are being proven in production, but the repository still mixes active Chambers-specific code, reusable candidates and dormant theme-lab files. Extraction resumes only after cleanup and module-manifest work.

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
3. Chambers Citadel light/dark visual theme.
4. Global Shell, desktop topbar, mobile drawer and grouped footer.
5. Article Index, reading progress behavior and Article Footer.
6. Registry-driven Homepage and Legal Insights sections.
7. Crawlable static Insights snapshots.
8. Blog filtering, category/tag views, search and pagination.
9. Contact and structured enquiry flows.
10. Practice, service and general-content semantic modules.
11. Article thumbnail frame and featured-image handling.
12. Central registry, sitemap and full RSS parity.
13. Sitewide SEO, registry, encoding, structure and deployment validators.
14. Branded custom 404 page.
15. Thirty published articles.

## Completed phases

### Phase 0 — Initial repository/documentation organization

Completed in May 2026. Older maintenance plans were moved to the superseded archive and an active documentation index was created.

### Phase 1 — Citadel Production Finalization v1

Completed. Production modules, responsive behavior, light/dark mode, Global Shell, article modules, Insights modules and enquiry modules were reconciled and smoke-tested.

### Phase 2 — Thumbnail Frame Consistency v1

Completed. Article and card frames use a consistent 16:9 treatment and approved artwork remains visible without destructive cropping.

### Phase 3 — Article Structure Audit v1

Completed as a repeatable audit tool. The historic batch labels inside the audit tool still require cleanup during a later tooling refinement.

### Phase 4/4.5 — Article and SEO stabilization

Substantially completed:

- article metadata/social images normalized;
- registry, sitemap and RSS brought into parity;
- static non-JavaScript Insights links generated;
- sitewide SEO validator added;
- Article 1-5 publishing run completed;
- structured-data image parity added;
- service-page schema validation repaired.

One known article-structure item remains: the promoter-reply RERA article needs a formal References / Sources section.

### Repository Cleanup Batch 1 — Deployment Boundary and Validator Integrity

Completed on 13 July 2026.

- internal documents, previews and tools removed from the public Pages artifact;
- custom 404 added;
- service-schema validator defect fixed;
- sitewide SEO validation added to CI;
- two legacy BlogPosting image mismatches corrected.

## Current phase

### Repository Cleanup Batch 2 — Documentation Consolidation

Goals:

1. update repository and documentation entry points;
2. reconcile roadmap and theme status with production;
3. repair stale documentation paths;
4. remove control-character/mojibake defects;
5. archive completed status and monitoring snapshots;
6. add documentation validation to CI.

Completion condition:

```text
Active documentation paths resolve.
No control-character or known mojibake defect remains.
Theme READMEs describe production reality.
Historical status snapshots are outside active planning.
Documentation validation passes locally and in CI.
```

## Next phases

### Repository Cleanup Batch 3 — Asset and Performance Cleanup

1. verify and remove unreferenced image variants;
2. remove duplicate favicon assets;
3. generate optimized WebP/JPEG article derivatives;
4. replace CSS-background card media with lazy image elements where practical;
5. add image byte-size validation;
6. normalize CSS/JS cache keys;
7. remove duplicate Homepage rendering responsibility;
8. reduce unnecessary continuous timers and late font discovery.

### Repository Cleanup Batch 4 — Service-Page Consolidation

1. review high-similarity location-page clusters;
2. retain separate pages only where jurisdiction, forum, documents or procedure are genuinely distinct;
3. consolidate or redirect weak variants;
4. update internal links, sitemap and schema;
5. prohibit new thin location pages.

### Repository Cleanup Batch 5 — Citadel Theme Restart

1. tag the current baseline as `Chambers Citadel v1`;
2. create an active module manifest;
3. separate production modules from theme-lab code;
4. remove confirmed duplicate legacy implementations;
5. split the monolithic bootstrap into explicit modules;
6. normalize public configuration and cache versioning;
7. resume standalone Citadel extraction.

### Content resumption checkpoint

After Batches 2-5:

1. run Search Console/indexing review;
2. confirm service-page consolidation;
3. resume the controlled Article 6-10 run;
4. pause after Article 10 for indexing, cannibalisation and internal-link analysis.

## SEO and reachability track

After cleanup:

1. inspect indexed versus submitted URLs;
2. request removal/re-crawl of formerly exposed internal-document URLs where needed;
3. monitor 404 and coverage reports;
4. strengthen practice/article topical clusters;
5. improve source presentation and legal-review dates;
6. assess Core Web Vitals after image optimization;
7. avoid duplicate service/location intent.

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
- sitemap/feed generation;
- preview;
- controlled patch export.

### Authenticated manager

Only after proper GitHub OAuth/GitHub App or protected backend architecture is selected.

### Standalone theme repository

Extract only reusable, neutral modules after production code is separated from Chambers-specific values.

### Client Portal

Separate project after security, data model and operational requirements are defined.

## Standing principles

1. Public URLs remain stable unless a redirect/consolidation plan exists.
2. Internal documentation and tools remain outside the public artifact.
3. No frontend-only fake security.
4. Public configuration contains no credentials or private matter data.
5. Production behavior takes precedence over obsolete documentation.
6. Reusable modules are preferred over page-by-page patches.
7. Legal accuracy and source quality take precedence over publishing volume.
8. Article thumbnails remain topic-specific, editorial and logo-free.
9. The fallback theme remains until a documented rollback baseline exists.
10. Every meaningful change is validated, committed separately and recorded in `CHANGELOG.md`.
