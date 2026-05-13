# Citadel Module Contract Standard

This document defines the standard contract that every **Citadel of Kang** module should follow before it is considered ready for production rollout or future standalone extraction.

Citadel modules must be reusable, configurable, accessible, performance-conscious and safe to disable.

## Product Boundary

```text
Citadel of Kang = theme pack and frontend module system.
Citadel Manager / Website CMS = separate future admin-only product.
Chambers of AK = first implementation.
Client Portal = separate future secure product.
```

A Citadel module may provide public frontend behaviour, styling, templates or UI components. It must not contain admin credentials, private write tokens, CMS backend logic or client/matter data.

## Non-Replication Rule

External systems, including the Newspaper WordPress theme package, may be studied for architecture and capability gaps only.

Citadel modules must not copy proprietary code, assets, UI layouts, naming, PHP implementation or commercial builder logic.

Working rule:

```text
Take what we do not have.
Adapt it into original Citadel-designed features.
Keep what already works.
Do not replicate.
```

## Module Contract Fields

Every module should be documented using the following fields.

```text
module id
module name
version
status
purpose
owner product
frontend CSS path
frontend JS path
activation method
public config keys
required markup/data attributes
default behavior
disable behavior
dependencies
accessibility notes
performance notes
SEO/schema notes
privacy/security notes
Chambers-specific override notes
standalone extraction notes
validation checklist
```

## Field Definitions

### module id

Stable lowercase identifier used by config, filenames and future module registry.

Example:

```text
article-index
reading-time
reading-progress
insights-filter
social-bar
theme-toggle
```

### module name

Human-readable module name.

Example:

```text
Citadel Article Index
```

### version

Initial module version should use a simple semantic-ish label.

Example:

```text
0.1.0-dev
1.0.0
```

For Chambers cache keys, use a clear public asset cache key pattern:

```text
citadel-kang-article-index-1
citadel-kang-reading-time-1
```

### status

Allowed planning values:

```text
planned
draft
preview
ready-for-rollout
production
deprecated
```

### purpose

Short explanation of what the module does and why it exists.

### owner product

Identify whether the module belongs to:

```text
Citadel of Kang theme pack
Citadel Manager / Website CMS
Chambers implementation layer
Client Portal
```

Most frontend modules belong to Citadel of Kang. Admin/editor/plugin-management functions belong to Citadel Manager, not the theme pack.

### frontend CSS path

Path to public frontend stylesheet, if applicable.

Example:

```text
assets/css/themes/citadel-of-kang/modules/article-index.css
```

### frontend JS path

Path to public frontend JavaScript, if applicable.

Example:

```text
assets/js/themes/citadel-of-kang/article-index.js
```

### activation method

State exactly how the module activates.

Preferred activation patterns:

```html
<body data-citadel-article-index="true">
<article class="article-body" data-citadel-article-index>
```

Disable pattern:

```html
<body data-citadel-article-index="false">
```

Safe fallback examples:

```text
Run only when article.article-body contains 3 or more direct h2 headings.
Run only when a target element with data-citadel-reading-time exists.
Run only when filter controls and filterable cards both exist.
```

### public config keys

List public-safe config keys that may control the module.

Example:

```json
{
  "modules": {
    "articleIndex": true
  },
  "articleIndex": {
    "minHeadings": 3,
    "activeMode": "latest-visible-heading"
  }
}
```

Public config must never contain private API keys, passwords, client data, repository write tokens or admin secrets.

### required markup/data attributes

List HTML requirements.

Example:

```text
article.article-body
article.ck-article
h2 headings inside the article
body data-citadel-article-index="true|false"
```

### default behavior

What happens when the module is loaded and valid markup/config exists.

### disable behavior

What happens when the module is disabled or no valid markup exists.

All modules must no-op safely.

### dependencies

List required dependencies.

Preferred rule:

```text
No external dependency unless expressly justified.
```

If a module depends on another Citadel module, declare it.

### accessibility notes

Every module must document accessibility considerations.

Checklist:

```text
keyboard operation
focus-visible state
aria-labels where needed
aria-expanded / aria-controls where needed
semantic elements
screen-reader-safe labels
reduced-motion support
no keyboard traps
color contrast in light and dark mode
```

### performance notes

Every module must document performance impact.

Checklist:

```text
loads only where needed
safe no-op behavior
no unnecessary global listeners
passive scroll listeners where applicable
resize handling is safe
no heavy DOM mutation loop
respects reduced motion
minimal layout thrashing
```

### SEO/schema notes

State whether the module affects headings, links, structured data, canonical URLs, sitemap/feed, or visible content.

Default rule:

```text
Frontend UX modules should not alter canonical, sitemap, feed or core SEO metadata unless specifically designed to do so.
```

### privacy/security notes

State whether the module reads/writes data, touches analytics, or exposes anything public.

Default rule:

```text
No private data.
No admin secrets.
No client/matter data.
No public repository write tokens.
No front-end-only admin access control.
```

### Chambers-specific override notes

State what may be overridden for Chambers of AK.

Example:

```text
brand colors
legal article route patterns
article template class names
social links
analytics event names
```

Reusable module files must not hardcode Chambers-only values unless clearly marked as implementation-specific.

### standalone extraction notes

State whether the module can move to the future standalone Citadel of Kang repository without Chambers-specific cleanup.

### validation checklist

Each module should include validation commands and manual checks.

Example:

```text
node --check assets/js/themes/citadel-of-kang/article-index.js
git diff --check
manual desktop test
manual mobile test
manual keyboard test
manual dark/light contrast test
```

## Standard Module Contract Template

Use this template for every module document.

```markdown
# Module Contract: <Module Name>

## Summary

- Module ID: `<module-id>`
- Module Name: `<module-name>`
- Version: `<version>`
- Status: `<status>`
- Owner Product: `<Citadel of Kang / Citadel Manager / Chambers Implementation>`

## Purpose

<What the module does.>

## Files

```text
CSS: <path or none>
JS: <path or none>
```

## Activation

<How the module activates.>

## Public Config Keys

```json
{}
```

## Required Markup

```html
<!-- examples -->
```

## Default Behavior

<Expected behavior.>

## Disable / No-Op Behavior

<How the module safely disables itself.>

## Dependencies

<Dependencies.>

## Accessibility Notes

<Accessibility requirements.>

## Performance Notes

<Performance requirements.>

## SEO / Schema Notes

<SEO impact.>

## Privacy / Security Notes

<Security/privacy impact.>

## Chambers-Specific Overrides

<Implementation notes for Chambers of AK.>

## Standalone Extraction Notes

<What must be removed or generalized before standalone extraction.>

## Validation Checklist

```text
<checks>
```
```

## Initial Citadel Module List

Core/theme modules:

```text
tokens
core
layout
typography
navigation
footer
components
pages
```

Frontend feature modules:

```text
article-index
reading-time
reading-progress
insights-filter
social-bar
theme-toggle
reveal
conversion-events
seo-schema
related-content
```

Future CMS/admin modules belong to Citadel Manager, not the theme pack:

```text
theme-switcher
template-manager
plugin-manager
content-editor
media-manager
seo-manager
publish-adapter
backup-restore
```

## Production Readiness Rule

A Citadel module is not production-ready until:

```text
1. Contract document exists.
2. Activation and disable behavior are defined.
3. Accessibility notes are written.
4. Performance notes are written.
5. No private or Chambers-only data is hardcoded in reusable files.
6. Validation checklist passes.
7. Chambers rollout is performed through a controlled PowerShell 7-compatible patch.
```
