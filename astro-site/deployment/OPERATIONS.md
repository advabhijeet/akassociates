# Production operations — AK-017

## Deployment configuration (27 November 2026)
Repository advabhijeet/akassociates, branch astro-migration. Legacy main remains unchanged at 95d4b51bdc3cf429ae46aa8abe22db531bb7a7d3. Last validated application release 9e79bec8ecac701c59964ad0e5000dafed42fd5a.

| Setting | Production | Staging |
|---|---|---|
| Worker | chambers-of-ak-production | chambers-of-ak-url-preview |
| Root | astro-site | astro-site |
| Node | 22.23.4 | 22.23.4 |
| Build | npm run build:production | npm run build:worker-preview |
| Deploy | npx wrangler deploy --config wrangler.production.jsonc | npx wrangler deploy |
| Assets | dist-production | dist |
| Domain | chambersofak.in and www | chambers-of-ak-url-preview.abhikr917.workers.dev |
| Indexing | canonical indexable HTML | noindex, robots disallow, no live enquiry or analytics |

Production workers.dev and preview URLs are disabled. Exact .html route handling; WWW redirects to apex. Both Git-integrated Workers watch astro-migration. Candidate branches do not attach domains. GitHub's default branch remains main; root README.md on main describes the legacy GitHub Pages site. For current production instructions, select astro-migration (or the operations candidate during review) and open astro-site/README.md. Keep secrets in their original service settings; never commit secret keys or private enquiry data.

## Release procedure
1. Start a candidate branch from current production HEAD. Record the current deployed release manifest and commit before changes. Keep scope small; verify legal text and privacy changes with the owner.
2. From astro-site: npm ci; npm run build:production; node scripts/test-production.mjs; node scripts/test-markdown.mjs; node scripts/test-security-headers.mjs; node scripts/test-emailjs.mjs. For browser tests install Playwright using existing CI instructions. Run publishing smoke test separately; it cleans dist and must never be deployed.
3. Check candidate CI on the exact candidate SHA. The current push triggers in astro-migration.yml and production-candidate.yml target astro-migration; ak-016-ai-readiness.yml targets only named branches. Arbitrary candidate branches do not automatically receive these checks. Before promotion, use an isolated, explicitly enabled candidate workflow or run the equivalent checks locally on the exact SHA and preserve evidence. Do not push to production merely to trigger CI. Manual workflow dispatch may require the workflow to be present on the default branch; do not merge into main just to enable it. Promote only the exact validated commit via fast-forward with expected old SHA. No force push. Confirm Cloudflare deployment and exact live release marker; GitHub build success alone does not prove deployment.
4. Update the pinned release in .github/workflows/audit-live-production.yml on ak-live-audit; run independent audit and inspect result. Its expected release is built separately; old baseline URLs must remain. New article URLs allowed; additional non-article route types or intentional removals require explicit audit scope revision. A cached manifest mismatch is a real failed release gate; investigate and rerun only after correction or cache stabilisation.
5. Verify changed UI on actual device. For form changes use one synthetic owner-approved test and check mailbox. For analytics check allow/decline, cross-page persistence, withdrawal and network; no raw enquiry fields in events. No automatic external test sends.
6. Notify search engines only for approved substantive additions/updates/removals after live verification (see publishing). Keep pre/post manifests and CI evidence. Documentation-only changes need no IndexNow submission. The production-candidate workflow's indexnow-production.mjs --initial invocation is a dry run (no --send), not a repeat initial submission.

## Documentation-only releases
Both Workers are Git-integrated. A documentation-only promotion to astro-migration may trigger a build/deploy; prepare-production.mjs records the checked-out Git SHA in release-manifest.json even if HTML content hashes are identical. Before promotion compare the exact candidate's output to the current baseline, retain old manifest and deployment version, and apply the release procedure. After deployment verify the new manifest and rerun the pinned independent live audit. Do not mistake a documentation-only commit for a new article or automatically send IndexNow notifications. Keep the candidate branch separate until validation and owner review are complete.

## Infrastructure
Cloudflare Free, DNSSEC active, TLS minimum 1.2, TLS 1.3 and Always Use HTTPS enabled; HSTS max-age=2592000, no includeSubDomains/preload; nosniff, strict-origin-when-cross-origin, DENY, restricted permissions and baseline CSP. Strict script/connect/style CSP deferred; evaluate in report-only first. RUM disabled because it injected a beacon outside consent and changed HTML checksums. Keep Bot Fight Mode and AI Labyrinth disabled unless measured abuse warrants review; no custom/rate rules currently. Free default protections remain active. No paid upgrade required for current scope.

Robots Content-Signal search=yes, ai-input=yes, ai-train=no is advisory; no training crawler block promised. Markdown served only on eligible canonical URLs when requested via Accept; HTML remains default. Keep canonical links, Vary: Accept, and no-store for Markdown. No API catalog or agent auth needed.

## Integrations
GTM container GTM-5GMHQTJJ, GA4 G-DCP7MK6V0V. Preserve consent and six named events; no analytics before opt-in. EmailJS direct browser template with server-validated reCAPTCHA v2, explicit send, no private data retention setting (owner confirmed). Site key public; secret configured in EmailJS only. CAPTCHA loads after preparing message; copying available without solving. SPF v=spf1 -all, DMARC p=reject, Google MX preserved. No domain sender currently. Before future domain mail, configure provider-authorized SPF and DKIM before sending.

Historical checkpoint docs are not instructions to recreate staging or cut over DNS again.
