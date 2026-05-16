### Make Insights category sections registry-driven

- Extended the Citadel Insights Directory section module so lower Legal Updates category blocks render from registry category/tag filters.
- Replaced manually maintained category-card blocks in `legal-updates.html` with registry-driven grids and small no-script fallbacks.
- Added `docs/maintenance/PATCH_AUTHORING_MISTAKES.md` to record patch-script mistakes and prevent repeat failures.
- Bumped public script cache references to `script.js?v=citadel-live-8` and the Insights Directory module cache key to `insights-directory-v2`.
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
- Updated the global loader path and bumped public script cache references to `script.js?v=citadel-live-8`.
## 2026-05-16 IST - Add Citadel latest insights dedupe module
- Moved the homepage latest-insights rendering behaviour into a reusable Citadel module.
- Added href-based de-duplication before the latest-card display limit is applied, preventing registry/feed overlap from showing the same article twice.
- Preserved registry-first fallback and feed freshness rendering while supporting both `data-citadel-latest-insights` and legacy `data-home-insights-limit` hooks.
- Bumped public script cache references to `script.js?v=citadel-live-8`.
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
- Added a reusable Citadel pill module for category, tag, technical, meta and filter/action pills.
- Mapped existing card, article, footer and Insights filter pill selectors into the grouped system without changing article markup.
- Preserved light-mode, dark-mode, desktop and mobile compatibility.
- Bumped public stylesheet cache references to `theme-package-4`.
## 2026-05-16 IST - Move Insights registry to JSON source
- Extracted article metadata from `assets/js/script.js` into `assets/data/insights-registry.json`.
- Added a runtime registry loader that preserves `window.chambersInsightsRegistry` and exposes `window.CitadelArticleRegistry`.
- Updated registry validation to use the JSON file as the source of truth.
- Bumped public script cache references to `citadel-live-4`.
## 2026-05-16 IST - Add Citadel Article Index auto-loader
- Added a safe Article Index v20 auto-loader in `assets/js/script.js`.
- The loader detects standard article-body pages with at least three h2 headings and loads the Citadel Article Index module when no manual script is already present.
- Updated registry validation to check reusable article module availability and auto-loader presence.
- Preserved existing manually wired article pages and duplicate-initialization safeguards.
## 2026-05-16 IST - Fix Citadel Article Footer v2 registry path matching
- Corrected Article Footer v2 path normalization so registry hrefs such as updates/... match current /updates/... article pages.
- Bumped the footer module cache key to article-footer-v2-1.
- Ensured current article exclusion from Recommended Reads and restored Previous / Next rendering for registry-matched article pages.
## 2026-05-15 IST - Add Citadel Article Footer v2
- Added reusable Citadel Article Footer v2 module under `assets/js/themes/citadel-of-kang/article-footer.js`.
- Replaced the legacy inline article-footer block in `assets/js/script.js` with a loader and registry handoff.
- Added the property title search article to `window.chambersInsightsRegistry`.
- Added a registry validation script for `/updates/*.html` article-body coverage and reusable module assumptions.
- Preserved non-duplicating footer behaviour and existing Article Index v20 wiring.
## 2026-05-15 IST - Fix dark-mode pill idle state
- Added a stronger shared override for dark-mode article tag/category pill idle states.
- Ensured tag pills remain white-text with gold border and dark-gold fill even when not hovered.
- Preserved the existing hover treatment.

## 2026-05-15 IST - Add dark-theme pill fallback
- Added a [data-theme="dark"] fallback for tag/category/chip pills so the white-text pill treatment applies on the live dark-mode site.
- Preserved gold borders and dark-gold translucent fill.

## 2026-05-15 IST - Set dark-mode pill text to white
- Changed dark-mode tag/category/chip pill text from muted gold to white for stronger readability.
- Preserved the gold border, translucent dark-gold fill and hover treatment.

## 2026-05-15 IST - Improve dark-mode tag pill contrast
- Improved dark-mode contrast for shared tag/category/chip pills at the Citadel theme level.
- Applied stronger gold borders, readable gold text and translucent dark-gold fill for insight tags, update tags, article tags and generic pill classes.
- Kept the fix global and reusable instead of patching individual article pages.

## 2026-05-15 IST - Roll out Article Index v20 to eligible article pages
- Rolled out the reusable Article Index v20 module to eligible /updates/ article pages with article-body content and at least three h2 headings.
- Added article-level activation and direct-rail script loading only where needed.
- Preserved existing non-article pages, listing pages and legal-policy pages.
- Changed pages:
- $_
- $_
- $_
- $_
- $_
- $_
- $_
- $_
- $_
- $_
- $_
- $_
- $_
## 2026-05-15 IST - Refine Article Index click-jump anchor offset
- Increased the Article Index click-jump anchor offset so target headings remain visible below the fixed navigation bar.
- Aligned JS smooth-scroll targeting with the CSS heading scroll-margin fallback.
- Preserved approved v20 direct-rail behaviour and mobile drawer/progress handling.
## 2026-05-15 IST - Wire Article Index v20 production module
- Wired the reusable Article Index v20 CSS module into the global stylesheet without replacing existing site styles.
- Enabled the direct-rail Article Index production script on the property title search article.
- Added explicit article-level activation for the Article Index module.
- Preserved the approved v20 behaviour: desktop direct rail, mobile progress bar, drawer-safe progress suppression, native scrolling and active-heading sync.
# Changelog

## 2026-05-13 01:40 IST - Clean property title article publication

Files changed:

- `CHANGELOG.md`
- `legal-updates.html`
- `feed.xml`
- `sitemap.xml`

Summary:

- Cleaned the property title article publication metadata and Insights placement.
- Removed UTF-8 BOM markers from discovery files.
- Kept the new article in Latest Articles and Practical Guides & Checklists.
- Removed the checklist article from the Case Briefs/Judgment Briefs block.
- Preserved article content, URLs, CSS, JavaScript, theme assets, ad code, homepage, contact page and service pages.

Validation / notes:

- Cleanup-only patch.
- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`.
- Parsed `sitemap.xml` and `feed.xml`.

Commits:

- Cleanup committed by this patch; see `git log --oneline -1`.
## 2026-05-13 01:20 IST - Publish property title search article

Files changed:

- `updates/property-title-search-before-purchase-india.html`
- `legal-updates.html`
- `feed.xml`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Published one high-quality, document-led article: `Property Title Search Before Purchase in India: Document Checklist and State-Wise Records`.
- Added state-wise property record examples for Bihar, Uttar Pradesh, Delhi, Haryana, Jharkhand, Maharashtra and other common record systems.
- Added the article to the Insights hub, RSS feed and sitemap without changing CSS, JavaScript, theme assets, ad code, homepage, contact page or service pages.
- Preserved non-solicitation wording and article-only AdSense direction during active AdSense review.

Validation / notes:

- Single-article publication patch only.
- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`.
- Parsed `sitemap.xml` and `feed.xml`.
- Live visual check remains manual/Codex-dependent after GitHub Pages refresh.

Commits:

- `2c0e10d` - Publish property title search article.
## 2026-05-12 19:45 IST - Clean AdSense Batch 5 formatting

Files changed:

- CHANGELOG.md
- docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md
- services/property-dispute-lawyer-patna.html
- services/commercial-recovery-lawyer-bihar.html
- updates/cheque-bounce-30-days.html

Summary:

- Replaced remaining changelog commit placeholders for the Batch 5 and homepage canonical cleanup entries.
- Cleaned the Batch 5 AdSense plan markdown boundary before Compliance Notes.
- Normalized adjacent HTML section boundaries and paragraph spacing introduced during the Batch 5 content patch.

Validation / notes:

- Cleanup-only patch; no CSS, JavaScript, sitemap, feed, schema framework, images or ad placements changed.
- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`.
- Parsed `sitemap.xml` and `feed.xml`.

Commits:

- `bd22daf` - Clean AdSense Batch 5 formatting.
## 2026-05-11 22:20 IST - Strengthen AdSense readiness content Batch 5

Files changed:

- services/property-dispute-lawyer-patna.html
- services/commercial-recovery-lawyer-bihar.html
- updates/cheque-bounce-30-days.html
- sitemap.xml
- docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md
- CHANGELOG.md

Summary:

- Strengthened three existing public pages for AdSense/content-readiness without adding new thin URLs.
- Added route-review, limitation/date, common-mistake and official-reference guidance where useful.
- Refreshed the cheque bounce article modified date and sitemap freshness for the strengthened pages.
- Preserved existing URLs, Citadel theme assets, non-solicitation wording and article-only ads direction.

Validation / notes:

- Documentation/content patch only; no CSS, JavaScript, schema framework, images or ad placements changed.
- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`.
- Parsed `sitemap.xml` and `feed.xml`.
- Live visual check remains manual/Codex-dependent after GitHub Pages refresh.

