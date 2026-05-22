# Social Media Distribution Workflow

This document records the Chambers of AK social posting strategy, platform rhythm, caption rules, downloadable package rules and trigger prompts for future ChatGPT, Codex and AI handoffs.

## Purpose

Use this workflow after publishing or refreshing legal insight articles on `chambersofak.in`.

The goal is to build authority, legal literacy and consistent brand recall without using direct solicitation, aggressive legal advertising, exaggerated claims or platform-specific spam behaviour.

This document is also the default operating standard for **downloadable social media packages** created from Chambers of AK article links, topics, judgments, legal updates or blog drafts.

## Current Official Channels

Known official channels:

- Website: `https://chambersofak.in`
- LinkedIn Page: `https://www.linkedin.com/company/chambersofak`
- WhatsApp Channel: `https://whatsapp.com/channel/0029VbCmf6M9sBIHqiTPIz33`
- Facebook Page: `https://www.facebook.com/people/Chambers-of-AK/61589415432367/`
- Instagram Page: `https://www.instagram.com/chambersofak/`
- X / Twitter: `https://x.com/chambersofak`

Future official links to record when created:

- Google Business Profile public link.
- Any newsletter or email list.

When new social profile links are supplied, keep an official social-link inventory before adding them to the website footer, Contact page, schema or distribution captions.

## Brand And Compliance Rules

All social content must follow the Chambers of AK brand direction:

- premium boutique legal identity;
- black, white and gold visual system;
- sober legal-literacy tone;
- document-first, procedure-first and case-brief-first content;
- no clickbait;
- no aggressive calls to action;
- no guaranteed-outcome language;
- no unverifiable superiority language.

Official brand identity text:

```text
CHAMBERS OF AK
ADVOCATES & LEGAL CONSULTANTS
chambersofak.in
```

Use only the user-provided **official AK monogram logo** as the branding mark in generated packages, such as `assets/img/logo-navbar.png` or another user-approved official logo asset.

Do not create, substitute or hallucinate any alternate logo, emblem, seal, crest or monogram.

Do not generate, redraw or invent Chambers of AK branding, AK monograms, seals or logos inside social creatives. If the correct logo is not available or cannot be safely placed, omit the logo and use only neutral article text or `chambersofak.in` where appropriate.

Avoid phrases such as:

- `best lawyer`;
- `top advocate`;
- `guaranteed result`;
- `win your case`;
- `hire us now`;
- `call now for assured relief`;
- client-result boasting or testimonial-style claims.

Safe closing language:

```text
General information only. Not legal advice.
```

Alternative longer closing:

```text
This post is for general legal awareness and should not be treated as legal advice. Please consult a qualified advocate for case-specific advice.
```

For website/social content where solicitation risk is higher, use:

```text
For general information only. Not legal advice or solicitation.
```

## Downloadable Social Package Rule

When the user asks for a package using wording such as:

```text
Make package for this article.
Create social media package for this link.
Generate complete package for this topic.
Prepare darkmode/lightmode package for this article.
```

Create a **downloadable ZIP package** instead of dumping all content into chat.

The package should be upload-ready and organised by platform.

Default folder structure:

```text
Instagram/
  carousel/
  single_post/
  reel_or_story_optional/
Facebook/
X_Twitter/
LinkedIn/
WhatsApp_Channel/
Website_Meta/
Brand/
README.txt
```

Each platform folder should include platform-ready image assets and supporting text files such as:

```text
caption.txt
hashtags.txt
alt_text.txt
posting_note.txt
upload_order.txt
```

The final assistant response should be limited to the ZIP link unless the user asks for preview text.

Preferred final response:

```text
Done.

[Download the Chambers of AK Package](sandbox:/mnt/data/package_name.zip)
```

## Preview-To-Final Consistency Rule

When a visual preview is shown to the user and approved, the final ZIP/package must contain those exact approved assets.

Do not silently regenerate, replace, restyle or substitute final images after approval.

If any correction is required after approval, show the revised preview first and wait for approval before packaging.

