# Repository Documents

This folder keeps internal planning and setup material separate from the public website files.

## Folder Map

- `CODEX_HANDOFF.md` - active and completed handoff notes for work that requires Codex or local validation.
- `CODEX_PROMPT_RULE.md` - standing rule and prompt template for future Codex handoffs.
- `CODEX_WIKI_WORKFLOW.md` - repository-side wiki/workflow mirror for structure, deployment, SEO, analytics, legal review, maintenance and validation.
- `LEGAL_DOCUMENTATION_MAINTENANCE.md` - checklist for keeping public legal pages and project documentation aligned with site changes.
- `SEO_GROWTH_AGENDA.md` - primary SEO roadmap and remaining growth work.
- `TEAM_PAGE_AGENDA.md` - future `team.html` planning note.
- `WEBSITE_REPOSITORY_AUDIT_2026-05-06.md` - website and repository audit before the next development stage.
- `seo/` - SEO batch history and search-growth planning documents.

Root-level documentation:

- `../README.md` - main repository documentation and operating rules.
- `../CHANGELOG.md` - chronological record of meaningful website, repository and documentation changes.

## Documentation Status

The repository now treats `CHANGELOG.md` as mandatory after every meaningful modification. Any future website, SEO, tracking, branding, legal-positioning, page-structure or documentation change should update the changelog during the same work cycle.

## Wiki Sync Status

The GitHub Wiki could not be accessed through the current connector state during the 2026-05-06 audit. Until the GitHub Wiki is reachable, use `CODEX_WIKI_WORKFLOW.md` as the canonical wiki mirror inside the repository.

If the GitHub Wiki is later enabled/reachable, sync it manually from:

- `README.md`
- `CHANGELOG.md`
- `docs/CODEX_WIKI_WORKFLOW.md`
- `docs/SEO_GROWTH_AGENDA.md`
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`

## Root Files That Should Stay At The Site Root

- `index.html` and top-level public pages keep their current URLs for GitHub Pages and Google indexing.
- `CNAME`, `robots.txt`, `sitemap.xml`, `ads.txt`, and `google3164979181871a1d.html` must stay at the root because external services look for them there.
- `assets/`, `practice/`, `services/`, and `updates/` are public website folders.

## Change Workflow

When adding future internal notes, place them in `docs/`. When adding public pages, place them in the appropriate public folder and update `sitemap.xml`.

When changing website structure, tracking, contact methods, social links, branding, professional positioning or enquiry flows, also review:

- root `README.md`;
- `CHANGELOG.md`;
- `disclaimer.html`;
- `privacy-policy.html`;
- `terms.html`;
- this folder's maintenance checklist.
