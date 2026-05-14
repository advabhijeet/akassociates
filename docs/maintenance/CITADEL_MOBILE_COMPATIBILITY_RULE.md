# Citadel of Kang Mobile Compatibility Rule

This document records a standing requirement for **Citadel of Kang**.

## Core Rule

Citadel of Kang must be mobile-compatible by default.

Mobile must be treated as a first-class layout target, not as a later desktop downgrade.

## Mandatory Mobile Requirements

Every Citadel page pattern, component and module must account for:

```text
responsive layout
proper burger-menu drawer navigation
mobile-safe Article Index placement below hero and before article body
readable typography on small screens
comfortable spacing
large enough touch targets
no horizontal overflow
no blocked page scrolling
dark/light contrast on mobile
keyboard/accessibility support where applicable
safe no-op behaviour where a module is not suitable for a mobile context
```

## Affected Modules

This rule applies to:

```text
navigation
article-index
reading-time
reading-progress
insights-filter
social-bar
theme-toggle
footer
forms
cards
page/article templates
future CMS-generated templates
```

## Navigation Requirement

The mobile navigation must be a proper burger-menu drawer.

It should not be reduced to a simple dropdown unless expressly approved for a specific lightweight preview.

Expected drawer behaviour:

```text
burger menu button
side or full-height drawer panel
overlay/backdrop
Escape key close
backdrop click close
close on repeated burger click
aria-expanded and aria-controls
focus-visible support
closed drawer not keyboard reachable
reduced-motion fallback
black/white/gold premium styling for Chambers implementation
```

## Article Index Mobile Requirement

The Article Index module must work on mobile without blocking the page.

Expected behaviour:

```text
index appears below hero / before article body
links are readable and tappable
no sticky/fixed sidebar on small screens
no horizontal overflow
Back to top remains accessible
active state remains readable
```

## Production Readiness Rule

A Citadel module is not production-ready unless it defines and passes both:

```text
desktop behaviour
mobile behaviour
```

Before Chambers rollout, mobile must be manually checked on:

```text
homepage
article page
legal updates hub
contact page
navigation drawer
footer
forms/CTA elements
```

## Standing Instruction

All future Citadel of Kang work must preserve this rule.

Do not approve a Citadel rollout if mobile layout, scrolling, navigation, or touch usability is broken.
