# Changelog

## 2026-05-10 00:27 IST - Insights category and tag polish

Files changed:

- `legal-updates.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/planning/INSIGHTS_CATEGORY_RESTRUCTURE_PLAN.md`
- `docs/codex/HANDOFF.md`
- `CHANGELOG.md`

Summary:

- Updated Insights page labels so primary card badges consistently show article type: Case Brief, Legal Update, Practical Guide, Checklist or Procedure Note.
- Kept legal topics in the smaller tag row and added click-to-filter behaviour for category badges and topic tags.
- Added dependent category/tag datalist refresh and direct free-switching between incompatible category/tag choices.
- Added the missing `commercial-suit-documents-checklist.html` item to the shared Insights registry and corrected its page metadata/tags on the Insights hub.
- Fixed the shared Insights category-class normalizer so dynamically rendered Case Brief cards receive the correct `tag-case-brief` styling.
- Polished Insights filter panel, category badges, topic chips and list-card hover states.
- Bumped the Insights page CSS/JS cache strings.
- Updated planning/handoff docs to reflect the current Insights patch and the completed Contact cleanup deployment check.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Insights visible card hrefs and shared JS registry hrefs are aligned.
- Local browser smoke test passed on `legal-updates.html`: category filter, tag filter, free-switching, clickable topic chips and clickable category badges worked without console errors.
- Live post-deployment Insights check remains required after commit/push.

Commits:

- Commit hash to be recorded after commit.

## 2026-05-09 23:27 IST - Contact cleanup and documentation sync

Files changed:

