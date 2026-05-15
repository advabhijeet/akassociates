# Chambers of AK Platform v2 Roadmap

Last updated: 2026-05-15

This note records the agreed future direction for Chambers of AK after the current Citadel of Kang / static website architecture work is completed.

## Current Hosting Position

The current website can remain on GitHub Pages during the present phase.

GitHub Pages is still suitable for:

```text
- public law-firm website pages;
- static legal insight articles;
- SEO pages;
- reusable JavaScript modules such as Article Index and Article Footer;
- static feeds, sitemap and robots files;
- lightweight validation scripts and maintenance workflows.
```

Migration is not required merely to solve the current Article Index or Article Footer issues. Those can be solved through better reusable static modules, article metadata, registry validation and publishing workflow improvements.

## Future Platform Direction

The long-term target is not only a static website. The future direction is a law-firm web platform with:

```text
- mobile-friendly admin panel / CMS;
- database-backed article publishing;
- automated article publishing workflow without code editing;
- server-side search;
- native comments or controlled article feedback, if approved;
- user accounts / client login;
- case update dashboard;
- document status and document repository;
- dynamic forms and admin dashboard;
- secure private client communication workflows.
```

## Definitions

### Server-side search

Server-side search means search queries are handled by a backend/database instead of only by the browser.

For the future Chambers platform, this may search:

```text
- public articles;
- service pages;
- practice pages;
- private client case updates;
- private document records;
- internal status notes, if authorised;
- tags, categories, dates and matter types.
```

Server-side search becomes important when private client data, a large article library, user-specific dashboards or document repositories are added.

### Native comments

Native comments means the comment or feedback system is built into the Chambers platform itself, not embedded from a third-party tool.

A native system may include:

```text
- comment form;
- database storage;
- moderation queue;
- approve / reject / hide / reply controls;
- spam controls;
- user identity rules;
- admin panel.
```

For a law-firm website, public comments should be approached cautiously because of confidentiality, moderation, solicitation and legal-risk concerns. Safer options include article feedback forms, moderated comments, or private client-only comments inside a secure portal.

## Recommended Phases

### Phase 1: Current static architecture completion

Stay on GitHub Pages and finish the current website foundation:

```text
1. Citadel theme cleanup and stability.
2. Article Index automatic reusable module.
3. Article Footer automatic reusable module.
4. Central article metadata registry or manifest.
5. Registry validation script.
6. Article publishing workflow cleanup.
7. SEO / AdSense readiness and article-only ad policy.
8. Documentation sync after each accepted module.
```

### Phase 2: Hybrid platform

Keep the public website static where practical, but add backend-powered features for specific use cases:

```text
- stored contact/case enquiries;
- article CMS;
- admin dashboard;
- private client login;
- case status updates;
- document upload and tracking;
- server-side search for private/public data.
```

This phase may use a separate backend while public static pages remain stable.

### Phase 3: Full platform migration

Move to a dynamic platform when the user is ready to build admin, client and database features as first-class products.

Potential future stack candidates:

```text
Frontend: Next.js / React
Backend: Node.js, Django, Laravel, .NET or equivalent
Database: PostgreSQL
Auth: secure role-based login
Storage: private document storage
Hosting: managed platform suitable for secure app deployment
```

Final stack choice should be made later based on budget, security requirements, maintenance capacity and hosting costs.

## Security Requirements For Client Portal

A client portal must not be treated like a normal blog feature.

Minimum requirements:

```text
- HTTPS only;
- secure authentication;
- role-based access control;
- private document access rules;
- no public indexing of private URLs;
- audit logs;
- backup and recovery plan;
- data retention/deletion policy;
- admin controls;
- separation between public content and private client records.
```

The portal should be designed with confidentiality as the first principle.

## Decision Rule

Do not migrate the current site merely because static hosting has limitations.

Migrate only when one or more of the following become immediate implementation goals:

```text
- mobile CMS/admin panel;
- client login and matter dashboard;
- private document repository;
- database-backed article publishing;
- dynamic server-side search;
- secure comments/feedback with moderation;
- structured case update system.
```

Until then, improve the static architecture and keep public website delivery stable.
