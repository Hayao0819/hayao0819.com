export interface PostMeta extends Record<string, string | string[] | undefined> {
    title?: string;
    date?: string;
    categories?: string[];
    tags?: string[];
}

export interface Post {
    file: string;
    url: string;
    meta: PostMeta;
    content: string;
}
