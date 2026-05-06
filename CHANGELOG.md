# Changelog

All meaningful website, repository and documentation changes should be recorded here.

Time zone: Asia/Kolkata (IST) unless otherwise stated.

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

Validation / notes:

- GitHub connector access confirmed for main repository files.
- GitHub wiki repository fetch attempts returned `Not Found`; wiki content could not be directly edited through the current connector state.

Commits:

- `7f95336f27286516074f078ce9cff07c443535de` - Update README after repository audit.
- Pending - Create changelog.

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
