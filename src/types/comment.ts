export interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    isPresetName: boolean;
}

export interface CommentFile {
    postSlug: string;
    comments: Comment[];
}

export const PRESET_NAMES = [
    'Wanderer',
    'Jester',
    'Fool',
    'Pilgrim',
    'Vagabond',
    'Stranger',
    'Nomad',
    'Drifter'
] as const;

export type PresetName = typeof PRESET_NAMES[number];

export function generateCommentId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `c_${timestamp}_${random}`;
}
