# Citadel Production Finalization Checklist

Last updated: 2026-05-26

Status: **Phase 1 complete**

This checklist tracks Phase 1 - Citadel Production Finalization v1 for the Chambers of AK website.

## Purpose

Formally mark the Citadel-derived frontend implementation as production-active for Chambers of AK after documentation, module inventory and live implementation checks are reconciled.

## Scope Boundary

Phase 1 is a production-reality and documentation-finalization phase.

Do not change the following under this checklist unless a later roadmap phase expressly authorizes it:

```text
CSS layout
JavaScript behaviour
HTML page content
SEO metadata
sitemap.xml
feed.xml
article metadata
thumbnail assets
public legal copy
```

## Documentation Reconciliation

- [x] Confirm active roadmap is `docs/PROJECT_ROADMAP.md`.
- [x] Organize `docs/maintenance/` into purpose-based folders.
- [x] Add `docs/maintenance/README.md` folder map.
- [x] Update `docs/maintenance/ACTIVE_DOCUMENTATION_INDEX.md`.
- [x] Add `docs/maintenance/theme/CITADEL_PRODUCTION_MODULE_INVENTORY.md`.
- [x] Reconcile `docs/maintenance/theme/CITADEL_OF_KANG_THEME.md` with production reality.
- [x] Reconcile `docs/maintenance/theme/CITADEL_LOCAL_VALIDATION.md` with current production files.
- [x] Reconcile Navigation / Global Shell module doc.
- [x] Reconcile Article Index module doc.
- [x] Add Article Footer module contract.
- [x] Reconcile Blog Page module doc.
- [x] Reconcile Contact Page template doc.
- [x] Reconcile Enquiry Page template doc.
- [x] Reconcile General Content Page template doc.
- [x] Reconcile Homepage template doc.
- [x] Reconcile Practice / Services template doc.
- [x] Add Enquiry/Form module contract and Chambers implementation boundary.

## Production-Active Module Inventory

Confirm the following are recorded as production-active or transitional in the module inventory:

- [x] Theme entry / shared layout.
- [x] Active Chambers Citadel theme.
- [x] Fallback Chambers theme.
- [x] Global Shell / navigation / topbar / drawer / footer social.
- [x] Theme controller / theme toggle wiring.
- [x] Article Index.
- [x] Article Footer.
- [x] Insights registry loader.
- [x] Insight card helper.
- [x] Latest Insights section.
- [x] Insights Directory section.
- [x] Blog / Legal Insights page controller.
- [x] Contact Page template.
- [x] Enquiry Page template.
- [x] Enquiry/Form module.
- [x] General Content Page template.
- [x] Homepage template.
- [x] Practice / Services template.
- [x] Conversion event helper.
- [x] Reveal helper.

## Automated Validation

### GitHub Actions Workflow

- [x] Add `.github/workflows/validation.yml`.
- [x] Confirm the first `Chambers Validation` workflow runs pass on GitHub Actions.
- [x] If the workflow fails, inspect the failing step and patch only the minimum required fix. No failure observed in first visible runs.

Current workflow coverage:

```text
JavaScript syntax checks for production entry/module files
Article encoding validation
Insights registry strict validation
Git whitespace validation
```

### Local Validation Commands

Local validation remains available where practical. GitHub Actions now covers the same syntax, article-encoding, registry and whitespace checks remotely.

```powershell
node --check .\assets\js\script.js
node --check .\assets\js\themes\citadel-of-kang\modules\shell\global-shell.js
node --check .\assets\js\themes\citadel-of-kang\article-index-direct-rail.js
node --check .\assets\js\themes\citadel-of-kang\article-footer.js
node --check .\assets\js\themes\citadel-of-kang\modules\sections\latest-insights-section.js
node --check .\assets\js\themes\citadel-of-kang\modules\sections\insights-directory-section.js
node --check .\assets\js\themes\citadel-of-kang\modules\blog\blog-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\forms\enquiry-form.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\home-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\practice-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\contact-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\enquiry-page.js
node --check .\assets\js\themes\citadel-of-kang\modules\pages\general-content-page.js
node .\tools\validate-article-encoding.js
node .\tools\validate-insights-registry.js --strict
git diff --check
```

