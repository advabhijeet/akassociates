# Mobile Drawer Spacing Live Check

Date: 2026-05-08

This note records the completion and live verification of the mobile drawer spacing fix.

## Issue

The user observed that the mobile drawer menu spacing changed after scrolling down the page. When opened at the top of the page, the menu spacing appeared compact and correct. When opened after scrolling, the drawer items expanded vertically and the layout looked inconsistent.

## Fix Applied

A mobile-only CSS stability patch was applied to:

```text
assets/css/style.css
```

The patch keeps drawer spacing stable when `body.menu-open` is active, including when the nav has the `is-scrolled` class.

Commit message expected from the one-command manual patch:

```text
Fix mobile drawer spacing after scroll
```

## Live Check Completed

The user confirmed the following checks passed:

1. Open homepage at top and open drawer.
2. Close drawer.
3. Scroll down and open drawer again.
4. Confirm spacing remains compact.
5. Confirm Contact button is not pushed awkwardly down.

Result:

```text
Checked and no issues found.
```

## Status

Mobile drawer spacing issue is resolved and verified on mobile.

## Notes

Future CSS updates affecting navigation should check both states:

- drawer opened at top of page;
- drawer opened after scrolling;
- drawer opened across root, practice, service and update pages.