## Thumbnail-First Visual Rule

Before generating package images, inspect the article thumbnail / featured image and use it as the primary visual reference.

Match the package visuals to the article thumbnail's:

- mode: light / dark;
- palette;
- texture;
- artistic treatment;
- composition language;
- overall design family.

Examples:

```text
If article thumbnail is light mode -> generate a light-mode package.
If article thumbnail is dark mode -> generate a dark-mode package.
If article thumbnail uses watercolour / painting style -> generate matching painting-style assets.
If article thumbnail is minimalist legal graphic -> continue that minimalist visual family.
```

Do not apply a generic poster design when the article thumbnail suggests a specific style.

The official AK logo should be retained, but should not overpower the thumbnail-led design language.

## Platform Coverage By Default

Every complete package must include:

1. Instagram.
2. Facebook.
3. X / Twitter.
4. LinkedIn.
5. WhatsApp Channel.
6. Website Meta.
7. Brand reference / logo reference where relevant.

Google Business Profile may be added when the user asks for it or where a local business update is clearly suitable.

## Instagram Format Rule

Instagram carousel should **not** default to square format.

Default dimensions:

```text
Instagram Carousel: 1080 x 1350 px.
Instagram Story / Reel: 1080 x 1920 px.
Instagram Square: only when specifically requested.
WhatsApp Channel image: usually 1080 x 1080 px unless otherwise required.
```

Carousel slides must be readable, not empty-looking and visually consistent.

Preferred carousel structure:

```text
01 Cover
02 What happened?
03 Core legal issue
04 Relevant provision / case law
05 Legal position / court reasoning
06 Practical takeaway
07 What to watch next
08 Disclaimer / read article
```

## Graphics Rules

Use graphics wherever possible for LinkedIn, WhatsApp Channel, Instagram, Facebook and X / Twitter.

Do not use one merged collage unless specifically requested. Default rule:

```text
Create separate branded images for each article and each platform format.
```

Recommended dimensions:

```text
Instagram carousel: 1080 x 1350 px.
Instagram Story/Reel: 1080 x 1920 px.
WhatsApp square option: 1080 x 1080 px.
LinkedIn square option: 1200 x 1200 px.
LinkedIn landscape option: 1200 x 627 px.
Facebook link/post option: 1200 x 630 px.
X/Twitter landscape option: 1600 x 900 px.
Website/social link-preview thumbnail: 1200 x 675 px or 1600 x 900 px.
```

Default visual structure:

```text
Top or footer:
Official AK monogram / CHAMBERS OF AK
ADVOCATES & LEGAL CONSULTANTS

Middle:
[Category]
Article Title / Legal Hook

Bottom:
Read at chambersofak.in
```

Do not place long legal disclaimers inside the graphic. Place the disclaimer in the post caption unless the design specifically needs a short line.

Avoid generic gavel/courtroom stock imagery where possible. Prefer premium legal-document visuals, gold linework, subtle marble/black texture, clean white editorial layouts, controlled watercolour/legal illustration where thumbnail-led, minimal document icons, clean geometry and the Chambers of AK black/white/gold brand system.

Never use:

- fake court logos;
- misleading government seals;
- real judge photos;
- random stock advocates;
- cartoonish legal symbols;
- cheap or loud colours outside the thumbnail-led design requirement.

## Website Meta Folder Rule

Each downloadable package should include:

```text
Website_Meta/
  open_graph_and_x_card_tags.html
  article_thumbnail_for_link_preview.png
  meta_instructions.txt
```

Purpose:

- clickable X card preview;
- Facebook preview;
- LinkedIn preview;
- WhatsApp preview;
- better social sharing and SEO setup.