Commits:

- `fbd426d` - Strengthen AdSense readiness content Batch 5.
## 2026-05-11 18:50 IST - Normalize homepage canonical links

Files changed:

- Public HTML files containing homepage links or `script.js` cache references
- `assets/js/script.js`
- `README.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Replaced internal homepage links pointing to `index.html` or `../index.html` with `/` so the site consistently points to the canonical homepage.
- Added a JavaScript canonical redirect from `https://chambersofak.in/index.html` to `https://chambersofak.in/`.
- Preserved the existing GitHub Pages duplicate-host redirect and normalized `/akassociates/index.html` to the canonical homepage.
- Bumped the public JavaScript cache key from `citadel-live-2` to `citadel-live-3`.

Validation / notes:

- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`.
- Parsed `sitemap.xml` and `feed.xml`.
- Confirmed public HTML homepage links no longer use `index.html` / `../index.html`.
- Confirmed public HTML script references now use `script.js?v=citadel-live-8`.
- Live visual check remains manual/Codex-dependent after GitHub Pages refresh.

Commits:

- `fe9ba80` - Normalize homepage canonical links.
## 2026-05-11 17:36 IST - Document ChatGPT/Codex live-check boundary

Files changed:

- docs/codex/CHATGPT_CODEX_LIVE_CHECK_BOUNDARY.md
- docs/codex/HANDOFF.md
- docs/wiki/WORKFLOW.md
- CHANGELOG.md

Summary:

- Added a clear ChatGPT/Codex boundary note for live deployment checks, local smoke tests and repository source checks.
- Recorded that ChatGPT must ask the user to manually check and report when it cannot access the live website.
- Recorded that Codex/local automation may perform browser smoke tests and live checks when it has a functioning browser/network environment.
- Added cross-references in Codex handoff and workflow documentation so future handoffs do not treat repository inspection as live validation.

Validation / notes:

- Documentation-only patch; no public website, CSS, JavaScript, schema or theme asset changes.
- Ran git diff --check before commit.
- Live visual check is not required for this documentation-only patch.

Commits:

- `219f2f9` - Document live-check handoff boundary.
## 2026-05-11 00:26 IST - Add Google profile links and ChatGPT patch guidance

Files changed:

- `index.html`
- `contact.html`
- `README.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/google/GOOGLE_SETUP.md`
- `docs/google/GOOGLE_BUSINESS_PROFILE_CHECKLIST.txt`
- `docs/seo/SEO_ROADMAP.txt`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Added the provided Google Business Profile link to the homepage LegalService `sameAs` structured data.
- Added Google Business Profile and Google Review request links to the Contact page Public Profiles section.
- Recorded the Google Business Profile public URL and review request URL in Google setup/checklist documentation.
- Updated SEO roadmap status to show the Google Business Profile links are now available and website-side signals have been added.
- Documented that ChatGPT must use the manual patch/Codex handoff workflow when it cannot safely patch, validate, commit and push through its connector.

Validation / notes:

- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`; only Windows line-ending warnings were reported.
- Parsed 105 JSON-LD blocks successfully after adding the Google Business Profile URL to homepage schema.
- Confirmed the Google Business Profile URL, Google review URL and ChatGPT manual-patch rule are now present in the intended public/docs files.

Commits:

- Pending.

## 2026-05-10 23:44 IST - Fix Citadel live navbar contrast and logo parity

Files changed:

- `assets/css/style.css`
- `assets/js/script.js`
- `assets/img/logo-navbar-dark.png`
- Public HTML files loading `assets/css/style.css` / `assets/js/script.js`
- `README.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Fixed the active Citadel navbar Contact button so text remains visible in light and dark modes, including active Contact-page state.
- Rebuilt `assets/img/logo-navbar-dark.png` on the same `620x115` canvas as the light navbar logo to keep desktop and mobile logo sizing consistent without CSS stretching.
- Bumped the dark navbar logo asset key to `dark-2`.
- Bumped public stylesheet references to `style.css?v=theme-package-5` and script references to `script.js?v=citadel-live-8`.

Validation / notes:

- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`; only Windows line-ending warnings were reported.
- Confirmed no functional `style.css?v=theme-package-2`, `script.js?v=citadel-live-8` or old dark navbar logo cache references remain.
- Local Chrome smoke confirmed homepage navbar CTA contrast in light/dark, Contact-page active CTA contrast in dark mode, and matching desktop logo frame `430x58`.
- Local Chrome mobile smoke confirmed matching logo frame `246x39` in light/dark mode.

Commits:

- Pending.

## 2026-05-10 23:13 IST - Activate Citadel of AK theme

Files changed:

- `assets/css/style.css`
- `assets/css/themes/citadel-of-ak.css`
- `assets/js/script.js`
- Public HTML files loading `assets/css/style.css` / `assets/js/script.js`
- `README.md`
- `docs/maintenance/THEME_SYSTEM.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Activated `assets/css/themes/citadel-of-ak.css` through the shared `assets/css/style.css` import.
- Preserved `assets/css/themes/chambers-ak.css` as the previous-theme rollback package.
- Converted the Citadel controller from preview-only behavior into the active light/dark theme controller.
- Removed production preview-banner behavior and kept the theme reference page as a noindex review surface.
- Bumped public stylesheet references to `style.css?v=theme-package-5` and script references to `script.js?v=citadel-live-8`.
- Updated repository documentation to reflect Citadel as the active site theme and to keep WordPress/commercial packaging out of this repository.

Validation / notes:

- Confirmed `assets/css/style.css` imports `assets/css/themes/citadel-of-ak.css?v=theme-1`.
- Confirmed `assets/css/themes/chambers-ak.css` remains in place as the previous-theme rollback package.
- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`; only Windows line-ending warnings were reported.
- Confirmed no functional `style.css?v=theme-package-1`, `script.js?v=citadel-preview-7`, preview-banner or `isCitadelPreview` references remain outside historical changelog notes.
- Local Chrome/Playwright smoke passed for homepage, Insights, SARFAESI article and contact page without `?theme=`: Citadel loads directly, no preview banner appears, light/dark toggle works, marble assets load with no 404s, article padding remains `40px`, and article text is justified.
- Mobile smoke passed for homepage drawer: the drawer uses the dark marble background after toggle and drawer social icons render as `36x36` circles.

Commits:

- Pending.

## 2026-05-10 23:07 IST - Resync legal and tracking maintenance notes

Files changed:

- `sitemap.xml`
- `README.md`
- `theme-preview-citadel-of-ak.html`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/google/GOOGLE_SETUP.md`
- `docs/seo/SEO_ROADMAP.txt`
- `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/maintenance/THEME_SYSTEM.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Updated sitemap lastmod dates for `disclaimer.html`, `privacy-policy.html` and `terms.html` to match their visible 10 May 2026 legal-policy update date.
- Aligned the Citadel preview page's direct theme CSS cache string with the current `preview-7` cache key.
- Corrected GTM/GA4 tracking notes to match the current data layer events emitted by `assets/js/script.js`.
- Updated the SEO roadmap's AdSense note to reflect the current `ads.txt` readiness state and no visible ad placements.
- Updated legal/documentation maintenance guidance and the wiki workflow to describe the current weekly recurring review.
- Aligned branding/theme documentation and the noindex Citadel reference page with the current active Citadel theme import observed in the working tree.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Internal `href`/`src` reference check passed.
- JSON-LD parse check passed for 105 blocks.
- Targeted checks confirmed legal sitemap dates are `2026-05-10`, the Citadel reference page uses `preview-7`, and Google tracking notes document the current direct data layer event names.
- The working tree also contains active Citadel implementation/cache-busting edits in shared CSS/JS and public HTML files; this review pass aligned legal/maintenance documentation to that current state without reverting those concurrent changes.

Commits:

- Pending.

## 2026-05-10 21:22 IST - Strengthen Citadel marble and prose spacing

