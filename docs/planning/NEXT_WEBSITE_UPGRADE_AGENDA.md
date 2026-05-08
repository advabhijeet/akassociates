# Next Website Upgrade Agenda

Last synced: 2026-05-09

This document records the next planned upgrade sequence for the Chambers of AK website. It is intended for ChatGPT, Codex and future maintainers so that website improvements remain ordered, documented and consistent with the firm's professional positioning.

## Current Stable Checkpoint

Accepted checkpoint:

```text
ef11809 Strengthen trust and forum guidance
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
```

Current public-flow status:

```text
Homepage -> Practice / Enquiry / Courts / Insights
Practice -> Practice pages / Related insights / Enquiry
Insights -> Filtered articles / Paginated results
Enquiry -> Copy templates / Contact options
Footer -> FAQ / Process / Policies / Contact
```

## Immediate Next Plan Of Action

### Phase A - Live Stability Review

Review the major public routes on desktop and mobile:

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

### Phase B - Footer + Internal-Link Polish Pass

Goal:

```text
Make supporting pages easier to discover without overloading the top navigation.
```

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

### Phase C - Contact Page Improvement

Review and strengthen `contact.html` after footer/internal-link polish.

Contact page should clearly show:

```text
WhatsApp
Email
Phone
Office/base location
Working regions
No advocate-client relationship from initial communication
Link to case enquiry before sending detailed facts
```

### Phase D - Search Console Follow-Up

After recrawl:

```text
Check Breadcrumb enhancement.
Check indexed / not indexed pages.
Inspect recently changed hub pages.
Submit sitemap again only if useful.
Request indexing for meaningful changed hub pages.
```

### Phase E - Future Content Expansion

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
- Reserve `.wiki-clone/` and `.wiki-work/` for Codex/local wiki continuation; do not commit those folders.

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