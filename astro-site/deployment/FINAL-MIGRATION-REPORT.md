# AK-017 — Final migration and operational handoff report

Report date: 27 November 2026.

## Executive decision
The migrated application is live on Cloudflare Workers and the independently verified application release is `9e79bec8ecac701c59964ad0e5000dafed42fd5a`. Technical migration and configured security passed the recorded gates. Routine maintenance and editorial planning may proceed under the current release procedures. AK-017 documentation is complete for owner review on the isolated operations candidate; this is not evidence of candidate CI, production promotion, completed offline backup, new live Markdown publication, search indexing or actual GA4 conversion reporting.

## Architecture and baseline
| Component | Current production |
| --- | --- |
| Source repository | advabhijeet/akassociates |
| Production branch | astro-migration |
| Legacy/default branch | main, preserved at 95d4b51bdc3cf429ae46aa8abe22db531bb7a7d3 |
| Runtime | Astro static build + Cloudflare Worker, Free plan |
| Root / Node | astro-site / 22.23.4 |
| Production Worker / output | chambers-of-ak-production / dist-production |
| Staging Worker / output | chambers-of-ak-url-preview / dist (noindex, live integrations disabled) |
| Public domain | https://chambersofak.in/; www redirects to apex |
| Canonical routes | 87 |
| Existing articles / RSS entries | 51 |
| Negotiated Markdown representations | 53 |
| Legal calculators | 6 |
| Agent readiness | Recorded Cloudflare Level 1 result 5/5; not a citation guarantee |

Existing legacy article HTML and registry remain authoritative for the migrated 51 articles. New approved articles use native Markdown; the collection generates article pages, metadata, archive, latest-five homepage, sitemap, RSS and related reading, with production Markdown negotiation.

## Recorded technical evidence
- Production candidate and Lighthouse: https://github.com/advabhijeet/akassociates/actions/runs/45959923837 (success).
- Production integration candidate: https://github.com/advabhijeet/akassociates/actions/runs/45959923825 (success).
- Earlier live audit: https://github.com/advabhijeet/akassociates/actions/runs/45959952845 (163/163).
- Independent exact-release rebuild and live audit: https://github.com/advabhijeet/akassociates/actions/runs/45966997152 (163/163, 0 failures, one noncritical legal-tools JSON-LD warning).
- DNSSEC: https://github.com/advabhijeet/akassociates/actions/runs/45938894621 (recorded verification of DS, DNSKEY, A and MX on two validating resolvers).
- Email DNS: https://github.com/advabhijeet/akassociates/actions/runs/45944716531 (recorded SPF -all, DMARC reject, Google MX intact).
- CAPTCHA invalid token: https://github.com/advabhijeet/akassociates/actions/runs/45961799126 (HTTP 400 invalid-input-response); earlier owner confirmation recorded for valid CAPTCHA, receipt of real test enquiry and private-data retention protection.
- HSTS: https://github.com/advabhijeet/akassociates/actions/runs/45966395343 (max-age 2592000, no includeSubDomains/preload; HTTPS and existing security headers verified).
- IndexNow: https://github.com/advabhijeet/akassociates/actions/runs/45932646623 (HTTP 200 for 87 canonical URLs; do not repeat initial submission).
- Disposable publishing smoke test: https://github.com/advabhijeet/akassociates/actions/runs/45959923835 (51 to 52 RSS entries, 87 to 88 sitemap routes, draft exclusion and cleanup; no live article published).

Exact-release audit groups: release 1, canonical 87, redirects 6, HTTP-to-HTTPS 2, www 2, discovery 3, not-found 2, verification 2, Markdown 53, negotiation 5; all passed. These checks establish technical availability and expected routing, not search rankings, indexing or real-user Core Web Vitals.

## AK-017 workstream disposition
| Task | Status | Remaining gate |
| --- | --- | --- |
| AK-017.1 final migration audit | Passed for the validated application | Reaudit after future production promotion |
| AK-017.2 operations documentation | Reviewed and updated | Exact candidate validation and owner review before promotion |
| AK-017.3 publishing workflow | Source review and disposable preview CI verified; runbook updated | First approved native article requires production candidate and live verification |
| AK-017.4 SEO monitoring | Framework, baseline, calendar and evidence checklist prepared | Actual post-cutover dashboard measurements; no automatic schedule |
| AK-017.5 recovery | Git refs checked; backup and restore procedures documented | Offline Git backup, configuration exports and isolated recovery rehearsal |
| AK-017.6 handoff | Consolidated report prepared for owner review | Final candidate validation and controlled promotion |

## Remaining operational items
1. Obtain owner-controlled independent Git bundle, verified restore, actual active Cloudflare Worker version ID, DNS export and account configuration backups. No live rollback or backup completion claimed.
2. Review and validate documentation candidate before any fast-forward of astro-migration. GitHub's current named-branch CI triggers do not cover arbitrary candidates; no candidate CI evidence is available as of this report. A documentation-only promotion may redeploy both Workers and change the manifest release SHA. Preserve the previous release and recheck the new live manifest and independent audit. Do not submit URLs merely because documentation changed.
3. Begin weekly manual search reviews on 4 Dec 2026 using free Google Search Console and Bing dashboards. GSC Wizard access was refused (subscription required); no fresh private data pulled. Historical Google baseline 110 clicks, 6.17k impressions, 1.8% CTR, average position 9.8 for 25 Aug–24 Nov. Pre-cutover indexed sitemap subset 68/86, not the current 87-URL denominator. Review actual coverage and unresolved Bing Delhi MSEFC warning.
4. Verify GA4 enquiry_submit key-event and URL redaction settings, real-browser consent withdrawal/network behavior, and real-user performance field data when available. Mock tests are not live dashboard evidence.
5. Evaluate legal-tools JSON-LD applicability, strict CSP in report-only mode, longer HSTS only after sustained HTTPS stability, and richer agent protocols only if useful. These are deferred/nonblocking for the verified application, not blanket requirements.
6. Publish the first approved native article through the documented workflow. No production test article, extra IndexNow notification, paid upgrade, DNS change or live integration test is authorized by this report.

## Active operating documents
- [Astro entry point](../README.md)
- [Operations](OPERATIONS.md)
- [Article publishing](../migration/PUBLISHING.md)
- [Monitoring](MONITORING.md)
- [Backup and recovery](RECOVERY.md)

Historical checkpoints remain references, not instructions to repeat DNS cutover or security settings. For future work, preserve legal editorial accuracy and advocate publicity constraints, stable canonical URLs, consent-gated analytics, CAPTCHA and approved release checks. Never commit secrets or client data.

## Closure boundary
The technical migration is verified. The operational documentation package is ready for review, but its production promotion has not occurred. Owner review, exact-candidate validation and independent backup remain explicit handoff actions. Keep main and the validated application release intact; transition to controlled publishing and maintenance rather than another migration.
