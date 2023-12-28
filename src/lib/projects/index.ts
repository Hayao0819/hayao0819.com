import path from "path";

import { PostList } from "../markdown/postlist";

export const getFetchedProjectPostList = () => {
    const dirpath = ["src", "app", "(hayao)", "projects", "files"];
    return new PostList().fetch(path.join(...dirpath), {});
};
