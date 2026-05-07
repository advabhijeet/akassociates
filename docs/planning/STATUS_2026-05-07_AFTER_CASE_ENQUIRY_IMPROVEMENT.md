# Status After Case Enquiry Flow Improvement

Date: 2026-05-07

This note records the Case Enquiry page improvement completed after the practice-page strengthening, legal-insight article work, manual patch workflow and Google Search Console indexing steps.

## Completed

Updated:

- `case-enquiry.html`

Commit:

- `05ddb04a01476f50a477d15695493223ea92f5e6` - Improve case enquiry intake flow.

## Improvements Added

The Case Enquiry page was strengthened with:

- stronger WhatsApp and email enquiry CTAs in the hero section;
- urgency-level section:
  - Immediate;
  - Time-sensitive;
  - General review;
- expanded matter-specific enquiry formats for:
  - cheque bounce / Section 138;
  - MSME recovery;
  - RERA / builder dispute;
  - arbitration;
  - commercial recovery;
  - property / civil suit;
- document checklist by matter type;
- copy-ready first-message format;
- stronger confidentiality and no advocate-client relationship warning;
- updated FAQ JSON-LD.

## Sitemap Follow-Up

This manual patch updates:

```xml
<url><loc>https://chambersofak.in/case-enquiry.html</loc><lastmod>2026-05-07</lastmod></url>
```

## Validation To Run

```powershell
node --check assets\js\script.js
git diff --check
[xml](Get-Content sitemap.xml -Raw)
```

Also run:

- JSON-LD parsing across public HTML files;
- internal href/src reference check;
- browser/mobile smoke test for `case-enquiry.html`;
- WhatsApp and email CTA test.

## Remaining Notes

Preserve local Codex/wiki folders:

```text
.wiki-clone/
.wiki-work/
```

Do not add or commit those folders unless they are inspected and intentionally handled later.
