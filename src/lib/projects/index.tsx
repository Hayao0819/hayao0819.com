import path from "path";

import Markdown from "@/components/elements/Markdown";

import { findMarkdownFromURL } from "../markdown/fromurl";
import { getPostDataFromFile } from "../markdown/post";
import { PostList } from "../markdown/postlist";

export const projectsDir = path.join(process.cwd(), "src", "app", "(hayao)", "something", "files");

export const getFetchedProjectPostList = () => {
    return new PostList().fetch(projectsDir, {
        cutHead: process.cwd().split(path.sep).length + 5,
    });
};

export const getProjectFromURL = async (url: string) => {
    const mdFile = findMarkdownFromURL(projectsDir, url);

    if (mdFile) {
        const projPost = await getPostDataFromFile(mdFile);
        // Todo: basepathは多分間違ってる
        return <Markdown content={projPost.content} basepath={projPost.url} />;
    } else {
        return undefined;
    }
};
