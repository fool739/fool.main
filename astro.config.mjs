import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';

export default defineConfig({
    site: 'https://www.fool.ltd',
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