# Chambers of AK Website

Official static website repository for **Chambers of AK - Advocates & Legal Consultants**.

- Live site: https://chambersofak.in
- Repository: `advabhijeet/akassociates`
- Production branch: `main`
- Current public article count: **30**
- Current production baseline: **Chambers Citadel v1**

## Current status

The public site is stable and deployed through GitHub Pages. The July 2026 repository audit identified deployment-boundary, documentation, asset-weight and duplicated-content work. Cleanup Batch 1 is complete: internal documentation, preview pages and repository tools are excluded from the public Pages build, the sitewide SEO validator is enforced in CI, and a branded 404 page is active.

New article publication remains paused until the cleanup sequence reaches the content-resumption checkpoint.

## Technology

- Static HTML5 pages
- Shared CSS entry: `assets/css/style.css`
- Shared JavaScript entry: `assets/js/script.js`
- Active visual theme: `assets/css/themes/citadel-of-ak.css`
- Citadel production modules under `assets/css/themes/citadel-of-kang/` and `assets/js/themes/citadel-of-kang/`
- Central article registry: `assets/data/insights-registry.json`
- GitHub Pages with custom domain through `CNAME`
- Google Tag Manager and EmailJS browser integration
- No package-manager dependency for normal content edits

GitHub Pages performs the hosting build, but `_config.yml` excludes internal repository material from the public artifact.

## Public website structure

```text
index.html
about.html
practice.html
case-enquiry.html
contact.html
courts.html
legal-updates.html
document-checklists.html
faq.html
process.html
disclaimer.html
privacy-policy.html
terms.html
404.html

practice/
services/
updates/

assets/
  css/
  data/
  img/
  js/
```

Public discovery and platform files remain at the root:

```text
CNAME
robots.txt
sitemap.xml
feed.xml
ads.txt
site.webmanifest
google3164979181871a1d.html
favicon files
```

## Internal repository structure

```text
docs/       Internal documentation; excluded from the public Pages build.
preview/    Historical UI experiments; excluded from deployment.
tools/      Validation, publishing and maintenance scripts; excluded from deployment.
.github/    GitHub Actions workflows.
```

Do not place a public page under an excluded path.

## Deployment boundary

`_config.yml` is the source of truth for GitHub Pages exclusions. Internal documentation, previews, tools, repository notes and theme-development configuration must not become public web pages.

Validate the boundary with:

```powershell
node tools/validate-deployment-boundary.js
```

A new public path must be added to the correct public directory and must not be added to the exclusion list.

## Citadel theme status

### Live

- Chambers Citadel visual theme and light/dark modes
- Global Shell, topbar, mobile drawer and footer
- Article Index and Article Footer
- Thumbnail frame and featured-image modules
- Registry-driven Homepage and Legal Insights sections
- Blog filters, category/tag views and pagination
- Contact, enquiry and semantic page modules

### Paused

- clean standalone Citadel of Kang extraction
- public-safe configuration migration
- module registry/version consolidation
- Citadel Manager / CMS
- standalone theme repository

The active production inventory is documented in:

```text
docs/maintenance/theme/CITADEL_PRODUCTION_MODULE_INVENTORY.md
```

The old `assets/css/themes/chambers-ak.css` file remains a rollback fallback until a later controlled cleanup explicitly removes it.

## Article publishing

Every article must update the complete publication surface:

```text
updates/<slug>.html
assets/data/insights-registry.json
sitemap.xml
feed.xml
index.html static snapshot
legal-updates.html static snapshot
CHANGELOG.md
```

Required checks include canonical and social metadata, BlogPosting/Breadcrumb schema, approved 1200 x 675 article artwork, source/references, internal links and a visible review date.

Standing thumbnail rule:

```text
Do not place the Chambers of AK logo, monogram, firm name or branding block inside article thumbnails.
```

Publishing documentation:

```text
docs/maintenance/publishing/ARTICLE_PUBLISHING_WORKFLOW.md
docs/maintenance/publishing/ARTICLE_HTML_TEMPLATE.md
docs/maintenance/publishing/ARTICLE_REUSABLE_MODULES.md
docs/maintenance/publishing/CHAMBERS_ARTICLE_AND_SOCIAL_GUIDELINES.md
```

## Required validation

Run from the repository root:

```powershell
node --check assets/js/script.js
node tools/validate-article-encoding.js
node tools/validate-insights-registry.js --strict
node tools/sync-static-insight-cards.js --check
node tools/audit-articles-structure.js --strict
node tools/validate-seo-sitewide.js
node tools/validate-deployment-boundary.js
node tools/validate-documentation.js
git diff --check
```

The same critical checks run through `.github/workflows/validation.yml`.

## Change workflow

1. Synchronize with `origin/main`.
2. Confirm the working tree is clean.
3. Make one scoped change.
4. Run the applicable validators.
5. Inspect the diff and staged-file set.
6. Update `CHANGELOG.md`.
7. Commit and push.
8. Confirm `Chambers Validation` and GitHub Pages deployment.
9. Perform a live smoke test where public behavior changed.

Avoid force-pushing public history. Use a separate commit for each independently reversible change.

## Documentation

Start here:

```text
docs/PROJECT_ROADMAP.md
docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md
docs/README.md
CHANGELOG.md
```

The active documentation index distinguishes production documentation, active operations, future planning and archived history. Historical status snapshots are not current operating instructions.

## Current cleanup sequence

1. **Completed:** Deployment Boundary and Validator Integrity.
2. **Current:** Documentation Consolidation.
3. **Next:** Asset and Performance Cleanup.
4. **Then:** Service-Page Consolidation.
5. **Then:** Citadel Theme Restart.
6. **After cleanup:** resume the controlled Article 6-10 publishing run.

## Maintenance rules

- Keep public URLs stable.
- Keep internal material under excluded repository paths.
- Do not create thin location pages without distinct jurisdictional value.
- Keep legal and policy pages aligned with enquiry, tracking and advertising changes.
- Update sitemap, feed and registry together.
- Keep article thumbnails topic-specific, editorial and logo-free.
- Re-test desktop/mobile and light/dark behavior after shared theme changes.
- Preserve the rollback theme until the production baseline is tagged and documented.
- Update `CHANGELOG.md` after every meaningful modification.

## Rights

Brand assets, legal copy, article artwork and website materials belong to Chambers of AK and may not be reused without permission.
