# Citadel of Kang Local Validation Guide

This document provides local validation commands for the current non-live **Citadel of Kang** development files.

These commands are intended for the user's Windows / PowerShell 7 workflow.

## Repository Path

Current local repository path:

```text
C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can
```

## Sync Latest Main

Run:

```powershell
cd "C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can"
git status -sb
git pull origin main
```

If local files are dirty, stop and inspect before pulling.

## JavaScript Syntax Validation

Run:

```powershell
node --check .\assets\js\themes\citadel-of-kang\core.js
node --check .\assets\js\themes\citadel-of-kang\article-index.js
node --check .\assets\js\themes\citadel-of-kang\reading-time.js
node --check .\assets\js\themes\citadel-of-kang\reading-progress.js
```

Expected result:

```text
No output means the syntax check passed.
```

## Git Whitespace Validation

Run:

```powershell
git diff --check
```

Expected result:

```text
No output means no whitespace problems in current diff.
```

If there is no local diff because all files are already committed/pulled, this command may also show no output.

## Repository Status

Run:

```powershell
git status -sb
```

Expected after syncing cleanly:

```text
## main...origin/main
```

## Preview Page

Open locally:

```text
preview\citadel-of-kang-article-demo.html
```

Recommended checks:

```text
Article Index appears.
Index links jump to headings.
Active item updates while scrolling.
Active item reaches final heading.
Reading time appears in the hero meta row.
Reading progress bar moves while scrolling.
Back to top works.
Keyboard tab order is logical.
No console errors.
```

## Browser Console Check

Open DevTools and confirm there are no JavaScript errors from:

```text
core.js
article-index.js
reading-time.js
reading-progress.js
```

## Important Boundary

Do not manually wire these non-live files into production pages yet.

Do not edit:

```text
assets/css/style.css
assets/js/script.js
production /updates/*.html pages
sitemap.xml
feed.xml
```

Production rollout must happen later through a reviewed PowerShell 7-compatible patch.

## Rollback Note

Since this phase is non-live and documentation/preview focused, rollback normally means reverting commits or removing non-live files. Production rollback is not required because the live pipeline has not been changed.
