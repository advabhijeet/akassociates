# Article HTML Template v3

This document is the reusable Citadel article template standard for Chambers of AK legal insight articles under `updates/`.

Use this with:

```text
docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md
docs/maintenance/ARTICLE_REUSABLE_MODULES.md
assets/data/insights-registry.json
```

## Current Publishing Architecture

New article pages must rely on reusable Citadel modules already loaded by the site shell:

```text
Article metadata source: assets/data/insights-registry.json
Article Index: auto-loaded from assets/js/script.js when article.article-body has at least 3 h2 headings
Article Footer: auto-loaded from assets/js/script.js on article.article-body pages
Pill styling: assets/css/themes/citadel-of-kang/modules/pills.css
```

Do not add manual Article Index script tags.
Do not add manual Article Footer HTML.
Do not add new article metadata to `assets/js/script.js`.

## Non-Negotiable Social Preview Rule

Every article must include Open Graph and X/Twitter Card metadata with a direct public raster image URL.

Use PNG, JPG, JPEG or WEBP for social card images. Do not use SVG for `og:image`, `twitter:image`, JSON-LD `image` or registry thumbnails intended for social/link previews.

Required fields:

```html
<meta property="og:title" content="{{ARTICLE_TITLE}}">
<meta property="og:description" content="{{ARTICLE_DESCRIPTION}}">
<meta property="og:image" content="https://chambersofak.in/assets/img/citadel/{{ARTICLE_SOCIAL_IMAGE}}">
<meta property="og:url" content="https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ARTICLE_TITLE}}">
<meta name="twitter:description" content="{{ARTICLE_DESCRIPTION}}">
<meta name="twitter:image" content="https://chambersofak.in/assets/img/citadel/{{ARTICLE_SOCIAL_IMAGE}}">
```

Also keep the supporting tags:

```html
<meta property="og:type" content="article">
<meta property="og:site_name" content="Chambers of AK">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="675">
<meta property="og:image:alt" content="{{ARTICLE_IMAGE_ALT}}">
<link rel="canonical" href="https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html">
```

## Thumbnail / Image Standard

Article thumbnails must be reader-facing, topic-relevant and social-card compatible.

Rules:

- Use painted / illustrated editorial style where possible.
- Use the official AK mark as the branding element where branding is included.
- Make the image visually related to the article topic.
- Do not use random legal props merely for decoration.
- Do not use copyrighted news photographs.
- Do not depict real judges, real identifiable persons or inflammatory imagery.
- Use a 16:9 image, preferably 1200 × 675 px or 1920 × 1080 px.
- Use `.png`, `.jpg`, `.jpeg` or `.webp` for social preview compatibility.
- The same raster image should normally be used for:
  - `og:image`
  - `twitter:image`
  - BlogPosting JSON-LD `image`
  - article featured image
  - `assets/data/insights-registry.json` thumbnail

## Placeholder Checklist

Replace:

```text
{{ARTICLE_TITLE}}
{{ARTICLE_SHORT_TITLE}}
{{ARTICLE_SLUG}}
{{ARTICLE_DESCRIPTION}}
{{ARTICLE_SOCIAL_IMAGE}}
{{ARTICLE_IMAGE_ALT}}
{{ARTICLE_CATEGORY_LABEL}}
{{ARTICLE_DATE_ISO}}
{{ARTICLE_MONTH_YEAR}}
{{ARTICLE_LAST_UPDATED}}
{{ARTICLE_HERO_EYEBROW}}
{{ARTICLE_HERO_PARAGRAPH}}
{{ARTICLE_TAGS_COMMA}}
{{ARTICLE_BODY}}
{{RELATED_LINKS}}
{{REFERENCES}}
{{DISCLAIMER}}
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
  "thumbnail": "assets/img/citadel/{{ARTICLE_SOCIAL_IMAGE}}",
  "tags": ["{{TAG_1}}", "{{TAG_2}}", "{{TAG_3}}"]
}
```

Registry thumbnail must also be raster, not SVG, unless the image is only a non-social fallback and the article itself uses a separate raster social image.

## Standard Categories

Use these labels unless a new category is deliberately approved:

```text
Case Brief
Checklist
Practical Guide
Procedure Note
Legal Update
Constitutional Law
Criminal Law
Arbitration
```

## HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5GMHQTJJ');</script>
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
  <meta property="og:image" content="https://chambersofak.in/assets/img/citadel/{{ARTICLE_SOCIAL_IMAGE}}">
  <meta property="og:url" content="https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Chambers of AK">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta property="og:image:alt" content="{{ARTICLE_IMAGE_ALT}}">

  <meta property="article:published_time" content="{{ARTICLE_DATE_ISO}}">
  <meta property="article:modified_time" content="{{ARTICLE_DATE_ISO}}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ARTICLE_TITLE}}">
  <meta name="twitter:description" content="{{ARTICLE_DESCRIPTION}}">
  <meta name="twitter:image" content="https://chambersofak.in/assets/img/citadel/{{ARTICLE_SOCIAL_IMAGE}}">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon-512.png" type="image/png" sizes="512x512">
  <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
  <link rel="icon" href="/favicon-96.png" type="image/png" sizes="96x96">
  <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="../assets/css/style.css?v=theme-package-7">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html#article",
    "headline": "{{ARTICLE_TITLE}}",
    "description": "{{ARTICLE_DESCRIPTION}}",
    "image": "https://chambersofak.in/assets/img/citadel/{{ARTICLE_SOCIAL_IMAGE}}",
    "author": {"@type": "Person", "name": "Abhijeet Kumar", "url": "https://chambersofak.in/about.html"},
    "publisher": {"@type": "LegalService", "name": "Chambers of AK", "url": "https://chambersofak.in/", "logo": {"@type": "ImageObject", "url": "https://chambersofak.in/assets/img/logo-navbar.png"}},
    "datePublished": "{{ARTICLE_DATE_ISO}}",
    "dateModified": "{{ARTICLE_DATE_ISO}}",
    "mainEntityOfPage": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html",
    "inLanguage": "en-IN",
    "articleSection": "{{ARTICLE_CATEGORY_LABEL}}"
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
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GMHQTJJ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <div class="s">
    <nav class="nav">
      <a class="nav-brand" href="/" aria-label="Chambers of AK homepage"><img class="nav-logo" src="../assets/img/logo-navbar.png?v=secondary-1" alt="Chambers of AK"></a>
      <ul class="nav-links"><li><a href="/">Home</a></li><li><a href="../about.html">About</a></li><li><a href="../practice.html">Practice</a></li><li><a href="../case-enquiry.html">Enquiry</a></li><li><a href="../courts.html">Courts</a></li><li><a class="active" href="../legal-updates.html">Insights</a></li><li><a href="../disclaimer.html">Disclaimer</a></li></ul>
      <a class="nav-cta" href="../contact.html">Contact</a><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </nav>
    <main>
      <section class="page-hero"><div class="hero-eyebrow">{{ARTICLE_HERO_EYEBROW}}</div><h1>{{ARTICLE_TITLE}}</h1><p>{{ARTICLE_HERO_PARAGRAPH}}</p></section>
      <section class="sec"><div class="sec-label">{{ARTICLE_CATEGORY_LABEL}}</div><article class="article-body" data-article-category="{{ARTICLE_CATEGORY_LABEL}}" data-article-tags="{{ARTICLE_TAGS_COMMA}}">
        <div class="article-meta"><span>Published {{ARTICLE_MONTH_YEAR}}</span><span>{{ARTICLE_CATEGORY_LABEL}}</span></div>
        <p class="article-summary">{{ARTICLE_DESCRIPTION}}</p>
        <figure class="article-featured-figure"><img src="../assets/img/citadel/{{ARTICLE_SOCIAL_IMAGE}}" alt="{{ARTICLE_IMAGE_ALT}}" loading="eager"></figure>

        {{ARTICLE_BODY}}

        <h2>Conclusion</h2>
        {{CONCLUSION}}
        <p class="article-last-updated"><strong>Last updated on:</strong> {{ARTICLE_LAST_UPDATED}}</p>

        <h2>Useful Internal Pages</h2><div class="article-links">{{RELATED_LINKS}}</div>
        <h2>References / Sources</h2>{{REFERENCES}}
        <h2>Disclaimer</h2><div class="article-note">{{DISCLAIMER}}</div>
      </article></section>
    </main>
    <footer class="foot"><div class="foot-copy">&copy; 2026 Chambers of AK - Advocates &amp; Legal Consultants</div><div class="foot-disc">For informational purposes only. Does not constitute legal advice or solicitation. Bar Council of India. Initial communication does not create an advocate-client relationship.</div></footer>
  </div>
  <script src="../assets/js/script.js?v=citadel-live-11"></script>
</body>
</html>
```

## Article Body Exclusions

Do not place the following in article bodies:

```text
- enquiry or CTA blocks inside the article body;
- article-status, research-status, publication-status or workflow-status boxes;
- thumbnail generation explanations;
- thumbnail-detail captions such as composition, brand-colour or copyright notes;
- internal source-pack notes;
- internal publisher checklists.
```

## Last Updated Rule

Every article must include:

```html
<p class="article-last-updated"><strong>Last updated on:</strong> DD/MM/YYYY at HH:MM</p>
```

Place it after the conclusion and before internal links / references / disclaimer.

## Validation Commands

Run before committing:

```powershell
node --check assets/js/script.js
node --check tools/validate-insights-registry.js
node -e "JSON.parse(require('fs').readFileSync('assets/data/insights-registry.json','utf8')); console.log('insights registry JSON ok')"
node tools/validate-insights-registry.js --strict
git diff --check
[xml](Get-Content sitemap.xml -Raw)
[xml](Get-Content feed.xml -Raw)
```

## Social Distribution Reminder

When posting article links to LinkedIn, Facebook, WhatsApp Channel or X/Twitter, the social preview image must already be available as a public raster URL through the article's `og:image` and `twitter:image` tags.
