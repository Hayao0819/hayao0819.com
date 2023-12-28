import { PostList } from "../markdown/postlist";
import { CATEGORY_INFO } from "./config";

export const getAllCategories = () => new PostList().getAllCategories();

export const findCategoryInfo = (category: string) => {
    const catingo: { jp: string; url: string; desc: string }[] = getCategoryInfo();
    return catingo.filter((c) => c.url === category || c.jp === category)[0];
};

export const getCategoryInfo = () => {
    return CATEGORY_INFO;
};
