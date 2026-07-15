# Performance and Accessibility Remediation - 2026-07-14

## Baseline

The post-Batch-5 PageSpeed Insights laboratory run reported:

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 62 | 88 |
| Accessibility | 90 | 91 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 4.3 s | 0.8 s |
| Largest Contentful Paint | 7.3 s | 2.0 s |
| Total Blocking Time | 110 ms | 40 ms |
| Cumulative Layout Shift | 0 | 0.07 |

Search Console had insufficient Chrome UX Report traffic for field Core Web Vitals.

## Implemented scope

- optimized 720-pixel light/dark hero-logo derivatives;
- optimized 480-pixel light/dark navigation-logo derivatives;
- generated 640 x 360 card-only JPEG derivatives for active JPEG article thumbnails;
- retained original 1200 x 675 article/social thumbnails;
- added explicit width and height attributes to navigation, hero and Insight-card images;
- added high-priority preload discovery for the Homepage hero logo;
- added preload discovery for the three CSS imports used by the shared stylesheet;
- added a mobile CSS-only marble surface to avoid the decorative mobile background-image request;
- improved gold-on-light and gold-button contrast;
- expanded primary navigation and mobile/footer touch targets;
- added repository and live-browser validation.

## Validation boundary

The repository validator confirms asset dimensions, file sizes, HTML hooks, cache versions and runtime integration. The live verifier renders every sitemap page in desktop and mobile modes and exercises navigation, theme, Contact enquiry preparation and Legal Insights filtering.

A fresh PageSpeed Insights run remains necessary because Lighthouse scores depend on the remote test environment and cannot be guaranteed by repository validation alone.

## Runtime follow-up — 2026-07-15

- Corrected the RSS-driven Homepage card refresh so registry `cardThumbnail` derivatives remain active after feed rendering.
- Reworked Citadel marble variables to be gradient-first and enabled marble image URLs only from 761 px upward.
- Classified the prior zero-height desktop navigation and dark-logo timing findings as verifier false positives; the corrected live verifier now measures visible primary links and waits for image replacement completion.
- Cache and module versions advanced for deterministic propagation.
