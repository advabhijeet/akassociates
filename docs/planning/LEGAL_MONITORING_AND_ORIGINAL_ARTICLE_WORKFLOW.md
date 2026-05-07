# Legal Monitoring And Original Article Workflow

This document records the future plan for monitoring legal developments and turning them into original Chambers of AK legal insight articles.

## Purpose

The website may later include a workflow that monitors legal developments, judgments, government notifications, bills, circulars and trending legal issues, then converts selected developments into original Chambers of AK articles.

The goal is not to copy legal news websites. The goal is to:

- identify relevant legal developments;
- verify them from primary or authoritative sources;
- prepare original explanatory content;
- connect the development to Chambers of AK practice areas;
- publish only after legal/professional review.

## Important Copyright And Ethics Rule

Do not copy, scrape and republish another website's article text.

Permitted approach:

- collect headlines, links, dates and short internal summaries;
- verify from primary sources where possible;
- write a new original article in Chambers of AK's own words;
- cite/source the original source or primary material where appropriate;
- avoid copying protected expression, analysis or long quotations.

Avoid:

- republishing another website's article;
- paraphrasing too closely;
- using paywalled content without permission;
- publishing unverified legal developments;
- using sensational or promotional language.

## Source Priority

Prefer primary or official sources first:

### Courts / Judgments

- Supreme Court of India website.
- High Court websites.
- eCourts / court order portals where accessible.
- Tribunal websites where relevant.

### Government / Statutory Updates

- Gazette of India.
- Ministry websites.
- Department notifications.
- RBI, SEBI, MCA, MSME Ministry, DPIIT and other regulators where relevant.
- India Code for statutory text.

### Secondary Legal News Sources

Secondary sources can be used for discovery only, not as the sole basis for publication where primary sources are available.

Examples of secondary discovery sources:

- legal news websites;
- bar/legal portals;
- law firm updates;
- government press releases;
- professional newsletters.

## Monitoring Categories

Track developments relevant to Chambers of AK practice areas:

- cheque bounce / Negotiable Instruments Act;
- MSME delayed payment / MSEFC;
- RERA and builder-buyer disputes;
- arbitration and conciliation;
- commercial suits and recovery;
- property and civil litigation;
- DRT, SARFAESI and banking recovery;
- contracts and documentation;
- trademarks / IP advisory;
- court procedure, limitation and evidence updates.

## Future Feature Concept

A future technical system may include:

1. Source list configuration.
2. Scheduled monitoring.
3. Headline/link/date collection.
4. Deduplication.
5. Relevance scoring by practice area.
6. Primary-source verification flag.
7. Draft topic shortlist.
8. Human review.
9. Original article drafting.
10. Publication through the standard article workflow.

## Proposed Data Fields

Each monitored item should store:

```text
source_name
source_url
source_type: primary / official / secondary
published_date
discovered_date
title
short_internal_summary
practice_area
jurisdiction
relevance_score
primary_source_verified: yes / no
primary_source_url
status: discovered / shortlisted / verified / drafted / published / rejected
notes
```

## Relevance Scoring

Suggested score from 1 to 5:

- 5: Directly affects a core Chambers of AK practice area and is useful for clients/readers.
- 4: Relevant to one or more practice clusters but needs careful explanation.
- 3: General legal development with some website relevance.
- 2: Background legal news, not urgent.
- 1: Not relevant for publication.

Only items scoring 4 or 5 should normally become articles.

## Verification Workflow

Before drafting an article:

1. Identify the original source.
2. Confirm date and status.
3. Check whether the development is final, proposed, stayed, appealed or only reported.
4. If based on a judgment, identify court, case name, date and citation/order link if available.
5. If based on legislation, confirm whether it is a bill, ordinance, act, notification, draft rule or final rule.
6. Record whether it affects current practice immediately or is only planned/proposed.

## Article Drafting Rules

Every article created from a legal development should include:

- what changed or what was held;
- why it matters;
- who it may affect;
- documents/dates to keep ready, if relevant;
- current status: final/proposed/pending/challenged;
- official source/reference link;
- practical but general explanation;
- non-solicitation note.

Avoid:

- sensational titles;
- political commentary unless legally necessary;
- direct advice without facts;
- copying another article's wording;
- claiming certainty where law is unsettled.

## Publication Path

After a monitored item is approved for publication, follow:

```text
docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md
docs/maintenance/ARTICLE_HTML_TEMPLATE.md
```

Update:

- `updates/<article>.html`;
- `legal-updates.html`;
- relevant practice/service links;
- `sitemap.xml`;
- `feed.xml`;
- LinkedIn Page draft;
- WhatsApp Channel draft;
- newsletter/email draft;
- Search Console indexing status;
- planning/changelog documentation.

## Automation Options For Later

Possible future implementation options:

### Option A - Manual Research Workflow

Use ChatGPT/web research manually once or twice per week to identify relevant legal developments, then draft original articles.

Pros:

- safest;
- low technical overhead;
- human review built in.

Cons:

- not automatic.

### Option B - Semi-Automated Watchlist

Maintain a source list and periodically generate a shortlist of recent legal developments for review.

Pros:

- faster discovery;
- still review-based.

Cons:

- requires careful source handling and filtering.

### Option C - Automated Dashboard

Build a small dashboard or scheduled script that collects source links, scores relevance and creates draft topic cards.

Pros:

- scalable;
- supports regular content production.

Cons:

- requires coding, hosting and maintenance;
- must avoid copyright issues;
- must not auto-publish.

## Recommendation

Start with Option A or Option B.

Do not auto-publish legal-news-derived articles. Use monitoring only to identify topics. Drafts should remain original and should be reviewed before publication.

## Current Next Step

Create a source watchlist document listing:

- official court sources;
- government sources;
- regulator sources;
- secondary legal news discovery sources;
- practice-area tags for each source.
