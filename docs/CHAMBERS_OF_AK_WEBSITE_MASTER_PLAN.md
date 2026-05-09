# Chambers of AK Website Master Plan

Last updated: 2026-05-09

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
main Expertise & Practice Areas hub
document-first practice readiness content added
related Insights links by practice cluster added
structured enquiry-preparation section added
six individual practice pages remain under practice/ and follow document-led patterns
```

Future Team page:

```text
planned but not yet created
should not be created until team-member details are ready and approved
```


## Current Stable Checkpoint - 2026-05-09

Current repository checkpoint:

```text
5b97717 Correct EmailJS template ID
```

Current verified website state:

```text
Homepage structure stable
Insights page filters, pagination, list layout and default 3-card block previews stable
Practice hub strengthened
Six individual practice pages already follow document-led pattern
Case Enquiry page includes matter-specific copy templates
Technical SEO freshness pass completed
Sitewide BreadcrumbList JSON-LD added
Trust / Entity pages strengthened
ads.txt confirmed working at root /ads.txt
Search Console live inspection completed after breadcrumb pass
Contact page includes direct EmailJS Send Enquiry with WhatsApp, Gmail and copy fallbacks
```

Recent accepted commits:

```text
ebb1aad Fix homepage insights structure
8374976 Fix insights filters and latest pagination
6131096 Refine insights filter results layout
f61b326 Limit insights default blocks and add section pagination
193a8c6 Strengthen practice hub content
4aecf5e Add case enquiry copy templates
3f7ed57 Add sitewide breadcrumb structured data
ef11809 Strengthen trust and forum guidance
3bc5199 Add dynamic contact enquiry form UI
d586d02 Route contact Gmail through account chooser
8f61c47 Prefill contact enquiry share links
7444a89 Connect contact form to EmailJS
5b97717 Correct EmailJS template ID
```

Current next plan:

```text
1. Contact page cleanup and documentation sync.
2. Live stability review of major public routes.
3. Search Console follow-up for breadcrumbs, coverage and changed hub pages.
4. Future content or Insights feature work only after stability, avoiding thin SEO pages.
```

Documentation rule:

```text
Before the next feature patch, confirm this master plan and docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md are synced with the latest accepted checkpoint.
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

Do not treat all content as one undifferentiated ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“Legal UpdatesÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â list.

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


Current Insights implementation status:

```text
Homepage now has exactly one Latest Legal Insights block.
Case Enquiry appears below homepage Latest Legal Insights.
Insights page default/no-filter mode keeps grouped editorial blocks visible.
Each grouped block shows a 3-card preview by default.
Filter/search/category/tag modes show Matching Insights in paginated list format.
Matching Insights uses natural browser scroll, not internal scroll.
Cards use list-style layout on Insights page to avoid grid gaps.
View All Latest Articles / section pagination behaviour is accepted as stable.
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


## Local Workflow / Git Identity Status - 2026-05-09

Manual patch workflow current standard:

```text
Use PowerShell 7.
Patch ZIP is downloaded to the user's default Downloads folder.
One command extracts ZIP to a temp folder and runs the patch script.
Patch scripts set repo-local Git identity before committing.
Patch scripts preserve .wiki-clone/ and .wiki-work/.
Patch scripts avoid force-push by default.
```

Repository Git identity:

```powershell
git config user.name "advabhijeet"
git config user.email "281193757+advabhijeet@users.noreply.github.com"
git config --global credential.https://github.com.useHttpPath true
```

Preferred GitHub account:

```text
advabhijeet
```

Safe non-fast-forward recovery:

```powershell
git fetch origin
git reset --soft origin/main
git status -sb
git diff --cached --stat
git commit -m "<clear forward-fix message>"
git push origin main
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


## Technical SEO / Indexing Status - 2026-05-09

Current SEO state:

```text
robots.txt allows crawling and references sitemap/feed.
ads.txt exists at root and is confirmed working.
sitemap.xml parses successfully.
feed.xml parses successfully.
JSON-LD validation passes across public HTML files.
Sitewide BreadcrumbList JSON-LD added to meaningful public pages.
Search Console live inspection completed after breadcrumb pass.
FAQ rich-result display should not be chased; breadcrumbs are the preferred enhancement focus.
```

Search Console follow-up:

```text
Monitor Breadcrumb enhancement detection.
Inspect recently changed hub pages after recrawl.
Re-submit sitemap if required.
Request indexing only for meaningful updated public pages.
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
Commit/deploy the Contact cleanup, run the post-deployment Contact live check, then proceed to the next approved feature/content patch.
```

Next feature candidate after validation:

