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

`assets/css/themes/citadel-of-ak.css` is the active theme package. It owns the current Chambers of AK visual identity:

- fonts
- core brand colors
- semantic text colors
- page/card surfaces
- border and line colors
- shadows
- category/tag colors
- legacy aliases such as `--gold`, `--gold-dark`, `--gold-soft` and `--gold-line`

`assets/css/themes/chambers-ak.css` is the previous/fallback theme package. Keep it available unless a later cleanup explicitly removes the rollback path.

`assets/img/citadel/` contains Citadel imagery used by the active theme. The folder includes article thumbnails and the light/dark marble background textures used by Citadel page surfaces.

Commercial WordPress packaging or a paid-theme distribution should be built in a separate repository and separate implementation thread. This repository should only carry the production static-site theme and its rollback fallback.

Theme reference page:

```text
theme-preview-citadel-of-ak.html
```

The reference page is marked `noindex, nofollow` and uses the same active Citadel stylesheet as the public site. It is a component and layout review surface, not a public marketing page.

The active Citadel theme includes a light/dark toggle. Desktop users see it in the topbar; mobile users see it in the drawer. The toggle switches between `data-theme="citadel-of-ak"` and `data-theme="citadel-of-ak-dark"` and persists the visitor preference locally.

Citadel dark mode uses `assets/img/primary-logo-dark.png` for the homepage hero logo and `assets/img/logo-navbar-dark.png` for the navbar logo.

## How The Theme Loads

The first line of `assets/css/style.css` imports the active theme:

```css
@import url("./themes/citadel-of-ak.css?v=theme-1");
```

Every public page continues to load only `assets/css/style.css`. This keeps page markup stable and makes the theme universal across homepage, practice pages, service pages, article pages, policy pages and enquiry/contact pages.

## Current Theme Inventory

```text
Active: assets/css/themes/citadel-of-ak.css
Fallback / previous: assets/css/themes/chambers-ak.css
Reference: theme-preview-citadel-of-ak.html
Citadel media: assets/img/citadel/
Dark mode: active toggle through `assets/js/script.js`
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
- Do not hard-code new brand colors in page HTML.
- Prefer adding or reusing theme tokens before adding one-off color values in `style.css`.
- Keep fallback aliases in the active theme until all legacy component rules have been migrated.
- Update `CHANGELOG.md` for every theme or design-system change.
