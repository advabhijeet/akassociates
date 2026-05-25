# Repository Organization

This document records the intended repository structure for the Chambers of AK website.

## Public Website Files

These files and folders are public website assets and should not be moved without a deliberate URL migration plan:

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
- `assets/`
- `practice/`
- `services/`
- `updates/`

Root infrastructure files that must stay at repository root:

- `CNAME`
- `robots.txt`
- `sitemap.xml`
- `ads.txt`
- `google3164979181871a1d.html`
- `site.webmanifest`
- favicon files

## Documentation Structure

Internal documentation should follow this structure:

```text
docs/
  PROJECT_ROADMAP.md
  README.md
  REPOSITORY_ORGANIZATION.md
  archive/
    superseded-maintenance/
  audits/
    WEBSITE_REPOSITORY_AUDIT_2026-05-06.md
  codex/
    HANDOFF.md
    PROMPT_RULE.md
  google/
    GOOGLE_SETUP.md
  maintenance/
    ACTIVE_DOCUMENTATION_INDEX.md
    LEGAL_DOCUMENTATION_MAINTENANCE.md
  planning/
    ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md
    SEO_GROWTH_AGENDA.md
    SEARCH_APPEARANCE_MSME_TOPICAL_AUTHORITY_ROADMAP.md
    TEAM_PAGE_AGENDA.md
  seo/
    SEO_CONTENT_BATCH_2026-05-05.md
  wiki/
    WORKFLOW.md
```

## File Placement Rules

- Repository overview and operating rules: `README.md`.
- Chronological change record: `CHANGELOG.md`.
- Documentation index: `docs/README.md`.
- Active roadmap and product direction: `docs/PROJECT_ROADMAP.md`.
- Active documentation inventory and archive pointers: `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md`.
- Repository audits: `docs/audits/`.
- Codex handoff and prompt rules: `docs/codex/`.
- Google platform setup: `docs/google/`.
- Legal/documentation maintenance checklists: `docs/maintenance/`.
- Forward-looking plans: `docs/planning/`, unless consolidated into `docs/PROJECT_ROADMAP.md`.
- Historical SEO batch records: `docs/seo/`.
- In-repository wiki mirror: `docs/wiki/`.
- Superseded documentation retained for historical reference: `docs/archive/superseded-maintenance/`.

## Cleanup Rule

Do not delete documentation unless it is obsolete and superseded by a clearer file.

When deleting documentation:

1. Confirm the information is duplicated or outdated.
2. Preserve useful historical facts in `CHANGELOG.md` or a surviving planning/audit document.
3. Update internal references.
4. Record the deletion in `CHANGELOG.md`.

## Changelog Requirement

Every meaningful repository or website change must update `CHANGELOG.md` during the same work cycle.