## Manual Production Audit Checklist

Manual smoke checks were confirmed by the user after reviewing the production site.

### Desktop / tablet / mobile

- [x] Desktop homepage layout checked.
- [x] Tablet homepage layout checked.
- [x] Mobile homepage layout checked.
- [x] Desktop practice page layout checked.
- [x] Mobile practice page layout checked.
- [x] Desktop Legal Insights page layout checked.
- [x] Mobile Legal Insights page layout checked.
- [x] Desktop article page layout checked.
- [x] Mobile article page layout checked.
- [x] Contact page desktop/mobile checked.
- [x] Case Enquiry page desktop/mobile checked.

### Light / dark mode

- [x] Light mode homepage checked.
- [x] Dark mode homepage checked.
- [x] Light mode article page checked.
- [x] Dark mode article page checked.
- [x] Light mode contact/enquiry checked.
- [x] Dark mode contact/enquiry checked.
- [x] Navbar and hero logos switch correctly.
- [x] No stretched/distorted logo appears.

### Global Shell

- [x] Desktop topbar appears at expected widths.
- [x] Theme toggle appears and works.
- [x] Mobile drawer opens and closes.
- [x] Backdrop click closes drawer.
- [x] Escape key closes drawer.
- [x] Body scroll locks while drawer is open.
- [x] Footer social row appears once.
- [x] Active nav state does not break page navigation.

### Article modules

- [x] Article Index appears on long article pages with at least 3 direct h2 headings.
- [x] Article Index does not appear on short/non-article pages.
- [x] Index links scroll to sections.
- [x] Active index item updates while scrolling.
- [x] Mobile reading progress appears correctly.
- [x] Article Footer renders tags, previous/next and recommended reads.
- [x] Article Footer does not duplicate.

### Blog / Insights modules

- [x] Legal Updates page renders registry-driven cards.
- [x] Latest Articles section renders.
- [x] Category/tag sections render.
- [x] View All buttons work.
- [x] Category filter works.
- [x] Tag filter works.
- [x] Search filter works.
- [x] Pagination appears only when needed.
- [x] Empty result state is readable.

### Contact / Enquiry modules

- [x] Contact page matter-type fields switch correctly.
- [x] Consent gate works.
- [x] Generate enquiry summary works.
- [x] Copy prepared message works.
- [x] WhatsApp compose fallback works.
- [x] Gmail compose fallback works.
- [x] EmailJS unavailable/error state is clear.
- [x] Case Enquiry copy-template buttons work.

### Public-internal boundary

- [x] No preview/internal implementation notes visible publicly.
- [x] No research-status or workflow-status boxes visible in article bodies.
- [x] No fake frontend-only admin/security page is introduced.
- [x] Chambers-specific values are documented before any future Citadel extraction.

## Smoke-Test Pages

```text
/
practice.html
legal-updates.html
case-enquiry.html
contact.html
faq.html
practice/msme-disputes.html
services/msme-recovery-lawyer-patna.html
updates/msme-facilitation-council-process.html
updates/uapa-bail-section-43d5-supreme-court-2026.html
```

## Phase 1 Completion

- [x] Confirm GitHub Actions workflow passes.
- [x] Run local syntax/registry validation where practical, or rely on passing GitHub Actions for equivalent automated validation coverage.
- [x] Complete manual browser smoke checks.
- [x] Record validation results in the Phase 1 issue.
- [x] Add final `CHANGELOG.md` entry for Phase 1 documentation reconciliation and checklist creation.
- [x] Decide whether Phase 1 can be marked complete.

Phase 1 - Citadel Production Finalization v1 is complete.

## Next Roadmap Step After Phase 1

Move to:

```text
Phase 2 - Thumbnail Frame Consistency v1
```

Phase 4.5 Sitewide SEO Stabilization Hotfix remains parked until roadmap order reaches it.
