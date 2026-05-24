# Citadel Template System Roadmap

Last updated: 2026-05-17

This document defines the next architecture layer for the Citadel theme after the Blog Page module migration.

Citadel is the reusable theme/template system. Chambers of AK is one implementation that currently uses Citadel for a premium legal website. Future work should avoid page-by-page fixes when a reusable template, layout, section, data registry or component module is the correct abstraction.

## Operating Principle

```text
Citadel = reusable theme, templates, modules, layout rules and data-driven behaviour
Chambers of AK = brand/content/data implementation of Citadel
```

A website may label the same Citadel template differently. For example, the Citadel Blog Page can be displayed as:

```text
Blog
News
Updates
Insights
Legal Insights
Resources
Knowledge Centre
Journal
```

The template name should remain generic at Citadel level. The public page label should remain site-specific.

## Mandatory Compatibility Rule

Every Citadel template, section and component must be checked against:

```text
- desktop layout;
- mobile layout;
- light mode;
- dark mode;
- keyboard/focus states where interactive;
- long text labels and legal/statutory terms;
- no-JavaScript fallback where the page depends on client rendering.
```

## Reference Material Rule

External theme references, including the user's NewsPaper 12 theme documents, may be used as architectural and UX references for layout taxonomy, content hierarchy and module planning. Do not copy proprietary code, assets, images or exact protected layouts. Extract reusable concepts only, such as:

```text
- header/footer structure;
- blog/news listing patterns;
- category and tag layouts;
- responsive card hierarchy;
- editorial section ordering;
- template taxonomy;
- theme options and layout variants.
```

## Current Citadel Modules

```text
assets/js/themes/citadel-of-kang/modules/blog/blog-page.js
assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js
assets/js/themes/citadel-of-kang/modules/pages/contact-page.js
assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js
assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js
assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js
assets/js/themes/citadel-of-kang/article-index-direct-rail.js
assets/js/themes/citadel-of-kang/article-footer.js
assets/css/themes/citadel-of-kang/modules/pills.css
assets/css/themes/citadel-of-kang/modules/article-index.css
```

Current data source:

```text
assets/data/insights-registry.json
```


## Current Implementation Checkpoint

As of 2026-05-17, the following Citadel modules are implemented and pushed on `main`:

- Blog Page Template v1: `assets/js/themes/citadel-of-kang/modules/blog/blog-page.js`
- Global Shell v1: `assets/js/themes/citadel-of-kang/modules/shell/global-shell.js`
- Enquiry/Form Module v1: `assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js`
- Contact Page Template v1: `assets/js/themes/citadel-of-kang/modules/pages/contact-page.js`
- Enquiry Page Template v1: `assets/js/themes/citadel-of-kang/modules/pages/enquiry-page.js`
- Latest Insights Section: `assets/js/themes/citadel-of-kang/modules/sections/latest-insights-section.js`
- Insights Directory Section: `assets/js/themes/citadel-of-kang/modules/sections/insights-directory-section.js`
- Article Index: `assets/js/themes/citadel-of-kang/article-index-direct-rail.js`
- Article Footer: `assets/js/themes/citadel-of-kang/article-footer.js`
- Pill System: `assets/css/themes/citadel-of-kang/modules/pills.css`

The next architecture step should not start until documentation is clean and the repository is confirmed clean. After this documentation checkpoint, the General Content Page Template was the next template target for policy, FAQ, process, courts and document-checklist pages.

## Target Template Families

### 1. Global Shell Template

Purpose: site-wide chrome and structural wrappers.

Modules:

```text
Header / navbar
Mobile menu
Footer
Breadcrumbs
SEO/social metadata helpers
Theme mode compatibility
Global CTA strip
Legal/compliance disclaimer strip
```

Target paths:

```text
assets/js/themes/citadel-of-kang/modules/shell/header.js
assets/js/themes/citadel-of-kang/modules/shell/footer.js
assets/css/themes/citadel-of-kang/modules/shell.css
```

### 2. Homepage Template

Purpose: reusable landing/homepage pattern.

Sections:

```text
Hero
Trust/positioning cards
Practice/service highlights
Latest blog/news/insights section
Process preview
CTA/enquiry strip
Compliance disclaimer
```

Target paths:

```text
assets/js/themes/citadel-of-kang/modules/pages/home-page.js
assets/css/themes/citadel-of-kang/modules/home-page.css
```

### 3. Blog / News / Insights Template

Status: started by `assets/js/themes/citadel-of-kang/modules/blog/blog-page.js
assets/js/themes/citadel-of-kang/modules/forms/enquiry-form.js`.

Purpose: listing pages for articles, news, insights and resources.

Capabilities:

```text
Latest section
Category sections
Tag sections
Search/filter controls
View All mode
Pagination
Featured / hot picks / trending / most-read slots in future
Registry-first data source
No duplicate cards
Default per-section limits
```

