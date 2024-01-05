export interface PostMeta extends Record<string, string | string[] | boolean | undefined> {
    title?: string;
    date?: string;
    categories?: string[];
    tags?: string[];
    description?: string;
    draft?: boolean;
}
