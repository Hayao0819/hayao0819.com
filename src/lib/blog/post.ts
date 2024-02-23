import { PostList } from "../markdown/postlist";
import { BLOG_URL_FORMAT, MDFILE_DIR } from "./config";

export const getFetchedBlogPostList = async () => {
    const postList = new PostList();
    return await postList.fetch(MDFILE_DIR, BLOG_URL_FORMAT);
};
