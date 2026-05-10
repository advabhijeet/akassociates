# AdSense Approval and Article Ads Plan

Last synced: 2026-05-10

This note records the approved direction for AdSense readiness and future advertising on the Chambers of AK website.

## Current Status

- AdSense publisher ID: `pub-6935574990807827`.
- `ads.txt` is present at the site root.
- `robots.txt` allows `AdsBot-Google`.
- The AdSense application email dated 2026-05-10 asked for application updates and pointed toward content readiness, especially insufficient content or content quality.
- The visible AdSense dashboard is still in the onboarding/account-not-approved state and exposes only limited areas such as Home, Payments, Verification check, Account information and disabled settings. A normal Sites/Ads review-detail menu is not currently visible.
- No AdSense private key is required or permitted.
- No visible ad placement has been implemented yet.

## User Direction

Ads should be shown only on article-style pages, and only in a subtle way.

Allowed future ad surface:

- `updates/*.html` legal update articles;
- future article, case brief, guide, checklist, or practical explainer pages if they are article-style editorial content.

Avoid ads on:

- homepage;
- practice and service landing pages;
- contact page;
- case enquiry flow;
- disclaimer, privacy policy, terms, FAQ, process, courts and other trust/compliance pages;
- any private communication, form, or enquiry-focused screen.

## Placement Principles

- Use restrained manual placements rather than aggressive sitewide ads.
- Keep ads clearly distinguishable from editorial content.
- Do not use labels or design that encourage clicks, draw unnatural attention, or make ads look like navigation/resources.
- Do not interrupt reading before the visitor reaches meaningful article content.
- Prefer no more than one or two conservative placements per long article unless a later review approves otherwise.
- Keep article pages useful even if ads fail to load.

## Approval Remediation Plan

1. Do not request or record Customer ID or other sensitive account identifiers.
2. Treat the current rejection as an onboarding/account-approval issue unless AdSense exposes a more specific reason later.
3. If AdSense later requires the site connection script, add the official review/Auto Ads script in a controlled way without enabling broad visible ad density.
4. Strengthen thin public pages and older short articles before resubmission.
5. Keep public legal pages updated for analytics, cookies, advertising and third-party platform disclosures.
6. Run live route and browser stability checks.
7. Resubmit the site for AdSense review only after the readiness pass.

## Compliance Notes

Google references reviewed:

- AdSense site readiness: https://support.google.com/adsense/answer/12176698
- AdSense account approval issues: https://support.google.com/adsense/answer/81904
- Ad placement policies: https://support.google.com/adsense/answer/1346295
- Google Publisher Policies: https://support.google.com/adsense/answer/10502938
- EU user consent policy: https://support.google.com/adsense/answer/7670013

Before enabling ads for visitors in the EEA, UK or Switzerland, review Google's consent requirements and use AdSense Privacy & messaging or another compliant consent-management path if needed.

## Possible Additional Public Compliance Page

The current Privacy Policy, Disclaimer and Terms now include advertising language. A separate `cookie-policy.html` or `cookie-advertising-notice.html` is not required for this patch, but should be considered before visible AdSense ads are enabled, especially if personalized ads or EEA/UK/Switzerland visitors are in scope.
