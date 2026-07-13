# Chambers Citadel v1 Rollback

Baseline tag: `chambers-citadel-v1`  
Baseline commit: `47e8c6ed07ed2a053a46a39f3779d60fa6059edf`

The tag captures the production state immediately after Cleanup Batch 4 and before the Theme Restart bootstrap split.

## Safe inspection

```powershell
git fetch --tags origin
git show --stat chambers-citadel-v1
git rev-list -n 1 chambers-citadel-v1
```

Expected commit:

```text
47e8c6ed07ed2a053a46a39f3779d60fa6059edf
```

## Safe rollback test branch

Do not reset `main` merely to diagnose a visual or runtime issue.

```powershell
git switch main
git pull --ff-only origin main
git switch -c rollback/chambers-citadel-v1 chambers-citadel-v1
```

Run local validation or deploy the rollback branch through a controlled preview workflow.

## Production restoration

A production restoration must be a new reviewed commit or pull request that restores the required files from the baseline tag. Preserve later content and SEO changes unless the incident specifically requires reverting them.

Example inspection:

```powershell
git diff chambers-citadel-v1..main -- assets/css assets/js
```

Do not use `git reset --hard` or force-push `main` as a routine rollback mechanism.

## Fallback theme

The CSS fallback remains:

```text
assets/css/themes/chambers-ak.css
```

Do not delete it until a later release replaces this rollback baseline.
