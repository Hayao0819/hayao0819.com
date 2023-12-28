import { PostList } from "../markdown/postlist";
import { DEFAULT_URL_FORMAT } from "../markdown/url";
import { MDFILE_DIR } from "./config";

export const getFetchedBlogPostList = () => {
    return new PostList().fetch(MDFILE_DIR, DEFAULT_URL_FORMAT);
};
