/// <reference types="astro/client" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '@pagefind/default-ui' {
    export interface PagefindUIOptions {
        element?: string | HTMLElement;
        bundlePath?: string;
        pageSize?: number;
        resetStyles?: boolean;
        showImages?: boolean;
        showSubResults?: boolean;
        excerptLength?: number;
        processResult?: (result: any) => any;
        processTerm?: (term: string) => string;
        showResultsWhileTyping?: boolean;
        debounceTimeoutMs?: number;
        mergeIndex?: any[];
        baseUrl?: string;
    }

    export class PagefindUI {
        constructor(options?: PagefindUIOptions);
    }

    export default PagefindUI;
}

declare module '/pagefind/pagefind.js' {
    export interface PagefindSearchResult {
        id: string;
        score: number;
        data: () => Promise<{
            url: string;
            excerpt: string;
            meta: {
                title?: string;
                [key: string]: any;
            };
            content: string;
            word_count: number;
        }>;
    }

    export interface PagefindSearchResponse {
        results: PagefindSearchResult[];
        unfilteredResultCount: number;
        totalFilters: any;
        timings: {
            preload: number;
            search: number;
            total: number;
        };
    }

    export function init(): Promise<void>;
    export function search(query: string): Promise<PagefindSearchResponse>;
    export function debouncedSearch(query: string): Promise<PagefindSearchResponse>;
    export function destroy(): void;
}