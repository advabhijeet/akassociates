# Chambers of AK Theme System

Last reconciled: **13 July 2026**

## Current baseline

The public website uses **Chambers Citadel v1**, a Citadel-derived production implementation.

```text
CSS entry: assets/css/style.css
JS entry:  assets/js/script.js

Active visual theme:
assets/css/themes/citadel-of-ak.css

Rollback fallback:
assets/css/themes/chambers-ak.css
```

Every public page loads the shared CSS and JavaScript entries. Theme and module behavior should not be reimplemented page-by-page.

## Production CSS

Directly imported by `assets/css/style.css`:

```text
assets/css/themes/citadel-of-ak.css
assets/css/themes/citadel-of-kang/modules/article-index.css
assets/css/themes/citadel-of-kang/modules/pills.css
```

Dynamically loaded where applicable:

```text
assets/css/themes/citadel-of-kang/modules/thumbnail-frames.css
```

The active visual theme owns fonts, colors, surfaces, borders, shadows, light/dark tokens and legacy aliases.

## Production JavaScript

The public bootstrap is:

```text
assets/js/script.js
```

It loads or coordinates:

```text
assets/js/themes/citadel-of-kang/modules/shell/global-shell.js
assets/js/themes/citadel-of-kang/article-index-direct-rail.js
assets/js/themes/citadel-of-kang/article-footer.js
assets/js/themes/citadel-of-kang/modules/articles/article-featured-image.js
assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js
assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js
assets/js/themes/citadel-of-kang/modules/blog/blog-page.js
assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
assets/js/themes/citadel-of-kang/modules/pages/home-page.js
assets/js/themes/citadel-of-kang/modules/pages/practice-page.js
assets/js/themes/citadel-of-kang/modules/pages/contact-page.js
assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js
assets/js/themes/citadel-of-kang/modules/pages/general-content-page.js
```

## Theme modes

Supported document themes:

```text
data-theme="citadel-of-ak"
data-theme="citadel-of-ak-dark"
```

User preference is persisted in local storage. The theme controller swaps light/dark logo assets and synchronizes desktop and mobile toggles.

## Public/development boundary

The repository contains additional Citadel files that are dormant experiments or future extraction material. Their presence does not make them production dependencies.

Production status is defined by:

1. `assets/css/style.css` imports;
2. `assets/js/script.js` loaders;
3. `docs/maintenance/theme/CITADEL_PRODUCTION_MODULE_INVENTORY.md`;
4. GitHub Actions syntax coverage.

The internal theme reference page is excluded from the public Pages build. Preview files are not public marketing pages.

## Current limitations

- `assets/js/script.js` still owns several transitional responsibilities.
- Chambers-specific social links, logo paths, analytics events and enquiry values remain embedded in production modules.
- public-safe config migration is not complete.
- dormant and production Citadel files share the same broad namespace.
- cache-version strings are not yet normalized.

These are Theme Restart tasks, not reasons to destabilize the live site during documentation cleanup.

## Change rules

- Keep `assets/css/style.css` and `assets/js/script.js` as public entry points until reviewed replacements exist.
- Do not remove `assets/css/themes/chambers-ak.css` without a tagged rollback baseline.
- Add or reuse tokens before hard-coding new visual values.
- Keep Chambers-specific values documented before standalone extraction.
- Update cache keys consistently when shared assets change.
- Run automated validators and desktop/mobile/light/dark smoke checks.
- Record every theme change in `CHANGELOG.md`.

## Validation

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/modules/shell/global-shell.js
node --check assets/js/themes/citadel-of-kang/article-index-direct-rail.js
node --check assets/js/themes/citadel-of-kang/article-footer.js
node tools/validate-seo-sitewide.js
node tools/validate-deployment-boundary.js
node tools/validate-documentation.js
git diff --check
```

## Next theme step

After repository, asset and service-page cleanup:

```text
Tag Chambers Citadel v1.
Create an active module manifest.
Separate production and theme-lab files.
Remove confirmed duplicates.
Split the bootstrap.
Resume public-safe configuration and standalone extraction.
```
