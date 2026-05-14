# Module Contract: Citadel Article Comments

## Summary

- Module ID: `article-comments`
- Module Name: `Citadel Article Comments`
- Version: `0.1.0-planned`
- Status: `planned`
- Owner Product: `Citadel Manager / Website CMS + Citadel of Kang frontend integration`
- Chambers Cache Key: `citadel-kang-article-comments-1`

## Purpose

The Citadel Article Comments module will allow users to comment on article pages only, with the goal of building a moderated community around long-form articles, insights and legal/general knowledge content.

For Chambers of AK, this feature must be handled carefully because the public website is a legal-professional website. Comments must not create an impression of legal solicitation, legal advice, lawyer-client relationship or unchecked public legal consultation.

## Product Boundary

This feature is not a pure static frontend module.

It requires:

```text
frontend display layer
backend/comment storage
moderation workflow
spam protection
abuse reporting
privacy handling
admin controls
```

Therefore, ownership should be split:

```text
Citadel of Kang = frontend comment UI styles and display hooks.
Citadel Manager / Website CMS = comment moderation, storage, settings and admin controls.
Chambers implementation layer = legal disclaimer, moderation policy and article-only activation.
```

It must not be implemented as a fake frontend-only system.

## Scope

Allowed scope:

```text
article pages only
long-form insights/blog/legal-update pages
authenticated or identity-controlled comments
moderated public discussion
admin-approved publishing where required
```

Not allowed by default:

```text
comments on home/about/contact/practice pages
anonymous spam-prone open comments
unmoderated legal advice Q&A
case-specific public consultation threads
uploading private documents in comments
posting client/matter information
```

## Activation

Preferred article-level activation:

```html
<article class="article-body" data-citadel-comments="true">
```

Disable pattern:

```html
<body data-citadel-comments="false">
```

Future CMS template setting:

```text
Article Template > Comments > Enabled / Disabled
```

Future article-level setting:

```text
Article Editor > Discussion > Allow comments
```

Default for Chambers of AK should be:

```text
Disabled until moderation, privacy and disclaimer system is ready.
```

## Public Config Keys

Future public-safe config may use:

```json
{
  "modules": {
    "articleComments": false
  },
  "articleComments": {
    "provider": "managed",
    "mode": "moderated",
    "requireLogin": true,
    "allowAnonymous": false,
    "articleOnly": true,
    "preModeration": true,
    "showCommentPolicy": true,
    "showLegalDisclaimer": true
  }
}
```

Public config must not include:

```text
API secrets
admin tokens
database credentials
private moderation keys
client/case data
repository write tokens
```

## Required Frontend Markup

Possible frontend container:

```html
<section class="citadel-comments" data-citadel-comments-section aria-labelledby="citadel-comments-title">
  <h2 id="citadel-comments-title">Comments</h2>
  <p class="citadel-comments-policy">Comments are moderated. Please do not post private, confidential or case-specific information.</p>
  <div data-citadel-comments-list></div>
  <form data-citadel-comments-form></form>
</section>
```

## Default Behavior

When enabled and properly configured, the module should:

```text
1. Display a comments section only on article pages.
2. Show comment policy before the form.
3. Require login or identity verification if configured.
4. Accept comments into moderation queue.
5. Display only approved comments publicly.
6. Allow admin/moderator to approve, hide, delete or report comments.
7. Prevent private documents or case details from being posted.
8. No-op safely when backend/provider/config is absent.
```

## Disable / No-Op Behavior

The module must do nothing when:

```text
comments are disabled globally
article-level comments are disabled
no article context exists
backend/provider is not configured
body has data-citadel-comments="false"
```

No errors should be thrown in these states.

## Backend Requirement

A comment section requires a real backend or a trusted managed comment provider.

Options to consider later:

```text
Citadel Manager native comments backend
managed third-party comment service
GitHub Discussions-based comments for developer/community sites only
serverless database-backed comments
headless CMS comments module
```

For Chambers of AK, the preferred long-term direction is:

```text
Citadel Manager native moderated comments or a carefully selected managed provider with moderation and privacy controls.
```

Do not implement comments by storing data in public HTML/JS files or exposing write tokens in the browser.

## Moderation Requirements

Minimum moderation controls:

```text
pre-moderation option
approve comment
hide/unpublish comment
delete comment
mark as spam
block abusive user/email/IP where legally/technically appropriate
report abuse
moderation log
admin notification
```

