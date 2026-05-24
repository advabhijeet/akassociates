# Chambers of AK - Master Roadmap

Last consolidated: 2026-05-24

This is the single active roadmap for the Chambers of AK website, Citadel of Kang theme system, Citadel Manager / Website CMS product direction, article publishing workflow, SEO roadmap, thumbnail workflow and future Client Portal direction.

Use this file first before relying on older planning documents.

## Product Layers

### 1. Chambers of AK Public Website

Purpose: production static website for Chambers of AK.

Status: active production implementation.

Includes:

- public pages;
- practice pages;
- service pages;
- legal updates/articles;
- contact and enquiry flows;
- sitemap/feed;
- Search Console/SEO operations;
- Chambers-specific branding, copy, links and compliance content.

### 2. Citadel of Kang Theme Pack

Purpose: reusable frontend theme system.

Status: active inside Chambers of AK implementation, but not yet extracted into a standalone repository.

Includes:

- visual theme tokens;
- layout system;
- typography;
- navigation and footer patterns;
- cards/forms/components;
- article index;
- article footer;
- insights/listing modules;
- theme toggle;
- social bar;
- future reading-time and reading-progress modules;
- module contracts and accessibility rules.

Does not include:

- admin login;
- content database;
- secret keys;
- public write tokens;
- client portal private data;
- CMS backend.

### 3. Citadel Manager / Website CMS

Purpose: future admin-only website management product.

Status: planned; not yet built.

It will eventually provide a WordPress-like but custom management experience:

- admin login;
- dashboard;
- site settings;
- theme switching;
- theme customization;
- page editor;
- article/post editor;
- media manager;
- menu builder;
- footer builder;
- plugin/module manager;
- SEO settings;
- publish/preview workflow;
- roles;
- backup/export tools.

Security rule: do not create a public static /admin page protected only by frontend JavaScript. A real admin dashboard must use local-only tooling, GitHub authentication, a protected backend, or another proper authentication model.

### 4. Chambers Client Portal

Purpose: separate secure client/matter portal.

Status: future product; not part of the theme or public website.

Requires:

- real authentication;
- authorization;
- secure storage;
- audit logs;
- private client/matter/document controls.

## Current Production Baseline

Completed or substantially implemented:

1. Citadel Global Shell.
2. Blog / Legal Insights template.
3. Contact Page template.
4. Enquiry Page template.
5. General Content Page template.
6. Homepage template.
7. Practice / Services template.
8. MSME Recovery Hub v1.
9. Arbitration Hub v1.
10. Practice Hub Related Articles Block v1.
11. Footer Internal-Link Cleanup v1.
12. Footer mobile hierarchy fix.
13. Article Index module.
14. Article Footer module.
15. Pill/tag system.
16. Article publishing workflow v4.
17. Article social-preview/thumbnail rules.
18. Article encoding validator.
19. Batch 4 article thumbnails.
20. Batch 5 article thumbnails.
21. Standalone MSME Facilitation Council thumbnail.

## Immediate Roadmap

### Phase 0 - Repo and documentation hygiene

1. Sync local repo with latest main.
2. Remove or ignore local patch-backups.
3. Fix documentation encoding/mojibake.
4. Consolidate scattered roadmaps into this master roadmap.
5. Archive superseded roadmap/checkpoint documents.
6. Maintain an active documentation index.

### Phase 1 - Citadel Production Finalization v1

Goal: formally mark Citadel of Kang as production-active for Chambers of AK and audit the live implementation.

Tasks:

1. Reconcile Citadel documentation with current production reality.
2. Confirm active production modules.
3. Audit desktop/tablet/mobile layouts.
4. Audit light/dark mode.
5. Audit header, drawer, footer, topbar and theme toggle.
6. Audit Article Index and Article Footer.
7. Audit template hooks and module no-op behaviour.
8. Confirm no preview/internal notes are visible publicly.
9. Record remaining theme work.
10. Create a production finalization checklist.

### Phase 2 - Thumbnail Frame Consistency v1

Goal: make article thumbnails visible and consistent on every frame size.

Tasks:

1. Standardize 16:9 thumbnail frames.
2. Prevent unwanted cropping in article cards.
3. Use contain-style treatment where full image visibility matters.
4. Add premium neutral background/border where letterboxing appears.
5. Audit homepage insight cards.
6. Audit Legal Updates listing cards.
7. Audit filtered/list-mode result cards.
8. Audit article featured images.
9. Audit article footer recommended cards.
10. Audit mobile, tablet, desktop, light mode and dark mode.

### Phase 3 - Article Structure + Thumbnail Audit v1

Goal: audit all old articles and classify what needs migration.

Tasks:

