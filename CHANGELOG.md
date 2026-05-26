## 2026-05-26 IST - Reconcile Phase 1 Citadel production documentation
- Reconciled production status and boundaries for Citadel template/module documentation, including Contact Page, Enquiry Page, General Content Page, Homepage, Practice / Services, Enquiry/Form and the Citadel production finalization checklist.
- Added `docs/maintenance/modules/enquiry-form.md` as the production module contract for copy-to-clipboard, structured enquiry form, WhatsApp/Gmail fallback and EmailJS direct-send behaviour.
- Added `docs/maintenance/theme/CITADEL_PRODUCTION_FINALIZATION_CHECKLIST.md` to track desktop/tablet/mobile, light/dark, Global Shell, Article, Blog/Insights and Contact/Enquiry smoke checks.
- Updated `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` to include the Enquiry/Form module contract and Citadel Production Finalization Checklist.
- Documentation-only change: no CSS, JavaScript behaviour, HTML pages, SEO metadata, sitemap, feed, article content or thumbnail assets were changed.

## 2026-05-26 IST - Clean documentation references after maintenance reorganization
- Added `docs/maintenance/standards/ONE_COMMAND_MANUAL_PATCH_STANDARD.md` to the organized standards folder.
- Removed the old flat `docs/maintenance/ONE_COMMAND_MANUAL_PATCH_STANDARD.md` path.
- Updated `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` to include the one-command manual patch standard under Active Standards Docs.
- Documentation-only change: no CSS, JavaScript behaviour, HTML pages, SEO metadata, sitemap, feed, article content or thumbnail assets were changed.

## 2026-05-26 IST - Organize maintenance documentation folders
- Reorganized `docs/maintenance/` into purpose-based subfolders for standards, theme, templates, modules, publishing, product and operations documentation.
- Added `docs/maintenance/README.md` as the maintenance folder map and rule for future documentation placement.
- Updated `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` to point to the new active documentation paths.
- Preserved archived/superseded documentation under `docs/archive/superseded-maintenance/`.
- Documentation-only change: no CSS, JavaScript behaviour, HTML pages, SEO metadata, sitemap, feed, article content or thumbnail assets were changed.

## 2026-05-25 IST - Update UAPA article thumbnail to approved standard
- Added the approved Article Thumbnail-Style Standardization v1 image for the UAPA bail article.
- Updated UAPA article OG image, Twitter/X image, JSON-LD image, featured image and registry thumbnail references.
- Updated article modified metadata and sitemap lastmod for the UAPA article.
- Documented the clean painted/editorial article thumbnail standard without large headline overlays.

## 2026-05-25 IST - Align legal docs with public social links
- Added official Facebook, Instagram and X / Twitter links to the Contact page public profile section.
- Updated homepage LegalService `sameAs` structured data for the official public social profile inventory.
- Refreshed disclaimer, privacy policy and terms language for the expanded social/contact channel set.
- Updated sitemap lastmod entries for homepage, contact and legal-policy pages.
- Updated README, Google setup notes, Google Business Profile checklist, legal/documentation maintenance guidance and wiki workflow with the current social-link inventory.
- Reconciled documentation index and repository organization notes with the 2026-05-24 roadmap consolidation and active documentation index.
- Validation note: source-level review performed; local shell validation could not run because the Windows sandbox command runner failed to start PowerShell.

## 2026-05-24 IST - Audit and update UAPA bail article
- Updated the UAPA bail article title, summary, modified date and current-position framing.
- Sharpened the discussion of Section 43D(5), Article 21, Watali, K.A. Najeeb, Gulfisha Fatima and Syed Iftikhar Andrabi.
- Removed internal research-pack wording from public article text and references.
- Moved References / Sources after the Conclusion to match the current article publishing workflow.
- Updated the insights registry entry, RSS feed metadata and sitemap lastmod for the article.