- `contact.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `README.md`
- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/README.md`
- `docs/codex/HANDOFF.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Updated Contact page copy so the dynamic form reflects the current direct EmailJS Send Enquiry flow.
- Kept WhatsApp, Gmail and copy-prepared-message fallbacks intact.
- Routed EmailJS status text to the visible Contact form status area and added status tone styling.
- Bumped the Contact page CSS/JS cache strings.
- Synced README, master plan, Codex handoff, SEO agenda, upgrade agenda, docs index and wiki workflow with the current Contact/EmailJS state.
- Recorded that `.wiki-clone/` and `.wiki-work/` were inspected locally and remain preserved, untracked working folders.
- No EmailJS private key was added.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed with line-ending warnings only.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing passed; 105 blocks parsed.
- Internal `href`/`src` reference check passed.
- Local browser smoke test passed for the patched Contact form on desktop and mobile; no live EmailJS send was submitted.
- Current live route checks returned HTTP 200 for homepage, Practice, Insights, Case Enquiry, Courts, FAQ, Process, Contact, sitemap, feed and ads.txt.
- Live browser smoke test passed for homepage mobile drawer and Insights filtering before the next feature/content patch.
- Post-deployment Contact live check remains required after commit/push.

Commits:

- Commit hash to be recorded after commit.

## 2026-05-09 22:48 IST - EmailJS template ID correction

Files changed:

- `assets/js/script.js`
- `contact.html`
- `CHANGELOG.md`

Summary:

- Corrected the EmailJS Template ID from `ContactEmailTemplateID` to `contactformtempid`.
- Preserved EmailJS Public Key `rivGZ1UliuSkSgFdm` and Service ID `chambersofak`.
- Bumped the Contact page JavaScript cache string.
- Kept EmailJS send flow, WhatsApp fallback, Gmail fallback and copy fallback unchanged.
- No private key was added.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 22:34 IST - EmailJS public key correction

Files changed:

- `assets/js/script.js`
- `contact.html`
- `CHANGELOG.md`

Summary:

- Corrected the EmailJS Public Key from `rivGZ1liuSkSgFdm` to `rivGZ1UliuSkSgFdm`.
- Preserved EmailJS Service ID `chambersofak` and Template ID `ContactEmailTemplateID`.
- Bumped the Contact page JavaScript cache string.
- Kept EmailJS send flow, WhatsApp fallback, Gmail fallback and copy fallback unchanged.
- No private key was added.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:58 IST - EmailJS contact form integration v2

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Recovered from the failed v1 EmailJS patch by robustly inserting the EmailJS browser SDK into `contact.html`.
- Connected the Contact page dynamic enquiry form to EmailJS for direct website enquiry delivery.
- Added a direct `Send Enquiry` button while preserving WhatsApp, Gmail and copy fallback options.
- Configured EmailJS with public browser key, service ID `chambersofak` and template ID `ContactEmailTemplateID`.
- Mapped website form fields to template variables: `from_name`, `phone`, `reply_to`, `location`, `preferred_contact`, `matter_type`, `urgency`, `message` and `page_url`.
- Did not add any EmailJS private key.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy using EmailJS dashboard history/inbox confirmation.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:56 IST - EmailJS contact form integration

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Connected the Contact page dynamic enquiry form to EmailJS for direct website enquiry delivery.
- Added EmailJS browser SDK on the Contact page.
- Added a direct `Send Enquiry` button while preserving WhatsApp, Gmail and copy fallback options.
- Configured EmailJS with public browser key, service ID `chambersofak` and template ID `ContactEmailTemplateID`.
- Mapped website form fields to template variables: `from_name`, `phone`, `reply_to`, `location`, `preferred_contact`, `matter_type`, `urgency`, `message` and `page_url`.
- Kept confidentiality and no advocate-client relationship warnings intact.
- Did not add any EmailJS private key.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual live test required after GitHub Pages redeploy using EmailJS dashboard history/inbox confirmation.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:26 IST - Contact form prepared-message newline fix

Files changed:

- `assets/js/script.js`
- `contact.html`
- `CHANGELOG.md`

Summary:

- Fixed prepared enquiry message formatting so line breaks render as real newlines instead of literal `\n` text.
- Bumped the Contact page JavaScript cache string.
- Kept WhatsApp/Gmail prefilled share-link behaviour unchanged.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:21 IST - Contact form prefilled share links v3

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Recovered from the failed v1/v2 partial patch state by replacing the dynamic contact-form JavaScript module with a clean known-good version.
- WhatsApp now opens Chambers of AK chat with the prepared enquiry message prefilled.
- Gmail now opens through Google Account Chooser / Gmail compose with recipient, subject and prepared enquiry body prefilled.
- Kept copy-to-clipboard functionality and form UI unchanged.
- Bumped the Contact page JavaScript cache string.

Validation / notes:

- `node --check assets/js/script.js` passed.
- `git diff --check` passed.
- Literal background paste is not possible for browser security reasons; this uses app-supported prefilled message URLs.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:19 IST - Contact form prefilled share links v2

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Fixed the Contact form share-link behavior after the failed v1 validation.
- WhatsApp now opens Chambers of AK chat with the prepared enquiry message prefilled.
- Gmail now opens through Google Account Chooser / Gmail compose with recipient, subject and prepared enquiry body prefilled.
- Kept copy-to-clipboard functionality and form UI unchanged.
- Bumped the Contact page JavaScript cache string.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Literal background paste is not possible for browser security reasons; this uses app-supported prefilled message URLs.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:17 IST - Contact form prefilled share links

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Updated the generated contact form WhatsApp button to open Chambers of AK chat with the prepared enquiry message prefilled.
- Updated the Gmail/account-chooser link builder to include the prepared enquiry message as the Gmail compose body.
- Kept copy-to-clipboard functionality and form UI unchanged.
- Bumped the Contact page JavaScript cache string.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Literal background paste is not possible for security reasons; this uses app-supported prefilled message URLs.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 21:06 IST - Contact form Gmail account chooser fix

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Updated the generated contact form Gmail action to route through Google Account Chooser before opening Gmail compose.
- Renamed the generated form button from `Open Gmail` to `Choose Gmail Account`.
- Preserved prefilled recipient, subject and prepared enquiry body.
- Bumped the Contact page JavaScript cache string.
- Kept form UI, WhatsApp and copy functionality otherwise unchanged.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Manual browser test recommended after GitHub Pages redeploy by using multiple logged-in Google accounts.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 20:46 IST - Contact form Gmail compose fix

Files changed:

- `contact.html`
- `assets/js/script.js`
- `CHANGELOG.md`

Summary:

- Changed the generated contact form result's email button from a `mailto:` link to Gmail web compose.
- Added JavaScript to prefill Gmail recipient, subject and prepared enquiry message body.
- Renamed the generated form button from `Open Email` to `Open Gmail`.
- Bumped the Contact page JavaScript cache string.
- Kept the main contact email links, WhatsApp button and form UI otherwise unchanged.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- Manual browser test recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 20:34 IST - Contact dynamic form UI step 1

Files changed:

- `contact.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Added a dynamic structured enquiry form to the Contact page.
- Matter type selection now reveals relevant fields for cheque bounce, MSME, RERA, arbitration, commercial recovery, property/civil suit and other enquiries.
- Added client-side message generation and copy-to-clipboard functionality.
- Kept email delivery inactive for Step 1; EmailJS connection remains a later Step 2 after keys are available.
- Preserved confidentiality warning, no-document-upload position and no advocate-client relationship caution.
- Updated Contact page CSS/JS cache strings and sitemap freshness.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual contact form browser test remains required after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:39 IST - Footer visual normalization

