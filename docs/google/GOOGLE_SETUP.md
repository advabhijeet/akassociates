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

The website now pushes a normalized GTM data layer event when visitors click enquiry links.

- Event name: `ak_conversion_click`
- Suggested GA4 event name variable: `ga_event_name`
- Supported values: `whatsapp_click`, `phone_click`, `email_click`, `case_enquiry_click`, `contact_click`
- Additional data layer variables: `conversion_type`, `conversion_label`, `conversion_target`, `conversion_page_path`, `conversion_page_title`

In GTM, create a Custom Event trigger for `ak_conversion_click`, then create a GA4 Event tag that uses the `ga_event_name` data layer variable as the event name. This keeps all enquiry clicks measurable through one stable trigger.

## Google Business Profile

Use consistent business details:

- Name: AK Associates - Chambers of Abhijeet Kumar, Advocate
- Phone: +91 94712 14118
- Email: kadvocateabhijeet@gmail.com
- Location: Patna, Bihar
- Service areas: Bihar, UP, Delhi NCR
- Website: https://chambersofak.in/
- Languages: Hindi, English

After the Google Business Profile is live, add its public profile URL to the website structured data as `sameAs`.

Profile setup reference:

- Google verification: https://support.google.com/business/answer/7107242
- Address and service-area guidance: https://support.google.com/business/answer/2853879
- Business representation guidelines: https://support.google.com/business/answer/3038177

## Google AdSense

AdSense is active with publisher ID `pub-6935574990807827`.

The `ads.txt` file contains the matching Google authorization line.