Meta tags should cover:

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
<meta name="twitter:site" content="@chambersofak">
```

For clickable social preview cards, post the article URL and let the platform generate the card instead of manually uploading the image.

## Caption System

For each article, prepare platform-specific captions.

Required platforms by default:

1. WhatsApp Channel.
2. LinkedIn Page.
3. X / Twitter.
4. Instagram.
5. Facebook.

WhatsApp Channel:

- short;
- direct;
- article title or core legal point;
- three to five lines maximum where possible;
- URL;
- concise disclaimer.

LinkedIn Page:

- professional;
- more detailed;
- 3-6 short paragraphs;
- use 3-6 relevant hashtags;
- link to article;
- disclaimer.

X / Twitter:

- concise;
- one core takeaway;
- integrated hashtags where natural;
- article link;
- thread version for nuanced topics;
- source/judgment excerpt version where suitable;
- cautious mentions only where justified.

Instagram:

- graphic-first;
- short caption;
- carousel text where useful;
- hashtags;
- disclaimer.

Facebook:

- simple caption;
- slightly less formal than LinkedIn;
- link;
- disclaimer.

Google Business Profile, if used:

- short update style;
- avoid aggressive CTA;
- link to article;
- keep informational.

## X / Twitter Package Standard

The `X_Twitter` folder should include more than one post style:

```text
short_post.txt
integrated_hashtag_post.txt
thread.txt
judgment_or_source_excerpt_style.txt
mentions_strategy.txt
hashtags.txt
alt_text.txt
x_post_image.png
```

Use a legal-news / publisher-style structure:

- direct legal hook;
- concise factual point;
- integrated hashtags inside the sentence where natural;
- source/article link;
- optional relevant mentions only where justified;
- subtle disclaimer.

Examples:

```text
The #SupremeCourt has clarified...

In #PMLA proceedings, the key question is...

Read: [article link]

General information only. Not legal advice.
```

Use mentions only when directly relevant to the source, institution, regulator, court conversation or quoted material. Do not tag media houses or institutions merely for reach.

## Accessibility And Alt Text

Each platform folder should include `alt_text.txt`.

Alt text should describe:

- legal topic;
- visual format;
- key text shown on image;
- Chambers of AK branding;
- whether the image is a carousel, wide post, square post or thumbnail.

## File Naming Rule

Use clean, upload-ready names.

Examples:

```text
01_cover.png
02_key_issue.png
03_legal_position.png
04_timeline.png
05_takeaway.png
instagram_caption.txt
facebook_caption.txt
linkedin_caption.txt
x_thread.txt
whatsapp_post.txt
```

Avoid random AI-generated filenames in final packages.

## README Rule For Packages

Every ZIP package should include `README.txt` stating:

- article title;
- article URL;
- visual style used;
- platforms included;
- recommended upload order;
- disclaimer used;
- any link-preview metadata notes.

## Platform Priority

Primary platforms:

1. LinkedIn Page.
2. WhatsApp Channel.
3. Instagram.
4. Facebook Page.
5. X / Twitter.

Google Business Profile is a practical trust channel when available.

Do not open or publicly promote every platform before the user confirms the platform is active, but when a complete package is requested, prepare all platform folders by default.

## Posting Cadence

Initial cadence:

```text
LinkedIn Page: 2 posts per week.
WhatsApp Channel: 2-3 posts per week.
Instagram/Facebook: 1-2 posts per week.
X/Twitter: 2-4 short commentary posts per week only if maintained.
Google Business Profile: 1 post per week when available.
```

Do not mass-post every article at once during active AdSense review. Prefer fewer, better article promotions and observe performance for 24-48 hours before repeating or expanding.

## Evening Ritual

Use 8:30 PM IST as the daily social-media desk time.

The evening ritual is for preparation, scheduling and tracking. It is not always the best publishing time for every platform.

```text
8:30 PM - Check previous post performance.
8:35 PM - Select next article/topic.
8:40 PM - Prepare caption and graphic.
8:50 PM - Schedule or save post.
8:55 PM - Note analytics in tracker.
```

Recommended publish windows:

```text
LinkedIn Page: Tuesday/Wednesday/Thursday, 10:00 AM-12:00 PM IST.
LinkedIn alternative: 1:00 PM-3:00 PM IST.
WhatsApp Channel: 7:30 PM-9:00 PM IST.
Instagram: 7:00 PM-9:00 PM IST.
Facebook Page: 7:00 PM-9:00 PM IST.
X/Twitter: 12:00 PM-2:00 PM IST or 7:00 PM-9:00 PM IST.
```

## Weekly Operating Schedule

Suggested weekly mix:

```text
2 legal awareness posts.
1 legal update post.
1 practice-area explainer.
1 carousel.
1 short quote/insight.
1 website/blog promotion post.
```

For the current multi-platform setup:

```text
Monday 8:30 PM: prepare article post.
Tuesday 10:30 AM: publish LinkedIn article post.
Tuesday 8:00 PM: publish WhatsApp Channel version.
Wednesday 8:00 PM: publish Instagram/Facebook version.
Thursday 8:30 PM: prepare second post.
Friday 10:30 AM: publish LinkedIn post.
Friday 8:00 PM: publish WhatsApp Channel version.
Saturday/Sunday: post carousel, checklist or older evergreen article graphic.
Sunday 8:30 PM: review analytics and plan next week.
```

## Content Pillars

Rotate these five pillars:

1. Case briefs.
2. Document checklists.
3. Limitation and timeline notes.
4. Before filing / before purchase guides.
5. Forum and procedure explainers.

Examples:

- before filing a cheque bounce complaint: documents to keep ready;
- property purchase due diligence: documents to review;
- MSME delayed payment: invoice and Udyam records checklist;
- commercial recovery: what to prepare before legal notice;
- RERA delayed possession: refund or interest;
- SARFAESI auction sale challenge: documents and timeline.

## Analytics Tracking

Track once every Sunday evening:

```text
Article title
Platform
Date/time posted
Post type: link / image / carousel / text / thread
Views or impressions
Reactions
Comments
Shares or reposts
Link clicks
Profile visits
New followers
WhatsApp Channel follows
Any enquiry
Notes on caption/graphic performance
```

After 24-48 hours, compare performance by topic type:

```text
Property due diligence = broader public-interest audience.
SARFAESI = banking/recovery/borrower niche.
Summary judgment = lawyer/business-litigation niche.
MSME = business-owner and supplier audience.
Case-brief/judgment-publication = lawyer/research audience.
```

Use observations to decide future article priorities and graphic styles.

## Trigger Prompt For Future AI Sync

Use this trigger prompt whenever the user wants a downloadable package:

```text
Chambers of AK social package ritual.

