import fs from "fs";
import matter from "gray-matter";

import * as blogtools from "@/lib/blog";
import { PostMeta } from "@/lib/blog/type";

import { DEFAULT_URL_FORMAT, formatURL, URLFormat } from "./url";

export interface PostData {
    file: string;
    url: string;
    meta: PostMeta;
    content: string;
}

export class Post {
    file: string;
    url: string;
    meta: PostMeta;
    content: string;

    get = (): PostData => {
        return {
            file: this.file,
            url: this.url,
            meta: this.meta,
            content: this.content,
        };
    };

    constructor(file: string, url: string, meta: PostMeta, content: string) {
        this.file = file;
        this.url = url;
        this.meta = meta;
        this.content = content;
    }

    static fromPostData(data: PostData): Post {
        return new Post(data.file, data.url, data.meta, data.content);
    }
    static fromFile(file: string, urlFormat: URLFormat = DEFAULT_URL_FORMAT): Post {
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
            url: formatURL(blogtools.mdPathToURL(file), urlFormat),
            meta: meta,
            content: parsed.content,
        };

        return Post.fromPostData(data);
    }
}