```text
Prepare manual patch for Insights visual/category restructure:
- assets/css/style.css
- legal-updates.html
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

## Insights Tag And Print Rules

The Insights page must support both visual category browsing and tag-based filtering.

Rules:

```text
Every article card should have a visible `.update-tag`.
Tags should use a specific class wherever possible, such as:
- tag-case-brief
- tag-guide
- tag-checklist
- tag-procedure
- tag-ni
- tag-msme
- tag-rera
- tag-commercial
- tag-arbitration
- tag-property
- tag-sarfaesi
```

The Insights page should include a Browse By Tag / Filter Insights panel.

Clicking a tag badge inside an article card should filter the page to show all matching articles under that tag.

Print/PDF export must be stabilized:

```text
Fixed navigation must become static in print.
The mobile drawer/menu must not print.
Cards should avoid breaking across pages.
The header should not overlap content on later pages.
Backgrounds should be simplified for professional PDF output.
```

## Advanced Insights Sorting Rule

The Insights page should use three controls:

```text
Sort by category
Under tags
Search insights
```

Category means article type:

```text
Case Brief
Legal Update
Practical Guide
Checklist
Procedure Note
```

Tags mean the law, forum, statute or topic covered:

```text
NI Act
MSME
RERA
Arbitration
SARFAESI
DRT
Commercial Courts
CPC
Property
Supreme Court
High Court
Online Publication
Judgment Reporting
```

Rules:

```text
One article may have one primary category and multiple legal tags.
Latest Articles should show only one row in default view.
When filter/search is active, hide Latest Articles and category blocks.
Filtered results should appear as a vertical latest-first list.
Clear Filter should restore the default editorial view.
```

## Advanced Insights Dependent Filtering Rule

The Insights sorting module should support dependent filtering.

Rules:

```text
If a user selects a category, the tag input should suggest only tags available under that category.
If a user selects a tag, the category input should suggest only categories that contain that tag.
Users must be able to change category, tag or search directly without pressing Clear Filter first.
Clear Filter should only be required to reset the page to the default editorial view.
Filtered results should be shown in a vertical list with internal scrolling so long result sets do not make the page look awkward.
The visible result panel should show about five items at a time on desktop, with internal scrolling for additional results.
Mobile view must remain stacked, readable and free from horizontal overflow.
```

## Advanced Insights Free-Switching Filter Rule

The Insights filter module must allow direct switching without forcing the user to press Clear Filter.

Rules:

```text
If category is active and the user selects/types a tag outside that category, automatically clear category and apply the new tag.
If tag is active and the user selects/types a category outside that tag, automatically clear tag and apply the new category.
If category and tag are compatible, keep both active.
Search should refine the active category/tag but should not prevent direct switching.
Clear Filter should reset the page only when the user wants to return to the default editorial view.
```

## Homepage Latest Insights Rule

The homepage Latest Legal Insights strip should not be manually stale.

Rule:

```text
The homepage should keep a static fallback of the latest three insight cards for SEO/no-JS.
The homepage JavaScript should then load `feed.xml` and replace the fallback cards with the newest feed items.
`feed.xml` remains the source of truth for homepage latest insights.
Whenever a new article is published, update `feed.xml`; the homepage will then pull the newest items automatically.
```

Validation:

```text
Check homepage latest strip after every article publication.
Check that cards open correctly.
Check that homepage still shows fallback cards if JavaScript/feed loading fails.
```

## Homepage Cache-Busting Rule

When homepage-visible content or homepage JavaScript changes, update cache-busting query strings.

Rules:

```text
Bump homepage CSS version if homepage styling changes.
Bump homepage JS version if homepage feed/loading behavior changes.
Keep homepage static fallback cards synced with the latest three feed items.
Use the feed loader as enhancement, not as the only source of latest cards.
```

Example:

```html
<link rel="stylesheet" href="assets/css/style.css?v=legal-4">
<script src="assets/js/script.js?v=homefeed-2"></script>
```

If the homepage still shows older insight cards after deployment:

```text
Open the homepage with a temporary query string, e.g. /?v=cache-test.
Hard refresh browser cache.
Verify index.html and script.js versions on GitHub.
```


## Insights Card And Article Footer Standard

All insight cards should use one standard structure across homepage, default Insights blocks and filtered results:

```text
Primary Category Badge
Title
Excerpt
Date
Tags
```

Rules:

```text
Category is the article type.
Tags are legal subjects, statutes, forums or topic labels.
Homepage cards, Insights default cards and filtered results must show visible tags.
Filtered result cards should use the same visible structure as standard cards.
Article pages should show tags at the bottom.
Article tags should link back to the Insights page filtered by that tag.
Article pages should include Previous Article / Next Article buttons where available.
Article pages should include a Recommended Reads block.
```


## Homepage And Insights List Standard

Rules:

```text
Homepage must have only one Latest Legal Insights section.
Case Enquiry should appear after the homepage Latest Legal Insights section.
Homepage Latest Legal Insights should use the standard tagged card structure.
Insights page Latest Articles should show one row by default.
A View All Latest Articles button should activate latest-list mode.
Latest-list mode should show all articles latest-first in a paginated result list.
Each page should show no more than 10 articles.
Category/tag/search filters should use the same paginated result list structure.
```


## Homepage Structure Rule

Rules:

```text
Homepage must have exactly one Latest Legal Insights section.
Homepage Latest Legal Insights must appear before Case Enquiry.
Case Enquiry must appear near the bottom, after Latest Legal Insights.
Homepage cards must use the standard tagged card style.
When homepage structure changes, bump homepage CSS/JS cache query strings.
```
