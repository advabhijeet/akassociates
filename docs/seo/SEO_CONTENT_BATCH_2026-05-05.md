# SEO Content Batch - 2026-05-05

This note records the first Google Search visibility content batch for Chambers of AK. It keeps Codex, ChatGPT, and future maintainers synced with the new public URLs added after `docs/SEO_GROWTH_AGENDA.md` was created.

## Batch Purpose

Increase Google visibility for high-intent legal searches while preserving the website's informational, non-solicitation positioning.

Primary clusters covered in this batch:

- Case enquiry and conversion readiness.
- Property and civil disputes in Patna.
- MSME recovery in Patna and Bihar.
- Section 138 cheque bounce limitation.
- RERA delayed possession and builder disputes in Bihar / Patna.
- Commercial recovery in Bihar.
- Arbitration notice and claim preparation.

## Public Pages Added Or Upgraded

### Upgraded Existing Page

- `case-enquiry.html`
  - Upgraded into a structured enquiry hub.
  - Added matter-specific enquiry formats for cheque bounce, MSME recovery, RERA, arbitration, commercial recovery, property and civil suits.
  - Added FAQ JSON-LD.
  - Preserved confidentiality and no advocate-client relationship caution.

### New Service Pages

- `services/property-dispute-lawyer-patna.html`
- `services/msme-recovery-lawyer-patna.html`
- `services/rera-lawyer-patna.html`
- `services/commercial-recovery-lawyer-bihar.html`

### New Legal Update Articles

- `updates/msme-45-days-payment-rule.html`
- `updates/section-138-cheque-bounce-limitation.html`
- `updates/rera-delayed-possession-bihar.html`
- `updates/commercial-suit-documents-checklist.html`
- `updates/arbitration-notice-before-claim.html`

## Sitemap Updates

`sitemap.xml` was updated after each new public URL was created.

New sitemap URLs added:

- `https://chambersofak.in/services/property-dispute-lawyer-patna.html`
- `https://chambersofak.in/services/msme-recovery-lawyer-patna.html`
- `https://chambersofak.in/services/rera-lawyer-patna.html`
- `https://chambersofak.in/services/commercial-recovery-lawyer-bihar.html`
- `https://chambersofak.in/updates/msme-45-days-payment-rule.html`
- `https://chambersofak.in/updates/section-138-cheque-bounce-limitation.html`
- `https://chambersofak.in/updates/rera-delayed-possession-bihar.html`
- `https://chambersofak.in/updates/commercial-suit-documents-checklist.html`
- `https://chambersofak.in/updates/arbitration-notice-before-claim.html`

## Commits In This Batch

- `28906721e8c4e48a852b688301ce8b4f6f971876` - Upgrade case enquiry page.
- `eda23751cd782e5b2a4b57de091445df03fff7d9` - Add property dispute lawyer Patna service page.
- `5655ef9fd42e17843122f1a0afd9eda388fa3201` - Add property dispute service page to sitemap.
- `5749c383255fafe66e8fda0522f7aceeadc051be` - Add MSME recovery lawyer Patna service page.
- `c79622f5faade18be3fcaa1735fb2b86dc448afa` - Add MSME Patna service page to sitemap.
- `0beec45b6e32a34ae5286ba3a6f7c419794c7af9` - Add MSME 45-day payment rule article.
- `113364a3b93020db547c6398c4f77b8ac87accf2` - Add MSME 45-day article to sitemap.
- `7a1ba94dffb0322210bb3824b30a8fc3bfc1c904` - Add Section 138 limitation article.
- `02aaf2910b5ba0ddd71152400e9a1610d74b4899` - Add Section 138 limitation article to sitemap.
- `607371305e1c7a7161cf1791470a67f6d47050ab` - Add RERA lawyer Patna service page.
- `c1d329c5136e4d2408d912646de7544f7da5b42e` - Add RERA Patna service page to sitemap.
- `3847e583091b693f2eeb2c95f03d22eec416d600` - Add RERA delayed possession Bihar article.
- `4a824ae08cba79a5370818a9791d7db2628e77c5` - Add RERA delayed possession article to sitemap.
- `14ae156d128c61d5eece00a087c2ac475c51e496` - Add commercial recovery lawyer Bihar service page.
- `3f5851bd41fe2c1ae9f4318b0ccb2115bd7e515d` - Add commercial recovery Bihar page to sitemap.
- `7482af5ea89de39f5c84596f49c4fae276ad04bc` - Add commercial suit documents checklist article.
- `f5d783a1ece6176b0c9d2b49f0f589112ef2beab` - Add commercial suit checklist article to sitemap.
- `35bd14212d8c99ed7170dcdb88a8ff86565894d6` - Add arbitration notice before claim article.
- `d934cd8e940f21e3523695668a4855eea2d923b0` - Add arbitration notice article to sitemap.

## Pending Internal-Link Work

Some existing HTML pages still need internal-link updates. Because large full-file replacements can be blocked through the GitHub connector, Codex should apply these as local patch edits where needed.

Track Codex-only or blocked items in:

```text
/docs/CODEX_HANDOFF.md
```

Important pending internal links:

- Add new service pages to `practice.html` under Focused Search Pages.
- Add new articles to `legal-updates.html` under Latest Articles.
- Fix homepage `Property & Civil Suits` practice-card link if it still points to the RERA page.
- Add contextual links from relevant practice pages to the new service pages and articles.

## Post-Deployment Checklist

After GitHub Pages deployment completes:

- [ ] Open the live homepage.
- [ ] Open each new URL directly.
- [ ] Confirm CSS and JS load correctly.
- [ ] Confirm mobile navigation works.
- [ ] Confirm WhatsApp, email, phone and case-enquiry CTAs work.
- [ ] Confirm `https://chambersofak.in/sitemap.xml` includes the new URLs.
- [ ] Request indexing in Google Search Console for the new and upgraded URLs.
- [ ] Monitor Search Console for impressions, indexed status and low-CTR pages.

## Next SEO Tasks

Recommended next content and structure tasks:

1. Update internal links through Codex/local patch edits.
2. Expand `courts.html` into a stronger courts/forums/entity page.
3. Add `services/civil-litigation-lawyer-patna.html`.
4. Add `updates/property-injunction-suit-documents.html`.
5. Add `updates/section-34-arbitration-award-challenge.html`.
6. Strengthen the six practice pages with evergreen sections listed in `docs/SEO_GROWTH_AGENDA.md`.