## 2026-05-24 IST - Consolidate roadmap and archive superseded documentation
- Added `docs/PROJECT_ROADMAP.md` as the master roadmap for Chambers of AK, Citadel of Kang, Citadel Manager, article publishing, SEO, thumbnails and future Client Portal work.
- Added `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` to identify active documentation and reduce confusion.
- Moved superseded planning/checkpoint documents into `docs/archive/superseded-maintenance/`.
- Preserved archived documents for historical reference while removing them from active maintenance flow.
- Cleaned common mojibake patterns in markdown documentation.

## 2026-05-23 IST - Add MSME Facilitation Council article thumbnail
- Added a standalone 1200 x 675 watercolour legal-news thumbnail for the MSME Facilitation Council process article.
- Updated the article Open Graph, Twitter/X and JSON-LD image references.
- Updated the Insights registry thumbnail and sitemap lastmod for the article.

## 2026-05-22 IST - Tighten social package approval rules
- Updated the social media distribution workflow with an explicit preview-to-final consistency rule for downloadable ZIP packages.
- Clarified that generated packages may use only official user-approved Chambers of AK logo assets, such as `assets/img/logo-navbar.png`, and must not invent alternate AK branding.

## 2026-05-20 IST - Force mobile footer hierarchy
- Added a final mobile-only CSS override for the footer.
- Forced mobile footer order to disclaimer, social icons, grouped navigation and copyright.
- Preserved the desktop and tablet footer layout rules from the footer internal-link cleanup.

## 2026-05-20 IST - Refine footer mobile hierarchy
- Adjusted mobile footer order to show disclaimer first, then social icons, then grouped navigation, then copyright.
- Preserved desktop layout with disclaimer/social on the left, grouped links in the centre and copyright on the right.
- Preserved balanced tablet two-column footer layout.

## 2026-05-20 IST - Refine footer symmetry with left disclaimer layout
- Adjusted footer layout so desktop view places disclaimer and social icons on the left, grouped navigation in the centre and copyright on the right.
- Added balanced tablet two-column rules.
- Preserved centred stacked footer layout on mobile.

## 2026-05-20 IST - Refine footer symmetry after internal-link cleanup
- Added grid-based footer layout rules after the footer internal-link cleanup.
- Balanced copyright, grouped navigation, social icons and disclaimer across desktop widths.
- Added responsive footer stacking rules for tablet and mobile layouts.

## 2026-05-20 IST - Create Footer Internal-Link Cleanup v1
- Updated production page footers with a concise Practice link group.
- Added footer links to the five active practice pillars: MSME Recovery, Arbitration, Commercial Recovery, RERA / Property and Cheque Bounce.
- Kept Main, Resources and Legal footer groups concise for clearer site navigation and sitelink readiness.
- Excluded preview/demo HTML files from the production footer update.
- Recorded the implementation in Search Appearance and Global Shell documentation.

## 2026-05-20 IST - Create Practice Hub Related Articles Block v1
- Strengthened the `practice.html` Related Insights By Area block.
- Grouped supporting articles under the five active practice pillars.
- Added stronger MSME and arbitration internal links, including Section 34 limitation.
- Updated sitemap lastmod for the Practice page and recorded the implementation in planning/template docs.

## 2026-05-20 IST - Create Arbitration Hub v1
- Strengthened `practice/arbitration.html` as the central Arbitration Hub.
- Added an Arbitration Route Map, key-stage structure and MSME arbitration overlap note.
- Refined Patna/Bihar-first positioning while preserving selected Delhi/Supreme Court-linked stage language.
- Updated related service and article links, including Section 34 limitation and MSME Facilitation Council resources.
- Updated the Practice page arbitration related-insights block.
- Updated sitemap lastmod entries and recorded the implementation in planning/template docs.

## 2026-05-20 IST - Fix tablet shell theme toggle breakpoint
- Aligned the Global Shell desktop topbar breakpoint with the CSS mobile drawer breakpoint.
- Changed the Global Shell topbar media query from `min-width: 769px` to `min-width: 761px`.
- Fixed the 761px-768px tablet dead zone where the desktop nav appeared without the topbar theme toggle.
- Bumped the Global Shell loader to `global-shell-v2`.
- Bumped sitewide script references to `script.js?v=citadel-live-16`.

