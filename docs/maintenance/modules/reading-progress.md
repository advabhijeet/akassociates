# Module Contract: Citadel Reading Progress

## Summary

- Module ID: `reading-progress`
- Module Name: `Citadel Reading Progress`
- Version: `0.1.0-dev`
- Status: `planned`
- Owner Product: `Citadel of Kang theme pack`
- Chambers Cache Key: `citadel-kang-reading-progress-1`

## Purpose

The Citadel Reading Progress module displays a visual progress indicator showing how far a visitor has progressed through an article or page.

It is intended for long-form editorial pages, legal updates, guides and documentation pages. It should improve reading orientation without changing article content, canonical URLs, sitemap entries, feed entries or schema metadata.

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

## Planned Files

Final non-live development namespace:

```text
CSS: assets/css/themes/citadel-of-kang/modules/reading-progress.css
JS:  assets/js/themes/citadel-of-kang/reading-progress.js
```

The module is not production-active until explicitly wired into the live Chambers pipeline through a controlled PowerShell 7-compatible patch.

## Activation

### Explicit body opt-in

```html
<body data-citadel-reading-progress="true">
```

### Explicit body opt-out

```html
<body data-citadel-reading-progress="false">
```

### Target progress element

```html
<div class="citadel-reading-progress" data-citadel-reading-progress aria-hidden="true">
  <span></span>
</div>
```

### Article-specific target

```html
<article class="article-body" data-citadel-reading-progress-source>
  ...
</article>
```

## Public Config Keys

Future public-safe config may use:

```json
{
  "modules": {
    "readingProgress": true
  },
  "readingProgress": {
    "mode": "article",
    "targetSelector": "[data-citadel-reading-progress] span",
    "sourceSelector": "[data-citadel-reading-progress-source], article.article-body, article.ck-article",
    "fallbackToDocument": true
  }
}
```

Public config must not include private keys, passwords, client/case data, repository write tokens or admin-only controls.

## Required Markup

Preferred markup:

```html
<div class="citadel-reading-progress" data-citadel-reading-progress aria-hidden="true">
  <span></span>
</div>

<article class="article-body" data-citadel-reading-progress-source>
  <p>Article content...</p>
</article>
```

The progress element should be treated as decorative by default with `aria-hidden="true"`.

If a future implementation exposes it as a real progressbar, it must use proper progressbar semantics.

## Default Behavior

When activated and valid target/source exists, the module should:

```text
1. Detect the progress target.
2. Detect the article/source area.
3. Calculate scroll progress through the source area.
4. Update the inner span width from 0% to 100%.
5. Use passive scroll listeners where appropriate.
6. Use resize recalculation safely.
7. No-op on pages without a valid target.
```

## Disable / No-Op Behavior

The module must do nothing when:

```text
body has data-citadel-reading-progress="false"
no progress target exists
source cannot be determined and document fallback is disabled
module already initialized on the target
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

## Accessibility Notes

By default, reading progress should be decorative:

```html
<div data-citadel-reading-progress aria-hidden="true"><span></span></div>
```

Required behavior:

```text
Do not create distracting animation.
Do not trap keyboard focus.
Do not add unnecessary live announcements while scrolling.
Maintain contrast in dark and light mode.
Respect reduced-motion foundation rules.
```

If future implementation exposes progress semantically:

```html
<div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40"></div>
```

But this should be avoided unless there is a clear accessibility reason.

## Performance Notes

Performance requirements:

```text
Use passive scroll listeners.
Avoid repeated full DOM scans on scroll.
Cache source/target references.
Use requestAnimationFrame if scroll updates become expensive.
No network request.
No storage usage.
No-op on pages without progress target.
```

## SEO / Schema Notes

The module should not alter:

```text
canonical URLs
meta titles
meta descriptions
schema JSON-LD
sitemap.xml
feed.xml
article visible legal content
heading structure
```

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

Chambers of AK may override:

```text
progress bar placement
progress bar thickness
gold accent color
article source selector
mobile visibility
```

Reusable module files must not hardcode Chambers-only article URLs, titles or law-firm-only language.

## Standalone Extraction Notes

Before moving to a standalone Citadel of Kang repository, confirm:

```text
No Chambers-only routes.
No Chambers-specific content.
No private config.
Neutral activation examples exist.
Fallback CSS variables exist or are documented.
```

## Validation Checklist

Commands:

```text
node --check assets/js/themes/citadel-of-kang/reading-progress.js
git diff --check
```

Manual checks:

```text
Progress increases while scrolling article.
Progress reaches 100% near article end.
Module no-ops when target is absent.
Module no-ops when disabled by body attribute.
Dark mode progress remains readable.
Mobile progress remains unobtrusive.
No console errors on non-article pages.
```

## Future Enhancements

Possible future improvements:

```text
top-of-page fixed progress bar
article-local progress bar
progress inside Article Index module
requestAnimationFrame optimization
CMS setting per template
hide on short articles
```
