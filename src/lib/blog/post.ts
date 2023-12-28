import { PostList } from "../markdown/postlist";
import { BLOG_URL_FORMAT, MDFILE_DIR } from "./config";

export const getFetchedBlogPostList = () => {
    return new PostList().fetch(MDFILE_DIR, BLOG_URL_FORMAT);
};
