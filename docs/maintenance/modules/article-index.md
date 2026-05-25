# Module Contract: Citadel Article Index

Last reconciled: 2026-05-26

## Summary

- Module ID: `article-index`
- Module Name: `Citadel Article Index`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack`
- Chambers Cache Key: `article-index-v22`

## Purpose

The Citadel Article Index module generates a navigable index for long-form article pages. It is intended for legal updates, blogs, insights, case notes, documentation pages and other long-form editorial content.

The module improves reading experience by allowing visitors to jump directly to article sections and by keeping the article structure visible while scrolling on desktop. It also provides a mobile reading progress bar and section-aware active state.

## Product Boundary

This is a public frontend theme module.

It belongs to:

```text
Citadel of Kang theme pack
```

It does not belong to:

```text
Citadel Manager / Website CMS backend
Client Portal
private admin system
```

It must not contain admin credentials, private write tokens, client data, case data or Chambers-only legal content.

## Current Production Files

Current production implementation:

```text
CSS: assets/css/themes/citadel-of-kang/modules/article-index.css
JS:  assets/js/themes/citadel-of-kang/article-index-direct-rail.js
Loader: assets/js/script.js
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-article-index-v22
```

Older references to `assets/js/themes/citadel-of-kang/article-index.js` are historical/non-current unless a future migration intentionally renames the production file.

## Activation

### Explicit body opt-in

```html
<body data-citadel-article-index="true">
```

### Explicit body opt-out

```html
<body data-citadel-article-index="false">
```

### Article-level opt-in

```html
<article class="article-body" data-citadel-article-index>
```

or:

```html
<article class="ck-article" data-citadel-article-index>
```

### Production safe fallback

The production auto-loader runs when the page contains:

```text
article[data-citadel-article-index], article.article-body, or article.ck-article
with 3 or more direct h2 headings
```

The loader avoids duplicate injection when:

```text
article already has data-citadel-article-index-ready="true"
.article-index-layout already exists
citadel-article-index-v22 script already exists
legacy article-index-direct-rail.js script tag already exists
```

## Public Config Keys

Current production implementation does not yet read a config file.

Future public-safe config may use:

```json
{
  "modules": {
    "articleIndex": true
  },
  "articleIndex": {
    "minHeadings": 3,
    "headingSelector": ":scope > h2",
    "activeMode": "latest-visible-heading",
    "showProgress": true,
    "showBackToTop": true,
    "desktopMode": "sticky-fixed-rail",
    "mobileMode": "below-hero"
  }
}
```

Public config must not include private keys, passwords, client/case data, repository write tokens or admin-only controls.

## Required Markup

Minimum article structure:

```html
<article class="article-body">
  <h2>Section One</h2>
  <p>...</p>
  <h2>Section Two</h2>
  <p>...</p>
  <h2>Section Three</h2>
  <p>...</p>
</article>
```

Preferred explicit structure:

```html
<body data-citadel-article-index="true">
  <main>
    <article class="article-body" data-citadel-article-index>
      <h2>Section One</h2>
      <h2>Section Two</h2>
      <h2>Section Three</h2>
    </article>
  </main>