Files changed:

- `assets/css/style.css`
- `assets/css/themes/citadel-of-ak.css`
- `assets/js/script.js`
- `assets/img/citadel/citadel-marble-light.webp`
- `assets/img/citadel/citadel-marble-dark.webp`
- `favicon-192.png`
- `favicon-512.png`
- `site.webmanifest`
- Public HTML files loading `assets/js/script.js`
- `README.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Replaced the Citadel marble textures with stronger-veined light and dark marble assets.
- Increased Citadel marble visibility while keeping the glass-panel overlay readable.
- Added Citadel article/card/content padding so text does not sit against the gold border.
- Forced the Citadel mobile drawer to use marble-backed light/dark backgrounds with higher specificity.
- Aligned the sun/moon toggle geometry and gave light/dark navbar logos the same non-stretched display frame.
- Added a shared prose rule to justify paragraph text in article blocks, content panels and cards.
- Added explicit root-level 192px and 512px favicon assets, advertised them in page heads, and updated the web manifest for clearer Google favicon crawling.
- Bumped the public JavaScript cache string to `script.js?v=citadel-preview-7` and the preview CSS cache string to `preview-7`.

Validation / notes:

- Confirmed the active imported theme remains `chambers-ak`; Citadel remains preview-only.
- Ran `node --check assets/js/script.js`.
- Ran `git diff --check`; only existing Windows line-ending warnings were reported.
- Confirmed no functional `citadel-preview-6` / `preview-6` references remain outside historical changelog notes.
- Locally smoke-tested Citadel light/dark pages for stronger marble visibility, article content padding, justified article paragraphs, mobile drawer marble background, toggle alignment and non-stretched navbar logos.
- Confirmed root favicon assets include `favicon.ico`, `favicon-32.png`, `favicon-48.png`, `favicon-96.png`, `favicon-192.png` and `favicon-512.png`.

Commits:

- Pending.

## 2026-05-10 20:36 IST - Refine Citadel marble visibility and controls

Files changed:

- `assets/css/themes/citadel-of-ak.css`
- `assets/js/script.js`
- Public HTML files loading `assets/js/script.js`
- `README.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Reduced Citadel card and panel opacity and layered the marble texture under glass-like panels so the generated marble surface remains visible behind content blocks.
- Reworked article hero thumbnails back into the shared gradient hero style instead of a split solid title/image treatment.
- Added marble-backed mobile drawer overrides for light and dark Citadel preview modes.
- Replaced the text-only light/dark preview control with a sun/moon sliding toggle.
- Recalibrated social icon sizing in the Citadel topbar and drawer so circular borders stay round.
- Bumped the public JavaScript cache string to `script.js?v=citadel-preview-6` and the preview CSS cache string to `preview-6`.

Validation / notes:

- Confirmed `assets/css/style.css` still imports only `assets/css/themes/chambers-ak.css`; Citadel remains preview-only.
- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- Local browser smoke passed for article gradient hero thumbnails, marble-backed glass panels, mobile drawer marble background, sun/moon toggle states and circular drawer social icons.

Commits:

- Pending.

## 2026-05-10 19:50 IST - Stabilize Citadel dark mode and marble surfaces

Files changed:

- `assets/css/themes/citadel-of-ak.css`
- `assets/js/script.js`
- `assets/img/citadel/citadel-marble-light.webp`
- `assets/img/citadel/citadel-marble-dark.webp`
- Public HTML files loading `assets/js/script.js`
- `README.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Replaced the Citadel preview checkered/grid background with generated low-noise light and dark marble textures.
- Tightened Citadel dark-mode surface variables and component overrides so shared white card styles render as dark surfaces in preview mode.
- Reduced the article hero overlay and added article-thumbnail-specific hero treatment so generated article thumbnails are visible as hero backgrounds.
- Corrected Citadel navbar logo sizing so light and dark logos preserve their natural proportions instead of stretching horizontally.
- Bumped the public JavaScript cache string to `script.js?v=citadel-preview-5` and the preview CSS cache string to `preview-5`.

Validation / notes:

- Confirmed `assets/css/style.css` still imports only `assets/css/themes/chambers-ak.css`; Citadel remains preview-only.
- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- Local asset existence checks passed for both generated marble WebP files.
- Local browser smoke passed for article light/dark hero thumbnails, marble page surfaces, dark-mode white-surface leak checks, Insights dark mode, About mobile dark mode and navbar logo proportions.

Commits:

- Pending.

## 2026-05-10 15:09 IST - Refine Citadel preview photos, dark mode and article cards

Files changed:

- `about.html`
- `assets/css/style.css`
- `assets/css/themes/citadel-of-ak.css`
- `assets/js/script.js`
- `assets/img/primary-logo-dark.png`
- `assets/img/logo-navbar-dark.png`
- `assets/img/citadel/`
- Public HTML files loading `assets/js/script.js`
- `docs/maintenance/THEME_SYSTEM.md`
- `docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `README.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Added the authentic founder profile photo to the About page firm profile section.
- Restored the Citadel topbar to a black surface and added preview-only light/dark mode controls in the desktop topbar and mobile drawer.
- Added subject-aware Citadel article thumbnails for cheque/NI Act, MSME, RERA/property, arbitration and commercial recovery themes.
- Added supplied dark logo assets and wired Citadel dark mode to swap the navbar and homepage hero logos while preserving the existing light-mode logo sources.
- Updated the Insights thumbnail system so homepage cards, Insights cards, filtered results and article hero backgrounds share the same thumbnail source.
- Reworked desktop Insights cards to place thumbnail media on the left and metadata/content on the right, while keeping mobile cards stacked.
- Redesigned the Insights pagination block.
- Bumped the public JavaScript cache string to `script.js?v=citadel-preview-4`.

Validation / notes:

- Confirmed `assets/css/style.css` still imports only `assets/css/themes/chambers-ak.css`; Citadel remains preview-only.
- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- Local asset existence checks passed for supplied dark logos and generated Citadel thumbnails.
- Confirmed no stale `citadel-preview-3` or `preview-3` cache strings remain.
- Local browser smoke passed for About page founder photo, Citadel dark-mode toggle, desktop Insights left-thumbnail cards, article hero thumbnail sync, mobile drawer dark-mode toggle and homepage dark-logo swapping; no console errors found.

Commits:

- Pending.

## 2026-05-10 14:15 IST - Add Citadel preview imagery

Files changed:

- `assets/css/themes/citadel-of-ak.css`
- `assets/img/citadel/`
- `docs/maintenance/THEME_SYSTEM.md`
- `README.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Added generated Citadel preview imagery for the homepage hero, legal-document article cards and tribunal-style editorial cards.
- Wired the images through the dormant Citadel theme only, using CSS backgrounds and card media slots so existing page HTML and the active Chambers theme remain unchanged.
- Documented the preview-only image asset folder and its approval boundary.

Validation / notes:

- Confirmed `assets/css/style.css` still imports only `assets/css/themes/chambers-ak.css`; Citadel remains preview-only.
- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- Citadel CSS image URL existence check passed for all new local image references.
- Local browser smoke passed on homepage and Insights with `?theme=citadel-of-ak`, including desktop and mobile viewport checks; no console errors found.

Commits:

- Pending.

## 2026-05-10 17:05 IST - Upgrade Citadel into full-site preview mode

Files changed:

