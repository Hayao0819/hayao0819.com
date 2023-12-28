import fs from "fs";
import matter from "gray-matter";

import { PostMeta } from "@/lib/markdown/type";

import { DEFAULT_URL_FORMAT, formatURL, mdPathToURL, URLFormat } from "./url";

export function getPostDataFromFile(file: string, urlFormat: URLFormat = DEFAULT_URL_FORMAT): PostData {
    const fileContent = fs.readFileSync(file, "utf-8");
    const parsed = matter(fileContent);
    const meta: PostMeta = {};

    Object.keys(parsed.data).forEach((key) => {
        if (key === "date") {
            meta[key] = new Date(parsed.data[key]).toISOString();
        } else {
            meta[key] = parsed.data[key];
        }
    });

    //console.log(meta);

    const data = {
        file: file,
        url: formatURL(mdPathToURL(file), urlFormat),
        meta: meta,
        content: parsed.content,
    };

    return data;
}

export interface PostData {
    file: string;
    url: string;
    meta: PostMeta;
    content: string;
}
