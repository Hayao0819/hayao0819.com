import fs from "fs";
import matter from "gray-matter";
import { parse } from "node-html-parser";

import Markdown from "@/components/elements/Markdown";
import { PostMeta } from "@/lib/markdown/type";

import { BLOG_URL_FORMAT } from "../blog/config";
import { formatURL, mdPathToURL, URLFormat } from "./url";

export async function getPostDataFromFile(file: string, urlFormat: URLFormat = BLOG_URL_FORMAT): Promise<PostData> {
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

    const url = formatURL(mdPathToURL(file), urlFormat);

    const data = {
        file: file,
        url: url,
        meta: meta,
        content: parsed.content,
        toc: await getHeadingsFromContent(parsed.content),
    };

    return data;
}

export const getHeadingsFromContent = async (content: string): Promise<Heading[]> => {
    const headings: Heading[] = [];

    const { renderToString } = await import("react-dom/server");
    const html = await renderToString(<Markdown content={content} basepath="" />);
    const doc = parse(html);

    const elements = doc.getElementsByTagName("h2");
    elements.forEach((element) => {
        const level = parseInt(element.tagName[1]);
        const title = element.textContent || "";
        headings.push({ level, title });
    });
    console.log(elements);
    return headings;
};

export type Heading = {
    level: number;
    title: string;
};
export interface PostData {
    file: string;
    url: string;
    meta: PostMeta;
    content: string;
    toc: Heading[];
}
