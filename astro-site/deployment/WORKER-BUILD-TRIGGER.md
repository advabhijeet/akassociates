# Worker staging build trigger

Cloudflare's initial manual build used main, where astro-site does not exist. Production branch for this separate staging Worker is now astro-migration. This documentation-only commit triggers a fresh Git-based deployment from that branch. Root: astro-site. Build: npm run build:worker-preview. Deploy: npx wrangler deploy. No production domain, DNS or main changes.
