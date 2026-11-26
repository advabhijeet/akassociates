# AK-007 — Article Publisher for Astro

## Existing articles
The legacy registry and original HTML remain authoritative for the 51 existing articles. Astro loads them through a validated content collection without rewriting the legal text. Preserve approved illustrations, exact URLs, author/date metadata, citation text, and judgment downloads. Existing RSS GUIDs and publication dates are retained. Do not edit the obsolete homepage snapshot.

## New articles
1. Copy src/content/articles/publishing-example.md to a unique filename. Set a unique slug, article title, SEO title, description, excerpt, category, tags, verified author, published and modified dates in quoted ISO format with timezone, image paths and article-specific alt text.
2. Write the article in Markdown, starting with H2 headings. Include reviewed legal analysis, primary references, and appropriate internal links. Do not claim outcomes, solicit work or fabricate citations. Check the current statute and judgments before publication.
3. Add approved artwork to public/assets/img/ (1200 × 675 full image; 640 × 360 card derivative, safe central composition). Use existing editorial style, no cropping of important text. Verify actual dimensions and social previews before sign-off.
4. Leave draft: true until the article and artwork are approved. Set draft: false to include it in the build. Do not publish the sample.
5. Commit only to astro-migration until cutover. Run npm run build from astro-site; confirm CI and Cloudflare deployment.

The collection supplies article routes, homepage latest entries, static archive, tags, related reading, generated OG/Twitter metadata, BlogPosting and BreadcrumbList, RSS and sitemap. New Markdown entries use filename-based collection IDs and explicit public slugs. No manual registry, feed or sitemap changes are needed for new Markdown articles. Existing HTML article updates still use the legacy registry and source HTML, with original encoding and registry validation.

## Preview and release safeguards
Preview remains noindex, with robots and X-Robots-Tag unchanged. Generated sitemap contains only migrated canonical routes and is a release candidate, not the complete production sitemap until remaining core pages are migrated. RSS uses the production canonical URLs; do not submit preview files to search engines. Legacy IndexNow workflow is guarded against non-main runs; no new notification is sent. Before cutover, retain verification file and public key, extend the sitemap to remaining routes, resolve Pages .html normalization or switch hosting strategy, compare production URLs, and implement deployment-success-gated IndexNow for new Markdown changes. Current production workflow is not changed by this branch. Full metadata/asset dimension and fragment parity plus actual Markdown publication test remain pending. No DNS or main changes.
