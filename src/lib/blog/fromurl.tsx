import path from "path";
import { ReactNode } from "react";

import Markdown from "@/components/elements/Markdown/server";

import { findMarkdownFromURL } from "../markdown/fromurl";
import { PostData } from "../markdown/post";

type FoundPost = {
    post?: PostData;
    parsed?: ReactNode;
    isDir: boolean;
};

export function findPostFromUrl(url: string): FoundPost {
    const targetFile = findMarkdownFromURL(path.join(process.cwd(), "posts"), url);

    if (targetFile) {
        const post = PostData.getFromFile(targetFile);

        return {
            post: post,
            isDir: false,
            parsed: <Markdown content={post.content} basepath={"/posts/" + post.url} />,
        };
    } else {
        return {
            isDir: true,
        };
    }
}
