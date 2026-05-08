# Insights Category Restructure Plan

Date: 2026-05-08

This plan records the next structural upgrade for the Chambers of AK Insights section.

## Trigger

The user reviewed the Insights page and identified two issues:

1. New tags/labels such as `Case Brief` do not visually match the older styled tags.
2. Articles should be reassessed and organized by their editorial category/tag for better sorting.
3. Case Briefs should have their own block on the Insights page, similar to the Latest Articles block.

## Important SEO Constraint

Do not immediately move existing live article URLs without a redirect/canonical strategy.

Existing live URLs under:

```text
updates/*.html
```

may already be indexed, submitted in Search Console, included in sitemap/feed, and internally linked. Moving them directly to deeper folders may create avoidable 404, duplicate, or indexing churn.

## Recommended Migration Strategy

Use a staged approach.

### Phase 1 - Visual and Page Layout Upgrade

Do now:

- improve tag/label CSS;
- add consistent styling for:
  - Case Brief;
  - Legal Update;
  - Practical Guide;
  - Document Checklist;
  - Procedure Note;
  - Commercial;
  - SARFAESI;
  - Arbitration;
  - RERA;
  - MSME;
  - NI Act;
  - Property;
- restructure `legal-updates.html` into editorial blocks:
  - Latest Articles;
  - Case Briefs;
  - Practical Guides / Checklists;
  - Practice-Area Updates;
- keep existing article URLs unchanged during this phase.

### Phase 2 - Category Inventory

Create a category inventory of every existing article.

For each article record:

```text
Current URL:
Current tag:
Recommended category:
Recommended future folder:
Needs judgment PDF: Yes / No
Has Download Judgment button: Yes / No
Internal links checked: Yes / No
Sitemap/feed checked: Yes / No
Migration priority: High / Medium / Low
```

### Phase 3 - Future Article Folder Rules

For new articles, use category folders after documentation is updated:

```text
updates/case-briefs/
updates/legal-updates/
updates/practical-guides/
updates/document-checklists/
updates/procedure-notes/
```

Suggested URL examples:

```text
updates/case-briefs/non-reportable-judgments-online-publication.html
updates/case-briefs/sarfaesi-auction-sale-rule-9-4.html
updates/legal-updates/msme-facilitation-council-process.html
updates/practical-guides/cheque-bounce-defence-after-summons.html
updates/document-checklists/commercial-suit-documents-checklist.html
```

### Phase 4 - Legacy Article Migration

Only migrate existing articles after deciding a URL strategy.

Options:

#### Option A - Keep legacy URLs permanently

Pros:

- safest for indexing;
- no redirect complexity;
- no link churn.

Cons:

- folder structure remains less organized physically.

Implementation:

- use Insights page category blocks for organization;
- use tags/labels and internal metadata;
- do not move old files.

#### Option B - Create new category URLs and preserve old files as redirects

Pros:

- clean folder structure;
- old URLs do not break.

Cons:

- GitHub Pages static redirects require HTML redirect pages or canonical pages;
- more maintenance.

Implementation:

- create new categorized article files;
- convert old article pages into redirect/canonical bridge pages;
- update sitemap/feed/internal links;
- request indexing for new URLs;
- monitor Search Console.

#### Option C - Move files without redirects

Not recommended.

This may create 404s and indexing disruption.

## Editorial Category Definitions

### Case Brief

Use for judgment/order based articles.

Required:

- Case Metadata;
- Quick Takeaways;
- Court's View;
- Why It Matters;
- Official Judgment / Download Judgment button where source PDF is available.

### Legal Update

Use for current law, notification, rule, circular, government/regulator/court update.

Required:

- date/source clarity;
- legal status clarity: proposed/final/notified/stayed/etc.;
- practical implications.

### Practical Guide

Use for general explanatory articles that guide readers through a process.

Examples:

- cheque bounce defence after summons;
- commercial recovery before suit;
- arbitration notice before claim.

### Document Checklist

Use for document-preparation articles.

Examples:

- commercial suit documents checklist;
- property injunction suit documents.

### Procedure Note

Use for court/forum process explainers.

Examples:

- MSME Facilitation Council process;
- Section 34 arbitration challenge process.

## Immediate Next Patch

Prepare a manual patch for:

```text
assets/css/style.css
legal-updates.html
```

Patch goals:

- improve all tag styling;
- add `Case Briefs` block to Insights page;
- keep existing article URLs unchanged;
- avoid breaking sitemap/feed/canonical state;
- validate JS, XML, JSON-LD and internal links.

## Future Documentation Updates

Update the following documents after the visual/layout patch:

```text
docs/maintenance/CASE_BRIEF_TEMPLATE.md
docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md
docs/planning/CONTENT_CALENDAR_AND_TOPIC_QUEUE.md
docs/codex/HANDOFF.md
```

## Current Recommendation

For now, keep existing live article URLs under `updates/` and organize the Insights page visually by category. Start using category folders for future articles after the category inventory and migration plan are approved.
