# Article HTML Template v2

This document is the current reusable HTML template for future Chambers of AK legal insight articles under `updates/`.

Use this with:

```text
docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md
docs/maintenance/ARTICLE_REUSABLE_MODULES.md
assets/data/insights-registry.json
```

## Current Publishing Architecture

New article pages should rely on the reusable Citadel modules already loaded by the site shell:

```text
Article metadata source: assets/data/insights-registry.json
Article Index: auto-loaded from assets/js/script.js when article.article-body has at least 3 h2 headings
Article Footer: auto-loaded from assets/js/script.js on article.article-body pages
Pill styling: assets/css/themes/citadel-of-kang/modules/pills.css
```

Do not add manual Article Index script tags to new article pages.
Do not add manual Article Footer HTML to article pages.
Do not put new article metadata back into `assets/js/script.js`.

## Usage

1. Copy the HTML template below.
2. Replace all `{{PLACEHOLDER}}` values.
3. Save the final article under:

```text
updates/{{ARTICLE_SLUG}}.html
```

4. Add a matching entry to:

```text
assets/data/insights-registry.json
```

5. Add the article URL to `sitemap.xml`.
6. Add an item to `feed.xml` and update the channel `lastBuildDate`.
7. Add contextual internal links only where useful.
8. Run the validation commands at the end of this document.

## Placeholder Checklist

Replace:

```text
{{ARTICLE_TITLE}}
{{ARTICLE_SHORT_TITLE}}
{{ARTICLE_SLUG}}
{{ARTICLE_DESCRIPTION}}
{{ARTICLE_CATEGORY}}
{{ARTICLE_CATEGORY_LABEL}}
{{ARTICLE_DATE_ISO}}
{{ARTICLE_DATE_RFC_822}}
{{ARTICLE_MONTH_YEAR}}
{{ARTICLE_HERO_EYEBROW}}
{{ARTICLE_HERO_PARAGRAPH}}
{{ARTICLE_TAGS_COMMA}}
{{WHY_THIS_MATTERS}}
{{WHEN_THIS_ARISES}}
{{KEY_DATES_OR_TIMELINE}}
{{DOCUMENTS_LIST}}
{{PROCEDURE_OR_ROUTE}}
{{COMMON_MISTAKES_LIST}}
{{ENQUIRY_FORMAT_LIST}}
{{RELATED_LINKS}}
{{OFFICIAL_REFERENCES}}
{{CTA_SUMMARY}}
```

## Registry JSON Entry Template

Add the article near the top of `assets/data/insights-registry.json`:

```json
{
  "href": "updates/{{ARTICLE_SLUG}}.html",
  "category": "{{ARTICLE_CATEGORY_LABEL}}",
  "title": "{{ARTICLE_SHORT_TITLE}}",
  "excerpt": "{{ARTICLE_DESCRIPTION}}",
  "date": "{{ARTICLE_MONTH_YEAR}}",
  "thumbnail": "assets/img/citadel/citadel-thumb-{{THUMBNAIL_KEY}}.webp",
  "tags": [
    "{{TAG_1}}",
    "{{TAG_2}}",
    "{{TAG_3}}"
  ]
}
```

Rules:

- `href` must point to the final article file.
- `category` should be one of the standard content categories unless a new category is deliberately approved.
- `title` should be card-friendly and may be shorter than the page `h1`.
- `excerpt` should be short enough for cards and feeds.
- `thumbnail` is optional only when the shared thumbnail inference is acceptable.
- `tags` should use consistent title case and should not be overloaded.

## Standard Categories

Use these category labels unless there is a clear reason to add another:

```text
Case Brief
Checklist
Practical Guide
Procedure Note
Legal Update
```

The Citadel pill system treats all category pills consistently. Do not create one-off category colors for individual categories.

## Tag Guidance

Use tags for topic discovery, not as full sentences. Examples:

```text
Property
Due Diligence
Title Search
MSME
MSEFC
Arbitration
Section 34
NI Act
Section 138
RERA
Commercial Recovery
SARFAESI
DRT
Supreme Court
High Court
```

Long statutory tags such as `Transfer of Property Act`, `Registration Act`, `Order XIII-A`, `Rule 9(4)` and `Section 138` are allowed. The Citadel pill module handles long technical tags separately while keeping them within the tag-pill family.

## HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5GMHQTJJ');</script>
  <!-- End Google Tag Manager -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="google-site-verification" content="google3164979181871a1d.html">
  <meta name="author" content="Chambers of AK - Advocates &amp; Legal Consultants">
  <meta name="theme-color" content="#111111">
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <title>{{ARTICLE_TITLE}}</title>
  <meta name="description" content="{{ARTICLE_DESCRIPTION}}">
  <link rel="canonical" href="https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html">
  <meta property="og:title" content="{{ARTICLE_TITLE}}">
  <meta property="og:description" content="{{ARTICLE_DESCRIPTION}}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html">
  <meta property="og:site_name" content="Chambers of AK">
  <meta property="og:image" content="https://chambersofak.in/assets/img/social-preview.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Chambers of AK logo - Advocates and Legal Consultants">
  <meta property="article:published_time" content="{{ARTICLE_DATE_ISO}}">
  <meta property="article:modified_time" content="{{ARTICLE_DATE_ISO}}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ARTICLE_TITLE}}">
  <meta name="twitter:description" content="{{ARTICLE_DESCRIPTION}}">
  <meta name="twitter:image" content="https://chambersofak.in/assets/img/social-preview.png">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon-512.png" type="image/png" sizes="512x512">
  <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
  <link rel="icon" href="/favicon-96.png" type="image/png" sizes="96x96">
  <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="../assets/css/style.css?v=theme-package-5">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html#article",
    "headline": "{{ARTICLE_TITLE}}",
    "description": "{{ARTICLE_DESCRIPTION}}",
    "image": "https://chambersofak.in/assets/img/social-preview.png",
    "author": {
      "@type": "Person",
      "name": "Abhijeet Kumar",
      "url": "https://chambersofak.in/about.html"
    },
    "publisher": {
      "@type": "LegalService",
      "name": "Chambers of AK",
      "url": "https://chambersofak.in/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chambersofak.in/assets/img/logo-navbar.png"
      }
    },
    "datePublished": "{{ARTICLE_DATE_ISO}}",
    "dateModified": "{{ARTICLE_DATE_ISO}}",
    "mainEntityOfPage": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html",
    "inLanguage": "en-IN"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html#breadcrumb",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://chambersofak.in/"},
      {"@type": "ListItem", "position": 2, "name": "Insights", "item": "https://chambersofak.in/legal-updates.html"},
      {"@type": "ListItem", "position": 3, "name": "{{ARTICLE_SHORT_TITLE}}", "item": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html"}
    ]
  }
  </script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GMHQTJJ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <div class="s">
    <nav class="nav">
      <a class="nav-brand" href="/" aria-label="Chambers of AK homepage"><img class="nav-logo" src="../assets/img/logo-navbar.png?v=secondary-1" alt="Chambers of AK"></a>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../practice.html">Practice</a></li>
        <li><a href="../case-enquiry.html">Enquiry</a></li>
        <li><a href="../courts.html">Courts</a></li>
        <li><a class="active" href="../legal-updates.html">Insights</a></li>
        <li><a href="../disclaimer.html">Disclaimer</a></li>
      </ul>
      <a class="nav-cta" href="../contact.html">Contact</a>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </nav>

    <main>
      <section class="page-hero">
        <div class="hero-eyebrow">{{ARTICLE_HERO_EYEBROW}}</div>
        <h1>{{ARTICLE_TITLE}}</h1>
        <p>{{ARTICLE_HERO_PARAGRAPH}}</p>
      </section>

      <section class="sec">
        <div class="sec-label">{{ARTICLE_CATEGORY_LABEL}}</div>
        <article class="article-body" data-article-category="{{ARTICLE_CATEGORY_LABEL}}" data-article-tags="{{ARTICLE_TAGS_COMMA}}">
          <div class="article-meta">
            <span>Published {{ARTICLE_MONTH_YEAR}}</span>
            <span>{{ARTICLE_CATEGORY_LABEL}}</span>
          </div>

          <p class="article-summary">{{ARTICLE_DESCRIPTION}}</p>

          <h2>Why This Topic Matters</h2>
          <p>{{WHY_THIS_MATTERS}}</p>

          <h2>When This Usually Arises</h2>
          <p>{{WHEN_THIS_ARISES}}</p>

          <h2>Key Dates And Timeline</h2>
          <p>{{KEY_DATES_OR_TIMELINE}}</p>

          <h2>Documents To Keep Ready</h2>
          <ul>
            {{DOCUMENTS_LIST}}
          </ul>

          <h2>Procedure Or Forum Route</h2>
          <p>{{PROCEDURE_OR_ROUTE}}</p>

          <h2>Common Mistakes</h2>
          <ul>
            {{COMMON_MISTAKES_LIST}}
          </ul>

          <h2>Enquiry Format</h2>
          <p>For a structured first review, prepare the following details:</p>
          <ul>
            {{ENQUIRY_FORMAT_LIST}}
          </ul>

          <h2>Useful Internal Pages</h2>
          <div class="article-links">
            {{RELATED_LINKS}}
          </div>

          <h2>Official References</h2>
          <p>{{OFFICIAL_REFERENCES}}</p>

          <div class="article-cta">
            <strong>Preparing an enquiry?</strong>
            <p>{{CTA_SUMMARY}}</p>
            <a class="btn btn-gold" href="../case-enquiry.html">Start Case Enquiry</a>
          </div>

          <div class="article-note">This note is for general information only. It is not legal advice, advertisement or solicitation. Legal strategy depends on facts, documents, limitation, forum procedure and the current stage of the matter.</div>
        </article>
      </section>
    </main>

    <footer class="foot">
      <div class="foot-copy">&copy; 2026 Chambers of AK - Advocates &amp; Legal Consultants</div>
      <div class="foot-links foot-links-grouped" aria-label="Footer navigation">
        <div class="foot-link-group"><div class="foot-link-heading">Main</div><a href="../about.html">About</a><a href="../practice.html">Practice</a><a href="../case-enquiry.html">Case Enquiry</a><a href="../contact.html">Contact</a></div>
        <div class="foot-link-group"><div class="foot-link-heading">Resources</div><a href="../legal-updates.html">Insights</a><a href="../document-checklists.html">Document Checklists</a><a href="../faq.html">FAQ</a><a href="../process.html">Process</a></div>
        <div class="foot-link-group"><div class="foot-link-heading">Legal</div><a href="../disclaimer.html">Disclaimer</a><a href="../privacy-policy.html">Privacy Policy</a><a href="../terms.html">Terms</a></div>
      </div>
      <div class="foot-disc">For informational purposes only. Does not constitute legal advice or solicitation. Bar Council of India. Initial communication does not create an advocate-client relationship.</div>
    </footer>
  </div>
  <script src="../assets/js/script.js?v=citadel-live-7"></script>
