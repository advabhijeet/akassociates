# Production integration gates

Existing GTM container: GTM-5GMHQTJJ. Original conversion names: whatsapp_click, phone_click, email_click, case_enquiry_click, contact_click, enquiry_submit. Preserve the container and event names, do not include case details or enquiry input values in dataLayer. Analytics is deliberately not loaded in preview. Review consent, existing tags, privacy notice and test with Tag Assistant before activation.

EmailJS: original dynamic field structure restored for local-only preview. Release adapter preserves original public browser configuration and template parameter contract; mock tested in CI. It is not connected to the preview UI. Production still needs approved UI wiring, explicit send consent, approved origin in EmailJS, SDK and actual test delivery. No credentials requested in chat. Do not activate during preview.

Google HTML verification, existing verification meta and IndexNow key preserved, with preview noindex. IndexNow submissions remain disabled on migration branch. Do not remove noindex until production-specific build and domain switch verified. Need production host guard, post-deploy URL checks, changed-URL diff covering native articles, rollback procedure. No production notifications sent.

Before launch: compare all 86 original URLs and verify new resources, check actual Worker deployment, inspect browser QA, legal and policy review, accessibility, performance, lockfile, live integration tests and owner approval. Keep GitHub Pages production intact until explicit cutover.
