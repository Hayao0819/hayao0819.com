import path from "path";

import Markdown from "@/components/elements/Markdown";

import { findMarkdownFromURL } from "../markdown/fromurl";
import { getPostDataFromFile } from "../markdown/post";
import { PostList } from "../markdown/postlist";

export const getFetchedProjectPostList = () => {
    const dirpath = path.join(process.cwd(), "src", "app", "(hayao)", "projects", "files");
    return new PostList().fetch(dirpath, {
        cutHead: process.cwd().split(path.sep).length + 5,
    });
};

export const getProjectFromURL = (url: string) => {
    const mdFile = findMarkdownFromURL(path.join(process.cwd(), "src", "app", "(hayao)", "projects", "files"), url);

    if (mdFile) {
        const projPost = getPostDataFromFile(mdFile);
        return <Markdown content={projPost.content} />;
    } else {
        return undefined;
    }
};
