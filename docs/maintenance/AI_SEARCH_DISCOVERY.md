# AI search discovery and SEO integrity — Chambers of AK

This project uses the same public HTML pages, canonical URLs, and sitemap for ordinary web search and for AI-powered search experiences. There is no separate public-website upload to ChatGPT or Gemini and no guarantee of being selected as a citation.

## Confirmed repository state (20 October 2026)

- The wildcard rule in `robots.txt` permits public crawling and advertises `sitemap.xml`.
- `legal-updates.html` contains static HTML links for the 48 entries in `assets/data/insights-registry.json`, in addition to client-side enhancements.
- `feed.xml` includes the registered updates, and `sitemap.xml` lists their canonical URLs.
- Patna property-dispute and civil-litigation landing pages use self-canonicals.
- The corresponding Bihar redirect stubs intentionally use `noindex` and point to the Patna canonical pages. Do not convert these into independently indexable pages without reviewing the consolidation strategy.

## Quality gates

Run from the repository root:

```bash
node tools/validate-article-encoding.js
node tools/validate-insights-registry.js --strict
node tools/validate-seo-sitewide.js
```

The sitewide validator checks page titles, approved noindex redirects, canonical/OG URLs, sitemap parity, article metadata and registry thumbnails, RSS article coverage, and static HTML article discovery. It now also checks for root crawl blocking rules in `robots.txt`.

The GitHub Actions workflow `.github/workflows/seo-integrity.yml` runs these checks on pull requests and main-branch pushes. Check its result before merging significant publishing changes.

## Live verification outside the repository

Static files cannot establish whether the hosting/CDN firewall permits a crawler or whether an AI search system will cite an article. Verify these separately:

1. Inspect status codes for `https://chambersofak.in/robots.txt`, the sitemap, the Legal Updates hub, and representative articles.
2. Inspect CDN/WAF rules and logs for Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot. Do not rely exclusively on user-agent strings for crawler verification.
3. Review Google's Search Console indexing, Search generative AI inclusion controls, and AI performance reporting.
4. Verify Bing Webmaster Tools and establish a baseline in AI Performance, where available.
5. Compare consistent reporting windows over time. Google AI impressions are not equivalent to clicks, users, or confirmed quotations in the generated answer.

## Training crawler choice

The current wildcard `Allow: /` permits bots that do not have a more specific blocking rule, including some model-training crawlers. Search-crawler access and model-training permission are separate choices. Do not add opt-outs or opt-ins for training crawlers without a deliberate publisher decision. In particular, Google-Extended controls specified Gemini uses and is separate from Googlebot.

## Publishing safeguards

Preserve substantive legal content and approved graphics during technical patches. When adding an article:

- Supply an accurate title, canonical and OG URL, author/publisher information, current legal sources, and a truthful review date.
- Add its entry and thumbnail references to the article registry.
- Include its canonical URL in the sitemap and RSS feed.
- Ensure its link appears as ordinary HTML on the Insights hub, not only as a JavaScript-rendered card.
- Run all three validators.

Avoid artificial changes to publication dates, duplicated articles, keyword stuffing, or unsupported claims of guaranteed rankings.