For Chambers of AK, recommended default:

```text
All comments require approval before public display.
```

## Legal / Compliance Notes For Chambers of AK

Because Chambers of AK is a law firm/advocate website, comments must avoid creating legal-risk issues.

Required warnings/policy language should include:

```text
Do not post confidential information.
Do not post case-specific facts requiring legal advice.
Comments are for general discussion only.
Comments do not create an advocate-client relationship.
Comments are moderated and may be removed.
For legal advice, use the official enquiry/contact channel.
```

Possible risk categories:

```text
defamation
spam/scams
confidential client information
misleading legal advice by users
unauthorized solicitation concerns
privacy issues
abusive/harassing content
irrelevant promotional comments
```

Before enabling public comments on Chambers of AK, consult applicable professional-conduct, privacy and cyber-law requirements.

## Article-Only Requirement

This module must be restricted to article pages by default.

It should not appear on:

```text
home page
about page
practice page
contact page
policy pages
case enquiry page
client portal pages
```

Allowed target pages:

```text
article pages
legal updates
blog posts
insights
knowledge resources
```

## Accessibility Notes

The comment UI must include:

```text
proper form labels
visible focus states
error messages connected to fields
keyboard-submittable form
status messages after submission
screen-reader readable moderation notice
large enough mobile touch targets
logical heading structure
```

If comments load asynchronously:

```text
announce meaningful loading/submission state without excessive live-region noise
preserve keyboard focus after form submission
```

## Performance Notes

The module should:

```text
load only on article pages where enabled
lazy-load comment list if appropriate
avoid blocking article rendering
avoid heavy third-party scripts where possible
cache approved comments where safe
no-op when disabled
```

## SEO / Indexing Notes

Comment indexing should be a deliberate setting.

Options:

```text
index approved comments
hide comments from search engines
render comments only after interaction
```

For Chambers of AK initial use, safest default:

```text
Approved comments visible to users but reviewed carefully before allowing indexing significance.
```

Comments should not alter canonical URLs, sitemap entries or article metadata unless a future SEO policy expressly provides for it.

## Privacy / Security Notes

The module must protect:

```text
user email addresses
login/session data
IP logs, if collected
moderation records
admin actions
private reports
```

Public frontend must not expose:

```text
API secrets
database credentials
admin tokens
repository write tokens
private moderation notes
user private information
```

## Chambers-Specific Overrides

Chambers of AK may override:

```text
comment policy wording
legal disclaimer wording
moderation mode
require-login setting
article-template placement
contact/enquiry redirect language
```

Reusable module files must not hardcode Chambers-only URLs, phone numbers, email addresses or legal disclaimers unless placed in the Chambers implementation layer.

## Standalone Extraction Notes

For the future standalone Citadel of Kang repository:

```text
include frontend comment UI components
include neutral demo comment layout
include provider abstraction docs
exclude Chambers-specific legal disclaimer language
exclude real user/comment data
exclude backend secrets
exclude private moderation records
```

## Implementation Phases

### Phase 1 — Planning Only

```text
module contract
moderation policy plan
frontend UI concept
backend/provider decision
privacy and legal checklist
```

### Phase 2 — Preview UI Only

```text
static noindex preview page
mock comments only
mock form only
no real submission
no backend
```

### Phase 3 — Backend/Provider Prototype

```text
select backend/provider
test authentication/identity
test moderation queue
test spam protection
test admin workflow
```

### Phase 4 — Chambers Controlled Rollout

```text
article-only activation
pre-moderation enabled
comment policy visible
legal disclaimer visible
privacy policy updated if needed
manual testing
monitor abuse/spam
```

## Production Readiness Rule

Do not enable public comments on Chambers of AK until:

```text
1. Backend/provider is selected.
2. Moderation workflow exists.
3. Comment policy is approved.
4. Legal disclaimer is approved.
5. Privacy handling is documented.
6. Spam/abuse controls exist.
7. Admin controls are protected.
8. No private token is exposed in public code.
9. Mobile UI is tested.
10. Article-only activation is verified.
```

## Validation Checklist

Future technical checks:

```text
frontend form labels and focus states
mobile usability
backend authentication
moderation queue
spam handling
comment approval flow
comment deletion flow
privacy display
no console errors
no exposed secrets
```

## Current Decision

Status:

```text
Planned feature update.
Do not implement on live website yet.
Create UI preview later after navigation drawer and article modules are stable.
```
