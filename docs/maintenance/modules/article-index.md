# Module Contract: Citadel Article Index

## Summary

- Module ID: `article-index`
- Module Name: `Citadel Article Index`
- Version: `0.1.0-dev`
- Status: `preview`
- Owner Product: `Citadel of Kang theme pack`
- Chambers Cache Key: `citadel-kang-article-index-1`

## Purpose

The Citadel Article Index module generates a navigable index for long-form article pages. It is intended for legal updates, blogs, insights, case notes, documentation pages and other long-form editorial content.

The module improves reading experience by allowing visitors to jump directly to article sections and by keeping the article structure visible while scrolling on desktop.

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

## Current Files

Final non-live development namespace:

```text
CSS: assets/css/themes/citadel-of-kang/modules/article-index.css
JS:  assets/js/themes/citadel-of-kang/article-index.js
```

Current transitional files that may still exist until controlled rollout:

```text
assets/css/themes/citadel/modules/article-index.css
assets/js/themes/citadel/article-index.js
preview/article-index-preview.html
```

The module is not production-active until explicitly wired into the live Chambers pipeline through a controlled PowerShell 7-compatible patch.

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

### Safe fallback

The module may auto-run when the page contains:

```text
article.article-body with 3 or more direct h2 headings
```

or:

```text
article.ck-article with 3 or more direct h2 headings
```

## Public Config Keys

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

The module should generate the index dynamically from direct `h2` headings.

## Default Behavior

When activated and valid headings exist, the module should:

```text
1. Detect the target article.
2. Collect direct h2 headings.
3. Skip the page if fewer than 3 valid h2 headings exist.
4. Add stable heading IDs when missing.
5. Generate an Article Index aside.
6. Insert numbered section links.
7. Add reading progress indicator.
8. Add Back to top link.
9. Wrap article and index into an article-index layout container.
10. Use desktop sticky/fixed left rail behaviour.
11. Use mobile/tablet below-hero / above-body behaviour.
12. Highlight the latest visible heading while scrolling.
13. Preserve dark/light mode contrast.
```

## Disable / No-Op Behavior

The module must do nothing when:

```text
body has data-citadel-article-index="false"
no article body exists
article has fewer than 3 direct h2 headings
module already ran on the article
required DOM APIs are unavailable
```

No errors should be thrown in these states.

## Route Policy

The module must be route-agnostic.

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

Current intended dependencies:

```text
No third-party JavaScript dependency.
No framework dependency.
CSS variables from Citadel tokens are preferred but fallbacks must exist.
```

The module may depend on generic Citadel CSS tokens such as:

```text
--ck-nav-space
--ck-container
--ck-article-width
--ck-color-gold
--ck-color-gold-muted
--ck-rgb-gold
```

Fallback values should be present for safe preview/testing.

## Accessibility Notes

Required accessibility behavior:

```text
Index aside must be labelled with aria-labelledby.
Index links must remain keyboard focusable.
Focus-visible styles must be available through global/core CSS.
Generated heading IDs must create valid fragment targets.
Back to top link must point to a real top target.
Active visual state must not be the only way to navigate.
Dark/light mode states must maintain contrast.
Module must not trap keyboard focus.
Module must respect reduced-motion foundation rules.
```

Recommended markup:

```html
<aside class="article-index-toc" aria-labelledby="article-index-title">
  <h2 id="article-index-title">Article Index</h2>
</aside>
```

Manual accessibility checks before rollout:

```text
Tab through all index links.
Activate section links with keyboard.
Confirm focus remains visible.
Confirm Back to top works.
Confirm dark mode contrast.
Confirm mobile order is logical after hero and before article body.
```

## Performance Notes

Performance requirements:

```text
No third-party dependency.
No network request.
No heavy polling.
Use passive scroll listener where appropriate.
Use safe resize handling.
Avoid repeated full DOM scans on scroll.
No-op on non-article pages.
Avoid layout thrashing as much as practical.
```

The module currently uses scroll and resize listeners. Before production rollout, review whether throttling/requestAnimationFrame is needed after manual testing on long articles.

## SEO / Schema Notes

The module may add `id` attributes to headings that do not already have IDs.

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
Jump directly to a section.
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
```

## Current Preview Baseline

The visual/UX baseline was approved through the Article Index preview work. Existing approved behavior should be preserved:

```text
desktop left-side article index
index remains visible while reading
mobile index appears below hero and before article body
active item follows the latest visible/last reached heading
dark mode readability must be maintained
clicked/active index pill must remain readable
progress indicator is included
```

Do not replace this behavior with a different external-theme-inspired behavior unless expressly approved.

## Production Rollout Conditions

Before this module is rolled out to Chambers production pages:

```text
1. Module contract exists.
2. Final citadel-of-kang CSS/JS paths exist.
3. Live pipeline changes are made only through controlled PowerShell 7-compatible patch.
4. Temporary preview files are cleaned after approval.
5. Existing Chambers/Citadel features are preserved.
6. Node syntax check passes.
7. git diff --check passes.
8. Desktop/mobile manual checks pass.
9. Dark/light manual checks pass.
10. Keyboard/focus manual checks pass.
```

## Validation Checklist

Commands:

```text
node --check assets/js/themes/citadel-of-kang/article-index.js
git diff --check
```

Manual checks:

```text
Desktop: index stays visible until final heading/article end.
Desktop: active item reaches the last heading.
Mobile: index appears below hero and before body.
Mobile: all links are readable and tappable.
Dark mode: inactive, hover and active states are readable.
Keyboard: all links can be reached and activated.
Reduced motion: no disruptive animation.
Route: module works outside /updates/ paths.
No-op: module does nothing on short pages with fewer than 3 h2 headings.
```

## Future Enhancements

Possible future improvements:

```text
configurable heading levels h2/h3
collapsible mobile index
current section aria-current="true"
requestAnimationFrame scroll update optimization
separate reading-progress module if needed
CMS setting for article index per article/template
translation/localization labels
```