Create a complete downloadable ZIP package for this article/link/topic using the Chambers of AK Social Media Distribution Workflow.

Required:
- Inspect the article thumbnail/featured image first and match the package visuals to that style.
- Use the official AK monogram logo only.
- Include Instagram, Facebook, X/Twitter, LinkedIn, WhatsApp Channel, Website_Meta, Brand and README folders/files.
- Instagram carousel must default to 1080 x 1350, not 1:1.
- Include X/Twitter short post, integrated hashtag post, thread, judgment/source excerpt style where suitable, hashtags, alt text and mentions strategy.
- Include Open Graph and X Card meta tags in Website_Meta.
- Keep all content educational, professional and non-solicitation compliant.
- Avoid guaranteed-outcome, superiority and aggressive CTA language.
- Include appropriate disclaimer.
- Return only the ZIP download link unless preview text is requested.
```

Use this shorter trigger prompt for copy-only social posts:

```text
Trigger Chambers of AK social posting ritual.

Prepare copy-paste posts for the latest [NUMBER] article(s) across WhatsApp Channel, LinkedIn, X/Twitter, Instagram, Facebook, and Google Business Profile where suitable. Keep it professional, non-solicitation compliant, legal-literacy focused, and Chambers of AK branded. Also include graphic text for each article. If graphics are requested, create separate images for each article.
```

## Website Update Boundary

Do not immediately add every new social profile link to the public website while AdSense review is active unless the user specifically requests it. When official social links are ready, consider a narrow future patch for:

- footer social icons;
- Contact page public profiles;
- homepage or organization `sameAs` schema;
- docs/google or docs/seo references;
- changelog.

Keep such website changes narrow and auditable.
