# Recovery and backup — AK-017.5

Reviewed 27 November 2026. Repository references verified via GitHub; no live rollback, account-setting change, offline repository export or recovery drill performed.

Preserve both repository branches. Record production commit, Cloudflare Worker deployment version, release manifest, current DNS record export, GitHub/Cloudflare settings, GTM version/export and EmailJS template configuration (no secret in repository). Maintain owner-controlled offline or secure backups; a runbook is not evidence of a completed backup. Never export client messages into repo or logs.

## Recovery point inventory
| Reference | Verified source commit | Purpose |
| --- | --- | --- |
| astro-migration | 9e79bec8ecac701c59964ad0e5000dafed42fd5a | Last independently verified production application |
| main | 95d4b51bdc3cf429ae46aa8abe22db531bb7a7d3 | Legacy GitHub Pages fallback, not current publishing branch |
| ak-017-operations | a96f38376f65d5347522a6bc8045600dafcec51a | Documentation checkpoint before AK-017.5; use latest reviewed candidate at backup time |

The independent live audit (163/163): https://github.com/advabhijeet/akassociates/actions/runs/45966997152. HSTS verification: https://github.com/advabhijeet/akassociates/actions/runs/45966395343. Git commit SHA is not the Cloudflare Worker version ID; record the actual active Worker version separately from the dashboard. GitHub repository references and Cloudflare versions are not independent offline backups.

## Owner-controlled repository backup (Windows PowerShell)
Run in a new backup directory outside the working repository. Requires Git, network access and sufficient disk space. Use a trusted local disk; copy the verified bundle to a second independent secure location. This procedure is not a deployment.

```powershell
$ErrorActionPreference = 'Stop'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = Join-Path $HOME "ChambersAK-Backup-$stamp"
New-Item -ItemType Directory -Path $backup | Out-Null
Set-Location $backup
git clone --mirror https://github.com/advabhijeet/akassociates.git repository.git
if ($LASTEXITCODE -ne 0) { throw 'Clone failed' }
git -C repository.git fsck --full
if ($LASTEXITCODE -ne 0) { throw 'Repository integrity check failed' }
git -C repository.git bundle create ../chambers-ak.bundle --all
if ($LASTEXITCODE -ne 0) { throw 'Bundle creation failed' }
git -C repository.git bundle verify ../chambers-ak.bundle
if ($LASTEXITCODE -ne 0) { throw 'Bundle verification failed' }
git clone --mirror chambers-ak.bundle restore-check.git
if ($LASTEXITCODE -ne 0) { throw 'Restore clone failed' }
git -C restore-check.git fsck --full
if ($LASTEXITCODE -ne 0) { throw 'Restore integrity check failed' }
foreach ($ref in @('main','astro-migration','ak-017-operations')) {
  $original = git -C repository.git rev-parse "refs/heads/$ref"
  if ($LASTEXITCODE -ne 0) { throw "Missing original ref $ref" }
  $restored = git -C restore-check.git rev-parse "refs/heads/$ref"
  if ($LASTEXITCODE -ne 0 -or $original -ne $restored) { throw "Restore mismatch $ref" }
}
git -C repository.git show-ref | Set-Content refs.txt
Get-FileHash chambers-ak.bundle -Algorithm SHA256 | Format-List | Out-File bundle-sha256.txt
Write-Host "Backup and isolated Git restore verified at $backup"
```

A Git bundle includes committed Git objects and refs, not uncommitted work, external Git LFS objects (if any), Actions artifacts, settings, or secrets. Capture those separately as applicable. Do not store credentials, client messages or recovery codes in public Git. Retain the last healthy release before each production promotion, take a fresh independent backup after substantial publication/configuration changes, and review backup integrity monthly. Suggested retention: last three verified snapshots plus a pre-migration baseline; confirm storage and retention with owner.

## Configuration backup checklist
- Cloudflare: production/staging Worker names, active deployment/version IDs, build settings, custom domains, rules, SSL/TLS/HSTS, DNSSEC status, DNS zone export and record proxy settings. Export/capture from dashboard and store privately; zone file alone does not cover all settings. Preserve registrar access and recovery options.
- GitHub: branch refs, CI evidence and exact production release manifest; repository access, branch rules, deployment settings and any non-Git assets. Retain a copy of dist-production if independently built from the exact clean release, and record its SHA and manifest. Do not save staging output as production.
- GTM/GA4: export the published container version, record property/stream IDs, consent controls, event definitions and key-event/redaction settings. EmailJS/reCAPTCHA: capture nonsecret template, public IDs, domain allowlist, CAPTCHA enforcement and privacy/retention configuration. Keep secret recovery/rotation information in an owner-controlled password manager, never this repository.
- Record date, owner-controlled storage location, SHA/version, integrity test, missing items and last successful isolated restore. Backup status remains pending until actual evidence is recorded.

