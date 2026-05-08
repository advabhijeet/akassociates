# Chambers of AK Website Master Plan

Last updated: 2026-05-08

This document is the primary working source of truth for the Chambers of AK website repository.

Use it before making website, content, SEO, documentation, or Codex-related changes.

## 1. Project Identity

Website:

```text
https://chambersofak.in
```

Repository:

```text
advabhijeet/akassociates
```

Branch:

```text
main
```

Local working path used by the user:

```text
C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can
```

## 2. Brand Direction

Chambers of AK is a premium boutique legal brand.

Brand rules:

```text
black / white palette
gold accent
modern but subtle
professional legal-publication feel
non-solicitation oriented
suitable for an advocate website in India
```

Visual identity:

```text
AK monogram
white/black mark depending on background
gold diagonal K-stroke accent
wide tracking for firm name
serif headings
clean sans-serif body copy
```

Core palette:

```text
#000000
#111111
#FFFFFF
#D4AF37
```

## 3. Public Website File Rules

Do not move public website files unless explicitly instructed.

The following public files/folders should remain accessible and stable:

```text
index.html
about.html
practice.html
case-enquiry.html
legal-updates.html
contact.html
courts.html
document-checklists.html
faq.html
process.html
disclaimer.html
privacy-policy.html
terms.html
assets/
practice/
services/
updates/
sitemap.xml
robots.txt
ads.txt
CNAME
favicon files
site.webmanifest
```

## 4. Non-Solicitation Rule

All website content must preserve informational and non-solicitation language.

Do not use language that sounds like:

```text
guaranteed result
best lawyer
hire us immediately
we will win your case
aggressive solicitation
```

Preferred language:

```text
general information
structured first review
document-first assessment
subject to facts and applicable law
no advocate-client relationship until formal engagement
```

## 5. Current Website Positioning

Current homepage positioning:

```text
firm-focused, not founder-focused
no founder portrait in homepage hero
premium firm identity
practice-area and document-first positioning
```

About page positioning:

```text
firm/team-focused
individual detailed profiles reserved for future Team page
```

Practice page positioning:

```text
main Expertise & Practice Areas page
expanded with CV-based expertise
```

Future Team page:

```text
planned but not yet created
should not be created until team-member details are ready and approved
```

## 6. Practice / Expertise Areas

Core website expertise areas include:

```text
civil litigation
property and civil suits
real estate due diligence
title search
property title verification
commercial recovery
commercial suits
contracts and documentation
cheque bounce / NI Act
MSME delayed payment disputes
RERA / builder disputes
arbitration
DRT
SARFAESI
banking recovery
NHAI-linked land acquisition/reimbursement disputes
lease agreements
settlement deeds
wills and powers of attorney
trademark / IP advisory
```

## 7. Current Article / Insights Direction

The Insights section should evolve into a legal-publication style section.

Do not treat all content as one undifferentiated “Legal Updates” list.

Recommended editorial groups:

```text
Latest Articles
Case Briefs
Legal Updates
Practical Guides
Document Checklists
Procedure Notes
Practice-Area Updates
```

## 8. Article Categories

### Case Brief

Use for judgment/order based articles.

Required sections:

```text
Case Brief category label
short headline/deck
Quick Takeaways
Case Metadata
Background In Brief
Issue Before The Court
Court's View
Why It Matters
Practical Note / Caution
Official Judgment / Download Judgment button
Related Internal Pages
Non-solicitation note
```

Judgment PDFs should be stored under:

```text
assets/judgments/
```

Every judgment-based article should include a visible Download Judgment button where the judgment/source PDF is available.

### Legal Update

Use for current law, notification, rule, circular, government/regulator/court development.

Required:

```text
source/date clarity
legal status clarity: proposed/final/notified/stayed/appealed/etc.
practical implications
internal links
non-solicitation note
```

### Practical Guide

Use for process-oriented explainers.

Examples:

```text
cheque bounce defence after summons
commercial recovery before suit
arbitration notice before claim
```

