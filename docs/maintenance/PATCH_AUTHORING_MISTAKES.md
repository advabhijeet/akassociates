# Patch Authoring Mistakes Log

This file records patch-script and workflow mistakes observed during the Chambers of AK / Citadel migration so future patches avoid repeating them.

## Rules learned

1. **Do not rely on brittle exact text markers for large HTML sections.**
   - Prefer section-level replacement between stable structural markers, or add explicit data attributes first.
   - The failed category-section patch looked for a precise “Practical Guides and Checklists” block and failed when the current `legal-updates.html` structure no longer matched.

2. **Keep replacement payloads outside PowerShell here-strings when HTML/Markdown is large.**
   - Large embedded strings repeatedly caused parser failures, unterminated quotes, or backtick interpretation problems.
   - Use separate payload files and read them with `Get-Content -Raw`.

3. **Escape PowerShell variable names before colons.**
   - Use `${Variable}:` instead of `$Variable:`.
   - `$Variable:` is parsed as a scoped variable and can throw parser errors.

4. **Avoid backticks inside double-quoted PowerShell here-strings.**
   - Markdown and JavaScript snippets often contain backticks.
   - Prefer single-quoted here-strings or external payload files.

5. **Every patch script must reset failed dry-run leftovers before applying.**
   - Use `git reset --hard origin/main` after fetch/pull.
   - Remove known untracked target folders before reapplying.

6. **Make patches idempotent or explicitly detect already-applied state.**
   - Re-running a patch after it has already changed cache keys or file paths should not produce a false failure.

7. **Check current working directory before running repository patches.**
   - Running from `C:\Users\abhik` instead of the repository caused Git and path failures.

8. **Expect Windows file locks.**
   - Editors, preview panes, live servers, and browser tooling can lock files like `contact.html`.
   - Close editors/preview panes or retry after cleanup.

9. **Theme-level fixes must not be replaced by website-only fixes.**
   - Homepage duplicate cards were correctly moved into a Citadel section module instead of being patched only in `index.html` or site-specific code.

10. **Dry-run success is not commit success.**
    - Always run final `git status`, validation commands, and log checks after commit/push.

## Current preferred patch pattern

- Keep complex replacement HTML/JS/Markdown in `payloads/` files.
- Reset to `origin/main` before applying.
- Replace via robust structural markers.
- Validate syntax and registry coverage.
- Use specific module-level fixes whenever the issue belongs to Citadel.

11. **Do not keep layered controllers for the same page behaviour.**
    - The Legal Insights page had one module rendering registry cards and a separate legacy script limiting, filtering and paginating them.
    - This caused render-order bugs where direct navbar load showed all articles, while Clear Filter later corrected the view.
    - Directory rendering, default section limits, View All, filters and pagination must be owned by one page-level module.

12. **Do not patch a custom page forever when it has become a reusable product pattern.**
    - Legal Insights is really a Blog/News/Insights directory template.
    - Once a page needs latest/category/tag/trending/search/pagination behaviour, extract a Citadel-level Blog module instead of adding page-specific selectors.


11. **When a page becomes a product pattern, stop patching it as a one-off page.**
    - The Legal Insights page accumulated separate renderers, filter logic, directory logic and card limits.
    - The correct fix was to promote the page to a reusable Citadel Blog Page module.

12. **Architecture roadmaps should be recorded before broad template migration.**
    - Header, footer, homepage, practice, enquiry, contact and general pages should be modularized through a documented Citadel Template System rather than ad hoc patches.

13. **Patch payload paths must resolve relative to the extracted patch script, not the repository root.**
    - A roadmap patch referenced `payloads/...` from the current working directory, so PowerShell looked inside the repository instead of the extracted temp folder.
    - Use `$PatchRoot = Split-Path -Parent $MyInvocation.MyCommand.Path` and `Join-Path $PatchRoot 'payloads/...'` for payload reads/copies.

11. **Do not leave reusable shell behaviour inside the monolithic global script.**
   - Header, mobile drawer, footer social rows, active navigation and other site-wide chrome belong to Citadel shell modules.
   - Keep `assets/js/script.js` as a loader/orchestrator wherever possible.

11. **Do not use synchronous XHR for registry fallbacks.**
   - The previous Insights registry loader used `request.open('GET', registryUrl, false)`, which triggered Chrome's synchronous XMLHttpRequest deprecation warning.
   - Use async `fetch()` and `window.ChambersInsightsRegistryReady` promise chaining instead.

12. **Do not patch post-load hydration by brittle exact text only.**
   - After module extraction, helper blocks may move or shrink.
   - Replace by stable surrounding markers or make the replacement idempotent.


11. **Do not leave page-specific form logic inside the global bootstrap.**
    - Contact/enquiry/copy-template behaviour belongs in a Citadel form module, not in ssets/js/script.js.
    - script.js should remain a bootstrap/loader file wherever possible.
