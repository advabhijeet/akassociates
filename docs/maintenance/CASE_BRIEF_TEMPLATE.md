# Case Brief Template

This template is for Chambers of AK judgment-based articles.

Use this for articles that explain, summarize or contextualize a court judgment, order or tribunal decision.

## Category Rule

Judgment-based articles should use the visible category/tag:

```text
Case Brief
```

Do not place all judgment summaries under a generic Legal Update category. A judgment may be old but still useful, so Case Brief is the cleaner editorial category.

## Style Direction

The public-facing style should be inspired by legal editorial websites, but must retain Chambers of AK branding:

- premium black, white and gold palette;
- subtle legal-publication tone;
- clear category label;
- concise headline;
- short summary/deck below headline;
- case metadata box;
- practical takeaways;
- source judgment download button;
- non-solicitation note.

Do not copy the design, text, layout or trade dress of any legal news website.

## Recommended Page Structure

Use this public article structure:

```text
Hero
- Category label: Case Brief
- Headline
- Short summary/deck

Article Body
- Quick Takeaways
- Case Metadata
- Background In Brief
- Issue Before The Court
- Court's View
- Why It Matters
- Practical Note / Documents / Publication Caution
- Official Judgment / Download Judgment
- Related Internal Pages
- Non-Solicitation Note
```

## Case Metadata Box

Every Case Brief should include a compact metadata box:

```html
<h2>Case Metadata</h2>
<div class="content-panel case-metadata">
  <p><strong>Case Title:</strong> ...</p>
  <p><strong>Court:</strong> ...</p>
  <p><strong>Case Number:</strong> ...</p>
  <p><strong>Neutral Citation / Citation:</strong> ...</p>
  <p><strong>Judgment / Order Date:</strong> ...</p>
  <p><strong>Bench / Coram:</strong> ...</p>
  <p><strong>Subject:</strong> ...</p>
</div>
```

## Quick Takeaways Box

For readability, add a short takeaway block near the top:

```html
<h2>Quick Takeaways</h2>
<div class="content-panel">
  <ul>
    <li>...</li>
    <li>...</li>
    <li>...</li>
  </ul>
</div>
```

## Official Judgment Button

Every Case Brief should include a visible source section where the judgment/order PDF or official source is available:

```html
<h2>Official Judgment</h2>
<div class="article-cta">
  <strong>Download the source judgment</strong>
  <p>This article is an original Chambers of AK case brief. Readers should refer to the judgment PDF for the complete text, facts, reasoning and operative directions.</p>
  <a class="btn btn-gold" href="../assets/judgments/<file-name>.pdf" target="_blank" rel="noopener">Download Judgment</a>
</div>
```

## Judgment PDF Storage

Store judgment PDFs under:

```text
assets/judgments/
```

Suggested filename format:

```text
YYYY-court-short-citation-topic.pdf
```

Examples:

```text
2026-insc-303-sarfaesi-auction-sale.pdf
2017-gujhc-1698-non-reportable-judgments-online-publication.pdf
```

## Writing Rules

A Case Brief should:

- be original Chambers of AK content;
- avoid copying or closely paraphrasing case-reporting websites;
- rely on the judgment/order as the primary source;
- avoid over-quoting;
- explain the procedural and practical relevance;
- preserve informational and non-solicitation language;
- include internal links to relevant practice, article or enquiry pages;
- include a source judgment button where available.

## Suggested SEO Pattern

Title:

```text
Case Brief: [Plain-language legal issue]
```

Slug:

```text
updates/[plain-language-topic]-case-brief.html
```

Meta description:

```text
Case brief on [case name/citation]: [issue], [court's view], and practical implications. General information only.
```

## Card Format For Insights Page

Use the article card category:

```html
<span class="update-tag tag-case-brief">Case Brief</span>
```

If `tag-case-brief` styling is not yet available, either add it to CSS or temporarily reuse a neutral existing tag style until the category styling patch is prepared.

## First Planned Case Brief

Planned article:

```text
updates/non-reportable-judgments-online-publication-case-brief.html
```

Working title:

```text
Case Brief: Can Non-Reportable Judgments Be Published Online?
```

Primary source uploaded by user:

```text
2017 GUJHC 1698.pdf
```

Case details:

```text
Dharamraj Bhanushankar Dave v. State of Gujarat & others
Special Civil Application No. 1854 of 2015
Gujarat High Court
Order dated 19 January 2017
Coram: R.M. Chhaya, J.
Neutral citation: 2017:GUJHC:1698
```
