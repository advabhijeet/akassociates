# Repository Organization

Last updated: **13 July 2026**

This document defines the file-placement and deployment boundaries for the Chambers of AK repository.

## Public website files

Public indexed or user-facing pages belong only in approved public locations:

```text
root public HTML pages
practice/
services/
updates/
required files under assets/
```

Stable root infrastructure:

```text
CNAME
robots.txt
sitemap.xml
feed.xml
ads.txt
site.webmanifest
google3164979181871a1d.html
favicon files
_config.yml
```

Do not move or rename indexed public files without a redirect, canonical, sitemap and internal-link migration plan.

## Internal files

```text
docs/       Internal documentation and planning.
preview/    Historical design and module experiments.
tools/      Validators, generators and maintenance scripts.
.github/    CI and repository automation.
```

`_config.yml` excludes internal material from GitHub Pages. `tools/validate-deployment-boundary.js` enforces the exclusion contract.

## Documentation layout

```text
docs/
  PROJECT_ROADMAP.md
  README.md
  REPOSITORY_ORGANIZATION.md

  maintenance/
    ACTIVE_DOCUMENTATION_INDEX.md
    README.md
    modules/
    operations/
    product/
    publishing/
    standards/
    templates/
    theme/

  planning/
  google/
  codex/
  seo/
  audits/
  wiki/

  archive/
    superseded-maintenance/
    status-snapshots/
    monitoring-snapshots/
    historical-planning/
```

## Placement rules

- Current roadmap: `docs/PROJECT_ROADMAP.md`.
- Active document inventory: `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md`.
- Theme production reality: `docs/maintenance/theme/`.
- Article publishing: `docs/maintenance/publishing/`.
- Legal/social operations: `docs/maintenance/operations/`.
- Future product concepts: `docs/maintenance/product/`.
- Current supporting plans: `docs/planning/`.
- Dated audits: `docs/audits/`.
- Completed one-off status notes: `docs/archive/status-snapshots/`.
- Completed monitoring outputs: `docs/archive/monitoring-snapshots/`.
- Superseded roadmaps/checkpoints: `docs/archive/`.

Do not place one-off completion logs in active planning after the related work is closed.

## Asset rules

Production assets belong under `assets/`. Source artwork, discarded variants and theme-lab material should not remain in the public asset tree indefinitely. Asset relocation/removal must be reference-checked and validated.

## Change rules

1. Start from a clean working tree.
2. Make one scoped change.
3. Validate changed public and internal surfaces.
4. Update `CHANGELOG.md`.
5. Inspect the staged-file set.
6. Commit and deploy.
7. Confirm GitHub Actions and any required live checks.

## Deletion/archive rule

Delete only when a file is:

- unreferenced;
- duplicated;
- obsolete;
- preserved by Git history;
- not needed for rollback or evidence.

Prefer archival relocation when historical context may still be useful. Record deletion or archival in `CHANGELOG.md`.
