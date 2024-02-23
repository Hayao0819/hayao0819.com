import path from "path";
import { ReactNode } from "react";

import Markdown from "@/components/elements/Markdown";

import { findMarkdownFromURL } from "../markdown/fromurl";
import { getPostDataFromFile, PostData } from "../markdown/post";

type FoundPost = {
    post?: PostData;
    parsed?: ReactNode;
    isDir: boolean;
};

export async function findPostFromUrl(url: string): Promise<FoundPost> {
    const targetFile = findMarkdownFromURL(path.join(process.cwd(), "posts"), url);

    if (targetFile) {
        const post = await getPostDataFromFile(targetFile);
        //console.log(post);

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
