# Repository Documents

This folder keeps internal planning, audit, maintenance and handoff material separate from the public website files.

## Current Folder Map

```text
docs/
  CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md
  README.md
  REPOSITORY_ORGANIZATION.md
  audits/
    WEBSITE_REPOSITORY_AUDIT_2026-05-06.md
  codex/
    HANDOFF.md
    PROMPT_RULE.md
  google/
    GOOGLE_SETUP.md
  maintenance/
    LEGAL_DOCUMENTATION_MAINTENANCE.md
  planning/
    NEXT_WEBSITE_UPGRADE_AGENDA.md
    SEO_GROWTH_AGENDA.md
    TEAM_PAGE_AGENDA.md
  seo/
    SEO_CONTENT_BATCH_2026-05-05.md
  wiki/
    WORKFLOW.md
```

## Documentation Map

- `CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md` - primary working source of truth for current website state, roadmap and operating rules.
- `REPOSITORY_ORGANIZATION.md` - intended repository/documentation structure and cleanup rules.
- `audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md` - website and repository audit before the next development stage.
- `codex/HANDOFF.md` - active and completed handoff notes for work that requires Codex or local validation.
- `codex/PROMPT_RULE.md` - standing rule and prompt template for future Codex handoffs.
- `google/GOOGLE_SETUP.md` - Google Search Console, GTM, GA4, Google Business Profile and AdSense notes.
- `maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md` - checklist for keeping public legal pages and project documentation aligned with site changes.
- `planning/NEXT_WEBSITE_UPGRADE_AGENDA.md` - ordered next-stage upgrade plan, including validation follow-up, practice-page strengthening, pending articles and Insights distribution workflow.
- `planning/SEO_GROWTH_AGENDA.md` - primary SEO roadmap and remaining growth work.
- `planning/TEAM_PAGE_AGENDA.md` - future `team.html` planning note.
- `seo/SEO_CONTENT_BATCH_2026-05-05.md` - historical Batch 1 SEO content record.
- `wiki/WORKFLOW.md` - repository-side wiki/workflow mirror for structure, deployment, SEO, analytics, legal review, maintenance and validation.

Root-level documentation:

- `../README.md` - main repository documentation and operating rules.
- `../CHANGELOG.md` - chronological record of meaningful website, repository and documentation changes.

## Documentation Status

The repository treats `CHANGELOG.md` as mandatory after every meaningful modification. Any future website, SEO, tracking, branding, legal-positioning, page-structure or documentation change should update the changelog during the same work cycle.

## Wiki Sync Status

The GitHub Wiki could not be accessed through the connector state during the 2026-05-06 audit. Until the GitHub Wiki is reachable, use `wiki/WORKFLOW.md` as the canonical wiki mirror inside the repository.

If the GitHub Wiki is later enabled/reachable, sync it manually from:

- `README.md`
- `CHANGELOG.md`
- `docs/wiki/WORKFLOW.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`

## Root Files That Should Stay At The Site Root

- `index.html` and top-level public pages keep their current URLs for GitHub Pages and Google indexing.
- `CNAME`, `robots.txt`, `sitemap.xml`, `ads.txt`, and `google3164979181871a1d.html` must stay at the root because external services look for them there.
- `assets/`, `practice/`, `services/`, and `updates/` are public website folders.

## Change Workflow

When adding future internal notes, place them under the correct `docs/` subfolder. When adding public pages, place them in the appropriate public folder and update `sitemap.xml`.

When changing website structure, tracking, contact methods, social links, branding, professional positioning or enquiry flows, also review:

- root `README.md`;
- `CHANGELOG.md`;
- `disclaimer.html`;
- `privacy-policy.html`;
- `terms.html`;
- the maintenance checklist in `docs/maintenance/`.