## 2026-05-20 IST - Create MSME Recovery Hub v1
- Strengthened `practice/msme-disputes.html` as the central MSME Recovery Hub.
- Updated page title/meta/social titles from MSME delayed payment disputes to MSME Recovery.
- Added an MSME Recovery Route Map and hub usage note.
- Refined Patna/Bihar-first location language and removed broad UP/Delhi NCR phrasing from the hub.
- Updated related service and article links, including the Section 34 limitation guide.
- Updated sitemap lastmod entries and recorded the implementation in planning/template docs.

## 2026-05-20 IST - Record Search Appearance MSME roadmap
- Added `docs/planning/SEARCH_APPEARANCE_MSME_TOPICAL_AUTHORITY_ROADMAP.md`.
- Recorded the sitelink-readiness plan, MSME/arbitration topical-authority strategy, internal-linking approach and future hub-page roadmap.
- Documented competitor observations from NB Associates at a strategic level without copying content.
## 2026-05-20 IST - Clean service-page taxonomy and fix robots feed directive
- Removed the invalid `Feed:` directive from `robots.txt`; RSS discovery now remains through HTML alternate links.
- Added RSS alternate discovery links to the homepage and Legal Insights page.
- Noindexed and canonicalized broad/non-priority service pages including civil litigation, broad property dispute, Gurugram RERA and broad Bihar-UP-Delhi-NCR RERA pages.
- Removed retired/non-priority service URLs and `feed.xml` from `sitemap.xml`.
- Cleaned the Practice page Focused Search Pages section to promote only the current five-pillar practice taxonomy and priority locations.
- Recorded Service Page Taxonomy Cleanup v1 in the Practice / Services template documentation.

## 2026-05-20 IST - Normalize sitewide page titles
- Updated the homepage title to a brand-led title: `Chambers of AK | Advocates & Legal Consultants`.
- Normalized root pages to page-specific titles such as `About | Chambers of AK`, `Practice Areas | Chambers of AK`, `Contact | Chambers of AK` and `Legal Insights | Chambers of AK`.
- Normalized practice, service and article pages to use their own H1/page topic followed by `| Chambers of AK`.
- Updated matching Open Graph and Twitter title tags where present.
- Preserved existing meta descriptions and substantive SEO content.

## 2026-05-20 IST - Create Citadel Practice Services Page template v1
- Added `assets/js/themes/citadel-of-kang/modules/pages/practice-page.js` as the reusable Citadel Practice / Services Page Template controller.
- Marked `practice.html` as a Citadel Practice Page implementation.
- Marked pages under `practice/` and `services/` as Citadel practice-detail or service landing pages.
- Updated the General Content Page loader so it does not attach to practice/service pages.
- Added `docs/maintenance/CITADEL_PRACTICE_PAGE_TEMPLATE.md` and updated the Citadel Template System roadmap.
- Bumped affected practice/service page script cache references to `script.js?v=citadel-live-14`.

## 2026-05-20 IST - Remove public Article Index internal note
- Removed the visible internal Article Index note from `article-index-direct-rail.js` where present.
- Added a defensive CSS rule to hide any stale `.article-index-note` output.
- Bumped Article Index JS/CSS cache references to `article-index-v22`.
- Bumped article page stylesheet/script cache references to `theme-package-7` and `citadel-live-13`.
- Updated article reusable module documentation to record that internal implementation notes must not be shown to readers.

## 2026-05-20 IST - Update article publishing rules and last-updated marker
- Added visible `Last updated on: DD/MM/YYYY at HH:MM` markers after the conclusion in the UAPA bail and Sabarimala articles.
- Removed public thumbnail caption/details from current article pages while retaining featured images and alt text.
- Restored/kept article disclaimer blocks as reader-facing legal disclaimers.
- Updated `docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md` to prohibit enquiry/CTA blocks, article-status/research-status notes and internal thumbnail details inside article pages.
- Documented the last-updated rule, public article-body exclusions and article structure order for future Chambers of AK articles.

## 2026-05-19 IST - Fix mobile article index overflow
- Added global mobile overflow guards for the Citadel Article Index module.
- Fixed narrow-screen article index layout so long TOC headings wrap instead of cropping.
- Bumped the article index CSS import to `article-index-v21`.
- Bumped the Sabarimala article stylesheet cache reference to `style.css?v=theme-package-6`.

