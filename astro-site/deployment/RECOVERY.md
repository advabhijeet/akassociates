# Recovery and backup

Preserve both repository branches. Record production commit, Cloudflare Worker deployment version, release manifest, current DNS record export, GitHub/Cloudflare settings, GTM version/export and EmailJS template configuration (no secret in repository). Maintain owner-controlled offline or secure backups; a runbook is not evidence of a completed backup. Never export client messages into repo or logs.

## Rollback triggers
Wrong canonical/noindex, widespread 404/5xx, TLS or DNS failure, production form outage, unexpected data collection or critical security regression. Stop publishing and IndexNow immediately; determine scope from live audit.

Prefer rollback of Cloudflare production Worker to a known healthy version while retaining DNS and domain attachment. Restore Git branch via a reviewed revert commit or approved new release; never force-push. Prevent auto-deployment from restoring the bad version. Check actual version and live manifest; repeat independent audit and synthetic form test if relevant. Client rollback before CAPTCHA integration requires coordinated EmailJS template changes or direct delivery fails; avoid temporarily removing CAPTCHA enforcement unless necessary and approved.

## DNS fallback
Keep Cloudflare authoritative nameservers dora.ns.cloudflare.com and jaxson.ns.cloudflare.com. Preserve all mail TXT/MX and verification records. If recovery requires legacy GitHub Pages, first verify old site and HTTPS certificate readiness with the custom domain. Detach conflicting Worker custom domains only when planned; restore apex A 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; WWW CNAME advabhijeet.github.io; original DNS-only web configuration. Verify root/www/HTTPS, indexability and forms. Legacy main remains at 95d4b51; old site may lack new CAPTCHA/consent safeguards; review before serving. Do not assume instantaneous fallback because HSTS persists in visitors' browsers for 30 days.

DNSSEC: do not change authoritative provider/nameservers or disable signing while the parent DS remains. Remove DS at registrar FIRST and independently verify disappearance across validating resolvers and allow cache expiry before disabling signing or changing nameservers. If staying on Cloudflare, keep DNSSEC active. DS currently tag 2371, algorithm 13, digest type 2, digest 60A791745B8BB76B5B8A15E0BBA8E046151151FE851BEB07A0E221C98AD37E74. Never publish private signing keys.

HSTS: current max-age 2592000, no subdomains/preload. Keep HTTPS working throughout rollback. To withdraw deliberately, serve max-age=0 over valid HTTPS and verify; previously stored policies persist until a client receives the update or expires. Do not prematurely increase duration or preload.

Restore integrations only after audit. Rotate secrets if exposure suspected; preserve public IDs, reverify actual consent, form delivery and server CAPTCHA rejection. Record incident, times, commit, corrective action and post-recovery results. No disaster recovery drill performed on live production.