Files changed:

- `assets/css/style.css`
- Public HTML files using `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Normalized footer CSS so grouped footer headings and links render consistently across public pages.
- Refined `Main`, `Resources` and `Legal` headings with gold serif styling and a subtle separator line.
- Bumped all public page stylesheet references to `style.css?v=footer-normalize-1` to avoid mixed cached footer CSS across pages.
- Kept footer structure and top navigation unchanged.
- Public HTML files with stylesheet cache updates: 56.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual cross-page footer check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:32 IST - Footer heading visual refinement

Files changed:

- `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Refined grouped footer headings so `Main`, `Resources` and `Legal` read as distinct premium footer section labels.
- Added serif/gold styling with a subtle separator line under each footer group heading.
- Kept footer structure, links, sitemap and HTML unchanged.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- CSS-only public website refinement.
- Manual footer check recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:26 IST - Footer and internal-link polish pass

Files changed:

- Public HTML files containing the site footer
- `assets/css/style.css`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Replaced flat footer links with grouped footer navigation across public pages.
- Added footer groups: Main, Resources and Legal.
- Added contextual links on Contact, FAQ, Process and Courts pages.
- Updated sitemap `lastmod` dates for changed public HTML pages already listed in the sitemap.
- Preserved the existing top navigation and non-solicitation footer note.
- Changed HTML files count: 56.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:20 IST - Planning documentation sync

Files changed:

- `docs/CHAMBERS_OF_AK_WEBSITE_MASTER_PLAN.md`
- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`
- `CHANGELOG.md`

Summary:

- Synced the master plan and upgrade agenda with the accepted stable checkpoint `ef11809 Strengthen trust and forum guidance`.
- Recorded completed website work: homepage Insights fix, Insights filtering/pagination/list fixes, Practice hub strengthening, Case Enquiry copy templates, technical SEO pass, sitewide breadcrumbs, Trust / Entity pass and ads.txt confirmation.
- Recorded the next plan of action: live stability review, footer/internal-link polish, Contact page improvement, Search Console follow-up and future content expansion.
- Recorded current workflow standards for PowerShell 7 patches, GitHub account selection, noreply email identity and safe non-fast-forward recovery.
- Preserved non-solicitation, document-led and no-thin-SEO-page guidance.

Validation / notes:

- `git diff --check` passed.
- Documentation-only update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 02:01 IST - Trust and entity improvement pass

Files changed:

- `courts.html`
- `process.html`
- `faq.html`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Strengthened the Courts page with working-region context, forum boundaries and a forum-route checklist.
- Strengthened the Process page with conflict/scope checks, confidentiality caution, no-outcome assurance, document indexing and limitation screening.
- Strengthened the FAQ page with trust-oriented answers on engagement, confidentiality, fees/scope, forums, urgency and location feasibility.
- Updated sitemap `lastmod` dates for the changed trust/entity pages.
- Preserved informational, non-solicitation language and avoided comparative/promotional claims.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 01:34 IST - Sitewide breadcrumb structured data pass

Files changed:

- Public HTML pages missing `BreadcrumbList` structured data
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Added sitewide breadcrumb JSON-LD to meaningful public HTML pages that were missing it.
- Skipped non-content verification files and avoided duplicating existing breadcrumbs.
- Used hierarchy: Home, Practice, Services, Insights and article/service/page titles.
- Updated sitemap `lastmod` dates for changed public HTML pages already listed in the sitemap.
- Changed HTML files count: 54.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual Google Search Console inspection remains a follow-up after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 01:14 IST - Technical SEO and sitemap freshness pass

Files changed:

- `practice.html`
- `case-enquiry.html`
- `sitemap.xml`
- `CHANGELOG.md`

Summary:

- Added structured data to the Practice hub page using a `CollectionPage` schema with breadcrumb information.
- Added breadcrumb JSON-LD to the Case Enquiry page while preserving the existing FAQPage schema.
- Updated sitemap `lastmod` dates for recently changed hub pages: home, Practice, Insights and Case Enquiry.
- Left `robots.txt` unchanged because it already allows crawling and references the sitemap/feed.
- Left `feed.xml` unchanged because no new article was published in this pass.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual Search Console inspection remains a follow-up after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:59 IST - Case enquiry copy-template improvement

Files changed:

- `case-enquiry.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Added copy-ready matter-specific enquiry templates for cheque bounce, MSME, RERA, arbitration, commercial recovery and property/civil suit matters.
- Added copy-to-clipboard buttons with fallback behaviour.
- Added lightweight styling for enquiry template cards.
- Preserved confidentiality warning and non-solicitation language.
- Bumped `case-enquiry.html` CSS/JS cache strings.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:46 IST - Practice hub strengthening pass

