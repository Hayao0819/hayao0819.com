import { PostList } from "../markdown/postlist";
import { BLOG_URL_FORMAT, MDFILE_DIR } from "./config";

export const getFetchedBlogPostList = () => {
    const list = new PostList().fetch(MDFILE_DIR, BLOG_URL_FORMAT);
    if (process.env.NODE_ENV === "development") {
        return list;
    } else {
        return list.excludeDraft();
    }
};

export const fetchedBlogPostList = getFetchedBlogPostList();
export const fetchedBlogPostListWithoutHidden = getFetchedBlogPostList().excludeHidden();
