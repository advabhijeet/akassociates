# Cloudflare preview deployment

Use the astro-migration branch, root directory astro-site, build command npm run build, output directory dist, and NODE_VERSION 22.23.4. Enable automatic deployments for this branch. Retry only deployments associated with astro-migration; older main-branch deployments cannot build the Astro subdirectory. Keep the existing production domain on its current host until migration acceptance.