- `assets/css/themes/citadel-of-ak.css`
- `assets/js/script.js`
- Public HTML files loading `assets/js/script.js`
- `theme-preview-citadel-of-ak.html`
- `docs/maintenance/THEME_SYSTEM.md`
- `README.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `CHANGELOG.md`

Summary:

- Reworked Citadel from a small static showcase into a preview mode for the real website.
- Added `?theme=citadel-of-ak` support so actual public pages load the dormant Citadel stylesheet, fonts and preview banner without changing the active theme.
- Preserved Citadel preview mode across internal links so homepage, practice, Insights, enquiry, contact, service, article and policy pages can be browsed as a working preview.
- Expanded the Citadel CSS to more closely reflect the Stitch package: marble-like white surface, obsidian feature panels, citadel gold borders, sharp geometry, editorial serif headings and Lato UI/body text.
- Updated the preview hub to link into working site pages using actual Chambers of AK assets and content.

Validation / notes:

- CSS variable check passed across shared, active and dormant theme files.
- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed for 58 HTML files.
- Local browser smoke passed for the preview hub plus actual homepage, practice, Insights, case enquiry, contact, service, article and privacy pages opened with `?theme=citadel-of-ak`.
- Confirmed preview pages dynamically load `citadel-of-ak.css`, set `data-theme="citadel-of-ak"`, show the preview banner, preserve `theme=citadel-of-ak` across internal links and produce no console errors.

Commits:

- Pending.

## 2026-05-10 16:35 IST - Add Citadel of AK dormant theme preview

Files changed:

- `assets/css/themes/citadel-of-ak.css`
- `theme-preview-citadel-of-ak.html`
- `docs/maintenance/THEME_SYSTEM.md`
- `README.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Reviewed the Stitch AI redesign package from `stitch_chambers_of_ak_redesign.zip`.
- Added a dormant `Citadel of AK` theme based on the Lex Regalis / Citadel direction: stark white, obsidian black, citadel gold, serif headings, Lato body text, sharp geometry and gold structural borders.
- Added a noindex preview showcase page that loads the Citadel theme without changing the active production theme.
- Documented that `assets/css/themes/chambers-ak.css` remains active and Citadel must not be activated without owner approval.

Validation / notes:

- Confirmed `assets/css/style.css` still imports only `assets/css/themes/chambers-ak.css`; Citadel is not active globally.
- CSS variable check passed across shared, active and dormant theme files.
- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- Internal `href`/`src` reference check passed for 58 HTML files.
- Local browser smoke passed for `theme-preview-citadel-of-ak.html`; preview loads both `style.css?v=theme-package-1` and `citadel-of-ak.css?v=preview-1`, has `noindex, nofollow`, and shows no console errors.

Commits:

- Pending.

## 2026-05-10 16:05 IST - Package website design as swappable theme

Files changed:

- `assets/css/style.css`
- `assets/css/themes/chambers-ak.css`
- Public HTML files loading `assets/css/style.css`
- `docs/maintenance/THEME_SYSTEM.md`
- `docs/maintenance/ARTICLE_HTML_TEMPLATE.md`
- `README.md`
- `docs/wiki/WORKFLOW.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Added a dedicated Chambers of AK theme package at `assets/css/themes/chambers-ak.css`.
- Moved sitewide fonts, colors, surfaces, lines, shadows, category colors and legacy design aliases into theme variables.
- Converted the shared stylesheet to consume theme tokens and import the active theme from one place.
- Bumped public page stylesheet cache strings to `style.css?v=theme-package-1`.
- Documented how future maintainers can swap the active theme without moving public website files.

Validation / notes:

- CSS variable check passed; all theme variables used by the shared stylesheet are defined.
- Confirmed all public pages that load `style.css` now use `style.css?v=theme-package-1`.
- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed for 57 HTML files.
- Local browser smoke passed for homepage, practice, Insights, case enquiry, contact, one service page, one article page and privacy policy with no console errors.

Commits:

- Pending.

## 2026-05-10 15:25 IST - Strengthen fourth AdSense readiness content batch

Files changed:

- `updates/section-138-cheque-bounce-limitation.html`
- `updates/cheque-bounce-notice-limitation.html`
- `updates/msme-45-days-payment-rule.html`
- `services/rera-lawyer-patna.html`
- `services/msme-recovery-lawyer-patna.html`
- `services/rera-lawyer-noida.html`
- `services/civil-litigation-lawyer-patna.html`
- `sitemap.xml`
- `feed.xml`
- `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Expanded Batch 4 of the AdSense readiness content pass across NI Act, MSME, RERA and civil litigation pages.
- Added liability/document review, route or forum selection, common-mistake guidance and stronger first-enquiry preparation.
- Updated article `dateModified` values, sitemap `lastmod` entries and feed descriptions for changed article pages.
- Recorded this as AdSense readiness content Batch 4.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed for 57 HTML files.
- Word-count spot check confirmed the seven strengthened pages now sit around 667-715 words.
- Local browser smoke passed for the seven changed public pages with no console errors.

Commits:

- Pending.

## 2026-05-10 14:45 IST - Strengthen third AdSense readiness content batch

Files changed:

- `services/msme-recovery-lawyer-bihar.html`
- `services/cheque-bounce-lawyer-patna.html`
- `services/rera-lawyer-bihar-up-delhi-ncr.html`
- `updates/rera-delayed-possession-bihar.html`
- `updates/commercial-suit-documents-checklist.html`
- `sitemap.xml`
- `feed.xml`
- `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Expanded Batch 3 of the AdSense readiness content pass across MSME, cheque bounce, RERA and commercial recovery pages.
- Added route/forum review, date sensitivity, first enquiry details, document guidance and common-mistake sections while preserving non-solicitation language.
- Updated article `dateModified` values, sitemap `lastmod` entries and the commercial checklist feed description.
- Recorded this as AdSense readiness content Batch 3.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Word-count spot check confirmed the five strengthened pages now sit around 630-708 words.
- Local browser smoke passed for the five changed public pages with no console errors.

Commits:

- `f6cd937` - Strengthen third AdSense readiness batch.

## 2026-05-10 14:15 IST - Strengthen second AdSense readiness content batch

Files changed:

- `services/arbitration-lawyer-bihar.html`
- `services/commercial-recovery-lawyer-patna.html`
- `updates/section-34-arbitration-award-challenge.html`
- `updates/arbitration-notice-before-claim.html`
- `sitemap.xml`
- `feed.xml`
- `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Expanded the second readiness batch with deeper arbitration and commercial recovery content.
- Added route-selection, limitation/date, response strategy and common-mistake guidance to two service pages and two arbitration articles.
- Updated article `dateModified` values, sitemap `lastmod` entries and feed descriptions for changed article pages.
- Recorded this as AdSense readiness content Batch 2.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Word-count spot check confirmed the four strengthened pages now sit around 603-704 words.
- Local browser smoke passed for the four changed public pages with no console errors.

Commits:

- `d5040f5` - Strengthen second AdSense readiness batch.

## 2026-05-10 13:45 IST - Strengthen first AdSense readiness content batch

Files changed:

