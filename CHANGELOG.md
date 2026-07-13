## 2026-07-13 IST - Fix Citadel Global Shell asset resolver
- Restored the missing browser asset-root and asset-URL helpers used by Global Shell.
- Advanced the Global Shell module cache version to v5 and the public-config bootstrap version to v2.
- Added validator coverage for the Global Shell resolver contract.
- Advanced the shared public cache key to `site-20260713-b5h1`.

## 2026-07-13 IST - Restart and modularize Chambers Citadel
- Tagged the pre-restart production baseline as `chambers-citadel-v1` at `47e8c6ed07ed2a053a46a39f3779d60fa6059edf`.
- Added public-safe Citadel configuration and a machine-readable production module manifest.
- Split the monolithic public bootstrap into explicit config, core, Insights and module-loader runtimes.
- Centralized feature-module paths, IDs and cache versions.
- Migrated Global Shell and enquiry-form public values into browser-safe configuration.
- Moved 18 dormant or duplicate theme files outside the public asset tree into `docs/theme-lab/runtime-assets/`.
- Added rollback documentation and resumed neutral standalone extraction work.
- Added `tools/validate-citadel-runtime.js` and enabled it in Chambers Validation.
- Advanced the roadmap to the content-resumption checkpoint.

## 2026-07-13 IST - Consolidate overlapping location service pages
- Consolidated the Bihar cheque-bounce, property-dispute and civil-litigation pages into stronger Patna-and-Bihar canonical pages while preserving former URLs as noindex redirect stubs.
- Removed the three redirect-source URLs from the sitemap and public internal-link graph.
- Replaced visible “High Intent Search Page” labels with user-facing legal labels.
- Added distinct Delhi NCR cheque-bounce forum-record guidance.
- Added authority-specific UP RERA and HRERA Gurugram portal-record guidance to the Noida and Gurugram pages.
- Added `tools/validate-service-consolidation.js` and enabled it in Chambers Validation.
- Advanced the active roadmap to Cleanup Batch 5 — Citadel Theme Restart.

## 2026-07-13 IST - Optimize article assets and frontend rendering
- Converted active 1200 x 675 article thumbnails from large PNG files to size-controlled JPEG derivatives and updated registry, article metadata and featured-image references.
- Backed up original image sources locally before removing them from the active repository.
- Removed verified unreferenced image variants and the duplicate favicon asset where safe.
- Replaced CSS-background Insight card media with native lazy image elements in static and dynamic card rendering.
- Removed the obsolete duplicate Homepage registry renderer.
- Normalized shared public CSS and JavaScript cache keys to `site-20260713-b3`.
- Reduced the Global Shell clock from one-second to one-minute updates.
- Added `tools/validate-public-assets.js` and enabled it in Chambers Validation.
- Advanced the active roadmap to service-page consolidation.

## 2026-07-13 IST - Consolidate active documentation and archive stale status notes
- Rewrote the repository, documentation, roadmap and organization entry points against the July 2026 production state.
- Reconciled Chambers Citadel v1, active Citadel modules and paused standalone extraction in theme documentation and namespace READMEs.
- Replaced stale pre-reorganization maintenance-document paths with their current folder locations.
- Rewrote the article/thumbnail/social guidelines, removed the control-character defect and locked the logo-free article-thumbnail rule.
- Archived 15 completed status notes, 4 dated monitoring outputs and the superseded website master plan.
- Added `tools/validate-documentation.js` and added documentation validation to GitHub Actions.
- Internal documentation remains excluded from the public GitHub Pages artifact.

## 2026-07-13 IST - Harden public deployment boundary and SEO validation
- Added `_config.yml` to stop GitHub Pages from publishing internal documentation, preview files, tools, repository notes and theme-development README/config files.
- Added a branded noindex `404.html` with safe navigation back to active public sections.
- Fixed the control-flow defect that prevented normal service-page and RERA schema validation in `tools/validate-seo-sitewide.js`.
- Added registry, Open Graph, Twitter and BlogPosting image-parity enforcement for every registered article.
- Corrected BlogPosting images for the Bihar RERA complaint and MSME delayed-payment articles.
- Added `tools/validate-deployment-boundary.js`.
- Added sitewide SEO and deployment-boundary validation to the Chambers Validation workflow.
- No public indexed URL, sitemap entry, feed entry or article registry entry was removed.

## 2026-07-13 IST - Publish commercial contract review checklist
- Added `updates/commercial-contract-review-checklist.html` as a pre-signing commercial agreement review guide.
- Covered party identity, authority, scope, acceptance, change control, payment, indemnity, liability, IP, confidentiality, termination, force majeure, execution and dispute clauses.
- Added canonical, Open Graph, Twitter and BlogPosting/Breadcrumb metadata.
- Used the approved logo-free 1200 x 675 commercial contract review featured image.
- Added the article to the Insights registry, sitemap and RSS feed.
- Added contextual inbound links from the arbitration clause checklist, commercial recovery guide, commercial suit checklist and commercial recovery practice hub.
- Regenerated crawlable Homepage and Legal Insights snapshots.

