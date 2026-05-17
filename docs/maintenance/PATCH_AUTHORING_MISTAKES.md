# Patch Authoring Mistakes Log

Last updated: 2026-05-17

This file records patch-script and workflow mistakes observed during the Chambers of AK / Citadel migration so future patches avoid repeating them.

## Core Rules

1. Do not rely on brittle exact text markers for large HTML sections.
   - Prefer stable structural markers, data attributes, small targeted replacements, or manual commands.
   - Exact text failed repeatedly when the live repository had already changed.

2. Keep large HTML, JavaScript and Markdown payloads out of fragile inline patch strings.
   - Payload files are safer for ZIP patches.
   - For manual PowerShell, keep generated Markdown free of nested Markdown fences.

3. Do not put Markdown code fences inside PowerShell here-strings that are being shared inside ChatGPT Markdown code fences.
   - This broke multiple copy/paste command blocks.
   - Use plain text in generated docs or provide continuation blocks.

4. Escape PowerShell variable names before colons.
   - Use ${Variable}: instead of $Variable:.

5. Avoid JavaScript template literals inside double-quoted PowerShell strings.
   - The enquiry-form loader was once committed as script.src = ${assetPrefix}... without backticks.
   - Prefer single-quoted here-strings or payload files.

6. Always verify the repository path before running commands.
   - Commands were once run in an unrelated anime-manga repository, causing false MODULE_NOT_FOUND errors.

7. git reset --hard does not remove untracked files.
   - Use git clean -nd first to preview.
   - Use git clean -fd only for known failed-patch leftovers.

8. Make patches idempotent or detect already-applied state.
   - Re-running already-applied patches caused false failures when old markers no longer existed.

9. Dry-run success is not commit success.
   - Always run final validation, git status, git log and push confirmation.

10. Network push errors can be ambiguous.
   - If push reports RPC failure but also says Everything up-to-date, verify with git fetch, git status -sb and git ls-remote.

## Architecture Rules

11. Theme-level issues should be fixed at Citadel module level, not by website-only patches.
   - Example: homepage duplicate cards were fixed through the Latest Insights section module.

12. Do not leave reusable shell behaviour inside the monolithic global script.
   - Header, mobile drawer, footer social rows, active navigation and smooth anchors belong to the Global Shell module.

13. Do not leave page-specific form logic inside the global bootstrap.
   - Contact/enquiry/copy-template behaviour belongs in the Enquiry/Form module.

14. Do not leave layered controllers fighting over the same page.
   - The Legal Insights page previously had separate renderers, filters, directory logic and card limits.
   - The correct solution was the Citadel Blog Page module.

15. When a page becomes a product pattern, promote it to a reusable template.
   - Legal Insights became Blog Page.
   - Contact became Contact Page.
   - Case Enquiry became Enquiry Page.

16. Keep separation between page templates and behaviour modules.
   - Contact Page and Enquiry Page modules mark structure.
   - Enquiry/Form module owns copy/form/send behaviour.

17. Do not use synchronous XHR for registry fallbacks.
   - The old registry loader used request.open(..., false), causing Chrome's synchronous XMLHttpRequest warning.
   - Use async fetch and ChambersInsightsRegistryReady instead.

18. Keep article metadata in assets/data/insights-registry.json.
   - Do not reintroduce inline article registry data into assets/js/script.js.

19. Do not solve reusable article UI problems by copying blocks into individual article pages.
   - Improve Article Index, Article Footer, registry, validation or template docs instead.

## Current Preferred Workflow

1. Confirm clean state:
   git status -sb

2. Inspect current files before patching:
   git log --oneline --decorate -5
   targeted file reads/diffs

3. Apply the smallest safe change:
   - one module
   - one loader
   - one page hook
   - one documentation update

4. Validate:
   node --check assets/js/script.js
   node --check any new or modified JS module
   node -e "JSON.parse(require('fs').readFileSync('assets/data/insights-registry.json','utf8')); console.log('insights registry JSON ok')"
   node tools/validate-insights-registry.js --strict
   git diff --check

5. Commit with a clear message.

6. Push and verify:
   git status -sb
   git log --oneline --decorate -5

7. Browser-check the affected public page in light mode, dark mode, desktop and mobile.
