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
