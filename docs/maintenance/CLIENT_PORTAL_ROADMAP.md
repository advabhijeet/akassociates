# Chambers of AK Client Portal Roadmap

This document records the future client-portal direction for Chambers of AK.

The user wants a future feature where visitors/clients can log in and view case-related information such as case status, progress, documents filed, next date of hearing and other matter updates, similar in concept to public case-status systems like eCourts, but limited to the firm's own clients and matters.

## Status

Current status: future roadmap only.

Do not implement this inside the static public website yet.

The current Chambers of AK website remains a static public website. Citadel of Kang remains the theme system. A client portal is a separate secure application layer.

## Product Separation

Separate the project into three layers:

```text
1. Public Website
   Chambers of AK public legal-information and firm website.
   Powered by Citadel of Kang.

2. Admin / Citadel Manager
   Internal dashboard for theme settings, content publishing and site operations.

3. Client Portal
   Secure client-login area for case and document access.
```

The client portal must not be treated as a normal static page because it will contain private and confidential client/matter information.

## Core Client Portal Features

Future client-facing features may include:

```text
client login
client dashboard
matter/case list
case status summary
case progress timeline
next date of hearing
previous dates of hearing
court/forum name
case number / filing number / diary number where applicable
stage of proceedings
documents filed
documents received from client
draft documents for review
orders/judgments uploaded
hearing notes where appropriate
fee/payment status if later approved
secure messages / update notes
notification preferences
```

## Admin-Side Features

Admin/firm-side features may include:

```text
create client
create matter
assign matter to client
update case status
add next date of hearing
upload filed documents
upload orders
add internal notes
add client-visible notes
mark document visibility as public-to-client or internal-only
manage client access
revoke access
export matter summary
activity log / audit trail
```

## Security Boundary

A client portal must have real authentication and authorization.

Do not build it as:

```text
plain HTML pages with hidden links
front-end-only passwords
client data stored directly in public repository files
private documents inside public assets folders
JavaScript-only access control
```

Required principles:

```text
server-side authentication
role-based access control
client can view only their own matters
admin can manage assigned matters
private documents are not publicly accessible by URL guesswork
all sensitive actions are logged
private keys and tokens are never exposed in browser-side code
```

## Suggested Roles

Initial role model:

```text
Super Admin: full firm control.
Lawyer/Admin: manage clients, matters, documents and updates.
Staff: limited matter/document update access if needed.
Client: view only assigned matters and uploaded client-visible documents.
```

Optional future role:

```text
External Counsel / Clerk / Intern with limited permissions.
```

## Data Model Draft

### Client

```text
client_id
name
email
phone
address optional
identity/KYC reference optional
status active/inactive
created_at
updated_at
```

### Matter

```text
matter_id
client_id
matter_title
case_number
court_or_forum
jurisdiction
practice_area
opposite_party optional
current_stage
next_date
last_date
status active/disposed/on_hold
created_at
updated_at
```

### Case Event / Timeline Entry

```text
event_id
matter_id
event_date
event_type
summary
client_visible true/false
created_by
created_at
```

### Document

```text
document_id
matter_id
document_title
document_type
file_storage_path
filed_on optional
uploaded_on
client_visible true/false
uploaded_by
checksum optional
```

### Hearing Date

```text
hearing_id
matter_id
date
purpose/stage
courtroom optional
result/remarks optional
next_date optional
client_visible true/false
```

## Hosting / Architecture Options

Because the public site is static, the portal should be separate from the static website.

Possible future architecture:

```text
Public site:
GitHub Pages / Cloudflare Pages / Netlify static hosting.

Client portal:
Separate secure web application or serverless app.

Document storage:
Private storage bucket or secure backend, not public assets directory.

Database:
Managed database or secure backend database.
```

Possible technology tracks for future research:

```text
Supabase Auth + Postgres + Storage
Firebase Auth + Firestore + Storage
Cloudflare Pages + Workers + D1/R2
Next.js app with secure backend
Django/Laravel/ASP.NET backend if full server is preferred later
```

No final stack is selected yet.

## Integration With Chambers Website

The public website may later include:

```text
Client Login button in navbar
Client Portal link in footer
Portal explainer page
Security/privacy notice
```

But the login application itself should be hosted separately or protected through a proper backend.

Suggested public route later:

```text
https://portal.chambersofak.in
```

or:

```text
https://chambersofak.in/client-login.html
```

where `client-login.html` only redirects to the secure portal.

## Compliance / Professional Responsibility Notes

The portal may contain confidential client and case information. Development must account for:

```text
client confidentiality
limited access by matter
secure document storage
privacy policy update
terms of portal use
access revocation
logs/audit trail
data backup and retention
device/session security
```

Before launch, the user should consult a qualified technology/cyber-law professional and, where needed, align with professional obligations applicable to advocates in India.

## Relationship With Citadel of Kang

Citadel of Kang should remain the public website/theme system.

The client portal should not be embedded into Citadel as a mere theme module.

Correct relationship:

```text
Citadel of Kang = public theme and UI system.
Citadel Manager = admin/content/theme management system.
Client Portal = secure matter-access product that may visually use Citadel design tokens.
```

The portal may reuse Citadel visual tokens and components, but it must have its own secure backend and access-control model.

## Future Development Phases

### Phase 1 — Roadmap only

```text
document the requirement
separate portal from public website
identify data model
identify security boundaries
```

### Phase 2 — Prototype planning

```text
choose technology stack
choose auth provider
choose database/storage
prepare wireframes
prepare access-control model
prepare privacy/security checklist
```

### Phase 3 — Internal admin prototype

```text
admin creates client
admin creates matter
admin adds timeline entry
admin uploads document
client-visible flag works
```

### Phase 4 — Client login prototype

```text
client logs in
client sees assigned matters only
client sees timeline
client sees next date
client downloads allowed documents
```

### Phase 5 — Production hardening

```text
audit logs
backup strategy
access revocation
secure document URLs
rate limiting
email/SMS notification strategy
privacy/legal documents
manual security review
```

## Immediate Rule

Do not place client data, case documents or private matter status inside this public website repository.

Until a secure portal exists, case updates should be handled manually and privately outside the public static website.
