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
    SEO_GROWTH_AGENDA.md
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
- Repository audits: `docs/audits/`.
- Codex handoff and prompt rules: `docs/codex/`.
- Google platform setup: `docs/google/`.
- Legal/documentation maintenance checklists: `docs/maintenance/`.
- Forward-looking plans: `docs/planning/`.
- Historical SEO batch records: `docs/seo/`.
- In-repository wiki mirror: `docs/wiki/`.

## Cleanup Rule

Do not delete documentation unless it is obsolete and superseded by a clearer file.

When deleting documentation:

1. Confirm the information is duplicated or outdated.
2. Preserve useful historical facts in `CHANGELOG.md` or a surviving planning/audit document.
3. Update internal references.
4. Record the deletion in `CHANGELOG.md`.

## Changelog Requirement

Every meaningful repository or website change must update `CHANGELOG.md` during the same work cycle.