- `updates/msme-delayed-payment.html`
- `updates/bihar-rera-complaint.html`
- `updates/property-injunction-suit-documents.html`
- `document-checklists.html`
- `sitemap.xml`
- `feed.xml`
- `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `CHANGELOG.md`

Summary:

- Expanded the thinnest public readiness pages with document-led, non-solicitation content for MSME delayed payment, RERA complaint preparation, property injunction documents and document checklist preparation.
- Updated article `dateModified` values and sitemap `lastmod` entries for the changed public pages.
- Refreshed the property injunction feed description to reflect the strengthened article.
- Recorded this as the first AdSense readiness content batch.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Word-count spot check confirmed the four strengthened pages now sit around 539-595 words.
- Local browser smoke passed for the four changed public pages with no console errors.

Commits:

- `c730c5d` - Strengthen AdSense readiness content batch.

## 2026-05-10 13:20 IST - Document AdSense article-only ads plan

Files changed:

- `privacy-policy.html`
- `disclaimer.html`
- `terms.html`
- `README.md`
- `docs/README.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/google/GOOGLE_SETUP.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`
- `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/codex/HANDOFF.md`
- `CHANGELOG.md`

Summary:

- Updated public Privacy Policy, Disclaimer and Terms with advertising, AdSense, third-party ad technology and article-only ad placement language.
- Recorded the user-approved direction that any future ads should appear only on article-style pages and remain subtle.
- Added an internal AdSense approval and article ads plan covering the rejection-readiness path, placement limits and consent/cookie follow-up.
- Recorded that the current AdSense dashboard exposes only limited account-not-approved onboarding options and that Customer ID/account identifiers should not be requested or documented.
- Updated repository documentation and Codex handoff notes so future work does not place ads on homepage, enquiry/contact, practice/service landing pages or policy/trust pages.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Local browser smoke passed for `privacy-policy.html`, `disclaimer.html` and `terms.html`; each showed the 10 May 2026 update date and no console errors.

Commits:

- `7ed5590` - Document AdSense article-only ads plan.

## 2026-05-10 07:45 IST - Align Insights pills with homepage

Files changed:

- `assets/css/style.css`
- `legal-updates.html`
- `CHANGELOG.md`

Summary:

- Aligned Insights page category badges and topic tag chips with the rounded gold-outline pill style used by homepage Latest Legal Insights cards.
- Kept the Insights page category/tag filtering behavior unchanged.
- Bumped the Insights page CSS cache string to `insights-pills-1`.

Validation / notes:

- `git diff --check` passed with line-ending warnings only.
- Confirmed `legal-updates.html` now loads `style.css?v=insights-pills-1` and keeps the existing JS cache string unchanged.
- Local browser smoke passed on `legal-updates.html`; Insights category badge and topic tag text rendered, and no console errors appeared.
- Post-deployment live check passed: `legal-updates.html` served `insights-pills-1`, Insights badge/tag text rendered, and no console errors appeared.

Commits:

- `a285f15` - Align Insights pills with homepage.

## 2026-05-10 07:32 IST - Homepage latest insights freshness pass

Files changed:

- `index.html`
- `assets/js/script.js`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `CHANGELOG.md`

Summary:

- Bumped homepage CSS/JS cache strings to `home-fresh-1`.
- Changed the homepage Latest Legal Insights renderer to fetch `feed.xml` with a per-load cache-busting query and `no-store` request mode.
- Preserved the static homepage insight cards as SEO/no-JS fallback and added a shared-registry fallback if feed loading fails.
- Kept registry metadata for feed-matched cards so homepage badges continue to show article type while smaller chips show legal topics.
- Updated homepage Latest Legal Insights card layout to a balanced three-card row instead of the older oversized-first-card grid.
- Synced planning docs with the homepage freshness rule.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Local browser smoke passed for `/` and `/index.html`; homepage Latest Legal Insights rendered 3 cards from `feed.xml` with `data-home-insights-source="feed"` and no console errors.
- Local mobile-width browser smoke passed; homepage latest cards stacked cleanly and rendered from `feed.xml`.
- Post-deployment live checks passed for `/` and `/index.html`: both served `home-fresh-1`, rendered 3 Latest Legal Insights cards from `feed.xml`, and showed no console errors.
- Live mobile-width homepage smoke passed with 3 feed-rendered cards and no console errors.

Commits:

- `4becd72` - Refresh homepage latest insights.

## 2026-05-10 00:27 IST - Insights category and tag polish

Files changed:

- `legal-updates.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/planning/INSIGHTS_CATEGORY_RESTRUCTURE_PLAN.md`
- `docs/codex/HANDOFF.md`
- `CHANGELOG.md`

Summary:

- Updated Insights page labels so primary card badges consistently show article type: Case Brief, Legal Update, Practical Guide, Checklist or Procedure Note.
- Kept legal topics in the smaller tag row and added click-to-filter behaviour for category badges and topic tags.
- Added dependent category/tag datalist refresh and direct free-switching between incompatible category/tag choices.
- Added the missing `commercial-suit-documents-checklist.html` item to the shared Insights registry and corrected its page metadata/tags on the Insights hub.
- Fixed the shared Insights category-class normalizer so dynamically rendered Case Brief cards receive the correct `tag-case-brief` styling.
- Polished Insights filter panel, category badges, topic chips and list-card hover states.
- Bumped the Insights page CSS/JS cache strings.
- Updated planning/handoff docs to reflect the current Insights patch and the completed Contact cleanup deployment check.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Insights visible card hrefs and shared JS registry hrefs are aligned.
- Local browser smoke test passed on `legal-updates.html`: category filter, tag filter, free-switching, clickable topic chips and clickable category badges worked without console errors.
- Post-deployment live check passed after deployment: `insights-polish-1` CSS/JS cache strings served, category/tag/free-switching filters worked, clickable topic chips/category badges worked and no console errors appeared.

Commits:

- `6b372e4` - Polish Insights categories and filters.

## 2026-05-09 23:27 IST - Contact cleanup and documentation sync

Files changed:

- `contact.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `README.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/README.md`
- `docs/codex/HANDOFF.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Updated Contact page copy so the dynamic form reflects the current direct EmailJS Send Enquiry flow.
- Kept WhatsApp, Gmail and copy-prepared-message fallbacks intact.
- Routed EmailJS status text to the visible Contact form status area and added status tone styling.
- Bumped the Contact page CSS/JS cache strings.
- Synced README, master plan, Codex handoff, SEO agenda, upgrade agenda, docs index and wiki workflow with the current Contact/EmailJS state.
- Recorded that `.wiki-clone/` and `.wiki-work/` were inspected locally and remain preserved, untracked working folders.
- No EmailJS private key was added.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Local browser smoke test passed for the patched Contact form on desktop and mobile; no live EmailJS send was submitted.
- Current live route checks returned HTTP 200 for homepage, Practice, Insights, Case Enquiry, Courts, FAQ, Process, Contact, sitemap, feed and ads.txt.
- Live browser smoke test passed for homepage mobile drawer and Insights filtering before the next feature/content patch.
- Post-deployment Contact live check remains required after commit/push.

Commits:

- Commit hash to be recorded after commit.

## 2026-05-09 22:48 IST - EmailJS template ID correction

Files changed:

- `assets/js/script.js`
- `contact.html`
- `CHANGELOG.md`

Summary:

- Corrected the EmailJS Template ID from `ContactEmailTemplateID` to `contactformtempid`.
- Preserved EmailJS Public Key `rivGZ1UliuSkSgFdm` and Service ID `chambersofak`.
- Bumped the Contact page JavaScript cache string.
- Kept EmailJS send flow, WhatsApp fallback, Gmail fallback and copy fallback unchanged.
- No private key was added.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 22:34 IST - EmailJS public key correction

Files changed:

- `assets/js/script.js`
- `contact.html`
- `CHANGELOG.md`

Summary:

- Corrected the EmailJS Public Key from `rivGZ1liuSkSgFdm` to `rivGZ1UliuSkSgFdm`.
- Preserved EmailJS Service ID `chambersofak` and Template ID `ContactEmailTemplateID`.
- Bumped the Contact page JavaScript cache string.
- Kept EmailJS send flow, WhatsApp fallback, Gmail fallback and copy fallback unchanged.
- No private key was added.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:58 IST - EmailJS contact form integration v2

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Recovered from the failed v1 EmailJS patch by robustly inserting the EmailJS browser SDK into `contact.html`.
- Connected the Contact page dynamic enquiry form to EmailJS for direct website enquiry delivery.
- Added a direct `Send Enquiry` button while preserving WhatsApp, Gmail and copy fallback options.
- Configured EmailJS with public browser key, service ID `chambersofak` and template ID `ContactEmailTemplateID`.
- Mapped website form fields to template variables: `from_name`, `phone`, `reply_to`, `location`, `preferred_contact`, `matter_type`, `urgency`, `message` and `page_url`.
- Did not add any EmailJS private key.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy using EmailJS dashboard history/inbox confirmation.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:56 IST - EmailJS contact form integration

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Connected the Contact page dynamic enquiry form to EmailJS for direct website enquiry delivery.
- Added EmailJS browser SDK on the Contact page.
- Added a direct `Send Enquiry` button while preserving WhatsApp, Gmail and copy fallback options.
- Configured EmailJS with public browser key, service ID `chambersofak` and template ID `ContactEmailTemplateID`.
- Mapped website form fields to template variables: `from_name`, `phone`, `reply_to`, `location`, `preferred_contact`, `matter_type`, `urgency`, `message` and `page_url`.
- Kept confidentiality and no advocate-client relationship warnings intact.
- Did not add any EmailJS private key.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy using EmailJS dashboard history/inbox confirmation.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:26 IST - Contact form prepared-message newline fix

Files changed:

- `assets/js/script.js`
- `contact.html`
- `CHANGELOG.md`

Summary:

- Fixed prepared enquiry message formatting so line breaks render as real newlines instead of literal `\n` text.
- Bumped the Contact page JavaScript cache string.
- Kept WhatsApp/Gmail prefilled share-link behaviour unchanged.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:21 IST - Contact form prefilled share links v3

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Recovered from the failed v1/v2 partial patch state by replacing the dynamic contact-form JavaScript module with a clean known-good version.
- WhatsApp now opens Chambers of AK chat with the prepared enquiry message prefilled.
- Gmail now opens through Google Account Chooser / Gmail compose with recipient, subject and prepared enquiry body prefilled.
- Kept copy-to-clipboard functionality and form UI unchanged.
- Bumped the Contact page JavaScript cache string.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Literal background paste is not possible for browser security reasons; this uses app-supported prefilled message URLs.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:19 IST - Contact form prefilled share links v2

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Fixed the Contact form share-link behavior after the failed v1 validation.
- WhatsApp now opens Chambers of AK chat with the prepared enquiry message prefilled.
- Gmail now opens through Google Account Chooser / Gmail compose with recipient, subject and prepared enquiry body prefilled.
- Kept copy-to-clipboard functionality and form UI unchanged.
- Bumped the Contact page JavaScript cache string.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Literal background paste is not possible for browser security reasons; this uses app-supported prefilled message URLs.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:17 IST - Contact form prefilled share links

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Updated the generated contact form WhatsApp button to open Chambers of AK chat with the prepared enquiry message prefilled.
- Updated the Gmail/account-chooser link builder to include the prepared enquiry message as the Gmail compose body.
- Kept copy-to-clipboard functionality and form UI unchanged.
- Bumped the Contact page JavaScript cache string.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Literal background paste is not possible for security reasons; this uses app-supported prefilled message URLs.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:06 IST - Contact form Gmail account chooser fix

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Updated the generated contact form Gmail action to route through Google Account Chooser before opening Gmail compose.
- Renamed the generated form button from `Open Gmail` to `Choose Gmail Account`.
- Preserved prefilled recipient, subject and prepared enquiry body.
- Bumped the Contact page JavaScript cache string.
- Kept form UI, WhatsApp and copy functionality otherwise unchanged.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Manual browser test recommended after GitHub Pages redeploy by using multiple logged-in Google accounts.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 20:46 IST - Contact form Gmail compose fix

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Changed the generated contact form result's email button from a `mailto:` link to Gmail web compose.
- Added JavaScript to prefill Gmail recipient, subject and prepared enquiry message body.
- Renamed the generated form button from `Open Email` to `Open Gmail`.
- Bumped the Contact page JavaScript cache string.
- Kept the main contact email links, WhatsApp button and form UI otherwise unchanged.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 20:34 IST - Contact dynamic form UI step 1

Files changed:

- `contact.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Added a dynamic structured enquiry form to the Contact page.
- Matter type selection now reveals relevant fields for cheque bounce, MSME, RERA, arbitration, commercial recovery, property/civil suit and other enquiries.
- Added client-side message generation and copy-to-clipboard functionality.
- Kept email delivery inactive for Step 1; EmailJS connection remains a later Step 2 after keys are available.
- Preserved confidentiality warning, no-document-upload position and no advocate-client relationship caution.
- Updated Contact page CSS/JS cache strings and sitemap freshness.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual contact form browser test remains required after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:39 IST - Footer visual normalization

