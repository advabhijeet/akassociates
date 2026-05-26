# Module Contract: Citadel Article Footer

Last reconciled: 2026-05-26

## Summary

- Module ID: `article-footer`
- Module Name: `Citadel Article Footer`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation data`
- Chambers Cache Key: `article-footer-v2-1`

## Purpose

The Citadel Article Footer module standardizes the lower section of long-form article pages. It renders article tags, previous/next article navigation and recommended reads using the central article registry first, with metadata fallback when a registry match is unavailable.

The module reduces manual footer maintenance across `updates/*.html` pages and keeps article navigation aligned with `assets/data/insights-registry.json`.

## Product Boundary

This is a public frontend article module.

It belongs to:

```text
Citadel of Kang theme pack
Chambers of AK implementation layer
```

It does not belong to:

```text
Citadel Manager / Website CMS backend
Client Portal
private admin system
```

It must not contain admin credentials, private write tokens, client/matter data or backend logic.

## Current Production Files

Current production implementation:

```text
JS: assets/js/themes/citadel-of-kang/article-footer.js
Loader: assets/js/script.js
CSS: assets/css/style.css and active article/footer component rules
Data: assets/data/insights-registry.json
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-article-footer-v2
```

## Activation

Current production activation:

```text
article.article-body exists
window.CitadelArticleFooter is not already present
script id citadel-article-footer-v2 is not already injected
```

Current minimum article markup:

```html
<article class="article-body" data-article-category="Legal Insight" data-article-tags="MSME, Arbitration">
  ...
</article>
```

The module no-ops safely if no `article.article-body` exists.

## Public Config Keys

Current production implementation does not yet read a config file.

Future public-safe config may use:

```json
{
  "modules": {
    "articleFooter": true
  },
  "articleFooter": {
    "showTags": true,
    "showPreviousNext": true,
    "showRecommended": true,
    "recommendedLimit": 3,
    "tagLinkTarget": "legal-updates.html"
  }
}
```

Public config must not include private keys, passwords, client/case data, repository write tokens or admin-only controls.

## Data Sources

Primary source:

```text
window.CitadelArticleRegistry
window.chambersInsightsRegistry
assets/data/insights-registry.json
```

Fallback sources:

```text
current page path
page h1 / document.title
meta description
article data-article-category
article data-article-tags
.article-meta span values
.sec-label / hero labels
article text keyword inference
```

## Default Behaviour

When activated, the module currently:

```text
1. Detects `article.article-body`.
2. Skips if `.article-standard-footer` already exists.
3. Reads the central article registry if available.
4. Normalizes the current page path.
5. Finds the current article in the registry when possible.
6. Falls back to current-page metadata when the registry is missing/incomplete.
7. Builds a Tags section with links to `legal-updates.html?tag=...`.
8. Builds Previous Article and Next Article buttons from registry order.
9. Scores related registry items by category and shared tags.
10. Renders up to 3 Recommended Reads.
11. Appends the generated footer to the article body.
```

## Disable / No-Op Behaviour

The module does nothing when:

```text
article.article-body is missing
.article-standard-footer already exists
window.CitadelArticleFooter already exists before loader injection
```

No errors should be thrown when the registry is unavailable; metadata fallback should keep the module usable.

Future enhancement: add an explicit disable hook such as:

```html
<body data-citadel-article-footer="false">
```

## Dependencies

Current dependencies:

```text
No third-party JavaScript dependency.
No framework dependency.
Coordinates with the Insights registry loaded by assets/js/script.js.
Uses normal DOM APIs and URL/path normalization.
```

The module can render with fallback data even when registry matching fails, but previous/next and recommended reads require registry entries.

## Accessibility Notes

Current required accessibility behaviour:

```text
Generated links are normal anchor elements.
Tag list has aria-label="Article tags".
Tag links have aria-labels for filter intent.
Previous/next links are readable text links, not icon-only controls.
Recommended reads use visible title and category text.
Keyboard focus must remain visible through global CSS.
```

Recommended manual checks:

```text
Tab through tag links.
Tab through previous/next buttons.
Tab through recommended cards.
Confirm link text is understandable out of context.
Confirm dark/light contrast.
```

## Performance Notes

Performance characteristics:

```text
No network request from this module.
No scroll listener.
No resize listener.
No polling.
Single article/footer DOM pass on initialization.
Registry scanning is limited to the in-memory article registry.
```

## SEO / Schema Notes

The module adds visible internal links to tags, previous/next articles and recommended articles.

It should not alter:

```text
canonical URLs
meta titles
meta descriptions
schema JSON-LD
sitemap.xml
feed.xml
article body legal content above the generated footer
```

Generated footer links support internal linking, but they should not be the only internal links to important pillar pages or articles.

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

Chambers of AK currently controls:

```text
legal-updates.html tag filter route
article registry values
article categories and tags
black/white/gold styling through CSS
```

Reusable Citadel extraction should make the tag index route configurable instead of assuming `legal-updates.html`.

## Standalone Extraction Notes

Before moving to a standalone Citadel of Kang repository, confirm:

```text
tag filter route is config-driven
article registry schema is documented neutrally
no Chambers-only article routes are hardcoded
no Chambers legal content is bundled into the module
fallback category/tag inference is generic or configurable
neutral demo registry exists
```

## Validation Checklist

Commands:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/article-footer.js
git diff --check
```

Manual checks:

```text
Article Footer appears on article.article-body pages.
Article Footer does not duplicate if the page already has .article-standard-footer.
Tags render and point to Legal Insights tag filters.
Previous/next links follow registry order.
Recommended reads appear when related registry items exist.
Fallback current article data appears if registry item is missing.
Dark/light contrast passes.
Keyboard focus remains visible.
No console errors.
```

## Future Enhancements

Possible future improvements:

```text
Explicit disable hook.
Configurable tag index route.
Configurable recommended-read limit.
aria-current or rel=prev/next strategy review.
Optional thumbnail cards for recommended reads.
Standalone related-content scorer module.
CMS-controlled previous/next order.
```