Files changed:

- `practice.html`
- `CHANGELOG.md`

Summary:

- Strengthened the main Expertise & Practice Areas hub with document-led practice readiness content.
- Added related Insights links by practice cluster for cheque bounce, MSME, commercial recovery, RERA, arbitration and property/civil suit matters.
- Added structured enquiry-preparation guidance to connect the Practice page with Case Enquiry and Document Checklists.
- Preserved informational, non-solicitation language and public file locations.
- Did not modify the six individual practice pages in this pass.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:27 IST - Insights default section previews and View All pagination

Files changed:

- `assets/js/script.js`
- `assets/css/style.css`
- `legal-updates.html`
- `CHANGELOG.md`

Summary:

- Updated the Insights page default/no-filter mode so each editorial article block shows only its first 3 article cards.
- Added section-level View All behaviour so each block can open its own paginated Matching Insights list.
- Kept category, tag and search filters in the paginated Matching Insights format.
- Preserved natural browser scrolling and max 10 cards per page.
- Bumped `legal-updates.html` CSS/JS cache strings for the revised Insights block-preview behaviour.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:18 IST - Insights filter results list UI fix

Files changed:

- `legal-updates.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `CHANGELOG.md`

Summary:

- Updated the Insights page filter behaviour so grouped editorial sections remain visible only in the inactive/default view.
- When category, tag, search, or View All Latest Articles is active, the page now shows the Matching Insights block and hides the other grouped article blocks below the filter panel.
- Removed internal scrolling from the Matching Insights results list so the page uses normal browser scrolling.
- Converted Insights page cards to a list-style layout to reduce empty grid spaces at changing screen widths.
- Kept pagination at a maximum of 10 article cards per page.
- Bumped `legal-updates.html` CSS/JS cache strings for the revised Insights UI.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing and internal href/src validation completed during the patch run.
- Manual browser check remains recommended after GitHub Pages redeploy.

Commits:

- Commit hash to be recorded after push.
## 2026-05-09 00:07 IST - Non-fast-forward patch recovery workflow

Files changed:

- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Documented the non-fast-forward issue that can occur when a local patch commit is amended after `origin/main` has advanced.
- Added the safe recovery pattern: `git reset --soft origin/main`, recommit, then push.
- Clarified that reusable patch scripts should set the `advabhijeet` noreply identity before creating commits.
- Clarified that scripts should avoid `git commit --amend` unless they first confirm the target commit has not been pushed and the local branch is not behind `origin/main`.
- Reconfirmed that force-push should not be used by default.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-08 23:50 IST - Local GitHub account selection workflow

Files changed:

- `README.md`
- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Added local GitHub account-selection guidance for manual patch workflows.
- Recorded that this repository should prefer the `advabhijeet` GitHub account for local commits and pushes unless instructed otherwise.
- Added a reusable PowerShell 7 setup block using `git config user.name`, `credential.https://github.com.useHttpPath true` and `gh auth switch --hostname github.com --user advabhijeet`.
- Clarified that this is local Git/GitHub authentication and does not require ChatGPT GitHub App write access.
- Recorded the repository GitHub noreply email `281193757+advabhijeet@users.noreply.github.com` to avoid private-email push rejection.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-08 23:41 IST - Manual patch diff output policy

