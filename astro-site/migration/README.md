# AK-002 — Legacy migration contract
Baseline: 95d4b51bdc3cf429ae46aa8abe22db531bb7a7d3. Repository inventory, not a live crawl or Google indexing report. Refresh against main before cutover.

## URL and SEO policy
Preserve sitemap URLs and legacy non-sitemap route behavior. Do not promote consolidated pages automatically. Cloudflare Pages can normalize .html URLs: test actual HTTP behavior on preview; if necessary evaluate Workers static assets with explicit HTML handling or an approved redirect/canonical migration. No production DNS changes until settled.
Carry over article text, citations, author, dates, image paths, alt text, schema and internal links. Exact page metadata must be extracted from original HTML. Generate sitemap, RSS, static listings and metadata from validated content; preserve feed GUIDs and canonical exceptions. Preserve production robots policy, verification files, IndexNow key, favicon and manifest; review ads.txt and professional conduct compliance. Preview remains noindex; no production IndexNow notifications or tracking. Exclude internal docs, tools and preview experiments from dist.

## Integration and acceptance
GTM events: whatsapp_click, phone_click, email_click, case_enquiry_click, contact_click, enquiry_submit. Review consent and privacy. EmailJS: preserve field and validation contract, use test destination, no client data in preview. Test disclaimer, navigation, light/dark modes, article search/filter/pagination, TOC, progress, related links, forms, accessibility and mobile. Compare HTTP status, redirects, canonical, robots, content and schema for every route; check images, RSS and 404. Capture Search Console and performance baseline separately; retain DNS rollback plan. Avoid solicitation, comparative claims and guarantees.
Inventory is complete for repository paths at baseline; live HTTP, per-page schema and canonical metadata beyond sampled non-sitemap services remain unverified.
