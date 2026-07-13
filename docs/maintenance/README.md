# Maintenance Documentation

Last organized: **13 July 2026**

This folder contains active maintenance, architecture, publishing and product documentation for the Chambers of AK website.

Use `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md` as the status source.

## Folder map

```text
modules/      Production and planned module notes.
operations/   Legal-documentation and social-distribution operations.
product/      Future Citadel Manager and Client Portal planning.
publishing/   Article template, publishing and thumbnail/social standards.
standards/    Accessibility, compatibility and zero-tolerance rules.
templates/    Page-template documentation.
theme/        Theme architecture, production inventory, configuration and validation.
```

## Placement rule

Do not add long-form documents directly under `docs/maintenance/` unless they are an index, folder overview or still-unclassified legacy file awaiting consolidation.

New documentation should state one of:

```text
Production
Active operations
Planned
Historical
```

## Update rule

When adding, moving or changing an active document:

1. update `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md`;
2. update `docs/PROJECT_ROADMAP.md` if project status changes;
3. update `CHANGELOG.md`;
4. run `node tools/validate-documentation.js`.

Historical status/checkpoint documents belong under `docs/archive/`, not in active maintenance or planning folders.
