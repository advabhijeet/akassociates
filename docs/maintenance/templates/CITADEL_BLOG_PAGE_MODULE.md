# Citadel Blog Page Module

Last reconciled: 2026-05-26

## Summary

- Module ID: `blog-page`
- Module Name: `Citadel Blog Page`
- Version: `1.0.0-production`
- Status: `production`
- Owner Product: `Citadel of Kang theme pack with Chambers implementation data`
- Chambers Cache Key: `blog-page-v1`

## Purpose

The Citadel Blog Page module is a reusable theme-level controller for article directory pages.

It is intentionally label-neutral. A site may call the page:

```text
Blog
News
Insights
Legal Insights
Updates
Resources
Knowledge Centre
```

The module remains the same. The visible label is controlled by page content and `data-citadel-blog-label`.

## Current Production File

```text
JS: assets/js/themes/citadel-of-kang/modules/blog/blog-page.js
Loader: assets/js/script.js
Data: assets/data/insights-registry.json
```

The module is production-loaded through `assets/js/script.js` using the script id:

```text
citadel-blog-page-v1
```

## Current Data Source

```text
assets/data/insights-registry.json
```

Runtime compatibility uses:

```text
window.CitadelArticleRegistry
window.chambersInsightsRegistry
window.ChambersInsightsRegistryReady
```

## Responsibilities

The module owns the full directory-page behaviour:

```text
- default editorial sections;
- latest section;
- category sections;
- tag sections;
- section limits, defaulting to 3 cards;
- View All behaviour;
- filtered results;
- search;
- category and tag filters;
- pagination;
- duplicate prevention by normalized article href;
- registry-first card rendering;
- URL query-param synchronization for category, tag and search filters.
```

## Required Page Shell

```html
<main data-citadel-blog-page data-citadel-blog-label="Legal Insights">
  <section class="sec insights-filter-panel">...</section>
  <section class="sec insights-results-section" data-citadel-blog-results hidden>
    <div id="insights-results-list" data-citadel-blog-results-list></div>
  </section>

  <section data-citadel-blog-section="latest" data-limit="3">
    <button data-citadel-blog-view-all>View All Latest Articles</button>
    <div class="updates-grid" data-citadel-blog-grid></div>
  </section>

  <section data-citadel-blog-section="category" data-category="Case Brief" data-limit="3">
    <button data-citadel-blog-view-all>View All</button>
    <div class="updates-grid" data-citadel-blog-grid></div>
  </section>
</main>
```

## Section Modes

```text
data-citadel-blog-section="latest"
data-citadel-blog-section="category"   + data-category="Case Brief"
data-citadel-blog-section="categories" + data-categories="Practical Guide, Checklist"
data-citadel-blog-section="tag"        + data-tags="Arbitration"
data-citadel-blog-section="tags"       + data-tags="NI Act, MSME, RERA"
```

Optional exclusions:

```text
data-exclude-categories="Case Brief"
data-exclude-tags="Archived"
```

## Default Behaviour

When activated, the module currently:

```text
1. Waits for `window.ChambersInsightsRegistryReady` when available.
2. Reads registry items through `window.CitadelArticleRegistry` or `window.chambersInsightsRegistry`.
3. De-duplicates items by normalized href.
4. Renders default editorial sections from registry items.
5. Creates missing section grids where required.
6. Applies section limits, defaulting to 3 cards.
7. Creates View All buttons where missing.
8. Opens section-level result mode when View All is clicked.
9. Builds category, tag and search filter options from registry values.
10. Applies URL params for `category`, `tag` and `q`.
11. Syncs active filters back into the URL using history.replaceState.
12. Renders filtered results with pagination at 10 items per page.
13. Annotates category/tag controls for filter intent.
14. Uses `window.ChambersInsightCards.buildCard` when available, with a fallback card builder.
```

## Disable / No-Op Behaviour

The module does nothing when:

```text
window.CitadelBlogPage.initialized is already true
[data-citadel-blog-page] is missing
registry items are unavailable or empty
required result/list elements are missing for result mode
```

No errors should be thrown in missing-markup states.

Future enhancement: add an explicit disable hook such as:

```html
<body data-citadel-blog-page="false">
```

## Chambers of AK Usage

`legal-updates.html` is now a Citadel Blog Page labelled as `Legal Insights`.

This means future article publishing should not manually edit directory cards. Add/update article metadata in:

```text
assets/data/insights-registry.json
```

and the Blog Page module will render the relevant sections.

## Current SEO / Crawlability Note

The production page is registry-first and JavaScript-enhanced. During Phase 4.5, a static non-JavaScript article-link fallback should be added to `legal-updates.html` so the Legal Insights hub is less dependent on JavaScript-rendered cards.

Until then, RSS and existing fallback text should be treated as a transitional fallback, not the final crawlability model.

## Accessibility Notes

Required accessibility behaviour:

```text
Filter inputs must have visible or associated labels in page markup.
Datalists should provide usable category/tag suggestions.
Result status text should update clearly.
Pagination buttons must be real buttons.
View All buttons must be real buttons.
Article cards must remain normal links.
Keyboard focus must remain visible through CSS.
```

Manual checks:

```text
Tab through category, tag and search filters.
Use keyboard to activate View All.
Use keyboard to activate pagination.
Confirm status text changes after filtering.
Confirm empty result state is readable.
Confirm dark/light contrast.
```

## Performance Notes

Performance characteristics:

```text
No third-party dependency.
No network request from this module directly.
Depends on already-loaded registry promise.
De-duplicates in memory.
Re-renders only relevant grids/results.
No scroll listener.
No resize listener.
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
article metadata
```

It does create visible article-card links in the DOM after JavaScript execution. Static fallback links should be added later under Phase 4.5 for stronger non-JS crawlability.

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

URL query params are used only for local filtering state.

## Relationship To The Citadel Template System

The Blog Page module is the first page-level template in the wider Citadel Template System. It should be treated as the reusable Blog / News / Updates / Insights listing template. Site-specific public labels such as “Legal Insights” belong in page markup or data attributes, not in module names.

Future template modules should follow the same pattern:

```text
Citadel module name = generic template/function
Website label/content = implementation-specific
Registry/data = externalized where practical
```

## Standalone Extraction Notes

Before moving to a standalone Citadel of Kang repository, confirm:

```text
registry schema is documented neutrally
card helper dependency is separated or bundled generically
page labels are config/markup-driven
no Chambers-only article routes are hardcoded
static fallback guidance is included
neutral demo registry exists
```

## Validation Checklist

Commands:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/blog/blog-page.js
git diff --check
```

Manual checks:

```text
legal-updates.html renders default editorial sections.
Latest section shows registry items.
Category/tag sections render correctly.
View All works.
Category filter works.
Tag filter works.
Search filter works.
URL params restore initial filtered state.
Pagination appears when result count exceeds 10.
Empty state appears for no matches.
Dark/light contrast passes.
Keyboard focus remains visible.
No console errors.
```
