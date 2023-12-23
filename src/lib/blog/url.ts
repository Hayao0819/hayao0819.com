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

export const DEFAULT_URL_FORMAT: URLFormat = {
    cutHead: 1,
};
