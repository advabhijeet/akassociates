# Manual Patch Package And Codex Handoff Workflow

This document defines what future developers, ChatGPT sessions, Codex sessions and other AI agents should do when a Chambers of AK website change is too large, risky or blocked through the GitHub connector.

## Purpose

Some repository changes are better handled locally because:

- a file is too large for safe connector replacement;
- the connector returns a conflict or truncates file content;
- multiple public files must be changed together;
- local validation is required before pushing;
- browser/mobile smoke testing is required;
- an unfinished Codex local workspace must be inspected first.

When this happens, the AI agent should not blindly overwrite large files. It should offer the user a choice between:

1. Codex handoff; or
2. manual patch package.

## Decision Rule

When a change cannot be safely committed directly through the connector, ask the user:

```text
This change is better handled outside the GitHub connector. Would you like me to prepare it for Codex, or prepare a manual patch package for you to apply locally?

Reply:
- Codex
- Manual
```

If the user chooses Codex, update `docs/codex/HANDOFF.md` with clear instructions.

If the user chooses Manual, prepare a downloadable ZIP package and a PowerShell guide.

## Codex Handoff Path

Use this path when the user wants Codex to continue later.

Update:

```text
docs/codex/HANDOFF.md
```

The handoff should include:

- repository name and branch;
- local Codex path if known;
- files to change;
- exact snippets or target replacements;
- validation commands;
- files that must not be touched;
- pending commits or cleanup tasks;
- requirement to update `CHANGELOG.md` after meaningful changes;
- instruction to inspect `.wiki-clone/` and `.wiki-work/` before deleting, ignoring, adding or committing them.

For the current Chambers of AK workspace, preserve:

```text
.wiki-clone/
.wiki-work/
```

These may contain unfinished GitHub Wiki work from an interrupted Codex session.

## Manual Patch Package Path

Use this path when the user wants to apply changes locally and push through Git.

The AI agent should create a ZIP file containing:

```text
patch-package/
  README_APPLY_PATCH.md
  files/
    <repository-relative-file-paths>
  validation/
    validate.ps1
  notes/
    CHANGELOG_ENTRY.md
    CODEX_HANDOFF_NOTE.md, if anything remains pending
```

The ZIP should preserve repository-relative paths. For example:

```text
patch-package/files/legal-updates.html
patch-package/files/sitemap.xml
patch-package/files/docs/planning/SEO_GROWTH_AGENDA.md
```

The user should be able to copy the contents of `files/` into the local repository root.

## Manual Patch README Requirements

`README_APPLY_PATCH.md` should include:

1. what the patch changes;
2. files included;
3. backup step;
4. copy/paste instructions;
5. PowerShell commands to validate;
6. Git commands to inspect diff;
7. commit command;
8. push command;
9. rollback command if needed.


## Universal PowerShell 7 Patch Command Pattern

Future downloadable patch packages should include a short one-command apply instruction that assumes the ZIP is in the user's default Downloads folder and extracts it through PowerShell 7 before running the package apply script.

Use this pattern and adjust only the ZIP name, repository path, extracted package folder, and apply script name:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -Command "& { `$RepoPath='C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can'; `$ZipPath=Join-Path `$env:USERPROFILE 'Downloads\<PATCH-ZIP-NAME>.zip'; Expand-Archive -LiteralPath `$ZipPath -DestinationPath `$RepoPath -Force; Set-Location `$RepoPath; pwsh -NoProfile -ExecutionPolicy Bypass -File '.\<EXTRACTED-PATCH-FOLDER>\patch-package\scripts\<APPLY-SCRIPT-NAME>.ps1' -RepoPath `$RepoPath }"
```

Rules for this command style:

- Prefer `pwsh`, not legacy `powershell.exe`.
- Assume the patch ZIP is in the user's default Downloads folder unless the user gives a different path.
- The command must perform the extraction step itself.
- The command must extract into the repository root.
- The command must then run the package's own apply script.
- The package apply script should create backups, validate, stage only intended files, commit, and push.
- Do not use `git add -A` where `.wiki-clone/`, `.wiki-work/`, backups, or unrelated local files may exist.
- If the command changes shared CSS or JavaScript, the patch must handle cache-busting and validation.

## Standard Manual PowerShell Guide

Use this template and adjust paths/files as needed.

```powershell
cd "C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can"

