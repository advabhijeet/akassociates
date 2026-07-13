# Feed Foundation Status

Date: 2026-05-07

This note records the creation of the first RSS feed foundation for Chambers of AK legal insights.

## Completed

Created:

- `feed.xml`

Commit:

- `d91a2887e988cb9c80802797f427a88b70100955` - Add RSS feed for legal insights.

## Purpose

The feed is intended to support a controlled Insights distribution workflow for future articles, including:

- article discovery;
- future newsletter workflow;
- future social publishing checklist;
- repeatable article-publication process;
- better structure around legal updates.

## Initial Feed Coverage

The initial feed includes recent/current legal insight URLs, including:

- `updates/msme-facilitation-council-process.html`
- `updates/cheque-bounce-defence-after-summons.html`
- `updates/section-34-arbitration-award-challenge.html`
- MSME delayed-payment/checklist articles;
- cheque-bounce limitation/notice articles;
- commercial recovery articles;
- arbitration articles;
- property/RERA articles.

## Pending Integration

Recommended next steps:

1. Add `feed.xml` to `sitemap.xml` if desired.
2. Add feed discovery link to important public HTML heads, ideally:
   - `index.html`
   - `legal-updates.html`
3. Add `feed.xml` reference to `robots.txt` if useful.
4. Run XML validation on `feed.xml`.
5. Add `feed.xml` to the standard new-article workflow.
6. Update `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md` or related workflow docs if a future manual patch is used.

## Future Article Publishing Checklist

For each new article:

- create the article page under `updates/`;
- add article card to `legal-updates.html`;
- add article link to relevant practice/service pages;
- add article URL to `sitemap.xml`;
- add article item to `feed.xml`;
- prepare LinkedIn Page draft;
- prepare WhatsApp Channel draft;
- prepare newsletter/email draft if newsletter workflow is active;
- request indexing in Google Search Console;
- record status in planning/changelog documentation.

## Notes

This is a foundation step only. It does not automate posting to LinkedIn, WhatsApp Channel or email. Those should be added later using compliant, account-approved methods.
