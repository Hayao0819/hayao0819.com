import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const dateToString = (date: Date, delimiter: string = "/") => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    return `${year}${delimiter}${month}${delimiter}${day}`;
};

export const recursivePath = (pathName: string) => {
    const splited = pathName.split("/").filter((s) => s !== "");

    return splited.map((_d, i) => {
        //return path.join(...splited.slice(undefined, i), d);
        // path.joinを使わない
        return splited.slice(undefined, i + 1).join("/");
    });
};

export function removeTrailingSlash(url: string) {
    return url.endsWith("/") ? url.substring(0, url.length - 1) : url;
}

// Strip markdown/MDX syntax for plain-text excerpts
export function markdownToPlainText(src: string): string {
    return src
        .replace(/^---[\s\S]*?---/, " ")
        .replace(/```[\s\S]*?(```|$)/g, " ")
        .replace(/~~~[\s\S]*?(~~~|$)/g, " ")
        .replace(/<[^<>]+>/g, " ")
        .replace(/!\[([^\]]*)\]\([^()]*\)/g, "$1")
        .replace(/\[([^\]]*)\]\([^()]*\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/^>\s?/gm, "")
        .replace(/^[-*+]\s+/gm, "")
        .replace(/`([^`]*)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
}
