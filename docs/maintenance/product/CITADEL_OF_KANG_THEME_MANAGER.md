# Citadel Manager and Website CMS Product Plan

This document records the planned admin-management product direction around **Citadel of Kang**.

Important product separation:

```text
Citadel of Kang = theme pack only.
Citadel Manager / Website CMS = separate admin-only website-management product.
Chambers of AK = first website implementation.
```

The user does not want to migrate to WordPress. The goal is to eventually build a custom WordPress-like management experience: a private admin interface where website owners can manage themes, pages, posts, plugins/modules, menus, settings and publishing without editing code manually.

## Product Separation

### 1. Citadel of Kang Theme Pack

Citadel of Kang is the theme layer only.

It should include:

```text
CSS tokens
layout system
typography
navigation styles
footer styles
component styles
optional theme modules
sample templates
module documentation
```

It should not include:

```text
admin login system
content database
user/client portal
private dashboard
site-owner account system
secret keys
repository write access
```

### 2. Citadel Manager / Website CMS

Citadel Manager is the future admin-only website-management product.

It should provide the WordPress-like control experience:

```text
admin login
dashboard
site settings
theme switching
theme customization
page editor
article/post editor
media manager
menu builder
footer builder
plugin/module manager
SEO settings
publish/preview workflow
user roles
site backup/export tools
```

This product should be able to manage Citadel of Kang and, later, other themes.

### 3. Website / Frontend

The website is the public-facing output.

It should:

```text
serve public pages only
load the selected theme
load safe generated public config
render published content
not expose admin controls to the public
not contain private admin credentials
```

Public visitors must not be able to access the admin interface.

## Product Vision

The long-term vision is similar in concept to WordPress, but custom-built and modular:

```text
Admin/CMS product manages the website.
Theme packs control visual presentation.
Plugin/module packs add features.
Public website renders the approved output.
```

Desired future capabilities:

```text
easily switch themes
install/enable/disable website modules
write content in an editor
add/remove pages
manage navigation menus
manage footer links
manage media files
configure SEO metadata
preview before publishing
publish to static hosting or other targets
```

## Important Security Boundary

Citadel of Kang must not ship a fake admin panel that is only protected by front-end JavaScript.

Reason:

```text
If an admin password, private key or write capability is placed in public HTML/JS, it is visible to everyone.
```

Correct model:

```text
Admin/CMS product authenticates the site owner securely.
Admin/CMS edits content, theme settings and plugin/module settings.
Admin/CMS writes or generates public-safe output.
Public website reads generated public files only.
```

Incorrect model:

```text
Public website contains secret admin credentials or direct write tokens.
Public /admin page uses only JavaScript password checks.
Client-side code has repository write tokens.
```

## Admin Access Rule

The management UI must be admin-access-only.

Possible future access models:

```text
private local tool
self-hosted admin app
GitHub-authenticated admin dashboard
hosted SaaS dashboard
CMS backend with proper user authentication
```

The public website should not expose the admin UI. If an admin route exists, it must be protected by real server-side/auth-provider access control.

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

## Recommended Product Architecture

```text
Citadel Manager / Website CMS
├─ Authentication
├─ Site Dashboard
├─ Content Editor
├─ Page Builder
├─ Media Manager
├─ Theme Manager
├─ Plugin/Module Manager
├─ SEO Manager
├─ Publishing Engine
└─ Export/Deploy Adapter

Theme Packs
├─ Citadel of Kang
├─ Future Theme A
└─ Future Theme B

Plugin/Module Packs
├─ Article Index
├─ Insights Filter
├─ Social Bar
├─ Forms
├─ SEO Schema
├─ Analytics Hooks
└─ Client Portal Connector later

Public Website
├─ generated pages/content
├─ selected theme files
├─ public-safe config
└─ static assets
```

## Theme Manager Features

Theme Manager should manage the visual and structural settings of a selected theme.

