# Legal and Documentation Maintenance

This checklist keeps the website's public policies and internal documentation aligned with site changes.

Use it whenever a meaningful change is made to the website, especially changes involving contact methods, enquiry flows, analytics, SEO, branding, domains, social links, or third-party services.

## Public Legal Pages

Review these files when a change affects how visitors understand or use the website:

- `disclaimer.html`
- `privacy-policy.html`
- `terms.html`

### Disclaimer Review Triggers

Update or review `disclaimer.html` when:

- Practice descriptions, legal update content, FAQs, or checklists are added or materially changed.
- The site wording becomes more promotional or risks sounding like advertising or solicitation.
- New contact, enquiry, consultation, or lead-generation flows are added.
- Branding or professional positioning changes.
- Bar Council of India or professional conduct requirements materially change.

Key points to preserve:

- No advertisement, solicitation, invitation, or inducement.
- No advocate-client relationship from browsing or contacting.
- No legal advice without formal consultation.
- No guarantee of outcomes.
- Visitor accesses information voluntarily.

## Privacy Policy Review Triggers

Update or review `privacy-policy.html` when:

- Contact forms, WhatsApp links, email links, phone links, LinkedIn links, or enquiry tools change.
- Google Tag Manager, Google Analytics, AdSense, pixels, cookies, or other tracking tools are added, removed, or materially reconfigured.
- The website starts collecting new categories of information.
- A third-party platform is added to the visitor journey.
- Retention, communication, or privacy request handling changes.
- Applicable Indian data protection requirements materially change.

Key points to preserve:

- What information may be received.
- Why information is used.
- Whether analytics/cookies are used.
- Third-party platform references.
- Retention and security language.
- Privacy contact email.

## Terms Review Triggers

Update or review `terms.html` when:

- Website functionality changes.
- New downloadable resources, checklists, articles, or user flows are added.
- External platforms or embedded tools are added.
- Branding, copyright, or reuse permissions change.
- The website's permitted use or limitation language needs adjustment.

Key points to preserve:

- Informational use only.
- No legal advice.
- No advocate-client relationship.
- Content may be updated or removed.
- Third-party links are not controlled by Chambers of AK.
- Website assets and copy cannot be reused without permission.

## Documentation Files

Review documentation whenever the public site changes.

### README.md

Update `README.md` when:

- File structure changes.
- Public page groups change.
- Domain, deployment, or GitHub Pages setup changes.
- GTM, GA4, AdSense, Search Console, or social links change.
- Branding, logo assets, or cache-busting versions change.
- Quality checks or maintenance workflows change.

### docs/

Update `docs/` when:

- Google Search Console, Google Business Profile, GTM, GA4, AdSense, or SEO setup changes.
- A new roadmap, audit, or operational checklist is created.
- A recurring maintenance process is changed.

### sitemap.xml

Update `sitemap.xml` when:

- A public indexed page is added.
- A public indexed page is removed.
- A page URL changes.
- A page is moved between folders.

## Standard Change Workflow

1. Make the website change.
2. Review whether legal pages or documentation are affected.
3. Update affected files in the same commit where practical.
4. Bump CSS/JS cache keys if shared assets changed.
5. Run validation checks.
6. Commit with a clear message.
7. Push to `main`.
8. If public URLs changed, update Search Console indexing and sitemap submission as needed.

## Minimum Validation

Run these checks where possible:

```powershell
node --check assets\js\script.js
git diff --check
```

For larger changes, also run the internal href/src check and JSON-LD parse check listed in the root `README.md`.

## Review Frequency

In addition to change-based review, check these pages periodically for legal, privacy, tracking, and professional-conduct updates.

Recommended cadence:

- Quick review after every meaningful website change.
- Full review monthly while the site is actively changing.
- Full review immediately after any material change in Bar Council of India rules, data protection requirements, Google tracking setup, or AdSense setup.

## Active Automation

A monthly Codex app automation has been created for this repository:

```text
Automation ID: monthly-legal-and-documentation-review
Schedule: Monthly on the 1st day at 10:00 AM
Scope: Legal pages, README, docs, sitemap, robots.txt, ads.txt, social links, tracking notes, branding, and public website setup.
```

This automation is a periodic review helper. It does not replace the change-based checklist above; when a website feature changes, the related legal pages and documentation should still be reviewed in the same work cycle.
