# AK-001 — Astro foundation
Isolated from the root legacy GitHub Pages project. Do not merge to main or attach the production domain at this stage.

## Local
Node 22.23.4 or later. Run npm install, npm run dev, npm run build from astro-site/. Commit a generated package-lock.json before production and switch CI to npm ci.

## Cloudflare Pages (preview only)
Root directory: astro-site; build command: npm run build; output: dist; NODE_VERSION: 22.23.4 or newer. No server adapter. Use a separate project / temporary URL; protect it with Cloudflare Access where possible. Robots and X-Robots-Tag are not authentication.

## Migration gates
- Inventory existing sitemap, canonical URLs, assets, registry, forms, verification and redirect behavior.
- Preserve legacy URLs wherever possible; Cloudflare Pages can normalize .html URLs, so verify actual HTTP behavior before choosing production host/redirect policy.
- Migrate article content, dates, images and citations without rewriting legal substance; retain existing validation coverage.
- No production DNS changes, indexing submissions or real enquiry forms in preview.
- Remove preview crawl blocking only after production cutover approval and canonical/HTTP verification.
- No internal repo docs or scripts in dist.
- Design tokens are provisional; homepage is a scaffold, not approved redesign.
