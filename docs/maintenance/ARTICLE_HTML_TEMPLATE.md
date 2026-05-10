# Article HTML Template

This document provides a reusable HTML template for future Chambers of AK legal insight articles under `updates/`.

Use this together with:

```text
docs/maintenance/ARTICLE_PUBLISHING_WORKFLOW.md
```

## Usage

1. Copy the template below.
2. Replace all `{{PLACEHOLDER}}` values.
3. Save the final file under:

```text
updates/{{ARTICLE_SLUG}}.html
```

4. Add the article card to `legal-updates.html`.
5. Add the article URL to `sitemap.xml`.
6. Add an item to `feed.xml`.
7. Add contextual internal links.
8. Prepare social/newsletter drafts.
9. Run validation and live checks.

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
{{ARTICLE_HERO_EYEBROW}}
{{ARTICLE_HERO_PARAGRAPH}}
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

## Template

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
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ARTICLE_TITLE}}">
  <meta name="twitter:description" content="{{ARTICLE_DESCRIPTION}}">
  <meta name="twitter:image" content="https://chambersofak.in/assets/img/social-preview.png">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="../assets/css/style.css?v=theme-package-1">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html#article",
    "headline": "{{ARTICLE_TITLE}}",
    "description": "{{ARTICLE_DESCRIPTION}}",
    "image": "https://chambersofak.in/assets/img/social-preview.png",
    "author": {"@type": "Person", "name": "Abhijeet Kumar", "url": "https://chambersofak.in/about.html"},
    "publisher": {"@type": "LegalService", "name": "Chambers of AK", "url": "https://chambersofak.in/", "logo": {"@type": "ImageObject", "url": "https://chambersofak.in/assets/img/logo-navbar.png"}},
    "datePublished": "{{ARTICLE_DATE_ISO}}",
    "dateModified": "{{ARTICLE_DATE_ISO}}",
    "mainEntityOfPage": "https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html",
    "inLanguage": "en-IN"
  }
  </script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GMHQTJJ" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <div class="s">
    <nav class="nav">
      <a class="nav-brand" href="../index.html" aria-label="Chambers of AK homepage"><img class="nav-logo" src="../assets/img/logo-navbar.png?v=secondary-1" alt="Chambers of AK"></a>
      <ul class="nav-links">
        <li><a href="../index.html">Home</a></li>
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
        <article class="article-body">
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

    <footer class="foot"><div class="foot-copy">&copy; 2026 Chambers of AK - Advocates &amp; Legal Consultants</div><div class="foot-links"><a href="../about.html">About</a><a href="../practice.html">Practice</a><a href="../case-enquiry.html">Case Enquiry</a><a href="../document-checklists.html">Document Checklists</a><a href="../faq.html">FAQ</a><a href="../process.html">Process</a><a href="../disclaimer.html">Disclaimer</a><a href="../privacy-policy.html">Privacy Policy</a><a href="../terms.html">Terms</a><a href="../contact.html">Contact</a></div><div class="foot-disc">For informational purposes only. Does not constitute legal advice or solicitation. Bar Council of India.</div></footer>
  </div>
  <script src="../assets/js/script.js?v=citadel-preview-5"></script>
</body>
</html>
```

## Card Template For `legal-updates.html`

```html
<a class="update-item update-item-link" href="updates/{{ARTICLE_SLUG}}.html" data-thumb="assets/img/citadel/citadel-thumb-{{ARTICLE_SLUG}}.webp">
  <span class="update-tag tag-{{ARTICLE_CATEGORY}}">{{ARTICLE_CATEGORY_LABEL}}</span>
  <div class="update-title">{{ARTICLE_SHORT_TITLE}}</div>
  <div class="update-excerpt">{{ARTICLE_DESCRIPTION}}</div>
  <div class="update-date">{{ARTICLE_MONTH_YEAR}}</div>
</a>
```

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

### Newsletter / Email

```text
Subject: {{ARTICLE_SHORT_TITLE}}

Chambers of AK has published a new legal insight:

{{ARTICLE_TITLE}}

{{ARTICLE_DESCRIPTION}}

Read the full note:
https://chambersofak.in/updates/{{ARTICLE_SLUG}}.html

For general information only. Not legal advice or solicitation.
```
