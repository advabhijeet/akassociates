# Maintenance Documentation

Last organized: 2026-05-26

This folder contains active maintenance documentation for the Chambers of AK website and the Citadel-derived frontend system.

Use `ACTIVE_DOCUMENTATION_INDEX.md` as the source of truth for active documents.

## Folder Map

```text
standards/   Zero-tolerance rules, accessibility and compatibility standards.
theme/       Citadel theme architecture, production module inventory, config and validation.
templates/   Page-template documentation for homepage, practice, contact, enquiry, general and blog pages.
modules/     Individual reusable module contracts.
publishing/  Article, thumbnail, social-preview and publishing workflow documents.
product/     Future Citadel Manager / CMS and Client Portal planning.
operations/  Legal documentation and social media operations.
```

## Maintenance Rule

Keep this folder grouped by document purpose. Do not add new long-form documents directly under `docs/maintenance/` unless they are index/overview documents.

When adding or moving active documents, update:

```text
docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md
CHANGELOG.md
```

Archived/superseded documents should remain under:

```text
docs/archive/superseded-maintenance/
```