## Rollback triggers
Wrong canonical/noindex, widespread 404/5xx, TLS or DNS failure, production form outage, unexpected data collection or critical security regression. Stop publishing and IndexNow immediately; determine scope from live audit.

Prefer rollback of Cloudflare production Worker to a known healthy version while retaining DNS and domain attachment. In Cloudflare Workers & Pages, select chambers-of-ak-production, then Deployments; identify the last verified version and review the rollback before confirmation. See https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/. Version rollback does not restore external DNS, zone rules or third-party account settings. Pause or coordinate automatic deployments before rollback so the defective Git release is not immediately redeployed. No live rollback unless incident scope and owner approval warrant it. Restore Git branch via a reviewed revert commit or approved new release; never force-push. Prevent auto-deployment from restoring the bad version. Check actual version and live manifest; repeat independent audit and synthetic form test if relevant. Client rollback before CAPTCHA integration requires coordinated EmailJS template changes or direct delivery fails; avoid temporarily removing CAPTCHA enforcement unless necessary and approved.

## DNS fallback
Keep Cloudflare authoritative nameservers dora.ns.cloudflare.com and jaxson.ns.cloudflare.com. Preserve all mail TXT/MX and verification records. If recovery requires legacy GitHub Pages, first verify old site and HTTPS certificate readiness with the custom domain. Detach conflicting Worker custom domains only when planned; restore apex A 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; WWW CNAME advabhijeet.github.io; original DNS-only web configuration. Verify root/www/HTTPS, indexability and forms. Legacy main remains at 95d4b51; old site may lack new CAPTCHA/consent safeguards; review before serving. Do not assume instantaneous fallback because HSTS persists in visitors' browsers for 30 days.

DNSSEC: do not change authoritative provider/nameservers or disable signing while the parent DS remains. Remove DS at registrar FIRST and independently verify disappearance across validating resolvers and allow cache expiry (Cloudflare troubleshooting guidance recommends at least 1.5 times the former DS TTL before removing DNSKEY records) before disabling signing or changing nameservers. See https://developers.cloudflare.com/dns/dnssec/troubleshooting/. Recheck both validating resolvers and preserve mail/verification records. If staying on Cloudflare, keep DNSSEC active. DS currently tag 2371, algorithm 13, digest type 2, digest 60A791745B8BB76B5B8A15E0BBA8E046151151FE851BEB07A0E221C98AD37E74. Never publish private signing keys.

HSTS: current max-age 2592000, no subdomains/preload. Keep HTTPS working throughout rollback. To withdraw deliberately, serve max-age=0 over valid HTTPS and verify; previously stored policies persist until a client receives the update or expires. Do not prematurely increase duration or preload.

Restore integrations only after audit. Rotate secrets if exposure suspected; preserve public IDs, reverify actual consent, form delivery and server CAPTCHA rejection. Record incident, times, commit, corrective action and post-recovery results. No disaster recovery drill performed on live production.

## Non-disruptive recovery rehearsal
1. Create and verify the independent bundle, then clone it into an isolated restore directory. Check out the exact healthy Astro SHA; do not change the live branch.
2. From astro-site run npm ci, npm run build:production and the Operations test suite. Compare canonical URL inventory and HTML hashes to the saved exact-release manifest; differences require investigation. Verify no private data or draft artifacts appear.
3. Exercise the Worker using existing mocked static binding and browser tests; verify routing, 404, Markdown, headers, consent and mock EmailJS/CAPTCHA. If a hosted rehearsal is needed, use a separate noindex staging Worker only, without real form delivery, analytics, production domains or IndexNow.
4. Record elapsed time, failures and evidence. Proposed planning objectives only: recover a healthy Worker within 60 minutes if its version remains available; restore from offline Git backup within one working day; source recovery point no older than the last verified backup. These are not measured SLAs and DNS fallback may take longer.
5. After an actual incident, verify the expected live manifest, all canonical routes, redirects, discovery files, security headers and integration behavior; resume publication/notifications only after approval. No live recovery rehearsal is required for routine documentation closure.
