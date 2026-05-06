# Codex Prompt Rule

This guide records the standing rule for future ChatGPT-to-Codex handoffs in the Chambers of AK website repository.

## Standing Rule

Whenever ChatGPT creates or updates `docs/CODEX_HANDOFF.md`, ChatGPT should also provide a ready-to-paste Codex prompt in the chat response.

Every prompt should tell Codex to read these first:

- `README.md`
- `CHANGELOG.md`
- `docs/README.md`
- `docs/CODEX_HANDOFF.md`
- `docs/CODEX_WIKI_WORKFLOW.md`
- `docs/SEO_GROWTH_AGENDA.md`
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`

## Required Rules For Codex

- Work on repository `advabhijeet/akassociates`.
- Work on branch `main` unless the user says otherwise.
- Sync with the latest `main` before editing.
- Preserve the Chambers of AK black/white/gold premium legal branding.
- Preserve informational and non-solicitation language.
- Keep the homepage firm-focused.
- Keep individual profile details for the future Team page, not the homepage.
- Update `CHANGELOG.md` after every meaningful modification.
- Do not commit `.wiki-work/` or `.wiki-clone/`.
- Keep changes focused and patch-based where possible.

## Standard Validation

Run where possible:

```powershell
node --check assets\js\script.js
git diff --check
```

Also validate where relevant:

- internal href/src references;
- JSON-LD parsing;
- sitemap XML syntax;
- desktop and mobile layout;
- footer legal links;
- WhatsApp, email, phone and case-enquiry CTAs.

## Standard Handoff Prompt

```text
You are working on the GitHub repository advabhijeet/akassociates on branch main.

Before making changes, sync with the latest main branch and read:
- README.md
- CHANGELOG.md
- docs/README.md
- docs/CODEX_HANDOFF.md
- docs/CODEX_WIKI_WORKFLOW.md
- docs/SEO_GROWTH_AGENDA.md
- docs/LEGAL_DOCUMENTATION_MAINTENANCE.md
- docs/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md

Complete the active handoff items in docs/CODEX_HANDOFF.md. If there are no active handoff items, perform only the specific task requested by the user.

Rules:
- Preserve the Chambers of AK black/white/gold premium legal branding.
- Preserve informational/non-solicitation language.
- Keep the homepage firm-focused.
- Update CHANGELOG.md after every meaningful modification.
- Do not commit .wiki-work/ or .wiki-clone/.
- Keep changes focused and patch-based where possible.

Validation:
- Run node --check assets\js\script.js where Node is available.
- Run git diff --check.
- Check internal links, JSON-LD, sitemap XML, mobile layout and CTAs where relevant.

Commit with clear messages, push to origin/main only after checks pass, and report files changed, commits made, checks run and remaining issues.
```

## Current Validation Prompt

Use this for the next local validation pass before new content work:

```text
You are working on advabhijeet/akassociates on branch main.

Sync with latest main, then run a technical validation and SEO hygiene audit before the next content stage.

Read first:
- README.md
- CHANGELOG.md
- docs/README.md
- docs/CODEX_HANDOFF.md
- docs/CODEX_WIKI_WORKFLOW.md
- docs/LEGAL_DOCUMENTATION_MAINTENANCE.md
- docs/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md
- docs/SEO_GROWTH_AGENDA.md

Audit:
1. Check JavaScript syntax.
2. Run git diff --check.
3. Check internal href/src references.
4. Check JSON-LD parsing.
5. Check sitemap XML.
6. Review titles, meta descriptions and canonicals across public HTML files.
7. Check footer legal links and important CTAs.
8. Smoke-test homepage, About, Expertise, mobile drawer and footer icons on desktop/mobile.

Do not create new public pages during this validation pass unless specifically instructed.
Update CHANGELOG.md for any meaningful change.
Report issues found, issues fixed, commits, checks run and remaining follow-up items.
```