## 2026-05-18 IST - Fix homepage hero meta-card mobile layout
- Fixed homepage hero meta cards so they stack cleanly on mobile instead of remaining in three cramped columns.
- Added safer text wrapping and justified body text for hero meta cards.
- Replaced slash wording with "commercial and consumer recovery" for cleaner wrapping.
- Bumped the homepage script cache reference to `script.js?v=citadel-live-20`.
## 2026-05-18 IST - Fix homepage hero meta-card wrapping
- Improved homepage hero meta-card readability by preventing long practice labels from overflowing.
- Changed the hero meta-card copy from slash wording to cleaner "commercial and consumer recovery" wording.
- Added justified body text, safer wrapping and tablet stacking for the hero meta cards.
## 2026-05-18 IST - Improve homepage hero meta-card readability
- Improved the homepage hero meta-card contrast by replacing light translucent cards with darker glass panels.
- Added clearer heading/body text styling for the Document-first approach, Firm-level expertise and Based in Patna cards.
- Bumped the homepage script cache reference to `script.js?v=citadel-live-19`.
## 2026-05-18 IST - Expand Chambers homepage priority sections
- Added homepage sections for How We Work, Matter Routes, Document-First Advantage, Before You Contact and an Important Professional Note.
- Rewrote the homepage About cards to remove old broad practice signals and align with the five-pillar strategy.
- Replaced the homepage Latest Legal Insights static fallback with MSME, arbitration and commercial-recovery priority cards.
- Updated the Homepage Template documentation to record Homepage Content Expansion v1.
- Bumped the homepage script cache reference to `script.js?v=citadel-live-18`.

## 2026-05-18 IST - Create Citadel Homepage Template v1
- Added `assets/js/themes/citadel-of-kang/modules/pages/home-page.js` as the reusable Citadel Homepage Template controller.
- Marked `index.html` as a Citadel Homepage implementation while preserving the current MSME/arbitration-first homepage content.
- Added `docs/maintenance/CITADEL_HOME_PAGE_TEMPLATE.md` and updated the Citadel Template System roadmap.
- Added a homepage module loader to `assets/js/script.js` and bumped the homepage script cache reference to `script.js?v=citadel-live-17`.

## 2026-05-17 IST - Update Chambers practice taxonomy and location priority
- Repositioned Chambers of AK around five core pillars: MSME Recovery, Arbitration, Commercial / Consumer Recovery, RERA / Property and Cheque Bounce.
- Updated homepage, practice page, case enquiry and courts page language to prioritize Patna High Court, District Courts and forums of Bihar.
- Limited secondary location positioning to Delhi, Supreme Court of India, Noida, Ghaziabad and Allahabad High Court-linked matters.
- Updated SEO roadmap to reflect the five-cluster strategy and removed broad DRT/NCLT/SARFAESI/banking positioning from active sitewide priority.
- Refreshed sitemap lastmod entries for the homepage, practice, courts and case enquiry pages.

## 2026-05-17 IST - Create Citadel General Content Page template v1
- Added `assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js` as the reusable Citadel General Content Page Template controller.
- Marked FAQ, process, courts, document checklists, disclaimer, privacy policy and terms pages as General Content Page implementations.
- Added `docs/maintenance/CITADEL_GENERAL_CONTENT_PAGE_TEMPLATE.md` and updated the Citadel Template System roadmap.
- Bumped affected general page script cache references to `script.js?v=citadel-live-15`.
## 2026-05-17 IST - Update Citadel documentation checkpoint
- Updated the Citadel Template System roadmap to reflect completed Blog, Global Shell, Contact Page and Enquiry Page template work.
- Expanded Contact Page, Enquiry Page and Enquiry/Form documentation with module boundaries, hooks, validation and future data-migration notes.
- Cleaned Article Reusable Modules documentation to reference current Citadel page-template modules and corrected a corrupted path.
- Rewrote the Patch Authoring Mistakes log to remove duplicate numbering and record safer patch/documentation workflow rules.
## 2026-05-17 IST - Review legal and documentation maintenance
- Updated `disclaimer.html`, `privacy-policy.html` and `terms.html` for the current structured contact form, EmailJS direct-send path, enquiry fallbacks and third-party communication tools.
- Clarified README and Google setup notes so GTM/GA4 lead-link events remain separate from the EmailJS direct form-send action unless a dedicated data-layer event is added later.
- Updated the legal/documentation maintenance checklist for EmailJS/direct-send review triggers and enquiry-form module validation.
- Refreshed sitemap lastmod dates for legal pages, contact, case enquiry and the registry-driven legal updates index.

