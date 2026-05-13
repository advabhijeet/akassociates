# Module Contract: Citadel Reading Time

## Summary

- Module ID: `reading-time`
- Module Name: `Citadel Reading Time`
- Version: `0.1.0-dev`
- Status: `planned`
- Owner Product: `Citadel of Kang theme pack`
- Chambers Cache Key: `citadel-kang-reading-time-1`

## Purpose

The Citadel Reading Time module estimates the approximate reading time of long-form content and displays it in an article meta area or other configured target.

The module is intended to improve article readability and user expectation-setting without changing article content, canonical URLs, sitemap entries, feed entries or schema metadata.

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
CSS: assets/css/themes/citadel-of-kang/modules/reading-time.css
JS:  assets/js/themes/citadel-of-kang/reading-time.js
```

The module is not production-active until explicitly wired into the live Chambers pipeline through a controlled PowerShell 7-compatible patch.

## Activation

### Explicit body opt-in

```html
<body data-citadel-reading-time="true">
```

### Explicit body opt-out

```html
<body data-citadel-reading-time="false">
```

### Article-level opt-in

```html
<article class="article-body" data-citadel-reading-time>
```

### Target output element

```html
<span class="citadel-reading-time" data-citadel-reading-time-output></span>
```

## Public Config Keys

Future public-safe config may use:

```json
{
  "modules": {
    "readingTime": true
  },
  "readingTime": {
    "wordsPerMinute": 220,
    "minimumMinutes": 1,
    "labelSingular": "min read",
    "labelPlural": "min read",
    "articleSelector": "article.article-body, article.ck-article",
    "outputSelector": "[data-citadel-reading-time-output]"
  }
}
```

Public config must not include private keys, passwords, client/case data, repository write tokens or admin-only controls.

## Required Markup

Preferred markup:

```html
<div class="article-meta">
  <span class="citadel-reading-time" data-citadel-reading-time-output></span>
</div>

<article class="article-body" data-citadel-reading-time>
  <p>Article content...</p>
</article>
```

Fallback source:

```text
article.article-body
article.ck-article
```

## Default Behavior

When activated and valid article text exists, the module should:

```text
1. Detect the target article.
2. Extract readable text.
3. Strip script/style/noscript content.
4. Count words.
5. Estimate reading minutes using configured words-per-minute.
6. Enforce minimum 1 minute where article text exists.
7. Write output to configured target.
8. No-op if no target is available, unless auto-insertion is later approved.
```

Default display format:

```text
5 min read
```

## Disable / No-Op Behavior

The module must do nothing when:

```text
body has data-citadel-reading-time="false"
no article body exists
no output target exists
article has no readable text
module already ran on the target
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

Reading time should be text-based and screen-reader friendly.

Required behavior:

```text
Do not display reading time as icon-only.
Do not use misleading live regions.
Do not animate the value.
Keep output readable in dark and light mode.
If the output is inside article meta, keep it keyboard-neutral and non-interactive.
```

Example:

```html
<span data-citadel-reading-time-output>5 min read</span>
```

## Performance Notes

Performance requirements:

```text
No network request.
No scroll listener.
No resize listener.
Run once on DOM ready.
No repeated heavy DOM scans.
No-op on pages without article/output target.
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
```

Future CMS may optionally store reading time server-side or in generated metadata, but the frontend module should remain purely presentational.

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
badge styling
article meta placement
words-per-minute value
label text
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
node --check assets/js/themes/citadel-of-kang/reading-time.js
git diff --check
```

Manual checks:

```text
Reading time appears when target exists.
Module no-ops when target is absent.
Module no-ops when disabled by body attribute.
Dark mode output remains readable.
Mobile output remains readable.
No console errors on non-article pages.
```

## Future Enhancements

Possible future improvements:

```text
CMS-generated reading time at build/publish time
configurable selector per template
localized labels
exclude disclaimers/footnotes from count
support data-citadel-reading-time-source selectors
```
