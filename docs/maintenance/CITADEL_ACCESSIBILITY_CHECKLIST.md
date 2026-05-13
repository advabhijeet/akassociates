# Citadel Accessibility Foundation Checklist

This document defines the accessibility baseline for **Citadel of Kang** theme modules and the future Chambers of AK rollout.

Accessibility must be treated as a first-class requirement, not an afterthought. Every Citadel module should preserve keyboard access, readable contrast, semantic structure and reduced-motion compatibility.

## Product Boundary

```text
Citadel of Kang = public theme pack and frontend module system.
Citadel Manager / Website CMS = separate future admin-only product.
Chambers of AK = first implementation.
Client Portal = separate secure future product.
```

This checklist applies primarily to the public frontend/theme layer.

## Core Requirements

### 1. Semantic Page Landmarks

Public pages should use clear landmarks:

```html
<header role="banner">...</header>
<nav aria-label="Primary navigation">...</nav>
<main id="main-content">...</main>
<footer role="contentinfo">...</footer>
```

Preferred rule:

```text
Use semantic HTML first. Add ARIA only where it improves clarity.
```

### 2. Skip Link

Every production layout should include a skip link before primary navigation:

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```

Expected behavior:

```text
hidden visually by default
visible on keyboard focus
moves focus/navigation to main content
works in dark and light mode
```

### 3. Keyboard Navigation

All interactive elements must be keyboard reachable and operable:

```text
navigation links
mobile menu toggle
theme toggle
Article Index links
Back to top links
filter buttons
forms
social links
CTA buttons
```

Avoid:

```text
click-only controls
non-button div controls
keyboard traps
hidden focus states
```

### 4. Focus Visible

Global focus styling should be present:

```css
:focus-visible {
  outline: 2px solid var(--ck-color-gold, #d4af37);
  outline-offset: 3px;
}
```

Focus must remain visible in:

```text
light mode
dark mode
nav/drawer states
Article Index active state
form fields
footer links
```

### 5. Mobile Navigation ARIA

Mobile menu toggles should update:

```html
<button aria-expanded="false" aria-controls="mobile-menu">Menu</button>
```

When open:

```html
<button aria-expanded="true" aria-controls="mobile-menu">Menu</button>
```

Required behavior:

```text
Escape key closes drawer
focus does not disappear
body scroll locking does not trap keyboard
menu is not reachable when visually closed
```

### 6. Theme Toggle Accessibility

Theme toggle must have:

```text
button element
aria-label or visible text
pressed/current state where appropriate
keyboard activation
visible focus state
safe logo/theme-color updates
```

Example:

```html
<button type="button" aria-label="Switch to dark mode">...</button>
```

### 7. Article Index Accessibility

Article Index must provide:

```text
labelled aside region
keyboard-focusable section links
valid generated heading IDs
visible active/focus states
Back to top link
mobile placement after hero and before body
no keyboard trap
readable dark/light active states
```

Recommended structure:

```html
<aside class="article-index-toc" aria-labelledby="article-index-title">
  <h2 id="article-index-title">Article Index</h2>
</aside>
```

### 8. Reading Time / Progress Modules

Reading-time output should be text, not icon-only:

```html
<span data-citadel-reading-time>5 min read</span>
```

Reading-progress indicators should be decorative unless they communicate essential status:

```html
<div aria-hidden="true" class="reading-progress"><span></span></div>
```

If a progress element is exposed to assistive technology, it must use proper progressbar semantics.

### 9. Reduced Motion

Citadel core should include reduced-motion handling:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Modules must avoid disruptive animation.

### 10. Color Contrast

Light and dark modes must maintain readable contrast for:

```text
body text
muted text
links
buttons
Article Index active state
Article Index clicked/focused state
filter buttons
form fields
footer links
```

Gold-on-light and gold-on-dark combinations must be manually checked because gold accents can fail contrast if used as small text.

### 11. Forms

Form controls must have:

```text
labels
clear required state
error text connected to fields where possible
keyboard focus styles
sufficient touch target size
```

Avoid placeholder-only labels.

### 12. Images and Icons

Rules:

```text
informative images need alt text
decorative images use empty alt=""
icon-only links/buttons need aria-label
logos should have useful alt text when linked to home
```

### 13. No Frontend-Only Admin Security

Accessibility does not replace security. Future admin/CMS controls must not be placed into public pages with frontend-only protection.

Do not create:

```text
public admin pages protected only by JavaScript passwords
repository tokens in browser code
client/case data in public files
```

## Module Accessibility Checklist

Every module contract should answer:

```text
Can it be used with keyboard only?
Are focus states visible?
Does it require ARIA?
Does it update ARIA state correctly?
Does it work in dark and light mode?
Does it respect reduced motion?
Does it no-op safely when markup is absent?
Does it avoid keyboard traps?
```

## Chambers Rollout Manual Test Checklist

Before applying Citadel changes to Chambers production:

```text
1. Tab through homepage navigation.
2. Open and close mobile menu using keyboard.
3. Toggle dark/light mode using keyboard.
4. Tab through Article Index links.
5. Activate Article Index links by keyboard.
6. Confirm active Article Index item remains readable in dark mode.
7. Confirm clicked/focused Article Index pills remain readable.
8. Confirm Back to top works.
9. Confirm footer links are reachable.
10. Confirm forms have labels and focus state.
11. Confirm reduced-motion mode does not break layout.
12. Confirm mobile touch targets are large enough.
```

## Production Readiness Rule

No Citadel module should be marked production-ready unless its accessibility notes are complete and the relevant manual checks have passed.
