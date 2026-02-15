// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://privateden.sk',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'pl', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
