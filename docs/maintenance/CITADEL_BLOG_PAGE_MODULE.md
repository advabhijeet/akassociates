# Citadel Blog Page Module

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

## Module file

```text
assets/js/themes/citadel-of-kang/modules/blog/blog-page.js
```

## Current data source

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
- registry-first card rendering.
```

## Required page shell

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

## Section modes

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

## Chambers of AK usage

`legal-updates.html` is now a Citadel Blog Page labelled as `Legal Insights`.

This means future article publishing should not manually edit directory cards. Add/update article metadata in:

```text
assets/data/insights-registry.json
```

and the Blog Page module will render the relevant sections.
