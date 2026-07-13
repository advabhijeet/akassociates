# Citadel Theme Lab

This directory contains dormant experiments, superseded duplicate implementations and neutral extraction work. It is excluded from the public GitHub Pages artifact through `_config.yml`.

## Runtime-asset archive

```text
docs/theme-lab/runtime-assets/
```

The original public paths and classifications are recorded in `assets/data/citadel-module-manifest.json`.

Files in this directory are not production dependencies and must not be linked or loaded by public HTML, CSS or JavaScript.

## Promotion rule

A theme-lab file may return to production only through a reviewed change that:

1. assigns one owner;
2. adds it to the module manifest;
3. adds an explicit loader/import;
4. adds syntax and runtime validation;
5. updates documentation and cache versions;
6. passes desktop, mobile, light and dark smoke checks.
