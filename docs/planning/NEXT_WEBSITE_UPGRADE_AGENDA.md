# Next Website Upgrade Agenda

This document records the next planned upgrade sequence for the Chambers of AK website. It is intended for ChatGPT, Codex and future maintainers so that website improvements remain ordered, documented and consistent with the firm's professional positioning.

## Operating Principles

- Preserve the premium black/white/gold Chambers of AK brand system.
- Preserve informational and non-solicitation language suitable for an advocate website in India.
- Keep the homepage firm-focused.
- Do not add `team.html` until team-member details are ready and approved.
- Keep public website files in their current public locations.
- Update `CHANGELOG.md` after every meaningful modification.
- Reserve `.wiki-clone/` and `.wiki-work/` for Codex/local wiki continuation; do not commit those folders.

## Current Manual Validation Status

Manual validation was completed by the user on 2026-05-07 from the local Codex repository folder:

```text
C:\Users\abhik\Documents\Codex\2026-05-02\https-github-com-advabhijeet-akassociates-can
```

Reported results:

- `git pull origin main`: already up to date.
- `node --check assets\js\script.js`: passed with no output.
- `git diff --check`: passed with no output.
- `sitemap.xml`: parsed successfully.
- JSON-LD parsing: passed; 44 blocks parsed.
- Internal `href`/`src` reference check: passed.
- `.wiki-clone/` and `.wiki-work/` remain untracked and should be preserved for Codex continuation.

Browser/mobile smoke testing and any unfinished GitHub Wiki synchronization should still be completed later through Codex or manual review.

## Phase 1 - Codex / Wiki / Documentation Sync

When Codex becomes available:

1. Sync the local workspace with latest `origin/main`.
2. Inspect `.wiki-clone/` and `.wiki-work/` before deleting, ignoring or modifying them.
3. Determine whether unfinished GitHub Wiki work exists.
4. Compare any wiki work with `docs/wiki/WORKFLOW.md` and the current repository documentation.
5. Complete only the required wiki/documentation sync.
6. Do not commit `.wiki-clone/` or `.wiki-work/`.
7. Update `CHANGELOG.md` if any tracked files are changed.

## Phase 2 - Record And Close Validation Follow-Up

Record the completed manual validation in the relevant maintenance/planning documents, while keeping browser/mobile smoke testing as a separate follow-up if not yet completed.

Relevant files to review when closing this phase:

- `CHANGELOG.md`
- `docs/codex/HANDOFF.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`

## Phase 3 - Live Website Smoke Test And UI Polish

Review the live website and local preview for:

- homepage;
- About page;
- Expertise / Practice page;
- Contact page;
- Case Enquiry page;
- Legal Updates page;
- mobile drawer;
- footer legal links;
- LinkedIn and WhatsApp Channel icons;
- WhatsApp, email, phone and case-enquiry CTAs.

Only fix actual issues discovered during review. Do not use this phase to redesign the website or create new content.

## Phase 4 - Strengthen The Six Practice Pages

Priority pages:

- `practice/cheque-bounce.html`
- `practice/msme-disputes.html`
- `practice/rera-property.html`
- `practice/commercial-recovery.html`
- `practice/arbitration.html`
- `practice/property-civil-suits.html`

Each page should be strengthened with evergreen, document-led sections:

- when the matter usually arises;
- documents to keep ready;
- forum/court route;
- limitation/date sensitivity;
- common mistakes;
- related service pages;
- related legal updates;
- enquiry format;
- informational/non-solicitation note.

## Phase 5 - Add Pending Legal Update Articles

Priority article pages:

- `updates/cheque-bounce-defence-after-summons.html`
- `updates/msme-facilitation-council-process.html`

For each article:

1. Create the article page under `updates/`.
2. Use informational, non-promissory language.
3. Add unique title, meta description, canonical, Open Graph/Twitter metadata and JSON-LD where appropriate.
4. Add an article card to `legal-updates.html`.
5. Add internal links from relevant practice and service pages.
6. Add the URL to `sitemap.xml`.
7. Update `CHANGELOG.md` and `docs/planning/SEO_GROWTH_AGENDA.md`.
8. Prepare social/newsletter distribution copy under Phase 6.

## Phase 6 - Insights Distribution / Newsletter Workflow

Goal: whenever a new Insights article is published under `updates/` and listed on the Insights page, prepare a controlled notification/distribution bundle for official Chambers of AK channels.

Current official channels:

- Firm LinkedIn Page.
- WhatsApp Channel.

First-stage implementation should be manual and compliance-safe. For every new article, prepare:

- LinkedIn Page post draft;
- WhatsApp Channel post draft;
- newsletter/email subject;
- newsletter/email body;
- short social/meta summary;
- informational disclaimer line.

Standard tone rules:

- informational only;
- no direct solicitation;
- no guarantee or outcome language;
- no claims such as "best", "top" or "guaranteed result";
- include: "For general information only. Not legal advice or solicitation."

Later-stage implementation may include:

- `feed.xml` or `updates.xml` for article discovery;
- approved LinkedIn Page scheduling/API workflow;
- WhatsApp Channel posting only through safe, approved and account-compliant methods;
- newsletter subscription only after privacy-policy review.

## Phase 7 - Improve Case Enquiry Flow

Improve the Case Enquiry page after practice pages and article priorities are stable.

Potential upgrades:

- matter-type sections;
- document checklist blocks;
- confidentiality warning before formal engagement;
- clearer WhatsApp/email CTA;
- copyable enquiry format.

Suggested enquiry format:

```text
Matter type:
Location:
Opposite party:
Important dates:
Current stage:
Documents available:
Relief sought:
Urgency:
```

## Phase 8 - Trust / Entity Improvements

Potential upgrades:

- strengthen Courts & Forums page;
- refine working regions section;
- strengthen document-first approach messaging;
- improve FAQ and Process pages;
- polish footer microcopy.

Avoid promotional or comparative claims. Prefer document-led and forum-assessment language.

## Phase 9 - Future Service Pages

Create only after practice pages are strengthened and Search Console data is reviewed:

- `services/property-title-search-bihar.html`
- `services/real-estate-due-diligence-bihar.html`
- `services/drt-lawyer-patna.html`
- `services/sarfaesi-lawyer-bihar.html`
- `services/commercial-contract-lawyer-patna.html`
- `services/trademark-lawyer-patna.html`

## Phase 10 - Future Team Page

Do not create `team.html` yet.

Create it only after team-member details are ready and approved, including:

- name;
- designation;
- enrollment details;
- education;
- practice focus;
- photo permission;
- profile text;
- profile/social link, if any.

Do not add Team to navigation, footer or sitemap before approval.
