# Bing, Yahoo, Copilot, and AI search discovery — Chambers of AK

Last reviewed: 21 October 2026. Bing Webmaster Tools site connection and sitemap submission confirmed by the site owner on this date; Bing sitemap processing and indexation remain unverified.

## Current repository configuration

- Public crawl access explicitly permits `bingbot`, Googlebot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot in `robots.txt`. The wildcard group remains open. This records intent; it does **not** prove firewall/CDN acceptance, successful crawling, indexing, or citations.
- The canonical site sitemap remains `https://chambersofak.in/sitemap.xml`; the site also publishes `https://chambersofak.in/feed.xml`. The sitemap contains 85 URLs and the Insights registry lists 50 articles as of this review.
- Registry-backed article discovery uses static HTML links in the Legal Updates hub (not JavaScript alone). Canonicals, article metadata, structured data, and sitemap parity are checked in repository validation.
- Bing Webmaster Tools site connection and canonical sitemap submission were confirmed by the owner on 21 October 2026. This does **not** establish Bing's successful processing or individual page indexation.
- An IndexNow key file is now in the GitHub Pages root, and a GitHub Actions notifier has been configured for changed canonical HTML pages. Its first live delivery/IndexNow acceptance is **not yet verified**; do not claim successful submissions without Action logs and the Bing IndexNow report.

## 22 October 2026 — Bing URL Inspection confirmation

The site owner supplied Bing Webmaster Tools URL Inspection screenshots showing **Indexed successfully / URL can appear on Bing** for both:
- `updates/msefc-defective-goods-set-off-counterclaim.html`: one SEO/GEO warning, **Title too long**.
- `updates/section-34-partially-reasoned-award-challenge.html`: two SEO/GEO warnings, **Title too long** and **Meta Description too long or too short**.

Both screenshots also show JSON-LD and OpenGraph detected. This is evidence of Bing indexing and markup detection, **not** proof of ranking, traffic, AI citations, or complete schema validation. The metadata warnings prompted shorter descriptive HTML titles and a tighter description for the Section 34 guide; no article body, canonical URL, social-image asset or legal conclusions were altered. After deployment, inspect **Live URL** and wait for Bing's index to reflect the metadata change. Bing AI Performance remains separately pending.

## Priority 1 — Bing indexing and AI baseline (property and sitemap already connected)

1. Open <https://www.bing.com/webmasters/>. In **Sitemaps**, verify processing / last read for `https://chambersofak.in/sitemap.xml` rather than submitting the same file again.
2. Inspect the homepage, Insights hub, and both new pages:
   - <https://chambersofak.in/updates/msefc-defective-goods-set-off-counterclaim.html>
   - <https://chambersofak.in/updates/section-34-partially-reasoned-award-challenge.html>
3. Record Bing's canonical selection, fetch status and indexed/not-indexed verdict. URL Inspection and an indexing request are separate from actual indexing.
4. In **Search Performance**, export Bing clicks, impressions and indexed landing pages for a complete baseline period.
5. In **AI Performance**, review total citations, cited URLs, grounding-query themes, and **Topics Portfolio (Beta)** where data is available. These are Bing-supported AI citation counts, not equivalent to Google GSC impressions. Low or missing citations are an honest baseline, not grounds to invent results.

## Priority 2 — IndexNow publication automation (code in this repository)

The **IndexNow verification file** `5c688070aeba92b5256f3a4590fd4c6e.txt` is placed at the GitHub Pages root. It is a publicly readable ownership token, not an authentication secret. GitHub Pages must deploy it to:
`https://chambersofak.in/5c688070aeba92b5256f3a4590fd4c6e.txt`.

The notifier `tools/indexnow-notify.js` and GitHub Action `.github/workflows/indexnow.yml`:

- Select **only** newly added or modified public HTML files after a production push; deletions are not yet automated.
- Ignore noncanonical and `noindex` pages and other source files.
- Require the exact verification key file to be reachable on the live host; require the target article to be reachable with its declared canonical before submitting.
- Send a single JSON POST to `https://api.indexnow.org/indexnow` listing eligible changed URLs, using the publicly hosted key location.
- Accept 200 or 202 as notification receipt/validation pending. HTTP status acknowledgement is **not** proof of search-engine crawling or indexation.
- Skip publication events which change only documentation, styling or workflow files.

**One-time activation/first submission:**

1. Once deployed, open the public key URL and confirm it displays only the 32-character key.
2. In GitHub → Actions → **IndexNow changed-page notifications** → **Run workflow**, enter the two article URLs above separated by a comma (one manual run).
3. Check that Action's output contains `IndexNow acknowledged 2 updated URL(s)` with HTTP 200 or 202; if it fails, inspect the key deployment and HTTP status rather than repeated manual submissions.
4. Confirm the received URLs in Bing Webmaster Tools' **IndexNow** report. Later **real HTML changes on main** trigger the workflow automatically.

GitHub Actions cannot be launched through the current GitHub connector, so do not claim the first manual run has occurred without separate proof. If Bing already shows a working alternative IndexNow integration, review duplicate senders before enabling further notification methods.

Bing discontinued anonymous sitemap ping submissions in 2022. Keep the XML sitemap unchanged; IndexNow complements it, and neither guarantees indexation.

## Yahoo and downstream discoverability

Microsoft states that Bing powers search experiences including Yahoo and many partner surfaces. Prioritise correct `bingbot` access, Bing Webmaster Tools, site health, title quality, and Bing indexing; do not create a separate imaginary Yahoo sitemap submission workflow. Yahoo may have other sources/features; do not promise that every Yahoo result mirrors Bing.

## Content strategy for Bing and Copilot

Use the same canonical URLs and authoritative legal articles as Google. Maintain legally accurate headings and answers, accessible body text, dated amendments and source links, intelligible claim/case descriptions, author details, relevant internal links, and page speed. Titles should distinguish distinct user intents: supplier filing, buyer defence, post-award remedy, Section 34 limitation, and partly reasoned award grounds. Avoid duplicating pages by search engine or manipulating publication dates for freshness.

The site's legal-practice marketing must continue to respect applicable Indian advocate publicity/advertising restrictions. Do not pursue paid link schemes or mass low-quality directory placements.

## Crawl verification and technical safeguards

After deployment, independently verify HTTP 200 (or expected canonical redirect) for `/robots.txt`, `/sitemap.xml`, `/feed.xml`, `/legal-updates.html`, and a representative article. Check CDN/WAF logs for verified `bingbot` and search crawlers; a permissive robots policy alone cannot override security blocks.

## Primary references

- Bing Webmaster Tools onboarding: <https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/>
- Bing Sitemaps: <https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed>
- Bing IndexNow: <https://www.bing.com/webmasters/help/indexnow-0z209wby>
- Bing sitemap freshness and lastmod: <https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/>
- Bing AI Performance: <https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/>
- Topics Portfolio Beta, 13 October 2026: <https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/>
- Robots Exclusion Protocol implementation: <https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec>