Files changed:

- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Added a terminal diff output policy for future manual patch packages.
- Set `git diff --stat` and `git diff --name-only` as the default terminal output style.
- Documented that full diffs should be saved to a temporary diff log or shown only through an explicit verbose switch.
- Reduced the risk of long terminal output when shared files such as `assets/js/script.js` or `legal-updates.html` are changed.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
## 2026-05-08 23:38 IST - Homepage and Insights structure fixes

Files changed:

- `index.html`
- `legal-updates.html`
- `assets/js/script.js`
- `assets/css/style.css`
- `README.md`
- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Recorded Fix 1 homepage structure correction from commit `ebb1aad`.
- Fix 1 removed the duplicate homepage Latest Legal Insights section and duplicate older Case Enquiry section.
- Repaired the Insights page filter behaviour so category, tag and search inputs render matching insight cards in a dedicated results section.
- Repaired the `View All Latest Articles` CTA so it opens a latest-first paginated list.
- Limited Insights result pagination to maximum 10 articles per page.
- Added lightweight pagination styling for the Insights results section.
- Updated cache-busting query strings on `legal-updates.html` for the repaired CSS and JS.
- Updated manual workflow documentation to record PowerShell 7 / `pwsh` as the preferred shell for local patch and validation work.

Validation / notes:

- `node --check assets\js\script.js` passed.
- `git diff --check` passed.
- `sitemap.xml` and `feed.xml` parsed successfully.
- JSON-LD parsing completed during the patch run.
- Internal href/src reference validation completed during the patch run.
- Browser/mobile live smoke testing remains a manual follow-up after GitHub Pages redeploys.

Commits:

- `ebb1aad` - Fix homepage insights structure.
- `8374976` - Fix insights filters and latest pagination.
## 2026-05-08 23:34 IST - PowerShell 7 manual patch workflow guide

Files changed:

- `docs/maintenance/MANUAL_PATCH_AND_CODEX_HANDOFF_WORKFLOW.md`
- `docs/wiki/WORKFLOW.md`
- `CHANGELOG.md`

Summary:

- Added a universal PowerShell 7 manual patch command pattern.
- Documented that downloadable patch ZIP files should be assumed to be in the user's default Downloads folder unless another path is given.
- Documented that the command should extract the ZIP into the repository root before running the patch package apply script.
- Reconfirmed that package apply scripts should back up files, validate, stage only intended files, commit and push.
- Reconfirmed that `.wiki-clone/` and `.wiki-work/` must not be committed through broad staging.

Validation / notes:

- `git diff --check` passed.
- Documentation-only workflow update.
- No public website files were modified.

Commits:

- Commit hash to be recorded after push.
All meaningful website, repository and documentation changes should be recorded here.

Time zone: Asia/Kolkata (IST) unless otherwise stated.

## 2026-05-07 - Next website upgrade agenda and validation status

Files created:

- `docs/planning/NEXT_WEBSITE_UPGRADE_AGENDA.md`

Files updated:

- `docs/README.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/codex/HANDOFF.md`
- `CHANGELOG.md`

Summary:

- Added a dedicated next-stage website upgrade agenda for Chambers of AK.
- Recorded the manual validation results completed from the local Codex repository folder.
- Added the ordered plan for Codex/wiki sync, live smoke testing, practice-page strengthening, pending legal update articles, Insights distribution/newsletter workflow, case-enquiry improvements, trust/entity improvements, future service pages and future Team page restrictions.
- Updated the docs index and SEO growth agenda to reference the new upgrade agenda.
- Updated Codex handoff with active items for `.wiki-clone/` / `.wiki-work/` inspection and browser/mobile validation.

Validation / notes:

