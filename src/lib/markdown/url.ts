// URLフォーマットは/blog/posts/以下のURLを返すように設定する
export type URLFormat = {
    prefix?: string;
    suffix?: string;
    cutHead?: number;
    cutTail?: number;
};

export function formatURL(path: string, format: URLFormat): string {
    const pathArr = path.split("/");
    const prefix = format.prefix || "";
    const suffix = format.suffix || "";
    const cutHead = format.cutHead || 0;
    const cutTail = format.cutTail || 0;
    return prefix + pathArr.slice(cutHead, pathArr.length - cutTail).join("/") + suffix;
}

export const mdPathToURL = (pathName: string): string => {
    return pathName.replace("index.mdx", "").replace("index.md", "").replace(".mdx", "").replace(".md", "");
};