### Document Checklist

Use for document-preparation articles.

Examples:

```text
commercial suit documents checklist
property injunction suit documents
SARFAESI auction sale document checklist
```

### Procedure Note

Use for forum/court/procedural explainers.

Examples:

```text
MSME Facilitation Council process
Section 34 arbitration challenge process
DRT/SARFAESI procedure notes
```

## 9. Current Published Judgment-Based Articles

### Order XIII-A CPC / Commercial Summary Judgment

Article:

```text
updates/summary-judgment-commercial-suits-order-xiii-a.html
```

Judgment:

```text
Reliance Eminent Trading and Commercial Private Limited v. Delhi Development Authority
2026 INSC 436
Supreme Court of India
Judgment dated 29 April 2026
```

Status:

```text
primary source verified
article published
live checks completed
indexing requested
```

### SARFAESI Auction Sale Challenge

Article:

```text
updates/sarfaesi-auction-sale-challenge-documents.html
```

Judgment PDF:

```text
assets/judgments/2026-insc-303-sarfaesi-auction-sale.pdf
```

Judgment:

```text
E. Muthurathinasabathy & Ors. v. M/s. Sri International & Ors.
2026 INSC 303
Supreme Court of India
Judgment dated 1 April 2026
```

Status:

```text
article published
Download Judgment CTA working
Insights card working
sitemap/feed integrated
live checks completed
indexing requested
```

### Non-Reportable Judgments Online Publication

Article:

```text
updates/non-reportable-judgments-online-publication-case-brief.html
```

Judgment PDF:

```text
assets/judgments/2017-gujhc-1698-non-reportable-judgments-online-publication.pdf
```

Judgment:

```text
Dharamraj Bhanushankar Dave v. State of Gujarat & others
Special Civil Application No. 1854 of 2015
Gujarat High Court
Order dated 19 January 2017
Coram: R.M. Chhaya, J.
Neutral citation: 2017:GUJHC:1698
```

Status:

```text
first Case Brief published
Download Judgment CTA working
Insights card working
sitemap/feed integrated
live checks completed
indexing requested
```

## 10. Insights Restructure Plan

The current plan is to improve the Insights page in phases.

### Phase 1 - Visual/Layout Upgrade

Do first:

```text
improve tag CSS
make Case Brief labels visually polished
split Insights page into separate blocks
keep existing article URLs unchanged
validate internal links/XML/JSON-LD
```

Target files:

```text
assets/css/style.css
legal-updates.html
```

### Phase 2 - Category Inventory

Create an inventory of all existing articles with:

```text
Current URL
Current tag
Recommended category
Recommended future folder
Needs judgment PDF
Has Download Judgment button
Internal links checked
Sitemap/feed checked
Migration priority
```

### Phase 3 - Future Folder Rules

For future articles, consider category folders:

```text
updates/case-briefs/
updates/legal-updates/
updates/practical-guides/
updates/document-checklists/
updates/procedure-notes/
```

### Phase 4 - Legacy Migration

Do not move already-indexed existing articles without redirect/canonical planning.

Preferred current position:

```text
Keep existing live article URLs under updates/ for now.
Organize visually on Insights page.
Use category folders only for future articles after approval.
```

## 11. Manual Patch Workflow

When changes are large or involve multiple shared files, prefer a downloadable ZIP/manual patch workflow.

User preference:

```text
Ask whether update should be manual or through Codex/GitHub.
If manual, provide one-command PowerShell executable.
If Codex, update Codex/Handoff instructions.
```

Manual patch should:

```text
extract ZIP from Downloads
apply changes safely
create backups
run validation
commit only intended files
push to origin main
ignore .wiki-clone/ and .wiki-work/
```

Standard local path:

```text
C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can
```

## 12. Validation Workflow

After meaningful changes, run:

```powershell
node --check assets\js\script.js
git diff --check
[xml](Get-Content sitemap.xml -Raw)
[xml](Get-Content feed.xml -Raw)
```

