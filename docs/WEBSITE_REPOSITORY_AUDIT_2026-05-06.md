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

The website has recently moved from an individual-heavy presentation to a firm/team-focused structure.

Confirmed direction:

- Homepage should present Chambers of AK as the firm.
- Founder portrait should not be used in the homepage hero.
- About page should describe the firm and the team’s expertise.
- Individual profiles should be moved to a future `team.html` page.
- `practice.html` should operate as the main Expertise & Practice Areas page.

This direction is now documented in the README, changelog and team-page agenda.

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

Current documentation is useful but needed consolidation and change tracking.

Reviewed documentation:

- `README.md` - updated in this audit pass to reflect current firm/team-focused structure and changelog policy.
- `docs/README.md` - should be updated to include `CHANGELOG.md`, current docs map and wiki-sync status.
- `docs/CODEX_HANDOFF.md` - contains historical completed handoffs, but Next Planned Work needs updating away from old Batch 2 language.
- `docs/CODEX_PROMPT_RULE.md` - contains a stale current handoff prompt for pre-Batch 2 cleanup; should be updated before the next Codex handoff.
- `docs/CODEX_WIKI_WORKFLOW.md` - functions as the repository-side wiki mirror and should be updated to current firm/team positioning and changelog policy.
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md` - still useful; should reference the changelog requirement.
- `docs/SEO_GROWTH_AGENDA.md` - still useful; some content should be synced with recent firm/team positioning and Team page agenda.
- `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md` - useful historical batch record; keep.
- `docs/seo/SEO_BATCH_2_PLAN.md` - likely historical after Batch 2 completion; should be reviewed and either marked completed/archive-only or removed if redundant.
- `docs/TEAM_PAGE_AGENDA.md` - useful future planning note; keep until `team.html` is created.

## Wiki Status

Attempted GitHub connector access to likely wiki repository paths:

- `advabhijeet/akassociates.wiki`, `Home.md`, `master`
- `advabhijeet/akassociates.wiki`, `Home.md`, `main`
- `advabhijeet/akassociates.wiki`, `Codex-Handoff.md`, `master`
- `advabhijeet/akassociates.wiki`, `Codex-Handoff.md`, `main`

Result: `Not Found`.

Practical conclusion:

- The GitHub Wiki content could not be directly edited from the current connector state.
- `docs/CODEX_WIKI_WORKFLOW.md` should remain the canonical wiki mirror inside the main repository.
- If the actual GitHub Wiki is enabled later, sync it manually from `docs/CODEX_WIKI_WORKFLOW.md`, `README.md`, `CHANGELOG.md`, and relevant docs.

## Documentation Cleanup Recommendation

Do not delete documentation blindly. The current useful docs are:

- `README.md`
- `CHANGELOG.md`
- `docs/README.md`
- `docs/CODEX_HANDOFF.md`
- `docs/CODEX_PROMPT_RULE.md`
- `docs/CODEX_WIKI_WORKFLOW.md`
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/SEO_GROWTH_AGENDA.md`
- `docs/TEAM_PAGE_AGENDA.md`
- `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`

Potential cleanup target:

- `docs/seo/SEO_BATCH_2_PLAN.md` if it only duplicates already-completed Batch 2 work. If retained, mark it as historical/completed to avoid confusing future work.

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

1. Finish documentation sync and cleanup.
2. Update stale Codex handoff/prompt docs.
3. Run technical SEO audit: titles, meta descriptions, canonicals, footer legal links.
4. Run local validation via Codex where connector access is insufficient.
5. Then proceed to pending content work or practice-page strengthening.
