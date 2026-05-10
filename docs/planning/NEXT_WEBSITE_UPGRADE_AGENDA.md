# Next Website Upgrade Agenda

Last synced: 2026-05-10

This document records the next planned upgrade sequence for the Chambers of AK website. It is intended for ChatGPT, Codex and future maintainers so that website improvements remain ordered, documented and consistent with the firm's professional positioning.

## Current Stable Checkpoint

Accepted checkpoint:

```text
fe6837f Record Insights pill live validation
```

Recently completed:

```text
Homepage duplicate Insights issue fixed.
Insights page filters, list layout, natural browser scroll and pagination accepted.
Practice hub strengthened.
Case Enquiry copy templates added and verified.
Technical SEO freshness pass completed.
Sitewide BreadcrumbList JSON-LD added and live inspection completed.
Trust / Entity pages strengthened.
ads.txt confirmed working.
Contact form upgraded with direct EmailJS Send Enquiry and WhatsApp/Gmail/copy fallbacks.
Contact cleanup deployed and live Contact stability check completed.
Insights category/tag polish deployed and live Insights stability check completed.
Homepage latest-insights freshness patch deployed and live homepage checks completed.
AdSense rejection email reviewed; public legal pages and article-only ads plan updated.
AdSense readiness content Batch 1 strengthened four thin public pages.
```

Current public-flow status:

```text
Homepage -> Practice / Enquiry / Courts / feed-backed Latest Insights
Practice -> Practice pages / Related insights / Enquiry
Insights -> Category blocks / Clickable tags / Filtered paginated results
Enquiry -> Copy templates / Contact options
Footer -> FAQ / Process / Policies / Contact
```

## Immediate Next Plan Of Action

### Phase A - Homepage Latest Insights Freshness

Status: Complete in `4becd72 Refresh homepage latest insights`.

Patch scope:

```text
index.html
assets/js/script.js
CHANGELOG.md and planning docs
```

Scope:

```text
Bump homepage CSS/JS cache strings.
Load homepage Latest Legal Insights from feed.xml with cache-busting/no-store behaviour.
Preserve static fallback cards for SEO and no-JS.
Use shared registry metadata to keep article-type badges and topic tags polished.
Improve homepage latest-card layout so the first card is not oversized.
Validate `/` and `/index.html` locally and live.
```

### Phase B - AdSense Readiness And Article-Only Ads Plan

Status: Next active workstream after legal/documentation sync.

Scope:

```text
Treat AdSense as an onboarding/account approval issue unless a more specific dashboard reason becomes available.
Strengthen thin public pages and short legacy articles before resubmission; Batch 1 covered MSME delayed payment, Bihar RERA complaint, property injunction documents and document-checklists.
If required, add official AdSense site connection code without enabling aggressive sitewide ads.
Keep future visible ads limited to article-style pages only.
Avoid ads on homepage, enquiry/contact, practice/service landing pages and policy/trust pages.
Use subtle manual placements and preserve reading experience.
```

Reference:

```text
docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md
```

### Phase C - Live Stability Review

Next: review the major public routes on desktop and mobile after the homepage patch:

```text
/
practice.html
legal-updates.html
case-enquiry.html
courts.html
faq.html
process.html
contact.html
```

Check for:

```text
spacing
mobile readability
duplicate content
broken card layout
footer consistency
CTA behaviour
unexpected internal scroll
```

### Phase D - Footer + Internal-Link Polish Pass

Preferred footer grouping:

```text
Main:
About
Practice
Case Enquiry
Contact

Resources:
Insights
Document Checklists
FAQ
Process

Legal:
Disclaimer
Privacy Policy
Terms
```

Suggested contextual links:

```text
FAQ -> Process / Enquiry / Document Checklists
Process -> Practice / Enquiry / Contact
Courts -> Practice / Case Enquiry / Document Checklists
Contact -> Case Enquiry / WhatsApp / Email
```

### Phase E - Contact Page Status

Status: Direct send integration is complete. Contact cleanup aligned page copy, status-message behaviour and documentation with the EmailJS flow. Post-deployment Contact live check passed after the `0b39ee3` deployment.

Contact page should clearly show:

```text
WhatsApp
Email
Phone
Office/base location
Working regions
No advocate-client relationship from initial communication
Link to case enquiry before sending detailed facts
Direct Send Enquiry with WhatsApp, Gmail and copy fallback routes
```

### Phase F - Search Console Follow-Up

After recrawl:

```text
Check Breadcrumb enhancement.
Check indexed / not indexed pages.
Inspect recently changed hub pages.
Submit sitemap again only if useful.
Request indexing for meaningful changed hub pages.
```

### Phase G - Future Content Expansion

Only after stability:

```text
Add 1-2 high-quality legal insights.
Add supporting service pages only if genuinely useful.
Avoid thin SEO pages.
Preserve non-solicitation language.
```

## Operating Principles

- Preserve the premium black/white/gold Chambers of AK brand system.
- Preserve informational and non-solicitation language suitable for an advocate website in India.
- Keep the homepage firm-focused.
- Do not add `team.html` until team-member details are ready and approved.
- Keep public website files in their current public locations.
- Update `CHANGELOG.md` after every meaningful modification.
- Do not recreate `.wiki-clone/` or `.wiki-work/` unless working on the GitHub Wiki specifically; if they appear locally, do not commit them.

## Long-Term Backlog

### Article / Insights Expansion

Future article work should remain quality-led and document-led.

Possible future topics:

```text
property title search / due diligence
DRT and SARFAESI practical guides
commercial contract drafting / review
trademark and IP advisory explainers
fresh judgment-based case briefs with source PDFs
```

Rules:

```text
Do not create thin SEO pages.
Do not move already-indexed article URLs without redirect/canonical planning.
Update sitemap/feed/Insights cards for new articles.
Prepare social distribution copy only after article publication.
Keep future ad placements article-only and subtle.
```

### Future Service Pages

Create only after Search Console data and user approval:

```text
services/property-title-search-bihar.html
services/real-estate-due-diligence-bihar.html
services/drt-lawyer-patna.html
services/sarfaesi-lawyer-bihar.html
services/commercial-contract-lawyer-patna.html
services/trademark-lawyer-patna.html
```

### Future Team Page

Do not create `team.html` yet.

Create it only after team-member details are ready and approved:

```text
name
designation
enrollment details
education
practice focus
photo permission
profile text
profile/social link, if any
```

Do not add Team to navigation, footer or sitemap before approval.

## Documentation Rule

Before any new website feature patch:

```text
Check docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md.
Check this upgrade agenda.
Confirm current stable checkpoint.
Update CHANGELOG.md after meaningful modifications.
```
