# Chambers of AK Documentation

Last consolidated: **13 July 2026**

This directory contains internal project documentation. It is excluded from the public GitHub Pages artifact through `_config.yml`.

## Sources of truth

Use these documents in this order:

1. `docs/PROJECT_ROADMAP.md` — current state, completed work and next phases.
2. `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` — active-document inventory and status.
3. `README.md` — repository and operating overview.
4. `CHANGELOG.md` — chronological implementation record.

When an older document conflicts with these files, the newer active document controls.

## Folder map

```text
docs/
  PROJECT_ROADMAP.md
  README.md
  REPOSITORY_ORGANIZATION.md

  maintenance/
    README.md
    ACTIVE_DOCUMENTATION_INDEX.md
    modules/
    operations/
    product/
    publishing/
    standards/
    templates/
    theme/

  planning/
    Current supporting plans, content queues and monitoring standards.

  google/
    Search Console, analytics, business profile and AdSense notes.

  codex/
    Handoff and local-execution rules.

  seo/
    Historical content-batch records.

  audits/
    Dated repository and website audits.

  archive/
    Superseded plans, checkpoints and historical status snapshots.

  wiki/
    In-repository workflow mirror.
```

## Documentation status classes

- **Production:** describes currently deployed behavior.
- **Active operations:** used for current publishing, legal maintenance, SEO or distribution work.
- **Planned:** future work that has not been implemented.
- **Historical:** retained only for context; not an instruction source.

The status of each active document is recorded in `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md`.

## Public/deployment boundary

Internal Markdown, planning files, previews and tools must not be deployed as public pages. The boundary is validated by:

```powershell
node tools/validate-deployment-boundary.js
node tools/validate-documentation.js
```

## Archiving rule

Do not leave completed one-off status notes in `docs/planning/`.

Move them to an appropriate archive directory:

```text
docs/archive/status-snapshots/
docs/archive/monitoring-snapshots/
docs/archive/historical-planning/
docs/archive/superseded-maintenance/
```

Archived files may preserve old paths and commands. They are historical records and are excluded from active-document validation.

## Change rule

When documentation is added, moved or materially changed:

1. update `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` where applicable;
2. update `docs/PROJECT_ROADMAP.md` if project status changed;
3. update `CHANGELOG.md`;
4. run `node tools/validate-documentation.js`;
5. confirm internal documents remain excluded from deployment.
