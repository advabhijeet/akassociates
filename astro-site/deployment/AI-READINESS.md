# AK-016 AI readiness

Production robots declares search=yes, ai-input=yes, ai-train=no. These are usage preferences, not access blocks. Existing crawl directives and sitemap are retained. Preview remains noindex and disallow-all.

Production build derives Markdown from the canonical rendered HTML for homepage, Legal Insights archive and public articles, including source URL, headings, bylines, links and article disclaimers. No additional sitemap URLs. Worker content negotiation is explicit Accept: text/markdown only, with Vary: Accept and no-store for Markdown. Private generated paths return 404 externally. HTML is unchanged. Interactive tools, forms, service pages and error pages are outside Markdown scope.

Run npm run build:production, node scripts/test-production.mjs and node scripts/test-markdown.mjs. Cloudflare diagnostic recognition is not guaranteed. No IndexNow resubmission for format-only changes. Rollback by reverting the AI-readiness commit on the production branch; do not change DNS settings.