git status
git pull origin main

# Optional backup before overwriting files
Copy-Item .\sitemap.xml .\sitemap.xml.bak
Copy-Item .\legal-updates.html .\legal-updates.html.bak

# Copy patch files into the repository root manually, or use Copy-Item commands provided in the patch README.

node --check assets\js\script.js
git diff --check
[xml](Get-Content sitemap.xml -Raw)

# JSON-LD validation
$ErrorActionPreference = 'Stop'
$count = 0
Get-ChildItem -Recurse -Filter *.html | Where-Object { $_.FullName -notlike '*\.git\*' } | ForEach-Object {
  $html = Get-Content -LiteralPath $_.FullName -Raw
  $matches = [regex]::Matches($html, '<script type="application/ld\+json">\s*(.*?)\s*</script>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  foreach ($match in $matches) {
    try {
      $null = $match.Groups[1].Value | ConvertFrom-Json
      $count++
    } catch {
      Write-Output "JSON-LD error in $($_.FullName)"
      throw
    }
  }
}
"JSON-LD blocks parsed: $count"

# Internal href/src check
$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$missing=@()
Get-ChildItem -Recurse -Filter *.html | Where-Object { $_.FullName -notlike '*\.git\*' } | ForEach-Object {
  $file=$_.FullName
  $dir=Split-Path $file -Parent
  $html=Get-Content -LiteralPath $file -Raw
  $matches=[regex]::Matches($html, '(?:href|src)="([^"]+)"')
  foreach($m in $matches){
    $ref=$m.Groups[1].Value
    if($ref -match '^(https?:|mailto:|tel:|#|javascript:|data:)'){ continue }
    $clean=$ref -replace '\?.*$',''
    if($clean.StartsWith('/')){ $target=Join-Path $root $clean.TrimStart('/') } else { $target=Join-Path $dir $clean }
    if(-not (Test-Path -LiteralPath $target)){ $missing += "$(Resolve-Path -LiteralPath $file -Relative): $ref" }
  }
}
if($missing.Count){ $missing | ForEach-Object { Write-Output $_ }; exit 1 }
'Internal href/src references ok'

git status
git diff --stat
git diff
```

If validation passes:

```powershell
git add .
git commit -m "Apply manual website patch"
git push origin main
```

If something is wrong before commit:

```powershell
git restore .
```

If backup files were created and are no longer needed, remove them before commit:

```powershell
Remove-Item .\sitemap.xml.bak, .\legal-updates.html.bak -ErrorAction SilentlyContinue
```

## Manual Patch Safety Rules

- Do not move public website files unless explicitly instructed.
- Preserve `index.html`, root public pages, `assets/`, `practice/`, `services/`, `updates/`, `sitemap.xml`, `robots.txt`, `ads.txt`, `CNAME`, favicon files and legal-policy pages in their current locations.
- Preserve black/white/gold Chambers of AK branding.
- Preserve informational and non-solicitation language.
- Keep homepage firm-focused.
- Do not create `team.html` until team-member details are ready and approved.
- Update `CHANGELOG.md` after meaningful changes.
- If a patch cannot include every required change, include a `CODEX_HANDOFF_NOTE.md` or status note listing remaining work.

## When To Prefer A Manual Patch ZIP

Prefer a manual patch ZIP when:

- `legal-updates.html`, `sitemap.xml`, `CHANGELOG.md` or another large file must be edited and the connector truncates or blocks safe replacement;
- several files must be updated together to keep links, sitemap and docs consistent;
- the user wants faster local control instead of waiting for Codex;
- validation commands must be run locally before push.

## When To Prefer Codex

Prefer Codex when:

- local repo state is important;
- `.wiki-clone/` or `.wiki-work/` must be inspected;
- browser/mobile smoke testing is required;
- unresolved local changes exist;
- the user does not want to manually copy files or run Git commands.

## Current Project Reminder

For the Chambers of AK project, unresolved local/Codex tasks currently include:

- sitemap lastmod cleanup after Phase 4 practice-page strengthening;
- adding the cheque-bounce summons article card to `legal-updates.html`;
- adding the cheque-bounce summons article to `sitemap.xml`;
- post-update validation;
- inspection of `.wiki-clone/` and `.wiki-work/`.

Future AI agents should ask the user whether these should be handled through Codex or through a manual patch package before attempting a large connector replacement.
