import fs from "fs";
import matter from "gray-matter";

import { PostMeta } from "@/lib/markdown/type";

import { BLOG_URL_FORMAT } from "../blog/config";
import { formatURL, mdPathToURL, URLFormat } from "./url";

export interface StaticPostData {
    file: string;
    url: string;
    meta: PostMeta;
    content: string;
    summary: string;
    categories: string[];
}

export class PostData {
    #file: string;
    #url: string;
    #meta: PostMeta;
    #content: string;

    get file() {
        return this.#file;
    }
    get url() {
        return this.#url;
    }
    get meta() {
        return this.#meta;
    }
    get content() {
        return this.#content;
    }

    get summary() {
        return this.#content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "").slice(0, 100) + "...";
    }

    get categories() {
        return this.#meta.categories
            ? this.#meta.categories
            : ["その他"]
                  .filter((c) => {
                      return c !== "ブログ";
                  })
                  .map((c) => {
                      return c ? c : "その他";
                  });
    }

    constructor(file: string, url: string, meta: PostMeta, content: string) {
        this.#file = file;
        this.#url = url;
        this.#meta = meta;
        this.#content = content;
    }

    contentSplited(chars: number) {
        return new PostData(this.#file, this.#url, this.#meta, this.#content.slice(0, chars));
    }

    getStaticData(): StaticPostData {
        return {
            file: this.#file,
            url: this.#url,
            meta: this.#meta,
            content: this.#content,
            summary: this.summary,
            categories: this.categories,
        };
    }

    static getFromFile(file: string, urlFormat: URLFormat = BLOG_URL_FORMAT): PostData {
        const fileContent = fs.readFileSync(file, "utf-8");
        const parsed = matter(fileContent);
        const meta: PostMeta = {};

        Object.keys(parsed.data).forEach((key) => {
            if (key === "date") {
                meta[key] = new Date(parsed.data[key]).toISOString();
            } else if (key === "categories") {
                meta[key] = parsed.data[key].filter((c: string) => c !== "ブログ");
            } else {
                meta[key] = parsed.data[key];
            }
        });

        return new PostData(file, formatURL(mdPathToURL(file), urlFormat), meta, parsed.content);
    }

    static getFromStaticData(data: StaticPostData, urlFormat: URLFormat = BLOG_URL_FORMAT): PostData {
        return new PostData(data.file, formatURL(data.url, urlFormat), data.meta, data.content);
    }
}
