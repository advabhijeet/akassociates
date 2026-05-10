# Google Platform Setup

The site is prepared for Google Search Console, Google Analytics, Google Business Profile, and Google AdSense.

## Search Console

- Verification file present: `google3164979181871a1d.html`
- Sitemap URL: `https://chambersofak.in/sitemap.xml`
- Robots URL: `https://chambersofak.in/robots.txt`
- Custom domain: `https://chambersofak.in/`

After the domain change, add and verify `https://chambersofak.in/` in Google Search Console, then submit the new sitemap URL above. The old GitHub Pages URL-prefix property cannot be changed into the new domain property inside this repository.

## Google Analytics

GA4 is managed through Google Tag Manager with Measurement ID `G-DCP7MK6V0V`.

The old direct GA4 `gtag.js` website snippet has been removed from the HTML pages to avoid duplicate page views.

Update the GA4 web data stream URL in Analytics Admin to `https://chambersofak.in/` so reports show the current website address.

## Google Tag Manager

Google Tag Manager is active with container ID `GTM-5GMHQTJJ`.

The GTM script has been added high in the `<head>` of every public HTML page, and the GTM noscript iframe has been added immediately after each opening `<body>` tag.

Important: The GTM container must be published after creating or editing the GA4 Google tag inside GTM. Otherwise the site will load GTM, but the GA4 tag will not fire.

Optional: rename the GTM container/workspace display name to `chambersofak.in` for clarity. The installed container ID does not need to change.

### Conversion Event Data Layer

The website currently pushes one GTM data layer event per important enquiry interaction.

Supported event names:

- `whatsapp_click`
- `phone_click`
- `email_click`
- `case_enquiry_click`
- `contact_click`

Current event payload keys:

- `link_text`
- `link_target`
- `page_path`

In GTM, create Custom Event triggers for these event names, or use a single regular-expression Custom Event trigger that matches the five names above. Then create GA4 Event tags that send the same event names into GA4. Re-test GTM Preview whenever `assets/js/script.js` changes around enquiry links or event tracking.

## Google Business Profile

Use consistent business details:

- Name: Chambers of AK - Advocates & Legal Consultants
- Phone: +91 94712 14118
- Email: chambersofakadmin@gmail.com
- Location: Patna, Bihar
- Service areas: Bihar, UP, Delhi NCR
- Website: https://chambersofak.in/
- Languages: Hindi, English

Current external profile status:

- Google Business Profile: live public profile available at https://share.google/GhBO4etH9rEE2tWMe
- Google review request link: https://g.page/r/CQ3qHOMx28GrEAI/review
- LinkedIn page: https://www.linkedin.com/company/chambersofak
- Personal LinkedIn profile: https://www.linkedin.com/in/abhijeetk03/
- WhatsApp Business Profile: ready and linked through `https://wa.me/919471214118`.
- WhatsApp Channel: https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33
- Administrative Gmail: chambersofakadmin@gmail.com

The public Google Business Profile URL should remain in homepage LegalService structured data as `sameAs`. The review request link may be shown on the Contact page, but should not be used with incentives or language that suggests paid, rewarded or non-genuine reviews.

Profile setup reference:

- Google verification: https://support.google.com/business/answer/7107242
- Address and service-area guidance: https://support.google.com/business/answer/2853879
- Business representation guidelines: https://support.google.com/business/answer/3038177

## Google AdSense

AdSense publisher ID: `pub-6935574990807827`.

The `ads.txt` file contains the matching Google authorization line.

Current application status:

- The 2026-05-10 AdSense email asked for updates to the application and pointed toward content readiness, especially insufficient content or content quality.
- The visible dashboard is still in the account-not-approved onboarding view and does not currently expose a normal Sites/Ads review-detail menu.
- The site has `ads.txt` and crawler access in place, but visible ads have not been implemented.
- Future ads should be limited to article-style pages in `updates/` or future article pages, with subtle manual placement.
- Do not place ads on homepage, contact, case enquiry, practice/service landing pages, policy pages or private-communication-focused screens.

Operational plan: `docs/planning/ADSENSE_APPROVAL_AND_ARTICLE_ADS_PLAN.md`.
