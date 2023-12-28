import { existsSync } from "fs";
import { ReactNode } from "react";

import Markdown from "@/components/elements/Markdown";

import { getPostDataFromFile, PostData } from "./post";

type FoundPost = {
    post?: PostData;
    parsed?: ReactNode;
    isDir: boolean;
};

export function findPostFromUrl(path: string): FoundPost {
    // get slug
    let rawSlug = path;
    if (!rawSlug) {
        throw new Error("slug is undefined");
    } else if (Array.isArray(rawSlug)) {
        rawSlug = rawSlug.join("/");
    }

    const filePathes: string[] = [`${rawSlug}.mdx`, `${rawSlug}/index.mdx`, `${rawSlug}.md`, `${rawSlug}/index.md`].map((p) => {
        return "posts/" + p;
    });

    const targetFile = (function (): string | undefined {
        for (const filePath of filePathes) {
            //console.log("check: " + filePath);
            if (existsSync(filePath)) {
                return filePath;
            }
        }
    })();

    if (targetFile) {
        const post = getPostDataFromFile(targetFile);
        //console.log(post);

        return {
            post: post,
            isDir: false,
            parsed: <Markdown content={post.content} />,
        };
    } else {
        return {
            isDir: true,
        };
    }
}
