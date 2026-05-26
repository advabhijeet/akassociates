# Citadel Global Shell

## Tablet breakpoint alignment v2

The CSS mobile drawer breakpoint is `max-width: 760px`. The Global Shell desktop topbar breakpoint must therefore begin at `min-width: 761px`.

This prevents the 761px–768px dead zone where desktop navigation appears but the topbar/theme toggle is not created.

## Footer internal-link cleanup v1

Production page footers should keep concise crawlable groups:

- Main
- Practice
- Resources
- Legal

The Practice group must point to the five active practice pillars:

1. MSME Recovery
2. Arbitration
3. Commercial Recovery
4. RERA / Property
5. Cheque Bounce

Preview/demo HTML files should be excluded from production footer cleanup patches unless intentionally updated.

## Footer symmetry fix v1

Footer layout uses a grid-based structure after Footer Internal-Link Cleanup v1.

Desktop footer areas:

- copyright on the left;
- grouped footer navigation in the centre;
- social icons and disclaimer on the right.

Responsive behaviour:

- below medium desktop widths, the layout becomes two-column;
- below tablet/mobile widths, the footer stacks cleanly and centres each group.

## Footer symmetry fix v2

Footer layout after Footer Internal-Link Cleanup v1:

Desktop:

- left: disclaimer and social icons;
- centre: Main / Practice / Resources / Legal grouped links;
- right: copyright.

Tablet:

- two-column layout with disclaimer/social/copyright on the left and grouped links on the right.

Mobile:

- stacked centred layout.

## Footer mobile hierarchy v3

Mobile footer order:

1. disclaimer;
2. social icons;
3. Main / Practice / Resources / Legal grouped links;
4. copyright.

Desktop remains:

- left: disclaimer and social icons;
- centre: grouped footer navigation;
- right: copyright.

## Footer mobile hierarchy hard override v4

A final mobile-only override is placed at the end of `assets/css/style.css` to force the intended footer hierarchy at `max-width: 760px`.

Mobile order:

1. disclaimer;
2. social icons;
3. Main / Practice / Resources / Legal grouped links;
4. copyright.

This override exists because older footer layout rules may otherwise keep the grouped navigation above the disclaimer on mobile.
