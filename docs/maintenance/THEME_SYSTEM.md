# Chambers of AK Theme System

Last updated: 2026-05-10

The public website now separates the reusable visual theme from page structure.

## Files

```text
assets/css/style.css
assets/css/themes/chambers-ak.css
assets/css/themes/citadel-of-ak.css
assets/img/citadel/
```

`assets/css/style.css` is the shared layout and component stylesheet.

`assets/css/themes/chambers-ak.css` is the active theme package. It owns the Chambers of AK visual identity:

- fonts
- core brand colors
- semantic text colors
- page/card surfaces
- border and line colors
- shadows
- category/tag colors
- legacy aliases such as `--gold`, `--gold-dark`, `--gold-soft` and `--gold-line`

`assets/css/themes/citadel-of-ak.css` is a dormant preview theme based on the Stitch AI "Lex Regalis / Citadel" redesign. It must not be imported from `style.css` or applied globally until the site owner approves the preview.

`assets/img/citadel/` contains generated preview imagery used only by the dormant Citadel theme. These images reduce blank hero/card areas in the working preview while leaving the active Chambers theme unchanged.

Preview page and full-site preview mode:

```text
theme-preview-citadel-of-ak.html
?theme=citadel-of-ak
```

The preview page is marked `noindex, nofollow` and loads the Citadel theme after the shared stylesheet. Any public page can also be opened with `?theme=citadel-of-ak`; `assets/js/script.js` will dynamically load the dormant Citadel stylesheet and preserve the preview query across internal links. This allows review of the actual working site without changing the active production theme.

## How The Theme Loads

The first line of `assets/css/style.css` imports the active theme:

```css
@import url("./themes/chambers-ak.css?v=theme-1");
```

Every public page continues to load only `assets/css/style.css`. This keeps page markup stable and makes the theme universal across homepage, practice pages, service pages, article pages, policy pages and enquiry/contact pages.

## Current Theme Inventory

```text
Active:  assets/css/themes/chambers-ak.css
Dormant: assets/css/themes/citadel-of-ak.css
Preview: theme-preview-citadel-of-ak.html and `?theme=citadel-of-ak`
Citadel preview media: assets/img/citadel/
```

## How To Swap Themes

1. Create a new file in `assets/css/themes/`, for example:

```text
assets/css/themes/chambers-ak-dark.css
```

2. Define the same CSS custom properties used in `chambers-ak.css`.

3. Update the import at the top of `assets/css/style.css`.

4. Bump the `style.css` query string across public HTML pages so browser caches refresh.

5. Validate:

```text
node --check assets/js/script.js
git diff --check
```

Then run a local browser smoke pass on:

```text
/
practice.html
legal-updates.html
case-enquiry.html
contact.html
one service page
one article page
one policy page
```

## Rules

- Do not move public website files to support a theme change.
- Do not activate `citadel-of-ak.css` without site-owner approval after preview.
- Do not hard-code new brand colors in page HTML.
- Prefer adding or reusing theme tokens before adding one-off color values in `style.css`.
- Keep fallback aliases in the active theme until all legacy component rules have been migrated.
- Update `CHANGELOG.md` for every theme or design-system change.
