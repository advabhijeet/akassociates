# Citadel Global Shell

## Tablet breakpoint alignment v2

The CSS mobile drawer breakpoint is `max-width: 760px`. The Global Shell desktop topbar breakpoint must therefore begin at `min-width: 761px`.

This prevents the 761px–768px dead zone where desktop navigation appears but the topbar/theme toggle is not created.
