# Citadel Production Finalization Checklist

Last updated: 2026-05-26

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
- [ ] Confirm the first `Chambers Validation` workflow run passes on GitHub Actions.
- [ ] If the workflow fails, inspect the failing step and patch only the minimum required fix.

Current workflow coverage:

```text
JavaScript syntax checks for production entry/module files
Article encoding validation
Insights registry strict validation
Git whitespace validation
```

### Local Validation Commands

Run locally where possible:

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

### Desktop / tablet / mobile

- [ ] Desktop homepage layout checked.
- [ ] Tablet homepage layout checked.
- [ ] Mobile homepage layout checked.
- [ ] Desktop practice page layout checked.
- [ ] Mobile practice page layout checked.
- [ ] Desktop Legal Insights page layout checked.
- [ ] Mobile Legal Insights page layout checked.
- [ ] Desktop article page layout checked.
- [ ] Mobile article page layout checked.
- [ ] Contact page desktop/mobile checked.
- [ ] Case Enquiry page desktop/mobile checked.

### Light / dark mode

- [ ] Light mode homepage checked.
- [ ] Dark mode homepage checked.
- [ ] Light mode article page checked.
- [ ] Dark mode article page checked.
- [ ] Light mode contact/enquiry checked.
- [ ] Dark mode contact/enquiry checked.
- [ ] Navbar and hero logos switch correctly.
- [ ] No stretched/distorted logo appears.

### Global Shell

- [ ] Desktop topbar appears at expected widths.
- [ ] Theme toggle appears and works.
- [ ] Mobile drawer opens and closes.
- [ ] Backdrop click closes drawer.
- [ ] Escape key closes drawer.
- [ ] Body scroll locks while drawer is open.
- [ ] Footer social row appears once.
- [ ] Active nav state does not break page navigation.

### Article modules

- [ ] Article Index appears on long article pages with at least 3 direct h2 headings.
- [ ] Article Index does not appear on short/non-article pages.
- [ ] Index links scroll to sections.
- [ ] Active index item updates while scrolling.
- [ ] Mobile reading progress appears correctly.
- [ ] Article Footer renders tags, previous/next and recommended reads.
- [ ] Article Footer does not duplicate.

### Blog / Insights modules

- [ ] Legal Updates page renders registry-driven cards.
- [ ] Latest Articles section renders.
- [ ] Category/tag sections render.
- [ ] View All buttons work.
- [ ] Category filter works.
- [ ] Tag filter works.
- [ ] Search filter works.
- [ ] Pagination appears only when needed.
- [ ] Empty result state is readable.

### Contact / Enquiry modules

- [ ] Contact page matter-type fields switch correctly.
- [ ] Consent gate works.
- [ ] Generate enquiry summary works.
- [ ] Copy prepared message works.
- [ ] WhatsApp compose fallback works.
- [ ] Gmail compose fallback works.
- [ ] EmailJS unavailable/error state is clear.
- [ ] Case Enquiry copy-template buttons work.

### Public-internal boundary

- [ ] No preview/internal implementation notes visible publicly.
- [ ] No research-status or workflow-status boxes visible in article bodies.
- [ ] No fake frontend-only admin/security page is introduced.
- [ ] Chambers-specific values are documented before any future Citadel extraction.

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

## Remaining Phase 1 Work

- [ ] Confirm GitHub Actions workflow passes.
- [ ] Run local syntax/registry validation where practical.
- [ ] Complete manual browser smoke checks.
- [ ] Record validation results in the Phase 1 issue.
- [x] Add final `CHANGELOG.md` entry for Phase 1 documentation reconciliation and checklist creation.
- [ ] Decide whether Phase 1 can be marked complete or whether small documentation follow-ups remain.

## Next Roadmap Step After Phase 1

After this checklist is satisfied, move to:

```text
Phase 2 - Thumbnail Frame Consistency v1
```

Phase 4.5 Sitewide SEO Stabilization Hotfix remains parked until roadmap order reaches it.
