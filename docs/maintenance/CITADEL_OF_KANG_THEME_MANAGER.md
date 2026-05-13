# Citadel of Kang Theme Manager

This document records the planned Theme Manager direction for **Citadel of Kang**.

The Theme Manager is intended to make Citadel of Kang easy to customize for non-technical website owners while keeping the public website safe, lightweight and modular.

## Objective

Create an admin-access-only customization system for Citadel of Kang so a non-technical user can manage the website's theme settings without editing CSS, JavaScript or HTML manually.

The Theme Manager should eventually allow the admin to manage:

```text
brand name
tagline
logo paths
favicon paths
primary color palette
accent color palette
font pairing
light/dark mode defaults
navigation links
footer links
social links
contact details
article index settings
module enable/disable settings
homepage section visibility
CTA labels
analytics/ad IDs where appropriate
```

## Important Security Boundary

Citadel of Kang must not ship a fake admin panel that is only protected by front-end JavaScript.

Reason:

```text
If an admin password, private key or write capability is placed in public HTML/JS, it is visible to everyone.
```

Therefore, the public website should only consume safe generated configuration files. Actual admin write access must happen through a secure workflow.

Correct model:

```text
Admin Theme Manager edits settings securely.
Theme Manager writes/commits generated config.
Public website reads generated config and renders theme.
```

Incorrect model:

```text
Public website contains secret admin credentials or direct write tokens.
```

## Static Website Constraint

The Chambers of AK website is currently a static site hosted through GitHub Pages/custom domain.

Static site limitation:

```text
A static site cannot safely provide private admin write access by itself.
```

Safe options require one of the following:

1. GitHub-based authenticated editing.
2. A separate admin app/backend.
3. A local desktop/admin generator.
4. A headless CMS or Git-based CMS with proper authentication.
5. Manual PowerShell patch generation for early versions.

## Recommended Development Roadmap

### Stage 1 — Config-First Theme System

Create a public-safe configuration file such as:

```text
assets/config/citadel-kang.config.json
```

or site-specific config:

```text
assets/config/chambers.config.json
```

This config may include public values only:

```json
{
  "brand": {
    "name": "Chambers of AK",
    "tagline": "Advocates & Legal Consultants",
    "website": "https://chambersofak.in"
  },
  "theme": {
    "defaultMode": "light",
    "accent": "#D4AF37"
  },
  "modules": {
    "articleIndex": true,
    "insightsFilter": true,
    "socialBar": true,
    "themeToggle": true
  }
}
```

Public-safe config can include public URLs, labels and display settings. It must not include private API keys, passwords or secret write tokens.

### Stage 2 — Local Admin Generator

Create a local-only admin tool that helps the website owner generate config and patch files.

Possible form:

```text
tools/citadel-theme-manager/
```

Early implementation options:

```text
local HTML form that exports JSON
PowerShell 7 script that applies generated config
Node script that validates and writes theme config
```

This is safest for the current repository because the user already applies controlled PowerShell patches.

### Stage 3 — GitHub Authenticated Admin App

Create a separate admin interface that authenticates with GitHub and commits changes to the repository.

Important:

```text
This must not expose private tokens in public site code.
```

Possible approaches:

```text
GitHub OAuth app
GitHub App installation
serverless backend that handles auth securely
admin-only dashboard in a separate private/admin repository
```

This should be developed only after the theme structure is stable.

### Stage 4 — CMS / Non-Technical Dashboard

Long-term options:

```text
Git-based CMS
custom admin dashboard
headless CMS integration
WordPress version of Citadel of Kang
```

The WordPress/commercial version must be handled in a separate repository and separate chat unless expressly instructed otherwise.

## Theme Manager Features

### Brand Settings

```text
brand name
tagline
logo light/dark paths
favicon/app icon paths
social preview image
brand colors
```

### Layout Settings

```text
nav style
footer layout
hero style
article layout
container width
card radius
button style
```

### Module Settings

```text
article index on/off
article index threshold heading count
latest visible heading vs midpoint scroll-spy mode
insights filter on/off
social bar on/off
theme toggle on/off
live clock on/off
reveal animation on/off
conversion tracking on/off
```

### Content Link Settings

```text
navigation links
footer link groups
social profile links
contact links
CTA buttons
Google Business Profile link
review link
```

### Compliance / Legal Settings

For professional or regulated websites, allow controlled disclaimer text areas:

```text
footer disclaimer
article disclaimer
contact-page disclaimer
non-solicitation notice
privacy/terms links
```

For Chambers of AK, any legal-profession disclaimer must remain compliant with Indian advocate advertising/non-solicitation expectations.

### Analytics / Ads Settings

These must be handled carefully.

Public IDs may be stored in config only when appropriate:

```text
GTM container ID
GA measurement ID
AdSense publisher ID
```

Private keys must never be stored in public config.

## Access-Control Models

### Model A — Local-Only Manager

Best for early development.

```text
Admin opens a local manager file/tool.
Admin edits settings.
Tool exports JSON and/or PowerShell patch.
Admin applies patch manually.
```

Pros:

```text
safe
simple
no backend
matches current workflow
no public admin attack surface
```

Cons:

```text
not fully web-admin friendly
requires local patch workflow
```

### Model B — Private Admin App

Best for later.

```text
Admin logs into private dashboard.
Dashboard writes config through secure backend/GitHub auth.
Website deploys from repository.
```

Pros:

```text
non-technical friendly
real admin experience
scalable
```

Cons:

```text
requires backend/auth design
must be secured properly
more maintenance
```

### Model C — CMS Integration

Best for future commercial package.

```text
Citadel of Kang integrates with a CMS or WordPress.
Admin manages settings through CMS dashboard.
```

Pros:

```text
familiar admin UX
content + theme management together
commercially useful
```

Cons:

```text
separate product track
larger scope
not suitable for immediate Chambers static-site workflow
```

## Recommended Immediate Approach For Chambers of AK

Use this sequence:

```text
1. Build Citadel of Kang as config-driven modules.
2. Create public-safe config schema.
3. Create a local/admin-only Theme Manager generator later.
4. Continue controlled PowerShell patch workflow for live updates.
5. After stable rollout, extract the theme into a fresh repo.
6. Build a proper authenticated admin dashboard only after extraction or as a separate admin project.
```

## Suggested Config Names

Theme-level schema:

```text
citadel-kang.schema.json
```

Chambers implementation config:

```text
chambers.config.json
```

Public generated config:

```text
assets/config/chambers-public.config.json
```

Local/private draft config that must not be deployed:

```text
.local/citadel-theme-manager.private.json
```

## Repository Rule

Theme Manager development may be planned here while Chambers of AK is the first implementation.

However:

```text
Do not place admin secrets in this repository.
Do not expose write tokens in public website files.
Do not create a public admin panel that pretends to be secure through front-end-only password checks.
```

A real web-based admin dashboard should eventually live in a separate repository or protected admin environment.

## Future Extraction Rule

When Citadel of Kang is moved to a fresh standalone repository, the Theme Manager plan should move with it as a first-class feature track.

The standalone theme repo should include:

```text
config schema
sample config
module enable/disable examples
local generator concept
admin dashboard roadmap
security notes
```

The standalone repo should not include Chambers-specific credentials, GTM/AdSense IDs, social links, legal article content or private implementation details.
