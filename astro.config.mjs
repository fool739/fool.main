import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind';

export default defineConfig({
    site: 'https://www.fool.ltd',
    integrations: [tailwind(), pagefind()],
    markdown: {
        shikiConfig: {
            themes: {
                light: 'github-light-default',
                dark: 'github-dark-default'
            },
            wrap: true
        }
    }
});