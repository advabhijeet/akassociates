# AK-017 launch record — 27 November 2026

Status: application migration and configured security verified; operations documentation and ongoing publishing/monitoring readiness follow-up. Production release 9e79bec8ecac701c59964ad0e5000dafed42fd5a. No real new article published as part of closure. Legacy main unchanged. Cloudflare Free used throughout.

## Evidence
- Production candidate and Lighthouse: https://github.com/advabhijeet/akassociates/actions/runs/45959923837 (success).
- Production integration candidate: https://github.com/advabhijeet/akassociates/actions/runs/45959923825 (success).
- Independent live audit: https://github.com/advabhijeet/akassociates/actions/runs/45959952845 (163/163).
- DNSSEC: https://github.com/advabhijeet/akassociates/actions/runs/45938894621 (both validating resolvers authenticate DS, DNSKEY, A, MX).
- Email DNS: https://github.com/advabhijeet/akassociates/actions/runs/45944716531 (SPF -all, DMARC reject confirmed, Google MX intact).
- CAPTCHA invalid token: https://github.com/advabhijeet/akassociates/actions/runs/45961799126 (HTTP 400 invalid-input-response); owner confirmed valid CAPTCHA and receipt of real test enquiry, private data retention protection enabled.
- HSTS: https://github.com/advabhijeet/akassociates/actions/runs/45966395343 (max-age 2592000, no subdomain/preload, HTTPS and headers pass).
- IndexNow initial: https://github.com/advabhijeet/akassociates/actions/runs/45932646623 (HTTP 200, 87 URLs).
- 87 canonical routes, 51 original articles, 53 Markdown representations, Cloudflare Level 1 agent readiness 5/5. 6 calculators; all original URLs preserved or intended consolidated redirects. No ranking, indexing or AI citation guarantee.
- Known non-critical JSON-LD warning on legal-tools.html. Strict CSP, longer HSTS, richer agent protocols deliberately deferred. See Monitoring for unresolved third-party verification and indexing. Audit/backup procedures do not imply completed disaster recovery drill or automatic monitoring.

- Independently rebuilt exact-release audit, including HSTS: https://github.com/advabhijeet/akassociates/actions/runs/45966997152 (success).

## Documentation
Use Operations, Recovery, Monitoring and migration/PUBLISHING.md. Previous checkpoint files are historical. Final owner review and publishing workflow validation remain required.