Files changed:

- `assets/css/style.css`
- Public HTML files using `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Normalized footer CSS so grouped footer headings and links render consistently across public pages.
- Refined `Main`, `Resources` and `Legal` headings with gold serif styling and a subtle separator line.
- Bumped all public page stylesheet references to `style.css?v=footer-normalize-1` to avoid mixed cached footer CSS across pages.
- Kept footer structure and top navigation unchanged.
- Public HTML files with stylesheet cache updates: 56.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual cross-page footer check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:32 IST - Footer heading visual refinement

Files changed:

- `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Refined grouped footer headings so `Main`, `Resources` and `Legal` read as distinct premium footer section labels.
- Added serif/gold styling with a subtle separator line under each footer group heading.
- Kept footer structure, links, sitemap and HTML unchanged.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- CSS-only public website refinement.
- Manual footer check recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:26 IST - Footer and internal-link polish pass

Files changed:

- Public HTML files containing the site footer
- `assets/css/style.css`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Replaced flat footer links with grouped footer navigation across public pages.
- Added footer groups: Main, Resources and Legal.
- Added contextual links on Contact, FAQ, Process and Courts pages.
- Updated sitemap `lastmod` dates for changed public HTML pages already listed in the sitemap.
- Preserved the existing top navigation and non-solicitation footer note.
- Changed HTML files count: 56.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:20 IST - Planning documentation sync

Files changed:

- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `CHANGELOG.md`

Summary:

- Synced the master plan and upgrade agenda with the accepted stable checkpoint `ef11809 Strengthen trust and forum guidance`.
- Recorded completed website work: homepage Insights fix, Insights filtering/pagination/list fixes, Practice hub strengthening, Case Enquiry copy templates, technical SEO pass, sitewide breadcrumbs, Trust / Entity pass and ads.txt confirmation.
- Recorded the next plan of action: live stability review, footer/internal-link polish, Contact page improvement, Search Console follow-up and future content expansion.
- Recorded current workflow standards for PowerShell 7 patches, GitHub account selection, noreply email identity and safe non-fast-forward recovery.
- Preserved non-solicitation, document-led and no-thin-SEO-page guidance.

Validation / notes:

- `git diff --check` passed.
- Documentation-only update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:01 IST - Trust and entity improvement pass

Files changed:

- `courts.html`
- `process.html`
- `faq.html`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Strengthened the Courts page with working-region context, forum boundaries and a forum-route checklist.
- Strengthened the Process page with conflict/scope checks, confidentiality caution, no-outcome assurance, document indexing and limitation screening.
- Strengthened the FAQ page with trust-oriented answers on engagement, confidentiality, fees/scope, forums, urgency and location feasibility.
- Updated sitemap `lastmod` dates for the changed trust/entity pages.
- Preserved informational, non-solicitation language and avoided comparative/promotional claims.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 01:34 IST - Sitewide breadcrumb structured data pass

Files changed:

- Public HTML pages missing `BreadcrumbList` structured data
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Added sitewide breadcrumb JSON-LD to meaningful public HTML pages that were missing it.
- Skipped non-content verification files and avoided duplicating existing breadcrumbs.
- Used hierarchy: Home, Practice, Services, Insights and article/service/page titles.
- Updated sitemap `lastmod` dates for changed public HTML pages already listed in the sitemap.
- Changed HTML files count: 54.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual Google Search Console inspection remains a follow-up after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 01:14 IST - Technical SEO and sitemap freshness pass

Files changed:

- `practice.html`
- `case-enquiry.html`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Added structured data to the Practice hub page using a `CollectionPage` schema with breadcrumb information.
- Added breadcrumb JSON-LD to the Case Enquiry page while preserving the existing FAQPage schema.
- Updated sitemap `lastmod` dates for recently changed hub pages: home, Practice, Insights and Case Enquiry.
- Left `robots.txt` unchanged because it already allows crawling and references the sitemap/feed.
- Left `feed.xml` unchanged because no new article was published in this pass.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual Search Console inspection remains a follow-up after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:59 IST - Case enquiry copy-template improvement

Files changed:

- `case-enquiry.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Added copy-ready matter-specific enquiry templates for cheque bounce, MSME, RERA, arbitration, commercial recovery and property/civil suit matters.
- Added copy-to-clipboard buttons with fallback behaviour.
- Added lightweight styling for enquiry template cards.
- Preserved confidentiality warning and non-solicitation language.
- Bumped `case-enquiry.html` CSS/JS cache strings.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:46 IST - Practice hub strengthening pass

Files changed:

- `practice.html`
- `CHANGELOG.md`

Summary:

- Strengthened the main Expertise & Practice Areas hub with document-led practice readiness content.
- Added related Insights links by practice cluster for cheque bounce, MSME, commercial recovery, RERA, arbitration and property/civil suit matters.
- Added structured enquiry-preparation guidance to connect the Practice page with Case Enquiry and Document Checklists.
- Preserved informational, non-solicitation language and public file locations.
- Did not modify the six individual practice pages in this pass.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:27 IST - Insights default section previews and View All pagination

Files changed:

- `assets/js/script.js`
- `assets/css/style.css`
- `legal-updates.html`
- `CHANGELOG.md`

Summary:

- Updated the Insights page default/no-filter mode so each editorial article block shows only its first 3 article cards.
- Added section-level View All behaviour so each block can open its own paginated Matching Insights list.
- Kept category, tag and search filters in the paginated Matching Insights format.
- Preserved natural browser scrolling and max 10 cards per page.
- Bumped `legal-updates.html` CSS/JS cache strings for the revised Insights block-preview behaviour.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:18 IST - Insights filter results list UI fix

Files changed:

- `legal-updates.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Updated the Insights page filter behaviour so grouped editorial sections remain visible only in the inactive/default view.
- When category, tag, search, or View All Latest Articles is active, the page now shows the Matching Insights block and hides the other grouped article blocks below the filter panel.
- Removed internal scrolling from the Matching Insights results list so the page uses normal browser scrolling.
- Converted Insights page cards to a list-style layout to reduce empty grid spaces at changing screen widths.
- Kept pagination at a maximum of 10 article cards per page.
- Bumped `legal-updates.html` CSS/JS cache strings for the revised Insights UI.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:07 IST - Non-fast-forward patch recovery workflow

