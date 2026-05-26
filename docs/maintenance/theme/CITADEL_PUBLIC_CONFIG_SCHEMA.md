# Citadel Public Config Schema

This document defines the first public-safe configuration direction for **Citadel of Kang**.

The purpose of the public config is to allow the theme and frontend modules to read safe display settings without exposing admin secrets, private tokens, client data or repository write access.

## Product Boundary

```text
Citadel of Kang = frontend theme pack and public module system.
Citadel Manager / Website CMS = future admin-only management product.
Chambers of AK = first implementation.
Client Portal = separate secure future product.
```

Public config belongs to the public website output. It is not an admin database and not a secure storage location.

## Security Rule

Public config may contain only values that are safe for every visitor to read.

Allowed examples:

```text
brand name
public tagline
public website URL
public logo paths
public social links
public theme settings
module enable/disable flags
public analytics IDs where appropriate
public AdSense publisher ID where appropriate
```

Forbidden examples:

```text
admin passwords
private API keys
repository write tokens
GitHub tokens
client names or case data
matter status
private documents
CMS backend credentials
server secrets
payment secrets
```

## Proposed Config Path

For a generic Citadel demo:

```text
assets/config/citadel-kang.sample.config.json
```

For Chambers of AK later:

```text
assets/config/chambers-public.config.json
```

The Chambers config should only be added to the production pipeline through a controlled rollout patch.

## Base Schema Shape

```json
{
  "schemaVersion": "0.1.0",
  "site": {
    "name": "Site Name",
    "tagline": "Site tagline",
    "url": "https://example.com",
    "language": "en"
  },
  "theme": {
    "selected": "citadel-of-kang",
    "defaultMode": "light",
    "accent": "#D4AF37",
    "fontDisplay": "Georgia, Times New Roman, serif",
    "fontBody": "Inter, system-ui, sans-serif"
  },
  "assets": {
    "logoLight": "",
    "logoDark": "",
    "favicon": "",
    "socialImage": ""
  },
  "navigation": {
    "primary": []
  },
  "footer": {
    "groups": [],
    "notice": ""
  },
  "social": {
    "links": []
  },
  "modules": {
    "themeToggle": true,
    "socialBar": true,
    "articleIndex": true,
    "readingTime": true,
    "readingProgress": true,
    "insightsFilter": true,
    "reveal": true,
    "conversionEvents": false
  },
  "articleIndex": {
    "minHeadings": 3,
    "activeMode": "latest-visible-heading",
    "showProgress": true,
    "showBackToTop": true
  },
  "readingTime": {
    "wordsPerMinute": 220,
    "minimumMinutes": 1,
    "label": "min read"
  },
  "readingProgress": {
    "mode": "article",
    "fallbackToDocument": true
  }
}
```

## Module Config Rules

Modules must no-op safely when:

```text
module flag is false
required markup is absent
config key is missing
page is not relevant
```

Modules should not throw errors because a config file is absent.

## Chambers of AK Implementation Notes

For Chambers, public config may later include:

```text
firm name
public tagline
website URL
public social links
Google Business Profile link
logo paths
selected Citadel theme
public module flags
```

It must not include:

```text
client case data
internal notes
private legal documents
admin credentials
private repo tokens
```

## Citadel Manager Future Role

In the future, Citadel Manager / Website CMS may provide an admin UI that writes public config files.

Correct flow:

```text
Admin edits settings securely in Citadel Manager.
Citadel Manager generates public-safe config.
Public website reads generated config.
```

Incorrect flow:

```text
Public website contains admin write tokens or fake frontend-only admin security.
```

## Rollout Rule

Do not wire production pages to a new public config until:

```text
1. Config shape is reviewed.
2. Modules handle missing config safely.
3. Chambers-specific values are checked.
4. PowerShell 7-compatible rollout patch is prepared.
5. Manual live checks pass.
```
