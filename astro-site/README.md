# Chambers of AK — Astro production

Live: https://chambersofak.in/ — Cloudflare Workers. Production source branch: astro-migration. Legacy main is retained as a recovery reference, not the publishing target.

Node 22.23.4; run npm ci from astro-site/ before npm run dev, npm run build, npm run build:production. Normal build is NOINDEX; production build outputs dist-production. Never deploy dist as production.

Read [Operations runbook](deployment/OPERATIONS.md), [Article publishing](migration/PUBLISHING.md), [Recovery](deployment/RECOVERY.md), [Monitoring](deployment/MONITORING.md) and [Launch record](deployment/FINAL-MIGRATION-REPORT.md). Earlier AK-001–016 checkpoint files are historical, not current operating instructions.

Current documentation prepared 27 November 2026. Changes require isolated candidate validation before promotion; keep main intact.