Files changed:

- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Documented the non-fast-forward issue that can occur when a local patch commit is amended after `origin/main` has advanced.
- Added the safe recovery pattern: `git reset --soft origin/main`, recommit, then push.
- Clarified that reusable patch scripts should set the `advabhijeet` noreply identity before creating commits.
- Clarified that scripts should avoid `git commit --amend` unless they first confirm the target commit has not been pushed and the local branch is not behind `origin/main`.
- Reconfirmed that force-push should not be used by default.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-08 23:50 IST - Local GitHub account selection workflow

Files changed:

- `README.md`
- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Added local GitHub account-selection guidance for manual patch workflows.
- Recorded that this repository should prefer the `advabhijeet` GitHub account for local commits and pushes unless instructed otherwise.
- Added a reusable PowerShell 7 setup block using `git config user.name`, `credential.https://github.com.useHttpPath true` and `gh auth switch --hostname github.com --user advabhijeet`.
- Clarified that this is local Git/GitHub authentication and does not require ChatGPT GitHub App write access.
- Recorded the repository GitHub noreply email `281193757+advabhijeet@users.noreply.github.com` to avoid private-email push rejection.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-08 23:41 IST - Manual patch diff output policy

Files changed:

- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Added a terminal diff output policy for future manual patch packages.
- Set `git diff --stat` and `git diff --name-only` as the default terminal output style.
- Documented that full diffs should be saved to a temporary diff log or shown only through an explicit verbose switch.
- Reduced the risk of long terminal output when shared files such as `assets/js/script.js` or `legal-updates.html` are changed.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-08 23:38 IST - Homepage and Insights structure fixes

Files changed:

- `index.html`
- `legal-updates.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `README.md`
- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Recorded Fix 1 homepage structure correction from commit `ebb1aad`.
- Fix 1 removed the duplicate homepage Latest Legal Insights section and duplicate older Case Enquiry section.
- Repaired the Insights page filter behaviour so category, tag and search inputs render matching insight cards in a dedicated results section.
- Repaired the `View All Latest Articles` CTA so it opens a latest-first paginated list.
- Limited Insights result pagination to maximum 10 articles per page.
- Added lightweight pagination styling for the Insights results section.
- Updated cache-busting query strings on `legal-updates.html` for the repaired CSS and JS.
- Updated manual workflow documentation to record PowerShell 7 / `pwsh` as the preferred shell for local patch and validation work.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing completed during the patch run.
- Internal href/src reference validation completed during the patch run.
- Browser/mobile live smoke testing remains a manual follow-up after GitHub Pages redeploys.

Commits:

- `ebb1aad` - Fix homepage insights structure.
- `8374976` - Fix insights filters and latest pagination.
## 2026-05-08 23:34 IST - PowerShell 7 manual patch workflow guide

Files changed:

- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Added a universal PowerShell 7 manual patch command pattern.
- Documented that downloadable patch ZIP files should be assumed to be in the user's default Downloads folder unless another path is given.
- Documented that the command should extract the ZIP into the repository root before running the patch package apply script.
- Reconfirmed that package apply scripts should back up files, validate, stage only intended files, commit and push.
- Reconfirmed that `.wiki-clone/` and `.wiki-work/` must not be committed through broad staging.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
All meaningful website, repository and documentation changes should be recorded here.

Time zone: Asia/Kolkata (IST) unless otherwise stated.

## 2026-05-07 - Next website upgrade agenda and validation status

Files created:

- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`

Files updated:

- `docs/README.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/codex/HANDOFF.md`
- `CHANGELOG.md`

Summary:

- Added a dedicated next-stage website upgrade agenda for Chambers of AK.
- Recorded the manual validation results completed from the local Codex repository folder.
- Added the ordered plan for Codex/wiki sync, live smoke testing, practice-page strengthening, pending legal update articles, Insights distribution/newsletter workflow, case-enquiry improvements, trust/entity improvements, future service pages and future Team page restrictions.
- Updated the docs index and SEO growth agenda to reference the new upgrade agenda.
- Updated Codex handoff with active items for `.wiki-clone/` / `.wiki-work/` inspection and browser/mobile validation.

Validation / notes:

- Public website files were not modified.
- GitHub connector-only documentation update; local browser/mobile smoke testing remains pending.
- User-reported manual validation already passed: JavaScript syntax, git diff whitespace check, sitemap XML, JSON-LD parsing with 44 blocks, and internal href/src references.

Commits:

- `0d938ce928f6c350b676c3d63675a6da8212c541` - Add next website upgrade agenda.
- `5c219fd5cd64a5df7f286a3c30f7c2c95e20f561` - Update docs index with upgrade agenda.
- `3f341dda522d41261696c082daf36b3be40f31d5` - Update SEO agenda with validation and upgrade plan.
- `5e8f447f7f724471c83209c6feb909950928d748` - Update Codex handoff with agenda and validation status.

## 2026-05-06 23:05 IST - Documentation structure reorganization

Files created/moved:

- `docs/REPOSITORY_ORGANIZATION.md`
- `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`
- `docs/codex/HANDOFF.md`
- `docs/codex/PROMPT_RULE.md`
- `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/planning/TEAM_PAGE_AGENDA.md`
- `docs/wiki/WORKFLOW.md`

Files updated:

- `README.md`
- `docs/README.md`
- `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`
- `CHANGELOG.md`

Old files removed after relocation:

- `docs/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`
- `docs/CODEX_HANDOFF.md`
- `docs/CODEX_PROMPT_RULE.md`
- `docs/CODEX_WIKI_WORKFLOW.md`
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/SEO_GROWTH_AGENDA.md`
- `docs/TEAM_PAGE_AGENDA.md`

Summary:

- Reorganized internal documentation into clear subfolders: `audits`, `codex`, `google`, `maintenance`, `planning`, `seo` and `wiki`.
- Preserved all public website files and URL-bearing folders in place.
- Updated README and docs index to reflect the new documentation map.
- Added a repository organization guide to document file-placement and cleanup rules.
- Updated historical SEO batch record so its forward references point to the new Codex and planning paths.
- Recorded Codex unavailability due to usage limit and kept local validation as a follow-up.

Validation / notes:

- Public website files were not moved.
- Local code validation was not run in this connector-only pass.
- Next recommended step remains local/Codex validation when available: JavaScript syntax, internal links, JSON-LD, sitemap XML, footer links and CTA checks.

Commits:

- `7b16206ddd7d5fb677bf04007f0570c2cd7d873f` - Move repository audit into docs/audits.
- `90d2c5c3f9209cfceef2e3318491a730d2210bd0` - Move Codex handoff into docs/codex.
- `5af7da9b3b80c7e0a2036cae6a8a389a67526b32` - Move Codex prompt rule into docs/codex.
- `87b78a24250a0d6bf5c1c6964989190cd4d85afc` - Move wiki workflow into docs/wiki.
- `c80749343cf442132c6a6b3e81310bf93de8206d` - Move legal documentation maintenance into docs/maintenance.
- `187389bf5a5621d4d3e0e176a4d1f3882d7de08a` - Move Team page agenda into docs/planning.
- `72ba76d4cdbd0074ac13f303f4e6b0007aa722f0` - Move SEO growth agenda into docs/planning.
- `635533da77d7c425be548b38e50a5aa55eadfe7b` - Add repository organization guide.
- `d9ac363ea9d4e7e9e8ec0281bfb5ab622d1769d8` - Remove old audit doc after move.
- `539ab5adbfacc6a08786f908ed366149a3848534` - Remove old Codex handoff after move.
- `94166194f3d2f96446c0e0c048fc9d814e77530b` - Remove old Codex prompt rule after move.
- `55e1b0b304a924664e15d262fe61fe7d481515bd` - Remove old wiki workflow after move.
- `02c1dc8ae3809f24f4c45334a294f978d2024b26` - Remove old maintenance doc after move.
- `3e0eb2b8372e0a454e3991cbe1233cb24fe4b7d9` - Remove old SEO growth agenda after move.
- `d38b3b298158e488474cf2233df2a8a1098e012a` - Remove old planning note after relocation.
- `0612c3864df6bcdd13bc2c4265aaade718b85acf` - Update docs README after documentation reorganization.
- `b13a7e3d1ddbc8efecff92463b9174ae7a90c7eb` - Update README paths after documentation reorganization.
- `90b4265c727c60e37c59f17fdbcdfe5d262bebec` - Update SEO batch record paths after docs reorganization.

## 2026-05-06 22:20 IST - Documentation sync, audit record and cleanup

Files changed:

- `CHANGELOG.md`
- `docs/README.md`
- `docs/CODEX_HANDOFF.md`
- `docs/CODEX_PROMPT_RULE.md`
- `docs/CODEX_WIKI_WORKFLOW.md`
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`
- removed `docs/seo/SEO_BATCH_2_PLAN.md`

