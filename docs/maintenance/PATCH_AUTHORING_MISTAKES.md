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
