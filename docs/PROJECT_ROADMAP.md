# Chambers of AK — Master Roadmap

Last reconciled: **16 October 2026** (repository main at `ccdf7a0`; counts are code-level, not Search Console indexing results)

This is the single active roadmap for the Chambers of AK public website, the Chambers Citadel production frontend, article publishing, SEO operations and future product work.

## Product boundaries

### Chambers of AK public website

**Status:** production.

The repository owns the public static website, Chambers-specific branding and content, legal articles, practice and service pages, enquiry flows, discovery files, analytics integrations and compliance pages.

### Chambers Citadel v1

**Status:** production baseline.

The current Citadel-derived Chambers implementation includes the active visual theme, light and dark modes, Global Shell, article modules, Insights modules and semantic page-template modules.

### Citadel of Kang theme pack

**Status:** production configuration and runtime modules implemented inside Chambers; standalone theme packaging/extraction deferred.

Public-safe configuration, a production module manifest and runtime segmentation were completed during July cleanup. A neutral standalone release has **not** been approved or delivered; continue to keep theme-development work outside the production asset boundary.

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
15. Forty-eight published article entries in the registry as checked on 16 October 2026.
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

### Repository Cleanup Batch 4 — Service-Page Consolidation

Completed on 13 July 2026.

- consolidated three overlapping Bihar service pages into stronger Patna-and-Bihar canonical pages;
- preserved the former URLs as noindex redirect stubs;
- removed redirect sources from the sitemap and public internal-link graph;
- changed visible internal SEO labels to user-facing legal labels;
- differentiated Delhi NCR cheque-bounce preparation from Patna and Bihar;
- differentiated Noida/UP RERA and Gurugram/HRERA pages using authority-specific portal and record checks;
- added service-page consolidation validation to CI.

### Repository Cleanup Batch 5 — Citadel Theme Restart

Completed on 13 July 2026.

- tagged the pre-restart production baseline as `chambers-citadel-v1`;
- created public-safe configuration and a machine-readable production module manifest;
- split the public JavaScript bootstrap into config, core, Insights and loader runtimes;
- centralized feature-module paths, IDs and versions;
- migrated Global Shell and enquiry integration values into public configuration;
- moved 18 dormant or duplicate files outside the public asset tree;
- retained the previous Chambers theme as a documented rollback fallback;
- resumed neutral standalone extraction work under `docs/theme-lab/standalone-extraction/`;
- added Citadel runtime validation to GitHub Actions.

## Current phase — October 2026 operating status

The July cleanup sequence and its original content-resumption checkpoint are **historically complete**. The repository has resumed article publication and content refreshes. The five-item Article 6–10 plan below is therefore **not an active publication ceiling or a pause condition**.

| Workstream | Status | Evidence / next decision |
| --- | --- | --- |
| Chambers public website and Citadel v1 | Production | July cleanup batches completed; maintain and validate before shared changes. |
| Article publishing and existing-page legal updates | Active | 48 registry articles, 48 feed items and 83 sitemap URLs at the 16 October 2026 repository check; topic selection should avoid duplicates. |
| Technical SEO, static links and article metadata | Implemented; ongoing verification | Validators, static directory and synchronised feed exist; Search Console recrawl/coverage must be checked separately. |
| Google indexing, search terms and CTR | Awaiting external evidence | Review Search Console URL status, impressions, queries and clicks; do not equate sitemap/registry totals with indexed URLs. |
| Core Web Vitals and live mobile UX | Awaiting fresh verification | Recheck after image and runtime optimisation; do not infer pass from GitHub validation alone. |
| Enquiry conversion reporting | Implemented; awaiting reporting validation | `enquiry_submit` event added after confirmed EmailJS success on 2 October 2026; verify GTM/GA4 capture and attribution. |
| New practice/service location pages | Conditional | Require distinct jurisdictional usefulness and review of existing indexing/cannibalisation first. |
| AdSense / article-only advertisements | Conditional on account approval | No approval or live ad placement established by this roadmap. |
| Team page | Waiting for approved details | Do not publish or place in navigation/sitemap before approved profiles. |
| Standalone Citadel theme | Deferred product | Production modularisation exists; a separate reusable theme release is not complete. |
| Citadel Manager / CMS | Planned, not built | Requires an authenticated local/server-side design. |
| Secure Client Portal | Future separate product | Requires security architecture, authenticated backend and private-data boundary. |
| Native article comments / standalone reading-time | Planned | Do not infer production activation from module-contract documents. |

### Current execution order

1. Reconcile core documentation and Codex handoff with the 48-article October baseline.
2. Obtain fresh Search Console coverage and search-performance data. The connected third-party reporting subscription may be unavailable; use the Search Console interface/export if necessary.
3. Verify live Core Web Vitals, internal links, enquiry tracking and representative page routes.
4. Prioritise targeted improvements to existing MSME, NI Act, arbitration, RERA and recovery clusters based on actual performance and legal accuracy.
5. Select next genuinely new content topics; retain registry / sitemap / RSS / metadata parity.
6. Reassess additional service pages and separate-product development only after the relevant dependencies or approval.

**Closed historical milestone:** the controlled Article 6–10 publication run was the post-cleanup restart plan, not a present limit. Later registry publication exceeds that scope.

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
- verify conversion attribution and GTM/GA4 reporting for the privacy-safe `enquiry_submit` event introduced on 2 October 2026;
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
