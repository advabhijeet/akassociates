# Phase 4 — Generative AI visibility measurement (baseline: 20 October 2026)

This document records the **measurement method**, not a claim that rankings or citations have improved because of any particular repository edit. Keep Search Console first-party data, Google indexing status and independent AI-assistant observations separate.

## 1. Source and correct metric

Baseline export supplied by the publisher:
`chambersofak.in-Performance-on-Search-Generative-AI-Features-2026-10-19.zip`

It is an export from the **dedicated Search Console Generative AI performance report (Search)**. Although `Filters.csv` says `Search type: Web (text-based)`, the report identity appears in the ZIP filename. Google introduced the dedicated Generative AI performance reports in June 2026; Search impressions cover appearances in generative AI features such as AI Overviews and AI Mode. These impressions are included in overall Web performance but the dedicated view is a distinct subset. See Google's [June 2026 announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) and [report documentation](https://support.google.com/webmasters/answer/16984139).

**Do not label these impressions as ordinary Web totals, clicks, AI referrals or independently validated citations by ChatGPT, Perplexity, Gemini, Copilot or Claude.** The dedicated Google report reports impressions and page-level exposure but not the source queries or downstream leads.

### Baseline snapshot

| Metric | Value | Period / interpretation |
| --- | ---: | --- |
| Google Search generative AI impressions | **378** | 17 July–16 October 2026, property-level daily totals (`Chart.csv`) |
| Last complete week in export | **137** | 10–16 October 2026 |
| Previous complete week | **35** | 3–9 October 2026 |
| Week-on-week change | **+291.4%** | 137 / 35 − 1; comparative exposure, **not** an SEO-causality claim |
| URLs appearing in `Pages.csv` | **34** | Distinct pages with reported impressions |
| Homepage impressions | **39** | Individual page row |
| Section 34 limitation guide | **83** | Individual page row |
| Section 19 MSMED pre-deposit guide | **41** | Individual page row |
| MSME Section 15 payment dates | **30** | Individual page row |
| Property title-search checklist | **30** | Individual page row |
| MSME Samadhaan filing checklist | **13** | Individual page row |

**Aggregation caveat:** `Pages.csv` URL-row values sum to 390, while `Chart.csv` property-level daily totals sum to 378. Do **not** add the URL-row counts to obtain the property-wide total. Use `Chart.csv` for the headline metric; differing attribution/aggregation rules can make page totals differ.

## 2. New article indexation watch

On **20 October 2026**, the publisher reported that the sitemap was submitted and indexing requests were submitted for the two new articles:

1. https://chambersofak.in/updates/msefc-defective-goods-set-off-counterclaim.html
2. https://chambersofak.in/updates/section-34-partially-reasoned-award-challenge.html

The URLs were committed to `main`, placed in the `sitemap.xml`, and linked from ordinary HTML on the Insights hub. The **GSC URL Inspection results (Google index status, most recent crawl, Google-selected canonical, page fetch)** are **not yet available to this report**. Submission is not indexing.

The GSC Wizard integration declined access on 20 October 2026 because the account has no active subscription. Do not invent a Google status from GitHub CI results or a public `site:` search.

**24 October review (existing scheduled Search Console coverage audit):**
- In GSC, use URL Inspection for both exact URLs and record the verdict, crawl date, Google-selected canonical, and any crawl/noindex/redirect errors.
- Confirm the submitted sitemap's latest read and reported errors.
- Do not repeatedly submit unchanged URLs; Google's [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) says repeated requests do not accelerate recrawling.
- Check the production hostname/CDN response independently if GSC reports a fetch problem.

## 3. Repeatable Google AI measurement

For each later report, export the **same dedicated Generative AI performance (Search)** view using the **same property**, with a fully processed, equal-length comparison window. Save:
- `Chart.csv`: property-level impression trend. Weekly change from complete weeks only.
- `Pages.csv`: number of pages with impressions; gains/losses by exact canonical URL.
- `Countries.csv`, `Devices.csv`: context. Avoid inference about actual visitors.
- `Filters.csv`: confirm matching filters and report identity from the export filename.

Track newly published articles *separately* from established high-visibility URLs; zero impressions in the first few days does not establish an indexation failure.

## 4. Independent AI citation protocol

Test **neutral, non-branded, India-relevant legal questions** across ChatGPT Search, Perplexity, Gemini, Microsoft Copilot and Claude (only where the product can search and show source links). Hold prompt wording and test context stable; repeat on a weekly or fortnightly basis.

Suggested prompt set:
1. What is Section 34(3) arbitration limitation in India and how does a Section 33 request change the starting date?
2. Is the 75% pre-deposit mandatory under Section 19 of the MSMED Act and what commenced under the 2026 amendment?
3. Can an MSEFC buyer defend a claim for defective goods and raise set-off or counterclaims?
4. What property title records should a Bihar buyer check before purchase?
5. What documents are required for an MSME Samadhaan delayed-payment claim?
6. When can a partly reasoned arbitral award be challenged under Section 34?

Record: **date and timezone**, provider/product and search-enabled mode, **exact prompt**, visible answer, directly linked source URL, and saved evidence (screenshot or share URL). Distinguish **citation with link**, **mention without link**, and **no citation**. A single negative result does not establish general exclusion. Do not test only prompts containing the firm's name; that distorts the baseline.

Google's dedicated AI-impressions report and independent AI citation tests are not equivalent metrics and must not be added together.

## 5. GA4 / referral measurement

If GA4 or access logs are available, separately record actual landing-page sessions with identifiable AI referrers. These represent observed referral visits subject to browser/product attribution limits, **not** all AI-feature exposure. Do not claim clicks or conversions from the dedicated generative AI impressions report alone.

## 6. Decisions, not vanity metrics

- **If GSC reports 'Not indexed'**: inspect fetch/noindex/canonical response first. Fix underlying issues before further submissions.
- **If indexed but no AI impressions**: allow observation time, reassess whether the article answers a distinct question and whether internal links and sources are credible.
- **If Google AI impressions rise without referrals**: treat exposure and engagement as separate outcomes.
- **If assistants cite a competitor**: record the actual cited URL and identify differences in clarity, source attribution and specificity; do not imitate or copy the competitor's work.
- **If the report is flat immediately after edits**: do not assign cause; compare several settled periods.

All substantive legal statements remain subject to review against current statutes, notifications and judgments. Avoid artificial refreshes of publication dates, fabricated citations and solicitation-style copy.
