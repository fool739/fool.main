import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';

export default defineConfig({
    integrations: [tailwind(), pagefind()],
    markdown: {
        shikiConfig: {
            theme: 'monokai',
            wrap: true
        }
    }
});