## 2026-07-11 IST - Publish Section 9 arbitration interim relief guide
- Added `updates/section-9-arbitration-interim-relief.html` as a procedure-focused guide to court interim measures under Section 9.
- Covered the pre-arbitration 90-day commencement requirement, Section 17 transition, jurisdiction, documents, urgency, security, preservation and appeal framework.
- Added canonical, Open Graph, Twitter and BlogPosting/Breadcrumb metadata.
- Used the approved 1200 x 675 Section 9 featured image.
- Added the article to the Insights registry, sitemap and RSS feed.
- Added contextual inbound links from the arbitration notice guide, arbitration clause checklist and arbitration practice hub.
- Regenerated crawlable Homepage and Legal Insights snapshots.

## 2026-07-10 IST - Publish SARFAESI notice reply guide
- Added `updates/sarfaesi-notice-reply-documents.html` as a document-first Section 13(2) and Section 13(3A) borrower-response guide.
- Added canonical, Open Graph, Twitter and BlogPosting/Breadcrumb metadata.
- Used the approved 1200 x 675 SARFAESI notice reply featured image.
- Added the article to the Insights registry, sitemap and RSS feed.
- Added a contextual inbound link from the existing SARFAESI auction-sale article.
- Regenerated the crawlable homepage, Legal Insights cards and complete static article index.

## 2026-07-10 IST - Add registry-driven static Insights snapshots
- Added `tools/sync-static-insight-cards.js` to generate crawlable article cards from the Insights registry.
- Added static latest-article cards to the homepage and Legal Insights editorial sections.
- Regenerated the complete static Legal Insights index from the registry.
- Preserved JavaScript enhancement: live registry renderers replace the static snapshot after page load.
- Added a GitHub Actions synchronization check so stale static snapshots fail validation.
- Updated homepage and Legal Insights sitemap modification dates.

## 2026-07-10 IST - Publish RERA complaint drafting guide
- Added `updates/rera-complaint-drafting-documents-reliefs.html` using the Citadel article structure.
- Added complete canonical, Open Graph, Twitter and BlogPosting/Breadcrumb structured-data metadata.
- Used the approved 1200 x 675 RERA complaint drafting featured image.
- Added the article to the Insights registry, sitemap and RSS feed.
- Added contextual internal links from the existing RERA complaint, delayed-possession and promoter-reply guides.
- Scheduled a live post-publication SEO and visual audit after GitHub Pages deployment.

## 2026-05-26 IST - Add Phase 2 thumbnail frame consistency module
- Added `assets/css/themes/citadel-of-kang/modules/thumbnail-frames.css` to standardize insight-card and article-featured thumbnail frames.
- Updated the Global Shell loader to attach the thumbnail frame CSS module sitewide using cache key `thumbnail-frames-v1`.
- Standardized thumbnail frames around a 16:9 ratio and `background-size: contain` so approved 1200 x 675 artwork remains visible instead of being cropped.
- Phase 2 visual-only change: no article copy, approved artwork, OG/Twitter/JSON-LD metadata, sitemap, feed or canonical URLs were changed.

## 2026-05-26 IST - Complete Phase 1 Citadel Production Finalization
- Marked `docs/maintenance/theme/CITADEL_PRODUCTION_FINALIZATION_CHECKLIST.md` as Phase 1 complete after automated GitHub Actions validation passed and user-confirmed manual browser smoke checks passed.
- Recorded completion of desktop/tablet/mobile, light/dark, Global Shell, Article, Blog/Insights, Contact/Enquiry and public/internal boundary checks.
- Confirmed the next roadmap step is `Phase 2 - Thumbnail Frame Consistency v1` while Phase 4.5 remains parked until roadmap order reaches it.
- Documentation-only completion update: no CSS, JavaScript behaviour, HTML pages, SEO metadata, sitemap, feed, article content or thumbnail assets were changed.

## 2026-05-26 IST - Add GitHub Actions validation workflow
- Added `.github/workflows/validation.yml` for repository validation on push, pull request and manual workflow dispatch.
- The workflow runs Node.js 20 syntax checks for the active Citadel JavaScript entry/module files.
- The workflow runs article encoding validation, strict Insights registry validation and Git whitespace validation.
- Updated `docs/maintenance/theme/CITADEL_PRODUCTION_FINALIZATION_CHECKLIST.md` to record the workflow as part of Phase 1 validation.
- Documentation/CI-only change: no CSS, JavaScript behaviour, HTML pages, SEO metadata, sitemap, feed, article content or thumbnail assets were changed.
