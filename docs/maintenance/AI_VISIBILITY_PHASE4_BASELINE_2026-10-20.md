# Chambers of AK — Phase 4 AI Visibility Baseline

**Snapshot prepared:** 20 October 2026 (IST)  
**Source:** User-supplied GSC ZIP `chambersofak.in-Performance-on-Search-Generative-AI-Features-2026-10-19.zip`; exported data covers **17 July–16 October 2026**, Web (text-based).

## Verified historical data

| Measurement | Value |
| --- | ---: |
| GSC Generative AI feature impressions, property aggregate | **378** |
| 10–16 October 2026 impressions | **137** |
| 3–9 October 2026 impressions | **35** |
| Week-on-week change | **+291.4%** |
| Page URL rows in Pages.csv | **34** |
| Impressions from India | **364** |
| Desktop / mobile / tablet impressions | **229 / 146 / 3** |

Top page rows from `Pages.csv`: Section 34 limitation **83**, Section 19 MSMED pre-deposit **41**, homepage **39**, MSME 45-day payment **30**, property title search **30**, Sabarimala nine-judge bench **27**, non-reportable judgment online publication **19**, MSME Samadhaan checklist **13**.

Property and page-level aggregations can differ; do not compare the sum of page rows with the property-level chart total. Source: https://support.google.com/webmasters/answer/17011364?hl=en

These are **impressions**, not clicks, confirmed answer citations, referrals, or client enquiries. The export predates the 20 October legal content updates and cannot establish their impact.

## Two new articles awaiting indexing verification

The owner reports submitting the latest `sitemap.xml` and requesting individual Google indexing for:

- https://chambersofak.in/updates/msefc-defective-goods-set-off-counterclaim.html
- https://chambersofak.in/updates/section-34-partially-reasoned-award-challenge.html

**Current indexed verdict: Unknown.** A public search spot-check on 20 October did not surface either exact URL; this is not proof that either URL is excluded. A direct HTTP fetch was unavailable from the current execution environment; that does not imply the site is down.

Prior Page Indexing report baseline: **52 indexed / 36 excluded URLs**. These values are from an earlier coverage review, not the generative-AI ZIP.

The already-scheduled **24 October 2026 Search Console Coverage Audit** was updated to check both new URLs, crawl dates, the Google-selected canonical, exclusion reasons and the latest page-indexing totals.

## Platform-specific measurement

| Platform / report | Native measure | Current evidence |
| --- | --- | --- |
| Google GSC Search Generative AI | Impressions | **378** in historical report; no later export |
| Bing Webmaster Tools AI Performance | Visible citations, cited pages, grounding queries | **No export yet** |
| ChatGPT Search | Actual cited URLs in fixed-prompt tests; separate GA4 referrals | **Not tested** |
| Gemini | Actual cited URLs | **Not tested** |
| Microsoft Copilot | Actual cited URLs; Bing aggregate separately | **Not tested** |
| Perplexity | Actual cited URLs | **Not tested** |
| Claude (web enabled) | Actual cited URLs | **Not tested** |

Source references:
- https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/
- https://support.google.com/webmasters/answer/9012289?hl=en

**Known integration blocker:** On 20 October 2026, the GSC Wizard connector returned `payment_required` because its trial/subscription had ended; current GSC API data could not be retrieved.

## Repeatable measurement protocol

A separate user-facing workbook, `Chambers_of_AK_AI_Visibility_Phase4_Tracker.xlsx`, was created from the historical CSVs. It contains the entire 92-day series, 34 historical URLs, both new indexing targets, country/device data and **20 identical legal questions × 6 AI services = 120 citation test rows**.

For each prompt, record date and locale, whether an AI answer was shown, whether Chambers of AK was visibly cited, the **exact cited URL**, competing sources and evidence. Distinguish *not tested*, *feature unavailable*, *tested with no citation*, and *citation observed*. Never convert untested values to zero.

Follow-up checkpoints: **24 October** (GSC indexing status), **27–30 October** (recheck pending indexation and begin fixed-prompt citations), and **mid-November** (compare settled time windows). Avoid causal claims based on short-term volatility or combining impressions with citations.

Do not repeatedly request indexing solely because the previous submission has not processed.