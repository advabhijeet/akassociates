# Codex Prompt Rule

This guide records the standing rule for all future ChatGPT-to-Codex handoffs in the Chambers of AK website repository.

## Rule Of Thumb

Whenever ChatGPT creates or updates `docs/CODEX_HANDOFF.md`, ChatGPT should also provide a ready-to-paste Codex prompt in the chat response.

The purpose is convenience: the user should be able to copy one prompt into Codex and have Codex continue exactly from where ChatGPT stopped.

## Required Prompt Contents

Every Codex prompt should include:

1. Repository and branch:

```text
repo: advabhijeet/akassociates
branch: main
```

2. Sync instruction:

```text
Before making changes, sync with the latest main branch.
```

3. Read-first files:

```text
README.md
docs/README.md
docs/CODEX_WIKI_WORKFLOW.md
docs/CODEX_HANDOFF.md
docs/SEO_GROWTH_AGENDA.md
relevant files in docs/seo/
```

4. Main action:

```text
Complete the active handoff items in docs/CODEX_HANDOFF.md in order.
```

5. Validation commands:

```text
node --check assets\js\script.js
git diff --check
```

6. Additional validation where relevant:

```text
Check internal href/src references.
Check JSON-LD blocks parse correctly.
Check sitemap XML if sitemap.xml was changed.
Check mobile layout if CSS/nav/menu/social icons were changed.
```

7. Commit and reporting instruction:

```text
Commit with clear messages. Do not commit .wiki-work/ or .wiki-clone/.
After committing, report files changed, commits made, checks run, and remaining issues.
```

## Standard Prompt Template

Use this as the default prompt whenever a Codex handoff is needed:

```text
You are working on the GitHub repository:

advabhijeet/akassociates

Branch:
main

This is the Chambers of AK - Advocates & Legal Consultants website repository.

Before making changes:
1. Sync with the latest main branch.
2. Confirm the remote is the correct repo: advabhijeet/akassociates.
3. Read these files:
   - README.md
   - docs/README.md
   - docs/CODEX_WIKI_WORKFLOW.md
   - docs/CODEX_HANDOFF.md
   - docs/SEO_GROWTH_AGENDA.md
   - relevant files in docs/seo/

Main task:
Complete the active handoff items listed in docs/CODEX_HANDOFF.md, in order.

Important rules:
- Preserve the Chambers of AK black/white/gold premium legal branding.
- Preserve informational/non-solicitation language.
- Do not create unnecessary temporary files.
- Do not commit .wiki-work/ or .wiki-clone/.
- Keep changes focused and patch-based where possible.

Validation:
After making changes, run:
node --check assets\js\script.js
git diff --check

Also validate where relevant:
- internal href/src references;
- JSON-LD parsing;
- sitemap XML syntax if sitemap.xml changed;
- desktop and mobile layout if CSS, nav, menu or social icons changed.

Commit instructions:
- Make clear commits.
- Push to origin/main only after checks pass.
- Report:
  - files changed;
  - commits made;
  - final pushed commit SHA;
  - checks run;
  - any remaining issues.
```

## Current Active Handoff Prompt

As of the latest pre-Batch 2 cleanup, use this prompt for Codex:

```text
You are working on the GitHub repository:

advabhijeet/akassociates

Branch:
main

This is the Chambers of AK - Advocates & Legal Consultants website repository.

Before making changes:
1. Sync with the latest main branch.
2. Confirm the remote is the correct repo: advabhijeet/akassociates.
3. Read these files:
   - README.md
   - docs/README.md
   - docs/CODEX_WIKI_WORKFLOW.md
   - docs/CODEX_HANDOFF.md
   - docs/SEO_GROWTH_AGENDA.md
   - docs/seo/SEO_CONTENT_BATCH_2026-05-05.md
   - docs/seo/SEO_BATCH_2_PLAN.md

Main task:
Complete the active pre-Batch 2 cleanup items in docs/CODEX_HANDOFF.md, in order.

Specifically:

1. Fix mobile social icon rendering.
   - Inspect assets/js/script.js and assets/css/style.css.
   - Check socialLinks, socialIconSvg, createSocialLinksMarkup(), topbar social injection, drawer social injection and footer social injection.
   - Ensure LinkedIn and WhatsApp Channel icons render correctly on mobile topbar, drawer menu and footer.
   - Ensure icons are not broken boxes, invisible icons, oversized shapes, or misaligned circles.
   - Preserve aria-labels, target="_blank" and rel="noopener".
   - Preserve Chambers of AK black/white/gold branding.

2. Audit and complete older article pages.
   Review all article pages listed in docs/CODEX_HANDOFF.md.
   Priority pages likely needing expansion:
   - updates/msme-documents-checklist.html
   - updates/rera-refund-interest-delayed-possession.html
   - updates/commercial-recovery-before-suit.html
   - updates/arbitration-clause-checklist.html

   Each article should have:
   - unique SEO title and meta description;
   - canonical URL;
   - Open Graph/Twitter metadata;
   - Article or BlogPosting JSON-LD;
   - clear hero heading;
   - useful content sections;
   - practical document checklist;
   - first enquiry or preparation section;
   - internal links to relevant practice, service, update and enquiry pages;
   - informational/non-solicitation note;
   - no promises, guarantees, or solicitation language.

Validation:
After making changes, run:
node --check assets\js\script.js
git diff --check

Also validate:
- internal href/src references;
- JSON-LD blocks parse correctly;
- legal-updates.html article links still work;
- no broken relative paths from update pages;
- mobile social icons at 360px and 390px widths;
- desktop layout remains stable.

Commit instructions:
- Make clear commits.
- Do not commit .wiki-work/ or .wiki-clone/.
- Push to origin/main only after checks pass.
- After pushing, report files changed, commits made, final pushed commit SHA, checks run and remaining issues.
```
