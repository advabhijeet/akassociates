# Citadel Public Config Schema

Last implemented: **13 July 2026**

The production public-safe configuration is:

```text
assets/js/config/chambers-public-config.js
```

It initializes `window.ChambersPublicConfig` before any other runtime module.

## Security boundary

The file is delivered to every visitor. It may contain only public display and browser-integration values.

Allowed:

- brand and public website identity;
- public phone, email and social URLs;
- public logo and artwork paths;
- theme names and mode keys;
- module paths, IDs, versions and feature guards;
- analytics event names;
- EmailJS public identifiers;
- public registry and content defaults.

Forbidden:

- passwords or private keys;
- GitHub or repository write tokens;
- client identities, matter status or private documents;
- private backend credentials;
- payment secrets;
- admin session information.

## Production shape

```text
schemaVersion
release
baselineTag
canonical
site
contact
social
theme
analytics
integrations.emailjs
insights
modules
```

## Module contract

Each configured feature module records:

```text
id
path
version
guard
owner
activation
```

`assets/js/runtime/module-loader.js` uses these values and activates modules only when the required page markup or route is present.

## Failure behavior

The bootstrap loads the config first and then loads runtime modules sequentially. A missing config or runtime file marks:

```text
data-citadel-bootstrap="failed"
```

and reports the failed module in the browser console.

Feature modules must still no-op safely when their activation markup is absent.

## Machine-readable inventory

`assets/data/citadel-module-manifest.json` is the production inventory and validation source. It records runtime ownership, feature modules, styles, rollback files and theme-lab relocations.

## Change process

1. change the public config or manifest;
2. update the matching runtime/module file;
3. increment the relevant module version;
4. update public `style.css` and `script.js` cache key when shared behavior changes;
5. run `node tools/validate-citadel-runtime.js`;
6. run all repository validators;
7. perform desktop, mobile, light and dark browser smoke checks.
