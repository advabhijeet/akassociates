param(
  [Parameter(Mandatory = $true)]
  [string]$RepoPath,

  [switch]$Commit
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Step {
  param([string]$Message)
  Write-Host "[Citadel Stage 1] $Message" -ForegroundColor Cyan
}

function Stop-Patch {
  param([string]$Message)
  throw "[Citadel Stage 1] $Message"
}

function Get-Text {
  param([string]$Path)
  return Get-Content -LiteralPath $Path -Raw -Encoding UTF8
}

function Set-Text {
  param(
    [string]$Path,
    [string]$Content
  )
  Set-Content -LiteralPath $Path -Value $Content -Encoding UTF8 -NoNewline
}

$resolvedRepo = Resolve-Path -LiteralPath $RepoPath -ErrorAction Stop
$repoRoot = $resolvedRepo.Path

$articleRel = 'updates/property-title-search-before-purchase-india.html'
$styleRel = 'assets/css/style.css'
$changelogRel = 'CHANGELOG.md'
$articleIndexRel = 'assets/js/themes/citadel-of-kang/article-index.js'
$readingTimeRel = 'assets/js/themes/citadel-of-kang/reading-time.js'
$readingProgressRel = 'assets/js/themes/citadel-of-kang/reading-progress.js'

$articlePath = Join-Path $repoRoot $articleRel
$stylePath = Join-Path $repoRoot $styleRel
$changelogPath = Join-Path $repoRoot $changelogRel

foreach ($path in @($articlePath, $stylePath, $changelogPath)) {
  if (-not (Test-Path -LiteralPath $path)) {
    Stop-Patch "Required file not found: $path"
  }
}

Push-Location $repoRoot
try {
  $inside = (git rev-parse --is-inside-work-tree 2>$null)
  if ($inside -ne 'true') {
    Stop-Patch "RepoPath is not inside a git repository: $repoRoot"
  }

  $status = git status --porcelain
  if ($status) {
    Write-Host $status
    Stop-Patch "Working tree is not clean. Commit, stash, or discard local changes before running this patch."
  }

  Write-Step "Validating Citadel article module JavaScript files"
  node --check $articleIndexRel
  node --check $readingTimeRel
  node --check $readingProgressRel

  $backupRoot = Join-Path $env:TEMP ('citadel-article-modules-stage1-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
  New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null
  Copy-Item -LiteralPath $articlePath -Destination (Join-Path $backupRoot 'property-title-search-before-purchase-india.html') -Force
  Copy-Item -LiteralPath $stylePath -Destination (Join-Path $backupRoot 'style.css') -Force
  Copy-Item -LiteralPath $changelogPath -Destination (Join-Path $backupRoot 'CHANGELOG.md') -Force
  Write-Step "Backup created at $backupRoot"

  Write-Step "Updating shared stylesheet imports and bridge variables"
  $style = Get-Text $stylePath

  $importBlock = @'
/* Citadel of Kang article modules - Stage 1 */
@import url("./themes/citadel-of-kang/modules/article-index.css?v=citadel-article-stage1");
@import url("./themes/citadel-of-kang/modules/reading-time.css?v=citadel-article-stage1");
@import url("./themes/citadel-of-kang/modules/reading-progress.css?v=citadel-article-stage1");
'@

  if ($style -notmatch 'citadel-of-kang/modules/article-index\.css') {
    $activeThemeImport = '@import url("./themes/citadel-of-ak.css?v=theme-1");'
    if ($style.Contains($activeThemeImport)) {
      $style = $style.Replace($activeThemeImport, $activeThemeImport + "`r`n" + $importBlock.TrimEnd())
    } else {
      $style = $importBlock.TrimEnd() + "`r`n" + $style
    }
  }

  $bridgeBlock = @'

/* CITADEL ARTICLE MODULES STAGE 1 BRIDGE */
:root {
  --ck-nav-space: var(--nav-space, 108px);
  --ck-container: 1180px;
  --ck-article-width: 820px;
  --ck-color-gold: var(--gold, #d4af37);
  --ck-color-gold-dark: var(--gold-dark, #b68f20);
  --ck-color-gold-muted: var(--color-gold-muted, #f5dc89);
  --ck-rgb-gold: var(--rgb-gold, 212, 175, 55);
  --ck-font-display: var(--font-display, Georgia, "Times New Roman", serif);
  --ck-transition: 180ms ease;
}

.citadel-reading-progress.is-fixed,
[data-citadel-reading-progress-bar].is-fixed {
  top: var(--nav-space, 108px);
  left: var(--page-gutter, 0px);
  right: var(--page-gutter, 0px);
  width: auto;
  z-index: 999;
  pointer-events: none;
}

.article-index-layout {
  width: 100%;
}
/* END CITADEL ARTICLE MODULES STAGE 1 BRIDGE */
'@

  if ($style -notmatch 'CITADEL ARTICLE MODULES STAGE 1 BRIDGE') {
    $style = $style.TrimEnd() + $bridgeBlock + "`r`n"
  }

  Set-Text $stylePath $style

  Write-Step "Updating target article markup"
  $html = Get-Text $articlePath

  if ($html -notmatch 'data-citadel-article-index="true"') {
    $html = [regex]::Replace(
      $html,
      '<body([^>]*)>',
      '<body$1 data-citadel-article-index="true" data-citadel-reading-time="true" data-citadel-reading-progress="true">',
      1
    )
  }

  if ($html -notmatch 'data-citadel-reading-progress-bar') {
    $needle = '  <div class="s">'
    $replacement = '  <div class="citadel-reading-progress is-fixed" data-citadel-reading-progress-bar aria-hidden="true"><span></span></div>' + "`r`n" + $needle
    if (-not $html.Contains($needle)) {
      Stop-Patch "Could not find site wrapper marker: $needle"
    }
    $html = $html.Replace($needle, $replacement)
  }

  if ($html -notmatch 'data-citadel-reading-progress-source') {
    $oldArticle = '<article class="article-body">'
    $newArticle = '<article class="article-body" data-citadel-article-index data-citadel-reading-time data-citadel-reading-progress-source>'
    if (-not $html.Contains($oldArticle)) {
      Stop-Patch "Could not find target article tag: $oldArticle"
    }
    $html = $html.Replace($oldArticle, $newArticle)
  }

  if ($html -notmatch 'data-citadel-reading-time-output') {
    $oldMeta = '            <span>Checklist</span>'
    $newMeta = $oldMeta + "`r`n" + '            <span class="citadel-reading-time" data-citadel-reading-time-output>Reading time pending</span>'
    if (-not $html.Contains($oldMeta)) {
      Stop-Patch "Could not find Checklist article meta pill."
    }
    $html = $html.Replace($oldMeta, $newMeta)
  }

  if ($html -notmatch 'themes/citadel-of-kang/article-index\.js') {
    $existingScript = '  <script src="../assets/js/script.js?v=citadel-live-3"></script>'
    $moduleScripts = @'
  <script src="../assets/js/themes/citadel-of-kang/article-index.js?v=citadel-article-stage1"></script>
  <script src="../assets/js/themes/citadel-of-kang/reading-time.js?v=citadel-article-stage1"></script>
  <script src="../assets/js/themes/citadel-of-kang/reading-progress.js?v=citadel-article-stage1"></script>
'@
    if (-not $html.Contains($existingScript)) {
      Stop-Patch "Could not find existing production script tag: $existingScript"
    }
    $html = $html.Replace($existingScript, $moduleScripts.TrimEnd() + "`r`n" + $existingScript)
  }

  Set-Text $articlePath $html

  Write-Step "Updating CHANGELOG.md"
  $changelog = Get-Text $changelogPath
  $entryMarker = 'Stage 1 Citadel article modules rollout'
  if ($changelog -notmatch [regex]::Escape($entryMarker)) {
    $entry = @'
## 2026-05-14 - Stage 1 Citadel article modules rollout

Files changed:

- `updates/property-title-search-before-purchase-india.html`
- `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Added Citadel of Kang article modules to the property title search article as a staged rollout.
- Enabled the dynamic Article Index, Reading Time and Reading Progress modules on one production article first.
- Added shared stylesheet imports and bridge variables for the article modules while leaving the Navigation Drawer for a separate future site-wide rollout.
- Preserved article URL, title, canonical, sitemap, feed, robots, ads and analytics configuration.

Validation / notes:

- Ran `node --check assets/js/themes/citadel-of-kang/article-index.js`.
- Ran `node --check assets/js/themes/citadel-of-kang/reading-time.js`.
- Ran `node --check assets/js/themes/citadel-of-kang/reading-progress.js`.
- Ran `git diff --check`.
- Manual desktop/mobile live checks remain required after GitHub Pages refresh.

'@
    $changelog = $changelog -replace '^(# Changelog\r?\n)', ('$1' + "`r`n" + $entry)
    Set-Text $changelogPath $changelog
  }

  Write-Step "Running whitespace validation"
  git diff --check

  Write-Step "Patch applied. Review git diff before committing."
  git status -sb

  if ($Commit) {
    Write-Step "Creating commit"
    git add $articleRel $styleRel $changelogRel
    git commit -m "Add Citadel article modules to property title article"
    git status -sb
  } else {
    Write-Host "`nReview with:" -ForegroundColor Yellow
    Write-Host "git diff -- $styleRel $articleRel $changelogRel" -ForegroundColor Yellow
    Write-Host "`nCommit manually after validation, or rerun with -Commit from a clean tree." -ForegroundColor Yellow
  }
}
finally {
  Pop-Location
}