Also run:

```text
JSON-LD parsing check
internal href/src reference check
mobile drawer check
footer legal link check
CTA check: WhatsApp, email, phone, case enquiry
live check after push
Search Console indexing request where applicable
```

## 13. Search Console Workflow

For new public articles/pages:

```text
open live URL
confirm article/page loads
confirm mobile view
confirm relevant CTA works
confirm sitemap/feed if applicable
request indexing in Search Console
```

Current known Search Console issue:

```text
Homepage duplicate canonical issue where Google previously selected the GitHub Pages URL.
```

Fix already applied:

```text
GitHub Pages duplicate redirects to chambersofak.in
Search Console validation started
wait for Google reprocessing
```

Do not repeatedly change homepage while validation is pending unless Search Console reports failure.

## 14. Favicon / Logo Rules

Current favicon source asset:

```text
assets/img/brand-favicon-current.png
```

Correct favicon style:

```text
black background
white AK monogram
gold K-stroke accent
```

Current favicon files:

```text
favicon.ico
favicon-32.png
favicon-48.png
favicon-96.png
assets/img/favicon.png
assets/img/apple-touch-icon.png
site.webmanifest
```

Google favicon refresh may take days or weeks after reindexing.

## 15. Legal Monitoring Workflow

Legal monitoring should use:

```text
primary/official sources where possible
secondary legal news only for discovery
original Chambers of AK drafting
no copying or close paraphrasing
source verification before publication
```

Source categories:

```text
Courts and judgments
Government / Gazette / statutory sources
Regulators and sectoral sources
State and local sources
Secondary legal news discovery sources
General news discovery sources
```

Monitoring output should record:

```text
source name
source URL
source type
source priority
date published/discovered
jurisdiction
practice tags
primary-source status
legal status
relevance score
recommended action
article angle
originality caution
```

## 16. Social Distribution / Newsletter Goal

Future feature planned:

```text
When an article is uploaded in Insights, notification/distribution should go to social media platforms / newsletter-style channels.
```

Current practical approach:

```text
prepare LinkedIn Page post
prepare WhatsApp Channel post
prepare newsletter/email draft
manual publishing unless automation is later built
```

Future automation may include:

```text
RSS-based notification
manual approval queue
LinkedIn/WhatsApp/email distribution workflow
legal source monitoring queue
```

## 17. Pending / Next Recommended Tasks

Immediate next task:

```text
Prepare manual patch for Insights visual/category restructure:
- assets/css/style.css
- legal-updates.html
```

Patch goals:

```text
improve all tag/label CSS
add Case Briefs block
keep Latest Articles block
possibly add Practical Guides / Checklists block
keep existing URLs unchanged
validate links/XML/JSON-LD
```

Next content candidates:

```text
Arbitration Section 16 jurisdiction objection case brief/article
SARFAESI/DRT service page cluster
MSME Facilitation Council process article
more Case Briefs after source PDFs are available
```

## 18. Documentation Consolidation Plan

The repository currently contains many planning/status documents because rapid updates were recorded separately.

Going forward:

```text
Use this master plan as the primary source of truth.
Keep old docs as history/reference.
Later archive old status/planning notes under docs/archive/ if approved.
```

Suggested future structure:

```text
docs/
  CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md
  README.md
  codex/
  maintenance/
  planning/
  archive/
```

Do not delete old documentation yet.

## 19. Codex Handoff Rule

When Codex is available, instruct it to:

```text
sync local storage with origin/main first
respect public file locations
read this master plan before changes
avoid moving live URLs without approval
update CHANGELOG/status only when meaningful
run validation before proposing push
ignore .wiki-clone/ and .wiki-work/ unless working on wiki specifically
```

## 20. Change Discipline

Before every major update:

```text
confirm scope
identify public files affected
avoid unnecessary movement
preserve brand system
preserve non-solicitation language
run validation
live-check after deployment
record status if meaningful
```
