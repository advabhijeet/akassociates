# AK-016.9 Baseline response headers

The production Worker adds nosniff, strict-origin-when-cross-origin, DENY framing, a restricted Permissions-Policy for unused capabilities, and a narrowly scoped CSP (frame-ancestors, object-src, base-uri). It applies these to HTML, Markdown, assets, redirects and errors without modifying response bodies or cache/indexing semantics.

The CSP deliberately does not restrict script-src, style-src, connect-src or form-action yet: production has inline Astro scripts and GTM/GA4 plus explicit EmailJS API delivery. A stricter CSP needs separate report-only/browser validation against the actual integrations. No HSTS change is made here; staged zone-level HSTS and rollback procedure remain separate. Browser tests mock external services; no real enquiry is sent. No changes to DNS or staging Worker.

Run npm run build:production, node scripts/test-security-headers.mjs, node scripts/test-markdown.mjs and node scripts/test-production-browser.mjs (Playwright installed).