Summary:

- Added a formal website and repository audit document.
- Updated docs README with the current documentation map and wiki-sync status.
- Refreshed Codex handoff and prompt guidance for the next validation stage.
- Updated the in-repository wiki mirror with current firm/team positioning, changelog rule, documentation workflow and SEO focus.
- Updated the legal/documentation maintenance checklist to make changelog updates mandatory.
- Removed the obsolete Batch 2 planning file because Batch 2 service-page work is complete and the roadmap/changelog supersede it.

Notes:

- Direct GitHub Wiki access was not available through the connector; `docs/CODEX_WIKI_WORKFLOW.md` remains the repository wiki mirror.
- Local code validation was not run in this connector-only documentation pass; next recommended step is Codex/local validation.

Commits:

- `598dfade6f4a86758da62475002d5dca21cd53d0` - Add website and repository audit.
- `6c33ab9749130ed98bc8beb6020f67a2cfbd9b54` - Update docs README after audit.
- `f18f4c39defae700364bda597ca0ac704166a970` - Refresh Codex handoff after repository audit.
- `6587ffc43f48e41a872b69f544d08797eada63fd` - Update Codex prompt rule after audit.
- `27468ea2aaa176c713b558b53f2a87663653f080` - Sync wiki workflow after audit.
- `a840b5c5280b4b339a12242f5d3a8ddf1005b32c` - Add changelog rule to legal documentation maintenance.
- `930f157b634cb44a892c70b8cb8dad8355af6bf5` - Remove obsolete Batch 2 planning doc.

## 2026-05-06 21:54 IST - Repository audit documentation pass

Files changed:

- `README.md`
- `CHANGELOG.md`

Summary:

- Refreshed the README after a repository and website documentation audit.
- Re-positioned documentation around the current firm/team-focused website structure.
- Added explicit change-tracking policy requiring `CHANGELOG.md` updates after every meaningful modification.
- Documented current public page groups, service clusters, legal update clusters, SEO rules, quality checks, deployment process, rollback process and maintenance rules.
- Created this changelog as the primary chronological record for future changes.

Notes:

- GitHub connector access confirmed for main repository files.
- GitHub wiki repository fetch attempts returned `Not Found`; wiki content could not be directly edited through the current connector state.

Commits:

- `7f95336f27286516074f078ce9cff07c443535de` - Update README after repository audit.
- `358e307b5fb8927a0496d6c1f8f0d07493a0bdd9` - Create changelog.

## 2026-05-06 - Firm/team positioning update

Files changed:

- `index.html`
- `about.html`
- `practice.html`
- `docs/TEAM_PAGE_AGENDA.md`

Summary:

- Made homepage firm-focused and removed founder portrait from the homepage hero.
- Added a firm-level homepage About section.
- Made About page language team-focused rather than founder-CV-focused.
- Expanded Expertise/Practice page with broader CV-based areas including real estate due diligence, title search, DRT, SARFAESI, NHAI-linked land acquisition, contracts, private documentation, taxation-aware review and trademark/IP advisory.
- Added a future Team page agenda document.

Commits:

- `e857f3ad26b0dc4bc556f264af4de85b77f7df5d` - Make About page team-focused.
- `c67bd07ea3bc1219f8033ab8a1758b3f6446e7ba` - Expand Expertise page with CV-based areas.
- `f443dd2faba4753ddc8699728fc1e0e956c8beff` - Make homepage firm-focused and remove portrait.
- `c7af88999f4ee2ddb0f5cf2b48c97f03c096d63c` - Add future Team page agenda.

## 2026-05-06 - Search Console indexing request recorded

Files changed:

- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Marked updated sitemap submission/re-submission and indexing requests for Batch 2 URLs as complete.
- Added Search Console monitoring as the next follow-up item.

Commits:

- `78005deaba0220ffcc9e99f9f68977f1bf64cd09` - Record Search Console indexing request completion.

## 2026-05-06 - Optional Batch 2 service page

Files changed:

- `services/cheque-bounce-lawyer-delhi-ncr.html`
- `sitemap.xml`
- `practice.html`
- `practice/cheque-bounce.html`
- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Added Delhi NCR cheque bounce service landing page.
- Added the page to sitemap and related internal links.
- Updated SEO agenda to mark the optional Batch 2 page complete.

Commits:

- `cabe6fd0e9c6d5f15d9b505f17f5733c12a9bbfd`
- `e20a5d146179ddc728fe82a6be7d4298f8ba9f9a`
- `400846bda18975df30218b67cf0e5e5aad35ed15`
- `1e03b46669878c9e77797111d8c670195c92f611`
- `0811f2edd94c7b018eef694d5f8d5dd735bda532`

## 2026-05-06 - Batch 2 service pages

Files changed:

- `services/cheque-bounce-lawyer-bihar.html`
- `services/property-dispute-lawyer-bihar.html`
- `services/civil-litigation-lawyer-bihar.html`
- `services/msme-recovery-lawyer-delhi-ncr.html`
- `services/rera-lawyer-noida.html`
- `services/rera-lawyer-gurugram.html`
- `sitemap.xml`
- `practice.html`
- relevant practice pages
- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Created Batch 2 high-intent service landing pages.
- Added sitemap entries and related internal links.
- Updated agenda progress after each page.

Notes:

- Detailed commit history is preserved in `docs/SEO_GROWTH_AGENDA.md` progress log and chat handoff records.

## 2026-05-06 - Homepage and mobile navigation improvements

Files changed:

- `index.html`
- `assets/css/style.css`
- `assets/js/script.js`
- related HTML files for cache-busting where applicable
- `docs/CODEX_HANDOFF.md`

Summary:

- Refreshed homepage Legal Insights behavior.
- Converted homepage Practice Areas into a mobile-friendly slider.
- Fixed mobile practice slider layout.
- Fixed mobile drawer scroll lock so the homepage does not scroll behind the open drawer.
- Fixed mobile drawer/footer social icons and preserved desktop topbar behavior.

Notes:

- User confirmed the related live UI fixes.

## 2026-05-05 to 2026-05-06 - Batch 1 SEO content and internal linking

Files changed:

- `case-enquiry.html`
- `courts.html`
- multiple `services/` pages
- multiple `updates/` pages
- `legal-updates.html`
- `practice.html`
- related practice pages
- `sitemap.xml`
- `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`
- `docs/CODEX_HANDOFF.md`
- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Upgraded Case Enquiry into a structured matter-intake hub.
- Expanded Courts page into a stronger courts/forums entity page.
- Added Batch 1 service pages and legal update articles.
- Expanded legacy articles that were too thin.
- Added internal links across homepage, practice pages, service pages, legal updates and enquiry pages.

Notes:

- Detailed Batch 1 commit list is preserved in `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`.

## 2026-05-05 - SEO Growth Agenda created

Files changed:

- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Created the main SEO roadmap for Chambers of AK.
- Defined core practice clusters, geography clusters, technical cleanup, service landing pages, legal updates, practice-page strengthening, local trust/entity pages and Search Console routine.

## Changelog Maintenance Rule

For every future meaningful modification:

1. Add a new entry at the top of this file.
2. Include date and time in IST if known.
3. List changed files.
4. Summarize what changed and why.
5. List validation performed or pending.
6. Add commit hash after commit if available.
