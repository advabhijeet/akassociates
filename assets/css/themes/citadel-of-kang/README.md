# Citadel of Kang CSS Theme Pack

This folder is the non-live development namespace for the **Citadel of Kang** theme pack.

Citadel of Kang is intended to become a reusable modular theme. Chambers of AK is the first implementation, but this folder should not contain Chambers-only content, analytics IDs, private configuration or route-specific assumptions.

## Status

```text
Development namespace only.
Not currently imported by assets/css/style.css.
Not active on the live website until a future controlled rollout patch.
```

## Planned Structure

```text
citadel-of-kang/
├─ index.css
├─ tokens.css
├─ core.css
├─ layout.css
├─ typography.css
├─ navigation.css
├─ footer.css
├─ components.css
├─ pages.css
└─ modules/
   ├─ article-index.css
   ├─ insights-filter.css
   ├─ social-bar.css
   ├─ theme-toggle.css
   └─ reveal.css
```

## Design Rule

Reusable first. Chambers-compatible second.

Do not hardcode:

```text
chambersofak.in
Chambers of AK content
law-firm-only language
GTM / Analytics / AdSense IDs
specific article routes such as /updates/*.html only
```

Site-specific values must be supplied by implementation config or override files.
