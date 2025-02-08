import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().transform((str) => new Date(str)),
        tags: z.array(z.string()).default(['other']),
        draft: z.boolean().default(false)
    }),
});

export const collections = { blog };