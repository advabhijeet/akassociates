# Citadel of Kang JavaScript Theme Pack

This folder is the non-live development namespace for the **Citadel of Kang** JavaScript modules.

These files are intended to become reusable theme modules. They must remain configurable, route-agnostic and free of Chambers-specific secrets or public-site credentials.

## Status

```text
Development namespace only.
Not currently loaded by assets/js/script.js.
Not active on the live website until a future controlled rollout patch.
```

## Planned Structure

```text
citadel-of-kang/
├─ core.js
├─ navigation.js
├─ theme-toggle.js
├─ social-links.js
├─ article-index.js
├─ insights-filter.js
├─ conversion-events.js
└─ reveal.js
```

## Module Rules

Modules should:

```text
activate through config or data attributes
support safe no-op behaviour when markup is absent
avoid route-only assumptions
avoid Chambers-specific content
avoid public exposure of secrets or write tokens
```

## Public Website Boundary

The public website may later load selected generated modules, but admin/CMS functions must remain outside the public frontend.
