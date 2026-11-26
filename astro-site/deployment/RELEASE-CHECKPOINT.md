# Release checkpoint — AK-009C

## Verified
CI 45806628923: 87 canonical pages checked, zero errors and zero warnings in the scoped browser QA report. Calculator, local enquiry, mocked EmailJS and Markdown publishing tests passed. Pages HTTP audit 95 requests, 90 redirects, zero network/server errors; .html stripping confirmed. Main remains the original GitHub Pages source. No Cloudflare changes are authorized by these repository edits.

## Dependency lock
Import the exact package-lock.json artifact from successful run 45806628923 (artifact 15110825128; SHA256 decb3a473d1f7adbb6bdbf808136469191a64e9bfed52aa4e70d8587f4d3d5b8). One-time workflow restricted to astro-migration, verifies checksum, runs npm ci and build, commits only package-lock.json, never force-pushes. After successful import remove this workflow. Standard CI uses npm ci when lockfile exists.

## Staging
Create separate Cloudflare Worker: name chambers-of-ak-url-preview, repo advabhijeet/akassociates, branch astro-migration, root astro-site, build npm run build:worker-preview, deploy npx wrangler deploy, NODE_VERSION 22.23.4. Do not change DNS or custom domains. Existing Pages preview remains. Capture workers.dev URL and deployed commit. Run node astro-site/scripts/audit-worker-preview.mjs <staging-origin> to verify HTTP status, canonical URLs, aliases, noindex, verification files, RSS and robots. GitHub workflow_dispatch can be used if workflow is available on the default branch; otherwise run the local script. Do not merge main just to expose workflow.

## Launch sequence (not approved for execution)
1. Verify actual Worker staging, plus real device and accessibility/performance reviews. Save screenshots and baseline SEO report; export current DNS records and GitHub Pages settings. Confirm apex and www behavior, TLS, and preserve mail records (MX/TXT).
2. Prepare a distinct production release with canonical HTML handling, indexable robots and headers, canonical-only public host, real EmailJS consent-gated UI, existing GTM consent/event configuration, and IndexNow only after successful live verification. Review legal and privacy wording. Test actual email delivery with owner consent. Do not repurpose the noindex staging build directly.
3. Obtain explicit approval before domain cutover. Keep old GitHub Pages source intact; do not merge migration into main as a prerequisite.
4. Verify original 86 canonical paths (plus new resources) return 200 without redirects; consolidated aliases 301, unknown URLs 404; live robots and headers allow indexing, canonical sitemap/RSS and verification files work. Confirm Google Search Console ownership, analytics and enquiry delivery.
5. Rollback if routing, TLS, noindex, email, or widespread 404/5xx checks fail: restore the recorded previous web DNS settings and GitHub Pages configuration, detach conflicting Worker custom domain if required, recheck legacy site. Never modify mail records. No search notifications until stable.