- Public website files were not modified.
- GitHub connector-only documentation update; local browser/mobile smoke testing remains pending.
- User-reported manual validation already passed: JavaScript syntax, git diff whitespace check, sitemap XML, JSON-LD parsing with 44 blocks, and internal href/src references.

Commits:

- `0d938ce928f6c350b676c3d63675a6da8212c541` - Add next website upgrade agenda.
- `5c219fd5cd64a5df7f286a3c30f7c2c95e20f561` - Update docs index with upgrade agenda.
- `3f341dda522d41261696c082daf36b3be40f31d5` - Update SEO agenda with validation and upgrade plan.
- `5e8f447f7f724471c83209c6feb909950928d748` - Update Codex handoff with agenda and validation status.

## 2026-05-06 23:05 IST - Documentation structure reorganization

Files created/moved:

- `docs/REPOSITORY_ORGANIZATION.md`
- `docs/audits/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`
- `docs/codex/HANDOFF.md`
- `docs/codex/PROMPT_RULE.md`
- `docs/maintenance/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/planning/SEO_GROWTH_AGENDA.md`
- `docs/planning/TEAM_PAGE_AGENDA.md`
- `docs/wiki/WORKFLOW.md`

Files updated:

- `README.md`
- `docs/README.md`
- `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`
- `CHANGELOG.md`

Old files removed after relocation:

