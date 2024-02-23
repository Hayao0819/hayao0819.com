import { CATEGORY_INFO } from "./config";
import { fetchedBlogPostList } from "./post";

export type Category = {
    jp: string;
    url: string;
    desc: string;
};

export const getAllCategories = () => fetchedBlogPostList.getAllCategories();

export const findCategoryInfo = (category: string): Category | null => {
    const catingo = getCategoryInfo();
    const matched = catingo.filter((c) => c.url === category || c.jp === category);

    if (matched.length === 0) {
        return null;
    }

    return matched[0];
};

export const getCategoryInfo = () => {
    return CATEGORY_INFO;
};
