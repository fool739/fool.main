import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog', ({ data }) => !data.draft);

    // Sort by date (newest first)
    posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    return rss({
        title: 'fool.ltd blog',
        description: 'live to die. a blog of life and death.',
        site: context.site,
        items: posts.map(post => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
            categories: post.data.tags,
        })),
        customData: '<language>en-us</language>',
    });
}