export interface PostMeta extends Record<string, string | string[] | undefined> {
    title?: string;
    date?: string;
    categories?: string[];
    tags?: string[];
    description?: string;
}
