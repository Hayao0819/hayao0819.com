import path from "node:path";
import type { ReactNode } from "react";

import Markdown from "@/components/elements/Markdown/server";

import { findMarkdownFromURL } from "../markdown/fromurl";
import { PostData } from "../markdown/post";

type FoundPost = {
    post?: PostData;
    parsed?: ReactNode;
    isDir: boolean;
};

function stripHtmlComments(content: string): string {
    let inFence = false;
    let inComment = false;
    const out: string[] = [];
    for (const line of content.split("\n")) {
        if (!inComment && /^\s*(```|~~~)/.test(line)) {
            inFence = !inFence;
            out.push(line);
            continue;
        }
        if (inFence) {
            out.push(line);
            continue;
        }
        let l = line;
        if (inComment) {
            const end = l.indexOf("-->");
            if (end === -1) continue;
            l = l.slice(end + 3);
            inComment = false;
        }
        l = l.replaceAll(/<!--.*?-->/g, "");
        const start = l.indexOf("<!--");
        if (start !== -1) {
            l = l.slice(0, start);
            inComment = true;
        }
        out.push(l);
    }
    return out.join("\n");
}

export function findPostFromUrl(url: string): FoundPost {
    const targetFile = findMarkdownFromURL(path.join(process.cwd(), "posts"), url);

    if (targetFile) {
        const post = PostData.getFromFile(targetFile);

        // .md files are still compiled as MDX, where an HTML comment is a fatal
        // parse error — strip them (outside code fences) before compiling
        const content = targetFile.endsWith(".md") ? stripHtmlComments(post.content) : post.content;

        return {
            post: post,
            isDir: false,
            parsed: <Markdown content={content} basepath={`/posts/${post.url}`} />,
        };
    } else {
        return {
            isDir: true,
        };
    }
}