For Citadel of Kang, it may manage:

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
analytics/ad public IDs where appropriate
```

## CMS Features

The CMS should manage content and pages.

Core CMS features:

```text
create page
edit page
delete page
create article/post
edit article/post
draft/publish status
preview before publish
slug/permalink editor
category/tag editor
SEO title/meta description editor
canonical URL editor
cover image/media selection
related links
sitemap/feed generation
```

## Plugin / Module System

The CMS should eventually support plugins/modules like WordPress.

Initial module categories:

```text
article index
insights filter
social links/forms
SEO/schema tools
analytics/conversion hooks
review/testimonial block if legally appropriate
contact/case enquiry forms
newsletter module
client portal connector later
```

Plugin/module rules:

```text
modules must be enable/disable capable
modules must expose safe settings
modules must not require editing theme core
modules must not expose secrets in public config
modules should have default frontend assets and admin settings schema
```

## Theme Switching

The future CMS should allow theme switching.

Conceptual model:

```text
Selected theme = Citadel of Kang
Theme settings = config JSON/database record
Website output = generated public pages using selected theme
```

Future theme packs should follow a common contract:

```text
theme.json
tokens.css
templates
components
modules
preview image
default settings schema
```

## Config-First Development Path

Before a full CMS exists, Citadel of Kang should become config-driven.

Public-safe configuration file example:

```text
assets/config/chambers-public.config.json
```

Public-safe config may include:

```json
{
  "brand": {
    "name": "Chambers of AK",
    "tagline": "Advocates & Legal Consultants",
    "website": "https://chambersofak.in"
  },
  "theme": {
    "selected": "citadel-of-kang",
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

## Development Stages

### Stage 1 — Local Admin Generator

Best for early development.

```text
Admin opens a local manager tool.
Admin edits theme/content settings.
Tool exports JSON and/or PowerShell patch.
Admin applies patch manually.
```

This fits the current Chambers workflow and avoids a public admin attack surface.

### Stage 2 — GitHub Authenticated Admin App

Later, a real dashboard can authenticate securely and commit changes.

Possible approaches:

```text
GitHub OAuth app
GitHub App installation
serverless backend that handles auth securely
admin-only dashboard in a separate private/admin repository
```

This must not expose private tokens in public site code.

### Stage 3 — Hosted Website CMS Product

Long term, Citadel Manager may become a commercial Website CMS product.

Possible model:

```text
User logs into Citadel Manager.
User creates/manages a website.
User selects a theme.
User writes content.
User installs modules/plugins.
System publishes static output or deploys to selected host.
```

This would be a separate product from Citadel of Kang theme pack.

## Relationship With Client Portal

The future Chambers client portal is separate.

Correct product relationship:

```text
Citadel of Kang = theme pack.
Citadel Manager / Website CMS = admin/content/theme management product.
Chambers Client Portal = secure client/matter access product.
```

The Client Portal may later connect to the CMS through a module or link, but it is not merely a theme or CMS plugin because it contains private client/case data and needs real authentication, authorization, secure storage and audit logs.

## Recommended Immediate Approach For Chambers of AK

Use this sequence:

```text
1. Build Citadel of Kang as a reusable modular theme.
2. Make the theme config-driven.
3. Keep Chambers-specific data separate.
4. Build a local/admin-only manager concept later.
5. Continue controlled PowerShell patch workflow for live updates.
6. After stable rollout, extract the theme into a fresh repo.
7. Plan Citadel Manager / Website CMS as a separate future product.
```

## Repository Rule

Theme Manager and Website CMS planning may be documented here while Chambers of AK is the first implementation.

However:

```text
Do not place admin secrets in this repository.
Do not expose write tokens in public website files.
Do not create a public admin panel that pretends to be secure through front-end-only password checks.
Do not merge the CMS/admin product into the theme pack.
```

A real web-based admin dashboard should eventually live in a separate repository or protected admin environment.

## Future Extraction Rule

When Citadel of Kang is moved to a fresh standalone repository, the theme should move as a theme pack only.

The future standalone theme repo should include:

```text
config schema
sample config
theme templates
module enable/disable examples
usage docs
security notes for public config
```

The future standalone theme repo should not include:

```text
Citadel Manager admin app
CMS backend
private authentication system
Chambers-specific credentials
GTM/AdSense IDs
social links
legal article content
private implementation details
```

Citadel Manager / Website CMS should be planned as its own future repository/product.