## 2026-05-17 IST - Create Citadel Enquiry Page template v1
- Added `assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js` as the reusable Citadel Enquiry Page Template controller.
- Marked `case-enquiry.html` as a Citadel Enquiry Page implementation while preserving existing visual layout and copy-template behaviour.
- Added `docs/maintenance/CITADEL_ENQUIRY_PAGE_TEMPLATE.md` to document the separation between enquiry-page structure and enquiry/form behaviour.
- Bumped the case enquiry page script cache reference to `script.js?v=citadel-live-14`.
## 2026-05-17 IST - Create Citadel Contact Page template v1
- Added `assets/js/themes/citadel-of-kang/modules/pages/contact-page.js` as the reusable Citadel Contact Page Template controller.
- Marked `contact.html` as a Citadel Contact Page implementation while preserving existing visual layout and enquiry form behaviour.
- Added `docs/maintenance/CITADEL_CONTACT_PAGE_TEMPLATE.md` to document the separation between page-level contact structure and enquiry form logic.
- Bumped the contact page script cache reference to `script.js?v=citadel-live-13`.
## 2026-05-17 IST - Create Citadel enquiry form module
- Added `assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js` for copy-to-clipboard templates and structured enquiry form behaviour.
- Replaced the inline form/copy behaviour in `assets/js/script.js` with a conditional Citadel module loader.
- Added `docs/maintenance/CITADEL_ENQUIRY_FORM_MODULE.md` and documented the form-module migration rule.
- Bumped public script cache references to `script.js?v=citadel-live-12`.
## 2026-05-17 IST - Remove synchronous Insights registry fallback
- Removed the blocking synchronous XMLHttpRequest fallback from the Insights registry loader.
- Kept `window.ChambersInsightsRegistryReady` as the async promise used by Citadel modules that depend on article metadata.
- Delayed Insight card hydration until the registry promise settles so article thumbnails and current-article styling remain consistent.
- Bumped the registry cache key to `registry-2` and public script references to `script.js?v=citadel-live-12`.
## 2026-05-17 IST - Create Citadel Global Shell v1
- Added `assets/js/themes/citadel-of-kang/modules/shell/global-shell.js` for reusable shell behaviour.
- Moved topbar, mobile drawer, footer social row, active navigation and smooth anchor logic out of the monolithic global script.
- Added `docs/maintenance/CITADEL_GLOBAL_SHELL_MODULE.md` and updated the Citadel Template System roadmap.
- Bumped public script cache references to `script.js?v=citadel-live-12`.
## 2026-05-17 IST - Record Citadel Template System roadmap
- Added `docs/maintenance/CITADEL_TEMPLATE_SYSTEM_ROADMAP.md` to define the wider Citadel template architecture after the Blog Page module migration.
- Recorded target template families for global shell, homepage, blog/news/insights, article, practice/services, about/team, contact, enquiry and general content pages.
- Documented that NewsPaper 12 and other external theme references may be used for architecture and UX taxonomy only, not copied code/assets.
- Updated Blog Page and reusable module documentation to position Chambers of AK as an implementation of the reusable Citadel template system.
## 2026-05-17 IST - Create Citadel Blog page module
- Added `assets/js/themes/citadel-of-kang/modules/blog/blog-page.js` as a reusable Citadel-level Blog/News/Insights directory controller.
- Converted `legal-updates.html` into a declarative Citadel Blog Page labelled as Legal Insights, with latest, category, categories and tag-driven sections.
- Replaced the legacy advanced Insights filter/search block in `assets/js/script.js` with a Citadel Blog Page loader.
- Preserved registry-first rendering from `assets/data/insights-registry.json`, default 3-card section limits, View All behaviour, filtering, search and pagination.
- Documented the reusable Blog Page architecture in `docs/maintenance/CITADEL_BLOG_PAGE_MODULE.md`.
### Make Insights category sections registry-driven