</body>
</html>
```

## Important Module Rules

The following are intentionally absent from the template:

```html
<script src="../assets/js/themes/citadel-of-kang/article-index-direct-rail.js"></script>
```

```html
<section class="article-standard-footer">...</section>
```

The global script handles these automatically.

## Sitemap Template

```xml
<url><loc>https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html</loc><lastmod>{{ARTICLE_DATE_ISO}}</lastmod></url>
```

## Feed Item Template

```xml
<item>
  <title>{{ARTICLE_TITLE}}</title>
  <link>https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html</link>
  <guid isPermaLink="true">https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html</guid>
  <pubDate>{{ARTICLE_DATE_RFC_822}}</pubDate>
  <category>{{ARTICLE_CATEGORY_LABEL}}</category>
  <description>{{ARTICLE_DESCRIPTION}}</description>
</item>
```

## Validation Commands

Run before committing:

```powershell
node --check assets/js/script.js
node --check assets/js/themes/citadel-of-kang/article-index-direct-rail.js
node --check assets/js/themes/citadel-of-kang/article-footer.js
node --check tools/validate-insights-registry.js
node -e "JSON.parse(require('fs').readFileSync('assets/data/insights-registry.json','utf8')); console.log('insights registry JSON ok')"
node tools/validate-insights-registry.js --strict
git diff --check
[xml](Get-Content sitemap.xml -Raw)
[xml](Get-Content feed.xml -Raw)
```

## Social Distribution Templates

### LinkedIn Page

```text
New legal insight published by Chambers of AK:

{{ARTICLE_TITLE}}

{{ARTICLE_DESCRIPTION}}

Read: https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html

For general information only. Not legal advice or solicitation.
```

### WhatsApp Channel

```text
New Legal Insight | Chambers of AK

{{ARTICLE_TITLE}}

{{ARTICLE_DESCRIPTION}}

Read:
https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html

For general information only. Not legal advice or solicitation.
```

## Citadel Insights Directory note

After Article Publishing Template v2, the canonical way to publish an article card is the registry object in:

```text
assets/data/insights-registry.json
```

The `legal-updates.html` directory/listing is rendered by the Citadel Insights Directory section module. Any static card template in this document is retained only as fallback/reference markup and should not be treated as the primary publishing source.

## Registry-First Directory Note

Do not add a full manual card for each new article to the Latest Articles grid in `legal-updates.html`. The Citadel Insights Directory section renders latest cards from `assets/data/insights-registry.json`. Update the registry, sitemap, and feed instead.
