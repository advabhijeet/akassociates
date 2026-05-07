# One-Command Manual Patch Standard

This document supplements `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`.

## Purpose

For Chambers of AK repository maintenance, manual patch packages should be easy for the user to apply without repeatedly copying multiple commands.

When a future AI agent prepares a manual patch ZIP, it should also provide a single copy-paste PowerShell executable block that performs the whole safe workflow.

## Required One-Command Flow

The one-command PowerShell block should:

1. Define the local repository path:

```powershell
$Repo = "C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can"
```

2. Define the expected ZIP name in the user's Downloads folder.
3. Verify the ZIP exists.
4. Verify the repository folder exists.
5. Remove any old extracted patch folder.
6. Extract the ZIP into Downloads.
7. Locate the package `apply_patch.ps1` script.
8. Locate the package `validate.ps1` script.
9. `cd` into the repository.
10. Run `git pull origin main`.
11. Run the apply script.
12. Run the validation script.
13. Remove known patch backup files.
14. Run `git diff --check`.
15. Show `git status` and `git diff --stat`.
16. Stage only the intended files.
17. Commit with the intended message.
18. Push to `origin main`.
19. Warn not to add `.wiki-clone/` or `.wiki-work/`.

## Preferred User Experience

The user should receive one block like:

```powershell
& {
  $ErrorActionPreference = "Stop"

  $Repo = "C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can"
  $Downloads = Join-Path $env:USERPROFILE "Downloads"
  $ZipPath = Join-Path $Downloads "PATCH_FILE_NAME.zip"
  $ExtractFolder = Join-Path $Downloads "PATCH_FILE_NAME_extracted"

  # verify, extract, apply, validate, clean, commit, push
}
```

The user should not have to manually replace placeholder paths like `<EXTRACTED_ZIP_FOLDER>`.

## Safety Rules

- Never ask the user to copy PowerShell prompt text such as `PS C:\...>`.
- Never stage `.wiki-clone/` or `.wiki-work/`.
- Stage only the files intended by the patch.
- If validation fails, do not auto-commit.
- If there are unexpected files in `git status`, stop and ask the user before committing.
- Avoid auto-committing if the patch changes public files beyond the intended scope.

## When Not To Auto-Commit

Do not use an auto-commit executable when:

- the patch modifies many public HTML files and visual review is required first;
- the patch changes navigation, footer, site-wide CSS, JavaScript or sitemap structure in a risky way;
- the user specifically asks to review before commit;
- local `git status` shows unexpected tracked modifications.

In those cases, the one-command script should apply and validate only, then stop before commit.

## Current User Preference

The user prefers this kind of executable manual patch workflow for future manual patches:

- one copy-paste PowerShell block;
- no placeholder paths;
- automatic extraction from Downloads;
- automatic apply and validation;
- cleanup of patch backups;
- commit and push when the scope is safe and known.
