import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(), // or z.date() if you're using Date objects
        tags: z.array(z.string()),
        // Add other fields as needed
    }),
});

export const collections = {
    'blog': blogCollection,
};