### 4. Article Template

Purpose: individual long-form content pages.

Modules:

```text
Article hero
Article Index
Reading progress
Article Footer
Tags / related reads
Previous / next navigation
Structured data
Internal link blocks
```

Current modules already exist; future work should consolidate documentation and remove old preview drift.

### 5. Practice / Services Template

Purpose: practice-area and service landing pages.

Sections:

```text
Practice hero
Scope of work
Documents needed
Process / timeline
Related insights
Related services
FAQ
Enquiry CTA
Jurisdiction/service-area notes
```

Target paths:

```text
assets/js/themes/citadel-of-kang/modules/pages/practice-page.js
assets/css/themes/citadel-of-kang/modules/practice-page.css
```

### 6. About / Team Template

Purpose: firm profile, team, founder and professional identity pages.

Sections:

```text
Firm overview
Values / positioning
Team cards
Credentials / memberships
Office / jurisdiction notes
CTA
```

### 7. Contact Template

Purpose: contact, office, maps, communication policy and enquiry routing.

Sections:

```text
Contact cards
Office/address block
Email/phone/WhatsApp action block
Map block where appropriate
Consultation/enquiry CTA
Non-solicitation and confidentiality notes
```

### 8. Enquiry / Lead-Capture Template

Purpose: structured intake pages.

Sections:

```text
Case-type selector
Document checklist guidance
Copyable enquiry templates
Dynamic intake form
Privacy and no-client-relationship warnings
Next-step instructions
```

### 9. General Content Page Template

Purpose: policies, courts, FAQ, process, document checklists and other static pages.

Sections:

```text
Page hero
Content blocks
Accordion/FAQ blocks
Callout cards
Internal link blocks
CTA footer
```

## Shared Section Library

Reusable section modules should support any page template:

```text
Hero section
Card grid
Feature grid
CTA strip
FAQ accordion
Timeline/process steps
Document checklist block
Related articles block
Related services block
Profile/team cards
Stats/trust strip
Breadcrumb row
Search/filter controls
Pagination controls
```

## Shared Data Registries

Current registry:

```text
assets/data/insights-registry.json
```

Future registry candidates:

```text
assets/data/navigation.json
assets/data/footer-links.json
assets/data/practice-areas.json
assets/data/services.json
assets/data/team.json
assets/data/faqs.json
assets/data/site-settings.json
```

## Migration Order

Recommended order after the Blog Page module is visually accepted:

```text
1. Record this roadmap.
2. Extract Header/Navbar module.
3. Extract Footer module.
4. Create Homepage template module.
5. Create Practice/Services template module.
6. Create Contact template module.
7. Create Enquiry template module.
8. Create General Content template module.
9. Consolidate Article template docs and preview files.
10. Add validation for required data attributes and registries.
```


## Completed Migration Status

Completed:

- Roadmap recorded.
- Global shell behaviour extracted into a Citadel shell module.
- Blog / Legal Insights page promoted to a reusable Blog Page module.
- Contact form and copy-template behaviour extracted into the Enquiry/Form module.
- Contact page promoted to a reusable Contact Page Template.
- Case Enquiry page promoted to a reusable Enquiry Page Template.
- Legal documentation was updated to account for structured contact forms, EmailJS direct-send behaviour, and third-party enquiry delivery tools.

Remaining:

- Homepage Template.
- Practice / Services Template.
- About / Team Template.
- Navigation/footer/site-settings data registries.
- Article template documentation consolidation and old-preview cleanup.
- Validation for required template hooks and data registries.

## Validation Expectations

Every template-level patch should run at minimum:

```text
node --check assets/js/script.js
node tools/validate-insights-registry.js --strict
git diff --check
```

Where a new module is added:

```text
node --check <new-module-path>
```

Where data files are added:

```text
node -e "JSON.parse(require('fs').readFileSync('<data-file>','utf8')); console.log('json ok')"
```

## Anti-Patterns

Do not:

```text
- solve a reusable page problem by editing only one public page;
- duplicate cards manually when registry rendering exists;
- mix rendering, filtering and pagination across unrelated controllers;
- use Chambers-specific naming in Citadel-level modules;
- introduce styling that has not been checked in both light and dark mode;
- introduce layout changes that are not checked on mobile.
```

## Global Shell v1 Implementation

The first Global Shell implementation moves site-wide chrome behaviour out of the monolithic global script and into:

```text
assets/js/themes/citadel-of-kang/modules/shell/global-shell.js
```

Current v1 scope:

```text
- topbar social row and live clock;
- theme toggle wiring;
- mobile menu / drawer behaviour;
- footer social row;
- smooth anchor links;
- active navigation state.
```

Future shell work should move shell data to `navigation.json`, `footer-links.json` and `site-settings.json`, then split header/footer/theme-toggle behaviours into smaller modules only after v1 is stable.
