import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://chambersofak.in', output: 'static', trailingSlash: 'never', build: { format: 'file' } });
