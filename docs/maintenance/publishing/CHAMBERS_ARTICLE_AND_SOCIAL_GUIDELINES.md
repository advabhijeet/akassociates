# Chambers of AK — Article, Thumbnail and Social Publishing Guidelines

Last reconciled: **13 July 2026**

This document records the current standing rules for legal articles, featured images, social metadata, distribution copy and controlled publication packages.

Related files:

```text
docs/maintenance/publishing/ARTICLE_HTML_TEMPLATE.md
docs/maintenance/publishing/ARTICLE_PUBLISHING_WORKFLOW.md
docs/maintenance/publishing/ARTICLE_REUSABLE_MODULES.md
assets/data/insights-registry.json
```

## 1. Article standard

Every article should include:

- unique SEO title and meta description;
- stable slug and self-canonical URL;
- accurate H1/H2/H3 hierarchy;
- concise article summary;
- visible last-reviewed or last-updated date;
- topic-specific featured image;
- References / Sources section;
- informational disclaimer;
- useful contextual internal links;
- BlogPosting and Breadcrumb structured data;
- sitemap, RSS and registry entries;
- synchronized Homepage and Legal Insights snapshots.

A clock time is not mandatory in the visible update line unless operationally useful. The date must be clear and truthful.

## 2. Public/internal boundary

Do not expose:

- research-status or workflow-status boxes;
- source-pack notes;
- thumbnail-generation instructions;
- internal approval notes;
- repository paths or patch instructions;
- unsupported claims about outcomes.

One restrained end-of-article informational enquiry block is permitted. Repeated, intrusive or promotional CTA blocks are not.

## 3. Source and legal-accuracy rule

- Prefer official statutes, rules, judgments, orders and authority websites.
- Do not invent case numbers, benches, paragraph numbers, quotes or holdings.
- Distinguish reported developments from signed judgments/orders.
- Use cautious language where the legal or factual position is unsettled.
- Review time-sensitive legal articles when statutes, rules or case law change.
- Legal accuracy takes precedence over keyword density or publishing frequency.

## 4. Metadata parity

For every registered article, these must identify the same approved article image:

```text
registry thumbnail
og:image
twitter:image
BlogPosting.image
```

Required social dimensions:

```text
1200 x 675
```

Use raster output for social cards:

```text
PNG
JPEG
WebP
```

Do not use SVG as an Open Graph or Twitter article image.

## 5. Permanent thumbnail branding rule

Article thumbnails must not contain:

```text
Chambers of AK logo
AK monogram
firm name
company branding block
watermark
signature
```

Brand identity belongs to the website shell and social account, not inside the editorial artwork.

## 6. Thumbnail visual standard

Use:

- topic-specific painted/editorial legal scenes;
- restrained ivory, black, navy, gold, grey and muted-red palettes where suitable;
- clear foreground documents, court/forum context or transaction-specific objects;
- central safe-area composition;
- readable detail at card size;
- 1200 x 675 raster output.

Avoid:

- generic flat-vector icons;
- random gavels, handshakes or scales unrelated to the subject;
- copied news artwork;
- identifiable judges or private persons;
- sensational imagery;
- Canva-style poster/checklist layouts;
- heavy text strips;
- unnecessary embedded headlines.

Embedded title text is exceptional and must be specifically approved. The default is artwork without a large headline overlay.

## 7. Encoding and punctuation

Metadata, registry excerpts and structured-data descriptions should use stable UTF-8 and conservative punctuation.

Run:

```powershell
node tools/validate-article-encoding.js
node tools/validate-documentation.js
```

Do not permit mojibake, replacement characters or hidden control characters.

## 8. Publication package standard

A controlled package should:

1. require the expected starting commit;
2. refuse a dirty or unexpected working tree;
3. edit only a declared file set;
4. validate before staging;
5. inspect staged files;
6. commit and push only after successful validation;
7. wait for GitHub Actions and Pages;
8. perform an appropriate live check;
9. use `${Variable}` when PowerShell text immediately follows a variable name.

Avoid broad `git add -A` unless preflight guarantees a clean tree and the post-patch allowed-file set is verified.

## 9. Required publication checks

```powershell
node tools/validate-article-encoding.js
node tools/validate-insights-registry.js --strict
node tools/sync-static-insight-cards.js --check
node tools/audit-articles-structure.js --strict
node tools/validate-seo-sitewide.js
node tools/validate-deployment-boundary.js
node tools/validate-documentation.js
git diff --check
```

## 10. Social distribution

Prepare platform-specific copy for the active channels when publication distribution is requested.

Every post should remain informational and include an appropriate non-solicitation/legal-information qualifier. Avoid promises, urgency tactics and outcome claims.

## 11. Maintenance

When these rules change:

1. update this document;
2. update the article template/workflow where implementation changes;
3. update validators where the rule is machine-checkable;
4. update `CHANGELOG.md`;
5. apply the new rule to future articles and to existing articles only through a controlled migration.
