# ChatGPT / Codex Live Check Boundary

This note prevents confusion between repository inspection, local smoke testing and live deployment testing during Chambers of AK website handoffs.

## Rule

ChatGPT may inspect repository files, commits and documentation through connected GitHub tools. ChatGPT should not claim that a live website smoke test or visual deployment check has passed unless it has actually been able to open and inspect the live website in the current environment.

If ChatGPT cannot access or visually verify the live website, it must say so clearly and ask the user to manually check the live site and report the result.

Codex/local automation may run local browser smoke tests, Playwright/Chrome checks and live route checks when it has a functioning browser/network environment. Codex should record those results separately in the changelog or handoff notes.

## Required wording when ChatGPT cannot live-check

Use wording similar to:

```text
I cannot complete the live visual check from this environment because the live site could not be opened here. Please manually check the listed URLs and report whether they load correctly, whether the mobile view works, and whether the relevant links/buttons work.
```

## Manual live-check checklist for the user

When ChatGPT cannot live-check, ask the user to check only the relevant URLs for the current patch. For Chambers of AK stability checks, the usual minimum is:

```text
https://chambersofak.in/
https://chambersofak.in/contact.html
https://chambersofak.in/legal-updates.html
https://chambersofak.in/case-enquiry.html
```

Ask the user to confirm:

- the page loads on desktop;
- the page loads on mobile;
- the Citadel light/dark toggle works, if the change touches theme/navigation;
- important CTAs open correctly, such as WhatsApp, email, phone, Contact, Case Enquiry, Google Business Profile or Google Review links;
- there is no obvious broken layout, duplicate section or stale cache issue.

## Handoff distinction

Use these labels consistently:

```text
Repository source check: performed through GitHub files/commits.
Local smoke test: performed by Codex or local browser/Playwright.
Live visual check: performed on https://chambersofak.in/ through a browser/network environment.
Manual user check: required when ChatGPT cannot access the live site.
```

Do not merge these labels. A source check is not a live check, and a local smoke test is not proof that GitHub Pages has refreshed unless the live site is also checked.