</body>
```

The module generates the index dynamically from direct `h2` headings.

## Default Behaviour

When activated and valid headings exist, the module currently:

```text
1. Detects the target article.
2. Skips if body has data-citadel-article-index="false".
3. Collects direct h2 headings.
4. Skips if fewer than 3 valid direct h2 headings exist.
5. Adds valid unique heading IDs when missing or invalid.
6. Creates an .article-index-layout wrapper.
7. Creates an aside labelled Article Index.
8. Adds a progress indicator inside the index.
9. Generates an ordered list of heading links.
10. Adds Back to top link.
11. Wraps the article and rail into the index layout.
12. Marks the article data-citadel-article-index-ready="true".
13. Creates .mobile-reading-progress if missing.
14. Updates active section while scrolling.
15. Updates desktop and mobile reading progress.
16. Keeps the rail synchronized with article/nav spacing on desktop.
17. Uses smooth scroll for index clicks.
18. Updates on scroll, resize, orientationchange and load.
```

## Disable / No-Op Behaviour

The module does nothing when:

```text
body has data-citadel-article-index="false"
no target article exists
article already has data-citadel-article-index-ready="true"
no containing section/parent exists
article has fewer than 3 direct h2 headings
script was already injected by the loader
required DOM APIs are unavailable
```

No errors should be thrown in these states.

## Route Policy

The module is route-agnostic.

It must not depend on:

```text
/updates/*.html only
chambersofak.in
legal-updates-only routes
```

It must support future routes such as:

```text
/blog/
/articles/
insights/
news/
legal-updates/
post/
custom CMS/static routes
```

## Dependencies

Current dependencies:

```text
No third-party JavaScript dependency.
No framework dependency.
Requires article-index CSS imported by assets/css/style.css.
Coordinates with Global Shell/nav height via .nav and .site-topbar measurements.
Uses requestAnimationFrame, MutationObserver and browser scroll/resize events.
```

The module uses current site CSS variables and layout classes. CSS fallbacks should remain available before standalone extraction.

## Accessibility Notes

Current accessibility behaviour:

```text
Index aside is labelled with aria-labelledby.
Generated index links are normal fragment anchors.
Back to top link points to #top and body receives id="top" if missing.
Generated heading IDs create valid fragment targets.
Index links remain keyboard focusable.
Focus-visible styles must remain available through global CSS.
Active visual state is supplemental and not required for navigation.
Dark/light mode states must maintain contrast.
Module does not trap keyboard focus.
```

Recommended manual accessibility checks:

```text
Tab through all index links.
Activate section links with keyboard.
Confirm focus remains visible.
Confirm Back to top works.
Confirm dark mode contrast.
Confirm mobile order is logical after hero and before article body.
```

## Performance Notes

Performance characteristics:

```text
No third-party dependency.
No network request.
No polling.
Uses passive scroll listener.
Uses requestAnimationFrame to throttle scroll/resize/orientation/load updates.
Uses a body class MutationObserver to refresh positioning.
No-op on non-article pages.
No-op on short article pages.
```

The module measures nav/topbar/article geometry during updates. Future work may further reduce layout reads if performance issues appear on extremely long articles.

## SEO / Schema Notes

The module may add `id` attributes to headings that do not already have valid IDs.

It should not alter:

```text
canonical URLs
meta titles
meta descriptions
schema JSON-LD
sitemap.xml
feed.xml
article visible legal content
```

Generated section links are internal fragment links and should not create duplicate page URLs or canonical issues.

## Privacy / Security Notes

The module:

```text
does not collect personal data
does not send network requests
does not use localStorage/sessionStorage
does not expose admin functionality
does not access private case/client data
does not interact with repository write access
```

## Chambers-Specific Overrides

Chambers of AK may override visual values through existing brand tokens and implementation CSS.

Allowed Chambers overrides:

```text
black/white/gold palette
article card spacing
desktop index width
mobile spacing
heading typography
legal-update article template class names
```

Not allowed in reusable module:

```text
hardcoded Chambers article URLs
hardcoded Chambers article titles
hardcoded chambersofak.in references
hardcoded law-firm-only language beyond neutral label text
```

Default label text may be generic:

```text
Article Index
Back to top
```

## Standalone Extraction Notes

Before moving to a standalone Citadel of Kang repository, confirm:

```text
No Chambers-only routes.
No Chambers-specific content.
No private config.
Fallback CSS variables exist or are documented.
Activation examples are neutral.
Demo page uses neutral sample content or clearly licensed sample content.
Current production filename decision is resolved: keep article-index-direct-rail.js or rename through a controlled patch.
```

## Current Production Baseline

Existing approved behaviour to preserve:

```text
desktop left-side article index
index remains visible while reading
mobile index appears below hero and before article body
active item follows the latest visible/last reached heading
clicked item remains active during smooth-scroll intent
mobile reading progress bar appears
Back to top works
dark mode readability remains intact
clicked/active index pill remains readable
```

Do not replace this behavior with a different external-theme-inspired behaviour unless expressly approved.

## Validation Checklist

Commands:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/article-index-direct-rail.js
git diff --check
```

Manual checks:

```text
Desktop: index stays visible until final heading/article end.
Desktop: active item reaches the last heading.
Desktop: rail does not overlap nav/topbar.
Mobile: index appears below hero and before body.
Mobile: mobile reading progress appears under the nav area.
Mobile: all links are readable and tappable.
Dark mode: inactive, hover and active states are readable.
Keyboard: all links can be reached and activated.
Reduced motion: no disruptive animation.
Route: module works outside /updates/ paths.
No-op: module does nothing on short pages with fewer than 3 h2 headings.
No console errors.
```

## Future Enhancements

Possible future improvements:

```text
configurable heading levels h2/h3
collapsible mobile index
aria-current="true" on current section link
standalone reading-progress module if needed
CMS setting for article index per article/template
translation/localization labels
final filename normalization to article-index.js through a controlled migration
```
