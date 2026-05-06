# Website and Repository Audit - 2026-05-06

Time zone: Asia/Kolkata (IST)

## Scope

This audit was performed before moving to the next development/SEO stage for the Chambers of AK website.

Reviewed areas:

- Root public pages.
- Public folders: `practice/`, `services/`, `updates/`, `assets/`.
- SEO files: `sitemap.xml`, `robots.txt`, metadata conventions and structured-data approach.
- Documentation files under `docs/`.
- README and change-tracking workflow.
- Wiki/documentation sync status.
- Recent positioning changes: firm/team-focused homepage, About page and Expertise page.

## Repository Overview

Repository: `advabhijeet/akassociates`

Live website: `https://chambersofak.in`

Deployment: GitHub Pages from the `main` branch.

Stack:

- Static HTML.
- Shared CSS: `assets/css/style.css`.
- Shared JavaScript: `assets/js/script.js`.
- Google Tag Manager: `GTM-5GMHQTJJ`.
- GA4 through GTM: `G-DCP7MK6V0V`.
- AdSense publisher ID: `pub-6935574990807827`.

## Current Public Structure

Root public pages:

- `index.html`
- `about.html`
- `practice.html`
- `case-enquiry.html`
- `contact.html`
- `courts.html`
- `legal-updates.html`
- `document-checklists.html`
- `faq.html`
- `process.html`
- `disclaimer.html`
- `privacy-policy.html`
- `terms.html`

Public content folders:

- `practice/` - detailed practice-area pages.
- `services/` - high-intent landing pages.
- `updates/` - legal update and guide articles.
- `assets/` - CSS, JavaScript, images, logos and brand assets.

Root infrastructure files:

- `CNAME`
- `robots.txt`
- `sitemap.xml`
- `ads.txt`
- `google3164979181871a1d.html`
- `site.webmanifest`
- favicon files

## Current Positioning Assessment

The website has moved from an individual-heavy presentation to a firm/team-focused structure.

Confirmed direction:

- Homepage should present Chambers of AK as the firm.
- Founder portrait should not be used in the homepage hero.
- About page should describe the firm and the team’s expertise.
- Individual profiles should be moved to a future `team.html` page.
- `practice.html` should operate as the main Expertise & Practice Areas page.

This direction is documented in the README, changelog, wiki mirror and team-page agenda.

## SEO Assessment

Current strengths:

- Custom domain in place.
- Root sitemap exists and includes current public URLs.
- Search-focused service pages exist for key clusters.
- Legal-update articles exist for several supporting informational queries.
- Practice pages and service pages are internally linked.
- Homepage Legal Insights can pull from `legal-updates.html`.
- Homepage Practice Areas use a mobile-friendly slider.
- Google Tag Manager is installed.

Remaining SEO/quality work:

- Run a full title/meta/canonical audit across all pages.
- Run full internal link/source validation locally.
- Run JSON-LD parsing locally.
- Monitor Search Console indexing status, impressions, queries and CTR.
- Add pending legal updates:
  - `updates/cheque-bounce-defence-after-summons.html`
  - `updates/msme-facilitation-council-process.html`
- Strengthen all six practice pages with evergreen sections where still pending.
- Consider future service pages only after monitoring current Batch 2 performance.

## Documentation Assessment

Current documentation has been consolidated around a clearer folder structure:

- `README.md` - main repository documentation.
- `CHANGELOG.md` - mandatory chronological change record.
- `docs/README.md` - documentation index.
- `docs/audits/` - repository and website audits.
- `docs/codex/` - Codex handoff and prompt rules.
- `docs/google/` - Google Search Console, GTM, GA4, GBP and AdSense setup notes.
- `docs/maintenance/` - legal/documentation maintenance checklist.
- `docs/planning/` - SEO roadmap and future Team page agenda.
- `docs/seo/` - historical SEO content batch records.
- `docs/wiki/` - in-repository GitHub Wiki mirror.

## Wiki Status

Attempted GitHub connector access to likely wiki repository paths:

- `advabhijeet/akassociates.wiki`, `Home.md`, `master`
- `advabhijeet/akassociates.wiki`, `Home.md`, `main`
- `advabhijeet/akassociates.wiki`, `Codex-Handoff.md`, `master`
- `advabhijeet/akassociates.wiki`, `Codex-Handoff.md`, `main`

Result: `Not Found`.

Practical conclusion:

- The GitHub Wiki content could not be directly edited from the current connector state.
- `docs/wiki/WORKFLOW.md` should remain the canonical wiki mirror inside the main repository.
- If the actual GitHub Wiki is enabled later, sync it manually from `docs/wiki/WORKFLOW.md`, `README.md`, `CHANGELOG.md`, and relevant docs.

## Cleanup Recommendation

Do not delete documentation blindly. The current useful docs are:

- `README.md`
- `CHANGELOG.md`
- `docs/README.md`
- `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`
- `docs/codex/HANDOFF.md`
- `docs/codex/PROMPT_RULE.md`
- `docs/google/GOOGLE_SETUP.md`
- `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/planning/TEAM_PAGE_AGENDA.md`
- `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`
- `docs/wiki/WORKFLOW.md`

The obsolete `docs/seo/SEO_BATCH_2_PLAN.md` was removed because Batch 2 is complete and tracked through the changelog, audit and SEO agenda.

## Required Operating Rule Going Forward

After every meaningful change:

1. Update `CHANGELOG.md`.
2. Review whether README/docs/wiki mirror need updates.
3. Review whether sitemap or legal pages are affected.
4. Run validation where possible.
5. Commit with a clear message.
6. Add final commit hash to changelog if the changelog entry was created before the commit.

## Next Recommended Stage

Before creating more pages:

1. Run technical SEO audit: titles, meta descriptions, canonicals, footer legal links.
2. Run local validation via Codex or manual terminal when available.
3. Monitor Search Console indexing and performance.
4. Then proceed to pending content work or practice-page strengthening.