- `docs/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`
- `docs/CODEX_HANDOFF.md`
- `docs/CODEX_PROMPT_RULE.md`
- `docs/CODEX_WIKI_WORKFLOW.md`
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/SEO_GROWTH_AGENDA.md`
- `docs/TEAM_PAGE_AGENDA.md`

Summary:

- Reorganized internal documentation into clear subfolders: `audits`, `codex`, `google`, `maintenance`, `planning`, `seo` and `wiki`.
- Preserved all public website files and URL-bearing folders in place.
- Updated README and docs index to reflect the new documentation map.
- Added a repository organization guide to document file-placement and cleanup rules.
- Updated historical SEO batch record so its forward references point to the new Codex and planning paths.
- Recorded Codex unavailability due to usage limit and kept local validation as a follow-up.

Validation / notes:

- Public website files were not moved.
- Local code validation was not run in this connector-only pass.
- Next recommended step remains local/Codex validation when available: JavaScript syntax, internal links, JSON-LD, sitemap XML, footer links and CTA checks.

Commits:

- `7b16206ddd7d5fb677bf04007f0570c2cd7d873f` - Move repository audit into docs/audits.
- `90d2c5c3f9209cfceef2e3318491a730d2210bd0` - Move Codex handoff into docs/codex.
- `5af7da9b3b80c7e0a2036cae6a8a389a67526b32` - Move Codex prompt rule into docs/codex.
- `87b78a24250a0d6bf5c1c6964989190cd4d85afc` - Move wiki workflow into docs/wiki.
- `c80749343cf442132c6a6b3e81310bf93de8206d` - Move legal documentation maintenance into docs/maintenance.
- `187389bf5a5621d4d3e0e176a4d1f3882d7de08a` - Move Team page agenda into docs/planning.
- `72ba76d4cdbd0074ac13f303f4e6b0007aa722f0` - Move SEO growth agenda into docs/planning.
- `635533da77d7c425be548b38e50a5aa55eadfe7b` - Add repository organization guide.
- `d9ac363ea9d4e7e9e8ec0281bfb5ab622d1769d8` - Remove old audit doc after move.
- `539ab5adbfacc6a08786f908ed366149a3848534` - Remove old Codex handoff after move.
- `94166194f3d2f96446c0e0c048fc9d814e77530b` - Remove old Codex prompt rule after move.
- `55e1b0b304a924664e15d262fe61fe7d481515bd` - Remove old wiki workflow after move.
- `02c1dc8ae3809f24f4c45334a294f978d2024b26` - Remove old maintenance doc after move.
- `3e0eb2b8372e0a454e3991cbe1233cb24fe4b7d9` - Remove old SEO growth agenda after move.
- `d38b3b298158e488474cf2233df2a8a1098e012a` - Remove old planning note after relocation.
- `0612c3864df6bcdd13bc2c4265aaade718b85acf` - Update docs README after documentation reorganization.
- `b13a7e3d1ddbc8efecff92463b9174ae7a90c7eb` - Update README paths after documentation reorganization.
- `90b4265c727c60e37c59f17fdbcdfe5d262bebec` - Update SEO batch record paths after docs reorganization.

## 2026-05-06 22:20 IST - Documentation sync, audit record and cleanup

Files changed:

- `CHANGELOG.md`
- `docs/README.md`
- `docs/CODEX_HANDOFF.md`
- `docs/CODEX_PROMPT_RULE.md`
- `docs/CODEX_WIKI_WORKFLOW.md`
- `docs/LEGAL_DOCUMENTATION_MAINTENANCE.md`
- `docs/WEBSITE_REPOSITORY_AUDIT_2026-05-06.md`
- removed `docs/seo/SEO_BATCH_2_PLAN.md`

Summary:

- Added a formal website and repository audit document.
- Updated docs README with the current documentation map and wiki-sync status.
- Refreshed Codex handoff and prompt guidance for the next validation stage.
- Updated the in-repository wiki mirror with current firm/team positioning, changelog rule, documentation workflow and SEO focus.
- Updated the legal/documentation maintenance checklist to make changelog updates mandatory.
- Removed the obsolete Batch 2 planning file because Batch 2 service-page work is complete and the roadmap/changelog supersede it.

Notes:

- Direct GitHub Wiki access was not available through the connector; `docs/CODEX_WIKI_WORKFLOW.md` remains the repository wiki mirror.
- Local code validation was not run in this connector-only documentation pass; next recommended step is Codex/local validation.

Commits:

- `598dfade6f4a86758da62475002d5dca21cd53d0` - Add website and repository audit.
- `6c33ab9749130ed98bc8beb6020f67a2cfbd9b54` - Update docs README after audit.
- `f18f4c39defae700364bda597ca0ac704166a970` - Refresh Codex handoff after repository audit.
- `6587ffc43f48e41a872b69f544d08797eada63fd` - Update Codex prompt rule after audit.
- `27468ea2aaa176c713b558b53f2a87663653f080` - Sync wiki workflow after audit.
- `a840b5c5280b4b339a12242f5d3a8ddf1005b32c` - Add changelog rule to legal documentation maintenance.
- `930f157b634cb44a892c70b8cb8dad8355af6bf5` - Remove obsolete Batch 2 planning doc.

## 2026-05-06 21:54 IST - Repository audit documentation pass

Files changed:

- `README.md`
- `CHANGELOG.md`

Summary:

- Refreshed the README after a repository and website documentation audit.
- Re-positioned documentation around the current firm/team-focused website structure.
- Added explicit change-tracking policy requiring `CHANGELOG.md` updates after every meaningful modification.
- Documented current public page groups, service clusters, legal update clusters, SEO rules, quality checks, deployment process, rollback process and maintenance rules.
- Created this changelog as the primary chronological record for future changes.

Notes:

- GitHub connector access confirmed for main repository files.
- GitHub wiki repository fetch attempts returned `Not Found`; wiki content could not be directly edited through the current connector state.

Commits:

- `7f95336f27286516074f078ce9cff07c443535de` - Update README after repository audit.
- `358e307b5fb8927a0496d6c1f8f0d07493a0bdd9` - Create changelog.

## 2026-05-06 - Firm/team positioning update

Files changed:

- `index.html`
- `about.html`
- `practice.html`
- `docs/TEAM_PAGE_AGENDA.md`

Summary:

- Made homepage firm-focused and removed founder portrait from the homepage hero.
- Added a firm-level homepage About section.
- Made About page language team-focused rather than founder-CV-focused.
- Expanded Expertise/Practice page with broader CV-based areas including real estate due diligence, title search, DRT, SARFAESI, NHAI-linked land acquisition, contracts, private documentation, taxation-aware review and trademark/IP advisory.
- Added a future Team page agenda document.

Commits:

- `e857f3ad26b0dc4bc556f264af4de85b77f7df5d` - Make About page team-focused.
- `c67bd07ea3bc1219f8033ab8a1758b3f6446e7ba` - Expand Expertise page with CV-based areas.
- `f443dd2faba4753ddc8699728fc1e0e956c8beff` - Make homepage firm-focused and remove portrait.
- `c7af88999f4ee2ddb0f5cf2b48c97f03c096d63c` - Add future Team page agenda.

## 2026-05-06 - Search Console indexing request recorded

Files changed:

- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Marked updated sitemap submission/re-submission and indexing requests for Batch 2 URLs as complete.
- Added Search Console monitoring as the next follow-up item.

Commits:

- `78005deaba0220ffcc9e99f9f68977f1bf64cd09` - Record Search Console indexing request completion.

## 2026-05-06 - Optional Batch 2 service page

Files changed:

- `services/cheque-bounce-lawyer-delhi-ncr.html`
- `sitemap.xml`
- `practice.html`
- `practice/cheque-bounce.html`
- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Added Delhi NCR cheque bounce service landing page.
- Added the page to sitemap and related internal links.
- Updated SEO agenda to mark the optional Batch 2 page complete.

Commits:

- `cabe6fd0e9c6d5f15d9b505f17f5733c12a9bbfd`
- `e20a5d146179ddc728fe82a6be7d4298f8ba9f9a`
- `400846bda18975df30218b67cf0e5e5aad35ed15`
- `1e03b46669878c9e77797111d8c670195c92f611`
- `0811f2edd94c7b018eef694d5f8d5dd735bda532`

## 2026-05-06 - Batch 2 service pages

Files changed:

- `services/cheque-bounce-lawyer-bihar.html`
- `services/property-dispute-lawyer-bihar.html`
- `services/civil-litigation-lawyer-bihar.html`
- `services/msme-recovery-lawyer-delhi-ncr.html`
- `services/rera-lawyer-noida.html`
- `services/rera-lawyer-gurugram.html`
- `sitemap.xml`
- `practice.html`
- relevant practice pages
- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Created Batch 2 high-intent service landing pages.
- Added sitemap entries and related internal links.
- Updated agenda progress after each page.

Notes:

- Detailed commit history is preserved in `docs/SEO_GROWTH_AGENDA.md` progress log and chat handoff records.

## 2026-05-06 - Homepage and mobile navigation improvements

Files changed:

- `index.html`
- `assets/css/style.css`
- `assets/js/script.js`
- related HTML files for cache-busting where applicable
- `docs/CODEX_HANDOFF.md`

Summary:

- Refreshed homepage Legal Insights behavior.
- Converted homepage Practice Areas into a mobile-friendly slider.
- Fixed mobile practice slider layout.
- Fixed mobile drawer scroll lock so the homepage does not scroll behind the open drawer.
- Fixed mobile drawer/footer social icons and preserved desktop topbar behavior.

Notes:

- User confirmed the related live UI fixes.

## 2026-05-05 to 2026-05-06 - Batch 1 SEO content and internal linking

Files changed:

- `case-enquiry.html`
- `courts.html`
- multiple `services/` pages
- multiple `updates/` pages
- `legal-updates.html`
- `practice.html`
- related practice pages
- `sitemap.xml`
- `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`
- `docs/CODEX_HANDOFF.md`
- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Upgraded Case Enquiry into a structured matter-intake hub.
- Expanded Courts page into a stronger courts/forums entity page.
- Added Batch 1 service pages and legal update articles.
- Expanded legacy articles that were too thin.
- Added internal links across homepage, practice pages, service pages, legal updates and enquiry pages.

Notes:

- Detailed Batch 1 commit list is preserved in `docs/seo/SEO_CONTENT_BATCH_2026-05-05.md`.

## 2026-05-05 - SEO Growth Agenda created

Files changed:

- `docs/SEO_GROWTH_AGENDA.md`

Summary:

- Created the main SEO roadmap for Chambers of AK.
- Defined core practice clusters, geography clusters, technical cleanup, service landing pages, legal updates, practice-page strengthening, local trust/entity pages and Search Console routine.

## Changelog Maintenance Rule

For every future meaningful modification:

1. Add a new entry at the top of this file.
2. Include date and time in IST if known.
3. List changed files.
4. Summarize what changed and why.
5. List validation performed or pending.
6. Add commit hash after commit if available.