1. Scan every updates/*.html article.
2. Identify missing featured thumbnails.
3. Identify generic social preview fallbacks.
4. Identify SVG social images.
5. Identify old article structures.
6. Identify missing article.article-body containers.
7. Identify missing data-article-category and data-article-tags.
8. Identify missing BlogPosting JSON-LD.
9. Identify missing BreadcrumbList JSON-LD.
10. Identify missing last-updated line.
11. Identify missing references/disclaimer.
12. Identify internal/publication notes visible to readers.
13. Identify encoding issues.
14. Classify articles into update batches.

### Phase 4 - Article cleanup batches

1. Batch A - metadata/social image fixes.
2. Batch B - featured thumbnail additions.
3. Batch C - old structure migration.
4. Batch D - last-updated/references/disclaimer normalization.
5. Batch E - remaining Batch 6 thumbnails.

Known Batch 6 pending items:

- Cheque Bounce Defence After Summons.
- Commercial Recovery Before Suit.
- RERA Refund / Interest / Delayed Possession.
- Arbitration Clause Checklist.
- Cheque Bounce 30 Days.
- Cheque Bounce Notice Limitation.
- MSME 45 Days Payment Rule.

### Phase 5 - Search Appearance / SEO Track

1. Breadcrumb Schema Rollout v1.
2. Article-to-Hub Internal Linking v1.
3. Sitemap Final Hygiene Pass v1.
4. Search Console Indexing Checklist Update.

### Phase 6 - Remaining Practice Authority Hubs

1. Commercial / Consumer Recovery Hub v1.
2. RERA / Property Hub v1.
3. Cheque Bounce Hub v1.
4. MSME article cluster expansion.
5. Arbitration article cluster expansion.

### Phase 7 - Conversion and Enquiry Optimization

1. Practice-specific enquiry flows.
2. MSME enquiry variant.
3. Arbitration enquiry variant.
4. Cheque Bounce enquiry variant.
5. RERA / Property enquiry variant.
6. Commercial Recovery enquiry variant.
7. Better checklist/download flows.
8. Thank-you / next-step page.

### Phase 8 - Config-Driven Citadel Foundation

Goal: prepare the public website for future manager/admin control without exposing secrets.

Tasks:

1. Create public-safe config schema.
2. Move social links to config.
3. Move navigation links to config.
4. Move footer links to config.
5. Move practice/service metadata to data files.
6. Move site identity settings to config.
7. Add module enable/disable settings.
8. Keep all config public-safe.

Possible future config file:

```text
assets/config/chambers-public.config.json
```

### Phase 9 - Local Admin Generator v1

Goal: first admin/content UI without creating a public attack surface.

Model:

- local tool;
- admin edits theme/content settings;
- tool exports JSON and/or PowerShell patch;
- admin applies patch manually.

Features:

1. Article form UI.
2. Page metadata editor.
3. Thumbnail/media selector.
4. SEO metadata fields.
5. Registry generator.
6. Sitemap/feed generator.
7. PowerShell patch exporter.
8. Desktop/mobile/dark preview.

### Phase 10 - GitHub-Authenticated Admin App

Goal: protected admin dashboard that can safely commit changes.

Features:

1. GitHub OAuth or GitHub App authentication.
2. Protected dashboard.
3. Draft/publish workflow.
4. Commit changes securely.
5. Media upload workflow.
6. Rollback/history.
7. Role protection.

### Phase 11 - Full Citadel Manager / Website CMS

Features:

1. Dashboard.
2. Page/article editor.
3. Theme Manager.
4. Media Manager.
5. SEO Manager.
6. Menu/Footer Builder.
7. Plugin/Module Manager.
8. Template Manager.
9. Publish/export/deploy adapter.
10. Backup/restore history.

### Phase 12 - Standalone Citadel of Kang Repository

Goal: extract reusable theme pack after Chambers implementation is stable.

Include:

- assets/css/themes/citadel-of-kang/**;
- assets/js/themes/citadel-of-kang/**;
- neutral demo pages;
- theme.json or equivalent schema;
- module usage docs;
- activation examples;
- accessibility checklist;
- performance checklist;
- changelog.

Exclude:

- Chambers articles;
- Chambers logo assets unless licensed for demo;
- GTM/AdSense/Analytics IDs;
- contact details;
- Chambers legal disclaimers;
- sitemap/feed files;
- Citadel Manager backend;
- Client Portal private code.

### Phase 13 - Client Portal Product

Goal: separate secure product for clients/matters.

Potential features:

1. Client login.
2. Matter records.
3. Document exchange.
4. Case updates.
5. Secure storage.
6. Audit logs.
7. Optional website/CMS connector.

## Active Principles

1. Chambers of AK remains the public website repository.
2. Citadel of Kang remains theme-pack focused.
3. Citadel Manager remains a separate future admin/CMS product.
4. Client Portal remains a separate secure product.
5. No public static admin panel with fake frontend-only security.
6. Public config must never contain passwords, tokens or write credentials.
7. Prefer reusable modules over page-by-page fixes.
8. Preserve Chambers black/white/gold identity and legal-compliance boundaries.
9. Keep old reference docs archived, not active.