- Extended the Citadel Insights Directory section module so lower Legal Updates category blocks render from registry category/tag filters.
- Replaced manually maintained category-card blocks in `legal-updates.html` with registry-driven grids and small no-script fallbacks.
- Added `docs/maintenance/PATCH_AUTHORING_MISTAKES.md` to record patch-script mistakes and prevent repeat failures.
- Bumped public script cache references to `script.js?v=citadel-live-12` and the Insights Directory module cache key to `insights-directory-v2`.
## 2026-05-16 IST - Simplify Insights latest grid static fallback
- Removed the long manually-maintained Latest Articles card list from `legal-updates.html`.
- Kept a lightweight no-script RSS fallback inside the Citadel Insights Directory host grid.
- Preserved registry-first rendering through `assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js`.

## 2026-05-16 IST - Add Citadel Insights Directory section module
- Added `assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js` to render the Insights directory from the central JSON registry.
- Added a module loader in `assets/js/script.js` and marked the `legal-updates.html` latest grid with `data-citadel-insights-directory`.
- Updated publishing workflow documentation so future articles are published through `assets/data/insights-registry.json`, not manual `legal-updates.html` card maintenance.
- Bumped public script cache references to `citadel-live-7`.
## 2026-05-16 IST - Clarify Citadel latest insights section module path
- Renamed the Citadel latest-insights renderer from `assets/js/themes/citadel-of-kang/modules/latest-insights.js` to `assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js`.
- Kept the module theme-level and reusable for homepages, landing pages and other Citadel layouts instead of treating it as Chambers-specific homepage JavaScript.
- Updated the global loader path and bumped public script cache references to `script.js?v=citadel-live-12`.
## 2026-05-16 IST - Add Citadel latest insights dedupe module
- Moved the homepage latest-insights rendering behaviour into a reusable Citadel module.
- Added href-based de-duplication before the latest-card display limit is applied, preventing registry/feed overlap from showing the same article twice.
- Preserved registry-first fallback and feed freshness rendering while supporting both `data-citadel-latest-insights` and legacy `data-home-insights-limit` hooks.
- Bumped public script cache references to `script.js?v=citadel-live-12`.
## 2026-05-16 IST - Publish arbitration notice before claim article
- Rebuilt `updates/arbitration-notice-before-claim.html` using Article Publishing Template v2 with `article.article-body` so Article Index and Article Footer auto-load correctly.
- Updated the Insights registry JSON, legal-updates card, sitemap lastmod and RSS feed item for the refreshed arbitration notice article.
- Preserved Citadel theme compatibility, grouped pill styling and non-solicitation informational language.
## 2026-05-16 IST - Update article publishing template for Citadel modules

- Rewrote the article HTML template for the current Citadel module architecture.
- Updated the publishing workflow to use `assets/data/insights-registry.json` as the article metadata source of truth.
- Documented that Article Index, Article Footer and grouped pill styling are auto-loaded by shared Citadel modules.
- Added validation, registry, sitemap, feed, JSON-LD, internal-link and live-check guidance for future article publishing.
### Normalize Citadel pill group colors

- Normalized category, tag, meta and filter/action pill colors at the Citadel module level so labels within the same group no longer appear with inconsistent text color or fill strength.
- Kept category pills visually stronger, tag pills lighter, technical tags wider, and meta pills muted across light mode, dark mode, desktop and mobile layouts.
- Bumped public stylesheet cache references to `style.css?v=theme-package-5` and the pill module import to `pills.css?v=pills-v2`.
## 2026-05-16 IST - Add Citadel-wide grouped pill system
- Added a reusable Citadel pill module for category, tag, technical and meta/filter/action pills.

