# Judgment Article Metadata Standard

This document defines the required metadata block for every Chambers of AK article that summarizes, explains or relies substantially on a court judgment.

## Rule

Whenever a judgment summary or judgment-based legal insight is created, the article must include a structured case metadata block near the start of the article, preferably immediately after the opening introduction and before the main explanation.

## Required Metadata Fields

Every judgment-based article should include:

```text
Parties / Case Title:
Case Number:
Citation / Neutral Citation:
Judgment Date:
Court:
Bench / Coram:
Authoring Judge, if available:
Subject / Legal Area:
Primary Source:
```

If any field is not available, use:

```text
Not available in the reviewed source
```

Do not guess missing metadata.

## Recommended HTML Block

Use this structure inside the article body:

```html
<h2>Case Metadata</h2>
<div class="content-panel case-metadata">
  <p><strong>Parties / Case Title:</strong> {{CASE_TITLE}}</p>
  <p><strong>Case Number:</strong> {{CASE_NUMBER}}</p>
  <p><strong>Citation / Neutral Citation:</strong> {{CITATION}}</p>
  <p><strong>Judgment Date:</strong> {{JUDGMENT_DATE}}</p>
  <p><strong>Court:</strong> {{COURT}}</p>
  <p><strong>Bench / Coram:</strong> {{BENCH}}</p>
  <p><strong>Authoring Judge:</strong> {{AUTHORING_JUDGE}}</p>
  <p><strong>Subject / Legal Area:</strong> {{SUBJECT}}</p>
  <p><strong>Primary Source:</strong> {{PRIMARY_SOURCE}}</p>
</div>
```

## Download Button For Judgment PDF

If the judgment PDF is hosted on the website, include a download-only button. Do not embed the PDF unless specifically required.

```html
<p>
  <a class="btn btn-gold" href="{{PDF_PATH}}" download>
    Download Official Judgment PDF
  </a>
</p>
```

## Source Handling

- Prefer official court PDFs or official court pages.
- If an official court PDF is unavailable, clearly say what source was reviewed.
- Do not copy long portions of the judgment.
- Avoid over-quoting.
- Explain the judgment in original Chambers of AK language.
- Preserve informational and non-solicitation language.

## Application To Current Order XIII-A Article

The article:

```text
updates/summary-judgment-commercial-suits-order-xiii-a.html
```

should include this metadata:

```text
Parties / Case Title: Reliance Eminent Trading and Commercial Private Limited v. Delhi Development Authority
Case Number: Civil Appeal arising out of Special Leave Petition (C) No. 22100 of 2025
Citation / Neutral Citation: 2026 INSC 436
Judgment Date: 29 April 2026
Court: Supreme Court of India
Bench / Coram: J.K. Maheshwari, J. and Atul S. Chandurkar, J.
Authoring Judge: J.K. Maheshwari, J.
Subject / Legal Area: Order XIII-A CPC; summary judgment in commercial suits
Primary Source: Supreme Court of India judgment PDF
```

## Maintenance Note

Future agents should update `ARTICLE_HTML_TEMPLATE.md` and `ARTICLE_PUBLISHING_WORKFLOW.md` to reference this standard when editing those larger documents through Codex or a manual patch.
