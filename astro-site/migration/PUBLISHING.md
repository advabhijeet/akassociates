# Article publishing — current production workflow (AK-017)

## Editorial requirements
Maintain Chambers of AK's existing legal editorial style. Verify statutes, judgments, dates, applicability, court/forum jurisdiction and primary links. No fabricated citations, outcome promises or solicitation. Obtain owner approval of legal content, author/date and illustrations before publication. Use original artwork or lawfully licensed assets; article-specific alt text. No client or privileged data in source.

## New Markdown articles
- Branch from astro-migration into a distinct article candidate branch; do not edit legacy main.
- Copy astro-site/src/content/articles/publishing-example.md to a unique filename. Set explicit slug, title, seoTitle, description, excerpt, category, tags, author, published/modified ISO timestamps with +05:30, thumbnail, cardThumbnail, imageAlt. Start article body with H2; include verified primary sources and relevant internal links. Preserve the draft example.
- Add approved assets in astro-site/public/assets/img/ (full 1200x675, card 640x360, verify actual dimensions and social composition). Set draft: true until approved, then false for release.
- Collection generates /updates/<slug>.html, homepage, archive, related reading, metadata, JSON-LD, RSS and sitemap; production build also generates Markdown automatically. Do not hand-edit generated output, legacy registry or legacy homepage to add a native Markdown article.
- Run npm ci, npm run build:production, relevant tests in Operations. Run node scripts/test-publishing.mjs only separately (temporary non-legal fixture, deletes dist); rebuild cleanly before release. Run isolated candidate CI. Verify canonical, original dates, internal links, references, sitemap, RSS, archive, hero and card images, preview noindex. Check no fixture or draft is included.
- Promote exact validated commit; wait for actual production release and independent audit. Do not publish directly from a draft or skip owner approval.

## Existing legacy HTML articles
51 migrated legacy articles are sourced from original updates/*.html and assets/data/insights-registry.json. Edit these sources for existing content; preserve canonical .html URLs, publication dates and RSS GUIDs, approved artwork, citations and judgment files. Align title/description, OG/Twitter and JSON-LD where relevant. Update modified date only for real editorial revisions. Native Markdown is preferred for new articles. Do not duplicate an existing slug in the new collection.

## IndexNow
Initial post-migration submission: 87 URLs accepted HTTP 200 on 27 Nov 2026 (run 45932646623). Never rerun that one-time initial job. Save old live release-manifest.json before release, and retain it outside dist-production.
From astro-site after clean candidate build, run node scripts/indexnow-production.mjs <previous-manifest-path> for dry run. Review changed/removed URLs: build-wide shared layout changes can affect all hashes; do not treat them as substantive editorial changes. The existing script sends all detected changes and cannot filter approved subsets; if the list is broader than intended, stop and implement explicit scope support before sending. For approved exact diff, only after live audit, set AK_INDEXNOW_APPROVED=YES and pass --send; script checks live marker, sitemap, robots, key, hashes and removal status. Do not send from staging or before deployment. Automation not enabled; maintain an operator-approved log. IndexNow acceptance is not indexing or ranking confirmation.

Google: sitemap is the canonical sitemap.xml. Use normal crawl and targeted URL Inspection for priority additions; do not repeatedly request indexing or resubmit unchanged URLs. Track actual indexing in Search Console. See Monitoring.

## Release gate
No actual new legal article has been published as part of this documentation work. CI fixture is not a live publication. The final live audit accepts new article paths after independent exact-release build; its pinned SHA must be updated per release.
