import type { APIRoute } from 'astro';
import { generateCommentId, PRESET_NAMES, type Comment, type CommentFile } from '../../types/comment';

export const prerender = false;

const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
const GITHUB_REPO = import.meta.env.GITHUB_REPO || 'your-username/your-repo';
const GITHUB_BRANCH = import.meta.env.GITHUB_BRANCH || 'main';

function sanitize(str: string): string {
    return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}

function validateInput(body: any): { valid: boolean; error?: string } {
    if (!body.postSlug || typeof body.postSlug !== 'string') {
        return { valid: false, error: 'Invalid post slug' };
    }

    if (!body.author || typeof body.author !== 'string') {
        return { valid: false, error: 'Name is required' };
    }

    if (body.author.length > 30) {
        return { valid: false, error: 'Name too long (max 30 characters)' };
    }

    if (!body.content || typeof body.content !== 'string') {
        return { valid: false, error: 'Comment is required' };
    }

    if (body.content.length > 1000) {
        return { valid: false, error: 'Comment too long (max 1000 characters)' };
    }

    if (body.content.length < 2) {
        return { valid: false, error: 'Comment too short' };
    }

    // Validate preset name if claimed
    if (body.isPresetName && !PRESET_NAMES.includes(body.author)) {
        return { valid: false, error: 'Invalid preset name' };
    }

    return { valid: true };
}

async function getExistingComments(postSlug: string): Promise<{ comments: Comment[]; sha?: string }> {
    const filePath = `src/data/comments/pending/${postSlug}.json`;

    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const content = atob(data.content);
            const parsed: CommentFile = JSON.parse(content);
            return { comments: parsed.comments || [], sha: data.sha };
        }
    } catch (e) {
        // File doesn't exist yet
    }

    return { comments: [] };
}

async function saveComments(postSlug: string, comments: Comment[], sha?: string): Promise<boolean> {
    const filePath = `src/data/comments/pending/${postSlug}.json`;

    const content: CommentFile = {
        postSlug,
        comments,
    };

    const body: any = {
        message: `Add pending comment for ${postSlug}`,
        content: btoa(JSON.stringify(content, null, 2)),
        branch: GITHUB_BRANCH,
    };

    if (sha) {
        body.sha = sha;
    }

    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    );

    return response.ok;
}

export const POST: APIRoute = async ({ request }) => {
    // Check for GitHub token
    if (!GITHUB_TOKEN) {
        return new Response(
            JSON.stringify({ success: false, error: 'Server configuration error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const body = await request.json();

        // Validate input
        const validation = validateInput(body);
        if (!validation.valid) {
            return new Response(
                JSON.stringify({ success: false, error: validation.error }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create comment object
        const comment: Comment = {
            id: generateCommentId(),
            author: sanitize(body.author),
            content: sanitize(body.content),
            timestamp: new Date().toISOString(),
            isPresetName: Boolean(body.isPresetName),
        };

        // Get existing comments and add new one
        const { comments, sha } = await getExistingComments(body.postSlug);
        comments.push(comment);

        // Save to GitHub
        const saved = await saveComments(body.postSlug, comments, sha);

        if (!saved) {
            return new Response(
                JSON.stringify({ success: false, error: 'Failed to save comment' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Comment submitted for moderation' }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Comment submission error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to process comment' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
