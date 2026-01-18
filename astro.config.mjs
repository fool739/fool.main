import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';
import vercel from '@astrojs/vercel';

export default defineConfig({
    site: 'https://www.fool.ltd',
    adapter: vercel({
        isr: false,
        maxDuration: 30
    }),
    integrations: [tailwind(), pagefind()],
    markdown: {
        shikiConfig: {
            theme: 'monokai',
            wrap: true
        }
    },
    vite: {
        ssr: {
            noExternal: ['@astrojs/vercel']
        }
    }
});