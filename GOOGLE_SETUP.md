# Google Platform Setup

The site is prepared for Google Search Console, Google Analytics, Google Business Profile, and Google AdSense.

## Search Console

- Verification file present: `google3164979181871a1d.html`
- Sitemap URL: `https://advabhijeet.github.io/akassociates/sitemap.xml`
- Robots URL: `https://advabhijeet.github.io/akassociates/robots.txt`

## Google Analytics

GA4 is managed through Google Tag Manager with Measurement ID `G-DCP7MK6V0V`.

The old direct GA4 `gtag.js` website snippet has been removed from the HTML pages to avoid duplicate page views.

## Google Tag Manager

Google Tag Manager is active with container ID `GTM-5GMHQTJJ`.

The GTM script has been added high in the `<head>` of every public HTML page, and the GTM noscript iframe has been added immediately after each opening `<body>` tag.

Important: The GTM container must be published after creating or editing the GA4 Google tag inside GTM. Otherwise the site will load GTM, but the GA4 tag will not fire.

## Google Business Profile

Use consistent business details:

- Name: AK Associates - Chambers of Abhijeet Kumar, Advocate
- Phone: +91 94712 14118
- Email: kadvocateabhijeet@gmail.com
- Location: Patna, Bihar
- Service areas: Bihar, UP, Delhi NCR
- Website: https://advabhijeet.github.io/akassociates/
- Languages: Hindi, English

After the Google Business Profile is live, add its public profile URL to the website structured data as `sameAs`.

Profile setup reference:

- Google verification: https://support.google.com/business/answer/7107242
- Address and service-area guidance: https://support.google.com/business/answer/2853879
- Business representation guidelines: https://support.google.com/business/answer/3038177

## Google AdSense

AdSense is active with publisher ID `pub-6935574990807827`.

The `ads.txt` file contains the matching Google authorization line.