## 2026-05-21 — Batch 1 social preview raster patch v3
- Synced repository from origin before patching.
- Replaced SVG social preview references with raster PNG thumbnails for PMLA, Section 34 and UAPA articles.
- Updated article HTML social metadata, featured image references and BlogPosting image references.
- Updated insights registry thumbnails and sitemap lastmod entries.
- Applied Citadel social-card raster-image rule in live article files.

## 2026-05-21 — Set PMLA thumbnail to black and white
- Added ssets/img/citadel/citadel-thumb-pmla-bnss-cognizance-bw.png as the black & white PMLA BNSS social thumbnail.
- Updated the PMLA article, registry thumbnail and sitemap lastmod.
- Left Section 34 Limitation coloured and UAPA Bail black & white, following the new alternating thumbnail pattern.

## 2026-05-21 — Set PMLA and UAPA thumbnails to black and white
- Added black & white PNG social thumbnails for PMLA BNSS and UAPA Bail articles.
- Updated article HTML, registry thumbnails and sitemap lastmod entries.
- Left Section 34 Limitation coloured, following the alternating thumbnail pattern.

## 2026-05-21 — Batch 2 remaining article thumbnails
- Added article-specific raster thumbnails for Sabarimala, Arbitration Notice Before Claim and Property Title Search articles.
- Updated OG/X social image paths, article body image paths where present, JSON-LD image references, registry thumbnails and sitemap lastmod entries.
- Continued black & white / coloured thumbnail alternation rule.

## 2026-05-21 — Batch 2A editorial thumbnail correction
- Replaced flat/generic Batch 2 thumbnails with more painterly editorial thumbnails for Sabarimala, Arbitration Notice Before Claim and Property Title Search.
- Used new image filenames to avoid social platform cache conflicts.
- Updated article HTML metadata, registry thumbnails, sitemap lastmod and guideline notes.

## 2026-05-21 — Batch 2B painted editorial correction
- Replaced Batch 2A thumbnails with stronger painted editorial thumbnails for Sabarimala, Arbitration Notice Before Claim and Property Title Search.
- Used new filenames to avoid browser/social-preview cache conflicts.
- Updated article HTML metadata, registry thumbnails, sitemap lastmod and guideline notes.

## 2026-05-21 - Final article encoding template fix
- Repaired Sabarimala and UAPA mojibake from a clean origin/main base.
- Added \tools/fix-article-encoding.js and updated \tools/validate-article-encoding.js.
- Updated template, workflow and guidelines with ASCII-safe metadata and validation rules.
- Updated sitemap lastmod for affected articles and legal updates page.

## 2026-05-21 - Full article-body encoding audit v2
- Upgraded \tools/validate-article-encoding.js to scan full article HTML files, not only metadata/card fields.
- Upgraded \tools/fix-article-encoding.js to repair mojibake across all updates/*.html article files.
- Ran full-body encoding fixer and validator across all article pages.
- Updated workflow/template/guidelines to require full article-body encoding audit before article commits.

## 2026-05-21 - Batch 3 painted editorial thumbnails
- Added article-specific raster thumbnails for Non-Reportable Judgments Online, SARFAESI Auction Sale Challenge and Summary Judgment in Commercial Suits.
- Updated OG/X social image paths, JSON-LD image references, registry thumbnails and sitemap lastmod entries.
- Continued the black and white / coloured / black and white thumbnail rhythm using painted editorial legal-media artwork.

## 2026-05-22 - Batch 4 approved-style thumbnails
- Added approved reference-style thumbnails for MSME Documents Checklist, MSME Delayed Payment and Bihar RERA Complaint.
- Upserted missing OG/X image tags for older article pages using Node-based patching.
- Updated JSON-LD image references, registry thumbnails and sitemap lastmod entries.

## 2026-05-22 - Batch 5 third-style thumbnails
- Updated Non-Reportable Judgments, SARFAESI Auction Sale Challenge and Summary Judgment articles with third-style watercolour legal-news thumbnails.
- Updated OG/X social image paths, JSON-LD image references, registry thumbnails and sitemap lastmod entries.
