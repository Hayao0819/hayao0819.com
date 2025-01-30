import path from "path";

import Markdown from "@/components/elements/Markdown/server";

import { findMarkdownFromURL } from "../markdown/fromurl";
import { PostData } from "../markdown/post";
import { PostList } from "../markdown/postlist";

export const projectsDir = path.join(process.cwd(), "src", "app", "(hayao)", "something", "files");

export const getFetchedProjectPostList = () => {
    return new PostList().fetch(projectsDir, {
        cutHead: process.cwd().split(path.sep).length + 5,
    });
};

export const getProjectFromURL = (url: string) => {
    const mdFile = findMarkdownFromURL(projectsDir, url);
    // console.log(mdFile);

    if (mdFile) {
        const projPost = PostData.getFromFile(mdFile, {
            cutHead: process.cwd().split(path.sep).length + 5,
        });
        // TODO: basepathがあってるか確認する

        return <Markdown content={projPost.content} basepath={"/something/" + projPost.url} />;
    } else {
        return undefined;
    }
};
